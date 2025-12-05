import type { CSSProperties } from "react";
import type { DesignState } from "../lib/types";
import { getShadowForMode } from "../lib/shadowTokens";

interface PreviewGradientsProps {
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

const PreviewGradients = ({ designState }: PreviewGradientsProps) => {
  const { colors, fontPair, vibe, spacing: spacingObj, uiTokens } = designState;

  const gradients = [
    {
      name: "Primary to Secondary",
      description: "Smooth transition from primary to secondary color",
      gradient: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
    },
    {
      name: "Secondary to Accent",
      description: "Vibrant secondary to accent blend",
      gradient: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
    },
    {
      name: "Primary to Accent",
      description: "Bold primary to accent gradient",
      gradient: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
    },
    {
      name: "Accent to Primary",
      description: "Reverse accent to primary flow",
      gradient: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
    },
    {
      name: "Horizontal Primary-Secondary",
      description: "Left to right primary and secondary",
      gradient: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
    },
    {
      name: "Vertical Secondary-Accent",
      description: "Top to bottom secondary and accent",
      gradient: `linear-gradient(180deg, ${colors.secondary}, ${colors.accent})`,
    },
    {
      name: "Radial Primary",
      description: "Radial gradient from primary",
      gradient: `radial-gradient(circle, ${colors.primary}, ${colors.background})`,
    },
    {
      name: "Radial Secondary",
      description: "Radial gradient from secondary",
      gradient: `radial-gradient(circle, ${colors.secondary}, ${colors.background})`,
    },
    {
      name: "Multi-color Arc",
      description: "Primary through secondary to accent",
      gradient: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
    },
    {
      name: "Soft Primary Blend",
      description: "Subtle primary fade",
      gradient: `linear-gradient(135deg, ${colors.primary}40, ${colors.primary}10)`,
    },
    {
      name: "Surface Gradient",
      description: "Surface colors with primary accent",
      gradient: `linear-gradient(135deg, ${colors.surface}, ${colors.primary}20)`,
    },
    {
      name: "Dark Gradient",
      description: "Deep background to primary",
      gradient: `linear-gradient(135deg, ${colors.background}, ${colors.primary}30)`,
    },
  ];

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
        <div className="max-w-7xl mx-auto">
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap["lg"],
              fontWeight: 700,
              color: colors.primary,
            }}
          >
            Gradient Showcase
          </div>
          <p
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap["sm"],
              color: colors.textMuted,
              marginTop: spacingObj.xs,
            }}
          >
            Beautiful gradient combinations from your design system
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="px-6 py-20 md:py-32"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
          backgroundSize: "400% 400%",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap["2xl"],
              fontWeight: 700,
              color: colors.onPrimary,
              marginBottom: spacingObj.lg,
            }}
          >
            Gradient Gallery
          </div>
          <p
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap["lg"],
              color: colors.onPrimary,
              opacity: 0.9,
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Explore the beautiful color transitions available in your design system
          </p>
        </div>
      </section>

      {/* Gradients Grid */}
      <section
        className="px-6 py-16 md:py-24"
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gradients.map((item, idx) => {
              const originalShadow = getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi);

              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: colors.surface,
                    borderRadius: radiusMap.lg,
                    border: `1px solid ${colors.borderSubtle}`,
                    overflow: "hidden",
                    boxShadow: originalShadow,
                    transition: "all 250ms ease-out",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = getShadowForMode("lg", vibe.isDarkUi);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = originalShadow;
                  }}
                >
                  {/* Gradient Preview */}
                  <div
                    style={{
                      height: "160px",
                      background: item.gradient,
                    }}
                  />

                  {/* Content */}
                  <div style={{ padding: spacingObj["2xl"] }}>
                    <div
                      style={{
                        fontFamily: fontPair.heading,
                        fontSize: sizeMap["lg"],
                        fontWeight: 600,
                        color: colors.text,
                        marginBottom: spacingObj.sm,
                      }}
                    >
                      {item.name}
                    </div>
                    <p
                      style={{
                        fontFamily: fontPair.body,
                        fontSize: sizeMap["sm"],
                        color: colors.textMuted,
                        marginBottom: spacingObj.md,
                      }}
                    >
                      {item.description}
                    </p>
                    <div
                      style={{
                        fontFamily: fontPair.body,
                        fontSize: sizeMap["xs"],
                        color: colors.textMuted,
                        overflowWrap: "break-word",
                        wordBreak: "break-all",
                        padding: spacingObj.md,
                        backgroundColor: colors.background,
                        borderRadius: radiusMap.sm,
                        border: `1px solid ${colors.borderSubtle}`,
                      }}
                    >
                      {item.gradient}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full-Width Gradient Examples */}
      <section
        className="px-6 py-16 md:py-24 border-t"
        style={{
          borderColor: colors.borderSubtle,
          backgroundColor: colors.surface,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap["xl"],
              fontWeight: 600,
              color: colors.text,
              marginBottom: spacingObj["2xl"],
            }}
          >
            Full-Width Applications
          </div>

          <div className="space-y-6">
            {/* Hero-style gradient */}
            <div
              style={{
                height: "200px",
                borderRadius: radiusMap.lg,
                background: `linear-gradient(135deg, ${colors.primary}40 0%, ${colors.secondary}40 50%, ${colors.accent}40 100%)`,
                border: `1px solid ${colors.borderSubtle}`,
                padding: spacingObj["2xl"],
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontSize: sizeMap["xl"],
                  fontWeight: 600,
                  color: colors.text,
                  textAlign: "center",
                }}
              >
                Subtle Multi-Color Gradient
              </div>
              <p
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                  marginTop: spacingObj.md,
                  textAlign: "center",
                }}
              >
                Great for hero sections and backgrounds
              </p>
            </div>

            {/* Accent gradient */}
            <div
              style={{
                height: "200px",
                borderRadius: radiusMap.lg,
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
                border: `1px solid ${colors.borderSubtle}`,
                padding: spacingObj["2xl"],
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontSize: sizeMap["xl"],
                  fontWeight: 600,
                  color: colors.onPrimary,
                  textAlign: "center",
                }}
              >
                Bold Accent Gradient
              </div>
              <p
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.onPrimary,
                  opacity: 0.9,
                  marginTop: spacingObj.md,
                  textAlign: "center",
                }}
              >
                Perfect for calls to action and feature highlights
              </p>
            </div>

            {/* Radial gradient */}
            <div
              style={{
                height: "200px",
                borderRadius: radiusMap.lg,
                background: `radial-gradient(circle at 30% 70%, ${colors.secondary}, ${colors.background})`,
                border: `1px solid ${colors.borderSubtle}`,
                padding: spacingObj["2xl"],
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontSize: sizeMap["xl"],
                  fontWeight: 600,
                  color: colors.text,
                  textAlign: "center",
                }}
              >
                Radial Gradient Effect
              </div>
              <p
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                  marginTop: spacingObj.md,
                  textAlign: "center",
                }}
              >
                Creates depth and focus in your designs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Guide */}
      <section
        className="px-6 py-16 md:py-24"
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap["xl"],
              fontWeight: 600,
              color: colors.text,
              marginBottom: spacingObj["2xl"],
            }}
          >
            Using Gradients in Your Design
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "CSS Background",
                code: "background: linear-gradient(135deg, #primary, #secondary);",
              },
              {
                title: "Text Gradient",
                code: "background-clip: text; -webkit-background-clip: text;",
              },
              {
                title: "Radial Gradient",
                code: "background: radial-gradient(circle, #primary, #background);",
              },
              {
                title: "Animation",
                code: "background-size: 400% 400%; animation: gradientShift 15s ease infinite;",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: radiusMap.md,
                  border: `1px solid ${colors.borderSubtle}`,
                  padding: spacingObj["2xl"],
                }}
              >
                <div
                  style={{
                    fontFamily: fontPair.heading,
                    fontSize: sizeMap["md"],
                    fontWeight: 600,
                    color: colors.text,
                    marginBottom: spacingObj.md,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontFamily: "monospace",
                    fontSize: sizeMap["sm"],
                    color: colors.accent,
                    backgroundColor: colors.background,
                    padding: spacingObj.md,
                    borderRadius: radiusMap.sm,
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                  }}
                >
                  {item.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-12 border-t"
        style={{
          borderColor: colors.borderSubtle,
          backgroundColor: colors.surface,
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <p
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap["sm"],
              color: colors.textMuted,
            }}
          >
            Copy any gradient code and use it in your projects
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PreviewGradients;
