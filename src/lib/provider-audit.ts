// The Treatments Hub provider audit - the "what we verified" registry.
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
      // Nov 16, 2026: shipping, refund and certification rows rewritten from
      // embody's own pages (ops/research/embody-review-refresh.md). No page on
      // joinem.co states a day count; the Terms do not guarantee delivery
      // timelines; the refund if not approved is partial; the LegitScript
      // certificate could not be opened to confirm.
      { label: "Semaglutide price", value: "$49/month on the homepage (Nov 16, 2026), flat at every dose; Terms list $79 monthly, $49 on the 12-month bundle" },
      { label: "Tirzepatide price", value: "$99/month on the homepage (Nov 16, 2026); Terms list $129 monthly, $99 on the 12-month bundle" },
      { label: "Commitment", value: "Monthly, or 3-, 6- and 12-month bundles; bundles are non-refundable" },
      { label: "Shipping", value: "Free expedited delivery; no delivery timeline guaranteed (Terms, Apr 24, 2026)" },
      { label: "Pharmacies", value: "Four named US state-licensed 503A compounding pharmacies; compounded, not FDA-approved" },
      { label: "Refund policy", value: "Non-refundable; if not approved, the unused portion less services rendered (Aug 25, 2026)" },
    ],
  },
  "weight-loss:welludr": {
    rows: [
      { label: "Semaglutide price", value: "$39/month, a promotional price on a plan its page labels Monthly Plan (read Nov 20, 2026)" },
      { label: "Tirzepatide price", value: "$69/month, a promotional price on a plan its page labels Monthly Plan (read Nov 20, 2026)" },
      { label: "Commitment", value: "Monthly Plan, cancel or change anytime (plan page, Nov 20, 2026); the refund policy still describes 12-month plans as prepaid in full (Nov 22, 2026)" },
      { label: "Support", value: "Coach included on every plan" },
      { label: "Guarantee", value: "Weight-loss warranty" },
    ],
  },
  "weight-loss:medvi": {
    rows: [
      { label: "Starting price", value: "Plans from $99/month, all-inclusive (price index, verified Nov 18, 2026)" },
      { label: "Per-drug price", value: "Not currently listed in our verified index" },
      { label: "Support", value: "Video visits and a dietician on every plan" },
      { label: "Commitment", value: "Monthly, all-inclusive billing" },
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
      { label: "Semaglutide price", value: "$125/month on the monthly plan after a $39 first month" },
      { label: "Tirzepatide price", value: "$199/month on the monthly plan after a $39 first month" },
      { label: "Shipping", value: "Free overnight cold-chain delivery" },
      { label: "Certification", value: "LegitScript-certified" },
    ],
  },
  "weight-loss:directmeds": {
    rows: [
      { label: "Pricing", value: "$249/month sublingual semaglutide; $297/month injections" },
      { label: "Treatment formats", value: "Injections or needle-free oral drops" },
      { label: "Shipping", value: "Free 1-2 day" },
      { label: "Membership fee", value: "None" },
    ],
  },
  "weight-loss:trimrx": {
    rows: [
      { label: "Starting price", value: "Plans from $179/month (TrimRx site, read Nov 22, 2026)" },
      { label: "Per-drug price", value: "Not published on the page we could read (semaglutide or tirzepatide)" },
      { label: "Commitment", value: "No contract; opt-in discount programs" },
    ],
  },
  "weight-loss:shed": {
    rows: [
      { label: "Semaglutide price", value: "$199/month" },
      { label: "Tirzepatide price", value: "$299/month" },
      { label: "Guarantee", value: "5% of body weight in 120 days or your money back" },
      { label: "Payment options", value: "HSA/FSA eligible" },
    ],
  },
  "weight-loss:sprout": {
    rows: [
      { label: "Semaglutide price", value: "From $99/month on the 12-month plan; $149/month with no commitment" },
      { label: "Tirzepatide price", value: "From $149/month on the 12-month plan; $199/month with no commitment" },
      { label: "Brand-name option", value: "Wegovy $1,799/month" },
    ],
  },
  // Eden: read from eden.health (pricing pages, Terms revised Nov 16, 2026,
  // brand pages), Nov 24, 2026. Source: ops/research/2026-11-24-eden-evidence.md.
  "weight-loss:eden": {
    rows: [
      { label: "Semaglutide price", value: "$99/month, flat every month and at every dose (read Nov 24, 2026)" },
      { label: "Tirzepatide price", value: "$129/month, flat every month and at every dose (read Nov 24, 2026)" },
      { label: "Brand-name options", value: "Wegovy $1,695/month; Zepbound, Ozempic and Mounjaro $1,399/month each" },
      { label: "Membership fee", value: "Pricing pages say none; the Terms still mention a recurring membership program" },
      { label: "Commitment", value: "No long-term contract; cancel in Account Settings at least 48 hours before renewal" },
      { label: "Refunds", value: "Non-refundable once fulfilled; 15%-in-six-months warranty with conditions" },
      { label: "Support", value: "Eden says it offers clinician-guided care and 24/7 real human support" },
    ],
  },
  // Collective: read from collective.org (homepage and FAQ), Nov 11, 2026.
  "weight-loss:collective": {
    rows: [
      { label: "Semaglutide price", value: "$59/month, the same at every dose" },
      { label: "Tirzepatide price", value: "$69/month, the same at every dose" },
      { label: "Membership fee", value: "$199/year, billed annually, after a 21-day free trial" },
      { label: "Commitment", value: "None - month to month, no multi-month orders, cancel anytime" },
      { label: "Shipping", value: "2-day express cold shipping included; most orders within 7 days of the medical review" },
      { label: "Pharmacy", value: "State-licensed US pharmacies; third-party tested, per the provider" },
      { label: "Availability", value: "44 states (not AL, CA, LA, MA, MS, WA)" },
    ],
  },
  "weight-loss:luvo": {
    rows: [
      { label: "Semaglutide price", value: "$104.50 for the first 4 weeks, then $209 every 4 weeks" },
      { label: "Tirzepatide price", value: "$124.50 for the first 4 weeks, then $249 every 4 weeks" },
      { label: "Semaglutide tablets", value: "$129.50 for the first 4 weeks, then $259 every 4 weeks" },
      { label: "Brand-name Ozempic", value: "$1,299 per 4 weeks" },
      { label: "Membership fee", value: "None" },
      { label: "Commitment", value: "None - cancel anytime" },
    ],
  },
  "weight-loss:medgm": {
    rows: [
      { label: "GLP-1 injections", value: "Starting at $169 (weekly injection; molecule not stated on the pricing tile)" },
      { label: "GLP-1 tablets", value: "Starting at $239 (daily dissolvable tablet)" },
      { label: "Brand-name Zepbound", value: "$99 membership plus medication cost; availability subject to change" },
      { label: "Prescription", value: "Required - all options are Rx-only" },
    ],
  },
  "weight-loss:ro": {
    rows: [
      { label: "Membership", value: "$39 first month, then $74-149/month ($74 on a 12-month prepaid plan)" },
      { label: "Medication cost", value: "Priced separately from membership - e.g. Wegovy pill $149 first month (then $299); Zepbound KwikPen from $299 first month" },
    ],
  },

  // ── Hair loss ──────────────────────────────────────────────────────────────
  "hair-loss:maximus": {
    rows: [
      { label: "Oral minoxidil", value: "$24.99 / 90-day supply" },
      { label: "Finasteride", value: "$34.99 / 90-day supply (dutasteride $34.99)" },
      { label: "Combination plans", value: "Oral combo $59.99; topical gels from $44.99 (all 90-day)" },
    ],
  },
  "hair-loss:happyhead": {
    rows: [
      { label: "First order", value: "$49 (reg. $89) - custom topical or SuperCapsule" },
      { label: "Dual Action set", value: "$98 (reg. $178)" },
      { label: "Subscription discount", value: "20% off subscriptions" },
      { label: "Guarantee", value: "6-month guarantee, per its published terms" },
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
