import React, { useState, useRef } from 'react';
import { DECORATIVE_ELEMENTS_CATALOG, exportSVG, copySVGToClipboard } from './index';
import type { DecorativeElement } from './types';

interface DemoProps {
  className?: string;
}

const DecorativeElementsDemo: React.FC<DemoProps> = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('lines');
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [secondaryColor, setSecondaryColor] = useState('#7c3aed');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [selectedElement, setSelectedElement] = useState<DecorativeElement | null>(null);
  const [showMockup, setShowMockup] = useState<'website' | 'business-card' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const categories = Object.keys(DECORATIVE_ELEMENTS_CATALOG);
  const elements = DECORATIVE_ELEMENTS_CATALOG[selectedCategory] || [];

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleExport = (element: DecorativeElement, svgElement: SVGSVGElement) => {
    exportSVG(svgElement, {
      fileName: `${element.id}.svg`,
      backgroundColor: backgroundColor === '#ffffff' ? undefined : backgroundColor,
    });
    showToast('SVG exported successfully!');
  };

  const handleCopy = async (svgElement: SVGSVGElement) => {
    const success = await copySVGToClipboard(svgElement);
    showToast(success ? 'SVG copied to clipboard!' : 'Failed to copy SVG');
  };

  const renderElement = (element: DecorativeElement, customProps?: any) => {
    const Component = element.component;
    const props = {
      ...element.props,
      color: primaryColor,
      secondaryColor: secondaryColor,
      ...customProps,
    };

    return <Component {...props} />;
  };

  return (
    <div className={`min-h-screen bg-slate-50 ${className}`}>
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-slate-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Decorative Elements Library
          </h1>
          <p className="text-slate-600">
            A comprehensive collection of SVG-based decorative elements for web and print design
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Controls */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-32">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">
                Customize
              </h2>

              {/* Color controls */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-12 h-12 rounded cursor-pointer border border-slate-300"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded text-sm font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-12 h-12 rounded cursor-pointer border border-slate-300"
                    />
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded text-sm font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Background Color
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-12 h-12 rounded cursor-pointer border border-slate-300"
                    />
                    <input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded text-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Mockup views */}
              <div className="border-t border-slate-200 pt-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                  Preview On
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setShowMockup(showMockup === 'website' ? null : 'website')}
                    className={`w-full px-4 py-2 rounded text-sm font-medium transition-colors ${
                      showMockup === 'website'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Website Card
                  </button>
                  <button
                    onClick={() =>
                      setShowMockup(showMockup === 'business-card' ? null : 'business-card')
                    }
                    className={`w-full px-4 py-2 rounded text-sm font-medium transition-colors ${
                      showMockup === 'business-card'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Business Card
                  </button>
                </div>
              </div>

              {/* Quick presets */}
              <div className="border-t border-slate-200 pt-4 mt-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">
                  Color Presets
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { primary: '#2563eb', secondary: '#7c3aed', name: 'Blue' },
                    { primary: '#dc2626', secondary: '#ea580c', name: 'Red' },
                    { primary: '#059669', secondary: '#0891b2', name: 'Green' },
                    { primary: '#7c3aed', secondary: '#ec4899', name: 'Purple' },
                    { primary: '#000000', secondary: '#404040', name: 'Black' },
                    { primary: '#d97706', secondary: '#eab308', name: 'Gold' },
                  ].map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        setPrimaryColor(preset.primary);
                        setSecondaryColor(preset.secondary);
                      }}
                      className="group relative"
                      title={preset.name}
                    >
                      <div className="w-full aspect-square rounded border-2 border-slate-200 hover:border-slate-400 transition-colors overflow-hidden">
                        <div className="h-1/2" style={{ backgroundColor: preset.primary }} />
                        <div className="h-1/2" style={{ backgroundColor: preset.secondary }} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="flex overflow-x-auto border-b border-slate-200">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      selectedCategory === category
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Mockup Preview */}
            {showMockup && (
              <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
                {showMockup === 'website' && (
                  <WebsiteMockup
                    elements={elements}
                    renderElement={renderElement}
                    primaryColor={primaryColor}
                    backgroundColor={backgroundColor}
                  />
                )}
                {showMockup === 'business-card' && (
                  <BusinessCardMockup
                    elements={elements}
                    renderElement={renderElement}
                    primaryColor={primaryColor}
                    backgroundColor={backgroundColor}
                  />
                )}
              </div>
            )}

            {/* Elements Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {elements.map((element) => (
                <div
                  key={element.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div
                    className="p-8 flex items-center justify-center min-h-[160px]"
                    style={{ backgroundColor }}
                  >
                    {renderElement(element)}
                  </div>
                  <div className="p-4 border-t border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-900 mb-2">
                      {element.name}
                    </h3>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          const svgElement = e.currentTarget
                            .closest('.grid > div')
                            ?.querySelector('svg');
                          if (svgElement) {
                            handleExport(element, svgElement as SVGSVGElement);
                          }
                        }}
                        className="flex-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                      >
                        Export SVG
                      </button>
                      <button
                        onClick={(e) => {
                          const svgElement = e.currentTarget
                            .closest('.grid > div')
                            ?.querySelector('svg');
                          if (svgElement) {
                            handleCopy(svgElement as SVGSVGElement);
                          }
                        }}
                        className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-medium rounded hover:bg-slate-200 transition-colors"
                        title="Copy SVG code"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Website Card Mockup
const WebsiteMockup: React.FC<{
  elements: DecorativeElement[];
  renderElement: (element: DecorativeElement, customProps?: any) => JSX.Element;
  primaryColor: string;
  backgroundColor: string;
}> = ({ elements, renderElement, primaryColor, backgroundColor }) => {
  const cornerElement = elements.find((e) => e.category === 'corner');
  const dividerElement = elements.find((e) => e.category === 'divider');
  const shapeElement = elements.find((e) => e.category === 'shape');

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">
        Website Card Preview
      </h3>
      <div
        className="relative rounded-xl overflow-hidden shadow-2xl"
        style={{ backgroundColor }}
      >
        {/* Corner decorations */}
        {cornerElement && (
          <>
            <div className="absolute top-0 left-0">
              {renderElement(cornerElement, { position: 'top-left', size: 50 })}
            </div>
            <div className="absolute top-0 right-0">
              {renderElement(cornerElement, { position: 'top-right', size: 50 })}
            </div>
            <div className="absolute bottom-0 left-0">
              {renderElement(cornerElement, { position: 'bottom-left', size: 50 })}
            </div>
            <div className="absolute bottom-0 right-0">
              {renderElement(cornerElement, { position: 'bottom-right', size: 50 })}
            </div>
          </>
        )}

        {/* Card content */}
        <div className="p-12 text-center relative z-10">
          {shapeElement && (
            <div className="flex justify-center mb-6">
              {renderElement(shapeElement, { size: 80, filled: false })}
            </div>
          )}
          <h2 className="text-3xl font-bold mb-4" style={{ color: primaryColor }}>
            Your Company Name
          </h2>
          {dividerElement && (
            <div className="flex justify-center my-6">
              {renderElement(dividerElement, { length: 200 })}
            </div>
          )}
          <p className="text-slate-600 max-w-md mx-auto">
            Elegant decorative elements that enhance your design without overwhelming the content.
          </p>
        </div>
      </div>
    </div>
  );
};

// Business Card Mockup
const BusinessCardMockup: React.FC<{
  elements: DecorativeElement[];
  renderElement: (element: DecorativeElement, customProps?: any) => JSX.Element;
  primaryColor: string;
  backgroundColor: string;
}> = ({ elements, renderElement, primaryColor, backgroundColor }) => {
  const lineElement = elements.find((e) => e.category === 'line');
  const cornerElement = elements.find((e) => e.category === 'corner');
  const shapeElement = elements.find((e) => e.category === 'shape');

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center">
        Business Card Preview (3.5" × 2")
      </h3>
      <div className="flex justify-center">
        <div
          className="relative rounded-lg overflow-hidden shadow-xl"
          style={{
            width: '350px',
            height: '200px',
            backgroundColor,
          }}
        >
          {/* Corner decorations */}
          {cornerElement && (
            <>
              <div className="absolute top-2 left-2">
                {renderElement(cornerElement, { position: 'top-left', size: 30 })}
              </div>
              <div className="absolute bottom-2 right-2">
                {renderElement(cornerElement, { position: 'bottom-right', size: 30 })}
              </div>
            </>
          )}

          {/* Content */}
          <div className="p-6 h-full flex flex-col justify-between relative z-10">
            <div>
              {shapeElement && (
                <div className="mb-3">
                  {renderElement(shapeElement, { size: 40, filled: false })}
                </div>
              )}
              <h3 className="text-xl font-bold" style={{ color: primaryColor }}>
                John Doe
              </h3>
              <p className="text-sm text-slate-600">Creative Director</p>
            </div>

            {lineElement && (
              <div className="my-2">
                {renderElement(lineElement, { length: 80, thickness: 1 })}
              </div>
            )}

            <div className="text-xs text-slate-600 space-y-0.5">
              <p>hello@example.com</p>
              <p>+1 (555) 123-4567</p>
              <p>www.example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecorativeElementsDemo;
