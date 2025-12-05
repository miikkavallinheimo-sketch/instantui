import type { CSSProperties } from "react";
import type { DesignState } from "../lib/types";

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

const PreviewLanding = ({ designState }: PreviewLandingProps) => {
  const { colors, fontPair, typography } = designState;

  const features = [
    {
      title: "Fast & Responsive",
      description: "Built for speed with optimized performance across all devices.",
      color: "primary",
    },
    {
      title: "Beautiful Design",
      description: "Carefully crafted visual hierarchy and color system.",
      color: "secondary",
    },
    {
      title: "Accessible",
      description: "WCAG compliant with proper contrast and semantic HTML.",
      color: "accent",
    },
    {
      title: "Developer Friendly",
      description: "Clean code, well-documented, and easy to customize.",
      color: "primary",
    },
    {
      title: "Production Ready",
      description: "Battle-tested components ready for real-world use.",
      color: "secondary",
    },
    {
      title: "Future Proof",
      description: "Built with modern standards and best practices.",
      color: "accent",
    },
  ];

  const getColorForFeature = (colorKey: string) => {
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

  const getOnColorForFeature = (colorKey: string) => {
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
    color: colors.text,
  } as React.CSSProperties;

  return (
    <div className="w-full" style={rootStyle}>
      {/* Header / Navigation */}
      <header
        className="sticky top-0 z-50 px-6 py-4 border-b"
        style={{
          borderColor: colors.borderSubtle,
          backgroundColor: colors.background,
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap["lg"],
              fontWeight: 700,
              color: colors.text,
              letterSpacing: "-0.5px",
            }}
          >
            ChromUI
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {["Features", "Pricing", "Docs", "Blog"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.text,
                  textDecoration: "none",
                  transition: "color 0.2s",
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

          {/* CTA Button */}
          <button
            className="px-5 py-2 rounded-lg font-semibold text-sm"
            style={{
              backgroundColor: colors.accent,
              color: colors.onAccent,
              fontFamily: fontPair.heading,
            }}
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 text-center space-y-6">
        <div
          style={{
            fontFamily: fontPair.heading,
            fontSize: sizeMap[typography.heading.size],
            fontWeight: typography.heading.weight,
            fontStyle: typography.heading.style,
            color: colors.text,
          }}
          className="max-w-3xl mx-auto"
        >
          Design Beautiful Products Faster
        </div>

        <p
          style={{
            fontFamily: fontPair.body,
            fontSize: sizeMap[typography.body.size],
            fontWeight: typography.body.weight,
            color: colors.textMuted,
          }}
          className="max-w-2xl mx-auto text-lg"
        >
          A comprehensive design system with pre-built components and thoughtful
          defaults. Start your next project with confidence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            className="px-6 py-3 rounded-lg font-semibold"
            style={{
              backgroundColor: colors.primary,
              color: colors.onPrimary,
              fontFamily: fontPair.heading,
            }}
          >
            Get Started
          </button>
          <button
            className="px-6 py-3 rounded-lg font-semibold border"
            style={{
              borderColor: colors.borderSubtle,
              color: colors.text,
              fontFamily: fontPair.heading,
              backgroundColor: "transparent",
            }}
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 md:py-24">
        <div
          style={{
            fontFamily: fontPair.heading,
            fontSize: sizeMap[typography.subheading?.size ?? "xl"],
            fontWeight: typography.subheading?.weight ?? 600,
            color: colors.text,
          }}
          className="text-center mb-12"
        >
          Why Choose Us
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const featureColor = getColorForFeature(feature.color);
            const featureOnColor = getOnColorForFeature(feature.color);
            return (
              <div
                key={idx}
                className="p-6 rounded-lg border-l-4 overflow-hidden"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: featureColor,
                  borderLeftColor: featureColor,
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center font-bold"
                  style={{
                    backgroundColor: featureColor,
                    color: featureOnColor,
                  }}
                >
                  {String.fromCharCode(65 + (idx % 6))}
                </div>
                <div
                  style={{
                    fontFamily: fontPair.heading,
                    fontSize: sizeMap["lg"],
                    fontWeight: 600,
                    color: colors.text,
                  }}
                  className="mb-3"
                >
                  {feature.title}
                </div>
                <p
                  style={{
                    fontFamily: fontPair.body,
                    fontSize: sizeMap[typography.body.size],
                    color: colors.textMuted,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="px-6 py-16 md:py-24 text-center"
        style={{ backgroundColor: colors.primary }}
      >
        <div
          style={{
            fontFamily: fontPair.heading,
            fontSize: sizeMap[typography.heading.size],
            fontWeight: typography.heading.weight,
            color: colors.onPrimary,
          }}
          className="max-w-2xl mx-auto mb-4"
        >
          Ready to Build Something Great?
        </div>
        <p
          style={{
            fontFamily: fontPair.body,
            fontSize: sizeMap[typography.body.size],
            color: `${colors.onPrimary}dd`,
          }}
          className="max-w-xl mx-auto mb-8"
        >
          Start with ChromUI today and create beautiful designs instantly.
        </p>
        <button
          className="px-6 py-3 rounded-lg font-semibold"
          style={{
            backgroundColor: colors.onPrimary,
            color: colors.primary,
            fontFamily: fontPair.heading,
          }}
        >
          Start Free
        </button>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 border-t"
        style={{
          backgroundColor: colors.background,
          borderColor: colors.borderSubtle,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: "1rem",
                }}
              >
                ChromUI
              </div>
              <p
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                Beautiful design systems, instantly generated.
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
                <li><a href="#" style={{ color: colors.text }}>Features</a></li>
                <li><a href="#" style={{ color: colors.text }}>Pricing</a></li>
                <li><a href="#" style={{ color: colors.text }}>Docs</a></li>
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
                <li><a href="#" style={{ color: colors.text }}>About</a></li>
                <li><a href="#" style={{ color: colors.text }}>Blog</a></li>
                <li><a href="#" style={{ color: colors.text }}>Contact</a></li>
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
                Legal
              </div>
              <ul
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
                className="space-y-2"
              >
                <li><a href="#" style={{ color: colors.text }}>Privacy</a></li>
                <li><a href="#" style={{ color: colors.text }}>Terms</a></li>
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
              © 2024 ChromUI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PreviewLanding;
