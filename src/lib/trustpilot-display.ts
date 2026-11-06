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
