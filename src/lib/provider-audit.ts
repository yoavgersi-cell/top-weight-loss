// The TreatmentsHub provider audit - the "what we verified" registry.
//
// Every row is a fact the operator verified against the provider's own
// published information (pricing pages, plan terms, certification pages).
// Rules, in order of importance:
//   1. NEVER add a row that hasn't been verified. A missing row means "not
//      verified" - the component simply doesn't show it. No TBD, no guesses.
//   2. A provider with no entry renders no audit at all. That is the correct
//      state for providers whose data is still incomplete.
//   3. Values must agree with the same numbers shown elsewhere on the site
//      (price index, review pricing plans, battle cost math). One source of
//      truth in substance, even where the strings are hand-written.
//   4. When pricing changes, update the row AND bump PROVIDER_DATA_CHECKED
//      in @/lib/config only after actually re-checking.

export interface ProviderAuditEntry {
  rows: { label: string; value: string }[];
}

// Keyed "<vertical>:<providerId>" so a provider that exists in two verticals
// (e.g. maximus in hair-loss and trt) can carry a separate audit per vertical.
export const PROVIDER_AUDITS: Record<string, ProviderAuditEntry> = {
  // ── Weight loss ────────────────────────────────────────────────────────────
  "weight-loss:embody": {
    rows: [
      { label: "Semaglutide price", value: "$69/month promotional (reg. $79), flat at every dose" },
      { label: "Tirzepatide price", value: "$119/month promotional (reg. $129)" },
      { label: "Commitment", value: "Month-to-month, no contract" },
      { label: "Shipping", value: "Free 1-2 day, tracked and insured" },
      { label: "Certification", value: "LegitScript-certified; US-based 503A compounding pharmacies" },
      { label: "Refund policy", value: "Full refund if a provider doesn't approve treatment" },
      { label: "Trustpilot record", value: "3.8 across 4,956 reviews" },
    ],
  },
  "weight-loss:wellmedr": {
    rows: [
      { label: "Semaglutide price", value: "$59/month on a 12-month plan" },
      { label: "Tirzepatide price", value: "$99/month" },
      { label: "Commitment", value: "12-month plan for the best rate" },
      { label: "Support", value: "Coach included on every plan" },
      { label: "Guarantee", value: "Weight-loss warranty" },
      { label: "Trustpilot record", value: "4.7 across 1,205 reviews" },
    ],
  },
  "weight-loss:medvi": {
    rows: [
      { label: "Semaglutide price", value: "$99/month promotional (reg. $199), all-inclusive" },
      { label: "Tirzepatide price", value: "$166/month promotional (reg. $299)" },
      { label: "Support", value: "Video visits and a dietician on every plan" },
      { label: "Commitment", value: "Monthly, all-inclusive billing" },
      { label: "Trustpilot record", value: "4.4 across 14,372 reviews" },
    ],
  },
  "weight-loss:altrx": {
    rows: [
      { label: "Semaglutide price", value: "$89/month, flat at every dose" },
      { label: "Tirzepatide price", value: "$149/month" },
      { label: "Brand-name shelf", value: "Ozempic $1,149 / Zepbound $1,249 / Wegovy $1,579" },
      { label: "Payment options", value: "Buy Now, Pay Later available" },
      { label: "Commitment", value: "Monthly, no contract" },
    ],
  },
  "weight-loss:healthrx": {
    rows: [
      { label: "Semaglutide price", value: "$99/month on a 12-month prepaid plan ($1,188 at checkout)" },
      { label: "Tirzepatide price", value: "From $179/month" },
      { label: "Shipping", value: "Free overnight cold-chain delivery" },
      { label: "Certification", value: "LegitScript-certified" },
    ],
  },
  "weight-loss:directmeds": {
    rows: [
      { label: "Pricing", value: "$147/month flat - semaglutide and tirzepatide" },
      { label: "Treatment formats", value: "Injections or needle-free oral drops" },
      { label: "Shipping", value: "Free 1-2 day" },
      { label: "Membership fee", value: "None" },
      { label: "Trustpilot record", value: "4.6 across 13,901 reviews" },
    ],
  },
  "weight-loss:trimrx": {
    rows: [
      { label: "Semaglutide price", value: "$179 first month (reg. $299)" },
      { label: "Tirzepatide price", value: "$259/month" },
      { label: "Commitment", value: "No contract; opt-in discount programs" },
      { label: "Trustpilot record", value: "3.6 across 5,497 reviews" },
    ],
  },
  "weight-loss:shed": {
    rows: [
      { label: "Semaglutide price", value: "$199/month" },
      { label: "Tirzepatide price", value: "$299/month" },
      { label: "Guarantee", value: "5% of body weight in 120 days or your money back" },
      { label: "Payment options", value: "HSA/FSA eligible" },
      { label: "Trustpilot record", value: "4.7 across 1,120 reviews" },
    ],
  },
  "weight-loss:sprout": {
    rows: [
      { label: "Semaglutide price", value: "$149/month" },
      { label: "Tirzepatide price", value: "$199/month" },
      { label: "Brand-name option", value: "Wegovy $1,799/month" },
    ],
  },
  "weight-loss:ro": {
    rows: [
      { label: "Membership", value: "$39 first month, then $74-149/month ($74 on a 12-month prepaid plan)" },
      { label: "Medication cost", value: "Priced separately from membership - e.g. Wegovy pill $149 first month (then $299); Zepbound KwikPen from $299 first month" },
      { label: "Trustpilot record", value: "3.9 across 5,860 reviews" },
    ],
  },

  // ── Hair loss ──────────────────────────────────────────────────────────────
  "hair-loss:maximus": {
    rows: [
      { label: "Oral minoxidil", value: "$24.99 / 90-day supply" },
      { label: "Finasteride", value: "$34.99 / 90-day supply (dutasteride $34.99)" },
      { label: "Combination plans", value: "Oral combo $59.99; topical gels from $44.99 (all 90-day)" },
      { label: "Trustpilot record", value: "4.4 across 1,050 reviews" },
    ],
  },
  "hair-loss:happyhead": {
    rows: [
      { label: "First order", value: "$49 (reg. $89) - custom topical or SuperCapsule" },
      { label: "Dual Action set", value: "$98 (reg. $178)" },
      { label: "Subscription discount", value: "20% off subscriptions" },
      { label: "Guarantee", value: "6-month guarantee, per its published terms" },
      { label: "Trustpilot record", value: "4.5 across 1,803 reviews" },
    ],
  },
  "hair-loss:petermd": {
    rows: [
      { label: "Finasteride", value: "$60 / 30 tablets (reg. $74); $90 / 60 tablets (reg. $110)" },
      { label: "Follicure RX", value: "$70 / 50mL (reg. $80) - minoxidil + finasteride + ketoconazole" },
      { label: "ReGenX", value: "$130 (reg. $160)" },
    ],
  },

  // ── TRT ────────────────────────────────────────────────────────────────────
  "trt:dudemeds": {
    rows: [
      { label: "TRT (bring your own labs)", value: "From $77/month" },
      { label: "TRT with labs included", value: "$98/month" },
      { label: "Enclomiphene", value: "$125/month" },
      { label: "TRT MAX", value: "$222 quarterly" },
    ],
  },
};
