import { VIBE_PRESETS } from "../lib/vibePresets";
import { getAvailableMenus } from "../lib/featureFlags";
import { TexturePanel } from "./TexturePanel";
import { GradientPanel } from "./GradientPanel";
import { CollapsibleSection } from "./CollapsibleSection";
import type {
  VibeId,
  DesignState,
  ColorLocks,
  ColorKey,
  FontLockMode,
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
  activePage?: string;
  onPageChange?: (page: string) => void;
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
  const availableMenus = getAvailableMenus();

  return (
    <div className="space-y-0">
      {/* AI Refresh Section */}
      <div className="space-y-2 py-3 px-0 border-b border-slate-700">
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

      {/* Theme & Vibe Section */}
      <CollapsibleSection title="Theme & Vibe" defaultOpen={true}>
        <div className="space-y-4 px-0">
          {/* Theme Selector */}
          <div>
            <p className="text-xs text-slate-400 mb-2 uppercase tracking-[0.1em]">Theme</p>
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

          {/* Vibe Selection */}
          <div>
            <p className="text-xs text-slate-400 mb-2 uppercase tracking-[0.1em]">Vibe</p>
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
                  <div className="font-medium text-xs">{vibe.label}</div>
                  <div className="text-[10px] text-slate-400">
                    {vibe.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Navigation Menu */}
      <CollapsibleSection title="Navigation Menu">
        <div className="space-y-1 px-0">
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
              <div className="font-medium text-xs">{menu.label}</div>
              <div className="text-[10px] text-slate-400">
                {menu.description}
              </div>
            </button>
          ))}
        </div>
      </CollapsibleSection>

      {/* Colors */}
      <CollapsibleSection title="Colors">
        <div className="space-y-3 px-0">
          <button
            onClick={onRandomizeColors}
            className="w-full text-[11px] px-3 py-2 rounded-full border border-slate-700 hover:bg-slate-800/80 text-slate-300 transition"
          >
            Randomize (keep locks)
          </button>
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
                  >
                    Copy
                  </button>
                  <span className="font-mono text-[10px] text-slate-400">
                    {value.toUpperCase()}
                  </span>
                  <button
                    onClick={() => onToggleColorLock(key)}
                    className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
                      colorLocks[key]
                        ? "border-emerald-400 text-emerald-300 bg-emerald-400/10"
                        : "border-slate-600 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {colorLocks[key] ? "🔒" : "🔓"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* Tone Trims */}
      <CollapsibleSection title="Tone Trims">
        <div className="space-y-3 px-0">
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
                <span className="text-xs">{tone.label}</span>
                <span className="font-mono text-[10px] text-slate-400">
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
      </CollapsibleSection>

      {/* Extended Tokens */}
      <CollapsibleSection title="Extended Tokens">
        <div className="grid grid-cols-1 gap-1 text-xs px-0">
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
                <span className="text-slate-300 text-xs">{label}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onCopyColor(value)}
                  className="text-[10px] px-1.5 py-0.5 rounded border border-slate-600 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                >
                  Copy
                </button>
                <span className="font-mono text-[10px] text-slate-500">
                  {value.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* Fonts */}
      <CollapsibleSection title="Fonts">
        <div className="space-y-3 px-0">
          <div className="flex gap-1 rounded-full border border-slate-700 text-[10px] overflow-hidden">
            {[
              ["none", "Free"],
              ["heading", "Lock H"],
              ["body", "Lock B"],
              ["both", "Lock Both"],
            ].map(([mode, label]) => (
              <button
                key={mode}
                onClick={() => onChangeFontLock(mode as typeof fontLockMode)}
                className={`flex-1 px-2 py-1.5 transition text-[10px] ${
                  fontLockMode === mode
                    ? "bg-slate-700 text-slate-50"
                    : "text-slate-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="bg-slate-900/60 rounded-md px-3 py-2 text-xs space-y-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.1em] text-slate-500">
                Heading font
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-slate-100 text-xs font-medium">{fontPair.heading}</span>
                <span className="text-[10px] text-slate-400">weight {designState.typography.heading.weight}</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                {fontPair.source === "google"
                  ? "Google Fonts"
                  : fontPair.source === "system"
                  ? "System font"
                  : "Premium"}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.1em] text-slate-500">
                Body font
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-slate-100 text-xs font-medium">{fontPair.body}</span>
                <span className="text-[10px] text-slate-400">weight {designState.typography.body.weight}</span>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-2 space-y-2 text-[11px] text-slate-400">
              <div style={{ fontFamily: fontPair.heading }} className="text-xs">Heading sample</div>
              <div style={{ fontFamily: fontPair.heading, fontWeight: Math.max(designState.typography.heading.weight - 200, 300) }} className="text-xs">
                Secondary heading
              </div>
              <div style={{ fontFamily: fontPair.body }} className="text-xs">
                Body copy preview demonstrates paragraph text.
              </div>
            </div>
          </div>
        </div>
      </CollapsibleSection>

      {/* Spacing Scale */}
      <CollapsibleSection title="Spacing Scale">
        <div className="bg-slate-900/30 rounded-lg border border-slate-800 p-3 space-y-2 px-0">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
            Density: <span className="text-slate-300 capitalize">{designState.uiTokens.spacing?.density || "default"}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            {(Object.entries(designState.spacing) as Array<[string, string]>).map(([token, value]) => (
              <div key={token} className="flex justify-between items-center px-2 py-1 rounded bg-slate-800/50 border border-slate-700">
                <span className="text-slate-400 font-mono text-[9px]">{token}</span>
                <span className="text-slate-300 text-[9px]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* Texture Panel */}
      {onTextureChange && onTextureOpacityChange && (
        <CollapsibleSection title="Texture">
          <div className="px-0">
            <TexturePanel
              designState={designState}
              onTextureChange={onTextureChange}
              onOpacityChange={onTextureOpacityChange}
            />
          </div>
        </CollapsibleSection>
      )}

      {/* Gradient Panel */}
      {onGradientChange && onGradientOpacityChange && (
        <CollapsibleSection title="Gradient">
          <div className="px-0">
            <GradientPanel
              designState={designState}
              onGradientChange={onGradientChange}
              onOpacityChange={onGradientOpacityChange}
            />
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
};

export default SidebarControls;
