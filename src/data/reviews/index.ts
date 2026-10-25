import type { ProviderReviewRecord, ReviewVertical, SeedTrustpilotEntry } from "./types";
import { BMIMD_REVIEWS } from "./weight-loss/bmimd";
import { WELLMEDR_REVIEWS } from "./weight-loss/wellmedr";
import { ALTRX_REVIEWS } from "./weight-loss/altrx";
import { RO_REVIEWS } from "./weight-loss/ro";
import { TRIMRX_REVIEWS } from "./weight-loss/trimrx";
import { MEDVI_REVIEWS } from "./weight-loss/medvi";
import { WELLORITHM_REVIEWS } from "./weight-loss/wellorithm";
import { SHED_REVIEWS } from "./weight-loss/shed";
import { SPROUT_REVIEWS } from "./weight-loss/sprout";
import { EDEN_REVIEWS } from "./weight-loss/eden";
import { DIRECTMEDS_REVIEWS } from "./weight-loss/directmeds";
import { SKINNYRX_REVIEWS } from "./weight-loss/skinnyrx";
import { EMBODY_REVIEWS } from "./weight-loss/embody";
import { FOUND_REVIEWS } from "./weight-loss/found";

// ───── Review registry ─────
// Every provider's transcribed customer reviews, by vertical. The config
// layer flattens a record into the legacy { rating, reviewCount, reviews }
// shape; the pages read the record directly for the source link, the
// aggregate's date and the capture dates.

export const REVIEW_RECORDS: ProviderReviewRecord[] = [
  BMIMD_REVIEWS,
  WELLMEDR_REVIEWS,
  ALTRX_REVIEWS,
  RO_REVIEWS,
  TRIMRX_REVIEWS,
  MEDVI_REVIEWS,
  WELLORITHM_REVIEWS,
  SHED_REVIEWS,
  SPROUT_REVIEWS,
  EDEN_REVIEWS,
  DIRECTMEDS_REVIEWS,
  SKINNYRX_REVIEWS,
  EMBODY_REVIEWS,
  FOUND_REVIEWS,
];

export function getReviewRecord(vertical: ReviewVertical | string, providerId: string): ProviderReviewRecord | undefined {
  return REVIEW_RECORDS.find((r) => r.vertical === vertical && r.providerId === providerId);
}

/** Flatten a record to the shape config-store has always consumed (newest batch first). */
export function toSeedEntry(r: ProviderReviewRecord): SeedTrustpilotEntry {
  return {
    rating: r.aggregate?.rating,
    reviewCount: r.aggregate?.reviewCount,
    reviews: r.batches.flatMap((b) => b.reviews),
  };
}

export function buildSeedTrustpilot(vertical: ReviewVertical): Record<string, SeedTrustpilotEntry> {
  const out: Record<string, SeedTrustpilotEntry> = {};
  for (const r of REVIEW_RECORDS) if (r.vertical === vertical) out[r.providerId] = toSeedEntry(r);
  return out;
}

/** Human label for a YYYY-MM-DD or YYYY-MM capture/verification date. */
export function formatReviewDate(d?: string): string | undefined {
  if (!d) return undefined;
  const [y, m, day] = d.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const mon = months[parseInt(m, 10) - 1];
  if (!mon) return d;
  return day ? `${mon} ${parseInt(day, 10)}, ${y}` : `${mon} ${y}`;
}
