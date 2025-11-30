import type { ColorSet, VibePreset, ColorLocks } from "./types";
import { hslToHex, contrastRatio } from "./colorUtils";

function randomInRange(min: number, max: number, seed: number): number {
  const x = Math.sin(seed) * 10000;
  const frac = x - Math.floor(x);
  return min + frac * (max - min);
}

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
  const hue = randomInRange(hueMin, hueMax, seed * 0.9);

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

  const newPrimary = hslToHex(hue, s, light);
  const primary = l.primary && prevColors ? prevColors.primary : newPrimary;

  const secondaryHue =
    (vibe.primaryHue + 180 + randomInRange(-20, 20, seed * 2.1)) % 360;
  const newSecondary = hslToHex(
    secondaryHue,
    Math.min(100, s + randomInRange(-10, 10, seed * 2.3)),
    Math.max(10, Math.min(90, light + randomInRange(-10, 10, seed * 2.5)))
  );
  const secondary =
    l.secondary && prevColors ? prevColors.secondary : newSecondary;

  const accentHue =
    (vibe.primaryHue + randomInRange(40, 120, seed * 3.1)) % 360;
  const newAccent = hslToHex(
    accentHue,
    Math.min(100, s + 10),
    Math.max(30, Math.min(80, light + 10))
  );
  const accent = l.accent && prevColors ? prevColors.accent : newAccent;

  const newBackground = hslToHex(
    vibe.primaryHue,
    vibe.isDarkUi ? 15 : 8,
    vibe.bgLightness
  );
  const background =
    l.background && prevColors ? prevColors.background : newBackground;

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
