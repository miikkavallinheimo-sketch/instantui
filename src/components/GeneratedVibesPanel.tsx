import type { GeneratedVibe } from "../lib/types";
import vibesData from "../data/generatedVibes.json";

interface GeneratedVibesPanelProps {
  onApply: (vibe: GeneratedVibe) => void;
}

const GeneratedVibesPanel = ({ onApply }: GeneratedVibesPanelProps) => {
  const { generatedAt, vibes } = vibesData as {
    generatedAt: string;
    vibes: GeneratedVibe[];
  };

  if (!vibes || vibes.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-400">
          AI-generated vibes
        </h2>
        <span className="text-[10px] text-slate-500">
          updated {new Date(generatedAt).toLocaleDateString()}
        </span>
      </div>

      <div className="space-y-2 max-h-52 overflow-auto pr-1">
        {vibes.slice(0, 6).map((vibe) => (
          <div
            key={vibe.name}
            className="bg-slate-900/70 border border-slate-800 rounded-md px-3 py-2 text-[11px] space-y-1"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="font-semibold text-slate-100">
                {vibe.shortLabel || vibe.name}
              </div>
              <button
                className="text-[10px] px-2 py-0.5 rounded-full border border-emerald-400 text-emerald-300 hover:bg-emerald-400/10"
                onClick={() => onApply(vibe)}
              >
                Apply
              </button>
            </div>
            <div className="text-slate-400 line-clamp-2">
              {vibe.description}
            </div>
            {vibe.recommendedFonts && vibe.recommendedFonts.length > 0 && (
              <div className="text-slate-500">
                Fonts: {vibe.recommendedFonts.join(", ")}
              </div>
            )}
            {vibe.recommendedColors && vibe.recommendedColors.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {vibe.recommendedColors.map((c) => (
                  <div
                    key={c.name + c.role}
                    className="flex items-center gap-1 rounded-full bg-slate-950/80 px-1.5 py-0.5 border border-slate-800"
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-slate-700"
                      style={c.hex ? { backgroundColor: c.hex } : {}}
                    />
                    <span className="text-[10px] text-slate-300">
                      {c.role}: {c.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratedVibesPanel;
