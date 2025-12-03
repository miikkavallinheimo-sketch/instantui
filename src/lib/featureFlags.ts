import type { FeatureTier, VibeId, PreviewPage, MenuPreset } from "./types";

/**
 * Feature tier configuration for FREE/PRO version split.
 * Toggle CURRENT_TIER to test PRO features locally.
 * In production, this will be driven by Auth/API.
 */
export const CURRENT_TIER: FeatureTier = "FREE";

/**
 * Vibe availability by tier
 */
export const FREE_VIBES: VibeId[] = [
  "minimal",
  "modern-saas",
  "brutalist",
  "pastel",
  "dark-tech",
  "luxury",
  "soft-neo-tech",
  "gradient-bloom",
  "warm-editorial",
  "retro-pixel",
];

export const PRO_VIBES: VibeId[] = [
  "magazine-brutalism",
  "cyber-mint",
  "dark",
];

/**
 * Preview pages available by tier
 */
export const PREVIEW_PAGES: PreviewPage[] = [
  {
    id: "landing",
    label: "Landing",
    description: "Hero + features showcase",
    tier: "FREE",
  },
  {
    id: "blog",
    label: "Blog",
    description: "Content-focused reading",
    tier: "FREE",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Data + analytics",
    tier: "FREE",
  },
];

/**
 * Navigation menu presets by tier
 */
export const MENU_PRESETS: MenuPreset[] = [
  {
    id: "top-nav",
    label: "Top Nav",
    description: "Horizontal bar navigation",
    tier: "FREE",
  },
  // Centered pill and sidebar for PRO phase
];

/**
 * Feature access control
 */
export const FEATURES = {
  // FREE Features
  basicTypography: { tier: "FREE" as FeatureTier, enabled: true },
  multiShadows: { tier: "FREE" as FeatureTier, enabled: true },
  h1h4Hierarchy: { tier: "FREE" as FeatureTier, enabled: true },
  textTokenHierarchy: { tier: "FREE" as FeatureTier, enabled: true },
  darkModeToggle: { tier: "FREE" as FeatureTier, enabled: true },
  basicNavigation: { tier: "FREE" as FeatureTier, enabled: true },

  // PRO Features (stub for future)
  smartHover: {
    tier: "PRO" as FeatureTier,
    enabled: CURRENT_TIER === "PRO",
  },
  glassEffects: {
    tier: "PRO" as FeatureTier,
    enabled: CURRENT_TIER === "PRO",
  },
  customVibeCreator: {
    tier: "PRO" as FeatureTier,
    enabled: CURRENT_TIER === "PRO",
  },
  advancedMenus: {
    tier: "PRO" as FeatureTier,
    enabled: CURRENT_TIER === "PRO",
  },
  customFonts: {
    tier: "PRO" as FeatureTier,
    enabled: CURRENT_TIER === "PRO",
  },
  wcagAutoFix: {
    tier: "PRO" as FeatureTier,
    enabled: CURRENT_TIER === "PRO",
  },
} as const;

/**
 * Check if a feature is enabled for the current tier
 */
export function isFeatureEnabled(
  feature: keyof typeof FEATURES
): boolean {
  return FEATURES[feature].enabled;
}

/**
 * Get all available vibes for current tier
 */
export function getAvailableVibes(): VibeId[] {
  return CURRENT_TIER === "PRO" ? [...FREE_VIBES, ...PRO_VIBES] : FREE_VIBES;
}

/**
 * Get available preview pages for current tier
 */
export function getAvailablePages(): PreviewPage[] {
  return PREVIEW_PAGES.filter(
    (p) => CURRENT_TIER === "PRO" || p.tier === "FREE"
  );
}

/**
 * Get available menu presets for current tier
 */
export function getAvailableMenus(): MenuPreset[] {
  return MENU_PRESETS.filter(
    (m) => CURRENT_TIER === "PRO" || m.tier === "FREE"
  );
}

/**
 * Get current user's feature tier
 * Phase 1: Read from constant
 * Phase 2 (future): Read from localStorage
 * Phase 3 (future): Read from Auth API
 */
export function useFeatureTier(): FeatureTier {
  // TODO: Integrate with Auth in future
  return CURRENT_TIER;
}
