import { useMemo } from "react";
import type { DesignState } from "../lib/types";
import {
  checkDesignContrast,
  getContrastViolations,
  fixContrastToWCAG,
  type ContrastCheck,
} from "../lib/contrastChecker";

interface ContrastCheckerPanelProps {
  designState: DesignState;
  isOpen?: boolean;
  onColorsFixed?: (newColors: DesignState["colors"]) => void;
}

const severityStyles = {
  pass: {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-200 dark:border-emerald-700",
    icon: "✓",
    color: "text-emerald-700 dark:text-emerald-400",
  },
  warn: {
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    border: "border-yellow-200 dark:border-yellow-700",
    icon: "⚠",
    color: "text-yellow-700 dark:text-yellow-400",
  },
  fail: {
    bg: "bg-red-50 dark:bg-red-900/20",
    border: "border-red-200 dark:border-red-700",
    icon: "✕",
    color: "text-red-700 dark:text-red-400",
  },
};

const ContrastRow = ({
  check,
  idx,
}: {
  check: ContrastCheck;
  idx: number;
}) => {
  const style = severityStyles[check.severity];

  return (
    <div
      key={idx}
      className={`p-2 border rounded text-xs ${style.bg} ${style.border}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            <span className={`font-bold ${style.color}`}>
              {style.icon}
            </span>
            <span className="font-medium text-slate-900 dark:text-slate-100 truncate">
              {check.label}
            </span>
          </div>

          {/* Color swatches */}
          <div className="flex items-center gap-1 mb-1">
            <div
              className="w-5 h-5 rounded border border-slate-300"
              style={{ backgroundColor: check.foreground }}
              title={`FG: ${check.foreground}`}
            />
            <span className="text-xs text-slate-600 dark:text-slate-400">
              on
            </span>
            <div
              className="w-5 h-5 rounded border border-slate-300"
              style={{ backgroundColor: check.background }}
              title={`BG: ${check.background}`}
            />
          </div>

          {/* Standards - compact */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-600 dark:text-slate-400">
              {check.ratio.toFixed(2)}:1
            </span>
            <span
              className={`${check.aaCompliant ? "text-emerald-500" : "text-red-500"}`}
            >
              {check.aaCompliant ? "✓" : "✕"} AA
            </span>
            <span
              className={`${check.aaaCompliant ? "text-emerald-500" : "text-red-500"}`}
            >
              {check.aaaCompliant ? "✓" : "✕"} AAA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContrastCheckerPanel = ({
  designState,
  isOpen = true,
  onColorsFixed,
}: ContrastCheckerPanelProps) => {
  const checks = useMemo(
    () => checkDesignContrast(designState),
    [designState]
  );

  const violations = useMemo(() => getContrastViolations(checks), [checks]);
  const passCount = checks.filter((c) => c.severity === "pass").length;

  const handleFixAA = () => {
    const fixedColors = fixContrastToWCAG(designState.colors, "aa");
    onColorsFixed?.(fixedColors);
  };

  const handleFixAAA = () => {
    const fixedColors = fixContrastToWCAG(designState.colors, "aaa");
    onColorsFixed?.(fixedColors);
  };

  if (!isOpen) return null;

  return (
    <div className="w-full bg-slate-950/40 border-t border-slate-800 overflow-hidden">
      {/* Compact Header */}
      <div className="px-4 py-2 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-100">
            WCAG Contrast
          </h3>
          {/* Summary stats - inline */}
          <div className="flex gap-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-slate-400">Pass: <span className="font-semibold text-slate-100">{passCount}</span></span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
              <span className="text-slate-400">AA: <span className="font-semibold text-slate-100">{violations.aa}</span></span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="text-slate-400">AAA: <span className="font-semibold text-slate-100">{violations.aaa}</span></span>
            </div>
          </div>
        </div>

        {/* Fix buttons - compact */}
        {(violations.aa > 0 || violations.aaa > 0) && (
          <div className="flex gap-2">
            <button
              onClick={handleFixAA}
              className="flex-1 px-2 py-1 text-xs font-medium bg-emerald-600/80 hover:bg-emerald-600 text-white rounded transition-colors"
            >
              Fix AA
            </button>
            <button
              onClick={handleFixAAA}
              className="flex-1 px-2 py-1 text-xs font-medium bg-emerald-700/80 hover:bg-emerald-700 text-white rounded transition-colors"
            >
              Fix AAA
            </button>
          </div>
        )}
      </div>

      {/* Checks list - compact */}
      <div className="px-4 py-2 space-y-2 max-h-40 overflow-y-auto">
        {checks.map((check, idx) => (
          <ContrastRow key={idx} check={check} idx={idx} />
        ))}
      </div>
    </div>
  );
};
