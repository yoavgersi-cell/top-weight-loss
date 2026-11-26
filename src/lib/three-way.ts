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
    semaglutide: "$49/mo, flat at every dose",
    tirzepatide: "$99/mo",
    billing: "Monthly - no commitment, cancel anytime",
    shipping: "Free expedited delivery, tracked & insured; no timeline guaranteed",
    support: "Licensed doctors, medical director & nursing team",
    guarantee: "Partial refund if not approved (unused portion less services rendered)",
    standout: "LegitScript-certified; 503A pharmacies",
  },
  wellmedr: {
    id: "wellmedr",
    semaglutide: "$41/mo (12-month plan), same price at every dose",
    tirzepatide: "$71/mo",
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
    semaglutide: "Plans from $179/mo (TrimRx site, read Nov 22, 2026); no per-drug price published",
    tirzepatide: "No per-drug price published (TrimRx site, read Nov 22, 2026)",
    billing: "Monthly - no long-term contract; multi-month discounts",
    shipping: "Free home delivery",
    support: "Licensed clinical guidance through dose changes",
    guarantee: "-",
    standout: "Flexibility-first: month-to-month always available",
  },
  medvi: {
    id: "medvi",
    semaglutide: "Plans from $99/mo, all-inclusive (price index, verified Nov 18, 2026)",
    tirzepatide: "No per-drug price listed",
    billing: "Monthly, all-inclusive - no surprise charges; HSA/FSA approved",
    shipping: "Free shipping",
    support: "Video visits + free dietician & care coaching",
    guarantee: "-",
    standout: "All-inclusive price; HSA/FSA approved",
  },
  healthrx: {
    id: "healthrx",
    semaglutide: "$125/mo after a $39 first month (monthly plan)",
    tirzepatide: "$199/mo after a $39 first month (monthly plan)",
    billing: "Monthly until canceled; longer plans cost less per month, tiers not shown",
    shipping: "Free overnight cold-chain, lot-tracked",
    support: "Care-team check-ins; clinician review on every request",
    guarantee: "Free assessment - no payment to start",
    standout: "LegitScript-certified (cert. 50087439); 503A pharmacies",
  },
  directmeds: {
    id: "directmeds",
    semaglutide: "$249/mo sublingual semaglutide",
    tirzepatide: "No tirzepatide price published; injections $297/mo",
    billing: "No subscriptions; 6- and 12-month bulk plans offered, not priced",
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
    standout: "Insurance can cut the medication cost",
  },
  sprout: {
    id: "sprout",
    semaglutide: "from $99/mo compounded on the 12-month plan ($149/mo monthly); brand-name Wegovy from $1,799",
    tirzepatide: "from $149/mo on the 12-month plan ($199/mo monthly)",
    billing: "12-month plan billed upfront, 6- and 3-month plans, or monthly with no commitment",
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
  // Set when the trio's editorial content was last revised; otherwise the
  // template-wide date applies.
  updatedAt?: string;
}

export const THREE_WAY_COMPARISONS: ThreeWayComparison[] = [
  {
    slug: "embody-vs-altrx-vs-medvi",
    providerIds: ["embody", "altrx", "medvi"],
    title: "embody vs altRx vs Medvi: Our Top Three, One Table",
    metaTitle: "embody vs altRx vs Medvi (2026): $49 vs $89 vs $99",
    description:
      "Our three most-compared GLP-1 providers in one matrix: embody ($49 flat, free expedited delivery), altRx ($89 plus a brand-name shelf) and Medvi ($99 all-inclusive).",
    intro:
      "Thirty dollars separates these three, and none of them asks for a commitment - so this comparison is really about what each adds on top of the same compounded semaglutide. embody keeps it lean: $49 flat at every dose, free expedited delivery (no timeline guaranteed), and a partial refund if a provider doesn't approve you (unused portion less services rendered). altRx charges $89 and is the only one with a brand-name shelf - Ozempic, Zepbound and Wegovy at published cash prices - plus Buy Now, Pay Later. Medvi's from-$99 price is all-inclusive with video visits, a free dietician and care coaching.",
    verdict:
      "All three bill monthly with no prepaid term, so the price gap is the honest starting point: $49, $89, $99. Pay the minimum and move fast: embody - cheapest here, quickest shipping, and the refund-if-not-approved policy removes the main risk of trying. Think brand-name Ozempic or Zepbound might be in your future: altRx - it's the only one of the three where that switch happens without changing providers, and BNPL softens the brand prices. Want a person in the loop - video visits, a dietician, someone to call: Medvi. There's no legitimacy gap to worry about: all three run licensed-provider review and dispense through regulated pharmacies.",
    faqs: [
      {
        question: "Which is cheapest: embody, altRx or Medvi?",
        answer:
          "For compounded semaglutide: embody at $49/month flat, then altRx at $89/month promotional (regularly $199), then Medvi at from $99/month all-inclusive. For tirzepatide: embody $99, altRx $149 (regularly $299). All three bill monthly with no prepaid commitment.",
      },
      {
        question: "Can I get brand-name Ozempic, Zepbound or Wegovy from any of them?",
        answer:
          "Only altRx. Alongside its $89/month compounded semaglutide it publishes cash prices for brand-name medication - Ozempic at $1,149, Zepbound at $1,249 and Wegovy at $1,579 per month - with Buy Now, Pay Later available. embody and Medvi focus on compounded GLP-1s.",
      },
      {
        question: "Do any of these require a long-term commitment?",
        answer:
          "No - all three bill month to month. embody adds a partial refund (unused portion less services rendered) if a licensed provider doesn't approve you for treatment, altRx lets you pause or cancel anytime, and Medvi's all-inclusive rate is HSA/FSA approved with no surprise charges.",
      },
    ],
  },
  {
    slug: "embody-vs-altrx-vs-wellmedr",
    providerIds: ["embody", "altrx", "wellmedr"],
    title: "embody vs altRx vs welludr: The Budget GLP-1 Trio",
    metaTitle: "embody vs altRx vs welludr (2026): $49 vs $89 vs $41",
    description:
      "The three cheapest reliable GLP-1 providers compared in one table: embody ($49 flat), altRx ($89 + brand-name shelf) and welludr ($41 with a 12-month plan).",
    intro:
      "These three providers own the budget end of the compounded GLP-1 market, and they get there by different routes: welludr's $41 rewards a 12-month plan, embody's $49 is flat with zero commitment, and altRx's $89 adds the option to switch to brand-name Ozempic or Zepbound later. Same active ingredients across all three - the matrix below is really a comparison of commitment terms, logistics and optionality.",
    verdict:
      "Pick by your commitment appetite. Committed for a year and price-first: welludr's $41 is unbeatable. Want the freedom to stop anytime: embody's flat $49 with free expedited delivery and a partial-refund-if-not-approved policy is the cleanest deal in the market. Think brand-name might be in your future: altRx is the only one of the three with a brand shelf, and its BNPL spreads the cost. There's no wrong answer here on legitimacy - all three run licensed-provider review and regulated pharmacies.",
    faqs: [
      {
        question: "Which of embody, altRx and welludr is cheapest?",
        answer:
          "welludr has the lowest headline price at $41/month for compounded semaglutide, but that rate locks on a 12-month plan. embody charges a flat $49/month with no commitment, and altRx $89/month with pause-anytime terms and Buy Now, Pay Later. On tirzepatide: welludr $71, embody $99, altRx $149.",
      },
      {
        question: "Do all three require a prescription?",
        answer:
          "Yes. All three are telehealth providers where a licensed clinician reviews your medical intake and decides whether GLP-1 treatment is appropriate - approval is not automatic at any of them. Medication is dispensed through licensed pharmacies.",
      },
      {
        question: "Which ships fastest?",
        answer:
          "embody ships free, tracked and insured, with no delivery timeline guaranteed in its Terms. altRx offers free nationwide delivery on standard timelines, and welludr ships free every 4 weeks in discreet packaging aligned to its dosing cycle.",
      },
    ],
  },
  {
    slug: "embody-vs-medvi-vs-wellmedr",
    providerIds: ["embody", "medvi", "wellmedr"],
    title: "embody vs Medvi vs welludr: $49, $99 or $41?",
    metaTitle: "embody vs Medvi vs welludr (2026): $49 vs $99 vs $41",
    description:
      "Three ways to buy the same compounded GLP-1s: embody ($49 flat), Medvi ($99 all-inclusive) and welludr ($41 on a 12-month plan).",
    intro:
      "welludr is the cheapest at $41/month - a rate that locks on a 12-month plan. embody's $49 is flat with zero commitment and a refund if a provider doesn't approve you. Medvi's from-$99 price is the all-inclusive, high-touch option - video visits, free dietician, care coaching.",
    verdict:
      "Decide on commitment first, support second. Ready to commit to a year: welludr - the $41 lock is the best per-month rate in the market, and its weight-loss warranty backs the plan. Not ready to commit to anything: embody - $49 flat, cancel anytime, refunded if not approved. Know from experience that you quit without someone checking in: Medvi - the $30 premium over embody buys video visits, a dietician and coaching. All three prescribe the same compounded semaglutide after a licensed-provider review.",
    faqs: [
      {
        question: "Which is cheapest: embody, Medvi or welludr?",
        answer:
          "For compounded semaglutide: welludr at $41/month (the rate locks on a 12-month plan), embody at $49/month flat with no commitment, Medvi at from $99/month all-inclusive. For tirzepatide: welludr $71, embody $99.",
      },
      {
        question: "Which is best if I don't want a commitment?",
        answer:
          "embody - $49/month flat, billed month to month, cancel anytime, and a partial refund (unused portion less services rendered) if a licensed provider doesn't approve you for treatment. Medvi also bills monthly with no prepaid term. welludr's best rate ($41) requires a 12-month plan.",
      },
      {
        question: "Do any of the three offer a guarantee?",
        answer:
          "welludr backs treatment with a weight-loss warranty (terms on its site), and embody refunds the unused portion, less services rendered, if you're not approved. Medvi doesn't advertise a results guarantee - its pitch is the all-inclusive support model instead.",
      },
    ],
  },
  {
    slug: "altrx-vs-ro-vs-sprout",
    providerIds: ["altrx", "ro", "sprout"],
    title: "altRx vs ro vs Sprout: Three Ways to Brand-Name GLP-1s",
    metaTitle: "altRx vs ro vs Sprout (2026): Brand-Name GLP-1s Compared",
    description:
      "The three providers on our ranking that sell brand-name GLP-1s online: altRx's flat cash prices, ro's membership-plus-insurance model and Sprout's Wegovy shelf.",
    intro:
      "Most GLP-1 comparisons are about compounded medication - this one is about the real branded pens, because these are the three providers in our ranking that publish brand-name pricing, and they sell it three completely different ways. altRx posts flat cash prices next to its $89 compounded plan: Ozempic $1,149, Zepbound $1,249, Wegovy $1,579 a month, with Buy Now, Pay Later. ro sells a membership ($39 the first month, then $74-$149/month) with the medication billed separately - Wegovy pill from $149/month, Zepbound KwikPen from $299 the first month - and it's the one route here where insurance, if it covers you, changes the math completely. Sprout is compounded-first from $99/month on its 12-month plan ($149 month to month) but keeps brand-name Wegovy on the shelf at $1,799 for anyone set on the branded pen, and ships prescriptions within 2 days.",
    verdict:
      "The buying structure decides this one, not the sticker. Any chance your insurance covers GLP-1s: start with ro - membership plus a copay can undercut every cash price on this page. Paying cash and want one flat, published number: altRx - its brand shelf is the cheapest flat-rate Wegovy here and BNPL spreads it, with the $89 compounded plan as the fallback lane. Want compounded speed with a brand option in reserve: Sprout - 2-day fulfillment and the same price at any dose, with the Wegovy shelf there if you upgrade later. Formats and billing differ enough between these three that the right answer is genuinely different per person - check the current price on each site before deciding.",
    faqs: [
      {
        question: "Which has the cheapest brand-name Wegovy?",
        answer:
          "The published structures differ, so compare carefully: altRx lists brand-name Wegovy at a flat $1,579/month cash. Sprout lists it from $1,799/month. ro prices the Wegovy pill from $149/month and the pen from $199 at intro rates (rising to $299-$399/month after), plus its $39-to-$149/month membership - and where insurance covers the medication, ro's route can be the cheapest by far.",
      },
      {
        question: "Do all three also offer compounded semaglutide?",
        answer:
          "altRx ($89/month promotional, flat at every dose) and Sprout (from $99/month on the 12-month plan, $149/month with no commitment) publish flat compounded semaglutide rates. ro's published weight-loss pricing centers on brand-name medication plus its Body membership rather than a flat compounded plan.",
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
    updatedAt: "2026-10-15",
    title: "welludr vs embody vs TrimRx: Price, Freedom, Flexibility",
    metaTitle: "welludr vs embody vs TrimRx (2026): $41 vs $49 vs $179",
    description:
      "welludr ($41 semaglutide, weight-loss warranty) vs embody ($49 flat, free expedited delivery) vs TrimRx (plans from $179, no contract) on real GLP-1 prices.",
    intro:
      "This trio spans the market's price range, from $41 to TrimRx's plans from $179 (site, read Nov 22, 2026), which makes it a clean test of what the extra money buys. welludr sets the floor: $41/month semaglutide and $71 tirzepatide, the same price at every dose, with a weight-loss warranty, a Medical Weight-Care Coach on every plan, and brand-name Ozempic and Zepbound if you ever want them. embody charges $20 more for total freedom - flat, no commitment, free expedited delivery (no timeline guaranteed), a partial refund if you're not approved. TrimRx charges a premium for custom dosing with unlimited provider check-ins and a no-contract model.",
    verdict:
      "welludr is our pick of the three. It has the lowest verified price at every dose and backs the program with a weight-loss warranty. The honest condition: the $41 rate locks on a 12-month plan, so it rewards people who have decided to commit. If you haven't, embody is the right second choice - $49 flat with no commitment, free expedited delivery (no timeline guaranteed), and a partial refund (unused portion less services rendered) if a provider doesn't approve you. TrimRx earns its premium when its specific mix matters to you: custom dosing adjusted by your provider, unlimited check-ins, free consultation, and month-to-month freedom. All three run licensed-provider review and dispense through regulated pharmacies, so there is no legitimacy gap - only a difference in what you are paying for.",
    faqs: [
      {
        question: "Which is best overall: welludr, embody or TrimRx?",
        answer:
          "welludr, on verified pricing: $41/month semaglutide and $71 tirzepatide at every dose, and a weight-loss warranty. Its best rate takes a 12-month plan; if you want no commitment, embody at $49 flat with free expedited delivery is the natural alternative, and TrimRx is the choice if custom dosing with unlimited provider check-ins is worth the premium to you.",
      },
      {
        question: "Why does TrimRx cost more than welludr and embody?",
        answer:
          "TrimRx shows plans from $179/month on its site (read Nov 22, 2026) and publishes no per-drug price we could read. Plans come with no long-term contract, custom dosing set by your provider, unlimited check-ins, a free consultation and tracked delivery included. welludr ($41 on a 12-month plan) and embody ($49 flat) run leaner models at lower prices. All three prescribe the same compounded semaglutide after a licensed-provider review.",
      },
      {
        question: "Which is best if I don't want any commitment?",
        answer:
          "embody - its $49/month is flat with no commitment, and it refunds the unused portion, less services rendered, if a provider doesn't approve treatment. TrimRx is also month-to-month with no contract, with plans from $179. welludr's best rate ($41) locks on a 12-month plan.",
      },
      {
        question: "Do any of the three offer a guarantee?",
        answer:
          "welludr backs treatment with a weight-loss warranty (terms on its site), and embody offers a partial refund if you're not approved (unused portion less services rendered). We could not read TrimRx's guarantee or refund terms on Nov 22, 2026.",
      },
    ],
  },
  {
    slug: "medvi-vs-trimrx-vs-shed",
    providerIds: ["medvi", "trimrx", "shed"],
    title: "Medvi vs TrimRx vs SHED: The Support-Tier Showdown",
    metaTitle: "Medvi vs TrimRx vs SHED (2026): $99-$199 Compared",
    description:
      "The GLP-1 support tier: Medvi's all-inclusive care, TrimRx's no-contract flexibility and SHED's coaching with a money-back guarantee.",
    intro:
      "These three sell more than medication - each wraps the same compounded GLP-1s in a different support philosophy, from Medvi's current from $99 to SHED's $199. Medvi bundles video visits, a dietician and care coaching. TrimRx sells flexibility: no contract, optional discounts, clinical guidance. SHED sells accountability: formal health coaching plus the market's only lose-5%-in-120-days-or-your-money-back guarantee.",
    verdict:
      "Match the model to your failure mode. If past attempts failed for lack of guidance, Medvi's high-touch care is the pick. If you want premium care without being locked to anything, TrimRx. If you need stakes and structure to follow through, SHED's guarantee literally pays you back if the program doesn't deliver. On current pricing Medvi's from-$99 price is also the cheapest of the three - but the support philosophy, not the price, is the real choice.",
    faqs: [
      {
        question: "Is Medvi, TrimRx or SHED better for support?",
        answer:
          "They support differently: Medvi includes video visits with providers plus a free dietician and care coaching; SHED includes formal health coaching backed by a money-back guarantee; TrimRx includes clinical guidance through dose changes with a flexibility-first, no-contract model.",
      },
      {
        question: "Which has a money-back guarantee?",
        answer:
          "SHED - lose 5% of your body weight in 120 days or your money back, conditioned on following the program (terms on its site). We did not find a results guarantee for Medvi, and could not read TrimRx's terms on Nov 22, 2026.",
      },
      {
        question: "Are these worth it over cheaper GLP-1 providers?",
        answer:
          "The active ingredients are the same as the $41-$99 budget tier - the premium buys the support layer. If coaching, accountability or a personal provider relationship is what determines whether you stick with treatment, the tier can pay for itself; if you're self-directed, the budget tier delivers the same medication for less.",
      },
    ],
  },
  {
    slug: "healthrx-vs-embody-vs-wellmedr",
    providerIds: ["healthrx", "embody", "wellmedr"],
    title: "HealthRx vs embody vs welludr: Three Ways to Pay for GLP-1",
    metaTitle: "HealthRx vs embody vs welludr (2026): Pricing Compared",
    description:
      "Three pricing models for the same GLP-1 medication: HealthRx's $125 monthly plan after a $39 first month, embody's $49 flat monthly, welludr's $41 12-month lock - compared honestly.",
    intro:
      "Same compounded semaglutide, three opposite ways to buy it. HealthRx charges $39 for the first month, then $125/month until canceled (longer plans cost less per month, but its pages do not show the tiers), with overnight cold-chain shipping. embody bills $49 monthly with the right to stop anytime. welludr bills monthly too, but its $41 rate locks on a 12-month plan. This is the clearest commitment-structure comparison in the market, and the right answer depends on exactly one thing: how certain you are about the next twelve months.",
    verdict:
      "Want premium delivery and a low first month: HealthRx's $125 monthly plan ($39 first month) buys the best logistics in our ranking (overnight, lot-tracked). Certain about the year and price comes first: welludr's $41 lock is the best per-month rate anywhere. Not certain yet: embody - $49, no strings, refund if not approved - and revisit the committed options once your first months settle the question. Starting flexible and committing later costs surprisingly little.",
    faqs: [
      {
        question: "What does HealthRx cost per month?",
        answer:
          "On its monthly plan HealthRx charges $39 for the first month, then $125/month for semaglutide or $199/month for tirzepatide, until canceled (read November 18, 2026). Its pages say longer plans have a lower monthly price but do not show the tiers. HealthRx is LegitScript-certified (cert. 50087439).",
      },
      {
        question: "Which of the three is safest to try first?",
        answer:
          "embody carries the least commitment risk: flat $49/month, cancel anytime, and a partial refund (unused portion less services rendered) if a provider doesn't approve you. That makes it the natural first step if you haven't used GLP-1 medication before and want to confirm fit before committing a year anywhere.",
      },
      {
        question: "What's the cheapest over a full year?",
        answer:
          "At listed rates for semaglutide: welludr $492/year ($41 x 12, billed monthly on a 12-month plan), embody $588 ($49 flat). HealthRx's monthly plan is $39 for month one and $125 after, which comes to $1,414 for twelve months. HealthRx's premium over the other two buys overnight cold-chain delivery on every shipment.",
      },
    ],
  },
  {
    slug: "medvi-vs-healthrx-vs-directmeds",
    providerIds: ["medvi", "healthrx", "directmeds"],
    title: "Medvi vs HealthRx vs DirectMeds: Support, Speed, Simplicity",
    metaTitle: "Medvi vs HealthRx vs DirectMeds (2026): Compared Honestly",
    description:
      "Medvi's high-touch care vs HealthRx's $125 monthly plan with overnight shipping vs DirectMeds' $249 sublingual semaglutide - one matrix, real GLP-1 prices.",
    intro:
      "Three providers, three completely different bets. Medvi bets on people: video visits, dietician, coaching. HealthRx bets on logistics: $39 first month, then $125/month semaglutide, with overnight cold-chain delivery. DirectMeds bets on simplicity: $249/month for sublingual semaglutide or $297/month for injections, no subscriptions. The matrix below puts the three bets side by side.",
    verdict:
      "Choose the bet that matches your bottleneck. If support determines your success, Medvi. If you want premium delivery and a low first month, HealthRx. If you need the needle-free sublingual format and no subscription, DirectMeds. All three run licensed clinical review; none is a legitimacy risk.",
    faqs: [
      {
        question: "Which is cheapest: Medvi, HealthRx or DirectMeds?",
        answer:
          "For semaglutide, Medvi is from $99/month with no prepay; HealthRx is $125/month after a $39 first month; DirectMeds lists $249/month for sublingual semaglutide. For tirzepatide, Medvi lists no tirzepatide price and HealthRx is $199; DirectMeds publishes no tirzepatide price.",
      },
      {
        question: "Which one has a needle-free option?",
        answer:
          "Only DirectMeds - it offers compounded GLP-1 as sublingual oral drops ($249/month) as well as injections ($297/month). The prescribing doctor decides with you whether the drops format is appropriate.",
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
