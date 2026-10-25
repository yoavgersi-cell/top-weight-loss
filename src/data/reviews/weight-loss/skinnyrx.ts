import type { ProviderReviewRecord } from "../types";

// skinnyrx: customer reviews transcribed from the provider's Trustpilot profile.
// Moved out of config-store on Oct 25, 2026 with every review, note and date
// unchanged; see ../types.ts for the house rules.

export const SKINNYRX_REVIEWS: ProviderReviewRecord = {
  providerId: "skinnyrx",
  vertical: "weight-loss",
  source: "trustpilot",
  batches: [
    {
      method: "operator screenshots",
      reviews: [
          {
            title: "Starting my second yearly subscription",
            text: "Ivy assisted me with my second yearly subscription and was very informative and helpful. I've lost over 45lbs on SkinnyRx so far in one year. Just don't expect to lose it all at once. Eat healthy, and be patient. Thanks Ivy!!!",
            name: "Jill W.",
            location: "US",
            rating: 5,
          },
          {
            title: "Nice experience",
            text: "Great service",
            name: "mitra S.",
            location: "US",
            rating: 5,
          },
          {
            title: "Amy was awesome",
            text: "Amy was awesome! Super sweet, intelligent and love every time I get to work with her.",
            name: "Customer",
            location: "US",
            rating: 5,
          },
      ],
    },
  ],
};
