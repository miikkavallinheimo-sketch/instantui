export interface ColorSet {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface VibePalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  borderSubtle: string;
  borderStrong: string;
}

export interface ColorVariations {
  primary?: string[];
  secondary?: string[];
  accent?: string[];
}

export type RadiusToken = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type ShadowToken = "none" | "soft" | "strong";
export type BorderToken = "none" | "subtle" | "strong";

export interface ComponentShape {
  radius: RadiusToken;
  shadow: ShadowToken;
  border: BorderToken;
}

export interface TypographyTokens {
  heading: {
    size: "sm" | "md" | "lg" | "xl" | "2xl";
    weight: number; // 400, 600, 700, 800
    style: "normal" | "italic";
  };
  body: {
    size: "xs" | "sm" | "md" | "lg";
    weight: number;
    style: "normal" | "italic";
  };
  accent: {
    size: "xs" | "sm" | "md";
    weight: number;
    style: "normal" | "italic";
  };
}

export interface VibeUiTokens {
  buttonPrimary: ComponentShape;
  buttonSecondary: ComponentShape;
  card: ComponentShape;
  typography?: TypographyTokens;
}

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
  isDarkUi: boolean;
  palette: VibePalette;
  ui: VibeUiTokens;
  colorVariations?: ColorVariations;
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

export interface ColorLocks {
  primary?: boolean;
  secondary?: boolean;
  accent?: boolean;
  background?: boolean;
  text?: boolean;
}
