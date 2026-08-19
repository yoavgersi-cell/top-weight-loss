import type {
  SiteConfig,
  Provider,
  ReviewData,
  BattleData,
  FaqItem,
  RankingPosition,
  ArticleData,
} from "../config";

// ─────────────────────────────────────────────────────────────────────────────
// Hair-loss content
//
// Launch set for the hair-loss vertical: the two providers we monetize —
// Maximus and Happy Head — with truthful, general descriptions grounded in
// their public offering. It carries NO invented data:
//   • no Trustpilot rating/count (never fabricate ratings on a health site)
//   • no specific prices         (pricing text points to the provider's site)
//   • affiliateUrl / logo are filled with the real links & brand logos before
//     the vertical is added to PUBLISHED_VERTICALS.
// Everything here is overridden the moment it's edited in the CMS.
// ─────────────────────────────────────────────────────────────────────────────

// Real brand wordmarks + affiliate links for the launch providers.
const MAXIMUS_LOGO = "/logo-maximus.svg";
const HAPPYHEAD_LOGO = "/logos/happyheadlogo.png";
const MAXIMUS_URL = "https://track.revoffers.com/aff_c?offer_id=1347&aff_id=13399&url_id=10972";
const HAPPYHEAD_URL = "https://track.revoffers.com/aff_c?offer_id=1389&aff_id=13399&url_id=12477";
const UPDATED = "2026-08-18";

const providers: Provider[] = [
  {
    id: "maximus",
    name: "Maximus",
    tagline: "Doctor-prescribed oral & topical hair-loss treatment for men — finasteride, minoxidil & dutasteride",
    logo: MAXIMUS_LOGO,
    smallLogo: MAXIMUS_LOGO,
    highlights: [
      "Oral finasteride, minoxidil & dutasteride options",
      "Compounded topical formula (dutasteride, minoxidil, tretinoin, fexofenadine)",
      "Board-certified doctor review; free, discreet delivery",
    ],
    affiliateUrl: MAXIMUS_URL,
    ctaText: "Visit Site",
  },
  {
    id: "happyhead",
    name: "Happy Head",
    tagline: "Dermatologist-founded, personalized prescription hair-loss formulas — topical & oral, for men & women",
    logo: HAPPYHEAD_LOGO,
    smallLogo: HAPPYHEAD_LOGO,
    highlights: [
      "Custom topical & oral prescription formulas",
      "FDA-approved actives: finasteride, minoxidil, dutasteride, spironolactone",
      "Dermatologist-founded; free online consultation",
    ],
    affiliateUrl: HAPPYHEAD_URL,
    ctaText: "Visit Site",
  },
];

// Honest placeholder for pricing — no invented numbers.
const PRICING_TBD =
  "Pricing varies by treatment and plan. Check the provider's site for current pricing.";

// Editorial ranking scores for this vertical (independent, disclosed via the
// ranking methodology). Maximus leads the launch set per our review.
const positions: RankingPosition[] = [
  { score: 9.4, starRating: 5, label: "Excellent", badge: "Editor's Choice" },
  { score: 9.2, starRating: 5, label: "Excellent" },
];

const reviews: ReviewData[] = [
  {
    slug: "maximus",
    providerId: "maximus",
    shortSummary:
      "Doctor-prescribed hair-loss treatment for men — oral finasteride, minoxidil and dutasteride plus a compounded topical formula — reviewed by board-certified doctors and delivered to your door.",
    reviewIntro:
      "Maximus offers personalized, doctor-prescribed hair-loss treatment for men, spanning oral finasteride, oral minoxidil and oral dutasteride, as well as a compounded topical formula (dutasteride, minoxidil, tretinoin and fexofenadine). You complete a short medical questionnaire, a board-certified doctor reviews whether the protocol is appropriate, and approved medication ships free and discreetly. This review covers what Maximus offers, how it works, and who it fits.",
    keyFeatures: [
      "Oral finasteride, oral minoxidil and oral dutasteride options",
      "Compounded topical formula: dutasteride, minoxidil, tretinoin, fexofenadine",
      "Board-certified doctor reviews your medical questionnaire",
      "Free, discreet delivery to your door",
      "Focused on men's hair regrowth",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Oral finasteride",
      "Oral minoxidil",
      "Oral dutasteride",
      "Compounded topical formula (dutasteride, minoxidil, tretinoin, fexofenadine)",
    ],
    pros: [
      "Broad range of prescription options, including dutasteride",
      "Both oral and topical routes available",
      "Board-certified doctor oversight",
      "Free, discreet shipping",
    ],
    cons: [
      "Men-focused — not formulated for women",
      "Prescription treatments require a medical review",
      "Ongoing use is needed to maintain results",
    ],
    bestFor: [
      "Men who want prescription-strength options beyond finasteride and minoxidil",
      "Those open to oral dutasteride or a compounded topical",
      "People who prefer a fully online, doctor-reviewed process",
    ],
    finalVerdict:
      "Maximus is a strong pick for men who want a broader set of prescription hair-loss options — including dutasteride and a compounded topical — under board-certified doctor oversight. Confirm current pricing and eligibility on their site.",
    trustBadges: ["Board-certified doctors", "Free discreet delivery", "Prescription options"],
    updatedAt: UPDATED,
  },
  {
    slug: "happyhead",
    providerId: "happyhead",
    shortSummary:
      "Dermatologist-founded telehealth offering personalized prescription hair-loss formulas — custom topical and oral options with FDA-approved actives — for both men and women.",
    reviewIntro:
      "Happy Head is a dermatologist-founded telehealth service (based in Santa Monica, California) built around personalized prescription hair-loss formulas for men and women. Its customizable topical solutions and oral options combine FDA-approved actives — finasteride, minoxidil, dutasteride and spironolactone — and its topical serums go up to 8% minoxidil, above the 5% typical of over-the-counter products. A free online consultation is included, and prescription products are reviewed by Happy Head's dermatologists.",
    keyFeatures: [
      "Personalized topical and oral prescription formulas",
      "FDA-approved actives: finasteride, minoxidil, dutasteride, spironolactone",
      "Topical minoxidil available up to 8% (vs 5% typical OTC)",
      "Formulas for both men and women",
      "Dermatologist-founded; free online consultation",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Custom topical solutions (finasteride / minoxidil / dutasteride)",
      "Oral prescription tablets",
      "Formulas tailored for men and women",
      "Add or remove actives to personalize",
    ],
    pros: [
      "Highly personalized formulas",
      "Options for both men and women",
      "Higher-strength topical minoxidil available",
      "Dermatologist-founded, with a free online consultation",
    ],
    cons: [
      "Custom prescription formulas can cost more than generics",
      "Prescription requires a medical review",
      "Continued use is needed to maintain results",
    ],
    bestFor: [
      "People who want a tailored topical or oral formula",
      "Women seeking dermatologist-directed options",
      "Anyone wanting higher-strength topical minoxidil under medical guidance",
    ],
    finalVerdict:
      "Happy Head suits people who want a personalized, dermatologist-directed plan — with strong topical options and formulas for both men and women. Confirm current pricing and eligibility on their site.",
    trustBadges: ["Dermatologist-founded", "Personalized formulas", "Free online consultation"],
    updatedAt: UPDATED,
  },
];

const battles: BattleData[] = [
  {
    slug: "maximus-vs-happy-head",
    provider1Id: "maximus",
    provider2Id: "happyhead",
    title: "Maximus vs Happy Head: Which Hair-Loss Provider Is Right for You?",
    subtitle: "Two personalized prescription hair-loss services, compared",
    description:
      "Compare Maximus and Happy Head for online hair-loss treatment — treatment options, who each serves, and which fits you best.",
    intro:
      "Maximus and Happy Head both offer personalized, doctor-directed hair-loss treatment online, with oral and topical prescription options. Maximus is men-focused and leans into prescription breadth (including oral dutasteride and a compounded topical), while Happy Head is dermatologist-founded and serves both men and women with highly customizable formulas. Here's how they compare.",
    verdict:
      "Both are strong, doctor-directed options. Maximus is our top pick for men who want the broadest prescription toolkit under board-certified oversight, while Happy Head is the better fit for women or anyone who wants a highly personalized topical formula. Confirm current pricing and eligibility on each provider's site.",
    verdictWinnerPoints: [
      "Broad prescription options, including oral dutasteride",
      "Compounded topical plus multiple oral routes",
      "Board-certified doctor oversight",
    ],
    verdictLoserPoints: [
      "Dermatologist-founded, serves men and women",
      "Highly customizable topical and oral formulas",
      "Higher-strength topical minoxidil available",
    ],
    winnerId: "maximus",
    categories: [
      {
        name: "Who it serves",
        winner: "provider2",
        explanation:
          "Happy Head formulates for both men and women, while Maximus is focused on men.",
        supportingPoints: [
          "Happy Head offers formulas for women, including options like spironolactone",
          "Maximus concentrates on men's hair regrowth",
        ],
      },
      {
        name: "Treatment breadth",
        winner: "provider1",
        explanation:
          "Maximus offers a wide prescription toolkit — oral finasteride, minoxidil and dutasteride plus a compounded topical.",
        supportingPoints: [
          "Oral dutasteride available alongside finasteride and minoxidil",
          "Compounded topical combining several actives",
        ],
      },
      {
        name: "Personalization",
        winner: "provider2",
        explanation:
          "Happy Head is built around customizable formulas you can tailor by adding or removing actives.",
        supportingPoints: [
          "Add or remove active ingredients to personalize",
          "Topical minoxidil available up to 8%",
        ],
      },
    ],
    features: [
      { feature: "Oral finasteride", provider1Value: "Available", provider2Value: "Available", highlight: "both" },
      { feature: "Oral dutasteride", provider1Value: "Available", provider2Value: "Available", highlight: "both" },
      { feature: "Topical formula", provider1Value: "Compounded topical", provider2Value: "Custom topical (up to 8% minoxidil)", highlight: "none" },
      { feature: "For women", provider1Value: "No", provider2Value: "Yes", highlight: "provider2" },
      { feature: "Pricing", provider1Value: "See site", provider2Value: "See site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
];

const faqs: FaqItem[] = [
  {
    question: "Does finasteride regrow hair?",
    answer:
      "Finasteride is a prescription treatment shown in studies to slow hair loss and, for many men, help regrow some hair over time. Results vary by person and continued use is generally needed to maintain them. Talk to a licensed provider about whether it's right for you.",
  },
  {
    question: "Finasteride vs minoxidil vs dutasteride — what's the difference?",
    answer:
      "Finasteride and dutasteride are prescription medicines that reduce DHT, a hormone linked to hair loss (dutasteride blocks it more broadly). Minoxidil is a topical — and sometimes oral — treatment that supports hair growth through a different mechanism. They're often combined under medical guidance; a provider can advise what's appropriate for you.",
  },
  {
    question: "Topical or oral — which is better for hair loss?",
    answer:
      "Both routes can be effective. Oral medication is simple and consistent, while topical formulas are applied to the scalp and may limit systemic exposure. Some people use a combination. The right choice depends on your goals, tolerance and a provider's assessment.",
  },
  {
    question: "How long until hair-loss treatment works?",
    answer:
      "Most hair-loss treatments take several months of consistent use before visible changes appear — often around 3 to 6 months, with fuller results later. Individual timelines vary, and stopping treatment generally reverses the gains over time.",
  },
  {
    question: "Can women use these treatments?",
    answer:
      "Some options are formulated for women — for example certain minoxidil and spironolactone formulas — while others, such as finasteride and dutasteride, are generally not recommended for women, especially during pregnancy. Women should use options approved for them under medical guidance. Happy Head offers formulas for women; Maximus is focused on men.",
  },
  {
    question: "Are online hair-loss treatments legitimate?",
    answer:
      "Reputable telehealth providers connect you with licensed clinicians who review your information before prescribing, and dispense medication through licensed pharmacies. Always confirm a provider's licensing and details before starting.",
  },
];

// SEO-focused hair-loss guides. Content is general and appropriately hedged —
// no fabricated statistics or provider-specific numbers — with internal links to
// the provider reviews, the comparison, and between articles.
const articles: ArticleData[] = [
  {
    slug: "how-to-stop-hair-loss",
    title: "How to Stop Hair Loss: Treatments That Actually Work in 2026",
    description:
      "A practical guide to slowing and reversing hair loss — the proven treatments (finasteride, minoxidil, dutasteride), how they work, and how to start online.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-07-20",
    updatedAt: UPDATED,
    heroColor: "#EEF4FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Why hair loss happens",
        body: `The most common cause of hair loss in men — and a frequent cause in women — is androgenetic alopecia, better known as male- or female-pattern hair loss. It's driven largely by DHT (dihydrotestosterone), a hormone that gradually shrinks hair follicles over time, leading to thinning, a receding hairline, or a widening part. Genetics play a big role, which is why pattern hair loss often runs in families. The good news: because the process is gradual, starting treatment early gives you the best chance to keep the hair you have.`,
      },
      {
        heading: "The treatments proven to help",
        body: `Most evidence-based hair-loss treatment comes down to a few actives. <strong>Finasteride</strong> and <strong>dutasteride</strong> are prescription medicines that lower DHT to slow loss and help regrow hair. <strong>Minoxidil</strong> is a topical (and sometimes oral) treatment that supports growth through a separate mechanism, and is the active many people know from over-the-counter products. These are often combined under medical guidance. For a side-by-side look, read <a href="/hair-loss/articles/finasteride-vs-minoxidil">finasteride vs minoxidil</a>.`,
      },
      {
        heading: "Starting treatment online",
        body: `You no longer need an in-person visit to get started. Telehealth providers let you complete a short medical intake, have a licensed clinician review it, and — if appropriate — ship prescription treatment to your door. Providers differ in what they offer and who they serve: see our ranked <a href="/hair-loss">best hair-loss providers</a>, or compare two directly in <a href="/hair-loss/maximus-vs-happy-head">Maximus vs Happy Head</a>.`,
      },
      {
        heading: "Setting realistic expectations",
        body: `Hair-loss treatment rewards patience. It typically takes several months of consistent use — often 3 to 6 — before visible changes appear, and it's normal to see some early shedding as new growth cycles begin. Because these treatments work by maintaining an active growth environment, stopping them generally reverses the gains. For the full timeline, read <a href="/hair-loss/articles/how-long-hair-loss-treatment-works">how long hair-loss treatment takes to work</a>.`,
      },
      {
        heading: "When to talk to a professional",
        body: `Sudden, patchy, or unusual hair loss — or loss with other symptoms — can have causes beyond pattern baldness and is worth discussing with a clinician. A licensed provider can confirm what's going on and recommend a treatment plan that fits you. This guide is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "finasteride-vs-minoxidil",
    title: "Finasteride vs Minoxidil: Which Hair Loss Treatment Is Right for You?",
    description:
      "How finasteride and minoxidil differ, whether to use them together, side effects to know, and how to choose the right hair-loss treatment for you.",
    category: "Comparison",
    readTime: "6 min read",
    publishedAt: "2026-07-14",
    updatedAt: UPDATED,
    heroColor: "#F0FAF5",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "How each one works",
        body: `Finasteride is an oral prescription that lowers DHT, the hormone behind pattern hair loss, tackling the root cause. Minoxidil works differently — applied to the scalp (or taken orally by prescription), it supports the growth phase of the hair cycle. Because they act through separate mechanisms, they're frequently used together.`,
      },
      {
        heading: "The key differences",
        body: `Finasteride is prescription-only and generally used by men (it isn't recommended for most women, especially during pregnancy). Minoxidil is available over the counter at 5% and, by prescription, at higher strengths or combined with other actives — and certain minoxidil formulas are used by women. Finasteride is a daily tablet; minoxidil is usually a topical you apply to the scalp.`,
      },
      {
        heading: "Can you use them together?",
        body: `Yes — many effective plans combine finasteride and minoxidil, and some providers offer formulas that blend multiple actives into a single topical. A clinician can advise whether a combination is right for you and at what strengths. See how leading providers approach this in our <a href="/hair-loss">provider rankings</a>.`,
      },
      {
        heading: "Side effects to know",
        body: `Both treatments are generally well tolerated, but each can have side effects. Finasteride can, in a minority of men, cause sexual side effects; minoxidil can cause scalp irritation or unwanted facial hair with topical use. A licensed provider reviews your history and helps weigh the benefits and risks for your situation.`,
      },
      {
        heading: "Which should you choose?",
        body: `There's no single right answer — it depends on your goals, whether you prefer oral or topical, and a clinician's assessment. Many people start with both. If you want a tailored plan, providers like <a href="/hair-loss/reviews/happyhead">Happy Head</a> build personalized topical formulas, while <a href="/hair-loss/reviews/maximus">Maximus</a> offers a broad set of oral and topical prescription options.`,
      },
    ],
  },
  {
    slug: "does-finasteride-work",
    title: "Does Finasteride Really Work for Hair Loss?",
    description:
      "What finasteride does, what to realistically expect, how long it takes, who it's for, and the difference between oral and topical finasteride.",
    category: "Science",
    readTime: "6 min read",
    publishedAt: "2026-07-08",
    updatedAt: UPDATED,
    heroColor: "#FBF3EE",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "What finasteride does",
        body: `Finasteride reduces the body's production of DHT, the hormone that gradually shrinks hair follicles in pattern hair loss. By lowering DHT, it slows the loss and, for many men, helps regrow some hair over time. It targets the underlying hormonal driver rather than just supporting growth.`,
      },
      {
        heading: "What to realistically expect",
        body: `For many men, finasteride helps slow or stop hair loss and can lead to some regrowth, though results vary from person to person. It tends to work best when started early, before significant loss. It's a maintenance treatment: benefits are sustained with continued use and generally fade if you stop.`,
      },
      {
        heading: "How long it takes",
        body: `Finasteride isn't an overnight fix. Most people need several months of daily use — commonly 3 to 6 months — before noticing changes, with fuller results developing over a year. Some early shedding as the hair cycle resets is normal. Read more on the <a href="/hair-loss/articles/how-long-hair-loss-treatment-works">hair-loss treatment timeline</a>.`,
      },
      {
        heading: "Oral vs topical finasteride",
        body: `Finasteride comes as an oral tablet and, increasingly, as a topical applied to the scalp — sometimes blended with minoxidil. Topical formulas aim to limit how much of the medicine reaches the rest of the body. Providers like <a href="/hair-loss/reviews/happyhead">Happy Head</a> offer customizable topical options, while <a href="/hair-loss/reviews/maximus">Maximus</a> offers oral finasteride and dutasteride plus a compounded topical.`,
      },
      {
        heading: "Is it right for you?",
        body: `Finasteride is generally used by men and isn't recommended for most women, especially during pregnancy. A licensed clinician can confirm whether it fits your situation and monitor you over time. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "how-long-hair-loss-treatment-works",
    title: "How Long Until Hair Loss Treatment Works?",
    description:
      "A realistic month-by-month timeline for finasteride and minoxidil — including early shedding, when to expect results, and why consistency matters.",
    category: "Guide",
    readTime: "5 min read",
    publishedAt: "2026-07-02",
    updatedAt: UPDATED,
    heroColor: "#F3EEFB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "The short answer",
        body: `Most hair-loss treatments take several months of consistent use before you see visible changes — commonly around 3 to 6 months, with fuller results developing over 12 months. Hair grows slowly, and treatments work by gradually shifting more follicles into an active growth phase, so patience is essential.`,
      },
      {
        heading: "What early shedding means",
        body: `In the first weeks to months, some people notice increased shedding. This can be unsettling, but it's often a normal part of the process as resting hairs are pushed out and replaced by new growth. It typically settles as treatment continues. If you're concerned, check in with your provider.`,
      },
      {
        heading: "A rough month-by-month guide",
        body: `Months 1–3: little visible change; early shedding possible. Months 3–6: reduced loss and the first signs of regrowth for many people. Months 6–12: thicker, fuller results become more apparent. Individual timelines vary based on the treatment, your hair, and how consistently you use it.`,
      },
      {
        heading: "Why consistency is everything",
        body: `These treatments only work while you use them — the gains generally reverse within months of stopping. Building a simple daily routine (and choosing a provider that makes refills easy) is one of the biggest predictors of success. Compare providers on our <a href="/hair-loss">best hair-loss providers</a> page.`,
      },
    ],
  },
  {
    slug: "best-online-hair-loss-treatment",
    title: "Best Online Hair Loss Treatment: How to Choose a Provider in 2026",
    description:
      "How online hair-loss treatment works, what to look for in a telehealth provider, and how the top options compare on treatments, personalization and who they serve.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-06-26",
    updatedAt: UPDATED,
    heroColor: "#EEF7FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Why treat hair loss online",
        body: `Online hair-loss treatment has made getting started far simpler: complete a short intake, have a licensed clinician review it, and receive prescription treatment at your door — usually for less hassle than an in-person visit. The trade-off is choosing wisely, since providers vary widely in what they offer.`,
      },
      {
        heading: "What to look for in a provider",
        body: `Prioritize real medical oversight (a licensed clinician who reviews your intake), the right treatments for you (finasteride, minoxidil, dutasteride; topical or oral), personalization, and transparent terms — pricing, what's included, and how easy it is to pause or cancel. Beware anything that prescribes without a proper review.`,
      },
      {
        heading: "How the top providers compare",
        body: `In our rankings, <a href="/hair-loss/reviews/maximus">Maximus</a> stands out for men wanting a broad prescription toolkit — oral finasteride, minoxidil and dutasteride plus a compounded topical — while <a href="/hair-loss/reviews/happyhead">Happy Head</a> is dermatologist-founded and serves both men and women with highly customizable formulas. See them head to head in <a href="/hair-loss/maximus-vs-happy-head">Maximus vs Happy Head</a>.`,
      },
      {
        heading: "Men vs women",
        body: `Not every provider treats everyone. Some, like Maximus, focus on men; others, like Happy Head, formulate for both men and women. If you're a woman, make sure a provider offers options appropriate for you — see our guide to <a href="/hair-loss/articles/hair-loss-treatment-for-women">hair loss treatment for women</a>.`,
      },
      {
        heading: "What about cost?",
        body: `Pricing depends on the provider, the treatment, and whether it's oral or a custom topical, so check current pricing on each provider's site before you commit. Factor in what's included — the consultation, medication, and shipping — rather than the headline number alone.`,
      },
    ],
  },
  {
    slug: "hair-loss-treatment-for-women",
    title: "Hair Loss Treatment for Women: Options That Actually Work",
    description:
      "How female hair loss differs, which treatments are used for women (minoxidil, spironolactone and more), what to avoid, and how to start online.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-06-18",
    updatedAt: UPDATED,
    heroColor: "#FBEEF4",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "How female hair loss is different",
        body: `Women more often experience diffuse thinning across the top of the scalp or a widening part, rather than the receding hairline typical in men. Causes can include female-pattern hair loss, hormonal changes, thyroid issues, stress, and nutritional factors — so an accurate assessment matters before choosing a treatment.`,
      },
      {
        heading: "Treatments used for women",
        body: `Minoxidil is one of the most common options for women and is used topically (and sometimes orally by prescription). Some women are prescribed spironolactone, which addresses hormonal drivers of hair loss. Treatment should always be guided by a clinician who can tailor it to your situation.`,
      },
      {
        heading: "What to avoid",
        body: `Finasteride and dutasteride are generally not recommended for most women — especially during pregnancy or if you may become pregnant — because of the risk to a developing baby. This is why it's important to use options that are formulated and approved for women under medical guidance.`,
      },
      {
        heading: "Starting treatment online",
        body: `Some telehealth providers formulate specifically for women. In our rankings, <a href="/hair-loss/reviews/happyhead">Happy Head</a> is dermatologist-founded and offers personalized formulas for both men and women, including options like spironolactone. Compare your choices on our <a href="/hair-loss">best hair-loss providers</a> page. This article is general information, not medical advice.`,
      },
    ],
  },
];

export function hairLossSeed(base: SiteConfig): SiteConfig {
  return {
    ...base,
    siteName: "treatmentshub.com",
    hero: {
      ...base.hero,
      backgroundImageUrl: "",
      imageAlt: "",
      updatedLabel: "Last Updated: August 2026",
      h1: "Best Hair Loss Treatments & Providers of 2026",
      h2: "Compare the top hair-loss telehealth providers, side by side",
      description:
        "Compare the best online hair-loss providers — finasteride, minoxidil, dutasteride and doctor-led regrowth programs — on treatment options, medical support, and overall value.",
    },
    providers,
    sidebar: {
      ...base.sidebar,
      blockOrder: ["secureBadge", "editorialReviews", "rankingMethodology", "disclosure"],
    },
    ranking: {
      providerOrder: providers.map((p) => p.id),
      positions,
    },
    reviews,
    battles,
    faqs,
    articles,
  };
}
