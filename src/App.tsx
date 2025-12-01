import { useEffect, useState, useCallback } from "react";
import { VIBE_PRESETS } from "./lib/vibePresets";
import { FONT_PAIRS } from "./lib/fontPairs";
import { FONT_SETTINGS } from "./lib/config";
import {
  generateColors,
  enforceLuxuryDiscipline,
  enforceDarkDiscipline,
} from "./lib/colorGenerator";
import { buildDesignTokens } from "./lib/designTokens";
import { generateStyleTokens } from "./lib/styleVariations";
import { ensureFontLoaded } from "./lib/fontLoader";
import type {
  VibeId,
  VibePreset,
  DesignState,
  ColorLocks,
  DesignTokens,
  GeneratedVibe,
  FontLockMode,
  GeneratedVibesResponse,
} from "./lib/types";
import { hexToHsl, hslToHex, contrastRatio } from "./lib/colorUtils";
import aiVibesData from "./data/generatedVibes.json";
import SidebarControls from "./components/SidebarControls";
import Preview from "./components/Preview";
import ExportPanel from "./components/ExportPanel";
import GeneratedVibesPanel from "./components/GeneratedVibesPanel";

const DEFAULT_VIBE: VibeId = "modern-saas";
const AI_DATA = aiVibesData as GeneratedVibesResponse;
const AI_VIBES = AI_DATA.vibes ?? [];

const DEFAULT_LOCKS: ColorLocks = {
  primary: false,
  secondary: false,
  accent: false,
  background: false,
  text: false,
};

const COLOR_FIELDS = [
  "primary",
  "secondary",
  "accent",
  "background",
  "surface",
  "surfaceAlt",
  "text",
  "textMuted",
  "borderSubtle",
  "borderStrong",
  "onPrimary",
  "onSecondary",
  "onAccent",
] as const;

const clampValue = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const applyColorAdjustments = (
  colors: DesignState["colors"],
  hueShift: number,
  saturationShift: number
) => {
  const updated: Partial<DesignState["colors"]> = {};
  for (const key of COLOR_FIELDS) {
    const { h, s, l } = hexToHsl(colors[key]);
    const newHue = (h + hueShift + 360) % 360;
    const newSat = clampValue(s + saturationShift, 0, 100);
    updated[key] = hslToHex(newHue, newSat, l);
  }
  return { ...colors, ...(updated as DesignState["colors"]) };
};

const shiftLightness = (hex: string, delta: number) => {
  const { h, s, l } = hexToHsl(hex);
  return hslToHex(h, s, clampValue(l + delta, 0, 100));
};

const applySurfaceShade = (colors: DesignState["colors"], shade: number) => {
  if (!shade) return colors;
  return {
    ...colors,
    background: shiftLightness(colors.background, shade),
    surface: shiftLightness(colors.surface, shade),
    surfaceAlt: shiftLightness(colors.surfaceAlt, shade * 0.9),
    borderSubtle: shiftLightness(colors.borderSubtle, shade * 0.6),
  };
};

const computeAiTuning = (colors: DesignState["colors"], vibe: DesignState["vibe"]) => {
  const primary = hexToHsl(colors.primary);
  const targetSat = vibe.isDarkUi ? 68 : 58;
  const saturationShift = clampValue(targetSat - primary.s, -15, 15);
  const hueShift = clampValue(Math.round((Math.random() - 0.5) * 12), -8, 8);
  const baseShade = vibe.isDarkUi ? -2 : 3;
  let surfaceShade = baseShade;
  if (contrastRatio(colors.primary, colors.background) < 4.5) {
    surfaceShade -= 4;
  }

  const tunedColors: DesignState["colors"] = { ...colors };
  const accentHsl = hexToHsl(colors.accent);
  tunedColors.accent = hslToHex(
    (accentHsl.h + hueShift + 360) % 360,
    clampValue(accentHsl.s + (vibe.isDarkUi ? 10 : -5), 30, 100),
    clampValue(accentHsl.l + (vibe.isDarkUi ? 8 : -6), 5, 90)
  );

  const secondaryHsl = hexToHsl(colors.secondary);
  tunedColors.secondary = hslToHex(
    secondaryHsl.h,
    clampValue(secondaryHsl.s + (vibe.isDarkUi ? -5 : -10), 15, 90),
    clampValue(secondaryHsl.l + (vibe.isDarkUi ? 4 : -3), 5, 90)
  );

  tunedColors.background = shiftLightness(colors.background, surfaceShade);
  tunedColors.surface = shiftLightness(colors.surface, surfaceShade);
  tunedColors.surfaceAlt = shiftLightness(colors.surfaceAlt, surfaceShade * 0.9);

  return {
    baseColors: tunedColors,
    hueShift,
    saturationShift,
  };
};

const applyVibeColorRules = (
  vibe: VibePreset,
  colors: DesignState["colors"]
) => {
  if (vibe.id === "luxury") return enforceLuxuryDiscipline(colors);
  if (vibe.id === "dark") return enforceDarkDiscipline(colors);
  return colors;
};

function pickFontPairForVibe(
  vibeId: VibeId,
  seed: number,
  allowPremium: boolean
) {
  const availableFonts = FONT_PAIRS.filter((p) =>
    allowPremium ? true : p.source !== "premium"
  );
  const candidates = availableFonts.filter((p) => p.vibes.includes(vibeId));
  const pool = candidates.length > 0 ? candidates : availableFonts;
  const index = Math.floor((seed * 1000) % pool.length);
  return pool[index];
}

function buildDesignState(
  vibeId: VibeId,
  seed: number,
  locks: ColorLocks,
  fontLockMode: FontLockMode,
  hueShift: number,
  saturationShift: number,
  prev?: DesignState,
  freezeFonts = false
): DesignState {
  const vibe = VIBE_PRESETS[vibeId];
  const previousState =
    prev && prev.vibe.id === vibeId ? prev : undefined;

  const baseColors = generateColors(
    vibe,
    seed,
    previousState?.colors,
    locks
  );
  const disciplinedBase = applyVibeColorRules(vibe, baseColors);

  let baseFontPair = pickFontPairForVibe(
    vibeId,
    seed,
    FONT_SETTINGS.allowPremiumFonts
  );

  if (freezeFonts && previousState?.fontPair) {
    baseFontPair = previousState.fontPair;
  } else if (previousState?.fontPair) {
    const heading =
      fontLockMode === "heading" || fontLockMode === "both"
        ? previousState.fontPair.heading
        : baseFontPair.heading;
    const body =
      fontLockMode === "body" || fontLockMode === "both"
        ? previousState.fontPair.body
        : baseFontPair.body;
    baseFontPair = {
      ...baseFontPair,
      heading,
      body,
    };
  }

  const adjustedColors = applyVibeColorRules(
    vibe,
    applyColorAdjustments(
      disciplinedBase,
      hueShift,
      saturationShift
    )
  );

  const { uiTokens, typography } = generateStyleTokens(vibe, seed);

  return {
    vibe,
    colors: adjustedColors,
    originalColors: disciplinedBase,
    fontPair: baseFontPair,
    uiTokens,
    typography,
  };
}

function App() {
  const [vibeId, setVibeId] = useState<VibeId>(DEFAULT_VIBE);
  const [seed, setSeed] = useState<number>(() => Math.random());
  const [colorLocks, setColorLocks] = useState<ColorLocks>(DEFAULT_LOCKS);
  const [fontLockMode, setFontLockMode] = useState<FontLockMode>("none");
  const [hueShift, setHueShift] = useState(0);
  const [saturationShift, setSaturationShift] = useState(0);
  const [aiTuned, setAiTuned] = useState(false);

  const [designState, setDesignState] = useState<DesignState>(() =>
    buildDesignState(DEFAULT_VIBE, seed, DEFAULT_LOCKS, "none", 0, 0)
  );

  const [tokens, setTokens] = useState<DesignTokens>(() =>
    buildDesignTokens(designState)
  );

  const [activeGeneratedName, setActiveGeneratedName] = useState<string | null>(
    null
  );

  useEffect(() => {
    setTokens(buildDesignTokens(designState));
  }, [designState]);

  useEffect(() => {
    ensureFontLoaded(designState.fontPair.heading, designState.fontPair.source);
    ensureFontLoaded(designState.fontPair.body, designState.fontPair.source);
  }, [
    designState.fontPair.heading,
    designState.fontPair.body,
    designState.fontPair.source,
  ]);

  const applyVibe = useCallback(
    (newVibeId: VibeId) => {
      setVibeId(newVibeId);
      setActiveGeneratedName(null);
      setAiTuned(false);
      setDesignState((prev) =>
        buildDesignState(
          newVibeId,
          seed,
          colorLocks,
          fontLockMode,
          hueShift,
          saturationShift,
          prev
        )
      );
    },
    [seed, colorLocks, fontLockMode, hueShift, saturationShift]
  );

  const spinAll = useCallback(() => {
    const newSeed = Math.random();
    setSeed(newSeed);
    setActiveGeneratedName(null);
    setHueShift(0);
    setSaturationShift(0);
    setAiTuned(false);
    setDesignState((prev) =>
      buildDesignState(
        vibeId,
        newSeed,
        colorLocks,
        fontLockMode,
        0,
        0,
        prev
      )
    );
  }, [vibeId, colorLocks, fontLockMode]);

  const spinColorsOnly = useCallback(() => {
    const newSeed = Math.random();
    setSeed(newSeed);
    setAiTuned(false);
    setDesignState((prev) =>
      buildDesignState(
        vibeId,
        newSeed,
        colorLocks,
        fontLockMode,
        hueShift,
        saturationShift,
        prev,
        true
      )
    );
  }, [vibeId, colorLocks, fontLockMode, hueShift, saturationShift]);

  const toggleColorLock = useCallback((key: keyof ColorLocks) => {
    setColorLocks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const setLockMode = useCallback((mode: FontLockMode) => {
    setFontLockMode(mode);
  }, []);

  const applyGeneratedVibe = useCallback(
    (gv: GeneratedVibe) => {
      setAiTuned(false);
      setDesignState((prev) => {
        const base =
          prev ||
          buildDesignState(
            vibeId,
            Math.random(),
            colorLocks,
            fontLockMode,
            hueShift,
            saturationShift,
            prev
          );

        let newBaseColors = applyVibeColorRules(base.vibe, {
          ...base.originalColors,
        });

        gv.recommendedColors?.forEach((c) => {
          if (!c.hex) return;
          if (c.role === "primary") newBaseColors.primary = c.hex;
          if (c.role === "secondary") newBaseColors.secondary = c.hex;
          if (c.role === "accent") newBaseColors.accent = c.hex;
          if (c.role === "background") newBaseColors.background = c.hex;
          if (c.role === "text") newBaseColors.text = c.hex;
        });

        let newFontPair = base.fontPair;
        if (gv.recommendedFonts && gv.recommendedFonts.length) {
          const headingFontCandidate = gv.recommendedFonts[0];
          const bodyFontCandidate =
            gv.recommendedFonts[1] ?? gv.recommendedFonts[0];

          const headingLocked =
            fontLockMode === "heading" || fontLockMode === "both";
          const bodyLocked =
            fontLockMode === "body" || fontLockMode === "both";

          const headingFont =
            headingLocked || !headingFontCandidate
              ? base.fontPair.heading
              : headingFontCandidate;
          const bodyFont =
            bodyLocked || !bodyFontCandidate
              ? base.fontPair.body
              : bodyFontCandidate;

          if (
            headingFont !== base.fontPair.heading ||
            bodyFont !== base.fontPair.body
          ) {
            newFontPair = {
              ...base.fontPair,
              heading: headingFont,
              body: bodyFont,
              source: "premium",
              notes: "From AI-generated vibe suggestion.",
              vibes: [],
            };
          }
        }

        const nextHueShift = clampValue(
          gv.overrides?.hueShift ?? hueShift,
          -15,
          15
        );
        const nextSaturationShift = clampValue(
          gv.overrides?.saturationShift ?? saturationShift,
          -20,
          20
        );
        setHueShift(nextHueShift);
        setSaturationShift(nextSaturationShift);

        const surfaceShade = clampValue(
          gv.overrides?.surfaceShade ?? 0,
          -10,
          10
        );
        if (surfaceShade) {
          newBaseColors = applySurfaceShade(newBaseColors, surfaceShade);
        }
        newBaseColors = applyVibeColorRules(base.vibe, newBaseColors);

        const adjusted = applyVibeColorRules(
          base.vibe,
          applyColorAdjustments(
            newBaseColors,
            nextHueShift,
            nextSaturationShift
          )
        );

        return {
          ...base,
          colors: adjusted,
          originalColors: newBaseColors,
          fontPair: newFontPair,
        };
      });
      setActiveGeneratedName(gv.name);
    },
    [vibeId, colorLocks, fontLockMode, hueShift, saturationShift]
  );

  const updateToneShift = useCallback(
    (type: "hue" | "saturation", value: number) => {
      const clampedValue =
        type === "hue"
          ? clampValue(value, -15, 15)
          : clampValue(value, -20, 20);
      const nextHue = type === "hue" ? clampedValue : hueShift;
      const nextSat = type === "saturation" ? clampedValue : saturationShift;
      if (type === "hue") {
        setHueShift(nextHue);
      } else {
        setSaturationShift(nextSat);
      }
      setAiTuned(false);
      setDesignState((prev) => {
        if (!prev) return prev;
        const adjusted = applyColorAdjustments(
          prev.originalColors,
          nextHue,
          nextSat
        );
        return {
          ...prev,
          colors: applyVibeColorRules(prev.vibe, adjusted),
        };
      });
    },
    [hueShift, saturationShift]
  );

  const handleAiSuggestion = useCallback(() => {
    setDesignState((prev) => {
      if (!prev) return prev;
      const tuning = computeAiTuning(prev.colors, prev.vibe);
      setHueShift(tuning.hueShift);
      setSaturationShift(tuning.saturationShift);
      setAiTuned(true);
      const disciplinedBase = applyVibeColorRules(prev.vibe, tuning.baseColors);
      const adjusted = applyColorAdjustments(
        disciplinedBase,
        tuning.hueShift,
        tuning.saturationShift
      );
      return {
        ...prev,
        colors: applyVibeColorRules(prev.vibe, adjusted),
        originalColors: disciplinedBase,
      };
    });
    setActiveGeneratedName(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        const target = e.target as HTMLElement | null;
        const tag = target?.tagName;
        if (
          tag === "INPUT" ||
          tag === "TEXTAREA" ||
          target?.isContentEditable
        ) {
          return;
        }
        e.preventDefault();
        spinAll();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [spinAll]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 flex flex-col">
      <header className="border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Tool
          </span>
          <h1 className="text-lg font-semibold">
            InstantUI – Design Style Generator
          </h1>
        </div>
        <button
          onClick={spinAll}
          className="text-sm px-3 py-1.5 rounded-full border border-slate-600 hover:bg-slate-800"
        >
          Randomize all (Space)
        </button>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row">
        <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-slate-800 p-4 space-y-6">
          <SidebarControls
            vibeId={vibeId}
            onChangeVibe={applyVibe}
            designState={designState}
            onRandomizeColors={spinColorsOnly}
            colorLocks={colorLocks}
            onToggleColorLock={toggleColorLock}
            fontLockMode={fontLockMode}
            onChangeFontLock={setLockMode}
            hueShift={hueShift}
            saturationShift={saturationShift}
            onToneChange={updateToneShift}
            onAiRefresh={handleAiSuggestion}
            aiTuned={aiTuned}
          />

          <div className="border-t border-slate-800 pt-4">
            <GeneratedVibesPanel
              onApply={applyGeneratedVibe}
              generatedAt={AI_DATA.generatedAt}
              vibes={AI_VIBES}
              currentVibeId={vibeId}
            />
            {activeGeneratedName && (
              <p className="mt-2 text-[11px] text-slate-500">
                Active AI vibe: {activeGeneratedName}
              </p>
            )}
          </div>
        </aside>

        <section className="flex-1 flex flex-col">
          <div className="flex-1 p-4 lg:p-6">
            <Preview designState={designState} />
          </div>

          <div className="border-t border-slate-800 p-4 lg:p-6 bg-slate-950/60">
            <ExportPanel tokens={tokens} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
