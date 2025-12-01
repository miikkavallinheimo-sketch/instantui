import type { ColorSet, ColorLocks, VibePreset, VibeId } from "./types";
import {
  contrastRatio,
  hexToHsl,
  hexToLuminance,
  hslToHex,
} from "./colorUtils";
import { generateHarmony, randomHarmonyType } from "./colorHarmony";
import { getTrendColor } from "./trendColors";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const seededRandom = (seed: number, offset: number) => {
  const x = Math.sin(seed * 1000 + offset * 7919) * 10000;
  return x - Math.floor(x);
};

const jitterValue = (range: number, seed: number, offset: number) =>
  (seededRandom(seed, offset) * 2 - 1) * range;

const mixHex = (colorA: string, colorB: string, anchorWeight: number) => {
  const weight = clamp(anchorWeight, 0, 1);
  const clean = (hex: string) => hex.replace("#", "");
  const hexA = clean(colorA);
  const hexB = clean(colorB);

  const a = [
    parseInt(hexA.slice(0, 2), 16),
    parseInt(hexA.slice(2, 4), 16),
    parseInt(hexA.slice(4, 6), 16),
  ];
  const b = [
    parseInt(hexB.slice(0, 2), 16),
    parseInt(hexB.slice(2, 4), 16),
    parseInt(hexB.slice(4, 6), 16),
  ];

  const mixChannel = (i: number) =>
    Math.round(a[i] * (1 - weight) + b[i] * weight);

  return (
    "#" +
    [mixChannel(0), mixChannel(1), mixChannel(2)]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
};

const hueDistance = (a: number, b: number) => {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
};

const moveHueTowards = (target: number, current: number, ratio: number) => {
  const diff = ((target - current + 540) % 360) - 180;
  return (current + diff * ratio + 360) % 360;
};

const moveHueAway = (
  reference: number,
  current: number,
  delta: number,
  preferredDirection?: number
) => {
  const diff = ((current - reference + 540) % 360) - 180;
  const direction =
    preferredDirection !== undefined
      ? preferredDirection >= 0
        ? 1
        : -1
      : diff >= 0
      ? 1
      : -1;
  return (current + direction * delta + 360) % 360;
};

const midpointHue = (a: number, b: number) => {
  const diff = ((b - a + 540) % 360) - 180;
  return (a + diff / 2 + 360) % 360;
};

const ensureSaturation = (hex: string, minSat: number) => {
  if (minSat <= 0) return hex;
  const hsl = hexToHsl(hex);
  if (hsl.s >= minSat) return hex;
  return hslToHex(hsl.h, minSat, hsl.l);
};

const ensureLightnessRange = (hex: string, range?: [number, number]) => {
  if (!range) return hex;
  const [min, max] = range;
  const hsl = hexToHsl(hex);
  const l = clamp(hsl.l, min, max);
  if (l === hsl.l) return hex;
  return hslToHex(hsl.h, hsl.s, l);
};

const harmonizeSecondaryHue = (
  primaryHex: string,
  secondaryHex: string,
  maxDelta: number
) => {
  if (maxDelta <= 0) return secondaryHex;
  const primary = hexToHsl(primaryHex);
  const secondary = hexToHsl(secondaryHex);
  const diff = hueDistance(primary.h, secondary.h);
  if (diff <= maxDelta) return secondaryHex;
  const moveRatio = clamp((diff - maxDelta) / diff, 0, 1) * 0.75;
  const newHue = moveHueTowards(primary.h, secondary.h, moveRatio);
  return hslToHex(newHue, secondary.s, secondary.l);
};

const separateAccentHue = (
  accentHex: string,
  primaryHex: string,
  secondaryHex: string,
  minDelta: number,
  seed: number
) => {
  if (minDelta <= 0) return accentHex;
  const accent = hexToHsl(accentHex);
  const primary = hexToHsl(primaryHex);
  const secondary = hexToHsl(secondaryHex);
  const anchorHue = midpointHue(primary.h, secondary.h);
  const diff = hueDistance(accent.h, anchorHue);
  if (diff >= minDelta) return accentHex;
  const push = (minDelta - diff) * (1.1 + seededRandom(seed, 0.71) * 0.6);
  const direction = seededRandom(seed, 0.83) > 0.5 ? 1 : -1;
  const newHue = moveHueAway(anchorHue, accent.h, push, direction);
  return hslToHex(newHue, accent.s, accent.l);
};

interface ColorBehavior {
  hueJitter: number;
  satJitter: number;
  lightJitter: number;
  saturationVariation: number;
  lightnessVariation: number;
  blendStrength: number;
  secondaryBlend: number;
  accentBlend: number;
  primaryContrast: number;
  secondaryContrast: number;
  accentContrast: number;
  trendBias: number;
  backgroundTrendBias: number;
  backgroundTint: number;
  backgroundShade: number;
  surfaceTintRange: number;
  pairMaxHueDelta: number;
  accentMinHueDelta: number;
  minSatPrimary: number;
  minSatSecondary: number;
  minSatAccent: number;
  minSatBackground: number;
  backgroundAnchor: number;
  backgroundLightRange?: [number, number];
  primaryLightRange?: [number, number];
  secondaryLightRange?: [number, number];
  accentLightRange?: [number, number];
}

const DEFAULT_BEHAVIOR: ColorBehavior = {
  hueJitter: 16,
  satJitter: 12,
  lightJitter: 10,
  saturationVariation: 12,
  lightnessVariation: 10,
  blendStrength: 0.4,
  secondaryBlend: 0.35,
  accentBlend: 0.32,
  primaryContrast: 3.2,
  secondaryContrast: 2.6,
  accentContrast: 3.0,
  trendBias: 0.18,
  backgroundTrendBias: 0.22,
  backgroundTint: 0.08,
  backgroundShade: 0.08,
  surfaceTintRange: 0.2,
  pairMaxHueDelta: 38,
  accentMinHueDelta: 70,
  minSatPrimary: 40,
  minSatSecondary: 35,
  minSatAccent: 50,
  minSatBackground: 15,
  backgroundAnchor: 0.45,
};

const COLOR_BEHAVIORS: Partial<
  Record<VibeId, Partial<ColorBehavior>>
> = {
  luxury: {
    hueJitter: 8,
    satJitter: 6,
    lightJitter: 6,
    blendStrength: 0.24,
    trendBias: 0.12,
    backgroundTint: 0.12,
    backgroundShade: 0.18,
    surfaceTintRange: 0.12,
    accentContrast: 3.8,
    pairMaxHueDelta: 18,
    accentMinHueDelta: 82,
    minSatPrimary: 58,
    minSatSecondary: 52,
    minSatAccent: 72,
    backgroundAnchor: 0.9,
    minSatBackground: 26,
    backgroundLightRange: [12, 24],
    accentLightRange: [35, 60],
  },
  "modern-saas": {
    hueJitter: 18,
    satJitter: 14,
    lightJitter: 12,
    blendStrength: 0.5,
    secondaryBlend: 0.45,
    accentBlend: 0.4,
    trendBias: 0.32,
    backgroundTint: 0.12,
    backgroundShade: 0.1,
    surfaceTintRange: 0.28,
    pairMaxHueDelta: 26,
    accentMinHueDelta: 85,
    minSatPrimary: 60,
    minSatSecondary: 48,
    minSatAccent: 70,
    backgroundAnchor: 0.6,
    minSatBackground: 26,
    backgroundLightRange: [82, 94],
    accentLightRange: [42, 70],
  },
  "gradient-bloom": {
    trendBias: 0.35,
    blendStrength: 0.48,
    accentBlend: 0.45,
    surfaceTintRange: 0.35,
  },
  "dark-tech": {
    trendBias: 0.14,
    backgroundTint: 0.02,
    backgroundShade: 0.22,
    surfaceTintRange: 0.1,
    accentContrast: 3.8,
    backgroundAnchor: 0.82,
    minSatPrimary: 72,
    minSatSecondary: 60,
    minSatAccent: 82,
    minSatBackground: 30,
    pairMaxHueDelta: 22,
    accentMinHueDelta: 95,
    backgroundLightRange: [6, 16],
    accentLightRange: [38, 62],
  },
  "warm-editorial": {
    trendBias: 0.3,
    accentBlend: 0.4,
    backgroundTint: 0.1,
    pairMaxHueDelta: 24,
    accentMinHueDelta: 65,
    minSatPrimary: 55,
    minSatSecondary: 48,
    minSatAccent: 65,
  },
  pastel: {
    pairMaxHueDelta: 30,
    accentMinHueDelta: 70,
    minSatPrimary: 55,
    minSatSecondary: 45,
    minSatAccent: 65,
  },
  minimal: {
    hueJitter: 10,
    satJitter: 8,
    lightJitter: 8,
    blendStrength: 0.32,
    secondaryBlend: 0.3,
    accentBlend: 0.28,
    trendBias: 0.22,
    backgroundTint: 0.12,
    backgroundShade: 0.05,
    pairMaxHueDelta: 18,
    accentMinHueDelta: 42,
    minSatPrimary: 45,
    minSatSecondary: 40,
    minSatAccent: 55,
    minSatBackground: 18,
    backgroundAnchor: 0.88,
    backgroundLightRange: [86, 96],
    accentLightRange: [55, 72],
  },
  "soft-neo-tech": {
    pairMaxHueDelta: 28,
    accentMinHueDelta: 65,
    minSatPrimary: 58,
    minSatSecondary: 50,
    minSatAccent: 72,
    backgroundAnchor: 0.68,
    minSatBackground: 24,
    backgroundLightRange: [16, 28],
    accentLightRange: [38, 68],
  },
};

const behaviorFor = (vibeId: VibeId): ColorBehavior => {
  const overrides = COLOR_BEHAVIORS[vibeId] ?? {};
  return { ...DEFAULT_BEHAVIOR, ...overrides };
};

const mixWithTrend = (
  role: "primary" | "secondary" | "accent" | "background" | "text",
  color: string,
  seed: number,
  weight: number
) => {
  if (weight <= 0) return color;
  const trend = getTrendColor(role, seed);
  if (!trend) return color;
  return mixHex(color, trend, weight);
};

const deriveSurfaces = (
  background: string,
  primary: string,
  secondary: string,
  accent: string,
  basePalette: VibePreset["palette"],
  seed: number,
  behavior: ColorBehavior,
  isDark: boolean,
  variation?: {
    surface?: string;
    surfaceAlt?: string;
    borderSubtle?: string;
    borderStrong?: string;
    textMuted?: string;
  }
) => {
  const tintRange = Math.abs(jitterValue(behavior.surfaceTintRange, seed, 0.73));
  const whiteMix = isDark ? 0.12 + tintRange * 0.4 : 0.4 + tintRange * 0.3;

  const surfaceBase = mixHex(
    background,
    variation?.surface ?? basePalette.surface ?? secondary,
    0.05 + tintRange * 0.3
  );
  const surface = variation?.surface
    ? variation.surface
    : mixHex(surfaceBase, "#ffffff", whiteMix);

  const surfaceAltBase = mixHex(
    background,
    variation?.surfaceAlt ?? basePalette.surfaceAlt ?? accent,
    0.12 + tintRange * 0.4
  );
  const surfaceAlt = variation?.surfaceAlt
    ? variation.surfaceAlt
    : mixHex(surfaceAltBase, "#ffffff", whiteMix * 0.6);

  const borderSubtle = variation?.borderSubtle
    ? variation.borderSubtle
    : mixHex(
        background,
        "#ffffff",
        isDark ? 0.15 + tintRange * 0.3 : 0.3 + tintRange * 0.3
      );

  const borderStrong = variation?.borderStrong
    ? variation.borderStrong
    : mixHex(borderSubtle, primary, 0.55);

  const textMuted = variation?.textMuted
    ? variation.textMuted
    : mixHex(basePalette.textMuted, background, 0.4);

  return {
    surface,
    surfaceAlt,
    borderSubtle,
    borderStrong,
    textMuted,
  };
};

const adjustForContrast = (
  color: string,
  background: string,
  minRatio: number
) => {
  let current = color;
  let ratio = contrastRatio(current, background);

  if (ratio >= minRatio) return current;

  let { h, s, l } = hexToHsl(current);
  const bgLum = hexToLuminance(background);
  const shouldLighten = bgLum < 0.5;

  for (let i = 0; i < 8 && ratio < minRatio; i++) {
    l = clamp(l + (shouldLighten ? 6 : -6), 4, 96);
    current = hslToHex(h, s, l);
    ratio = contrastRatio(current, background);
  }

  return current;
};

/**
 * Valitsee tekstivärin taustalle niin, että kontrasti on riittävä.
 * Jos preferred ei riitä, kokeillaan puhdasta mustaa ja valkoista.
 */
function ensureReadableText(bg: string, preferred: string): string {
  const black = "#000000";
  const white = "#ffffff";

  const prefC = contrastRatio(bg, preferred);
  const blackC = contrastRatio(bg, black);
  const whiteC = contrastRatio(bg, white);

  // pientä joustoa: priorisoidaan preferred, jos se on lähellä tavoitetta
  const target = 4.5;

  if (prefC >= target) return preferred;
  if (blackC >= whiteC && blackC >= target) return black;
  if (whiteC >= blackC && whiteC >= target) return white;

  // jos mikään ei ylitä targettia, valitaan paras
  const best =
    prefC >= blackC && prefC >= whiteC
      ? preferred
      : blackC >= whiteC
      ? black
      : white;
  return best;
}

/**
 * Generoi värit käyttäen väriharmonia-algoritmia vibe:n base-väristä.
 * Jos lukittu, käytetään edellisen tilan arvoja.
 */
export function generateColors(
  vibe: VibePreset,
  seed: number,
  prevColors?: ColorSet,
  locks?: ColorLocks
): ColorSet {
  const l: Required<ColorLocks> = {
    primary: locks?.primary ?? false,
    secondary: locks?.secondary ?? false,
    accent: locks?.accent ?? false,
    background: locks?.background ?? false,
    text: locks?.text ?? false,
  };

  const base = vibe.palette;
  const behavior = behaviorFor(vibe.id);

  const variations = vibe.colorVariations ?? [];
  const variation =
    variations.length > 0
      ? variations[
          Math.floor(seededRandom(seed, 0.17) * variations.length)
        ]
      : undefined;

  const palettePrimary = variation?.primary ?? base.primary;
  const paletteSecondary = variation?.secondary ?? base.secondary;
  const paletteAccent = variation?.accent ?? base.accent;
  const paletteBackground = variation?.background ?? base.background;
  const paletteText = variation?.text ?? base.text;

  let backgroundCandidate = paletteBackground;
  if (vibe.id !== "dark") {
    backgroundCandidate = mixHex(
      backgroundCandidate,
      palettePrimary,
      behavior.backgroundTint
    );
    backgroundCandidate = mixHex(
      backgroundCandidate,
      vibe.isDarkUi ? "#050505" : "#ffffff",
      behavior.backgroundShade * (0.8 + seededRandom(seed, 0.21) * 0.4)
    );
    backgroundCandidate = mixWithTrend(
      "background",
      backgroundCandidate,
      seed + 0.19,
      behavior.backgroundTrendBias
    );
    backgroundCandidate = mixHex(
      backgroundCandidate,
      paletteBackground,
      behavior.backgroundAnchor
    );
  }

  const background =
    l.background && prevColors ? prevColors.background : backgroundCandidate;
  const backgroundSat = ensureSaturation(
    background,
    behavior.minSatBackground
  );
  const backgroundLightRange =
    behavior.backgroundLightRange ??
    (vibe.isDarkUi ? [8, 24] : [80, 95]);
  const backgroundFinal = ensureLightnessRange(
    backgroundSat,
    backgroundLightRange
  );

  // Jos kaikki päävärit on lukittu, pidetään edelliset ja huolehditaan luettavasta tekstistä
  if (l.primary && l.secondary && l.accent && prevColors) {
    const preferredText = l.text && prevColors ? prevColors.text : paletteText;
    const text = ensureReadableText(backgroundFinal, preferredText);
    return {
      ...prevColors,
      background: backgroundFinal,
      text,
    };
  }

  const baseHsl = hexToHsl(palettePrimary);
  const hueJitter = jitterValue(behavior.hueJitter, seed, 0.29);
  const satJitter = jitterValue(behavior.satJitter, seed, 0.43);
  const lightJitter = jitterValue(behavior.lightJitter, seed, 0.61);
  const anchorHue = (baseHsl.h + hueJitter + 360) % 360;
  const anchorSat = clamp(baseHsl.s + satJitter, 25, 92);
  const anchorLight = clamp(baseHsl.l + lightJitter, 20, 80);

  const harmonyType = randomHarmonyType(seed);
  const harmony = generateHarmony(
    anchorHue,
    anchorSat,
    anchorLight,
    harmonyType,
    seed,
    {
      saturationVariation: behavior.saturationVariation,
      lightnessVariation: behavior.lightnessVariation,
    }
  );

  const blendStrength = behavior.blendStrength;
  const generatedPrimary = adjustForContrast(
    mixWithTrend(
      "primary",
      mixHex(harmony.primary, palettePrimary, blendStrength),
      seed + 0.11,
      behavior.trendBias
    ),
    backgroundFinal,
    behavior.primaryContrast
  );
  const generatedSecondary = adjustForContrast(
    mixWithTrend(
      "secondary",
      mixHex(harmony.secondary, paletteSecondary, behavior.secondaryBlend),
      seed + 0.22,
      behavior.trendBias * 0.85
    ),
    backgroundFinal,
    behavior.secondaryContrast
  );
  const generatedAccent = adjustForContrast(
    mixWithTrend(
      "accent",
      mixHex(harmony.accent, paletteAccent, behavior.accentBlend),
      seed + 0.33,
      behavior.trendBias
    ),
    backgroundFinal,
    behavior.accentContrast
  );

  let primary =
    l.primary && prevColors ? prevColors.primary : generatedPrimary;
  let secondary =
    l.secondary && prevColors ? prevColors.secondary : generatedSecondary;
  let accent = l.accent && prevColors ? prevColors.accent : generatedAccent;

  if (vibe.id === "luxury") {
    if (!l.secondary) {
      secondary = mixHex(paletteSecondary, secondary, 0.2);
    }
    if (!l.accent) {
      accent = mixHex(paletteAccent, accent, 0.25);
    }
  }

  primary = ensureSaturation(primary, behavior.minSatPrimary);
  primary = ensureLightnessRange(
    primary,
    behavior.primaryLightRange ??
      (vibe.isDarkUi ? [22, 55] : [30, 65])
  );

  secondary = ensureSaturation(secondary, behavior.minSatSecondary);
  secondary = harmonizeSecondaryHue(
    primary,
    secondary,
    behavior.pairMaxHueDelta
  );
  secondary = ensureLightnessRange(
    secondary,
    behavior.secondaryLightRange ??
      (vibe.isDarkUi ? [25, 60] : [30, 65])
  );

  accent = ensureSaturation(accent, behavior.minSatAccent);
  accent = separateAccentHue(
    accent,
    primary,
    secondary,
    behavior.accentMinHueDelta,
    seed
  );
  accent = ensureLightnessRange(
    accent,
    behavior.accentLightRange ??
      (vibe.isDarkUi ? [35, 70] : [35, 72])
  );

  const preferredText = l.text && prevColors
    ? prevColors.text
    : mixWithTrend("text", paletteText, seed + 0.58, behavior.trendBias * 0.6);
  const text = ensureReadableText(backgroundFinal, preferredText);
  const onPrimary = ensureReadableText(primary, text);
  const onSecondary = ensureReadableText(secondary, text);
  const onAccent = ensureReadableText(accent, text);

  const { surface, surfaceAlt, borderSubtle, borderStrong, textMuted } =
    deriveSurfaces(
      backgroundFinal,
      primary,
      secondary,
      accent,
      base,
      seed,
      behavior,
      vibe.isDarkUi,
      variation
    );

  return {
    primary,
    secondary,
    accent,
    background: backgroundFinal,
    text,
    surface,
    surfaceAlt,
    textMuted,
    borderSubtle,
    borderStrong,
    onPrimary,
    onSecondary,
    onAccent,
  };
}
