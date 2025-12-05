import type { VibeId } from "./types";

export type GradientId = string;

export interface Gradient {
  id: GradientId;
  name: string;
  description: string;
  // CSS gradient value
  value: string;
}

export interface VibeGradients {
  id: VibeId;
  defaultGradient: GradientId | "none";
  options: GradientId[];
}

/**
 * Modern gradient library - 3 gradients per vibe
 * All gradients use vibrant, contemporary color combinations
 */
export const GRADIENT_LIBRARY: Record<GradientId, Gradient> = {
  // Minimal vibes
  "minimal-soft": {
    id: "minimal-soft",
    name: "Soft Dawn",
    description: "Gentle white to soft gray gradient",
    value: "linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)",
  },
  "minimal-cool": {
    id: "minimal-cool",
    name: "Cool Breeze",
    description: "Light blue to white transition",
    value: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)",
  },
  "minimal-neutral": {
    id: "minimal-neutral",
    name: "Neutral Zone",
    description: "Subtle gray gradient",
    value: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
  },

  // Modern SaaS
  "saas-vibrant": {
    id: "saas-vibrant",
    name: "Tech Pulse",
    description: "Blue to cyan energetic gradient",
    value: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
  },
  "saas-modern": {
    id: "saas-modern",
    name: "Digital Edge",
    description: "Slate to indigo professional gradient",
    value: "linear-gradient(135deg, #1e293b 0%, #4f46e5 100%)",
  },
  "saas-fresh": {
    id: "saas-fresh",
    name: "Fresh Start",
    description: "Sky blue to teal gradient",
    value: "linear-gradient(135deg, #38bdf8 0%, #14b8a6 100%)",
  },

  // Brutalist
  "brutalist-raw": {
    id: "brutalist-raw",
    name: "Raw Steel",
    description: "Dark gray to charcoal gradient",
    value: "linear-gradient(135deg, #4b5563 0%, #2d2d2d 100%)",
  },
  "brutalist-contrast": {
    id: "brutalist-contrast",
    name: "High Contrast",
    description: "Black to dark gray gradient",
    value: "linear-gradient(135deg, #000000 0%, #3f3f3f 100%)",
  },
  "brutalist-muted": {
    id: "brutalist-muted",
    name: "Muted Iron",
    description: "Medium gray gradient",
    value: "linear-gradient(135deg, #555555 0%, #333333 100%)",
  },

  // Pastel
  "pastel-soft-pink": {
    id: "pastel-soft-pink",
    name: "Soft Blush",
    description: "Light pink to peach gradient",
    value: "linear-gradient(135deg, #fce7f3 0%, #fed7aa 100%)",
  },
  "pastel-dreamy": {
    id: "pastel-dreamy",
    name: "Dreamy Sky",
    description: "Light purple to light blue gradient",
    value: "linear-gradient(135deg, #e9d5ff 0%, #bfdbfe 100%)",
  },
  "pastel-mint": {
    id: "pastel-mint",
    name: "Mint Fresh",
    description: "Light green to light cyan gradient",
    value: "linear-gradient(135deg, #d1fae5 0%, #cffafe 100%)",
  },

  // Dark Tech
  "darktech-neon": {
    id: "darktech-neon",
    name: "Neon Glow",
    description: "Purple to cyan neon gradient",
    value: "linear-gradient(135deg, #a855f7 0%, #0891b2 100%)",
  },
  "darktech-futuristic": {
    id: "darktech-futuristic",
    name: "Futuristic",
    description: "Deep blue to electric purple gradient",
    value: "linear-gradient(135deg, #1e1b4b 0%, #7c2d12 100%)",
  },
  "darktech-electric": {
    id: "darktech-electric",
    name: "Electric Storm",
    description: "Dark purple to bright blue gradient",
    value: "linear-gradient(135deg, #581c87 0%, #0369a1 100%)",
  },

  // Luxury
  "luxury-gold": {
    id: "luxury-gold",
    name: "Golden Hour",
    description: "Cream to gold gradient",
    value: "linear-gradient(135deg, #fffbeb 0%, #fcd34d 100%)",
  },
  "luxury-rose": {
    id: "luxury-rose",
    name: "Rose Elegance",
    description: "Light rose to deep rose gradient",
    value: "linear-gradient(135deg, #fef2f2 0%, #be185d 100%)",
  },
  "luxury-dark": {
    id: "luxury-dark",
    name: "Sophisticated",
    description: "Dark slate to warm brown gradient",
    value: "linear-gradient(135deg, #1f2937 0%, #5d4e37 100%)",
  },

  // Soft Neo-Tech
  "neotech-soft-blue": {
    id: "neotech-soft-blue",
    name: "Soft Focus",
    description: "Light blue to light purple gradient",
    value: "linear-gradient(135deg, #e0f2fe 0%, #f3e8ff 100%)",
  },
  "neotech-pastel-tech": {
    id: "neotech-pastel-tech",
    name: "Pastel Tech",
    description: "Soft cyan to soft purple gradient",
    value: "linear-gradient(135deg, #cffafe 0%, #e9d5ff 100%)",
  },
  "neotech-modern-calm": {
    id: "neotech-modern-calm",
    name: "Modern Calm",
    description: "Slate to indigo soft gradient",
    value: "linear-gradient(135deg, #e2e8f0 0%, #dbeafe 100%)",
  },

  // Gradient Bloom
  "bloom-vibrant": {
    id: "bloom-vibrant",
    name: "Bloom Burst",
    description: "Pink to orange vibrant gradient",
    value: "linear-gradient(135deg, #ec4899 0%, #f97316 100%)",
  },
  "bloom-sunset": {
    id: "bloom-sunset",
    name: "Sunset Fire",
    description: "Orange to pink warm gradient",
    value: "linear-gradient(135deg, #fbbf24 0%, #f87171 100%)",
  },
  "bloom-radiant": {
    id: "bloom-radiant",
    name: "Radiant",
    description: "Purple to pink radiant gradient",
    value: "linear-gradient(135deg, #d946ef 0%, #f472b6 100%)",
  },

  // Warm Editorial
  "editorial-warm": {
    id: "editorial-warm",
    name: "Warm Embrace",
    description: "Warm beige to burnt orange gradient",
    value: "linear-gradient(135deg, #fef3c7 0%, #d97706 100%)",
  },
  "editorial-earthy": {
    id: "editorial-earthy",
    name: "Earthy Tones",
    description: "Tan to rust gradient",
    value: "linear-gradient(135deg, #ddd6cb 0%, #b45309 100%)",
  },
  "editorial-vintage": {
    id: "editorial-vintage",
    name: "Vintage Charm",
    description: "Sepia to warm brown gradient",
    value: "linear-gradient(135deg, #f5e6d3 0%, #92400e 100%)",
  },

  // Retro Pixel
  "retro-sunset": {
    id: "retro-sunset",
    name: "Pixel Sunset",
    description: "Retro pink to yellow gradient",
    value: "linear-gradient(135deg, #ff006e 0%, #ffbe0b 100%)",
  },
  "retro-arcade": {
    id: "retro-arcade",
    name: "Arcade Night",
    description: "Magenta to cyan retro gradient",
    value: "linear-gradient(135deg, #ff10f0 0%, #00f0ff 100%)",
  },
  "retro-neon": {
    id: "retro-neon",
    name: "Neon Nostalgia",
    description: "Purple to green neon gradient",
    value: "linear-gradient(135deg, #b537f2 0%, #00ff88 100%)",
  },

  // Magazine Brutalism
  "magazine-bold": {
    id: "magazine-bold",
    name: "Bold Print",
    description: "Dark charcoal to black gradient",
    value: "linear-gradient(135deg, #404040 0%, #000000 100%)",
  },
  "magazine-accent": {
    id: "magazine-accent",
    name: "Accent Stripe",
    description: "Deep red to dark gray gradient",
    value: "linear-gradient(135deg, #991b1b 0%, #1f2937 100%)",
  },
  "magazine-metallic": {
    id: "magazine-metallic",
    name: "Metallic Edge",
    description: "Slate to gunmetal gradient",
    value: "linear-gradient(135deg, #4b5563 0%, #2a2a2a 100%)",
  },

  // Cyber Mint
  "cyber-mint-fresh": {
    id: "cyber-mint-fresh",
    name: "Mint Fresh",
    description: "Mint to cyan gradient",
    value: "linear-gradient(135deg, #6ee7b7 0%, #06b6d4 100%)",
  },
  "cyber-mint-electric": {
    id: "cyber-mint-electric",
    name: "Electric Mint",
    description: "Cyan to bright green gradient",
    value: "linear-gradient(135deg, #0891b2 0%, #10b981 100%)",
  },
  "cyber-mint-cool": {
    id: "cyber-mint-cool",
    name: "Cool Mint",
    description: "Light mint to teal gradient",
    value: "linear-gradient(135deg, #a7f3d0 0%, #5eead4 100%)",
  },
};

/**
 * Gradient assignments by vibe
 */
export const VIBE_GRADIENTS: Record<VibeId, VibeGradients> = {
  minimal: {
    id: "minimal",
    defaultGradient: "minimal-soft",
    options: ["minimal-soft", "minimal-cool", "minimal-neutral"],
  },
  "modern-saas": {
    id: "modern-saas",
    defaultGradient: "saas-vibrant",
    options: ["saas-vibrant", "saas-modern", "saas-fresh"],
  },
  brutalist: {
    id: "brutalist",
    defaultGradient: "brutalist-raw",
    options: ["brutalist-raw", "brutalist-contrast", "brutalist-muted"],
  },
  pastel: {
    id: "pastel",
    defaultGradient: "pastel-soft-pink",
    options: ["pastel-soft-pink", "pastel-dreamy", "pastel-mint"],
  },
  "dark-tech": {
    id: "dark-tech",
    defaultGradient: "darktech-neon",
    options: ["darktech-neon", "darktech-futuristic", "darktech-electric"],
  },
  luxury: {
    id: "luxury",
    defaultGradient: "luxury-gold",
    options: ["luxury-gold", "luxury-rose", "luxury-dark"],
  },
  "soft-neo-tech": {
    id: "soft-neo-tech",
    defaultGradient: "neotech-soft-blue",
    options: ["neotech-soft-blue", "neotech-pastel-tech", "neotech-modern-calm"],
  },
  "gradient-bloom": {
    id: "gradient-bloom",
    defaultGradient: "bloom-vibrant",
    options: ["bloom-vibrant", "bloom-sunset", "bloom-radiant"],
  },
  "warm-editorial": {
    id: "warm-editorial",
    defaultGradient: "editorial-warm",
    options: ["editorial-warm", "editorial-earthy", "editorial-vintage"],
  },
  "retro-pixel": {
    id: "retro-pixel",
    defaultGradient: "retro-sunset",
    options: ["retro-sunset", "retro-arcade", "retro-neon"],
  },
  "magazine-brutalism": {
    id: "magazine-brutalism",
    defaultGradient: "magazine-bold",
    options: ["magazine-bold", "magazine-accent", "magazine-metallic"],
  },
  "cyber-mint": {
    id: "cyber-mint",
    defaultGradient: "cyber-mint-fresh",
    options: ["cyber-mint-fresh", "cyber-mint-electric", "cyber-mint-cool"],
  },
  dark: {
    id: "dark",
    defaultGradient: "brutalist-raw",
    options: ["brutalist-raw", "brutalist-contrast", "brutalist-muted"],
  },
};

/**
 * Get gradient options for a specific vibe
 */
export function getVibeGradients(vibeId: VibeId): VibeGradients {
  return VIBE_GRADIENTS[vibeId] || VIBE_GRADIENTS.minimal;
}

/**
 * Get a specific gradient definition
 */
export function getGradient(gradientId: GradientId): Gradient | null {
  return GRADIENT_LIBRARY[gradientId] || null;
}

/**
 * Get gradient CSS value
 */
export function getGradientCSSValue(gradientId: GradientId): string {
  const gradient = GRADIENT_LIBRARY[gradientId];
  return gradient ? gradient.value : "";
}
