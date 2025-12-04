import type { CSSProperties } from "react";
import type { DesignState, BorderToken } from "../lib/types";
import { getShadowForMode } from "../lib/shadowTokens";

interface PreviewComponentsProps {
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

const PreviewComponents = ({ designState }: PreviewComponentsProps) => {
  const { colors, fontPair, typography, uiTokens, vibe } = designState;

  const rootStyle: CSSProperties = {
    backgroundColor: colors.background,
    color: colors.text,
  };

  const componentCategories = [
    {
      title: "Buttons",
      components: [
        {
          name: "Primary Button",
          render: () => (
            <button
              style={{
                backgroundColor: colors.primary,
                color: colors.onPrimary,
                padding: "0.75rem 1.5rem",
                borderRadius: radiusMap[uiTokens.buttonPrimary.radius],
                border: getBorderStyle(uiTokens.buttonPrimary.border, colors),
                fontSize: sizeMap["sm"],
                fontFamily: fontPair.heading,
                fontWeight: 600,
                boxShadow: getShadowForMode(uiTokens.buttonPrimary.shadow, vibe.isDarkUi),
                cursor: "pointer",
                transition: `all ${uiTokens.animations?.button.duration || 200}ms ${uiTokens.animations?.button.timingFunction || "ease-out"}`,
              }}
              onMouseEnter={(e) => {
                const scale = uiTokens.animations?.button.scale || 1.05;
                const ty = uiTokens.animations?.button.translateY || -2;
                e.currentTarget.style.transform = `scale(${scale}) translateY(${ty}px)`;
                e.currentTarget.style.boxShadow = getShadowForMode("lg", vibe.isDarkUi);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) translateY(0)";
                e.currentTarget.style.boxShadow = getShadowForMode(uiTokens.buttonPrimary.shadow, vibe.isDarkUi);
              }}
            >
              Click me
            </button>
          ),
        },
        {
          name: "Secondary Button",
          render: () => (
            <button
              style={{
                backgroundColor: "transparent",
                color: colors.primary,
                padding: "0.75rem 1.5rem",
                borderRadius: radiusMap[uiTokens.buttonSecondary.radius],
                border: getBorderStyle(uiTokens.buttonSecondary.border, colors),
                fontSize: sizeMap["sm"],
                fontFamily: fontPair.heading,
                fontWeight: 600,
                boxShadow: getShadowForMode(uiTokens.buttonSecondary.shadow, vibe.isDarkUi),
                cursor: "pointer",
                transition: `all ${uiTokens.animations?.button.duration || 200}ms ${uiTokens.animations?.button.timingFunction || "ease-out"}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.primary}10`;
                e.currentTarget.style.boxShadow = getShadowForMode("md", vibe.isDarkUi);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.boxShadow = getShadowForMode(uiTokens.buttonSecondary.shadow, vibe.isDarkUi);
              }}
            >
              Secondary
            </button>
          ),
        },
      ],
    },
    {
      title: "Cards",
      components: [
        {
          name: "Card with Shadow",
          render: () => (
            <div
              style={{
                backgroundColor: colors.surface,
                border: getBorderStyle(uiTokens.card.border, colors),
                borderRadius: radiusMap[uiTokens.card.radius],
                padding: "1.5rem",
                boxShadow: getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi),
                minWidth: "200px",
                cursor: "pointer",
                transition: `all ${uiTokens.animations?.card.duration || 250}ms ${uiTokens.animations?.card.timingFunction || "ease-out"}`,
              }}
              onMouseEnter={(e) => {
                const scale = uiTokens.animations?.card.scale || 1.02;
                const ty = uiTokens.animations?.card.translateY || -4;
                e.currentTarget.style.transform = `scale(${scale}) translateY(${ty}px)`;
                e.currentTarget.style.boxShadow = getShadowForMode("lg", vibe.isDarkUi);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) translateY(0)";
                e.currentTarget.style.boxShadow = getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi);
              }}
            >
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontSize: sizeMap["lg"],
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                  color: colors.text,
                }}
              >
                Card Title
              </div>
              <div
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                Hover me to see the shadow and lift animation
              </div>
            </div>
          ),
        },
      ],
    },
    {
      title: "Links & Text",
      components: [
        {
          name: "Link",
          render: () => (
            <a
              href="#"
              style={{
                color: colors.primary,
                textDecoration: "none",
                fontSize: sizeMap["sm"],
                fontFamily: fontPair.body,
                cursor: "pointer",
                transition: `color ${uiTokens.animations?.link.duration || 150}ms ${uiTokens.animations?.link.timingFunction || "ease-out"}`,
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.accent;
                e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.primary;
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              Hover link
            </a>
          ),
        },
      ],
    },
    {
      title: "Badges & Pills",
      components: [
        {
          name: "Solid Badge",
          render: () => (
            <span
              style={{
                backgroundColor: colors.primary,
                color: colors.onPrimary,
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                fontSize: sizeMap["xs"],
                fontFamily: fontPair.body,
                fontWeight: 600,
                display: "inline-block",
              }}
            >
              Badge
            </span>
          ),
        },
        {
          name: "Outline Badge",
          render: () => (
            <span
              style={{
                backgroundColor: "transparent",
                color: colors.primary,
                border: `1px solid ${colors.primary}`,
                padding: "0.5rem 1rem",
                borderRadius: "9999px",
                fontSize: sizeMap["xs"],
                fontFamily: fontPair.body,
                fontWeight: 600,
                display: "inline-block",
              }}
            >
              Outline
            </span>
          ),
        },
      ],
    },
  ];

  return (
    <div className="w-full" style={rootStyle}>
      {/* Header */}
      <section
        className="px-6 py-8 border-b"
        style={{ borderColor: colors.borderSubtle }}
      >
        <div className="max-w-7xl mx-auto">
          <div
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap["2xl"],
              fontWeight: 700,
              color: colors.text,
            }}
          >
            Component Gallery
          </div>
          <p
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap["sm"],
              color: colors.textMuted,
              marginTop: "0.5rem",
            }}
          >
            All components with {vibe.label} vibe styling and animations
          </p>
        </div>
      </section>

      {/* Components Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {componentCategories.map((category) => (
            <div key={category.title}>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontSize: sizeMap["lg"],
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: "2rem",
                  paddingBottom: "1rem",
                  borderBottom: `2px solid ${colors.borderSubtle}`,
                }}
              >
                {category.title}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.components.map((comp, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: colors.surface,
                      border: getBorderStyle(uiTokens.card.border, colors),
                      borderRadius: radiusMap[uiTokens.card.radius],
                      padding: "2rem",
                      boxShadow: getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi),
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: fontPair.body,
                        fontSize: sizeMap["xs"],
                        color: colors.textMuted,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {comp.name}
                    </div>
                    {comp.render()}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Animation & Shadow Info */}
        <section
          style={{
            marginTop: "4rem",
            padding: "2rem",
            backgroundColor: colors.surface,
            borderRadius: radiusMap[uiTokens.card.radius],
            border: getBorderStyle(uiTokens.card.border, colors),
            boxShadow: getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi),
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
            Vibe Configuration
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: "0.5rem",
                }}
              >
                Button Animation
              </div>
              <div
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                Type: {uiTokens.animations?.button.type || "subtle"}
                <br />
                Duration: {uiTokens.animations?.button.duration || 200}ms
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: "0.5rem",
                }}
              >
                Card Animation
              </div>
              <div
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                Type: {uiTokens.animations?.card.type || "lift"}
                <br />
                Duration: {uiTokens.animations?.card.duration || 250}ms
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: "0.5rem",
                }}
              >
                Card Shadow
              </div>
              <div
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                Token: {uiTokens.card.shadow}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: "0.5rem",
                }}
              >
                Button Primary Shadow
              </div>
              <div
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                Token: {uiTokens.buttonPrimary.shadow}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: "0.5rem",
                }}
              >
                Button Radius
              </div>
              <div
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                Primary: {uiTokens.buttonPrimary.radius}
                <br />
                Secondary: {uiTokens.buttonSecondary.radius}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontWeight: 600,
                  color: colors.text,
                  marginBottom: "0.5rem",
                }}
              >
                Card Radius & Border
              </div>
              <div
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap["sm"],
                  color: colors.textMuted,
                }}
              >
                Radius: {uiTokens.card.radius}
                <br />
                Border: {uiTokens.card.border}
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default PreviewComponents;
