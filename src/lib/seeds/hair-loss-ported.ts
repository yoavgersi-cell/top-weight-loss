import type { Provider, ReviewData, BattleData, ArticleData, FaqItem } from "../config";

// ─────────────────────────────────────────────────────────────────────────────
// Hair-loss content ported from the tophairloss.io repo on Oct 22, 2026 (its
// main branch, last updated Aug 16, 2026). That site was already folded into
// the hub earlier and its domain 301s here, so the hub carried the richer set;
// these are the pieces it still lacked: the Nutrafol provider and review, the
// four comparisons built on Ro (then "Roman") and Nutrafol, two guides, and
// one FAQ. The women's hub page lives in app/(main)/[battleSlug]/women.
// Internal links re-prefixed under /hair-loss; "Roman" renamed to Ro, the
// brand's current name and the hub's provider id; Nutrafol's unverified price
// line replaced with the hub's standard "check the provider's site" wording.
// Nutrafol has no affiliate link, so its card points at nutrafol.com.
// ─────────────────────────────────────────────────────────────────────────────

export const HAIR_LOSS_PROVIDERS_PORTED: Provider[] = [
{
  "id": "nutrafol",
  "name": "Nutrafol",
  "tagline": "Drug-free, physician-formulated hair growth supplements for men & women",
  "logo": "/logos/nutrafol.svg",
  "smallLogo": "/logos/nutrafol-icon.svg",
  "highlights": [
    "Drug-free nutraceutical — no finasteride or minoxidil",
    "Physician-formulated with clinically tested ingredients",
    "Whole-body approach for both men & women"
  ],
  "affiliateUrl": "https://nutrafol.com/",
  "ctaText": "Visit Site"
},
];

export const HAIR_LOSS_REVIEWS_PORTED: ReviewData[] = [
{
  "slug": "nutrafol",
  "providerId": "nutrafol",
  "shortSummary": "Drug-free, physician-formulated hair growth supplements that target root causes like stress, hormones and nutrition, for men and women, no prescription needed.",
  "reviewIntro": "Nutrafol takes a different approach from the prescription brands: instead of finasteride or minoxidil, it's a drug-free nutraceutical (supplement) designed to support hair growth by targeting root causes like stress, hormones, nutrition, and metabolism. Its physician-formulated capsules combine botanicals and nutrients — such as saw palmetto, ashwagandha, marine collagen, and biotin — and the ingredients are clinically tested. It's sold over the counter for both men and women.",
  "keyFeatures": [
    "Drug-free supplement — no finasteride or minoxidil",
    "Physician-formulated with clinically tested ingredients",
    "Whole-body approach (stress, hormones, nutrition)",
    "Formulas for men, women, menopause, and postpartum",
    "No prescription required — sold direct and via dermatologists"
  ],
  "pricingSummary": "Pricing varies by formula and plan, and a subscription lowers the per-month cost. Check Nutrafol's site for current pricing.",
  "treatmentOptions": [
    "Nutrafol Men",
    "Nutrafol Women (plus Women's Balance for menopause)",
    "Postpartum and vegan formulas",
    "Supporting scalp and hair products"
  ],
  "pros": [
    "Drug-free — ideal if you want to avoid finasteride/minoxidil",
    "Works for both men and women",
    "Physician-formulated and clinically tested",
    "No prescription needed",
    "Targets whole-body factors like stress and nutrition"
  ],
  "cons": [
    "A supplement — evidence is less robust than finasteride/minoxidil",
    "Premium price for an ongoing supplement",
    "Results take 3–6 months and vary by person",
    "Not a substitute for medical treatment in advanced loss"
  ],
  "bestFor": [
    "People who want a drug-free, supplement-based option",
    "Men and women looking for a whole-body approach",
    "Anyone avoiding or unable to take finasteride/minoxidil"
  ],
  "finalVerdict": "Nutrafol is the standout drug-free option — a physician-formulated supplement that targets the stress, hormone, and nutrition factors behind thinning hair, for both men and women. It won't replace finasteride or minoxidil for pattern hair loss, and it asks for patience and a premium monthly price, but for anyone who wants to avoid medication, it's the most credible supplement choice.",
  "trustBadges": [
    "Drug-free supplement",
    "Physician-formulated",
    "Clinically tested",
    "For men & women"
  ],
  "updatedAt": "2026-08-16"
},
];

export const HAIR_LOSS_BATTLES_PORTED: BattleData[] = [
  {
    "slug": "hims-vs-ro",
    "provider1Id": "hims",
    "provider2Id": "ro",
    "title": "Hims vs Ro: Which Hair Loss Service Wins in 2026?",
    "subtitle": "Hims vs Ro, compared on treatments, medical model, and value — to see which men's hair loss service comes out ahead.",
    "description": "Hims vs Ro compared on hair loss treatments, clinician support and value. Hims has the wider product range; Ro offers clinician-guided care on a broad platform.",
    "intro": "Hims and Ro are two big names in men's telehealth, and both prescribe the proven hair loss medications — finasteride and minoxidil — after an online visit. Hims leans into a broad product range and a combined spray, while Ro (the men's-health brand from Ro) emphasizes clinician-guided care on an established platform. Here's how they compare.",
    "verdict": "Both are credible, well-run services — but Hims edges ahead for most people on range and convenience. It offers more treatment options, a 2-in-1 spray, and a polished experience. Ro is the better pick if you value clinician-guided care and the credibility of the Ro platform, especially if you already use Ro for other men's-health needs.",
    "verdictWinnerPoints": [
      "Broader treatment range and add-ons",
      "2-in-1 finasteride + minoxidil spray",
      "Polished, well-known consumer brand"
    ],
    "verdictLoserPoints": [
      "Clinician-guided care from the Ro platform",
      "Streamlined, trusted telehealth experience",
      "Strong brand credibility"
    ],
    "winnerId": "hims",
    "categories": [
      {
        "name": "Treatment Range",
        "winner": "provider1",
        "explanation": "Hims offers a wider lineup — finasteride, minoxidil, a combined spray, DHT-blocking shampoo, and supplements. Ro focuses on the core finasteride and minoxidil options with a clean, guided process.",
        "supportingPoints": [
          "Spray, shampoo, supplements & more (Hims)",
          "2-in-1 combined spray (Hims)",
          "Finasteride & minoxidil, guided (Ro)",
          "Rx after online consult (both)"
        ]
      },
      {
        "name": "Convenience & Routine",
        "winner": "provider1",
        "explanation": "Hims's 2-in-1 spray combines two treatments into a single daily step. Both ship discreetly to your door, but Hims's product ecosystem makes it easy to add supporting products.",
        "supportingPoints": [
          "2-in-1 spray = one step (Hims)",
          "Easy to add supporting products (Hims)",
          "Clean, streamlined flow (Ro)",
          "Discreet delivery (both)"
        ]
      },
      {
        "name": "Medical Model",
        "winner": "provider2",
        "explanation": "Ro emphasizes clinician-guided care with licensed providers reviewing every plan on the established Ro platform. Hims also uses licensed providers, but Ro leans harder into the guided, medical experience.",
        "supportingPoints": [
          "Clinician-guided from the Ro platform (Ro)",
          "Licensed providers review every plan (Ro)",
          "Licensed provider oversight (Hims)",
          "Ongoing adjustments (both)"
        ]
      },
      {
        "name": "Pricing & Value",
        "winner": "tie",
        "explanation": "Both use subscription pricing that's broadly in line for finasteride and minoxidil, with discounts on longer plans. Neither is a clear budget leader; the value difference comes down to which extras you actually want.",
        "supportingPoints": [
          "Comparable subscription pricing (both)",
          "Discounts on longer plans (both)",
          "No insurance required (both)",
          "Value depends on chosen extras"
        ]
      },
      {
        "name": "Brand & Platform",
        "winner": "provider1",
        "explanation": "Hims is a large, publicly traded consumer brand with a highly polished experience. Ro is well-established too, backed by Ro, but Hims has the broader consumer footprint.",
        "supportingPoints": [
          "Large publicly traded brand (Hims)",
          "Highly polished app & site (Hims)",
          "Backed by the Ro platform (Ro)",
          "Established operations (both)"
        ]
      }
    ],
    "features": [
      {
        "feature": "Core Medications",
        "provider1Value": "Finasteride & minoxidil",
        "provider2Value": "Finasteride & minoxidil",
        "highlight": "both"
      },
      {
        "feature": "Combined Spray",
        "provider1Value": "2-in-1 finasteride + minoxidil",
        "provider2Value": "Separate products",
        "highlight": "provider1"
      },
      {
        "feature": "Extras",
        "provider1Value": "Shampoo, gummies, thickeners",
        "provider2Value": "Focused core lineup",
        "highlight": "provider1"
      },
      {
        "feature": "Medical Model",
        "provider1Value": "Licensed provider oversight",
        "provider2Value": "Clinician-guided (Ro platform)",
        "highlight": "provider2"
      },
      {
        "feature": "Shipping",
        "provider1Value": "Discreet home delivery",
        "provider2Value": "Discreet, free shipping",
        "highlight": "both"
      },
      {
        "feature": "Consultation",
        "provider1Value": "100% online",
        "provider2Value": "100% online",
        "highlight": "both"
      }
    ],
    "updatedAt": "2026-08-16"
  },
  {
    "slug": "keeps-vs-ro",
    "provider1Id": "keeps",
    "provider2Id": "ro",
    "title": "Keeps vs Ro: Which Men's Hair Loss Service Wins in 2026?",
    "subtitle": "Keeps vs Ro, compared on price, focus, and platform — to see which men's hair loss service comes out ahead.",
    "description": "Keeps vs Ro compared on price, hair loss focus and platform. Keeps is cheaper and hair-loss-focused; Ro offers clinician-guided care on a broad platform.",
    "intro": "Keeps and Ro both prescribe the proven hair loss medications — finasteride and minoxidil — to men after an online consult, but they take different approaches. Keeps is a hair-loss specialist built around affordability, while Ro brings clinician-guided care and the credibility of the established Ro platform. Here's how they compare.",
    "verdict": "Both are legitimate men's hair loss services — but Keeps takes this one on price and focus. It's built specifically around affordable men's hair loss, with generic finasteride and minoxidil and a simple subscription. Ro is the better pick if you value clinician-guided care and a broader, established men's-health platform.",
    "verdictWinnerPoints": [
      "Among the most affordable options",
      "Single-minded focus on men's hair loss",
      "Simple, no-frills subscription"
    ],
    "verdictLoserPoints": [
      "Clinician-guided care from the Ro platform",
      "Broader, established men's-health brand",
      "Streamlined, polished experience"
    ],
    "winnerId": "keeps",
    "categories": [
      {
        "name": "Pricing & Value",
        "winner": "provider1",
        "explanation": "Keeps is priced for affordability — generic finasteride from around $25/month and minoxidil from around $15/month. Ro's pricing is transparent but generally runs a bit higher for the core routine.",
        "supportingPoints": [
          "Generic finasteride from ~$25/mo (Keeps)",
          "Minoxidil from ~$15/mo (Keeps)",
          "Transparent but higher pricing (Ro)",
          "No insurance required (both)"
        ]
      },
      {
        "name": "Focus",
        "winner": "provider1",
        "explanation": "Keeps is a dedicated hair-loss service with no unrelated products. Ro covers a broad range of men's-health needs, which adds range but less single-minded focus on hair.",
        "supportingPoints": [
          "Hair-loss-only specialist (Keeps)",
          "No unrelated upsells (Keeps)",
          "Broad men's-health platform (Ro)",
          "Licensed provider oversight (both)"
        ]
      },
      {
        "name": "Medical Model",
        "winner": "provider2",
        "explanation": "Ro emphasizes clinician-guided care with licensed providers reviewing every plan on the established Ro platform. Keeps also uses licensed physicians, but Ro leans harder into the guided experience.",
        "supportingPoints": [
          "Clinician-guided from the Ro platform (Ro)",
          "Licensed providers review every plan (Ro)",
          "Licensed physician oversight (Keeps)",
          "Ongoing support (both)"
        ]
      },
      {
        "name": "Medications",
        "winner": "tie",
        "explanation": "Both offer the core proven treatments — finasteride and minoxidil — prescribed after an online consult. Neither is limited to a single option for men's hair loss.",
        "supportingPoints": [
          "Oral finasteride (both)",
          "Topical minoxidil (both)",
          "Combined routines available (both)",
          "Rx after online review (both)"
        ]
      },
      {
        "name": "Simplicity",
        "winner": "provider1",
        "explanation": "Keeps offers a simple, focused signup and subscription centered on hair. Ro's broader platform is polished but covers more than hair, which can be more than a hair-only shopper needs.",
        "supportingPoints": [
          "Simple, hair-focused signup (Keeps)",
          "No-frills subscription (Keeps)",
          "Polished but broader platform (Ro)",
          "Discreet delivery (both)"
        ]
      }
    ],
    "features": [
      {
        "feature": "Starting Price",
        "provider1Value": "From ~$25/mo finasteride",
        "provider2Value": "Transparent, generally higher",
        "highlight": "provider1"
      },
      {
        "feature": "Focus",
        "provider1Value": "Hair loss only",
        "provider2Value": "Broad men's health",
        "highlight": "provider1"
      },
      {
        "feature": "Core Medications",
        "provider1Value": "Finasteride & minoxidil",
        "provider2Value": "Finasteride & minoxidil",
        "highlight": "both"
      },
      {
        "feature": "Medical Model",
        "provider1Value": "Licensed physician oversight",
        "provider2Value": "Clinician-guided (Ro platform)",
        "highlight": "provider2"
      },
      {
        "feature": "Shipping",
        "provider1Value": "Discreet home delivery",
        "provider2Value": "Discreet, free shipping",
        "highlight": "both"
      },
      {
        "feature": "Consultation",
        "provider1Value": "100% online",
        "provider2Value": "100% online",
        "highlight": "both"
      }
    ],
    "updatedAt": "2026-08-16"
  },
  {
    "slug": "hims-vs-nutrafol",
    "provider1Id": "hims",
    "provider2Id": "nutrafol",
    "title": "Hims vs Nutrafol: Prescription vs Drug-Free for Hair Loss (2026)",
    "subtitle": "Hims vs Nutrafol, compared — proven prescription medications vs a drug-free supplement. Which is right for you?",
    "description": "Hims vs Nutrafol compared: Hims offers prescription finasteride and minoxidil; Nutrafol is a drug-free, physician-formulated supplement for men and women.",
    "intro": "Hims and Nutrafol represent two very different approaches to hair loss. Hims prescribes the proven, FDA-approved medications — finasteride and minoxidil — after an online consult. Nutrafol skips the drugs entirely: it's a physician-formulated supplement that targets root causes like stress, hormones, and nutrition, and it works for both men and women without a prescription. Here's how they compare.",
    "verdict": "For men with male pattern baldness who want the most effective, evidence-backed results, Hims takes this one — finasteride and minoxidil are the proven standard of care. But Nutrafol is the better choice if you specifically want a drug-free option, are a woman, or can't take finasteride/minoxidil. They can even be used together, since they work in completely different ways.",
    "verdictWinnerPoints": [
      "Proven, FDA-approved finasteride & minoxidil",
      "Strongest evidence for male pattern hair loss",
      "Broad range plus a 2-in-1 spray"
    ],
    "verdictLoserPoints": [
      "Completely drug-free supplement",
      "Works for both men and women",
      "Targets stress, hormones, and nutrition — no prescription"
    ],
    "winnerId": "hims",
    "categories": [
      {
        "name": "Proven Effectiveness",
        "winner": "provider1",
        "explanation": "Hims uses finasteride and minoxidil — the only FDA-approved medications for pattern hair loss, with the strongest clinical evidence. Nutrafol's ingredients are clinically tested, but as a supplement the evidence is less robust than the prescription medications.",
        "supportingPoints": [
          "FDA-approved finasteride & minoxidil (Hims)",
          "Strongest evidence base (Hims)",
          "Clinically tested supplement ingredients (Nutrafol)",
          "Results take months either way"
        ]
      },
      {
        "name": "Drug-Free Option",
        "winner": "provider2",
        "explanation": "Nutrafol is completely drug-free — no finasteride or minoxidil — which appeals to people wary of medication side effects. Hims is built around prescription drugs, though it also sells some supplements.",
        "supportingPoints": [
          "100% drug-free supplement (Nutrafol)",
          "Avoids finasteride side-effect concerns (Nutrafol)",
          "Prescription-drug based (Hims)",
          "No prescription needed (Nutrafol)"
        ]
      },
      {
        "name": "Who It Treats",
        "winner": "provider2",
        "explanation": "Nutrafol has formulas for men, women, menopause, and postpartum. Hims's hair line — including finasteride — is men-only, so women can't use its core treatment.",
        "supportingPoints": [
          "Formulas for men and women (Nutrafol)",
          "Menopause & postpartum options (Nutrafol)",
          "Men-only hair line (Hims)",
          "Physician-formulated (Nutrafol)"
        ]
      },
      {
        "name": "Pricing & Value",
        "winner": "provider1",
        "explanation": "Hims's core medications start low — generic finasteride around $20/month. Nutrafol is a premium supplement at roughly $79–$88/month. For cost-per-proven-result, Hims comes out ahead.",
        "supportingPoints": [
          "Generic finasteride from ~$20/mo (Hims)",
          "Bundles and intro offers (Hims)",
          "Premium supplement ~$79–$88/mo (Nutrafol)",
          "No insurance required (both)"
        ]
      },
      {
        "name": "Convenience",
        "winner": "tie",
        "explanation": "Both are simple subscriptions with discreet home delivery. Hims requires an online consult since it's prescription; Nutrafol can be bought over the counter with no consult needed.",
        "supportingPoints": [
          "Subscription with home delivery (both)",
          "Online consult required (Hims)",
          "No prescription or consult (Nutrafol)",
          "Easy to cancel (both)"
        ]
      }
    ],
    "features": [
      {
        "feature": "Type",
        "provider1Value": "Prescription medications",
        "provider2Value": "Drug-free supplement",
        "highlight": "provider1"
      },
      {
        "feature": "Core Treatment",
        "provider1Value": "Finasteride & minoxidil",
        "provider2Value": "Physician-formulated botanicals & nutrients",
        "highlight": "provider1"
      },
      {
        "feature": "Treats Women",
        "provider1Value": "Men-only hair line",
        "provider2Value": "Men and women",
        "highlight": "provider2"
      },
      {
        "feature": "Prescription",
        "provider1Value": "Required (online consult)",
        "provider2Value": "Not required",
        "highlight": "provider2"
      },
      {
        "feature": "Starting Price",
        "provider1Value": "From ~$20/mo (generic fin)",
        "provider2Value": "~$79–$88/mo",
        "highlight": "provider1"
      },
      {
        "feature": "Delivery",
        "provider1Value": "Discreet home delivery",
        "provider2Value": "Discreet home delivery",
        "highlight": "both"
      }
    ],
    "updatedAt": "2026-08-16"
  },
  {
    "slug": "maximus-vs-nutrafol",
    "provider1Id": "maximus",
    "provider2Id": "nutrafol",
    "title": "Maximus vs Nutrafol: Prescription Protocol vs Drug-Free (2026)",
    "subtitle": "Maximus vs Nutrafol, compared — a potent prescription oral protocol vs a drug-free supplement. Which is right for you?",
    "description": "Maximus vs Nutrafol compared: Maximus is a prescription oral protocol (minoxidil plus a DHT blocker); Nutrafol is a drug-free supplement for men and women.",
    "intro": "Maximus and Nutrafol sit at opposite ends of the hair loss spectrum. Maximus prescribes a potent all-in-one oral protocol combining oral minoxidil with a DHT blocker (finasteride or dutasteride) — the proven, medication-based route. Nutrafol skips drugs entirely: it's a physician-formulated supplement that targets root causes like stress and nutrition, and works for both men and women. Here's how they compare.",
    "verdict": "For men focused on maximum effectiveness against pattern hair loss, Maximus takes this one — its prescription protocol uses the actives with the strongest evidence. Nutrafol is the better choice if you want a completely drug-free option, are a woman, or can't take prescription medications. Because they work in entirely different ways, some people even combine them.",
    "verdictWinnerPoints": [
      "Proven prescription actives (minoxidil + DHT blocker)",
      "Potent all-in-one oral protocol",
      "Option of dutasteride for stronger DHT control"
    ],
    "verdictLoserPoints": [
      "Completely drug-free supplement",
      "Works for both men and women",
      "Targets stress, hormones & nutrition — no prescription"
    ],
    "winnerId": "maximus",
    "categories": [
      {
        "name": "Proven Effectiveness",
        "winner": "provider1",
        "explanation": "Maximus uses the actives with the strongest evidence for pattern hair loss — minoxidil plus a DHT blocker. Nutrafol's ingredients are clinically tested, but as a supplement the evidence is less robust than the prescription medications.",
        "supportingPoints": [
          "Prescription minoxidil + DHT blocker (Maximus)",
          "Strongest evidence base (Maximus)",
          "Clinically tested supplement ingredients (Nutrafol)",
          "Results take months either way"
        ]
      },
      {
        "name": "Potency & DHT Control",
        "winner": "provider1",
        "explanation": "Maximus directly blocks DHT — the hormone behind male pattern loss — and offers dutasteride for even stronger control. Nutrafol includes botanicals like saw palmetto that may gently influence DHT, but not to the same degree.",
        "supportingPoints": [
          "Direct DHT blockade (Maximus)",
          "Dutasteride option for stronger control (Maximus)",
          "Botanical, gentler approach (Nutrafol)",
          "Provider oversight (Maximus)"
        ]
      },
      {
        "name": "Drug-Free Option",
        "winner": "provider2",
        "explanation": "Nutrafol is completely drug-free, which appeals to people wary of medication side effects and requires no prescription. Maximus is built around prescription medications.",
        "supportingPoints": [
          "100% drug-free supplement (Nutrafol)",
          "No prescription needed (Nutrafol)",
          "Avoids medication side-effect concerns (Nutrafol)",
          "Prescription-based protocol (Maximus)"
        ]
      },
      {
        "name": "Who It Treats",
        "winner": "provider2",
        "explanation": "Nutrafol has formulas for men, women, menopause, and postpartum. Maximus is a men's-health brand, so its protocol is aimed at men.",
        "supportingPoints": [
          "Formulas for men and women (Nutrafol)",
          "Menopause & postpartum options (Nutrafol)",
          "Men-focused protocol (Maximus)",
          "Physician-formulated (Nutrafol)"
        ]
      },
      {
        "name": "All-in-One Convenience",
        "winner": "provider1",
        "explanation": "Maximus combines its actives into one daily oral dose — no topical routine and no separate products. Nutrafol is also a simple daily capsule, though it's a supplement rather than a complete treatment.",
        "supportingPoints": [
          "One daily all-in-one oral dose (Maximus)",
          "No topical routine (Maximus)",
          "Simple daily capsule (Nutrafol)",
          "Subscription with delivery (both)"
        ]
      }
    ],
    "features": [
      {
        "feature": "Type",
        "provider1Value": "Prescription oral protocol",
        "provider2Value": "Drug-free supplement",
        "highlight": "provider1"
      },
      {
        "feature": "Core Actives",
        "provider1Value": "Minoxidil + finasteride/dutasteride",
        "provider2Value": "Botanicals & nutrients",
        "highlight": "provider1"
      },
      {
        "feature": "Treats Women",
        "provider1Value": "Men-focused",
        "provider2Value": "Men and women",
        "highlight": "provider2"
      },
      {
        "feature": "Prescription",
        "provider1Value": "Required (online review)",
        "provider2Value": "Not required",
        "highlight": "provider2"
      },
      {
        "feature": "Format",
        "provider1Value": "Daily oral dose",
        "provider2Value": "Daily capsule",
        "highlight": "both"
      },
      {
        "feature": "Delivery",
        "provider1Value": "Discreet home delivery",
        "provider2Value": "Discreet home delivery",
        "highlight": "both"
      }
    ],
    "updatedAt": "2026-08-16"
  }
];

export const HAIR_LOSS_GUIDES_PORTED: ArticleData[] = [
  {
    "slug": "does-minoxidil-work",
    "title": "Does Minoxidil Work? What to Expect from Rogaine and Generics",
    "description": "Minoxidil is a proven regrowth treatment for men and women — here's how it works, how long it takes, and why the early 'shed' is normal.",
    "category": "Science",
    "readTime": "5 min read",
    "publishedAt": "2026-08-03",
    "updatedAt": "2026-08-12",
    "heroColor": "#FBF3EE",
    "author": "Treatments Hub Research Team",
    "sections": [
      {
        "heading": "The Proven Regrowth Treatment",
        "body": "Minoxidil (brand name Rogaine, plus many generics) is FDA-approved and works for both men and women. Studies consistently show it increases hair count and thickness, especially at the crown. The 5% strength is generally more effective than 2%, and it comes as a foam, a liquid solution, or — increasingly — a low-dose oral pill prescribed off-label."
      },
      {
        "heading": "How It Works",
        "body": "Unlike finasteride, minoxidil doesn't affect hormones. It's a vasodilator that increases blood flow to the scalp and, more importantly, extends the growth (anagen) phase of the hair cycle, so follicles stay productive longer and produce thicker strands. That's why it pairs so well with finasteride — see <a href=\"/hair-loss/articles/finasteride-vs-minoxidil\">finasteride vs minoxidil</a>."
      },
      {
        "heading": "The Early Shed Is Normal",
        "body": "Many people panic in the first 2–8 weeks when they notice more shedding. This 'dread shed' is actually a good sign: minoxidil pushes old hairs out to make room for new growth. It passes, and visible improvement typically appears around 3–4 months, with fuller results by 6–12 months."
      },
      {
        "heading": "Oral or Topical?",
        "body": "Topical minoxidil is available over the counter but requires a daily scalp routine. Low-dose oral minoxidil is prescription-only and more convenient, though it needs medical oversight. We break down the trade-offs in <a href=\"/hair-loss/articles/oral-minoxidil-vs-topical-minoxidil\">oral vs topical minoxidil</a>. Providers like <a href=\"/hair-loss/reviews/hims\">Hims</a> and <a href=\"/hair-loss/reviews/happyhead\">Happy Head</a> offer both."
      }
    ]
  },
  {
    "slug": "male-pattern-baldness-explained",
    "title": "Male Pattern Baldness: Causes, Stages, and Treatment",
    "description": "Male pattern baldness affects most men eventually. Here's what causes it, how it progresses, and what actually stops it.",
    "category": "Science",
    "readTime": "5 min read",
    "publishedAt": "2026-08-08",
    "updatedAt": "2026-08-12",
    "heroColor": "#F5F0FA",
    "author": "Treatments Hub Research Team",
    "sections": [
      {
        "heading": "What Causes It",
        "body": "Male pattern baldness (androgenetic alopecia) is driven by genetics and hormones. In genetically susceptible men, the hormone DHT gradually miniaturizes follicles — each growth cycle produces a finer, shorter hair until the follicle stops producing visible hair altogether. It's why it typically starts at the hairline and crown."
      },
      {
        "heading": "How It Progresses",
        "body": "Hair loss usually follows a recognizable pattern: a receding hairline (often an 'M' shape), then thinning at the crown, which can eventually meet in the middle. The Norwood scale describes these stages from 1 (no loss) to 7 (extensive loss). The earlier you act, the more hair there is to protect."
      },
      {
        "heading": "What Actually Stops It",
        "body": "The proven treatments target the two levers you can control: DHT and follicle activity. Finasteride lowers DHT to halt the cause; minoxidil stimulates regrowth. Used together, they're the evidence-backed standard of care. Read <a href=\"/hair-loss/articles/finasteride-vs-minoxidil\">finasteride vs minoxidil</a> to understand the combo."
      },
      {
        "heading": "Acting Early Matters",
        "body": "Treatments are far better at keeping the hair you have than regrowing hair that's long gone. If you're noticing early thinning, that's the best time to start. <a href=\"/hair-loss\">Take our quiz</a> or browse the <a href=\"/hair-loss\">top-rated providers</a>."
      }
    ]
  }
];

export const HAIR_LOSS_FAQS_PORTED: FaqItem[] = [
{
  "question": "Do I need a prescription for hair loss treatment?",
  "answer": "Finasteride requires a prescription, and oral minoxidil is prescription-only. Topical minoxidil (like Rogaine) is available over the counter. Telehealth providers make it easy to get prescription treatments after a quick online consultation with a licensed provider — no in-person visit needed."
},
];
