/**
 * Shadow Tokens - Advanced shadow system with multi-layered, non-flat shadows
 *
 * Shadows are composed of multiple layers for depth and realism:
 * - Base shadow: Close, subtle shadow
 * - Mid shadow: Medium distance, more prominent
 * - Far shadow: Distant, atmospheric shadow
 */

import type { ShadowToken } from "./types";

export interface ShadowDefinition {
  name: string;
  css: string;
  layers: Array<{
    blur: number;
    spread: number;
    y: number;
    opacity: number;
  }>;
}

// Advanced multi-layered shadows
export const SHADOW_DEFINITIONS: Record<ShadowToken, ShadowDefinition> = {
  none: {
    name: "No shadow",
    css: "none",
    layers: [],
  },

  // xs: Subtle, close shadow
  xs: {
    name: "Extra small",
    css: "0 1px 2px rgba(15, 23, 42, 0.05)",
    layers: [
      { blur: 1, spread: 0, y: 1, opacity: 0.05 },
    ],
  },

  // sm: Small, layered shadow
  sm: {
    name: "Small",
    css: "0 1px 3px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(15, 23, 42, 0.06)",
    layers: [
      { blur: 3, spread: 0, y: 1, opacity: 0.08 },
      { blur: 6, spread: 0, y: 2, opacity: 0.06 },
    ],
  },

  // md: Medium shadow with multiple layers
  md: {
    name: "Medium",
    css: "0 4px 8px rgba(15, 23, 42, 0.15), 0 8px 16px rgba(15, 23, 42, 0.15)",
    layers: [
      { blur: 8, spread: 0, y: 4, opacity: 0.15 },
      { blur: 16, spread: 0, y: 8, opacity: 0.15 },
    ],
  },

  // lg: Large, elevated shadow
  lg: {
    name: "Large",
    css: "0 10px 30px rgba(15, 23, 42, 0.20), 0 15px 50px rgba(15, 23, 42, 0.15)",
    layers: [
      { blur: 30, spread: 0, y: 10, opacity: 0.20 },
      { blur: 50, spread: 0, y: 15, opacity: 0.15 },
    ],
  },

  // xl: Extra large, prominent shadow
  xl: {
    name: "Extra large",
    css: "0 6px 12px rgba(15, 23, 42, 0.12), 0 12px 32px rgba(15, 23, 42, 0.14), 0 24px 48px rgba(15, 23, 42, 0.10)",
    layers: [
      { blur: 12, spread: 0, y: 6, opacity: 0.12 },
      { blur: 32, spread: 0, y: 12, opacity: 0.14 },
      { blur: 48, spread: 0, y: 24, opacity: 0.10 },
    ],
  },

  // 2xl: Massive, dramatic shadow
  "2xl": {
    name: "2X Large",
    css: "0 8px 16px rgba(15, 23, 42, 0.14), 0 16px 40px rgba(15, 23, 42, 0.18), 0 32px 64px rgba(15, 23, 42, 0.12)",
    layers: [
      { blur: 16, spread: 0, y: 8, opacity: 0.14 },
      { blur: 40, spread: 0, y: 16, opacity: 0.18 },
      { blur: 64, spread: 0, y: 32, opacity: 0.12 },
    ],
  },
};

// Dark mode shadows (more pronounced for contrast)
export const SHADOW_DEFINITIONS_DARK: Record<ShadowToken, ShadowDefinition> = {
  none: {
    name: "No shadow",
    css: "none",
    layers: [],
  },

  xs: {
    name: "Extra small",
    css: "0 1px 3px rgba(0, 0, 0, 0.4)",
    layers: [
      { blur: 3, spread: 0, y: 1, opacity: 0.4 },
    ],
  },

  sm: {
    name: "Small",
    css: "0 2px 6px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.25)",
    layers: [
      { blur: 6, spread: 0, y: 2, opacity: 0.4 },
      { blur: 12, spread: 0, y: 4, opacity: 0.25 },
    ],
  },

  md: {
    name: "Medium",
    css: "0 4px 8px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.35), 0 12px 32px rgba(0, 0, 0, 0.2)",
    layers: [
      { blur: 8, spread: 0, y: 4, opacity: 0.4 },
      { blur: 20, spread: 0, y: 8, opacity: 0.35 },
      { blur: 32, spread: 0, y: 12, opacity: 0.2 },
    ],
  },

  lg: {
    name: "Large",
    css: "0 8px 16px rgba(0, 0, 0, 0.45), 0 16px 32px rgba(0, 0, 0, 0.4), 0 24px 48px rgba(0, 0, 0, 0.25)",
    layers: [
      { blur: 16, spread: 0, y: 8, opacity: 0.45 },
      { blur: 32, spread: 0, y: 16, opacity: 0.4 },
      { blur: 48, spread: 0, y: 24, opacity: 0.25 },
    ],
  },

  xl: {
    name: "Extra large",
    css: "0 10px 20px rgba(0, 0, 0, 0.5), 0 20px 40px rgba(0, 0, 0, 0.45), 0 32px 64px rgba(0, 0, 0, 0.3)",
    layers: [
      { blur: 20, spread: 0, y: 10, opacity: 0.5 },
      { blur: 40, spread: 0, y: 20, opacity: 0.45 },
      { blur: 64, spread: 0, y: 32, opacity: 0.3 },
    ],
  },

  "2xl": {
    name: "2X Large",
    css: "0 12px 24px rgba(0, 0, 0, 0.55), 0 24px 48px rgba(0, 0, 0, 0.5), 0 40px 80px rgba(0, 0, 0, 0.35)",
    layers: [
      { blur: 24, spread: 0, y: 12, opacity: 0.55 },
      { blur: 48, spread: 0, y: 24, opacity: 0.5 },
      { blur: 80, spread: 0, y: 40, opacity: 0.35 },
    ],
  },
};

/**
 * Get shadow definition for light mode
 */
export function getShadow(token: ShadowToken): string {
  return SHADOW_DEFINITIONS[token]?.css || "none";
}

/**
 * Get shadow definition for dark mode
 */
export function getShadowDark(token: ShadowToken): string {
  return SHADOW_DEFINITIONS_DARK[token]?.css || "none";
}

/**
 * Get shadow based on isDarkUi flag
 */
export function getShadowForMode(token: ShadowToken, isDark: boolean): string {
  return isDark ? getShadowDark(token) : getShadow(token);
}

/**
 * Get all shadow layers for a token
 */
export function getShadowLayers(token: ShadowToken, isDark: boolean = false) {
  const definitions = isDark ? SHADOW_DEFINITIONS_DARK : SHADOW_DEFINITIONS;
  return definitions[token]?.layers || [];
}

/**
 * Build shadow string with custom color
 * Useful for colored shadows (accent shadows, status shadows, etc.)
 */
export function buildColoredShadow(
  token: ShadowToken,
  color: string,
  isDark: boolean = false
): string {
  const layers = getShadowLayers(token, isDark);
  if (layers.length === 0) return "none";

  return layers
    .map(
      (layer) =>
        `0 ${layer.y}px ${layer.blur}px rgba(${hexToRgb(color)}, ${layer.opacity})`
    )
    .join(", ");
}

/**
 * Helper to convert hex to RGB
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "0, 0, 0";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

/**
 * Get shadow documentation
 */
export function describeShadow(token: ShadowToken): string {
  return SHADOW_DEFINITIONS[token]?.name || "Unknown shadow";
}
