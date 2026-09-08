// ───── UK weight-loss SERVICES (compliance-framed) ─────
//
// UK law (Human Medicines Regulations 2012) bans advertising/naming
// prescription-only weight-loss medicines to the public - including brand names,
// generic names, and terms like "GLP-1" / "weight loss injection". So this data
// describes the SERVICE only: clinician support, process, delivery, pricing of
// the programme, eligibility, and verified Trustpilot reviews about the service
// experience. It deliberately contains NO medicine names, doses, or efficacy
// claims. All values are operator-supplied and UK-verified.

export interface UkServiceReview {
  title: string;
  text: string;
  name: string;
  location: string; // "GB"
  rating: number;
  date?: string;
}

export interface UkWeightLossService {
  id: string;
  name: string;
  /** Service positioning - no medicine names. */
  tagline: string;
  trustpilotRating?: string;
  trustpilotReviewCount?: string;
  /** Programme/service price as published, with its condition. */
  servicePrice: string;
  /** Optional new-customer offer on the service. */
  offer?: string;
  /** What the service includes - support/process/delivery, never medicines. */
  included: string[];
  eligibility?: string;
  delivery?: string;
  /** Provider's public site (placeholder for the CTA until an affiliate link
   *  is live; affiliateUrl replaces it when the partnership is set up). */
  siteUrl: string;
  /** Affiliate link - added when the partnership is live. */
  affiliateUrl?: string;
  reviews?: UkServiceReview[];
}

export const UK_WEIGHT_LOSS_SERVICES: UkWeightLossService[] = [
  {
    id: "medexpress",
    name: "MedExpress",
    tagline: "Clinician-led weight-loss support through an established UK online pharmacy.",
    trustpilotRating: "4.3",
    trustpilotReviewCount: "54,868",
    servicePrice: "From £15/week (regularly £25), billed as £59.99",
    offer: "New-customer offer: £30 off over £89, or £40 off over £100",
    included: [
      "Backed by a team of 500+ clinicians",
      "Online questionnaire reviewed by a clinician before approval",
      "Fast dispatch - often delivered within 24 hours by first-class post",
      "Established UK online pharmacy operating since 2013",
    ],
    eligibility: "Online eligibility check; you may be suitable from a BMI of 25+",
    delivery: "Discreet UK delivery, often within 24 hours of approval",
    siteUrl: "https://www.medexpress.co.uk/clinics/weight-loss",
    // affiliateUrl: added when the partnership is live.
    reviews: [
      { title: "Quick delivery once all checks completed", text: "Quick delivery once all checks completed.", name: "Pam Luetchford", location: "GB", rating: 5, date: "2026-07-09" },
      { title: "Straightforward process", text: "Straightforward process. Covered relevant details before approving the order. Delivery was within 24 hours by first-class mail.", name: "rene tranter", location: "GB", rating: 5, date: "2026-09-03" },
      { title: "Very easy process", text: "Very easy instructions and process, and fast delivery. Great service.", name: "Carys", location: "GB", rating: 5, date: "2026-07-27" },
      { title: "Smooth online ordering process", text: "Smooth online ordering process.", name: "Doreen Kennedy", location: "GB", rating: 5, date: "2026-01-07" },
      { title: "Easy to order", text: "Easy to order. Polite and helpful people.", name: "Mrs Underwood", location: "GB", rating: 4, date: "2026-08-22" },
      { title: "Always an excellent service", text: "Always an excellent service. Great ordering process and speedy delivery service.", name: "JJ", location: "GB", rating: 5, date: "2026-07-29" },
      { title: "Quick delivery", text: "Quick delivery, helpful agents to answer any questions.", name: "Sarah", location: "GB", rating: 5, date: "2025-12-18" },
      { title: "Easy to complete", text: "Easy to complete question and answers; informative website that answered all my questions.", name: "Kerry", location: "GB", rating: 4, date: "2025-10-01" },
    ],
  },
  {
    id: "voy",
    name: "Voy",
    tagline: "A clinically supported, app-based weight-loss programme with coaching and a money-back promise.",
    trustpilotRating: "4.7",
    trustpilotReviewCount: "25,825",
    servicePrice: "From £64 for the first month (regularly £144)",
    offer: "Save 56% on your first month",
    included: [
      "Medically supported care with access to a UK clinician team",
      "App-based progress tracking and ongoing support",
      "Trusted by 100,000+ UK customers",
      "Automatic refills - cancel anytime",
      "180-day money-back promise",
    ],
    eligibility: "Online eligibility check before you start",
    delivery: "UK delivery once a clinician approves your plan",
    siteUrl: "https://www.joinvoy.com/weight-loss",
    // affiliateUrl: added when the partnership is live.
    reviews: [
      { title: "Great service", text: "Great service, advice and support.", name: "Diane Kay", location: "GB", rating: 5, date: "2026-09-05" },
      { title: "Ease of ordering and delivery", text: "Ease of ordering and delivery.", name: "Carol Rowan", location: "GB", rating: 5, date: "2026-09-05" },
      { title: "Simple to navigate", text: "Simple to navigate, little wait time, and online support via the app.", name: "Sue Morrow", location: "GB", rating: 5, date: "2026-09-05" },
      { title: "Very happy with service and delivery", text: "Very happy with service and delivery.", name: "Margaret", location: "GB", rating: 5, date: "2026-09-05" },
      { title: "Good service", text: "Good service.", name: "Ann", location: "GB", rating: 5, date: "2026-09-07" },
      { title: "Great customer service", text: "Great customer service. I signed up for 6 months but was unaware just how much the price would increase every month. They were accommodating to my financial difficulties and allowed me to cancel early.", name: "Mel Hardy", location: "GB", rating: 4, date: "2026-07-20" },
      { title: "Care and information tracking", text: "Care and information reference tracking.", name: "Debbie Kavanagh", location: "GB", rating: 5, date: "2026-09-07" },
      { title: "Excellent interaction", text: "Excellent interaction. I felt as though I had been listened to.", name: "Rachel McCormack", location: "GB", rating: 5, date: "2026-09-07" },
      { title: "Quick and good", text: "From filling out the application to delivery, response was very quick and good.", name: "Donna", location: "GB", rating: 5, date: "2026-09-05" },
    ],
  },
];

