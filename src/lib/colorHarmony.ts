import { hslToHex } from "./colorUtils";

export type HarmonyType =
  | "analogous"
  | "split-complementary"
  | "triadic"
  | "tetradic"
  | "complementary";

const HARMONY_TYPES: HarmonyType[] = [
  "analogous",
  "split-complementary",
  "triadic",
  "tetradic",
  "complementary",
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const rotateHue = (hue: number, delta: number) =>
  (hue + delta + 360) % 360;

export const randomHarmonyType = (seed: number): HarmonyType => {
  const index = Math.floor(Math.abs(Math.sin(seed * 7919)) * HARMONY_TYPES.length);
  return HARMONY_TYPES[index % HARMONY_TYPES.length];
};

interface HarmonyOptions {
  saturationVariation?: number;
  lightnessVariation?: number;
}

const withVariation = (
  base: number,
  maxDelta: number,
  seed: number,
  offset: number,
  min = 0,
  max = 100
) => {
  if (maxDelta <= 0) return clamp(base, min, max);
  const delta = (Math.sin(seed * 9973 + offset * 53) * maxDelta) / 2;
  return clamp(base + delta, min, max);
};

export const generateHarmony = (
  hue: number,
  saturation: number,
  lightness: number,
  harmonyType: HarmonyType,
  seed: number,
  options: HarmonyOptions = {}
) => {
  const satVar = options.saturationVariation ?? 10;
  const lightVar = options.lightnessVariation ?? 8;

  const buildColor = (h: number, idx: number) =>
    hslToHex(
      (h + 360) % 360,
      withVariation(saturation, satVar, seed, idx * 0.31, 15, 95),
      withVariation(lightness, lightVar, seed, idx * 0.47, 8, 92)
    );

  let h2 = hue;
  let h3 = hue;

  switch (harmonyType) {
    case "analogous":
      h2 = rotateHue(hue, 20 + Math.sin(seed * 13) * 18);
      h3 = rotateHue(hue, -25 + Math.sin(seed * 29) * 18);
      break;
    case "split-complementary":
      h2 = rotateHue(hue, 150 + Math.sin(seed * 11) * 10);
      h3 = rotateHue(hue, -150 + Math.sin(seed * 17) * 10);
      break;
    case "triadic":
      h2 = rotateHue(hue, 120);
      h3 = rotateHue(hue, -120);
      break;
    case "tetradic":
      h2 = rotateHue(hue, 90);
      h3 = rotateHue(hue, 180);
      break;
    case "complementary":
    default:
      h2 = rotateHue(hue, 180);
      h3 = rotateHue(hue, 30 + Math.sin(seed * 23) * 15);
      break;
  }

  return {
    primary: buildColor(hue, 0),
    secondary: buildColor(h2, 1),
    accent: buildColor(h3, 2),
  };
};
