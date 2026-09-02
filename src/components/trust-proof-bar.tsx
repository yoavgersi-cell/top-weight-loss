import type { SiteConfig } from "@/lib/config";
import { PROVIDER_DATA_CHECKED } from "@/lib/config";

// Honest social-proof bar for money pages. Every number is derived from the
// live config at render time and is real:
//   - "providers compared" = the providers we actually review in this vertical
//   - "verified customer reviews analyzed" = the SUM of providers' real
//     Trustpilot review counts, floored to a round number so the "+" is always
//     truthful (we show <= the real total, never more)
//   - "prices verified <month>" = PROVIDER_DATA_CHECKED
// No invented figures, no fake live counters.
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

export function TrustProofBar({ config }: { config: SiteConfig }) {
  const { reviewsFloor, providersCompared } = computeProof(config);

  // A "by the numbers" stat strip: value-first hierarchy (big brand-navy
  // figure, small uppercase label), divided columns, subtle brand tint - so it
  // reads as a designed trust element, not a checklist of gray one-liners.
  const stats = [
    reviewsFloor > 0 && { value: `${fmt(reviewsFloor)}+`, label: "Verified reviews analyzed" },
    providersCompared > 0 && { value: String(providersCompared), label: "Providers compared" },
    { value: PROVIDER_DATA_CHECKED.replace(/ 20\d\d$/, ""), label: "Prices last verified" },
  ].filter(Boolean) as { value: string; label: string }[];

  if (stats.length === 0) return null;

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-[#0C4B75]/15 bg-gradient-to-br from-[#F4F8FB] to-white shadow-[0_1px_3px_rgba(12,75,117,0.06)]">
      <div className="grid divide-x divide-[#0C4B75]/10" style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}>
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center justify-center px-2 py-3.5 text-center sm:py-4">
            <span className="text-[19px] font-extrabold leading-none tracking-[-0.01em] text-[#0C4B75] sm:text-[24px]">
              {s.value}
            </span>
            <span className="mt-1.5 text-[10px] font-semibold uppercase leading-tight tracking-[0.04em] text-gray-500 sm:text-[11px]">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
