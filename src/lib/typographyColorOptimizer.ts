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

  // Create hierarchy through lightness adjustments
  // H1: Base text color (full contrast)
  const headingColor = colors.text;

  // H2/Subheading: Visually lighter for hierarchy with slight variation
  // Base: lightness +18, saturation -15, with ±5 point variance
  const subheadingLightness = randomizeValue(textHsl.l + 18, 5, 60, 85);
  const subheadingSaturation = randomizeValue(textHsl.s - 15, 4, 10, 40);
  const subheadingColor = hslToHex(
    textHsl.h,
    subheadingSaturation,
    subheadingLightness
  );

  // Body: Standard text color (same as heading for readability)
  const bodyColor = colors.text;

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
  const headingColor = colors.text;

  // H2: Make lighter for hierarchy on dark backgrounds with variation
  const subheadingLightness = randomizeValue(textHsl.l + 15, 5, 70, 90);
  const subheadingSaturation = randomizeValue(textHsl.s - 10, 4, 5, 30);
  const subheadingColor = hslToHex(
    textHsl.h,
    subheadingSaturation,
    subheadingLightness
  );

  const bodyColor = colors.text;

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
