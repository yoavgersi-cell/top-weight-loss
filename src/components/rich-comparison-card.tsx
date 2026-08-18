import { Check, ArrowUpRight, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { ProviderCta } from "./provider-cta";
import type { ReviewData } from "@/lib/config";

export interface RichCardProduct {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  highlights: string[];
  affiliateUrl: string;
  rank: number;
  rating: number;
  ratingLabel: string;
  starRating?: number;
  badge?: string;
  trustpilotRating?: string;
  trustpilotReviewCount?: string;
}

// A rich, content-dense provider card for the ranking — surfaces the real
// per-provider research we already hold (editorial score, treatments, verified
// pricing summary, key facts, trust signals) instead of a thin table row. Every
// value is grounded in config data; nothing is fabricated. Pricing text comes
// straight from the review's own pricingSummary (which carries the compounded-
// meds disclaimer), so no stale number is invented here.
export function RichComparisonCard({
  product,
  review,
  linkPrefix = "",
}: {
  product: RichCardProduct;
  review?: ReviewData;
  linkPrefix?: string;
}) {
  const stars = product.starRating ?? Math.round(product.rating / 2);
  const treatments = review?.treatmentOptions ?? [];
  const facts = (review?.keyFeatures ?? product.highlights).slice(0, 4);
  const pill = review?.trustBadges?.[0];
  const startingPlan = review?.pricingPlans?.[0];
  const intro = review?.reviewIntro ?? review?.shortSummary ?? product.tagline;
  const reviewHref = `${linkPrefix}/reviews/${review?.slug ?? product.id}`;

  return (
    <article className="relative rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Rank / badge */}
      <div className="absolute -top-3 left-6 flex items-center gap-2">
        <span className="rounded-full bg-[#191919] px-3 py-1 text-[12px] font-bold text-white">
          #{product.rank}
        </span>
        {product.badge && (
          <span className="rounded-full bg-[#EBA51E] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#3A2A06]">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-6 p-6 pt-8 sm:flex-row sm:p-7 sm:pt-9">
        {/* ── Left: logo + score ── */}
        <div className="flex shrink-0 flex-row items-center gap-5 sm:w-[170px] sm:flex-col sm:items-start sm:gap-4">
          <div className="flex h-[46px] w-[150px] items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.logo} alt={`${product.name} logo`} className="max-h-full max-w-full object-contain object-left" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-[#0C4B75] px-2.5 py-1 text-[18px] font-extrabold leading-none text-white">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-[12px] font-bold uppercase tracking-wide text-[#0C4B75]">{product.ratingLabel}</span>
            </div>
            <div className="mt-1.5 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={i < stars ? "h-3.5 w-3.5 fill-[#FDB515] text-[#FDB515]" : "h-3.5 w-3.5 fill-gray-200 text-gray-200"}
                  strokeWidth={0}
                />
              ))}
            </div>
            {product.trustpilotRating && product.trustpilotReviewCount && (
              <p className="mt-1.5 text-[11px] text-gray-400">
                {product.trustpilotRating}/5 · {product.trustpilotReviewCount} reviews
              </p>
            )}
          </div>
        </div>

        {/* ── Middle: content ── */}
        <div className="min-w-0 flex-1">
          {pill && (
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[12px] font-semibold text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
              {pill}
            </span>
          )}

          {treatments.length > 0 && (
            <p className="text-[13.5px] leading-relaxed text-gray-600">
              <span className="font-bold text-[#191919]">Treatments:</span> {treatments.join(", ")}
            </p>
          )}

          {review?.pricingSummary && (
            <p className="mt-2 text-[13.5px] leading-relaxed text-gray-600">
              <span className="font-bold text-[#191919]">Pricing:</span> {review.pricingSummary}
            </p>
          )}

          {facts.length > 0 && (
            <ul className="mt-4 grid gap-x-5 gap-y-2 sm:grid-cols-2">
              {facts.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px] leading-snug text-gray-700">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-4 text-[13px] leading-relaxed text-gray-500 line-clamp-2">{intro}</p>
          <Link href={reviewHref} className="mt-1.5 inline-block text-[13px] font-semibold text-[#0C4B75] hover:underline">
            Read full {product.name} review →
          </Link>
        </div>

        {/* ── Right: price + CTA ── */}
        <div className="flex shrink-0 flex-col items-stretch justify-center gap-3 sm:w-[190px]">
          {startingPlan?.price && (
            <div className="text-center sm:text-right">
              <p className="text-[12px] text-gray-400">Pricing starts at</p>
              <p className="text-[22px] font-extrabold leading-tight text-[#191919]">
                {startingPlan.price}
                {startingPlan.unit && <span className="text-[13px] font-semibold text-gray-500">{startingPlan.unit}</span>}
              </p>
            </div>
          )}
          <ProviderCta
            href={product.affiliateUrl}
            providerName={product.name}
            providerSlug={product.id}
            position={product.rank}
            pageType="listing"
            sourceFlow="main_comparison"
            className="flex h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#0C4B75] text-[15px] font-bold text-white transition-colors hover:bg-[#093d61]"
          >
            Visit Site
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </ProviderCta>
          <Link href={reviewHref} className="text-center text-[12.5px] font-semibold text-[#0C4B75] hover:underline sm:text-right">
            Read review
          </Link>
        </div>
      </div>
    </article>
  );
}
