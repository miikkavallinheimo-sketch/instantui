import type { ColorSet } from "./types";
import { hexToHsl, hslToHex } from "./colorUtils";

// Helper: Add slight randomization while maintaining bounds
const randomizeValue = (base: number, variance: number, min: number, max: number): number => {
  const offset = (Math.random() - 0.5) * 2 * variance;
  return Math.max(min, Math.min(max, base + offset));
};

/**
 * Optimizes typography colors by adjusting lightness/saturation of text elements
 * Creates visual hierarchy through color variation while maintaining readability
 */
export function optimizeTypographyColors(
  colors: ColorSet
): {
  heading: string;
  subheading: string;
  body: string;
  accent: string;
} {
  const textHsl = hexToHsl(colors.text);

  // Create hierarchy through color adjustments
  // If text is already very light (>80 lightness), use saturation instead of lightness
  const isLightText = textHsl.l > 80;

  // H1: Darkest - base text color for maximum contrast
  const headingColor = colors.text;

  // H2/Subheading: Creates visual hierarchy
  let subheadingLightness: number;
  let subheadingSaturation: number;

  if (isLightText) {
    // For light text: reduce saturation to make it more gray/muted
    subheadingLightness = randomizeValue(textHsl.l - 5, 3, 70, 100); // Slightly darker
    subheadingSaturation = randomizeValue(textHsl.s - 50, 5, 0, 20); // Much less saturated (more gray)
  } else {
    // For dark text: increase lightness
    subheadingLightness = randomizeValue(textHsl.l + 35, 5, 60, 95);
    subheadingSaturation = randomizeValue(textHsl.s - 15, 4, 10, 50);
  }

  const subheadingColor = hslToHex(
    textHsl.h,
    subheadingSaturation,
    subheadingLightness
  );

  // Body: Medium contrast
  let bodyLightness: number;
  let bodySaturation: number;

  if (isLightText) {
    // For light text: reduce saturation more than subheading
    bodyLightness = randomizeValue(textHsl.l - 10, 4, 60, 100); // More noticeably darker
    bodySaturation = randomizeValue(textHsl.s - 70, 5, 0, 15); // Even more gray
  } else {
    // For dark text: increase lightness less than subheading
    bodyLightness = randomizeValue(textHsl.l + 15, 4, 20, 70);
    bodySaturation = randomizeValue(textHsl.s - 8, 3, 10, 50);
  }

  const bodyColor = hslToHex(
    textHsl.h,
    bodySaturation,
    bodyLightness
  );

  // Accent: More saturated and contrasting for call-to-action
  // Use accent color's hue but adjust for prominence with variation
  const accentHsl = hexToHsl(colors.accent);
  const accentSaturation = randomizeValue(accentHsl.s + 10, 5, 60, 100);
  const accentLightness = randomizeValue(accentHsl.l - 8, 4, 20, 60);
  const accentColor = hslToHex(
    accentHsl.h,
    accentSaturation,
    accentLightness
  );

  return {
    heading: headingColor,
    subheading: subheadingColor,
    body: bodyColor,
    accent: accentColor,
  };
}

/**
 * Alternative: Dark background variant
 * For designs with darker backgrounds, increase lightness instead
 */
export function optimizeTypographyColorsDark(
  colors: ColorSet
): {
  heading: string;
  subheading: string;
  body: string;
  accent: string;
} {
  const textHsl = hexToHsl(colors.text);

  // For dark backgrounds, create hierarchy by adjusting lightness
  // If text is already very light (>80 lightness), use saturation instead
  const isLightText = textHsl.l > 80;

  // H1: Lightest/brightest for maximum contrast on dark bg
  const headingColor = colors.text;

  // H2: Create visual hierarchy
  let subheadingLightness: number;
  let subheadingSaturation: number;

  if (isLightText) {
    // For light text on dark bg: reduce saturation
    subheadingLightness = randomizeValue(textHsl.l - 8, 4, 70, 100);
    subheadingSaturation = randomizeValue(textHsl.s - 50, 5, 0, 20);
  } else {
    // For dark text: increase lightness
    subheadingLightness = randomizeValue(textHsl.l + 30, 5, 75, 98);
    subheadingSaturation = randomizeValue(textHsl.s - 10, 4, 10, 40);
  }

  const subheadingColor = hslToHex(
    textHsl.h,
    subheadingSaturation,
    subheadingLightness
  );

  // Body: Medium lightness - between heading and subheading
  let bodyLightness: number;
  let bodySaturation: number;

  if (isLightText) {
    // For light text on dark bg: reduce saturation more
    bodyLightness = randomizeValue(textHsl.l - 15, 4, 60, 100);
    bodySaturation = randomizeValue(textHsl.s - 70, 5, 0, 15);
  } else {
    // For dark text: increase lightness less
    bodyLightness = randomizeValue(textHsl.l + 12, 4, 50, 85);
    bodySaturation = randomizeValue(textHsl.s - 5, 3, 10, 40);
  }

  const bodyColor = hslToHex(
    textHsl.h,
    bodySaturation,
    bodyLightness
  );

  const accentHsl = hexToHsl(colors.accent);
  const accentSaturation = randomizeValue(accentHsl.s + 12, 5, 70, 100);
  const accentLightness = randomizeValue(accentHsl.l + 12, 5, 60, 90);
  const accentColor = hslToHex(
    accentHsl.h,
    accentSaturation,
    accentLightness
  );

  return {
    heading: headingColor,
    subheading: subheadingColor,
    body: bodyColor,
    accent: accentColor,
  };
}

/**
 * Choose the appropriate color optimization based on background
 */
export function getOptimizedTypographyColors(
  colors: ColorSet
): {
  heading: string;
  subheading: string;
  body: string;
  accent: string;
} {
  const bgHsl = hexToHsl(colors.background);

  // If background is dark (lightness < 50), use dark variant
  if (bgHsl.l < 50) {
    return optimizeTypographyColorsDark(colors);
  }

  return optimizeTypographyColors(colors);
}
