import type { PreviewPageId } from "./types";

/**
 * Navigation configuration per preview page
 * Defines the sidebar navigation links shown for each page
 *
 * IMPORTANT: Do NOT use emojis in navigation items. Keep labels text-only for consistency.
 */

export interface NavLink {
  label: string;
}

export interface PageNavigation {
  items: NavLink[];
  activeIndex: number; // Index of active item
}

export const NAVIGATION_CONFIG: Record<PreviewPageId, PageNavigation> = {
  // Dashboard: Data/metrics focused
  dashboard: {
    items: [
      { label: "Pulse" },
      { label: "Revenue" },
      { label: "Segments" },
      { label: "Content" },
      { label: "Settings" },
      { label: "Labs" },
    ],
    activeIndex: 0, // Pulse is active
  },

  // Landing: Marketing focused
  landing: {
    items: [
      { label: "Features" },
      { label: "Pricing" },
      { label: "Docs" },
      { label: "About" },
      { label: "Contact" },
    ],
    activeIndex: -1, // No active item (all are sections)
  },

  // Blog: Content focused
  blog: {
    items: [
      { label: "Latest" },
      { label: "Design" },
      { label: "Development" },
      { label: "Tips" },
      { label: "Resources" },
    ],
    activeIndex: 0, // Latest is active
  },

  // Components: UI component gallery
  components: {
    items: [
      { label: "Gallery" },
      { label: "Documentation" },
      { label: "Tokens" },
    ],
    activeIndex: 0, // Gallery is active
  },
};

/**
 * Get navigation configuration for a specific page
 */
export function getPageNavigation(pageId: PreviewPageId): PageNavigation {
  return NAVIGATION_CONFIG[pageId];
}
