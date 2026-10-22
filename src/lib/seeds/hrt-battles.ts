import type { BattleData } from "../config";

// Two HRT head-to-heads ported from hrtwomen.com on Oct 22, 2026 (Winona vs
// Gala, Gala vs Midi Health). The third matchup on that site, Winona vs Midi,
// already exists here as /hrt/midi-vs-winona with the hub's Oct 8, 2026
// verification, so it is kept and the ported copy links point at it.
// Internal links re-prefixed under /hrt; provider facts unchanged.

const UPDATED = "2026-09-26";

export const HRT_BATTLES_PORTED: BattleData[] = [
  {
    slug: "winona-vs-gala",
    provider1Id: "winona",
    provider2Id: "gala",
    title: "Winona vs Gala",
    matchupLabel: "Winona vs Gala",
    subtitle: "Physician-led, appointment-free HRT vs a flat-fee clinician plan",
    description:
      "Compare Winona and Gala for online menopause HRT - treatment options, clinicians, pricing model and which fits you best.",
    intro:
      "Winona and Gala both prescribe menopause hormone therapy online and ship it to your door, and neither bills insurance. Winona is physician-led, skips the video visit entirely and offers several estrogen forms; Gala keeps things simple with estradiol and progesterone and one flat monthly price. Here's how they compare.",
    verdict:
      "Both are legitimate, clinician-led options. Winona is our pick for women who want the widest choice of estrogen forms, physician oversight and appointment-free care. Gala is an excellent choice if you want a single predictable monthly price and a simple estradiol-and-progesterone plan. Confirm current pricing on each provider's site.",
    verdictWinnerPoints: [
      "Board-certified physicians review every intake",
      "Estradiol as pill, patch or cream, plus vaginal estrogen",
      "Unlimited doctor messaging with no video visit needed",
    ],
    verdictLoserPoints: [
      "One flat monthly price with the clinician included",
      "Estradiol (pill or patch) and progesterone",
      "Dose adjustments and check-ins built in",
    ],
    winnerId: "winona",
    categories: [
      {
        name: "Treatment range",
        winner: "provider1",
        explanation:
          "Winona offers estradiol in several forms including cream, plus progesterone and vaginal estrogen; Gala focuses on pill or patch estradiol, progesterone and vaginal estradiol.",
        supportingPoints: [
          "Cream option at Winona",
          "Pill and patch at both",
          "Vaginal estrogen at both",
        ],
      },
      {
        name: "Pricing simplicity",
        winner: "provider2",
        explanation:
          "Gala advertises one flat monthly price; Winona's cost varies with the form and combination prescribed.",
        supportingPoints: ["Single monthly fee at Gala", "Tiered pricing at Winona"],
      },
      {
        name: "Clinical oversight",
        winner: "tie",
        explanation:
          "Both require an online assessment and a licensed clinician's decision before prescribing, with ongoing messaging.",
        supportingPoints: ["Clinician review at both", "Ongoing messaging at both"],
      },
      {
        name: "Convenience",
        winner: "provider1",
        explanation:
          "Winona is fully appointment-free with unlimited physician messaging and free delivery.",
        supportingPoints: ["No video visit", "Free delivery"],
      },
    ],
    features: [
      { feature: "Clinicians", provider1Value: "Board-certified physicians", provider2Value: "US-licensed clinicians", highlight: "provider1" },
      { feature: "Estrogen forms", provider1Value: "Pill, patch, cream", provider2Value: "Pill, patch", highlight: "provider1" },
      { feature: "Vaginal estrogen", provider1Value: "Yes", provider2Value: "Yes", highlight: "both" },
      { feature: "Insurance", provider1Value: "Self-pay", provider2Value: "Self-pay", highlight: "none" },
      { feature: "Pricing", provider1Value: "Varies by plan (approx.)", provider2Value: "Flat monthly (approx.)", highlight: "provider2" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "gala-vs-midi",
    provider1Id: "gala",
    provider2Id: "midi",
    title: "Gala vs Midi Health",
    matchupLabel: "Gala vs Midi Health",
    subtitle: "A flat-fee HRT plan vs an insurance-based menopause clinic",
    description:
      "Compare Gala and Midi Health for online menopause HRT - pricing, insurance, visit style and which fits you best.",
    intro:
      "Gala and Midi Health both offer clinician-led menopause care online, but they are built for different women. Gala is a flat-fee, self-pay plan with estradiol and progesterone shipped to your door. Midi is a virtual specialist clinic that bills most major insurance and meets you by video. Here's how they compare.",
    verdict:
      "Gala edges this matchup on simplicity: one predictable price, no appointments to schedule and medication delivered. Midi Health wins clearly if you have commercial insurance you want to use or want a longer live consultation. Confirm current pricing and your coverage on each provider's site.",
    verdictWinnerPoints: [
      "One flat monthly price, clinician included",
      "Estradiol (pill or patch) and progesterone",
      "Medication shipped free to your door",
    ],
    verdictLoserPoints: [
      "In-network with most major commercial insurance",
      "Live video visits",
      "Broader hormonal and non-hormonal care",
    ],
    winnerId: "gala",
    categories: [
      {
        name: "Pricing predictability",
        winner: "provider1",
        explanation:
          "Gala's single monthly price is easy to budget; Midi's cost depends on your plan, deductible and pharmacy benefit.",
        supportingPoints: ["Flat fee at Gala", "Plan-dependent costs at Midi"],
      },
      {
        name: "Insurance coverage",
        winner: "provider2",
        explanation: "Midi bills most major commercial insurance; Gala is self-pay only.",
        supportingPoints: ["In-network at Midi", "No insurance at Gala"],
      },
      {
        name: "Breadth of care",
        winner: "provider2",
        explanation:
          "Midi's Care Plans can include non-hormonal prescriptions and wider midlife care alongside HRT.",
        supportingPoints: ["Non-hormonal options", "Sexual wellness, hair and skin"],
      },
      {
        name: "Clinical oversight",
        winner: "tie",
        explanation: "Both rely on licensed clinicians to decide whether HRT is appropriate and to adjust it over time.",
        supportingPoints: ["Clinician-led at both", "Ongoing follow-up"],
      },
    ],
    features: [
      { feature: "Visit style", provider1Value: "Online assessment + messaging", provider2Value: "Video visit", highlight: "none" },
      { feature: "Insurance", provider1Value: "Self-pay", provider2Value: "Most major commercial plans", highlight: "provider2" },
      { feature: "Pricing", provider1Value: "Flat monthly (approx.)", provider2Value: "Copay / plan-dependent", highlight: "provider1" },
      { feature: "Medication", provider1Value: "Shipped free", provider2Value: "Sent to your pharmacy", highlight: "provider1" },
      { feature: "Non-hormonal options", provider1Value: "See site", provider2Value: "Yes", highlight: "provider2" },
    ],
    updatedAt: UPDATED,
  },
];
