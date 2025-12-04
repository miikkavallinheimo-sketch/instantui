/**
 * Texture System Types
 * Type definitions for texture and pattern system
 */

export type VibeId =
  | 'minimal'
  | 'professional'
  | 'creative'
  | 'playful'
  | 'elegant'
  | 'bold'
  | 'vintage'
  | 'modern'
  | 'organic'
  | 'brutalist'
  | 'modern-saas'
  | 'dark-tech'
  | 'pastel'
  | 'retro-pixel'
  | 'warm-editorial'
  | 'soft-neo-tech'
  | 'gradient-bloom'
  | 'cyber-mint'
  | 'magazine-brutalism'
  | 'luxury'
  | 'dark';

export type TextureType =
  | 'noise'
  | 'dots'
  | 'lines'
  | 'grid'
  | 'crosshatch'
  | 'paper'
  | 'brushstrokes'
  | 'splatter'
  | 'canvas'
  | 'confetti'
  | 'doodle'
  | 'bubbly'
  | 'silk'
  | 'marble'
  | 'linen'
  | 'concrete'
  | 'geometric'
  | 'halftone'
  | 'aged-paper'
  | 'print'
  | 'film-grain'
  | 'hexagon'
  | 'circuit'
  | 'mesh'
  | 'watercolor'
  | 'wood'
  | 'recycled'
  | 'rough-concrete'
  | 'aggregate'
  | 'architectural-grid';

export interface TexturePattern {
  id: string;
  name: string;
  type: TextureType;
  vibes: VibeId[];
  description: string;
  svg: string; // SVG pattern as string
  defaultOpacity: number; // 0-1
  blendMode: 'overlay' | 'multiply' | 'screen' | 'soft-light' | 'normal';
  tileSize: number; // in pixels
  category: 'subtle' | 'medium' | 'bold';
}

export interface TextureOptions {
  patternId: string;
  opacity: number; // 0-1
  blendMode?: 'overlay' | 'multiply' | 'screen' | 'soft-light' | 'normal';
  scale?: number; // Scale multiplier
}

export interface VibeTextureSet {
  vibeId: VibeId;
  vibeName: string;
  patterns: TexturePattern[];
  recommended: string; // Recommended pattern ID
}
