"use client";

import { useEffect, useRef, useState } from "react";

// ───── Expandable text ─────
// Caps a block of text at a fixed height with a soft fade and a "Read more"
// toggle, so one long post can't stretch a whole carousel row (operator
// request, Nov 6, 2026). The cap is applied in the server HTML too, so the
// card never renders tall and then jumps; the toggle appears only when the
// content actually overflows. All text stays in the HTML for crawlers.
export function ExpandableText({
  children,
  collapsedHeight = 190,
  className = "",
}: {
  children: React.ReactNode;
  collapsedHeight?: number;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setOverflows(el.scrollHeight > collapsedHeight + 8));
    ro.observe(el);
    return () => ro.disconnect();
  }, [collapsedHeight]);

  const clamped = !open;
  return (
    <div className={className}>
      <div
        ref={box}
        className="relative overflow-hidden"
        style={
          clamped
            ? {
                maxHeight: collapsedHeight,
                ...(overflows && {
                  maskImage: "linear-gradient(to bottom, #000 70%, transparent)",
                  WebkitMaskImage: "linear-gradient(to bottom, #000 70%, transparent)",
                }),
              }
            : undefined
        }
      >
        {children}
      </div>
      {overflows && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-1.5 text-[12.5px] font-semibold text-[#0C4B75] hover:underline"
        >
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}
