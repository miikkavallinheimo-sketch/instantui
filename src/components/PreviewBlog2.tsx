import type { CSSProperties } from "react";
import { useState } from "react";
import type { DesignState } from "../lib/types";
import { getShadowForMode } from "../lib/shadowTokens";

interface PreviewBlog2Props {
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

const PreviewBlog2 = ({ designState }: PreviewBlog2Props) => {
  const { colors, fontPair, typography, spacing: spacingObj, uiTokens } = designState;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Trends", "Process", "Resources", "Community"];

  const articles = [
    { title: "Design Trends 2024", excerpt: "What's shaping the future of design.", category: "Trends", readTime: "6 min", featured: true },
    { title: "Our Design Process", excerpt: "How we approach complex problems.", category: "Process", readTime: "8 min", featured: false },
    { title: "Free Resources", excerpt: "Tools and assets for your projects.", category: "Resources", readTime: "4 min", featured: false },
    { title: "Community Spotlight", excerpt: "Amazing work from our community.", category: "Community", readTime: "5 min", featured: true },
    { title: "Design Principles", excerpt: "Core values that guide our work.", category: "Process", readTime: "7 min", featured: false },
    { title: "Collaboration Guide", excerpt: "Effective design collaboration tips.", category: "Community", readTime: "6 min", featured: false },
  ];

  const filteredArticles = selectedCategory === "All"
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const rootStyle: CSSProperties = {
    color: colors.text,
  } as React.CSSProperties;

  return (
    <div className="w-full" style={rootStyle}>
      {/* Header with Gradient Background */}
      <header
        className="px-6 py-8 border-b"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.secondary}15 50%, ${colors.accent}15 100%)`,
          backgroundColor: colors.surface,
          borderColor: colors.borderSubtle,
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div
              style={{
                fontFamily: fontPair.heading,
                fontSize: sizeMap["2xl"],
                fontWeight: 700,
                backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textFillColor: "transparent",
              }}
            >
              Design Stories
            </div>
            <p
              style={{
                fontFamily: fontPair.body,
                fontSize: sizeMap["sm"],
                color: colors.textMuted,
                marginTop: spacingObj.xs,
              }}
            >
              Exploring design, trends, and the community
            </p>
          </div>
          <div
            className="px-4 py-2 rounded-lg text-sm font-semibold"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              color: colors.onPrimary,
              fontFamily: fontPair.heading,
            }}
          >
            {filteredArticles.length}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar with Gradient Categories */}
        <aside className="lg:col-span-1">
          <div
            className="sticky top-6 p-6 rounded-lg border"
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.borderSubtle,
              boxShadow: getShadowForMode("sm", designState.vibe.isDarkUi),
            }}
          >
            <div
              style={{
                fontFamily: fontPair.heading,
                fontSize: sizeMap["lg"],
                fontWeight: 600,
                color: colors.text,
                marginBottom: spacingObj.md,
              }}
            >
              Explore
            </div>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="w-full text-left px-4 py-2 rounded-lg transition-all"
                  style={{
                    background: selectedCategory === cat
                      ? `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`
                      : "transparent",
                    color: selectedCategory === cat ? colors.onPrimary : colors.text,
                    fontFamily: fontPair.body,
                    fontSize: sizeMap["sm"],
                    border: "none",
                    cursor: "pointer",
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
            {filteredArticles.map((article, idx) => (
              <article
                key={idx}
                className="rounded-lg border overflow-hidden transition-all relative"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.borderSubtle,
                  cursor: "pointer",
                  minHeight: article.featured ? "320px" : "280px",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = colors.primary;
                  el.style.boxShadow = getShadowForMode("lg", designState.vibe.isDarkUi);
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = colors.borderSubtle;
                  el.style.boxShadow = getShadowForMode("sm", designState.vibe.isDarkUi);
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Gradient header for featured articles */}
                {article.featured && (
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}30 0%, ${colors.accent}20 100%)`,
                      height: "60px",
                      borderBottom: `1px solid ${colors.primary}40`,
                    }}
                  />
                )}

                <div
                  className="p-6 flex flex-col h-full justify-between"
                >
                  <div>
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary}20, ${colors.accent}20)`,
                        color: colors.primary,
                        fontFamily: fontPair.body,
                        border: `1px solid ${colors.primary}40`,
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
                        marginBottom: spacingObj.sm,
                      }}
                    >
                      {article.title}
                    </div>
                    <p
                      style={{
                        fontFamily: fontPair.body,
                        fontSize: sizeMap["sm"],
                        color: colors.textMuted,
                      }}
                    >
                      {article.excerpt}
                    </p>
                  </div>

                  <div
                    className="flex items-center justify-between pt-4"
                    style={{
                      borderTop: `1px solid ${colors.borderSubtle}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: fontPair.body,
                        fontSize: sizeMap["xs"],
                        color: colors.textMuted,
                      }}
                    >
                      {article.readTime}
                    </span>
                    <button
                      className="px-3 py-1 rounded-lg font-semibold text-xs"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                        color: colors.onPrimary,
                        fontFamily: fontPair.heading,
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Read
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* CTA Section with Gradient */}
      <section
        className="mt-12 mx-6 rounded-lg p-8 md:p-12"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        }}
      >
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap["xl"],
              fontWeight: 600,
              color: colors.onPrimary,
            }}
          >
            Stay Inspired
          </div>
          <p
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap["md"],
              color: `${colors.onPrimary}cc`,
            }}
          >
            Get weekly design stories and insights delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-2 rounded-lg border"
              style={{
                borderColor: `${colors.onPrimary}30`,
                backgroundColor: `${colors.onPrimary}10`,
                color: colors.onPrimary,
                fontFamily: fontPair.body,
              }}
            />
            <button
              className="px-6 py-2 rounded-lg font-semibold"
              style={{
                backgroundColor: colors.onPrimary,
                color: colors.primary,
                fontFamily: fontPair.heading,
                border: "none",
                cursor: "pointer",
              }}
            >
              Join
            </button>
          </div>
        </div>
      </section>

      {/* Footer with Gradient Background */}
      <footer
        className="px-6 py-12 border-t mt-12"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}05 0%, ${colors.secondary}05 100%)`,
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
                  marginBottom: spacingObj.md,
                }}
              >
                Design Stories
              </div>
              <p
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                Exploring design, trends, and the power of creative collaboration.
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
                Topics
              </div>
              <ul
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
                className="space-y-1"
              >
                {categories.slice(1).map((cat) => (
                  <li key={cat}>
                    <a href="#" style={{ color: colors.text, textDecoration: "none" }}>
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
                className="space-y-1"
              >
                {["RSS Feed", "Archive", "About"].map((item) => (
                  <li key={item}>
                    <a href="#" style={{ color: colors.text, textDecoration: "none" }}>
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
              © 2024 Design Stories. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PreviewBlog2;
