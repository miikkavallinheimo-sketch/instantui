/**
 * Design Principles Evaluators
 * Functions that evaluate layouts against professional design principles
 */

import type { LayoutElement, Dimensions, GridSystem, Point } from './types';
import { hexToLuminance, contrastRatio } from '../colorUtils';

/**
 * Evaluate Visual Hierarchy (0-100)
 * Checks if important elements are larger/bolder with proper scale ratios
 */
export function evaluateHierarchy(elements: LayoutElement[]): number {
  if (elements.length === 0) return 0;

  let score = 100;
  const issues: string[] = [];

  // Sort by importance
  const sortedByImportance = [...elements].sort((a, b) => b.importance - a.importance);

  // Check if most important elements have larger dimensions
  for (let i = 0; i < sortedByImportance.length - 1; i++) {
    const current = sortedByImportance[i];
    const next = sortedByImportance[i + 1];

    const currentArea = current.dimensions.width * current.dimensions.height;
    const nextArea = next.dimensions.width * next.dimensions.height;

    // More important should be larger or at least equal
    if (currentArea < nextArea * 0.9) {
      score -= 10;
      issues.push(`Element "${current.id}" is more important but smaller than "${next.id}"`);
    }

    // Check scale ratios (should be 1.5x, 2x, or 3x)
    const ratio = currentArea / nextArea;
    const idealRatios = [1, 1.5, 2, 3];
    const closestRatio = idealRatios.reduce((prev, curr) =>
      Math.abs(curr - ratio) < Math.abs(prev - ratio) ? curr : prev
    );

    if (Math.abs(ratio - closestRatio) > 0.3) {
      score -= 5;
    }
  }

  // Check font sizes for text elements
  const textElements = elements.filter(e => ['heading', 'subheading', 'body'].includes(e.type));
  for (let i = 0; i < textElements.length - 1; i++) {
    const current = textElements[i];
    const next = textElements[i + 1];

    if (current.fontSize && next.fontSize && current.importance > next.importance) {
      if (current.fontSize <= next.fontSize) {
        score -= 8;
        issues.push(`Text hierarchy issue: "${current.id}" should be larger than "${next.id}"`);
      }
    }
  }

  return Math.max(0, score);
}

/**
 * Evaluate Whitespace (0-100)
 * Checks for adequate breathing room and margins
 */
export function evaluateWhitespace(
  elements: LayoutElement[],
  canvasSize: Dimensions,
  minWhitespacePercent: number = 30
): number {
  let score = 100;

  // Calculate total element area
  const totalElementArea = elements.reduce((sum, el) => {
    return sum + (el.dimensions.width * el.dimensions.height);
  }, 0);

  const canvasArea = canvasSize.width * canvasSize.height;
  const whitespacePercent = ((canvasArea - totalElementArea) / canvasArea) * 100;

  // Score based on whitespace percentage
  if (whitespacePercent < minWhitespacePercent) {
    score -= (minWhitespacePercent - whitespacePercent) * 2;
  } else if (whitespacePercent > 80) {
    // Too much whitespace can also be bad
    score -= (whitespacePercent - 80) * 1.5;
  }

  // Check margins for each element
  elements.forEach(el => {
    const minMargin = 8;
    if (el.spacing.top < minMargin || el.spacing.right < minMargin ||
        el.spacing.bottom < minMargin || el.spacing.left < minMargin) {
      score -= 5;
    }
  });

  return Math.max(0, score);
}

/**
 * Evaluate Alignment (0-100)
 * Checks if elements align to grid and with each other
 */
export function evaluateAlignment(elements: LayoutElement[], grid: GridSystem): number {
  let score = 100;
  const snapTolerance = grid.gutterX / 2;

  // Check if elements snap to grid
  elements.forEach(el => {
    const xSnapped = Math.abs(el.position.x % grid.gutterX) < snapTolerance ||
                     Math.abs(el.position.x % grid.gutterX - grid.gutterX) < snapTolerance;
    const ySnapped = Math.abs(el.position.y % grid.gutterY) < snapTolerance ||
                     Math.abs(el.position.y % grid.gutterY - grid.gutterY) < snapTolerance;

    if (!xSnapped) score -= 3;
    if (!ySnapped) score -= 3;
  });

  // Check if elements align with each other
  for (let i = 0; i < elements.length; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      const el1 = elements[i];
      const el2 = elements[j];

      // Check left edge alignment
      if (Math.abs(el1.position.x - el2.position.x) < snapTolerance) {
        score += 2; // Bonus for alignment
      }

      // Check right edge alignment
      const el1Right = el1.position.x + el1.dimensions.width;
      const el2Right = el2.position.x + el2.dimensions.width;
      if (Math.abs(el1Right - el2Right) < snapTolerance) {
        score += 2;
      }

      // Check center alignment
      const el1CenterX = el1.position.x + el1.dimensions.width / 2;
      const el2CenterX = el2.position.x + el2.dimensions.width / 2;
      if (Math.abs(el1CenterX - el2CenterX) < snapTolerance) {
        score += 2;
      }
    }
  }

  return Math.min(100, Math.max(0, score));
}

/**
 * Evaluate Balance (0-100)
 * Checks visual weight distribution
 */
export function evaluateBalance(elements: LayoutElement[], canvasSize: Dimensions): number {
  if (elements.length === 0) return 100;

  const centerX = canvasSize.width / 2;
  const centerY = canvasSize.height / 2;

  // Calculate visual weight on each side
  let leftWeight = 0;
  let rightWeight = 0;
  let topWeight = 0;
  let bottomWeight = 0;

  elements.forEach(el => {
    const elementCenterX = el.position.x + el.dimensions.width / 2;
    const elementCenterY = el.position.y + el.dimensions.height / 2;
    const weight = el.dimensions.width * el.dimensions.height * el.importance;

    if (elementCenterX < centerX) {
      leftWeight += weight;
    } else {
      rightWeight += weight;
    }

    if (elementCenterY < centerY) {
      topWeight += weight;
    } else {
      bottomWeight += weight;
    }
  });

  // Calculate balance ratios (ideal is 1.0)
  const horizontalBalance = Math.min(leftWeight, rightWeight) / Math.max(leftWeight, rightWeight);
  const verticalBalance = Math.min(topWeight, bottomWeight) / Math.max(topWeight, bottomWeight);

  // Asymmetric balance is acceptable, but extreme imbalance is not
  const horizontalScore = horizontalBalance > 0.6 ? 100 : horizontalBalance * 100 / 0.6;
  const verticalScore = verticalBalance > 0.6 ? 100 : verticalBalance * 100 / 0.6;

  return (horizontalScore + verticalScore) / 2;
}

/**
 * Evaluate Proximity (0-100)
 * Checks if related items are grouped and unrelated items are separated
 */
export function evaluateProximity(elements: LayoutElement[]): number {
  let score = 100;

  // Group elements by type
  const groups: Map<string, LayoutElement[]> = new Map();
  elements.forEach(el => {
    const group = groups.get(el.type) || [];
    group.push(el);
    groups.set(el.type, group);
  });

  // Check if elements of same type are close to each other
  groups.forEach((group, type) => {
    if (group.length < 2) return;

    for (let i = 0; i < group.length - 1; i++) {
      const el1 = group[i];
      const el2 = group[i + 1];

      const distance = Math.sqrt(
        Math.pow(el1.position.x - el2.position.x, 2) +
        Math.pow(el1.position.y - el2.position.y, 2)
      );

      // Related elements should be within reasonable distance
      const maxDistance = 200;
      if (distance > maxDistance) {
        score -= 5;
      }
    }
  });

  // Check if different types are separated
  const types = Array.from(groups.keys());
  for (let i = 0; i < types.length; i++) {
    for (let j = i + 1; j < types.length; j++) {
      const group1 = groups.get(types[i])!;
      const group2 = groups.get(types[j])!;

      group1.forEach(el1 => {
        group2.forEach(el2 => {
          const distance = Math.sqrt(
            Math.pow(el1.position.x - el2.position.x, 2) +
            Math.pow(el1.position.y - el2.position.y, 2)
          );

          // Different types should have minimum separation
          const minDistance = 40;
          if (distance < minDistance) {
            score -= 3;
          }
        });
      });
    }
  }

  return Math.max(0, score);
}

/**
 * Evaluate Contrast (0-100)
 * Checks readability and focal points
 */
export function evaluateContrast(elements: LayoutElement[], backgroundColor: string): number {
  let score = 100;

  const textElements = elements.filter(e => ['heading', 'subheading', 'body'].includes(e.type));

  textElements.forEach(el => {
    if (!el.color) return;

    const contrast = contrastRatio(el.color, backgroundColor);

    // WCAG AA requires 4.5:1 for normal text, 3:1 for large text
    const isLargeText = (el.fontSize || 16) >= 18;
    const minContrast = isLargeText ? 3 : 4.5;

    if (contrast < minContrast) {
      score -= 15;
    } else if (contrast >= 7) {
      // AAA level - bonus
      score += 5;
    }
  });

  // Check if there's a clear focal point (highest importance element with good contrast)
  const mostImportant = elements.reduce((max, el) =>
    el.importance > max.importance ? el : max
  , elements[0]);

  if (mostImportant.color) {
    const focalContrast = contrastRatio(mostImportant.color, backgroundColor);
    if (focalContrast < 4.5) {
      score -= 20; // Focal point must be highly visible
    }
  }

  return Math.min(100, Math.max(0, score));
}

/**
 * Evaluate Rule of Thirds (0-100)
 * Checks if key elements are at intersection points
 */
export function evaluateRuleOfThirds(elements: LayoutElement[], canvasSize: Dimensions): number {
  let score = 50; // Start at neutral

  // Calculate rule of thirds intersection points
  const thirdX1 = canvasSize.width / 3;
  const thirdX2 = (canvasSize.width * 2) / 3;
  const thirdY1 = canvasSize.height / 3;
  const thirdY2 = (canvasSize.height * 2) / 3;

  const intersections: Point[] = [
    { x: thirdX1, y: thirdY1 },
    { x: thirdX2, y: thirdY1 },
    { x: thirdX1, y: thirdY2 },
    { x: thirdX2, y: thirdY2 },
  ];

  const tolerance = 50; // pixels

  // Find important elements
  const importantElements = elements
    .filter(e => e.importance >= 7)
    .sort((a, b) => b.importance - a.importance);

  // Check if important elements are near intersection points
  importantElements.forEach(el => {
    const elementCenter = {
      x: el.position.x + el.dimensions.width / 2,
      y: el.position.y + el.dimensions.height / 2,
    };

    const nearIntersection = intersections.some(point => {
      const distance = Math.sqrt(
        Math.pow(elementCenter.x - point.x, 2) +
        Math.pow(elementCenter.y - point.y, 2)
      );
      return distance < tolerance;
    });

    if (nearIntersection) {
      score += 15; // Bonus for following rule of thirds
    }
  });

  return Math.min(100, score);
}

/**
 * Check for overlapping elements
 */
export function hasOverlap(el1: LayoutElement, el2: LayoutElement): boolean {
  const left1 = el1.position.x;
  const right1 = el1.position.x + el1.dimensions.width;
  const top1 = el1.position.y;
  const bottom1 = el1.position.y + el1.dimensions.height;

  const left2 = el2.position.x;
  const right2 = el2.position.x + el2.dimensions.width;
  const top2 = el2.position.y;
  const bottom2 = el2.position.y + el2.dimensions.height;

  return !(right1 < left2 || left1 > right2 || bottom1 < top2 || top1 > bottom2);
}

/**
 * Check if element is within canvas bounds
 */
export function isWithinBounds(el: LayoutElement, canvasSize: Dimensions): boolean {
  return (
    el.position.x >= 0 &&
    el.position.y >= 0 &&
    el.position.x + el.dimensions.width <= canvasSize.width &&
    el.position.y + el.dimensions.height <= canvasSize.height
  );
}
