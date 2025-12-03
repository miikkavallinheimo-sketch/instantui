/**
 * useHoverAnimation - React hook for hover animations
 * Manages hover state and applies appropriate animation classes
 * Respects prefers-reduced-motion
 */

import { useState, useCallback, useEffect, useMemo } from "react";
import type { HoverAnimationType } from "../lib/types";
import { prefersReducedMotion } from "../lib/hapticConfig";
import { getAnimationClasses } from "../lib/animationTokens";

interface UseHoverAnimationOptions {
  animationType?: HoverAnimationType;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  disabled?: boolean;
}

export function useHoverAnimation(options: UseHoverAnimationOptions = {}) {
  const { animationType = "subtle", onHoverStart, onHoverEnd, disabled = false } = options;

  const [isHovered, setIsHovered] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Detect prefers-reduced-motion on mount
  useEffect(() => {
    setPrefersReduced(prefersReducedMotion());

    // Listen for changes to prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (disabled) return;
    setIsHovered(true);
    onHoverStart?.();
  }, [disabled, onHoverStart]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    onHoverEnd?.();
  }, [onHoverEnd]);

  // Get animation class based on animation type and prefers-reduced-motion
  const animationClass = useMemo(() => {
    if (prefersReduced || !animationType || animationType === "none") {
      return "";
    }
    return getAnimationClasses(animationType);
  }, [animationType, prefersReduced]);

  // Get hover props to spread onto element
  const hoverProps = useMemo(
    () => ({
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      className: animationClass,
    }),
    [handleMouseEnter, handleMouseLeave, animationClass]
  );

  return {
    isHovered,
    hoverProps,
    animationClass,
    prefersReduced,
  };
}
