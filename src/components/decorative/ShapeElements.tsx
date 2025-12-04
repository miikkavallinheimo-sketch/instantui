import React from 'react';
import type { ShapeElementProps } from './types';

/**
 * Geometric shape elements
 */

export const CircleShape: React.FC<ShapeElementProps> = ({
  color = '#000000',
  size = 50,
  filled = false,
  strokeWidth = 2,
  className = '',
}) => {
  const radius = (size - strokeWidth) / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill={filled ? color : 'none'}
      />
    </svg>
  );
};

export const SquareShape: React.FC<ShapeElementProps> = ({
  color = '#000000',
  size = 50,
  filled = false,
  strokeWidth = 2,
  className = '',
}) => {
  const rectSize = size - strokeWidth;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        width={rectSize}
        height={rectSize}
        stroke={color}
        strokeWidth={strokeWidth}
        fill={filled ? color : 'none'}
      />
    </svg>
  );
};

export const TriangleShape: React.FC<ShapeElementProps> = ({
  color = '#000000',
  size = 50,
  filled = false,
  strokeWidth = 2,
  className = '',
}) => {
  const points = `${size / 2},${strokeWidth} ${size - strokeWidth},${size - strokeWidth} ${strokeWidth},${size - strokeWidth}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points={points}
        stroke={color}
        strokeWidth={strokeWidth}
        fill={filled ? color : 'none'}
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const HexagonShape: React.FC<ShapeElementProps> = ({
  color = '#000000',
  size = 50,
  filled = false,
  strokeWidth = 2,
  className = '',
}) => {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = (size - strokeWidth) / 2;

  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points={points}
        stroke={color}
        strokeWidth={strokeWidth}
        fill={filled ? color : 'none'}
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const StarShape: React.FC<ShapeElementProps> = ({
  color = '#000000',
  size = 50,
  filled = false,
  strokeWidth = 2,
  className = '',
}) => {
  const centerX = size / 2;
  const centerY = size / 2;
  const outerRadius = (size - strokeWidth) / 2;
  const innerRadius = outerRadius * 0.4;

  const points = Array.from({ length: 10 }, (_, i) => {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points={points}
        stroke={color}
        strokeWidth={strokeWidth}
        fill={filled ? color : 'none'}
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AbstractShape1: React.FC<ShapeElementProps> = ({
  color = '#000000',
  size = 50,
  filled = false,
  strokeWidth = 2,
  className = '',
}) => {
  // Organic blob shape
  const path = `
    M ${size * 0.5} ${size * 0.1}
    Q ${size * 0.9} ${size * 0.2}, ${size * 0.85} ${size * 0.5}
    Q ${size * 0.8} ${size * 0.8}, ${size * 0.5} ${size * 0.9}
    Q ${size * 0.2} ${size * 0.95}, ${size * 0.15} ${size * 0.6}
    Q ${size * 0.1} ${size * 0.3}, ${size * 0.5} ${size * 0.1}
    Z
  `;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={path}
        stroke={color}
        strokeWidth={strokeWidth}
        fill={filled ? color : 'none'}
      />
    </svg>
  );
};

export const AbstractShape2: React.FC<ShapeElementProps> = ({
  color = '#000000',
  size = 50,
  filled = false,
  strokeWidth = 2,
  className = '',
}) => {
  // Half moon / crescent shape
  const path = `
    M ${size * 0.7} ${size * 0.1}
    A ${size * 0.4} ${size * 0.4} 0 1 1 ${size * 0.7} ${size * 0.9}
    A ${size * 0.25} ${size * 0.25} 0 1 0 ${size * 0.7} ${size * 0.1}
    Z
  `;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={path}
        stroke={color}
        strokeWidth={strokeWidth}
        fill={filled ? color : 'none'}
      />
    </svg>
  );
};

export const AbstractShape3: React.FC<ShapeElementProps> = ({
  color = '#000000',
  size = 50,
  filled = false,
  strokeWidth = 2,
  className = '',
}) => {
  // Infinity-like shape
  const path = `
    M ${size * 0.15} ${size * 0.5}
    C ${size * 0.15} ${size * 0.25}, ${size * 0.35} ${size * 0.25}, ${size * 0.5} ${size * 0.5}
    C ${size * 0.65} ${size * 0.75}, ${size * 0.85} ${size * 0.75}, ${size * 0.85} ${size * 0.5}
    C ${size * 0.85} ${size * 0.25}, ${size * 0.65} ${size * 0.25}, ${size * 0.5} ${size * 0.5}
    C ${size * 0.35} ${size * 0.75}, ${size * 0.15} ${size * 0.75}, ${size * 0.15} ${size * 0.5}
    Z
  `;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={path}
        stroke={color}
        strokeWidth={strokeWidth}
        fill={filled ? color : 'none'}
      />
    </svg>
  );
};
