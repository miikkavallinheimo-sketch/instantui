import type { DesignState, MenuPresetId, PreviewPageId } from "../lib/types";
import { getShadowForMode } from "../lib/shadowTokens";

interface SharedNavProps {
  designState: DesignState;
  activePage: PreviewPageId;
  activeMenu: MenuPresetId;
  onPageChange?: (page: PreviewPageId) => void;
}

/**
 * Shared navigation component for preview pages
 * Supports 6 different menu styles, all vibe-aware
 * Menu items represent preview pages: Landing, Blog, Dashboard, Components
 */
export const SharedNav = ({
  designState,
  activePage,
  activeMenu,
  onPageChange,
}: SharedNavProps) => {
  const { colors, fontPair, vibe, uiTokens } = designState;

  const pages: Array<{ id: PreviewPageId; label: string }> = [
    { id: "landing", label: "Landing" },
    { id: "blog", label: "Blog" },
    { id: "dashboard", label: "Dashboard" },
    { id: "components", label: "Components" },
  ];

  // Shared color scheme for all menus
  const navBg = colors.primary;
  const navText = colors.onPrimary || "#ffffff";
  const navAccent = vibe.isDarkUi
    ? `rgba(255, 255, 255, 0.15)`
    : `rgba(255, 255, 255, 0.2)`;

  // Top Nav - Classic horizontal navigation
  if (activeMenu === "top-nav") {
    return (
      <nav
        className="w-full border-b"
        style={{
          backgroundColor: navBg,
          color: navText,
          borderColor: `${navText}20`,
          fontFamily: fontPair.body,
        }}
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="font-semibold text-lg" style={{ fontFamily: fontPair.heading }}>
            ChromUI
          </div>
          <div className="flex gap-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => onPageChange?.(page.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activePage === page.id ? "opacity-100" : "opacity-60 hover:opacity-80"
                }`}
                style={{
                  backgroundColor: activePage === page.id ? navAccent : "transparent",
                  color: navText,
                }}
              >
                {page.label}
              </button>
            ))}
          </div>
          <div className="text-xs opacity-75">{vibe.label}</div>
        </div>
      </nav>
    );
  }

  // Pill Nav - Rounded pill buttons
  if (activeMenu === "pill-nav") {
    return (
      <nav className="w-full px-6 py-6 border-b" style={{ borderColor: colors.borderSubtle }}>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onPageChange?.(page.id)}
              className="px-6 py-2.5 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor: activePage === page.id ? colors.primary : colors.surface,
                color: activePage === page.id ? colors.onPrimary : colors.text,
                border: `1px solid ${activePage === page.id ? colors.primary : colors.borderSubtle}`,
              }}
            >
              {page.label}
            </button>
          ))}
        </div>
      </nav>
    );
  }

  // Minimal Nav - Ultra-simple text only
  if (activeMenu === "minimal-nav") {
    return (
      <nav className="w-full px-6 py-4 border-b" style={{ borderColor: colors.borderSubtle, fontFamily: fontPair.body }}>
        <div className="flex items-center gap-6">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onPageChange?.(page.id)}
              className="text-sm font-medium transition-colors"
              style={{
                color: activePage === page.id ? colors.primary : colors.textMuted,
              }}
            >
              {page.label}
            </button>
          ))}
        </div>
      </nav>
    );
  }

  // Card Nav - Card-style buttons with shadows
  if (activeMenu === "card-nav") {
    const shadowToken = uiTokens.card.shadow;
    return (
      <nav className="w-full px-6 py-6 border-b" style={{ borderColor: colors.borderSubtle }}>
        <div className="flex items-center gap-3 flex-wrap">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onPageChange?.(page.id)}
              className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{
                backgroundColor: activePage === page.id ? colors.primary : colors.surface,
                color: activePage === page.id ? colors.onPrimary : colors.text,
                boxShadow: activePage === page.id ? getShadowForMode(shadowToken, vibe.isDarkUi) : "none",
                border: `1px solid ${colors.borderSubtle}`,
              }}
            >
              {page.label}
            </button>
          ))}
        </div>
      </nav>
    );
  }

  // Underline Nav - Text with animated underline effect
  if (activeMenu === "underline-nav") {
    return (
      <nav className="w-full px-6 py-4 border-b" style={{ borderColor: colors.borderSubtle, fontFamily: fontPair.body }}>
        <div className="flex items-center gap-8">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onPageChange?.(page.id)}
              className="text-sm font-medium pb-2 transition-all relative"
              style={{
                color: activePage === page.id ? colors.primary : colors.text,
                borderBottom: activePage === page.id ? `2px solid ${colors.primary}` : "2px solid transparent",
              }}
            >
              {page.label}
            </button>
          ))}
        </div>
      </nav>
    );
  }

  // Gradient Nav - Navigation with gradient backgrounds
  if (activeMenu === "gradient-nav") {
    return (
      <nav className="w-full px-6 py-6 border-b" style={{ borderColor: colors.borderSubtle }}>
        <div className="flex items-center gap-2 flex-wrap">
          {pages.map((page, idx) => {
            // Create gradient from primary to secondary
            const gradientAngle = idx * 45;
            const gradientBg = activePage === page.id
              ? `linear-gradient(${gradientAngle}deg, ${colors.primary}, ${colors.secondary})`
              : colors.surface;

            return (
              <button
                key={page.id}
                onClick={() => onPageChange?.(page.id)}
                className="px-5 py-3 rounded-lg text-sm font-medium transition-all text-white"
                style={{
                  background: gradientBg,
                  color: activePage === page.id ? colors.onPrimary : colors.text,
                  border: `1px solid ${colors.borderSubtle}`,
                }}
              >
                {page.label}
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  return null;
};
