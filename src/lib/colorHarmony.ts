/**
 * Väriharmonia-engine: generoi väriyhdistelmiä väriteorian perusteella
 */

export type HarmonyType = "tetradic" | "analogous" | "complementary" | "triadic" | "split-complementary";

interface HarmonyConfig {
  type: HarmonyType;
  saturationVariation: number; // 0-20: kuinka paljon saturaatio vaihtelee
  lightnessVariation: number;  // 0-20: kuinka paljon lightness vaihtelee
}

function hslToHex(h: number, s: number, l: number): string {
  h = h % 360;
  s = Math.max(0, Math.min(100, s));
  l = Math.max(0, Math.min(100, l));

  const c = ((100 - Math.abs(2 * l - 100)) * s) / 100;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l / 100 - c / 2;

  let r = 0, g = 0, b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function randomInRange(min: number, max: number, seed: number): number {
  const x = Math.sin(seed) * 10000;
  const frac = x - Math.floor(x);
  return min + frac * (max - min);
}

/**
 * Generoi väriyhdistelmiä valitun harmonia-tyypin perusteella
 */
export function generateHarmony(
  primaryHue: number,
  primarySat: number,
  primaryLight: number,
  harmonyType: HarmonyType,
  seed: number,
  config: HarmonyConfig
): { primary: string; secondary: string; accent: string } {
  // Lisää pieni saturaation ja lightnesin variaatio
  const satVar = randomInRange(-config.saturationVariation, config.saturationVariation, seed * 0.7);
  const lightVar = randomInRange(-config.lightnessVariation, config.lightnessVariation, seed * 0.8);

  const variedSat = Math.max(30, Math.min(100, primarySat + satVar));
  const variedLight = Math.max(25, Math.min(75, primaryLight + lightVar));

  const primary = hslToHex(primaryHue, variedSat, variedLight);

  let secondaryHue: number;
  let accentHue: number;

  switch (harmonyType) {
    case "tetradic":
      secondaryHue = (primaryHue + 90) % 360;
      accentHue = (primaryHue + 180) % 360;
      break;
    case "analogous":
      secondaryHue = (primaryHue + 30) % 360;
      accentHue = (primaryHue + 60) % 360;
      break;
    case "complementary":
      secondaryHue = (primaryHue + 180) % 360;
      accentHue = (primaryHue + 180 + randomInRange(-30, 30, seed * 1.5)) % 360;
      break;
    case "triadic":
      secondaryHue = (primaryHue + 120) % 360;
      accentHue = (primaryHue + 240) % 360;
      break;
    case "split-complementary":
      secondaryHue = (primaryHue + 150) % 360;
      accentHue = (primaryHue + 210) % 360;
      break;
    default:
      secondaryHue = (primaryHue + 90) % 360;
      accentHue = (primaryHue + 180) % 360;
  }

  // Secondary: hieman erilainen saturaatio ja lightness
  const secondarySat = Math.max(30, Math.min(100, variedSat - 10));
  const secondaryLight = Math.max(25, Math.min(75, variedLight + 5));
  const secondary = hslToHex(secondaryHue, secondarySat, secondaryLight);

  // Accent: korkea saturaatio, näyttävä
  const accentSat = Math.min(100, variedSat + 15);
  const accentLight = Math.max(25, Math.min(75, variedLight));
  const accent = hslToHex(accentHue, accentSat, accentLight);

  return { primary, secondary, accent };
}

/**
 * Valitse satunnainen harmonia-tyyppi, preferoidaan tietyt
 */
export function randomHarmonyType(seed: number): HarmonyType {
  const types: HarmonyType[] = [
    "tetradic",
    "analogous",
    "complementary",
    "triadic",
    "split-complementary",
  ];

  // Käytetään pientä LCG-sekvenssiä tasaisempaan jakautumiseen
  const mixedSeed = (seed * 9301 + 49297) % 233280;
  const frac = Math.abs(Math.sin(mixedSeed) * 0.5 + Math.sin(seed * 1.3) * 0.5);
  const idx = Math.floor(frac * types.length) % types.length;
  return types[idx];
}

