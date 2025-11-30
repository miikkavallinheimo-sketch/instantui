import type { ColorSet, VibePreset, ColorLocks } from "./types";
import { contrastRatio, hexToHsl } from "./colorUtils";
import { generateHarmony, randomHarmonyType, type HarmonyType } from "./colorHarmony";

function randomInRange(min: number, max: number, seed: number): number {
  const x = Math.sin(seed) * 10000;
  const frac = x - Math.floor(x);
  return min + frac * (max - min);
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
 * Generoi värit käyttäen väriharmonia-algoritmia vibe:n base-väristä.
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

  // Jos kaikki värit on lukittu, käytetään edellisiä arvoja
  if (
    l.primary &&
    l.secondary &&
    l.accent &&
    prevColors
  ) {
    const preferredText =
      l.text && prevColors ? prevColors.text : base.text;
    const text = ensureReadableText(background, preferredText);
    return {
      ...prevColors,
      background,
      text,
    };
  }

  // Muunna vibe:n base-primary hex → HSL
  const baseHsl = hexToHsl(base.primary);

  // Valitse harmonia-tyyppi seedin perusteella
  const harmonyType = randomHarmonyType(seed);

  // Generoi harmoniset värit käyttäen väriharmonia-algoritmia
  const harmony = generateHarmony(
    baseHsl.h,
    baseHsl.s,
    baseHsl.l,
    harmonyType,
    seed,
    {
      type: harmonyType,
      saturationVariation: 15, // Vaihtelua saturaatiossa
      lightnessVariation: 12,  // Vaihtelua lightnessissä
    }
  );

  // Käytä lukituksia tai generoituja värejä
  const primary =
    l.primary && prevColors ? prevColors.primary : harmony.primary;

  const secondary =
    l.secondary && prevColors ? prevColors.secondary : harmony.secondary;

  const accent =
    l.accent && prevColors ? prevColors.accent : harmony.accent;

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
