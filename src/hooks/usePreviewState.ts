import { useState } from "react";
import type { PreviewPageId, MenuPresetId } from "../lib/types";

/**
 * Custom hook to manage preview state (active page, menu, dark mode)
 * Keeps App.tsx cleaner by isolating preview-related state
 */
export function usePreviewState() {
  const [activePage, setActivePage] = useState<PreviewPageId>("dashboard");
  const [activeMenu, setActiveMenu] = useState<MenuPresetId>("top-nav");
  const [darkMode, setDarkMode] = useState<"light" | "dark">("light");

  return {
    activePage,
    setActivePage,
    activeMenu,
    setActiveMenu,
    darkMode,
    setDarkMode,
  };
}
