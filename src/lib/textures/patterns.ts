/**
 * SVG Pattern Generators
 * Functions that generate SVG patterns for textures
 */

/**
 * Fine Noise - Ultra-fine grain texture
 */
export function generateFineNoise(size: number = 512): string {
  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <filter id="fine-noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="1"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="${size}" height="${size}" filter="url(#fine-noise)" opacity="0.15"/>
</svg>`.trim();
}

/**
 * Dot Grid - Sparse dots pattern
 */
export function generateDotGrid(size: number = 512, spacing: number = 40, dotSize: number = 1): string {
  const dots: string[] = [];
  for (let x = 0; x < size; x += spacing) {
    for (let y = 0; y < size; y += spacing) {
      dots.push(`<circle cx="${x}" cy="${y}" r="${dotSize}" fill="black"/>`);
    }
  }
  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  ${dots.join('\n  ')}
</svg>`.trim();
}

/**
 * Thin Lines - Horizontal hairlines
 */
export function generateThinLines(size: number = 512, spacing: number = 60, weight: number = 0.5): string {
  const lines: string[] = [];
  for (let y = 0; y < size; y += spacing) {
    lines.push(`<line x1="0" y1="${y}" x2="${size}" y2="${y}" stroke="black" stroke-width="${weight}"/>`);
  }
  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  ${lines.join('\n  ')}
</svg>`.trim();
}

/**
 * Subtle Grid - Light gridlines
 */
export function generateSubtleGrid(size: number = 512, gridSize: number = 32, weight: number = 0.5): string {
  const lines: string[] = [];
  for (let i = 0; i <= size; i += gridSize) {
    lines.push(`<line x1="${i}" y1="0" x2="${i}" y2="${size}" stroke="black" stroke-width="${weight}"/>`);
    lines.push(`<line x1="0" y1="${i}" x2="${size}" y2="${i}" stroke="black" stroke-width="${weight}"/>`);
  }
  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  ${lines.join('\n  ')}
</svg>`.trim();
}

/**
 * Crosshatch - Diagonal lines at 45° angle
 */
export function generateCrosshatch(size: number = 512, spacing: number = 20, weight: number = 0.5): string {
  const lines: string[] = [];
  // Diagonal lines going top-left to bottom-right
  for (let i = -size; i < size * 2; i += spacing) {
    lines.push(`<line x1="${i}" y1="0" x2="${i + size}" y2="${size}" stroke="black" stroke-width="${weight}"/>`);
  }
  // Diagonal lines going top-right to bottom-left
  for (let i = 0; i < size * 2; i += spacing) {
    lines.push(`<line x1="${i}" y1="0" x2="${i - size}" y2="${size}" stroke="black" stroke-width="${weight}"/>`);
  }
  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  ${lines.join('\n  ')}
</svg>`.trim();
}

/**
 * Paper Texture - Fine linen grain
 */
export function generatePaperTexture(size: number = 512): string {
  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <filter id="paper">
    <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="3" seed="2"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer>
      <feFuncA type="discrete" tableValues="0 0 0 1"/>
    </feComponentTransfer>
  </filter>
  <rect width="${size}" height="${size}" filter="url(#paper)" opacity="0.1"/>
</svg>`.trim();
}

/**
 * Confetti - Scattered shapes
 */
export function generateConfetti(size: number = 512, count: number = 100): string {
  const shapes: string[] = [];
  const types = ['circle', 'rect', 'polygon'];

  for (let i = 0; i < count; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const shapeSize = 2 + Math.random() * 4;
    const type = types[Math.floor(Math.random() * types.length)];

    if (type === 'circle') {
      shapes.push(`<circle cx="${x}" cy="${y}" r="${shapeSize}" fill="black"/>`);
    } else if (type === 'rect') {
      shapes.push(`<rect x="${x}" y="${y}" width="${shapeSize}" height="${shapeSize}" fill="black"/>`);
    } else {
      shapes.push(`<polygon points="${x},${y - shapeSize} ${x + shapeSize},${y + shapeSize} ${x - shapeSize},${y + shapeSize}" fill="black"/>`);
    }
  }

  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  ${shapes.join('\n  ')}
</svg>`.trim();
}

/**
 * Halftone - Dot pattern with varying sizes
 */
export function generateHalftone(size: number = 512, spacing: number = 16): string {
  const dots: string[] = [];
  for (let x = 0; x < size; x += spacing) {
    for (let y = 0; y < size; y += spacing) {
      const dotSize = 1 + Math.random() * 3;
      dots.push(`<circle cx="${x}" cy="${y}" r="${dotSize}" fill="black"/>`);
    }
  }
  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  ${dots.join('\n  ')}
</svg>`.trim();
}

/**
 * Hexagon Grid - Geometric hex pattern
 */
export function generateHexagonGrid(size: number = 512, hexSize: number = 30, weight: number = 1): string {
  const hexagons: string[] = [];
  const hexHeight = hexSize * Math.sqrt(3);
  const hexWidth = hexSize * 2;

  for (let row = 0; row < size / hexHeight + 2; row++) {
    for (let col = 0; col < size / hexWidth + 2; col++) {
      const x = col * hexWidth * 0.75;
      const y = row * hexHeight + (col % 2) * hexHeight * 0.5;

      const points = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const px = x + hexSize * Math.cos(angle);
        const py = y + hexSize * Math.sin(angle);
        return `${px},${py}`;
      }).join(' ');

      hexagons.push(`<polygon points="${points}" fill="none" stroke="black" stroke-width="${weight}"/>`);
    }
  }

  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  ${hexagons.join('\n  ')}
</svg>`.trim();
}

/**
 * Concrete Texture - Industrial texture
 */
export function generateConcrete(size: number = 512): string {
  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <filter id="concrete">
    <feTurbulence type="fractalNoise" baseFrequency="0.3" numOctaves="5" seed="3"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer>
      <feFuncA type="linear" slope="0.3"/>
    </feComponentTransfer>
  </filter>
  <rect width="${size}" height="${size}" filter="url(#concrete)" opacity="0.2"/>
</svg>`.trim();
}

/**
 * Film Grain - Vintage film texture
 */
export function generateFilmGrain(size: number = 512): string {
  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <filter id="film-grain">
    <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="4" seed="4"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer>
      <feFuncA type="discrete" tableValues="0 0 1 1"/>
    </feComponentTransfer>
  </filter>
  <rect width="${size}" height="${size}" filter="url(#film-grain)" opacity="0.12"/>
</svg>`.trim();
}

/**
 * Watercolor - Soft organic texture
 */
export function generateWatercolor(size: number = 512): string {
  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <filter id="watercolor">
    <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="3" seed="5"/>
    <feDisplacementMap in="SourceGraphic" scale="10"/>
    <feGaussianBlur stdDeviation="2"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="${size}" height="${size}" filter="url(#watercolor)" opacity="0.15"/>
</svg>`.trim();
}

/**
 * Marble Veins - Delicate marble streaks
 */
export function generateMarble(size: number = 512): string {
  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <filter id="marble">
    <feTurbulence type="turbulence" baseFrequency="0.01 0.1" numOctaves="2" seed="6"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="${size}" height="${size}" filter="url(#marble)" opacity="0.08"/>
</svg>`.trim();
}

/**
 * Circuit Lines - Tech-inspired pattern
 */
export function generateCircuit(size: number = 512): string {
  const lines: string[] = [];
  const gridSize = 40;

  for (let x = 0; x < size; x += gridSize) {
    for (let y = 0; y < size; y += gridSize) {
      if (Math.random() > 0.5) {
        lines.push(`<line x1="${x}" y1="${y}" x2="${x + gridSize}" y2="${y}" stroke="black" stroke-width="0.5"/>`);
      }
      if (Math.random() > 0.5) {
        lines.push(`<line x1="${x}" y1="${y}" x2="${x}" y2="${y + gridSize}" stroke="black" stroke-width="0.5"/>`);
      }
      if (Math.random() > 0.7) {
        lines.push(`<circle cx="${x}" cy="${y}" r="2" fill="black"/>`);
      }
    }
  }

  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  ${lines.join('\n  ')}
</svg>`.trim();
}

/**
 * Architectural Grid - Stark grid pattern
 */
export function generateArchitecturalGrid(size: number = 512): string {
  const lines: string[] = [];
  const gridSize = 50;
  const weight = 2;

  for (let i = 0; i <= size; i += gridSize) {
    lines.push(`<line x1="${i}" y1="0" x2="${i}" y2="${size}" stroke="black" stroke-width="${weight}"/>`);
    lines.push(`<line x1="0" y1="${i}" x2="${size}" y2="${i}" stroke="black" stroke-width="${weight}"/>`);
  }

  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  ${lines.join('\n  ')}
</svg>`.trim();
}

/**
 * Bubbly Dots - Varied-size circles
 */
export function generateBubblyDots(size: number = 512, count: number = 80): string {
  const circles: string[] = [];

  for (let i = 0; i < count; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 2 + Math.random() * 8;
    const opacity = 0.3 + Math.random() * 0.4;

    circles.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="black" opacity="${opacity}"/>`);
  }

  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  ${circles.join('\n  ')}
</svg>`.trim();
}
