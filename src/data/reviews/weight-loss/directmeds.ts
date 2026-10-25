import type { ProviderReviewRecord } from "../types";

// directmeds: customer reviews transcribed from the provider's Trustpilot profile.
// Moved out of config-store on Oct 25, 2026 with every review, note and date
// unchanged; see ../types.ts for the house rules.
// Record note: Aggregate re-verified Oct 12, 2026 from DirectMeds' claimed Trustpilot profile (operator-supplied screenshot): 4.6 across 16,390 reviews (was 15,690).

export const DIRECTMEDS_REVIEWS: ProviderReviewRecord = {
  providerId: "directmeds",
  vertical: "weight-loss",
  source: "trustpilot",
  profileUrl: "https://www.trustpilot.com/review/directmeds.com",
  profileStatus: "claimed",
  aggregate: {
    rating: "4.6",
    reviewCount: "16,390",
    verifiedOn: "2026-10-12",
    note: "Aggregate re-verified Oct 12, 2026 from DirectMeds' claimed Trustpilot profile (operator-supplied screenshot): 4.6 across 16,390 reviews (was 15,690).",
    history: [{"rating":"4.6","reviewCount":"15,690","on":"2026-09"}],
  },
  batches: [
    {
      method: "operator screenshots",
      reviews: [
          {
            title: "Thanks to all the help I received",
            text: "Thanks to all the help I rec'd from both Chelsea King and Matthew Jakins. Both were very professional, helpful, organized, leading me through all the necessary steps involved in this process. If medication is as helpful as these 2 employees it is a win win situation. I can't believe how patient and kind these 2 individuals were in helping with all the questions and confusion there was on my part ! Thank you again Chelsea and Matthew !!!!",
            name: "Sandra",
            location: "US",
            rating: 5,
            date: "Sep 23, 2026",
          },
          {
            title: "The rep was courteous and kind",
            text: "The rep was courteous and kind. She addressed my problem and promptly took care of the issue. I believe it was Madison.",
            name: "Lauren",
            location: "US",
            rating: 4,
            date: "Sep 23, 2026",
          },
          {
            title: "Happy Customer",
            text: "Chelsea King helped me. She was fast took time to listen.",
            name: "Monica N.",
            location: "US",
            rating: 5,
            date: "Sep 23, 2026",
          },
          {
            title: "Customer service",
            text: "Prompt service",
            name: "Janet G.",
            location: "US",
            rating: 4,
            date: "Sep 23, 2026",
          },
          {
            title: "Signup process was straight forward",
            text: "Signup process was straight forward and easy to navigate. Communication via text and email was almost too much, but nice to have for a new customer",
            name: "Bryan D.",
            location: "US",
            rating: 5,
            date: "Sep 23, 2026",
          },
          {
            title: "I have had a few issues with this company",
            text: "I have had a few issues with this company but they came through for me and Im doing really well on my meds. Looking forward to the next few months with them. Reasonable prices as well",
            name: "Gina",
            location: "US",
            rating: 3,
            date: "Sep 23, 2026",
          },
          {
            title: "I had an order placed since Sep 4th",
            text: "I had an order placed since Sep 4th. It did not actually ship until I had called 3 times. It just said \"Label Created\". The order was damaged in transit and the contents discarded. When I went online to the chat, the AI kept saying the order was delivered. I had to call in and get things straightened out. Now I am waiting for the replacement order to ship.",
            name: "Jackson J.",
            location: "US",
            rating: 2,
            date: "Sep 23, 2026",
          },
          {
            title: "Belinda was very good",
            text: "Belinda was very good. Answered all my questions very efficiently",
            name: "Mary Ann R.",
            location: "US",
            rating: 5,
            date: "Sep 22, 2026",
          },
          {
            title: "In speaking to your reps I found them very polite and helpful",
            text: "In speaking to your reps I found them very polite and helpful. I appreciated all the help. However, the doc was not very helpful. I couldn't access his message. However, I did get a message that my meds were on the way. Since I am not good at accessing my account, it is probably my fault. I would prefer to speak to your reps rather than go through an on line account.",
            name: "Toni R.",
            location: "US",
            rating: 4,
            date: "Sep 22, 2026",
          },
          {
            title: "My first bottle of NAD that I received",
            text: "My first bottle of NAD that I received was 50 mg. I was to take 20 units Monday through Friday. I only had enough medication for two weeks. I then called and requested an increase to 1000 mg of NAD and I am waiting for it to be delivered. I want to be sure that I will receive enough for 30 days. My first batch was only enough supply for two weeks and I was sent no syringes. Are you going to make up for the shortage?",
            name: "Julia",
            location: "US",
            rating: 3,
            date: "Sep 22, 2026",
          },
          {
            title: "A great personnel",
            text: "A great personnel, you have answering the phone and following up. Plus its a wonderful product",
            name: "John",
            location: "US",
            rating: 5,
          },
          {
            title: "Chelsea King was the best customer service representative",
            text: "Chelsea King was the best customer service representative. She was smart, friendly and helpful. I would definitely recommend her!",
            name: "Charisse",
            location: "US",
            rating: 5,
          },
          {
            title: "I spoke with two of your agents",
            text: "I spoke with two of your agents and they were extremely helpful. First I spoke with Summer who was delightful and professional. Then I spoke with Leon, who helped me with an order I was having difficulty with. I was extremely pleased with their friendly professionalism and knowledge of the product.",
            name: "Customer",
            location: "US",
            rating: 5,
          },
      ],
    },
  ],
};
