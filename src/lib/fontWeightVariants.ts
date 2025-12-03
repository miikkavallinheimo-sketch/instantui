/**
 * Font weight variants and combinations
 * Supports various weight levels for semantic text hierarchy
 */

export const fontWeightVariants = {
  // Individual weights
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

export type FontWeightName = keyof typeof fontWeightVariants;
export type FontWeightValue = (typeof fontWeightVariants)[FontWeightName];

/**
 * Common font weight combinations for typography
 */
export const fontWeightCombinations = {
  // Display / Heading variants
  displayBold: fontWeightVariants.bold,
  displaySemibold: fontWeightVariants.semibold,
  displayMedium: fontWeightVariants.medium,

  // Heading variants
  headingBold: fontWeightVariants.bold,
  headingSemibold: fontWeightVariants.semibold,
  headingMedium: fontWeightVariants.medium,

  // Subheading variants
  subheadingBold: fontWeightVariants.semibold,
  subheadingMedium: fontWeightVariants.medium,
  subheadingRegular: fontWeightVariants.normal,

  // Body text variants
  bodyBold: fontWeightVariants.semibold,
  bodyRegular: fontWeightVariants.normal,
  bodyMedium: fontWeightVariants.medium,
  bodyLight: fontWeightVariants.light,

  // Accent/Emphasis
  accentBold: fontWeightVariants.bold,
  accentMedium: fontWeightVariants.semibold,

  // Special/UI text
  uiBold: fontWeightVariants.semibold,
  uiRegular: fontWeightVariants.normal,
  uiMedium: fontWeightVariants.medium,

  // Label/Caption variants
  labelBold: fontWeightVariants.semibold,
  labelRegular: fontWeightVariants.normal,
  labelLight: fontWeightVariants.light,
} as const;

export type FontWeightCombinationName =
  keyof typeof fontWeightCombinations;
export type FontWeightCombinationValue =
  (typeof fontWeightCombinations)[FontWeightCombinationName];

/**
 * Get font weight value by name
 */
export function getFontWeight(
  name: FontWeightName | FontWeightCombinationName
): number {
  return (
    (fontWeightVariants[name as FontWeightName] ||
      fontWeightCombinations[name as FontWeightCombinationName]) ?? 400
  );
}

/**
 * Get CSS font-weight value with fallback
 */
export function getCSSFontWeight(weight: number | string): string | number {
  if (typeof weight === "number") {
    return weight;
  }
  return getFontWeight(weight as FontWeightName);
}

/**
 * Font weight scale for responsive typography
 * Maps semantic names to actual weights
 */
export const fontWeightScale = {
  light: fontWeightVariants.light,
  regular: fontWeightVariants.normal,
  medium: fontWeightVariants.medium,
  semibold: fontWeightVariants.semibold,
  bold: fontWeightVariants.bold,
} as const;

export type FontWeightScaleName = keyof typeof fontWeightScale;
