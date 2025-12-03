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
import { optimizeTypography } from "./lib/typographyOptimizer";
import { getOptimizedTypographyColors } from "./lib/typographyColorOptimizer";
import trendsData from "./data/trends.json";
import type {
  VibeId,
  VibePreset,
  DesignState,
  ColorLocks,
  DesignTokens,
  GeneratedVibe,
  FontLockMode,
  GeneratedVibesResponse,
  SavedFavorite,
} from "./lib/types";
import { hexToHsl, hslToHex, contrastRatio, hexToLuminance } from "./lib/colorUtils";
import aiVibesData from "./data/generatedVibes.json";
import SidebarControls from "./components/SidebarControls";
import Preview from "./components/Preview";
import ExportPanel from "./components/ExportPanel";
import GeneratedVibesPanel from "./components/GeneratedVibesPanel";
import FavoritesPanel from "./components/FavoritesPanel";
import { useToast } from "./components/Toast";
import { useHistory } from "./hooks/useHistory";
import { usePreviewState } from "./hooks/usePreviewState";
import { saveFavorite } from "./lib/favoritesManager";

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

/**
 * Calculate hue distance between two hues (0-180 degrees)
 */
const hueDistance = (a: number, b: number): number => {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
};

/**
 * Validate color harmony and return issues if any
 */
interface HarmonyIssues {
  primary_secondary_similar: boolean;
  accent_too_close: boolean;
  background_contrast_low: boolean;
  saturation_uneven: boolean;
}

const validateColorHarmony = (colors: DesignState["colors"], vibe: DesignState["vibe"]): HarmonyIssues => {
  const primary = hexToHsl(colors.primary);
  const secondary = hexToHsl(colors.secondary);
  const accent = hexToHsl(colors.accent);

  // Get vibe-specific settings
  const isLuxury = vibe.id === "luxury";
  const maxSecondaryDelta = isLuxury ? 18 : 38;
  const minAccentDelta = isLuxury ? 65 : 70;
  const minSatPrimary = 40;
  const minSatSecondary = 35;
  const minSatAccent = 50;

  // Issue 1: Primary and secondary too similar in hue
  const primarySecondaryDistance = hueDistance(primary.h, secondary.h);
  const primary_secondary_similar = primarySecondaryDistance < maxSecondaryDelta;

  // Issue 2: Accent too close to primary/secondary midpoint
  const midpointHue = (primary.h + secondary.h) / 2;
  const accentDistance = hueDistance(accent.h, midpointHue);
  const accent_too_close = accentDistance < minAccentDelta;

  // Issue 3: Background contrast with primary is too low
  const background_contrast_low = contrastRatio(colors.primary, colors.background) < 4.5;

  // Issue 4: Saturation is uneven
  const saturation_uneven =
    primary.s < minSatPrimary ||
    secondary.s < minSatSecondary ||
    accent.s < minSatAccent;

  return {
    primary_secondary_similar,
    accent_too_close,
    background_contrast_low,
    saturation_uneven,
  };
};

/**
 * Fix color harmony issues
 */
const fixColorHarmony = (colors: DesignState["colors"], vibe: DesignState["vibe"]): DesignState["colors"] => {
  const issues = validateColorHarmony(colors, vibe);
  let fixed = { ...colors };
  const isLuxury = vibe.id === "luxury";
  const maxSecondaryDelta = isLuxury ? 18 : 38;
  const minAccentDelta = isLuxury ? 65 : 70;

  // Fix Issue 1: Separate primary and secondary if too similar
  if (issues.primary_secondary_similar) {
    const primaryHsl = hexToHsl(fixed.primary);
    const secondaryHsl = hexToHsl(fixed.secondary);
    const distance = hueDistance(primaryHsl.h, secondaryHsl.h);

    if (distance < maxSecondaryDelta) {
      // Move secondary away from primary
      const direction = distance > 180 ? -1 : 1;
      const newSecondaryHue = (secondaryHsl.h + direction * (maxSecondaryDelta - distance) + 360) % 360;
      fixed.secondary = hslToHex(newSecondaryHue, secondaryHsl.s, secondaryHsl.l);
    }
  }

  // Fix Issue 2: Separate accent if too close to primary/secondary
  if (issues.accent_too_close) {
    const primaryHsl = hexToHsl(fixed.primary);
    const secondaryHsl = hexToHsl(fixed.secondary);
    const accentHsl = hexToHsl(fixed.accent);
    const midpoint = (primaryHsl.h + secondaryHsl.h) / 2;
    const distance = hueDistance(accentHsl.h, midpoint);

    if (distance < minAccentDelta) {
      // Move accent away from midpoint
      const direction = accentHsl.h > midpoint ? 1 : -1;
      const newAccentHue = (accentHsl.h + direction * (minAccentDelta - distance) + 360) % 360;
      fixed.accent = hslToHex(newAccentHue, accentHsl.s, accentHsl.l);
    }
  }

  // Fix Issue 3: Improve background contrast if needed
  if (issues.background_contrast_low) {
    const bgHsl = hexToHsl(fixed.background);
    const primaryLum = hexToLuminance(fixed.primary);
    const shouldDarken = primaryLum > 0.5;

    let newL = bgHsl.l;
    for (let i = 0; i < 5; i++) {
      newL += shouldDarken ? -6 : 6;
      newL = clampValue(newL, 5, 95);
      const testBg = hslToHex(bgHsl.h, bgHsl.s, newL);
      if (contrastRatio(fixed.primary, testBg) >= 4.5) {
        fixed.background = testBg;
        break;
      }
    }
  }

  // Fix Issue 4: Ensure saturation minimums
  if (issues.saturation_uneven) {
    const primaryHsl = hexToHsl(fixed.primary);
    const secondaryHsl = hexToHsl(fixed.secondary);
    const accentHsl = hexToHsl(fixed.accent);

    if (primaryHsl.s < 40) {
      fixed.primary = hslToHex(primaryHsl.h, 40, primaryHsl.l);
    }
    if (secondaryHsl.s < 35) {
      fixed.secondary = hslToHex(secondaryHsl.h, 35, secondaryHsl.l);
    }
    if (accentHsl.s < 50) {
      fixed.accent = hslToHex(accentHsl.h, 50, accentHsl.l);
    }
  }

  return fixed;
};

const computeAiTuning = (colors: DesignState["colors"], vibe: DesignState["vibe"]) => {
  // First, validate and fix any harmony issues
  const harmonyFixed = fixColorHarmony(colors, vibe);

  const primary = hexToHsl(harmonyFixed.primary);

  // Vibe-specific target saturation to respect COLOR_BEHAVIORS constraints
  const vibeTargetSat: Record<string, number> = {
    minimal: 28,
    pastel: 28,
    dark: 8,
    brutalist: 8,
    "retro-pixel": 72,
    "warm-editorial": 38,
    "magazine-brutalism": 8,
  };
  const targetSat = vibeTargetSat[vibe.id] ?? (vibe.isDarkUi ? 68 : 58);
  const saturationShift = clampValue(targetSat - primary.s, -15, 15);
  const hueShift = clampValue(Math.round((Math.random() - 0.5) * 12), -8, 8);
  const baseShade = vibe.isDarkUi ? -2 : 3;
  let surfaceShade = baseShade;
  if (contrastRatio(harmonyFixed.primary, harmonyFixed.background) < 4.5) {
    surfaceShade -= 4;
  }

  const tunedColors: DesignState["colors"] = { ...harmonyFixed };
  const accentHsl = hexToHsl(harmonyFixed.accent);
  tunedColors.accent = hslToHex(
    (accentHsl.h + hueShift + 360) % 360,
    clampValue(accentHsl.s + (vibe.isDarkUi ? 10 : -5), 30, 100),
    clampValue(accentHsl.l + (vibe.isDarkUi ? 8 : -6), 5, 90)
  );

  const secondaryHsl = hexToHsl(harmonyFixed.secondary);
  tunedColors.secondary = hslToHex(
    secondaryHsl.h,
    clampValue(secondaryHsl.s + (vibe.isDarkUi ? -5 : -10), 15, 90),
    clampValue(secondaryHsl.l + (vibe.isDarkUi ? 4 : -3), 5, 90)
  );

  tunedColors.background = shiftLightness(harmonyFixed.background, surfaceShade);
  tunedColors.surface = shiftLightness(harmonyFixed.surface, surfaceShade);
  tunedColors.surfaceAlt = shiftLightness(harmonyFixed.surfaceAlt, surfaceShade * 0.9);

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

interface AppState {
  vibeId: VibeId;
  seed: number;
  colorLocks: ColorLocks;
  fontLockMode: FontLockMode;
  hueShift: number;
  saturationShift: number;
  aiTuned: boolean;
}

function App() {
  const { showToast, ToastContainer } = useToast();

  // Initialize from URL params if available
  const initStateFromURL = (): AppState => {
    const params = new URLSearchParams(window.location.search);
    return {
      vibeId: (params.get("vibe") as VibeId) || DEFAULT_VIBE,
      seed: parseFloat(params.get("seed") || String(Math.random())),
      colorLocks: DEFAULT_LOCKS,
      fontLockMode: (params.get("fontLock") as FontLockMode) || "none",
      hueShift: parseInt(params.get("hue") || "0"),
      saturationShift: parseInt(params.get("sat") || "0"),
      aiTuned: false,
    };
  };

  const initialAppState = initStateFromURL();

  const [vibeId, setVibeId] = useState<VibeId>(initialAppState.vibeId);
  const [seed, setSeed] = useState<number>(initialAppState.seed);
  const [colorLocks, setColorLocks] = useState<ColorLocks>(DEFAULT_LOCKS);
  const [fontLockMode, setFontLockMode] = useState<FontLockMode>(initialAppState.fontLockMode);
  const [hueShift, setHueShift] = useState(initialAppState.hueShift);
  const [saturationShift, setSaturationShift] = useState(initialAppState.saturationShift);
  const [aiTuned, setAiTuned] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [triggerAutoRefresh, setTriggerAutoRefresh] = useState(false);

  const [designState, setDesignState] = useState<DesignState>(() =>
    buildDesignState(
      initialAppState.vibeId,
      initialAppState.seed,
      DEFAULT_LOCKS,
      initialAppState.fontLockMode,
      initialAppState.hueShift,
      initialAppState.saturationShift
    )
  );

  const [tokens, setTokens] = useState<DesignTokens>(() =>
    buildDesignTokens(designState)
  );

  const [activeGeneratedName, setActiveGeneratedName] = useState<string | null>(
    null
  );

  // Preview state (page, menu, dark mode)
  const previewState = usePreviewState();

  // History for undo/redo
  const history = useHistory<AppState>({
    vibeId: initialAppState.vibeId,
    seed: initialAppState.seed,
    colorLocks: DEFAULT_LOCKS,
    fontLockMode: initialAppState.fontLockMode,
    hueShift: initialAppState.hueShift,
    saturationShift: initialAppState.saturationShift,
    aiTuned: false,
  });

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


  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("vibe", vibeId);
    params.set("seed", seed.toFixed(6));
    if (fontLockMode !== "none") params.set("fontLock", fontLockMode);
    if (hueShift !== 0) params.set("hue", hueShift.toString());
    if (saturationShift !== 0) params.set("sat", saturationShift.toString());

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  }, [vibeId, seed, fontLockMode, hueShift, saturationShift]);

  // Save to history when state changes
  useEffect(() => {
    history.set({
      vibeId,
      seed,
      colorLocks,
      fontLockMode,
      hueShift,
      saturationShift,
      aiTuned,
    });
  }, [history, vibeId, seed, colorLocks, fontLockMode, hueShift, saturationShift, aiTuned]);

  // Auto-refresh trigger after spin
  useEffect(() => {
    if (!triggerAutoRefresh) return;
    setIsOptimizing(true);
    setTimeout(() => {
      handleAiSuggestion();
      setIsOptimizing(false);
      setTriggerAutoRefresh(false);
    }, 500);
  }, [triggerAutoRefresh]);

  // Handle undo/redo
  useEffect(() => {
    const state = history.state;
    if (
      state.vibeId !== vibeId ||
      state.seed !== seed ||
      state.fontLockMode !== fontLockMode ||
      state.hueShift !== hueShift ||
      state.saturationShift !== saturationShift
    ) {
      setVibeId(state.vibeId);
      setSeed(state.seed);
      setColorLocks(state.colorLocks);
      setFontLockMode(state.fontLockMode);
      setHueShift(state.hueShift);
      setSaturationShift(state.saturationShift);
      setAiTuned(state.aiTuned);
      setDesignState((prev) =>
        buildDesignState(
          state.vibeId,
          state.seed,
          state.colorLocks,
          state.fontLockMode,
          state.hueShift,
          state.saturationShift,
          prev
        )
      );
    }
  }, [history.state]);

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
    // Trigger auto-refresh if enabled
    if (autoRefresh) {
      setTriggerAutoRefresh(true);
    }
  }, [vibeId, colorLocks, fontLockMode, autoRefresh]);

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
      setAiTuned(false);  // Allow re-triggering
      const disciplinedBase = applyVibeColorRules(prev.vibe, tuning.baseColors);
      const adjusted = applyColorAdjustments(
        disciplinedBase,
        tuning.hueShift,
        tuning.saturationShift
      );

      // Optimoi typografia algoritmisesti
      const optimizedTypography = optimizeTypography(
        prev.typography,
        prev.vibe,
        adjusted,
        trendsData
      );

      // Optimoi typografian värit luomaan hierarkiaa
      const typographyColors = getOptimizedTypographyColors(adjusted);

      // Lisää värit optimoituun typografiaan
      const typographyWithColors = {
        ...optimizedTypography,
        heading: {
          ...optimizedTypography.heading,
          color: typographyColors.heading,
        },
        subheading: optimizedTypography.subheading ? {
          ...optimizedTypography.subheading,
          color: typographyColors.subheading,
        } : undefined,
        body: {
          ...optimizedTypography.body,
          color: typographyColors.body,
        },
        accent: {
          ...optimizedTypography.accent,
          color: typographyColors.accent,
        },
      };

      return {
        ...prev,
        colors: applyVibeColorRules(prev.vibe, adjusted),
        originalColors: disciplinedBase,
        typography: typographyWithColors,
      };
    });
    setActiveGeneratedName(null);
  }, []);

  const handleCopyColor = useCallback((color: string) => {
    navigator.clipboard.writeText(color).then(
      () => {
        showToast(`Copied ${color.toUpperCase()}`);
      },
      () => {
        showToast("Failed to copy color");
      }
    );
  }, [showToast]);

  const handleShareLink = useCallback(() => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(
      () => {
        showToast("Link copied to clipboard!");
      },
      () => {
        showToast("Failed to copy link");
      }
    );
  }, [showToast]);

  const handleSaveFavorite = useCallback(() => {
    const name = prompt("Enter a name for this favorite:");
    if (!name) return;

    try {
      saveFavorite({
        name,
        vibeId,
        seed,
        colorLocks,
        fontLockMode,
        hueShift,
        saturationShift,
        colors: designState.colors,
        fontPair: designState.fontPair,
      });
      showToast("Favorite saved!");
    } catch (error) {
      showToast("Failed to save favorite");
    }
  }, [vibeId, seed, colorLocks, fontLockMode, hueShift, saturationShift, designState, showToast]);

  const handleApplyFavorite = useCallback((fav: SavedFavorite) => {
    setVibeId(fav.vibeId);
    setSeed(fav.seed);
    setColorLocks(fav.colorLocks);
    setFontLockMode(fav.fontLockMode);
    setHueShift(fav.hueShift);
    setSaturationShift(fav.saturationShift);
    setAiTuned(false);
    setActiveGeneratedName(null);
    setDesignState((prev) =>
      buildDesignState(
        fav.vibeId,
        fav.seed,
        fav.colorLocks,
        fav.fontLockMode,
        fav.hueShift,
        fav.saturationShift,
        prev
      )
    );
    showToast(`Applied favorite: ${fav.name}`);
  }, [showToast]);

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
      <ToastContainer />
      <header className="border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Tool
          </span>
          <h1 className="text-lg font-semibold">
            InstantUI – Design Style Generator
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={history.undo}
            disabled={!history.canUndo}
            className="text-sm px-3 py-1.5 rounded-full border border-slate-600 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Undo (Cmd/Ctrl+Z)"
          >
            ↶ Undo
          </button>
          <button
            onClick={history.redo}
            disabled={!history.canRedo}
            className="text-sm px-3 py-1.5 rounded-full border border-slate-600 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Redo (Cmd/Ctrl+Shift+Z)"
          >
            ↷ Redo
          </button>
          <button
            onClick={handleShareLink}
            className="text-sm px-3 py-1.5 rounded-full border border-slate-600 hover:bg-slate-800"
            title="Copy shareable link"
          >
            🔗 Share
          </button>
          <button
            onClick={handleSaveFavorite}
            className="text-sm px-3 py-1.5 rounded-full border border-emerald-600 text-emerald-400 hover:bg-emerald-600/10"
            title="Save as favorite"
          >
            ⭐ Save
          </button>
          <button
            onClick={spinAll}
            className="text-sm px-3 py-1.5 rounded-full border border-slate-600 hover:bg-slate-800"
          >
            Randomize all (Space)
          </button>
        </div>
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
            onCopyColor={handleCopyColor}
            autoRefresh={autoRefresh}
            onToggleAutoRefresh={setAutoRefresh}
            isOptimizing={isOptimizing}
            activePage={previewState.activePage}
            onPageChange={previewState.setActivePage}
            activeMenu={previewState.activeMenu}
            onMenuChange={previewState.setActiveMenu}
          />

          <div className="border-t border-slate-800 pt-4">
            <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-400 mb-3">
              Favorites
            </h2>
            <FavoritesPanel onApply={handleApplyFavorite} />
          </div>

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
          <div className="flex-1 p-4 lg:p-6 relative">
            <Preview
              designState={designState}
              isAnalyzing={isOptimizing}
              activePage={previewState.activePage}
              activeMenu={previewState.activeMenu}
              onPageChange={previewState.setActivePage}
              onColorsFixed={(newColors) => {
                setDesignState((prev) => ({
                  ...prev,
                  colors: newColors,
                }));
              }}
            />
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
