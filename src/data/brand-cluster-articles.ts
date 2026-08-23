import type { Article } from "./articles";

// Brand-question clusters (is-X-legit / X-cost / X-alternatives) for every
// weight-loss affiliate provider. House rules for these pieces:
//   - Every fact, price and quote is real - from the provider's published
//     program details or our own config data. Nothing invented, ever.
//   - No shared section skeletons: headings are specific to each provider and
//     each article, never a reusable template.
//   - Dense and useful beats long: concrete numbers, real math, honest
//     trade-offs. Tables only where the data is genuinely tabular.
export const brandClusterArticles: Article[] = [
  // ═════ Medvi ═════
  {
    slug: "is-medvi-legit",
    title: "Is Medvi Legit? What 14,372 Trustpilot Reviews Say (2026)",
    description:
      "Medvi holds a 4.4 on Trustpilot across 14,372 reviews. We read what customers actually praise, checked the medical process, and stress-tested the pricing.",
    category: "Guide",
    readTime: "8 min read",
    publishedAt: "2026-08-06",
    updatedAt: "2026-08-21",
    heroColor: "#EEF4FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Start with the number that's hard to fake",
        body: `<p>Most "is it legit" questions have to be answered from indirect signals. Medvi's case is unusual: there's a large, public dataset. As of this writing, Medvi holds a <strong>4.4 out of 5 on Trustpilot across 14,372 reviews</strong> - a volume that's very difficult to manufacture and large enough that patterns in the reviews mean something.</p><p>So instead of starting with corporate credentials, start there. What do fourteen thousand people keep saying? Reading through them, one theme dominates - and it isn't price. It's the humans. "The phone call was very thorough and everything went smoothly" (Randy). "My provider was very friendly. She answered all my questions very thoughtfully and thoroughly" (Ashley). "She took her time, answered any questions" (Raymond). "Video visit was made very easy and reminders were sent right before my visit" (Martin).</p><p>That pattern - thorough calls, patient providers, easy scheduling - is the fingerprint of a real clinical operation, not a checkout page with a doctor's name on it.</p>`,
      },
      {
        heading: "What actually happens after you sign up",
        body: `<p>Medvi's process runs the way regulators expect legitimate telehealth to run. You complete a medical intake covering your history, current medications and goals. A licensed provider reviews it - this is a real gate, not a formality; providers can and do decline patients for whom GLP-1 treatment isn't appropriate. If prescribed, medication ships free to your door, and treatment continues under regular monitoring: scheduled check-ins, dose adjustments handled by the provider, and the ability to reach your care team between visits.</p><p>Two details worth noticing. First, the video-visit model that reviewers describe means you actually see and talk to your provider - a higher-touch standard than the questionnaire-only intake some competitors run. Second, plans include a <strong>dietician and care coaching</strong>, which is rare at this price tier and matters clinically: GLP-1s change what and how much you eat, and most people benefit from real guidance through that change.</p>`,
      },
      {
        heading: "The pricing passes the transparency test",
        body: `<p>The most common legitimacy failure in this market isn't fake medicine - it's pricing games: teaser rates that balloon at higher doses, membership fees stacked on top of medication, charges that appear at checkout. Medvi's structure is clean:</p><table><tr><th>Plan</th><th>Medication</th><th>What you pay</th></tr><tr><td>GLP-1</td><td>Compounded semaglutide, weekly</td><td>$99/month promo (reg. $199), all-inclusive</td></tr><tr><td>GLP-1 + GIP</td><td>Compounded tirzepatide, weekly</td><td>$166/month promo (reg. $299), all-inclusive</td></tr></table><p>"All-inclusive" here means the medication, the provider consultations, the monitoring, the dietician and coaching, and free shipping - one number, no surprise charges. It's also <strong>HSA/FSA approved</strong>, so pre-tax dollars work. Full plan details are in our <a href="/weight-loss/reviews/medvi">Medvi review</a>.</p>`,
      },
      {
        heading: "Where the skepticism is fair",
        body: `<p>An honest audit has to include the other side of the ledger. Medvi is not the absolute cheapest way to get semaglutide - even at its current $99/month promotion (regularly $199), <a href="/weight-loss/reviews/wellmedr">wellmedr</a> sells the same active ingredient for $59 and <a href="/weight-loss/reviews/embody">embody</a> for $69. But at the promo rate the support-layer premium has shrunk to $30-40/month - at the $199 regular rate it is ~$130, and whether that is worth it is a personal call, not an objective one. Medvi also prescribes compounded medication only - if you specifically want brand-name Ozempic or Zepbound, you need a provider with a brand shelf like <a href="/weight-loss/reviews/altrx">altRx</a>. And its medication menu is narrower than platforms that also prescribe non-GLP-1 options.</p>`,
      },
      {
        heading: "So - is Medvi legit?",
        body: `<p>Yes, and with more public evidence than almost anyone in this market: licensed providers running real video visits, regular monitoring, transparent all-inclusive pricing, HSA/FSA approval, and 14,372 Trustpilot reviews averaging 4.4 that keep describing the same experience - thorough, personal, unhurried care. The open question isn't legitimacy; it's whether you want to pay mid-market prices for high-touch support. If you do, Medvi is arguably the strongest version of that offer.</p><p class="cta-row"><a href="/weight-loss/reviews/medvi">→ Read the full Medvi review, with pricing and real customer reviews</a></p><p class="cta-row"><a href="/weight-loss/healthrx-vs-medvi">→ New: how Medvi stacks up against HealthRx's $99 prepaid plan</a></p><p>This article is general information, not medical advice.</p>`,
      },
    ],
  },
  {
    slug: "medvi-cost",
    title: "Medvi Cost 2026: What $99/Month Actually Buys You",
    description:
      "Medvi currently charges $99/month promotional (reg. $199) for semaglutide and $166 (reg. $299) for tirzepatide, all-inclusive. The full math, what's bundled in, and when a cheaper rival is the smarter buy.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-08-08",
    updatedAt: "2026-08-21",
    heroColor: "#F0FAF5",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "The two numbers, and what “all-inclusive” covers",
        body: `<div class="qa"><strong>The short answer</strong>Medvi currently costs <strong>$99/month for compounded semaglutide</strong> (a promotional rate - regularly $199) or <strong>$166/month for compounded tirzepatide</strong> (regularly $299). That single number covers the medication, provider consultations, regular monitoring, a dietician with care coaching, and free shipping - no membership fee, no dose-based increases, no checkout surprises. HSA/FSA funds are accepted.</div><p>The bundling is the point. At providers that price à la carte, the advertised medication price is the beginning of the bill, not the end of it. Medvi's price is the end of it - which makes it one of the easiest bills in this market to actually budget for.</p>`,
      },
      {
        heading: "A year on Medvi: the honest math",
        body: `<p>Nobody should start a GLP-1 for one month - clinically meaningful results build over months, with dose titration along the way (see <a href="/weight-loss/articles/first-month-weight-loss-medication">what the first month really looks like</a>). So price it like what it is, a recurring commitment:</p><table><tr><th>Timeline</th><th>Semaglutide ($99/mo promo)</th><th>Tirzepatide ($166/mo promo)</th></tr><tr><td>3 months</td><td>$297</td><td>$498</td></tr><tr><td>6 months</td><td>$594</td><td>$996</td></tr><tr><td>12 months</td><td>$1,188</td><td>$1,992</td></tr></table><p>Two things make that math kinder than it looks. Dose increases are already priced in - many rivals charge more as you titrate up, Medvi doesn't. And HSA/FSA eligibility means those figures can effectively shrink by your marginal tax rate if you pay with pre-tax dollars.</p>`,
      },
      {
        heading: "Where $99 sits in the market",
        body: `<p>Against the rest of our ranking, at each provider's real listed prices:</p><table><tr><th>Provider</th><th>Semaglutide</th><th>Tirzepatide</th><th>Pricing model</th></tr><tr><td>wellmedr</td><td>$59/mo</td><td>$99/mo</td><td>12-month lock for best rate</td></tr><tr><td>embody</td><td>$69/mo</td><td>$119/mo</td><td>Flat monthly, no commitment</td></tr><tr><td>altRx</td><td>$89/mo</td><td>$149/mo</td><td>Flat at every dose, BNPL</td></tr><tr><td>HealthRx</td><td>$99/mo</td><td>from $179/mo</td><td>12-month prepaid ($1,188 upfront)</td></tr><tr><td>DirectMeds</td><td>$147/mo</td><td>$147/mo</td><td>Flat, needle-free option</td></tr><tr><td><strong>Medvi</strong></td><td><strong>$99/mo promo (reg. $199)</strong></td><td><strong>$166/mo promo (reg. $299)</strong></td><td>Monthly all-inclusive + coaching</td></tr><tr><td>SHED</td><td>$199/mo</td><td>$299/mo</td><td>Coaching + money-back guarantee</td></tr></table><p>At its regular $199/$299 rates Medvi prices near the top of the compounded market - but the current $99/$166 promotion drops it into the value tier while keeping the bundle. The fair question is what the premium (if any) buys. The answer, per its own 14,372 Trustpilot reviews at 4.4: the human layer - video visits, thorough providers, dietician support. Nobody in the cheaper tier bundles that.</p>`,
      },
      {
        heading: "When Medvi is worth it - and when it isn't",
        body: `<p><strong>Worth it:</strong> if support determines whether you succeed. If you've tried medication-only approaches and stalled, if you want a provider who takes the call rather than an inbox, if a dietician guiding your food changes sounds like the missing piece - that's Medvi's actual product, and its review record says it delivers.</p><p><strong>Not worth it:</strong> if you're self-directed and price-sensitive. The same semaglutide runs $59-$99 at <a href="/weight-loss/reviews/wellmedr">wellmedr</a>, <a href="/weight-loss/reviews/embody">embody</a> and <a href="/weight-loss/reviews/healthrx">HealthRx</a>; over a year the gap is four figures. The medication doesn't know what you paid for it - the difference is entirely in the care around it.</p><p class="cta-row"><a href="/weight-loss/healthrx-vs-medvi">→ The closest call: HealthRx's $99 prepaid vs Medvi's $99 promo, compared</a></p><p>This article is general information, not medical advice. Prices as listed at the time of writing - confirm current pricing on each provider's site.</p>`,
      },
    ],
  },
  {
    slug: "medvi-alternatives",
    title: "Medvi Alternatives 2026: 6 Real Options, Priced & Compared",
    description:
      "Six alternatives to Medvi's all-inclusive program (now $99/month promotional) - from wellmedr at $59 to HealthRx's $99 prepaid plan - with the honest trade-off each one asks you to make.",
    category: "Comparison",
    readTime: "7 min read",
    publishedAt: "2026-08-10",
    updatedAt: "2026-08-21",
    heroColor: "#FBF3EE",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Know what you'd be giving up first",
        body: `<p>Medvi's pitch is specific: one all-inclusive price - currently $99/month promotional (regularly $199) - buys video visits with providers its 14,372 Trustpilot reviewers rate 4.4, plus a dietician and care coaching bundled in. At the promo rate few alternatives are meaningfully cheaper, and every one of them trades away some slice of that support layer. Naming the trade before you switch keeps you from discovering it after.</p><p>The honest map of who leaves Medvi and why: people who realized they're self-directed (price shoppers), people who want brand-name medication (shelf shoppers), and people who want faster fulfillment or a needle-free format (logistics shoppers). Each has a different best alternative.</p>`,
      },
      {
        heading: "For price shoppers: wellmedr, embody and HealthRx",
        body: `<p><a href="/weight-loss/reviews/wellmedr">wellmedr</a> is the floor of the reliable market: <strong>$59/month semaglutide, $99 tirzepatide</strong>, same price at every dose, with a coach still included and a weight-loss warranty behind it. The best rate rewards a 12-month plan. <a href="/weight-loss/reviews/embody">embody</a> costs $10 more ($69/$119) and buys total freedom - flat monthly price, no commitment, free 1-2 day shipping, and a full refund if a provider doesn't approve you.</p><p>The new entry is <a href="/weight-loss/reviews/healthrx">HealthRx</a>: <strong>$99/month semaglutide on a 12-month prepaid plan</strong> ($1,188 at checkout), LegitScript-certified, with free overnight cold-chain shipping. It's the middle path - $80/month cheaper than Medvi, faster delivery, but you're committing a year upfront to a newer brand. We compared them head-to-head in <a href="/weight-loss/healthrx-vs-medvi">HealthRx vs Medvi</a>.</p>`,
      },
      {
        heading: "For shelf and format shoppers: altRx and DirectMeds",
        body: `<p><a href="/weight-loss/reviews/altrx">altRx</a> is the pick if you might want brand-name medication: alongside $89/$149 compounded plans (flat at every dose), it stocks Ozempic at $1,149, Zepbound at $1,249 and Wegovy at $1,579 - the cheapest brand shelf in our ranking - with Buy Now, Pay Later to spread costs. <a href="/weight-loss/reviews/directmeds">DirectMeds</a> owns two niches: a flat <strong>$147/month for either medication</strong> (its tirzepatide price beats Medvi's by $102), and the only needle-free sublingual drops option in this comparison, shipped free in 1-2 days with no membership.</p>`,
      },
      {
        heading: "For support shoppers: SHED is the only upgrade",
        body: `<p>If you're leaving Medvi because you want <em>more</em> structure rather than less, only one direction exists: <a href="/weight-loss/reviews/shed">SHED</a> at $199/$299 (20% off month one) bundles formal health coaching with every plan, takes HSA/FSA, and backs the program with the firmest promise in the market - <strong>lose 5% of your body weight in 120 days or your money back</strong>. It's the accountability play: a provider with financial skin in your outcome.</p>`,
      },
      {
        heading: "The full picture in one table",
        body: `<table><tr><th>Provider</th><th>Semaglutide</th><th>Tirzepatide</th><th>The trade-off vs Medvi</th></tr><tr><td>wellmedr</td><td>$59/mo</td><td>$99/mo</td><td>Leaner support, 12-mo lock for best rate</td></tr><tr><td>embody</td><td>$69/mo</td><td>$119/mo</td><td>No dietician layer; fastest to start</td></tr><tr><td>altRx</td><td>$89/mo</td><td>$149/mo</td><td>Self-serve model; adds brand-name shelf</td></tr><tr><td>HealthRx</td><td>$99/mo*</td><td>from $179/mo</td><td>$1,188 prepaid; overnight shipping</td></tr><tr><td>DirectMeds</td><td>$147/mo</td><td>$147/mo</td><td>Medication-first; adds needle-free drops</td></tr><tr><td>SHED</td><td>$199/mo</td><td>$299/mo</td><td>Costs more; adds guarantee + coaching</td></tr></table><p>*12-month prepaid plan. Every provider here requires a licensed-provider review before prescribing - that part never varies, and shouldn't.</p><p class="cta-row"><a href="/weight-loss/find-your-match">→ 60 seconds, one personalized recommendation: take the matching quiz</a></p><p>This article is general information, not medical advice. Prices as listed at the time of writing.</p>`,
      },
    ],
  },
  // ═════ wellmedr ═════
  {
    slug: "is-wellmedr-legit",
    title: "Is wellmedr Legit? The $59 GLP-1 Question, Answered (2026)",
    description:
      "A $59/month GLP-1 sounds too cheap to be real. We traced where wellmedr's price comes from, who's prescribing, and what the warranty actually promises.",
    category: "Guide",
    readTime: "8 min read",
    publishedAt: "2026-08-11",
    updatedAt: "2026-08-21",
    heroColor: "#EEF7FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "\"Too cheap to be legit\" - let's test that",
        body: `<p>wellmedr sells compounded semaglutide for <strong>$59 a month</strong> while brand-name Wegovy runs over $1,300 without insurance. A 20x price gap triggers a reasonable instinct: something must be wrong. So this piece works backwards - instead of asking "is wellmedr legit," we traced each place a scam would cut corners, and checked what wellmedr actually does there.</p><p><strong>Who prescribes?</strong> Board-certified specialists review a real medical intake before anything ships - and can decline. <strong>Who makes the medication?</strong> US state-licensed pharmacies working under federal compounding standards, the same 503A framework the FDA regulates (see <a href="/weight-loss/articles/compounded-semaglutide-vs-brand-name">how compounding actually works</a>). <strong>Who's accountable after the sale?</strong> Every plan includes ongoing medical oversight and a Medical Weight-Care Coach, with provider messaging anytime. None of those are corners a fly-by-night operation pays for.</p>`,
      },
      {
        heading: "Where the $59 really comes from",
        body: `<p>The price has a structural explanation, not a suspicious one - three ingredients:</p><p><strong>1. Compounding economics.</strong> The active ingredient itself isn't what makes brand-name GLP-1s expensive; the brand premium is. Compounded semaglutide across our entire ranking runs $59-$199/month. wellmedr sits at the aggressive end of a normal range, not outside it.</p><p><strong>2. Scale.</strong> wellmedr reports over <strong>one million patients</strong>. High volume is precisely what lets a telehealth operator run thin margins - and a million-patient operation has too much to lose to risk regulatory action on shortcuts.</p><p><strong>3. Commitment pricing.</strong> The headline $59 locks in on a 12-month plan - wellmedr's "lock in $200 off every month, for life" offer. Do the math on that: <strong>$59 x 12 = $708 for a full year</strong> of semaglutide treatment with coach and oversight included. That's less than four months at mid-market rates.</p>`,
      },
      {
        heading: "The dose-creep trap it doesn't spring",
        body: `<p>Here's an industry mechanic most first-time buyers don't know: GLP-1 treatment starts at a low dose and titrates up over several months. Providers that price per-dose advertise the starting-dose price - and your bill climbs exactly when you're most committed. wellmedr charges the <strong>same price at every dose</strong>: $59 semaglutide, $99 tirzepatide, whether you're on week two or month eight. Shipments arrive every 4 weeks in discreet, unbranded packaging, and you can change or cancel anytime within your plan's terms.</p><p>It also stocks brand-name for those who want it - Ozempic from $1,399 and Zepbound from $1,599 - though at those prices, <a href="/weight-loss/reviews/altrx">altRx's brand shelf</a> undercuts it.</p>`,
      },
      {
        heading: "What about the weight-loss warranty?",
        body: `<p>wellmedr backs treatment with a weight-loss warranty - a results-linked promise that a business planning to disappoint customers couldn't afford to make. Read the terms on their site before you count on it (every warranty has conditions), but as a legitimacy signal it points the right way: the company is betting its money that the clinical outcomes will show up.</p>`,
      },
      {
        heading: "The verdict, and who should still pay more",
        body: `<p>wellmedr is legitimate - the low price is a business model, not a red flag. Licensed specialists, regulated pharmacies, a million-patient track record, dose-stable pricing and a warranty check every box we audit. Who should still look elsewhere? People who want high-touch video-visit care (that's <a href="/weight-loss/reviews/medvi">Medvi's</a> product, currently $99 promotional), people unwilling to commit 12 months for the best rate (<a href="/weight-loss/reviews/embody">embody</a> is flat $69 with zero commitment), and anyone set on brand-name from day one.</p><p class="cta-row"><a href="/weight-loss/reviews/wellmedr">→ Full wellmedr review: plans, warranty details and customer feedback</a></p><p>This article is general information, not medical advice.</p>`,
      },
    ],
  },
  {
    slug: "wellmedr-cost",
    title: "wellmedr Cost 2026: The Full $59/Month Math, Dose by Dose",
    description:
      "wellmedr's real cost: $59/month semaglutide and $99 tirzepatide at every dose, $708 for a full year. How the lock-in works and where brand-name fits.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-21",
    heroColor: "#F3EEFB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Every wellmedr price on one screen",
        body: `<div class="qa"><strong>Bottom line first</strong>wellmedr's compounded plans run <strong>$59/month (semaglutide)</strong> and <strong>$99/month (tirzepatide)</strong> - the same price at every dose, shipped every 4 weeks, with a Medical Weight-Care Coach and provider oversight included. The $59 rate locks on a 12-month plan. Brand-name is stocked too: Ozempic from $1,399, Zepbound from $1,599.</div><table><tr><th>Plan</th><th>What it is</th><th>Price</th></tr><tr><td>GLP-1</td><td>Compounded semaglutide, weekly injection</td><td>$59/mo (12-month lock)</td></tr><tr><td>GLP-1/GIP</td><td>Compounded tirzepatide, weekly injection</td><td>$99/mo</td></tr><tr><td>Ozempic</td><td>Brand-name semaglutide</td><td>from $1,399/mo</td></tr><tr><td>Zepbound</td><td>Brand-name tirzepatide</td><td>from $1,599/mo</td></tr></table>`,
      },
      {
        heading: "What a year actually costs - versus everyone else",
        body: `<p>Because GLP-1 treatment is measured in months, annual cost is the honest unit. At listed starting prices for semaglutide:</p><table><tr><th>Provider</th><th>Monthly</th><th>12 months</th></tr><tr><td><strong>wellmedr</strong></td><td><strong>$59</strong></td><td><strong>$708</strong></td></tr><tr><td>embody</td><td>$69</td><td>$828</td></tr><tr><td>altRx</td><td>$89</td><td>$1,068</td></tr><tr><td>HealthRx</td><td>$99 (prepaid)</td><td>$1,188 upfront</td></tr><tr><td>DirectMeds</td><td>$147</td><td>$1,764</td></tr><tr><td>Medvi</td><td>$99 (promo; reg. $199)</td><td>$1,188</td></tr><tr><td>SHED</td><td>$199</td><td>$2,388</td></tr></table><p>wellmedr wins the year at $708 - and notice the fine print advantage over its nearest structural rival: <a href="/weight-loss/reviews/healthrx">HealthRx</a> gets to $99/month only by charging $1,188 at checkout, while wellmedr's lock-in bills monthly. You commit either way; you don't front a lump sum.</p>`,
      },
      {
        heading: "Is the 12-month lock a trap?",
        body: `<p>It's a bet, and you should price it as one. Clinically, the bet is usually sound: meaningful GLP-1 results build over 3-6+ months, and stopping early typically means regaining (see <a href="/weight-loss/articles/stopping-glp1-medication-what-happens">what happens when you stop</a>). If you're confident in the year, the lock is simply the best per-month rate in our ranking. If you're experimenting, don't lock - pay $10/month more at <a href="/weight-loss/reviews/embody">embody</a> for the right to walk away anytime, and revisit once you know the medication suits you.</p>`,
      },
      {
        heading: "The dose-stability clause, priced out",
        body: `<p>Semaglutide treatment typically escalates through several dose steps before maintenance, and providers that price per-dose quietly reprice you upward exactly when quitting feels hardest. wellmedr's same-price-at-every-dose rule removes that risk entirely: the $59 you model in month one is the $59 you pay at maintenance. When a rival quotes you less, ask one question - "at my maintenance dose, what's the number?" - and re-run the comparison. In our checks, dose-stable pricing is worth $20-$60/month against per-dose competitors by the mid-titration months, which is why we treat it as a pricing feature, not a footnote.</p><p>Same logic applies to the brand lane: wellmedr's Ozempic (from $1,399) and Zepbound (from $1,599) exist for patients who need the FDA-approved product specifically - but if brand-name is your plan, <a href="/weight-loss/reviews/altrx">altRx's shelf</a> starts $250/month lower, and switching lanes there doesn't require switching providers later.</p>`,
      },
      {
        heading: "Three ways to squeeze the price further",
        body: `<p><strong>Start on semaglutide, not tirzepatide.</strong> The $40/month gap adds to $480/year, and semaglutide remains a first-line choice for most starters - your provider will steer you if tirzepatide fits better (the trade-offs: <a href="/weight-loss/articles/tirzepatide-vs-semaglutide">tirzepatide vs semaglutide</a>). <strong>Skip brand-name unless you need it.</strong> Same active ingredient, 20x price difference. <strong>Check HSA/FSA rules.</strong> Medical weight-loss treatment often qualifies for pre-tax payment, which effectively discounts every figure above by your tax rate.</p><p class="cta-row"><a href="/weight-loss/reviews/wellmedr">→ Full wellmedr review with the warranty details</a></p><p>This article is general information, not medical advice. Prices as listed at the time of writing - confirm current pricing on the provider's site.</p>`,
      },
    ],
  },
  {
    slug: "wellmedr-alternatives",
    title: "wellmedr Alternatives 2026: What Beats $59/Month, and How",
    description:
      "Nothing undercuts wellmedr's $59/month - so every alternative competes on something else. Six rivals compared on the specific thing each does better.",
    category: "Comparison",
    readTime: "7 min read",
    publishedAt: "2026-08-15",
    updatedAt: "2026-08-21",
    heroColor: "#FBEEF4",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Nobody beats the price. So what's left to beat?",
        body: `<p>Let's be precise about what shopping against wellmedr means: at $59/month semaglutide and $99 tirzepatide, <strong>no provider in our ranking undercuts it</strong>. Every legitimate alternative therefore competes on a different axis - commitment terms, delivery speed, medication shelf, support depth, or format. That's the useful frame: don't ask "what's cheaper," ask "what specifically would I pay more for?"</p>`,
      },
      {
        heading: "Pay $10 more for freedom: embody",
        body: `<p>wellmedr's best rate wants a 12-month plan. <a href="/weight-loss/reviews/embody">embody</a> charges a flat <strong>$69/month</strong> (tirzepatide $119) with no commitment of any kind, ships free in 1-2 days tracked and insured, is LegitScript-certified, and refunds you fully if a provider doesn't approve treatment. Over a year that freedom costs exactly $120. For anyone not ready to commit, it's the obvious first alternative - the direct matchup is in <a href="/weight-loss/embody-vs-wellmedr">embody vs wellmedr</a>.</p>`,
      },
      {
        heading: "Pay for speed: HealthRx",
        body: `<p><a href="/weight-loss/reviews/healthrx">HealthRx</a> matches wellmedr's commitment logic (12 months) but flips the delivery promise: <strong>free overnight cold-chain shipping</strong>, lot-tracked to your door, at $99/month semaglutide - prepaid as $1,188 at checkout. You pay $480/year over wellmedr for overnight fulfillment and LegitScript certification on a newer brand. Worth it if delivery reliability ranks high for you; not if the lump-sum checkout stings.</p>`,
      },
      {
        heading: "Pay for options: altRx - or for format: DirectMeds",
        body: `<p><a href="/weight-loss/reviews/altrx">altRx</a> at $89/$149 (flat at every dose) is the optionality play: the ranking's cheapest brand-name shelf (Ozempic $1,149, Zepbound $1,249, Wegovy $1,579) plus Buy Now, Pay Later - the right home if you suspect brand-name is in your future. <a href="/weight-loss/reviews/directmeds">DirectMeds</a> is the format play: flat $147 for either medication, and the only <strong>needle-free sublingual drops</strong> in this group. If injections are the reason you haven't started, no price at wellmedr fixes that - drops do.</p>`,
      },
      {
        heading: "Pay for people: Medvi and SHED",
        body: `<p>wellmedr includes a coach, but its model is built lean. If human support is your success factor, <a href="/weight-loss/reviews/medvi">Medvi</a> ($99/$166 promotional, all-inclusive) runs video visits with providers that 14,372 Trustpilot reviewers score 4.4, plus a dietician on every plan. <a href="/weight-loss/reviews/shed">SHED</a> ($199/$299, 20% off month one, HSA/FSA) adds formal coaching and the market's hardest guarantee: 5% of your body weight in 120 days or your money back - which, notably, out-promises even wellmedr's warranty.</p><table><tr><th>Alternative</th><th>Semaglutide</th><th>What it beats wellmedr on</th></tr><tr><td>embody</td><td>$69/mo</td><td>Zero commitment, 1-2 day shipping, refund policy</td></tr><tr><td>altRx</td><td>$89/mo</td><td>Brand-name shelf, BNPL</td></tr><tr><td>HealthRx</td><td>$99/mo*</td><td>Overnight cold-chain delivery</td></tr><tr><td>DirectMeds</td><td>$147/mo</td><td>Needle-free drops, flat tirzepatide</td></tr><tr><td>Medvi</td><td>$99/mo promo</td><td>Video visits, dietician, 14k-review record</td></tr><tr><td>SHED</td><td>$199/mo</td><td>Coaching + 120-day money-back guarantee</td></tr></table><p>*12-month prepaid. If none of those axes matters to you - stay put; the price king is the price king.</p><p class="cta-row"><a href="/weight-loss/find-your-match">→ Let the quiz weigh your priorities: get a personalized match</a></p><p>This article is general information, not medical advice. Prices as listed at the time of writing.</p>`,
      },
    ],
  },
  // ═════ trimrx ═════
  {
    slug: "is-trimrx-legit",
    title: "Is trimrx Legit? The No-Contract GLP-1 Model, Examined (2026)",
    description:
      "trimrx sells GLP-1 treatment with no long-term contract - unusual in this market. We examined its clinical gate, its $179 pricing, and where it fits.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-08-07",
    updatedAt: "2026-08-21",
    heroColor: "#F0FAF5",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "The contract question is the tell",
        body: `<p>Here's a useful heuristic for judging telehealth weight-loss companies: look at what happens when you try to leave. Operations built on trapping customers hide terms, auto-renew aggressively, and make cancellation a phone maze. trimrx's answer to the leave question is its defining feature: <strong>no long-term contract, ever</strong>. Month-to-month is always available; multi-month plans exist purely as optional discounts.</p><p>A company that lets you leave freely is betting you'll stay because treatment works. That structural honesty is the first legitimacy signal - and the rest of the operation backs it up.</p>`,
      },
      {
        heading: "The clinical gate, inspected",
        body: `<p>trimrx runs the full clinical pipeline a legitimate prescriber must: an online health assessment covering history, medications and contraindications; review by a licensed clinician with genuine authority to decline; and - if appropriate - a prescription for compounded semaglutide or tirzepatide with clinical support continuing through dose changes. The process is 100% online with no clinic visit, and support isn't a one-time consult: guidance continues as you titrate, which is when most questions actually arise.</p>`,
      },
      {
        heading: "What $179 buys, and the discount worth knowing",
        body: `<table><tr><th>Plan</th><th>Medication</th><th>Price</th></tr><tr><td>GLP-1</td><td>Compounded semaglutide, weekly</td><td>$179/mo (reg. $299)</td></tr><tr><td>GLP-1 + GIP</td><td>Compounded tirzepatide, weekly</td><td>$259/mo</td></tr></table><p>The plan covers medication, provider consultations and ongoing support - self-pay, no insurance needed. Two pricing notes worth acting on: the $179 already reflects a discount from the $299 list rate, and <strong>multi-month commitments cut the monthly further</strong> - trimrx's one concession to commitment pricing, offered as a choice rather than a requirement.</p>`,
      },
      {
        heading: "Fair criticisms - and who they matter to",
        body: `<p>The budget tier undercuts trimrx significantly: the same semaglutide runs $59-$99 at <a href="/weight-loss/reviews/wellmedr">wellmedr</a>, <a href="/weight-loss/reviews/embody">embody</a> and <a href="/weight-loss/reviews/healthrx">HealthRx</a> - though each asks for either commitment or a leaner service in exchange. trimrx is compounded-only, so brand-name shoppers need <a href="/weight-loss/reviews/altrx">altRx</a>. And it offers no headline guarantee - no money-back promise like SHED's, no refund-if-not-approved like embody's. If a safety net is what gets you to start, that's a real gap.</p>`,
      },
      {
        heading: "Verdict: legit, and specifically for whom",
        body: `<p>trimrx is a legitimate mid-market GLP-1 provider - licensed clinical gate, real ongoing support, transparent pricing, and the market's cleanest exit terms. Its natural customer is someone who values flexibility enough to pay mid-tier prices for it, and doesn't need hand-holding or a guarantee. If that's you, it earns its spot. If price rules, the budget tier wins; if support rules, <a href="/weight-loss/medvi-vs-trimrx">Medvi - currently cheaper at its $99 promo - makes a different offer</a> - that comparison is the most instructive one in trimrx's bracket.</p><p class="cta-row"><a href="/weight-loss/reviews/trimrx">→ Full trimrx review: plans, discounts and fine print</a></p><p>This article is general information, not medical advice.</p>`,
      },
    ],
  },
  {
    slug: "trimrx-cost",
    title: "trimrx Cost 2026: $179 Explained - List Price, Discounts, Math",
    description:
      "trimrx charges $179/month for semaglutide (list $299) and $259 for tirzepatide, no contract required. The discount structure and year-cost math, laid out.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-08-09",
    updatedAt: "2026-08-21",
    heroColor: "#EEF4FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "The price, and the discount already inside it",
        body: `<div class="qa"><strong>At a glance</strong>trimrx runs <strong>$179/month for compounded semaglutide</strong> - already discounted from a $299 list rate - and <strong>$259/month for tirzepatide</strong>, with medication, provider consultations and ongoing clinical support included. No long-term contract; multi-month plans lower the monthly further.</div><p>Self-pay, no insurance, 100% online. The number to anchor on: staying month-to-month costs $179 with total freedom to stop; committing several months at once trades some of that freedom for a lower rate - trimrx is unusual in letting you choose per renewal rather than at signup.</p>`,
      },
      {
        heading: "Same sticker, different products: the $179 tier",
        body: `<p>The market moved these two apart: trimrx's $179 first-month semaglutide now faces <a href="/weight-loss/reviews/medvi">Medvi</a> at a $99 promotional rate - and they sell nearly opposite products. Medvi spends the money on high-touch care: video visits, a dietician, coaching, a 4.4 Trustpilot record across 14,372 reviews. trimrx spends it on flexibility: no contract, optional discounts, a leaner clinical-support model. The choice is about what you value - the full head-to-head is in <a href="/weight-loss/medvi-vs-trimrx">Medvi vs trimrx</a>.</p><table><tr><th>Provider</th><th>Semaglutide</th><th>Tirzepatide</th><th>Model</th></tr><tr><td>wellmedr</td><td>$59/mo</td><td>$99/mo</td><td>12-mo lock for best rate</td></tr><tr><td>embody</td><td>$69/mo</td><td>$119/mo</td><td>Flat, no commitment</td></tr><tr><td>altRx</td><td>$89/mo</td><td>$149/mo</td><td>Flat + brand shelf</td></tr><tr><td>HealthRx</td><td>$99/mo*</td><td>from $179</td><td>12-mo prepaid</td></tr><tr><td>DirectMeds</td><td>$147/mo</td><td>$147/mo</td><td>Flat, drops option</td></tr><tr><td><strong>trimrx</strong></td><td><strong>$179/mo</strong></td><td><strong>$259/mo</strong></td><td>No contract, opt-in discounts</td></tr><tr><td>Medvi</td><td>$99/mo promo (reg. $199)</td><td>$166/mo promo (reg. $299)</td><td>All-inclusive high-touch</td></tr></table><p>*prepaid annual. One column worth a second look: on tirzepatide, trimrx's $259 is beaten by $112/month at DirectMeds - if tirzepatide is your medication, that gap compounds fast.</p>`,
      },
      {
        heading: "How the multi-month discounts actually work",
        body: `<p>trimrx's discount structure rewards commitment without demanding it, and the mechanics matter when budgeting. Month-to-month, you pay the listed $179/$259 with the right to stop at any renewal. Choose a multi-month plan and the per-month rate drops below the listed price - the exact rates are shown at signup and vary by plan length. The strategic play most patients miss: these aren't mutually exclusive forever. Start month-to-month while you and your clinician confirm the medication and dose suit you - the first 8-12 weeks answer that - then switch to a multi-month rate once the uncertainty is gone. You pay a small premium for exactly the months where flexibility has value, and stop paying it the moment it doesn't.</p><p>One number to keep handy while deciding: the titration timeline in <a href="/weight-loss/articles/how-long-for-semaglutide-to-work">how long semaglutide takes to work</a> - it tells you when your own uncertainty window closes.</p>`,
      },
      {
        heading: "What a flexible year costs - and when it's worth it",
        body: `<p>Month-to-month for a year: <strong>$2,148</strong> (semaglutide). Against wellmedr's locked $708, flexibility costs about $1,440/year - the honest number to stare at. It's worth paying when your circumstances genuinely might change: income uncertainty, a possible switch to brand-name, or you're still confirming the medication suits you in the first months. It's not worth paying indefinitely: once you know you're staying, either take trimrx's own multi-month discount or move down-market. Flexibility you no longer need is just margin you're donating.</p><p class="cta-row"><a href="/weight-loss/reviews/trimrx">→ Current plans and multi-month rates in the trimrx review</a></p><p>This article is general information, not medical advice. Prices as listed at the time of writing - confirm current pricing on the provider's site.</p>`,
      },
    ],
  },
  {
    slug: "trimrx-alternatives",
    title: "trimrx Alternatives 2026: Cheaper, Faster, or More Support",
    description:
      "Six trimrx alternatives sorted by what you actually want to change - price, tirzepatide cost, delivery speed, brand-name access, or support depth.",
    category: "Comparison",
    readTime: "6 min read",
    publishedAt: "2026-08-12",
    updatedAt: "2026-08-21",
    heroColor: "#FBF3EE",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Diagnose the itch before switching",
        body: `<p>trimrx's deal is specific - mid-market price, zero lock-in, solid clinical support. People shop for alternatives for exactly four reasons: the $179 feels high for what they use, the $259 tirzepatide is objectively beatable, they want a guarantee or deeper support, or brand-name medication has entered the picture. Each reason has one best answer, so let's take them in order rather than listing providers at random.</p>`,
      },
      {
        heading: "\"$179 is too much\" → the sub-$100 tier",
        body: `<p>Three credible ways down: <a href="/weight-loss/reviews/wellmedr">wellmedr</a> at <strong>$59/month</strong> (12-month lock for the best rate, coach and warranty included), <a href="/weight-loss/reviews/embody">embody</a> at <strong>$69 flat</strong> - keeping trimrx's no-commitment spirit while cutting the price by $110 - and <a href="/weight-loss/reviews/healthrx">HealthRx</a> at <strong>$99 prepaid</strong> ($1,188 upfront) with overnight cold-chain shipping. Note what each trades: wellmedr wants the year, embody runs leaner support, HealthRx wants the lump sum. embody is the closest philosophical match - see <a href="/weight-loss/embody-vs-trimrx">embody vs trimrx</a>.</p>`,
      },
      {
        heading: "\"Tirzepatide is bleeding me\" → DirectMeds",
        body: `<p>The starkest arbitrage in this comparison: trimrx tirzepatide costs $259; <a href="/weight-loss/reviews/directmeds">DirectMeds</a> charges a flat <strong>$147 for the same active ingredient</strong> - $1,344 less per year - at every dose, with free 1-2 day shipping and no membership. It also offers needle-free sublingual drops, unique in this group. The trade: a medication-first service without trimrx's ongoing clinical-support layer.</p>`,
      },
      {
        heading: "What switching actually involves (less than you think)",
        body: `<p>A practical note that changes the calculus: switching GLP-1 telehealth providers is administratively cheap. There's no records transfer to fight for - you complete the new provider's medical intake (5-10 minutes), disclose that you're currently on a GLP-1 and your current dose, and their clinician decides whether to continue you at that dose or adjust. Because trimrx has no long-term contract, there's no exit fee and no buyout - your only real switching costs are timing the shipments so you don't gap your doses, and re-answering an intake. That low friction is worth remembering in both directions: it makes trying a cheaper provider low-risk, and it means staying at trimrx should be a positive choice, not inertia.</p>`,
      },
      {
        heading: "\"I want more behind me\" → Medvi or SHED / \"brand-name\" → altRx",
        body: `<p>For support: <a href="/weight-loss/reviews/medvi">Medvi</a> - now $99 promotional - swaps flexibility for depth - video visits, dietician, coaching, and 14,372 Trustpilot reviews averaging 4.4. <a href="/weight-loss/reviews/shed">SHED</a> ($199, 20% off month one) adds the market's only hard results promise: 5% of body weight in 120 days or your money back. For medication choice: <a href="/weight-loss/reviews/altrx">altRx</a> ($89/$149 flat) stocks the cheapest brand shelf here - Ozempic $1,149, Zepbound $1,249, Wegovy $1,579 - with BNPL; the matchup is in <a href="/weight-loss/altrx-vs-trimrx">altRx vs trimrx</a>.</p><table><tr><th>If you want...</th><th>Go to</th><th>Price</th><th>You give up</th></tr><tr><td>Lowest price</td><td>wellmedr</td><td>$59/mo</td><td>12-mo commitment for best rate</td></tr><tr><td>Cheap + no commitment</td><td>embody</td><td>$69/mo</td><td>Leaner support</td></tr><tr><td>Overnight delivery</td><td>HealthRx</td><td>$99/mo*</td><td>$1,188 prepaid</td></tr><tr><td>Cheap tirzepatide / no needles</td><td>DirectMeds</td><td>$147/mo</td><td>Support depth</td></tr><tr><td>High-touch care</td><td>Medvi</td><td>$99/mo promo</td><td>Very little - currently cheaper than trimrx</td></tr><tr><td>A results guarantee</td><td>SHED</td><td>$199/mo</td><td>$20/mo more</td></tr></table><p>*prepaid annual plan.</p><p class="cta-row"><a href="/weight-loss/find-your-match">→ Or answer 6 questions and let the quiz sort it: find your match</a></p><p>This article is general information, not medical advice. Prices as listed at the time of writing.</p>`,
      },
    ],
  },
  // ═════ altRx ═════
  {
    slug: "is-altrx-legit",
    title: "Is altRx Legit? Inside the Two-Lane GLP-1 Model (2026)",
    description:
      "altRx sells $89 compounded plans and $1,149+ brand-name Ozempic side by side. We examined who prescribes, how the flat-dose pricing works, and the catches.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-08-08",
    updatedAt: "2026-08-21",
    heroColor: "#EEF7FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "The unusual thing altRx does",
        body: `<p>Most GLP-1 telehealth companies pick a lane: cheap compounded plans, or brand-name fulfillment. altRx runs both lanes under one roof - compounded semaglutide from $89 and tirzepatide from $149, next to brand-name <strong>Ozempic at $1,149, Zepbound at $1,249 and Wegovy at $1,579</strong>. That structure is itself a trust signal worth pausing on: a company dispensing FDA-approved brand products has pharmacy relationships and compliance obligations that fly-by-night compounding shops never touch. You don't get a Wegovy supply chain by cutting corners.</p>`,
      },
      {
        heading: "Who's actually prescribing",
        body: `<p>Every altRx assessment is reviewed by a licensed provider - a physician, physician associate, or nurse practitioner - with the authority to decline treatment. Prescriptions are filled by licensed pharmacies in both lanes. The intake is genuinely medical (history, medications, contraindications), and the whole process runs online with the ability to pause or cancel anytime - no clinic visit, no lock-in, no cancellation maze.</p><p>One structural honesty marker deserves its own sentence: altRx charges the <strong>same price at every dose</strong>. The industry's quietest markup - bills that climb as you titrate up - simply doesn't exist here.</p>`,
      },
      {
        heading: "The money layer: flat pricing and BNPL",
        body: `<table><tr><th>Lane</th><th>Medication</th><th>Price</th></tr><tr><td>Compounded</td><td>Semaglutide (weekly)</td><td>$89/mo - reg. $199</td></tr><tr><td>Compounded</td><td>Tirzepatide (weekly)</td><td>$149/mo - reg. $299</td></tr><tr><td>Brand-name</td><td>Ozempic</td><td>$1,149/mo</td></tr><tr><td>Brand-name</td><td>Zepbound</td><td>$1,249/mo</td></tr><tr><td>Brand-name</td><td>Wegovy</td><td>$1,579/mo</td></tr></table><p>Two financing details separate altRx from the pack. It's the only provider in our ranking offering <strong>Buy Now, Pay Later</strong>, which spreads even the compounded plans into smaller payments. And its brand-name prices undercut every other brand shelf we track - wellmedr's Ozempic starts $250/month higher. For how the compounded and brand lanes actually differ medically, read <a href="/weight-loss/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name semaglutide</a>.</p>`,
      },
      {
        heading: "The catches, stated plainly",
        body: `<p>altRx is not the cheapest compounded option - <a href="/weight-loss/reviews/wellmedr">wellmedr ($59)</a> and <a href="/weight-loss/reviews/embody">embody ($69)</a> both undercut the $89 plan. Its service model is self-serve: no dietician, no coaching layer, no video-visit culture - you're buying medication access with clinical oversight, not a support program. And no guarantee backs the treatment - no money-back promise, no refund-if-not-approved. Price-first shoppers and support-first shoppers both have better homes; altRx wins on <em>optionality</em>.</p>`,
      },
      {
        heading: "Verdict: the flexibility pick, legitimately run",
        body: `<p>altRx checks every legitimacy box - licensed prescriber gate, licensed pharmacies, honest dose-flat pricing, real brand-name supply - and adds the widest medication menu in our ranking. Choose it when you want room to move: start compounded at $89, keep the option to switch to Zepbound without changing providers, spread costs with BNPL. That freedom of movement is genuinely unique here.</p><p class="cta-row"><a href="/weight-loss/reviews/altrx">→ Full altRx review: both lanes, all prices</a></p><p class="cta-row"><a href="/weight-loss/altrx-vs-embody">→ The budget-tier showdown: altRx vs embody</a></p><p>This article is general information, not medical advice.</p>`,
      },
    ],
  },
  {
    slug: "altrx-cost",
    title: "altRx Cost 2026: $89 Compounded to $1,579 Brand - Full Map",
    description:
      "Every altRx price mapped: $89/$149 compounded plans flat at every dose, brand-name Ozempic $1,149, Zepbound $1,249, Wegovy $1,579 - plus the BNPL angle.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-08-14",
    updatedAt: "2026-08-21",
    heroColor: "#F3EEFB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "The whole altRx price list, one table",
        body: `<div class="qa"><strong>The short answer</strong>Compounded plans: <strong>$89/month semaglutide</strong> (reg. $199) and <strong>$149/month tirzepatide</strong> (reg. $299), same price at every dose. Brand-name: Ozempic $1,149, Zepbound $1,249, Wegovy $1,579. Buy Now, Pay Later available; pause or cancel anytime; no insurance involved.</div><p>The 10x spread between lanes isn't an altRx quirk - it's the compounded-vs-brand economics of the entire market, collapsed into one provider so you can see it clearly. Same active ingredients; the brand premium is what you're choosing to pay or skip.</p>`,
      },
      {
        heading: "Why \"flat at every dose\" is worth real money",
        body: `<p>GLP-1 dosing escalates over the first months - semaglutide typically titrates through several steps before reaching maintenance. Providers that price per-dose quote you the starter-dose rate, and the real bill arrives at month three. altRx's $89 is the price at <em>every</em> step. When comparing quotes, always ask a rival: "at maintenance dose, what do I pay?" - and watch the comparison change. (Dose timelines and what to expect: <a href="/weight-loss/articles/how-long-for-semaglutide-to-work">how long semaglutide takes to work</a>.)</p>`,
      },
      {
        heading: "altRx against the market, both lanes",
        body: `<p><strong>Compounded lane</strong> - $89 sits third-cheapest of eight: behind wellmedr ($59, 12-mo lock) and embody ($69 flat); ahead of Medvi's $99 promo, HealthRx ($99 but prepaid $1,188), DirectMeds ($147) and SHED ($199). <strong>Brand lane</strong> - altRx leads outright: its Ozempic beats wellmedr's by $250/month, and no one else in our ranking stocks Wegovy at all.</p><table><tr><th>Brand-name</th><th>altRx</th><th>wellmedr</th></tr><tr><td>Ozempic</td><td><strong>$1,149</strong></td><td>from $1,399</td></tr><tr><td>Zepbound</td><td><strong>$1,249</strong></td><td>from $1,599</td></tr><tr><td>Wegovy</td><td><strong>$1,579</strong></td><td>-</td></tr></table><p>The practical read: if there's any chance you'll want brand-name later, starting at altRx means switching lanes without switching providers - no new intake, no new provider relationship.</p>`,
      },
      {
        heading: "BNPL, and the honest math of paying less",
        body: `<p>altRx's Buy Now, Pay Later is unique in our ranking and changes the cash-flow question: even the $149 tirzepatide plan can split into smaller installments. Beyond that, the levers are familiar - stay compounded (the $1,060/month lane gap dwarfs every other decision), start on semaglutide unless your provider steers otherwise ($60/month less), and check HSA/FSA eligibility for pre-tax payment. And if $89 still stretches: <a href="/weight-loss/reviews/wellmedr">wellmedr at $59</a> and <a href="/weight-loss/reviews/embody">embody at $69</a> sell the same molecule for less - minus the brand shelf and BNPL that make altRx altRx.</p><p class="cta-row"><a href="/weight-loss/reviews/altrx">→ Full altRx review with current plan terms</a></p><p>This article is general information, not medical advice. Prices as listed at the time of writing - confirm current pricing on the provider's site.</p>`,
      },
    ],
  },
  {
    slug: "altrx-alternatives",
    title: "altRx Alternatives 2026: Six Rivals, Sorted by What They Fix",
    description:
      "The best altRx alternatives depend on what you'd change: price ($59-$69 rivals), delivery speed, support depth, or a results guarantee. Six options, sorted.",
    category: "Comparison",
    readTime: "6 min read",
    publishedAt: "2026-08-16",
    updatedAt: "2026-08-21",
    heroColor: "#FBEEF4",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "What altRx already wins - so you don't re-buy it",
        body: `<p>Before shopping alternatives, bank what altRx does best in our ranking: the widest medication menu (both compounded plans <em>and</em> the cheapest brand-name shelf - Ozempic $1,149, Zepbound $1,249, Wegovy $1,579), dose-flat $89/$149 pricing, BNPL, and pause-anytime terms. If those are the features you use, switching means losing them. The alternatives below each beat altRx on exactly one axis - match the axis to your actual complaint.</p>`,
      },
      {
        heading: "Axis 1 - price: wellmedr and embody",
        body: `<p>The only two providers that undercut $89: <a href="/weight-loss/reviews/wellmedr">wellmedr</a> at <strong>$59/month</strong> ($99 tirzepatide) - same dose-flat honesty as altRx, best rate on a 12-month plan, coach and warranty included - and <a href="/weight-loss/reviews/embody">embody</a> at <strong>$69 flat</strong> with free 1-2 day shipping, LegitScript certification and a full refund if not approved. Combined saving vs altRx: $240-$360/year. What neither has: any brand-name lane, or BNPL. Head-to-heads: <a href="/weight-loss/altrx-vs-wellmedr">altRx vs wellmedr</a> and <a href="/weight-loss/altrx-vs-embody">altRx vs embody</a>.</p>`,
      },
      {
        heading: "Axis 2 - logistics: HealthRx and DirectMeds",
        body: `<p><a href="/weight-loss/reviews/healthrx">HealthRx</a> turns delivery into the headline: free <strong>overnight cold-chain shipping</strong>, lot-tracked, at $99/month semaglutide on a 12-month prepaid plan ($1,188 at checkout). <a href="/weight-loss/reviews/directmeds">DirectMeds</a> attacks two angles at once: flat <strong>$147 for either medication</strong> - beating altRx's tirzepatide by $2 while adding the group's only needle-free sublingual drops - with 1-2 day free shipping and no membership.</p>`,
      },
      {
        heading: "The financing axis nobody else covers",
        body: `<p>One axis has no alternative at all: financing. altRx is the only provider in our ranking with Buy Now, Pay Later, which converts even the $149 tirzepatide plan into split payments without touching a credit card's interest rate. If cash flow - not total cost - is your binding constraint, the honest comparison isn't altRx vs the $59 tier; it's altRx's BNPL vs putting a rival's bill on a card. At typical card APRs, financing $89-$149 monthly through revolving credit erodes the budget tier's price advantage within months. HealthRx sits at the opposite extreme - its whole model asks for $1,188 upfront - which makes the altRx-vs-HealthRx choice the cleanest cash-flow decision in the market: installments vs lump sum, $89 vs $99 effective.</p>`,
      },
      {
        heading: "Axis 3 - humans: Medvi and SHED",
        body: `<p>altRx's self-serve model is its one soft spot. <a href="/weight-loss/reviews/medvi">Medvi</a> ($99/$166 promotional, all-inclusive) is the anti-altRx: video visits, dietician, coaching, and a 4.4 Trustpilot average across 14,372 reviews. <a href="/weight-loss/reviews/shed">SHED</a> ($199/$299, 20% off month one, HSA/FSA) stakes the strongest claim in the market: <strong>lose 5% of your body weight in 120 days or your money back</strong>.</p><table><tr><th>Your complaint about altRx</th><th>Best fix</th><th>Price</th></tr><tr><td>"$89 is still too much"</td><td>wellmedr</td><td>$59/mo</td></tr><tr><td>"Want cheap without commitment"</td><td>embody</td><td>$69/mo flat</td></tr><tr><td>"Shipping takes too long"</td><td>HealthRx</td><td>$99/mo (prepaid)</td></tr><tr><td>"Tirzepatide / hate needles"</td><td>DirectMeds</td><td>$147/mo flat</td></tr><tr><td>"I need real support"</td><td>Medvi</td><td>$99/mo promo</td></tr><tr><td>"I want a guarantee"</td><td>SHED</td><td>$199/mo</td></tr></table><p>And if your complaint is "none - I might want Zepbound someday": stay. Nobody else holds both lanes.</p><p class="cta-row"><a href="/weight-loss/find-your-match">→ Six questions, one answer: take the matching quiz</a></p><p>This article is general information, not medical advice. Prices as listed at the time of writing.</p>`,
      },
    ],
  },
  // ═════ SHED ═════
  {
    slug: "is-shed-legit",
    title: "Is SHED Legit? A Money-Back GLP-1 Guarantee, Stress-Tested",
    description:
      "SHED promises 5% body-weight loss in 120 days or your money back. We stress-tested that guarantee against the clinical data and the rest of its program.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-08-09",
    updatedAt: "2026-08-21",
    heroColor: "#EEF4FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "A guarantee is a claim about the future. Can they afford it?",
        body: `<p>SHED's headline promise - <strong>lose 5% of your body weight in 120 days or your money back</strong> - is the boldest accountability mechanism in our ranking, and the right first question isn't "is it real" but "how can a company afford to make it?" The answer decides the legitimacy question too.</p><p>Here's the actuarial logic: in clinical trials, ≥5% body-weight loss is the standard threshold for meaningful GLP-1 response - and the substantial majority of patients who take these medications consistently reach it within months of hitting effective doses. SHED's 120-day window is calibrated to what the medication reliably delivers for adherent patients. A company selling fake or under-dosed product could never survive this promise; offering it is only rational if the clinical outcomes actually show up. The guarantee, in other words, is self-certifying.</p>`,
      },
      {
        heading: "The program around the promise",
        body: `<p>SHED's structure supports the bet it's making. The plan price includes the provider visit (a licensed clinician reviews your intake and can decline), the medication - compounded semaglutide or tirzepatide - and <strong>health coaching on every plan</strong>, not as an upsell. That coaching layer isn't decoration: the guarantee works best for SHED when patients adhere, and coaching is how you engineer adherence. Their incentive and yours point the same direction, which is rarer in this market than it should be.</p><p>Payment is HSA/FSA approved - treatment qualifies as legitimate medical care for pre-tax dollars - which quietly discounts everything by your marginal tax rate.</p>`,
      },
      {
        heading: "What it costs, honestly framed",
        body: `<table><tr><th>Plan</th><th>Medication</th><th>Price</th></tr><tr><td>GLP-1</td><td>Compounded semaglutide, weekly</td><td>$199/mo - 20% off month one (~$159)</td></tr><tr><td>GLP-1 + GIP</td><td>Compounded tirzepatide, weekly</td><td>$299/mo - 20% off month one (~$239)</td></tr></table><p>SHED is the premium of the compounded market - $140/month above wellmedr on semaglutide. The honest frame: you are not buying medication at $199; you're buying medication (~$60-90 of market value), coaching, and an insurance policy on your own results. Whether that bundle prices fairly depends entirely on how much the last two matter to you.</p>`,
      },
      {
        heading: "Read the guarantee's fine print like an adult",
        body: `<p>Every results guarantee has conditions - typically adherence to the protocol, and SHED's terms live on their site. That's not a gotcha; it's how a promise like this stays offerable. But it does mean the guarantee protects the committed, not the casual: if you expect to follow the program and want downside protection in case your biology doesn't respond, it's genuinely valuable. If you suspect you'll drift by week six, no guarantee will save the purchase - and cheaper providers deserve your drift instead.</p>`,
      },
      {
        heading: "Verdict, and the two people reading this",
        body: `<p>SHED is legitimate - licensed clinical gate, real coaching, HSA/FSA standing, and a guarantee whose existence is itself evidence the program works for most people who work it. Reader one wants structure and accountability and can afford the premium: SHED is arguably your strongest option anywhere in this ranking. Reader two mostly wants the medication at a fair price: that's a different product - start at <a href="/weight-loss/reviews/wellmedr">wellmedr ($59)</a> or <a href="/weight-loss/reviews/embody">embody ($69)</a> and pocket the difference.</p><p class="cta-row"><a href="/weight-loss/reviews/shed">→ Full SHED review: program details and guarantee terms</a></p><p>This article is general information, not medical advice.</p>`,
      },
    ],
  },
  {
    slug: "shed-cost",
    title: "SHED Cost 2026: Pricing the Guarantee - $199 Decoded",
    description:
      "SHED costs $199/month for semaglutide, $299 for tirzepatide, 20% off month one. What the premium over $59 rivals actually buys: coaching plus a guarantee.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-08-11",
    updatedAt: "2026-08-21",
    heroColor: "#F0FAF5",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Sticker, discount, and first-month math",
        body: `<div class="qa"><strong>Bottom line first</strong>SHED runs <strong>$199/month for compounded semaglutide</strong> and <strong>$299/month for tirzepatide</strong>, each with <strong>20% off your first month</strong> (~$159 / ~$239 to start). The price includes the provider visit, the medication, and health coaching - and it's HSA/FSA approved, backed by a lose-5%-in-120-days-or-your-money-back guarantee.</div><p>No hidden consultation fee, no separate membership - the number is the number. The only asterisk worth writing: the guarantee has adherence conditions, on their site.</p>`,
      },
      {
        heading: "Decomposing the $199",
        body: `<p>The clarifying exercise for any premium product - price the components separately. Compounded semaglutide with clinical oversight trades for $59-$99/month across our budget tier. Structured health coaching, bought standalone, commonly runs $50-100+/month anywhere in wellness. A money-back results policy has no standalone market price - it's an insurance product nobody else sells. Add it up and $199 stops looking like an expensive medication and starts looking like a fairly-priced bundle - <em>for the person who uses all three parts</em>. Skip the coaching, and you're overpaying by design.</p><table><tr><th>Provider</th><th>Semaglutide</th><th>Tirzepatide</th><th>Bundled extras</th></tr><tr><td>wellmedr</td><td>$59/mo</td><td>$99/mo</td><td>Coach, warranty</td></tr><tr><td>embody</td><td>$69/mo</td><td>$119/mo</td><td>Refund if not approved</td></tr><tr><td>altRx</td><td>$89/mo</td><td>$149/mo</td><td>Brand shelf, BNPL</td></tr><tr><td>HealthRx</td><td>$99/mo*</td><td>from $179</td><td>Overnight shipping</td></tr><tr><td>Medvi</td><td>$99/mo promo (reg. $199)</td><td>$166/mo promo (reg. $299)</td><td>Video visits, dietician</td></tr><tr><td><strong>SHED</strong></td><td><strong>$199/mo</strong></td><td><strong>$299/mo</strong></td><td><strong>Coaching + money-back guarantee</strong></td></tr></table><p>*12-month prepaid.</p>`,
      },
      {
        heading: "The HSA/FSA discount nobody applies",
        body: `<p>SHED is explicitly HSA/FSA approved, and this is where its premium quietly shrinks: paying $199 with pre-tax dollars costs a person in the 24% bracket an effective ~$151. Run your own bracket before comparing stickers - the gap to mid-market providers narrows more than most shoppers expect. Stack the first-month 20% on top and month one lands near budget-tier pricing.</p>`,
      },
      {
        heading: "Worth it? The one-question test",
        body: `<p>Ask yourself: <em>if the program didn't exist and someone handed me the vial, would I succeed?</em> If yes - you're a medication customer; buy at <a href="/weight-loss/reviews/wellmedr">$59</a> and thrive. If honestly no - if structure, a coach, and stakes are what turned past attempts around or their absence is what sank them - then SHED's premium is buying the thing that actually determines your outcome, with your money back if it doesn't. That's a rational $140/month for the right person, and a wasted one for the wrong person.</p><p class="cta-row"><a href="/weight-loss/reviews/shed">→ Full SHED review with plan details</a></p><p>This article is general information, not medical advice. Prices as listed at the time of writing - confirm current pricing on the provider's site.</p>`,
      },
    ],
  },
  {
    slug: "shed-alternatives",
    title: "SHED Alternatives 2026: Keep the Support or Keep the Cash",
    description:
      "Leaving SHED's $199 program means choosing: keep support (Medvi, wellmedr's coach) or keep cash ($59-$99 tier). Six alternatives, honestly mapped.",
    category: "Comparison",
    readTime: "6 min read",
    publishedAt: "2026-08-17",
    updatedAt: "2026-08-21",
    heroColor: "#FBF3EE",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "The fork: support or savings",
        body: `<p>SHED bundles three things - medication, coaching, and a money-back guarantee - so every alternative unbundles something. The decision tree is short: if the coaching and accountability are why you're here, only two rivals keep meaningful support in the box. If you've realized you mainly need the medication, five providers sell it for $52-$140/month less. Decide which reader you are; the rest is just names and prices.</p>`,
      },
      {
        heading: "Keep the support: Medvi, or wellmedr's lighter version",
        body: `<p><a href="/weight-loss/reviews/medvi">Medvi</a> (currently $99/$166 promotional, all-inclusive, HSA/FSA) is the nearest substitute in spirit: no formal guarantee, but video visits, a dietician and care coaching, and the receipts SHED can't match - <strong>4.4 on Trustpilot across 14,372 reviews</strong> praising exactly that support. At the promo rate you save $100/month and trade the guarantee for a track record. <a href="/weight-loss/reviews/wellmedr">wellmedr</a> ($59/$99) runs the budget version of the same idea: a Medical Weight-Care Coach on every plan plus its own weight-loss warranty - the only other results-linked promise in our ranking - at 30% of SHED's price, with a 12-month lock for the best rate.</p>`,
      },
      {
        heading: "Keep the cash: the medication-first tier",
        body: `<p><a href="/weight-loss/reviews/embody">embody</a> - $69 flat, no commitment, 1-2 day free shipping, refund if not approved: the cleanest exit if you want simplicity. <a href="/weight-loss/reviews/healthrx">HealthRx</a> - $99/month on a 12-month prepaid plan ($1,188 upfront) with overnight cold-chain delivery. <a href="/weight-loss/reviews/directmeds">DirectMeds</a> - flat $147 either medication, and the only needle-free drops in the group; its tirzepatide beats SHED's by $152/month. <a href="/weight-loss/reviews/altrx">altRx</a> - $89/$149 with the cheapest brand-name shelf (Ozempic $1,149) if that's where you're heading.</p><table><tr><th>Alternative</th><th>Semaglutide</th><th>Support kept</th><th>Annual saving vs SHED</th></tr><tr><td>Medvi</td><td>$99/mo promo</td><td>High (visits + dietician)</td><td>$1,200</td></tr><tr><td>DirectMeds</td><td>$147/mo</td><td>Low</td><td>$624</td></tr><tr><td>HealthRx</td><td>$99/mo*</td><td>Low-mid (check-ins)</td><td>$1,200</td></tr><tr><td>altRx</td><td>$89/mo</td><td>Low</td><td>$1,320</td></tr><tr><td>embody</td><td>$69/mo</td><td>Low-mid</td><td>$1,560</td></tr><tr><td>wellmedr</td><td>$59/mo</td><td>Mid (coach + warranty)</td><td>$1,680</td></tr></table><p>*prepaid annual.</p>`,
      },
      {
        heading: "Guarantee vs warranty vs refund: read the small words",
        body: `<p>Three providers in this market attach promises to their programs, and they are not the same instrument. SHED's is a <strong>results guarantee</strong>: a defined outcome (5% of body weight), a defined window (120 days), money back if the program doesn't deliver - the strongest form, conditioned on following the program. wellmedr's <strong>weight-loss warranty</strong> is results-linked too but structured differently; its terms live on their site and deserve the same careful read. embody's promise is narrower and earlier: a <strong>full refund if a provider doesn't approve you</strong> - it protects the application, not the outcome. Rank them by where your anxiety actually lives: worried the medication won't work for you → SHED; worried about long-commitment pricing → wellmedr; worried you won't qualify at all → embody. Matching the promise to the fear is the whole game.</p>`,
      },
      {
        heading: "The case for not leaving",
        body: `<p>One scenario argues for staying put: you're within reach of the 120-day guarantee window and following the program. Walking away from a live money-back position to save monthly cost is backwards - see the commitment through, bank the result (or the refund), then downshift to a cheaper maintenance provider once the guarantee has done its job. Providers are easy to switch; a guarantee period isn't recoverable.</p><p class="cta-row"><a href="/weight-loss/find-your-match">→ Not sure which reader you are? The quiz sorts it in a minute</a></p><p>This article is general information, not medical advice. Prices as listed at the time of writing.</p>`,
      },
    ],
  },
  // ═════ DirectMeds ═════
  {
    slug: "is-directmeds-legit",
    title: "Is DirectMeds Legit? One Flat Price, No Needles - Checked",
    description:
      "DirectMeds sells either GLP-1 for a flat $147/month and offers needle-free drops. We checked the doctor gate, the drops question, and where the model bends.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-08-10",
    updatedAt: "2026-08-21",
    heroColor: "#EEF7FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Two claims worth interrogating",
        body: `<p>DirectMeds makes two claims that stand out in this market, and both deserve scrutiny rather than applause. Claim one: <strong>$147/month flat - for either semaglutide or tirzepatide, at every dose</strong>. Claim two: you can take it as weekly injections <em>or</em> as needle-free sublingual drops. The first claim is unusual economics; the second is unusual medicine. Let's check both.</p><p>The economics first: pricing tirzepatide at the same rate as semaglutide is genuinely rare - everywhere else in our ranking, tirzepatide carries a $40-$100 premium. And dose-flat pricing kills the industry's habit of quoting starter-dose rates that climb as you titrate. Nothing about either practice signals corner-cutting; both signal a company competing on transparency.</p>`,
      },
      {
        heading: "The doctor gate and the fine print that isn't there",
        body: `<p>The clinical pipeline runs correctly: a licensed physician reviews your health intake before anything is prescribed and can decline treatment. Then the parts that usually hide in fine print - <em>because here there's less of it</em>: no membership fee, no insurance requirement, no consultation charge, free 1-2 day shipping, cancel anytime. The monthly price is the entire relationship. For a market whose classic failure is the surprise line item, an absence of fine print is a real trust signal.</p>`,
      },
      {
        heading: "The drops question, answered honestly",
        body: `<p>Needle-free sublingual GLP-1 deserves an honest sentence, and here it is: the major clinical trials behind semaglutide and tirzepatide studied <strong>injections</strong>, and weekly injection remains the standard of care. Compounded sublingual formats are prescribed at clinician discretion, dosed differently, and trade some evidentiary certainty for accessibility. That's not a scandal - it's a legitimate clinical option with a real use case: if the needle is the sole reason you haven't started treatment, drops convert "never" into "started," and the prescribing doctor makes that call with you. Just walk in understanding the trade.</p>`,
      },
      {
        heading: "Where the flat price isn't the best price",
        body: `<p>Precision matters: on <strong>tirzepatide</strong>, $147 is elite - only wellmedr ($99) and embody ($119) beat it, and neither offers drops. On <strong>semaglutide</strong>, $147 is mid-pack - <a href="/weight-loss/reviews/wellmedr">wellmedr ($59)</a>, <a href="/weight-loss/reviews/embody">embody ($69)</a>, <a href="/weight-loss/reviews/altrx">altRx ($89)</a> and <a href="/weight-loss/reviews/healthrx">HealthRx ($99, prepaid)</a> all undercut it. The model also stays deliberately lean: no coaching layer, no dietician, no brand-name shelf. DirectMeds wins specific races, not every race.</p>`,
      },
      {
        heading: "Verdict: legit, with two ideal customers",
        body: `<p>DirectMeds passes the audit - physician-gated prescribing, transparent flat economics, honest logistics, no fee games. Its two ideal customers: the tirzepatide patient, for whom $147 flat at every dose is among the best deals anywhere, and the needle-averse starter, for whom the drops option is the difference between treatment and no treatment. Everyone else should price-check the semaglutide tier before committing.</p><p class="cta-row"><a href="/weight-loss/reviews/directmeds">→ Full DirectMeds review: formats, pricing and process</a></p><p>This article is general information, not medical advice.</p>`,
      },
    ],
  },
  {
    slug: "directmeds-cost",
    title: "DirectMeds Cost 2026: The Flat $147 - When It Wins and Loses",
    description:
      "DirectMeds charges one flat $147/month for semaglutide or tirzepatide, injections or drops. The math on when that flat rate is a steal - and when it isn't.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-08-13",
    updatedAt: "2026-08-21",
    heroColor: "#F3EEFB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "One number, four decisions it erases",
        body: `<div class="qa"><strong>At a glance</strong>DirectMeds charges a flat <strong>$147/month</strong> - semaglutide or tirzepatide, injections or sublingual drops, any dose. Included: the doctor review, the medication, free 1-2 day shipping. Not included, because they don't exist: membership fees, consultation charges, dose-based increases, insurance paperwork. Cancel anytime.</div><p>The design erases four pricing decisions that complicate every rival quote: which medication (same price), which dose (same price), which format (same price), which add-ons (there are none). What's left is one question - is $147 the right number for you?</p>`,
      },
      {
        heading: "The answer depends entirely on your medication",
        body: `<p><strong>If you're on tirzepatide:</strong> $147 is the third-best price in our ranking and the gap to the expensive tier is dramatic - $112/month under trimrx ($259), $152 under SHED ($299), and still $19 under even Medvi's aggressive $166 promo. Over a year the gaps to the expensive tier run $1,344-$1,824. Only wellmedr ($99, 12-month lock) and embody ($119) do better, and neither offers a needle-free format.</p><p><strong>If you're on semaglutide:</strong> $147 is beatable by four providers - wellmedr $59, embody $69, altRx $89, HealthRx $99 (prepaid) - a $576-$1,056 annual difference. Unless the drops format or the flat-simplicity is what you're buying, the budget tier serves semaglutide-only patients better.</p><table><tr><th>Provider</th><th>Semaglutide</th><th>Tirzepatide</th></tr><tr><td>wellmedr</td><td>$59/mo</td><td>$99/mo</td></tr><tr><td>embody</td><td>$69/mo</td><td>$119/mo</td></tr><tr><td>altRx</td><td>$89/mo</td><td>$149/mo</td></tr><tr><td>HealthRx</td><td>$99/mo*</td><td>from $179/mo</td></tr><tr><td><strong>DirectMeds</strong></td><td><strong>$147/mo</strong></td><td><strong>$147/mo</strong></td></tr><tr><td>Medvi</td><td>$99/mo promo (reg. $199)</td><td>$166/mo promo (reg. $299)</td></tr><tr><td>SHED</td><td>$199/mo</td><td>$299/mo</td></tr></table><p>*12-month prepaid plan. Choosing between the two medications in the first place: <a href="/weight-loss/articles/tirzepatide-vs-semaglutide">tirzepatide vs semaglutide</a>.</p>`,
      },
      {
        heading: "Where the flat model saves money you can't see yet",
        body: `<p>Two costs of GLP-1 treatment only show up months in, and DirectMeds' design happens to neutralize both. First, <strong>dose escalation</strong>: standard titration moves you up several dose levels across the first months; per-dose pricers re-quote you at each step, while $147 stays $147. Second, <strong>medication switching</strong>: a meaningful minority of patients change medication mid-treatment - semaglutide to tirzepatide or back - for tolerance or plateau reasons, normally triggering a new plan at a new price. At DirectMeds both medications cost the same, so a clinician-directed switch is billing-neutral. If you value predictability - one line item, forever, no matter how treatment evolves - that's the model's quiet strength, and it's genuinely rare.</p>`,
      },
      {
        heading: "Pricing the needle-free premium",
        body: `<p>For drops customers the comparison table above is moot - nobody else sells the format. The honest math: against the cheapest injectable (wellmedr, $59), choosing drops at DirectMeds costs $88/month. Framed clinically: if needle aversion would otherwise keep you off treatment entirely, $88/month is the price of actually starting - cheap against the cost of another year of no progress. If you'd tolerate injections fine, the premium buys convenience, and the budget tier deserves your look first.</p><p class="cta-row"><a href="/weight-loss/reviews/directmeds">→ Full DirectMeds review with format details</a></p><p>This article is general information, not medical advice. Prices as listed at the time of writing - confirm current pricing on the provider's site.</p>`,
      },
    ],
  },
  {
    slug: "directmeds-alternatives",
    title: "DirectMeds Alternatives 2026: By Medication, Not by List",
    description:
      "The right DirectMeds alternative differs by medication: semaglutide users have four cheaper options, tirzepatide users two, drops users none. Mapped out.",
    category: "Comparison",
    readTime: "6 min read",
    publishedAt: "2026-08-18",
    updatedAt: "2026-08-21",
    heroColor: "#FBEEF4",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Three customers, three different answers",
        body: `<p>Generic alternatives lists fail DirectMeds shoppers because the flat $147 means opposite things to different patients. So we'll answer three people separately: the semaglutide patient (overpaying, four better options), the tirzepatide patient (well-served, two better options), and the drops patient (no alternatives exist - but staying has conditions worth knowing).</p>`,
      },
      {
        heading: "Semaglutide patient? Four ways to pay less",
        body: `<p>At $147 you're above four rivals for the identical active ingredient: <a href="/weight-loss/reviews/wellmedr">wellmedr</a> at <strong>$59</strong> (12-month lock, coach and warranty included), <a href="/weight-loss/reviews/embody">embody</a> at <strong>$69 flat</strong> (no commitment, 1-2 day shipping, refund if not approved - the closest match to DirectMeds' no-nonsense spirit), <a href="/weight-loss/reviews/altrx">altRx</a> at <strong>$89</strong> (flat at every dose, BNPL, brand-name shelf), and <a href="/weight-loss/reviews/healthrx">HealthRx</a> at <strong>$99</strong> on a 12-month prepaid plan with overnight cold-chain shipping. Annual savings range $576-$1,056. The trade at each: none offers a needle-free format.</p>`,
      },
      {
        heading: "Tirzepatide patient? Only two beat you - both with strings",
        body: `<p>Your $147 is already elite. <a href="/weight-loss/reviews/wellmedr">wellmedr</a> does tirzepatide at <strong>$99</strong> - $576/year less - with the best rate tied to a 12-month plan. <a href="/weight-loss/reviews/embody">embody</a> charges <strong>$119</strong> flat with no commitment and faster default shipping cadence. Everyone else charges more: DirectMeds $147 flat, altRx $149, Medvi $166 promo, HealthRx from $179, trimrx $259, SHED $299. Unless one of those brings something you specifically need (Medvi's support, SHED's guarantee), your shortlist is two names long.</p>`,
      },
      {
        heading: "The mistake worse than the wrong provider",
        body: `<p>A pattern we see in provider-shopping deserves naming: spending weeks optimizing a $30-$80/month difference while not starting treatment at all. The clinical literature is unambiguous that results compound with time on effective doses - every month of comparison shopping is a month of results not accruing. The financial version of the same point: the gap between DirectMeds and the cheapest alternative ($88/month at most) is real money, but it's small against the cost of another season of no progress. Pick the provider whose model fits your actual constraint - needles, cash flow, medication - inside a week, start, and revisit the choice in month three with real data about how your body responds. Providers are switchable; time isn't.</p>`,
      },
      {
        heading: "Drops patient? Stay - but hold it to a standard",
        body: `<p>No provider in our ranking offers another needle-free GLP-1 format, so switching means switching to injections. If drops are working for you under your prescribing doctor's monitoring, the practical move is staying while holding the arrangement to the standard any GLP-1 treatment deserves: measurable progress reviewed with your clinician (the yardstick: <a href="/weight-loss/articles/first-month-weight-loss-medication">what a reasonable first month looks like</a>). If results lag, the conversation isn't "which provider" - it's "which format," and the injectable tier reopens with every option above.</p><table><tr><th>You take...</th><th>Best alternative</th><th>Price</th><th>The string attached</th></tr><tr><td>Semaglutide</td><td>wellmedr</td><td>$59/mo</td><td>12-month lock for best rate</td></tr><tr><td>Semaglutide, no commitment</td><td>embody</td><td>$69/mo</td><td>Injections only</td></tr><tr><td>Tirzepatide</td><td>wellmedr</td><td>$99/mo</td><td>Same lock</td></tr><tr><td>Tirzepatide, flexible</td><td>embody</td><td>$119/mo</td><td>Injections only</td></tr><tr><td>Sublingual drops</td><td>- (unique)</td><td>$147/mo</td><td>Review progress with your doctor</td></tr></table><p class="cta-row"><a href="/weight-loss/find-your-match">→ Or let the quiz run this logic for you: find your match</a></p><p>This article is general information, not medical advice. Prices as listed at the time of writing.</p>`,
      },
    ],
  },
  // ═════ HealthRx ═════
  {
    slug: "is-healthrx-legit",
    title: "Is HealthRx Legit? The $99 Prepaid GLP-1, Investigated (2026)",
    description:
      "HealthRx sells semaglutide at $99/month - if you prepay $1,188 for a year. We verified its LegitScript certification, clinician gate, and where the risk sits.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    heroColor: "#EEF4FB",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "The right question about a prepaid deal",
        body: `<p>HealthRx's offer forces a sharper version of the usual legitimacy question. It isn't just "will they send real medication" - it's "should I hand a newer brand <strong>$1,188 upfront</strong> for a year of it?" That's the actual bet, so this piece audits it like one: verify the operation, then price the risk.</p><p>Verification first. HealthRx is <strong>LegitScript-certified - certificate 50087439</strong>, checkable in LegitScript's public registry - the same third-party healthcare-merchant vetting the major players carry. Every request is reviewed by an independent US-licensed clinician in your state, and their own materials state it plainly: <em>approval is never automatic</em>. Fulfillment runs through licensed 503A compounding pharmacies, shipped overnight, cold-chain, lot-tracked to your door. Those are expensive, regulated commitments - not the architecture of a vanishing act.</p>`,
      },
      {
        heading: "How the funnel treats you before money moves",
        body: `<p>A revealing test for any prepaid program: what happens before payment? HealthRx's assessment is free, takes about two minutes, and requires <strong>no payment to start</strong> - a clinician reviews your file before any charge, and nothing about the assessment obliges a purchase. Compare that against the industry's dark pattern of card-first funnels, and the sequencing here reads clean: medicine gates money, not the reverse.</p>`,
      },
      {
        heading: "What $1,188 actually buys - the full inventory",
        body: `<p>The prepaid plan covers more than most monthly plans do, which is part of the pitch:</p><table><tr><th>Included</th><th>The detail</th></tr><tr><td>Medication</td><td>Compounded semaglutide, prepared per prescription ($99/mo effective); tirzepatide plans from $179/mo</td></tr><tr><td>Provider consult</td><td>Independent US-licensed clinician reviews your full history</td></tr><tr><td>Shipping</td><td>Overnight, cold-chain, tracked - free on every plan</td></tr><tr><td>Dose adjustments</td><td>Plan price does not change when your dose does</td></tr><tr><td>Ongoing check-ins</td><td>Message the care team whenever something changes</td></tr></table><p>No consultation fee, no shipping line at checkout, no insurance or prior authorization anywhere in the flow - it's cash-pay by design.</p>`,
      },
      {
        heading: "Now price the actual risk",
        body: `<p>The honest risk isn't fraud - the certifications above address that. It's <em>fit</em>: you're prepaying for twelve months before knowing how your body takes to the medication. Most people tolerate GLP-1s well, but dose adjustments, side effects and life changes are real (see <a href="/weight-loss/articles/semaglutide-side-effects-guide">the semaglutide side-effects guide</a>). A newer brand also means a thin public review record - unlike, say, Medvi's 14,372 Trustpilot reviews. Mitigations: the clinician gate can decline you before any charge, and the free assessment costs nothing to run. But the commitment asymmetry is the one thing no certificate fixes - go in knowing it.</p>`,
      },
      {
        heading: "Verdict: legitimate program, honest about its own catch",
        body: `<p>HealthRx checks out - LegitScript-certified, clinician-gated, 503A-fulfilled, with unusually clean pre-payment behavior and pricing that states its own catch in plain sight ($1,188 due at checkout, printed right under the $99). It's built for the person who has already decided on a year of treatment and wants the lowest committed rate with premium logistics. If that's not yet you, run the free assessment, then compare the month-to-month tier first.</p><p class="cta-row"><a href="/weight-loss/reviews/healthrx">→ Full HealthRx review: plans, process and fine print</a></p><p class="cta-row"><a href="/weight-loss/healthrx-vs-medvi">→ The live matchup: HealthRx vs the trending Medvi</a></p><p>This article is general information, not medical advice.</p>`,
      },
    ],
  },
  {
    slug: "healthrx-cost",
    title: "HealthRx Cost 2026: $99/Month Is Really $1,188 - The Math",
    description:
      "HealthRx's $99/month semaglutide means $1,188 prepaid at checkout for 12 months. When that beats monthly rivals, when it doesn't, and what's inside the price.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    heroColor: "#F0FAF5",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Translate the headline before comparing anything",
        body: `<div class="qa"><strong>The short answer</strong>HealthRx's <strong>$99/month semaglutide</strong> is a 12-month prepaid plan: <strong>$1,188 due at checkout</strong>, working out to $99 per month over the year. Tirzepatide plans start at <strong>$179/month</strong>. The price includes the clinician consult, the medication at every dose, free overnight cold-chain shipping, and ongoing care-team check-ins - no consultation fee, no shipping charge, cash-pay with no insurance.</div><p>That translation matters because "$99/month" and "$1,188 today" are the same fact wearing different clothes - and comparing HealthRx to monthly-billed rivals without the translation produces nonsense. With it, the comparisons get interesting.</p>`,
      },
      {
        heading: "The committed-year table - where HealthRx competes",
        body: `<p>Price a full year of semaglutide at every provider's real rate and structure:</p><table><tr><th>Provider</th><th>Billing</th><th>Year total</th></tr><tr><td>wellmedr</td><td>$59/mo, 12-mo lock, billed monthly</td><td>$708</td></tr><tr><td>embody</td><td>$69/mo flat, cancel anytime</td><td>$828</td></tr><tr><td>altRx</td><td>$89/mo flat, pause anytime</td><td>$1,068</td></tr><tr><td><strong>HealthRx</strong></td><td><strong>$1,188 once, upfront</strong></td><td><strong>$1,188</strong></td></tr><tr><td>DirectMeds</td><td>$147/mo</td><td>$1,764</td></tr><tr><td>Medvi</td><td>$99/mo promo (reg. $199), all-inclusive</td><td>$1,188</td></tr><tr><td>SHED</td><td>$199/mo + coaching</td><td>$2,388</td></tr></table><p>Read honestly: three providers deliver a cheaper year than HealthRx, two of them (embody, altRx) with no commitment at all - and Medvi's $99 promo currently matches the year total without the lump sum. What the extra $120-$480 buys at HealthRx is <strong>overnight cold-chain delivery on every shipment</strong> - the best logistics in the ranking - plus dose-stable pricing and LegitScript-certified fulfillment. That's the real trade: paying a modest premium over the budget tier for premium shipping, while still beating the whole upper half of the market.</p>`,
      },
      {
        heading: "The cash-flow question nobody prices",
        body: `<p>$1,188 today versus ~$70-99 monthly is a cash-flow decision as much as a price decision. The prepay makes sense when the money is genuinely idle and the commitment is genuinely decided. It makes less sense if fronting it strains the month, or if you're new enough to GLP-1s that a dose change or tolerance issue could reshape your plan - the scenarios covered in <a href="/weight-loss/articles/how-long-for-semaglutide-to-work">how long semaglutide takes to work</a>. A reasonable middle path we'd actually recommend: run 2-3 months at a flexible provider (<a href="/weight-loss/reviews/embody">embody, $69 flat</a>) to confirm fit, then move to HealthRx's prepaid rate for the long haul once certainty is cheap.</p>`,
      },
      {
        heading: "Tirzepatide at HealthRx: check the math twice",
        body: `<p>The $179/month tirzepatide tier competes in a different weight class: <a href="/weight-loss/reviews/wellmedr">wellmedr charges $99</a>, <a href="/weight-loss/reviews/embody">embody $119</a> and <a href="/weight-loss/reviews/directmeds">DirectMeds a flat $147</a> for the same active ingredient - all billed monthly. HealthRx's tirzepatide case rests on its overnight logistics, not its price. If tirzepatide is your medication and delivery speed isn't your priority, shop that tier first.</p><p class="cta-row"><a href="/weight-loss/reviews/healthrx">→ Full HealthRx review with everything the plan includes</a></p><p>This article is general information, not medical advice. Prices as listed at the time of writing - confirm current terms on the provider's site.</p>`,
      },
    ],
  },
  {
    slug: "healthrx-alternatives",
    title: "HealthRx Alternatives 2026: Escaping the $1,188 Prepay",
    description:
      "Six HealthRx alternatives for anyone unready to prepay $1,188 - from embody's $69 flat with no commitment to Medvi's 14,000-review support program.",
    category: "Comparison",
    readTime: "6 min read",
    publishedAt: "2026-08-21",
    updatedAt: "2026-08-21",
    heroColor: "#FBF3EE",
    author: "TreatmentsHub Staff",
    sections: [
      {
        heading: "Why people balk - and what each objection points to",
        body: `<p>HealthRx's program itself audits well (LegitScript-certified, clinician-gated, overnight cold-chain - the case is in <a href="/weight-loss/articles/is-healthrx-legit">our legitimacy investigation</a>). When shoppers walk away, it's for one of three reasons: the <strong>$1,188 at checkout</strong> is too much cash at once, the <strong>newer brand</strong> hasn't earned a year of trust yet, or <strong>tirzepatide from $179</strong> is beatable. Each objection has a precise best answer - not a generic list.</p>`,
      },
      {
        heading: "Objection: \"I won't prepay a year\" → embody, then altRx",
        body: `<p><a href="/weight-loss/reviews/embody">embody</a> is the anti-prepay: <strong>$69/month flat</strong>, cancel anytime, and your total exposure on month one is $69 - not $1,188. It keeps most of what makes HealthRx attractive (LegitScript certification, 503A pharmacies, fast free shipping at 1-2 days vs overnight) and adds a full refund if a provider doesn't approve you. Over a committed year it's also cheaper: $828 vs $1,188. <a href="/weight-loss/reviews/altrx">altRx</a> ($89/month, pause anytime) is the runner-up with a twist - Buy Now, Pay Later, which is precisely the financial instrument the prepay-averse are asking for.</p>`,
      },
      {
        heading: "Objection: \"newer brand, no track record\" → wellmedr or Medvi",
        body: `<p>Track record shopping has two ends. <a href="/weight-loss/reviews/wellmedr">wellmedr</a> pairs budget pricing (<strong>$59/month</strong>, 12-month lock billed monthly - commitment without the lump sum) with scale: over one million patients and a weight-loss warranty. <a href="/weight-loss/reviews/medvi">Medvi</a> (currently $99/month promotional, all-inclusive) brings the receipts money can't fake: <strong>4.4 on Trustpilot across 14,372 reviews</strong>, video visits, and a dietician on every plan. Both let a skeptic buy proof instead of promises - we ran the direct matchup in <a href="/weight-loss/healthrx-vs-medvi">HealthRx vs Medvi</a>.</p>`,
      },
      {
        heading: "Objection: \"tirzepatide pricing\" → three cheaper doors",
        body: `<p>HealthRx's tirzepatide starts at $179; four providers beat it outright: <a href="/weight-loss/reviews/wellmedr">wellmedr at $99</a>, <a href="/weight-loss/reviews/embody">embody at $119</a>, <a href="/weight-loss/reviews/directmeds">DirectMeds at a flat $147</a> - the market's only needle-free sublingual option - and <a href="/weight-loss/reviews/medvi">Medvi at $166 promotional</a>. Annual gaps run $156-$960.</p><table><tr><th>Alternative</th><th>Semaglutide</th><th>Upfront exposure</th><th>Beats HealthRx on</th></tr><tr><td>embody</td><td>$69/mo</td><td>$69</td><td>No commitment, refund policy, year-total</td></tr><tr><td>wellmedr</td><td>$59/mo</td><td>One month</td><td>Price + million-patient scale</td></tr><tr><td>altRx</td><td>$89/mo</td><td>One month (BNPL)</td><td>Flexibility + brand-name shelf</td></tr><tr><td>DirectMeds</td><td>$147/mo</td><td>One month</td><td>Tirzepatide price, drops format</td></tr><tr><td>Medvi</td><td>$99/mo promo</td><td>One month</td><td>Support + 14k-review record</td></tr><tr><td>SHED</td><td>$199/mo</td><td>One month</td><td>Coaching + money-back guarantee</td></tr></table><p>And the counter-case for staying: if the year is genuinely decided and overnight delivery matters to you, none of the objections apply - HealthRx's $99 committed rate with the best logistics in the ranking is exactly what it claims to be.</p><p class="cta-row"><a href="/weight-loss/find-your-match">→ Sixty seconds to a personalized answer: take the matching quiz</a></p><p>This article is general information, not medical advice. Prices as listed at the time of writing.</p>`,
      },
    ],
  },
];
