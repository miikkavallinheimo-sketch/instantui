/**
 * Decorative Elements Library
 * A comprehensive collection of SVG-based decorative elements
 */

// Export types
export * from './types';

// Export line elements
export {
  SolidLine,
  DashedLine,
  DottedLine,
  GradientLine,
  WavyLine,
  DoubleLine,
  ZigzagLine,
} from './LineElements';

// Export shape elements
export {
  CircleShape,
  SquareShape,
  TriangleShape,
  HexagonShape,
  StarShape,
  AbstractShape1,
  AbstractShape2,
  AbstractShape3,
} from './ShapeElements';

// Export corner elements
export {
  BracketCorner,
  CurveCorner,
  OrnamentalCorner,
  MinimalCorner,
  BoldCorner,
  FloralCorner,
} from './CornerElements';

// Export divider elements
export {
  HorizontalDivider,
  VerticalDivider,
  DiagonalDivider,
  CurvedDivider,
  SteppedDivider,
  WaveDivider,
  DecoratedDivider,
} from './DividerElements';

// Export pattern elements
export {
  DotsPattern,
  GridPattern,
  DiagonalLinesPattern,
  CirclesPattern,
  SquaresPattern,
  HoneycombPattern,
  CrossHatchPattern,
} from './PatternElements';

// Export utilities
export * from './svgExport';

// Import components for catalog
import {
  SolidLine,
  DashedLine,
  DottedLine,
  GradientLine,
  WavyLine,
  DoubleLine,
  ZigzagLine,
} from './LineElements';

import {
  CircleShape,
  SquareShape,
  TriangleShape,
  HexagonShape,
  StarShape,
  AbstractShape1,
  AbstractShape2,
  AbstractShape3,
} from './ShapeElements';

import {
  BracketCorner,
  CurveCorner,
  OrnamentalCorner,
  MinimalCorner,
  BoldCorner,
  FloralCorner,
} from './CornerElements';

import {
  HorizontalDivider,
  VerticalDivider,
  DiagonalDivider,
  CurvedDivider,
  SteppedDivider,
  WaveDivider,
  DecoratedDivider,
} from './DividerElements';

import {
  DotsPattern,
  GridPattern,
  DiagonalLinesPattern,
  CirclesPattern,
  SquaresPattern,
  HoneycombPattern,
  CrossHatchPattern,
} from './PatternElements';

import type { DecorativeElement } from './types';

/**
 * Complete catalog of all decorative elements
 * Organized by category for easy browsing
 */
export const DECORATIVE_ELEMENTS_CATALOG: Record<string, DecorativeElement[]> = {
  lines: [
    {
      id: 'solid-line',
      name: 'Solid Line',
      category: 'line',
      component: SolidLine,
      props: { style: 'solid', length: 150 },
      previewSize: { width: 150, height: 4 },
    },
    {
      id: 'dashed-line',
      name: 'Dashed Line',
      category: 'line',
      component: DashedLine,
      props: { style: 'dashed', length: 150 },
      previewSize: { width: 150, height: 4 },
    },
    {
      id: 'dotted-line',
      name: 'Dotted Line',
      category: 'line',
      component: DottedLine,
      props: { style: 'dotted', length: 150 },
      previewSize: { width: 150, height: 4 },
    },
    {
      id: 'gradient-line',
      name: 'Gradient Line',
      category: 'line',
      component: GradientLine,
      props: { style: 'gradient', length: 150 },
      previewSize: { width: 150, height: 4 },
    },
    {
      id: 'wavy-line',
      name: 'Wavy Line',
      category: 'line',
      component: WavyLine,
      props: { style: 'wavy', length: 150 },
      previewSize: { width: 150, height: 24 },
    },
    {
      id: 'double-line',
      name: 'Double Line',
      category: 'line',
      component: DoubleLine,
      props: { style: 'double', length: 150 },
      previewSize: { width: 150, height: 8 },
    },
    {
      id: 'zigzag-line',
      name: 'Zigzag Line',
      category: 'line',
      component: ZigzagLine,
      props: { style: 'zigzag', length: 150 },
      previewSize: { width: 150, height: 14 },
    },
  ],
  shapes: [
    {
      id: 'circle',
      name: 'Circle',
      category: 'shape',
      component: CircleShape,
      props: { type: 'circle', size: 60 },
      previewSize: { width: 60, height: 60 },
    },
    {
      id: 'square',
      name: 'Square',
      category: 'shape',
      component: SquareShape,
      props: { type: 'square', size: 60 },
      previewSize: { width: 60, height: 60 },
    },
    {
      id: 'triangle',
      name: 'Triangle',
      category: 'shape',
      component: TriangleShape,
      props: { type: 'triangle', size: 60 },
      previewSize: { width: 60, height: 60 },
    },
    {
      id: 'hexagon',
      name: 'Hexagon',
      category: 'shape',
      component: HexagonShape,
      props: { type: 'hexagon', size: 60 },
      previewSize: { width: 60, height: 60 },
    },
    {
      id: 'star',
      name: 'Star',
      category: 'shape',
      component: StarShape,
      props: { type: 'star', size: 60 },
      previewSize: { width: 60, height: 60 },
    },
    {
      id: 'abstract-1',
      name: 'Abstract Blob',
      category: 'shape',
      component: AbstractShape1,
      props: { type: 'abstract-1', size: 60 },
      previewSize: { width: 60, height: 60 },
    },
    {
      id: 'abstract-2',
      name: 'Crescent',
      category: 'shape',
      component: AbstractShape2,
      props: { type: 'abstract-2', size: 60 },
      previewSize: { width: 60, height: 60 },
    },
    {
      id: 'abstract-3',
      name: 'Infinity',
      category: 'shape',
      component: AbstractShape3,
      props: { type: 'abstract-3', size: 60 },
      previewSize: { width: 60, height: 60 },
    },
  ],
  corners: [
    {
      id: 'bracket-corner',
      name: 'Bracket',
      category: 'corner',
      component: BracketCorner,
      props: { style: 'bracket', size: 60 },
      previewSize: { width: 60, height: 60 },
    },
    {
      id: 'curve-corner',
      name: 'Curve',
      category: 'corner',
      component: CurveCorner,
      props: { style: 'curve', size: 60 },
      previewSize: { width: 60, height: 60 },
    },
    {
      id: 'ornamental-corner',
      name: 'Ornamental',
      category: 'corner',
      component: OrnamentalCorner,
      props: { style: 'ornamental', size: 60 },
      previewSize: { width: 60, height: 60 },
    },
    {
      id: 'minimal-corner',
      name: 'Minimal',
      category: 'corner',
      component: MinimalCorner,
      props: { style: 'minimal', size: 60 },
      previewSize: { width: 60, height: 60 },
    },
    {
      id: 'bold-corner',
      name: 'Bold',
      category: 'corner',
      component: BoldCorner,
      props: { style: 'bold', size: 60 },
      previewSize: { width: 60, height: 60 },
    },
    {
      id: 'floral-corner',
      name: 'Floral',
      category: 'corner',
      component: FloralCorner,
      props: { style: 'floral', size: 60 },
      previewSize: { width: 60, height: 60 },
    },
  ],
  dividers: [
    {
      id: 'horizontal-divider',
      name: 'Horizontal',
      category: 'divider',
      component: HorizontalDivider,
      props: { style: 'horizontal', length: 150 },
      previewSize: { width: 150, height: 4 },
    },
    {
      id: 'vertical-divider',
      name: 'Vertical',
      category: 'divider',
      component: VerticalDivider,
      props: { style: 'vertical', length: 60 },
      previewSize: { width: 4, height: 60 },
    },
    {
      id: 'diagonal-divider',
      name: 'Diagonal',
      category: 'divider',
      component: DiagonalDivider,
      props: { style: 'diagonal', length: 60 },
      previewSize: { width: 60, height: 60 },
    },
    {
      id: 'curved-divider',
      name: 'Curved',
      category: 'divider',
      component: CurvedDivider,
      props: { style: 'curved', length: 150 },
      previewSize: { width: 150, height: 30 },
    },
    {
      id: 'stepped-divider',
      name: 'Stepped',
      category: 'divider',
      component: SteppedDivider,
      props: { style: 'stepped', length: 150 },
      previewSize: { width: 150, height: 20 },
    },
    {
      id: 'wave-divider',
      name: 'Wave',
      category: 'divider',
      component: WaveDivider,
      props: { style: 'wave', length: 150 },
      previewSize: { width: 150, height: 44 },
    },
    {
      id: 'decorated-divider',
      name: 'Decorated',
      category: 'divider',
      component: DecoratedDivider,
      props: { style: 'horizontal', length: 150 },
      previewSize: { width: 150, height: 30 },
    },
  ],
  patterns: [
    {
      id: 'dots-pattern',
      name: 'Dots',
      category: 'pattern',
      component: DotsPattern,
      props: { type: 'dots', width: 120, height: 120 },
      previewSize: { width: 120, height: 120 },
    },
    {
      id: 'grid-pattern',
      name: 'Grid',
      category: 'pattern',
      component: GridPattern,
      props: { type: 'grid', width: 120, height: 120 },
      previewSize: { width: 120, height: 120 },
    },
    {
      id: 'diagonal-lines-pattern',
      name: 'Diagonal Lines',
      category: 'pattern',
      component: DiagonalLinesPattern,
      props: { type: 'diagonal-lines', width: 120, height: 120 },
      previewSize: { width: 120, height: 120 },
    },
    {
      id: 'circles-pattern',
      name: 'Circles',
      category: 'pattern',
      component: CirclesPattern,
      props: { type: 'circles', width: 120, height: 120 },
      previewSize: { width: 120, height: 120 },
    },
    {
      id: 'squares-pattern',
      name: 'Squares',
      category: 'pattern',
      component: SquaresPattern,
      props: { type: 'squares', width: 120, height: 120 },
      previewSize: { width: 120, height: 120 },
    },
    {
      id: 'honeycomb-pattern',
      name: 'Honeycomb',
      category: 'pattern',
      component: HoneycombPattern,
      props: { type: 'honeycomb', width: 120, height: 120 },
      previewSize: { width: 120, height: 120 },
    },
    {
      id: 'crosshatch-pattern',
      name: 'Cross Hatch',
      category: 'pattern',
      component: CrossHatchPattern,
      props: { type: 'cross-hatch', width: 120, height: 120 },
      previewSize: { width: 120, height: 120 },
    },
  ],
};

/**
 * Get all elements as a flat array
 */
export const getAllElements = (): DecorativeElement[] => {
  return Object.values(DECORATIVE_ELEMENTS_CATALOG).flat();
};

/**
 * Get elements by category
 */
export const getElementsByCategory = (
  category: 'line' | 'shape' | 'corner' | 'divider' | 'pattern'
): DecorativeElement[] => {
  return getAllElements().filter((el) => el.category === category);
};

/**
 * Get element by ID
 */
export const getElementById = (id: string): DecorativeElement | undefined => {
  return getAllElements().find((el) => el.id === id);
};
