import type { CSSProperties } from "react";
import type { DesignState } from "../lib/types";

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

  const articles = [
    {
      title: "Getting Started with Design Systems",
      excerpt:
        "Learn the fundamentals of building a scalable design system that grows with your product.",
      date: "Dec 15, 2024",
      author: "Sarah Chen",
      category: "Design",
      color: "secondary",
    },
    {
      title: "Typography Best Practices",
      excerpt:
        "Master the art of typography and create visual hierarchy that guides users through your interface.",
      date: "Dec 10, 2024",
      author: "Marcus Johnson",
      category: "Typography",
      color: "accent",
    },
    {
      title: "Color Theory for Interfaces",
      excerpt:
        "Understand how color psychology impacts user experience and how to build accessible color systems.",
      date: "Dec 5, 2024",
      author: "Lisa Park",
      category: "Color",
      color: "secondary",
    },
  ];

  const getColorForArticle = (colorKey: string) => {
    switch (colorKey) {
      case "secondary":
        return colors.secondary;
      case "accent":
        return colors.accent;
      default:
        return colors.secondary;
    }
  };

  const getOnColorForArticle = (colorKey: string) => {
    switch (colorKey) {
      case "secondary":
        return colors.onSecondary;
      case "accent":
        return colors.onAccent;
      default:
        return colors.onSecondary;
    }
  };

  const rootStyle: CSSProperties = {
    backgroundColor: colors.background,
    color: colors.text,
  } as React.CSSProperties;

  return (
    <div className="w-full" style={rootStyle}>
      {/* Hero Section */}
      <section className="px-6 py-12 md:py-16 border-b" style={{ borderColor: colors.borderSubtle }}>
        <div className="max-w-4xl mx-auto">
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap[typography.heading.size],
              fontWeight: typography.heading.weight,
              color: colors.text,
            }}
            className="mb-4"
          >
            Latest Articles
          </div>
          <p
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap[typography.body.size],
              color: colors.textMuted,
            }}
          >
            Insights, tips, and best practices for designing better products.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="px-6 py-12 md:py-16 border-b" style={{ borderColor: colors.borderSubtle }}>
        <div className="max-w-4xl mx-auto">
          <div
            style={{ backgroundColor: colors.primary }}
            className="p-8 md:p-12 rounded-lg text-left"
          >
            <div
              style={{
                fontFamily: fontPair.body,
                fontSize: sizeMap["sm"],
                fontWeight: 600,
                color: colors.onPrimary,
                textTransform: "uppercase",
              }}
              className="opacity-80 mb-2"
            >
              Featured
            </div>
            <div
              style={{
                fontFamily: fontPair.heading,
                fontSize: sizeMap["2xl"],
                fontWeight: 700,
                color: colors.onPrimary,
              }}
              className="mb-4"
            >
              Building Design Systems at Scale
            </div>
            <p
              style={{
                fontFamily: fontPair.body,
                fontSize: sizeMap[typography.body.size],
                color: `${colors.onPrimary}cc`,
              }}
              className="mb-6 max-w-2xl"
            >
              Discover how to architect a design system that empowers your entire
              organization to ship quality interfaces faster.
            </p>
            <div
              style={{
                fontFamily: fontPair.body,
                fontSize: sizeMap["sm"],
                color: `${colors.onPrimary}99`,
              }}
              className="flex gap-4 flex-wrap"
            >
              <span>By Emma Garcia</span>
              <span>Dec 20, 2024</span>
              <span
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: `${colors.onPrimary}20` }}
              >
                Design Systems
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {articles.map((article, idx) => {
            const articleColor = getColorForArticle(article.color);
            const articleOnColor = getOnColorForArticle(article.color);
            return (
              <article
                key={idx}
                className="pb-6 border-b"
                style={{ borderColor: colors.borderSubtle }}
              >
                <div className="flex gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center font-bold text-sm"
                    style={{
                      backgroundColor: articleColor,
                      color: articleOnColor,
                    }}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div className="space-y-2 flex-1">
                    <div
                      style={{
                        fontFamily: fontPair.heading,
                        fontSize: sizeMap["lg"],
                        fontWeight: 600,
                        color: colors.text,
                      }}
                    >
                      {article.title}
                    </div>
                    <p
                      style={{
                        fontFamily: fontPair.body,
                        fontSize: sizeMap[typography.body.size],
                        color: colors.textMuted,
                      }}
                    >
                      {article.excerpt}
                    </p>
                  </div>
                </div>
                <div
                  className="flex flex-wrap gap-4 items-center"
                  style={{
                    fontFamily: fontPair.body,
                    fontSize: sizeMap["sm"],
                    color: colors.textMuted,
                  }}
                >
                  <span>{article.author}</span>
                  <span>•</span>
                  <span>{article.date}</span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: articleColor,
                      color: articleOnColor,
                    }}
                  >
                    {article.category}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-6 py-12 md:py-16" style={{ backgroundColor: colors.accent }}>
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap["xl"],
              fontWeight: 600,
              color: colors.onAccent,
            }}
          >
            Subscribe to Our Newsletter
          </div>
          <p
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap[typography.body.size],
              color: `${colors.onAccent}cc`,
            }}
          >
            Get the latest design tips and insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border"
              style={{
                borderColor: `${colors.onAccent}30`,
                backgroundColor: `${colors.onAccent}10`,
                color: colors.onAccent,
                fontFamily: fontPair.body,
              }}
            />
            <button
              className="px-6 py-2 rounded-lg font-semibold"
              style={{
                backgroundColor: colors.onAccent,
                color: colors.accent,
                fontFamily: fontPair.heading,
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 border-t"
        style={{
          backgroundColor: colors.background,
          borderColor: colors.borderSubtle,
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap["sm"],
              color: colors.textMuted,
            }}
          >
            © 2024 Elementry Design Blog. All rights reserved. | <a href="#" style={{ color: colors.text }}>Privacy</a> | <a href="#" style={{ color: colors.text }}>Terms</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PreviewBlog;
