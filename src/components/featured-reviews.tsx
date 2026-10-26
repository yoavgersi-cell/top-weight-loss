import { Star } from "lucide-react";
import type { ProviderReviewRecord } from "@/data/reviews/types";
import { REVIEW_THEMES, THEME_CATEGORY_LABELS, resolveFeatured, type ThemeCategory } from "@/data/reviews/themes";

// ───── Featured reviews ─────
// Four or five stored reviews chosen in src/data/reviews/themes.ts as
// representative of what the provider is praised for, each tagged with the
// experience area it is mainly about. Text is the stored review text in full
// (long ones are cut at a sentence boundary); name, date and rating are shown
// exactly as stored. Renders nothing when fewer than three refs resolve.

const MIN_FEATURED = 3;
const MAX_CHARS = 420;

const TOPIC_STYLE: Record<ThemeCategory, string> = {
  support: "bg-sky-50 text-sky-800 ring-sky-200",
  clinician: "bg-violet-50 text-violet-800 ring-violet-200",
  delivery: "bg-teal-50 text-teal-800 ring-teal-200",
  pricing: "bg-amber-50 text-amber-800 ring-amber-200",
  results: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  process: "bg-slate-100 text-slate-700 ring-slate-200",
};

function clip(text: string, max = MAX_CHARS): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const at = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  return (at > 120 ? cut.slice(0, at + 1) : cut.replace(/\s\S*$/, "")) + (at > 120 ? "" : "…");
}

export function FeaturedReviews({
  providerName,
  record,
  className = "",
}: {
  providerName: string;
  record: ProviderReviewRecord;
  className?: string;
}) {
  const themes = REVIEW_THEMES[record.providerId];
  if (!themes) return null;
  const featured = resolveFeatured(record, themes);
  if (featured.length < MIN_FEATURED) return null;
  const total = record.batches.reduce((n, b) => n + b.reviews.length, 0);

  return (
    <section className={`rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 ${className}`} aria-labelledby="featured-reviews-heading">
      <h2 id="featured-reviews-heading" className="mb-1 text-[22px] font-bold text-[#191919]">
        Featured {providerName} reviews
      </h2>
      <p className="mb-5 text-[14px] leading-[1.7] text-gray-500">
        {featured.length} of the {total} reviews we transcribed from {providerName}&rsquo;s Trustpilot profile, chosen as
        representative of what customers praise most. Each is tagged with what it is mainly about; the full set is below.
      </p>
      <ul className="grid gap-4 sm:grid-cols-2">
        {featured.map(({ review, topic }) => (
          <li key={`${review.name}|${review.date ?? ""}`} className="flex flex-col rounded-xl border border-gray-100 bg-gray-50/60 p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ring-1 ${TOPIC_STYLE[topic]}`}>
                {THEME_CATEGORY_LABELS[topic]}
              </span>
              <span className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < review.rating ? "fill-[#00b67a] text-[#00b67a]" : "fill-gray-200 text-gray-200"}`}
                    strokeWidth={0}
                  />
                ))}
              </span>
            </div>
            {review.title && <p className="mb-1 text-[14.5px] font-bold text-[#191919]">{review.title}</p>}
            <blockquote className="text-[14px] leading-[1.7] text-gray-700">&ldquo;{clip(review.text || review.title || "")}&rdquo;</blockquote>
            <cite className="mt-3 block text-[12.5px] not-italic text-gray-400">
              {review.name}
              {review.date ? `, ${review.date}` : ""}
              {" · "}
              {review.rating} star{review.rating === 1 ? "" : "s"} on Trustpilot
            </cite>
          </li>
        ))}
      </ul>
    </section>
  );
}
