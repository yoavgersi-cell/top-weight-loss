// ───── Black Friday & Cyber Monday offers ─────
// The registry behind /weight-loss/black-friday-glp1-deals. House rules:
//  - An offer is added only when the operator has verified it on the
//    provider's own site or in its own communication, on the date recorded
//    in verifiedOn. Nothing is typed in from memory, press or a competitor's
//    page, and there are no placeholder offers: an empty list renders an
//    honest "nothing published yet" state.
//  - The regular price an offer is judged against is the verified price index
//    (PRICE_INDEX), never a figure written here, so "what you save" is always
//    verified price minus verified offer.
//  - Dates are the provider's stated window where it states one; otherwise
//    the window fields stay empty and the page says the end date is not
//    published.
// The season block is reused year to year: change the dates and the label.

export type HolidayVertical = "weight-loss" | "hair-loss" | "trt" | "hrt" | "ed" | "online-therapy";

export interface HolidayOffer {
  vertical: HolidayVertical;
  providerId: string;
  /** The offer in the provider's own terms, e.g. "$30 off the first month of semaglutide". */
  headline: string;
  /** What the offer applies to and the conditions attached, in plain words. */
  detail: string;
  /** Promo code, when the provider publishes one. */
  code?: string;
  /** Offer price per month in USD, when the offer is a stated monthly price (lets the page compute the gap against the index). */
  offerMonthly?: { semaglutide?: number; tirzepatide?: number };
  /** First day the provider states the offer is live (YYYY-MM-DD). */
  startsOn?: string;
  /** Last day the provider states the offer is live (YYYY-MM-DD). */
  endsOn?: string;
  /** Date the operator verified the offer on the provider's own site (YYYY-MM-DD). */
  verifiedOn: string;
  /** Where it was verified: the provider's page or communication, in words. */
  source: string;
}

export const HOLIDAY_SEASON = {
  label: "Black Friday & Cyber Monday 2026",
  year: 2026,
  blackFriday: "2026-11-27",
  cyberMonday: "2026-11-30",
  /** The page's own last-updated date: the newest verifiedOn below, or this when the list is empty. */
  pageUpdated: "2026-10-28",
};

/** Operator-verified offers only, newest verification first. */
export const HOLIDAY_OFFERS: HolidayOffer[] = [
  {
    vertical: "weight-loss",
    providerId: "embody",
    headline: "Exclusive-page offer: $49/month semaglutide, $99/month tirzepatide",
    detail:
      "embody's exclusive landing page (exclusive.joinem.co) shows a \"TOP10 exclusive offer\" of compounded semaglutide at $49/month, with $299 struck through, and tirzepatide at $99/month, shipped in 1-2 days with no insurance. A countdown on the page read just under six days on October 28, so the end date below is taken from that timer, not from a stated date. It is not labelled a Black Friday offer. Our index lists embody's everyday month-to-month rates at $69 and $119 against published regular prices of $79 and $129, so both figures are below the everyday price. The offer appears on that landing page; embody's main site may show its standard pricing. No code is required.",
    offerMonthly: { semaglutide: 49, tirzepatide: 99 },
    endsOn: "2026-11-02",
    verifiedOn: "2026-10-28",
    source: "embody's exclusive landing page (exclusive.joinem.co), operator screenshot",
  },
  {
    vertical: "weight-loss",
    providerId: "wellmedr",
    headline: "Pre-Black Friday sale: $49/month semaglutide, $89/month tirzepatide",
    detail:
      "welludr's site banner reads \"Pre-Black Friday sale discount applied\" with compounded semaglutide at $49/month and tirzepatide at $89/month. Those are the same rates already in our index, where they are tied to a 12-month plan at the same price at every dose; the banner states no code and no end date.",
    offerMonthly: { semaglutide: 49, tirzepatide: 89 },
    verifiedOn: "2026-10-28",
    source: "banner on welludr's homepage, operator screenshot",
  },
];

/**
 * Providers the operator checked for a holiday offer and found none, with
 * the date and what the site showed instead. "Checked, nothing published"
 * is information the reader can use; "not checked yet" is the default.
 */
export interface HolidayCheck {
  vertical: HolidayVertical;
  providerId: string;
  checkedOn: string;
  /** What the provider's site showed on that date, in words. */
  found: string;
}

export const HOLIDAY_CHECKS: HolidayCheck[] = [
  {
    vertical: "weight-loss",
    providerId: "altrx",
    checkedOn: "2026-10-28",
    found: "homepage shows the everyday plan from $89/month with the price locked at every dose; no Black Friday or Cyber Monday offer",
  },
];

export function latestCheck(providerId: string, vertical: HolidayVertical = "weight-loss"): HolidayCheck | undefined {
  return HOLIDAY_CHECKS.filter((c) => c.vertical === vertical && c.providerId === providerId).sort((a, b) => b.checkedOn.localeCompare(a.checkedOn))[0];
}

export function offersFor(vertical: HolidayVertical): HolidayOffer[] {
  return HOLIDAY_OFFERS.filter((o) => o.vertical === vertical);
}

export function latestVerified(): string {
  const dates = [...HOLIDAY_OFFERS.map((o) => o.verifiedOn), ...HOLIDAY_CHECKS.map((c) => c.checkedOn), HOLIDAY_SEASON.pageUpdated].sort();
  return dates[dates.length - 1];
}

export type OfferStatus = "upcoming" | "live" | "ended" | "unstated";

/** Status on a given day (YYYY-MM-DD), from the provider's stated window only. */
export function offerStatus(o: HolidayOffer, today: string): OfferStatus {
  if (!o.startsOn && !o.endsOn) return "unstated";
  if (o.startsOn && today < o.startsOn) return "upcoming";
  if (o.endsOn && today > o.endsOn) return "ended";
  return "live";
}
