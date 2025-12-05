import { useMemo } from "react";
import { getTextureContent } from "../lib/textureTokens";

interface TextureOverlayProps {
  textureId?: string;
  opacity?: number;
}

/**
 * TextureOverlay component renders the texture as a background overlay
 * positioned absolutely over the entire container
 */
export const TextureOverlay = ({
  textureId,
  opacity = 10,
}: TextureOverlayProps) => {
  const backgroundImage = useMemo(() => {
    console.log("[TextureOverlay] useMemo called with:", { textureId, opacity });
    if (!textureId || textureId === "none") {
      console.log("[TextureOverlay] textureId is none or undefined");
      return null;
    }
    const texture = getTextureContent(textureId);
    console.log("[TextureOverlay] getTextureContent returned:", { textureId, hasContent: !!texture.svgContent, contentLength: texture.svgContent?.length });
    if (!texture.svgContent) {
      console.log("[TextureOverlay] texture.svgContent is empty");
      return null;
    }

    // Add unique IDs to avoid conflicts when multiple SVGs render
    const uniqueId = `texture-${textureId}-${Math.random().toString(36).substr(2, 9)}`;
    let svgContent = texture.svgContent
      // Ensure viewBox is set
      .replace(/<svg([^>]*?)>/, (match, attrs) => {
        if (!attrs.includes('viewBox')) {
          return `<svg viewBox="0 0 512 512"${attrs}>`;
        }
        return match;
      })
      // Make all IDs unique
      .replace(/id="([^"]+)"/g, (match, id) => `id="${uniqueId}-${id}"`);

    // Update all url() references to use new IDs
    svgContent = svgContent.replace(
      /url\(#([^)]+)\)/g,
      (match, id) => `url(#${uniqueId}-${id})`
    );

    const encoded = encodeURIComponent(svgContent.trim());
    const result = `url('data:image/svg+xml,${encoded}')`;
    console.log("[TextureOverlay] Created background image URL, length:", result.length);
    return result;
  }, [textureId, opacity]);

  if (!backgroundImage) {
    console.log("[TextureOverlay] No background image, returning null");
    return null;
  }

  console.log("[TextureOverlay] Rendering with texture");

  return (
    <div
      className="absolute inset-0 pointer-events-none z-40"
      style={{
        backgroundImage,
        backgroundRepeat: "repeat",
        backgroundSize: "512px 512px",
        opacity: opacity / 100,
        mixBlendMode: "overlay",
      }}
      aria-hidden="true"
    />
  );
};
