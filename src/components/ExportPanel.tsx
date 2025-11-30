import { useState } from "react";
import type { DesignTokens } from "../lib/types";

interface ExportPanelProps {
  tokens: DesignTokens;
}

type TabId = "css" | "tailwind" | "json";

const ExportPanel = ({ tokens }: ExportPanelProps) => {
  const [tab, setTab] = useState<TabId>("css");
  const [copied, setCopied] = useState(false);

  const currentText =
    tab === "css"
      ? tokens.cssVariables
      : tab === "tailwind"
      ? tokens.tailwindConfig
      : tokens.jsonTokens;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-400">
          Export
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-full border border-slate-700 p-0.5 text-[11px]">
            {(["css", "tailwind", "json"] as TabId[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-2 py-1 rounded-full ${
                  tab === t ? "bg-slate-700 text-slate-50" : "text-slate-300"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={handleCopy}
            className="text-[11px] px-3 py-1 rounded-full border border-emerald-500 text-emerald-300 hover:bg-emerald-500/10"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 max-h-56 overflow-auto">
        <pre className="text-[11px] leading-relaxed text-slate-200 whitespace-pre">
          {currentText}
        </pre>
      </div>
    </div>
  );
};

export default ExportPanel;
