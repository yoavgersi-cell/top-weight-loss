import { Check } from "lucide-react";
import { RatingBadge } from "./rating-badge";

interface ComparisonCardProduct {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  highlights: string[];
  affiliateUrl: string;
  ctaText: string;
  rank: number;
  rating: number;
  ratingLabel: string;
  badge?: string;
  trustpilotReviews?: string;
}

interface ComparisonCardProps {
  product: ComparisonCardProduct;
  hideRank?: boolean;
}

export function ComparisonCard({ product, hideRank }: ComparisonCardProps) {
  return (
    <article className="relative rounded-md border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md overflow-hidden">
      {/* Rank badge — top-left, only bottom-right rounded */}
      {!hideRank && (
        <div className="absolute left-0 top-0 z-10 flex h-[34px] w-[34px] items-center justify-center rounded-br-lg bg-[#191919] text-[18px] font-bold text-white">
          {product.rank}
        </div>
      )}

      {/* Badge (e.g. "Our Most Popular") */}
      {!hideRank && product.badge && (
        <div className="absolute left-[42px] top-0 z-10 flex h-[34px] items-center rounded-br-lg bg-[#0C4B75] px-4 text-[12px] font-semibold tracking-wide text-white uppercase">
          {product.badge}
        </div>
      )}

      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden sm:flex sm:flex-row sm:h-[188px]">
        {/* Column 1: Logo */}
        <div className="flex items-center justify-center px-6 sm:w-[220px] sm:shrink-0">
          <div className="flex h-[50px] w-[130px] items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.logo}
              alt={`${product.name} logo`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* Column 2: Content */}
        <div className="flex-1 px-6 py-5">
          <h3 className="text-[12px] font-semibold text-[#1A1A1A]">{product.name}</h3>
          {product.trustpilotReviews && (
            <TrustpilotLine reviews={product.trustpilotReviews} />
          )}
          <p className="mt-3 text-[12px] font-semibold text-[#1A1A1A]">{product.tagline}</p>
          <ul className="mt-1.5 space-y-1">
            {product.highlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="flex items-center gap-2 text-[12px] leading-[1.35] text-gray-800">
                <Check className="h-3.5 w-3.5 shrink-0 text-[#0B5E9E]" strokeWidth={2} />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Rating + CTA */}
        <div className="flex flex-col items-center justify-center gap-4 px-6 py-5 sm:w-[200px] sm:shrink-0">
          <RatingBadge rating={product.rating} label={product.ratingLabel} />
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="flex h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-[#0C4B75] text-[15px] font-bold text-white transition-colors hover:bg-[#093d61]"
          >
            Visit Site
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>

      {/* ===== MOBILE LAYOUT ===== */}
      <div className="flex flex-col sm:hidden p-5 pt-12">
        {/* Row 1: Logo left, Rating right */}
        <div className="flex items-start justify-between">
          <div className="flex h-[40px] w-[120px] items-center justify-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.logo}
              alt={`${product.name} logo`}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <RatingBadge rating={product.rating} label={product.ratingLabel} />
        </div>

        {product.trustpilotReviews && (
          <div className="mt-4">
            <TrustpilotLine reviews={product.trustpilotReviews} />
          </div>
        )}

        {/* Tagline */}
        <p className="mt-3 text-[14px] font-semibold text-[#1A1A1A]">{product.tagline}</p>

        {/* Bullets */}
        <ul className="mt-3 space-y-2">
          {product.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight} className="flex items-start gap-2 text-[14px] leading-[1.4] text-gray-800">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0B5E9E]" strokeWidth={2} />
              {highlight}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-5 flex h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#0C4B75] text-[16px] font-bold text-white transition-colors hover:bg-[#093d61]"
        >
          Visit Site
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </article>
  );
}

function TrustpilotLine({ reviews }: { reviews: string }) {
  return (
    <p className="mt-1 flex items-center gap-1 text-[13px] font-semibold text-[#191919] sm:mt-1 sm:text-[13px]">
      {reviews} reviews by
      <svg className="h-[15px] w-[15px]" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#00B67A" />
      </svg>
      Trustpilot
    </p>
  );
}
