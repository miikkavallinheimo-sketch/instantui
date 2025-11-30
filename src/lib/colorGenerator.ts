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
 * Ei mitään randomia: värit tulevat suoraan vibe-paleteista.
 * Lukitukset tarkoittavat, että käytetään edellisen tilan arvoja, jos olemassa.
 */
export function generateColors(
  vibe: VibePreset,
  _seed: number,
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

  const primary =
    l.primary && prevColors ? prevColors.primary : base.primary;

  const secondary =
    l.secondary && prevColors ? prevColors.secondary : base.secondary;

  const accent = l.accent && prevColors ? prevColors.accent : base.accent;

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
