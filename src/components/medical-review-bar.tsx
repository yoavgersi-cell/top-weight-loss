import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { getExtraPageReviewers, getPageReview, getReviewer, reviewerPath, type Reviewer } from "@/data/reviewers";
import { ReviewerBubble, type ReviewerBubbleData } from "@/components/reviewer-bubble";

// ───── Medical review bar ─────
// The one byline that sits under the H1/intro on every content page. Light
// by design: no card, a 32px portrait, two short lines. Two honest modes,
// decided by the review log:
//   - logged:   "Medically reviewed by <name>" + the review date (Nov 12, 2026: name
//               first, green check after it, muted second line, fact-checking line
//               muted without a date, "How we review" on its own line)
//   - unlogged: "Medical reviewer: <name>" - names the site's reviewer as
//               staff without claiming this page was reviewed.
// Oct 22, 2026: the name and portrait open an in-page bubble (see
// reviewer-bubble.tsx) rather than navigating to the profile page, which was
// taking readers away from the content. The policy link and LinkedIn mark
// stay. Renders nothing if no reviewer exists.

// The bubble's narrative, per reviewer: written for a reader deciding whether
// to trust the page, in plain words. Facts match the reviewer record and the
// profile page; nothing here claims a credential the record does not carry.
const BUBBLE_PARAGRAPHS: Record<string, string[]> = {
  "francheska-capistrano": [
    "Francheska Capistrano is a licensed Medical Laboratory Scientist (a Registered Medical Technologist) with a Master of Public Health from the University of Essex. Her training is in clinical laboratory medicine and in epidemiology and biostatistics, which is to say in how diagnostic tests, trial results and population statistics are produced, and where they go wrong.",
    "Before reviewing for Treatments Hub she coordinated international clinical trials, where her work was protocol compliance, clinical documentation and data review: checking that what a study recorded matched what its protocol required. She has also written and reviewed evidence-based health content for physicians and patients, from research summaries to patient education materials.",
    "On this site she reads every medical and scientific statement in our guides, reviews and comparisons against the cited trials, labels and regulators, and flags anything the evidence does not support, including outdated figures and loose terminology. She has no part in choosing providers, setting prices or rankings, or in any commercial partnership, so her review is independent of what a page recommends.",
  ],
};

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
  const pageReview = getPageReview(path);
  // A lead reviewer (flagged in EXTRA_PAGE_REVIEWERS) takes the main slot of
  // this same bar; the page's logged reviewer moves to a text line below.
  const leadExtra = getExtraPageReviewers(path).find((x) => x.lead && x.reviewedAt);
  const review = leadExtra
    ? ({ reviewedAt: leadExtra.reviewedAt, reviewerProfile: leadExtra } as unknown as NonNullable<typeof pageReview>)
    : pageReview;
  const secondary = leadExtra && pageReview ? pageReview.reviewerProfile : null;
  const reviewer: Reviewer | undefined = review?.reviewerProfile ?? getReviewer();
  if (!reviewer) return null;

  const profile = reviewerPath(reviewer);
  const size = compact ? 28 : 32;

  // Everything the bubble needs, as plain data (it is a client component).
  const bubble: ReviewerBubbleData = {
    name: reviewer.name,
    credentials: reviewer.credentials,
    jobTitle: reviewer.jobTitle,
    headline: reviewer.headline,
    paragraphs: BUBBLE_PARAGRAPHS[reviewer.slug] ?? [reviewer.shortBio],
    scope: reviewer.scope,
    qualifications: [
      ...reviewer.licensure.map((l) => l.title),
      ...reviewer.education.map((e) => `${e.degree}, ${e.school}`),
    ],
    specialties: reviewer.specialties,
    since: reviewer.since,
    image: { thumb: reviewer.image.thumb, webp: reviewer.image.webp },
    profileHref: profile,
    linkedin: reviewer.linkedin,
    reviewedAt: review?.reviewedAt,
    reviewedLabel: review ? formatDate(review.reviewedAt) : undefined,
  };
  const nameText = (
    <>
      {reviewer.name}
      {reviewer.credentials.length > 0 && <span className="whitespace-nowrap">, {reviewer.credentials.join(", ")}</span>}
    </>
  );
  const portraitImg = (
    // eslint-disable-next-line @next/next/no-img-element
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
  );
  const linkedin = reviewer.linkedin && (
    <a
      href={reviewer.linkedin}
      target="_blank"
      rel="noopener noreferrer me"
      className="-my-1.5 ml-0.5 inline-flex p-1.5 align-[-5px] text-[#0A66C2] hover:opacity-80"
      aria-label={`${reviewer.name} on LinkedIn`}
    >
      <LinkedInMark className="h-[13px] w-[13px]" />
    </a>
  );
  const policy = (
    <Link href="/medical-review-policy" className="inline-flex items-center gap-1 font-normal text-[#0C4B75] hover:underline sm:font-medium">
      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
      How we review
    </Link>
  );

  return (
    <>
    <div className={`flex min-w-0 items-start gap-2.5 ${className}`} data-review-status={review ? "reviewed" : "staff"}>
      <ReviewerBubble reviewer={bubble} trigger={portraitImg} className="shrink-0 [&>button]:font-normal [&>button]:no-underline" />
      <div className={`min-w-0 ${compact ? "text-[12.5px] leading-[1.4]" : "text-[13px] leading-[1.45]"}`}>
        <p className={compact ? "text-gray-700 [text-wrap:balance]" : "text-gray-700"}>
          {/* Phones: the name leads and the "reviewed for medical accuracy"
              wording moves to the second line, so the strip is two lines
              instead of three. Desktop keeps the full sentence. */}
          <span className={compact ? "" : "hidden sm:inline"}>{review ? "Medically reviewed by " : "Medical reviewer: "}</span>
          {/* Name + LinkedIn mark kept together (nowrap) so the mark never
              drops onto a line of its own; the job title wraps after it. */}
          <span className="whitespace-nowrap">
            <ReviewerBubble reviewer={bubble} trigger={nameText} />
            <ShieldCheck className="ml-1 inline h-[14px] w-[14px] align-[-2px] text-emerald-600" strokeWidth={2.25} aria-label="Verified reviewer" />
            {linkedin}
          </span>
          {!compact && (reviewer.bylineTitle ?? reviewer.jobTitle) && (
            <span className="hidden whitespace-nowrap text-gray-500 sm:inline"> · {reviewer.bylineTitle ?? reviewer.jobTitle}</span>
          )}
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
          <p className="mt-0.5 text-[12.5px] leading-[1.45] text-gray-500">
            {review ? (
              <>
                <span className="sm:hidden">Medically reviewed on </span>
                <span className="hidden sm:inline">Reviewed </span>
                <time dateTime={review.reviewedAt}>{formatDate(review.reviewedAt)}</time>
                <span className="hidden sm:inline"> · </span>
              </>
            ) : (
              <>
                <span className="sm:hidden">Medical reviewer</span>
                <span className="hidden sm:inline">Reviews this site&rsquo;s health content for scientific accuracy · </span>
              </>
            )}
            <span className="hidden sm:inline">Written by {writer}</span>
          </p>
        )}
        {secondary && pageReview && (
          <p className="mt-px text-[11px] leading-[1.45] text-gray-400 sm:mt-0.5 sm:text-[12px] sm:text-gray-500">
            Medical fact-checking by{" "}
            <Link href={reviewerPath(secondary)} className="font-medium text-gray-500 hover:text-[#0C4B75] hover:underline sm:text-gray-600">
              {secondary.name}
              {secondary.credentials.length > 0 && <span className="whitespace-nowrap">, {secondary.credentials.join(", ")}</span>}
            </Link>
          </p>
        )}
        {!compact && <p className="mt-1 text-[12px] leading-none sm:mt-1.5 sm:text-[12.5px]">{policy}</p>}
      </div>
    </div>
    </>
  );
}
