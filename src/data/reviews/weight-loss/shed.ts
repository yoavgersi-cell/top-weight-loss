import type { ProviderReviewRecord } from "../types";

// shed: customer reviews transcribed from the provider's Trustpilot profile.
// Moved out of config-store on Oct 25, 2026 with every review, note and date
// unchanged; see ../types.ts for the house rules.
// Record note: Aggregate re-verified Sep 24, 2026 from SHED's claimed Trustpilot profile (operator-supplied screenshot): 4.6 across 1,134 reviews, Weight Loss Service category, claimed Apr 2025. (Was 4.7 / 1,120.)

export const SHED_REVIEWS: ProviderReviewRecord = {
  providerId: "shed",
  vertical: "weight-loss",
  source: "trustpilot",
  profileUrl: "https://www.trustpilot.com/review/www.tryshed.com",
  profileStatus: "claimed",
  aggregate: {
    rating: "4.6",
    reviewCount: "1,134",
    verifiedOn: "2026-09-24",
    note: "Aggregate re-verified Sep 24, 2026 from SHED's claimed Trustpilot profile (operator-supplied screenshot): 4.6 across 1,134 reviews, Weight Loss Service category, claimed Apr 2025. (Was 4.7 / 1,120.)",
    history: [{"rating":"4.7","reviewCount":"1,120","on":"2026-09"}],
  },
  batches: [
    {
      capturedOn: "2026-09-24",
      method: "operator screenshots",
      note: "Sep 24, 2026 batch (operator-supplied screenshots of the profile's newest reviews, Sep 2-23 2026). Transcribed faithfully, including the 1-star; reviewer names reduced to first name + last initial.",
      reviews: [
          {
            title: "great customer service",
            text: "Gao helped me with several issues very quickly. Very personable too. And I love Shed too",
            name: "BAG",
            location: "US",
            rating: 5,
            date: "Sep 23, 2026",
          },
          {
            title: "Continued to charge me for months after...",
            text: "Continued to charge me for months after I stopped the medication. Exclusively AI customer support so don't expect any help. I was told to not expect a refund so I am having to go through my credit card company. Extremely shady company. Edit: in response to their reply, I already contacted support and was told that they will not refund the $1200 they took and delivered nothing.",
            name: "Justin J.",
            location: "US",
            rating: 1,
            date: "Sep 14, 2026",
          },
          {
            title: "Your communications are excellent",
            text: "Your communications are excellent! Ethan was quick to reply to my request for clarifications. Recommended!",
            name: "BB",
            location: "US",
            rating: 5,
            date: "Sep 15, 2026",
          },
          {
            title: "Savannah - real person",
            text: "The app & chat function are a little clunky, but improving. Once you start emailing (not chatting) with a real person, Savannah was the best. Another agent told me I was SOL, but Savannah went a step further and resolved my issue.",
            name: "R M",
            location: "US",
            rating: 5,
            date: "Sep 15, 2026",
          },
          {
            title: "It was a nice personal touch to receive...",
            text: "It was a nice personal touch to receive a phone call from a real person instead of a robo call. Thank you for the kind follow up.",
            name: "Maria M.",
            location: "US",
            rating: 5,
            date: "Sep 11, 2026",
          },
          {
            title: "Trinity was absolutely amazing",
            text: "Trinity was absolutely amazing! I accidentally created 2 accounts and thought the issue was resolved from previous interactions with customer service but she assisted me the whole way through and made sure I didn't lose anything that was owed to me and also set up my next follow up appointment. She is fantastic please reward her for this!",
            name: "Victoria C.",
            location: "US",
            rating: 5,
            date: "Sep 2, 2026",
          },
          {
            title: "ShedRx has been awesome",
            text: "ShedRx has been awesome! Their service is super-fast, and they even changed my refill date so I wouldn't miss my shot days. Anytime I have an issue, a member support person reaches out right away to help.",
            name: "Michelle W.",
            location: "US",
            rating: 5,
            date: "Sep 2, 2026",
          },
          {
            title: "Spoke with Tamika",
            text: "Spoke with Tamika. She was very helpful and informative. She's scheduled a coaching session. Gave me lots of good information.",
            name: "Cindy C.",
            location: "US",
            rating: 5,
          },
          {
            title: "Jamika was the representative that called me",
            text: "Jamika was the representative that called me and she was amazing VERY informative and nice. Asked me if I had any questions made sure I understood the entire process and made me feel very comfortable on my journey with shed!",
            name: "Jordan R.",
            location: "US",
            rating: 5,
          },
          {
            title: "5 star customer service",
            text: "Amber was quick to respond to my concern and offered a quick solution! Great customer service!",
            name: "Joyce H.",
            location: "US",
            rating: 5,
          },
      ],
    },
  ],
};
