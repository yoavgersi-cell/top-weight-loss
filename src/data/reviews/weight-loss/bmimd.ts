import type { ProviderReviewRecord } from "../types";

// bmimd: customer reviews transcribed from the provider's Trustpilot profile.
// Moved out of config-store on Oct 25, 2026 with every review, note and date
// unchanged; see ../types.ts for the house rules.
// Record note: Verified from the operator's Trustpilot screenshots (claimed profile, Sep 2026). Real, unprompted reviews only - an off-topic business review captured in the same set was deliberately excluded.

export const BMIMD_REVIEWS: ProviderReviewRecord = {
  providerId: "bmimd",
  vertical: "weight-loss",
  source: "trustpilot",
  profileUrl: "https://www.trustpilot.com/review/bmimd.com",
  profileStatus: "claimed",
  aggregate: {
    rating: "4.4",
    reviewCount: "870",
    verifiedOn: "2026-09",
    note: "Verified from the operator's Trustpilot screenshots (claimed profile, Sep 2026). Real, unprompted reviews only - an off-topic business review captured in the same set was deliberately excluded.",
  },
  batches: [
    {
      method: "operator screenshots",
      reviews: [
          {
            title: "Amazing Customer Service",
            text: "The customer service I have experienced w/ bmiMD is excellent. They always respond to messages within a timely matter. They always come up with a solution to any issues. I have nothing bad to say about them.",
            name: "Delaruth W.",
            location: "US",
            rating: 5,
            date: "Jul 23, 2026",
          },
          {
            title: "So far...no side effects",
            text: "So far...no side effects! Just dropping weight that exercise and diet wouldn't. Have gone from 238 to 213 in 3 weeks. Shipping to my front door for easy delivery!",
            name: "MommaJ",
            location: "US",
            rating: 5,
            date: "Jul 4, 2026",
          },
          {
            title: "Medication works as it should",
            text: "Medication works as it should. Always delivered on time and packaged properly with cold packs. Customer Service is very responsive.",
            name: "Anna",
            location: "US",
            rating: 5,
            date: "Jul 3, 2026",
          },
          {
            title: "Excellent customer service",
            text: "Excellent customer service, quick shipping. The product I ordered is working wonderfully.",
            name: "Sandra H.",
            location: "US",
            rating: 5,
            date: "Jul 2, 2026",
          },
          {
            title: "Great service for all my supplement needs",
            text: "Great service for all my supplement needs!",
            name: "Cindy L.",
            location: "US",
            rating: 5,
            date: "Jul 3, 2026",
          },
          {
            title: "I feel more powerful now",
            text: "I feel more powerful now, it is a great starting.",
            name: "Iliet S.",
            location: "US",
            rating: 5,
            date: "Jul 3, 2026",
          },
      ],
    },
  ],
};
