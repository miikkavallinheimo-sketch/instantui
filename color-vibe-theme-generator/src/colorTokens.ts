export type Vibe =
  | "modern-saas"
  | "soft-edgy"
  | "neon-digital"
  | "classic-editorial"
  | "earthy";

export type BaseColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
};

export type DerivedColors = {
  onPrimary: string;
  onSecondary: string;
  onAccent: string;
  surface: string;
  surfaceAlt: string;
  textMuted: string;
  borderSubtle: string;
  borderStrong: string;
};

export type FullTheme = BaseColors & DerivedColors;

export type LockState = {
  primary: boolean;
  secondary: boolean;
  accent: boolean;
  background: boolean;
  text: boolean;
};