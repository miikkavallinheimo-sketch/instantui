import { useState } from "react";
import type { DesignState, MenuPresetId, PreviewPageId } from "../lib/types";
import { getShadowForMode } from "../lib/shadowTokens";
import { getAnimationsForVibe } from "../lib/animationTokens";

interface SharedNavProps {
  designState: DesignState;
  activePage: PreviewPageId;
  activeMenu: MenuPresetId;
  onPageChange?: (page: PreviewPageId) => void;
}

/**
 * Shared navigation component for preview pages
 * Supports 6 different menu styles, all vibe-aware with custom hover effects
 * Menu items represent preview pages: Landing, Blog, Dashboard, Components
 */
export const SharedNav = ({
  designState,
  activePage,
  activeMenu,
  onPageChange,
}: SharedNavProps) => {
  const { colors, fontPair, vibe, uiTokens } = designState;
  const vibeAnimations = getAnimationsForVibe(vibe.id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainPages: Array<{ id: PreviewPageId; label: string }> = [
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
    const linkAnim = vibeAnimations.link;
    return (
      <nav
        className="w-full border-b relative"
        style={{
          backgroundColor: navBg,
          color: navText,
          borderColor: `${navText}20`,
          fontFamily: fontPair.body,
          overflow: 'visible',
        }}
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="font-semibold text-lg" style={{ fontFamily: fontPair.heading }}>
            ChromUI
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            {mainPages.map((page) => (
              <button
                key={page.id}
                onClick={() => onPageChange?.(page.id)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: activePage === page.id ? navAccent : "transparent",
                  color: navText,
                  opacity: activePage === page.id ? 1 : 0.6,
                  transitionDuration: `${linkAnim.duration}ms`,
                }}
                onMouseEnter={(e) => {
                  if (activePage !== page.id) {
                    e.currentTarget.style.opacity = "0.8";
                    e.currentTarget.style.backgroundColor = navAccent;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activePage !== page.id) {
                    e.currentTarget.style.opacity = "0.6";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
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

  // Pill Nav - Rounded pill buttons with scale animation
  if (activeMenu === "pill-nav") {
    const linkAnim = vibeAnimations.link;
    return (
      <nav className="w-full px-6 py-6 border-b" style={{ borderColor: colors.borderSubtle }}>
        <div className="flex items-center justify-between mb-4 pb-3 border-b" style={{ borderColor: colors.borderSubtle }}>
          <div className="font-semibold text-base" style={{ fontFamily: fontPair.heading, color: colors.primary }}>
            ChromUI
          </div>
          <div className="text-xs" style={{ color: colors.textMuted }}>{vibe.label}</div>
        </div>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {mainPages.map((page) => {
            const isActive = activePage === page.id;
            return (
              <button
                key={page.id}
                onClick={() => onPageChange?.(page.id)}
                className="px-6 py-2.5 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: isActive ? colors.primary : colors.surface,
                  color: isActive ? colors.onPrimary : colors.text,
                  border: `2px solid ${isActive ? colors.primary : colors.borderSubtle}`,
                  transform: isActive ? "scale(1.08)" : "scale(1)",
                  transitionDuration: `${linkAnim.duration}ms`,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.backgroundColor = colors.surface;
                    e.currentTarget.style.borderColor = colors.primary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.backgroundColor = colors.surface;
                    e.currentTarget.style.borderColor = colors.borderSubtle;
                  }
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

  // Minimal Nav - Ultra-simple text only
  if (activeMenu === "minimal-nav") {
    const linkAnim = vibeAnimations.link;
    return (
      <nav className="w-full px-6 py-4 border-b" style={{ borderColor: colors.borderSubtle, fontFamily: fontPair.body }}>
        <div className="flex items-center justify-between mb-3 pb-3 border-b" style={{ borderColor: colors.borderSubtle }}>
          <div className="font-semibold text-base" style={{ fontFamily: fontPair.heading, color: colors.primary }}>
            ChromUI
          </div>
          <div className="text-xs" style={{ color: colors.textMuted }}>{vibe.label}</div>
        </div>
        <div className="flex items-center gap-6">
          {mainPages.map((page) => {
            const isActive = activePage === page.id;
            return (
              <button
                key={page.id}
                onClick={() => onPageChange?.(page.id)}
                className="text-sm font-medium transition-colors"
                style={{
                  color: isActive ? colors.primary : colors.textMuted,
                  transitionDuration: `${linkAnim.duration}ms`,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = colors.primary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = colors.textMuted;
                  }
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

  // Card Nav - Card-style buttons with shadows
  if (activeMenu === "card-nav") {
    const shadowToken = uiTokens.card.shadow;
    const linkAnim = vibeAnimations.link;
    return (
      <nav className="w-full px-6 py-6 border-b" style={{ borderColor: colors.borderSubtle }}>
        <div className="flex items-center justify-between mb-4 pb-3 border-b" style={{ borderColor: colors.borderSubtle }}>
          <div className="font-semibold text-base" style={{ fontFamily: fontPair.heading, color: colors.primary }}>
            ChromUI
          </div>
          <div className="text-xs" style={{ color: colors.textMuted }}>{vibe.label}</div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {mainPages.map((page) => {
            const isActive = activePage === page.id;
            return (
              <button
                key={page.id}
                onClick={() => onPageChange?.(page.id)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: isActive ? colors.primary : colors.surface,
                  color: isActive ? colors.onPrimary : colors.text,
                  boxShadow: isActive ? getShadowForMode(shadowToken, vibe.isDarkUi) : "none",
                  border: `1px solid ${colors.borderSubtle}`,
                  transitionDuration: `${linkAnim.duration}ms`,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.boxShadow = getShadowForMode(shadowToken, vibe.isDarkUi);
                    e.currentTarget.style.backgroundColor = colors.surface;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.backgroundColor = colors.surface;
                  }
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

  // Underline Nav - Text with animated underline effect
  if (activeMenu === "underline-nav") {
    const linkAnim = vibeAnimations.link;
    return (
      <nav className="w-full px-6 py-4 border-b" style={{ borderColor: colors.borderSubtle, fontFamily: fontPair.body }}>
        <div className="flex items-center justify-between mb-3 pb-3 border-b" style={{ borderColor: colors.borderSubtle }}>
          <div className="font-semibold text-base" style={{ fontFamily: fontPair.heading, color: colors.primary }}>
            ChromUI
          </div>
          <div className="text-xs" style={{ color: colors.textMuted }}>{vibe.label}</div>
        </div>
        <div className="flex items-center gap-8">
          {mainPages.map((page) => {
            const isActive = activePage === page.id;
            return (
              <button
                key={page.id}
                onClick={() => onPageChange?.(page.id)}
                className="text-sm font-medium pb-2 transition-all relative"
                style={{
                  color: isActive ? colors.primary : colors.text,
                  borderBottom: isActive ? `2px solid ${colors.primary}` : "2px solid transparent",
                  transitionDuration: `${linkAnim.duration}ms`,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderBottom = `2px solid ${colors.primary}`;
                    e.currentTarget.style.color = colors.primary;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderBottom = "2px solid transparent";
                    e.currentTarget.style.color = colors.text;
                  }
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

  // Hamburger Menu Nav - Dropdown menu with hamburger icon
  if (activeMenu === "hamburger-nav") {
    const linkAnim = vibeAnimations.link;
    return (
      <nav className="w-full px-6 py-4 border-b" style={{ borderColor: colors.borderSubtle, fontFamily: fontPair.body }}>
        <div className="flex items-center justify-between">
          <div className="font-semibold text-base" style={{ fontFamily: fontPair.heading, color: colors.primary }}>
            ChromUI
          </div>
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg transition-all"
              style={{
                backgroundColor: isMenuOpen ? colors.primary : "transparent",
                color: isMenuOpen ? colors.onPrimary : colors.text,
                transitionDuration: `${linkAnim.duration}ms`,
              }}
              title="Menu"
            >
              {/* Hamburger Icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2 rounded-lg shadow-lg border z-50"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.borderSubtle,
                  boxShadow: getShadowForMode(uiTokens.card.shadow, vibe.isDarkUi),
                  minWidth: "160px",
                }}
              >
                {mainPages.map((page) => {
                  const isActive = activePage === page.id;
                  return (
                    <button
                      key={page.id}
                      onClick={() => {
                        onPageChange?.(page.id);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 transition-colors text-sm font-medium first:rounded-t-lg last:rounded-b-lg"
                      style={{
                        color: isActive ? colors.primary : colors.text,
                        backgroundColor: isActive ? colors.primary + "15" : "transparent",
                        transitionDuration: `${linkAnim.duration}ms`,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = colors.primary + "10";
                          e.currentTarget.style.color = colors.primary;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = colors.text;
                        }
                      }}
                    >
                      {page.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }

  return null;
};
