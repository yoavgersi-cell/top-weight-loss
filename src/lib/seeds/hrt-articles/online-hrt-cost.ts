import type { ArticleData } from "../../config";

// Cross-provider HRT price page for the hub. The idea comes from hrtwomen.com
// (its cost pages are its most-cited pages in Copilot answers); the figures
// are the hub's own verified ones, documented in src/lib/seeds/hrt.ts and the
// three brand cost guides in hrt-guides.ts:
//  - Winona: per-product list ($39 progesterone, $54 estradiol tablets, $89
//    body creams and vaginal cream, $149 patch).
//  - Gala: the hub's provider record carries a flat $69/month from the
//    operator's Oct 8, 2026 screenshots of Gala's hormone-therapy page ("from
//    $69" on its main site). Earlier third-party checkout reports quoted $69
//    for pill plans billed $207 per 12 weeks and $99 for patch plans billed
//    $297 per 12 weeks, and a "from $79" headline has appeared on Gala's
//    pages. The copy states all of this rather than picking one number.
//  - Midi: $250 first visit / $150 follow-ups self-pay, about $50 per visit
//    on average in-network (Midi's figure), testosterone ~$45/30 days to
//    $100+/90 days, medication through your pharmacy.
// No pharmacy or brand-drug prices are asserted. Update PRICES_CHECKED and
// the brand cost guides together.

const PRICES_CHECKED = "October 2026";

export const ONLINE_HRT_COST: ArticleData = {
  slug: "online-hrt-cost",
  title: "How Much Does HRT Cost Online? Winona, Gala & Midi (2026)",
  description:
    "Online HRT runs about $39-$188 a month cash-pay, or about $50 a visit plus pharmacy costs with insurance. Every Winona, Gala and Midi price and year-one totals.",
  category: "Provider Guide",
  readTime: "14 min read",
  publishedAt: "2026-10-25",
  updatedAt: "2026-10-25",
  heroColor: "#FBE9F0",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "Cash-pay online HRT costs roughly $39 to $188 a month at Winona and Gala, depending on the products. With in-network PPO insurance at Midi Health, visits average about $50 (Midi's figure) and medication goes through your pharmacy plan.",
    "Winona prices per product: progesterone capsules from $39, estradiol tablets $54, estrogen body creams and vaginal cream $89, the estrogen patch $149 a month, with the physician review, messaging and shipping included.",
    "Gala sells one flat plan. Its hormone-therapy page showed $69 a month when we captured it on October 8, 2026; third-party checkout reports have quoted $69 for pills and $99 for patches on 12-week billing, and a 'from $79' headline also appears. The checkout price is the one that counts.",
    "Midi Health charges per visit: $250 for the first and $150 for follow-ups self-pay, or your copay in-network. It does not bill Medicare and is not in-network with HMO plans.",
    "For an estrogen-plus-progesterone first year, expect about $828 at Gala's flat $69 (up to about $1,188 if a $99 patch tier applies), $1,068 to $2,256 at Winona, and about $200 in visits plus pharmacy copays at Midi with good insurance.",
  ],
  sections: [
    {
      heading: "How much does HRT cost online?",
      body: `<div class="qa"><strong>The short answer</strong>Online menopause hormone therapy costs about <strong>$39 to $188 a month</strong> on cash-pay services, depending on the provider and what you are prescribed, or about <strong>$50 a visit plus pharmacy costs</strong> at an insurance-billed clinic. Among the three providers we rank: <strong>Winona</strong> charges per product, from $39 (progesterone) to $149 (estrogen patch) a month; <strong>Gala</strong> charges one flat plan, $69 a month on its hormone-therapy page when we last captured it; <strong>Midi Health</strong> bills your insurance (about $50 a visit on average in-network, per Midi) or $250 then $150 a visit self-pay, with medication through your own pharmacy. Prices checked ${PRICES_CHECKED}.</div>
<table><tr><th>Provider</th><th>Pricing model</th><th>Typical monthly cost</th><th>Insurance</th><th>Medication</th></tr><tr><td><a href="/hrt/reviews/winona">Winona</a></td><td>Per product, monthly subscription</td><td>$39-$149 per product; about $89-$188 for estrogen plus progesterone</td><td>Not billed; HSA/FSA accepted</td><td>Included and shipped</td></tr><tr><td><a href="/hrt/reviews/gala">Gala</a></td><td>One flat plan</td><td>$69 a month (Oct 8, 2026 capture); $69-$99 reported by route; "from $79" also advertised</td><td>Not billed; FSA/HSA accepted</td><td>Included and shipped</td></tr><tr><td><a href="/hrt/reviews/midi">Midi Health</a></td><td>Per visit plus your pharmacy</td><td>About $50 a visit in-network (Midi's average); $250 first / $150 follow-up self-pay; plus medication</td><td>Most commercial PPO plans; not HMO, Medicare or Medicaid</td><td>Sent to your pharmacy, priced by your plan</td></tr></table>
<p>This page gathers every published price in one place, shows what each price includes, works out realistic first-year totals and tells you which model is usually cheapest for your situation. The per-provider detail lives in <a href="/hrt/articles/winona-cost">Winona cost</a>, <a href="/hrt/articles/gala-cost">Gala cost</a> and <a href="/hrt/articles/midi-cost">Midi Health cost</a>.</p>`,
    },
    {
      heading: "What does each HRT product cost at each provider?",
      body: `<p><strong>Winona publishes a price per product. Gala covers everything it prescribes under one plan price. Midi does not sell medication at all; your pharmacy does.</strong></p>
<table><tr><th>Product</th><th>Winona</th><th>Gala</th><th>Midi Health</th></tr><tr><td>Estradiol tablets</td><td>From $54/mo (FDA-approved)</td><td>In the plan</td><td>Pharmacy price via your plan</td></tr><tr><td>Estrogen patch</td><td>From $149/mo (FDA-approved)</td><td>In the plan (patch plans reported at $99/mo by third parties)</td><td>Pharmacy price via your plan</td></tr><tr><td>Estrogen body cream</td><td>From $89/mo (compounded)</td><td>Not offered</td><td>Not offered</td></tr><tr><td>Estrogen plus progesterone body cream</td><td>From $89/mo (compounded)</td><td>Not offered</td><td>Not offered</td></tr><tr><td>Progesterone capsules</td><td>From $39/mo (FDA-approved)</td><td>In the plan (oral or vaginal)</td><td>Pharmacy price via your plan</td></tr><tr><td>Vaginal estrogen</td><td>Vaginal estrogen cream from $89/mo</td><td>Vaginal estradiol in the plan</td><td>Pharmacy price via your plan</td></tr><tr><td>Testosterone</td><td>Not prescribed</td><td>Not listed</td><td>About $45 per 30 days to $100+ per 90 days, self-pay, some states</td></tr><tr><td>Clinician access</td><td>Included</td><td>Included</td><td>About $50 a visit in-network; $250 / $150 self-pay</td></tr></table>
<p>"From" is the starting price for the lowest dose or plan; higher doses can cost more and promotions change. Winona's tablet and patch prices come from its product pages as surfaced in search and third-party reviews; its $39 and $89 figures are the ones we have tracked since the review launched. Gala's per-route figures are third-party checkout reports, not Gala's own price list, so treat them as indicative.</p>`,
    },
    {
      heading: "Why do we quote two numbers for Gala?",
      body: `<p><strong>Because Gala's own pages have shown more than one. When we captured Gala's hormone-therapy page on October 8, 2026, it advertised a flat $69 a month with no price rise at dose changes; its main site phrased the same offer as "from $69." Earlier third-party reviews that walked the checkout reported $69 a month for estradiol-pill plans billed $207 every 12 weeks and $99 a month for patch plans billed $297 every 12 weeks, and a "from $79" headline has also appeared on Gala's pages.</strong></p>
<p>The most likely explanation is the route: pills at the low end, patches higher, with the headline figure moving as promotions change. Gala's HRT also shares a website with its GLP-1 weight-loss program, whose prices start at $149, so make sure the number you are reading belongs to the hormone-health plan. Our catalog and reviews quote the $69 we captured; our <a href="/hrt/articles/gala-cost">Gala cost guide</a> shows the year-one math at every figure we have seen. Whatever the headline, Gala's checkout shows the exact plan and price before you pay, and that is the number to trust.</p>`,
    },
    {
      heading: "What is included in the price?",
      body: `<p><strong>Winona and Gala bundle the clinician, follow-up, medication and shipping into the monthly price. Midi sells the visit and leaves medication to your pharmacy, so its headline never includes the hormones.</strong></p>
<table><tr><th>Included?</th><th>Winona</th><th>Gala</th><th>Midi Health</th></tr><tr><td>Clinician review</td><td>Yes: a board-certified physician reviews your online intake</td><td>Yes: a US-licensed clinician reviews your evaluation</td><td>Per visit: video, about 30 minutes</td></tr><tr><td>Follow-up and messaging</td><td>Unlimited messaging and follow-ups</td><td>Check-ins and dose adjustments in the app</td><td>Follow-up visits billed per visit</td></tr><tr><td>Medication</td><td>Yes</td><td>Yes</td><td>No; your pharmacy</td></tr><tr><td>Shipping</td><td>Free</td><td>Free, 1-2 days</td><td>Pharmacy pickup or delivery</td></tr><tr><td>Video visit</td><td>No</td><td>No; message-based</td><td>Yes</td></tr><tr><td>Labs</td><td>Not usually needed to start</td><td>Not usually needed to start</td><td>Billed separately if ordered</td></tr></table>
<p>The right comparison is the full cost of the regimen you will actually use, not the lowest number on any one page.</p>`,
    },
    {
      heading: "What does a typical estrogen-plus-progesterone regimen cost per month?",
      body: `<p><strong>Most women with a uterus who take estrogen also take progesterone, so the realistic monthly figure is a combination: about $89 to $188 at Winona, Gala's single plan price, or your pharmacy copays plus visits at Midi.</strong></p>
<table><tr><th>Regimen</th><th>Winona</th><th>Gala</th><th>Midi Health (in-network)</th></tr><tr><td>Estrogen pill plus progesterone</td><td>About $54 + $39 = $93/mo</td><td>$69/mo flat (reported pill tier $69)</td><td>Two pharmacy copays plus visits</td></tr><tr><td>Estrogen patch plus progesterone</td><td>About $149 + $39 = $188/mo</td><td>$69/mo flat (reported patch tier $99)</td><td>Two pharmacy copays plus visits</td></tr><tr><td>Combined estrogen-plus-progesterone body cream</td><td>About $89/mo</td><td>Not offered</td><td>Not applicable</td></tr><tr><td>Estrogen only (after hysterectomy)</td><td>From $54 (pill) or $149 (patch)</td><td>Plan price</td><td>One pharmacy copay plus visits</td></tr><tr><td>Vaginal estrogen only</td><td>About $89/mo</td><td>Plan price</td><td>One pharmacy copay plus visits</td></tr></table>
<p>We could not confirm whether Winona discounts two products bought together, so its combined figures are upper estimates. One caution on the cheapest Winona line: the progesterone in a body cream is not interchangeable with progesterone capsules for protecting the uterus. Read <a href="/hrt/articles/progesterone-side-effects">progesterone for menopause</a> before choosing on price.</p>`,
    },
    {
      heading: "What does online HRT cost in the first year?",
      body: `<p><strong>For an estrogen-plus-progesterone first year: about $828 at Gala's flat $69, about $1,068 to $2,256 at Winona, and about $200 in visits plus 12 months of pharmacy copays at Midi with in-network insurance, or about $700 in visits plus medication self-pay.</strong></p>
<table><tr><th>Provider and scenario</th><th>First-year cost</th></tr><tr><td>Gala at the flat $69/mo we captured</td><td>About $828</td></tr><tr><td>Gala at the "from $79" headline</td><td>About $948</td></tr><tr><td>Gala pill plan per third-party reports ($207 per 12 weeks)</td><td>About $897 over 52 weeks</td></tr><tr><td>Gala patch plan per third-party reports ($99/mo, $297 per 12 weeks)</td><td>About $1,188 to $1,287</td></tr><tr><td>Winona estrogen-plus-progesterone body cream</td><td>About $1,068</td></tr><tr><td>Winona tablets plus progesterone capsules</td><td>About $1,116</td></tr><tr><td>Winona patch plus progesterone capsules</td><td>About $2,256</td></tr><tr><td>Midi in-network, four visits at about $50</td><td>About $200 plus 12 months of pharmacy copays</td></tr><tr><td>Midi self-pay, four visits</td><td>About $700 ($250 + 3 × $150) plus medication</td></tr></table>
<p>Assumptions: listed starting prices hold for 12 months; at Midi, one initial visit plus three follow-ups, which your clinician may change. Twelve-week billing means 4.33 charges a year, so a "monthly" price on that cycle costs about 8% more than price × 12. Real totals depend on dose, promotions, your deductible and copays, and how much follow-up you need.</p>`,
    },
    {
      heading: "Which online HRT option is cheapest for you?",
      body: `<p><strong>With good PPO insurance, Midi is usually cheapest: visits at a copay and generic hormones at your pharmacy's formulary price. Paying cash, Gala's flat plan is usually the lowest all-in figure. Winona costs more and offers the widest choice of estrogen forms with no appointment to book.</strong></p>
<table><tr><th>Your situation</th><th>Usually cheapest</th><th>Why</th></tr><tr><td>Commercial PPO plan, generics covered</td><td>Midi Health</td><td>Visits at about $50 on average; medication at your pharmacy copay</td></tr><tr><td>No insurance, want an estrogen pill plus progesterone</td><td>Gala</td><td>$69/mo all-in versus about $93 at Winona</td></tr><tr><td>No insurance, want a patch</td><td>Gala</td><td>$69-$99/mo all-in versus about $188 at Winona (patch plus capsules)</td></tr><tr><td>Want a body cream</td><td>Winona</td><td>The only one of the three that offers estrogen body creams (from $89)</td></tr><tr><td>HMO plan or Medicare</td><td>Gala or Winona cash, or Midi self-pay</td><td>Midi is not in-network with HMOs and does not bill Medicare</td></tr><tr><td>High deductible not yet met</td><td>Compare Midi's $250 / $150 self-pay rate with Gala's flat plan</td><td>You pay Midi's full visit price until the deductible is met</td></tr><tr><td>Want testosterone for low libido</td><td>Midi Health (some states)</td><td>The only one of the three that prescribes it</td></tr></table>
<p>Cheapest is not always best. Weigh the care model (video visit versus messaging), the product range and whether the products are FDA-approved. Our <a href="/hrt/articles/best-online-hrt-providers-compared">provider comparison</a> and the <a href="/hrt">HRT rankings</a> cover that side.</p>`,
    },
    {
      heading: "How much does HRT cost without insurance?",
      body: `<p><strong>Without insurance, online HRT typically costs $69 to $188 a month for estrogen plus progesterone on a cash-pay service, or $250 for a first visit and $150 per follow-up at Midi plus the pharmacy's cash price for medication.</strong></p>
<p>Paying out of pocket, the choice is between an all-inclusive subscription and paying separately for visits and medication:</p>
<ul><li><strong>All-inclusive subscription</strong> (Winona, Gala): one predictable monthly price covering clinician, follow-up, medication and shipping.</li><li><strong>Visit plus pharmacy</strong> (Midi self-pay, or any clinician): you pay for the visit, then for the prescription at the pharmacy's cash price. Generic estradiol and micronized progesterone can be inexpensive with discount programs, but prices vary widely by pharmacy, dose and location, so check before you commit.</li></ul>
<p>HSA and FSA funds can generally be used for prescribed hormone therapy and clinician visits, which lowers the effective cost if you have one.</p>`,
    },
    {
      heading: "Does insurance cover online HRT?",
      body: `<p><strong>It depends on the provider. Midi Health is in-network with most commercial PPO plans and prescribes to your pharmacy, so both the visit and the medication can run through insurance. Winona and Gala do not bill insurance, and because they ship the medication themselves there is no pharmacy claim for your drug plan either.</strong></p>
<table><tr><th></th><th>Winona</th><th>Gala</th><th>Midi Health</th></tr><tr><td>Bills insurance for visits</td><td>No</td><td>No</td><td>Yes, most commercial PPO plans</td></tr><tr><td>Medication through your drug plan</td><td>No (shipped by Winona)</td><td>No (shipped by Gala)</td><td>Yes, subject to your formulary</td></tr><tr><td>Out-of-network reimbursement</td><td>You can submit receipts; depends on your plan</td><td>Not confirmed</td><td>Not applicable in-network</td></tr><tr><td>HMO plans</td><td>Cash-pay</td><td>Cash-pay</td><td>Not in-network; self-pay</td></tr><tr><td>Medicare</td><td>Cash-pay</td><td>Cash-pay</td><td>Not billed; self-pay only</td></tr><tr><td>Medicaid</td><td>Cash-pay</td><td>Cash-pay</td><td>Cannot treat Medicaid patients</td></tr></table>
<p>Before booking an insurance-billed visit, confirm Midi is in-network for your specific plan, know where you stand on your deductible and ask for an estimate. Billing surprises are the most common complaint about insurance-based telehealth; see <a href="/hrt/articles/is-midi-legit">Is Midi Health legit?</a></p>`,
    },
    {
      heading: "Can you pay for online HRT with an HSA or FSA?",
      body: `<p><strong>Generally yes. Prescription medication and care from licensed clinicians are usually qualified medical expenses. Winona and Gala both accept HSA and FSA cards; Midi visits and pharmacy copays are typically eligible.</strong> Confirm with your plan administrator and keep receipts. Paying with pre-tax money cuts the real cost by your marginal tax rate.</p>`,
    },
    {
      heading: "What hidden costs should you check?",
      body: `<ul><li><strong>Per product versus per regimen:</strong> Winona prices each product, so adding progesterone adds about $39 a month.</li><li><strong>Billing cycle:</strong> plans billed every 12 weeks (reported for Gala) change the upfront payment and add about 8% to a naive monthly × 12 total.</li><li><strong>Dose changes:</strong> higher doses can cost more on per-product pricing. Gala says its price does not rise at dose changes.</li><li><strong>Deductibles:</strong> with insurance you may pay the full visit price until the deductible is met.</li><li><strong>Labs:</strong> billed separately at insurance-based clinics if ordered.</li><li><strong>Renewals and cancellation:</strong> know how and when to cancel to avoid the next charge, and cancel in writing. Gala's recent low-star reviews include an annual-prepayment refund dispute, so pay monthly until deliveries prove smooth.</li><li><strong>Pharmacy price swings:</strong> brand-name products and some patches cost far more than generic tablets, and some patches were in short supply in 2026.</li></ul>`,
    },
    {
      heading: "How much do testosterone and other add-ons cost?",
      body: `<p><strong>Of the three providers, only Midi Health prescribes testosterone for women, in some states and self-pay, at about $45 for a 30-day supply to $100+ for 90 days per Midi, plus any extra labs and visits a controlled substance requires.</strong> Midi also sells an optional supplement line through its shop at $31.99 to $43.99 per product (sale prices, October 2026); supplements are not hormone therapy. There is no FDA-approved testosterone product for women in the US; our <a href="/hrt/articles/menopause-complete-guide">complete menopause guide</a> covers when it is considered.</p>`,
    },
    {
      heading: "Is Gala cheaper than Winona?",
      body: `<p><strong>Usually, for the same regimen. A typical estrogen-plus-progesterone plan is $69 a month at the flat price we captured (up to $99 by third-party reports for patch plans), against about $93 to $188 at Winona.</strong> Winona's case is choice and FDA-approved options you can name: estradiol tablets, a patch and progesterone capsules alongside its compounded creams, with a physician reachable by message. Side by side in <a href="/hrt/winona-vs-gala">Winona vs Gala</a>.</p>`,
    },
    {
      heading: "Is Midi Health cheaper with insurance?",
      body: `<p><strong>Often, yes. With in-network PPO coverage Midi says patients pay about $50 a visit on average, and generic hormones through your pharmacy plan are often low-cost, so a year can come to about $200 in visits plus pharmacy copays.</strong> Without insurance, or before your deductible is met, $250 then $150 a visit plus medication usually costs more than a flat cash plan. See <a href="/hrt/articles/midi-cost">Midi Health cost</a> and <a href="/hrt/gala-vs-midi">Gala vs Midi Health</a>.</p>`,
    },
    {
      heading: "What is the cheapest way to get an estrogen patch online?",
      body: `<p><strong>With good insurance, a prescription to your own pharmacy through an in-network clinic such as Midi. Paying cash, Gala's plan covers a patch at $69 a month on the price we captured ($99 by third-party reports), against $149 a month for Winona's patch alone, plus about $39 for progesterone if you need it.</strong> Patches were intermittently hard to find in 2026; services that ship medication handle sourcing, while a pharmacy prescription may need a brand switch. See <a href="/hrt/articles/estrogen-patch-vs-pill">estrogen patch vs pill</a>.</p>`,
    },
    {
      heading: "Why do online HRT prices differ so much?",
      body: `<p><strong>Because the providers sell different things. Winona and Gala sell an all-inclusive service with medication; Midi sells clinical visits and leaves medication to your insurer and pharmacy.</strong> Within cash-pay services, prices then differ by product range (creams and patches cost more than tablets), by per-product versus per-plan pricing, and by promotions. That is why the regimen you will actually use is the thing to compare, not the "from" price.</p>`,
    },
    {
      heading: "How we gather and check these prices",
      body: `<p>Every figure here is the same one used in our provider reviews and brand cost guides. Winona's prices come from its product listings; Gala's $69 is from the operator's October 8, 2026 capture of Gala's hormone-therapy page, with the third-party per-route figures and the "from $79" headline labeled as such; Midi's visit prices and testosterone range come from Midi's published pricing and help pages. Prices were last checked in ${PRICES_CHECKED}. Providers change prices and run promotions, so confirm at checkout. We may earn a commission from provider links; it does not change the figures we publish or our rankings (<a href="/weight-loss/how-we-rank">how we rank</a>).</p>`,
    },
    {
      heading: "The bottom line on online HRT costs",
      body: `<p>Online HRT has three pricing models, not one price. With good PPO insurance, an in-network clinic such as <a href="/hrt/reviews/midi">Midi Health</a> plus generic hormones from your pharmacy is usually the cheapest route. Paying cash, <a href="/hrt/reviews/gala">Gala</a>'s flat plan is usually the lowest all-in price, while <a href="/hrt/reviews/winona">Winona</a> costs more and offers the widest choice of estrogen forms with no appointment. Whichever you pick, price the full regimen, including progesterone if you have a uterus, and confirm the number at checkout.</p>
<p class="cta-row"><a href="/hrt/articles/how-to-get-hrt-online">→ How to get HRT online, step by step</a></p>
<p class="cta-row"><a href="/hrt">→ Compare the online HRT providers we rank</a></p>
<p><em>This page is general information, not medical or financial advice. Prices change; confirm with each provider.</em></p>`,
    },
  ],
};
