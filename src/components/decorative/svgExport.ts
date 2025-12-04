/**
 * Utility functions for exporting SVG elements
 */

export interface ExportOptions {
  fileName?: string;
  backgroundColor?: string;
}

/**
 * Convert React SVG element to downloadable SVG file
 */
export const exportSVG = (svgElement: SVGSVGElement, options: ExportOptions = {}) => {
  const { fileName = 'decorative-element.svg', backgroundColor } = options;

  // Clone the SVG element
  const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;

  // Add background if specified
  if (backgroundColor) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('fill', backgroundColor);
    clonedSvg.insertBefore(rect, clonedSvg.firstChild);
  }

  // Add XML namespace if not present
  if (!clonedSvg.getAttribute('xmlns')) {
    clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  }

  // Serialize the SVG
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(clonedSvg);

  // Create blob and download
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up
  URL.revokeObjectURL(url);
};

/**
 * Copy SVG to clipboard
 */
export const copySVGToClipboard = async (svgElement: SVGSVGElement): Promise<boolean> => {
  try {
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    await navigator.clipboard.writeText(svgString);
    return true;
  } catch (error) {
    console.error('Failed to copy SVG to clipboard:', error);
    return false;
  }
};

/**
 * Get SVG as data URL
 */
export const getSVGDataURL = (svgElement: SVGSVGElement): string => {
  const serializer = new XMLSerializer();
  const svgString = serializer.serializeToString(svgElement);
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};

/**
 * Export SVG as PNG (requires canvas conversion)
 */
export const exportSVGAsPNG = (
  svgElement: SVGSVGElement,
  options: ExportOptions & { scale?: number } = {}
) => {
  const { fileName = 'decorative-element.png', scale = 2, backgroundColor = '#ffffff' } = options;

  const svgData = getSVGDataURL(svgElement);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.error('Failed to get canvas context');
    return;
  }

  const img = new Image();

  img.onload = () => {
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    // Fill background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw SVG
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  img.src = svgData;
};
