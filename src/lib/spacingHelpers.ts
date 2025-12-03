/**
 * Spacing helper utilities for easy access to spacing tokens in components
 */
import type { SpacingScale, SpacingToken } from "./types";

/**
 * Get a spacing value from the scale
 */
export function getSpacing(scale: SpacingScale, token: SpacingToken): string {
  return scale[token];
}

/**
 * Build margin shorthand from spacing tokens
 */
export function buildMargin(
  scale: SpacingScale,
  vertical: SpacingToken | string,
  horizontal?: SpacingToken | string
): string {
  const v = typeof vertical === "string" && vertical in scale
    ? getSpacing(scale, vertical as SpacingToken)
    : vertical;
  const h = horizontal
    ? (typeof horizontal === "string" && horizontal in scale
        ? getSpacing(scale, horizontal as SpacingToken)
        : horizontal)
    : v;
  return `${v} ${h}`;
}

/**
 * Build padding shorthand from spacing tokens
 */
export function buildPadding(
  scale: SpacingScale,
  vertical: SpacingToken | string,
  horizontal?: SpacingToken | string
): string {
  return buildMargin(scale, vertical, horizontal);
}

/**
 * Build gap for grid/flex layouts
 */
export function buildGap(
  scale: SpacingScale,
  row: SpacingToken | string,
  col?: SpacingToken | string
): string {
  const r = typeof row === "string" && row in scale
    ? getSpacing(scale, row as SpacingToken)
    : row;
  const c = col
    ? (typeof col === "string" && col in scale
        ? getSpacing(scale, col as SpacingToken)
        : col)
    : r;
  return `${r} ${c}`;
}

/**
 * Get responsive container padding based on screen size
 */
export function getResponsiveContainerPadding(
  scale: SpacingScale,
  screenSize: "sm" | "md" | "lg"
): string {
  const containerPaddingMap: Record<"sm" | "md" | "lg", SpacingToken> = {
    sm: "md",   // 8px on mobile
    md: "lg",   // 12px on tablet
    lg: "xl",   // 16px on desktop
  };
  return getSpacing(scale, containerPaddingMap[screenSize]);
}
