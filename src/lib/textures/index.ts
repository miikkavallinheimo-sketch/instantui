/**
 * Texture System
 * Subtle, web-optimized textures for all vibes
 */

// Export types
export * from './types';

// Export pattern generators
export * as patterns from './patterns';

// Export library
export {
  ALL_PATTERNS,
  getPatternsForVibe,
  getPatternById,
  VIBE_TEXTURE_SETS,
} from './library';

// Export React components
export { TextureOverlay, useTexture } from './TextureOverlay';
export { TextureControls, TextureToggle } from './TextureControls';
