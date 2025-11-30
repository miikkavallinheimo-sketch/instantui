import type { ColorSet, VibePreset, ColorLocks } from "./types";
import { contrastRatio } from "./colorUtils";
import { generateHarmony, randomHarmonyType } from "./colorHarmony";

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

  // Käytä väriharmonia-algoritmia generoidaksesi harmoniset värit
  const harmonyType = randomHarmonyType(seed);
  const harmony = generateHarmony(
    220, // oletusarvo primaarille hue (voidaan optimoida vibelle)
    65,  // saturaatio
    50,  // lightness
    harmonyType,
    seed,
    {
      saturationVariation: 12,
      lightnessVariation: 10,
    }
  );

  const primary = l.primary && prevColors ? prevColors.primary : harmony.primary;
  const secondary = l.secondary && prevColors ? prevColors.secondary : harmony.secondary;
  const accent = l.accent && prevColors ? prevColors.accent : harmony.accent;

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
