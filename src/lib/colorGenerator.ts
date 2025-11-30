import type { ColorSet, VibePreset, ColorLocks } from "./types";
import { hslToHex, contrastRatio } from "./colorUtils";

function randomInRange(min: number, max: number, seed: number): number {
  const x = Math.sin(seed) * 10000;
  const frac = x - Math.floor(x);
  return min + frac * (max - min);
}

/**
 * Väriharmonian algoritmi: käytämme tetradic väriskeemiä
 * (4 väriä tasaisesti ympäri väriympyrän)
 * Primary → +90° (Secondary) → +180° (Accent) → +270° (Tertiary)
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

  // Käytä primaryHueRange jos olemassa, muuten fallback primaryHue
  const hueMin = vibe.primaryHueRange ? vibe.primaryHueRange[0] : vibe.primaryHue - 30;
  const hueMax = vibe.primaryHueRange ? vibe.primaryHueRange[1] : vibe.primaryHue + 30;
  const primaryHue = randomInRange(hueMin, hueMax, seed * 0.9);

  const s = randomInRange(
    vibe.primarySatRange[0],
    vibe.primarySatRange[1],
    seed * 1.1
  );
  const light = randomInRange(
    vibe.primaryLightRange[0],
    vibe.primaryLightRange[1],
    seed * 1.3
  );

  const newPrimary = hslToHex(primaryHue, s, light);
  const primary = l.primary && prevColors ? prevColors.primary : newPrimary;

  // SECONDARY: +90° hue offset (tetradic harmony)
  // Alempi saturaatio ja lightness sekä-säilyttämiselle
  const secondaryHue = (primaryHue + 90) % 360;
  const secondarySat = Math.max(30, Math.min(100, s - 15)); // Hieman vähemmän saturated
  const secondaryLight = Math.max(45, Math.min(85, light + 5)); // Hieman vaaleampi
  const newSecondary = hslToHex(secondaryHue, secondarySat, secondaryLight);
  const secondary = l.secondary && prevColors ? prevColors.secondary : newSecondary;

  // ACCENT: +180° hue offset (vastakkainen primary) - complementary väri
  // Korkea saturaatio, värillinen, näyttävä
  const accentHue = (primaryHue + 180) % 360;
  const accentSat = Math.min(100, s + 20); // Korkea saturaatio
  const accentLight = Math.max(40, Math.min(70, light)); // Mid-range
  const newAccent = hslToHex(accentHue, accentSat, accentLight);
  const accent = l.accent && prevColors ? prevColors.accent : newAccent;

  // BACKGROUND: käytä primary-hue mutta neutraali saturaatio ja light
  const newBackground = hslToHex(
    primaryHue,
    vibe.isDarkUi ? 15 : 8,
    vibe.bgLightness
  );
  const background = l.background && prevColors ? prevColors.background : newBackground;

  // TEXT: automaattinen kontrasti background:n kanssa
  const black = "#0a0a0a";
  const white = "#ffffff";
  const contrastWithBlack = contrastRatio(background, black);
  const contrastWithWhite = contrastRatio(background, white);

  const autoText =
    contrastWithBlack >= contrastWithWhite && contrastWithBlack >= 4.0
      ? black
      : white;

  const text = l.text && prevColors ? prevColors.text : autoText;

  return {
    primary,
    secondary,
    accent,
    background,
    text,
  };
}
