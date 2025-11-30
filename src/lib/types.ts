export type VibeId =
  | "minimal"
  | "modern-saas"
  | "brutalist"
  | "pastel"
  | "dark-tech"
  | "luxury"
  | "soft-neo-tech"
  | "gradient-bloom"
  | "warm-editorial"
  | "retro-pixel"
  | "magazine-brutalism"
  | "cyber-mint";

export interface VibePreset {
  id: VibeId;
  label: string;
  description: string;
  primaryHue: number;
  primarySatRange: [number, number];
  primaryLightRange: [number, number];
  bgLightness: number;
  isDarkUi: boolean;
}

export type ColorKey = "primary" | "secondary" | "accent" | "background" | "text";

export interface ColorSet {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface ColorLocks {
  primary: boolean;
  secondary: boolean;
  accent: boolean;
  background: boolean;
  text: boolean;
}

export type FontSource = "google" | "system" | "premium";

export interface FontPair {
  heading: string;
  body: string;
  vibes: VibeId[];
  source: FontSource;
  notes?: string;
}

export interface DesignState {
  vibe: VibePreset;
  colors: ColorSet;
  fontPair: FontPair;
}

export interface DesignTokens {
  cssVariables: string;
  tailwindConfig: string;
  jsonTokens: string;
}

export interface GeneratedVibeColor {
  name: string;
  hex?: string | null;
  role: ColorKey;
}

export interface GeneratedVibeOverrides {
  primaryHue?: number | null;
  saturationBias?: number | null;
  lightnessBias?: number | null;
  borderRadius?: "sharp" | "medium" | "rounded" | null;
  useGradients?: boolean | null;
}

export interface GeneratedVibe {
  name: string;
  shortLabel: string;
  description: string;
  recommendedFonts: string[];
  recommendedColors: GeneratedVibeColor[];
  suitability: string[];
  overrides: GeneratedVibeOverrides;
}

export interface GeneratedVibesResponse {
  generatedAt: string;
  vibes: GeneratedVibe[];
}
