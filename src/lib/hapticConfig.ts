/**
 * Haptic Feedback Configuration
 * Provides haptic patterns and browser support detection
 */

export type HapticIntensity = "light" | "medium" | "pattern";

export interface HapticPattern {
  duration: number | number[];
  description: string;
}

/**
 * Haptic patterns (in milliseconds)
 * Array format for pattern mode: [vibrate, pause, vibrate, ...]
 */
export const HAPTIC_PATTERNS: Record<HapticIntensity, HapticPattern> = {
  light: {
    duration: 10,
    description: "Light tap feedback",
  },
  medium: {
    duration: 20,
    description: "Medium tap feedback",
  },
  pattern: {
    duration: [10, 5, 10],
    description: "Double tap pattern",
  },
};

export interface HapticConfig {
  enabled: boolean;
  onHoverStart: HapticIntensity | null;
  onClick: HapticIntensity | null;
  respectUserPreference: boolean;
}

/**
 * Default haptic configuration
 */
export const DEFAULT_HAPTIC_CONFIG: HapticConfig = {
  enabled: true,
  onHoverStart: "light",
  onClick: "medium",
  respectUserPreference: true,
};

/**
 * Check if Vibration API is supported
 */
export function isVibrationApiSupported(): boolean {
  if (typeof navigator === "undefined") return false;
  return "vibrate" in navigator;
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Trigger haptic feedback
 */
export function triggerHaptic(intensity: HapticIntensity): void {
  // Don't trigger if not supported or user prefers reduced motion
  if (!isVibrationApiSupported() || prefersReducedMotion()) {
    return;
  }

  const pattern = HAPTIC_PATTERNS[intensity];
  if (navigator.vibrate) {
    navigator.vibrate(pattern.duration);
  }
}

/**
 * Should haptic be enabled based on user preferences and support
 */
export function shouldEnableHaptic(config: HapticConfig): boolean {
  if (!config.enabled) return false;
  if (!isVibrationApiSupported()) return false;
  if (config.respectUserPreference && prefersReducedMotion()) return false;
  return true;
}

/**
 * Get effective haptic config considering user preferences
 */
export function getEffectiveHapticConfig(
  config: HapticConfig
): HapticConfig {
  if (!shouldEnableHaptic(config)) {
    return {
      ...config,
      enabled: false,
      onHoverStart: null,
      onClick: null,
    };
  }
  return config;
}
