import type { TrustpilotReview } from "@/lib/config";
import type { ProviderReviewRecord } from "@/data/reviews/types";
import { formatReviewDate } from "@/data/reviews";
import { tpStarColor } from "@/components/trustpilot-rating";

// ───── Trustpilot summary (citeable text) ─────
// A plain-prose, fully computed summary of the reviews we captured for a
// provider: the public aggregate as published (with the date we read it and
// a link to the profile it came from), the count we hold, when we captured
// it, the star distribution and the date range. Rendered above the carousel
// so a reader (and an AI engine) gets the whole picture in one quotable
// paragraph without paging through cards. Every number is derived from the
// stored data; the source link and dates come from the review registry
// (src/data/reviews) when the provider has a record there.

function reviewTime(r: TrustpilotReview): number {
  if (!r.date) return 0;
  const t = new Date(r.date).getTime();
  return isNaN(t) ? 0 : t;
}

const fmt = (t: number) => new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

function joinList(parts: string[]): string {
  if (parts.length <= 1) return parts[0] ?? "";
  return parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1];
}

export function TrustpilotSummary({
  providerName,
  reviews,
  rating,
  reviewCount,
  record,
  methodologyHref = "/weight-loss/how-we-rank#customer-reviews",
  className = "",
}: {
  providerName: string;
  reviews: TrustpilotReview[];
  rating?: string;
  reviewCount?: string;
  /** The provider's entry in the review registry: source link, aggregate date, capture dates. */
  record?: ProviderReviewRecord;
  methodologyHref?: string;
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
  const distText = joinList(parts);

  const profileUrl = record?.profileUrl;
  const profileWord = record?.profileStatus === "claimed" ? "claimed Trustpilot profile" : "public Trustpilot profile";
  const verifiedOn = formatReviewDate(record?.aggregate?.verifiedOn);
  const captures = Array.from(
    new Set((record?.batches ?? []).map((b) => formatReviewDate(b.capturedOn)).filter((d): d is string => !!d)),
  );
  const profileLink = profileUrl ? (
    <a href={profileUrl} target="_blank" rel="nofollow noopener noreferrer" className="font-semibold text-[#0C4B75] underline underline-offset-2 hover:text-[#093d61]">
      view the profile
    </a>
  ) : null;

  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-4 sm:p-5 ${className}`}>
      <p className="text-[12px] font-bold uppercase tracking-wider text-gray-400">Trustpilot summary</p>
      <p className="mt-1.5 text-[15px] leading-relaxed text-gray-800">
        {rating && reviewCount ? (
          <>
            {providerName} holds a <strong>{rating} out of 5 across {reviewCount} reviews</strong> on its {profileWord}
            {verifiedOn ? <> (as shown on {verifiedOn}{profileLink ? <>; {profileLink}</> : null})</> : profileLink ? <> ({profileLink})</> : null}.{" "}
          </>
        ) : rating ? (
          <>
            {providerName} holds a <strong>{rating} out of 5</strong> on its {profileWord}{profileLink ? <> ({profileLink})</> : null}.{" "}
          </>
        ) : record?.aggregateNote ? (
          <>{record.aggregateNote}{profileLink ? <> You can {profileLink} on Trustpilot.</> : null}{" "}</>
        ) : null}
        Of the <strong>{n} reviews we transcribed verbatim</strong>
        {captures.length > 0 && <> from that profile, captured on {joinList(captures)}</>}
        {range && (
          <>
            {" "}(reviews dated {fmt(range.from)} to {fmt(range.to)})
          </>
        )}
        , {distText}: {pct(positive)}% rate it 4 or 5 stars and {pct(critical)}% rate it 1 or 2 stars. Reviewer names are shortened to first name and initial; every captured review, including the lowest-rated, is shown below.{" "}
        <a href={methodologyHref} className="text-[#0C4B75] underline underline-offset-2 hover:text-[#093d61]">
          How we collect customer reviews
        </a>
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
