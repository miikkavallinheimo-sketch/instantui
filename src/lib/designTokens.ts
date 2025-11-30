import type { DesignState, DesignTokens } from "./types";

export function buildDesignTokens(state: DesignState): DesignTokens {
  const { colors, fontPair, vibe } = state;

  const cssVariables = `:root {
  --primary: ${colors.primary};
  --secondary: ${colors.secondary};
  --accent: ${colors.accent};
  --bg: ${colors.background};
  --text: ${colors.text};

  --font-heading: "${fontPair.heading}", system-ui, -apple-system, sans-serif;
  --font-body: "${fontPair.body}", system-ui, -apple-system, sans-serif;
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
      text: "${colors.text}",
    },
    fontFamily: {
      heading: ["${fontPair.heading}", "system-ui", "sans-serif"],
      body: ["${fontPair.body}", "system-ui", "sans-serif"],
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
      text: colors.text,
    },
    fonts: {
      heading: fontPair.heading,
      body: fontPair.body,
    },
  };

  const jsonTokens = JSON.stringify(jsonTokensObj, null, 2);

  return {
    cssVariables,
    tailwindConfig,
    jsonTokens,
  };
}
