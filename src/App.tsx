import { useEffect, useState, useCallback } from "react";
import { VIBE_PRESETS } from "./lib/vibePresets";
import { FONT_PAIRS } from "./lib/fontPairs";
import { FONT_SETTINGS } from "./lib/config";
import { generateColors } from "./lib/colorGenerator";
import { buildDesignTokens } from "./lib/designTokens";
import { generateStyleTokens } from "./lib/styleVariations";
import { ensureFontLoaded } from "./lib/fontLoader";
import type {
  VibeId,
  DesignState,
  ColorLocks,
  DesignTokens,
  GeneratedVibe,
} from "./lib/types";
import SidebarControls from "./components/SidebarControls";
import Preview from "./components/Preview";
import ExportPanel from "./components/ExportPanel";
import GeneratedVibesPanel from "./components/GeneratedVibesPanel";

const DEFAULT_VIBE: VibeId = "modern-saas";

const DEFAULT_LOCKS: ColorLocks = {
  primary: false,
  secondary: false,
  accent: false,
  background: false,
  text: false,
};

type FontLockMode = "none" | "heading" | "body";

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
  prev?: DesignState,
  freezeFonts = false
): DesignState {
  const vibe = VIBE_PRESETS[vibeId];
  const previousState =
    prev && prev.vibe.id === vibeId ? prev : undefined;

  const colors = generateColors(
    vibe,
    seed,
    previousState?.colors,
    locks
  );

  let baseFontPair = pickFontPairForVibe(
    vibeId,
    seed,
    FONT_SETTINGS.allowPremiumFonts
  );

  if (freezeFonts && previousState?.fontPair) {
    baseFontPair = previousState.fontPair;
  } else if (previousState?.fontPair) {
    const heading =
      fontLockMode === "heading"
        ? previousState.fontPair.heading
        : baseFontPair.heading;
    const body =
      fontLockMode === "body"
        ? previousState.fontPair.body
        : baseFontPair.body;
    baseFontPair = {
      ...baseFontPair,
      heading,
      body,
    };
  }

  const { uiTokens, typography } = generateStyleTokens(vibe, seed);

  return {
    vibe,
    colors,
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

  const [designState, setDesignState] = useState<DesignState>(() =>
    buildDesignState(DEFAULT_VIBE, seed, DEFAULT_LOCKS, "none")
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
      setDesignState((prev) =>
        buildDesignState(newVibeId, seed, colorLocks, fontLockMode, prev)
      );
    },
    [seed, colorLocks, fontLockMode]
  );

  const spinAll = useCallback(() => {
    const newSeed = Math.random();
    setSeed(newSeed);
    setActiveGeneratedName(null);
    setDesignState((prev) =>
      buildDesignState(vibeId, newSeed, colorLocks, fontLockMode, prev)
    );
  }, [vibeId, colorLocks, fontLockMode]);

  const spinColorsOnly = useCallback(() => {
    const newSeed = Math.random();
    setSeed(newSeed);
    setDesignState((prev) =>
      buildDesignState(vibeId, newSeed, colorLocks, fontLockMode, prev, true)
    );
  }, [vibeId, colorLocks, fontLockMode]);

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
      setDesignState((prev) => {
        const base =
          prev ||
          buildDesignState(
            vibeId,
            Math.random(),
            colorLocks,
            fontLockMode,
            prev
          );

        const newColors = { ...base.colors };

        gv.recommendedColors?.forEach((c) => {
          if (!c.hex) return;
          if (c.role === "primary") newColors.primary = c.hex;
          if (c.role === "secondary") newColors.secondary = c.hex;
          if (c.role === "accent") newColors.accent = c.hex;
          if (c.role === "background") newColors.background = c.hex;
          if (c.role === "text") newColors.text = c.hex;
        });

        let newFontPair = base.fontPair;
        if (gv.recommendedFonts && gv.recommendedFonts.length) {
          const headingFontCandidate = gv.recommendedFonts[0];
          const bodyFontCandidate =
            gv.recommendedFonts[1] ?? gv.recommendedFonts[0];

          const headingFont =
            fontLockMode === "heading" || !headingFontCandidate
              ? base.fontPair.heading
              : headingFontCandidate;
          const bodyFont =
            fontLockMode === "body" || !bodyFontCandidate
              ? base.fontPair.body
              : bodyFontCandidate;

          if (
            fontLockMode !== "heading" ||
            fontLockMode !== "body" ||
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

        return {
          ...base,
          colors: newColors,
          fontPair: newFontPair,
        };
      });
      setActiveGeneratedName(gv.name);
    },
    [vibeId, colorLocks, fontLockMode]
  );

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
          />

          <div className="border-t border-slate-800 pt-4">
            <GeneratedVibesPanel onApply={applyGeneratedVibe} />
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
