import type { TypographyTokens, VibePreset, ColorSet } from "./types";
import { hexToHsl } from "./colorUtils";

interface TypographyTrendData {
  typographyTrends?: Array<{
    rule?: string;
    rationale?: string;
    context?: string;
    exampleSizes?: string;
    recommendedScaleRatio?: number;
    recommendedWeightPairs?: Array<{
      body: number;
      heading: number;
    }>;
  }>;
}

const SIZE_ORDER = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
const SIZE_VALUES: Record<string, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
};

// Jitter-funktiot
const applyJitter = (value: number, maxJitter: number): number => {
  const jitter = (Math.random() - 0.5) * 2 * maxJitter;
  return Math.round(value + jitter);
};

const jitterWeight = (weight: number): number => {
  const maxJitter = Math.floor(weight * 0.1); // ±10%
  return applyJitter(weight, maxJitter);
};

// Get base font size for type scale calculation
function getBaseSize(vibeId: string): number {
  // Different vibes may have different base sizes
  const baseSizes: Record<string, number> = {
    "magazine-brutalism": 1.125, // 18px
    "warm-editorial": 1.125,
    "default": 1,
  };
  return baseSizes[vibeId] || baseSizes.default;
}

// Generate H1-H4 hierarchy using 1.25 type scale
function generateTypographyScale(
  current: TypographyTokens,
  vibe: VibePreset
): TypographyTokens {
  const baseSize = getBaseSize(vibe.id);
  const scaleRatio = 1.25;

  // Convert rem to size token
  const remToToken = (rem: number): string => {
    // Map rem values back to SIZE_ORDER tokens
    const remValues: Record<number, string> = {
      12: "xs",
      14: "sm",
      16: "md",
      18: "lg",
      20: "xl",
      24: "2xl",
    };
    const px = Math.round(rem * 16); // Convert rem to px
    return remValues[px] || "md"; // Fallback
  };

  const basePx = baseSize * 16; // Convert to px

  return {
    h1: {
      size: remToToken(baseSize * scaleRatio ** 3), // ~2rem / 32px
      weight: 700,
      style: current.heading?.style || "normal",
      transform: current.heading?.transform,
    },
    h2: {
      size: remToToken(baseSize * scaleRatio ** 2), // ~1.5rem / 24px
      weight: 600,
      style: current.heading?.style || "normal",
      transform: current.heading?.transform,
    },
    h3: {
      size: remToToken(baseSize * scaleRatio), // ~1.25rem / 20px
      weight: 600,
      style: "normal",
    },
    h4: {
      size: remToToken(baseSize), // 1rem / 16px
      weight: 500,
      style: "normal",
    },
    body: {
      size: remToToken(baseSize * 0.875), // 0.875rem / 14px
      weight: current.body.weight,
      style: current.body.style || "normal",
    },
    accent: {
      size: remToToken(baseSize * 0.75), // 0.75rem / 12px
      weight: current.accent.weight,
      style: current.accent.style || "normal",
      transform: current.accent.transform,
    },
    // Backward compatibility aliases
    heading: {
      size: remToToken(baseSize * scaleRatio ** 3),
      weight: 700,
      style: current.heading?.style || "normal",
      transform: current.heading?.transform,
    },
    subheading: {
      size: remToToken(baseSize * scaleRatio ** 2),
      weight: 600,
      style: current.heading?.style || "normal",
      transform: current.heading?.transform,
    },
  };
}

// Pääoptimointifunktio
export function optimizeTypography(
  current: TypographyTokens,
  vibe: VibePreset,
  colors: ColorSet,
  trends?: TypographyTrendData
): TypographyTokens {
  // Generate H1-H4 scale
  let optimized = generateTypographyScale(current, vibe);

  // Create mutable copies
  optimized.h1 = { ...optimized.h1 };
  optimized.h2 = { ...optimized.h2 };
  optimized.h3 = { ...optimized.h3 };
  optimized.h4 = { ...optimized.h4 };
  optimized.body = { ...optimized.body };
  optimized.accent = { ...optimized.accent };
  if (optimized.heading) optimized.heading = { ...optimized.heading };
  if (optimized.subheading) optimized.subheading = { ...optimized.subheading };

  // A) Hierarkian validointi - SIZE
  const headingIdx = SIZE_ORDER.indexOf(
    optimized.heading.size as typeof SIZE_ORDER[number]
  );
  const bodyIdx = SIZE_ORDER.indexOf(
    optimized.body.size as typeof SIZE_ORDER[number]
  );

  if (headingIdx - bodyIdx < 3) {
    // Korjaa aina: kasvata headingia - vähintään 3 kokoa eri
    const newHeadingIdx = Math.min(bodyIdx + 3, SIZE_ORDER.length - 1);
    optimized.heading.size = SIZE_ORDER[newHeadingIdx];
  }

  // Subheading 1-2 kokoa pienempi kuin heading
  if (optimized.subheading) {
    const subIdx = SIZE_ORDER.indexOf(
      optimized.subheading.size as typeof SIZE_ORDER[number]
    );
    // Aseta subheading 2 kokoa pienemmäksi (tai enemmän jos se on liian suuri)
    const targetSubIdx = Math.max(0, headingIdx - 2);
    if (subIdx !== targetSubIdx) {
      optimized.subheading.size = SIZE_ORDER[targetSubIdx];
    }
  }

  // B) Weight-hierarkia
  const weightDiff = optimized.heading.weight - optimized.body.weight;
  if (weightDiff < 200) {
    const targetHeadingWeight = optimized.body.weight + 200;
    if (targetHeadingWeight <= 900) {
      optimized.heading.weight = targetHeadingWeight;
    } else {
      optimized.body.weight = Math.max(300, optimized.heading.weight - 200);
    }
  }

  // Subheading weight puolivälissä
  if (optimized.subheading) {
    const midWeight = Math.floor(
      (optimized.body.weight + optimized.heading.weight) / 2
    );
    const targetSubWeight = Math.max(
      midWeight,
      optimized.body.weight + 100
    );
    optimized.subheading.weight = Math.min(
      targetSubWeight,
      optimized.heading.weight - 100
    );
  }

  // Accent ei saa olla painavampi kuin heading
  if (optimized.accent.weight > optimized.heading.weight) {
    optimized.accent.weight = Math.min(optimized.heading.weight, 700);
  }

  // C) Kontrasti-optimointi
  // Yksinkertaistettu: jos teksti on musta/tumma ja tausta vaalea (tai päinvastoin)
  // Tarkista että luettavuus on kunnossa
  const textHsl = hexToHsl(colors.text);
  const bgHsl = hexToHsl(colors.background);
  const lightnessDiff = Math.abs(textHsl.l - bgHsl.l);

  if (lightnessDiff < 40) {
    // Heikko kontrasti: kasvata fonttikokoa tai painoa
    if (
      optimized.body.size === "xs" ||
      optimized.body.size === "sm"
    ) {
      optimized.body.size = "md";
    }
    // TAI kasvata weightia
    if (optimized.body.weight < 500) {
      optimized.body.weight = Math.min(optimized.body.weight + 100, 600);
    }
  }

  // D) Vibe-spesifiset säännöt
  if (vibe.id === "brutalist") {
    if (optimized.heading.weight < 700) {
      optimized.heading.weight = 700;
    }
    if (
      SIZE_ORDER.indexOf(optimized.heading.size as typeof SIZE_ORDER[number]) <
      SIZE_ORDER.indexOf("xl" as typeof SIZE_ORDER[number])
    ) {
      optimized.heading.size = "xl";
    }
  }

  if (vibe.id === "luxury") {
    // Lisää italic-tyyli
    if (Math.random() > 0.5) {
      optimized.heading.style = "italic";
    }
    if (optimized.subheading && Math.random() > 0.6) {
      optimized.subheading.style = "italic";
    }
  }

  if (vibe.id === "minimal") {
    if (optimized.heading.weight > 600) {
      optimized.heading.weight = 600;
    }
    if (optimized.body.weight > 500) {
      optimized.body.weight = 500;
    }
  }

  // E) Trend-pohjaiset optimoinnit (25% painoarvo)
  if (trends?.typographyTrends && trends.typographyTrends.length > 0) {
    // Vain 25% ajasta sovelletaan trendejä
    if (Math.random() < 0.25) {
      const trend = trends.typographyTrends[0];

      // Yritä soveltaa weight-pareja jos löytyy
      if (trend.recommendedWeightPairs && trend.recommendedWeightPairs.length > 0) {
        const pair = trend.recommendedWeightPairs[0];
        optimized.body.weight = pair.body;
        optimized.heading.weight = pair.heading;
      }
    }
  }

  // F) Saturaation mukaan säätö
  const primaryHsl = hexToHsl(colors.primary);
  const secondaryHsl = hexToHsl(colors.secondary);
  const avgSat = (primaryHsl.s + secondaryHsl.s) / 2;

  if (avgSat < 40) {
    // Matala saturaatio: lisää typografista painoa
    optimized.heading.weight = Math.min(optimized.heading.weight + 100, 900);
  }

  // G) Lopullinen jitter - sovella weight-arvoon
  const jittered = {
    ...optimized,
    heading: {
      ...optimized.heading,
      weight: jitterWeight(optimized.heading.weight),
    },
    body: {
      ...optimized.body,
      weight: jitterWeight(optimized.body.weight),
    },
    accent: {
      ...optimized.accent,
      weight: jitterWeight(optimized.accent.weight),
    },
  };

  if (jittered.subheading) {
    jittered.subheading = {
      ...jittered.subheading,
      weight: jitterWeight(jittered.subheading.weight),
    };
  }

  // Lopullinen validointi: varmista hierarkia jitterin jälkeen
  if (jittered.heading.weight - jittered.body.weight < 200) {
    jittered.heading.weight = jittered.body.weight + 200;
  }

  return jittered;
}
