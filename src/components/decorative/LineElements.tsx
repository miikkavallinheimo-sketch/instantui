import React from 'react';
import type { LineElementProps } from './types';

/**
 * Line decorative elements - various styles of lines
 */

export const SolidLine: React.FC<LineElementProps> = ({
  color = '#000000',
  thickness = 2,
  length = 100,
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

export const DashedLine: React.FC<LineElementProps> = ({
  color = '#000000',
  thickness = 2,
  length = 100,
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
        strokeDasharray="8 4"
      />
    </svg>
  );
};

export const DottedLine: React.FC<LineElementProps> = ({
  color = '#000000',
  thickness = 2,
  length = 100,
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
        strokeDasharray="2 4"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const GradientLine: React.FC<LineElementProps> = ({
  color = '#000000',
  secondaryColor = '#888888',
  thickness = 2,
  length = 100,
  className = '',
}) => {
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      width={length}
      height={thickness}
      viewBox={`0 0 ${length} ${thickness}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>
      </defs>
      <line
        x1="0"
        y1={thickness / 2}
        x2={length}
        y2={thickness / 2}
        stroke={`url(#${gradientId})`}
        strokeWidth={thickness}
      />
    </svg>
  );
};

export const WavyLine: React.FC<LineElementProps> = ({
  color = '#000000',
  thickness = 2,
  length = 100,
  className = '',
}) => {
  const amplitude = 8;
  const frequency = 20;

  let path = `M 0 ${amplitude}`;
  for (let x = 0; x <= length; x += frequency / 4) {
    const y = amplitude + amplitude * Math.sin((x / frequency) * Math.PI * 2);
    path += ` L ${x} ${y}`;
  }

  return (
    <svg
      width={length}
      height={amplitude * 2 + thickness}
      viewBox={`0 0 ${length} ${amplitude * 2 + thickness}`}
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

export const DoubleLine: React.FC<LineElementProps> = ({
  color = '#000000',
  thickness = 2,
  length = 100,
  className = '',
}) => {
  const spacing = thickness * 2;

  return (
    <svg
      width={length}
      height={spacing + thickness}
      viewBox={`0 0 ${length} ${spacing + thickness}`}
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
      <line
        x1="0"
        y1={spacing + thickness / 2}
        x2={length}
        y2={spacing + thickness / 2}
        stroke={color}
        strokeWidth={thickness}
      />
    </svg>
  );
};

export const ZigzagLine: React.FC<LineElementProps> = ({
  color = '#000000',
  thickness = 2,
  length = 100,
  className = '',
}) => {
  const zigzagHeight = 10;
  const zigzagWidth = 15;
  const numZigzags = Math.floor(length / zigzagWidth);

  let path = 'M 0 0';
  for (let i = 0; i < numZigzags; i++) {
    const x = (i + 0.5) * zigzagWidth;
    const y = i % 2 === 0 ? zigzagHeight : 0;
    path += ` L ${x} ${y}`;

    const x2 = (i + 1) * zigzagWidth;
    const y2 = i % 2 === 0 ? 0 : zigzagHeight;
    path += ` L ${x2} ${y2}`;
  }

  return (
    <svg
      width={length}
      height={zigzagHeight + thickness}
      viewBox={`0 0 ${length} ${zigzagHeight + thickness}`}
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
