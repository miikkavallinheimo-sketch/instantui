/**
 * Business Card Layout Generator
 * Specialized generator for business card layouts with print-specific constraints
 */

import type {
  LayoutElement,
  GeneratedLayout,
  GridSystem,
  LayoutGeneratorConfig,
  Dimensions,
} from './types';
import {
  BUSINESS_CARD_CONSTRAINTS,
  mmToPixels,
  ptToPixels,
  getVibeConstraints,
} from './vibeConstraints';
import { evaluateLayout } from './scoring';
import { hasOverlap } from './designPrinciples';

/**
 * Generate a professional business card layout
 */
export function generateBusinessCardLayout(
  config: LayoutGeneratorConfig,
  dpi: number = 300
): GeneratedLayout {
  const constraints = getVibeConstraints(config.vibeId);
  const seed = config.seed || Math.random();
  const rng = seededRandom(seed);

  // Convert business card dimensions to pixels
  const cardWidth = mmToPixels(BUSINESS_CARD_CONSTRAINTS.dimensions.width, dpi);
  const cardHeight = mmToPixels(BUSINESS_CARD_CONSTRAINTS.dimensions.height, dpi);

  const canvasSize: Dimensions = {
    width: cardWidth,
    height: cardHeight,
  };

  // Create grid system for business card
  const grid: GridSystem = {
    columns: 3,
    rows: 3,
    gutterX: mmToPixels(3, dpi),
    gutterY: mmToPixels(3, dpi),
    margin: {
      top: mmToPixels(BUSINESS_CARD_CONSTRAINTS.safeZone.top, dpi),
      right: mmToPixels(BUSINESS_CARD_CONSTRAINTS.safeZone.right, dpi),
      bottom: mmToPixels(BUSINESS_CARD_CONSTRAINTS.safeZone.bottom, dpi),
      left: mmToPixels(BUSINESS_CARD_CONSTRAINTS.safeZone.left, dpi),
    },
  };

  // Generate elements
  const elements = generateBusinessCardElements(config, grid, canvasSize, constraints, rng, dpi);

  // Evaluate layout
  const score = evaluateLayout(
    elements,
    grid,
    canvasSize,
    constraints,
    config.colors.background
  );

  return {
    id: `business-card-${Date.now()}`,
    type: 'business-card',
    vibeId: config.vibeId,
    elements,
    grid,
    score,
    metadata: {
      generatedAt: new Date(),
      seed,
      iterations: 1,
    },
  };
}

/**
 * Generate business card elements
 */
function generateBusinessCardElements(
  config: LayoutGeneratorConfig,
  grid: GridSystem,
  canvasSize: Dimensions,
  constraints: any,
  rng: () => number,
  dpi: number
): LayoutElement[] {
  const elements: LayoutElement[] = [];

  const safeWidth = canvasSize.width - grid.margin.left - grid.margin.right;
  const safeHeight = canvasSize.height - grid.margin.top - grid.margin.bottom;

  const baseTextSize = ptToPixels(BUSINESS_CARD_CONSTRAINTS.optimalTextSize, dpi);

  // Name (most important)
  if (config.content.heading) {
    const nameSize = baseTextSize * BUSINESS_CARD_CONSTRAINTS.textHierarchy.name;
    const nameElement = createBusinessCardTextElement(
      'name',
      config.content.heading,
      nameSize,
      700,
      10,
      config,
      grid,
      safeWidth,
      safeHeight,
      canvasSize,
      rng,
      constraints
    );
    elements.push(nameElement);
  }

  // Title/Role (medium importance)
  if (config.content.subheading) {
    const titleSize = baseTextSize * BUSINESS_CARD_CONSTRAINTS.textHierarchy.title;
    const previous = elements[elements.length - 1];

    const titleElement = createBusinessCardTextElement(
      'title',
      config.content.subheading,
      titleSize,
      500,
      8,
      config,
      grid,
      safeWidth,
      safeHeight,
      canvasSize,
      rng,
      constraints,
      previous
    );
    elements.push(titleElement);
  }

  // Contact info (smallest)
  if (config.content.contactInfo && config.content.contactInfo.length > 0) {
    const contactSize = baseTextSize * BUSINESS_CARD_CONSTRAINTS.textHierarchy.contact;
    const previous = elements[elements.length - 1];

    config.content.contactInfo.forEach((info, index) => {
      const contactElement = createBusinessCardTextElement(
        `contact-${index}`,
        info,
        contactSize,
        400,
        6,
        config,
        grid,
        safeWidth,
        safeHeight,
        canvasSize,
        rng,
        constraints,
        index === 0 ? previous : elements[elements.length - 1]
      );
      elements.push(contactElement);
    });
  }

  // Logo/decorative element
  if (constraints.layoutPreferences.decorativeElements) {
    const logoPosition = BUSINESS_CARD_CONSTRAINTS.logoPositions[
      Math.floor(rng() * BUSINESS_CARD_CONSTRAINTS.logoPositions.length)
    ];

    const logoElement = createLogoElement(
      logoPosition,
      config,
      grid,
      canvasSize,
      elements,
      rng
    );

    if (logoElement) {
      elements.push(logoElement);
    }
  }

  return elements;
}

/**
 * Create business card text element
 */
function createBusinessCardTextElement(
  id: string,
  content: string,
  fontSize: number,
  fontWeight: number,
  importance: number,
  config: LayoutGeneratorConfig,
  grid: GridSystem,
  safeWidth: number,
  safeHeight: number,
  canvasSize: Dimensions,
  rng: () => number,
  constraints: any,
  previousElement?: LayoutElement
): LayoutElement {
  const width = safeWidth * (0.7 + rng() * 0.2);
  const height = fontSize * 1.4;

  let x: number, y: number;

  if (previousElement) {
    // Stack below previous element
    x = previousElement.position.x;
    y = previousElement.position.y + previousElement.dimensions.height + mmToPixels(2);

    // Ensure it's within safe zone
    if (y + height > canvasSize.height - grid.margin.bottom) {
      // Move to next section
      x = grid.margin.left;
      y = grid.margin.top + safeHeight * 0.5;
    }
  } else {
    // First element - position based on vibe
    if (constraints.symmetry === 'strict') {
      x = grid.margin.left + (safeWidth - width) / 2;
      y = grid.margin.top + safeHeight * 0.2;
    } else {
      x = grid.margin.left;
      y = grid.margin.top;
    }
  }

  const alignment: 'left' | 'center' | 'right' =
    constraints.symmetry === 'strict' ? 'center' : 'left';

  return {
    id,
    type: id === 'name' ? 'heading' : id === 'title' ? 'subheading' : 'body',
    position: { x, y },
    dimensions: { width, height },
    spacing: {
      top: mmToPixels(1),
      right: mmToPixels(1),
      bottom: mmToPixels(1),
      left: mmToPixels(1),
    },
    fontSize,
    fontWeight,
    color: config.colors.text,
    alignment,
    zIndex: 10 - importance,
    content,
    importance,
  };
}

/**
 * Create logo element for business card
 */
function createLogoElement(
  position: typeof BUSINESS_CARD_CONSTRAINTS.logoPositions[number],
  config: LayoutGeneratorConfig,
  grid: GridSystem,
  canvasSize: Dimensions,
  existingElements: LayoutElement[],
  rng: () => number
): LayoutElement | null {
  const size = mmToPixels(10 + rng() * 5); // 10-15mm
  const width = size;
  const height = size;

  let x: number, y: number;

  const safeWidth = canvasSize.width - grid.margin.left - grid.margin.right;
  const safeHeight = canvasSize.height - grid.margin.top - grid.margin.bottom;

  switch (position) {
    case 'top-left':
      x = grid.margin.left;
      y = grid.margin.top;
      break;
    case 'top-center':
      x = grid.margin.left + (safeWidth - width) / 2;
      y = grid.margin.top;
      break;
    case 'top-right':
      x = canvasSize.width - grid.margin.right - width;
      y = grid.margin.top;
      break;
    case 'center':
      x = grid.margin.left + (safeWidth - width) / 2;
      y = grid.margin.top + (safeHeight - height) / 2;
      break;
    case 'bottom-left':
      x = grid.margin.left;
      y = canvasSize.height - grid.margin.bottom - height;
      break;
    case 'bottom-center':
      x = grid.margin.left + (safeWidth - width) / 2;
      y = canvasSize.height - grid.margin.bottom - height;
      break;
    case 'bottom-right':
      x = canvasSize.width - grid.margin.right - width;
      y = canvasSize.height - grid.margin.bottom - height;
      break;
    default:
      x = grid.margin.left;
      y = grid.margin.top;
  }

  const logoElement: LayoutElement = {
    id: 'logo',
    type: 'shape',
    position: { x, y },
    dimensions: { width, height },
    spacing: {
      top: mmToPixels(1),
      right: mmToPixels(1),
      bottom: mmToPixels(1),
      left: mmToPixels(1),
    },
    color: config.colors.primary,
    alignment: 'center',
    zIndex: 5,
    importance: 7,
  };

  // Check if it overlaps with existing elements
  for (const existing of existingElements) {
    if (hasOverlap(logoElement, existing)) {
      return null; // Skip logo if it overlaps
    }
  }

  return logoElement;
}

/**
 * Seeded random number generator
 */
function seededRandom(seed: number): () => number {
  let state = seed;
  return function() {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}
