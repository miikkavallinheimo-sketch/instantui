/**
 * Layout Generator Engine
 * Core algorithm that generates professional layouts
 */

import type {
  LayoutElement,
  GeneratedLayout,
  GridSystem,
  LayoutGeneratorConfig,
  AlgorithmOptions,
  Dimensions,
  Point,
} from './types';
import { getVibeConstraints } from './vibeConstraints';
import { evaluateLayout } from './scoring';
import { hasOverlap, isWithinBounds } from './designPrinciples';

/**
 * Generate a professional layout
 */
export function generateLayout(
  config: LayoutGeneratorConfig,
  options: Partial<AlgorithmOptions> = {}
): GeneratedLayout {
  const opts: AlgorithmOptions = {
    maxIterations: options.maxIterations || 50,
    minScore: options.minScore || 80,
    useGeneticAlgorithm: options.useGeneticAlgorithm ?? false,
    populationSize: options.populationSize || 10,
    mutationRate: options.mutationRate || 0.2,
  };

  const constraints = getVibeConstraints(config.vibeId);
  const seed = config.seed || Math.random();

  let bestLayout: GeneratedLayout | null = null;
  let bestScore = 0;
  let iterations = 0;

  // Try to generate a layout that meets the minimum score
  for (let i = 0; i < opts.maxIterations; i++) {
    iterations++;

    const grid = generateGrid(config.canvasSize, constraints);
    const elements = generateElements(config, constraints, grid, seed + i);

    // Skip if elements overlap
    if (elementsOverlap(elements)) {
      continue;
    }

    // Skip if elements are out of bounds
    if (!allWithinBounds(elements, config.canvasSize)) {
      continue;
    }

    const score = evaluateLayout(elements, grid, config.canvasSize, constraints, config.colors.background);

    if (score.total > bestScore) {
      bestScore = score.total;
      bestLayout = {
        id: `layout-${Date.now()}-${i}`,
        type: config.contentType,
        vibeId: config.vibeId,
        elements,
        grid,
        score,
        metadata: {
          generatedAt: new Date(),
          seed: seed + i,
          iterations: i + 1,
        },
      };

      // If we've met the minimum score, we're done
      if (score.total >= opts.minScore) {
        break;
      }
    }
  }

  if (!bestLayout) {
    // Fallback: generate a simple centered layout
    const grid = generateGrid(config.canvasSize, constraints);
    const elements = generateFallbackLayout(config, grid);
    const score = evaluateLayout(elements, grid, config.canvasSize, constraints, config.colors.background);

    bestLayout = {
      id: `layout-fallback-${Date.now()}`,
      type: config.contentType,
      vibeId: config.vibeId,
      elements,
      grid,
      score,
      metadata: {
        generatedAt: new Date(),
        seed,
        iterations,
      },
    };
  }

  return bestLayout;
}

/**
 * Generate grid system based on canvas size and constraints
 */
function generateGrid(canvasSize: Dimensions, constraints: any): GridSystem {
  const columns = constraints.layoutPreferences.preferredColumns[0] || 3;
  const rows = constraints.layoutPreferences.preferredRows[0] || 4;

  const gutterX = constraints.alignmentGrid;
  const gutterY = constraints.alignmentGrid;

  const margin = {
    top: gutterY * 2,
    right: gutterX * 2,
    bottom: gutterY * 2,
    left: gutterX * 2,
  };

  return {
    columns,
    rows,
    gutterX,
    gutterY,
    margin,
  };
}

/**
 * Generate layout elements based on configuration
 */
function generateElements(
  config: LayoutGeneratorConfig,
  constraints: any,
  grid: GridSystem,
  seed: number
): LayoutElement[] {
  const elements: LayoutElement[] = [];
  const rng = seededRandom(seed);

  // Determine number of elements based on content and constraints
  const maxElements = Math.min(constraints.maxElements, 10);
  const elementCount = Math.floor(rng() * 4) + 3; // 3-6 elements

  // Calculate available space
  const availableWidth = config.canvasSize.width - grid.margin.left - grid.margin.right;
  const availableHeight = config.canvasSize.height - grid.margin.top - grid.margin.bottom;

  // Generate heading if provided
  if (config.content.heading) {
    const headingElement = createHeadingElement(
      config,
      constraints,
      grid,
      availableWidth,
      availableHeight,
      rng
    );
    elements.push(headingElement);
  }

  // Generate subheading if provided
  if (config.content.subheading && elements.length < maxElements) {
    const subheadingElement = createSubheadingElement(
      config,
      constraints,
      grid,
      availableWidth,
      availableHeight,
      elements,
      rng
    );
    elements.push(subheadingElement);
  }

  // Generate body text if provided
  if (config.content.body && elements.length < maxElements) {
    const bodyElement = createBodyElement(
      config,
      constraints,
      grid,
      availableWidth,
      availableHeight,
      elements,
      rng
    );
    elements.push(bodyElement);
  }

  // Add decorative elements if allowed
  if (constraints.layoutPreferences.decorativeElements && elements.length < maxElements) {
    const decorativeCount = Math.floor(rng() * 2) + 1; // 1-2 decorative elements
    for (let i = 0; i < decorativeCount && elements.length < maxElements; i++) {
      const decorativeElement = createDecorativeElement(
        config,
        constraints,
        grid,
        availableWidth,
        availableHeight,
        elements,
        rng
      );
      if (decorativeElement) {
        elements.push(decorativeElement);
      }
    }
  }

  return elements;
}

/**
 * Create heading element
 */
function createHeadingElement(
  config: LayoutGeneratorConfig,
  constraints: any,
  grid: GridSystem,
  availableWidth: number,
  availableHeight: number,
  rng: () => number
): LayoutElement {
  const fontSize = 48 + rng() * 32; // 48-80px
  const width = Math.min(availableWidth * (0.6 + rng() * 0.3), availableWidth);
  const height = fontSize * 1.2;

  // Position based on vibe preferences
  let x: number, y: number;

  if (constraints.useRuleOfThirds) {
    // Position near rule of thirds
    x = grid.margin.left + (rng() < 0.5 ? availableWidth / 3 : (availableWidth * 2) / 3) - width / 2;
    y = grid.margin.top + availableHeight / 3 - height / 2;
  } else if (constraints.symmetry === 'strict') {
    // Center
    x = grid.margin.left + (availableWidth - width) / 2;
    y = grid.margin.top + availableHeight * 0.25;
  } else {
    // Asymmetric
    x = grid.margin.left + rng() * (availableWidth - width);
    y = grid.margin.top + rng() * availableHeight * 0.3;
  }

  // Snap to grid
  x = Math.round(x / grid.gutterX) * grid.gutterX;
  y = Math.round(y / grid.gutterY) * grid.gutterY;

  return {
    id: 'heading',
    type: 'heading',
    position: { x, y },
    dimensions: { width, height },
    spacing: { top: 16, right: 16, bottom: 16, left: 16 },
    fontSize,
    fontWeight: 700,
    color: config.colors.text,
    alignment: constraints.symmetry === 'strict' ? 'center' : 'left',
    zIndex: 10,
    content: config.content.heading,
    importance: 10,
  };
}

/**
 * Create subheading element
 */
function createSubheadingElement(
  config: LayoutGeneratorConfig,
  constraints: any,
  grid: GridSystem,
  availableWidth: number,
  availableHeight: number,
  existingElements: LayoutElement[],
  rng: () => number
): LayoutElement {
  const heading = existingElements.find(e => e.type === 'heading');
  const fontSize = 24 + rng() * 16; // 24-40px
  const width = Math.min(availableWidth * (0.5 + rng() * 0.3), availableWidth);
  const height = fontSize * 1.3;

  let x: number, y: number;

  if (heading) {
    // Position below heading
    x = heading.position.x;
    y = heading.position.y + heading.dimensions.height + constraints.minElementSpacing;
  } else {
    x = grid.margin.left + rng() * (availableWidth - width);
    y = grid.margin.top + rng() * availableHeight * 0.4;
  }

  // Snap to grid
  x = Math.round(x / grid.gutterX) * grid.gutterX;
  y = Math.round(y / grid.gutterY) * grid.gutterY;

  return {
    id: 'subheading',
    type: 'subheading',
    position: { x, y },
    dimensions: { width, height },
    spacing: { top: 12, right: 12, bottom: 12, left: 12 },
    fontSize,
    fontWeight: 500,
    color: config.colors.text,
    alignment: heading?.alignment || 'left',
    zIndex: 9,
    content: config.content.subheading,
    importance: 8,
  };
}

/**
 * Create body text element
 */
function createBodyElement(
  config: LayoutGeneratorConfig,
  constraints: any,
  grid: GridSystem,
  availableWidth: number,
  availableHeight: number,
  existingElements: LayoutElement[],
  rng: () => number
): LayoutElement {
  const fontSize = 16 + rng() * 4; // 16-20px
  const width = Math.min(availableWidth * (0.6 + rng() * 0.2), availableWidth);
  const height = fontSize * 4; // Roughly 4 lines

  const previousElement = existingElements[existingElements.length - 1];

  let x: number, y: number;

  if (previousElement) {
    x = previousElement.position.x;
    y = previousElement.position.y + previousElement.dimensions.height + constraints.minElementSpacing;
  } else {
    x = grid.margin.left + rng() * (availableWidth - width);
    y = grid.margin.top + availableHeight * 0.5;
  }

  // Snap to grid
  x = Math.round(x / grid.gutterX) * grid.gutterX;
  y = Math.round(y / grid.gutterY) * grid.gutterY;

  return {
    id: 'body',
    type: 'body',
    position: { x, y },
    dimensions: { width, height },
    spacing: { top: 8, right: 8, bottom: 8, left: 8 },
    fontSize,
    fontWeight: 400,
    color: config.colors.text,
    alignment: previousElement?.alignment || 'left',
    zIndex: 8,
    content: config.content.body,
    importance: 6,
  };
}

/**
 * Create decorative element
 */
function createDecorativeElement(
  config: LayoutGeneratorConfig,
  constraints: any,
  grid: GridSystem,
  availableWidth: number,
  availableHeight: number,
  existingElements: LayoutElement[],
  rng: () => number
): LayoutElement | null {
  const types: Array<'shape' | 'divider' | 'pattern'> = ['shape', 'divider', 'pattern'];
  const type = types[Math.floor(rng() * types.length)];

  const size = 40 + rng() * 60; // 40-100px
  const width = type === 'divider' ? 100 + rng() * 200 : size;
  const height = type === 'divider' ? 2 : size;

  // Find empty space
  let x = grid.margin.left + rng() * (availableWidth - width);
  let y = grid.margin.top + rng() * (availableHeight - height);

  // Snap to grid
  x = Math.round(x / grid.gutterX) * grid.gutterX;
  y = Math.round(y / grid.gutterY) * grid.gutterY;

  const element: LayoutElement = {
    id: `decorative-${type}-${existingElements.length}`,
    type,
    position: { x, y },
    dimensions: { width, height },
    spacing: { top: 8, right: 8, bottom: 8, left: 8 },
    color: rng() < 0.5 ? config.colors.primary : config.colors.accent,
    alignment: 'center',
    zIndex: 5,
    importance: 3,
  };

  // Check if it overlaps with existing elements
  for (const existing of existingElements) {
    if (hasOverlap(element, existing)) {
      return null; // Skip this decorative element
    }
  }

  return element;
}

/**
 * Generate fallback layout (simple centered design)
 */
function generateFallbackLayout(config: LayoutGeneratorConfig, grid: GridSystem): LayoutElement[] {
  const elements: LayoutElement[] = [];
  const centerX = config.canvasSize.width / 2;
  let currentY = grid.margin.top + 50;

  if (config.content.heading) {
    elements.push({
      id: 'heading',
      type: 'heading',
      position: { x: centerX - 200, y: currentY },
      dimensions: { width: 400, height: 60 },
      spacing: { top: 16, right: 16, bottom: 16, left: 16 },
      fontSize: 48,
      fontWeight: 700,
      color: config.colors.text,
      alignment: 'center',
      zIndex: 10,
      content: config.content.heading,
      importance: 10,
    });
    currentY += 100;
  }

  if (config.content.subheading) {
    elements.push({
      id: 'subheading',
      type: 'subheading',
      position: { x: centerX - 250, y: currentY },
      dimensions: { width: 500, height: 40 },
      spacing: { top: 12, right: 12, bottom: 12, left: 12 },
      fontSize: 28,
      fontWeight: 500,
      color: config.colors.text,
      alignment: 'center',
      zIndex: 9,
      content: config.content.subheading,
      importance: 8,
    });
    currentY += 70;
  }

  if (config.content.body) {
    elements.push({
      id: 'body',
      type: 'body',
      position: { x: centerX - 300, y: currentY },
      dimensions: { width: 600, height: 80 },
      spacing: { top: 8, right: 8, bottom: 8, left: 8 },
      fontSize: 18,
      fontWeight: 400,
      color: config.colors.text,
      alignment: 'center',
      zIndex: 8,
      content: config.content.body,
      importance: 6,
    });
  }

  return elements;
}

/**
 * Check if any elements overlap
 */
function elementsOverlap(elements: LayoutElement[]): boolean {
  for (let i = 0; i < elements.length; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      if (hasOverlap(elements[i], elements[j])) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Check if all elements are within canvas bounds
 */
function allWithinBounds(elements: LayoutElement[], canvasSize: Dimensions): boolean {
  return elements.every(el => isWithinBounds(el, canvasSize));
}

/**
 * Seeded random number generator (for reproducibility)
 */
function seededRandom(seed: number): () => number {
  let state = seed;
  return function() {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}
