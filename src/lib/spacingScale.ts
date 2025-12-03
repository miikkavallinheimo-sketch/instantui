/**
 * Spacing Scale System
 *
 * Defines a modular spacing scale based on 4px base unit
 * Follows 8-point grid system (industry standard)
 *
 * Scale progression: xs (2px), sm (4px), md (8px), lg (12px), xl (16px), 2xl (24px), 3xl (32px), 4xl (48px), 5xl (64px)
 */

export type SpacingToken = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";

export interface SpacingScale {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
}

// Default spacing scale (in rem, based on 16px root)
// Ratio: 1.5 between steps (relaxed 1.5:1 for comfortable spacing)
export const DEFAULT_SPACING_SCALE: SpacingScale = {
  xs: "0.125rem",  // 2px
  sm: "0.25rem",   // 4px
  md: "0.5rem",    // 8px
  lg: "0.75rem",   // 12px
  xl: "1rem",      // 16px
  "2xl": "1.5rem", // 24px
  "3xl": "2rem",   // 32px
  "4xl": "3rem",   // 48px
  "5xl": "4rem",   // 64px
};

// Compact spacing scale (squeezed for dense UI)
export const COMPACT_SPACING_SCALE: SpacingScale = {
  xs: "0.0625rem", // 1px
  sm: "0.125rem",  // 2px
  md: "0.25rem",   // 4px
  lg: "0.5rem",    // 8px
  xl: "0.75rem",   // 12px
  "2xl": "1rem",   // 16px
  "3xl": "1.5rem", // 24px
  "4xl": "2rem",   // 32px
  "5xl": "2.5rem", // 40px
};

// Relaxed spacing scale (airy for premium feel)
export const RELAXED_SPACING_SCALE: SpacingScale = {
  xs: "0.25rem",   // 4px
  sm: "0.5rem",    // 8px
  md: "1rem",      // 16px
  lg: "1.5rem",    // 24px
  xl: "2rem",      // 32px
  "2xl": "3rem",   // 48px
  "3xl": "4rem",   // 64px
  "4xl": "6rem",   // 96px
  "5xl": "8rem",   // 128px
};

export type SpacingDensity = "compact" | "default" | "relaxed";

export function getSpacingScale(density: SpacingDensity = "default"): SpacingScale {
  switch (density) {
    case "compact":
      return COMPACT_SPACING_SCALE;
    case "relaxed":
      return RELAXED_SPACING_SCALE;
    case "default":
    default:
      return DEFAULT_SPACING_SCALE;
  }
}

/**
 * Common spacing patterns for layouts
 */
export interface SpacingPatterns {
  // Padding for containers
  containerPadding: {
    sm: string;  // xs screen padding
    md: string;  // medium screen padding
    lg: string;  // large screen padding
  };

  // Gap between grid items
  gridGap: {
    sm: string;
    md: string;
    lg: string;
  };

  // Vertical rhythm (line-height related)
  verticalRhythm: {
    tight: string;
    normal: string;
    loose: string;
  };
}

export function getSpacingPatterns(scale: SpacingScale): SpacingPatterns {
  return {
    containerPadding: {
      sm: scale.md,   // 8px on mobile
      md: scale.lg,   // 12px on tablet
      lg: scale.xl,   // 16px on desktop
    },
    gridGap: {
      sm: scale.md,   // 8px compact grid
      md: scale.lg,   // 12px normal grid
      lg: scale.xl,   // 16px loose grid
    },
    verticalRhythm: {
      tight: scale.sm,   // 4px (compressed lines)
      normal: scale.md,  // 8px (normal spacing)
      loose: scale.lg,   // 12px (open spacing)
    },
  };
}
