import { ReactNode, useState } from "react";

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

/**
 * Collapsible section component for organizing sidebar content
 * Shows title + expand/collapse button when closed
 * Shows full content when open
 */
export const CollapsibleSection = ({
  title,
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-700 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 px-0 hover:opacity-80 transition"
      >
        <h2 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-400">
          {title}
        </h2>
        <span className="text-slate-500 text-sm">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && <div className="pb-3">{children}</div>}
    </div>
  );
};
