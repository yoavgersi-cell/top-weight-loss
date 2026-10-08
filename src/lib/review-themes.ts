import type { TrustpilotReview } from "./config";

// ───── Captured-review theme classification ─────
// One set of rules for every page that reads the captured Trustpilot reviews
// (provider-support comparison, comparison-page verdict). A review "mentions"
// a theme when its title or text matches the pattern; the patterns are
// deliberately broad and identical for every provider, so the shares they
// produce are comparable across providers and never hand-tuned.

export const SUPPORT_RE = /customer service|support|\brep\b|\bagent\b|respon|answer|\bchat\b|called|\bcall\b|phone|email|staff|nurse|care team|coach/i;
export const SHIPPING_RE = /ship|deliver|arriv|tracking|fedex|package|refill/i;
export const BILLING_RE = /charg|bill|refund|cancel|subscription|renew/i;
// A support-related review that states a time span ("within an hour",
// "3 days later", "over 24 hours") - the sentence is quoted as written.
export const TIMING_RE = /(within (a few )?(minutes|an hour|hours|\d+ (minutes|hours|days)))|(\b(\d+|two|three|four|five|six|seven|eight|ten) (minutes|hours|days|weeks)\b)|same day|next day|overnight|24 hours/i;

/** Fewer captured reviews than this and a provider gets no computed figure at all. */
export const MIN_REVIEWS = 5;
/** Fewer theme mentions than this and the figure is flagged as a small sample. */
export const SMALL_SAMPLE = 10;

export type Theme = { n: number; pos: number; neg: number };

export const pct = (part: number, whole: number) => (whole ? Math.round((part / whole) * 100) : 0);

export function theme(reviews: TrustpilotReview[], re: RegExp): Theme {
  const hits = reviews.filter((r) => re.test(`${r.title} ${r.text}`));
  return { n: hits.length, pos: hits.filter((r) => r.rating >= 4).length, neg: hits.filter((r) => r.rating <= 2).length };
}

/** Support theme for a provider's captured reviews, or null when the sample is too small to publish. */
export function supportTheme(reviews: TrustpilotReview[] | undefined): Theme | null {
  if (!reviews || reviews.length < MIN_REVIEWS) return null;
  const t = theme(reviews, SUPPORT_RE);
  return t.n > 0 ? t : null;
}
