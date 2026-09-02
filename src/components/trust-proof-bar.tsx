import type { SiteConfig } from "@/lib/config";
import { PROVIDER_DATA_CHECKED } from "@/lib/config";

// Honest social-proof bar for money pages. Every number is derived from the
// live config at render time and is real:
//   - "providers compared" = the providers we actually review in this vertical
//   - "verified reviews analyzed" = the SUM of providers' real Trustpilot
//     review counts, floored to a round number so the "+" is always truthful
//     (we show <= the real total, never more)
//   - "prices verified <month>" = PROVIDER_DATA_CHECKED
// No invented figures, no fake live counters. The Trustpilot + Reddit marks in
// the footer name the two sources we actually read (Trustpilot ratings, which
// the count is drawn from, and Reddit threads, shown as excerpts on the page);
// neither implies a Reddit review count.
export function computeProof(config: SiteConfig) {
  const totalReviews = (config.providers ?? []).reduce((sum, p) => {
    const n = parseInt((p.trustpilotReviewCount ?? "").replace(/[^0-9]/g, ""), 10);
    return sum + (Number.isFinite(n) ? n : 0);
  }, 0);
  // Floor to the nearest 1,000 (or 100 for smaller totals) so "X+" is always
  // an understatement of the true count.
  const step = totalReviews >= 10000 ? 1000 : 100;
  const reviewsFloor = Math.floor(totalReviews / step) * step;
  const providersCompared = config.reviews?.length ?? config.ranking?.providerOrder?.length ?? 0;
  return { reviewsFloor, providersCompared };
}

function fmt(n: number) {
  return n.toLocaleString("en-US");
}

// Trustpilot's green star mark (inline - no external asset).
function TrustpilotStarMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1133 1080" className={className} aria-hidden="true">
      <path
        fill="#00B67A"
        d="M1132.8 412.8H700.2L566.4 0 432.6 412.8 0 412.5l350.1 254.7L216 1080l350.4-254.4L916.8 1080 783 667.2l349.8-254.4z"
      />
      <path fill="#005128" d="M813.3 760.5 783 667.2 566.4 825.6z" />
    </svg>
  );
}

// A minimal Snoo-style Reddit mark (inline - no external asset).
function RedditMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#FF4500" />
      <g fill="#fff">
        <ellipse cx="20" cy="23.5" rx="10.5" ry="7" />
        <circle cx="8.8" cy="21" r="2.6" />
        <circle cx="31.2" cy="21" r="2.6" />
        <circle cx="26.5" cy="9.5" r="2.2" />
        <path d="M20.6 16.9l1.2-6.6 5.3 1.1-.4 1.6-3.8-.8-1 5z" />
      </g>
      <g fill="#FF4500">
        <circle cx="15.8" cy="22.3" r="1.7" />
        <circle cx="24.2" cy="22.3" r="1.7" />
      </g>
      <path
        d="M15.5 26.6c1.3 1.1 2.8 1.6 4.5 1.6s3.2-.5 4.5-1.6"
        stroke="#FF4500"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function TrustProofBar({ config }: { config: SiteConfig }) {
  const { reviewsFloor, providersCompared } = computeProof(config);

  // Only the two real magnitudes go in the big-number row. A date is not a
  // magnitude, so it does NOT sit here (a bare month next to "21" read as
  // "21 September"); it moves to the footer as a dated freshness stamp.
  const stats = [
    reviewsFloor > 0 && { value: `${fmt(reviewsFloor)}+`, label: "Verified reviews analyzed" },
    providersCompared > 0 && { value: String(providersCompared), label: "Providers compared" },
  ].filter(Boolean) as { value: string; label: string }[];

  if (stats.length === 0) return null;

  // Two parameters don't need the full column width on desktop - a capped,
  // left-aligned card reads as intentional, not a stretched dashboard bar.
  // Mobile keeps full width. The review count carries the wider share of the
  // split (it's the headline metric, and its label is the longer one).
  const gridCols =
    stats.length === 2
      ? "minmax(0, 1.15fr) minmax(0, 0.85fr)"
      : `repeat(${stats.length}, minmax(0, 1fr))`;

  return (
    <div className="mb-8 w-full overflow-hidden rounded-2xl border border-[#0C4B75]/15 bg-gradient-to-br from-[#F4F8FB] to-white shadow-[0_1px_3px_rgba(12,75,117,0.06)] sm:max-w-[560px]">
      {/* Big-number row - real magnitudes only */}
      <div className="grid divide-x divide-[#0C4B75]/10" style={{ gridTemplateColumns: gridCols }}>
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center justify-center px-2 py-4 text-center sm:py-5">
            <span className="text-[22px] font-extrabold leading-none tracking-[-0.02em] text-[#0C4B75] sm:text-[28px]">
              {s.value}
            </span>
            <span className="mt-2 text-[10px] font-semibold uppercase leading-tight tracking-[0.05em] text-gray-500 sm:text-[11px]">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Footer: the two sources we read (left) + a dated freshness stamp
          (right). The date carries its year, so it reads as a timestamp, not a
          day-of-month, and it never sits beside a bare count. */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-[#0C4B75]/10 bg-white/60 px-4 py-2.5 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.05em] text-gray-400">Sources</span>
          <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-gray-600 sm:text-[12px]">
            <TrustpilotStarMark className="h-3.5 w-3.5" />
            Trustpilot
          </span>
          <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-gray-600 sm:text-[12px]">
            <RedditMark className="h-3.5 w-3.5" />
            Reddit
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-gray-500 sm:text-[12px]">
          <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-[#0C4B75]" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Prices verified {PROVIDER_DATA_CHECKED}
        </span>
      </div>
    </div>
  );
}
