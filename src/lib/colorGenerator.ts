import type { ColorSet, VibePreset, ColorLocks } from "./types";
import { contrastRatio } from "./colorUtils";

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
 * Värit tulevat vibe-paleteista, mutta käytetään colorVariations-variaatioita randomisointiin.
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
  const variations = vibe.colorVariations;

  const background =
    l.background && prevColors ? prevColors.background : base.background;

  // Valitse primary: jos locked, käytä prevColors; muuten käytä variaatioista tai base
  let primary: string;
  if (l.primary && prevColors) {
    primary = prevColors.primary;
  } else if (variations?.primary && variations.primary.length > 0) {
    const index = Math.floor(Math.abs(Math.sin(seed) * 10) % variations.primary.length);
    primary = variations.primary[index];
  } else {
    primary = base.primary;
  }

  // Valitse secondary: jos locked, käytä prevColors; muuten käytä variaatioista tai base
  let secondary: string;
  if (l.secondary && prevColors) {
    secondary = prevColors.secondary;
  } else if (variations?.secondary && variations.secondary.length > 0) {
    const index = Math.floor(Math.abs(Math.sin(seed * 1.5) * 10) % variations.secondary.length);
    secondary = variations.secondary[index];
  } else {
    secondary = base.secondary;
  }

  // Valitse accent: jos locked, käytä prevColors; muuten käytä variaatioista tai base
  let accent: string;
  if (l.accent && prevColors) {
    accent = prevColors.accent;
  } else if (variations?.accent && variations.accent.length > 0) {
    const index = Math.floor(Math.abs(Math.sin(seed * 2) * 10) % variations.accent.length);
    accent = variations.accent[index];
  } else {
    accent = base.accent;
  }

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
