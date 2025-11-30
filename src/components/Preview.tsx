import type { DesignState } from "../lib/types";

interface PreviewProps {
  designState: DesignState;
}

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
            {["Layout presets", "Color tokens", "Font pairings", "Export ready"].map(
              (title, idx) => (
                <div
                  key={title}
                  className="rounded-xl border shadow-sm p-3 flex flex-col gap-1"
                  style={{
                    borderColor:
                      idx === 0
                        ? colors.primary + "40"
                        : idx === 1
                        ? colors.secondary + "40"
                        : idx === 2
                        ? colors.accent + "40"
                        : "#00000010",
                    backgroundColor:
                      idx === 3 ? "#ffffff" : "rgba(255,255,255,0.9)",
                  }}
                >
                  <div
                    className="font-semibold text-sm"
                    style={{ fontFamily: fontPair.heading }}
                  >
                    {title}
                  </div>
                  <div className="text-[11px] text-black/70">
                    Generate tokens and preview them in a real UI layout before
                    you copy them into your project.
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
