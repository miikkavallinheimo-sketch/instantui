/**
 * Design Algorithm Examples
 * Demonstrates how to use the layout generation system
 */

import {
  generateLayout,
  generateBusinessCardLayout,
  generateBestLayout,
  quickGenerate,
  getScoreReport,
  type LayoutGeneratorConfig,
} from './index';

/**
 * Example 1: Basic web layout generation
 */
export function example1_BasicWebLayout() {
  console.log('=== Example 1: Basic Web Layout ===\n');

  const config: LayoutGeneratorConfig = {
    contentType: 'web',
    vibeId: 'modern-saas',
    colors: {
      primary: '#2563eb',
      secondary: '#7c3aed',
      accent: '#ec4899',
      background: '#ffffff',
      text: '#1e293b',
    },
    content: {
      heading: 'Welcome to Our Platform',
      subheading: 'Build amazing products faster',
      body: 'Start creating today with our powerful tools and intuitive interface',
    },
    canvasSize: { width: 1200, height: 800 },
  };

  const layout = generateLayout(config);

  console.log('Generated Layout ID:', layout.id);
  console.log('Score:', layout.score.total, '/100');
  console.log('Elements:', layout.elements.length);
  console.log('Iterations:', layout.metadata.iterations);
  console.log('\nScore Breakdown:');
  console.log(getScoreReport(layout.score));

  return layout;
}

/**
 * Example 2: Minimal vibe layout
 */
export function example2_MinimalVibe() {
  console.log('\n=== Example 2: Minimal Vibe ===\n');

  const config: LayoutGeneratorConfig = {
    contentType: 'web',
    vibeId: 'minimal',
    colors: {
      primary: '#000000',
      secondary: '#404040',
      accent: '#808080',
      background: '#ffffff',
      text: '#000000',
    },
    content: {
      heading: 'Simplicity',
      subheading: 'Less is more',
    },
    canvasSize: { width: 1200, height: 800 },
  };

  const layout = generateLayout(config);

  console.log('Minimal Layout Score:', layout.score.total, '/100');
  console.log('Elements:', layout.elements.length, '(should be <= 5)');
  console.log('Whitespace Score:', layout.score.breakdown.whitespace, '(should be high)');

  return layout;
}

/**
 * Example 3: Luxury vibe with golden ratio
 */
export function example3_LuxuryVibe() {
  console.log('\n=== Example 3: Luxury Vibe ===\n');

  const config: LayoutGeneratorConfig = {
    contentType: 'web',
    vibeId: 'luxury',
    colors: {
      primary: '#d4af37',
      secondary: '#1a1a1a',
      accent: '#c0c0c0',
      background: '#ffffff',
      text: '#1a1a1a',
    },
    content: {
      heading: 'Elegance Redefined',
      subheading: 'Experience luxury in every detail',
      body: 'Crafted with precision and care',
    },
    canvasSize: { width: 1200, height: 800 },
  };

  const layout = generateLayout(config);

  console.log('Luxury Layout Score:', layout.score.total, '/100');
  console.log('Balance Score:', layout.score.breakdown.balance, '(should be high)');
  console.log('Uses Golden Ratio: Yes');

  return layout;
}

/**
 * Example 4: Brutalist vibe
 */
export function example4_BrutalistVibe() {
  console.log('\n=== Example 4: Brutalist Vibe ===\n');

  const config: LayoutGeneratorConfig = {
    contentType: 'web',
    vibeId: 'brutalist',
    colors: {
      primary: '#ff0000',
      secondary: '#000000',
      accent: '#ffff00',
      background: '#ffffff',
      text: '#000000',
    },
    content: {
      heading: 'BOLD STATEMENT',
      subheading: 'Unapologetically different',
      body: 'Breaking conventions with purpose',
    },
    canvasSize: { width: 1200, height: 800 },
  };

  const layout = generateLayout(config);

  console.log('Brutalist Layout Score:', layout.score.total, '/100');
  console.log('Elements:', layout.elements.length, '(can be up to 12)');
  console.log('Symmetry: Asymmetric');

  return layout;
}

/**
 * Example 5: Business card generation
 */
export function example5_BusinessCard() {
  console.log('\n=== Example 5: Business Card ===\n');

  const config: LayoutGeneratorConfig = {
    contentType: 'business-card',
    vibeId: 'luxury',
    colors: {
      primary: '#1a1a1a',
      secondary: '#d4af37',
      accent: '#c0c0c0',
      background: '#ffffff',
      text: '#1a1a1a',
    },
    content: {
      heading: 'John Doe',
      subheading: 'Creative Director',
      contactInfo: [
        'john@example.com',
        '+1 (555) 123-4567',
        'www.example.com',
      ],
    },
    canvasSize: { width: 1050, height: 600 }, // 3.5" × 2" at 300 DPI
  };

  const card = generateBusinessCardLayout(config);

  console.log('Business Card Score:', card.score.total, '/100');
  console.log('Elements:', card.elements.length);
  console.log('Dimensions:', '3.5" × 2" (standard)');
  console.log('Safe zone: 3mm from edges');

  return card;
}

/**
 * Example 6: Generate multiple and pick best
 */
export function example6_GenerateBest() {
  console.log('\n=== Example 6: Generate Best of 10 ===\n');

  const config: LayoutGeneratorConfig = {
    contentType: 'web',
    vibeId: 'modern-saas',
    colors: {
      primary: '#2563eb',
      secondary: '#7c3aed',
      accent: '#ec4899',
      background: '#ffffff',
      text: '#1e293b',
    },
    content: {
      heading: 'Transform Your Workflow',
      subheading: 'Productivity meets elegance',
      body: 'Tools designed for modern teams',
    },
    canvasSize: { width: 1200, height: 800 },
  };

  const startTime = Date.now();
  const bestLayout = generateBestLayout(config, 10);
  const endTime = Date.now();

  console.log('Generated 10 layouts, picked best');
  console.log('Best Score:', bestLayout.score.total, '/100');
  console.log('Time taken:', endTime - startTime, 'ms');

  return bestLayout;
}

/**
 * Example 7: Quick generation with defaults
 */
export function example7_QuickGenerate() {
  console.log('\n=== Example 7: Quick Generate ===\n');

  const layout = quickGenerate('cyber-mint', 'web', {
    heading: 'Future is Now',
    subheading: 'Embrace the digital age',
  });

  console.log('Quick Layout Score:', layout.score.total, '/100');
  console.log('Vibe:', 'cyber-mint');

  return layout;
}

/**
 * Example 8: Reproducible layouts with seeds
 */
export function example8_ReproducibleLayouts() {
  console.log('\n=== Example 8: Reproducible Layouts ===\n');

  const config: LayoutGeneratorConfig = {
    contentType: 'web',
    vibeId: 'minimal',
    colors: {
      primary: '#000000',
      secondary: '#404040',
      accent: '#808080',
      background: '#ffffff',
      text: '#000000',
    },
    content: {
      heading: 'Consistency',
    },
    canvasSize: { width: 1200, height: 800 },
    seed: 0.42, // Fixed seed
  };

  const layout1 = generateLayout(config);
  const layout2 = generateLayout(config);

  console.log('Layout 1 seed:', layout1.metadata.seed);
  console.log('Layout 2 seed:', layout2.metadata.seed);
  console.log('Layouts identical:', layout1.metadata.seed === layout2.metadata.seed);
  console.log('Element count 1:', layout1.elements.length);
  console.log('Element count 2:', layout2.elements.length);

  return { layout1, layout2 };
}

/**
 * Example 9: All 12 vibes comparison
 */
export function example9_CompareAllVibes() {
  console.log('\n=== Example 9: Compare All 12 Vibes ===\n');

  const vibes = [
    'minimal',
    'luxury',
    'modern-saas',
    'dark-tech',
    'brutalist',
    'pastel',
    'retro-pixel',
    'warm-editorial',
    'soft-neo-tech',
    'gradient-bloom',
    'cyber-mint',
    'magazine-brutalism',
  ];

  const results = vibes.map(vibeId => {
    const config: LayoutGeneratorConfig = {
      contentType: 'web',
      vibeId,
      colors: {
        primary: '#2563eb',
        secondary: '#7c3aed',
        accent: '#ec4899',
        background: '#ffffff',
        text: '#1e293b',
      },
      content: {
        heading: 'Design System',
      },
      canvasSize: { width: 1200, height: 800 },
    };

    const layout = generateLayout(config, { maxIterations: 20 });

    return {
      vibe: vibeId,
      score: layout.score.total,
      elements: layout.elements.length,
      iterations: layout.metadata.iterations,
    };
  });

  console.log('Vibe Comparison:');
  console.table(results);

  return results;
}

/**
 * Example 10: Score breakdown analysis
 */
export function example10_ScoreBreakdown() {
  console.log('\n=== Example 10: Score Breakdown Analysis ===\n');

  const config: LayoutGeneratorConfig = {
    contentType: 'web',
    vibeId: 'modern-saas',
    colors: {
      primary: '#2563eb',
      secondary: '#7c3aed',
      accent: '#ec4899',
      background: '#ffffff',
      text: '#1e293b',
    },
    content: {
      heading: 'Score Analysis',
      subheading: 'Understanding design quality',
      body: 'Each principle contributes to the overall score',
    },
    canvasSize: { width: 1200, height: 800 },
  };

  const layout = generateLayout(config);

  console.log('Total Score:', layout.score.total, '/100\n');
  console.log('Individual Scores:');
  console.log('  Hierarchy:      ', layout.score.breakdown.hierarchy, '/100');
  console.log('  Whitespace:     ', layout.score.breakdown.whitespace, '/100');
  console.log('  Alignment:      ', layout.score.breakdown.alignment, '/100');
  console.log('  Balance:        ', layout.score.breakdown.balance, '/100');
  console.log('  Proximity:      ', layout.score.breakdown.proximity, '/100');
  console.log('  Contrast:       ', layout.score.breakdown.contrast, '/100');
  console.log('  Rule of Thirds: ', layout.score.breakdown.ruleOfThirds, '/100');
  console.log('  Vibe Adherence: ', layout.score.breakdown.vibeAdherence, '/100');

  if (layout.score.issues.length > 0) {
    console.log('\nIssues:');
    layout.score.issues.forEach(issue => console.log('  -', issue));
  }

  if (layout.score.suggestions.length > 0) {
    console.log('\nSuggestions:');
    layout.score.suggestions.forEach(suggestion => console.log('  -', suggestion));
  }

  return layout;
}

/**
 * Run all examples
 */
export function runAllExamples() {
  example1_BasicWebLayout();
  example2_MinimalVibe();
  example3_LuxuryVibe();
  example4_BrutalistVibe();
  example5_BusinessCard();
  example6_GenerateBest();
  example7_QuickGenerate();
  example8_ReproducibleLayouts();
  example9_CompareAllVibes();
  example10_ScoreBreakdown();

  console.log('\n✅ All examples completed!');
}
