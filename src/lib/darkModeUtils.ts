import { hexToHsl, hslToHex } from "./colorUtils";
import type { VibePalette } from "./types";

/**
 * Inverts a light-mode palette to dark-mode by:
 * 1. Inverting lightness values (light=95 becomes dark=5, etc.)
 * 2. Keeping hue and saturation largely the same
 * 3. Ensuring contrast is maintained
 */
export function invertPaletteForDarkMode(lightPalette: VibePalette): VibePalette {
  const invertColor = (hex: string, isText: boolean = false): string => {
    const { h, s, l } = hexToHsl(hex);

    // For text colors, invert more aggressively
    // For surfaces, invert with slight adjustment
    let newL: number;

    if (isText) {
      // Light text (#1F2933, l=~15) becomes dark text (~85)
      // Dark text is harder to read, so light mode text becomes light in dark mode
      newL = Math.max(80, 100 - l); // Ensure readability
    } else {
      // Surface colors: invert lightness
      // Light backgrounds (l=~95) become dark (l=~5-10)
      // Light surfaces (l=~100) become dark (l=~8-15)
      // Keep some variation
      newL = Math.max(5, 100 - l);
    }

    // Slightly reduce saturation for dark mode to prevent harshness
    const adjustedS = Math.max(0, s - 5);

    return hslToHex(h, adjustedS, newL);
  };

  return {
    primary: invertColor(lightPalette.primary),
    secondary: invertColor(lightPalette.secondary),
    accent: invertColor(lightPalette.accent),
    background: invertColor(lightPalette.background),
    surface: invertColor(lightPalette.surface),
    surfaceAlt: invertColor(lightPalette.surfaceAlt),
    text: invertColor(lightPalette.text, true), // Light text for dark bg
    textMuted: invertColor(lightPalette.textMuted, true),
    borderSubtle: invertColor(lightPalette.borderSubtle),
    borderStrong: invertColor(lightPalette.borderStrong),
  };
}

/**
 * Create dark variant palette specifically for better contrast in dark UI
 * More nuanced than simple inversion
 */
export function createOptimizedDarkVariant(lightPalette: VibePalette): VibePalette {
  const { h: primaryH, s: primaryS } = hexToHsl(lightPalette.primary);
  const { h: secondaryH, s: secondaryS } = hexToHsl(lightPalette.secondary);
  const { h: accentH, s: accentS } = hexToHsl(lightPalette.accent);

  return {
    // Colors stay similar hue but lighter (neon effect on dark)
    primary: hslToHex(primaryH, Math.min(100, primaryS + 5), 55),
    secondary: hslToHex(secondaryH, Math.min(100, secondaryS + 5), 50),
    accent: hslToHex(accentH, Math.min(100, accentS + 5), 60),

    // Very dark surfaces
    background: "#0A0A0A",
    surface: "#1A1A1A",
    surfaceAlt: "#252525",

    // Light text
    text: "#F5F5F5",
    textMuted: "#B0B0B0",

    // Dark borders
    borderSubtle: "#333333",
    borderStrong: "#555555",
  };
}
