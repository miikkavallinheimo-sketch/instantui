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
  svgContent?: string; // Inline SVG for simple patterns - uses dark colors with multiply blend mode
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
          <pattern id="noise-fine" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="8" height="8" fill="rgba(255,255,255,0.1)"/>
            <circle cx="2" cy="2" r="0.5" fill="rgba(255,255,255,0.25)"/>
            <circle cx="6" cy="4" r="0.4" fill="rgba(255,255,255,0.18)"/>
            <circle cx="4" cy="6" r="0.3" fill="rgba(255,255,255,0.22)"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#noise-fine)"/>
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
            <circle cx="20" cy="20" r="1.5" fill="rgba(255,255,255,0.6)"/>
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
            <line x1="0" y1="0" x2="512" y2="0" stroke="#ffffff" stroke-width="0.5" opacity="1"/>
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
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#ffffff" stroke-width="0.5" opacity="1"/>
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
            <line x1="0" y1="0" x2="0" y2="8" stroke="#ffffff" stroke-width="0.5" opacity="1"/>
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
          <pattern id="paper-texture" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="6" height="6" fill="rgba(255,255,255,0.03)"/>
            <line x1="0" y1="0" x2="6" y2="6" stroke="rgba(255,255,255,0.08)" stroke-width="0.5" opacity="0.5"/>
            <line x1="6" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.06)" stroke-width="0.4" opacity="0.4"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#paper-texture)"/>
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
          <pattern id="brush" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 5 10 Q 15 8 25 12 Q 30 14 35 10" stroke="rgba(255,255,255,0.2)" stroke-width="2" fill="none" stroke-linecap="round"/>
            <path d="M 8 28 Q 20 25 32 30" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            <path d="M 2 18 L 38 22" stroke="rgba(255,255,255,0.1)" stroke-width="1" fill="none"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#brush)"/>
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
          <pattern id="splatter" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="3" fill="rgba(255,255,255,0.3)"/>
            <circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.4)"/>
            <circle cx="22" cy="18" r="1" fill="rgba(255,255,255,0.25)"/>
            <circle cx="18" cy="22" r="1.5" fill="rgba(255,255,255,0.2)"/>
            <circle cx="45" cy="40" r="2" fill="rgba(255,255,255,0.25)"/>
            <circle cx="45" cy="40" r="1" fill="rgba(255,255,255,0.35)"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#splatter)"/>
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
            <line x1="0" y1="0" x2="12" y2="0" stroke="#ffffff" stroke-width="0.5" opacity="1"/>
            <line x1="0" y1="6" x2="12" y2="6" stroke="#ffffff" stroke-width="0.5" opacity="1"/>
            <line x1="0" y1="0" x2="0" y2="12" stroke="#ffffff" stroke-width="0.5" opacity="1"/>
            <line x1="6" y1="0" x2="6" y2="12" stroke="#ffffff" stroke-width="0.5" opacity="1"/>
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
            <circle cx="16" cy="16" r="2" fill="#ffffff" opacity="1"/>
            <rect x="32" y="24" width="3" height="3" fill="#ffffff" opacity="1"/>
            <polygon points="48,8 50,14 56,14 51,18 53,24 48,20 43,24 45,18 40,14 46,14" fill="#ffffff" opacity="1"/>
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
            <path d="M 20 20 Q 25 15 30 20 T 40 20" stroke="#ffffff" stroke-width="0.5" fill="none" opacity="1"/>
            <circle cx="60" cy="30" r="3" fill="none" stroke="#ffffff" stroke-width="0.5" opacity="1"/>
            <path d="M 10 60 L 15 55 L 20 60" stroke="#ffffff" stroke-width="0.5" fill="none" opacity="1"/>
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
            <circle cx="12" cy="12" r="3" fill="#ffffff" opacity="1"/>
            <circle cx="36" cy="24" r="2" fill="#ffffff" opacity="1"/>
            <circle cx="24" cy="36" r="2.5" fill="#ffffff" opacity="1"/>
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
          <pattern id="silk-texture" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="4" y2="0" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
            <line x1="0" y1="2" x2="4" y2="2" stroke="rgba(255,255,255,0.05)" stroke-width="0.3"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#silk-texture)"/>
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
          <pattern id="marble" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 0 10 Q 20 8 40 12 T 80 10" stroke="rgba(255,255,255,0.12)" stroke-width="0.5" fill="none"/>
            <path d="M 0 30 Q 30 28 60 32 T 80 30" stroke="rgba(255,255,255,0.08)" stroke-width="0.4" fill="none"/>
            <path d="M 0 50 Q 25 48 50 52 T 80 50" stroke="rgba(255,255,255,0.1)" stroke-width="0.5" fill="none"/>
            <path d="M 0 70 Q 35 68 70 72 T 80 70" stroke="rgba(255,255,255,0.06)" stroke-width="0.3" fill="none"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#marble)"/>
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
            <line x1="0" y1="0" x2="4" y2="0" stroke="#ffffff" stroke-width="0.25" opacity="1"/>
            <line x1="0" y1="2" x2="4" y2="2" stroke="#ffffff" stroke-width="0.25" opacity="1"/>
            <line x1="0" y1="0" x2="0" y2="4" stroke="#ffffff" stroke-width="0.25" opacity="1"/>
            <line x1="2" y1="0" x2="2" y2="4" stroke="#ffffff" stroke-width="0.25" opacity="1"/>
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
          <pattern id="concrete-filter" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1" fill="rgba(255,255,255,0.15)"/>
            <circle cx="15" cy="10" r="0.8" fill="rgba(255,255,255,0.1)"/>
            <circle cx="10" cy="15" r="1.2" fill="rgba(255,255,255,0.12)"/>
            <rect x="8" y="0" width="2" height="20" fill="rgba(255,255,255,0.06)"/>
            <line x1="0" y1="10" x2="20" y2="10" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#concrete-filter)"/>
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
            <rect x="0" y="0" width="32" height="32" fill="none" stroke="#ffffff" stroke-width="0.5" opacity="1"/>
            <polygon points="0,32 32,32 48,16 16,16" fill="none" stroke="#ffffff" stroke-width="0.5" opacity="1"/>
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
            <circle cx="8" cy="8" r="4" fill="#ffffff" opacity="1"/>
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
          <pattern id="old-paper-filter" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="30" height="30" fill="rgba(255,255,255,0.02)"/>
            <circle cx="8" cy="8" r="0.5" fill="rgba(255,255,255,0.12)"/>
            <circle cx="20" cy="12" r="0.6" fill="rgba(255,255,255,0.08)"/>
            <circle cx="15" cy="25" r="0.4" fill="rgba(255,255,255,0.1)"/>
            <line x1="5" y1="15" x2="25" y2="15" stroke="rgba(255,255,255,0.05)" stroke-width="0.5" opacity="0.6"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#old-paper-filter)"/>
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
          <pattern id="film" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="rgba(255,255,255,0.25)"/>
            <circle cx="2.5" cy="2" r="0.5" fill="rgba(255,255,255,0.15)"/>
            <circle cx="0.5" cy="2.5" r="0.4" fill="rgba(255,255,255,0.2)"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#film)"/>
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
            <polygon points="16,0 32,8 32,20 16,28 0,20 0,8" fill="none" stroke="#ffffff" stroke-width="0.5" opacity="1"/>
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
            <path d="M 0 32 L 16 32 L 16 16 L 32 16 L 32 48 L 48 48 L 48 0" stroke="#ffffff" stroke-width="0.5" fill="none" opacity="1"/>
            <circle cx="16" cy="32" r="1.5" fill="#ffffff" opacity="1"/>
            <circle cx="32" cy="16" r="1.5" fill="#ffffff" opacity="1"/>
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
          <pattern id="mesh" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="12" y2="0" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
            <line x1="0" y1="6" x2="12" y2="6" stroke="rgba(255,255,255,0.08)" stroke-width="0.4"/>
            <line x1="0" y1="12" x2="12" y2="12" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
            <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
            <line x1="6" y1="0" x2="6" y2="12" stroke="rgba(255,255,255,0.08)" stroke-width="0.4"/>
            <circle cx="6" cy="6" r="0.5" fill="rgba(255,255,255,0.15)"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#mesh)"/>
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
          <pattern id="watercolor-filter" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="8" fill="rgba(255,255,255,0.08)"/>
            <circle cx="15" cy="15" r="5" fill="rgba(255,255,255,0.12)"/>
            <circle cx="40" cy="30" r="10" fill="rgba(255,255,255,0.06)"/>
            <circle cx="40" cy="30" r="6" fill="rgba(255,255,255,0.1)"/>
            <circle cx="25" cy="45" r="7" fill="rgba(255,255,255,0.07)"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#watercolor-filter)"/>
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
            <path d="M 0 0 Q 256 20 512 0" stroke="#ffffff" stroke-width="2" fill="none" opacity="1"/>
            <path d="M 0 50 Q 256 70 512 50" stroke="#ffffff" stroke-width="1.5" fill="none" opacity="1"/>
            <path d="M 0 120 Q 256 135 512 120" stroke="#ffffff" stroke-width="1" fill="none" opacity="1"/>
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
          <pattern id="recycled" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="24" height="24" fill="rgba(255,255,255,0.02)"/>
            <circle cx="6" cy="6" r="1" fill="rgba(255,255,255,0.1)"/>
            <circle cx="18" cy="10" r="0.8" fill="rgba(255,255,255,0.08)"/>
            <circle cx="12" cy="18" r="1.2" fill="rgba(255,255,255,0.12)"/>
            <line x1="0" y1="12" x2="24" y2="12" stroke="rgba(255,255,255,0.06)" stroke-width="0.5" opacity="0.5"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#recycled)"/>
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
          <pattern id="rough" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="7" cy="7" r="1.5" fill="rgba(255,255,255,0.2)"/>
            <circle cx="7" cy="7" r="0.8" fill="rgba(255,255,255,0.15)"/>
            <circle cx="21" cy="14" r="1.2" fill="rgba(255,255,255,0.18)"/>
            <circle cx="14" cy="21" r="1" fill="rgba(255,255,255,0.16)"/>
            <line x1="0" y1="14" x2="28" y2="14" stroke="rgba(255,255,255,0.12)" stroke-width="0.8"/>
            <line x1="14" y1="0" x2="14" y2="28" stroke="rgba(255,255,255,0.1)" stroke-width="0.7"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#rough)"/>
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
          <pattern id="aggregate" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="2" fill="rgba(255,255,255,0.25)"/>
            <circle cx="24" cy="12" r="1.8" fill="rgba(255,255,255,0.2)"/>
            <circle cx="16" cy="24" r="2.2" fill="rgba(255,255,255,0.22)"/>
            <circle cx="10" cy="20" r="1.5" fill="rgba(255,255,255,0.18)"/>
            <polygon points="28,4 30,8 26,10" fill="rgba(255,255,255,0.15)"/>
            <line x1="0" y1="16" x2="32" y2="16" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#aggregate)"/>
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
            <rect x="0" y="0" width="64" height="64" fill="none" stroke="#ffffff" stroke-width="1" opacity="1"/>
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
 * Converts rgba() syntax to proper SVG fill + opacity attributes
 */
export function getTextureDataUrl(textureId: TextureId): string {
  const texture = TEXTURE_LIBRARY[textureId];
  if (!texture || !texture.svgContent) {
    return "";
  }

  let svgContent = texture.svgContent.trim();

  // Convert rgba(255,255,255,opacity) to fill="#ffffff" opacity="opacity"
  svgContent = svgContent.replace(/rgba\(255\s*,\s*255\s*,\s*255\s*,\s*([\d.]+)\)/g, (_match, opacity) => {
    return `fill="#ffffff" opacity="${opacity}"`;
  });

  const encoded = encodeURIComponent(svgContent);
  return `data:image/svg+xml,${encoded}`;
}
