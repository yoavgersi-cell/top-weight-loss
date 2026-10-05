import type { TrustpilotReview } from "@/lib/config";
import { tpStarColor } from "@/components/trustpilot-rating";

// ───── Trustpilot summary (citeable text) ─────
// A plain-prose, fully computed summary of the reviews we captured for a
// provider: the public aggregate as published, the count we hold, the star
// distribution and the date range. Rendered above the carousel so a reader
// (and an AI engine) gets the whole picture in one quotable paragraph without
// paging through cards. Every number is derived from the stored data.

function reviewTime(r: TrustpilotReview): number {
  if (!r.date) return 0;
  const t = new Date(r.date).getTime();
  return isNaN(t) ? 0 : t;
}

const fmt = (t: number) => new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export function TrustpilotSummary({
  providerName,
  reviews,
  rating,
  reviewCount,
  className = "",
}: {
  providerName: string;
  reviews: TrustpilotReview[];
  rating?: string;
  reviewCount?: string;
  className?: string;
}) {
  const n = reviews.length;
  if (n === 0) return null;
  const dist = [5, 4, 3, 2, 1].map((s) => ({ star: s, count: reviews.filter((r) => r.rating === s).length }));
  const dated = reviews.map(reviewTime).filter((t) => t > 0);
  const range = dated.length ? { from: Math.min(...dated), to: Math.max(...dated) } : null;
  const positive = dist[0].count + dist[1].count;
  const critical = dist[3].count + dist[4].count;
  const pct = (c: number) => Math.round((c / n) * 100);

  const parts = dist.filter((d) => d.count > 0).map((d) => `${d.count} ${d.star}-star`);
  const distText = parts.length > 1 ? parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1] : parts[0];

  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-4 sm:p-5 ${className}`}>
      <p className="text-[12px] font-bold uppercase tracking-wider text-gray-400">Trustpilot summary</p>
      <p className="mt-1.5 text-[15px] leading-relaxed text-gray-800">
        {rating && reviewCount ? (
          <>
            {providerName} holds a <strong>{rating} out of 5 across {reviewCount} reviews</strong> on its public Trustpilot profile.{" "}
          </>
        ) : rating ? (
          <>
            {providerName} holds a <strong>{rating} out of 5</strong> on its public Trustpilot profile.{" "}
          </>
        ) : null}
        Of the <strong>{n} reviews we captured verbatim</strong>
        {range && (
          <>
            {" "}(dated {fmt(range.from)} to {fmt(range.to)})
          </>
        )}
        , {distText}: {pct(positive)}% rate it 4 or 5 stars and {pct(critical)}% rate it 1 or 2 stars. Reviewer names are shortened; every captured review, including the lowest-rated, is shown below.
      </p>
      <div className="mt-3 space-y-1">
        {dist.map((d) => (
          <div key={d.star} className="flex items-center gap-2 text-[12px] text-gray-500">
            <span className="w-[42px] shrink-0 font-semibold text-gray-700">{d.star} star</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full rounded-full" style={{ width: `${pct(d.count)}%`, backgroundColor: tpStarColor(d.star) }} />
            </div>
            <span className="w-[56px] shrink-0 text-right [font-variant-numeric:tabular-nums]">
              {d.count} ({pct(d.count)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
