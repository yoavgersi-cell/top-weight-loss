// ───── Inline affiliate disclosure ─────
// One muted sentence near the top of pages that carry provider links. The
// footer disclosure exists on every page; search-quality guidance asks for the
// disclosure to be visible near the content it applies to as well (Nov 13,
// 2026 audit). Plain text, no link styling, so it never competes with the page.
export function AffiliateNote({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[12.5px] leading-relaxed text-gray-500 ${className}`}>
      Disclosure: we may earn a commission when you click a provider link. It never affects our rankings,
      prices or verdicts, which come from verified sources.
    </p>
  );
}
