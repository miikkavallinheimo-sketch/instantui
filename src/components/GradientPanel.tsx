import type { DesignState } from "../lib/types";
import { getVibeGradients, GRADIENT_LIBRARY } from "../lib/gradientTokens";

interface GradientPanelProps {
  designState: DesignState;
  onGradientChange: (gradientId: string) => void;
  onOpacityChange: (opacity: number) => void;
}

export const GradientPanel = ({
  designState,
  onGradientChange,
  onOpacityChange,
}: GradientPanelProps) => {
  const vibeGradients = getVibeGradients(designState.vibe.id);
  const currentGradient = designState.gradientId || vibeGradients.defaultGradient;
  const currentOpacity = designState.gradientOpacity ?? 20;

  return (
    <section className="border-t border-slate-700 pt-4">
      <h3 className="text-sm font-semibold text-slate-100 mb-3">Gradient</h3>

      {/* Gradient Selector */}
      <div className="space-y-2 mb-4">
        <label className="text-xs text-slate-400">Preset</label>
        <div className="grid grid-cols-3 gap-2">
          {/* No Gradient Option */}
          <button
            onClick={() => onGradientChange("none")}
            className={`p-2 rounded text-xs transition-all ${
              currentGradient === "none"
                ? "bg-slate-500 border-2 border-blue-400 text-slate-50"
                : "bg-slate-700 border-2 border-slate-600 text-slate-300 hover:bg-slate-600"
            }`}
            title="No gradient"
          >
            None
          </button>

          {/* Gradient Options */}
          {vibeGradients.options.map((gradientId) => {
            const gradient = GRADIENT_LIBRARY[gradientId];
            const isActive = currentGradient === gradientId;

            return (
              <button
                key={gradientId}
                onClick={() => onGradientChange(gradientId)}
                className={`p-2 rounded text-xs transition-all ${
                  isActive
                    ? "bg-slate-500 border-2 border-blue-400 text-slate-50"
                    : "bg-slate-700 border-2 border-slate-600 text-slate-300 hover:bg-slate-600"
                }`}
                title={gradient.description}
              >
                {gradient.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Opacity Slider */}
      {currentGradient !== "none" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs text-slate-400">Opacity</label>
            <span className="text-xs text-slate-300 font-mono">{currentOpacity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={currentOpacity}
            onChange={(e) => onOpacityChange(parseInt(e.target.value))}
            className="w-full h-1 bg-slate-700 rounded appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      )}
    </section>
  );
};
