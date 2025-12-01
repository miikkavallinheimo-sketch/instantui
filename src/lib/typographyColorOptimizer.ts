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
  const muteHsl = hexToHsl(colors.textMuted);

  // Create hierarchy through lightness adjustments
  // H1: Base text color (full contrast)
  const headingColor = colors.text;

  // H2/Subheading: Slightly lighter/desaturated for visual hierarchy
  // Reduce saturation by 10% and increase lightness by 8%
  const subheadingLightness = Math.min(textHsl.l + 8, 95);
  const subheadingSaturation = Math.max(textHsl.s - 10, 20);
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
    Math.min(accentHsl.s + 5, 100), // Slightly more saturated
    Math.max(accentHsl.l - 5, 30) // Slightly darker for contrast
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

  // For dark backgrounds, create hierarchy by reducing saturation
  const headingColor = colors.text;

  // H2: Keep same hue but reduce saturation for subtlety
  const subheadingLightness = Math.max(textHsl.l - 5, 40); // Slightly darker
  const subheadingSaturation = Math.max(textHsl.s - 15, 10); // Much less saturated
  const subheadingColor = hslToHex(
    textHsl.h,
    subheadingSaturation,
    subheadingLightness
  );

  const bodyColor = colors.text;

  const accentHsl = hexToHsl(colors.accent);
  const accentColor = hslToHex(
    accentHsl.h,
    Math.min(accentHsl.s + 10, 100),
    Math.min(accentHsl.l + 10, 90) // Lighter for visibility on dark
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
