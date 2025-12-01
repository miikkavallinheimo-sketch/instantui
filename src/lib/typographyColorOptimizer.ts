import type { ColorSet } from "./types";
import { hexToHsl, hslToHex } from "./colorUtils";

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

  // H2/Subheading: Visually lighter for hierarchy
  // Increase lightness by 15-20% and reduce saturation slightly
  const subheadingLightness = Math.min(textHsl.l + 18, 85);
  const subheadingSaturation = Math.max(textHsl.s - 15, 15);
  const subheadingColor = hslToHex(
    textHsl.h,
    subheadingSaturation,
    subheadingLightness
  );

  // Body: Standard text color (same as heading for readability)
  const bodyColor = colors.text;

  // Accent: More saturated and contrasting for call-to-action
  // Use accent color's hue but adjust for prominence
  const accentHsl = hexToHsl(colors.accent);
  const accentColor = hslToHex(
    accentHsl.h,
    Math.min(accentHsl.s + 10, 100), // More saturated
    Math.max(accentHsl.l - 8, 25) // Darker for contrast
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

  // H2: Make lighter for hierarchy on dark backgrounds
  const subheadingLightness = Math.min(textHsl.l + 15, 90); // Lighter for hierarchy
  const subheadingSaturation = Math.max(textHsl.s - 10, 10); // Slightly less saturated
  const subheadingColor = hslToHex(
    textHsl.h,
    subheadingSaturation,
    subheadingLightness
  );

  const bodyColor = colors.text;

  const accentHsl = hexToHsl(colors.accent);
  const accentColor = hslToHex(
    accentHsl.h,
    Math.min(accentHsl.s + 12, 100),
    Math.min(accentHsl.l + 12, 90) // Lighter for visibility on dark
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
