export interface ColorSet {
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
  onPrimary: string;
  onSecondary: string;
  onAccent: string;

  // Typography hierarchy colors (optional, fallback to text colors)
  textHeading?: string;
  textSubheading?: string;
  textBody?: string;
  textBodyMuted?: string;
  textAccent?: string;
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

export interface PaletteVariation {
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  text?: string;
  surface?: string;
  surfaceAlt?: string;
  borderSubtle?: string;
  borderStrong?: string;
  textMuted?: string;
}

export type ColorVariations = PaletteVariation[];

export type RadiusToken = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type ShadowToken = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type BorderToken = "none" | "subtle" | "strong";
export type SpacingToken = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
export type SpacingDensity = "compact" | "default" | "relaxed";

// Animation types
export type HoverAnimationType = "subtle" | "lift" | "glow" | "shimmer" | "bounce" | "none";
export type HapticIntensity = "light" | "medium" | "pattern";

export interface AnimationConfig {
  type: HoverAnimationType;
  duration: number;
  timingFunction: string;
  scale?: number;
  glowColor?: string;
  translateY?: number;
  shimmerDuration?: number;
}

export interface HapticConfig {
  enabled: boolean;
  onHoverStart: HapticIntensity | null;
  onClick: HapticIntensity | null;
  respectUserPreference: boolean;
}

export interface ComponentAnimations {
  button: AnimationConfig;
  card: AnimationConfig;
  link: AnimationConfig;
  navItem: AnimationConfig;
  interactive: AnimationConfig;
}

// Feature tier system
export type FeatureTier = "FREE" | "PRO";

// Preview page types
export type PreviewPageId = "landing" | "blog" | "dashboard" | "components";

export interface PreviewPage {
  id: PreviewPageId;
  label: string;
  description: string;
  tier: FeatureTier;
}

// Menu preset types
export type MenuPresetId = "top-nav" | "centered-pill" | "sidebar";

export interface MenuPreset {
  id: MenuPresetId;
  label: string;
  description: string;
  tier: FeatureTier;
}

// Text style interface (reusable for h1-h4)
export interface TextStyle {
  size: string;
  weight: number;
  style: "normal" | "italic";
  transform?: "none" | "uppercase";
  color?: string;
  lineHeight?: number | string;
  letterSpacing?: string;
}

// Typography color hierarchy
export interface TypographyColors {
  heading: string; // H1 - max contrast
  subheading: string; // H2
  body: string; // Normal text
  bodyMuted: string; // De-emphasized
  accent: string; // CTA emphasis
}

export interface ComponentShape {
  radius: RadiusToken;
  shadow: ShadowToken;
  border: BorderToken;
}

export interface TypographyTokens {
  h1: TextStyle;
  h2: TextStyle;
  h3: TextStyle;
  h4: TextStyle;
  body: TextStyle;
  accent: TextStyle;

  // Backward compatibility aliases
  heading?: TextStyle;
  subheading?: TextStyle;
}

export interface SpacingConfig {
  density: SpacingDensity;
  // Optional overrides for specific patterns
  containerPadding?: string;
  gridGap?: string;
}

export interface VibeUiTokens {
  buttonPrimary: ComponentShape;
  buttonSecondary: ComponentShape;
  card: ComponentShape;
  typography?: TypographyTokens;
  spacing?: SpacingConfig;
  animations?: ComponentAnimations;
  haptic?: HapticConfig;
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
  | "cyber-mint"
  | "dark";

export interface VibePreset {
  id: VibeId;
  label: string;
  description: string;
  isDarkUi: boolean;
  palette: VibePalette;
  ui: VibeUiTokens;
  colorVariations?: ColorVariations;

  // Optional dark mode variant for this vibe
  darkVariant?: {
    palette: VibePalette;
    ui?: Partial<VibeUiTokens>;
  };
}

export type FontSource = "google" | "system" | "premium";

export interface FontPair {
  heading: string;
  body: string;
  vibes: VibeId[];
  source: FontSource;
  notes?: string;
}

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

export interface SpacingPatterns {
  containerPadding: {
    sm: string;
    md: string;
    lg: string;
  };
  gridGap: {
    sm: string;
    md: string;
    lg: string;
  };
  verticalRhythm: {
    tight: string;
    normal: string;
    loose: string;
  };
}

export interface DesignState {
  vibe: VibePreset;
  colors: ColorSet;
  originalColors: ColorSet;
  fontPair: FontPair;
  uiTokens: VibeUiTokens;
  typography: TypographyTokens;
  spacing: SpacingScale;
  spacingPatterns: SpacingPatterns;
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

export type ColorKey = keyof ColorLocks;

export type FontLockMode = "none" | "heading" | "body" | "both";

export interface GeneratedVibe {
  name: string;
  shortLabel?: string;
  description: string;
  recommendedFonts?: string[];
  recommendedColors?: {
    name: string;
    hex?: string | null;
    role: "primary" | "secondary" | "accent" | "background" | "text";
  }[];
  suitability?: string[];
  overrides?: {
    primaryHue?: number | null;
    saturationBias?: number | null;
    lightnessBias?: number | null;
    borderRadius?: "sharp" | "medium" | "rounded" | null;
    useGradients?: boolean | null;
    hueShift?: number | null;
    saturationShift?: number | null;
    surfaceShade?: number | null;
  };
}

export interface GeneratedVibesResponse {
  generatedAt: string;
  vibes: GeneratedVibe[];
}

export interface SavedFavorite {
  id: string;
  name: string;
  vibeId: VibeId;
  seed: number;
  colorLocks: ColorLocks;
  fontLockMode: FontLockMode;
  hueShift: number;
  saturationShift: number;
  colors: ColorSet;
  fontPair: FontPair;
  createdAt: string;
}

export interface TypographyTrend {
  rule: string;
  rationale: string;
  context: string;
  exampleSizes?: string;
  recommendedScaleRatio?: number;
  recommendedWeightPairs?: Array<{
    body: number;
    heading: number;
  }>;
}
