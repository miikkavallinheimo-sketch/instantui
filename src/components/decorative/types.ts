/**
 * Types and interfaces for decorative elements
 */

export type LineStyle = 'solid' | 'dashed' | 'dotted' | 'gradient' | 'wavy' | 'double' | 'zigzag';
export type ShapeType = 'circle' | 'square' | 'triangle' | 'hexagon' | 'star' | 'abstract-1' | 'abstract-2' | 'abstract-3';
export type CornerStyle = 'bracket' | 'curve' | 'ornamental' | 'minimal' | 'bold' | 'floral';
export type DividerStyle = 'horizontal' | 'vertical' | 'diagonal' | 'curved' | 'stepped' | 'wave';
export type PatternType = 'dots' | 'grid' | 'diagonal-lines' | 'circles' | 'squares' | 'honeycomb' | 'cross-hatch';

export interface BaseElementProps {
  color?: string;
  secondaryColor?: string;
  size?: number;
  className?: string;
}

export interface LineElementProps extends BaseElementProps {
  style: LineStyle;
  thickness?: number;
  length?: number;
}

export interface ShapeElementProps extends BaseElementProps {
  type: ShapeType;
  filled?: boolean;
  strokeWidth?: number;
}

export interface CornerElementProps extends BaseElementProps {
  style: CornerStyle;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  thickness?: number;
}

export interface DividerElementProps extends BaseElementProps {
  style: DividerStyle;
  thickness?: number;
  length?: number;
}

export interface PatternElementProps extends BaseElementProps {
  type: PatternType;
  density?: number;
  opacity?: number;
  width?: number;
  height?: number;
}

export interface DecorativeElement {
  id: string;
  name: string;
  category: 'line' | 'shape' | 'corner' | 'divider' | 'pattern';
  component: React.FC<any>;
  props: any;
  previewSize?: { width: number; height: number };
}
