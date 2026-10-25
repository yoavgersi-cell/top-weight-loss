import type { ProviderReviewRecord } from "@/data/reviews/types";
import { REVIEW_THEMES, resolveThemes, type ResolvedTheme } from "@/data/reviews/themes";
import type { TrustpilotReview } from "@/lib/config";

// ───── What customers say ─────
// A computed, citeable summary of a provider's stored customer reviews:
// praise themes and complaint themes, each with the number of stored reviews
// that mention it and one verbatim excerpt. The themes live in
// src/data/reviews/themes.ts as lists of review references; counts come from
// the references that resolve against the registry, never from a typed
// number. Renders nothing for providers without themes or with fewer than
// eight stored reviews.

const MIN_REVIEWS = 8;

function reviewTime(r: TrustpilotReview): number {
  if (!r.date) return 0;
  const t = new Date(r.date).getTime();
  return isNaN(t) ? 0 : t;
}
const fmt = (t: number) => new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

function excerpt(r: TrustpilotReview, max = 220): string {
  const text = (r.text || r.title || "").replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const at = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(", "), cut.lastIndexOf(" "));
  return cut.slice(0, at > 80 ? at : max).replace(/[,.;:]$/, "") + "…";
}

function ThemeList({ items, total, tone }: { items: ResolvedTheme[]; total: number; tone: "praise" | "criticism" }) {
  const badge = tone === "praise" ? "bg-emerald-50 text-emerald-800 ring-emerald-200" : "bg-amber-50 text-amber-800 ring-amber-200";
  return (
    <ol className="space-y-4">
      {items.map((t) => (
        <li key={t.label}>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <strong className="text-[15px] text-[#191919]">{t.label}</strong>
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ring-1 [font-variant-numeric:tabular-nums] ${badge}`}>
              {t.count} of {total} reviews
            </span>
          </div>
          <p className="mt-1 text-[14px] leading-[1.7] text-gray-700">{t.detail}</p>
          {t.quoted && (
            <blockquote className="mt-2 border-l-2 border-gray-200 pl-3 text-[13.5px] leading-[1.65] text-gray-600">
              &ldquo;{excerpt(t.quoted)}&rdquo;
              <cite className="mt-1 block text-[12px] not-italic text-gray-400">
                {t.quoted.name}, {t.quoted.rating} star{t.quoted.rating === 1 ? "" : "s"}
                {t.quoted.date ? `, ${t.quoted.date}` : ""}
              </cite>
            </blockquote>
          )}
        </li>
      ))}
    </ol>
  );
}

export function CustomerThemes({
  providerName,
  record,
  methodologyHref = "/weight-loss/how-we-rank#customer-reviews",
  className = "",
}: {
  providerName: string;
  record: ProviderReviewRecord;
  methodologyHref?: string;
  className?: string;
}) {
  const themes = REVIEW_THEMES[record.providerId];
  if (!themes) return null;
  const { praise, criticism, total } = resolveThemes(record, themes);
  if (total < MIN_REVIEWS || (praise.length === 0 && criticism.length === 0)) return null;

  const all = record.batches.flatMap((b) => b.reviews);
  const dated = all.map(reviewTime).filter((t) => t > 0);
  const range = dated.length ? { from: Math.min(...dated), to: Math.max(...dated) } : null;
  const positive = all.filter((r) => r.rating >= 4).length;
  const low = all.filter((r) => r.rating <= 3).length;
  const pct = (n: number) => Math.round((n / total) * 100);

  return (
    <section className={`rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 ${className}`} aria-labelledby="customer-themes-heading">
      <h2 id="customer-themes-heading" className="mb-3 text-[22px] font-bold text-[#191919]">
        What do {providerName} customers say in their reviews?
      </h2>
      <p className="mb-5 text-[15px] leading-[1.75] text-gray-700">
        Across the <strong>{total} reviews</strong> we transcribed from {providerName}&rsquo;s Trustpilot profile
        {range && <> (dated {fmt(range.from)} to {fmt(range.to)})</>}, {positive} rate it 4 or 5 stars ({pct(positive)}%) and {low} rate it 3 stars or lower ({pct(low)}%). These are the themes that come up, with the number of reviews that mention each; one review can count toward more than one theme.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-emerald-700">What customers praise</h3>
          {praise.length ? <ThemeList items={praise} total={total} tone="praise" /> : <p className="text-[14px] text-gray-500">No praise themes in the stored set.</p>}
        </div>
        <div>
          <h3 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-amber-700">What customers complain about</h3>
          {criticism.length ? <ThemeList items={criticism} total={total} tone="criticism" /> : <p className="text-[14px] text-gray-500">No complaint themes in the stored set.</p>}
        </div>
      </div>
      {themes.note && <p className="mt-5 text-[13.5px] leading-[1.7] text-gray-600">{themes.note}</p>}
      <p className="mt-4 text-[12.5px] leading-relaxed text-gray-400">
        Counts are computed from the reviews stored for this page, each of which appears in full below.{" "}
        <a href={methodologyHref} className="text-[#0C4B75] underline underline-offset-2 hover:text-[#093d61]">
          How we collect customer reviews
        </a>
      </p>
    </section>
  );
}
