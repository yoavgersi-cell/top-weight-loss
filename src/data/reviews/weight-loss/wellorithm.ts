import type { ProviderReviewRecord } from "../types";

// wellorithm: customer reviews transcribed from the provider's Trustpilot profile.
// Moved out of config-store on Oct 25, 2026 with every review, note and date
// unchanged; see ../types.ts for the house rules.

export const WELLORITHM_REVIEWS: ProviderReviewRecord = {
  providerId: "wellorithm",
  vertical: "weight-loss",
  source: "trustpilot",
  batches: [
    {
      method: "operator screenshots",
      reviews: [
          {
            title: "Pleasant Experience Overall",
            text: "I had to reschedule my appointment twice, they should really look into their user experience of their app, but overall the doctor was nice and delivery was quicker then I expected.",
            name: "Tiro M.",
            location: "US",
            rating: 5,
          },
      ],
    },
  ],
};
