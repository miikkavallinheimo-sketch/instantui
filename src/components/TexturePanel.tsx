import type { DesignState } from "../lib/types";
import { getVibeTextures, getTextureContent, TEXTURE_LIBRARY } from "../lib/textureTokens";

interface TexturePanelProps {
  designState: DesignState;
  onTextureChange: (textureId: string) => void;
  onOpacityChange: (opacity: number) => void;
}

export const TexturePanel = ({
  designState,
  onTextureChange,
  onOpacityChange,
}: TexturePanelProps) => {
  const vibeTextures = getVibeTextures(designState.vibe.id);
  const currentTexture = designState.textureId || vibeTextures.defaultTexture;
  const currentOpacity = designState.textureOpacity ?? 10;

  return (
    <section className="border-t border-slate-700 pt-4">
      <h3 className="text-sm font-semibold text-slate-100 mb-3">Texture</h3>

      {/* Texture Selector */}
      <div className="space-y-2 mb-4">
        <label className="text-xs text-slate-400">Pattern</label>
        <div className="grid grid-cols-3 gap-2">
          {vibeTextures.options.map((textureId) => {
            const texture = TEXTURE_LIBRARY[textureId as keyof typeof TEXTURE_LIBRARY];
            const isActive = currentTexture === textureId;

            return (
              <button
                key={textureId}
                onClick={() => onTextureChange(textureId)}
                className={`p-2 rounded text-xs transition-all ${
                  isActive
                    ? "bg-slate-500 border-2 border-blue-400 text-slate-50"
                    : "bg-slate-700 border-2 border-slate-600 text-slate-300 hover:bg-slate-600"
                }`}
                title={texture.description}
              >
                {texture.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Opacity Slider */}
      {currentTexture !== "none" && (
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
