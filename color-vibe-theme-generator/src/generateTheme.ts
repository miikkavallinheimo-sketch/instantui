import { Vibe, BaseColors, DerivedColors, FullTheme, LockState } from "./colorTokens";

/**
 * Public API
 *
 * Called when user presses Space:
 * - takes current theme
 * - respects locked base colors
 * - returns a new generated theme for the chosen vibe
 */
export function generateTheme(
  vibe: Vibe,
  current: FullTheme | null,
  locks: LockState
): FullTheme {
  const base = generateBaseColorsForVibe(vibe, current, locks);
  const derived = deriveTokensFromBase(base, vibe);
  return { ...base, ...derived };
}

/**
 * Generate the 5 base colors (primary, secondary, accent, background, text)
 * according to the chosen vibe.
 *
 * If some of them are locked, we keep them from `current` and only randomize
 * the unlocked ones.
 */
function generateBaseColorsForVibe(
  vibe: Vibe,
  current: FullTheme | null,
  locks: LockState
): BaseColors {
  const prevBase: BaseColors | null = current
    ? {
        primary: current.primary,
        secondary: current.secondary,
        accent: current.accent,
        background: current.background,
        text: current.text,
      }
    : null;

  switch (vibe) {
    case "modern-saas":
      return generateModernSaasBase(prevBase, locks);
    case "soft-edgy":
      return generateSoftEdgyBase(prevBase, locks);
    case "neon-digital":
      return generateNeonDigitalBase(prevBase, locks);
    case "classic-editorial":
      return generateClassicEditorialBase(prevBase, locks);
    case "earthy":
      return generateEarthyBase(prevBase, locks);
    default:
      return generateModernSaasBase(prevBase, locks);
  }
}

/**
 * Derive onPrimary/onSecondary/onAccent, surface/surfaceAlt, textMuted, borders
 * from the 5 base colors. This is where the contrast + subtlety rules live.
 */
function deriveTokensFromBase(base: BaseColors, vibe: Vibe): DerivedColors {
  const onPrimary = pickOnColor(base.primary, base.text);
  const onSecondary = pickOnColor(base.secondary, base.text);
  const onAccent = pickOnColor(base.accent, base.text);

  const surface = adjustSurface(base.background, vibe, 1);
  const surfaceAlt = adjustSurface(base.background, vibe, 2);

  const textMuted = makeMutedText(base.text, base.background);
  const borderSubtle = makeBorderSubtle(surface, base.text);
  const borderStrong = makeBorderStrong(base.primary, base.text);

  return {
    onPrimary,
    onSecondary,
    onAccent,
    surface,
    surfaceAlt,
    textMuted,
    borderSubtle,
    borderStrong,
  };
}

// ---------------------------------------------------------------------------
// Vibe-specific base color generators (very simplified placeholders)
// ---------------------------------------------------------------------------

function generateModernSaasBase(prev: BaseColors | null, locks: LockState): BaseColors {
  // Extremely simplified placeholder logic.
  // Replace `randomColorInRange` calls with your actual HSL/OKLCH logic.
  return {
    primary: locks.primary && prev ? prev.primary : randomColorInRange("blue"),
    secondary: locks.secondary && prev ? prev.secondary : randomColorInRange("indigo"),
    accent: locks.accent && prev ? prev.accent : randomColorInRange("green-or-orange"),
    background: locks.background && prev ? prev.background : randomColorInRange("light-cool"),
    text: locks.text && prev ? prev.text : randomColorInRange("dark-neutral"),
  };
}

function generateSoftEdgyBase(prev: BaseColors | null, locks: LockState): BaseColors {
  return {
    primary: locks.primary && prev ? prev.primary : randomColorInRange("pastel-primary"),
    secondary: locks.secondary && prev ? prev.secondary : randomColorInRange("pastel-secondary"),
    accent: locks.accent && prev ? prev.accent : randomColorInRange("pastel-accent"),
    background: locks.background && prev ? prev.background : randomColorInRange("soft-bg"),
    text: locks.text && prev ? prev.text : randomColorInRange("dark-soft"),
  };
}

function generateNeonDigitalBase(prev: BaseColors | null, locks: LockState): BaseColors {
  return {
    primary: locks.primary && prev ? prev.primary : randomColorInRange("neon-primary"),
    secondary: locks.secondary && prev ? prev.secondary : randomColorInRange("neon-secondary"),
    accent: locks.accent && prev ? prev.accent : randomColorInRange("neon-accent"),
    background: locks.background && prev ? prev.background : randomColorInRange("very-dark"),
    text: locks.text && prev ? prev.text : randomColorInRange("light-text"),
  };
}

function generateClassicEditorialBase(prev: BaseColors | null, locks: LockState): BaseColors {
  return {
    primary: locks.primary && prev ? prev.primary : randomColorInRange("muted-brand"),
    secondary: locks.secondary && prev ? prev.secondary : randomColorInRange("muted-secondary"),
    accent: locks.accent && prev ? prev.accent : randomColorInRange("muted-accent"),
    background: locks.background && prev ? prev.background : randomColorInRange("paper-bg"),
    text: locks.text && prev ? prev.text : randomColorInRange("ink-dark"),
  };
}

function generateEarthyBase(prev: BaseColors | null, locks: LockState): BaseColors {
  return {
    primary: locks.primary && prev ? prev.primary : randomColorInRange("earth-primary"),
    secondary: locks.secondary && prev ? prev.secondary : randomColorInRange("earth-secondary"),
    accent: locks.accent && prev ? prev.accent : randomColorInRange("earth-accent"),
    background: locks.background && prev ? prev.background : randomColorInRange("earth-bg"),
    text: locks.text && prev ? prev.text : randomColorInRange("earth-text"),
  };
}

// ---------------------------------------------------------------------------
// Small helpers – here you would plug in real color math (HSL / OKLCH)
// ---------------------------------------------------------------------------

function pickOnColor(bg: string, defaultText: string): string {
  // TODO: compute contrast and return either #000, #fff or defaultText.
  // For now we just return white as a placeholder.
  return "#ffffff";
}

function adjustSurface(background: string, vibe: Vibe, level: 1 | 2): string {
  // TODO: light/darken background slightly based on vibe and level.
  // Placeholder: just return background as-is.
  return background;
}

function makeMutedText(text: string, background: string): string {
  // TODO: desaturate / adjust lightness slightly.
  // Placeholder: return text for now.
  return text;
}

function makeBorderSubtle(surface: string, text: string): string {
  // TODO: blend towards surface with low contrast.
  // Placeholder: return a very light gray.
  return "#f2f3f8";
}

function makeBorderStrong(primary: string, text: string): string {
  // TODO: blend between primary and text or darken primary.
  // Placeholder: return a mid blue.
  return "#7ca1d5";
}

function randomColorInRange(kind: string): string {
  // This is just a stub to show where your real color engine goes.
  // In your actual implementation, this should:
  // - pick a hue/chroma/lightness range based on `kind`
  // - randomize within that range
  // - return a hex string
  switch (kind) {
    case "blue":
      return "#1a5bb7";
    case "indigo":
      return "#443088";
    case "green-or-orange":
      return "#23c729";
    case "light-cool":
      return "#ecedf4";
    case "dark-neutral":
      return "#2f3341";
    default:
      return "#cccccc";
  }
}