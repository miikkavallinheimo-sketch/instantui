import type { DesignState } from "./types";
import { getGradientCSSValue } from "./gradientTokens";
import { getTextureContent } from "./textureTokens";

const HEX_COLOR_REGEX = /#([0-9a-fA-F]{3,8})/g;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const expandHex = (hex: string) => {
  if (hex.length === 3) {
    return hex
      .split("")
      .map((char) => char + char)
      .join("");
  }
  if (hex.length === 4) {
    return hex
      .split("")
      .map((char) => char + char)
      .join("");
  }
  return hex;
};

const hexToRgba = (hexValue: string, alpha: number) => {
  const clean = expandHex(hexValue.replace("#", ""));
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
};

const applyOpacityToGradient = (gradient: string, opacity: number) => {
  if (opacity >= 0.99) {
    return gradient;
  }
  return gradient.replace(HEX_COLOR_REGEX, (match) => hexToRgba(match, opacity));
};

const applyOpacityToSvg = (svgContent: string, opacity: number) => {
  const targetOpacity = opacity >= 0.99 ? 1 : opacity;
  return svgContent.replace(/<svg([^>]*)>/, (match, attrs) => {
    if (attrs.includes("opacity=")) {
      const updated = attrs.replace(/opacity="[^"]*"/, ` opacity="${targetOpacity}"`);
      return `<svg${updated}>`;
    }
    return `<svg${attrs} opacity="${targetOpacity}">`;
  });
};

export const buildBackgroundStyles = (
  designState: DesignState
): Partial<CSSStyleDeclaration> => {
  const backgroundImages: string[] = [];
  const blendModes: string[] = [];
  const backgroundSizes: string[] = [];
  const backgroundRepeats: string[] = [];

  const gradientId = designState.gradientId;
  const textureId = designState.textureId;

  if (textureId && textureId !== "none") {
    const texture = getTextureContent(textureId);
    if (texture?.svgContent) {
      const textureOpacity = clamp((designState.textureOpacity ?? 25) / 100, 0, 1);
      const svg = applyOpacityToSvg(texture.svgContent, textureOpacity).trim();
      const encoded = encodeURIComponent(svg);
      backgroundImages.push(`url("data:image/svg+xml,${encoded}")`);
      backgroundSizes.push("512px 512px");
      backgroundRepeats.push("repeat");
      blendModes.push("multiply");
    }
  }

  if (gradientId && gradientId !== "none") {
    const gradientValue = getGradientCSSValue(gradientId);
    if (gradientValue) {
      const gradientOpacity = clamp((designState.gradientOpacity ?? 20) / 100, 0, 1);
      const gradient = applyOpacityToGradient(gradientValue, gradientOpacity);
      backgroundImages.push(gradient);
      backgroundSizes.push("cover");
      backgroundRepeats.push("no-repeat");
      blendModes.push("overlay");
    }
  }

  return {
    backgroundColor: designState.colors.background,
    backgroundImage: backgroundImages.length ? backgroundImages.join(", ") : undefined,
    backgroundBlendMode: blendModes.length ? blendModes.join(", ") : undefined,
    backgroundSize: backgroundSizes.length ? backgroundSizes.join(", ") : undefined,
    backgroundRepeat: backgroundRepeats.length ? backgroundRepeats.join(", ") : undefined,
  };
};
