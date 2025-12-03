import type { DesignState, PreviewPageId, MenuPresetId } from "../lib/types";
import { SharedNav } from "./SharedNav";
import PreviewDashboard from "./PreviewDashboard";
import PreviewLanding from "./PreviewLanding";
import PreviewBlog from "./PreviewBlog";
import { ContrastCheckerPanel } from "./ContrastCheckerPanel";

interface PreviewProps {
  designState: DesignState;
  isAnalyzing?: boolean;
  activePage?: PreviewPageId;
  activeMenu?: MenuPresetId;
  onPageChange?: (page: PreviewPageId) => void;
  showContrastChecker?: boolean;
}

const Preview = ({
  designState,
  isAnalyzing = false,
  activePage = "dashboard",
  activeMenu = "top-nav",
  onPageChange,
  showContrastChecker = true,
}: PreviewProps) => {
  return (
    <div className="flex gap-4 w-full">
      {/* Main Preview Area */}
      <div className="flex-1 min-w-0">
        <div className="w-full rounded-3xl border border-slate-800/40 overflow-hidden shadow-lg relative" style={{ backgroundColor: designState.colors.background }}>
          {isAnalyzing && (
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <div
                className="text-6xl font-bold text-white/80 tracking-wider select-none"
                style={{
                  animation: `fadeInOutGentle 800ms ease-in-out forwards`,
                  textShadow: "0 4px 24px rgba(0,0,0,0.2)",
                }}
              >
                Analyzing...
              </div>
              <style>{`
                @keyframes fadeInOutGentle {
                  0% { opacity: 0; }
                  25% { opacity: 0.6; }
                  75% { opacity: 0.6; }
                  100% { opacity: 0; }
                }
              `}</style>
            </div>
          )}

          {/* Navigation */}
          <SharedNav
            designState={designState}
            activePage={activePage}
            activeMenu={activeMenu}
            onPageChange={onPageChange}
          />

          {/* Page Content */}
          <div className="min-h-[640px] overflow-y-auto">
            {activePage === "dashboard" && (
              <PreviewDashboard designState={designState} isAnalyzing={isAnalyzing} />
            )}
            {activePage === "landing" && <PreviewLanding designState={designState} />}
            {activePage === "blog" && <PreviewBlog designState={designState} />}
          </div>
        </div>
      </div>

      {/* Contrast Checker Sidebar */}
      {showContrastChecker && (
        <div className="w-80 flex-shrink-0 overflow-y-auto">
          <ContrastCheckerPanel designState={designState} />
        </div>
      )}
    </div>
  );
};

export default Preview;
