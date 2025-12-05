import type { DesignState, PreviewPageId, MenuPresetId } from "../lib/types";
import { SharedNav } from "./SharedNav";
import PreviewDashboard from "./PreviewDashboard";
import PreviewLanding from "./PreviewLanding";
import PreviewBlog from "./PreviewBlog";
import PreviewComponents from "./PreviewComponents";
import { ContrastCheckerPanel } from "./ContrastCheckerPanel";
import { getGradientCSSValue } from "../lib/gradientTokens";
import { getTextureContent } from "../lib/textureTokens";

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
  console.log("[Preview] designState:", {
    textureId: designState.textureId,
    textureOpacity: designState.textureOpacity,
    gradientId: designState.gradientId,
    gradientOpacity: designState.gradientOpacity,
  });

  // Build texture background-image URL
  const textureContent =
    designState.textureId && designState.textureId !== "none"
      ? getTextureContent(designState.textureId)
      : null;

  const textureBackgroundImage = textureContent
    ? (() => {
        const uniqueId = `texture-${designState.textureId}-${Math.random().toString(36).substr(2, 9)}`;
        let svgContent = textureContent.svgContent
          .replace(/<svg([^>]*?)>/, (match, attrs) => {
            if (!attrs.includes('viewBox')) {
              return `<svg viewBox="0 0 512 512"${attrs}>`;
            }
            return match;
          })
          .replace(/id="([^"]+)"/g, (match, id) => `id="${uniqueId}-${id}"`)
          .replace(/url\(#([^)]+)\)/g, (match, id) => `url(#${uniqueId}-${id})`);
        const encoded = encodeURIComponent(svgContent.trim());
        return `url('data:image/svg+xml,${encoded}')`;
      })()
    : null;

  // Build gradient CSS value
  const gradientCSS =
    designState.gradientId && designState.gradientId !== "none"
      ? getGradientCSSValue(designState.gradientId)
      : null;

  // Calculate opacity values
  const gradientOpacity = (designState.gradientOpacity ?? 20) / 100;
  const textureOpacity = (designState.textureOpacity ?? 10) / 100;

  // Build the final backgroundImage value for logging
  const finalBackgroundImage = gradientCSS && textureBackgroundImage
    ? `${textureBackgroundImage}, ${gradientCSS}`
    : textureBackgroundImage
    ? textureBackgroundImage
    : gradientCSS
    ? gradientCSS
    : undefined;

  console.log("[Preview] Computed values:", {
    gradientCSS: gradientCSS ? `✓ (${gradientCSS.length} chars): ${gradientCSS.substring(0, 50)}...` : "✗ none",
    textureBackgroundImage: textureBackgroundImage ? `✓ (${textureBackgroundImage.length} chars)` : "✗ none",
    gradientOpacity,
    textureOpacity,
    finalBackgroundImage: finalBackgroundImage ? `${finalBackgroundImage.substring(0, 100)}...` : "none",
  });

  // Generate unique class name for this preview instance
  const previewClassId = `preview-${Math.random().toString(36).substr(2, 9)}`;

  // Build CSS for texture and gradient backgrounds
  let cssRules = `background-color: ${designState.colors.background} !important;`;

  // Build background-image with multiple layers (gradient + texture)
  const backgroundLayers: string[] = [];
  if (gradientCSS) {
    backgroundLayers.push(gradientCSS);
  }
  if (textureBackgroundImage) {
    backgroundLayers.push(textureBackgroundImage);
  }

  if (backgroundLayers.length > 0) {
    cssRules += `
      background-image: ${backgroundLayers.join(", ")} !important;
    `;
  }

  // Build background-size for each layer
  if (backgroundLayers.length > 0) {
    const sizes: string[] = [];
    if (gradientCSS) sizes.push("100% 100%");
    if (textureBackgroundImage) sizes.push("512px 512px");
    if (sizes.length > 0) {
      cssRules += `
        background-size: ${sizes.join(", ")} !important;
      `;
    }
  }

  // Build background-repeat for each layer
  if (backgroundLayers.length > 0) {
    const repeats: string[] = [];
    if (gradientCSS) repeats.push("no-repeat");
    if (textureBackgroundImage) repeats.push("repeat");
    if (repeats.length > 0) {
      cssRules += `
        background-repeat: ${repeats.join(", ")} !important;
      `;
    }
  }

  // Set background-position
  if (backgroundLayers.length > 0) {
    const positions: string[] = [];
    if (gradientCSS) positions.push("center");
    if (textureBackgroundImage) positions.push("0 0");
    if (positions.length > 0) {
      cssRules += `
        background-position: ${positions.join(", ")} !important;
      `;
    }
  }

  console.log("[Preview] Generated CSS:", {
    previewClassId,
    gradientCSS: gradientCSS ? `${gradientCSS.substring(0, 50)}...` : null,
    textureBackgroundImage: textureBackgroundImage ? `${textureBackgroundImage.substring(0, 80)}...` : null,
    backgroundLayers: backgroundLayers.length,
    cssRules: cssRules.substring(0, 200),
  });

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <style>{`
        .${previewClassId} {
          ${cssRules}
        }
        .${previewClassId}::before {
          content: "DEBUG: CSS Applied";
          position: absolute;
          top: 10px;
          left: 10px;
          color: red;
          font-size: 14px;
          font-weight: bold;
          background: rgba(255, 0, 0, 0.2);
          padding: 4px 8px;
          border-radius: 4px;
          z-index: 999;
        }
      `}</style>
      {/* Main Preview Area */}
      <div className="flex-1 min-w-0">
        <div
          className={`w-full h-full rounded-3xl border border-slate-800/40 shadow-lg ${previewClassId}`}
          style={{
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
            {activePage === "blog" && <PreviewBlog designState={designState} />}
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
