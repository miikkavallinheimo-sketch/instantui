import type { VibeId } from "./types";

export type TextureId =
  | "none"
  | "fine-noise"
  | "dot-grid"
  | "thin-lines"
  | "subtle-grid"
  | "crosshatch"
  | "paper"
  | "brushstrokes"
  | "ink-splatter"
  | "canvas-weave"
  | "confetti"
  | "doodle"
  | "bubbly-dots"
  | "silk"
  | "marble-veins"
  | "linen"
  | "concrete"
  | "geometric-blocks"
  | "halftone"
  | "old-paper"
  | "film-grain"
  | "hexagon-grid"
  | "circuit-lines"
  | "mesh-noise"
  | "watercolor"
  | "wood-grain"
  | "recycled-paper"
  | "rough-concrete"
  | "exposed-aggregate"
  | "grid-system";

export interface TextureOption {
  id: TextureId;
  name: string;
  description: string;
  svgContent?: string; // Inline SVG for simple patterns
  assetPath?: string; // Path to texture file for complex patterns
}

export interface VibeTextures {
  id: VibeId;
  defaultTexture: TextureId;
  options: TextureId[];
}

/**
 * Texture definitions for each vibe
 * Using SVG patterns for web optimization and scalability
 */
export const TEXTURE_LIBRARY: Record<TextureId, TextureOption> = {
  none: {
    id: "none",
    name: "No Texture",
    description: "Clean surface without texture",
  },

  // Minimalist textures
  "fine-noise": {
    id: "fine-noise",
    name: "Fine Noise",
    description: "Ultra-fine grain, subtle and clean",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="noise-fine">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="4" seed="1"/>
          </filter>
        </defs>
        <rect width="512" height="512" fill="#000000" filter="url(#noise-fine)" opacity="0.3"/>
      </svg>
    `,
  },

  "dot-grid": {
    id: "dot-grid",
    name: "Dot Grid",
    description: "Sparse dots in a regular grid",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="#000000" opacity="0.5"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#dots)"/>
      </svg>
    `,
  },

  "thin-lines": {
    id: "thin-lines",
    name: "Thin Lines",
    description: "Subtle horizontal lines",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="lines" x="0" y="0" width="512" height="60" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="512" y2="0" stroke="#000000" stroke-width="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#lines)"/>
      </svg>
    `,
  },

  // Professional textures
  "subtle-grid": {
    id: "subtle-grid",
    name: "Subtle Grid",
    description: "Light grid structure",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#000000" stroke-width="0.5" opacity="0.2"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#grid)"/>
      </svg>
    `,
  },

  "crosshatch": {
    id: "crosshatch",
    name: "Crosshatch",
    description: "Delicate diagonal lines",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hatch" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#000000" stroke-width="0.5" opacity="0.25"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#hatch)"/>
      </svg>
    `,
  },

  "paper": {
    id: "paper",
    name: "Paper Texture",
    description: "Fine linen paper grain",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="paper-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="5" seed="2"/>
          </filter>
        </defs>
        <rect width="512" height="512" fill="#000000" filter="url(#paper-texture)" opacity="0.15"/>
      </svg>
    `,
  },

  // Creative textures
  "brushstrokes": {
    id: "brushstrokes",
    name: "Brushstrokes",
    description: "Organic paint-like texture",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="brush">
            <feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="3" seed="3"/>
            <feDisplacementMap in="SourceGraphic" scale="8"/>
          </filter>
        </defs>
        <rect width="512" height="512" fill="#000000" filter="url(#brush)" opacity="0.2"/>
      </svg>
    `,
  },

  "ink-splatter": {
    id: "ink-splatter",
    name: "Ink Splatter",
    description: "Controlled paint drops",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="splatter">
            <feTurbulence type="fractalNoise" baseFrequency="2" numOctaves="2" seed="4"/>
            <feThreshold in="SourceGraphic" low="0.5" high="0.8"/>
          </filter>
        </defs>
        <rect width="512" height="512" fill="#000000" filter="url(#splatter)" opacity="0.25"/>
      </svg>
    `,
  },

  "canvas-weave": {
    id: "canvas-weave",
    name: "Canvas Weave",
    description: "Artist canvas texture",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="weave" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="12" y2="0" stroke="#000000" stroke-width="0.5" opacity="0.15"/>
            <line x1="0" y1="6" x2="12" y2="6" stroke="#000000" stroke-width="0.5" opacity="0.15"/>
            <line x1="0" y1="0" x2="0" y2="12" stroke="#000000" stroke-width="0.5" opacity="0.15"/>
            <line x1="6" y1="0" x2="6" y2="12" stroke="#000000" stroke-width="0.5" opacity="0.15"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#weave)"/>
      </svg>
    `,
  },

  // Playful textures
  "confetti": {
    id: "confetti",
    name: "Confetti",
    description: "Small scattered shapes",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="confetti-pat" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
            <circle cx="16" cy="16" r="2" fill="#000000" opacity="0.3"/>
            <rect x="32" y="24" width="3" height="3" fill="#000000" opacity="0.25"/>
            <polygon points="48,8 50,14 56,14 51,18 53,24 48,20 43,24 45,18 40,14 46,14" fill="#000000" opacity="0.2"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#confetti-pat)"/>
      </svg>
    `,
  },

  "doodle": {
    id: "doodle",
    name: "Doodle Pattern",
    description: "Hand-drawn style elements",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="doodle-pat" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 20 20 Q 25 15 30 20 T 40 20" stroke="#000000" stroke-width="0.5" fill="none" opacity="0.2"/>
            <circle cx="60" cy="30" r="3" fill="none" stroke="#000000" stroke-width="0.5" opacity="0.2"/>
            <path d="M 10 60 L 15 55 L 20 60" stroke="#000000" stroke-width="0.5" fill="none" opacity="0.2"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#doodle-pat)"/>
      </svg>
    `,
  },

  "bubbly-dots": {
    id: "bubbly-dots",
    name: "Bubbly Dots",
    description: "Varied-size circles",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="bubbles" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="3" fill="#000000" opacity="0.2"/>
            <circle cx="36" cy="24" r="2" fill="#000000" opacity="0.15"/>
            <circle cx="24" cy="36" r="2.5" fill="#000000" opacity="0.2"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#bubbles)"/>
      </svg>
    `,
  },

  // Elegant textures
  "silk": {
    id: "silk",
    name: "Silk Texture",
    description: "Smooth fabric sheen",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="silk-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="6" seed="5"/>
          </filter>
        </defs>
        <rect width="512" height="512" fill="#000000" filter="url(#silk-texture)" opacity="0.1"/>
      </svg>
    `,
  },

  "marble-veins": {
    id: "marble-veins",
    name: "Marble Veins",
    description: "Delicate marble streaks",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="marble">
            <feTurbulence type="fractalNoise" baseFrequency="0.3" numOctaves="4" seed="6"/>
          </filter>
        </defs>
        <rect width="512" height="512" fill="#000000" filter="url(#marble)" opacity="0.12"/>
      </svg>
    `,
  },

  "linen": {
    id: "linen",
    name: "Fine Linen",
    description: "High-quality fabric weave",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="linen-weave" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="4" y2="0" stroke="#000000" stroke-width="0.25" opacity="0.15"/>
            <line x1="0" y1="2" x2="4" y2="2" stroke="#000000" stroke-width="0.25" opacity="0.15"/>
            <line x1="0" y1="0" x2="0" y2="4" stroke="#000000" stroke-width="0.25" opacity="0.15"/>
            <line x1="2" y1="0" x2="2" y2="4" stroke="#000000" stroke-width="0.25" opacity="0.15"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#linen-weave)"/>
      </svg>
    `,
  },

  // Bold textures
  "concrete": {
    id: "concrete",
    name: "Concrete",
    description: "Industrial concrete grain",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="concrete-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="4" seed="7"/>
          </filter>
        </defs>
        <rect width="512" height="512" fill="#000000" filter="url(#concrete-filter)" opacity="0.35"/>
      </svg>
    `,
  },

  "geometric-blocks": {
    id: "geometric-blocks",
    name: "Geometric Blocks",
    description: "Large geometric shapes",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="blocks" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="32" height="32" fill="none" stroke="#000000" stroke-width="0.5" opacity="0.2"/>
            <polygon points="0,32 32,32 48,16 16,16" fill="none" stroke="#000000" stroke-width="0.5" opacity="0.15"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#blocks)"/>
      </svg>
    `,
  },

  "halftone": {
    id: "halftone",
    name: "Halftone",
    description: "Bold dot pattern",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="halftone-pat" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="4" fill="#000000" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#halftone-pat)"/>
      </svg>
    `,
  },

  // Vintage textures
  "old-paper": {
    id: "old-paper",
    name: "Old Paper",
    description: "Aged paper with wear",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="old-paper-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="6" seed="8"/>
          </filter>
        </defs>
        <rect width="512" height="512" fill="#000000" filter="url(#old-paper-filter)" opacity="0.2"/>
      </svg>
    `,
  },

  "film-grain": {
    id: "film-grain",
    name: "Film Grain",
    description: "35mm film-style grain",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="film">
            <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" seed="9"/>
          </filter>
        </defs>
        <rect width="512" height="512" fill="#000000" filter="url(#film)" opacity="0.25"/>
      </svg>
    `,
  },

  // Modern textures
  "hexagon-grid": {
    id: "hexagon-grid",
    name: "Hexagon Grid",
    description: "Geometric hex pattern",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex" x="0" y="0" width="32" height="28" patternUnits="userSpaceOnUse">
            <polygon points="16,0 32,8 32,20 16,28 0,20 0,8" fill="none" stroke="#000000" stroke-width="0.5" opacity="0.2"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#hex)"/>
      </svg>
    `,
  },

  "circuit-lines": {
    id: "circuit-lines",
    name: "Circuit Lines",
    description: "Tech-inspired pattern",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 0 32 L 16 32 L 16 16 L 32 16 L 32 48 L 48 48 L 48 0" stroke="#000000" stroke-width="0.5" fill="none" opacity="0.2"/>
            <circle cx="16" cy="32" r="1.5" fill="#000000" opacity="0.25"/>
            <circle cx="32" cy="16" r="1.5" fill="#000000" opacity="0.25"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#circuit)"/>
      </svg>
    `,
  },

  "mesh-noise": {
    id: "mesh-noise",
    name: "Mesh Noise",
    description: "Digital noise with structure",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="mesh">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="5" seed="10"/>
          </filter>
        </defs>
        <rect width="512" height="512" fill="#000000" filter="url(#mesh)" opacity="0.2"/>
      </svg>
    `,
  },

  // Organic textures
  "watercolor": {
    id: "watercolor",
    name: "Watercolor",
    description: "Soft watercolor wash",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="watercolor-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="4" seed="11"/>
          </filter>
        </defs>
        <rect width="512" height="512" fill="#000000" filter="url(#watercolor-filter)" opacity="0.18"/>
      </svg>
    `,
  },

  "wood-grain": {
    id: "wood-grain",
    name: "Wood Grain",
    description: "Natural wood pattern",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="wood" x="0" y="0" width="512" height="512" patternUnits="userSpaceOnUse">
            <path d="M 0 0 Q 256 20 512 0" stroke="#000000" stroke-width="2" fill="none" opacity="0.08"/>
            <path d="M 0 50 Q 256 70 512 50" stroke="#000000" stroke-width="1.5" fill="none" opacity="0.06"/>
            <path d="M 0 120 Q 256 135 512 120" stroke="#000000" stroke-width="1" fill="none" opacity="0.05"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#wood)"/>
      </svg>
    `,
  },

  "recycled-paper": {
    id: "recycled-paper",
    name: "Recycled Paper",
    description: "Eco-friendly paper texture",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="recycled">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="5" seed="12"/>
          </filter>
        </defs>
        <rect width="512" height="512" fill="#000000" filter="url(#recycled)" opacity="0.17"/>
      </svg>
    `,
  },

  // Brutalist textures
  "rough-concrete": {
    id: "rough-concrete",
    name: "Rough Concrete",
    description: "Heavy concrete with imperfections",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="5" seed="13"/>
          </filter>
        </defs>
        <rect width="512" height="512" fill="#000000" filter="url(#rough)" opacity="0.4"/>
      </svg>
    `,
  },

  "exposed-aggregate": {
    id: "exposed-aggregate",
    name: "Exposed Aggregate",
    description: "Stone and concrete mix",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="aggregate">
            <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="4" seed="14"/>
          </filter>
        </defs>
        <rect width="512" height="512" fill="#000000" filter="url(#aggregate)" opacity="0.35"/>
      </svg>
    `,
  },

  "grid-system": {
    id: "grid-system",
    name: "Grid System",
    description: "Stark architectural grid",
    svgContent: `
      <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="stark-grid" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="64" height="64" fill="none" stroke="#000000" stroke-width="1" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#stark-grid)"/>
      </svg>
    `,
  },
};

/**
 * Texture assignments for each vibe
 */
export const VIBE_TEXTURES: Record<VibeId, VibeTextures> = {
  minimal: {
    id: "minimal",
    defaultTexture: "none",
    options: ["none", "fine-noise", "dot-grid", "thin-lines"],
  },
  "modern-saas": {
    id: "modern-saas",
    defaultTexture: "none",
    options: ["none", "subtle-grid", "mesh-noise", "hexagon-grid"],
  },
  brutalist: {
    id: "brutalist",
    defaultTexture: "none",
    options: ["none", "rough-concrete", "grid-system", "exposed-aggregate"],
  },
  pastel: {
    id: "pastel",
    defaultTexture: "none",
    options: ["none", "bubbly-dots", "confetti", "watercolor"],
  },
  "dark-tech": {
    id: "dark-tech",
    defaultTexture: "none",
    options: ["none", "circuit-lines", "mesh-noise", "halftone"],
  },
  luxury: {
    id: "luxury",
    defaultTexture: "none",
    options: ["none", "silk", "marble-veins", "linen"],
  },
  "soft-neo-tech": {
    id: "soft-neo-tech",
    defaultTexture: "none",
    options: ["none", "fine-noise", "mesh-noise", "dot-grid"],
  },
  "gradient-bloom": {
    id: "gradient-bloom",
    defaultTexture: "none",
    options: ["none", "watercolor", "canvas-weave", "bubbly-dots"],
  },
  "warm-editorial": {
    id: "warm-editorial",
    defaultTexture: "none",
    options: ["none", "old-paper", "linen", "paper"],
  },
  "retro-pixel": {
    id: "retro-pixel",
    defaultTexture: "none",
    options: ["none", "halftone", "film-grain", "geometric-blocks"],
  },
  "magazine-brutalism": {
    id: "magazine-brutalism",
    defaultTexture: "none",
    options: ["none", "rough-concrete", "crosshatch", "ink-splatter"],
  },
  "cyber-mint": {
    id: "cyber-mint",
    defaultTexture: "none",
    options: ["none", "circuit-lines", "hexagon-grid", "mesh-noise"],
  },
  dark: {
    id: "dark",
    defaultTexture: "none",
    options: ["none", "concrete", "mesh-noise", "film-grain"],
  },
};

/**
 * Get texture options for a specific vibe
 */
export function getVibeTextures(vibeId: VibeId): VibeTextures {
  return VIBE_TEXTURES[vibeId] || VIBE_TEXTURES.minimal;
}

/**
 * Get texture SVG content or asset path
 */
export function getTextureContent(textureId: TextureId): TextureOption {
  return TEXTURE_LIBRARY[textureId] || TEXTURE_LIBRARY.none;
}

/**
 * Convert texture SVG to data URL for use as background-image
 */
export function getTextureDataUrl(textureId: TextureId): string {
  const texture = TEXTURE_LIBRARY[textureId];
  if (!texture || !texture.svgContent) {
    return "";
  }

  const encoded = encodeURIComponent(texture.svgContent.trim());
  return `data:image/svg+xml,${encoded}`;
}
