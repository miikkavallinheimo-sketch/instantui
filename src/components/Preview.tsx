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

  const rootStyle: React.CSSProperties = {
    "--primary": colors.primary,
    "--secondary": colors.secondary,
    "--accent": colors.accent,
    "--bg": colors.background,
    "--text": colors.text,
  } as React.CSSProperties;

  const primaryTextColor = ensureReadable(colors.primary, p.text);
  const secondaryTextColor = colors.primary; // ghost-nappi
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
      className="w-full h-full rounded-3xl bg-slate-950 border border-slate-800/50 overflow-hidden"
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
          {vibe.label} Theme
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span>Press Space to shuffle</span>
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors.primary }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors.secondary }}
          />
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors.accent }}
          />
        </div>
      </div>

      {/* HERO + GRID */}
      <div
        className="px-8 py-12 flex flex-col lg:flex-row gap-10"
        style={{ backgroundColor: p.background, color: p.text }}
      >
        {/* HERO TEXT */}
        <div className="flex-1 space-y-6">
          <h2
            className="text-4xl lg:text-5xl font-semibold tracking-tight"
            style={{ fontFamily: fontPair.heading }}
          >
            Design a complete style in seconds.
          </h2>
          <p className="text-sm lg:text-base max-w-xl opacity-80 leading-relaxed">
            This live preview shows how your palette and typography behave
            inside a real product hero section. No random colors, only
            curated, contrast-safe combinations.
          </p>

          {/* BUTTON ROW */}
          <div className="flex items-center gap-4 pt-2 flex-wrap">
            <button
              className="px-6 py-3 text-sm font-medium"
              style={{
                fontFamily: fontPair.heading,
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
              Primary CTA
            </button>

            <button
              className="px-6 py-3 text-sm font-medium bg-transparent"
              style={{
                fontFamily: fontPair.heading,
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

            <button
              className="text-sm underline decoration-1 underline-offset-4"
              style={{ color: p.accent, fontFamily: fontPair.body }}
            >
              Text link
            </button>
          </div>
        </div>

        {/* FEATURE CARDS */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["Layout presets", "Layered surfaces and spacing you can reuse."],
            ["Color tokens", "Systematic roles for backgrounds and accents."],
            ["Font pairings", "Readable on all devices and densities."],
            ["Export ready", "CSS, Tailwind and JSON tokens in one click."],
          ].map(([title, desc]) => (
            <div
              key={title}
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
                className="text-sm font-semibold mb-1"
                style={{ fontFamily: fontPair.heading, color: p.text }}
              >
                {title}
              </div>
              <div
                className="text-xs leading-relaxed"
                style={{ color: p.textMuted, fontFamily: fontPair.body }}
              >
                {desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Preview;
