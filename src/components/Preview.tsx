import type { DesignState } from "../lib/types";
import { contrastRatio } from "../lib/colorUtils";

interface PreviewProps {
  designState: DesignState;
}

const radiusMap = {
  none: "0px",
  sm: "6px",
  md: "10px",
  lg: "16px",
  xl: "24px",
  full: "9999px",
} as const;

const shadowMap = {
  none: "none",
  soft: "0 18px 45px rgba(15,23,42,0.12)",
  strong: "0 22px 60px rgba(15,23,42,0.35)",
} as const;

const sizeMap = {
  xs: "0.75rem",   // 12px
  sm: "0.875rem",  // 14px
  md: "1rem",      // 16px
  lg: "1.125rem",  // 18px
  xl: "1.25rem",   // 20px
  "2xl": "1.5rem", // 24px
} as const;

const ensureReadable = (bg: string, preferred: string): string => {
  const black = "#000000";
  const white = "#ffffff";

  const prefC = contrastRatio(bg, preferred);
  const blackC = contrastRatio(bg, black);
  const whiteC = contrastRatio(bg, white);
  const target = 4.5;

  if (prefC >= target) return preferred;
  if (blackC >= whiteC && blackC >= target) return black;
  if (whiteC >= blackC && whiteC >= target) return white;

  const best =
    prefC >= blackC && prefC >= whiteC
      ? preferred
      : blackC >= whiteC
      ? black
      : white;
  return best;
};

const Preview = ({ designState }: PreviewProps) => {
  const { colors, fontPair, vibe } = designState;
  const p = vibe.palette;
  const ui = vibe.ui;
  const typo = vibe.typography;

  const rootStyle: React.CSSProperties = {
    "--primary": colors.primary,
    "--secondary": colors.secondary,
    "--accent": colors.accent,
    "--bg": colors.background,
    "--text": colors.text,
  } as React.CSSProperties;

  const primaryTextColor = ensureReadable(colors.primary, p.text);
  const secondaryTextColor = colors.primary;
  const secondaryBorderColor =
    ui.buttonSecondary.border === "none" ? "transparent" : p.borderSubtle;

  const cardRadius = radiusMap[ui.card.radius];
  const cardShadow = shadowMap[ui.card.shadow];
  const cardBorderColor =
    ui.card.border === "none"
      ? "transparent"
      : ui.card.border === "subtle"
      ? p.borderSubtle
      : p.borderStrong;

  return (
    <div
      className="w-full min-h-[600px] rounded-3xl bg-slate-950 border border-slate-800/50 overflow-hidden"
      style={rootStyle}
    >
      {/* HEADER */}
      <div
        className="flex items-center justify-between px-8 py-4 border-b border-slate-800/60"
        style={{ backgroundColor: p.surfaceAlt }}
      >
        <div
          className="text-sm font-semibold tracking-tight"
          style={{ fontFamily: fontPair.heading, color: p.text }}
        >
          {vibe.label}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span>Press Space</span>
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: colors.primary }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: colors.secondary }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: colors.accent }}
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div
        className="p-8 space-y-8"
        style={{
          backgroundColor: p.background,
          color: p.text,
          backgroundImage:
            vibe.id === "gradient-bloom"
              ? `linear-gradient(135deg, ${colors.primary}15 0%, ${colors.secondary}15 50%, ${colors.accent}15 100%)`
              : undefined,
        }}
      >
        {/* HERO SECTION */}
        <div className="space-y-4">
          <h2
            style={{
              fontFamily: fontPair.heading,
              fontSize: sizeMap[typo.heading.size],
              fontWeight: typo.heading.weight,
              fontStyle: typo.heading.style,
            }}
          >
            Design System
          </h2>
          <p
            className="max-w-md opacity-80"
            style={{
              fontFamily: fontPair.body,
              fontSize: sizeMap[typo.body.size],
              fontWeight: typo.body.weight,
              fontStyle: typo.body.style,
            }}
          >
            Full color and typography system with UI tokens for consistent design
          </p>
        </div>

        {/* BUTTONS SECTION */}
        <div className="space-y-3">
          <div className="text-xs font-semibold opacity-60">Button Styles</div>
          <div className="flex gap-3 flex-wrap">
            {/* Primary button */}
            <button
              className="px-6 py-2.5"
              style={{
                fontFamily: fontPair.heading,
                fontSize: sizeMap[typo.accent.size],
                fontWeight: typo.accent.weight,
                fontStyle: typo.accent.style,
                borderRadius: radiusMap[ui.buttonPrimary.radius],
                boxShadow: shadowMap[ui.buttonPrimary.shadow],
                borderWidth: ui.buttonPrimary.border === "none" ? 0 : 1,
                borderColor:
                  ui.buttonPrimary.border === "strong"
                    ? p.borderStrong
                    : ui.buttonPrimary.border === "subtle"
                    ? p.borderSubtle
                    : "transparent",
                backgroundColor: colors.primary,
                color: primaryTextColor,
              }}
            >
              Primary
            </button>

            {/* Secondary button (outline) */}
            <button
              className="px-6 py-2.5 bg-transparent"
              style={{
                fontFamily: fontPair.heading,
                fontSize: sizeMap[typo.accent.size],
                fontWeight: typo.accent.weight,
                fontStyle: typo.accent.style,
                borderRadius: radiusMap[ui.buttonSecondary.radius],
                boxShadow: shadowMap[ui.buttonSecondary.shadow],
                borderWidth:
                  ui.buttonSecondary.border === "none" ? 0 : 1,
                borderColor: secondaryBorderColor,
                color: secondaryTextColor,
              }}
            >
              Secondary
            </button>

            {/* Accent button */}
            <button
              className="px-6 py-2.5"
              style={{
                fontFamily: fontPair.heading,
                fontSize: sizeMap[typo.accent.size],
                fontWeight: typo.accent.weight,
                fontStyle: typo.accent.style,
                borderRadius: radiusMap[ui.buttonPrimary.radius],
                boxShadow: shadowMap[ui.buttonPrimary.shadow],
                backgroundColor: colors.accent,
                color: ensureReadable(colors.accent, p.text),
                border: "none",
              }}
            >
              Accent
            </button>

            {/* Ghost button */}
            <button
              className="px-6 py-2.5"
              style={{
                fontFamily: fontPair.heading,
                fontSize: sizeMap[typo.accent.size],
                fontWeight: typo.accent.weight,
                fontStyle: typo.accent.style,
                borderRadius: radiusMap[ui.buttonPrimary.radius],
                backgroundColor: "transparent",
                color: colors.primary,
                border: `2px solid ${colors.primary}`,
              }}
            >
              Ghost
            </button>

            {/* Text link */}
            <button
              className="px-0 py-2 underline"
              style={{
                color: colors.primary,
                fontFamily: fontPair.body,
                fontSize: sizeMap[typo.accent.size],
                fontWeight: typo.accent.weight,
                fontStyle: typo.accent.style,
              }}
            >
              Link
            </button>

            {/* Gradient button (if gradient-bloom) */}
            {vibe.id === "gradient-bloom" && (
              <button
                className="px-6 py-2.5 rounded-lg"
                style={{
                  fontFamily: fontPair.heading,
                  fontSize: sizeMap[typo.accent.size],
                  fontWeight: typo.accent.weight,
                  fontStyle: typo.accent.style,
                  backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                  color: "#ffffff",
                  border: "none",
                  boxShadow: shadowMap[ui.buttonPrimary.shadow],
                }}
              >
                Gradient
              </button>
            )}
          </div>
        </div>

        {/* CARDS GRID */}
        <div className="space-y-3">
          <div className="text-xs font-semibold opacity-60">Card Styles</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Basic card */}
            <div
              className="p-4"
              style={{
                backgroundColor: p.surface,
                borderRadius: cardRadius,
                boxShadow: cardShadow,
                borderWidth: ui.card.border === "none" ? 0 : 1,
                borderColor: cardBorderColor,
              }}
            >
              <div
                className="mb-1"
                style={{
                  fontFamily: fontPair.heading,
                  fontSize: sizeMap[typo.accent.size],
                  fontWeight: typo.accent.weight,
                  fontStyle: typo.accent.style,
                  color: colors.primary,
                }}
              >
                Feature
              </div>
              <div
                className="leading-relaxed"
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap[typo.body.size],
                  fontWeight: typo.body.weight,
                  fontStyle: typo.body.style,
                  color: p.textMuted,
                }}
              >
                Primary colored border accent
              </div>
            </div>

            {/* Secondary accent card */}
            <div
              className="p-4"
              style={{
                backgroundColor: p.surface,
                borderRadius: cardRadius,
                boxShadow: cardShadow,
                borderWidth: ui.card.border === "none" ? 0 : 1,
                borderColor: colors.secondary,
              }}
            >
              <div
                className="mb-1"
                style={{
                  fontFamily: fontPair.heading,
                  fontSize: sizeMap[typo.accent.size],
                  fontWeight: typo.accent.weight,
                  fontStyle: typo.accent.style,
                  color: colors.secondary,
                }}
              >
                Secondary
              </div>
              <div
                className="leading-relaxed"
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap[typo.body.size],
                  fontWeight: typo.body.weight,
                  fontStyle: typo.body.style,
                  color: p.textMuted,
                }}
              >
                Secondary color accent
              </div>
            </div>

            {/* Accent card */}
            <div
              className="p-4"
              style={{
                backgroundColor: p.surface,
                borderRadius: cardRadius,
                boxShadow: cardShadow,
                borderWidth: ui.card.border === "none" ? 0 : 1,
                borderColor: colors.accent,
              }}
            >
              <div
                className="mb-1"
                style={{
                  fontFamily: fontPair.heading,
                  fontSize: sizeMap[typo.accent.size],
                  fontWeight: typo.accent.weight,
                  fontStyle: typo.accent.style,
                  color: colors.accent,
                }}
              >
                Accent
              </div>
              <div
                className="leading-relaxed"
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap[typo.body.size],
                  fontWeight: typo.body.weight,
                  fontStyle: typo.body.style,
                  color: p.textMuted,
                }}
              >
                Highlight important content
              </div>
            </div>

            {/* Stat card */}
            <div
              className="p-4"
              style={{
                backgroundColor: p.surface,
                borderRadius: cardRadius,
                boxShadow: cardShadow,
                borderWidth: ui.card.border === "none" ? 0 : 1,
                borderColor: cardBorderColor,
              }}
            >
              <div
                style={{
                  fontFamily: fontPair.heading,
                  fontSize: sizeMap[typo.heading.size],
                  fontWeight: typo.heading.weight,
                  fontStyle: typo.heading.style,
                  color: colors.primary,
                }}
              >
                42
              </div>
              <div
                className="mt-1"
                style={{
                  fontFamily: fontPair.body,
                  fontSize: sizeMap[typo.body.size],
                  fontWeight: typo.body.weight,
                  fontStyle: typo.body.style,
                  color: p.textMuted,
                }}
              >
                Stat label
              </div>
            </div>
          </div>
        </div>

        {/* COLOR SWATCHES */}
        <div className="space-y-3">
          <div className="text-xs font-semibold opacity-60">Color Palette</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: "Primary", color: colors.primary },
              { name: "Secondary", color: colors.secondary },
              { name: "Accent", color: colors.accent },
              { name: "Background", color: colors.background },
              { name: "Surface", color: p.surface },
              { name: "Text", color: colors.text },
            ].map((swatch) => (
              <div key={swatch.name} className="space-y-1">
                <div
                  className="w-full h-12 rounded border"
                  style={{
                    backgroundColor: swatch.color,
                    borderColor: p.borderSubtle,
                  }}
                />
                <div className="text-[10px] text-center opacity-60">
                  {swatch.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TYPOGRAPHY */}
        <div className="space-y-3">
          <div className="text-xs font-semibold opacity-60">Typography</div>
          <div className="space-y-2">
            <div
              style={{
                fontFamily: fontPair.heading,
                fontSize: sizeMap[typo.heading.size],
                fontWeight: typo.heading.weight,
                fontStyle: typo.heading.style,
              }}
            >
              Heading ({sizeMap[typo.heading.size]}, {typo.heading.weight} weight)
            </div>
            <div
              style={{
                fontFamily: fontPair.body,
                fontSize: sizeMap[typo.body.size],
                fontWeight: typo.body.weight,
                fontStyle: typo.body.style,
              }}
            >
              Body text ({sizeMap[typo.body.size]}) - Main content runs here with comfortable line-height
            </div>
            <div
              style={{
                fontFamily: fontPair.body,
                fontSize: sizeMap[typo.accent.size],
                fontWeight: typo.accent.weight,
                fontStyle: typo.accent.style,
                opacity: 0.7,
              }}
            >
              Small / Muted ({sizeMap[typo.accent.size]}, {typo.accent.weight} weight)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
