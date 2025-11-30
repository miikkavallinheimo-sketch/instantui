import type { DesignState } from "../lib/types";
import { contrastRatio } from "../lib/colorUtils";

interface PreviewProps {
  designState: DesignState;
}

const getContrastColor = (bgColor: string): string => {
  const black = "#0a0a0a";
  const white = "#ffffff";
  const contrastWithBlack = contrastRatio(bgColor, black);
  const contrastWithWhite = contrastRatio(bgColor, white);
  return contrastWithBlack >= contrastWithWhite ? black : white;
};

const Preview = ({ designState }: PreviewProps) => {
  const { colors, fontPair, vibe } = designState;

  const rootStyle: React.CSSProperties = {
    "--primary": colors.primary,
    "--secondary": colors.secondary,
    "--accent": colors.accent,
    "--bg": colors.background,
    "--text": colors.text,
  } as React.CSSProperties;

  return (
    <div
      className="w-full h-full rounded-2xl border border-slate-800 overflow-hidden shadow-lg bg-slate-950"
      style={rootStyle}
    >
      <div
        className="w-full h-full flex flex-col"
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--text)",
          fontFamily: fontPair.body,
        }}
      >
        <div className="px-6 py-3 flex items-center justify-between border-b border-black/10">
          <div
            className="text-sm font-semibold tracking-wide"
            style={{ fontFamily: fontPair.heading }}
          >
            {vibe.label} Theme
          </div>
          <div className="flex gap-1 items-center text-[10px] text-slate-500">
            <span className="mr-1">Press Space to shuffle</span>
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

        <div className="flex-1 px-6 py-6 lg:px-10 lg:py-8 flex flex-col lg:flex-row gap-8">
          <div className="flex-1 flex flex-col justify-center gap-4">
            <h2
              className="text-2xl lg:text-3xl font-bold"
              style={{ fontFamily: fontPair.heading }}
            >
              Design a complete style in seconds.
            </h2>
            <p className="text-sm leading-relaxed text-black/70">
              This live preview shows how your colors and font pairing behave in
              a typical hero section with a call to action and supporting cards.
            </p>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <button
                className="text-sm px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-shadow"
                style={{
                  backgroundColor: colors.primary,
                  color: "#ffffff",
                  boxShadow: `0 4px 12px ${colors.primary}40`,
                }}
              >
                Primary CTA
              </button>
              <button
                className="text-sm px-6 py-2.5 rounded-lg border-2 font-semibold transition-all hover:bg-opacity-10"
                style={{
                  borderColor: colors.primary,
                  color: colors.primary,
                  backgroundColor: `${colors.primary}08`,
                }}
              >
                Outline
              </button>
              <button
                className="text-sm px-6 py-2.5 rounded-full font-semibold"
                style={{
                  backgroundColor: colors.secondary,
                  color: "#ffffff",
                  boxShadow: `0 2px 8px ${colors.secondary}30`,
                }}
              >
                Secondary
              </button>
              <button
                className="text-sm px-6 py-2.5 font-semibold transition-all"
                style={{
                  color: colors.accent,
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Text Link
              </button>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              { title: "Layout presets", bgOpacity: 0.15 },
              { title: "Color tokens", bgOpacity: 0.1 },
              { title: "Font pairings", bgOpacity: 0.08 },
              { title: "Export ready", bgOpacity: 0.05 },
            ].map(
              (item, idx) => {
                const colors_arr = [colors.primary, colors.secondary, colors.accent, colors.accent];
                const colorForCard = colors_arr[idx];
                const bgHex = colorForCard + Math.round(item.bgOpacity * 255).toString(16).padStart(2, '0');
                const textColor = getContrastColor(bgHex);
                
                return (
                  <div
                    key={item.title}
                    className="rounded-lg border-2 shadow-md p-4 flex flex-col gap-2 transition-transform hover:scale-105"
                    style={{
                      borderColor: colorForCard,
                      backgroundColor: bgHex,
                      borderWidth: "2px",
                      boxShadow: `0 4px 12px ${colorForCard}${Math.round(0.2 * 255).toString(16).padStart(2, '0')}`,
                    }}
                  >
                    <div
                      className="font-bold text-sm"
                      style={{
                        fontFamily: fontPair.heading,
                        color: textColor,
                      }}
                    >
                      {item.title}
                    </div>
                    <div className="text-[11px] leading-relaxed" style={{ color: textColor }}>
                      Design with harmony and precision
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
