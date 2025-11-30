import type { ColorSet, VibePreset, ColorLocks } from "./types";
import {
  contrastRatio,
  hexToHsl,
  hexToLuminance,
  hslToHex,
} from "./colorUtils";
import { generateHarmony, randomHarmonyType } from "./colorHarmony";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function seededRandom(seed: number, salt = 0) {
  const x = Math.sin(seed * 1000 + salt * 9973) * 10000;
  return x - Math.floor(x);
}

function pickVariation(
  seed: number,
  salt: number,
  variations: string[] | undefined,
  fallback: string
) {
  if (variations && variations.length > 0) {
    const idx = Math.floor(seededRandom(seed, salt) * variations.length);
    return variations[idx];
  }
  return fallback;
}

function jitterValue(value: number, range: number, seed: number, salt: number) {
  const delta = (seededRandom(seed, salt) - 0.5) * 2 * range;
  return value + delta;
}

function adjustForContrast(
  color: string,
  background: string,
  target = 3.6,
  maxIterations = 12
): string {
  let adjusted = color;
  let { h, s, l } = hexToHsl(adjusted);
  const bgLum = hexToLuminance(background);
  let currentContrast = contrastRatio(adjusted, background);
  let iterations = 0;

  while (currentContrast < target && iterations < maxIterations) {
    const colorLum = hexToLuminance(adjusted);
    const shouldLighten = colorLum <= bgLum;
    const step = shouldLighten ? -4 : 4;
    l = clamp(l + step, 5, 95);
    adjusted = hslToHex(h, s, l);
    currentContrast = contrastRatio(adjusted, background);
    iterations++;
  }

  return adjusted;
}

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
 * Generoi värit vibe-paleteista käyttäen väriharmonia-algoritmia.
 * Jos lukittu, käytetään edellisen tilan arvoja.
 */
export function generateColors(
  vibe: VibePreset,
  seed: number,
  prevColors?: ColorSet,
  locks?: ColorLocks
): ColorSet {
  const l = locks ?? {
    primary: false,
    secondary: false,
    accent: false,
    background: false,
    text: false,
  };

  const base = vibe.palette;
  const background =
    l.background && prevColors ? prevColors.background : base.background;

  const variation = vibe.colorVariations ?? {};

  const basePrimaryHex = pickVariation(seed, 0.11, variation.primary, base.primary);
  const baseSecondaryHex = pickVariation(seed, 0.23, variation.secondary, base.secondary);
  const baseAccentHex = pickVariation(seed, 0.37, variation.accent, base.accent);

  const primaryHsl = hexToHsl(basePrimaryHex);
  const hue = (primaryHsl.h + jitterValue(0, vibe.isDarkUi ? 18 : 26, seed, 0.41)) % 360;
  const saturation = clamp(
    jitterValue(primaryHsl.s, vibe.isDarkUi ? 8 : 12, seed, 0.53),
    25,
    92
  );
  const lightness = clamp(
    jitterValue(primaryHsl.l, vibe.isDarkUi ? 10 : 14, seed, 0.67),
    vibe.isDarkUi ? 30 : 35,
    vibe.isDarkUi ? 70 : 78
  );

  const harmonyType = randomHarmonyType(seed + 0.17);
  const harmony = generateHarmony(hue, saturation, lightness, harmonyType, seed, {
    saturationVariation: vibe.isDarkUi ? 10 : 14,
    lightnessVariation: vibe.isDarkUi ? 9 : 12,
  });

  const primary =
    l.primary && prevColors
      ? prevColors.primary
      : adjustForContrast(harmony.primary, background, 3.8);
  const secondary =
    l.secondary && prevColors
      ? prevColors.secondary
      : adjustForContrast(
          harmony.secondary || baseSecondaryHex,
          background,
          3.4
        );
  const accent =
    l.accent && prevColors
      ? prevColors.accent
      : adjustForContrast(harmony.accent || baseAccentHex, background, 3.6);

  const preferredText =
    l.text && prevColors ? prevColors.text : base.text;

  const text = ensureReadableText(background, preferredText);

  return {
    primary,
    secondary,
    accent,
    background,
    text,
  };
}
