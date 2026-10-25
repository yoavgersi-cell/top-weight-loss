import type { TrustpilotReview } from "@/lib/config";

// ───── Customer-review registry ─────
// One record per provider: where its public reviews live, the aggregate as
// we last saw it (with the date), and every review we transcribed, grouped
// into the batch it arrived in. The pages derive every number they print
// from this data - nothing is typed into prose that is not also here.
//
// House rules (unchanged since the registry lived inline in config-store):
//  - Reviews are transcribed verbatim from the operator's screenshots of the
//    provider's Trustpilot profile, low-star reviews included. Reviewer
//    names are stored as first name + last initial. Each review carries the
//    date Trustpilot displayed when it is visible in the capture.
//  - An aggregate (rating + count) is stored only when it was read from the
//    profile on a stated date. Providers whose profile shows no public
//    rating get no aggregate, and the record says why.
//  - A profile URL is stored only once it has been checked to be the
//    provider's own profile (the one the operator's screenshots came from).

export type ReviewVertical = "weight-loss" | "hrt" | "trt" | "hair-loss" | "ed";

export interface ReviewAggregate {
  /** As displayed on the profile, e.g. "4.6". */
  rating: string;
  /** As displayed, with thousands separator, e.g. "2,188". */
  reviewCount: string;
  /** Date the aggregate was read from the profile: YYYY-MM-DD, or YYYY-MM when only the month is known. */
  verifiedOn?: string;
  /** Trustpilot category / claim details as shown on the profile, for the record. */
  note?: string;
  /** Earlier readings, newest first, so a page can say "up from 1,919 on Sep 24". */
  history?: { rating: string; reviewCount: string; on: string }[];
}

export interface ReviewBatch {
  /** When the screenshots were captured: YYYY-MM-DD, or YYYY-MM when only the month is known. */
  capturedOn?: string;
  /** How the reviews were obtained: the operator's screenshots of the profile, or the operator's text copy of the profile page. */
  method: "operator screenshots" | "operator text copy";
  /** The transcription note for this batch (what was captured, what was kept). */
  note?: string;
  reviews: TrustpilotReview[];
}

export interface ProviderReviewRecord {
  providerId: string;
  vertical: ReviewVertical;
  source: "trustpilot";
  /** The provider's own Trustpilot profile, verified to be theirs. */
  profileUrl?: string;
  /** "claimed" = the business has claimed the profile; "flagged" = Trustpilot has removed the public rating. */
  profileStatus?: "claimed" | "unclaimed" | "flagged";
  aggregate?: ReviewAggregate;
  /** Why no aggregate is shown (e.g. Trustpilot removed the rating). */
  aggregateNote?: string;
  /** Newest batch first; the pages flatten them in this order. */
  batches: ReviewBatch[];
}

/** The shape the config layer has always consumed. */
export interface SeedTrustpilotEntry {
  rating?: string;
  reviewCount?: string;
  reviews: TrustpilotReview[];
}
