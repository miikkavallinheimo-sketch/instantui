import type { PreviewPageId } from "./types";

/**
 * Navigation configuration per preview page
 * Defines the sidebar navigation links shown for each page
 */

export interface NavLink {
  label: string;
  icon?: string; // Unicode emoji or icon
}

export interface PageNavigation {
  items: NavLink[];
  activeIndex: number; // Index of active item
}

export const NAVIGATION_CONFIG: Record<PreviewPageId, PageNavigation> = {
  // Dashboard: Data/metrics focused
  dashboard: {
    items: [
      { label: "Pulse", icon: "📊" },
      { label: "Revenue", icon: "💰" },
      { label: "Segments", icon: "👥" },
      { label: "Content", icon: "📝" },
      { label: "Settings", icon: "⚙️" },
      { label: "Labs", icon: "🔬" },
    ],
    activeIndex: 0, // Pulse is active
  },

  // Landing: Marketing focused
  landing: {
    items: [
      { label: "Features", icon: "✨" },
      { label: "Pricing", icon: "💳" },
      { label: "Docs", icon: "📚" },
      { label: "About", icon: "ℹ️" },
      { label: "Contact", icon: "📧" },
    ],
    activeIndex: -1, // No active item (all are sections)
  },

  // Blog: Content focused
  blog: {
    items: [
      { label: "Latest", icon: "🔥" },
      { label: "Design", icon: "🎨" },
      { label: "Development", icon: "💻" },
      { label: "Tips", icon: "💡" },
      { label: "Resources", icon: "📖" },
    ],
    activeIndex: 0, // Latest is active
  },
};

/**
 * Get navigation configuration for a specific page
 */
export function getPageNavigation(pageId: PreviewPageId): PageNavigation {
  return NAVIGATION_CONFIG[pageId];
}
