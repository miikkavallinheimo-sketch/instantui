import React from 'react';
import type { PatternElementProps } from './types';

/**
 * Background pattern elements
 */

export const DotsPattern: React.FC<PatternElementProps> = ({
  color = '#000000',
  density = 20,
  opacity = 0.5,
  width = 200,
  height = 200,
  className = '',
}) => {
  const patternId = `dots-${Math.random().toString(36).substr(2, 9)}`;
  const dotRadius = 2;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={density}
          height={density}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={density / 2}
            cy={density / 2}
            r={dotRadius}
            fill={color}
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${patternId})`} />
    </svg>
  );
};

export const GridPattern: React.FC<PatternElementProps> = ({
  color = '#000000',
  density = 20,
  opacity = 0.3,
  width = 200,
  height = 200,
  className = '',
}) => {
  const patternId = `grid-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={density}
          height={density}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${density} 0 L 0 0 0 ${density}`}
            fill="none"
            stroke={color}
            strokeWidth="1"
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${patternId})`} />
    </svg>
  );
};

export const DiagonalLinesPattern: React.FC<PatternElementProps> = ({
  color = '#000000',
  density = 15,
  opacity = 0.3,
  width = 200,
  height = 200,
  className = '',
}) => {
  const patternId = `diagonal-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={density}
          height={density}
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1={density}
            x2={density}
            y2="0"
            stroke={color}
            strokeWidth="1"
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${patternId})`} />
    </svg>
  );
};

export const CirclesPattern: React.FC<PatternElementProps> = ({
  color = '#000000',
  density = 30,
  opacity = 0.2,
  width = 200,
  height = 200,
  className = '',
}) => {
  const patternId = `circles-${Math.random().toString(36).substr(2, 9)}`;
  const circleRadius = density * 0.35;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={density}
          height={density}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={density / 2}
            cy={density / 2}
            r={circleRadius}
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${patternId})`} />
    </svg>
  );
};

export const SquaresPattern: React.FC<PatternElementProps> = ({
  color = '#000000',
  density = 25,
  opacity = 0.2,
  width = 200,
  height = 200,
  className = '',
}) => {
  const patternId = `squares-${Math.random().toString(36).substr(2, 9)}`;
  const squareSize = density * 0.6;
  const offset = (density - squareSize) / 2;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={density}
          height={density}
          patternUnits="userSpaceOnUse"
        >
          <rect
            x={offset}
            y={offset}
            width={squareSize}
            height={squareSize}
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${patternId})`} />
    </svg>
  );
};

export const HoneycombPattern: React.FC<PatternElementProps> = ({
  color = '#000000',
  density = 30,
  opacity = 0.25,
  width = 200,
  height = 200,
  className = '',
}) => {
  const patternId = `honeycomb-${Math.random().toString(36).substr(2, 9)}`;
  const hexRadius = density * 0.4;
  const hexHeight = hexRadius * 2;
  const hexWidth = hexRadius * Math.sqrt(3);

  // Create hexagon points
  const hexPoints = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    const x = hexWidth / 2 + hexRadius * Math.cos(angle);
    const y = hexHeight / 2 + hexRadius * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={hexWidth}
          height={hexHeight * 0.75}
          patternUnits="userSpaceOnUse"
        >
          <polygon
            points={hexPoints}
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${patternId})`} />
    </svg>
  );
};

export const CrossHatchPattern: React.FC<PatternElementProps> = ({
  color = '#000000',
  density = 15,
  opacity = 0.3,
  width = 200,
  height = 200,
  className = '',
}) => {
  const patternId = `crosshatch-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={density}
          height={density}
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2={density}
            y2={density}
            stroke={color}
            strokeWidth="1"
            opacity={opacity}
          />
          <line
            x1="0"
            y1={density}
            x2={density}
            y2="0"
            stroke={color}
            strokeWidth="1"
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${patternId})`} />
    </svg>
  );
};
