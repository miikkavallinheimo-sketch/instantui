/**
 * Layout Scoring System
 * Evaluates generated layouts against design principles
 */

import type { LayoutElement, GridSystem, Dimensions, LayoutScore, VibeConstraints } from './types';
import {
  evaluateHierarchy,
  evaluateWhitespace,
  evaluateAlignment,
  evaluateBalance,
  evaluateProximity,
  evaluateContrast,
  evaluateRuleOfThirds,
} from './designPrinciples';

/**
 * Evaluate a complete layout and return a score
 */
export function evaluateLayout(
  elements: LayoutElement[],
  grid: GridSystem,
  canvasSize: Dimensions,
  constraints: VibeConstraints,
  backgroundColor: string
): LayoutScore {
  // Evaluate each design principle
  const hierarchyScore = evaluateHierarchy(elements);
  const whitespaceScore = evaluateWhitespace(elements, canvasSize, constraints.minWhitespace);
  const alignmentScore = evaluateAlignment(elements, grid);
  const balanceScore = evaluateBalance(elements, canvasSize);
  const proximityScore = evaluateProximity(elements);
  const contrastScore = evaluateContrast(elements, backgroundColor);
  const ruleOfThirdsScore = constraints.useRuleOfThirds
    ? evaluateRuleOfThirds(elements, canvasSize)
    : 50; // Neutral if not using rule of thirds

  // Evaluate vibe adherence
  const vibeAdherenceScore = evaluateVibeAdherence(elements, constraints);

  // Weighted average based on importance
  const weights = {
    hierarchy: 0.18,
    whitespace: 0.15,
    alignment: 0.12,
    balance: 0.15 * constraints.balanceWeight,
    proximity: 0.10,
    contrast: 0.15,
    ruleOfThirds: constraints.useRuleOfThirds ? 0.10 : 0.05,
    vibeAdherence: 0.15,
  };

  // Normalize weights to sum to 1
  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);
  Object.keys(weights).forEach(key => {
    weights[key as keyof typeof weights] /= totalWeight;
  });

  const total =
    hierarchyScore * weights.hierarchy +
    whitespaceScore * weights.whitespace +
    alignmentScore * weights.alignment +
    balanceScore * weights.balance +
    proximityScore * weights.proximity +
    contrastScore * weights.contrast +
    ruleOfThirdsScore * weights.ruleOfThirds +
    vibeAdherenceScore * weights.vibeAdherence;

  // Collect issues and suggestions
  const issues: string[] = [];
  const suggestions: string[] = [];

  if (hierarchyScore < 70) {
    issues.push('Weak visual hierarchy');
    suggestions.push('Make important elements significantly larger');
  }

  if (whitespaceScore < 70) {
    issues.push('Insufficient whitespace');
    suggestions.push('Increase spacing between elements');
  }

  if (alignmentScore < 70) {
    issues.push('Poor alignment');
    suggestions.push('Align elements to grid or with each other');
  }

  if (balanceScore < 60) {
    issues.push('Unbalanced layout');
    suggestions.push('Redistribute visual weight more evenly');
  }

  if (contrastScore < 70) {
    issues.push('Poor contrast/readability');
    suggestions.push('Increase contrast between text and background');
  }

  if (vibeAdherenceScore < 70) {
    issues.push('Does not match vibe characteristics');
    suggestions.push(`Follow ${constraints.vibeName} design principles more closely`);
  }

  return {
    total: Math.round(total),
    breakdown: {
      hierarchy: Math.round(hierarchyScore),
      whitespace: Math.round(whitespaceScore),
      alignment: Math.round(alignmentScore),
      balance: Math.round(balanceScore),
      proximity: Math.round(proximityScore),
      contrast: Math.round(contrastScore),
      ruleOfThirds: Math.round(ruleOfThirdsScore),
      vibeAdherence: Math.round(vibeAdherenceScore),
    },
    issues,
    suggestions,
  };
}

/**
 * Evaluate how well the layout adheres to vibe-specific constraints
 */
function evaluateVibeAdherence(elements: LayoutElement[], constraints: VibeConstraints): number {
  let score = 100;

  // Check element count
  if (elements.length > constraints.maxElements) {
    score -= (elements.length - constraints.maxElements) * 5;
  }

  // Check element density
  const { elementDensity } = constraints.layoutPreferences;
  const actualDensity = elements.length;

  if (elementDensity === 'sparse' && actualDensity > 6) {
    score -= 15;
  } else if (elementDensity === 'moderate' && (actualDensity < 5 || actualDensity > 10)) {
    score -= 10;
  } else if (elementDensity === 'dense' && actualDensity < 8) {
    score -= 15;
  }

  // Check decorative elements
  const hasDecorativeElements = elements.some(e =>
    ['shape', 'divider', 'pattern'].includes(e.type)
  );

  if (constraints.layoutPreferences.decorativeElements && !hasDecorativeElements) {
    score -= 10; // Missing expected decorative elements
  } else if (!constraints.layoutPreferences.decorativeElements && hasDecorativeElements) {
    score -= 15; // Has decorative elements when shouldn't
  }

  // Check symmetry adherence
  if (constraints.symmetry === 'strict') {
    // Should have mostly centered or symmetrical elements
    const centeredElements = elements.filter(e => e.alignment === 'center').length;
    const symmetryRatio = centeredElements / elements.length;

    if (symmetryRatio < 0.6) {
      score -= 20;
    }
  } else if (constraints.symmetry === 'asymmetric') {
    // Should have varied positions
    const centeredElements = elements.filter(e => e.alignment === 'center').length;
    const symmetryRatio = centeredElements / elements.length;

    if (symmetryRatio > 0.5) {
      score -= 15;
    }
  }

  // Check spacing adherence
  let spacingViolations = 0;
  for (let i = 0; i < elements.length - 1; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      const el1 = elements[i];
      const el2 = elements[j];

      const distance = Math.sqrt(
        Math.pow(el1.position.x - el2.position.x, 2) +
        Math.pow(el1.position.y - el2.position.y, 2)
      );

      if (distance < constraints.minElementSpacing && distance > 0) {
        spacingViolations++;
      }
    }
  }

  score -= spacingViolations * 5;

  return Math.max(0, score);
}

/**
 * Get human-readable score interpretation
 */
export function getScoreInterpretation(score: number): string {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Good';
  if (score >= 70) return 'Fair';
  if (score >= 60) return 'Poor';
  return 'Needs Improvement';
}

/**
 * Get detailed score report
 */
export function getScoreReport(layoutScore: LayoutScore): string {
  const lines: string[] = [];

  lines.push(`Overall Score: ${layoutScore.total}/100 (${getScoreInterpretation(layoutScore.total)})`);
  lines.push('');
  lines.push('Breakdown:');
  lines.push(`  Hierarchy: ${layoutScore.breakdown.hierarchy}/100`);
  lines.push(`  Whitespace: ${layoutScore.breakdown.whitespace}/100`);
  lines.push(`  Alignment: ${layoutScore.breakdown.alignment}/100`);
  lines.push(`  Balance: ${layoutScore.breakdown.balance}/100`);
  lines.push(`  Proximity: ${layoutScore.breakdown.proximity}/100`);
  lines.push(`  Contrast: ${layoutScore.breakdown.contrast}/100`);
  lines.push(`  Rule of Thirds: ${layoutScore.breakdown.ruleOfThirds}/100`);
  lines.push(`  Vibe Adherence: ${layoutScore.breakdown.vibeAdherence}/100`);

  if (layoutScore.issues.length > 0) {
    lines.push('');
    lines.push('Issues:');
    layoutScore.issues.forEach(issue => lines.push(`  - ${issue}`));
  }

  if (layoutScore.suggestions.length > 0) {
    lines.push('');
    lines.push('Suggestions:');
    layoutScore.suggestions.forEach(suggestion => lines.push(`  - ${suggestion}`));
  }

  return lines.join('\n');
}

/**
 * Compare two layouts and return the better one
 */
export function comparLayouts(
  layout1: { elements: LayoutElement[]; score: LayoutScore },
  layout2: { elements: LayoutElement[]; score: LayoutScore }
): number {
  // Return 1 if layout1 is better, -1 if layout2 is better, 0 if equal
  if (layout1.score.total > layout2.score.total) return 1;
  if (layout1.score.total < layout2.score.total) return -1;

  // If scores are equal, prefer fewer elements (simpler)
  if (layout1.elements.length < layout2.elements.length) return 1;
  if (layout1.elements.length > layout2.elements.length) return -1;

  return 0;
}
