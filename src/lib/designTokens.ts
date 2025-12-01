import type { BorderToken, DesignState, DesignTokens } from "./types";

const radiusMap = {
  none: "0px",
  sm: "6px",
  md: "10px",
  lg: "16px",
  xl: "24px",
  full: "9999px",
} as const;

const shadowMap = {
  none: "none",
  soft: "0 18px 45px rgba(15,23,42,0.12)",
  strong: "0 22px 60px rgba(15,23,42,0.35)",
} as const;

const getBorderStyle = (
  token: BorderToken,
  colors: DesignState["colors"]
): string => {
  if (token === "none") return "0px solid transparent";
  const color =
    token === "subtle" ? colors.borderSubtle : colors.borderStrong;
  return `1px solid ${color}`;
};

const fontSizeMap = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
} as const;

const getFontSizeValue = (
  size: keyof typeof fontSizeMap
): string => fontSizeMap[size];

export function buildDesignTokens(state: DesignState): DesignTokens {
  const { colors, fontPair, vibe, uiTokens, typography } = state;
  const subheadingTokens =
    typography.subheading ?? typography.heading;

  const headingSize = getFontSizeValue(typography.heading.size);
  const subheadingSize = getFontSizeValue(subheadingTokens.size as keyof typeof fontSizeMap);
  const bodySize = getFontSizeValue(typography.body.size);
  const accentSize = getFontSizeValue(typography.accent.size);

  const cssVariables = `:root {
  --primary: ${colors.primary};
  --secondary: ${colors.secondary};
  --accent: ${colors.accent};
  --bg: ${colors.background};
  --surface: ${colors.surface};
  --surface-alt: ${colors.surfaceAlt};
  --text: ${colors.text};
  --text-muted: ${colors.textMuted};
  --border-subtle: ${colors.borderSubtle};
  --border-strong: ${colors.borderStrong};
  --on-primary: ${colors.onPrimary};
  --on-secondary: ${colors.onSecondary};
  --on-accent: ${colors.onAccent};
  --radius-card: ${radiusMap[uiTokens.card.radius]};
  --shadow-card: ${shadowMap[uiTokens.card.shadow]};
  --border-card: ${getBorderStyle(uiTokens.card.border, colors)};
  --radius-button-primary: ${radiusMap[uiTokens.buttonPrimary.radius]};
  --shadow-button-primary: ${shadowMap[uiTokens.buttonPrimary.shadow]};
  --border-button-primary: ${getBorderStyle(uiTokens.buttonPrimary.border, colors)};
  --radius-button-secondary: ${radiusMap[uiTokens.buttonSecondary.radius]};
  --shadow-button-secondary: ${shadowMap[uiTokens.buttonSecondary.shadow]};
  --border-button-secondary: ${getBorderStyle(uiTokens.buttonSecondary.border, colors)};

  --font-heading: "${fontPair.heading}", system-ui, -apple-system, sans-serif;
  --font-body: "${fontPair.body}", system-ui, -apple-system, sans-serif;
  --heading-transform: ${typography.heading.transform ?? "none"};
  --subheading-transform: ${typography.subheading?.transform ?? "none"};
  --body-transform: ${typography.body.transform ?? "none"};
  --accent-transform: ${typography.accent.transform ?? "none"};
  --heading-font-size: ${headingSize};
  --heading-font-weight: ${typography.heading.weight};
  --heading-font-style: ${typography.heading.style};
  --subheading-font-size: ${subheadingSize};
  --subheading-font-weight: ${subheadingTokens.weight};
  --subheading-font-style: ${subheadingTokens.style ?? "normal"};
  --body-font-size: ${bodySize};
  --body-font-weight: ${typography.body.weight};
  --body-font-style: ${typography.body.style};
  --accent-font-size: ${accentSize};
  --accent-font-weight: ${typography.accent.weight};
  --accent-font-style: ${typography.accent.style};
}

/* Example usage:
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body);
}
h1, h2, h3 {
  font-family: var(--font-heading);
}
.button-primary {
  background: var(--primary);
  color: #fff;
}
*/
`;

  const tailwindConfig = `// Tailwind config snippet for theme extension
theme: {
  extend: {
    colors: {
      primary: "${colors.primary}",
      secondary: "${colors.secondary}",
      accent: "${colors.accent}",
      bg: "${colors.background}",
      surface: "${colors.surface}",
      surfaceAlt: "${colors.surfaceAlt}",
      text: "${colors.text}",
      textMuted: "${colors.textMuted}",
      borderSubtle: "${colors.borderSubtle}",
      borderStrong: "${colors.borderStrong}",
      onPrimary: "${colors.onPrimary}",
      onSecondary: "${colors.onSecondary}",
      onAccent: "${colors.onAccent}",
    },
    fontFamily: {
      heading: ["${fontPair.heading}", "system-ui", "sans-serif"],
      body: ["${fontPair.body}", "system-ui", "sans-serif"],
    },
    fontSize: {
      heading: "${headingSize}",
      subheading: "${subheadingSize}",
      body: "${bodySize}",
      accent: "${accentSize}",
    },
    fontWeight: {
      heading: "${typography.heading.weight}",
      subheading: "${subheadingTokens.weight}",
      body: "${typography.body.weight}",
      accent: "${typography.accent.weight}",
    },
    borderRadius: {
      card: "var(--radius-card)",
      button: "var(--radius-button-primary)",
      pill: "var(--radius-button-secondary)",
    },
    boxShadow: {
      card: "var(--shadow-card)",
      button: "var(--shadow-button-primary)",
    },
    borderWidth: {
      card: "var(--border-card)",
    },
  },
}
`;

  const jsonTokensObj = {
    meta: {
      vibe: vibe.id,
      label: vibe.label,
    },
    colors: {
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
      background: colors.background,
      surface: colors.surface,
      surfaceAlt: colors.surfaceAlt,
      text: colors.text,
      textMuted: colors.textMuted,
      borderSubtle: colors.borderSubtle,
      borderStrong: colors.borderStrong,
      onPrimary: colors.onPrimary,
      onSecondary: colors.onSecondary,
      onAccent: colors.onAccent,
    },
    fonts: {
      heading: fontPair.heading,
      body: fontPair.body,
    },
    componentShapes: {
      card: {
        radius: uiTokens.card.radius,
        shadow: uiTokens.card.shadow,
        border: uiTokens.card.border,
      },
      buttonPrimary: {
        radius: uiTokens.buttonPrimary.radius,
        shadow: uiTokens.buttonPrimary.shadow,
        border: uiTokens.buttonPrimary.border,
      },
      buttonSecondary: {
        radius: uiTokens.buttonSecondary.radius,
        shadow: uiTokens.buttonSecondary.shadow,
        border: uiTokens.buttonSecondary.border,
      },
    },
    typography: {
      heading: typography.heading,
      subheading: typography.subheading,
      body: typography.body,
      accent: typography.accent,
    },
    typographyValues: {
      heading: {
        sizeToken: typography.heading.size,
        sizeRem: headingSize,
        weight: typography.heading.weight,
        style: typography.heading.style,
        transform: typography.heading.transform ?? "none",
      },
      subheading: {
        sizeToken: subheadingTokens.size,
        sizeRem: subheadingSize,
        weight: subheadingTokens.weight,
        style: subheadingTokens.style ?? "normal",
        transform: subheadingTokens.transform ?? "none",
      },
      body: {
        sizeToken: typography.body.size,
        sizeRem: bodySize,
        weight: typography.body.weight,
        style: typography.body.style,
        transform: typography.body.transform ?? "none",
      },
      accent: {
        sizeToken: typography.accent.size,
        sizeRem: accentSize,
        weight: typography.accent.weight,
        style: typography.accent.style,
        transform: typography.accent.transform ?? "none",
      },
    },
  };

  const jsonTokens = JSON.stringify(jsonTokensObj, null, 2);

  return {
    cssVariables,
    tailwindConfig,
    jsonTokens,
  };
}
