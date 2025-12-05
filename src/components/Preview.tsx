import type { DesignState, PreviewPageId, MenuPresetId } from "../lib/types";
import { SharedNav } from "./SharedNav";
import PreviewDashboard from "./PreviewDashboard";
import PreviewLanding from "./PreviewLanding";
import PreviewLanding1 from "./PreviewLanding1";
import PreviewLanding2 from "./PreviewLanding2";
import PreviewBlog from "./PreviewBlog";
import PreviewBlog1 from "./PreviewBlog1";
import PreviewBlog2 from "./PreviewBlog2";
import PreviewComponents from "./PreviewComponents";
import { ContrastCheckerPanel } from "./ContrastCheckerPanel";
import { buildBackgroundStyles } from "../lib/backgroundStyles";

interface PreviewProps {
  designState: DesignState;
  isAnalyzing?: boolean;
  activePage?: PreviewPageId;
  activeMenu?: MenuPresetId;
  onPageChange?: (page: PreviewPageId) => void;
  onColorsFixed?: (newColors: DesignState["colors"]) => void;
  showContrastChecker?: boolean;
}


const Preview = ({
  designState,
  isAnalyzing = false,
  activePage = "dashboard",
  activeMenu = "top-nav",
  onPageChange,
  onColorsFixed,
  showContrastChecker = true,
}: PreviewProps) => {
  const backgroundStyles = buildBackgroundStyles(designState);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      {/* Main Preview Area */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <div
          className="w-full h-full rounded-3xl border border-slate-800/40 overflow-hidden shadow-lg relative"
          style={{
            ...backgroundStyles,
            position: "relative",
          }}
        >
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
          <div className="relative z-10">
            <SharedNav
              designState={designState}
              activePage={activePage}
              activeMenu={activeMenu}
              onPageChange={onPageChange}
            />
          </div>

          {/* Page Content */}
          <div className="min-h-[640px] overflow-y-auto relative z-10">
            {activePage === "dashboard" && (
              <PreviewDashboard designState={designState} isAnalyzing={isAnalyzing} />
            )}
            {activePage === "landing" && <PreviewLanding designState={designState} />}
            {activePage === "landing1" && <PreviewLanding1 designState={designState} />}
            {activePage === "landing2" && <PreviewLanding2 designState={designState} />}
            {activePage === "blog" && <PreviewBlog designState={designState} />}
            {activePage === "blog1" && <PreviewBlog1 designState={designState} />}
            {activePage === "blog2" && <PreviewBlog2 designState={designState} />}
            {activePage === "components" && <PreviewComponents designState={designState} />}
          </div>
        </div>
      </div>

      {/* Contrast Checker Panel - Below preview */}
      {showContrastChecker && (
        <div className="max-h-48">
          <ContrastCheckerPanel designState={designState} onColorsFixed={onColorsFixed} />
        </div>
      )}
    </div>
  );
};

export default Preview;
