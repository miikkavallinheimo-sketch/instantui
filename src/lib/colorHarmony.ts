/**
 * Väriharmonia-engine: generoi väriyhdistelmiä väriteorian perusteella
 */

import { hslToHex } from "./colorUtils";

export type HarmonyType = "tetradic" | "analogous" | "complementary" | "triadic" | "split-complementary";

interface HarmonyConfig {
  type: HarmonyType;
  saturationVariation: number; // 0-20: kuinka paljon saturaatio vaihtelee
  lightnessVariation: number;  // 0-20: kuinka paljon lightness vaihtelee
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
  const idx = Math.floor(Math.abs(Math.sin(seed) * 10) % types.length);
  return types[idx];
}

