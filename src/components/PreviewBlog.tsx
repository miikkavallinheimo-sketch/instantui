import { useState } from "react";
import type { CSSProperties } from "react";
import type { DesignState, BorderToken, HoverAnimationType } from "../lib/types";
import { getShadowForMode } from "../lib/shadowTokens";

interface PreviewBlogProps {
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

const PreviewBlog = ({ designState }: PreviewBlogProps) => {
  const { colors, fontPair, typography, uiTokens, vibe, spacing: spacingObj } = designState;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Design", "Development", "Inspiration"];

  const articles = [
    { title: "Designing Interactive Systems", excerpt: "Learn how to create engaging user experiences", category: "Design", date: "Mar 15", color: colors.primary },
    { title: "Component Architecture Patterns", excerpt: "Building scalable design systems from the ground up", category: "Development", date: "Mar 10", color: colors.secondary },
    { title: "Color Theory in Practice", excerpt: "Using color to guide user attention and emotion", category: "Inspiration", date: "Mar 5", color: colors.accent },
    { title: "Animation Best Practices", excerpt: "Smooth transitions that feel natural and purposeful", category: "Design", date: "Feb 28", color: colors.primary },
    { title: "Accessibility First", excerpt: "Creating inclusive experiences for all users", category: "Development", date: "Feb 22", color: colors.secondary },
    { title: "Typography Mastery", excerpt: "The art of choosing and pairing typefaces", category: "Inspiration", date: "Feb 15", color: colors.accent },
  ];

  const filteredArticles = selectedCategory === "All" ? articles : articles.filter((a) => a.category === selectedCategory);

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
            Design Insights
          </div>
          <div
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap["sm"],
              color: colors.textMuted,
            }}
          >
            Explore articles about design, development, and inspiration
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="px-6 py-16 md:py-24"
        style={{
          backgroundColor: colors.background,
          background: `linear-gradient(135deg, ${colors.primary}08 0%, ${colors.secondary}08 100%)`,
          borderBottom: `1px solid ${colors.borderSubtle}`,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap["2xl"],
              fontWeight: 700,
              color: colors.text,
              marginBottom: spacingObj.md,
            }}
          >
            Latest Articles
          </div>
          <p
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap["md"],
              color: colors.textMuted,
              maxWidth: "600px",
            }}
          >
            Discover insights, best practices, and inspiration from the world of design and development
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section
        className="px-6 py-8 border-b"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.borderSubtle,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const btnAnimConfig = uiTokens.animations?.button;
              const originalShadow = getShadowForMode(uiTokens.buttonPrimary.shadow, vibe.isDarkUi);

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    backgroundColor: isActive ? colors.primary : "transparent",
                    color: isActive ? colors.onPrimary : colors.text,
                    padding: `${spacingObj.md} ${spacingObj.lg}`,
                    borderRadius: radiusMap[uiTokens.buttonPrimary.radius],
                    border: isActive ? "none" : `1px solid ${colors.borderSubtle}`,
                    fontSize: sizeMap["sm"],
                    fontFamily: fontPair.heading,
                    fontWeight: 600,
                    boxShadow: isActive ? originalShadow : "none",
                    cursor: "pointer",
                    transition: `all ${btnAnimConfig?.duration || 200}ms ${btnAnimConfig?.timingFunction || "ease-out"}`,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
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
                      e.currentTarget.style.borderColor = colors.primary;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      removeHoverAnimation(e.currentTarget, btnAnimConfig?.type || "subtle", {
                        duration: btnAnimConfig?.duration || 200,
                        timingFunction: btnAnimConfig?.timingFunction || "ease-out",
                        originalShadow,
                      });
                      e.currentTarget.style.borderColor = colors.borderSubtle;
                    }
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section
        className="px-6 py-16 md:py-24"
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, idx) => {
              const cardAnimConfig = uiTokens.animations?.card;
              const originalShadow = getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi);

              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: colors.surface,
                    border: getBorderStyle(uiTokens.card.border, colors),
                    borderRadius: radiusMap[uiTokens.card.radius],
                    overflow: "hidden",
                    boxShadow: originalShadow,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
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
                  {/* Color header bar */}
                  <div
                    style={{
                      height: "4px",
                      background: article.color,
                    }}
                  />

                  {/* Content */}
                  <div
                    style={{
                      padding: spacingObj["2xl"],
                      display: "flex",
                      flexDirection: "column",
                      gap: spacingObj.md,
                      flex: "1",
                    }}
                  >
                    {/* Category badge */}
                    <div
                      style={{
                        display: "inline-block",
                        backgroundColor: `${article.color}20`,
                        color: article.color,
                        padding: `${spacingObj.xs} ${spacingObj.md}`,
                        borderRadius: radiusMap.full,
                        fontSize: sizeMap["xs"],
                        fontFamily: fontPair.heading,
                        fontWeight: 600,
                        width: "fit-content",
                      }}
                    >
                      {article.category}
                    </div>

                    {/* Title */}
                    <div
                      style={{
                        fontFamily: fontPair.heading,
                        fontSize: sizeMap["lg"],
                        fontWeight: 600,
                        color: colors.text,
                        lineHeight: "1.4",
                      }}
                    >
                      {article.title}
                    </div>

                    {/* Excerpt */}
                    <p
                      style={{
                        fontFamily: fontPair.body,
                        fontSize: sizeMap["sm"],
                        color: colors.textMuted,
                        flex: "1",
                      }}
                    >
                      {article.excerpt}
                    </p>

                    {/* Footer with date and link */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: spacingObj.md,
                        borderTop: `1px solid ${colors.borderSubtle}`,
                        marginTop: "auto",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: fontPair.body,
                          fontSize: sizeMap["xs"],
                          color: colors.textMuted,
                        }}
                      >
                        {article.date}
                      </span>

                      {/* Read More Link */}
                      {(() => {
                        const linkAnimConfig = uiTokens.animations?.link;
                        const originalColor = article.color;

                        return (
                          <a
                            href="#"
                            style={{
                              color: article.color,
                              textDecoration: "none",
                              fontSize: sizeMap["sm"],
                              fontFamily: fontPair.body,
                              cursor: "pointer",
                              fontWeight: 600,
                              transition: `all ${linkAnimConfig?.duration || 150}ms ${linkAnimConfig?.timingFunction || "ease-out"}`,
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
                            Read →
                          </a>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section
        className="px-6 py-16 md:py-24"
        style={{
          backgroundColor: colors.surface,
          borderTop: `1px solid ${colors.borderSubtle}`,
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
            Stay Updated
          </div>
          <p
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap["md"],
              color: colors.textMuted,
              marginBottom: spacingObj["2xl"],
            }}
          >
            Subscribe to get the latest articles and insights delivered to your inbox
          </p>

          <div
            style={{
              display: "flex",
              gap: spacingObj.md,
              maxWidth: "500px",
              margin: "0 auto",
            }}
            className="flex-col sm:flex-row sm:gap-3"
          >
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: "1",
                padding: `${spacingObj.md} ${spacingObj.lg}`,
                borderRadius: radiusMap.md,
                border: `1px solid ${colors.borderSubtle}`,
                backgroundColor: colors.background,
                color: colors.text,
                fontFamily: fontPair.body,
                fontSize: sizeMap["sm"],
              }}
            />

            {/* Subscribe Button */}
            {(() => {
              const btnAnimConfig = uiTokens.animations?.button;
              const originalShadow = getShadowForMode(uiTokens.buttonPrimary.shadow, vibe.isDarkUi);

              return (
                <button
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.onPrimary,
                    padding: `${spacingObj.md} ${spacingObj["2xl"]}`,
                    borderRadius: radiusMap[uiTokens.buttonPrimary.radius],
                    border: getBorderStyle(uiTokens.buttonPrimary.border, colors),
                    fontSize: sizeMap["sm"],
                    fontFamily: fontPair.heading,
                    fontWeight: 600,
                    boxShadow: originalShadow,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
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
                  Subscribe
                </button>
              );
            })()}
          </div>
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
                Design Insights
              </div>
              <p
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                Curated articles about design systems, user experience, and creative inspiration
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
                Categories
              </div>
              <ul
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
                className="space-y-2"
              >
                {["Design", "Development", "Inspiration"].map((item) => (
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
                More
              </div>
              <ul
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
                className="space-y-2"
              >
                {["Archive", "About", "Contact"].map((item) => (
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
              © 2024 Design Insights. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PreviewBlog;
