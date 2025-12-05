import { useState } from "react";
import type { CSSProperties } from "react";
import type { DesignState, BorderToken, HoverAnimationType } from "../lib/types";
import { getShadowForMode } from "../lib/shadowTokens";
import { getGlassConfigForVibe, buildGlassBackground, buildGlassBorder, buildBackdropFilter } from "../lib/glassTokens";

interface PreviewComponentsProps {
  designState: DesignState;
}

const sizeMap = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
} as const;

const radiusMap = {
  none: "0px",
  sm: "6px",
  md: "10px",
  lg: "16px",
  xl: "24px",
  full: "9999px",
} as const;

const getBorderStyle = (token: BorderToken, colors: DesignState["colors"]) => {
  if (token === "none") return "0px solid transparent";
  const color = token === "subtle" ? colors.borderSubtle : colors.borderStrong;
  return `1px solid ${color}`;
};

/**
 * Apply vibe-specific hover animation based on animation type
 */
const applyHoverAnimation = (
  element: HTMLElement,
  animationType: HoverAnimationType,
  config: {
    duration: number;
    timingFunction: string;
    scale?: number;
    glowColor?: string;
    translateY?: number;
    colorShiftTarget?: string;
    brightnessLevel?: number;
    currentShadow: string;
    isDarkUi: boolean;
  }
) => {
  const { duration, timingFunction, scale, glowColor, translateY, colorShiftTarget, brightnessLevel, currentShadow, isDarkUi } = config;

  element.style.transition = `all ${duration}ms ${timingFunction}`;

  switch (animationType) {
    case "subtle":
      // Subtle: slight opacity and shadow increase
      element.style.opacity = "0.9";
      element.style.boxShadow = getShadowForMode("md", isDarkUi);
      break;

    case "lift":
      // Lift: translate up with enhanced shadow
      element.style.transform = `translateY(${translateY || -4}px)`;
      element.style.boxShadow = getShadowForMode("lg", isDarkUi);
      break;

    case "glow":
      // Glow: add glowing effect with shadow
      element.style.boxShadow = glowColor
        ? `0 0 12px ${glowColor}, ${getShadowForMode("lg", isDarkUi)}`
        : getShadowForMode("lg", isDarkUi);
      break;

    case "shimmer":
      // Shimmer: scale up slightly with brightness
      element.style.transform = `scale(${scale || 1.05})`;
      element.style.boxShadow = getShadowForMode("lg", isDarkUi);
      break;

    case "bounce":
      // Bounce: small scale-down then applies via animation
      element.style.transform = `scale(${scale || 0.98})`;
      element.style.boxShadow = getShadowForMode("md", isDarkUi);
      break;

    case "color-shift":
      // Color shift: background or text color shift with subtle shadow
      if (colorShiftTarget) {
        element.style.backgroundColor = colorShiftTarget;
      }
      element.style.boxShadow = getShadowForMode("md", isDarkUi);
      break;

    case "brightness":
      // Brightness: increase brightness/filter effect
      element.style.filter = `brightness(${brightnessLevel || 1.1})`;
      element.style.boxShadow = getShadowForMode("md", isDarkUi);
      break;

    case "scale-only":
      // Scale only: pure scale transform without shadow
      element.style.transform = `scale(${scale || 1.05})`;
      break;

    case "text-underline":
      // Text underline: add underline decoration to text
      // For elements with child text divs (like cards), apply to children instead
      const childDivs = element.querySelectorAll("div");
      if (childDivs.length > 0) {
        // Apply underline to all child divs (they have the actual text colors)
        childDivs.forEach((child) => {
          (child as HTMLElement).style.textDecoration = "underline";
          (child as HTMLElement).style.textDecorationColor = "currentColor";
        });
      } else {
        // No children, apply to element itself
        element.style.textDecoration = "underline";
        element.style.textDecorationColor = "currentColor";
      }
      break;

    case "none":
    default:
      // No animation
      break;
  }
};

/**
 * Remove hover animation effects
 */
const removeHoverAnimation = (
  element: HTMLElement,
  animationType: HoverAnimationType,
  config: {
    duration: number;
    timingFunction: string;
    originalShadow: string;
    originalBgColor?: string;
  }
) => {
  const { duration, timingFunction, originalShadow, originalBgColor } = config;

  element.style.transition = `all ${duration}ms ${timingFunction}`;

  switch (animationType) {
    case "subtle":
      element.style.opacity = "1";
      element.style.boxShadow = originalShadow;
      break;

    case "lift":
      element.style.transform = "translateY(0)";
      element.style.boxShadow = originalShadow;
      break;

    case "glow":
      element.style.boxShadow = originalShadow;
      break;

    case "shimmer":
      element.style.transform = "scale(1)";
      element.style.boxShadow = originalShadow;
      break;

    case "bounce":
      element.style.transform = "scale(1)";
      element.style.boxShadow = originalShadow;
      break;

    case "color-shift":
      if (originalBgColor) {
        element.style.backgroundColor = originalBgColor;
      }
      element.style.boxShadow = originalShadow;
      break;

    case "brightness":
      element.style.filter = "brightness(1)";
      element.style.boxShadow = originalShadow;
      break;

    case "scale-only":
      element.style.transform = "scale(1)";
      break;

    case "text-underline":
      // Remove underline from element and all child divs
      element.style.textDecoration = "none";
      element.style.textDecorationColor = "auto";
      const childDivs = element.querySelectorAll("div");
      childDivs.forEach((child) => {
        (child as HTMLElement).style.textDecoration = "none";
        (child as HTMLElement).style.textDecorationColor = "auto";
      });
      break;

    case "none":
    default:
      break;
  }
};

const PreviewComponents = ({ designState }: PreviewComponentsProps) => {
  const { colors, fontPair, typography, uiTokens, vibe, spacing } = designState;

  const rootStyle: CSSProperties = {
    color: colors.text,
  };

  const componentCategories = [
    {
      title: "Buttons",
      components: [
        {
          name: "Primary Button",
          render: () => {
            const btnAnimConfig = uiTokens.animations?.button;
            const originalShadow = getShadowForMode(uiTokens.buttonPrimary.shadow, vibe.isDarkUi);

            return (
              <button
                style={{
                  backgroundColor: colors.primary,
                  color: colors.onPrimary,
                  padding: `${spacing.lg} ${spacing["2xl"]}`,
                  borderRadius: radiusMap[uiTokens.buttonPrimary.radius],
                  border: getBorderStyle(uiTokens.buttonPrimary.border, colors),
                  fontSize: sizeMap["sm"],
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  boxShadow: originalShadow,
                  cursor: "pointer",
                  transition: `all ${btnAnimConfig?.duration || 200}ms ${btnAnimConfig?.timingFunction || "ease-out"}`,
                }}
                onMouseEnter={(e) => {
                  const originalBgColor = window.getComputedStyle(e.currentTarget).backgroundColor;
                  const originalColor = window.getComputedStyle(e.currentTarget).color;
                  // For text-underline, brighten the text color
                  if (btnAnimConfig?.type === "text-underline") {
                    e.currentTarget.style.color = colors.accent;
                  }
                  applyHoverAnimation(e.currentTarget, btnAnimConfig?.type || "lift", {
                    duration: btnAnimConfig?.duration || 200,
                    timingFunction: btnAnimConfig?.timingFunction || "ease-out",
                    scale: btnAnimConfig?.scale,
                    glowColor: btnAnimConfig?.glowColor,
                    translateY: btnAnimConfig?.translateY || -2,
                    colorShiftTarget: btnAnimConfig?.colorShiftTarget,
                    brightnessLevel: btnAnimConfig?.brightnessLevel,
                    currentShadow: originalShadow,
                    isDarkUi: vibe.isDarkUi,
                  });
                  (e.currentTarget as any).originalBgColor = originalBgColor;
                  (e.currentTarget as any).originalColor = originalColor;
                }}
                onMouseLeave={(e) => {
                  removeHoverAnimation(e.currentTarget, btnAnimConfig?.type || "lift", {
                    duration: btnAnimConfig?.duration || 200,
                    timingFunction: btnAnimConfig?.timingFunction || "ease-out",
                    originalShadow,
                    originalBgColor: (e.currentTarget as any).originalBgColor,
                  });
                  // Reset color for text-underline
                  if (btnAnimConfig?.type === "text-underline") {
                    e.currentTarget.style.color = (e.currentTarget as any).originalColor;
                  }
                }}
              >
                Click me
              </button>
            );
          },
        },
        {
          name: "Secondary Button",
          render: () => {
            const btnAnimConfig = uiTokens.animations?.button;
            const originalShadow = getShadowForMode(uiTokens.buttonSecondary.shadow, vibe.isDarkUi);

            return (
              <button
                style={{
                  backgroundColor: "transparent",
                  color: colors.secondary,
                  padding: `${spacing.lg} ${spacing["2xl"]}`,
                  borderRadius: radiusMap[uiTokens.buttonSecondary.radius],
                  border: `2px solid ${colors.secondary}`,
                  fontSize: sizeMap["sm"],
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  boxShadow: originalShadow,
                  cursor: "pointer",
                  transition: `all ${btnAnimConfig?.duration || 200}ms ${btnAnimConfig?.timingFunction || "ease-out"}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.secondary}15`;
                  applyHoverAnimation(e.currentTarget, btnAnimConfig?.type || "subtle", {
                    duration: btnAnimConfig?.duration || 200,
                    timingFunction: btnAnimConfig?.timingFunction || "ease-out",
                    scale: btnAnimConfig?.scale,
                    glowColor: btnAnimConfig?.glowColor,
                    translateY: btnAnimConfig?.translateY || -2,
                    colorShiftTarget: btnAnimConfig?.colorShiftTarget,
                    brightnessLevel: btnAnimConfig?.brightnessLevel,
                    currentShadow: originalShadow,
                    isDarkUi: vibe.isDarkUi,
                  });
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  removeHoverAnimation(e.currentTarget, btnAnimConfig?.type || "subtle", {
                    duration: btnAnimConfig?.duration || 200,
                    timingFunction: btnAnimConfig?.timingFunction || "ease-out",
                    originalShadow,
                  });
                }}
              >
                Secondary
              </button>
            );
          },
        },
        {
          name: "Accent Button",
          render: () => {
            const btnAnimConfig = uiTokens.animations?.button;
            const originalShadow = getShadowForMode(uiTokens.buttonPrimary.shadow, vibe.isDarkUi);

            return (
              <button
                style={{
                  backgroundColor: colors.accent,
                  color: colors.onAccent,
                  padding: `${spacing.lg} ${spacing["2xl"]}`,
                  borderRadius: radiusMap[uiTokens.buttonPrimary.radius],
                  border: getBorderStyle(uiTokens.buttonPrimary.border, colors),
                  fontSize: sizeMap["sm"],
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  boxShadow: originalShadow,
                  cursor: "pointer",
                  transition: `all ${btnAnimConfig?.duration || 200}ms ${btnAnimConfig?.timingFunction || "ease-out"}`,
                }}
                onMouseEnter={(e) => {
                  const originalBgColor = window.getComputedStyle(e.currentTarget).backgroundColor;
                  const originalColor = window.getComputedStyle(e.currentTarget).color;
                  // For text-underline, brighten the text color (use primary for accent button)
                  if (btnAnimConfig?.type === "text-underline") {
                    e.currentTarget.style.color = colors.primary;
                  }
                  applyHoverAnimation(e.currentTarget, btnAnimConfig?.type || "lift", {
                    duration: btnAnimConfig?.duration || 200,
                    timingFunction: btnAnimConfig?.timingFunction || "ease-out",
                    scale: btnAnimConfig?.scale,
                    glowColor: btnAnimConfig?.glowColor,
                    translateY: btnAnimConfig?.translateY || -2,
                    colorShiftTarget: btnAnimConfig?.colorShiftTarget,
                    brightnessLevel: btnAnimConfig?.brightnessLevel,
                    currentShadow: originalShadow,
                    isDarkUi: vibe.isDarkUi,
                  });
                  (e.currentTarget as any).originalBgColor = originalBgColor;
                  (e.currentTarget as any).originalColor = originalColor;
                }}
                onMouseLeave={(e) => {
                  removeHoverAnimation(e.currentTarget, btnAnimConfig?.type || "lift", {
                    duration: btnAnimConfig?.duration || 200,
                    timingFunction: btnAnimConfig?.timingFunction || "ease-out",
                    originalShadow,
                    originalBgColor: (e.currentTarget as any).originalBgColor,
                  });
                  // Reset color for text-underline
                  if (btnAnimConfig?.type === "text-underline") {
                    e.currentTarget.style.color = (e.currentTarget as any).originalColor;
                  }
                }}
              >
                Accent
              </button>
            );
          },
        },
      ],
    },
    {
      title: "Cards",
      components: [
        {
          name: "Surface Card",
          render: () => {
            const cardAnimConfig = uiTokens.animations?.card;
            const originalShadow = getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi);

            return (
              <div
                style={{
                  backgroundColor: colors.surface,
                  border: `2px solid ${colors.borderStrong}`,
                  borderRadius: radiusMap[uiTokens.card.radius],
                  padding: spacing["2xl"],
                  boxShadow: originalShadow,
                  minWidth: "200px",
                  cursor: "pointer",
                  transition: `all ${cardAnimConfig?.duration || 250}ms ${cardAnimConfig?.timingFunction || "ease-out"}`,
                }}
                onMouseEnter={(e) => {
                  const originalBgColor = window.getComputedStyle(e.currentTarget).backgroundColor;
                  applyHoverAnimation(e.currentTarget, cardAnimConfig?.type || "lift", {
                    duration: cardAnimConfig?.duration || 250,
                    timingFunction: cardAnimConfig?.timingFunction || "ease-out",
                    scale: cardAnimConfig?.scale,
                    glowColor: cardAnimConfig?.glowColor,
                    translateY: cardAnimConfig?.translateY || -4,
                    colorShiftTarget: cardAnimConfig?.colorShiftTarget,
                    brightnessLevel: cardAnimConfig?.brightnessLevel,
                    currentShadow: originalShadow,
                    isDarkUi: vibe.isDarkUi,
                  });
                  (e.currentTarget as any).originalBgColor = originalBgColor;
                }}
                onMouseLeave={(e) => {
                  removeHoverAnimation(e.currentTarget, cardAnimConfig?.type || "lift", {
                    duration: cardAnimConfig?.duration || 250,
                    timingFunction: cardAnimConfig?.timingFunction || "ease-out",
                    originalShadow,
                    originalBgColor: (e.currentTarget as any).originalBgColor,
                  });
                }}
              >
                <div
                  style={{
                    fontFamily: fontPair.heading,
                    fontSize: sizeMap["lg"],
                    fontWeight: 600,
                    marginBottom: spacing.md,
                    color: colors.text,
                  }}
                >
                  Surface Card
                </div>
                <div
                  style={{
                    fontFamily: fontPair.body,
                    fontSize: sizeMap["sm"],
                    color: colors.textMuted,
                  }}
                >
                  With strong border
                </div>
              </div>
            );
          },
        },
        {
          name: "Accent Card",
          render: () => {
            const cardAnimConfig = uiTokens.animations?.card;
            const originalShadow = getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi);

            return (
              <div
                style={{
                  backgroundColor: colors.accent,
                  border: getBorderStyle(uiTokens.card.border, colors),
                  borderRadius: radiusMap[uiTokens.card.radius],
                  padding: spacing["2xl"],
                  boxShadow: originalShadow,
                  minWidth: "200px",
                  cursor: "pointer",
                  transition: `all ${cardAnimConfig?.duration || 250}ms ${cardAnimConfig?.timingFunction || "ease-out"}`,
                }}
                onMouseEnter={(e) => {
                  const originalBgColor = window.getComputedStyle(e.currentTarget).backgroundColor;
                  applyHoverAnimation(e.currentTarget, cardAnimConfig?.type || "lift", {
                    duration: cardAnimConfig?.duration || 250,
                    timingFunction: cardAnimConfig?.timingFunction || "ease-out",
                    scale: cardAnimConfig?.scale,
                    glowColor: cardAnimConfig?.glowColor,
                    translateY: cardAnimConfig?.translateY || -4,
                    colorShiftTarget: cardAnimConfig?.colorShiftTarget,
                    brightnessLevel: cardAnimConfig?.brightnessLevel,
                    currentShadow: originalShadow,
                    isDarkUi: vibe.isDarkUi,
                  });
                  (e.currentTarget as any).originalBgColor = originalBgColor;
                }}
                onMouseLeave={(e) => {
                  removeHoverAnimation(e.currentTarget, cardAnimConfig?.type || "lift", {
                    duration: cardAnimConfig?.duration || 250,
                    timingFunction: cardAnimConfig?.timingFunction || "ease-out",
                    originalShadow,
                    originalBgColor: (e.currentTarget as any).originalBgColor,
                  });
                }}
              >
                <div
                  style={{
                    fontFamily: fontPair.heading,
                    fontSize: sizeMap["lg"],
                    fontWeight: 600,
                    marginBottom: spacing.md,
                    color: colors.onAccent,
                  }}
                >
                  Accent Card
                </div>
                <div
                  style={{
                    fontFamily: fontPair.body,
                    fontSize: sizeMap["sm"],
                    color: colors.onAccent,
                    opacity: 0.8,
                  }}
                >
                  Highlight card with accent color
                </div>
              </div>
            );
          },
        },
        {
          name: "Primary Card",
          render: () => {
            const cardAnimConfig = uiTokens.animations?.card;
            const originalShadow = getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi);

            return (
              <div
                style={{
                  backgroundColor: colors.primary,
                  border: getBorderStyle(uiTokens.card.border, colors),
                  borderRadius: radiusMap[uiTokens.card.radius],
                  padding: spacing["2xl"],
                  boxShadow: originalShadow,
                  minWidth: "200px",
                  cursor: "pointer",
                  transition: `all ${cardAnimConfig?.duration || 250}ms ${cardAnimConfig?.timingFunction || "ease-out"}`,
                }}
                onMouseEnter={(e) => {
                  const originalBgColor = window.getComputedStyle(e.currentTarget).backgroundColor;
                  applyHoverAnimation(e.currentTarget, cardAnimConfig?.type || "lift", {
                    duration: cardAnimConfig?.duration || 250,
                    timingFunction: cardAnimConfig?.timingFunction || "ease-out",
                    scale: cardAnimConfig?.scale,
                    glowColor: cardAnimConfig?.glowColor,
                    translateY: cardAnimConfig?.translateY || -4,
                    colorShiftTarget: cardAnimConfig?.colorShiftTarget,
                    brightnessLevel: cardAnimConfig?.brightnessLevel,
                    currentShadow: originalShadow,
                    isDarkUi: vibe.isDarkUi,
                  });
                  (e.currentTarget as any).originalBgColor = originalBgColor;
                }}
                onMouseLeave={(e) => {
                  removeHoverAnimation(e.currentTarget, cardAnimConfig?.type || "lift", {
                    duration: cardAnimConfig?.duration || 250,
                    timingFunction: cardAnimConfig?.timingFunction || "ease-out",
                    originalShadow,
                    originalBgColor: (e.currentTarget as any).originalBgColor,
                  });
                }}
              >
                <div
                  style={{
                    fontFamily: fontPair.heading,
                    fontSize: sizeMap["lg"],
                    fontWeight: 600,
                    marginBottom: spacing.md,
                    color: colors.onPrimary,
                  }}
                >
                  Primary Card
                </div>
                <div
                  style={{
                    fontFamily: fontPair.body,
                    fontSize: sizeMap["sm"],
                    color: colors.onPrimary,
                    opacity: 0.8,
                  }}
                >
                  Main content area card
                </div>
              </div>
            );
          },
        },
        {
          name: "Secondary Card",
          render: () => {
            const cardAnimConfig = uiTokens.animations?.card;
            const originalShadow = getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi);

            return (
              <div
                style={{
                  backgroundColor: colors.secondary,
                  border: getBorderStyle(uiTokens.card.border, colors),
                  borderRadius: radiusMap[uiTokens.card.radius],
                  padding: spacing["2xl"],
                  boxShadow: originalShadow,
                  minWidth: "200px",
                  cursor: "pointer",
                  transition: `all ${cardAnimConfig?.duration || 250}ms ${cardAnimConfig?.timingFunction || "ease-out"}`,
                }}
                onMouseEnter={(e) => {
                  const originalBgColor = window.getComputedStyle(e.currentTarget).backgroundColor;
                  applyHoverAnimation(e.currentTarget, cardAnimConfig?.type || "lift", {
                    duration: cardAnimConfig?.duration || 250,
                    timingFunction: cardAnimConfig?.timingFunction || "ease-out",
                    scale: cardAnimConfig?.scale,
                    glowColor: cardAnimConfig?.glowColor,
                    translateY: cardAnimConfig?.translateY || -4,
                    colorShiftTarget: cardAnimConfig?.colorShiftTarget,
                    brightnessLevel: cardAnimConfig?.brightnessLevel,
                    currentShadow: originalShadow,
                    isDarkUi: vibe.isDarkUi,
                  });
                  (e.currentTarget as any).originalBgColor = originalBgColor;
                }}
                onMouseLeave={(e) => {
                  removeHoverAnimation(e.currentTarget, cardAnimConfig?.type || "lift", {
                    duration: cardAnimConfig?.duration || 250,
                    timingFunction: cardAnimConfig?.timingFunction || "ease-out",
                    originalShadow,
                    originalBgColor: (e.currentTarget as any).originalBgColor,
                  });
                }}
              >
                <div
                  style={{
                    fontFamily: fontPair.heading,
                    fontSize: sizeMap["lg"],
                    fontWeight: 600,
                    marginBottom: spacing.md,
                    color: colors.onSecondary,
                  }}
                >
                  Secondary Card
                </div>
                <div
                  style={{
                    fontFamily: fontPair.body,
                    fontSize: sizeMap["sm"],
                    color: colors.onSecondary,
                    opacity: 0.8,
                  }}
                >
                  Supporting content card
                </div>
              </div>
            );
          },
        },
      ],
    },
    {
      title: "Links & Text",
      components: [
        {
          name: "Primary Link",
          render: () => {
            const linkAnimConfig = uiTokens.animations?.link;
            const originalColor = colors.primary;

            return (
              <a
                href="#"
                style={{
                  color: colors.primary,
                  textDecoration: "none",
                  fontSize: sizeMap["sm"],
                  fontFamily: fontPair.body,
                  cursor: "pointer",
                  transition: `all ${linkAnimConfig?.duration || 150}ms ${linkAnimConfig?.timingFunction || "ease-out"}`,
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.accent;
                  applyHoverAnimation(e.currentTarget, linkAnimConfig?.type || "subtle", {
                    duration: linkAnimConfig?.duration || 150,
                    timingFunction: linkAnimConfig?.timingFunction || "ease-out",
                    scale: linkAnimConfig?.scale,
                    glowColor: linkAnimConfig?.glowColor,
                    translateY: linkAnimConfig?.translateY,
                    colorShiftTarget: linkAnimConfig?.colorShiftTarget,
                    brightnessLevel: linkAnimConfig?.brightnessLevel,
                    currentShadow: "none",
                    isDarkUi: vibe.isDarkUi,
                  });
                  (e.currentTarget as any).originalColor = originalColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = (e.currentTarget as any).originalColor;
                  removeHoverAnimation(e.currentTarget, linkAnimConfig?.type || "subtle", {
                    duration: linkAnimConfig?.duration || 150,
                    timingFunction: linkAnimConfig?.timingFunction || "ease-out",
                    originalShadow: "none",
                  });
                }}
              >
                Hover me
              </a>
            );
          },
        },
        {
          name: "H1 Heading",
          render: () => (
            <h1
              style={{
                fontFamily: fontPair.heading,
                fontSize: "2.25rem",
                fontWeight: 700,
                color: colors.text,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Large Heading
            </h1>
          ),
        },
        {
          name: "H2 Subheading",
          render: () => (
            <h2
              style={{
                fontFamily: fontPair.heading,
                fontSize: "1.875rem",
                fontWeight: 600,
                color: colors.text,
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              Subheading
            </h2>
          ),
        },
        {
          name: "Body Text",
          render: () => (
            <p
              style={{
                fontFamily: fontPair.body,
                fontSize: sizeMap["sm"],
                color: colors.text,
                margin: 0,
                lineHeight: 1.6,
                maxWidth: "280px",
              }}
            >
              This is regular body text used for paragraphs and content. It should be readable and comfortable.
            </p>
          ),
        },
        {
          name: "Muted Text",
          render: () => (
            <p
              style={{
                fontFamily: fontPair.body,
                fontSize: sizeMap["sm"],
                color: colors.textMuted,
                margin: 0,
                lineHeight: 1.6,
                maxWidth: "280px",
              }}
            >
              This is muted text for secondary information and captions.
            </p>
          ),
        },
      ],
    },
    {
      title: "Banners & Alerts",
      components: [
        {
          name: "Primary Banner",
          render: () => {
            const [closed, setClosed] = useState(false);
            if (closed) return null;
            return (
              <div
                style={{
                  backgroundColor: `${colors.primary}15`,
                  border: `1px solid ${colors.primary}`,
                  borderRadius: radiusMap[uiTokens.card.radius],
                  padding: spacing.xl,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: spacing.xl,
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.primary,
                  minWidth: "280px",
                }}
              >
                <div>Important announcement here</div>
                <button
                  onClick={() => setClosed(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: colors.primary,
                    cursor: "pointer",
                    fontSize: "1.25rem",
                    lineHeight: 1,
                    padding: spacing.sm,
                  }}
                >
                  ×
                </button>
              </div>
            );
          },
        },
        {
          name: "Accent Banner",
          render: () => {
            const [closed, setClosed] = useState(false);
            if (closed) return null;
            return (
              <div
                style={{
                  backgroundColor: `${colors.accent}15`,
                  border: `1px solid ${colors.accent}`,
                  borderRadius: radiusMap[uiTokens.card.radius],
                  padding: spacing.xl,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: spacing.xl,
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.accent,
                  minWidth: "280px",
                }}
              >
                <div>Special offer – Limited time!</div>
                <button
                  onClick={() => setClosed(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: colors.accent,
                    cursor: "pointer",
                    fontSize: "1.25rem",
                    lineHeight: 1,
                    padding: spacing.sm,
                  }}
                >
                  ×
                </button>
              </div>
            );
          },
        },
        {
          name: "Secondary Banner",
          render: () => {
            const [closed, setClosed] = useState(false);
            if (closed) return null;
            return (
              <div
                style={{
                  backgroundColor: `${colors.secondary}15`,
                  border: `1px solid ${colors.secondary}`,
                  borderRadius: radiusMap[uiTokens.card.radius],
                  padding: spacing.xl,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: spacing.xl,
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.secondary,
                  minWidth: "280px",
                }}
              >
                <div>Update: New version available</div>
                <button
                  onClick={() => setClosed(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: colors.secondary,
                    cursor: "pointer",
                    fontSize: "1.25rem",
                    lineHeight: 1,
                    padding: spacing.sm,
                  }}
                >
                  ×
                </button>
              </div>
            );
          },
        },
        {
          name: "Subtle Banner",
          render: () => {
            const [closed, setClosed] = useState(false);
            if (closed) return null;
            return (
              <div
                style={{
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.borderSubtle}`,
                  borderRadius: radiusMap[uiTokens.card.radius],
                  padding: spacing.xl,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: spacing.xl,
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.text,
                  minWidth: "280px",
                }}
              >
                <div>Tip: You can customize this message</div>
                <button
                  onClick={() => setClosed(true)}
                  style={{
                    background: "none",
                    border: "none",
                    color: colors.text,
                    cursor: "pointer",
                    fontSize: "1.25rem",
                    lineHeight: 1,
                    padding: spacing.sm,
                  }}
                >
                  ×
                </button>
              </div>
            );
          },
        },
      ],
    },
    {
      title: "Glass & Glassmorphism",
      components: [
        {
          name: "Subtle Glass",
          render: () => {
            const glassConfig = getGlassConfigForVibe(vibe.id);
            const customConfig = { ...glassConfig, blur: 8, opacity: 0.6 };

            return (
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  minWidth: "280px",
                  minHeight: "120px",
                  borderRadius: radiusMap[uiTokens.card.radius],
                  overflow: "hidden",
                  background: `
                    linear-gradient(45deg, ${colors.primary}40 0%, ${colors.accent}40 50%, ${colors.secondary}40 100%),
                    repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 70px)
                  `,
                }}
              >
                {/* Glass frosted overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: buildGlassBackground(colors.surface, customConfig),
                    backdropFilter: buildBackdropFilter(customConfig.blur),
                    WebkitBackdropFilter: buildBackdropFilter(customConfig.blur),
                    border: buildGlassBorder(colors.borderStrong, customConfig),
                    borderRadius: radiusMap[uiTokens.card.radius],
                    boxShadow: getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi),
                  }}
                />

                {/* Content */}
                <div
                  style={{
                    position: "relative",
                    padding: spacing["2xl"],
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      fontFamily: fontPair.heading,
                      fontSize: sizeMap["lg"],
                      fontWeight: 600,
                      marginBottom: spacing.md,
                      color: colors.text,
                    }}
                  >
                    Subtle Glass
                  </div>
                  <div
                    style={{
                      fontFamily: fontPair.body,
                      fontSize: sizeMap["sm"],
                      color: colors.textMuted,
                    }}
                  >
                    Blur: {customConfig.blur}px, Opacity: {Math.round(customConfig.opacity * 100)}%
                  </div>
                </div>
              </div>
            );
          },
        },
        {
          name: "Moderate Glass",
          render: () => {
            const glassConfig = getGlassConfigForVibe(vibe.id);
            const customConfig = { ...glassConfig, blur: 16, opacity: 0.55 };

            return (
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  minWidth: "280px",
                  minHeight: "120px",
                  borderRadius: radiusMap[uiTokens.card.radius],
                  overflow: "hidden",
                  background: `
                    radial-gradient(circle, ${colors.primary}50 1px, transparent 1px),
                    radial-gradient(circle, ${colors.accent}50 1px, transparent 1px),
                    linear-gradient(120deg, ${colors.secondary}35 0%, ${colors.primary}35 50%, ${colors.accent}35 100%)
                  `,
                  backgroundSize: "50px 50px, 80px 80px, 100% 100%",
                  backgroundPosition: "0 0, 25px 25px, 0 0",
                }}
              >
                {/* Glass frosted overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: buildGlassBackground(colors.surface, customConfig),
                    backdropFilter: buildBackdropFilter(customConfig.blur),
                    WebkitBackdropFilter: buildBackdropFilter(customConfig.blur),
                    border: buildGlassBorder(colors.borderStrong, customConfig),
                    borderRadius: radiusMap[uiTokens.card.radius],
                    boxShadow: getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi),
                  }}
                />

                {/* Content */}
                <div
                  style={{
                    position: "relative",
                    padding: spacing["2xl"],
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      fontFamily: fontPair.heading,
                      fontSize: sizeMap["lg"],
                      fontWeight: 600,
                      marginBottom: spacing.md,
                      color: colors.text,
                    }}
                  >
                    Moderate Glass
                  </div>
                  <div
                    style={{
                      fontFamily: fontPair.body,
                      fontSize: sizeMap["sm"],
                      color: colors.textMuted,
                    }}
                  >
                    Blur: {customConfig.blur}px, Opacity: {Math.round(customConfig.opacity * 100)}%
                  </div>
                </div>
              </div>
            );
          },
        },
        {
          name: "Strong Glass",
          render: () => {
            const glassConfig = getGlassConfigForVibe(vibe.id);
            const customConfig = { ...glassConfig, blur: 24, opacity: 0.5 };

            return (
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  minWidth: "280px",
                  minHeight: "120px",
                  borderRadius: radiusMap[uiTokens.card.radius],
                  overflow: "hidden",
                  background: `
                    linear-gradient(45deg, ${colors.accent}50 25%, transparent 25%),
                    linear-gradient(-45deg, ${colors.accent}50 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, ${colors.primary}50 75%),
                    linear-gradient(-45deg, transparent 75%, ${colors.primary}50 75%),
                    linear-gradient(to right, ${colors.secondary}40, ${colors.accent}40)
                  `,
                  backgroundSize: "30px 30px, 30px 30px, 30px 30px, 30px 30px, 100% 100%",
                  backgroundPosition: "0 0, 0 15px, 15px -15px, -15px 0px, 0 0",
                }}
              >
                {/* Glass frosted overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: buildGlassBackground(colors.surface, customConfig),
                    backdropFilter: buildBackdropFilter(customConfig.blur),
                    WebkitBackdropFilter: buildBackdropFilter(customConfig.blur),
                    border: buildGlassBorder(colors.borderStrong, customConfig),
                    borderRadius: radiusMap[uiTokens.card.radius],
                    boxShadow: getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi),
                  }}
                />

                {/* Content */}
                <div
                  style={{
                    position: "relative",
                    padding: spacing["2xl"],
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      fontFamily: fontPair.heading,
                      fontSize: sizeMap["lg"],
                      fontWeight: 600,
                      marginBottom: spacing.md,
                      color: colors.text,
                    }}
                  >
                    Strong Glass
                  </div>
                  <div
                    style={{
                      fontFamily: fontPair.body,
                      fontSize: sizeMap["sm"],
                      color: colors.textMuted,
                    }}
                  >
                    Blur: {customConfig.blur}px, Opacity: {Math.round(customConfig.opacity * 100)}%
                  </div>
                </div>
              </div>
            );
          },
        },
        {
          name: "Vibe-Specific Glass",
          render: () => {
            const customConfig = getGlassConfigForVibe(vibe.id);

            return (
              <div
                style={{
                  position: "relative",
                  display: "inline-block",
                  minWidth: "280px",
                  minHeight: "120px",
                  borderRadius: radiusMap[uiTokens.card.radius],
                  overflow: "hidden",
                  background: `
                    conic-gradient(from 0deg, ${colors.primary}45, ${colors.secondary}45, ${colors.accent}45, ${colors.primary}45),
                    linear-gradient(135deg, ${colors.accent}50 0%, ${colors.primary}50 100%)
                  `,
                  backgroundSize: "200px 200px, 100% 100%",
                  backgroundPosition: "0 0, 0 0",
                }}
              >
                {/* Glass frosted overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: buildGlassBackground(colors.surface, customConfig),
                    backdropFilter: buildBackdropFilter(customConfig.blur),
                    WebkitBackdropFilter: buildBackdropFilter(customConfig.blur),
                    border: buildGlassBorder(colors.borderStrong, customConfig),
                    borderRadius: radiusMap[uiTokens.card.radius],
                    boxShadow: getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi),
                  }}
                />

                {/* Content */}
                <div
                  style={{
                    position: "relative",
                    padding: spacing["2xl"],
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      fontFamily: fontPair.heading,
                      fontSize: sizeMap["lg"],
                      fontWeight: 600,
                      marginBottom: spacing.md,
                      color: colors.text,
                    }}
                  >
                    {vibe.label} Glass
                  </div>
                  <div
                    style={{
                      fontFamily: fontPair.body,
                      fontSize: sizeMap["sm"],
                      color: colors.textMuted,
                    }}
                  >
                    Blur: {customConfig.blur}px, Opacity: {Math.round(customConfig.opacity * 100)}%
                  </div>
                </div>
              </div>
            );
          },
        },
      ],
    },
    {
      title: "Badges & Pills",
      components: [
        {
          name: "Solid Badge",
          render: () => (
            <span
              style={{
                backgroundColor: colors.primary,
                color: colors.onPrimary,
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                fontSize: sizeMap["xs"],
                fontFamily: fontPair.body,
                fontWeight: 600,
                display: "inline-block",
              }}
            >
              Badge
            </span>
          ),
        },
        {
          name: "Outline Badge",
          render: () => (
            <span
              style={{
                backgroundColor: "transparent",
                color: colors.primary,
                border: `1px solid ${colors.primary}`,
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                fontSize: sizeMap["xs"],
                fontFamily: fontPair.body,
                fontWeight: 600,
                display: "inline-block",
              }}
            >
              Outline
            </span>
          ),
        },
      ],
    },
  ];

  return (
    <div className="w-full" style={rootStyle}>
      {/* Header */}
      <section
        className="px-6 py-8 border-b"
        style={{ borderColor: colors.borderSubtle }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap["2xl"],
              fontWeight: 700,
              color: colors.text,
            }}
          >
            Component Gallery
          </div>
          <p
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap["sm"],
              color: colors.textMuted,
              marginTop: spacing.md,
            }}
          >
            All components with {vibe.label} vibe styling and animations
          </p>
        </div>
      </section>

      {/* Spacing Scale Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-b" style={{ borderColor: colors.borderSubtle }}>
        <div
          style={{
            fontFamily: fontPair.heading,
            fontSize: sizeMap["lg"],
            fontWeight: 600,
            color: colors.text,
            marginBottom: spacing["3xl"],
          }}
        >
          Spacing Scale
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(spacing).map(([token, value]) => (
            <div key={token}>
              <div
                style={{
                  backgroundColor: colors.primary,
                  width: value,
                  height: value,
                  borderRadius: radiusMap["md"],
                  marginBottom: "0.75rem",
                  boxShadow: getShadowForMode("sm", vibe.isDarkUi),
                }}
              />
              <div
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["xs"],
                  color: colors.textMuted,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "0.25rem",
                }}
              >
                {token}
              </div>
              <div
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["xs"],
                  color: colors.text,
                  fontWeight: 600,
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Components Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {componentCategories.map((category) => (
            <div key={category.title}>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontSize: sizeMap["lg"],
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: spacing["3xl"],
                  paddingBottom: spacing.xl,
                  borderBottom: `2px solid ${colors.borderSubtle}`,
                }}
              >
                {category.title}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.components.map((comp, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: colors.surface,
                      border: getBorderStyle(uiTokens.card.border, colors),
                      borderRadius: radiusMap[uiTokens.card.radius],
                      padding: spacing["3xl"],
                      boxShadow: getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi),
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: spacing.xl,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: fontPair.body,
                        fontSize: sizeMap["xs"],
                        color: colors.textMuted,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {comp.name}
                    </div>
                    {comp.render()}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Animation & Shadow Info */}
        <section
          style={{
            marginTop: spacing["4xl"],
            padding: spacing["3xl"],
            backgroundColor: colors.surface,
            borderRadius: radiusMap[uiTokens.card.radius],
            border: getBorderStyle(uiTokens.card.border, colors),
            boxShadow: getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi),
          }}
        >
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap["lg"],
              fontWeight: 600,
              color: colors.text,
              marginBottom: spacing.xl,
            }}
          >
            Vibe Configuration
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: spacing.md,
                }}
              >
                Button Animation
              </div>
              <div
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                Type: {uiTokens.animations?.button.type || "subtle"}
                <br />
                Duration: {uiTokens.animations?.button.duration || 200}ms
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: spacing.md,
                }}
              >
                Card Animation
              </div>
              <div
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                Type: {uiTokens.animations?.card.type || "lift"}
                <br />
                Duration: {uiTokens.animations?.card.duration || 250}ms
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: spacing.md,
                }}
              >
                Card Shadow
              </div>
              <div
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                Token: {uiTokens.card.shadow}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: spacing.md,
                }}
              >
                Button Primary Shadow
              </div>
              <div
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                Token: {uiTokens.buttonPrimary.shadow}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: spacing.md,
                }}
              >
                Button Radius
              </div>
              <div
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                Primary: {uiTokens.buttonPrimary.radius}
                <br />
                Secondary: {uiTokens.buttonSecondary.radius}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: spacing.md,
                }}
              >
                Card Radius & Border
              </div>
              <div
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                Radius: {uiTokens.card.radius}
                <br />
                Border: {uiTokens.card.border}
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default PreviewComponents;
