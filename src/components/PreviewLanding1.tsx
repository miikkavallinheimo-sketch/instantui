import type { CSSProperties } from "react";
import type { DesignState } from "../lib/types";
import { getShadowForMode } from "../lib/shadowTokens";

interface PreviewLanding1Props {
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

const PreviewLanding1 = ({ designState }: PreviewLanding1Props) => {
  const { colors, fontPair, typography, spacing: spacingObj, uiTokens } = designState;

  const features = [
    { title: "Lightning Fast", description: "Optimized for performance", icon: "⚡" },
    { title: "Beautiful", description: "Crafted with attention to detail", icon: "✨" },
    { title: "Accessible", description: "WCAG compliant design", icon: "♿" },
    { title: "Developer Friendly", description: "Clean and documented code", icon: "💻" },
    { title: "Responsive", description: "Works on all devices", icon: "📱" },
    { title: "Customizable", description: "Build your own theme", icon: "🎨" },
  ];

  const rootStyle: CSSProperties = {
    color: colors.text,
  } as React.CSSProperties;

  return (
    <div className="w-full" style={rootStyle}>
      {/* Header - Simple */}
      <header
        className="sticky top-0 z-50 px-6 py-4 border-b"
        style={{
          borderColor: colors.borderSubtle,
          backgroundColor: colors.surface,
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap["lg"],
              fontWeight: 700,
              color: colors.text,
            }}
          >
            BuildKit
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {["Features", "Pricing", "Docs"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                  textDecoration: "none",
                  transition: "color 0.2s",
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
            ))}
          </nav>
          <button
            style={{
              backgroundColor: colors.primary,
              color: colors.onPrimary,
              padding: `${spacingObj.sm} ${spacingObj.lg}`,
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: sizeMap["sm"],
              fontFamily: fontPair.heading,
            }}
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero - Minimal */}
      <section
        className="px-6 py-16 md:py-24 text-center"
        style={{
          backgroundColor: colors.surface,
        }}
      >
        <div
          style={{
            fontFamily: fontPair.heading,
            fontSize: sizeMap["2xl"],
            fontWeight: 700,
            color: colors.text,
            marginBottom: spacingObj.lg,
            maxWidth: "600px",
            margin: "0 auto",
            marginBottom: spacingObj.lg,
          }}
        >
          Beautiful Design System for Modern Products
        </div>
        <p
          style={{
            fontFamily: fontPair.body,
            fontSize: sizeMap["md"],
            color: colors.textMuted,
            maxWidth: "500px",
            margin: "0 auto",
            marginBottom: spacingObj["2xl"],
          }}
        >
          Build faster, design better, and ship confidently with our comprehensive design system.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            style={{
              backgroundColor: colors.primary,
              color: colors.onPrimary,
              padding: `${spacingObj.md} ${spacingObj["2xl"]}`,
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: sizeMap["sm"],
              fontFamily: fontPair.heading,
            }}
          >
            Start Building
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              color: colors.primary,
              padding: `${spacingObj.md} ${spacingObj["2xl"]}`,
              borderRadius: "0.5rem",
              border: `2px solid ${colors.primary}`,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: sizeMap["sm"],
              fontFamily: fontPair.heading,
            }}
          >
            View Demo
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap["xl"],
              fontWeight: 600,
              color: colors.text,
              textAlign: "center",
              marginBottom: spacingObj["2xl"],
            }}
          >
            Why Choose BuildKit
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.borderSubtle,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = colors.primary;
                  el.style.boxShadow = getShadowForMode("md", designState.vibe.isDarkUi);
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = colors.borderSubtle;
                  el.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    marginBottom: spacingObj.md,
                  }}
                >
                  {feature.icon}
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
                  {feature.title}
                </div>
                <p
                  style={{
                    fontFamily: fontPair.body,
                    fontSize: sizeMap["sm"],
                    color: colors.textMuted,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="px-6 py-16 md:py-24"
        style={{
          backgroundColor: colors.primary,
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap["xl"],
              fontWeight: 600,
              color: colors.onPrimary,
              marginBottom: spacingObj.md,
            }}
          >
            Ready to Get Started?
          </div>
          <p
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap["md"],
              color: `${colors.onPrimary}cc`,
              marginBottom: spacingObj["2xl"],
            }}
          >
            Join hundreds of teams building beautiful products with BuildKit.
          </p>
          <button
            style={{
              backgroundColor: colors.onPrimary,
              color: colors.primary,
              padding: `${spacingObj.md} ${spacingObj["2xl"]}`,
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: sizeMap["sm"],
              fontFamily: fontPair.heading,
            }}
          >
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-12 border-t"
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
                BuildKit
              </div>
              <p
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                A modern design system for building beautiful products.
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
                className="space-y-1"
              >
                {["Features", "Pricing", "Docs"].map((item) => (
                  <li key={item}>
                    <a href="#" style={{ color: colors.text, textDecoration: "none" }}>
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
                className="space-y-1"
              >
                {["About", "Blog", "Contact"].map((item) => (
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
              © 2024 BuildKit. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PreviewLanding1;
