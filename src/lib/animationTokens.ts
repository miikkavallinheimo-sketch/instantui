/**
 * Animation Tokens - Defines hover and interaction animations
 * Supports vibe-aware animations with accessibility considerations
 */

import type { HoverAnimationType, AnimationConfig, ComponentAnimations } from "./types";

// Default animation configuration for all components
export const DEFAULT_ANIMATIONS: ComponentAnimations = {
  button: {
    type: "lift",
    duration: 200,
    timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    scale: 1.05,
    translateY: -2,
  },
  card: {
    type: "lift",
    duration: 250,
    timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    scale: 1.02,
    translateY: -4,
  },
  link: {
    type: "subtle",
    duration: 150,
    timingFunction: "ease-in-out",
  },
  navItem: {
    type: "subtle",
    duration: 150,
    timingFunction: "ease-in-out",
  },
  interactive: {
    type: "subtle",
    duration: 200,
    timingFunction: "ease-out",
  },
};

// Vibe-specific animation configurations
export const VIBE_ANIMATIONS: Record<string, ComponentAnimations> = {
  // Minimal: Subtle, restrained animations
  minimal: {
    button: { type: "subtle", duration: 150, timingFunction: "ease-out" },
    card: { type: "subtle", duration: 150, timingFunction: "ease-out" },
    link: { type: "subtle", duration: 100, timingFunction: "ease-out" },
    navItem: { type: "subtle", duration: 100, timingFunction: "ease-out" },
    interactive: { type: "subtle", duration: 150, timingFunction: "ease-out" },
  },

  // Modern SaaS: Confident lift animations
  "modern-saas": {
    button: {
      type: "lift",
      duration: 200,
      timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      scale: 1.05,
      translateY: -2,
    },
    card: {
      type: "lift",
      duration: 250,
      timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      scale: 1.02,
      translateY: -4,
    },
    link: { type: "subtle", duration: 150, timingFunction: "ease-in-out" },
    navItem: { type: "subtle", duration: 150, timingFunction: "ease-in-out" },
    interactive: {
      type: "lift",
      duration: 200,
      timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      scale: 1.03,
      translateY: -1,
    },
  },

  // Brutalist: Stark, minimal animations
  brutalist: {
    button: { type: "subtle", duration: 100, timingFunction: "linear" },
    card: { type: "subtle", duration: 100, timingFunction: "linear" },
    link: { type: "subtle", duration: 80, timingFunction: "linear" },
    navItem: { type: "subtle", duration: 80, timingFunction: "linear" },
    interactive: { type: "subtle", duration: 100, timingFunction: "linear" },
  },

  // Pastel: Playful bounce animations
  pastel: {
    button: {
      type: "bounce",
      duration: 250,
      timingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      scale: 1.08,
    },
    card: {
      type: "bounce",
      duration: 300,
      timingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      scale: 1.04,
      translateY: -3,
    },
    link: { type: "subtle", duration: 150, timingFunction: "ease-out" },
    navItem: { type: "subtle", duration: 150, timingFunction: "ease-out" },
    interactive: {
      type: "bounce",
      duration: 200,
      timingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      scale: 1.06,
    },
  },

  // Dark Tech: Glow effects with cyan accent
  "dark-tech": {
    button: {
      type: "glow",
      duration: 250,
      timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      glowColor: "#00D9FF",
    },
    card: {
      type: "glow",
      duration: 300,
      timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      glowColor: "#00D9FF",
    },
    link: { type: "glow", duration: 200, timingFunction: "ease-in-out" },
    navItem: { type: "glow", duration: 200, timingFunction: "ease-in-out" },
    interactive: {
      type: "glow",
      duration: 250,
      timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      glowColor: "#00D9FF",
    },
  },

  // Luxury: Subtle lift, smooth
  luxury: {
    button: {
      type: "lift",
      duration: 300,
      timingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      scale: 1.02,
      translateY: -1,
    },
    card: {
      type: "lift",
      duration: 350,
      timingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      scale: 1.01,
      translateY: -2,
    },
    link: { type: "subtle", duration: 200, timingFunction: "ease-in-out" },
    navItem: { type: "subtle", duration: 200, timingFunction: "ease-in-out" },
    interactive: {
      type: "subtle",
      duration: 250,
      timingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },
  },

  // Soft Neo Tech: Shimmer and glow
  "soft-neo-tech": {
    button: {
      type: "glow",
      duration: 300,
      timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
    card: {
      type: "shimmer",
      duration: 300,
      timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      shimmerDuration: 1500,
    },
    link: { type: "glow", duration: 250, timingFunction: "ease-in-out" },
    navItem: { type: "subtle", duration: 150, timingFunction: "ease-in-out" },
    interactive: {
      type: "glow",
      duration: 300,
      timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },

  // Gradient Bloom: Colorful animations
  "gradient-bloom": {
    button: {
      type: "bounce",
      duration: 280,
      timingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      scale: 1.07,
    },
    card: {
      type: "bounce",
      duration: 320,
      timingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      scale: 1.03,
      translateY: -3,
    },
    link: { type: "subtle", duration: 160, timingFunction: "ease-out" },
    navItem: { type: "subtle", duration: 160, timingFunction: "ease-out" },
    interactive: {
      type: "bounce",
      duration: 240,
      timingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      scale: 1.06,
    },
  },

  // Warm Editorial: Sophisticated lift
  "warm-editorial": {
    button: {
      type: "lift",
      duration: 280,
      timingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      scale: 1.03,
      translateY: -1.5,
    },
    card: {
      type: "lift",
      duration: 320,
      timingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      scale: 1.02,
      translateY: -3,
    },
    link: { type: "subtle", duration: 180, timingFunction: "ease-in-out" },
    navItem: { type: "subtle", duration: 180, timingFunction: "ease-in-out" },
    interactive: {
      type: "subtle",
      duration: 240,
      timingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },
  },

  // Retro Pixel: Quick, snappy animations
  "retro-pixel": {
    button: { type: "subtle", duration: 120, timingFunction: "steps(2)" },
    card: { type: "subtle", duration: 120, timingFunction: "steps(2)" },
    link: { type: "subtle", duration: 80, timingFunction: "steps(2)" },
    navItem: { type: "subtle", duration: 80, timingFunction: "steps(2)" },
    interactive: { type: "subtle", duration: 100, timingFunction: "steps(2)" },
  },

  // Magazine Brutalism: Strong, deliberate
  "magazine-brutalism": {
    button: { type: "lift", duration: 180, timingFunction: "linear" },
    card: { type: "lift", duration: 200, timingFunction: "linear" },
    link: { type: "subtle", duration: 120, timingFunction: "linear" },
    navItem: { type: "subtle", duration: 120, timingFunction: "linear" },
    interactive: { type: "lift", duration: 180, timingFunction: "linear" },
  },

  // Cyber Mint: Tech glow with subtle lift
  "cyber-mint": {
    button: {
      type: "glow",
      duration: 240,
      timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      glowColor: "#10F981",
    },
    card: {
      type: "lift",
      duration: 280,
      timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      scale: 1.02,
      translateY: -2,
    },
    link: { type: "glow", duration: 200, timingFunction: "ease-in-out" },
    navItem: { type: "subtle", duration: 140, timingFunction: "ease-in-out" },
    interactive: {
      type: "glow",
      duration: 240,
      timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      glowColor: "#10F981",
    },
  },

  // Dark: Glow emphasis with blue accent
  dark: {
    button: {
      type: "glow",
      duration: 250,
      timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      glowColor: "#3B82F6",
    },
    card: {
      type: "glow",
      duration: 300,
      timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      glowColor: "#3B82F6",
    },
    link: { type: "glow", duration: 200, timingFunction: "ease-in-out" },
    navItem: { type: "glow", duration: 200, timingFunction: "ease-in-out" },
    interactive: {
      type: "glow",
      duration: 250,
      timingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      glowColor: "#3B82F6",
    },
  },
};

/**
 * Get animation config for a vibe, falling back to defaults
 */
export function getAnimationsForVibe(vibeId: string): ComponentAnimations {
  return VIBE_ANIMATIONS[vibeId] || DEFAULT_ANIMATIONS;
}

/**
 * Build CSS transition string from animation config
 */
export function buildTransitionCss(config: AnimationConfig): string {
  const duration = `${config.duration}ms`;
  const timing = config.timingFunction;
  return `all ${duration} ${timing}`;
}

/**
 * Build transform string for lift animation
 */
export function buildLiftTransform(scale: number = 1.02, translateY: number = -2): string {
  return `scale(${scale}) translateY(${translateY}px)`;
}

/**
 * Get animation type-specific CSS classes
 */
export function getAnimationClasses(type: HoverAnimationType): string {
  const classMap: Record<HoverAnimationType, string> = {
    subtle: "hover-subtle",
    lift: "hover-lift",
    glow: "hover-glow",
    shimmer: "hover-shimmer",
    bounce: "hover-bounce",
    none: "",
  };
  return classMap[type] || "";
}
