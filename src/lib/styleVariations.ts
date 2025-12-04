import type {
  BorderToken,
  ComponentShape,
  RadiusToken,
  ShadowToken,
  TypographyTokens,
  VibeId,
  VibePreset,
  VibeUiTokens,
} from "./types";

type ComponentKey = "buttonPrimary" | "buttonSecondary" | "card";

interface ComponentVariationRule {
  radiusOptions?: RadiusToken[];
  shadowOptions?: ShadowToken[];
  borderOptions?: BorderToken[];
}

interface TypographyVariationRule {
  headingSizes: TypographyTokens["heading"]["size"][];
  subheadingSizes: NonNullable<TypographyTokens["subheading"]>["size"][];
  bodySizes: TypographyTokens["body"]["size"][];
  accentSizes: TypographyTokens["accent"]["size"][];
  headingWeights: number[];
  subheadingWeights: number[];
  bodyWeights: number[];
  accentWeights: number[];
  headingItalicChance: number;
  subheadingItalicChance: number;
  bodyItalicChance: number;
  accentItalicChance: number;
  headingUppercaseChance?: number;
  subheadingUppercaseChance?: number;
  bodyUppercaseChance?: number;
  accentUppercaseChance?: number;
}

interface VariationSettings {
  components: Record<ComponentKey, ComponentVariationRule>;
  typography: TypographyVariationRule;
}

const seededRandom = (seed: number, offset: number) => {
  const x = Math.sin(seed * 997 + offset * 7919) * 10000;
  return x - Math.floor(x);
};

const pickOption = <T,>(
  options: readonly T[] | undefined,
  fallback: T,
  seed: number,
  offset: number
): T => {
  if (!options || options.length === 0) return fallback;
  const idx = Math.floor(seededRandom(seed, offset) * options.length);
  return options[idx] ?? fallback;
};

const pickStyle = (
  base: "normal" | "italic",
  chance: number,
  seed: number,
  offset: number
): "normal" | "italic" => {
  const roll = seededRandom(seed, offset);
  if (base === "italic") {
    return roll < Math.max(0.65, chance) ? "italic" : "normal";
  }
  return roll < chance ? "italic" : "normal";
};

const pickTransform = (
  base: "none" | "uppercase" | undefined,
  chance: number | undefined,
  seed: number,
  offset: number
): "none" | "uppercase" => {
  if (!chance || chance <= 0) return base ?? "none";
  const roll = seededRandom(seed, offset);
  if (base === "uppercase") {
    return roll < Math.max(0.65, chance) ? "uppercase" : "none";
  }
  return roll < chance ? "uppercase" : "none";
};

const buildComponentShape = (
  base: ComponentShape,
  rule: ComponentVariationRule,
  seed: number,
  baseOffset: number
): ComponentShape => {
  return {
    radius: pickOption(rule.radiusOptions, base.radius, seed, baseOffset),
    shadow: pickOption(rule.shadowOptions, base.shadow, seed, baseOffset + 0.13),
    border: pickOption(rule.borderOptions, base.border, seed, baseOffset + 0.31),
  };
};

const HEADING_SIZE_ORDER: TypographyTokens["heading"]["size"][] = [
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
];

const SUBHEADING_SIZE_ORDER: NonNullable<
  TypographyTokens["subheading"]
>["size"][] = ["sm", "md", "lg", "xl"];

const deriveSubheadingSize = (
  size: TypographyTokens["heading"]["size"]
): NonNullable<TypographyTokens["subheading"]>["size"] => {
  const index = HEADING_SIZE_ORDER.indexOf(size);
  const subIndex = Math.max(
    0,
    Math.min(SUBHEADING_SIZE_ORDER.length - 1, index - 1)
  );
  return SUBHEADING_SIZE_ORDER[subIndex];
};

const deriveSubheadingBase = (base: TypographyTokens) => {
  if (base.subheading) return base.subheading;
  return {
    size: deriveSubheadingSize(base.heading.size),
    weight: Math.max(base.body.weight, base.heading.weight - 100),
    style: base.heading.style,
    transform: base.heading.transform ?? "none",
  };
};

const buildTypography = (
  base: TypographyTokens,
  rule: TypographyVariationRule,
  seed: number
): TypographyTokens => {
  const subheadingBase = deriveSubheadingBase(base);
  return {
    heading: {
      size: pickOption(rule.headingSizes, base.heading.size, seed, 0.11),
      weight: pickOption(rule.headingWeights, base.heading.weight, seed, 0.21),
      style: pickStyle(base.heading.style, rule.headingItalicChance, seed, 0.31),
      transform: pickTransform(
        base.heading.transform,
        rule.headingUppercaseChance,
        seed,
        0.35
      ),
    },
    subheading: {
      size: pickOption(
        rule.subheadingSizes,
        subheadingBase.size,
        seed,
        0.33
      ),
      weight: pickOption(
        rule.subheadingWeights,
        subheadingBase.weight,
        seed,
        0.37
      ),
      style: pickStyle(
        subheadingBase.style,
        rule.subheadingItalicChance,
        seed,
        0.39
      ),
      transform: pickTransform(
        subheadingBase.transform,
        rule.subheadingUppercaseChance,
        seed,
        0.43
      ),
    },
    body: {
      size: pickOption(rule.bodySizes, base.body.size, seed, 0.41),
      weight: pickOption(rule.bodyWeights, base.body.weight, seed, 0.51),
      style: pickStyle(base.body.style, rule.bodyItalicChance, seed, 0.61),
      transform: pickTransform(
        base.body.transform,
        rule.bodyUppercaseChance,
        seed,
        0.63
      ),
    },
    accent: {
      size: pickOption(rule.accentSizes, base.accent.size, seed, 0.71),
      weight: pickOption(rule.accentWeights, base.accent.weight, seed, 0.81),
      style: pickStyle(base.accent.style, rule.accentItalicChance, seed, 0.91),
      transform: pickTransform(
        base.accent.transform,
        rule.accentUppercaseChance,
        seed,
        0.95
      ),
    },
  };
};

const createSettings = (overrides: VariationSettings): VariationSettings =>
  overrides;

const VARIATION_SETTINGS: Record<VibeId, VariationSettings> = {
  minimal: createSettings({
    components: {
      buttonPrimary: {
        radiusOptions: ["md", "lg", "xl", "full"],
        shadowOptions: ["none", "sm"],
        borderOptions: ["none", "subtle"],
      },
      buttonSecondary: {
        radiusOptions: ["md", "lg", "xl"],
        shadowOptions: ["none"],
        borderOptions: ["subtle", "lg"],
      },
      card: {
        radiusOptions: ["lg", "xl"],
        shadowOptions: ["none", "sm"],
        borderOptions: ["subtle"],
      },
    },
    typography: {
      headingSizes: ["lg", "xl", "2xl"],
      subheadingSizes: ["md", "lg", "xl"],
      bodySizes: ["sm", "md"],
      accentSizes: ["xs", "sm"],
      headingWeights: [500, 600, 700],
      subheadingWeights: [500, 600],
      bodyWeights: [400, 500],
      accentWeights: [400, 500, 600],
      headingItalicChance: 0.12,
      subheadingItalicChance: 0.1,
      bodyItalicChance: 0.05,
      accentItalicChance: 0.3,
    },
  }),
  "modern-saas": createSettings({
    components: {
      buttonPrimary: {
        radiusOptions: ["md", "lg", "xl", "full"],
        shadowOptions: ["none", "sm", "lg"],
        borderOptions: ["none", "subtle"],
      },
      buttonSecondary: {
        radiusOptions: ["md", "lg", "xl"],
        shadowOptions: ["none", "sm"],
        borderOptions: ["subtle", "lg"],
      },
      card: {
        radiusOptions: ["lg", "xl"],
        shadowOptions: ["sm", "lg"],
        borderOptions: ["subtle"],
      },
    },
    typography: {
      headingSizes: ["xl", "2xl"],
      subheadingSizes: ["lg", "xl"],
      bodySizes: ["sm", "md"],
      accentSizes: ["xs", "sm", "md"],
      headingWeights: [600, 700, 800],
      subheadingWeights: [500, 600],
      bodyWeights: [400, 500],
      accentWeights: [500, 600],
      headingItalicChance: 0.05,
      subheadingItalicChance: 0.05,
      bodyItalicChance: 0.03,
      accentItalicChance: 0.12,
      headingUppercaseChance: 0.25,
      subheadingUppercaseChance: 0.25,
    },
  }),
  brutalist: createSettings({
    components: {
      buttonPrimary: {
        radiusOptions: ["none", "sm", "md"],
        shadowOptions: ["none"],
        borderOptions: ["lg"],
      },
      buttonSecondary: {
        radiusOptions: ["none", "sm"],
        shadowOptions: ["none"],
        borderOptions: ["lg"],
      },
      card: {
        radiusOptions: ["none", "sm"],
        shadowOptions: ["none"],
        borderOptions: ["lg"],
      },
    },
    typography: {
      headingSizes: ["xl", "2xl"],
      subheadingSizes: ["md", "lg"],
      bodySizes: ["sm"],
      accentSizes: ["xs", "sm"],
      headingWeights: [700, 800, 900],
      subheadingWeights: [600, 700],
      bodyWeights: [400, 500],
      accentWeights: [500, 600, 700],
      headingItalicChance: 0.05,
      subheadingItalicChance: 0.05,
      bodyItalicChance: 0.05,
      accentItalicChance: 0.05,
      headingUppercaseChance: 0.35,
      subheadingUppercaseChance: 0.3,
      accentUppercaseChance: 0.4,
    },
  }),
  pastel: createSettings({
    components: {
      buttonPrimary: {
        radiusOptions: ["lg", "xl", "full"],
        shadowOptions: ["sm"],
        borderOptions: ["none"],
      },
      buttonSecondary: {
        radiusOptions: ["lg", "xl", "full"],
        shadowOptions: ["none"],
        borderOptions: ["subtle"],
      },
      card: {
        radiusOptions: ["lg", "xl"],
        shadowOptions: ["sm"],
        borderOptions: ["subtle"],
      },
    },
    typography: {
      headingSizes: ["lg", "xl"],
      subheadingSizes: ["md", "lg"],
      bodySizes: ["sm", "md"],
      accentSizes: ["xs", "sm"],
      headingWeights: [500, 600, 700],
      subheadingWeights: [500, 600],
      bodyWeights: [400, 500],
      accentWeights: [400, 500],
      headingItalicChance: 0.35,
      subheadingItalicChance: 0.25,
      bodyItalicChance: 0.1,
      accentItalicChance: 0.4,
    },
  }),
  "dark-tech": createSettings({
    components: {
      buttonPrimary: {
        radiusOptions: ["sm", "md", "lg"],
        shadowOptions: ["lg"],
        borderOptions: ["none"],
      },
      buttonSecondary: {
        radiusOptions: ["sm", "md", "lg"],
        shadowOptions: ["none"],
        borderOptions: ["subtle", "lg"],
      },
      card: {
        radiusOptions: ["md", "lg"],
        shadowOptions: ["lg"],
        borderOptions: ["subtle"],
      },
    },
    typography: {
      headingSizes: ["xl", "2xl"],
      subheadingSizes: ["lg", "xl"],
      bodySizes: ["md"],
      accentSizes: ["sm"],
      headingWeights: [600, 700, 800],
      subheadingWeights: [500, 600],
      bodyWeights: [400, 500],
      accentWeights: [500, 600],
      headingItalicChance: 0.08,
      subheadingItalicChance: 0.08,
      bodyItalicChance: 0.05,
      accentItalicChance: 0.2,
      headingUppercaseChance: 0.4,
      subheadingUppercaseChance: 0.35,
    },
  }),
  luxury: createSettings({
    components: {
      buttonPrimary: {
        radiusOptions: ["sm", "md"],
        shadowOptions: ["lg"],
        borderOptions: ["none"],
      },
      buttonSecondary: {
        radiusOptions: ["sm", "md"],
        shadowOptions: ["none"],
        borderOptions: ["subtle"],
      },
      card: {
        radiusOptions: ["md", "lg"],
        shadowOptions: ["lg"],
        borderOptions: ["subtle"],
      },
    },
    typography: {
      headingSizes: ["lg", "xl", "2xl"],
      subheadingSizes: ["md", "lg"],
      bodySizes: ["md"],
      accentSizes: ["sm"],
      headingWeights: [500, 600, 700],
      subheadingWeights: [500, 600],
      bodyWeights: [400, 500],
      accentWeights: [500, 600],
      headingItalicChance: 0.55,
      subheadingItalicChance: 0.4,
      bodyItalicChance: 0.15,
      accentItalicChance: 0.4,
      headingUppercaseChance: 0.3,
      subheadingUppercaseChance: 0.25,
    },
  }),
  "soft-neo-tech": createSettings({
    components: {
      buttonPrimary: {
        radiusOptions: ["lg", "xl", "full"],
        shadowOptions: ["sm"],
        borderOptions: ["none"],
      },
      buttonSecondary: {
        radiusOptions: ["lg", "xl", "full"],
        shadowOptions: ["none"],
        borderOptions: ["subtle"],
      },
      card: {
        radiusOptions: ["lg", "xl"],
        shadowOptions: ["sm"],
        borderOptions: ["subtle"],
      },
    },
    typography: {
      headingSizes: ["lg", "xl"],
      subheadingSizes: ["md", "lg"],
      bodySizes: ["sm", "md"],
      accentSizes: ["xs", "sm"],
      headingWeights: [500, 600],
      subheadingWeights: [500, 600],
      bodyWeights: [400, 500],
      accentWeights: [400, 500],
      headingItalicChance: 0.15,
      subheadingItalicChance: 0.15,
      bodyItalicChance: 0.12,
      accentItalicChance: 0.35,
    },
  }),
  "gradient-bloom": createSettings({
    components: {
      buttonPrimary: {
        radiusOptions: ["lg", "xl", "full"],
        shadowOptions: ["sm", "lg"],
        borderOptions: ["none"],
      },
      buttonSecondary: {
        radiusOptions: ["lg", "xl", "full"],
        shadowOptions: ["none"],
        borderOptions: ["subtle"],
      },
      card: {
        radiusOptions: ["lg", "xl"],
        shadowOptions: ["sm"],
        borderOptions: ["subtle"],
      },
    },
    typography: {
      headingSizes: ["xl", "2xl"],
      subheadingSizes: ["lg", "xl"],
      bodySizes: ["md"],
      accentSizes: ["sm", "md"],
      headingWeights: [600, 700],
      subheadingWeights: [500, 600],
      bodyWeights: [400, 500],
      accentWeights: [500, 600],
      headingItalicChance: 0.35,
      subheadingItalicChance: 0.3,
      bodyItalicChance: 0.15,
      accentItalicChance: 0.4,
      headingUppercaseChance: 0.35,
      subheadingUppercaseChance: 0.3,
    },
  }),
  "warm-editorial": createSettings({
    components: {
      buttonPrimary: {
        radiusOptions: ["md", "lg"],
        shadowOptions: ["sm"],
        borderOptions: ["none"],
      },
      buttonSecondary: {
        radiusOptions: ["md", "lg"],
        shadowOptions: ["none"],
        borderOptions: ["subtle"],
      },
      card: {
        radiusOptions: ["lg"],
        shadowOptions: ["sm"],
        borderOptions: ["subtle"],
      },
    },
    typography: {
      headingSizes: ["lg", "xl", "2xl"],
      subheadingSizes: ["md", "lg"],
      bodySizes: ["md"],
      accentSizes: ["sm"],
      headingWeights: [600, 700],
      subheadingWeights: [500, 600],
      bodyWeights: [400, 500],
      accentWeights: [500, 600],
      headingItalicChance: 0.5,
      subheadingItalicChance: 0.35,
      bodyItalicChance: 0.2,
      accentItalicChance: 0.4,
    },
  }),
  "retro-pixel": createSettings({
    components: {
      buttonPrimary: {
        radiusOptions: ["none", "sm"],
        shadowOptions: ["lg"],
        borderOptions: ["lg"],
      },
      buttonSecondary: {
        radiusOptions: ["none", "sm"],
        shadowOptions: ["lg"],
        borderOptions: ["lg"],
      },
      card: {
        radiusOptions: ["none"],
        shadowOptions: ["lg"],
        borderOptions: ["lg"],
      },
    },
    typography: {
      headingSizes: ["xl", "2xl"],
      subheadingSizes: ["md", "lg"],
      bodySizes: ["sm"],
      accentSizes: ["xs", "sm"],
      headingWeights: [700, 800, 900],
      subheadingWeights: [600, 700],
      bodyWeights: [400, 500],
      accentWeights: [500, 600],
      headingItalicChance: 0.08,
      subheadingItalicChance: 0.08,
      bodyItalicChance: 0.05,
      accentItalicChance: 0.08,
      headingUppercaseChance: 0.5,
      subheadingUppercaseChance: 0.45,
    },
  }),
  "magazine-brutalism": createSettings({
    components: {
      buttonPrimary: {
        radiusOptions: ["none", "sm"],
        shadowOptions: ["lg"],
        borderOptions: ["lg"],
      },
      buttonSecondary: {
        radiusOptions: ["none", "sm"],
        shadowOptions: ["lg"],
        borderOptions: ["lg"],
      },
      card: {
        radiusOptions: ["sm", "md"],
        shadowOptions: ["sm"],
        borderOptions: ["lg"],
      },
    },
    typography: {
      headingSizes: ["xl", "2xl"],
      subheadingSizes: ["md", "lg"],
      bodySizes: ["sm", "md"],
      accentSizes: ["xs", "sm"],
      headingWeights: [700, 800, 900],
      subheadingWeights: [600, 700],
      bodyWeights: [400, 500],
      accentWeights: [500, 600],
      headingItalicChance: 0.2,
      subheadingItalicChance: 0.15,
      bodyItalicChance: 0.08,
      accentItalicChance: 0.1,
      headingUppercaseChance: 0.55,
      subheadingUppercaseChance: 0.4,
      accentUppercaseChance: 0.35,
    },
  }),
  "cyber-mint": createSettings({
    components: {
      buttonPrimary: {
        radiusOptions: ["sm", "md", "lg"],
        shadowOptions: ["lg"],
        borderOptions: ["none"],
      },
      buttonSecondary: {
        radiusOptions: ["sm", "md"],
        shadowOptions: ["none"],
        borderOptions: ["subtle"],
      },
      card: {
        radiusOptions: ["md", "lg"],
        shadowOptions: ["sm"],
        borderOptions: ["subtle"],
      },
    },
    typography: {
      headingSizes: ["lg", "xl"],
      subheadingSizes: ["md", "lg"],
      bodySizes: ["sm", "md"],
      accentSizes: ["xs", "sm"],
      headingWeights: [500, 600, 700],
      subheadingWeights: [500, 600],
      bodyWeights: [400, 500],
      accentWeights: [400, 500],
      headingItalicChance: 0.1,
      subheadingItalicChance: 0.1,
      bodyItalicChance: 0.05,
      accentItalicChance: 0.2,
      headingUppercaseChance: 0.45,
      subheadingUppercaseChance: 0.35,
    },
  }),
  dark: createSettings({
    components: {
      buttonPrimary: {
        radiusOptions: ["sm", "md"],
        shadowOptions: ["lg"],
        borderOptions: ["none"],
      },
      buttonSecondary: {
        radiusOptions: ["sm", "md"],
        shadowOptions: ["none"],
        borderOptions: ["subtle"],
      },
      card: {
        radiusOptions: ["md", "lg"],
        shadowOptions: ["sm"],
        borderOptions: ["subtle"],
      },
    },
    typography: {
      headingSizes: ["lg", "xl"],
      subheadingSizes: ["md", "lg"],
      bodySizes: ["md"],
      accentSizes: ["sm"],
      headingWeights: [500, 600, 700],
      subheadingWeights: [500, 600],
      bodyWeights: [400, 500],
      accentWeights: [500, 600],
      headingItalicChance: 0.05,
      subheadingItalicChance: 0.05,
      bodyItalicChance: 0.03,
      accentItalicChance: 0.1,
      headingUppercaseChance: 0.4,
      subheadingUppercaseChance: 0.3,
    },
  }),
};

export const generateStyleTokens = (
  vibe: VibePreset,
  seed: number
): { uiTokens: VibeUiTokens; typography: TypographyTokens } => {
  const rule = VARIATION_SETTINGS[vibe.id] ?? VARIATION_SETTINGS["minimal"];
  const uiBase = vibe.ui;
  const baseTypography = vibe.typography ?? ({
    heading: { size: "lg", weight: 600, style: "normal" },
    body: { size: "md", weight: 400, style: "normal" },
    accent: { size: "sm", weight: 500, style: "normal" },
  } as TypographyTokens);

  const uiTokens: VibeUiTokens = {
    buttonPrimary: buildComponentShape(
      uiBase.buttonPrimary,
      rule.components.buttonPrimary,
      seed,
      0.11
    ),
    buttonSecondary: buildComponentShape(
      uiBase.buttonSecondary,
      rule.components.buttonSecondary,
      seed,
      0.23
    ),
    card: buildComponentShape(uiBase.card, rule.components.card, seed, 0.37),
  };

  const typography = buildTypography(baseTypography, rule.typography, seed);
  return { uiTokens, typography };
};
