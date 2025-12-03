import type { DesignState, MenuPresetId, PreviewPageId } from "../lib/types";

interface SharedNavProps {
  designState: DesignState;
  activePage: PreviewPageId;
  activeMenu: MenuPresetId;
  onPageChange?: (page: PreviewPageId) => void;
}

/**
 * Shared navigation component for preview pages
 * Supports different menu presets (topNav, centeredPill, sidebar)
 * Currently implements TopNav (FREE tier)
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
  const navTextMuted = `${navText}cc`;

  const pages: Array<{ id: PreviewPageId; label: string }> = [
    { id: "landing", label: "Landing" },
    { id: "blog", label: "Blog" },
    { id: "dashboard", label: "Dashboard" },
  ];

  if (activeMenu === "top-nav") {
    return (
      <nav
        className="w-full px-6 py-4 flex items-center justify-between border-b"
        style={{
          backgroundColor: navBg,
          color: navText,
          borderColor: `${navText}20`,
          fontFamily: fontPair.heading,
        }}
      >
        <div className="font-semibold text-lg">Elementry</div>

        <div className="flex gap-1">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onPageChange?.(page.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === page.id ? "opacity-100" : "opacity-60 hover:opacity-80"
              }`}
              style={{
                backgroundColor: activePage === page.id ? `${navText}20` : "transparent",
                color: navText,
              }}
            >
              {page.label}
            </button>
          ))}
        </div>

        <div className="text-xs opacity-75">{designState.vibe.label}</div>
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
