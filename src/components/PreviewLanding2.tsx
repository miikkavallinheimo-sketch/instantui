import type { CSSProperties } from "react";
import type { DesignState } from "../lib/types";
import { getShadowForMode } from "../lib/shadowTokens";

interface PreviewLanding2Props {
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

const PreviewLanding2 = ({ designState }: PreviewLanding2Props) => {
  const { colors, fontPair, typography, spacing: spacingObj, uiTokens } = designState;

  const steps = [
    { number: "01", title: "Choose", description: "Select from pre-built templates" },
    { number: "02", title: "Customize", description: "Adjust colors and typography" },
    { number: "03", title: "Deploy", description: "Export and use immediately" },
  ];

  const rootStyle: CSSProperties = {
    color: colors.text,
  } as React.CSSProperties;

  return (
    <div className="w-full" style={rootStyle}>
      {/* Header - Gradient */}
      <header
        className="sticky top-0 z-50 px-6 py-4 border-b"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}30 0%, ${colors.accent}20 100%)`,
          backgroundColor: colors.surface,
          borderColor: `${colors.primary}40`,
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
            NextGen
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {["Solutions", "Enterprise", "Pricing"].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.text,
                  textDecoration: "none",
                  transition: "all 0.2s",
                  paddingBottom: "0.25rem",
                  borderBottom: `2px solid transparent`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderBottomColor = colors.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderBottomColor = "transparent";
                }}
              >
                {item}
              </a>
            ))}
          </nav>
          <button
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
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
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero - Gradient with Accent */}
      <section
        className="px-6 py-16 md:py-28 text-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.secondary}10 50%, ${colors.accent}15 100%)`,
          backgroundColor: colors.background,
        }}
      >
        <div
          style={{
            fontFamily: fontPair.heading,
            fontSize: sizeMap["2xl"],
            fontWeight: 700,
            color: colors.text,
            marginBottom: spacingObj.lg,
            maxWidth: "700px",
            margin: "0 auto",
            marginBottom: spacingObj.lg,
            backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textFillColor: "transparent",
          }}
        >
          Design Systems Made Simple
        </div>
        <p
          style={{
            fontFamily: fontPair.body,
            fontSize: sizeMap["lg"],
            color: colors.textMuted,
            maxWidth: "600px",
            margin: "0 auto",
            marginBottom: spacingObj["2xl"],
          }}
        >
          Create stunning design systems with beautiful gradients and dynamic colors.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              color: colors.onPrimary,
              padding: `${spacingObj.md} ${spacingObj["2xl"]}`,
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: sizeMap["sm"],
              fontFamily: fontPair.heading,
              boxShadow: getShadowForMode("lg", designState.vibe.isDarkUi),
            }}
          >
            Explore Now
          </button>
          <button
            style={{
              backgroundColor: `${colors.primary}15`,
              color: colors.primary,
              padding: `${spacingObj.md} ${spacingObj["2xl"]}`,
              borderRadius: "0.5rem",
              border: `2px solid ${colors.primary}40`,
              cursor: "pointer",
              fontWeight: 600,
              fontSize: sizeMap["sm"],
              fontFamily: fontPair.heading,
            }}
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Steps Section with Gradients */}
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
            How It Works
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border relative overflow-hidden"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.borderSubtle,
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = colors.primary;
                  el.style.boxShadow = getShadowForMode("lg", designState.vibe.isDarkUi);
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = colors.borderSubtle;
                  el.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                    color: colors.onPrimary,
                    fontSize: sizeMap["2xl"],
                    fontWeight: 700,
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: spacingObj.lg,
                  }}
                >
                  {step.number}
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
                  {step.title}
                </div>
                <p
                  style={{
                    fontFamily: fontPair.body,
                    fontSize: sizeMap["sm"],
                    color: colors.textMuted,
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Gradient Background */}
      <section
        className="px-6 py-16 md:py-24"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}08 0%, ${colors.secondary}08 50%, ${colors.accent}08 100%)`,
          backgroundColor: colors.background,
        }}
      >
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
            Loved by Designers
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Alex Chen", role: "Design Lead", text: "Best design system framework out there." },
              { name: "Sarah Johnson", role: "Founder", text: "Saved us months of development time." },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="p-6 rounded-lg border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.borderSubtle,
                  borderLeft: `4px solid ${colors.primary}`,
                }}
              >
                <p
                  style={{
                    fontFamily: fontPair.body,
                    fontSize: sizeMap["sm"],
                    color: colors.text,
                    marginBottom: spacingObj.md,
                    fontStyle: "italic",
                  }}
                >
                  "{testimonial.text}"
                </p>
                <div
                  style={{
                    fontFamily: fontPair.heading,
                    fontSize: sizeMap["sm"],
                    fontWeight: 600,
                    color: colors.text,
                  }}
                >
                  {testimonial.name}
                </div>
                <div
                  style={{
                    fontFamily: fontPair.body,
                    fontSize: sizeMap["xs"],
                    color: colors.textMuted,
                  }}
                >
                  {testimonial.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Primary Gradient */}
      <section
        className="px-6 py-16 md:py-24"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
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
            Transform Your Design Workflow
          </div>
          <p
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap["md"],
              color: `${colors.onPrimary}dd`,
              marginBottom: spacingObj["2xl"],
            }}
          >
            Get started today and see the difference a powerful design system makes.
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
              boxShadow: getShadowForMode("lg", designState.vibe.isDarkUi),
            }}
          >
            Get Started Free
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
                NextGen
              </div>
              <p
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                Modern design systems with gradient magic.
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
                {["Features", "Enterprise", "Pricing"].map((item) => (
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
              © 2024 NextGen. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PreviewLanding2;
