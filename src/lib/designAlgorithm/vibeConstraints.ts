/**
 * Vibe-Specific Design Constraints
 * Defines layout rules and preferences for each design vibe
 */

import type { VibeConstraints } from './types';

const GOLDEN_RATIO = 1.618;

/**
 * Minimal Vibe - Maximum whitespace, minimum elements
 */
const MINIMAL: VibeConstraints = {
  vibeId: 'minimal',
  vibeName: 'Minimal',
  minWhitespace: 60, // 60% whitespace minimum
  maxElements: 5,
  minElementSpacing: 40,
  scaleRatios: [1, 1.5, 2],
  alignmentGrid: 16,
  symmetry: 'strict',
  balanceWeight: 0.9,
  useGoldenRatio: false,
  useRuleOfThirds: true,
  primaryCharacteristics: ['spacious', 'clean', 'understated'],
  layoutPreferences: {
    preferredColumns: [1, 2],
    preferredRows: [2, 3],
    elementDensity: 'sparse',
    decorativeElements: false,
  },
};

/**
 * Luxury Vibe - Golden ratio, symmetry, elegance
 */
const LUXURY: VibeConstraints = {
  vibeId: 'luxury',
  vibeName: 'Luxury',
  minWhitespace: 50,
  maxElements: 7,
  minElementSpacing: 32,
  scaleRatios: [1, GOLDEN_RATIO, GOLDEN_RATIO * GOLDEN_RATIO],
  alignmentGrid: 8,
  symmetry: 'strict',
  balanceWeight: 1.0, // Perfect balance required
  useGoldenRatio: true,
  useRuleOfThirds: false, // Prefers center alignment
  primaryCharacteristics: ['elegant', 'refined', 'balanced'],
  layoutPreferences: {
    preferredColumns: [2, 3],
    preferredRows: [3, 4],
    elementDensity: 'moderate',
    decorativeElements: true,
  },
};

/**
 * Modern SaaS - Bold, asymmetric, dynamic
 */
const MODERN_SAAS: VibeConstraints = {
  vibeId: 'modern-saas',
  vibeName: 'Modern SaaS',
  minWhitespace: 40,
  maxElements: 10,
  minElementSpacing: 24,
  scaleRatios: [1, 1.5, 2, 3],
  alignmentGrid: 12,
  symmetry: 'asymmetric',
  balanceWeight: 0.7,
  useGoldenRatio: false,
  useRuleOfThirds: true,
  primaryCharacteristics: ['bold', 'dynamic', 'contemporary'],
  layoutPreferences: {
    preferredColumns: [3, 4],
    preferredRows: [3, 4, 5],
    elementDensity: 'moderate',
    decorativeElements: true,
  },
};

/**
 * Dark Tech - High contrast, geometric, structured
 */
const DARK_TECH: VibeConstraints = {
  vibeId: 'dark-tech',
  vibeName: 'Dark Tech',
  minWhitespace: 45,
  maxElements: 8,
  minElementSpacing: 20,
  scaleRatios: [1, 1.5, 2, 3],
  alignmentGrid: 16,
  symmetry: 'loose',
  balanceWeight: 0.8,
  useGoldenRatio: false,
  useRuleOfThirds: true,
  primaryCharacteristics: ['technical', 'precise', 'structured'],
  layoutPreferences: {
    preferredColumns: [3, 4],
    preferredRows: [3, 4],
    elementDensity: 'moderate',
    decorativeElements: true,
  },
};

/**
 * Brutalist - Bold asymmetry, strong grid, raw
 */
const BRUTALIST: VibeConstraints = {
  vibeId: 'brutalist',
  vibeName: 'Brutalist',
  minWhitespace: 30,
  maxElements: 12,
  minElementSpacing: 16,
  scaleRatios: [1, 2, 3, 4],
  alignmentGrid: 20,
  symmetry: 'asymmetric',
  balanceWeight: 0.5,
  useGoldenRatio: false,
  useRuleOfThirds: false,
  primaryCharacteristics: ['bold', 'unconventional', 'grid-based'],
  layoutPreferences: {
    preferredColumns: [3, 4, 5],
    preferredRows: [4, 5, 6],
    elementDensity: 'dense',
    decorativeElements: false,
  },
};

/**
 * Pastel - Soft, balanced, gentle
 */
const PASTEL: VibeConstraints = {
  vibeId: 'pastel',
  vibeName: 'Pastel',
  minWhitespace: 55,
  maxElements: 7,
  minElementSpacing: 28,
  scaleRatios: [1, 1.4, 1.8],
  alignmentGrid: 12,
  symmetry: 'loose',
  balanceWeight: 0.85,
  useGoldenRatio: false,
  useRuleOfThirds: true,
  primaryCharacteristics: ['soft', 'harmonious', 'gentle'],
  layoutPreferences: {
    preferredColumns: [2, 3],
    preferredRows: [3, 4],
    elementDensity: 'sparse',
    decorativeElements: true,
  },
};

/**
 * Retro Pixel - Grid-based, boxy, nostalgic
 */
const RETRO_PIXEL: VibeConstraints = {
  vibeId: 'retro-pixel',
  vibeName: 'Retro Pixel',
  minWhitespace: 35,
  maxElements: 10,
  minElementSpacing: 16,
  scaleRatios: [1, 2, 3],
  alignmentGrid: 16, // Strict 16px grid
  symmetry: 'strict',
  balanceWeight: 0.8,
  useGoldenRatio: false,
  useRuleOfThirds: false,
  primaryCharacteristics: ['geometric', 'structured', 'nostalgic'],
  layoutPreferences: {
    preferredColumns: [3, 4],
    preferredRows: [3, 4, 5],
    elementDensity: 'moderate',
    decorativeElements: true,
  },
};

/**
 * Warm Editorial - Asymmetric, organic, flowing
 */
const WARM_EDITORIAL: VibeConstraints = {
  vibeId: 'warm-editorial',
  vibeName: 'Warm Editorial',
  minWhitespace: 48,
  maxElements: 9,
  minElementSpacing: 24,
  scaleRatios: [1, 1.6, 2.4],
  alignmentGrid: 8,
  symmetry: 'asymmetric',
  balanceWeight: 0.75,
  useGoldenRatio: true,
  useRuleOfThirds: true,
  primaryCharacteristics: ['editorial', 'warm', 'organic'],
  layoutPreferences: {
    preferredColumns: [2, 3, 4],
    preferredRows: [3, 4, 5],
    elementDensity: 'moderate',
    decorativeElements: true,
  },
};

/**
 * Soft Neo Tech - Rounded, modern, approachable
 */
const SOFT_NEO_TECH: VibeConstraints = {
  vibeId: 'soft-neo-tech',
  vibeName: 'Soft Neo Tech',
  minWhitespace: 45,
  maxElements: 9,
  minElementSpacing: 24,
  scaleRatios: [1, 1.5, 2.25],
  alignmentGrid: 12,
  symmetry: 'loose',
  balanceWeight: 0.8,
  useGoldenRatio: false,
  useRuleOfThirds: true,
  primaryCharacteristics: ['modern', 'friendly', 'balanced'],
  layoutPreferences: {
    preferredColumns: [3, 4],
    preferredRows: [3, 4],
    elementDensity: 'moderate',
    decorativeElements: true,
  },
};

/**
 * Gradient Bloom - Flowing, vibrant, dynamic
 */
const GRADIENT_BLOOM: VibeConstraints = {
  vibeId: 'gradient-bloom',
  vibeName: 'Gradient Bloom',
  minWhitespace: 42,
  maxElements: 10,
  minElementSpacing: 20,
  scaleRatios: [1, 1.6, 2.4, 3.2],
  alignmentGrid: 10,
  symmetry: 'asymmetric',
  balanceWeight: 0.7,
  useGoldenRatio: false,
  useRuleOfThirds: true,
  primaryCharacteristics: ['vibrant', 'flowing', 'energetic'],
  layoutPreferences: {
    preferredColumns: [3, 4],
    preferredRows: [3, 4, 5],
    elementDensity: 'moderate',
    decorativeElements: true,
  },
};

/**
 * Cyber Mint - Futuristic, high-energy, edgy
 */
const CYBER_MINT: VibeConstraints = {
  vibeId: 'cyber-mint',
  vibeName: 'Cyber Mint',
  minWhitespace: 40,
  maxElements: 11,
  minElementSpacing: 18,
  scaleRatios: [1, 1.5, 2.5, 4],
  alignmentGrid: 14,
  symmetry: 'asymmetric',
  balanceWeight: 0.65,
  useGoldenRatio: false,
  useRuleOfThirds: true,
  primaryCharacteristics: ['futuristic', 'dynamic', 'bold'],
  layoutPreferences: {
    preferredColumns: [3, 4, 5],
    preferredRows: [4, 5],
    elementDensity: 'moderate',
    decorativeElements: true,
  },
};

/**
 * Magazine Brutalism - Bold typography, strong grid
 */
const MAGAZINE_BRUTALISM: VibeConstraints = {
  vibeId: 'magazine-brutalism',
  vibeName: 'Magazine Brutalism',
  minWhitespace: 38,
  maxElements: 10,
  minElementSpacing: 20,
  scaleRatios: [1, 2, 3, 5],
  alignmentGrid: 16,
  symmetry: 'asymmetric',
  balanceWeight: 0.6,
  useGoldenRatio: false,
  useRuleOfThirds: false,
  primaryCharacteristics: ['editorial', 'bold', 'grid-focused'],
  layoutPreferences: {
    preferredColumns: [3, 4, 5],
    preferredRows: [4, 5, 6],
    elementDensity: 'dense',
    decorativeElements: false,
  },
};

/**
 * Map of all vibe constraints
 */
export const VIBE_CONSTRAINTS: Record<string, VibeConstraints> = {
  'minimal': MINIMAL,
  'luxury': LUXURY,
  'modern-saas': MODERN_SAAS,
  'dark-tech': DARK_TECH,
  'brutalist': BRUTALIST,
  'pastel': PASTEL,
  'retro-pixel': RETRO_PIXEL,
  'warm-editorial': WARM_EDITORIAL,
  'soft-neo-tech': SOFT_NEO_TECH,
  'gradient-bloom': GRADIENT_BLOOM,
  'cyber-mint': CYBER_MINT,
  'magazine-brutalism': MAGAZINE_BRUTALISM,
  'dark': DARK_TECH, // Alias
};

/**
 * Get constraints for a specific vibe
 */
export function getVibeConstraints(vibeId: string): VibeConstraints {
  return VIBE_CONSTRAINTS[vibeId] || MODERN_SAAS; // Default to modern-saas
}

/**
 * Business card constraints (standard 3.5" × 2" / 88.9mm × 50.8mm)
 */
export const BUSINESS_CARD_CONSTRAINTS = {
  safeZone: { top: 3, right: 3, bottom: 3, left: 3 }, // 3mm safe zone
  minTextSize: 8, // 8pt minimum
  optimalTextSize: 10, // 10-12pt optimal
  logoPositions: ['top-left', 'top-center', 'center', 'bottom-right'] as const,
  textHierarchy: {
    name: 2.0, // 2x base size
    title: 1.2, // 1.2x base size
    contact: 0.9, // 0.9x base size
  },
  dimensions: {
    width: 88.9, // mm
    height: 50.8, // mm
  },
};

/**
 * Convert mm to pixels for business cards
 * Assuming 300 DPI for print quality
 */
export function mmToPixels(mm: number, dpi: number = 300): number {
  return (mm / 25.4) * dpi;
}

/**
 * Convert pt to pixels
 */
export function ptToPixels(pt: number, dpi: number = 72): number {
  return pt * (dpi / 72);
}
