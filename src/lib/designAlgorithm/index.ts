/**
 * Design Algorithm System
 * Automatic layout generation with professional design principles
 *
 * @example
 * ```ts
 * import { generateLayout } from './lib/designAlgorithm';
 *
 * const layout = generateLayout({
 *   contentType: 'web',
 *   vibeId: 'modern-saas',
 *   colors: {
 *     primary: '#2563eb',
 *     secondary: '#7c3aed',
 *     accent: '#ec4899',
 *     background: '#ffffff',
 *     text: '#1e293b',
 *   },
 *   content: {
 *     heading: 'Welcome to Our Platform',
 *     subheading: 'Build amazing products faster',
 *     body: 'Start creating today with our powerful tools',
 *   },
 *   canvasSize: { width: 1200, height: 800 },
 * });
 *
 * console.log('Layout Score:', layout.score.total);
 * ```
 */

// Export types
export * from './types';

// Export main generators
export { generateLayout } from './layoutGenerator';
export { generateBusinessCardLayout } from './businessCardGenerator';

// Export design principles
export * from './designPrinciples';

// Export scoring system
export {
  evaluateLayout,
  getScoreInterpretation,
  getScoreReport,
  comparLayouts,
} from './scoring';

// Export vibe constraints
export { getVibeConstraints, VIBE_CONSTRAINTS, BUSINESS_CARD_CONSTRAINTS } from './vibeConstraints';

import type { GeneratedLayout, LayoutGeneratorConfig, AlgorithmOptions } from './types';
import { generateLayout } from './layoutGenerator';
import { generateBusinessCardLayout } from './businessCardGenerator';

/**
 * Main entry point - generates a layout based on config
 * Automatically chooses between web and business card generators
 */
export function createLayout(
  config: LayoutGeneratorConfig,
  options?: Partial<AlgorithmOptions>
): GeneratedLayout {
  if (config.contentType === 'business-card') {
    return generateBusinessCardLayout(config);
  } else {
    return generateLayout(config, options);
  }
}

/**
 * Generate multiple layouts and return the best one
 */
export function generateBestLayout(
  config: LayoutGeneratorConfig,
  count: number = 5,
  options?: Partial<AlgorithmOptions>
): GeneratedLayout {
  const layouts: GeneratedLayout[] = [];

  for (let i = 0; i < count; i++) {
    const layout = createLayout(
      {
        ...config,
        seed: (config.seed || Math.random()) + i * 0.1,
      },
      options
    );
    layouts.push(layout);
  }

  // Return layout with highest score
  return layouts.reduce((best, current) =>
    current.score.total > best.score.total ? current : best
  );
}

/**
 * Quick generation with default settings
 */
export function quickGenerate(
  vibeId: string,
  contentType: 'web' | 'business-card' = 'web',
  content: {
    heading?: string;
    subheading?: string;
    body?: string;
  } = {}
): GeneratedLayout {
  const defaultColors = {
    primary: '#2563eb',
    secondary: '#7c3aed',
    accent: '#ec4899',
    background: '#ffffff',
    text: '#1e293b',
  };

  const defaultCanvasSize =
    contentType === 'business-card'
      ? { width: 1050, height: 600 } // 3.5" × 2" at 300 DPI
      : { width: 1200, height: 800 };

  const defaultContent = {
    heading: content.heading || 'Your Heading Here',
    subheading: content.subheading || 'Your subheading text',
    body: content.body || 'Body content goes here with more details',
  };

  return createLayout({
    contentType,
    vibeId,
    colors: defaultColors,
    content: defaultContent,
    canvasSize: defaultCanvasSize,
  });
}
