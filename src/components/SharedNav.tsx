import type { DesignState, MenuPresetId, PreviewPageId } from "../lib/types";
import { getPageNavigation } from "../lib/navigationConfig";

interface SharedNavProps {
  designState: DesignState;
  activePage: PreviewPageId;
  activeMenu: MenuPresetId;
  onPageChange?: (page: PreviewPageId) => void;
}

/**
 * Shared navigation component for preview pages
 * Supports different menu presets (topNav, centeredPill, sidebar)
 * Currently implements TopNav (FREE tier) with context-specific sidebar links
 */
export const SharedNav = ({
  designState,
  activePage,
  activeMenu,
  onPageChange,
}: SharedNavProps) => {
  const { colors, fontPair } = designState;

  // Navigation styling
  const navBg = designState.vibe.isDarkUi
    ? `rgba(${parseInt(colors.primary.slice(1, 3), 16)}, ${parseInt(colors.primary.slice(3, 5), 16)}, ${parseInt(colors.primary.slice(5, 7), 16)}, 0.95)`
    : colors.primary;
  const navText = colors.onPrimary || "#ffffff";
  const navAccent = designState.vibe.isDarkUi
    ? `rgba(255, 255, 255, 0.15)`
    : `rgba(255, 255, 255, 0.2)`;

  const pages: Array<{ id: PreviewPageId; label: string }> = [
    { id: "landing", label: "Landing" },
    { id: "blog", label: "Blog" },
    { id: "dashboard", label: "Dashboard" },
  ];

  const pageNav = getPageNavigation(activePage);

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
        {/* Top bar: Brand + Page switcher */}
        <div className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: `${navText}20` }}>
          <div className="font-semibold text-lg" style={{ fontFamily: fontPair.heading }}>
            Elementry
          </div>

          <div className="flex gap-1">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => onPageChange?.(page.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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

          <div className="text-xs opacity-75">{designState.vibe.label}</div>
        </div>

        {/* Secondary bar: Context-specific links */}
        <div className="px-6 py-3 flex items-center gap-1 flex-wrap">
          {pageNav.items.map((item, idx) => (
            <button
              key={item.label}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                idx === pageNav.activeIndex ? "opacity-100" : "opacity-60 hover:opacity-80"
              }`}
              style={{
                backgroundColor: idx === pageNav.activeIndex ? navAccent : "transparent",
                color: navText,
              }}
            >
              {item.icon && <span className="mr-1">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    );
  }

  // PRO: CenteredPillNav (stub)
  if (activeMenu === "centered-pill") {
    return (
      <div className="w-full py-4 flex justify-center border-b" style={{ borderColor: colors.borderSubtle }}>
        <div className="text-xs text-slate-500">CenteredPillNav (PRO - Coming Soon)</div>
      </div>
    );
  }

  // PRO: SidebarNav (stub)
  if (activeMenu === "sidebar") {
    return (
      <div className="text-xs text-slate-500 p-4">SidebarNav (PRO - Coming Soon)</div>
    );
  }

  return null;
};
