import Link from "next/link";
import type { ProviderReviewRecord } from "@/data/reviews/types";
import {
  REVIEW_THEMES,
  THEME_CATEGORY_LABELS,
  categoryBreakdown,
  type CategoryBreakdown,
  type ThemeCategory,
} from "@/data/reviews/themes";
import { formatReviewDate } from "@/data/reviews";

// ───── Review face-off ─────
// Two providers' stored review sets side by side, by experience area. For
// each area the table shows how many of each provider's stored reviews
// praise it and how many criticise it (distinct reviews, from the theme
// references that resolve against the registry), and which side comes out
// ahead on the net rate per 100 reviews. Renders only when both providers
// have themes and at least eight stored reviews.

const MIN_REVIEWS = 8;
/** Net-rate gap (points per 100 reviews) below which an area is called even. */
const EVEN_BAND = 5;

type Side = { name: string; href: string; record: ProviderReviewRecord; rows: CategoryBreakdown[]; total: number };

function net(row: CategoryBreakdown, total: number): number {
  return total ? ((row.praise - row.criticism) / total) * 100 : 0;
}

function aggregateLine(record: ProviderReviewRecord): string | null {
  const a = record.aggregate;
  if (!a) return null;
  const when = a.verifiedOn ? `, read ${formatReviewDate(a.verifiedOn)}` : "";
  return `${a.rating} across ${a.reviewCount} reviews${when}`;
}

export function ReviewFaceoff({
  a,
  b,
  className = "",
}: {
  a: { name: string; href: string; record: ProviderReviewRecord };
  b: { name: string; href: string; record: ProviderReviewRecord };
  className?: string;
}) {
  const ta = REVIEW_THEMES[a.record.providerId];
  const tb = REVIEW_THEMES[b.record.providerId];
  if (!ta || !tb) return null;
  const ba = categoryBreakdown(a.record, ta);
  const bb = categoryBreakdown(b.record, tb);
  if (ba.total < MIN_REVIEWS || bb.total < MIN_REVIEWS) return null;

  const A: Side = { ...a, rows: ba.rows, total: ba.total };
  const B: Side = { ...b, rows: bb.rows, total: bb.total };

  // Only areas that at least one side's reviews actually talk about.
  const areas = A.rows
    .map((ra, i) => ({ category: ra.category, ra, rb: B.rows[i] }))
    .filter(({ ra, rb }) => ra.praise + ra.criticism + rb.praise + rb.criticism > 0)
    .map((x) => {
      // An area only one side's reviewers mention is not a lead for either:
      // the other set simply does not talk about it.
      const onlyA = x.rb.praise + x.rb.criticism === 0;
      const onlyB = x.ra.praise + x.ra.criticism === 0;
      const gap = net(x.ra, A.total) - net(x.rb, B.total);
      const lead: "a" | "b" | "even" | "onlyA" | "onlyB" = onlyA ? "onlyA" : onlyB ? "onlyB" : Math.abs(gap) < EVEN_BAND ? "even" : gap > 0 ? "a" : "b";
      return { ...x, lead };
    });

  const leads = (side: "a" | "b") => areas.filter((x) => x.lead === side).map((x) => THEME_CATEGORY_LABELS[x.category]);
  const leadsA = leads("a");
  const leadsB = leads("b");
  const list = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}` : xs[0]);

  const cell = (row: CategoryBreakdown) => (
    <>
      <span className="font-semibold text-emerald-700 [font-variant-numeric:tabular-nums]">{row.praise}</span>
      <span className="text-gray-400"> praise · </span>
      <span className="font-semibold text-amber-700 [font-variant-numeric:tabular-nums]">{row.criticism}</span>
      <span className="text-gray-400"> criticism</span>
    </>
  );

  const aggA = aggregateLine(A.record);
  const aggB = aggregateLine(B.record);

  return (
    <section className={`overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`} aria-labelledby="review-faceoff-heading">
      <div className="border-b border-gray-100 px-4 pb-4 pt-5 sm:px-6">
        <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.07em] text-[#0C4B75]">Customer reviews, side by side</p>
        <h2 id="review-faceoff-heading" className="text-[20px] font-bold text-[#191919] sm:text-[22px]">
          What {A.name} and {B.name} customers say
        </h2>
        <p className="mt-2 text-[14px] leading-[1.7] text-gray-600">
          From the <strong>{A.total}</strong> {A.name} and <strong>{B.total}</strong> {B.name} reviews we transcribed from each
          provider&rsquo;s Trustpilot profile, grouped by what the review is about. Each cell is the number of distinct reviews
          that praise or criticise that area; the last column compares the net rate per 100 reviews, and calls a gap under{" "}
          {EVEN_BAND} points even. An area that only one side&rsquo;s reviewers mention is not counted as a lead.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50/80">
              <th className="py-3 pl-4 pr-2 text-[11px] font-bold uppercase tracking-[0.06em] text-gray-400 sm:pl-6 sm:text-[12px]">Area</th>
              <th className="px-2 py-3 text-[13px] font-bold text-[#191919] sm:px-3 sm:text-[14px]">
                {A.name}
                {aggA && <span className="block text-[11.5px] font-medium text-gray-400">Trustpilot {aggA}</span>}
              </th>
              <th className="px-2 py-3 text-[13px] font-bold text-[#191919] sm:px-3 sm:text-[14px]">
                {B.name}
                {aggB && <span className="block text-[11.5px] font-medium text-gray-400">Trustpilot {aggB}</span>}
              </th>
              <th className="py-3 pl-2 pr-4 text-[11px] font-bold uppercase tracking-[0.06em] text-gray-400 sm:pr-6 sm:text-[12px]">Ahead</th>
            </tr>
          </thead>
          <tbody>
            {areas.map(({ category, ra, rb, lead }) => (
              <tr key={category} className="border-b border-gray-100 align-top last:border-0">
                <td className="py-3 pl-4 pr-2 text-[13px] font-semibold text-gray-600 sm:pl-6 sm:text-[13.5px]">{THEME_CATEGORY_LABELS[category as ThemeCategory]}</td>
                <td className="px-2 py-3 text-[13px] sm:px-3">{cell(ra)}</td>
                <td className="px-2 py-3 text-[13px] sm:px-3">{cell(rb)}</td>
                <td className="py-3 pl-2 pr-4 text-[13px] font-semibold sm:pr-6">
                  {lead === "even" ? (
                    <span className="text-gray-400">Even</span>
                  ) : lead === "onlyA" || lead === "onlyB" ? (
                    <span className="font-medium text-gray-400">Only {lead === "onlyA" ? A.name : B.name} reviewers mention it</span>
                  ) : (
                    <span className="text-[#0C4B75]">{lead === "a" ? A.name : B.name}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-2 border-t border-gray-100 px-4 py-4 text-[14px] leading-[1.7] text-gray-700 sm:px-6">
        <p>
          <span className="font-bold text-[#191919]">Where {A.name} comes out ahead:</span>{" "}
          {leadsA.length ? list(leadsA) : "no area by more than the even band"}.
        </p>
        <p>
          <span className="font-bold text-[#191919]">Where {B.name} comes out ahead:</span>{" "}
          {leadsB.length ? list(leadsB) : "no area by more than the even band"}.
        </p>
        <p className="text-[12.5px] leading-relaxed text-gray-400">
          The two sets differ in size and in when they were captured, so this is a reading of the stored reviews, not a
          ranking. The themes behind each number, with excerpts, are on the{" "}
          <Link href={A.href} className="text-[#0C4B75] underline underline-offset-2 hover:text-[#093d61]">{A.name} review</Link> and the{" "}
          <Link href={B.href} className="text-[#0C4B75] underline underline-offset-2 hover:text-[#093d61]">{B.name} review</Link>.{" "}
          <Link href="/weight-loss/how-we-rank#customer-reviews" className="text-[#0C4B75] underline underline-offset-2 hover:text-[#093d61]">
            How we collect customer reviews
          </Link>
        </p>
      </div>
    </section>
  );
}
