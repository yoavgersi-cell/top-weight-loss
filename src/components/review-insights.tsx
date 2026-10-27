import Link from "next/link";
import type { ProviderReviewRecord } from "@/data/reviews/types";
import { REVIEW_THEMES, resolveThemes } from "@/data/reviews/themes";

// ───── Review insights ─────
// The short version of "What customers say", placed high on the review page:
// a three-or-four-sentence summary of the stored set, then the three most
// mentioned praise themes and the three most mentioned complaint themes with
// their counts. The summary is written from the themes (src/data/reviews/
// themes.ts); the counts are computed from the review references that
// resolve against the registry. The full themes block, with excerpts, sits
// further down the page and is linked from here.

const MIN_REVIEWS = 8;
const TOP = 3;

export function ReviewInsights({
  providerName,
  record,
  fullHref = "#customer-themes-heading",
  analysisHref,
  className = "",
}: {
  providerName: string;
  record: ProviderReviewRecord;
  fullHref?: string;
  /** The provider's review-analysis page, when its stored set is large enough to have one. */
  analysisHref?: string;
  className?: string;
}) {
  const themes = REVIEW_THEMES[record.providerId];
  if (!themes?.summary) return null;
  const { praise, criticism, total } = resolveThemes(record, themes);
  if (total < MIN_REVIEWS) return null;
  const topPraise = [...praise].sort((a, b) => b.count - a.count).slice(0, TOP);
  const topCriticism = [...criticism].sort((a, b) => b.count - a.count).slice(0, TOP);

  return (
    <section className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7 ${className}`} aria-labelledby="review-insights-heading">
      <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.07em] text-[#0C4B75]">Review insights</p>
      <h2 id="review-insights-heading" className="mb-3 text-[20px] font-bold text-[#191919]">
        What {providerName} customers say, in brief
      </h2>
      <p className="mb-5 text-[15px] leading-[1.8] text-gray-700">{themes.summary}</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
          <h3 className="mb-2.5 text-[12px] font-bold uppercase tracking-wider text-emerald-700">Most praised</h3>
          <ol className="space-y-2">
            {topPraise.map((t) => (
              <li key={t.label} className="flex items-baseline justify-between gap-3 text-[14px] text-[#191919]">
                <span className="font-medium">{t.label}</span>
                <span className="shrink-0 text-[12px] font-semibold text-emerald-800 [font-variant-numeric:tabular-nums]">
                  {t.count} of {total}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-4">
          <h3 className="mb-2.5 text-[12px] font-bold uppercase tracking-wider text-amber-700">Most criticised</h3>
          <ol className="space-y-2">
            {topCriticism.map((t) => (
              <li key={t.label} className="flex items-baseline justify-between gap-3 text-[14px] text-[#191919]">
                <span className="font-medium">{t.label}</span>
                <span className="shrink-0 text-[12px] font-semibold text-amber-800 [font-variant-numeric:tabular-nums]">
                  {t.count} of {total}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <p className="mt-4 text-[12.5px] leading-relaxed text-gray-400">
        Counts are the number of the {total} stored reviews that mention each theme; one review can count toward several.{" "}
        <a href={fullHref} className="text-[#0C4B75] underline underline-offset-2 hover:text-[#093d61]">
          Every theme, with excerpts
        </a>
        {analysisHref && (
          <>
            {" "}&middot;{" "}
            <Link href={analysisHref} className="text-[#0C4B75] underline underline-offset-2 hover:text-[#093d61]">
              Full analysis of all {total} reviews
            </Link>
          </>
        )}
      </p>
    </section>
  );
}
