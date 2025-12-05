import { useMemo } from "react";
import { getGradientCSSValue } from "../lib/gradientTokens";

interface GradientOverlayProps {
  gradientId?: string;
  opacity?: number;
}

/**
 * GradientOverlay component renders a gradient as a background overlay
 * positioned absolutely over the entire container
 */
export const GradientOverlay = ({
  gradientId,
  opacity = 20,
}: GradientOverlayProps) => {
  const backgroundGradient = useMemo(() => {
    console.log("[GradientOverlay] useMemo called with:", { gradientId, opacity });
    if (!gradientId || gradientId === "none") {
      console.log("[GradientOverlay] gradientId is none or undefined");
      return null;
    }
    const gradient = getGradientCSSValue(gradientId);
    console.log("[GradientOverlay] getGradientCSSValue returned:", gradient?.substring(0, 50));
    if (!gradient) {
      console.log("[GradientOverlay] gradient is null or undefined");
      return null;
    }
    return gradient;
  }, [gradientId]);

  if (!backgroundGradient) {
    console.log("[GradientOverlay] No background gradient, returning null");
    return null;
  }

  console.log("[GradientOverlay] Rendering with gradient");

  return (
    <div
      className="absolute inset-0 pointer-events-none z-30"
      style={{
        background: backgroundGradient,
        opacity: opacity / 100,
        mixBlendMode: "overlay",
      }}
      aria-hidden="true"
    />
  );
};
