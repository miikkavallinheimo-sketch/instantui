/**
 * Design Algorithm Types
 * Type definitions for the automatic layout generation system
 */

export interface Point {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface Spacing {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface LayoutElement {
  id: string;
  type: 'heading' | 'subheading' | 'body' | 'image' | 'logo' | 'button' | 'divider' | 'shape' | 'pattern';
  position: Point;
  dimensions: Dimensions;
  spacing: Spacing;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  alignment: 'left' | 'center' | 'right';
  zIndex: number;
  content?: string;
  importance: number; // 1-10, affects hierarchy
}

export interface GridSystem {
  columns: number;
  rows: number;
  gutterX: number;
  gutterY: number;
  margin: Spacing;
}

export interface LayoutConstraints {
  minWhitespace: number; // Percentage of total area
  maxElements: number;
  minElementSpacing: number;
  scaleRatios: number[]; // e.g., [1, 1.5, 2, 3]
  alignmentGrid: number; // Snap to grid in px
  symmetry: 'strict' | 'loose' | 'asymmetric';
  balanceWeight: number; // 0-1, how much to prioritize balance
  useGoldenRatio: boolean;
  useRuleOfThirds: boolean;
}

export interface VibeConstraints extends LayoutConstraints {
  vibeId: string;
  vibeName: string;
  primaryCharacteristics: string[];
  layoutPreferences: {
    preferredColumns: number[];
    preferredRows: number[];
    elementDensity: 'sparse' | 'moderate' | 'dense';
    decorativeElements: boolean;
  };
}

export interface BusinessCardConstraints {
  safeZone: Spacing; // in mm
  minTextSize: number; // in pt
  optimalTextSize: number; // in pt
  logoPositions: Array<'top-left' | 'top-center' | 'top-right' | 'center' | 'bottom-left' | 'bottom-center' | 'bottom-right'>;
  textHierarchy: {
    name: number; // size multiplier
    title: number;
    contact: number;
  };
  dimensions: {
    width: number; // in mm
    height: number; // in mm
  };
}

export interface LayoutScore {
  total: number; // 0-100
  breakdown: {
    hierarchy: number;
    whitespace: number;
    alignment: number;
    balance: number;
    proximity: number;
    contrast: number;
    ruleOfThirds: number;
    vibeAdherence: number;
  };
  issues: string[];
  suggestions: string[];
}

export interface GeneratedLayout {
  id: string;
  type: 'web' | 'business-card';
  vibeId: string;
  elements: LayoutElement[];
  grid: GridSystem;
  score: LayoutScore;
  metadata: {
    generatedAt: Date;
    seed: number;
    iterations: number;
  };
}

export interface DesignPrinciples {
  evaluateHierarchy: (elements: LayoutElement[]) => number;
  evaluateWhitespace: (elements: LayoutElement[], canvasSize: Dimensions) => number;
  evaluateAlignment: (elements: LayoutElement[], grid: GridSystem) => number;
  evaluateBalance: (elements: LayoutElement[], canvasSize: Dimensions) => number;
  evaluateProximity: (elements: LayoutElement[]) => number;
  evaluateContrast: (elements: LayoutElement[], backgroundColor: string) => number;
  evaluateRuleOfThirds: (elements: LayoutElement[], canvasSize: Dimensions) => number;
}

export interface LayoutGeneratorConfig {
  contentType: 'web' | 'business-card';
  vibeId: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  content: {
    heading?: string;
    subheading?: string;
    body?: string;
    contactInfo?: string[];
  };
  canvasSize: Dimensions;
  seed?: number;
}

export interface AlgorithmOptions {
  maxIterations: number;
  minScore: number;
  useGeneticAlgorithm: boolean;
  populationSize: number;
  mutationRate: number;
}
