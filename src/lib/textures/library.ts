/**
 * Texture Library
 * Catalog of all available textures mapped to vibes
 */

import type { TexturePattern, VibeTextureSet, VibeId } from './types';
import * as patterns from './patterns';

/**
 * Minimalist Textures
 */
const MINIMALIST_PATTERNS: TexturePattern[] = [
  {
    id: 'minimal-fine-noise',
    name: 'Fine Noise',
    type: 'noise',
    vibes: ['minimal', 'modern-saas', 'soft-neo-tech'],
    description: 'Ultra-fine grain (1-2px), very subtle',
    svg: patterns.generateFineNoise(512),
    defaultOpacity: 0.08,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'subtle',
  },
  {
    id: 'minimal-dot-grid',
    name: 'Dot Grid',
    type: 'dots',
    vibes: ['minimal', 'modern'],
    description: 'Sparse dots, 40px spacing',
    svg: patterns.generateDotGrid(512, 40, 1),
    defaultOpacity: 0.10,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'subtle',
  },
  {
    id: 'minimal-thin-lines',
    name: 'Thin Lines',
    type: 'lines',
    vibes: ['minimal', 'professional'],
    description: 'Horizontal hairlines, 60px spacing',
    svg: patterns.generateThinLines(512, 60, 0.5),
    defaultOpacity: 0.12,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'subtle',
  },
];

/**
 * Professional Textures
 */
const PROFESSIONAL_PATTERNS: TexturePattern[] = [
  {
    id: 'professional-subtle-grid',
    name: 'Subtle Grid',
    type: 'grid',
    vibes: ['professional', 'modern-saas'],
    description: 'Light gridlines, 32px squares',
    svg: patterns.generateSubtleGrid(512, 32, 0.5),
    defaultOpacity: 0.10,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'subtle',
  },
  {
    id: 'professional-crosshatch',
    name: 'Crosshatch',
    type: 'crosshatch',
    vibes: ['professional', 'vintage'],
    description: 'Delicate diagonal lines at 45°',
    svg: patterns.generateCrosshatch(512, 20, 0.5),
    defaultOpacity: 0.08,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'subtle',
  },
  {
    id: 'professional-paper',
    name: 'Paper Texture',
    type: 'paper',
    vibes: ['professional', 'warm-editorial', 'organic'],
    description: 'Fine linen/cotton paper grain',
    svg: patterns.generatePaperTexture(512),
    defaultOpacity: 0.10,
    blendMode: 'multiply',
    tileSize: 512,
    category: 'subtle',
  },
];

/**
 * Creative Textures
 */
const CREATIVE_PATTERNS: TexturePattern[] = [
  {
    id: 'creative-paper',
    name: 'Canvas Weave',
    type: 'canvas',
    vibes: ['creative', 'warm-editorial', 'organic'],
    description: 'Artist canvas texture',
    svg: patterns.generatePaperTexture(512),
    defaultOpacity: 0.12,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'medium',
  },
  {
    id: 'creative-noise',
    name: 'Artistic Grain',
    type: 'noise',
    vibes: ['creative', 'vintage'],
    description: 'Organic paint texture',
    svg: patterns.generateFineNoise(512),
    defaultOpacity: 0.15,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'medium',
  },
];

/**
 * Playful Textures
 */
const PLAYFUL_PATTERNS: TexturePattern[] = [
  {
    id: 'playful-confetti',
    name: 'Confetti',
    type: 'confetti',
    vibes: ['playful', 'gradient-bloom'],
    description: 'Scattered shapes (circles, triangles, squares)',
    svg: patterns.generateConfetti(512, 100),
    defaultOpacity: 0.15,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'medium',
  },
  {
    id: 'playful-bubbly',
    name: 'Bubbly Dots',
    type: 'bubbly',
    vibes: ['playful', 'pastel'],
    description: 'Varied-size circles, organic placement',
    svg: patterns.generateBubblyDots(512, 80),
    defaultOpacity: 0.12,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'medium',
  },
  {
    id: 'playful-dots',
    name: 'Polka Dots',
    type: 'dots',
    vibes: ['playful', 'retro-pixel'],
    description: 'Fun dot pattern',
    svg: patterns.generateDotGrid(512, 30, 2),
    defaultOpacity: 0.14,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'medium',
  },
];

/**
 * Elegant Textures
 */
const ELEGANT_PATTERNS: TexturePattern[] = [
  {
    id: 'elegant-marble',
    name: 'Marble Veins',
    type: 'marble',
    vibes: ['elegant', 'luxury'],
    description: 'Delicate marble-like streaks',
    svg: patterns.generateMarble(512),
    defaultOpacity: 0.08,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'subtle',
  },
  {
    id: 'elegant-linen',
    name: 'Fine Linen',
    type: 'linen',
    vibes: ['elegant', 'luxury', 'warm-editorial'],
    description: 'High-quality fabric weave',
    svg: patterns.generatePaperTexture(512),
    defaultOpacity: 0.10,
    blendMode: 'soft-light',
    tileSize: 512,
    category: 'subtle',
  },
  {
    id: 'elegant-silk',
    name: 'Silk Texture',
    type: 'silk',
    vibes: ['elegant', 'luxury'],
    description: 'Smooth fabric with subtle sheen',
    svg: patterns.generateFineNoise(512),
    defaultOpacity: 0.06,
    blendMode: 'soft-light',
    tileSize: 512,
    category: 'subtle',
  },
];

/**
 * Bold Textures
 */
const BOLD_PATTERNS: TexturePattern[] = [
  {
    id: 'bold-concrete',
    name: 'Concrete',
    type: 'concrete',
    vibes: ['bold', 'brutalist', 'dark-tech'],
    description: 'Industrial concrete texture',
    svg: patterns.generateConcrete(512),
    defaultOpacity: 0.18,
    blendMode: 'multiply',
    tileSize: 512,
    category: 'bold',
  },
  {
    id: 'bold-halftone',
    name: 'Halftone',
    type: 'halftone',
    vibes: ['bold', 'vintage', 'retro-pixel'],
    description: 'Bold dot pattern, varying sizes',
    svg: patterns.generateHalftone(512, 16),
    defaultOpacity: 0.15,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'bold',
  },
  {
    id: 'bold-grid',
    name: 'Bold Grid',
    type: 'grid',
    vibes: ['bold', 'brutalist'],
    description: 'Strong geometric grid',
    svg: patterns.generateSubtleGrid(512, 40, 1.5),
    defaultOpacity: 0.20,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'bold',
  },
];

/**
 * Vintage Textures
 */
const VINTAGE_PATTERNS: TexturePattern[] = [
  {
    id: 'vintage-film-grain',
    name: 'Film Grain',
    type: 'film-grain',
    vibes: ['vintage', 'warm-editorial'],
    description: '35mm film-style grain',
    svg: patterns.generateFilmGrain(512),
    defaultOpacity: 0.12,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'medium',
  },
  {
    id: 'vintage-halftone',
    name: 'Halftone Print',
    type: 'print',
    vibes: ['vintage', 'retro-pixel'],
    description: 'Vintage newsprint texture',
    svg: patterns.generateHalftone(512, 20),
    defaultOpacity: 0.14,
    blendMode: 'multiply',
    tileSize: 512,
    category: 'medium',
  },
  {
    id: 'vintage-paper',
    name: 'Aged Paper',
    type: 'aged-paper',
    vibes: ['vintage', 'warm-editorial'],
    description: 'Old paper with character',
    svg: patterns.generatePaperTexture(512),
    defaultOpacity: 0.16,
    blendMode: 'multiply',
    tileSize: 512,
    category: 'medium',
  },
];

/**
 * Modern Textures
 */
const MODERN_PATTERNS: TexturePattern[] = [
  {
    id: 'modern-hexagon',
    name: 'Hexagon Grid',
    type: 'hexagon',
    vibes: ['modern', 'dark-tech', 'cyber-mint'],
    description: 'Geometric hex pattern, thin lines',
    svg: patterns.generateHexagonGrid(512, 30, 1),
    defaultOpacity: 0.12,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'medium',
  },
  {
    id: 'modern-circuit',
    name: 'Circuit Lines',
    type: 'circuit',
    vibes: ['modern', 'dark-tech', 'cyber-mint'],
    description: 'Tech-inspired linear pattern',
    svg: patterns.generateCircuit(512),
    defaultOpacity: 0.10,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'medium',
  },
  {
    id: 'modern-mesh',
    name: 'Mesh Noise',
    type: 'mesh',
    vibes: ['modern', 'soft-neo-tech'],
    description: 'Digital noise with structure',
    svg: patterns.generateFineNoise(512),
    defaultOpacity: 0.10,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'subtle',
  },
];

/**
 * Organic Textures
 */
const ORGANIC_PATTERNS: TexturePattern[] = [
  {
    id: 'organic-watercolor',
    name: 'Watercolor',
    type: 'watercolor',
    vibes: ['organic', 'pastel', 'warm-editorial'],
    description: 'Soft watercolor wash',
    svg: patterns.generateWatercolor(512),
    defaultOpacity: 0.12,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'medium',
  },
  {
    id: 'organic-paper',
    name: 'Recycled Paper',
    type: 'recycled',
    vibes: ['organic', 'warm-editorial'],
    description: 'Eco-friendly paper with fibers',
    svg: patterns.generatePaperTexture(512),
    defaultOpacity: 0.14,
    blendMode: 'multiply',
    tileSize: 512,
    category: 'medium',
  },
];

/**
 * Brutalist Textures
 */
const BRUTALIST_PATTERNS: TexturePattern[] = [
  {
    id: 'brutalist-rough-concrete',
    name: 'Rough Concrete',
    type: 'rough-concrete',
    vibes: ['brutalist', 'magazine-brutalism'],
    description: 'Heavy concrete texture',
    svg: patterns.generateConcrete(512),
    defaultOpacity: 0.20,
    blendMode: 'multiply',
    tileSize: 512,
    category: 'bold',
  },
  {
    id: 'brutalist-grid',
    name: 'Architectural Grid',
    type: 'architectural-grid',
    vibes: ['brutalist', 'magazine-brutalism'],
    description: 'Stark architectural grid',
    svg: patterns.generateArchitecturalGrid(512),
    defaultOpacity: 0.18,
    blendMode: 'overlay',
    tileSize: 512,
    category: 'bold',
  },
];

/**
 * All patterns combined
 */
export const ALL_PATTERNS: TexturePattern[] = [
  ...MINIMALIST_PATTERNS,
  ...PROFESSIONAL_PATTERNS,
  ...CREATIVE_PATTERNS,
  ...PLAYFUL_PATTERNS,
  ...ELEGANT_PATTERNS,
  ...BOLD_PATTERNS,
  ...VINTAGE_PATTERNS,
  ...MODERN_PATTERNS,
  ...ORGANIC_PATTERNS,
  ...BRUTALIST_PATTERNS,
];

/**
 * Get patterns for a specific vibe
 */
export function getPatternsForVibe(vibeId: VibeId): TexturePattern[] {
  return ALL_PATTERNS.filter(pattern => pattern.vibes.includes(vibeId));
}

/**
 * Get a specific pattern by ID
 */
export function getPatternById(id: string): TexturePattern | undefined {
  return ALL_PATTERNS.find(pattern => pattern.id === id);
}

/**
 * Vibe texture sets with recommended patterns
 */
export const VIBE_TEXTURE_SETS: Record<VibeId, VibeTextureSet> = {
  'minimal': {
    vibeId: 'minimal',
    vibeName: 'Minimal',
    patterns: MINIMALIST_PATTERNS,
    recommended: 'minimal-fine-noise',
  },
  'professional': {
    vibeId: 'professional',
    vibeName: 'Professional',
    patterns: PROFESSIONAL_PATTERNS,
    recommended: 'professional-subtle-grid',
  },
  'creative': {
    vibeId: 'creative',
    vibeName: 'Creative',
    patterns: CREATIVE_PATTERNS,
    recommended: 'creative-paper',
  },
  'playful': {
    vibeId: 'playful',
    vibeName: 'Playful',
    patterns: PLAYFUL_PATTERNS,
    recommended: 'playful-confetti',
  },
  'elegant': {
    vibeId: 'elegant',
    vibeName: 'Elegant',
    patterns: ELEGANT_PATTERNS,
    recommended: 'elegant-marble',
  },
  'luxury': {
    vibeId: 'luxury',
    vibeName: 'Luxury',
    patterns: ELEGANT_PATTERNS,
    recommended: 'elegant-silk',
  },
  'bold': {
    vibeId: 'bold',
    vibeName: 'Bold',
    patterns: BOLD_PATTERNS,
    recommended: 'bold-concrete',
  },
  'vintage': {
    vibeId: 'vintage',
    vibeName: 'Vintage',
    patterns: VINTAGE_PATTERNS,
    recommended: 'vintage-film-grain',
  },
  'modern': {
    vibeId: 'modern',
    vibeName: 'Modern',
    patterns: MODERN_PATTERNS,
    recommended: 'modern-hexagon',
  },
  'modern-saas': {
    vibeId: 'modern-saas',
    vibeName: 'Modern SaaS',
    patterns: [...MINIMALIST_PATTERNS, ...MODERN_PATTERNS],
    recommended: 'minimal-fine-noise',
  },
  'dark-tech': {
    vibeId: 'dark-tech',
    vibeName: 'Dark Tech',
    patterns: [...MODERN_PATTERNS, ...BOLD_PATTERNS],
    recommended: 'modern-circuit',
  },
  'organic': {
    vibeId: 'organic',
    vibeName: 'Organic',
    patterns: ORGANIC_PATTERNS,
    recommended: 'organic-watercolor',
  },
  'brutalist': {
    vibeId: 'brutalist',
    vibeName: 'Brutalist',
    patterns: BRUTALIST_PATTERNS,
    recommended: 'brutalist-rough-concrete',
  },
  'pastel': {
    vibeId: 'pastel',
    vibeName: 'Pastel',
    patterns: [...ORGANIC_PATTERNS, ...PLAYFUL_PATTERNS],
    recommended: 'organic-watercolor',
  },
  'retro-pixel': {
    vibeId: 'retro-pixel',
    vibeName: 'Retro Pixel',
    patterns: [...VINTAGE_PATTERNS, ...PLAYFUL_PATTERNS],
    recommended: 'vintage-halftone',
  },
  'warm-editorial': {
    vibeId: 'warm-editorial',
    vibeName: 'Warm Editorial',
    patterns: [...PROFESSIONAL_PATTERNS, ...VINTAGE_PATTERNS, ...ORGANIC_PATTERNS],
    recommended: 'professional-paper',
  },
  'soft-neo-tech': {
    vibeId: 'soft-neo-tech',
    vibeName: 'Soft Neo Tech',
    patterns: [...MODERN_PATTERNS, ...MINIMALIST_PATTERNS],
    recommended: 'modern-mesh',
  },
  'gradient-bloom': {
    vibeId: 'gradient-bloom',
    vibeName: 'Gradient Bloom',
    patterns: [...PLAYFUL_PATTERNS, ...ORGANIC_PATTERNS],
    recommended: 'organic-watercolor',
  },
  'cyber-mint': {
    vibeId: 'cyber-mint',
    vibeName: 'Cyber Mint',
    patterns: [...MODERN_PATTERNS, ...BOLD_PATTERNS],
    recommended: 'modern-hexagon',
  },
  'magazine-brutalism': {
    vibeId: 'magazine-brutalism',
    vibeName: 'Magazine Brutalism',
    patterns: BRUTALIST_PATTERNS,
    recommended: 'brutalist-grid',
  },
  'dark': {
    vibeId: 'dark',
    vibeName: 'Dark',
    patterns: [...MODERN_PATTERNS, ...BOLD_PATTERNS],
    recommended: 'modern-circuit',
  },
};
