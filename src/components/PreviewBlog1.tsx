import type { CSSProperties } from "react";
import { useState } from "react";
import type { DesignState } from "../lib/types";
import { getShadowForMode } from "../lib/shadowTokens";

interface PreviewBlog1Props {
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

const PreviewBlog1 = ({ designState }: PreviewBlog1Props) => {
  const { colors, fontPair, typography, spacing: spacingObj, uiTokens } = designState;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Tutorial", "Case Study", "News", "Tips"];

  const articles = [
    { title: "Getting Started with Components", excerpt: "Learn the basics of our component library.", category: "Tutorial", readTime: "5 min" },
    { title: "Design System Best Practices", excerpt: "Proven patterns for scaling your design.", category: "Case Study", readTime: "8 min" },
    { title: "New Features Released", excerpt: "Check out what's new in version 2.0.", category: "News", readTime: "3 min" },
    { title: "Typography Tips", excerpt: "Master the art of choosing fonts.", category: "Tips", readTime: "6 min" },
    { title: "Color Theory Explained", excerpt: "Understanding color in design systems.", category: "Tutorial", readTime: "7 min" },
    { title: "Accessibility Matters", excerpt: "Building inclusive experiences for all.", category: "Tips", readTime: "9 min" },
  ];

  const filteredArticles = selectedCategory === "All"
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const rootStyle: CSSProperties = {
    color: colors.text,
  } as React.CSSProperties;

  return (
    <div className="w-full" style={rootStyle}>
      {/* Header - Dark */}
      <header
        className="px-6 py-8 border-b"
        style={{
          backgroundColor: colors.background,
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
                color: colors.text,
              }}
            >
              Insights
            </div>
            <p
              style={{
                fontFamily: fontPair.body,
                fontSize: sizeMap["sm"],
                color: colors.textMuted,
                marginTop: spacingObj.xs,
              }}
            >
              Stories and lessons from the design world
            </p>
          </div>
          <div
            className="px-4 py-2 rounded-lg text-sm font-semibold"
            style={{
              backgroundColor: colors.primary,
              color: colors.onPrimary,
              fontFamily: fontPair.heading,
            }}
          >
            {filteredArticles.length} Articles
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
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
              Topics
            </div>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="w-full text-left px-4 py-2 rounded-lg transition-all"
                  style={{
                    backgroundColor: selectedCategory === cat ? colors.primary : "transparent",
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
                className="rounded-lg border overflow-hidden transition-all"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.borderSubtle,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = colors.primary;
                  el.style.boxShadow = getShadowForMode("md", designState.vibe.isDarkUi);
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = colors.borderSubtle;
                  el.style.boxShadow = getShadowForMode("sm", designState.vibe.isDarkUi);
                  el.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="p-6"
                  style={{
                    backgroundColor: colors.surface,
                    borderBottom: `1px solid ${colors.borderSubtle}`,
                  }}
                >
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                    style={{
                      backgroundColor: `${colors.primary}20`,
                      color: colors.primary,
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
                  className="p-6 flex items-center justify-between"
                  style={{
                    fontFamily: fontPair.body,
                    fontSize: sizeMap["xs"],
                    color: colors.textMuted,
                  }}
                >
                  <span>{article.readTime}</span>
                  <button
                    className="px-3 py-1 rounded-lg font-semibold text-xs"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.onPrimary,
                      fontFamily: fontPair.heading,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Read
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Newsletter Section */}
      <section
        className="mt-12 mx-6 rounded-lg p-8 md:p-12"
        style={{
          backgroundColor: colors.primary,
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
            Never Miss an Update
          </div>
          <p
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap["md"],
              color: `${colors.onPrimary}cc`,
            }}
          >
            Get the latest articles and design insights delivered to your inbox.
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
              Subscribe
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
                  marginBottom: spacingObj.md,
                }}
              >
                Insights
              </div>
              <p
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                Sharing knowledge and lessons learned from designing systems.
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
                {["RSS Feed", "Archive", "Contact"].map((item) => (
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
              © 2024 Insights. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PreviewBlog1;
