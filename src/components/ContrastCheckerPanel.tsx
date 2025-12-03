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
      className={`p-4 border rounded-lg ${style.bg} ${style.border}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-lg font-bold ${style.color}`}>
              {style.icon}
            </span>
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {check.label}
            </span>
          </div>

          {/* Color swatches */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-8 h-8 rounded border border-slate-300"
              style={{ backgroundColor: check.foreground }}
              title={`FG: ${check.foreground}`}
            />
            <span className="text-xs text-slate-600 dark:text-slate-400">
              on
            </span>
            <div
              className="w-8 h-8 rounded border border-slate-300"
              style={{ backgroundColor: check.background }}
              title={`BG: ${check.background}`}
            />
          </div>

          {/* Standards */}
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 dark:text-slate-400">
                Ratio:
              </span>
              <span
                className={`font-mono font-semibold ${check.aaaCompliant ? "text-emerald-600 dark:text-emerald-400" : check.aaCompliant ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400"}`}
              >
                {check.ratio.toFixed(2)}:1
              </span>
            </div>

            <div className="flex gap-4 text-xs mt-2">
              <div
                className={`flex items-center gap-1 ${check.aaCompliant ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
              >
                <span>{check.aaCompliant ? "✓" : "✕"}</span>
                <span>AA (4.5:1)</span>
              </div>
              <div
                className={`flex items-center gap-1 ${check.aaaCompliant ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
              >
                <span>{check.aaaCompliant ? "✓" : "✕"}</span>
                <span>AAA (7:1)</span>
              </div>
            </div>
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
    <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-800 px-6 py-4 border-b border-slate-200 dark:border-slate-700 space-y-3">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
          WCAG Contrast Checker
        </h3>

        {/* Summary stats */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-slate-600 dark:text-slate-400">
              Pass: <span className="font-semibold text-slate-900 dark:text-slate-100">{passCount}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="text-slate-600 dark:text-slate-400">
              AA Fail: <span className="font-semibold text-slate-900 dark:text-slate-100">{violations.aa}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-slate-600 dark:text-slate-400">
              AAA Fail: <span className="font-semibold text-slate-900 dark:text-slate-100">{violations.aaa}</span>
            </span>
          </div>
        </div>

        {/* Fix buttons */}
        {(violations.aa > 0 || violations.aaa > 0) && (
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleFixAA}
              className="flex-1 px-3 py-2 text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors"
            >
              Fix to AA
            </button>
            <button
              onClick={handleFixAAA}
              className="flex-1 px-3 py-2 text-xs font-medium bg-emerald-700 hover:bg-emerald-800 text-white rounded transition-colors"
            >
              Fix to AAA
            </button>
          </div>
        )}
      </div>

      {/* Checks list */}
      <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
        {checks.map((check, idx) => (
          <ContrastRow key={idx} check={check} idx={idx} />
        ))}
      </div>

      {/* Footer */}
      <div className="bg-slate-50 dark:bg-slate-800 px-6 py-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
        <p>
          <strong>WCAG Compliance:</strong> AA requires 4.5:1 contrast ratio. AAA
          requires 7:1 for normal text.
        </p>
      </div>
    </div>
  );
};
