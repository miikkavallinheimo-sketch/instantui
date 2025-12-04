import { useMemo } from "react";
import { getTextureDataUrl } from "../lib/textureTokens";

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
  const dataUrl = useMemo(() => {
    if (!textureId || textureId === "none") return "";
    return getTextureDataUrl(textureId);
  }, [textureId]);

  if (!dataUrl) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url('${dataUrl}')`,
        backgroundRepeat: "repeat",
        opacity: opacity / 100,
        mixBlendMode: "overlay",
      }}
      aria-hidden="true"
    />
  );
};
