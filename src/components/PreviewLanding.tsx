import { useState } from "react";
import type { CSSProperties } from "react";
import type { DesignState, BorderToken, HoverAnimationType } from "../lib/types";
import { getShadowForMode } from "../lib/shadowTokens";

interface PreviewLandingProps {
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
    case "lift":
      element.style.transform = `translateY(${translateY || -4}px)`;
      element.style.boxShadow = getShadowForMode("lg", isDarkUi);
      break;
    case "subtle":
      element.style.opacity = "0.9";
      element.style.boxShadow = getShadowForMode("md", isDarkUi);
      break;
    case "shimmer":
      element.style.transform = `scale(${scale || 1.05})`;
      element.style.boxShadow = getShadowForMode("lg", isDarkUi);
      break;
    case "glow":
      element.style.boxShadow = glowColor ? `0 0 12px ${glowColor}, ${getShadowForMode("lg", isDarkUi)}` : getShadowForMode("lg", isDarkUi);
      break;
    case "color-shift":
      if (colorShiftTarget) element.style.backgroundColor = colorShiftTarget;
      element.style.boxShadow = getShadowForMode("md", isDarkUi);
      break;
    case "brightness":
      element.style.filter = `brightness(${brightnessLevel || 1.1})`;
      element.style.boxShadow = getShadowForMode("md", isDarkUi);
      break;
    case "scale":
      element.style.transform = `scale(${scale || 1.05})`;
      break;
    case "text-underline":
      element.style.textDecoration = "underline";
      element.style.textDecorationColor = colorShiftTarget || "currentColor";
      element.style.textDecorationThickness = "2px";
      element.style.textUnderlineOffset = "4px";
      break;
  }
};

const removeHoverAnimation = (
  element: HTMLElement,
  animationType: HoverAnimationType,
  config: { duration: number; timingFunction: string; originalShadow: string; originalBgColor?: string }
) => {
  const { duration, timingFunction, originalShadow } = config;
  element.style.transition = `all ${duration}ms ${timingFunction}`;

  switch (animationType) {
    case "lift":
    case "shimmer":
    case "scale":
      element.style.transform = "none";
      element.style.boxShadow = originalShadow;
      break;
    case "subtle":
    case "glow":
    case "brightness":
    case "color-shift":
      element.style.opacity = "1";
      element.style.filter = "none";
      element.style.backgroundColor = config.originalBgColor || "";
      element.style.boxShadow = originalShadow;
      break;
    case "text-underline":
      element.style.textDecoration = "none";
      break;
  }
};

const PreviewLanding = ({ designState }: PreviewLandingProps) => {
  const { colors, fontPair, typography, uiTokens, vibe, spacing: spacingObj } = designState;

  const rootStyle: CSSProperties = {
    color: colors.text,
  };

  return (
    <div className="w-full" style={rootStyle}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 px-6 py-4 border-b"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.borderSubtle,
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap["lg"],
              fontWeight: 700,
              color: colors.primary,
            }}
          >
            DesignUI
          </div>
          <nav className="flex gap-8 items-center">
            {["Features", "Components", "Pricing"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.text,
                  textDecoration: "none",
                  transition: "color 200ms ease-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.text;
                }}
              >
                {item}
              </a>
            ))}
          </nav>
          {/* Sign Up Button */}
          {(() => {
            const btnAnimConfig = uiTokens.animations?.button;
            const originalShadow = getShadowForMode(uiTokens.buttonPrimary.shadow, vibe.isDarkUi);
            return (
              <button
                style={{
                  backgroundColor: colors.primary,
                  color: colors.onPrimary,
                  padding: `${spacingObj.md} ${spacingObj.lg}`,
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
                }}
                onMouseLeave={(e) => {
                  removeHoverAnimation(e.currentTarget, btnAnimConfig?.type || "lift", {
                    duration: btnAnimConfig?.duration || 200,
                    timingFunction: btnAnimConfig?.timingFunction || "ease-out",
                    originalShadow,
                  });
                }}
              >
                Sign Up
              </button>
            );
          })()}
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="px-6 py-20 md:py-32"
        style={{
          backgroundColor: colors.background,
          background: `linear-gradient(135deg, ${colors.primary}08 0%, ${colors.secondary}08 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap["2xl"],
              fontWeight: 700,
              color: colors.text,
              marginBottom: spacingObj.lg,
            }}
          >
            Build Beautiful User Interfaces
          </div>
          <p
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap["lg"],
              color: colors.textMuted,
              marginBottom: spacingObj["2xl"],
              maxWidth: "600px",
              margin: "0 auto",
              marginBottom: spacingObj["2xl"],
            }}
          >
            A complete design system with interactive components, smooth animations, and consistent styling
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary Button */}
            {(() => {
              const btnAnimConfig = uiTokens.animations?.button;
              const originalShadow = getShadowForMode(uiTokens.buttonPrimary.shadow, vibe.isDarkUi);
              return (
                <button
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.onPrimary,
                    padding: `${spacingObj.lg} ${spacingObj["2xl"]}`,
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
                  }}
                  onMouseLeave={(e) => {
                    removeHoverAnimation(e.currentTarget, btnAnimConfig?.type || "lift", {
                      duration: btnAnimConfig?.duration || 200,
                      timingFunction: btnAnimConfig?.timingFunction || "ease-out",
                      originalShadow,
                    });
                  }}
                >
                  Get Started Free
                </button>
              );
            })()}

            {/* Secondary Button */}
            {(() => {
              const btnAnimConfig = uiTokens.animations?.button;
              const originalShadow = getShadowForMode(uiTokens.buttonSecondary.shadow, vibe.isDarkUi);
              return (
                <button
                  style={{
                    backgroundColor: "transparent",
                    color: colors.secondary,
                    padding: `${spacingObj.lg} ${spacingObj["2xl"]}`,
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
                  View Components
                </button>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 md:py-28" style={{ backgroundColor: colors.background }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div
              style={{
                fontFamily: fontPair.heading,
                fontSize: sizeMap["xl"],
                fontWeight: 600,
                color: colors.text,
                marginBottom: spacingObj.md,
              }}
            >
              Powerful Features
            </div>
            <p
              style={{
                fontFamily: fontPair.body,
                fontSize: sizeMap["md"],
                color: colors.textMuted,
                maxWidth: "500px",
                margin: "0 auto",
              }}
            >
              Everything you need to build stunning interfaces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 - Primary */}
            {(() => {
              const cardAnimConfig = uiTokens.animations?.card;
              const originalShadow = getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi);
              return (
                <div
                  style={{
                    backgroundColor: colors.primary,
                    borderRadius: radiusMap[uiTokens.card.radius],
                    padding: spacingObj["2xl"],
                    boxShadow: originalShadow,
                    cursor: "pointer",
                    transition: `all ${cardAnimConfig?.duration || 250}ms ${cardAnimConfig?.timingFunction || "ease-out"}`,
                  }}
                  onMouseEnter={(e) => {
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
                  }}
                  onMouseLeave={(e) => {
                    removeHoverAnimation(e.currentTarget, cardAnimConfig?.type || "lift", {
                      duration: cardAnimConfig?.duration || 250,
                      timingFunction: cardAnimConfig?.timingFunction || "ease-out",
                      originalShadow,
                    });
                  }}
                >
                  <div
                    style={{
                      fontFamily: fontPair.heading,
                      fontSize: sizeMap["lg"],
                      fontWeight: 600,
                      marginBottom: spacingObj.md,
                      color: colors.onPrimary,
                    }}
                  >
                    ✨ Interactive
                  </div>
                  <div
                    style={{
                      fontFamily: fontPair.body,
                      fontSize: sizeMap["sm"],
                      color: colors.onPrimary,
                      opacity: 0.9,
                    }}
                  >
                    Smooth animations and hover effects that respond to user interaction
                  </div>
                </div>
              );
            })()}

            {/* Feature 2 - Secondary */}
            {(() => {
              const cardAnimConfig = uiTokens.animations?.card;
              const originalShadow = getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi);
              return (
                <div
                  style={{
                    backgroundColor: colors.secondary,
                    borderRadius: radiusMap[uiTokens.card.radius],
                    padding: spacingObj["2xl"],
                    boxShadow: originalShadow,
                    cursor: "pointer",
                    transition: `all ${cardAnimConfig?.duration || 250}ms ${cardAnimConfig?.timingFunction || "ease-out"}`,
                  }}
                  onMouseEnter={(e) => {
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
                  }}
                  onMouseLeave={(e) => {
                    removeHoverAnimation(e.currentTarget, cardAnimConfig?.type || "lift", {
                      duration: cardAnimConfig?.duration || 250,
                      timingFunction: cardAnimConfig?.timingFunction || "ease-out",
                      originalShadow,
                    });
                  }}
                >
                  <div
                    style={{
                      fontFamily: fontPair.heading,
                      fontSize: sizeMap["lg"],
                      fontWeight: 600,
                      marginBottom: spacingObj.md,
                      color: colors.onSecondary,
                    }}
                  >
                    🎨 Customizable
                  </div>
                  <div
                    style={{
                      fontFamily: fontPair.body,
                      fontSize: sizeMap["sm"],
                      color: colors.onSecondary,
                      opacity: 0.9,
                    }}
                  >
                    Full control over colors, typography, spacing, and animations
                  </div>
                </div>
              );
            })()}

            {/* Feature 3 - Accent */}
            {(() => {
              const cardAnimConfig = uiTokens.animations?.card;
              const originalShadow = getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi);
              return (
                <div
                  style={{
                    backgroundColor: colors.accent,
                    borderRadius: radiusMap[uiTokens.card.radius],
                    padding: spacingObj["2xl"],
                    boxShadow: originalShadow,
                    cursor: "pointer",
                    transition: `all ${cardAnimConfig?.duration || 250}ms ${cardAnimConfig?.timingFunction || "ease-out"}`,
                  }}
                  onMouseEnter={(e) => {
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
                  }}
                  onMouseLeave={(e) => {
                    removeHoverAnimation(e.currentTarget, cardAnimConfig?.type || "lift", {
                      duration: cardAnimConfig?.duration || 250,
                      timingFunction: cardAnimConfig?.timingFunction || "ease-out",
                      originalShadow,
                    });
                  }}
                >
                  <div
                    style={{
                      fontFamily: fontPair.heading,
                      fontSize: sizeMap["lg"],
                      fontWeight: 600,
                      marginBottom: spacingObj.md,
                      color: colors.onAccent,
                    }}
                  >
                    🚀 Ready to Use
                  </div>
                  <div
                    style={{
                      fontFamily: fontPair.body,
                      fontSize: sizeMap["sm"],
                      color: colors.onAccent,
                      opacity: 0.9,
                    }}
                  >
                    Copy-paste components with working animations and interactions
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="px-6 py-20 md:py-28 border-t"
        style={{
          borderColor: colors.borderSubtle,
          backgroundColor: colors.surface,
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap["xl"],
              fontWeight: 600,
              color: colors.text,
              marginBottom: spacingObj.md,
            }}
          >
            Ready to build something amazing?
          </div>
          <p
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap["md"],
              color: colors.textMuted,
              marginBottom: spacingObj["2xl"],
            }}
          >
            Start exploring the full component library with all animations and interactions
          </p>

          {/* Accent Button */}
          {(() => {
            const btnAnimConfig = uiTokens.animations?.button;
            const originalShadow = getShadowForMode(uiTokens.buttonPrimary.shadow, vibe.isDarkUi);
            return (
              <button
                style={{
                  backgroundColor: colors.accent,
                  color: colors.onAccent,
                  padding: `${spacingObj.lg} ${spacingObj["2xl"]}`,
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
                }}
                onMouseLeave={(e) => {
                  removeHoverAnimation(e.currentTarget, btnAnimConfig?.type || "lift", {
                    duration: btnAnimConfig?.duration || 200,
                    timingFunction: btnAnimConfig?.timingFunction || "ease-out",
                    originalShadow,
                  });
                }}
              >
                Explore Components
              </button>
            );
          })()}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-12 border-t"
        style={{
          borderColor: colors.borderSubtle,
          backgroundColor: colors.background,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: spacingObj.md,
                }}
              >
                DesignUI
              </div>
              <p
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                A complete design system for building beautiful interfaces
              </p>
            </div>

            <div>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: spacingObj.md,
                }}
              >
                Product
              </div>
              <ul
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
                className="space-y-2"
              >
                {["Components", "Documentation", "Examples"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        transition: "color 200ms ease-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = colors.primary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = colors.textMuted;
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: spacingObj.md,
                }}
              >
                Company
              </div>
              <ul
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
                className="space-y-2"
              >
                {["About", "Blog", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        color: "inherit",
                        textDecoration: "none",
                        transition: "color 200ms ease-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = colors.primary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = colors.textMuted;
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="border-t pt-6"
            style={{ borderColor: colors.borderSubtle }}
          >
            <p
              style={{
                fontFamily: fontPair.body,
                fontSize: sizeMap["sm"],
                color: colors.textMuted,
                textAlign: "center",
              }}
            >
              © 2024 DesignUI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PreviewLanding;
