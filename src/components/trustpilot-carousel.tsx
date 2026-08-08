"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TrustpilotReview } from "@/lib/config";

const TP_GREEN = "#00B67A";

function TrustpilotStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="white" className={className}>
      <path d="M12 2l2.6 6.6 7.4.4-5.7 4.6 1.9 7.1L12 16.8l-6.2 3.9 1.9-7.1L2 9l7.4-.4L12 2z" />
    </svg>
  );
}

function TrustpilotStars({ rating, boxClass = "h-5 w-5" }: { rating: number; boxClass?: string }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`flex items-center justify-center ${boxClass}`}
          style={{ backgroundColor: i < rating ? TP_GREEN : "#DCDCE6" }}
        >
          <TrustpilotStar className="h-[68%] w-[68%]" />
        </div>
      ))}
    </div>
  );
}

// Official Trustpilot star mark: green star with dark-green notch
function TrustpilotStarMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1133 1080" className={className} aria-hidden="true">
      <path
        fill={TP_GREEN}
        d="M1132.8 412.8H700.2L566.4 0 432.6 412.8 0 412.5l350.1 254.7L216 1080l350.4-254.4L916.8 1080 783 667.2l349.8-254.4z"
      />
      <path fill="#005128" d="M813.3 760.5 783 667.2 566.4 825.6z" />
    </svg>
  );
}

function TrustpilotWordmark({ starClass = "h-5 w-5", textClass = "text-[17px]" }: { starClass?: string; textClass?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5" aria-label="Trustpilot">
      <TrustpilotStarMark className={starClass} />
      <span className={`${textClass} font-bold tracking-tight text-[#191919]`}>Trustpilot</span>
    </span>
  );
}

function ReviewCard({ r }: { r: TrustpilotReview }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-3">
        <TrustpilotStars rating={r.rating} boxClass="h-[18px] w-[18px]" />
      </div>
      {r.title && (
        <p className="mb-1.5 text-[14px] font-bold leading-snug text-[#191919]">{r.title}</p>
      )}
      <p className="mb-4 flex-1 text-[13px] leading-relaxed text-gray-600">
        &ldquo;{r.text}&rdquo;
      </p>
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0C4B75]/10 text-[12px] font-bold text-[#0C4B75]">
          {r.name.charAt(0)}
        </div>
        <div>
          <p className="text-[13px] font-semibold text-[#191919]">{r.name}</p>
          <p className="text-[11px] text-gray-400">{r.location}</p>
        </div>
      </div>
    </div>
  );
}

export function TrustpilotCarousel({
  providerName,
  providerLogo,
  reviews,
  rating,
  reviewCount,
}: {
  providerName: string;
  providerLogo?: string;
  reviews: TrustpilotReview[];
  rating?: string;
  reviewCount?: string;
}) {
  const [current, setCurrent] = useState(0);
  const [page, setPage] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const total = reviews.length;
  const perPage = 4;
  const pageCount = Math.ceil(total / perPage);

  // Auto-advance mobile carousel
  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total]);

  // Auto-advance desktop pages (each shows up to 4 reviews)
  useEffect(() => {
    if (pageCount <= 1) return;
    const timer = setInterval(() => {
      setPage((prev) => (prev + 1) % pageCount);
    }, 6000);
    return () => clearInterval(timer);
  }, [pageCount]);

  // Scroll mobile carousel
  useEffect(() => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[current] as HTMLElement;
    if (card) {
      scrollRef.current.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
    }
  }, [current]);

  if (total === 0) return null;

  const desktopVisible = reviews.slice(page * perPage, page * perPage + perPage);
  const numericRating = rating ? Math.round(parseFloat(rating)) : null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-5 sm:p-6">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {providerLogo && (
            <div className="flex h-[28px] w-[90px] items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={providerLogo} alt={`${providerName} logo`} className="max-h-full max-w-full object-contain" />
            </div>
          )}
          <h3 className="text-[16px] font-bold text-[#191919]">
            {providerName} <span className="font-medium text-gray-400">reviews on</span>
          </h3>
          <TrustpilotWordmark />
        </div>
        {rating && numericRating !== null && !isNaN(numericRating) ? (
          <div className="flex items-center gap-2">
            <TrustpilotStars rating={numericRating} boxClass="h-[20px] w-[20px]" />
            <span className="text-[14px] font-bold text-[#191919]">{rating}</span>
            {reviewCount && (
              <span className="text-[12px] text-gray-400">({reviewCount} reviews)</span>
            )}
          </div>
        ) : (
          <span className="text-[12px] text-gray-400">Source: Trustpilot</span>
        )}
      </div>

      {/* Desktop: paginated grid — up to 4 per page, arrows + dots to see the rest */}
      <div className="hidden sm:block">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {desktopVisible.map((r, i) => (
            <ReviewCard key={`${page}-${i}`} r={r} />
          ))}
        </div>

        {pageCount > 1 && (
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((page - 1 + pageCount) % pageCount)}
              aria-label="Previous reviews"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  aria-label={`Go to reviews page ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === page ? "w-5 bg-[#0C4B75]" : "w-1.5 bg-gray-200 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setPage((page + 1) % pageCount)}
              aria-label="Next reviews"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile: horizontal scroll carousel */}
      <div className="sm:hidden">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth pb-3 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {reviews.map((r, i) => (
            <div key={i} className="w-[85%] shrink-0 snap-center">
              <ReviewCard r={r} />
            </div>
          ))}
        </div>

        {/* Dots + arrows */}
        <div className="mt-3 flex items-center justify-between px-1">
          <div className="flex gap-1.5">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? "w-5 bg-[#0C4B75]" : "w-1.5 bg-gray-200"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => setCurrent((current - 1 + total) % total)}
              aria-label="Previous review"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 active:bg-gray-50"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              onClick={() => setCurrent((current + 1) % total)}
              aria-label="Next review"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 active:bg-gray-50"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
