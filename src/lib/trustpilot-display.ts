// ───── Trustpilot widgets: on/off ─────
// Nov 6, 2026: Trustpilot asked us to remove their widgets. Operator
// decision: hide them, keep the data. With this false, every Trustpilot-styled
// visual is hidden sitewide - review carousels and summaries, the star-box
// rating badges and wordmark, the one-star "4.6 Trustpilot" lines on cards,
// and the review-quote blocks - and the remaining star chips on the review-
// analysis pages switch to a neutral colour. The captured reviews, ratings
// and counts stay in the data (config, src/data/reviews) untouched, and
// plain-text citations in prose ("4.6 across 2,679 reviews") are unaffected.
// Set to true to bring everything back exactly as it was.
export const SHOW_TRUSTPILOT_WIDGETS = false;

// Card trust pills ("4.4 across 1,050 Trustpilot reviews") are stored as
// plain text in the review data, so the flag above didn't reach them. They
// render as badge chips naming Trustpilot, so they're hidden with the widgets
// (Nov 9, 2026). The data is untouched; the other pills still show.
export function visibleTrustBadges(badges: string[] | undefined): string[] {
  const list = badges ?? [];
  return SHOW_TRUSTPILOT_WIDGETS ? list : list.filter((b) => !/trustpilot/i.test(b));
}
