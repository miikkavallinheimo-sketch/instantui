import type { CSSProperties } from "react";
import { useState } from "react";
import type { DesignState } from "../lib/types";
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

const PreviewBlog = ({ designState }: PreviewBlogProps) => {
  const { colors, fontPair, typography } = designState;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Design", "Typography", "Color", "Accessibility", "Workflow"];

  const articles = [
    {
      title: "Getting Started with Design Systems",
      excerpt: "Learn the fundamentals of building a scalable design system.",
      readTime: "8 min",
      category: "Design",
      color: "primary",
      componentType: "button", // Primary button showcase
    },
    {
      title: "Typography Best Practices",
      excerpt: "Master the art of typography and create visual hierarchy.",
      readTime: "12 min",
      category: "Typography",
      color: "secondary",
      componentType: "pill", // Pill/badge showcase
    },
    {
      title: "Color Theory for Interfaces",
      excerpt: "Understand how color psychology impacts user experience.",
      readTime: "10 min",
      category: "Color",
      color: "accent",
      componentType: "card", // Card component showcase
    },
    {
      title: "Accessibility Fundamentals",
      excerpt: "Build inclusive interfaces that work for everyone.",
      readTime: "15 min",
      category: "Accessibility",
      color: "primary",
      componentType: "button",
    },
    {
      title: "Design System Tokens",
      excerpt: "Organize and scale your design with proper tokenization.",
      readTime: "11 min",
      category: "Design",
      color: "secondary",
      componentType: "pill",
    },
    {
      title: "Workflow Optimization",
      excerpt: "Streamline your design process with better tools and habits.",
      readTime: "9 min",
      category: "Workflow",
      color: "accent",
      componentType: "card",
    },
  ];

  const filteredArticles = selectedCategory === "All"
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const getColorForArticle = (colorKey: string) => {
    switch (colorKey) {
      case "primary":
        return colors.primary;
      case "secondary":
        return colors.secondary;
      case "accent":
        return colors.accent;
      default:
        return colors.primary;
    }
  };

  const getOnColorForArticle = (colorKey: string) => {
    switch (colorKey) {
      case "primary":
        return colors.onPrimary;
      case "secondary":
        return colors.onSecondary;
      case "accent":
        return colors.onAccent;
      default:
        return colors.onPrimary;
    }
  };

  const rootStyle: CSSProperties = {
    backgroundColor: colors.background,
    color: colors.text,
  } as React.CSSProperties;

  return (
    <div className="w-full" style={rootStyle}>
      {/* Top Header */}
      <section
        className="px-6 py-8 border-b"
        style={{ borderColor: colors.borderSubtle }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div
              style={{
                fontFamily: fontPair.heading,
                fontSize: sizeMap["2xl"],
                fontWeight: 700,
                color: colors.text,
              }}
            >
              Design Journal
            </div>
            <p
              style={{
                fontFamily: fontPair.body,
                fontSize: sizeMap["sm"],
                color: colors.textMuted,
                marginTop: "0.5rem",
              }}
            >
              Stories, insights, and lessons from the design world
            </p>
          </div>
          <div
            className="px-6 py-3 rounded-lg text-sm font-semibold"
            style={{
              backgroundColor: colors.accent,
              color: colors.onAccent,
              fontFamily: fontPair.heading,
            }}
          >
            {filteredArticles.length} Articles
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div
            className="sticky top-6 p-6 rounded-lg"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.borderSubtle,
              border: `1px solid ${colors.borderSubtle}`,
              boxShadow: getShadowForMode(designState.uiTokens.card.shadow, designState.vibe.isDarkUi),
            }}
          >
            <div
              style={{
                fontFamily: fontPair.heading,
                fontSize: sizeMap["lg"],
                fontWeight: 600,
                color: colors.text,
                marginBottom: "1rem",
              }}
            >
              Categories
            </div>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="w-full text-left px-4 py-2 rounded-lg transition-all"
                  style={{
                    backgroundColor:
                      selectedCategory === cat
                        ? colors.primary
                        : "transparent",
                    color:
                      selectedCategory === cat
                        ? colors.onPrimary
                        : colors.text,
                    fontFamily: fontPair.body,
                    fontSize: sizeMap["sm"],
                    fontWeight: selectedCategory === cat ? 600 : 400,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Articles Grid */}
        <section className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article, idx) => {
              const articleColor = getColorForArticle(article.color);
              const articleOnColor = getOnColorForArticle(article.color);

              // Render different UI components based on componentType
              const renderComponentPreview = () => {
                if (article.componentType === "button") {
                  return (
                    <div className="flex flex-col gap-3">
                      <button
                        className="px-6 py-3 font-semibold text-sm"
                        style={{
                          backgroundColor: articleColor,
                          color: articleOnColor,
                          fontFamily: fontPair.heading,
                          borderRadius: "0.375rem",
                        }}
                      >
                        Primary Button
                      </button>
                      <button
                        className="px-6 py-3 font-semibold text-sm border"
                        style={{
                          color: articleColor,
                          borderColor: articleColor,
                          fontFamily: fontPair.heading,
                          borderRadius: "0.375rem",
                          backgroundColor: "transparent",
                        }}
                      >
                        Secondary Button
                      </button>
                    </div>
                  );
                } else if (article.componentType === "pill") {
                  return (
                    <div className="flex flex-wrap gap-2">
                      <span
                        className="px-4 py-2 text-sm font-medium"
                        style={{
                          backgroundColor: articleColor,
                          color: articleOnColor,
                          fontFamily: fontPair.body,
                          borderRadius: "9999px",
                        }}
                      >
                        Design
                      </span>
                      <span
                        className="px-4 py-2 text-sm font-medium"
                        style={{
                          backgroundColor: `${articleColor}20`,
                          color: articleColor,
                          fontFamily: fontPair.body,
                          borderRadius: "9999px",
                        }}
                      >
                        System
                      </span>
                      <span
                        className="px-4 py-2 text-sm font-medium border"
                        style={{
                          color: articleColor,
                          borderColor: articleColor,
                          fontFamily: fontPair.body,
                          borderRadius: "9999px",
                          backgroundColor: "transparent",
                        }}
                      >
                        Tags
                      </span>
                    </div>
                  );
                } else {
                  // card component
                  return (
                    <div className="grid grid-cols-2 gap-2">
                      <div
                        className="p-4"
                        style={{
                          backgroundColor: colors.surface,
                          borderColor: colors.borderSubtle,
                          border: `1px solid ${colors.borderSubtle}`,
                          borderRadius: "0.5rem",
                        }}
                      >
                        <div
                          style={{
                            fontSize: sizeMap["xs"],
                            color: colors.textMuted,
                            marginBottom: "0.5rem",
                          }}
                        >
                          Card 1
                        </div>
                        <div
                          style={{
                            fontSize: sizeMap["md"],
                            fontWeight: 600,
                            color: articleColor,
                          }}
                        >
                          24
                        </div>
                      </div>
                      <div
                        className="p-4"
                        style={{
                          backgroundColor: `${articleColor}10`,
                          borderColor: articleColor,
                          border: `1px solid ${articleColor}30`,
                          borderRadius: "0.5rem",
                        }}
                      >
                        <div
                          style={{
                            fontSize: sizeMap["xs"],
                            color: colors.textMuted,
                            marginBottom: "0.5rem",
                          }}
                        >
                          Card 2
                        </div>
                        <div
                          style={{
                            fontSize: sizeMap["md"],
                            fontWeight: 600,
                            color: articleColor,
                          }}
                        >
                          12%
                        </div>
                      </div>
                    </div>
                  );
                }
              };

              return (
                <article
                  key={idx}
                  className="rounded-lg overflow-hidden transition-shadow cursor-pointer"
                  style={{
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.borderSubtle}`,
                    boxShadow: getShadowForMode(designState.uiTokens.card.shadow, designState.vibe.isDarkUi),
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.boxShadow = getShadowForMode("lg", designState.vibe.isDarkUi);
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.boxShadow = getShadowForMode(designState.uiTokens.card.shadow, designState.vibe.isDarkUi);
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    className="p-6"
                    style={{ backgroundColor: `${articleColor}08` }}
                  >
                    {renderComponentPreview()}
                  </div>
                  <div className="p-6">
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                      style={{
                        backgroundColor: `${articleColor}20`,
                        color: articleColor,
                        fontFamily: fontPair.body,
                      }}
                    >
                      {article.category}
                    </div>
                    <div
                      style={{
                        fontFamily: fontPair.heading,
                        fontSize: sizeMap["lg"],
                        fontWeight: 600,
                        color: colors.text,
                        marginBottom: "0.75rem",
                      }}
                    >
                      {article.title}
                    </div>
                    <p
                      style={{
                        fontFamily: fontPair.body,
                        fontSize: sizeMap["sm"],
                        color: colors.textMuted,
                        marginBottom: "1rem",
                      }}
                    >
                      {article.excerpt}
                    </p>
                    <div
                      className="flex items-center justify-between"
                      style={{
                        fontFamily: fontPair.body,
                        fontSize: sizeMap["xs"],
                        color: colors.textMuted,
                      }}
                    >
                      <span>{article.readTime}</span>
                      <button
                        className="px-3 py-1 rounded-full font-semibold text-xs"
                        style={{
                          backgroundColor: articleColor,
                          color: articleOnColor,
                          fontFamily: fontPair.heading,
                        }}
                      >
                        Read
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section
        className="mt-12 mx-6 rounded-lg p-8 md:p-12"
        style={{ backgroundColor: colors.secondary }}
      >
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap["xl"],
              fontWeight: 600,
              color: colors.onSecondary,
            }}
          >
            Stay Updated with Latest Insights
          </div>
          <p
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap[typography.body.size],
              color: `${colors.onSecondary}cc`,
            }}
          >
            Get curated design articles and resources delivered weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 rounded-lg border"
              style={{
                borderColor: `${colors.onSecondary}30`,
                backgroundColor: `${colors.onSecondary}10`,
                color: colors.onSecondary,
                fontFamily: fontPair.body,
              }}
            />
            <button
              className="px-6 py-2 rounded-lg font-semibold"
              style={{
                backgroundColor: colors.onSecondary,
                color: colors.secondary,
                fontFamily: fontPair.heading,
              }}
            >
              Join
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-12 border-t mt-12"
        style={{
          backgroundColor: colors.background,
          borderColor: colors.borderSubtle,
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
                  marginBottom: "1rem",
                }}
              >
                About Blog
              </div>
              <p
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                  lineHeight: 1.6,
                }}
              >
                Sharing knowledge about design systems, typography, and creating beautiful products.
              </p>
            </div>
            <div>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: "1rem",
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
                {categories.slice(1).map((cat) => (
                  <li key={cat}>
                    <a href="#" style={{ color: colors.text }}>
                      {cat}
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
                  marginBottom: "1rem",
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
                <li><a href="#" style={{ color: colors.text }}>RSS Feed</a></li>
                <li><a href="#" style={{ color: colors.text }}>Archive</a></li>
                <li><a href="#" style={{ color: colors.text }}>Contact</a></li>
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
              © 2024 InstantUI Design Journal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PreviewBlog;
