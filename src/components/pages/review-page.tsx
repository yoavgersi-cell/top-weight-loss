import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight, ArrowUpRight, Shield, Star, ArrowBigUp, ArrowBigDown, MessageCircle, ShieldCheck, UserRound, Users, Stethoscope, type LucideIcon } from "lucide-react";
import { getConfig } from "@/lib/config-store";
import { latestUpdate, VERTICALS, NOINDEX_WL_REVIEW_SLUGS, NOINDEX_WL_BATTLE_SLUGS, DEFAULT_ROBOTS } from "@/lib/config";
import { SLUG_ALIASES } from "@/lib/slug-aliases";
import {
  type SiteContext,
  canonicalUrl,
  hubLink,
} from "@/lib/site-context";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProviderCta } from "@/components/provider-cta";
import { TrustpilotCarousel } from "@/components/trustpilot-carousel";
import { TrustpilotSummary } from "@/components/trustpilot-summary";
import { getReviewRecord } from "@/data/reviews";
import { analysisPath, hasReviewAnalysis } from "@/lib/review-analysis";
import { THREE_WAY_COMPARISONS } from "@/lib/three-way";
import { CustomerThemes } from "@/components/customer-themes";
import { ReviewInsights } from "@/components/review-insights";
import { FeaturedReviews } from "@/components/featured-reviews";
import { MedicalReviewBar } from "@/components/medical-review-bar";
import { pageReviewSchema } from "@/data/reviewers";
import { medicalWebPageFields } from "@/lib/medical-schema";
import { LastUpdated } from "@/components/last-updated";
import { PromoPopup } from "@/components/promo-popup";
import { resolvePromoPopup } from "@/lib/promo-popups";
import { TrustDisclosure, MedicalSources } from "@/components/medical-sources";
import { MedicalDisclaimer } from "@/components/medical-disclaimer";
import { SourcesMethodology } from "@/components/sources-methodology";
import { ProductCarousel } from "@/components/product-carousel";
import { notFound } from "next/navigation";
import { REDDIT_COMMUNITY_FEEDBACK as REVIEW_COMMUNITY_FEEDBACK, RedditMark } from "@/components/reddit-community";
import { YoutubeReviewSection } from "@/components/youtube-review";
import { ReadableProse, enhanceArticleHtml } from "@/components/prose";
import { ProviderAudit } from "@/components/provider-audit";
import { HowItWorksShowcase, HOW_IT_WORKS_SHOWCASE } from "@/components/how-it-works-showcase";
import { catalogPriceSnippet } from "@/lib/product-catalog";

// Per-provider SEO overrides for reviews with distinctive search demand.
// Code-controlled (not CMS-merged) so they reliably target trending queries -
// e.g. surging "embody reviews" and "embody glp1".
// `{prices}` in a description is filled at render time with the provider's
// lowest verified catalog prices (product-catalog.ts), so the snippet Bing
// prints almost verbatim always carries current numbers and never a hand-typed
// price that can go stale. Providers without a catalog entry get the token
// removed cleanly.

// Oct 25, 2026: "<provider> reviews and complaints" is among the most common
// ways people reach these pages (Copilot citation data). The block answers it
// on the page itself from the lowest-rated Trustpilot reviews we already hold
// and transcribe below - no outside claims - and says plainly when a provider
// has no public review record yet. Weight-loss vertical only.

const REVIEW_SEO_OVERRIDES: Record<string, { title: string; description: string }> = {
  // HRT vertical (ported from hrtwomen.com, Oct 22, 2026). Titles shaped by
  // that site's Search Console queries: "winona hrt reviews", "how much does
  // winona cost", "does winona take insurance", "is midi health legit".
  winona: {
    title: "Winona HRT Reviews 2026: Cost, Insurance & Is It Legit?",
    description:
      "Honest Winona HRT review: what it costs per month, whether it takes insurance, which estrogen and progesterone products it prescribes, and whether it's legit.",
  },
  gala: {
    title: "Gala HRT Reviews 2026: Cost, Hormone Therapy & Is It Legit?",
    description:
      "Gala hormone therapy reviewed: flat monthly pricing, estradiol and progesterone options, what's included and whether Gala is a legit option for menopause HRT.",
  },
  midi: {
    title: "Midi Health Reviews 2026: Cost, Insurance & Is It Worth It?",
    description:
      "Midi Health review: insurance-covered video visits with menopause clinicians, self-pay cost, what it treats, where it's available and whether it's worth it.",
  },
  // ED vertical (ported from edtreatmenthub.com, Oct 21, 2026)
  quad: {
    title: "Quad by MEDVi Review 2026: Cost, Ingredients & Is It Legit?",
    description:
      "Independent review of Quad by MEDVi, the compounded 4-in-1 dissolvable ED medication: what is in it, monthly cost, who it suits, and whether it is legit.",
  },
  embody: {
    // Oct 2026, Bing 30-day export: "embody reviews" 411 impressions at
    // position ~6 with ZERO clicks, and the page's CTR is 0.43% on 1.6K
    // impressions - the worst of the three top review pages. Bing weights the
    // exact phrase, so the title now opens with "embody Reviews" (the welludr
    // and altRx titles that open with "<brand> Reviews" earn 1.1% and 0.8%).
    // "Weight Loss" stays in the title for Google, where "embody weight loss
    // reviews" is the page's main query, and "Legit" covers the legit/scam
    // long-tails that convert at 50-100% on Bing.
    title: "embody Reviews 2026: Cost, Results & Is It Legit?",
    description:
      "embody reviews: {prices}, 1-2 day shipping, LegitScript-certified, refund if not approved. Is embody legit?",
  },
  medvi: {
    // Decoupled from the "is medvi legit" query (Sep 2026): that phrase lived in
    // BOTH this title and the is-medvi-legit article title, splitting the signal.
    // The review now owns "medvi reviews / cost / verdict"; the article owns the
    // legitimacy query. Revert if the split doesn't resolve post-migration-swap.
    title: "Medvi GLP-1 Reviews 2026: Cost, Support & Verdict",
    description:
      "Medvi reviews: {prices}, all-inclusive with video visits and personal support. Cost, pros, cons and our verdict.",
  },
  sprout: {
    title: "Sprout Reviews 2026: Is It Legit? GLP-1 Cost & Verdict",
    description:
      "Sprout reviews: {prices}, brand-name Wegovy available. Is Sprout legit? Pricing, pros & cons.",
  },
  altrx: {
    title: "altRx Reviews 2026: Is It Legit? Cost, Complaints & Verdict",
    description:
      "altRx reviews: {prices}, plus brand-name Zepbound & Wegovy and Buy Now, Pay Later. Is altRx legit? Pros & cons.",
  },
  ro: {
    // Title matches the generated shared-provider title byte-for-byte - this
    // entry exists only to put "GLP-1" in the description (desc-only pass).
    title: "ro Weight Loss Review 2026: Cost, Results & Is It Worth It?",
    description:
      "ro weight loss review: membership from $39 the first month plus brand-name Wegovy or Zepbound billed separately; insurance can apply. Pros and cons.",
  },
  // Oct 25, 2026: two operator-added providers without Trustpilot profiles.
  luvo: {
    title: "Luvo Reviews 2026: GLP-1 Cost, 50% Off Offer & Verdict",
    description:
      "Luvo reviews: compounded semaglutide $104.50 and tirzepatide $124.50 for the first 4 weeks, then $209 and $249, plus tablets and Ozempic. No membership fees.",
  },
  medgm: {
    title: "MEDGm Reviews 2026: GLP-1 Injections, Tablets & Zepbound",
    description:
      "MEDGm reviews: compounded GLP-1 injections from $169, daily GLP-1 tablets from $239 and brand-name Zepbound on a $99 membership plus medication. Pros and cons.",
  },
  eden: {
    title: "Eden Reviews 2026: 4.5 Trustpilot, $99 Flat GLP-1 & Verdict",
    description:
      "Eden reviews: {prices}, flat at every dose, no membership, 4.5 on Trustpilot across 5,019 reviews. Is Eden legit?",
  },
  trimrx: {
    title: "TrimRx Reviews 2026 (Trim Rx): Is It Legit? Cost & Verdict",
    description:
      "TrimRx (Trim Rx) reviews: {prices}, no contract, clinical support included. Is TrimRx legit? Pros and cons.",
  },
  shed: {
    title: "Shed Reviews 2026: Is It Legit? Cost, Real Results & Verdict",
    description:
      "Shed reviews: {prices}, with health coaching and a money-back guarantee. Is Shed legit and worth it? Pros & cons.",
  },
  directmeds: {
    title: "DirectMeds Reviews 2026: Is It Legit? Cost & Verdict",
    description:
      "DirectMeds reviews: {prices} flat at every dose, injections or drops, free 1-2 day shipping. Is it legit?",
  },
  wellmedr: {
    // Rebranded Oct 2026; the old name stays in the title so searches for
    // "wellmedr reviews" still match this page.
    title: "welludr (formerly wellmedr) Reviews 2026: Cost & Verdict",
    description:
      "welludr (formerly wellmedr) reviews: {prices}, 1M+ patients, weight-loss warranty. Is welludr legit? Pros and cons.",
  },
  healthrx: {
    title: "HealthRx Reviews 2026: Is It Legit? $99/mo GLP-1 Examined",
    description:
      "HealthRx reviews: {prices} (semaglutide 12-month prepaid), overnight cold shipping, LegitScript-certified. Is it legit?",
  },
};

// "Is [brand] legit?" trust block - targets the high-intent "is X legit" query
// cluster inside the existing review page (no separate page → no cannibalization).
// Only defined for providers where the legitimacy signals are genuinely verifiable;
// each signal is grounded in that provider's real credentials/practices.
const REVIEW_LEGIT: Record<string, { verdict: string; signals: string[] }> = {
  // HRT vertical (ported from hrtwomen.com, Oct 22, 2026); facts as verified
  // in src/lib/seeds/hrt.ts.
  winona: {
    verdict:
      "Yes - Winona is a legitimate US telehealth company. Treatment is prescribed by board-certified physicians after an online medical questionnaire, and ongoing care runs through secure doctor messaging. As with any HRT, whether it's appropriate for you is a medical decision, so answer the intake honestly.",
    signals: ["Board-certified physicians", "Prescription-only, after a medical review", "Secure doctor messaging and follow-ups"],
  },
  gala: {
    verdict:
      "Yes - Gala is a legitimate telehealth service. US-licensed clinicians review your health history before prescribing, and its HRT plan uses estradiol and progesterone with check-ins and dose adjustments included. Confirm current pricing and availability on Gala's own site.",
    signals: ["US-licensed clinicians", "Estradiol and progesterone", "Check-ins and dose adjustments included"],
  },
  midi: {
    verdict:
      "Yes - Midi Health is a legitimate virtual menopause clinic. Care is delivered over video by women's-health nurse practitioners and certified nurse midwives, it is in-network with most major commercial insurance plans, and prescriptions go to the pharmacy you choose.",
    signals: ["Video visits with menopause-trained clinicians", "In-network with most major commercial insurance", "Prescriptions sent to your own pharmacy"],
  },
  embody: {
    verdict:
      "Yes - embody is a legitimate, US-based telehealth weight-loss provider. It's LegitScript-certified, works with US-based state-licensed 503A compounding pharmacies, and connects you with state-licensed doctors overseen by its own medical director.",
    signals: [
      "LegitScript-certified telehealth provider",
      "US-based, state-licensed 503A compounding pharmacies",
      "State-licensed doctors, a medical director, and a nursing team",
      "Transparent flat pricing - $69/mo semaglutide, $119 tirzepatide",
      "Full refund if you're not approved",
    ],
  },
  altrx: {
    verdict:
      "Yes - altRx is a legitimate self-pay telehealth service. A licensed provider (physician, PA, or nurse practitioner) reviews your assessment before any prescription is issued, and medication is filled by a licensed pharmacy.",
    signals: [
      "Licensed providers review every assessment (physician, PA, or NP)",
      "Prescriptions filled by licensed pharmacies",
      "Transparent, flat pricing - no hidden fees, no insurance required",
      "No long-term contract; pause or cancel anytime",
      "Buy Now, Pay Later available",
    ],
  },
  trimrx: {
    verdict:
      "Yes - TrimRx is a legitimate telehealth GLP-1 provider. Licensed clinicians guide treatment, medications are compounded semaglutide and tirzepatide prescribed after a medical review, and pricing is transparent with no long-term contract.",
    signals: [
      "Licensed clinical guidance throughout treatment",
      "Compounded semaglutide & tirzepatide, prescribed after review",
      "Transparent, competitive pricing with multi-month discounts",
      "No long-term contract required",
      "100% online - no clinic visit needed",
    ],
  },
  medvi: {
    verdict:
      "Yes - Medvi is a legitimate medical weight-loss platform. Prescriptions are overseen by licensed providers with regular monitoring, and its pricing is transparent and all-inclusive with no surprise charges.",
    signals: [
      "Prescription treatment overseen by licensed providers",
      "Regular monitoring and provider check-ins",
      "Transparent, all-inclusive pricing - no surprise charges",
      "Highly rated, personal service on Trustpilot",
      "100% online - no clinic visit required",
    ],
  },
  wellmedr: {
    verdict:
      "Yes - welludr is a legitimate telehealth platform. Board-certified specialists tailor your plan, and medications are made in US state-licensed pharmacies following FDA compounding standards after a medical review.",
    signals: [
      "Board-certified specialists tailor your treatment plan",
      "US state-licensed pharmacies following FDA compounding standards",
      "Real medical intake reviewed before prescribing",
      "100% online - message your provider anytime",
      "Discreet, unbranded packaging",
    ],
  },
  healthrx: {
    verdict:
      "Yes - HealthRx is a legitimate GLP-1 telehealth program. It's LegitScript-certified (cert. 50087439), an independent US-licensed clinician reviews every request before treatment proceeds, and medication is prepared by licensed 503A pharmacies and shipped overnight in temperature-controlled, lot-tracked packaging.",
    signals: [
      "LegitScript certified - cert. 50087439",
      "Independent US-licensed clinician reviews every request; approval is never automatic",
      "Licensed 503A pharmacy fulfillment",
      "Overnight cold-chain shipping, lot-tracked through delivery",
      "Transparent prepaid pricing - $99/mo semaglutide ($1,188 at checkout), no hidden fees",
    ],
  },
};

// Extra code-controlled FAQs appended to specific reviews (and their FAQPage
// schema) - high-intent questions grounded in each provider's real published
// terms. Side-effect answers stay at medication level and link the full guide.
// TRT vertical (ported from toptrt.io, Oct 22, 2026). Kept in its own map and
// read only on /trt: dudemeds is also reviewed on /ed, and a TRT verdict must
// not surface there.
const REVIEW_LEGIT_TRT: Record<string, { verdict: string; signals: string[] }> = {
  hone: {
    verdict:
      "Yes - Hone Health is a legitimate, established telehealth provider. It doesn't sell testosterone off a shelf: treatment starts with real lab testing to confirm low testosterone and a licensed clinician's review, then continues with ongoing monitoring. That testing-first, clinician-directed model is exactly what a responsible TRT service should look like.",
    signals: [
      "Requires bloodwork confirming low testosterone before any prescription",
      "Licensed clinicians review your results and direct treatment",
      "Ongoing monitoring with follow-up labs and dose adjustments",
      "Established, recognizable men's-health brand",
    ],
  },
  tmates: {
    verdict:
      "Yes - TMates is a legitimate TRT-focused telehealth membership. It's built around the responsible path: lab testing to establish your levels, a licensed clinician's review, and ongoing monitoring over time rather than a one-off prescription.",
    signals: [
      "Lab testing before any prescription",
      "Licensed clinicians involved throughout",
      "Membership built around ongoing monitoring",
      "Dedicated, TRT-first program",
    ],
  },
  maleexcel: {
    verdict:
      "Yes - Male Excel is a legitimate, established men's-health telehealth brand with a strong track record, rated 4.5 on Trustpilot across thousands of reviews. It runs comprehensive at-home labs and a licensed-clinician review before prescribing, with unlimited provider follow-ups.",
    signals: [
      "Rated 4.5 on Trustpilot from thousands of reviews",
      "Comprehensive at-home lab testing before any prescription",
      "Licensed clinicians review your results",
      "Unlimited provider follow-ups",
    ],
  },
  taurus: {
    verdict:
      "Yes - Taurus Meds is a legitimate men's-health telehealth service. TRT is prescribed only after lab-based diagnosis and a licensed clinician's review, the same medical safeguards any responsible provider follows. Confirm its current treatment lineup and pricing on its own site.",
    signals: [
      "Lab-based diagnosis before any prescription",
      "Licensed clinicians review your results",
      "Fully online men's-health service",
      "Discreet, direct-to-door delivery",
    ],
  },
  dudemeds: {
    verdict:
      "Yes - DudeMeds is a legitimate, value-minded men's telehealth service. Even at its lower price point it still runs the required lab testing and a licensed-clinician review before prescribing TRT - 'cheaper' means fewer frills, not fewer safeguards.",
    signals: [
      "Required lab testing before any prescription",
      "Licensed-clinician review",
      "Fully online and discreet",
      "Value-minded pricing without skipping oversight",
    ],
  },
  fridays: {
    verdict:
      "Yes - Fridays is a legitimate men's-health telehealth brand. TRT is offered only after lab-based diagnosis and a licensed clinician's review. Confirm its current TRT lineup, monitoring and pricing on its own site.",
    signals: [
      "Lab-based diagnosis before any prescription",
      "Licensed clinicians review your results",
      "Fully online men's-health platform",
      "Discreet, direct-to-door delivery",
    ],
  },
};

const REVIEW_EXTRA_FAQS: Record<string, { question: string; answer: string }[]> = {
  // HRT vertical (ported from hrtwomen.com, Oct 22, 2026). Figures are the
  // provider-published prices verified there on Oct 6, 2026 and match the
  // pricing plans in src/lib/seeds/hrt.ts; each answer says to confirm at checkout.
  winona: [
    {
      question: "Does Winona take insurance?",
      answer:
        "No. Winona does not bill insurance directly - treatment is a monthly self-pay subscription. Its HRT prescriptions are generally HSA/FSA eligible, and some patients submit receipts to their insurer for possible reimbursement, but that depends entirely on your plan.",
    },
    {
      question: "How much does Winona cost per month?",
      answer:
        "Listed starting prices are about $39/month for progesterone capsules, $54/month for estradiol tablets, $89/month for the estrogen body cream (with or without progesterone) or vaginal estrogen cream, and $149/month for the estrogen patch; combining products costs more. The subscription includes the physician review, unlimited messaging and follow-ups, and free shipping. Prices change, so confirm at checkout.",
    },
    {
      question: "What products does Winona prescribe?",
      answer:
        "Winona's HRT options include estradiol as a pill, patch or cream, estriol, progesterone pills, and vaginal estrogen cream for dryness and urinary symptoms. It also offers non-HRT add-ons such as an arousal cream and hair and skin products. It does not prescribe testosterone.",
    },
    {
      question: "Is Winona safe?",
      answer:
        "Winona prescribes hormone therapy only after a physician reviews your medical history, which is the key safety step. HRT itself carries real risks - including blood clots, stroke and breast-cancer considerations - and is not right for everyone, so answer the intake completely and ask your doctor about side effects such as breast tenderness, bloating, spotting or (with progesterone) drowsiness.",
    },
  ],
  gala: [
    {
      question: "Does Gala take insurance?",
      answer:
        "No. Gala charges a single flat monthly price for its HRT plan rather than billing insurance. That price includes the clinician, check-ins, dose adjustments and medication shipping. Confirm the current price on Gala's site.",
    },
    {
      question: "What hormone therapy does Gala offer?",
      answer:
        "Gala prescribes estradiol as a pill or patch, oral or vaginal progesterone, and vaginal estradiol, after a review by a US-licensed clinician. Its site carries a compounded-medication disclaimer, so ask whether your product is FDA-approved or compounded.",
    },
  ],
  midi: [
    {
      question: "Does Midi Health take insurance?",
      answer:
        "Yes. Midi is in-network with most major commercial and PPO insurance plans, so visits usually cost your normal specialist copay, coinsurance or deductible. Midi does not bill Medicare, and some services (such as testosterone) are out of pocket. Check your coverage when you register.",
    },
    {
      question: "How much does Midi Health cost without insurance?",
      answer:
        "Self-pay visits have been listed at roughly $250 for the first visit and $150 for follow-ups. Medication is billed separately through your pharmacy. Confirm current prices when you book.",
    },
    {
      question: "Is Midi Health available in Canada?",
      answer:
        "No. Midi Health serves patients in the United States; it is not a telehealth option for people living in Canada.",
    },
  ],
  // ED vertical (ported from edtreatmenthub.com, Oct 21, 2026). Specifics are
  // deliberately hedged: Quad is a compounded product whose formula, dose and
  // price are set at prescribing, so we point to MEDVi rather than assert them.
  quad: [
    {
      question: "What is in Quad by MEDVi?",
      answer:
        "Quad by MEDVi is a compounded, multi-ingredient (\"4-in-1\") ED medication - it blends several active ingredients into a single dose rather than relying on one. Because it is compounded and prescription-only, the exact actives and strengths are determined by the prescribing clinician for your intake; confirm the specific formulation with MEDVi before starting.",
    },
    {
      question: "What is the Quad by MEDVi dosage?",
      answer:
        "There is no one-size-fits-all dose. As a compounded medication, Quad's strength and how often you take it are set by the licensed clinician who reviews your health questionnaire, and can be adjusted over time. Follow the dosing on your prescription and the guidance from MEDVi's providers rather than a generic dosage chart.",
    },
    {
      question: "How much does Quad by MEDVi cost per month?",
      answer:
        "Quad is billed as a monthly telehealth plan rather than a per-pill price, and compounded multi-ingredient programs typically cost more than a plain generic pill. Promotions and plan tiers change often, so treat any figure you see as approximate and confirm the current monthly cost on MEDVi's own site before subscribing.",
    },
    {
      question: "Is Quad by MEDVi a liquid, drops or dissolvable?",
      answer:
        "Quad is delivered in a fast-dissolving format rather than a traditional pill you swallow - which is why it is sometimes searched for as \"quad drops\" or \"quad liquid.\" The dissolvable format is a convenience for men who dislike swallowing tablets; the medication inside is still a prescription compound.",
    },
    {
      question: "Does Quad by MEDVi work?",
      answer:
        "For appropriate candidates, the active ingredients in compounded ED medications like Quad work the same way proven ED medicines do - by improving blood flow - and the multi-ingredient approach is aimed at men for whom a single standard pill underperformed. Individual results vary, and whether it is right for you is a licensed clinician's decision based on your health.",
    },
    {
      question: "Is Quad by MEDVi safe?",
      answer:
        "Compounded ED medications are used routinely for appropriate candidates when prescribed and monitored by a licensed clinician - but \"safe\" depends on that screening. Quad should never be combined with nitrate medications, and certain heart conditions and other drugs matter, which is exactly what MEDVi's provider review is for. Compounded products are not FDA-approved the way brand and generic pills are, so the clinician's sign-off is the key safeguard.",
    },
    {
      question: "Is Quad by MEDVi FDA-approved?",
      answer:
        "No. Quad is a compounded medication prepared by a compounding pharmacy, so it does not go through the FDA approval process that covers brand-name and generic drugs. That is not unusual or illegal - compounding is long-established - but it is why a licensed clinician deciding whether it is appropriate for you does real safety work.",
    },
  ],
  embody: [
    {
      question: "How fast does embody ship?",
      answer:
        "embody ships free in 1-2 days in temperature-controlled, tracked and insured packaging, with same-day dispatch on orders placed before 2pm CT. The doctor review itself usually happens within 24 hours of completing the ~5-minute intake.",
    },
    {
      question: "Can you cancel embody anytime?",
      answer:
        "Yes - embody has no long-term contract and no membership fee; plans are month-to-month and you can cancel anytime. If a provider doesn't approve your prescription in the first place, embody issues a full refund.",
    },
    {
      question: "What are the side effects of embody's medications?",
      answer:
        "embody prescribes compounded semaglutide and tirzepatide, so the side effects are those of GLP-1 medications generally - most commonly digestive (nausea, constipation, diarrhea), especially during the first weeks as your dose increases, and usually easing as your body adjusts. Your prescribing provider reviews your history for contraindications, and embody's nursing team is available during treatment. See our full semaglutide side-effects guide for what to expect and when to seek care.",
    },
    {
      question: "How much does embody cost per month?",
      answer:
        "embody uses flat monthly pricing: $69/month for compounded semaglutide and $119/month for compounded tirzepatide (regularly $79 and $129). The price includes the medication, the doctor review, supplies and free 1-2 day shipping - there's no membership fee and no hidden costs. If a provider doesn't approve your prescription, embody issues a full refund.",
    },
    {
      question: "Is embody FDA-approved?",
      answer:
        "embody's medications are compounded semaglutide and tirzepatide, which are not FDA-approved brand-name drugs. They're prepared by US-based, state-licensed 503A compounding pharmacies using the same active ingredients as the FDA-approved brands (semaglutide in Ozempic and Wegovy; tirzepatide in Mounjaro and Zepbound). Compounded medications are legal and prescribed by a licensed provider, but they don't carry FDA brand-drug approval - a distinction worth understanding before starting. embody itself is LegitScript-certified.",
    },
  ],
  altrx: [
    {
      question: "How fast does altRx ship?",
      answer:
        "Shipping is free and takes about 5-7 days. That's the main trade-off against the 1-2 day providers like embody and DirectMeds - altRx compensates on price ($89/month semaglutide, $149/month tirzepatide) and its brand-name shelf.",
    },
    {
      question: "Can you pause or cancel altRx?",
      answer:
        "Yes - altRx is self-pay with no long-term contract, and you can pause or cancel anytime. Buy Now, Pay Later options are also available if you'd rather split the monthly cost.",
    },
    {
      question: "Does altRx offer brand-name medication?",
      answer:
        "Yes - alongside compounded semaglutide ($89/month) and tirzepatide ($149/month), altRx lists brand-name Ozempic at $1,149, Zepbound at $1,249 and Wegovy at $1,579 per month, making it one of the few providers in our ranking with a genuine brand-name shelf.",
    },
  ],
  trimrx: [
    {
      question: "How fast does TrimRx ship?",
      answer:
        "Delivery is free and tracked, often arriving as soon as the next day after your prescription is issued. The process starts with a free 2-minute online assessment, and the consultation itself costs nothing.",
    },
    {
      question: "Is TrimRx a subscription with a contract?",
      answer:
        "No long-term commitment - plans run month to month. The $149 semaglutide price is the same at every dose; compounded tirzepatide runs $259/month, with custom dosing and unlimited provider check-ins included.",
    },
    {
      question: "What medications does TrimRx offer?",
      answer:
        "Compounded semaglutide (GLP-1) and compounded tirzepatide (GLP-1 + GIP), both weekly injections with dosing customized by your provider. There's no brand-name or oral option - if you want those, compare altRx (brand-name shelf) or Medvi (dissolving tablets).",
    },
  ],
  shed: [
    {
      question: "What is SHED's money-back guarantee?",
      answer:
        "SHED promises that if you lose less than 5% of your body weight in 120 days on the program, you get your money back - the most concrete guarantee among the providers we rank. Check SHED's site for the current terms and conditions.",
    },
    {
      question: "Does SHED include coaching?",
      answer:
        "Yes - health coaching is included in every plan rather than sold as an add-on, alongside the provider visit and home delivery. Reviewers on Trustpilot (4.6 across 1,134 reviews) most often single out the coaching and onboarding staff by name.",
    },
    {
      question: "Can I pay for SHED with HSA/FSA funds?",
      answer:
        "Yes - SHED plans are HSA/FSA approved. Compounded semaglutide starts at $199/month and tirzepatide at $299/month, with 20% off your first month.",
    },
  ],
  wellmedr: [
    {
      question: "How fast does welludr ship?",
      answer:
        "Standard delivery takes about 3-5 business days, with refills shipped every 4 weeks. That's slower than the 1-2 day providers like embody and DirectMeds - the trade-off for the lowest compounded prices in our ranking.",
    },
    {
      question: "Does welludr's price go up as your dose increases?",
      answer:
        "No - welludr charges the same price regardless of dosage: compounded semaglutide from $49/month and tirzepatide from $89/month. The lowest $49 rate is tied to a 12-month plan.",
    },
    {
      question: "Can you cancel welludr anytime?",
      answer:
        "Yes - you can cancel or change your plan anytime. Keep in mind the headline $49/month rate is locked in via a 12-month plan, and the program is backed by welludr's weight-loss warranty.",
    },
  ],
  medvi: [
    {
      question: "What does Medvi's monthly price actually include?",
      answer:
        "Everything: the provider visits, the GLP-1 medication, free shipping, and free dietician and care coaching. There's no membership fee and no hidden charges, and plans are HSA/FSA approved.",
    },
    {
      question: "Does Medvi have a needle-free option?",
      answer:
        "Yes - Medvi offers a daily oral dissolving GLP-1 tablet at $249/month, one of the few needle-free GLP-1 formats among the providers we rank. Weekly semaglutide injections currently start at $99/month (regularly $199).",
    },
    {
      question: "Do I need insurance for Medvi?",
      answer:
        "No - Medvi is a cash-pay program with one flat all-inclusive price, no insurance and no prior authorization required. Plans are HSA/FSA approved if you want to pay with pre-tax health funds.",
    },
  ],
  directmeds: [
    {
      question: "How fast does DirectMeds ship?",
      answer:
        "Shipping is free and arrives in 1-2 days once your prescription is issued - among the fastest delivery in our ranking, on par with embody.",
    },
    {
      question: "What are DirectMeds' sublingual drops?",
      answer:
        "A needle-free format: compounded semaglutide or tirzepatide taken as daily liquid drops under the tongue instead of a weekly injection - at the same $147/month flat price as the injectable version.",
    },
    {
      question: "Is DirectMeds a membership?",
      answer:
        "No - there's no monthly membership and no hidden fees. You pay $147/month flat (the same at every dose), the telemedicine visit and prescription are included, and you can cancel anytime.",
    },
  ],
  sprout: [
    {
      question: "How fast does Sprout ship?",
      answer:
        "Sprout ships prescriptions within 2 days of approval - among the faster fulfillment windows in our ranking. The process starts with an online intake reviewed by a licensed provider.",
    },
    {
      question: "Does Sprout offer brand-name medication?",
      answer:
        "Yes - alongside compounded semaglutide (from $149/month) and compounded tirzepatide (from $199/month), Sprout lists brand-name Wegovy from $1,799/month, making it one of the few mid-tier providers with a branded option on the shelf.",
    },
    {
      question: "How much does Sprout cost per month?",
      answer:
        "Compounded semaglutide starts at $149/month and compounded tirzepatide at $199/month, with a standing $200 discount on the first month. Brand-name Wegovy starts at $1,799/month. Confirm current plan terms and the first-month offer on Sprout's site.",
    },
  ],
  healthrx: [
    {
      question: "Do I have to pay for HealthRx's full year upfront?",
      answer:
        "The headline $99/month semaglutide price is a 12-month prepaid plan - $1,188 due at checkout - with tirzepatide plans from $179/month. The initial 60-second assessment is free with no payment to start, and approval is never automatic.",
    },
    {
      question: "How fast does HealthRx ship?",
      answer:
        "Overnight - every plan includes free overnight cold-chain shipping in temperature-controlled, lot-tracked packaging from a licensed 503A pharmacy.",
    },
    {
      question: "Does HealthRx raise the price when your dose increases?",
      answer:
        "No - the all-in price covers dose adjustments, so your monthly cost doesn't change as your protocol is titrated up. The price also includes the clinician consult, shipping, and ongoing care-team check-ins.",
    },
  ],
};

// Operator-verified standing promos, shown as a prominent banner under the hero
// on the provider's review page. Segments flagged bold render emphasized.
const REVIEW_PROMOS: Record<string, { segments: { text: string; bold?: boolean }[] }> = {
  wellmedr: {
    segments: [
      { text: "Lock in " },
      { text: "$200 off", bold: true },
      { text: " every month, or " },
      { text: "$49/mo", bold: true },
      { text: " on 12-month plans — for life." },
    ],
  },
};

// Per-provider trust strip, shown as a light band under the hero on the
// provider's review page. Operator-supplied brand claims - keyed by provider.
const REVIEW_TRUST_STRIP: Record<string, { icon: LucideIcon; label: string }[]> = {
  altrx: [
    { icon: ShieldCheck, label: "State-Licensed 503A Pharmacies" },
    { icon: UserRound, label: "Personalized Treatment" },
    { icon: Users, label: "Trusted by 125k+ Americans" },
    { icon: Stethoscope, label: "1:1 Medical Support" },
  ],
};


// Providers that changed their brand name. The old name is shown under the H1
// and declared as the Organization's alternateName, so returning readers and
// searches for the old name still land on the right page.
const FORMER_NAMES: Record<string, string> = {
  wellmedr: "wellmedr", // welludr since Oct 2026; id and slug unchanged
};

function fillPrices(text: string, prices: string): string {
  if (!text.includes("{prices}")) return text;
  if (prices) return text.replace("{prices}", prices);
  return text.replace(/\{prices\}(,? ?| ?\([^)]*\) ?)/, "").replace(/:\s+,/, ":").replace(/\s{2,}/g, " ");
}

export async function reviewMetadata(slug: string, ctx: SiteContext): Promise<Metadata> {
  const config = await getConfig(ctx.vertical);
  const review = (config.reviews ?? []).find((r) => r.slug === slug);
  if (!review) return { title: "Review Not Found" };

  const provider = config.providers.find((p) => p.id === review.providerId);
  if (!provider) return { title: "Review Not Found" };

  // Overrides are written against weight-loss offers (GLP-1 pricing etc.), so
  // a shared provider id on another vertical (directmeds on HRT) falls back to
  // the generic template instead of inheriting weight-loss claims.
  // Oct 21, 2026: ED overrides (quad) joined the map; quad exists only on /ed.
  // The weight-loss maps share slugs with ED (shed, directmeds), so ED may
  // only read its own keys.
  const ED_OVERRIDE_SLUGS = new Set(["quad"]);
  // Oct 22, 2026: HRT's three providers (winona, gala, midi) exist only on /hrt.
  const HRT_OVERRIDE_SLUGS = new Set(["winona", "gala", "midi"]);
  const override =
    ctx.vertical === "weight-loss" ||
    (ctx.vertical === "ed" && ED_OVERRIDE_SLUGS.has(slug)) ||
    (ctx.vertical === "hrt" && HRT_OVERRIDE_SLUGS.has(slug))
      ? REVIEW_SEO_OVERRIDES[slug]
      : undefined;
  // Providers reviewed in more than one vertical (Ro, Maximus, PeterMD, Hims)
  // would otherwise emit identical <title>s on two URLs - a duplicate-title
  // signal. Their titles carry the vertical name to differentiate.
  // Oct 21, 2026: dudemeds (TRT + ED), shed and directmeds (weight-loss + ED) joined.
  const SHARED_REVIEW_PROVIDER_IDS = ["ro", "maximus", "petermd", "hims", "dudemeds", "shed", "directmeds"];
  // The ED vertical's full name ("Erectile Dysfunction (ED) Treatment") would
  // push every shared-provider title past 60 characters; the review titles
  // keep the short form and the pages carry the full term in the body.
  const verticalLabel = ctx.vertical === "ed" ? "ED Treatment" : (VERTICALS.find((v) => v.id === ctx.vertical)?.name ?? "");
  const verticalQualifier = SHARED_REVIEW_PROVIDER_IDS.includes(provider.id) ? ` ${verticalLabel}`.trimEnd() + " " : " ";
  // Oct 25, 2026: keep every generated title within 60 characters (Ahrefs
  // "title too long"); long names with a vertical qualifier step down to a
  // shorter tail rather than overflowing.
  const reviewTitleCandidates = [
    `${provider.name}${verticalQualifier}Review 2026: Cost, Results & Is It Worth It?`,
    `${provider.name}${verticalQualifier}Review 2026: Cost & Is It Worth It?`,
    `${provider.name}${verticalQualifier}Review 2026: Cost & Verdict`,
  ];
  const pageTitle =
    override?.title ?? (reviewTitleCandidates.find((t) => t.length <= 60) ?? reviewTitleCandidates[reviewTitleCandidates.length - 1]);
  const prices = ctx.vertical === "weight-loss" ? catalogPriceSnippet(provider.id) : "";
  const pageDescription = fillPrices(override?.description ?? review.shortSummary, prices);

  // Operator policy (Aug 2026): provider reviews are indexable by default - the
  // goal is impressions across every vertical first. Exception (Sep 2026): thin
  // filler/unmonetized-brand reviews on weight-loss are noindex,follow so crawl
  // budget on the young hub concentrates on the money pages (see
  // NOINDEX_WL_REVIEW_SLUGS); "follow" keeps link equity flowing.
  const url = canonicalUrl(ctx, `/reviews/${slug}`);
  const isThinNoindex = ctx.vertical === "weight-loss" && NOINDEX_WL_REVIEW_SLUGS.has(slug);

  return {
    title: pageTitle,
    description: pageDescription,
    robots: ctx.noindex
      ? { index: false, follow: false }
      : isThinNoindex
        ? { index: false, follow: true }
        : DEFAULT_ROBOTS,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      type: "article",
      modifiedTime: latestUpdate(review.updatedAt),
    },
  };
}

export async function ReviewPageView({ slug, ctx }: { slug: string; ctx: SiteContext }) {
  const config = await getConfig(ctx.vertical);
  const review = (config.reviews ?? []).find((r) => r.slug === slug);
  if (!review) return notFound();

  const provider = config.providers.find((p) => p.id === review.providerId);
  if (!provider) return notFound();

  const legit = ctx.vertical === "trt" ? REVIEW_LEGIT_TRT[slug] : REVIEW_LEGIT[slug];

  // Site's own editorial rating for this provider (same scoring shown on the
  // homepage), keyed off its ranking position. Surfaced visibly on the page.
  // NOTE: intentionally NOT emitted as review/aggregateRating structured data -
  // re-publishing Trustpilot's aggregate and self-assigned editorial scores as
  // Product rating markup to earn SERP stars is a review-snippet policy risk
  // (and earned ~0 clicks per Search Appearance). The ratings remain visible as
  // page content; only the star-generating schema is removed.
  const rankIndex = config.ranking.providerOrder.indexOf(provider.id);
  const editorial =
    rankIndex >= 0
      ? config.ranking.positions[rankIndex] ??
        config.ranking.positions[config.ranking.positions.length - 1]
      : null;
  const editorialStars = editorial ? editorial.score / 2 : 0;
  const editorialFullStars = Math.floor(editorialStars);
  const editorialHasHalf = editorialStars % 1 >= 0.5;

  // Promo popup for this provider, if it has a registered creative.
  const promoPopup = resolvePromoPopup([provider]);

  // Operator-verified promo banner, surfaced prominently under the hero on the
  // provider's own review page. Bold segments render emphasized. Keyed by
  // provider id so only providers with a confirmed standing offer show one.
  const reviewPromo = REVIEW_PROMOS[provider.id];
  const trustStrip = REVIEW_TRUST_STRIP[provider.id];
  const showcase = HOW_IT_WORKS_SHOWCASE[provider.id];

  // Note: we intentionally do NOT emit an AggregateOffer/price in the schema.
  // A structured price can surface in the SERP rich result and goes stale the
  // moment a provider changes pricing, so on-page pricing tables stay the single
  // source of truth and the search snippet carries no price.

  // Review/AggregateRating Product schema deliberately removed - see the note
  // on the editorial rating above. The visible on-page Trustpilot score and
  // editorial rating stay; we just don't request star rich snippets.

  // Article schema (no rating, no price) - the same shape the article and
  // battle templates emit. It gives the page a machine-readable headline,
  // author, publisher and - most importantly for freshness signals - a
  // dateModified that tracks the review's own updatedAt. `about` names the
  // reviewed provider so the entity relationship is explicit for LLM/AI
  // answer engines without requesting review stars.
  const reviewUpdatedAt = latestUpdate(review.updatedAt);
  const author = config.experts?.[0];
  const reviewArticleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${provider.name} Review 2026: Cost, Results & Is It Worth It?`,
    description: review.shortSummary,
    dateModified: reviewUpdatedAt,
    ...pageReviewSchema(`/${ctx.vertical}/reviews/${slug}`),
    // The research team is a group, so it is an Organization, not a Person.
    author: {
      "@type": "Organization",
      name: author ? author.name.replace(/TopWeightLoss/gi, ctx.brandTeam.replace(/\s+Team$/i, "")) : ctx.brandTeam,
      url: canonicalUrl(ctx, "/about"),
    },
    publisher: {
      "@type": "Organization",
      name: ctx.brandName,
      url: ctx.origin,
      logo: { "@type": "ImageObject", url: `${ctx.origin}/treatmentshub.png` },
    },
    // The provider as an entity. sameAs points at its verified Trustpilot
    // profile so machines can connect the page to the public review record
    // without us republishing the rating as markup (see the note above).
    about: {
      "@type": "Organization",
      name: provider.name,
      ...(FORMER_NAMES[provider.id] && { alternateName: FORMER_NAMES[provider.id] }),
      ...(getReviewRecord(ctx.vertical, provider.id)?.profileUrl && {
        sameAs: [getReviewRecord(ctx.vertical, provider.id)!.profileUrl],
      }),
    },
    // Page entity: a MedicalWebPage with audience, condition and (where logged)
    // reviewer - see src/lib/medical-schema.ts.
    mainEntityOfPage: medicalWebPageFields(ctx.vertical, canonicalUrl(ctx, `/reviews/${slug}`), `/${ctx.vertical}/reviews/${slug}`),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl(ctx, "/") },
      { "@type": "ListItem", position: 2, name: "Reviews", item: canonicalUrl(ctx, "/reviews") },
      { "@type": "ListItem", position: 3, name: `${provider.name} Review`, item: canonicalUrl(ctx, `/reviews/${slug}`) },
    ],
  };

  // FAQ - real, query-shaped questions answered entirely from this review's
  // own researched content (pricing, treatments, best-for, verdict). Powers
  // both the visible FAQ section and the FAQPage schema (rich results / PAA).
  const reviewFaqs = [
    { question: `Is ${provider.name} legit?`, answer: legit?.verdict ?? review.reviewIntro },
    { question: `How much does ${provider.name} cost?`, answer: review.pricingSummary },
    review.treatmentOptions?.length
      ? { question: `What treatments does ${provider.name} offer?`, answer: `${provider.name} offers ${review.treatmentOptions.join(", ")}.` }
      : null,
    review.bestFor?.length
      ? { question: `Who is ${provider.name} best for?`, answer: `${provider.name} is best for ${review.bestFor.join("; ")}.` }
      : null,
    { question: `Is ${provider.name} worth it?`, answer: review.finalVerdict },
    // Extra FAQs are all researched against weight-loss offers, so they only
    // apply there - a provider id shared across verticals (e.g. directmeds on
    // HRT) must not inherit another vertical's prices and shipping claims.
    ...(ctx.vertical === "weight-loss" ||
    (ctx.vertical === "ed" && slug === "quad") ||
    (ctx.vertical === "hrt" && ["winona", "gala", "midi"].includes(slug))
      ? REVIEW_EXTRA_FAQS[slug] ?? []
      : []),
  ].filter((f): f is { question: string; answer: string } => !!f && !!f.answer);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: reviewFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  // Related comparisons: one per opponent, canonical slugs only, opponents
  // that are still in the ranking, indexable pages only, capped. The raw
  // battle list carries aliased duplicates (altrx-vs-embody and
  // embody-vs-altrx) and retired matchups (Noom), which produced a Related
  // list with repeated and dead entries (operator screenshot, Oct 2026).
  const ranked = new Set(config.ranking.providerOrder);
  const seenOpponent = new Set<string>();
  // Curated three-way comparisons featuring this provider (weight loss only):
  // the trio pages otherwise reach readers only through the two-way battles.
  const relatedTrios =
    ctx.vertical === "weight-loss"
      ? THREE_WAY_COMPARISONS.filter((t) => t.providerIds.includes(provider.id)).map((t) => ({ slug: t.slug, title: t.title }))
      : [];
  const relatedBattles = (config.battles ?? [])
    .filter((b) => b.provider1Id === provider.id || b.provider2Id === provider.id)
    .filter((b) => !(b.slug in SLUG_ALIASES))
    .filter((b) => !(ctx.vertical === "weight-loss" && NOINDEX_WL_BATTLE_SLUGS.has(b.slug)))
    .filter((b) => {
      const other = b.provider1Id === provider.id ? b.provider2Id : b.provider1Id;
      if (!ranked.has(other) || seenOpponent.has(other)) return false;
      seenOpponent.add(other);
      return true;
    })
    .slice(0, 6);

  // This provider's own question cluster (is-X-legit / X-cost / X-alternatives)
  // - the highest-intent internal links a review can carry. Rendered only for
  // cluster articles that actually exist in the config.
  const clusterSlugs = [
    { slug: `is-${provider.id}-legit`, label: `Is ${provider.name} legit?` },
    { slug: `${provider.id}-cost`, label: `How much does ${provider.name} cost?` },
    { slug: `${provider.id}-alternatives`, label: `Best ${provider.name} alternatives` },
  ].filter((c) => (config.articles ?? []).some((a) => a.slug === c.slug));

  // Related articles: actually related, not just the first three in the array.
  // Prefer articles that mention this provider (excluding its own cluster,
  // which has a dedicated box below), then fill with the newest guides.
  const clusterSet = new Set(clusterSlugs.map((c) => c.slug));
  const mentions = (a: { slug: string; title: string }) =>
    a.slug.includes(provider.id) || a.title.toLowerCase().includes(provider.name.toLowerCase());
  const nonCluster = (config.articles ?? []).filter((a) => !clusterSet.has(a.slug));
  const relatedArticles = [
    ...nonCluster.filter(mentions),
    ...nonCluster
      .filter((a) => !mentions(a))
      .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")),
  ].slice(0, 3);

  // The evidence-led seven-provider comparison (Oct 12, 2026) covers these
  // weight-loss partners; link it from each of their reviews.
  const COMPARED_PROVIDER_IDS = new Set(["wellmedr", "embody", "eden", "directmeds", "medvi", "trimrx", "altrx", "ro"]);
  const showComparisonLink = ctx.vertical === "weight-loss" && COMPARED_PROVIDER_IDS.has(provider.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero header */}
      <div className="border-b border-gray-200 bg-white">
        {/* Phone-tight masthead (Oct 2026): less padding above the breadcrumbs
            and between the rows; desktop spacing unchanged. */}
        <div className="mx-auto max-w-[1000px] px-4 pb-5 pt-4 sm:px-6 sm:pb-8 sm:pt-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: hubLink(ctx, "/") },
              { label: "Reviews", href: hubLink(ctx, "/reviews") },
              { label: `${provider.name} Review` },
            ]}
          />

          <div className="mt-2 flex flex-col gap-4 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <div className="flex items-center gap-3.5 sm:gap-5">
              <div className="flex h-[44px] w-[96px] shrink-0 items-center sm:h-[50px] sm:w-[130px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={provider.logo} alt={`${provider.name} logo`} width={130} height={50} className="max-h-full max-w-full object-contain object-left" />
              </div>
              <div className="min-w-0">
                <h1 className="text-[22px] font-bold text-[#191919] sm:text-[28px]">
                  {provider.name} Reviews
                </h1>
                {FORMER_NAMES[provider.id] && (
                  <p className="mt-0.5 text-[13px] text-gray-500">Formerly {FORMER_NAMES[provider.id]}</p>
                )}
                <p className="mt-0.5 text-[14px] text-gray-700">
                  {provider.tagline}
                </p>
                <LastUpdated date={reviewUpdatedAt} className="mt-1" />
                {editorial && (
                  <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < editorialFullStars
                              ? "fill-[#FDB515] text-[#FDB515]"
                              : i === editorialFullStars && editorialHasHalf
                                ? "fill-[#FDB515]/50 text-[#FDB515]"
                                : "fill-gray-300 text-gray-300"
                          )}
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                    <span className="text-[14px] font-bold text-[#191919]">
                      {editorial.score}/10
                    </span>
                    <span className="text-[13px] text-gray-500">
                      {editorial.label} - our rating
                    </span>
                  </div>
                )}
                {/* Desktop: byline inside the title column. Mobile renders it
                    full-width below the header row instead (see sm:hidden). */}
                <div className="hidden sm:block">
                  <MedicalReviewBar path={`/${ctx.vertical}/reviews/${slug}`} className="mt-3 max-w-[760px]" compact />
                </div>
              </div>
            </div>
            <div className="sm:hidden">
              <MedicalReviewBar path={`/${ctx.vertical}/reviews/${slug}`} />
            </div>
            <ProviderCta
              href={provider.affiliateUrl}
              providerName={provider.name}
              providerSlug={provider.id}
              pageType="review"
              sourceFlow="provider_review"
              className="flex h-[44px] items-center justify-center gap-2 rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61] sm:shrink-0"
            >
              Visit {provider.name}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </ProviderCta>
          </div>
          <TrustDisclosure disclaimerHref={"/weight-loss/disclaimer"} />
        </div>
      </div>

      {/* Operator-verified promo banner - emphasized directly under the hero */}
      {reviewPromo && (
        <div className="border-b border-[#EADFC6] bg-[#FBF6EC]">
          <div className="mx-auto max-w-[1000px] px-4 py-4 sm:px-6 sm:py-5">
            <p className="text-center text-[17px] font-semibold leading-snug text-[#1F3345] sm:text-[21px]">
              {reviewPromo.segments.map((s, i) =>
                s.bold ? (
                  <strong key={i} className="font-extrabold text-[#0C4B75]">{s.text}</strong>
                ) : (
                  <span key={i}>{s.text}</span>
                )
              )}
            </p>
          </div>
        </div>
      )}

      {/* Per-provider trust strip - operator-supplied brand claims as free-
          floating icon + label items under the hero (no box, no background) */}
      {trustStrip && (
        <div className="mx-auto max-w-[1000px] px-4 pt-6 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 sm:flex-nowrap sm:justify-between sm:gap-x-4">
            {trustStrip.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 whitespace-nowrap">
                <Icon className="h-[18px] w-[18px] shrink-0 text-[#0C4B75]" strokeWidth={2} />
                <span className="text-[13px] font-semibold text-[#12355B] sm:text-[13px]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[1000px] px-4 py-8 sm:px-6">
        {/* The Bottom Line - the verdict up top, so the answer to "is it worth
            it" doesn't hide at the bottom of the page. */}
        {review.finalVerdict && (
          <div className="mb-8 rounded-2xl border border-[#0C4B75]/20 bg-white p-5 shadow-sm sm:p-6">
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.07em] text-[#0C4B75]">The bottom line</p>
            <ReadableProse text={review.finalVerdict} paragraphClassName="text-[15px] leading-[1.8] text-gray-800" />
          </div>
        )}

        {/* This provider's products, shopping-style. Weight-loss draws on the
            GLP-1 catalog; HRT on its own shelf (Winona and Gala products -
            renders nothing for Midi, which prescribes to your pharmacy). */}
        {(ctx.vertical === "weight-loss" || ctx.vertical === "hrt") && (
          <div className="mb-8">
            <ProductCarousel
              providers={config.providers}
              vertical={ctx.vertical}
              title={`${provider.name} products & prices`}
              subtitle={
                ctx.vertical === "hrt"
                  ? `${provider.name}'s HRT products with published prices and what each price includes.`
                  : "Published prices with their conditions - the whole card links to the provider."
              }
              onlyProviderIds={[provider.id]}
              pageType="review"
              pageUrl={canonicalUrl(ctx, `/reviews/${slug}`)}
            />
          </div>
        )}

        {/* Intro */}
        <div className="mb-8">
          <ReadableProse text={review.reviewIntro} paragraphClassName="text-[16px] leading-[1.8] text-gray-600" />
        </div>

        {/* Is [brand] legit? - trust block for the "is X legit" query cluster */}
        {legit && (
          <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-gray-100 bg-emerald-50/50 px-6 py-4">
              <Shield className="h-5 w-5 text-emerald-600" strokeWidth={2} />
              <h2 className="text-[18px] font-bold text-[#191919]">
                Is {provider.name} legit?
              </h2>
            </div>
            <div className="p-6">
              <p className="mb-4 text-[15px] leading-[1.75] text-gray-600">
                {legit.verdict}
              </p>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {legit.signals.map((signal) => (
                  <li key={signal} className="flex items-start gap-2.5 text-[14px] text-gray-800">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2} />
                    {signal}
                  </li>
                ))}
                {provider.trustpilotRating && provider.trustpilotReviewCount && (
                  <li className="flex items-start gap-2.5 text-[14px] text-gray-800">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2} />
                    Rated {provider.trustpilotRating}/5 across {provider.trustpilotReviewCount} Trustpilot reviews
                  </li>
                )}
              </ul>
              <p className="mt-4 text-[12px] leading-relaxed text-gray-400">
                &ldquo;Legitimate&rdquo; here means a real, licensed telehealth operation - not a
                guarantee of results. Compounded medications are not FDA-approved brand drugs. Always
                confirm current details and eligibility with the provider.
              </p>
            </div>
          </div>
        )}

        {/* Review insights - the summary and the top three praise and complaint
            themes from the stored reviews, high on the page; the full themes
            block with excerpts sits further down (weight-loss registry). */}
        {ctx.vertical === "weight-loss" && getReviewRecord(ctx.vertical, provider.id) && (
          <ReviewInsights
            providerName={provider.name}
            record={getReviewRecord(ctx.vertical, provider.id)!}
            analysisHref={hasReviewAnalysis(provider.id) ? analysisPath(provider.id) : undefined}
            className="mb-8"
          />
        )}

        {/* Trustpilot Reviews - social proof right after the legitimacy block,
            before the feature/pricing detail (moved up, operator request Sept 20). */}
        {/* In-depth editorial deep-dive (long-form review sections, rendered when present) */}
        {review.sections && review.sections.length > 0 && (
          <article className="mb-8 space-y-8 border-t border-gray-200 pt-8">
            {review.sections.map((section, i) => (
              <section key={i}>
                <h2 className="mb-3 text-[20px] font-bold text-[#191919]">{section.heading}</h2>
                <div
                  className="article-body text-[16px] leading-[1.75] text-gray-800 [&_a]:text-[#0C4B75] [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#093d61]"
                  dangerouslySetInnerHTML={{ __html: enhanceArticleHtml(section.body) }}
                />
              </section>
            ))}
          </article>
        )}

        {/* Featured reviews - four or five stored reviews chosen as representative
            of the praise themes, each tagged by topic (weight-loss registry). */}
        {ctx.vertical === "weight-loss" && getReviewRecord(ctx.vertical, provider.id) && (
          <FeaturedReviews
            providerName={provider.name}
            record={getReviewRecord(ctx.vertical, provider.id)!}
            className="mb-8"
          />
        )}

        {/* What customers say - praise and complaint themes computed from the
            stored reviews (weight-loss registry; renders nothing without a
            record or themes). */}
        {ctx.vertical === "weight-loss" && getReviewRecord(ctx.vertical, provider.id) && (
          <CustomerThemes
            providerName={provider.name}
            record={getReviewRecord(ctx.vertical, provider.id)!}
            className="mb-8"
          />
        )}

        {(provider.trustpilotReviews?.length ?? 0) > 0 && (
          <div className="mb-6 space-y-3">
            <TrustpilotSummary
              providerName={provider.name}
              reviews={provider.trustpilotReviews!}
              rating={provider.trustpilotRating}
              reviewCount={provider.trustpilotReviewCount}
              record={getReviewRecord(ctx.vertical, provider.id)}
            />
            <TrustpilotCarousel
              providerName={provider.name}
              providerLogo={provider.logo}
              reviews={provider.trustpilotReviews!}
              rating={provider.trustpilotRating}
              reviewCount={provider.trustpilotReviewCount}
              profileUrl={getReviewRecord(ctx.vertical, provider.id)?.profileUrl}
            />
          </div>
        )}

        {/* Key Features + Pricing side by side on desktop */}
        <div className="mb-6 grid gap-6 sm:grid-cols-2">
          <Section title="Key Features">
            <ul className="space-y-2.5">
              {review.keyFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-[14px] text-gray-800">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2} />
                  {feature}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Treatment Options">
            <ul className="space-y-2.5">
              {review.treatmentOptions.map((option) => (
                <li key={option} className="flex items-start gap-2.5 text-[14px] text-gray-800">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0C4B75]" />
                  {option}
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* Pricing */}
        <Section title="Pricing">
          {review.pricingPlans && review.pricingPlans.length > 0 && (
            <div className="mb-5 grid gap-4 sm:grid-cols-2">
              {review.pricingPlans.map((plan) => (
                <div key={plan.name} className="rounded-xl border border-gray-200 bg-gray-50/60 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-[15px] font-bold text-[#191919]">{plan.name}</h4>
                    {plan.cadence && (
                      <span className="rounded-full bg-[#0C4B75]/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#0C4B75]">
                        {plan.cadence}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[13px] text-gray-500">{plan.medication}</p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-[28px] font-extrabold leading-none text-[#191919]">{plan.price}</span>
                    {plan.unit && <span className="text-[14px] font-semibold text-gray-500">{plan.unit}</span>}
                    {plan.regularPrice && (
                      <span className="text-[15px] font-medium text-gray-400 line-through">{plan.regularPrice}</span>
                    )}
                  </div>
                  {plan.regularPrice && (
                    <span className="mt-2 inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                      {plan.saleEnds ? `Sale ends ${plan.saleEnds}` : "Sale price"}
                    </span>
                  )}
                  {plan.highlights && plan.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1.5">
                      {plan.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-[13px] text-gray-600">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
          <ReadableProse text={review.pricingSummary} paragraphClassName="text-[15px] leading-[1.75] text-gray-600" />
        </Section>

        {/* The Treatments Hub audit - verified-facts card. Registry-gated:
            providers whose data isn't fully verified render nothing. */}
        <ProviderAudit providerId={provider.id} providerName={provider.name} vertical={ctx.vertical} />

        {/* How it works - visual showcase from the provider's own creative
            when one is registered (altRx today); the plain numbered list
            otherwise. Never both. */}
        {showcase && (
          <HowItWorksShowcase
            spec={showcase}
            providerName={provider.name}
            providerId={provider.id}
            affiliateUrl={provider.affiliateUrl}
          />
        )}
        {!showcase && review.howItWorks && review.howItWorks.length > 0 && (
          <Section title={`How ${provider.name} Works`}>
            <ol className="space-y-4">
              {review.howItWorks.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0C4B75] text-[13px] font-bold text-white">
                    {i + 1}
                  </div>
                  <div>
                    {step.timing && (
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-[#0C4B75]">
                        {step.timing}
                      </span>
                    )}
                    <p className="text-[15px] font-bold text-[#191919]">{step.title}</p>
                    {step.detail && (
                      <p className="mt-0.5 text-[14px] leading-[1.65] text-gray-600">{step.detail}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {/* Pros & Cons */}
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="grid sm:grid-cols-2">
            <div className="p-6 sm:border-r sm:border-gray-100">
              <h3 className="mb-4 flex items-center gap-2 text-[15px] font-bold text-emerald-700">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.5} />
                </div>
                Pros
              </h3>
              <ul className="space-y-2.5">
                {review.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2.5 text-[14px] text-gray-800">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={2} />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-gray-100 p-6 sm:border-t-0">
              <h3 className="mb-4 flex items-center gap-2 text-[15px] font-bold text-red-600">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                  <X className="h-3.5 w-3.5 text-red-500" strokeWidth={2.5} />
                </div>
                Cons
              </h3>
              <ul className="space-y-2.5">
                {review.cons.map((con) => (
                  <li key={con} className="flex items-start gap-2.5 text-[14px] text-gray-800">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" strokeWidth={2} />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mid-page CTA */}
        <div className="mb-6 rounded-xl border border-[#0C4B75]/10 bg-[#0C4B75]/[0.03] p-5 text-center sm:p-6">
          <p className="mb-3 text-[16px] font-bold text-[#191919]">
            Interested in {provider.name}?
          </p>
          <p className="mb-4 text-[13px] text-gray-500">
            Visit their site to check eligibility and current pricing.
          </p>
          <ProviderCta
            href={provider.affiliateUrl}
            providerName={provider.name}
            providerSlug={provider.id}
            pageType="review"
            sourceFlow="provider_review"
            className="inline-flex h-[44px] items-center justify-center gap-2 rounded-lg bg-[#0C4B75] px-8 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
          >
            Visit {provider.name}
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </ProviderCta>
        </div>

        {/* Best For */}
        <Section title="Who It's Best For">
          <ul className="space-y-2.5">
            {review.bestFor.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14px] text-gray-800">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#0C4B75]" strokeWidth={2} />
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* Community feedback - real Reddit threads, rendered Reddit-style.
            Each registry entry names the vertical its threads were captured
            for (legacy entries without one are weight-loss research), so the
            block renders only on the matching vertical. */}
        {REVIEW_COMMUNITY_FEEDBACK[slug] &&
          (REVIEW_COMMUNITY_FEEDBACK[slug].vertical ?? "weight-loss") === ctx.vertical && (
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
            <div className="mb-2 flex items-center gap-2.5">
              <RedditMark className="h-7 w-7 shrink-0" />
              <h2 className="text-[20px] font-bold text-[#191919]">
                What Reddit says about {provider.name}
              </h2>
            </div>
            <p className="mb-5 text-[14.5px] leading-relaxed text-gray-700">
              {REVIEW_COMMUNITY_FEEDBACK[slug].intro}
            </p>

            <div className="space-y-4">
              {REVIEW_COMMUNITY_FEEDBACK[slug].threads.map((t, i) => (
                <div key={i} className="rounded-xl border border-gray-200 bg-[#FCFCFC] p-4 sm:p-5">
                  {/* Post header - the Reddit identity line */}
                  <div className="mb-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[12px]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D93A00] text-[10px] font-bold text-white">
                      r/
                    </span>
                    {t.subreddit ? (
                      <>
                        <span className="font-bold text-[#191919]">{t.subreddit}</span>
                        <span className="text-gray-400">·</span>
                        <span className="text-gray-500">u/{t.author}</span>
                      </>
                    ) : (
                      <span className="font-bold text-[#191919]">u/{t.author}</span>
                    )}
                    {t.age && (
                      <>
                        <span className="text-gray-400">·</span>
                        <span className="text-gray-400">{t.age}</span>
                      </>
                    )}
                    {t.url && (
                      <a
                        href={t.url}
                        target="_blank"
                        rel="nofollow noopener"
                        className="ml-auto font-semibold text-[#0C4B75] hover:underline"
                      >
                        View on Reddit
                      </a>
                    )}
                  </div>

                  {t.title && (
                    <p className="mb-2 text-[15.5px] font-bold leading-snug text-[#191919]">{t.title}</p>
                  )}

                  <div className="space-y-2">
                    {t.body.map((para, j) => (
                      <p key={j} className="text-[13.5px] leading-[1.7] text-gray-600">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Vote / comment pills - only real counts, never estimates */}
                  {(t.upvotes !== undefined || t.commentCount !== undefined) && (
                    <div className="mt-3 flex items-center gap-2">
                      {t.upvotes !== undefined && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-[12px] font-bold text-gray-600">
                          <ArrowBigUp className="h-4 w-4 text-[#FF4500]" strokeWidth={2} />
                          {t.upvotes}
                          <ArrowBigDown className="h-4 w-4 text-gray-400" strokeWidth={2} />
                        </span>
                      )}
                      {t.commentCount !== undefined && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-[12px] font-semibold text-gray-600">
                          <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
                          {t.commentCount} comments
                        </span>
                      )}
                    </div>
                  )}

                  {/* Replies - threaded with the Reddit comment line */}
                  {t.replies && t.replies.length > 0 && (
                    <div className="mt-3 space-y-3 border-l-2 border-gray-200 pl-4">
                      {t.replies.map((r, j) => (
                        <div key={j}>
                          <div className="mb-1 flex items-center gap-1.5 text-[12px]">
                            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-gray-300 text-[9px] font-bold uppercase text-white">
                              {r.author.charAt(0)}
                            </span>
                            <span className="font-bold text-gray-800">u/{r.author}</span>
                          </div>
                          <p className="text-[13px] leading-[1.65] text-gray-600">{r.body}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-5 border-t border-gray-100 pt-4 text-[14px] leading-relaxed text-gray-700">
              <span className="font-semibold text-[#191919]">The takeaway: </span>
              {REVIEW_COMMUNITY_FEEDBACK[slug].takeaway}
            </p>
            <p className="mt-2 text-[11.5px] leading-relaxed text-gray-400">
              Excerpts from public Reddit posts, lightly trimmed; vote and comment counts shown as
              captured at the time of review. Reddit is a trademark of Reddit, Inc. and is not
              affiliated with this site.
             Posts are individual experiences, and any weight-loss result mentioned is one person&rsquo;s and is not typical - results vary.</p>
          </div>
        )}

        {/* Independent YouTube review - registry-gated, one real video per
            provider, embedded click-to-load so the iframe never weighs on
            initial load. */}
        <YoutubeReviewSection providerId={provider.id} providerName={provider.name} vertical={ctx.vertical} />

        {/* Final Verdict */}
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-4">
            <h3 className="text-[18px] font-bold text-[#191919]">Final Verdict</h3>
          </div>
          <div className="p-6">
            <ReadableProse text={review.finalVerdict} paragraphClassName="text-[15px] leading-[1.75] text-gray-600" />
            <ProviderCta
              href={provider.affiliateUrl}
              providerName={provider.name}
              providerSlug={provider.id}
              pageType="review"
              sourceFlow="provider_review"
              className="mt-5 flex h-[48px] w-full items-center justify-center gap-2 rounded-lg bg-[#0C4B75] text-[15px] font-bold text-white transition-colors hover:bg-[#093d61] sm:w-auto sm:px-8"
            >
              Visit {provider.name}
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </ProviderCta>
          </div>
        </div>

        {/* FAQ */}
        {reviewFaqs.length > 0 && (
          <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-4">
              <h2 className="text-[18px] font-bold text-[#191919]">
                {provider.name} Review: FAQs
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {reviewFaqs.map((f, i) => (
                <div key={i} className="p-6">
                  <h3 className="mb-2 text-[15px] font-bold text-[#191919]">{f.question}</h3>
                  <p className="text-[14px] leading-[1.7] text-gray-600">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Not sure? Quiz CTA */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
          <p className="mb-1 text-[15px] font-bold text-[#191919]">Not sure if {provider.name} is right for you?</p>
          <p className="mb-4 text-[13px] text-gray-500">Take our free quiz and get a personalized provider recommendation.</p>
          <Link
            href={"/weight-loss/find-your-match"}
            className="inline-flex h-[42px] items-center justify-center gap-2 rounded-lg border border-[#0C4B75] px-6 text-[14px] font-bold text-[#0C4B75] transition-colors hover:bg-[#0C4B75]/5"
          >
            Find Your Match
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </Link>
        </div>

        {/* Related content */}
        {(relatedBattles.length > 0 || relatedTrios.length > 0 || relatedArticles.length > 0 || showComparisonLink) && (
          <div className="mb-6">
            <h3 className="mb-4 text-[18px] font-bold text-[#191919]">Related</h3>
            {relatedBattles.length > 0 && (
              <>
                <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-gray-400">Head-to-head</p>
                <div className="mb-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedBattles.map((battle) => {
                    const otherProvider = config.providers.find(
                      (p) => p.id === (battle.provider1Id === provider.id ? battle.provider2Id : battle.provider1Id)
                    );
                    return (
                      <Link
                        key={battle.slug}
                        href={hubLink(ctx, `/${battle.slug}`)}
                        className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] font-semibold text-[#0C4B75] transition-colors hover:border-[#0C4B75]/30 hover:bg-[#0C4B75]/[0.02]"
                      >
                        <span className="truncate">{provider.name} vs {otherProvider?.name}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={2.5} />
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
            {relatedTrios.length > 0 && (
              <>
                <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-gray-400">Three-way comparisons</p>
                <div className="mb-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedTrios.map((t) => (
                    <Link
                      key={t.slug}
                      href={hubLink(ctx, `/${t.slug}`)}
                      className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] font-semibold text-[#0C4B75] transition-colors hover:border-[#0C4B75]/30 hover:bg-[#0C4B75]/[0.02]"
                    >
                      <span className="truncate">{t.title}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={2.5} />
                    </Link>
                  ))}
                </div>
              </>
            )}
            {(relatedArticles.length > 0 || showComparisonLink) && (
              <>
                <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-gray-400">Guides</p>
                <div className="space-y-2">
                  {showComparisonLink && (
                    <Link
                      href="/weight-loss/glp1-provider-comparison"
                      className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#191919] transition-colors hover:border-[#0C4B75]/30 hover:bg-[#0C4B75]/[0.02]"
                    >
                      <span className="truncate">GLP-1 Telehealth Providers Compared: {provider.name} and seven others on verified prices, Trustpilot and Reddit</span>
                      <span className="ml-auto shrink-0 text-[12px] text-gray-400">Comparison</span>
                    </Link>
                  )}
                  {relatedArticles.map((article) => (
                    <Link
                      key={article.slug}
                      href={hubLink(ctx, `/articles/${article.slug}`)}
                      className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] font-medium text-[#191919] transition-colors hover:border-[#0C4B75]/30 hover:bg-[#0C4B75]/[0.02]"
                    >
                      <span className="truncate">{article.title}</span>
                      <span className="ml-auto shrink-0 text-[12px] text-gray-400">{article.readTime}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Provider question cluster - the review's highest-intent internal links */}
        {clusterSlugs.length > 0 && (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-7">
            <h2 className="mb-1 text-[17px] font-bold text-[#191919]">
              More on {provider.name}
            </h2>
            <p className="mb-4 text-[13.5px] text-gray-500">
              The questions people ask before signing up - answered in depth.
            </p>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {clusterSlugs.map((c) => (
                <Link
                  key={c.slug}
                  href={hubLink(ctx, `/articles/${c.slug}`)}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-[14px] font-semibold text-[#0C4B75] transition-colors hover:border-[#0C4B75]/30 hover:bg-[#0C4B75]/[0.02]"
                >
                  <span className="truncate">{c.label}</span>
                  <ArrowRight className="ml-auto h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                </Link>
              ))}
            </div>
          </div>
        )}

        <SourcesMethodology
          ctx={ctx}
          providers={[{ id: provider.id, name: provider.name }]}
          headingLabel={provider.name}
          kind="review"
        />

        <MedicalDisclaimer vertical={ctx.vertical} className="mb-8" />

        {/* Authoritative medical citations (FDA / NEJM / NIH) - the same YMYL
            grounding block the article template carries. */}
        <MedicalSources vertical={ctx.vertical} />
      </div>

      {/* Mobile-only promo popup - shown on the provider's own review page when
          it has a registered creative (same once-per-session behavior as on
          comparisons). */}
      {promoPopup && (
        <PromoPopup
          spec={promoPopup}
          href={provider.affiliateUrl}
          position={rankIndex >= 0 ? rankIndex + 1 : undefined}
        />
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-[17px] font-bold text-[#191919]">{title}</h3>
      {children}
    </div>
  );
}
