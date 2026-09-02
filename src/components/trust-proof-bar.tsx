import { ShieldCheck, Users, Star } from "lucide-react";
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
  const items = [
    { icon: ShieldCheck, text: `Prices verified ${PROVIDER_DATA_CHECKED}` },
    providersCompared > 0 && { icon: Users, text: `${providersCompared} providers compared` },
    reviewsFloor > 0 && { icon: Star, text: `${fmt(reviewsFloor)}+ verified customer reviews analyzed` },
  ].filter(Boolean) as { icon: typeof ShieldCheck; text: string }[];

  if (items.length === 0) return null;

  return (
    <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-gray-200 bg-white px-4 py-3 sm:gap-x-7">
      {items.map(({ icon: Icon, text }) => (
        <span key={text} className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-gray-700 sm:text-[13px]">
          <Icon className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2} />
          {text}
        </span>
      ))}
    </div>
  );
}
