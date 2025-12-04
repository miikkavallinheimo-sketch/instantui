/**
 * Glass Tokens - Glassmorphism effect configurations
 * Defines backdrop blur, opacity, and constraints for frosted glass effects
 */

export interface GlassConfig {
  name: string;
  blur: number; // Backdrop blur in pixels
  opacity: number; // Background opacity (0-1)
  borderOpacity: number; // Border opacity (0-1)
  constraint?: "none" | "light" | "medium" | "strong"; // Lightness constraint to ensure readability
}

// Glass effect configurations for different vibes
export const GLASS_CONFIGS: Record<string, GlassConfig> = {
  subtle: {
    name: "Subtle Glass",
    blur: 8,
    opacity: 0.6,
    borderOpacity: 0.2,
    constraint: "light",
  },

  moderate: {
    name: "Moderate Glass",
    blur: 16,
    opacity: 0.55,
    borderOpacity: 0.3,
    constraint: "medium",
  },

  strong: {
    name: "Strong Glass",
    blur: 24,
    opacity: 0.5,
    borderOpacity: 0.4,
    constraint: "strong",
  },

  ultra: {
    name: "Ultra Glass",
    blur: 32,
    opacity: 0.45,
    borderOpacity: 0.5,
    constraint: "strong",
  },
};

// Vibe-specific glass presets
export const VIBE_GLASS_CONFIGS: Record<string, GlassConfig> = {
  // Minimal: Subtle, restrained glass
  minimal: {
    name: "Minimal Glass",
    blur: 6,
    opacity: 0.65,
    borderOpacity: 0.15,
    constraint: "light",
  },

  // Modern SaaS: Confident, moderate glass
  "modern-saas": {
    name: "Modern Glass",
    blur: 16,
    opacity: 0.55,
    borderOpacity: 0.3,
    constraint: "medium",
  },

  // Brutalist: Stark, minimal glass
  brutalist: {
    name: "Brutalist Glass",
    blur: 4,
    opacity: 0.7,
    borderOpacity: 0.1,
    constraint: "light",
  },

  // Pastel: Playful, soft glass
  pastel: {
    name: "Pastel Glass",
    blur: 20,
    opacity: 0.5,
    borderOpacity: 0.35,
    constraint: "medium",
  },

  // Dark Tech: Sharp, strong glass
  "dark-tech": {
    name: "Dark Tech Glass",
    blur: 24,
    opacity: 0.48,
    borderOpacity: 0.4,
    constraint: "strong",
  },

  // Luxury: Smooth, sophisticated glass
  luxury: {
    name: "Luxury Glass",
    blur: 20,
    opacity: 0.52,
    borderOpacity: 0.35,
    constraint: "medium",
  },

  // Soft Neo Tech: Shimmer-friendly glass
  "soft-neo-tech": {
    name: "Neo Glass",
    blur: 18,
    opacity: 0.52,
    borderOpacity: 0.32,
    constraint: "medium",
  },

  // Gradient Bloom: Vibrant glass
  "gradient-bloom": {
    name: "Bloom Glass",
    blur: 22,
    opacity: 0.48,
    borderOpacity: 0.38,
    constraint: "strong",
  },

  // Warm Editorial: Warm, inviting glass
  "warm-editorial": {
    name: "Warm Glass",
    blur: 18,
    opacity: 0.54,
    borderOpacity: 0.32,
    constraint: "medium",
  },

  // Retro Pixel: Pixelated glass effect
  "retro-pixel": {
    name: "Pixel Glass",
    blur: 2,
    opacity: 0.75,
    borderOpacity: 0.2,
    constraint: "light",
  },

  // Magazine Brutalism: Bold glass
  "magazine-brutalism": {
    name: "Magazine Glass",
    blur: 12,
    opacity: 0.6,
    borderOpacity: 0.25,
    constraint: "medium",
  },

  // Cyber Mint: Tech-forward glass
  "cyber-mint": {
    name: "Cyber Glass",
    blur: 20,
    opacity: 0.5,
    borderOpacity: 0.35,
    constraint: "medium",
  },

  // Dark: Refined glass
  dark: {
    name: "Dark Glass",
    blur: 18,
    opacity: 0.52,
    borderOpacity: 0.32,
    constraint: "medium",
  },
};

/**
 * Get glass config for a vibe, falling back to moderate
 */
export function getGlassConfigForVibe(vibeId: string): GlassConfig {
  return VIBE_GLASS_CONFIGS[vibeId] || GLASS_CONFIGS.moderate;
}

/**
 * Build glass background CSS with backdrop blur
 */
export function buildGlassBackground(
  baseColor: string,
  config: GlassConfig
): string {
  // Convert hex to rgb if needed
  const rgb = hexToRgb(baseColor);
  return `rgba(${rgb}, ${config.opacity})`;
}

/**
 * Build glass border CSS
 */
export function buildGlassBorder(
  borderColor: string,
  config: GlassConfig,
  borderWidth: string = "1px"
): string {
  const rgb = hexToRgb(borderColor);
  return `${borderWidth} solid rgba(${rgb}, ${config.borderOpacity})`;
}

/**
 * Helper to convert hex to RGB
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "255, 255, 255";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

/**
 * Get backdrop filter CSS
 */
export function buildBackdropFilter(blur: number): string {
  return `blur(${blur}px)`;
}

/**
 * Describe glass effect for UI labels
 */
export function describeGlass(config: GlassConfig): string {
  return config.name;
}
