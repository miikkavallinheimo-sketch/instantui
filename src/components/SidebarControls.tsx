import { VIBE_PRESETS } from "../lib/vibePresets";
import { getAvailablePages, getAvailableMenus } from "../lib/featureFlags";
import { TexturePanel } from "./TexturePanel";
import { GradientPanel } from "./GradientPanel";
import type {
  VibeId,
  DesignState,
  ColorLocks,
  ColorKey,
  FontLockMode,
  PreviewPageId,
  MenuPresetId,
} from "../lib/types";

interface SidebarControlsProps {
  vibeId: VibeId;
  designState: DesignState;
  onChangeVibe: (id: VibeId) => void;
  onRandomizeColors: () => void;
  colorLocks: ColorLocks;
  onToggleColorLock: (key: ColorKey) => void;
  fontLockMode: FontLockMode;
  onChangeFontLock: (mode: FontLockMode) => void;
  hueShift: number;
  saturationShift: number;
  onToneChange: (type: "hue" | "saturation", value: number) => void;
  onAiRefresh: () => void;
  aiTuned: boolean;
  onCopyColor: (color: string) => void;
  autoRefresh?: boolean;
  onToggleAutoRefresh?: (enabled: boolean) => void;
  isOptimizing?: boolean;
  activePage?: PreviewPageId;
  onPageChange?: (page: PreviewPageId) => void;
  activeMenu?: MenuPresetId;
  onMenuChange?: (menu: MenuPresetId) => void;
  darkMode?: "light" | "dark";
  onDarkModeChange?: (mode: "light" | "dark") => void;
  onTextureChange?: (textureId: string) => void;
  onTextureOpacityChange?: (opacity: number) => void;
  onGradientChange?: (gradientId: string) => void;
  onGradientOpacityChange?: (opacity: number) => void;
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
  hueShift,
  saturationShift,
  onToneChange,
  onAiRefresh,
  aiTuned,
  onCopyColor,
  autoRefresh = false,
  onToggleAutoRefresh,
  isOptimizing = false,
  activePage = "dashboard",
  onPageChange,
  activeMenu = "top-nav",
  onMenuChange,
  darkMode = "light",
  onDarkModeChange,
  onTextureChange,
  onTextureOpacityChange,
  onGradientChange,
  onGradientOpacityChange,
}: SidebarControlsProps) => {
  const { colors, fontPair } = designState;

  const vibes = Object.entries(VIBE_PRESETS);
  const availablePages = getAvailablePages();
  const availableMenus = getAvailableMenus();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <button
          onClick={onAiRefresh}
          disabled={isOptimizing || aiTuned}
          className={`w-full py-3 px-4 rounded-xl border border-emerald-400 text-emerald-100 text-sm font-semibold tracking-wide transition ${
            isOptimizing || aiTuned
              ? "bg-emerald-400/5 opacity-60 cursor-not-allowed"
              : "bg-emerald-400/10 hover:bg-emerald-400/15 cursor-pointer"
          }`}
        >
          {isOptimizing ? (
            <span className="inline-flex items-center gap-2">
              <span className="inline-block animate-spin">⚙️</span>
              Optimizing...
            </span>
          ) : aiTuned ? (
            <span className="inline-flex items-center gap-2">
              <span>✓</span>
              AI tuned
            </span>
          ) : (
            "AI refresh"
          )}
        </button>
        <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-slate-900/50 border border-slate-700">
          <input
            type="checkbox"
            id="autoRefresh"
            checked={autoRefresh}
            onChange={(e) => onToggleAutoRefresh?.(e.target.checked)}
            className="w-4 h-4 rounded accent-emerald-400 cursor-pointer"
          />
          <label htmlFor="autoRefresh" className="text-xs text-slate-300 cursor-pointer flex-1">
            Auto Refresh
          </label>
          <span className="text-[10px] text-slate-500">on vibe change</span>
        </div>
      </div>

      <div>
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-2">
          Theme
        </h3>
        {VIBE_PRESETS[vibeId].isDarkUi ? (
          <div className="px-3 py-2 rounded-full border border-slate-700 text-[11px] text-slate-400 text-center bg-slate-900/30">
            Locked to Dark
          </div>
        ) : (
          <div className="inline-flex rounded-full border border-slate-700 text-[11px] overflow-hidden w-full">
            <button
              onClick={() => onDarkModeChange?.("light")}
              className={`flex-1 px-3 py-2 transition ${
                darkMode === "light"
                  ? "bg-slate-700 text-slate-50"
                  : "text-slate-300 hover:text-slate-100"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => onDarkModeChange?.("dark")}
              className={`flex-1 px-3 py-2 transition ${
                darkMode === "dark"
                  ? "bg-slate-700 text-slate-50"
                  : "text-slate-300 hover:text-slate-100"
              }`}
            >
              Dark
            </button>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-400">
            Navigation Menu
          </h2>
        </div>
        <div className="space-y-1">
          {availableMenus.map((menu) => (
            <button
              key={menu.id}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-150 ${
                menu.id === activeMenu
                  ? "bg-purple-700/60 text-purple-50 border border-purple-600"
                  : "hover:bg-slate-800/70 text-slate-200 border border-transparent"
              }`}
              onClick={() => onMenuChange?.(menu.id)}
            >
              <div className="font-medium">{menu.label}</div>
              <div className="text-[11px] text-slate-400">
                {menu.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-400 mb-2">
          Vibe
        </h2>
        <div className="space-y-1">
          {vibes.map(([id, vibe]) => (
            <button
              key={id}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-150 ${
                id === vibeId
                  ? "bg-slate-700 text-slate-50 border border-slate-600"
                  : "hover:bg-slate-800/70 text-slate-200 border border-transparent"
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
                  className="w-4 h-4 rounded-sm border border-slate-700 cursor-pointer"
                  style={{ backgroundColor: value }}
                  onClick={() => onCopyColor(value)}
                  title="Click to copy color"
                />
                <span className="text-slate-300">{label}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onCopyColor(value)}
                  className="text-[10px] px-1.5 py-0.5 rounded border border-slate-600 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  title="Copy color"
                >
                  Copy
                </button>
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

      <div className="space-y-3">
        <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
          Tone trims
        </div>
        {[
          {
            label: "Hue trim",
            value: hueShift,
            min: -15,
            max: 15,
            unit: "°",
            type: "hue",
          },
          {
            label: "Saturation trim",
            value: saturationShift,
            min: -20,
            max: 20,
            unit: "%",
            type: "saturation",
          },
        ].map((tone) => (
          <div key={tone.label} className="text-xs space-y-1">
            <div className="flex items-center justify-between text-slate-300">
              <span>{tone.label}</span>
              <span className="font-mono text-[11px] text-slate-400">
                {tone.value > 0 ? "+" : ""}
                {tone.value}
                {tone.unit}
              </span>
            </div>
            <input
              type="range"
              min={tone.min}
              max={tone.max}
              step={1}
              value={tone.value}
              onChange={(e) =>
                onToneChange(
                  tone.type as "hue" | "saturation",
                  Number(e.target.value)
                )
              }
              className="w-full accent-emerald-300"
            />
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mt-3">
          Extended tokens
        </h3>
        <div className="mt-2 grid grid-cols-1 gap-1 text-xs">
          {[
            ["On Primary", colors.onPrimary],
            ["On Secondary", colors.onSecondary],
            ["On Accent", colors.onAccent],
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
                  className="w-4 h-4 rounded-sm border border-slate-700 cursor-pointer"
                  style={{ backgroundColor: value }}
                  onClick={() => onCopyColor(value)}
                  title="Click to copy color"
                />
                <span className="text-slate-300">{label}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onCopyColor(value)}
                  className="text-[10px] px-1.5 py-0.5 rounded border border-slate-600 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  title="Copy color"
                >
                  Copy
                </button>
                <span className="font-mono text-[11px] text-slate-500">
                  {value.toUpperCase()}
                </span>
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
          <div className="inline-flex rounded-full border border-slate-700 text-[11px] overflow-hidden">
            {[
              ["none", "Free"],
              ["heading", "Lock H"],
              ["body", "Lock Body"],
              ["both", "Lock Both"],
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

      <div>
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">
          Spacing Scale
        </h3>
        <div className="bg-slate-900/30 rounded-lg border border-slate-800 p-3 space-y-2">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
            Density: <span className="text-slate-300 capitalize">{designState.uiTokens.spacing?.density || "default"}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            {(Object.entries(designState.spacing) as Array<[string, string]>).map(([token, value]) => (
              <div key={token} className="flex justify-between items-center px-2 py-1 rounded bg-slate-800/50 border border-slate-700">
                <span className="text-slate-400 font-mono">{token}</span>
                <span className="text-slate-300 text-xs">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {onTextureChange && onTextureOpacityChange && (
        <TexturePanel
          designState={designState}
          onTextureChange={onTextureChange}
          onOpacityChange={onTextureOpacityChange}
        />
      )}

      {onGradientChange && onGradientOpacityChange && (
        <GradientPanel
          designState={designState}
          onGradientChange={onGradientChange}
          onOpacityChange={onGradientOpacityChange}
        />
      )}
    </div>
  );
};

export default SidebarControls;
