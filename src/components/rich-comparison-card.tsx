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

// Compact-but-richer ranking card. Surfaces a scannable slice of the real
// per-provider research (score, a trust pill, treatments, a few key facts,
// starting price) without the density of a full review. Every value is grounded
// in config data — nothing fabricated.
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
  const treatments = (review?.treatmentOptions ?? []).slice(0, 3);
  const facts = (review?.keyFeatures ?? product.highlights).slice(0, 3);
  const pill = review?.trustBadges?.[0];
  const startingPlan = review?.pricingPlans?.[0];
  const reviewHref = `${linkPrefix}/reviews/${review?.slug ?? product.id}`;

  return (
    <article className="relative rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Rank / badge */}
      <div className="absolute -top-2.5 left-5 flex items-center gap-2">
        <span className="rounded-full bg-[#191919] px-2.5 py-0.5 text-[11px] font-bold text-white">#{product.rank}</span>
        {product.badge && (
          <span className="rounded-full bg-[#EBA51E] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#3A2A06]">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
        {/* Left: logo + score (stacked) */}
        <div className="flex flex-row items-center gap-4 sm:w-[150px] sm:shrink-0 sm:flex-col sm:items-start sm:gap-2.5">
          <div className="flex h-[38px] w-[130px] shrink-0 items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.logo} alt={`${product.name} logo`} className="max-h-full max-w-full object-contain object-left" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="rounded-md bg-[#0C4B75] px-2 py-0.5 text-[15px] font-extrabold leading-none text-white">
              {product.rating.toFixed(1)}
            </span>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={i < stars ? "h-3 w-3 fill-[#FDB515] text-[#FDB515]" : "h-3 w-3 fill-gray-200 text-gray-200"}
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#0C4B75]">{product.ratingLabel}</p>
            </div>
          </div>
        </div>

        {/* Middle: pill + treatments + facts */}
        <div className="min-w-0 flex-1">
          {pill && (
            <span className="mb-2 inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11.5px] font-semibold text-emerald-700">
              <ShieldCheck className="h-3 w-3" strokeWidth={2} />
              {pill}
            </span>
          )}
          {treatments.length > 0 && (
            <p className="text-[12.5px] leading-snug text-gray-500 line-clamp-1">
              <span className="font-semibold text-gray-700">Treatments:</span> {treatments.join(", ")}
            </p>
          )}
          {facts.length > 0 && (
            <ul className="mt-2 grid gap-x-4 gap-y-1 sm:grid-cols-2">
              {facts.map((f) => (
                <li key={f} className="flex items-start gap-1.5 text-[12.5px] leading-snug text-gray-700">
                  <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" strokeWidth={2.5} />
                  <span className="line-clamp-2">{f}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right: price + CTA */}
        <div className="flex shrink-0 flex-col items-stretch gap-1.5 sm:w-[170px]">
          {startingPlan?.price && (
            <p className="text-center text-[12px] text-gray-500 sm:text-right">
              from{" "}
              <span className="text-[16px] font-extrabold text-[#191919]">{startingPlan.price}</span>
              {startingPlan.unit && <span className="font-semibold text-gray-500">{startingPlan.unit}</span>}
            </p>
          )}
          <ProviderCta
            href={product.affiliateUrl}
            providerName={product.name}
            providerSlug={product.id}
            position={product.rank}
            pageType="listing"
            sourceFlow="main_comparison"
            className="flex h-[42px] w-full items-center justify-center gap-1.5 rounded-xl bg-[#0C4B75] text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
          >
            Visit Site
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </ProviderCta>
          <Link href={reviewHref} className="text-center text-[12px] font-semibold text-[#0C4B75] hover:underline sm:text-right">
            Read review
          </Link>
        </div>
      </div>
    </article>
  );
}
