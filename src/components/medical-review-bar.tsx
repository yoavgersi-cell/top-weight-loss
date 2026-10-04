import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { getPageReview, getReviewer, reviewerDisplayName, reviewerPath, type Reviewer } from "@/data/reviewers";

// ───── Medical review bar ─────
// The one byline that sits under the H1/intro on every content page. Light
// by design: no card, a 32px portrait, two short lines. Two honest modes,
// decided by the review log:
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
  /** Single-line variant for index pages and the hub landing. */
  compact?: boolean;
}) {
  const review = getPageReview(path);
  const reviewer: Reviewer | undefined = review?.reviewerProfile ?? getReviewer();
  if (!reviewer) return null;

  const profile = reviewerPath(reviewer);
  const size = compact ? 28 : 32;

  const nameLink = (
    <Link href={profile} className="font-bold text-[#191919] hover:text-[#0C4B75] hover:underline">
      {reviewerDisplayName(reviewer)}
    </Link>
  );
  const linkedin = reviewer.linkedin && (
    <a
      href={reviewer.linkedin}
      target="_blank"
      rel="noopener noreferrer me"
      className="ml-1.5 inline-flex align-[-2px] text-[#0A66C2] hover:opacity-80"
      aria-label={`${reviewer.name} on LinkedIn`}
    >
      <LinkedInMark className="h-[13px] w-[13px]" />
    </a>
  );
  const policy = (
    <Link href="/medical-review-policy" className="font-medium text-[#0C4B75] hover:underline">
      How we review
    </Link>
  );

  return (
    <div className={`flex min-w-0 items-start gap-2.5 sm:items-center ${className}`} data-review-status={review ? "reviewed" : "staff"}>
      <Link href={profile} className="shrink-0" aria-label={`${reviewer.name}, ${reviewer.jobTitle}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={reviewer.image.thumb}
          alt={`${reviewer.name}, ${reviewer.jobTitle}`}
          width={size}
          height={size}
          style={{ width: size, height: size }}
          className="rounded-full object-cover ring-1 ring-gray-200"
          loading="lazy"
          decoding="async"
        />
      </Link>
      <div className={`min-w-0 ${compact ? "text-[12.5px] leading-[1.4]" : "text-[13px] leading-[1.45]"}`}>
        <p className="text-gray-700">
          <ShieldCheck className="mr-1 inline h-[14px] w-[14px] align-[-2px] text-emerald-600" strokeWidth={2.25} />
          {review ? "Reviewed for medical accuracy by " : "Medical reviewer: "}
          {nameLink}
          {!compact && <span className="hidden text-gray-500 sm:inline"> · {reviewer.jobTitle}</span>}
          {linkedin}
          {compact && (
            <span className="text-gray-500">
              {review ? (
                <>
                  {" · "}
                  <time dateTime={review.reviewedAt}>{formatDate(review.reviewedAt)}</time>
                </>
              ) : null}
              {" · "}
              {policy}
            </span>
          )}
        </p>
        {!compact && (
          <p className={`${compact ? "" : "mt-0.5"} text-[12.5px] text-gray-500`}>
            {review ? (
              <>
                Reviewed <time dateTime={review.reviewedAt}>{formatDate(review.reviewedAt)}</time>
                {" · "}
              </>
            ) : (
              <>Reviews this site&rsquo;s health content for scientific accuracy · </>
            )}
            <span className="hidden sm:inline">
              Written by {writer}
              {" · "}
            </span>
            {policy}
          </p>
        )}
      </div>
    </div>
  );
}
