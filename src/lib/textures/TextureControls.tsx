/**
 * Texture Controls Component
 * UI controls for selecting and adjusting textures
 */

import React from 'react';
import type { TexturePattern, VibeId } from './types';
import { getPatternsForVibe } from './library';

interface TextureControlsProps {
  vibeId: VibeId;
  selectedPatternId: string | null;
  opacity: number;
  onPatternChange: (patternId: string | null) => void;
  onOpacityChange: (opacity: number) => void;
  className?: string;
}

export const TextureControls: React.FC<TextureControlsProps> = ({
  vibeId,
  selectedPatternId,
  opacity,
  onPatternChange,
  onOpacityChange,
  className = '',
}) => {
  const patterns = getPatternsForVibe(vibeId);

  return (
    <div className={`texture-controls ${className}`}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Texture
        </label>

        {/* None option */}
        <button
          onClick={() => onPatternChange(null)}
          className={`inline-flex items-center justify-center w-20 h-20 rounded-lg border-2 transition-colors mr-2 mb-2 ${
            selectedPatternId === null
              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
              : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
          }`}
          title="No texture"
        >
          <span className="text-xs text-slate-600 dark:text-slate-400">None</span>
        </button>

        {/* Pattern options */}
        <div className="inline-flex flex-wrap gap-2">
          {patterns.map((pattern) => (
            <TexturePreview
              key={pattern.id}
              pattern={pattern}
              isSelected={selectedPatternId === pattern.id}
              onClick={() => onPatternChange(pattern.id)}
            />
          ))}
        </div>
      </div>

      {/* Opacity slider */}
      {selectedPatternId && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Opacity: {Math.round(opacity * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="0.3"
            step="0.01"
            value={opacity}
            onChange={(e) => onOpacityChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
            <span>0%</span>
            <span>30%</span>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Texture Preview Thumbnail
 */
interface TexturePreviewProps {
  pattern: TexturePattern;
  isSelected: boolean;
  onClick: () => void;
}

const TexturePreview: React.FC<TexturePreviewProps> = ({
  pattern,
  isSelected,
  onClick,
}) => {
  // Create a data URL for the SVG
  const dataUrl = React.useMemo(() => {
    const svgBlob = new Blob([pattern.svg], { type: 'image/svg+xml' });
    return URL.createObjectURL(svgBlob);
  }, [pattern.svg]);

  return (
    <button
      onClick={onClick}
      className={`relative w-20 h-20 rounded-lg border-2 overflow-hidden transition-colors ${
        isSelected
          ? 'border-blue-600 ring-2 ring-blue-200 dark:ring-blue-800'
          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
      }`}
      title={pattern.name}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-white dark:bg-slate-800" />

      {/* Texture preview */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${dataUrl}")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '80px 80px',
          opacity: pattern.defaultOpacity * 3, // Increase opacity for preview
          mixBlendMode: pattern.blendMode,
        }}
      />

      {/* Name tooltip on hover */}
      <div className="absolute inset-x-0 bottom-0 bg-black/70 text-white text-xs py-1 px-2 text-center opacity-0 hover:opacity-100 transition-opacity">
        {pattern.name}
      </div>
    </button>
  );
};

/**
 * Compact Texture Toggle
 * Simple on/off toggle for textures
 */
interface TextureToggleProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  label?: string;
  className?: string;
}

export const TextureToggle: React.FC<TextureToggleProps> = ({
  enabled,
  onToggle,
  label = 'Enable Texture',
  className = '',
}) => {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onToggle(e.target.checked)}
        className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
      />
      <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
    </label>
  );
};
