# Texture System

Subtle, web-optimized textures that enhance vibe character without overwhelming designs.

## Features

- **35+ SVG Textures** - Optimized for web performance
- **10 Vibe Categories** - Matched to InstantUI vibes
- **React Components** - Easy integration
- **Adjustable Opacity** - 0-30% user control
- **Blend Modes** - overlay, multiply, soft-light, screen
- **Seamless Tiling** - Perfect repeating patterns

## Quick Start

```tsx
import { TextureOverlay, useTexture } from './lib/textures';

function MyComponent() {
  const texture = useTexture('minimal-fine-noise', 0.1);

  return (
    <div className="relative">
      <TextureOverlay
        patternId={texture.patternId}
        opacity={texture.opacity}
      />
      <div>Your content here</div>
    </div>
  );
}
```

## Available Textures

### Minimalist (3 textures)
- **Fine Noise** - Ultra-fine grain, very subtle
- **Dot Grid** - Sparse dots, 40px spacing
- **Thin Lines** - Horizontal hairlines

### Professional (3 textures)
- **Subtle Grid** - Light gridlines, 32px squares
- **Crosshatch** - Delicate diagonal lines
- **Paper Texture** - Fine linen grain

### Creative (2 textures)
- **Canvas Weave** - Artist canvas texture
- **Artistic Grain** - Organic paint texture

### Playful (3 textures)
- **Confetti** - Scattered shapes
- **Bubbly Dots** - Varied-size circles
- **Polka Dots** - Fun dot pattern

### Elegant (3 textures)
- **Marble Veins** - Delicate marble streaks
- **Fine Linen** - High-quality fabric weave
- **Silk Texture** - Smooth fabric with sheen

### Bold (3 textures)
- **Concrete** - Industrial texture
- **Halftone** - Bold dot pattern
- **Bold Grid** - Strong geometric grid

### Vintage (3 textures)
- **Film Grain** - 35mm film-style
- **Halftone Print** - Newsprint texture
- **Aged Paper** - Old paper character

### Modern (3 textures)
- **Hexagon Grid** - Geometric hex pattern
- **Circuit Lines** - Tech-inspired pattern
- **Mesh Noise** - Digital noise with structure

### Organic (2 textures)
- **Watercolor** - Soft watercolor wash
- **Recycled Paper** - Eco paper with fibers

### Brutalist (2 textures)
- **Rough Concrete** - Heavy concrete texture
- **Architectural Grid** - Stark grid pattern

## Usage

### Basic Overlay

```tsx
import { TextureOverlay } from './lib/textures';

<div className="relative">
  <TextureOverlay patternId="minimal-fine-noise" opacity={0.1} />
  {/* Your content */}
</div>
```

### With Controls

```tsx
import { TextureControls, useTexture } from './lib/textures';

function MyComponent() {
  const texture = useTexture();

  return (
    <div>
      <TextureControls
        vibeId="modern-saas"
        selectedPatternId={texture.patternId}
        opacity={texture.opacity}
        onPatternChange={texture.setPatternId}
        onOpacityChange={texture.setOpacity}
      />

      <div className="relative">
        <TextureOverlay {...texture} />
        {/* Content */}
      </div>
    </div>
  );
}
```

### Get Patterns for Vibe

```tsx
import { getPatternsForVibe } from './lib/textures';

const patterns = getPatternsForVibe('minimal');
console.log(patterns); // Array of TexturePattern objects
```

### Custom Pattern

```tsx
import { patterns } from './lib/textures';

// Generate custom pattern
const customSVG = patterns.generateDotGrid(512, 30, 2);

const customPattern = {
  id: 'custom-dots',
  name: 'Custom Dots',
  type: 'dots',
  svg: customSVG,
  defaultOpacity: 0.12,
  // ...
};
```

## API Reference

### `<TextureOverlay>`

Props:
- `patternId: string | null` - Pattern ID or null for no texture
- `opacity?: number` - Opacity (0-1), default from pattern
- `blendMode?` - CSS blend mode
- `scale?: number` - Scale multiplier, default 1
- `className?: string` - Additional CSS classes
- `zIndex?: number` - Z-index, default 1

### `useTexture(initialPatternId?, initialOpacity?)`

Returns:
- `patternId: string | null`
- `setPatternId: (id: string | null) => void`
- `opacity: number`
- `setOpacity: (opacity: number) => void`
- `enabled: boolean`
- `setEnabled: (enabled: boolean) => void`
- `pattern: TexturePattern | null`

### `<TextureControls>`

Props:
- `vibeId: VibeId` - Current vibe
- `selectedPatternId: string | null`
- `opacity: number`
- `onPatternChange: (id: string | null) => void`
- `onOpacityChange: (opacity: number) => void`
- `className?: string`

### `getPatternsForVibe(vibeId: VibeId): TexturePattern[]`

Get all patterns suitable for a vibe.

### `getPatternById(id: string): TexturePattern | undefined`

Get a specific pattern by ID.

## Pattern Generators

All generators return SVG string:

```typescript
import { patterns } from './lib/textures';

patterns.generateFineNoise(512);
patterns.generateDotGrid(512, 40, 1);
patterns.generateThinLines(512, 60, 0.5);
patterns.generateSubtleGrid(512, 32, 0.5);
patterns.generateCrosshatch(512, 20, 0.5);
patterns.generatePaperTexture(512);
patterns.generateConfetti(512, 100);
patterns.generateHalftone(512, 16);
patterns.generateHexagonGrid(512, 30, 1);
patterns.generateConcrete(512);
patterns.generateFilmGrain(512);
patterns.generateWatercolor(512);
patterns.generateMarble(512);
patterns.generateCircuit(512);
patterns.generateArchitecturalGrid(512);
patterns.generateBubblyDots(512, 80);
```

## Design Principles

1. **Subtlety** - Textures enhance, never dominate
2. **Performance** - Lightweight SVG, optimized for web
3. **Seamless** - Perfect tiling with no visible seams
4. **Flexible** - Grayscale design works with any colors
5. **Accessible** - Maintains sufficient contrast

## Best Practices

- Keep opacity between 5-20% for best results
- Use `overlay` blend mode for most cases
- Test on both light and dark backgrounds
- Ensure text remains readable
- Consider mobile performance

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- SVG blend modes supported
- Fallback: texture simply won't display

## Performance

- Average texture size: 5-15KB
- No external dependencies
- GPU-accelerated with CSS
- Negligible performance impact

## Examples

**Minimal vibe with subtle noise:**
```tsx
<TextureOverlay patternId="minimal-fine-noise" opacity={0.08} />
```

**Bold vibe with concrete:**
```tsx
<TextureOverlay patternId="bold-concrete" opacity={0.18} />
```

**Elegant vibe with marble:**
```tsx
<TextureOverlay patternId="elegant-marble" opacity={0.08} />
```

**Disable texture:**
```tsx
<TextureOverlay patternId={null} />
```
