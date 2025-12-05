import type { BorderToken, DesignState, DesignTokens } from "./types";
import { fontWeightVariants, fontWeightCombinations } from "./fontWeightVariants";
import { getVibeGradients, GRADIENT_LIBRARY } from "./gradientTokens";
import { SHADOW_DEFINITIONS, SHADOW_DEFINITIONS_DARK } from "./shadowTokens";
import { getSpacingScale, getSpacingPatterns } from "./spacingScale";
import { generateLandingPageHTML, generateBlogPageHTML, generatePortfolioPageHTML } from "./htmlTemplates";

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
  xs: "0 1px 2px rgba(15,23,42,0.05)",
  sm: "0 2px 8px rgba(15,23,42,0.08)",
  md: "0 4px 16px rgba(15,23,42,0.12)",
  lg: "0 8px 24px rgba(15,23,42,0.16)",
  xl: "0 12px 40px rgba(15,23,42,0.22)",
  "2xl": "0 24px 60px rgba(15,23,42,0.35)",
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
  const h3Size = typography.h3 ? getFontSizeValue(typography.h3.size as keyof typeof fontSizeMap) : headingSize;
  const h4Size = typography.h4 ? getFontSizeValue(typography.h4.size as keyof typeof fontSizeMap) : subheadingSize;
  const bodySize = getFontSizeValue(typography.body.size);
  const accentSize = getFontSizeValue(typography.accent.size);

  // Get gradient and spacing info
  const vibeGradients = getVibeGradients(vibe.id);
  const spacingScale = getSpacingScale(state.spacing.density);
  const spacingPatterns = getSpacingPatterns(spacingScale);
  const shadowDefs = vibe.isDarkUi ? SHADOW_DEFINITIONS_DARK : SHADOW_DEFINITIONS;

  const cssVariables = `:root {
  /* ============================================
     COLORS - Primary color palette
     ============================================ */
  --primary: ${colors.primary};
  --secondary: ${colors.secondary};
  --accent: ${colors.accent};
  --background: ${colors.background};
  --surface: ${colors.surface};
  --surface-alt: ${colors.surfaceAlt};
  --text: ${colors.text};
  --text-muted: ${colors.textMuted};
  --border-subtle: ${colors.borderSubtle};
  --border-strong: ${colors.borderStrong};
  --on-primary: ${colors.onPrimary};
  --on-secondary: ${colors.onSecondary};
  --on-accent: ${colors.onAccent};

  /* ============================================
     TYPOGRAPHY - Fonts and text styles
     ============================================ */
  --font-heading: "${fontPair.heading}", system-ui, -apple-system, sans-serif;
  --font-body: "${fontPair.body}", system-ui, -apple-system, sans-serif;

  /* Heading styles */
  --heading-font-size: ${headingSize};
  --heading-font-weight: ${typography.heading.weight};
  --heading-font-style: ${typography.heading.style};
  --heading-transform: ${typography.heading.transform ?? "none"};

  /* Subheading styles */
  --subheading-font-size: ${subheadingSize};
  --subheading-font-weight: ${subheadingTokens.weight};
  --subheading-font-style: ${subheadingTokens.style ?? "normal"};
  --subheading-transform: ${typography.subheading?.transform ?? "none"};

  /* H3 styles */
  --h3-font-size: ${h3Size};
  --h3-font-weight: ${typography.h3?.weight ?? typography.heading.weight};
  --h3-font-style: ${typography.h3?.style ?? typography.heading.style};

  /* H4 styles */
  --h4-font-size: ${h4Size};
  --h4-font-weight: ${typography.h4?.weight ?? subheadingTokens.weight};
  --h4-font-style: ${typography.h4?.style ?? subheadingTokens.style ?? "normal"};

  /* Body styles */
  --body-font-size: ${bodySize};
  --body-font-weight: ${typography.body.weight};
  --body-font-style: ${typography.body.style};
  --body-transform: ${typography.body.transform ?? "none"};

  /* Accent text styles */
  --accent-font-size: ${accentSize};
  --accent-font-weight: ${typography.accent.weight};
  --accent-font-style: ${typography.accent.style};
  --accent-transform: ${typography.accent.transform ?? "none"};

  /* Font weights */
  --font-weight-thin: ${fontWeightVariants.thin};
  --font-weight-extralight: ${fontWeightVariants.extralight};
  --font-weight-light: ${fontWeightVariants.light};
  --font-weight-normal: ${fontWeightVariants.normal};
  --font-weight-medium: ${fontWeightVariants.medium};
  --font-weight-semibold: ${fontWeightVariants.semibold};
  --font-weight-bold: ${fontWeightVariants.bold};
  --font-weight-extrabold: ${fontWeightVariants.extrabold};
  --font-weight-black: ${fontWeightVariants.black};

  /* ============================================
     SPACING - 8-point grid system
     ============================================ */
  --spacing-xs: ${spacingScale.xs};
  --spacing-sm: ${spacingScale.sm};
  --spacing-md: ${spacingScale.md};
  --spacing-lg: ${spacingScale.lg};
  --spacing-xl: ${spacingScale.xl};
  --spacing-2xl: ${spacingScale["2xl"]};
  --spacing-3xl: ${spacingScale["3xl"]};
  --spacing-4xl: ${spacingScale["4xl"]};
  --spacing-5xl: ${spacingScale["5xl"]};

  /* Container padding patterns */
  --container-padding-sm: ${spacingPatterns.containerPadding.sm};
  --container-padding-md: ${spacingPatterns.containerPadding.md};
  --container-padding-lg: ${spacingPatterns.containerPadding.lg};

  /* Grid gap patterns */
  --grid-gap-sm: ${spacingPatterns.gridGap.sm};
  --grid-gap-md: ${spacingPatterns.gridGap.md};
  --grid-gap-lg: ${spacingPatterns.gridGap.lg};

  /* ============================================
     BORDER RADIUS - Component shape tokens
     ============================================ */
  --radius-none: 0px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  --radius-card: ${radiusMap[uiTokens.card.radius]};
  --radius-button-primary: ${radiusMap[uiTokens.buttonPrimary.radius]};
  --radius-button-secondary: ${radiusMap[uiTokens.buttonSecondary.radius]};

  /* ============================================
     SHADOWS - Depth and elevation
     ============================================ */
  --shadow-none: none;
  --shadow-xs: ${shadowDefs.xs.css};
  --shadow-sm: ${shadowDefs.sm.css};
  --shadow-md: ${shadowDefs.md.css};
  --shadow-lg: ${shadowDefs.lg.css};
  --shadow-xl: ${shadowDefs.xl.css};
  --shadow-2xl: ${shadowDefs["2xl"].css};

  --shadow-card: ${shadowMap[uiTokens.card.shadow]};
  --shadow-button-primary: ${shadowMap[uiTokens.buttonPrimary.shadow]};
  --shadow-button-secondary: ${shadowMap[uiTokens.buttonSecondary.shadow]};

  /* ============================================
     BORDERS - Border styles
     ============================================ */
  --border-card: ${getBorderStyle(uiTokens.card.border, colors)};
  --border-button-primary: ${getBorderStyle(uiTokens.buttonPrimary.border, colors)};
  --border-button-secondary: ${getBorderStyle(uiTokens.buttonSecondary.border, colors)};

  /* ============================================
     TRANSITIONS & ANIMATIONS
     ============================================ */
  --transition-fast: 100ms ease-out;
  --transition-normal: 150ms ease-in-out;
  --transition-slow: 250ms cubic-bezier(0.4, 0, 0.2, 1);

  /* ============================================
     COMPONENT UTILITIES
     ============================================ */
  --outline-offset: 2px;
  --focus-ring-color: ${colors.accent};
  --focus-ring-width: 2px;

  /* ============================================
     GRADIENT VARIABLES - Define your gradients here
     ============================================ */
  --gradient-primary: linear-gradient(135deg, var(--primary), var(--secondary));
  --gradient-secondary: linear-gradient(135deg, var(--secondary), var(--accent));
  --gradient-accent: linear-gradient(135deg, var(--accent), var(--primary));
  --gradient-subtle: linear-gradient(135deg, var(--primary)20, var(--secondary)20);
}

/* ============================================
   GRADIENT UTILITY CLASSES
   ============================================ */
.gradient-primary { background: var(--gradient-primary); }
.gradient-secondary { background: var(--gradient-secondary); }
.gradient-accent { background: var(--gradient-accent); }
.gradient-subtle { background: var(--gradient-subtle); }

/* ============================================
   BUTTON STYLES
   ============================================ */
.btn-primary {
  background-color: var(--primary);
  color: var(--on-primary);
  border-radius: var(--radius-button-primary);
  border: ${getBorderStyle(uiTokens.buttonPrimary.border, colors)};
  box-shadow: var(--shadow-button-primary);
  font-family: var(--font-heading);
  font-size: var(--heading-font-size);
  font-weight: var(--font-weight-semibold);
  padding: var(--spacing-md) var(--spacing-lg);
  transition: all var(--transition-normal);
  cursor: pointer;
}

.btn-primary:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}

.btn-secondary {
  background-color: var(--secondary);
  color: var(--on-secondary);
  border-radius: var(--radius-button-secondary);
  border: ${getBorderStyle(uiTokens.buttonSecondary.border, colors)};
  box-shadow: var(--shadow-button-secondary);
  font-family: var(--font-heading);
  font-size: var(--heading-font-size);
  font-weight: var(--font-weight-semibold);
  padding: var(--spacing-md) var(--spacing-lg);
  transition: all var(--transition-normal);
  cursor: pointer;
}

.btn-secondary:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}

.btn-accent {
  background-color: var(--accent);
  color: var(--on-accent);
  border-radius: var(--radius-button-primary);
  border: none;
  box-shadow: var(--shadow-button-primary);
  font-family: var(--font-heading);
  font-size: var(--heading-font-size);
  font-weight: var(--font-weight-semibold);
  padding: var(--spacing-md) var(--spacing-lg);
  transition: all var(--transition-normal);
  cursor: pointer;
}

.btn-accent:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}

/* ============================================
   CARD STYLES
   ============================================ */
.card {
  background-color: var(--surface);
  border-radius: var(--radius-card);
  border: ${getBorderStyle(uiTokens.card.border, colors)};
  box-shadow: var(--shadow-card);
  padding: var(--spacing-lg);
  transition: all var(--transition-slow);
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

/* ============================================
   TYPOGRAPHY STYLES
   ============================================ */
h1, .h1 {
  font-family: var(--font-heading);
  font-size: var(--heading-font-size);
  font-weight: var(--heading-font-weight);
  font-style: var(--heading-font-style);
  text-transform: var(--heading-transform);
  color: var(--text);
  margin: 0;
}

h2, .h2 {
  font-family: var(--font-heading);
  font-size: var(--subheading-font-size);
  font-weight: var(--subheading-font-weight);
  font-style: var(--subheading-font-style);
  text-transform: var(--subheading-transform);
  color: var(--text);
  margin: 0;
}

h3, .h3 {
  font-family: var(--font-heading);
  font-size: var(--h3-font-size);
  font-weight: var(--h3-font-weight);
  font-style: var(--h3-font-style);
  color: var(--text);
  margin: 0;
}

h4, .h4 {
  font-family: var(--font-heading);
  font-size: var(--h4-font-size);
  font-weight: var(--h4-font-weight);
  font-style: var(--h4-font-style);
  color: var(--text);
  margin: 0;
}

p, body, .body {
  font-family: var(--font-body);
  font-size: var(--body-font-size);
  font-weight: var(--body-font-weight);
  font-style: var(--body-font-style);
  text-transform: var(--body-transform);
  color: var(--text);
  line-height: 1.5;
  margin: 0;
}

.text-muted {
  color: var(--text-muted);
}

.text-accent {
  color: var(--accent);
  font-size: var(--accent-font-size);
  font-weight: var(--accent-font-weight);
  font-style: var(--accent-font-style);
}

/* ============================================
   UTILITY CLASSES
   ============================================ */
.bg-primary { background-color: var(--primary); }
.bg-secondary { background-color: var(--secondary); }
.bg-accent { background-color: var(--accent); }
.bg-surface { background-color: var(--surface); }
.bg-surface-alt { background-color: var(--surface-alt); }

.text-primary { color: var(--primary); }
.text-secondary { color: var(--secondary); }

.border-subtle { border-color: var(--border-subtle); }
.border-strong { border-color: var(--border-strong); }

.rounded-card { border-radius: var(--radius-card); }
.rounded-button { border-radius: var(--radius-button-primary); }
.rounded-full { border-radius: var(--radius-full); }

.shadow-card { box-shadow: var(--shadow-card); }
.shadow-lg { box-shadow: var(--shadow-lg); }
.shadow-xl { box-shadow: var(--shadow-xl); }

.p-sm { padding: var(--spacing-sm); }
.p-md { padding: var(--spacing-md); }
.p-lg { padding: var(--spacing-lg); }
.p-xl { padding: var(--spacing-xl); }

.gap-sm { gap: var(--spacing-sm); }
.gap-md { gap: var(--spacing-md); }
.gap-lg { gap: var(--spacing-lg); }
.gap-xl { gap: var(--spacing-xl); }

/* Focus states for accessibility */
*:focus {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--outline-offset);
}

/* Example usage:
body {
  background: var(--background);
  color: var(--text);
  font-family: var(--font-body);
}

h1 {
  font-family: var(--font-heading);
  font-size: var(--heading-font-size);
  color: var(--primary);
}

.container {
  max-width: 1200px;
  padding: var(--container-padding-lg);
  margin: 0 auto;
}

.grid {
  display: grid;
  gap: var(--grid-gap-lg);
}

.card {
  background: var(--surface);
  border-radius: var(--radius-card);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-card);
}

.btn {
  border-radius: var(--radius-button-primary);
  padding: var(--spacing-md) var(--spacing-lg);
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-normal);
}

.gradient-hero {
  background: ${vibeGradients.options[0] ? GRADIENT_LIBRARY[vibeGradients.options[0]].value : "linear-gradient(135deg, var(--primary), var(--accent))"};
  color: var(--on-primary);
}
*/
`;

  const tailwindConfig = `// Tailwind config snippet for theme extension
module.exports = {
  theme: {
    extend: {
      /* ============================================
         COLORS
         ============================================ */
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

      /* ============================================
         FONTS & TYPOGRAPHY
         ============================================ */
      fontFamily: {
        heading: ["${fontPair.heading}", "system-ui", "sans-serif"],
        body: ["${fontPair.body}", "system-ui", "sans-serif"],
      },

      fontSize: {
        heading: "${headingSize}",
        subheading: "${subheadingSize}",
        h3: "${h3Size}",
        h4: "${h4Size}",
        body: "${bodySize}",
        accent: "${accentSize}",
      },

      fontWeight: {
        heading: "${typography.heading.weight}",
        subheading: "${subheadingTokens.weight}",
        h3: "${typography.h3?.weight ?? typography.heading.weight}",
        h4: "${typography.h4?.weight ?? subheadingTokens.weight}",
        body: "${typography.body.weight}",
        accent: "${typography.accent.weight}",
        thin: "${fontWeightVariants.thin}",
        extralight: "${fontWeightVariants.extralight}",
        light: "${fontWeightVariants.light}",
        normal: "${fontWeightVariants.normal}",
        medium: "${fontWeightVariants.medium}",
        semibold: "${fontWeightVariants.semibold}",
        bold: "${fontWeightVariants.bold}",
        extrabold: "${fontWeightVariants.extrabold}",
        black: "${fontWeightVariants.black}",
      },

      /* ============================================
         SPACING - 8-point grid
         ============================================ */
      spacing: {
        xs: "${spacingScale.xs}",
        sm: "${spacingScale.sm}",
        md: "${spacingScale.md}",
        lg: "${spacingScale.lg}",
        xl: "${spacingScale.xl}",
        "2xl": "${spacingScale["2xl"]}",
        "3xl": "${spacingScale["3xl"]}",
        "4xl": "${spacingScale["4xl"]}",
        "5xl": "${spacingScale["5xl"]}",
      },

      /* ============================================
         BORDER RADIUS
         ============================================ */
      borderRadius: {
        card: "var(--radius-card)",
        button: "var(--radius-button-primary)",
        pill: "var(--radius-button-secondary)",
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
      },

      /* ============================================
         SHADOWS
         ============================================ */
      boxShadow: {
        card: "var(--shadow-card)",
        button: "var(--shadow-button-primary)",
        xs: "${shadowDefs.xs.css}",
        sm: "${shadowDefs.sm.css}",
        md: "${shadowDefs.md.css}",
        lg: "${shadowDefs.lg.css}",
        xl: "${shadowDefs.xl.css}",
        "2xl": "${shadowDefs["2xl"].css}",
      },

      /* ============================================
         TRANSITIONS
         ============================================ */
      transitionDuration: {
        "100": "100ms",
        "150": "150ms",
        "250": "250ms",
      },

      transitionTimingFunction: {
        "ease-out": "ease-out",
        "ease-in-out": "ease-in-out",
        "cubic-smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  components: {
    /* Button components */
    ".btn-primary": {
      "@apply": "bg-primary text-onPrimary px-lg py-md rounded-button font-semibold transition-all duration-150 hover:shadow-lg hover:-translate-y-0.5",
    },
    ".btn-secondary": {
      "@apply": "bg-secondary text-onSecondary px-lg py-md rounded-button font-semibold transition-all duration-150 hover:shadow-lg hover:-translate-y-0.5",
    },
    ".btn-accent": {
      "@apply": "bg-accent text-onAccent px-lg py-md rounded-button font-semibold transition-all duration-150 hover:shadow-lg hover:-translate-y-0.5",
    },

    /* Card components */
    ".card": {
      "@apply": "bg-surface rounded-card border border-borderSubtle shadow-card p-lg transition-all duration-250 hover:shadow-lg hover:-translate-y-1",
    },

    /* Typography */
    ".text-heading": {
      "@apply": "font-heading text-heading font-bold",
    },
    ".text-body": {
      "@apply": "font-body text-body font-normal",
    },
  },
}
`;

  // Prepare gradients for JSON
  const gradients: Record<string, string> = {};
  vibeGradients.options.forEach((gradId) => {
    const grad = GRADIENT_LIBRARY[gradId];
    if (grad) {
      gradients[grad.name.replace(/\s+/g, "-").toLowerCase()] = grad.value;
    }
  });

  const jsonTokensObj = {
    meta: {
      vibe: vibe.id,
      label: vibe.label,
      description: vibe.description,
      isDarkUi: vibe.isDarkUi,
      generatedAt: new Date().toISOString(),
    },

    /* ============================================
       COLORS
       ============================================ */
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

    /* ============================================
       TYPOGRAPHY
       ============================================ */
    fonts: {
      heading: fontPair.heading,
      body: fontPair.body,
      source: fontPair.source,
    },

    typography: {
      heading: typography.heading,
      subheading: typography.subheading,
      h3: typography.h3 || typography.heading,
      h4: typography.h4 || typography.subheading || typography.heading,
      body: typography.body,
      accent: typography.accent,
    },

    fontWeights: {
      thin: fontWeightVariants.thin,
      extralight: fontWeightVariants.extralight,
      light: fontWeightVariants.light,
      normal: fontWeightVariants.normal,
      medium: fontWeightVariants.medium,
      semibold: fontWeightVariants.semibold,
      bold: fontWeightVariants.bold,
      extrabold: fontWeightVariants.extrabold,
      black: fontWeightVariants.black,
    },

    fontWeightCombinations: fontWeightCombinations,

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
      h3: {
        sizeToken: typography.h3?.size ?? typography.heading.size,
        sizeRem: h3Size,
        weight: typography.h3?.weight ?? typography.heading.weight,
        style: typography.h3?.style ?? typography.heading.style,
        transform: typography.h3?.transform ?? "none",
      },
      h4: {
        sizeToken: typography.h4?.size ?? subheadingTokens.size,
        sizeRem: h4Size,
        weight: typography.h4?.weight ?? subheadingTokens.weight,
        style: typography.h4?.style ?? subheadingTokens.style ?? "normal",
        transform: typography.h4?.transform ?? "none",
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

    /* ============================================
       SPACING - 8-point grid system
       ============================================ */
    spacing: {
      density: state.spacing.density,
      scale: spacingScale,
      patterns: spacingPatterns,
    },

    /* ============================================
       COMPONENT SHAPES
       ============================================ */
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

    /* ============================================
       SHADOWS
       ============================================ */
    shadows: {
      xs: shadowDefs.xs.css,
      sm: shadowDefs.sm.css,
      md: shadowDefs.md.css,
      lg: shadowDefs.lg.css,
      xl: shadowDefs.xl.css,
      "2xl": shadowDefs["2xl"].css,
    },

    /* ============================================
       GRADIENTS
       ============================================ */
    gradients: gradients,
    gradientOptions: vibeGradients.options.map((id) => ({
      id,
      name: GRADIENT_LIBRARY[id]?.name,
      description: GRADIENT_LIBRARY[id]?.description,
      value: GRADIENT_LIBRARY[id]?.value,
    })),

    /* ============================================
       BORDER RADIUS SCALE
       ============================================ */
    borderRadius: {
      none: "0px",
      sm: "6px",
      md: "10px",
      lg: "16px",
      xl: "24px",
      full: "9999px",
    },
  };

  const jsonTokens = JSON.stringify(jsonTokensObj, null, 2);

  // Generate HTML pages
  const landingPageHTML = generateLandingPageHTML(state);
  const blogPageHTML = generateBlogPageHTML(state);
  const portfolioPageHTML = generatePortfolioPageHTML(state);

  return {
    cssVariables,
    tailwindConfig,
    jsonTokens,
    landingPageHTML,
    blogPageHTML,
    portfolioPageHTML,
  };
}
