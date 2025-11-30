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
  fontLocked: boolean;
  onToggleFontLock: () => void;
}

const SidebarControls = ({
  vibeId,
  designState,
  onChangeVibe,
  onRandomizeColors,
  colorLocks,
  onToggleColorLock,
  fontLocked,
  onToggleFontLock,
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
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-400">
            Fonts
          </h2>
          <button
            onClick={onToggleFontLock}
            className={`text-[11px] px-2 py-1 rounded-full border ${
              fontLocked
                ? "border-emerald-400 text-emerald-300 bg-emerald-400/10"
                : "border-slate-600 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {fontLocked ? "Font locked" : "Lock font"}
          </button>
        </div>

        <div className="bg-slate-900/60 rounded-md px-3 py-2 text-xs space-y-1">
          <div>
            <span className="text-slate-400 mr-1">Heading:</span>
            <span className="text-slate-100">{fontPair.heading}</span>
          </div>
          <div>
            <span className="text-slate-400 mr-1">Body:</span>
            <span className="text-slate-100">{fontPair.body}</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Source:{" "}
            {fontPair.source === "google"
              ? "Google Fonts"
              : fontPair.source === "system"
              ? "System font"
              : "Premium / licensed"}
          </div>
          {fontPair.notes && (
            <div className="mt-1 text-[11px] text-amber-300">{fontPair.notes}</div>
          )}

          <div className="mt-2 border-t border-slate-800 pt-2 text-[11px] text-slate-400">
            <div style={{ fontFamily: fontPair.heading }}>Heading Preview</div>
            <div style={{ fontFamily: fontPair.body }}>
              The quick brown fox jumps over the lazy dog.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarControls;
