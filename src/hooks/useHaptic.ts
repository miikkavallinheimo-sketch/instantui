/**
 * useHaptic - React hook for haptic feedback
 * Provides haptic vibration with accessibility support
 */

import { useCallback } from "react";
import type { HapticConfig, HapticIntensity } from "../lib/types";
import {
  triggerHaptic as triggerHapticFeedback,
  getEffectiveHapticConfig,
} from "../lib/hapticConfig";

export function useHaptic(config?: HapticConfig) {
  // Get effective config (respects user preferences)
  const effectiveConfig = config
    ? getEffectiveHapticConfig(config)
    : {
        enabled: false,
        onHoverStart: null,
        onClick: null,
        respectUserPreference: true,
      };

  /**
   * Trigger haptic feedback for a given intensity
   */
  const triggerHaptic = useCallback(
    (intensity: HapticIntensity) => {
      if (effectiveConfig.enabled) {
        triggerHapticFeedback(intensity);
      }
    },
    [effectiveConfig.enabled]
  );

  /**
   * Get haptic handler for hover start event
   */
  const onHoverStart = useCallback(() => {
    if (effectiveConfig.enabled && effectiveConfig.onHoverStart) {
      triggerHapticFeedback(effectiveConfig.onHoverStart);
    }
  }, [effectiveConfig]);

  /**
   * Get haptic handler for click event
   */
  const onClick = useCallback(() => {
    if (effectiveConfig.enabled && effectiveConfig.onClick) {
      triggerHapticFeedback(effectiveConfig.onClick);
    }
  }, [effectiveConfig]);

  return {
    triggerHaptic,
    onHoverStart,
    onClick,
    isEnabled: effectiveConfig.enabled,
  };
}
