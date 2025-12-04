/**
 * TextureOverlay Component
 * React component that applies texture patterns to backgrounds
 */

import React, { useMemo } from 'react';
import type { TextureOptions } from './types';
import { getPatternById } from './library';

interface TextureOverlayProps {
  /** Pattern ID to use */
  patternId: string | null;
  /** Opacity value (0-1) */
  opacity?: number;
  /** Blend mode */
  blendMode?: 'overlay' | 'multiply' | 'screen' | 'soft-light' | 'normal';
  /** Scale multiplier */
  scale?: number;
  /** Additional CSS classes */
  className?: string;
  /** Z-index */
  zIndex?: number;
}

export const TextureOverlay: React.FC<TextureOverlayProps> = ({
  patternId,
  opacity = 0.1,
  blendMode,
  scale = 1,
  className = '',
  zIndex = 1,
}) => {
  // Get the pattern
  const pattern = useMemo(() => {
    if (!patternId) return null;
    return getPatternById(patternId);
  }, [patternId]);

  // Create data URL from SVG
  const backgroundImage = useMemo(() => {
    if (!pattern) return null;

    const svgBlob = new Blob([pattern.svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    return url;
  }, [pattern]);

  if (!pattern || !backgroundImage) {
    return null;
  }

  const effectiveBlendMode = blendMode || pattern.blendMode;
  const effectiveOpacity = opacity !== undefined ? opacity : pattern.defaultOpacity;

  return (
    <div
      className={`texture-overlay ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url("${backgroundImage}")`,
        backgroundRepeat: 'repeat',
        backgroundSize: `${pattern.tileSize * scale}px ${pattern.tileSize * scale}px`,
        opacity: effectiveOpacity,
        mixBlendMode: effectiveBlendMode,
        pointerEvents: 'none',
        zIndex,
      }}
      aria-hidden="true"
    />
  );
};

/**
 * Hook for managing texture state
 */
export function useTexture(initialPatternId?: string, initialOpacity?: number) {
  const [patternId, setPatternId] = React.useState<string | null>(initialPatternId || null);
  const [opacity, setOpacity] = React.useState(initialOpacity || 0.1);
  const [enabled, setEnabled] = React.useState(!!initialPatternId);

  const pattern = useMemo(() => {
    if (!patternId) return null;
    return getPatternById(patternId);
  }, [patternId]);

  return {
    patternId,
    setPatternId,
    opacity,
    setOpacity,
    enabled,
    setEnabled,
    pattern,
  };
}
