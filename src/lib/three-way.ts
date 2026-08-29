// Three-way brand comparisons (/{a}-vs-{b}-vs-{c}) - programmatic long-tail
// pages built from a CURATED registry, never from arbitrary URL combinations:
// a fixed list keeps the index free of thin permutation bloat, gives every
// page one canonical provider order, and lets each trio carry a real editorial
// verdict instead of a generated one.
//
// Every fact in the matrix comes from the same verified provider data used
// across the site (published prices, shipping terms, guarantees). Nothing here
// is invented; when a provider doesn't publish a figure, the cell says so.

export interface TrioFacts {
  id: string;
  semaglutide: string;
  tirzepatide: string;
  billing: string;
  shipping: string;
  support: string;
  guarantee: string;
  standout: string;
}

// Per-provider fact rows for the comparison matrix - the single source all
// trios render from, so a price update lands everywhere at once.
export const TRIO_FACTS: Record<string, TrioFacts> = {
  embody: {
    id: "embody",
    semaglutide: "$69/mo, flat at every dose",
    tirzepatide: "$119/mo",
    billing: "Monthly - no commitment, cancel anytime",
    shipping: "Free 1-2 day, tracked & insured",
    support: "Licensed doctors, medical director & nursing team",
    guarantee: "Full refund if you're not approved",
    standout: "LegitScript-certified; 503A pharmacies",
  },
  wellmedr: {
    id: "wellmedr",
    semaglutide: "$59/mo (12-month plan), same price at every dose",
    tirzepatide: "$99/mo",
    billing: "Monthly billing - best rate locks on a 12-month plan",
    shipping: "Free, every 4 weeks, discreet packaging",
    support: "Medical Weight-Care Coach on every plan",
    guarantee: "Weight-loss warranty (terms on site)",
    standout: "1M+ patients; board-certified specialists",
  },
  altrx: {
    id: "altrx",
    semaglutide: "$89/mo (reg. $199), flat at every dose",
    tirzepatide: "$149/mo (reg. $299)",
    billing: "Monthly - pause or cancel anytime; Buy Now, Pay Later",
    shipping: "Free nationwide delivery",
    support: "Licensed provider review (physician, PA, or NP)",
    guarantee: "-",
    standout: "Brand-name shelf: Ozempic $1,149 · Zepbound $1,249 · Wegovy $1,579",
  },
  trimrx: {
    id: "trimrx",
    semaglutide: "$179/mo (reg. $299)",
    tirzepatide: "$259/mo",
    billing: "Monthly - no long-term contract; multi-month discounts",
    shipping: "Free home delivery",
    support: "Licensed clinical guidance through dose changes",
    guarantee: "-",
    standout: "Flexibility-first: month-to-month always available",
  },
  medvi: {
    id: "medvi",
    semaglutide: "$99/mo promo (reg. $199), all-inclusive",
    tirzepatide: "$166/mo promo (reg. $299)",
    billing: "Monthly, all-inclusive - no surprise charges; HSA/FSA approved",
    shipping: "Free shipping",
    support: "Video visits + free dietician & care coaching",
    guarantee: "-",
    standout: "4.4 on Trustpilot across 14,372 reviews",
  },
  healthrx: {
    id: "healthrx",
    semaglutide: "$99/mo on a 12-month prepaid plan ($1,188 at checkout)",
    tirzepatide: "from $179/mo",
    billing: "12-month prepaid - full year due at checkout",
    shipping: "Free overnight cold-chain, lot-tracked",
    support: "Care-team check-ins; clinician review on every request",
    guarantee: "Free assessment - no payment to start",
    standout: "LegitScript-certified (cert. 50087439); 503A pharmacies",
  },
  directmeds: {
    id: "directmeds",
    semaglutide: "$147/mo, flat at every dose",
    tirzepatide: "$147/mo - same flat price",
    billing: "Monthly - no membership, cancel anytime",
    shipping: "Free 1-2 day shipping",
    support: "Doctor-prescribed; injections or needle-free drops",
    guarantee: "-",
    standout: "Only needle-free sublingual option in our ranking",
  },
  ro: {
    id: "ro",
    semaglutide: "Brand-name Wegovy: pill from $149/mo, pen from $199 - plus membership",
    tirzepatide: "Brand-name Zepbound KwikPen from $299 first mo, then $399-449",
    billing: "Membership ($39 first mo, then $74-$149/mo) + medication billed separately - cash or insurance",
    shipping: "In-house pharmacy with home delivery",
    support: "Board-certified provider consultations; ongoing dose adjustments",
    guarantee: "-",
    standout: "3.9 on Trustpilot across 5,860 reviews; insurance can cut the medication cost",
  },
  sprout: {
    id: "sprout",
    semaglutide: "$149/mo compounded; brand-name Wegovy from $1,799",
    tirzepatide: "$199/mo",
    billing: "Monthly; $200 off your first month (confirm current offer on site)",
    shipping: "Prescriptions shipped within 2 days",
    support: "Personalized, provider-guided treatment plans",
    guarantee: "-",
    standout: "Brand-name Wegovy shelf + 2-day fulfillment",
  },
  shed: {
    id: "shed",
    semaglutide: "$199/mo (20% off first month)",
    tirzepatide: "$299/mo (20% off first month)",
    billing: "Monthly; HSA/FSA approved",
    shipping: "Free home delivery",
    support: "Provider visit + health coaching included",
    guarantee: "Lose 5% of body weight in 120 days or your money back",
    standout: "The market's firmest results guarantee",
  },
};

export interface ThreeWayFaq {
  question: string;
  answer: string;
}

export interface ThreeWayComparison {
  slug: string;
  providerIds: [string, string, string];
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  verdict: string;
  faqs: ThreeWayFaq[];
}

export const THREE_WAY_COMPARISONS: ThreeWayComparison[] = [
  {
    slug: "embody-vs-altrx-vs-medvi",
    providerIds: ["embody", "altrx", "medvi"],
    title: "embody vs altRx vs Medvi: Our Top Three, One Table",
    metaTitle: "embody vs altRx vs Medvi (2026): $69 vs $89 vs $99",
    description:
      "Our three most-compared GLP-1 providers in one matrix: embody ($69 flat, 1-2 day shipping), altRx ($89 + a brand-name shelf) and Medvi ($99 all-inclusive, 4.4 on Trustpilot).",
    intro:
      "Thirty dollars separates these three, and none of them asks for a commitment - so this comparison is really about what each adds on top of the same compounded semaglutide. embody keeps it lean: $69 flat at every dose, free 1-2 day shipping, and a full refund if a provider doesn't approve you. altRx charges $89 and is the only one with a brand-name shelf - Ozempic, Zepbound and Wegovy at published cash prices - plus Buy Now, Pay Later. Medvi's $99 promo is all-inclusive with video visits, a free dietician and care coaching, backed by the strongest review record of the three: 4.4 across 14,372 Trustpilot reviews.",
    verdict:
      "All three bill monthly with no prepaid term, so the price gap is the honest starting point: $69, $89, $99. Pay the minimum and move fast: embody - cheapest here, quickest shipping, and the refund-if-not-approved policy removes the main risk of trying. Think brand-name Ozempic or Zepbound might be in your future: altRx - it's the only one of the three where that switch happens without changing providers, and BNPL softens the brand prices. Want a person in the loop - video visits, a dietician, someone to call: Medvi, and its 14,372-review Trustpilot record says the support model works. There's no legitimacy gap to worry about: all three run licensed-provider review and dispense through regulated pharmacies.",
    faqs: [
      {
        question: "Which is cheapest: embody, altRx or Medvi?",
        answer:
          "For compounded semaglutide: embody at $69/month flat (regularly $79), then altRx at $89/month promotional (regularly $199), then Medvi at $99/month promotional (regularly $199) all-inclusive. For tirzepatide: embody $119, altRx $149 (regularly $299), Medvi $166 promotional (regularly $299). All three bill monthly with no prepaid commitment.",
      },
      {
        question: "Which has the best customer reviews?",
        answer:
          "Medvi has the strongest verified review record of the three - 4.4 on Trustpilot across 14,372 reviews, with support and communication the recurring themes. embody holds 3.8 across 4,956 reviews. Current ratings for each provider are shown on their cards above.",
      },
      {
        question: "Can I get brand-name Ozempic, Zepbound or Wegovy from any of them?",
        answer:
          "Only altRx. Alongside its $89/month compounded semaglutide it publishes cash prices for brand-name medication - Ozempic at $1,149, Zepbound at $1,249 and Wegovy at $1,579 per month - with Buy Now, Pay Later available. embody and Medvi focus on compounded GLP-1s.",
      },
      {
        question: "Do any of these require a long-term commitment?",
        answer:
          "No - all three bill month to month. embody adds a full refund if a licensed provider doesn't approve you for treatment, altRx lets you pause or cancel anytime, and Medvi's all-inclusive rate is HSA/FSA approved with no surprise charges.",
      },
    ],
  },
  {
    slug: "embody-vs-altrx-vs-wellmedr",
    providerIds: ["embody", "altrx", "wellmedr"],
    title: "embody vs altRx vs wellmedr: The Budget GLP-1 Trio",
    metaTitle: "embody vs altRx vs wellmedr (2026): $69 vs $89 vs $59",
    description:
      "The three cheapest reliable GLP-1 providers compared in one table: embody ($69 flat), altRx ($89 + brand-name shelf) and wellmedr ($59 with a 12-month plan).",
    intro:
      "These three providers own the budget end of the compounded GLP-1 market, and they get there by different routes: wellmedr's $59 rewards a 12-month plan, embody's $69 is flat with zero commitment, and altRx's $89 adds the option to switch to brand-name Ozempic or Zepbound later. Same active ingredients across all three - the matrix below is really a comparison of commitment terms, logistics and optionality.",
    verdict:
      "Pick by your commitment appetite. Committed for a year and price-first: wellmedr's $59 is unbeatable. Want the freedom to stop anytime: embody's flat $69 with 1-2 day shipping and a refund-if-not-approved policy is the cleanest deal in the market. Think brand-name might be in your future: altRx is the only one of the three with a brand shelf, and its BNPL spreads the cost. There's no wrong answer here on legitimacy - all three run licensed-provider review and regulated pharmacies.",
    faqs: [
      {
        question: "Which of embody, altRx and wellmedr is cheapest?",
        answer:
          "wellmedr has the lowest headline price at $59/month for compounded semaglutide, but that rate locks on a 12-month plan. embody charges a flat $69/month with no commitment, and altRx $89/month with pause-anytime terms and Buy Now, Pay Later. On tirzepatide: wellmedr $99, embody $119, altRx $149.",
      },
      {
        question: "Do all three require a prescription?",
        answer:
          "Yes. All three are telehealth providers where a licensed clinician reviews your medical intake and decides whether GLP-1 treatment is appropriate - approval is not automatic at any of them. Medication is dispensed through licensed pharmacies.",
      },
      {
        question: "Which ships fastest?",
        answer:
          "embody ships free in 1-2 days, tracked and insured. altRx offers free nationwide delivery on standard timelines, and wellmedr ships free every 4 weeks in discreet packaging aligned to its dosing cycle.",
      },
    ],
  },
  {
    slug: "embody-vs-medvi-vs-wellmedr",
    providerIds: ["embody", "medvi", "wellmedr"],
    title: "embody vs Medvi vs wellmedr: $69, $99 or $59?",
    metaTitle: "embody vs Medvi vs wellmedr (2026): $69 vs $99 vs $59",
    description:
      "Three verified Trustpilot records, three commitment models: embody ($69 flat, no strings), Medvi ($99 all-inclusive, 4.4 across 14,372 reviews) and wellmedr ($59 on a 12-month plan, 4.7 rated).",
    intro:
      "This trio is unusual: all three carry a verified Trustpilot record, so for once the review data can carry as much weight as the price tag. wellmedr is the cheapest at $59/month - a rate that locks on a 12-month plan - and holds the highest rating here, 4.7 across 1,205 reviews. embody's $69 is flat with zero commitment and a refund if a provider doesn't approve you, at 3.8 across 4,956 reviews. Medvi's $99 promo is the all-inclusive, high-touch option - video visits, free dietician, care coaching - with the largest review base of the three: 4.4 across 14,372.",
    verdict:
      "Decide on commitment first, support second. Ready to commit to a year: wellmedr - the $59 lock is the best per-month rate in the market, its 4.7 rating is the highest here, and its weight-loss warranty backs the plan. Not ready to commit to anything: embody - $69 flat, cancel anytime, refunded if not approved. Know from experience that you quit without someone checking in: Medvi - the $30 premium over embody buys video visits, a dietician and coaching, and 14,372 reviews averaging 4.4 say that model holds up at scale. All three prescribe the same compounded semaglutide after a licensed-provider review.",
    faqs: [
      {
        question: "Which is cheapest: embody, Medvi or wellmedr?",
        answer:
          "For compounded semaglutide: wellmedr at $59/month (the rate locks on a 12-month plan), embody at $69/month flat with no commitment, Medvi at $99/month promotional (regularly $199) all-inclusive. For tirzepatide: wellmedr $99, embody $119, Medvi $166 promotional (regularly $299).",
      },
      {
        question: "Which has the best Trustpilot rating?",
        answer:
          "wellmedr holds the highest rating of the three - 4.7 across 1,205 reviews. Medvi has the largest verified base: 4.4 across 14,372 reviews. embody sits at 3.8 across 4,956. All three figures are the providers' live Trustpilot aggregates at our last verification.",
      },
      {
        question: "Which is best if I don't want a commitment?",
        answer:
          "embody - $69/month flat, billed month to month, cancel anytime, and a full refund if a licensed provider doesn't approve you for treatment. Medvi also bills monthly with no prepaid term. wellmedr's best rate ($59) requires a 12-month plan.",
      },
      {
        question: "Do any of the three offer a guarantee?",
        answer:
          "wellmedr backs treatment with a weight-loss warranty (terms on its site), and embody refunds you in full if you're not approved. Medvi doesn't advertise a results guarantee - its pitch is the all-inclusive support model instead.",
      },
    ],
  },
  {
    slug: "altrx-vs-ro-vs-sprout",
    providerIds: ["altrx", "ro", "sprout"],
    title: "altRx vs ro vs Sprout: Three Ways to Brand-Name GLP-1s",
    metaTitle: "altRx vs ro vs Sprout (2026): Brand-Name GLP-1s Compared",
    description:
      "The three providers on our ranking that sell brand-name GLP-1s online, compared: altRx's flat cash prices, ro's membership-plus-insurance model, and Sprout's Wegovy shelf with 2-day shipping.",
    intro:
      "Most GLP-1 comparisons are about compounded medication - this one is about the real branded pens, because these are the three providers in our ranking that publish brand-name pricing, and they sell it three completely different ways. altRx posts flat cash prices next to its $89 compounded plan: Ozempic $1,149, Zepbound $1,249, Wegovy $1,579 a month, with Buy Now, Pay Later. ro sells a membership ($39 the first month, then $74-$149/month) with the medication billed separately - Wegovy pill from $149/month, Zepbound KwikPen from $299 the first month - and it's the one route here where insurance, if it covers you, changes the math completely. Sprout is compounded-first at $149/month but keeps brand-name Wegovy on the shelf at $1,799 for anyone set on the branded pen, and ships prescriptions within 2 days.",
    verdict:
      "The buying structure decides this one, not the sticker. Any chance your insurance covers GLP-1s: start with ro - membership plus a copay can undercut every cash price on this page, and its 3.9 across 5,860 Trustpilot reviews is a real record for a brand this size. Paying cash and want one flat, published number: altRx - its brand shelf is the cheapest flat-rate Wegovy here and BNPL spreads it, with the $89 compounded plan as the fallback lane. Want compounded speed with a brand option in reserve: Sprout - 2-day fulfillment and $200 off the first month, with the Wegovy shelf there if you upgrade later. Formats and billing differ enough between these three that the right answer is genuinely different per person - check the current price on each site before deciding.",
    faqs: [
      {
        question: "Which has the cheapest brand-name Wegovy?",
        answer:
          "The published structures differ, so compare carefully: altRx lists brand-name Wegovy at a flat $1,579/month cash. Sprout lists it from $1,799/month. ro prices the Wegovy pill from $149/month and the pen from $199 at intro rates (rising to $299-$399/month after), plus its $39-to-$149/month membership - and where insurance covers the medication, ro's route can be the cheapest by far.",
      },
      {
        question: "Do all three also offer compounded semaglutide?",
        answer:
          "altRx ($89/month promotional, flat at every dose) and Sprout ($149/month) publish flat compounded semaglutide rates. ro's published weight-loss pricing centers on brand-name medication plus its Body membership rather than a flat compounded plan.",
      },
      {
        question: "How does ro's membership pricing actually work?",
        answer:
          "Two separate charges: the Ro Body membership - $39 the first month, then $74/month on an annual prepaid plan up to $149/month - and the medication itself, billed separately either through insurance or cash-pay at ro's published rates. That's different from altRx and Sprout, where one monthly price includes the program.",
      },
      {
        question: "Which delivers fastest?",
        answer:
          "Sprout ships prescriptions within 2 days of approval. altRx offers free nationwide delivery on standard timelines, and ro fulfills through its own in-house pharmacy with home delivery.",
      },
    ],
  },
  {
    slug: "wellmedr-vs-embody-vs-trimrx",
    providerIds: ["wellmedr", "embody", "trimrx"],
    title: "wellmedr vs embody vs trimrx: Price, Freedom, Flexibility",
    metaTitle: "wellmedr vs embody vs trimrx (2026): $59 vs $69 vs $179",
    description:
      "wellmedr ($59, 12-month plan), embody ($69 flat) and trimrx ($179, no contract) compared on real prices, commitment terms, shipping and support.",
    intro:
      "This trio spans the market's price range - $59 to $179 for the same compounded semaglutide - which makes it a clean test of what the extra money buys. The answer: commitment structure. wellmedr trades a 12-month plan for the lowest price, embody charges $10 more for total freedom, and trimrx charges a premium for a no-contract model with optional multi-month discounts and closer clinical guidance.",
    verdict:
      "For most budget-driven shoppers this comes down to wellmedr vs embody: $59 with a year's commitment, or $69 with none - both legitimate, both dose-flat. trimrx earns its $179 only if its specific mix matters to you: month-to-month freedom plus ongoing clinical support through dose changes, without the budget tier's leaner service. If you can't articulate why you'd pay the difference, don't.",
    faqs: [
      {
        question: "Why does trimrx cost more than wellmedr and embody?",
        answer:
          "trimrx prices at $179/month (regularly $299) with no long-term contract, multi-month discounts, and clinical support included through treatment. wellmedr ($59 on a 12-month plan) and embody ($69 flat) run leaner support models at lower prices. All three prescribe the same compounded semaglutide after a licensed-provider review.",
      },
      {
        question: "Which is best if I don't want any commitment?",
        answer:
          "embody - its $69/month is flat with no commitment, and it refunds you in full if a provider doesn't approve treatment. trimrx is also month-to-month with no contract, at $179. wellmedr's best rate ($59) locks on a 12-month plan.",
      },
      {
        question: "Do any of the three offer a guarantee?",
        answer:
          "wellmedr backs treatment with a weight-loss warranty (terms on its site), and embody offers a full refund if you're not approved. trimrx doesn't advertise a comparable guarantee.",
      },
    ],
  },
  {
    slug: "medvi-vs-trimrx-vs-shed",
    providerIds: ["medvi", "trimrx", "shed"],
    title: "Medvi vs trimrx vs SHED: The Support-Tier Showdown",
    metaTitle: "Medvi vs trimrx vs SHED (2026): $99-$199 Compared",
    description:
      "The support tier compared: Medvi's all-inclusive care (4.4 on Trustpilot), trimrx's no-contract flexibility, and SHED's coaching with a money-back guarantee.",
    intro:
      "These three sell more than medication - each wraps the same compounded GLP-1s in a different support philosophy, from Medvi's current $99 promo to SHED's $199. Medvi bundles video visits, a dietician and care coaching behind a 14,372-review Trustpilot record. trimrx sells flexibility: no contract, optional discounts, clinical guidance. SHED sells accountability: formal health coaching plus the market's only lose-5%-in-120-days-or-your-money-back guarantee.",
    verdict:
      "Match the model to your failure mode. If past attempts failed for lack of guidance, Medvi's high-touch care - with the receipts to prove it works - is the pick. If you want premium care without being locked to anything, trimrx. If you need stakes and structure to follow through, SHED's guarantee literally pays you back if the program doesn't deliver. On current pricing Medvi's $99 promo is also the cheapest of the three - but the support philosophy, not the price, is the real choice.",
    faqs: [
      {
        question: "Is Medvi, trimrx or SHED better for support?",
        answer:
          "They support differently: Medvi includes video visits with providers plus a free dietician and care coaching (rated 4.4 across 14,372 Trustpilot reviews); SHED includes formal health coaching backed by a money-back guarantee; trimrx includes clinical guidance through dose changes with a flexibility-first, no-contract model.",
      },
      {
        question: "Which has a money-back guarantee?",
        answer:
          "SHED - lose 5% of your body weight in 120 days or your money back, conditioned on following the program (terms on its site). Medvi and trimrx don't advertise results guarantees.",
      },
      {
        question: "Are these worth it over cheaper GLP-1 providers?",
        answer:
          "The active ingredients are the same as the $59-$99 budget tier - the premium buys the support layer. If coaching, accountability or a personal provider relationship is what determines whether you stick with treatment, the tier can pay for itself; if you're self-directed, the budget tier delivers the same medication for less.",
      },
    ],
  },
  {
    slug: "healthrx-vs-embody-vs-wellmedr",
    providerIds: ["healthrx", "embody", "wellmedr"],
    title: "HealthRx vs embody vs wellmedr: Three Ways to Pay for GLP-1",
    metaTitle: "HealthRx vs embody vs wellmedr (2026): Prepaid vs Flat vs Lock",
    description:
      "Three pricing models for the same medication: HealthRx's $99 prepaid year, embody's $69 flat monthly, wellmedr's $59 12-month lock - compared honestly.",
    intro:
      "Same compounded semaglutide, three opposite ways to buy it. HealthRx wants the year upfront - $1,188 at checkout, working out to $99/month with overnight cold-chain shipping. embody bills $69 monthly with the right to stop anytime. wellmedr bills monthly too, but its $59 rate locks on a 12-month plan. This is the clearest commitment-structure comparison in the market, and the right answer depends on exactly one thing: how certain you are about the next twelve months.",
    verdict:
      "Certain about the year and cash-flow comfortable: HealthRx's prepaid $99 buys the best logistics in our ranking (overnight, lot-tracked). Certain about the year but prefer monthly billing: wellmedr's $59 lock is the best per-month rate anywhere. Not certain yet: embody - $69, no strings, refund if not approved - and revisit the committed options once your first months settle the question. Starting flexible and committing later costs surprisingly little.",
    faqs: [
      {
        question: "Is HealthRx's $99/month real?",
        answer:
          "Yes, with a structure to understand: it's a 12-month prepaid semaglutide plan - $1,188 due at checkout - that works out to $99/month, including the clinician consult, overnight cold-chain shipping and dose adjustments. Tirzepatide plans start at $179/month. HealthRx is LegitScript-certified (cert. 50087439).",
      },
      {
        question: "Which of the three is safest to try first?",
        answer:
          "embody carries the least commitment risk: flat $69/month, cancel anytime, and a full refund if a provider doesn't approve you. That makes it the natural first step if you haven't used GLP-1 medication before and want to confirm fit before committing a year anywhere.",
      },
      {
        question: "What's the cheapest over a full year?",
        answer:
          "At listed rates for semaglutide: wellmedr $708/year ($59 x 12, billed monthly on a 12-month plan), embody $828 ($69 flat), HealthRx $1,188 (prepaid upfront). HealthRx's premium over the other two buys overnight cold-chain delivery on every shipment.",
      },
    ],
  },
  {
    slug: "medvi-vs-healthrx-vs-directmeds",
    providerIds: ["medvi", "healthrx", "directmeds"],
    title: "Medvi vs HealthRx vs DirectMeds: Support, Speed, Simplicity",
    metaTitle: "Medvi vs HealthRx vs DirectMeds (2026): Compared Honestly",
    description:
      "Medvi's high-touch care vs HealthRx's $99 prepaid with overnight shipping vs DirectMeds' flat $147 with needle-free drops - one matrix, real numbers.",
    intro:
      "Three providers, three completely different bets. Medvi bets on people: video visits, dietician, coaching, and 14,372 Trustpilot reviews averaging 4.4. HealthRx bets on logistics: $99/month semaglutide (12-month prepaid, $1,188 at checkout) with overnight cold-chain delivery. DirectMeds bets on simplicity: one flat $147 for either medication, injections or needle-free sublingual drops, no membership. The matrix below puts the three bets side by side.",
    verdict:
      "Choose the bet that matches your bottleneck. If support determines your success, Medvi - its review record is the strongest evidence in this trio. If you've committed to a year and want the sharpest committed price with premium delivery, HealthRx. If you want one predictable number forever - or you need the needle-free format nobody else offers - DirectMeds. All three run licensed clinical review; none is a legitimacy risk.",
    faqs: [
      {
        question: "Which is cheapest: Medvi, HealthRx or DirectMeds?",
        answer:
          "For semaglutide, Medvi and HealthRx both work out to $99/month - but the structures differ: Medvi's is a monthly promotional rate (regularly $199) with no prepay, while HealthRx's is a 12-month prepaid plan with $1,188 due at checkout. DirectMeds charges a flat $147/month. For tirzepatide, DirectMeds' flat $147 leads, with Medvi at $166 promotional (regularly $299) and HealthRx from $179.",
      },
      {
        question: "Which one has a needle-free option?",
        answer:
          "Only DirectMeds - it offers compounded GLP-1 as sublingual oral drops as well as weekly injections, at the same $147/month price. The prescribing doctor decides with you whether the drops format is appropriate.",
      },
      {
        question: "Which delivers fastest?",
        answer:
          "HealthRx ships overnight in temperature-controlled, lot-tracked packaging - free on every plan. DirectMeds ships free in 1-2 days. Medvi includes free shipping on standard timelines.",
      },
    ],
  },
];

export const threeWayBySlug = new Map(THREE_WAY_COMPARISONS.map((t) => [t.slug, t]));
