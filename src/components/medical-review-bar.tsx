import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { getPageReview, getReviewer, reviewerDisplayName, reviewerPath, type Reviewer } from "@/data/reviewers";

// ───── Medical review bar ─────
// The one byline block that sits under the H1/intro on every content page.
// Two honest modes, decided by the review log:
//   - logged:   "Reviewed for medical accuracy by <name>" + the review date
//   - unlogged: "Medical reviewer: <name>" - names the site's reviewer as
//               staff without claiming this page was reviewed.
// Always links to the reviewer profile and the review policy, and to LinkedIn
// when a URL is on file. Renders nothing if no reviewer exists.

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export function MedicalReviewBar({
  path,
  writer = "Treatments Hub Research Team",
  className = "",
  compact = false,
}: {
  /** Hub content path used for the review-log lookup, e.g. "/weight-loss/reviews/embody". */
  path: string;
  /** Author credit shown alongside the reviewer. */
  writer?: string;
  className?: string;
  /** Tighter layout for index pages and cards. */
  compact?: boolean;
}) {
  const review = getPageReview(path);
  const reviewer: Reviewer | undefined = review?.reviewerProfile ?? getReviewer();
  if (!reviewer) return null;

  const label = review ? "Reviewed for medical accuracy by" : "Medical reviewer";
  const profile = reviewerPath(reviewer);

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-gray-200 bg-white ${compact ? "px-3 py-2.5" : "px-4 py-3"} ${className}`}
      data-review-status={review ? "reviewed" : "staff"}
    >
      <Link href={profile} className="shrink-0" aria-label={`${reviewer.name}, ${reviewer.jobTitle}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={reviewer.image.thumb}
          alt={`${reviewer.name}, ${reviewer.jobTitle}`}
          width={compact ? 36 : 44}
          height={compact ? 36 : 44}
          className={`${compact ? "h-9 w-9" : "h-11 w-11"} rounded-full object-cover`}
          loading="lazy"
          decoding="async"
        />
      </Link>
      <div className="min-w-0 flex-1 leading-snug">
        <p className="flex flex-wrap items-center gap-x-1.5 text-[11px] font-semibold uppercase tracking-[0.05em] text-gray-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.25} />
          {label}
        </p>
        <p className="text-[13.5px] text-[#191919]">
          <Link href={profile} className="font-bold hover:text-[#0C4B75] hover:underline">
            {reviewerDisplayName(reviewer)}
          </Link>
          <span className="text-gray-400"> · {reviewer.jobTitle}</span>
          {reviewer.linkedin && (
            <a
              href={reviewer.linkedin}
              target="_blank"
              rel="noopener noreferrer me"
              className="ml-2 inline-flex align-middle text-[#0A66C2] hover:opacity-80"
              aria-label={`${reviewer.name} on LinkedIn`}
            >
              <LinkedInMark className="h-3.5 w-3.5" />
            </a>
          )}
        </p>
        <p className="mt-0.5 text-[12px] text-gray-500">
          {review ? (
            <>
              Reviewed <time dateTime={review.reviewedAt}>{formatDate(review.reviewedAt)}</time>
              {" · "}
            </>
          ) : (
            <>Reviews this site&rsquo;s health content for scientific accuracy · </>
          )}
          Written by {writer}
          {" · "}
          <Link href="/medical-review-policy" className="font-medium text-[#0C4B75] hover:underline">
            How we review
          </Link>
        </p>
      </div>
    </div>
  );
}
