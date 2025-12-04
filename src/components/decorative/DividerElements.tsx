import React from 'react';
import type { DividerElementProps } from './types';

/**
 * Divider decorative elements
 */

export const HorizontalDivider: React.FC<DividerElementProps> = ({
  color = '#000000',
  thickness = 2,
  length = 200,
  className = '',
}) => {
  return (
    <svg
      width={length}
      height={thickness}
      viewBox={`0 0 ${length} ${thickness}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0"
        y1={thickness / 2}
        x2={length}
        y2={thickness / 2}
        stroke={color}
        strokeWidth={thickness}
      />
    </svg>
  );
};

export const VerticalDivider: React.FC<DividerElementProps> = ({
  color = '#000000',
  thickness = 2,
  length = 200,
  className = '',
}) => {
  return (
    <svg
      width={thickness}
      height={length}
      viewBox={`0 0 ${thickness} ${length}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1={thickness / 2}
        y1="0"
        x2={thickness / 2}
        y2={length}
        stroke={color}
        strokeWidth={thickness}
      />
    </svg>
  );
};

export const DiagonalDivider: React.FC<DividerElementProps> = ({
  color = '#000000',
  thickness = 2,
  length = 200,
  className = '',
}) => {
  return (
    <svg
      width={length}
      height={length}
      viewBox={`0 0 ${length} ${length}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0"
        y1="0"
        x2={length}
        y2={length}
        stroke={color}
        strokeWidth={thickness}
      />
    </svg>
  );
};

export const CurvedDivider: React.FC<DividerElementProps> = ({
  color = '#000000',
  thickness = 2,
  length = 200,
  className = '',
}) => {
  const height = length * 0.15;
  const path = `M 0 ${height} Q ${length / 2} 0 ${length} ${height}`;

  return (
    <svg
      width={length}
      height={height + thickness}
      viewBox={`0 0 ${length} ${height + thickness}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={path}
        stroke={color}
        strokeWidth={thickness}
        fill="none"
      />
    </svg>
  );
};

export const SteppedDivider: React.FC<DividerElementProps> = ({
  color = '#000000',
  thickness = 2,
  length = 200,
  className = '',
}) => {
  const stepWidth = length / 5;
  const stepHeight = 15;

  let path = `M 0 ${stepHeight}`;
  for (let i = 0; i < 5; i++) {
    const x = i * stepWidth;
    const y = i % 2 === 0 ? 0 : stepHeight;
    path += ` L ${x} ${y}`;
    path += ` L ${x + stepWidth} ${y}`;
  }

  return (
    <svg
      width={length}
      height={stepHeight + thickness}
      viewBox={`0 0 ${length} ${stepHeight + thickness}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={path}
        stroke={color}
        strokeWidth={thickness}
        fill="none"
        strokeLinejoin="miter"
      />
    </svg>
  );
};

export const WaveDivider: React.FC<DividerElementProps> = ({
  color = '#000000',
  thickness = 2,
  length = 200,
  className = '',
}) => {
  const amplitude = 20;
  const frequency = 50;
  const height = amplitude * 2;

  let path = `M 0 ${amplitude}`;
  for (let x = 0; x <= length; x += 5) {
    const y = amplitude + amplitude * Math.sin((x / frequency) * Math.PI * 2);
    path += ` L ${x} ${y}`;
  }

  return (
    <svg
      width={length}
      height={height + thickness}
      viewBox={`0 0 ${length} ${height + thickness}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={path}
        stroke={color}
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const DecoratedDivider: React.FC<DividerElementProps> = ({
  color = '#000000',
  thickness = 2,
  length = 200,
  className = '',
}) => {
  const centerY = 15;
  const lineY = centerY;
  const circleRadius = 8;
  const diamondSize = 10;

  return (
    <svg
      width={length}
      height={centerY * 2}
      viewBox={`0 0 ${length} ${centerY * 2}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left line */}
      <line
        x1="0"
        y1={lineY}
        x2={length * 0.35}
        y2={lineY}
        stroke={color}
        strokeWidth={thickness}
      />

      {/* Center circle */}
      <circle
        cx={length / 2}
        cy={centerY}
        r={circleRadius}
        stroke={color}
        strokeWidth={thickness}
        fill="none"
      />

      {/* Right line */}
      <line
        x1={length * 0.65}
        y1={lineY}
        x2={length}
        y2={lineY}
        stroke={color}
        strokeWidth={thickness}
      />
    </svg>
  );
};
