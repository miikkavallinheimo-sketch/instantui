# Decorative Elements Library

A comprehensive, production-ready React component library for generating various decorative SVG elements that can be used on websites, business cards, and print materials.

## Features

- 📐 **35+ Decorative Elements** across 5 categories
- 🎨 **Fully Customizable** with props (color, size, thickness, style)
- 📦 **SVG-Based** for perfect scalability
- 💾 **Export Functionality** - Download as standalone SVG files
- 📱 **Responsive** and clean code
- 🎯 **TypeScript** support with full type definitions
- 🚀 **Production-Ready** quality

## Categories

### Lines (7 variations)
- Solid Line
- Dashed Line
- Dotted Line
- Gradient Line
- Wavy Line
- Double Line
- Zigzag Line

### Shapes (8 variations)
- Circle
- Square
- Triangle
- Hexagon
- Star
- Abstract Blob
- Crescent
- Infinity

### Corners (6 variations)
- Bracket
- Curve
- Ornamental
- Minimal
- Bold
- Floral

### Dividers (7 variations)
- Horizontal
- Vertical
- Diagonal
- Curved
- Stepped
- Wave
- Decorated

### Patterns (7 variations)
- Dots
- Grid
- Diagonal Lines
- Circles
- Squares
- Honeycomb
- Cross Hatch

## Usage

### Basic Usage

```tsx
import { SolidLine, CircleShape, BracketCorner } from './components/decorative';

function MyComponent() {
  return (
    <div>
      <SolidLine color="#2563eb" thickness={2} length={200} />
      <CircleShape color="#7c3aed" size={60} filled={false} />
      <BracketCorner color="#000000" size={50} position="top-left" />
    </div>
  );
}
```

### Using the Catalog

```tsx
import { DECORATIVE_ELEMENTS_CATALOG } from './components/decorative';

// Get all elements in a category
const lineElements = DECORATIVE_ELEMENTS_CATALOG.lines;

// Render an element
const element = lineElements[0];
const Component = element.component;
return <Component {...element.props} color="#2563eb" />;
```

### Exporting SVG

```tsx
import { exportSVG, copySVGToClipboard } from './components/decorative';

// Export as SVG file
const handleExport = (svgElement: SVGSVGElement) => {
  exportSVG(svgElement, {
    fileName: 'my-decoration.svg',
    backgroundColor: '#ffffff'
  });
};

// Copy to clipboard
const handleCopy = async (svgElement: SVGSVGElement) => {
  const success = await copySVGToClipboard(svgElement);
  console.log(success ? 'Copied!' : 'Failed');
};
```

## Component Props

### LineElementProps
```tsx
{
  color?: string;           // Default: '#000000'
  secondaryColor?: string;  // Used for gradient lines
  thickness?: number;       // Default: 2
  length?: number;          // Default: 100
  className?: string;
}
```

### ShapeElementProps
```tsx
{
  color?: string;          // Default: '#000000'
  size?: number;           // Default: 50
  filled?: boolean;        // Default: false
  strokeWidth?: number;    // Default: 2
  className?: string;
}
```

### CornerElementProps
```tsx
{
  color?: string;          // Default: '#000000'
  size?: number;           // Default: 50
  thickness?: number;      // Default: 2
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}
```

### DividerElementProps
```tsx
{
  color?: string;          // Default: '#000000'
  thickness?: number;      // Default: 2
  length?: number;         // Default: 200
  className?: string;
}
```

### PatternElementProps
```tsx
{
  color?: string;          // Default: '#000000'
  density?: number;        // Pattern spacing (default varies by pattern)
  opacity?: number;        // Default: 0.5
  width?: number;          // Default: 200
  height?: number;         // Default: 200
  className?: string;
}
```

## Demo Application

The library includes a comprehensive demo application with:

- **Interactive Controls** - Adjust colors in real-time
- **Category Browser** - Browse all elements by category
- **Mockup Previews** - See how elements look on website cards and business cards
- **Export Functionality** - Download any element as SVG
- **Copy to Clipboard** - Quickly copy SVG code
- **Color Presets** - Quick color scheme switching

### Running the Demo

```bash
# Development
npm run dev

# Then navigate to /decorative-demo.html in your browser
# Example: http://localhost:5173/decorative-demo.html
```

## Use Cases

### Website Design
- Section dividers
- Header/footer decorations
- Card embellishments
- Background patterns
- Icon accents

### Business Cards
- Corner decorations
- Logo underlines
- Border elements
- Contact section dividers

### Print Materials
- Brochure decorations
- Letterhead elements
- Certificate borders
- Menu dividers

### Social Media Graphics
- Story backgrounds
- Post decorations
- Highlight covers
- Frame elements

## Best Practices

1. **Color Consistency** - Use your brand colors for cohesive design
2. **Scale Appropriately** - Adjust size prop based on context
3. **Don't Overuse** - Decorative elements should enhance, not overwhelm
4. **Consider Contrast** - Ensure elements are visible against background
5. **Export Settings** - Use transparent backgrounds for maximum flexibility

## TypeScript Support

All components include full TypeScript definitions:

```tsx
import type {
  LineStyle,
  ShapeType,
  CornerStyle,
  DecorativeElement
} from './components/decorative/types';
```

## Browser Support

- Modern browsers with SVG support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lightweight SVG elements
- No external dependencies (except React)
- Optimized rendering
- Minimal bundle size impact

## License

Part of the InstantUI project.
