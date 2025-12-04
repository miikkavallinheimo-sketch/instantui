import React from 'react';
import type { CornerElementProps } from './types';

/**
 * Corner decoration elements
 */

export const BracketCorner: React.FC<CornerElementProps> = ({
  color = '#000000',
  size = 50,
  thickness = 2,
  position = 'top-left',
  className = '',
}) => {
  const armLength = size * 0.4;

  let path = '';
  let transform = '';

  switch (position) {
    case 'top-left':
      path = `M ${size} 0 L 0 0 L 0 ${size}`;
      break;
    case 'top-right':
      path = `M 0 0 L ${size} 0 L ${size} ${size}`;
      break;
    case 'bottom-left':
      path = `M 0 0 L 0 ${size} L ${size} ${size}`;
      break;
    case 'bottom-right':
      path = `M ${size} 0 L ${size} ${size} L 0 ${size}`;
      break;
  }

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
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="square"
      />
    </svg>
  );
};

export const CurveCorner: React.FC<CornerElementProps> = ({
  color = '#000000',
  size = 50,
  thickness = 2,
  position = 'top-left',
  className = '',
}) => {
  let path = '';

  switch (position) {
    case 'top-left':
      path = `M ${size} 0 Q 0 0 0 ${size}`;
      break;
    case 'top-right':
      path = `M 0 0 Q ${size} 0 ${size} ${size}`;
      break;
    case 'bottom-left':
      path = `M 0 0 Q 0 ${size} ${size} ${size}`;
      break;
    case 'bottom-right':
      path = `M ${size} 0 Q ${size} ${size} 0 ${size}`;
      break;
  }

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
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const OrnamentalCorner: React.FC<CornerElementProps> = ({
  color = '#000000',
  size = 50,
  thickness = 2,
  position = 'top-left',
  className = '',
}) => {
  let path = '';
  const curve = size * 0.15;

  switch (position) {
    case 'top-left':
      path = `
        M ${size} 0
        L ${curve} 0
        Q 0 0 0 ${curve}
        L 0 ${size}
        M ${curve * 2} 0
        L ${curve * 2} ${curve * 2}
        L 0 ${curve * 2}
      `;
      break;
    case 'top-right':
      path = `
        M 0 0
        L ${size - curve} 0
        Q ${size} 0 ${size} ${curve}
        L ${size} ${size}
        M ${size - curve * 2} 0
        L ${size - curve * 2} ${curve * 2}
        L ${size} ${curve * 2}
      `;
      break;
    case 'bottom-left':
      path = `
        M 0 0
        L 0 ${size - curve}
        Q 0 ${size} ${curve} ${size}
        L ${size} ${size}
        M 0 ${size - curve * 2}
        L ${curve * 2} ${size - curve * 2}
        L ${curve * 2} ${size}
      `;
      break;
    case 'bottom-right':
      path = `
        M ${size} 0
        L ${size} ${size - curve}
        Q ${size} ${size} ${size - curve} ${size}
        L 0 ${size}
        M ${size} ${size - curve * 2}
        L ${size - curve * 2} ${size - curve * 2}
        L ${size - curve * 2} ${size}
      `;
      break;
  }

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
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const MinimalCorner: React.FC<CornerElementProps> = ({
  color = '#000000',
  size = 50,
  thickness = 2,
  position = 'top-left',
  className = '',
}) => {
  const armLength = size * 0.3;
  let path = '';

  switch (position) {
    case 'top-left':
      path = `M ${armLength} 0 L 0 0 L 0 ${armLength}`;
      break;
    case 'top-right':
      path = `M ${size - armLength} 0 L ${size} 0 L ${size} ${armLength}`;
      break;
    case 'bottom-left':
      path = `M 0 ${size - armLength} L 0 ${size} L ${armLength} ${size}`;
      break;
    case 'bottom-right':
      path = `M ${size} ${size - armLength} L ${size} ${size} L ${size - armLength} ${size}`;
      break;
  }

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
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const BoldCorner: React.FC<CornerElementProps> = ({
  color = '#000000',
  size = 50,
  thickness = 4,
  position = 'top-left',
  className = '',
}) => {
  const armLength = size * 0.5;
  let path = '';

  switch (position) {
    case 'top-left':
      path = `M ${armLength} 0 L 0 0 L 0 ${armLength}`;
      break;
    case 'top-right':
      path = `M ${size - armLength} 0 L ${size} 0 L ${size} ${armLength}`;
      break;
    case 'bottom-left':
      path = `M 0 ${size - armLength} L 0 ${size} L ${armLength} ${size}`;
      break;
    case 'bottom-right':
      path = `M ${size} ${size - armLength} L ${size} ${size} L ${size - armLength} ${size}`;
      break;
  }

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
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="square"
      />
    </svg>
  );
};

export const FloralCorner: React.FC<CornerElementProps> = ({
  color = '#000000',
  size = 50,
  thickness = 2,
  position = 'top-left',
  className = '',
}) => {
  let path = '';
  const c = size * 0.2; // control point offset

  switch (position) {
    case 'top-left':
      path = `
        M ${size * 0.5} 0
        Q ${c} 0 0 ${size * 0.5}
        M ${size * 0.3} 0
        Q ${c} ${c} 0 ${size * 0.3}
        M ${size * 0.7} 0
        C ${size * 0.4} ${c}, ${c} ${size * 0.4}, 0 ${size * 0.7}
      `;
      break;
    case 'top-right':
      path = `
        M ${size * 0.5} 0
        Q ${size - c} 0 ${size} ${size * 0.5}
        M ${size * 0.7} 0
        Q ${size - c} ${c} ${size} ${size * 0.3}
        M ${size * 0.3} 0
        C ${size * 0.6} ${c}, ${size - c} ${size * 0.4}, ${size} ${size * 0.7}
      `;
      break;
    case 'bottom-left':
      path = `
        M 0 ${size * 0.5}
        Q 0 ${size - c} ${size * 0.5} ${size}
        M 0 ${size * 0.7}
        Q ${c} ${size - c} ${size * 0.3} ${size}
        M 0 ${size * 0.3}
        C ${c} ${size * 0.6}, ${size * 0.4} ${size - c}, ${size * 0.7} ${size}
      `;
      break;
    case 'bottom-right':
      path = `
        M ${size} ${size * 0.5}
        Q ${size} ${size - c} ${size * 0.5} ${size}
        M ${size} ${size * 0.7}
        Q ${size - c} ${size - c} ${size * 0.7} ${size}
        M ${size} ${size * 0.3}
        C ${size - c} ${size * 0.6}, ${size * 0.6} ${size - c}, ${size * 0.3} ${size}
      `;
      break;
  }

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
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
