import { VIBE_PRESETS } from "../lib/vibePresets";
import type {
  VibeId,
  DesignState,
  ColorLocks,
  ColorKey,
} from "../lib/types";

interface SidebarControlsProps {
  vibeId: VibeId;
  designState: DesignState;
  onChangeVibe: (id: VibeId) => void;
  onRandomizeColors: () => void;
  colorLocks: ColorLocks;
  onToggleColorLock: (key: ColorKey) => void;
  fontLockMode: "none" | "heading" | "body";
  onChangeFontLock: (mode: "none" | "heading" | "body") => void;
}

const SidebarControls = ({
  vibeId,
  designState,
  onChangeVibe,
  onRandomizeColors,
  colorLocks,
  onToggleColorLock,
  fontLockMode,
  onChangeFontLock,
}: SidebarControlsProps) => {
  const { colors, fontPair } = designState;

  const vibes = Object.entries(VIBE_PRESETS);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-400 mb-2">
          Vibe
        </h2>
        <div className="space-y-1 max-h-48 overflow-auto pr-1">
          {vibes.map(([id, vibe]) => (
            <button
              key={id}
              className={`w-full text-left px-3 py-1.5 rounded-md text-sm ${
                id === vibeId
                  ? "bg-slate-800 text-slate-50"
                  : "hover:bg-slate-800/60 text-slate-200"
              }`}
              onClick={() => onChangeVibe(id as VibeId)}
            >
              <div className="font-medium">{vibe.label}</div>
              <div className="text-[11px] text-slate-400">
                {vibe.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-400">
            Colors
          </h2>
          <button
            onClick={onRandomizeColors}
            className="text-[11px] px-2 py-1 rounded-full border border-slate-700 hover:bg-slate-800/80"
          >
            Randomize (keep locks)
          </button>
        </div>
        <div className="space-y-1">
          {(
            [
              ["Primary", "primary", colors.primary],
              ["Secondary", "secondary", colors.secondary],
              ["Accent", "accent", colors.accent],
              ["Background", "background", colors.background],
              ["Text", "text", colors.text],
            ] as [string, ColorKey, string][]
          ).map(([label, key, value]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-2 text-xs bg-slate-900/60 rounded-md px-2 py-1.5"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-sm border border-slate-700"
                  style={{ backgroundColor: value }}
                />
                <span className="text-slate-300">{label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-slate-400">
                  {value.toUpperCase()}
                </span>
                <button
                  onClick={() => onToggleColorLock(key)}
                  className={`text-[11px] px-1.5 py-0.5 rounded-full border ${
                    colorLocks[key]
                      ? "border-emerald-400 text-emerald-300 bg-emerald-400/10"
                      : "border-slate-600 text-slate-300 hover:bg-slate-800"
                  }`}
                  title={colorLocks[key] ? "Unlock color" : "Lock color"}
                >
                  {colorLocks[key] ? "🔒" : "🔓"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mt-3">
          Extended tokens
        </h3>
        <div className="mt-2 grid grid-cols-1 gap-1 text-xs">
          {[
            ["Surface", colors.surface],
            ["Surface Alt", colors.surfaceAlt],
            ["Text Muted", colors.textMuted],
            ["Border Subtle", colors.borderSubtle],
            ["Border Strong", colors.borderStrong],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between bg-slate-900/30 rounded-md px-2 py-1.5"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-sm border border-slate-700"
                  style={{ backgroundColor: value }}
                />
                <span className="text-slate-300">{label}</span>
              </div>
              <span className="font-mono text-[11px] text-slate-500">
                {value.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-400">
            Fonts
          </h2>
          <div className="inline-flex rounded-full border border-slate-700 text-[11px] overflow-hidden">
            {[
              ["none", "Free"],
              ["heading", "Lock H"],
              ["body", "Lock Body"],
            ].map(([mode, label]) => (
              <button
                key={mode}
                onClick={() => onChangeFontLock(mode as typeof fontLockMode)}
                className={`px-2 py-1 ${
                  fontLockMode === mode
                    ? "bg-slate-700 text-slate-50"
                    : "text-slate-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 rounded-md px-3 py-2 text-xs space-y-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Heading font (H1/H2)
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-100">{fontPair.heading}</span>
              <span className="text-[10px] text-slate-400">weight {designState.typography.heading.weight}</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {fontPair.source === "google"
                ? "Google Fonts"
                : fontPair.source === "system"
                ? "System font"
                : "Premium / licensed"}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Body font
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-100">{fontPair.body}</span>
              <span className="text-[10px] text-slate-400">weight {designState.typography.body.weight}</span>
            </div>
          </div>

          <div className="mt-2 border-t border-slate-800 pt-2 text-[11px] text-slate-400 space-y-2">
            <div style={{ fontFamily: fontPair.heading }}>Heading sample</div>
            <div style={{ fontFamily: fontPair.heading, fontWeight: Math.max(designState.typography.heading.weight - 200, 300) }}>
              Secondary heading tone
            </div>
            <div style={{ fontFamily: fontPair.body }}>
              Body copy preview demonstrates paragraph text for this palette.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarControls;
