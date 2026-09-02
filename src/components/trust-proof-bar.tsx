import type { SiteConfig } from "@/lib/config";
import { PROVIDER_DATA_CHECKED } from "@/lib/config";
import { REDDIT_COMMUNITY_FEEDBACK } from "@/components/reddit-community";

// Editorial research provenance line for money pages. Not a dashboard: a small
// "OUR RESEARCH" kicker over one lede where the review count is the scannable
// anchor, framed by hairline rules. Every figure is derived from the live
// config at render time and is real:
//   - reviews count  = the SUM of providers' real Trustpilot review counts,
//     floored to a round number so the "+" is always an understatement
//   - providers       = the providers we actually review in this vertical
//   - "re-verified <month>" = PROVIDER_DATA_CHECKED
// The count is attributed to Trustpilot (its true source); Reddit is named as a
// SEPARATE qualitative source and only when these providers actually have
// Reddit material, so it never implies a Reddit review count. No invented
// figures, no fake counters, no decorative UI.
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

  // Reddit is only claimed when these providers genuinely have Reddit material.
  const hasReddit = (config.providers ?? []).some((p) => REDDIT_COMMUNITY_FEEDBACK[p.id]);

  // The lede figure: the review count when we have one, else the provider count.
  const figure =
    reviewsFloor > 0
      ? { value: `${fmt(reviewsFloor)}+`, label: "verified Trustpilot reviews analyzed" }
      : providersCompared > 0
        ? { value: String(providersCompared), label: "providers researched in depth" }
        : null;

  if (!figure) return null;

  // Second line - qualitative source + research scope, in flowing prose.
  const showScope = providersCompared > 0 && reviewsFloor > 0;
  const contextParts = [
    hasReddit && "cross-referenced with real Reddit discussions",
    showScope && `weighed across the ${providersCompared} providers we track and price-check`,
  ].filter(Boolean) as string[];
  const context =
    contextParts.length > 0
      ? contextParts.join(", ").replace(/^./, (c) => c.toUpperCase()) + "."
      : null;

  return (
    <div className="mb-8 border-y border-gray-200 py-4 sm:py-[18px]">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">Our research</p>

      {/* Lede: the count is the scannable anchor, tied to Trustpilot as source */}
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-[28px] font-extrabold leading-none tracking-[-0.02em] text-[#0C4B75] sm:text-[32px]">
          {figure.value}
        </span>
        <span className="text-[13.5px] font-semibold text-[#191919] sm:text-[14.5px]">{figure.label}</span>
      </p>

      {context && <p className="mt-2 max-w-[560px] text-[13px] leading-[1.6] text-gray-600">{context}</p>}

      <p className="mt-1.5 text-[11.5px] text-gray-400">Prices re-verified {PROVIDER_DATA_CHECKED}</p>
    </div>
  );
}
