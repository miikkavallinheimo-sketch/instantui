import { contrastRatio, hexToHsl, hslToHex, hexToLuminance } from "./colorUtils";
import type { DesignState, ColorSet } from "./types";

export interface ContrastCheck {
  foreground: string;
  background: string;
  ratio: number;
  aaCompliant: boolean; // >= 4.5:1
  aaaCompliant: boolean; // >= 7:1
  label: string;
  severity: "pass" | "warn" | "fail";
}

/**
 * Check if a contrast ratio meets WCAG AA standard (4.5:1)
 */
export function isAACompliant(ratio: number): boolean {
  return ratio >= 4.5;
}

/**
 * Check if a contrast ratio meets WCAG AAA standard (7:1)
 */
export function isAAACompliant(ratio: number): boolean {
  return ratio >= 7;
}

/**
 * Get severity level for a contrast violation
 */
export function getContrastSeverity(
  ratio: number
): "pass" | "warn" | "fail" {
  if (isAAACompliant(ratio)) return "pass";
  if (isAACompliant(ratio)) return "warn";
  return "fail";
}

/**
 * Check all critical text/background color combinations in a design
 */
export function checkDesignContrast(designState: DesignState): ContrastCheck[] {
  const { colors, vibe } = designState;

  const checks: ContrastCheck[] = [];

  // Body text on backgrounds
  const bodyOnBg = contrastRatio(colors.text, colors.background);
  checks.push({
    foreground: colors.text,
    background: colors.background,
    ratio: bodyOnBg,
    aaCompliant: isAACompliant(bodyOnBg),
    aaaCompliant: isAAACompliant(bodyOnBg),
    label: "Body text on background",
    severity: getContrastSeverity(bodyOnBg),
  });

  // Body text on surface
  const bodyOnSurface = contrastRatio(colors.text, colors.surface);
  checks.push({
    foreground: colors.text,
    background: colors.surface,
    ratio: bodyOnSurface,
    aaCompliant: isAACompliant(bodyOnSurface),
    aaaCompliant: isAAACompliant(bodyOnSurface),
    label: "Body text on surface",
    severity: getContrastSeverity(bodyOnSurface),
  });

  // Muted text on background
  const mutedOnBg = contrastRatio(colors.textMuted, colors.background);
  checks.push({
    foreground: colors.textMuted,
    background: colors.background,
    ratio: mutedOnBg,
    aaCompliant: isAACompliant(mutedOnBg),
    aaaCompliant: isAAACompliant(mutedOnBg),
    label: "Muted text on background",
    severity: getContrastSeverity(mutedOnBg),
  });

  // Text on primary
  const textOnPrimary = contrastRatio(colors.onPrimary, colors.primary);
  checks.push({
    foreground: colors.onPrimary,
    background: colors.primary,
    ratio: textOnPrimary,
    aaCompliant: isAACompliant(textOnPrimary),
    aaaCompliant: isAAACompliant(textOnPrimary),
    label: "Text on primary color",
    severity: getContrastSeverity(textOnPrimary),
  });

  // Text on secondary
  const textOnSecondary = contrastRatio(
    colors.onSecondary,
    colors.secondary
  );
  checks.push({
    foreground: colors.onSecondary,
    background: colors.secondary,
    ratio: textOnSecondary,
    aaCompliant: isAACompliant(textOnSecondary),
    aaaCompliant: isAAACompliant(textOnSecondary),
    label: "Text on secondary color",
    severity: getContrastSeverity(textOnSecondary),
  });

  // Text on accent
  const textOnAccent = contrastRatio(colors.onAccent, colors.accent);
  checks.push({
    foreground: colors.onAccent,
    background: colors.accent,
    ratio: textOnAccent,
    aaCompliant: isAACompliant(textOnAccent),
    aaaCompliant: isAAACompliant(textOnAccent),
    label: "Text on accent color",
    severity: getContrastSeverity(textOnAccent),
  });

  return checks;
}

/**
 * Get count of WCAG violations
 */
export function getContrastViolations(checks: ContrastCheck[]): {
  aa: number;
  aaa: number;
} {
  return {
    aa: checks.filter((c) => !c.aaCompliant).length,
    aaa: checks.filter((c) => !c.aaaCompliant).length,
  };
}

/**
 * Adjust text color lightness to meet minimum contrast ratio
 */
function adjustTextLightnessForContrast(
  textColor: string,
  backgroundColor: string,
  targetRatio: number
): string {
  const { h, s, l: originalL } = hexToHsl(textColor);
  const bgLum = hexToLuminance(backgroundColor);
  const isLightBg = bgLum > 0.5; // light bg if luminance is above 50%

  // For muted text (low saturation), constrain lightness to stay somewhat neutral
  // For other text (higher saturation), allow wider range
  const isMuted = s < 20;
  const [minL, maxL] = isMuted
    ? isLightBg
      ? [40, 70] // medium-dark gray for light backgrounds
      : [30, 60] // medium gray for dark backgrounds
    : [0, 100]; // full range for saturated colors

  // Binary search within constrained range
  let searchMin = minL;
  let searchMax = maxL;
  let bestL = originalL;

  for (let i = 0; i < 20; i++) {
    const midL = (searchMin + searchMax) / 2;
    const testColor = hslToHex(h, s, midL);
    const ratio = contrastRatio(testColor, backgroundColor);

    if (ratio >= targetRatio) {
      // Ratio is good, try to push further for better contrast
      bestL = midL;
      if (isLightBg) {
        searchMax = midL; // search darker
      } else {
        searchMin = midL; // search lighter
      }
    } else {
      // Ratio not sufficient, need to go further in the appropriate direction
      if (isLightBg) {
        searchMin = midL; // go darker
      } else {
        searchMax = midL; // go lighter
      }
    }
  }

  return hslToHex(h, s, bestL);
}

/**
 * Fix all colors in design to meet WCAG standard
 */
export function fixContrastToWCAG(
  colors: ColorSet,
  target: "aa" | "aaa" = "aa"
): ColorSet {
  const targetRatio = target === "aaa" ? 7 : 4.5;

  return {
    ...colors,
    text: adjustTextLightnessForContrast(colors.text, colors.background, targetRatio),
    textMuted: adjustTextLightnessForContrast(colors.textMuted, colors.background, 3),
    onPrimary: adjustTextLightnessForContrast(colors.onPrimary, colors.primary, targetRatio),
    onSecondary: adjustTextLightnessForContrast(colors.onSecondary, colors.secondary, targetRatio),
    onAccent: adjustTextLightnessForContrast(colors.onAccent, colors.accent, targetRatio),
  };
}
