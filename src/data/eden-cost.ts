import type { Article } from "./articles";
import { PRICE_INDEX, priceValue } from "@/lib/price-index";

// ───── Eden (TryEden) cost (Nov 27, 2026) ─────
// Built only from the Nov 27, 2026 evidence file (Atlas): Eden's own pages on eden.health and tryeden.com (read Nov 27, 2026), the FDA
// warning letter page (read Nov 27, 2026) and the earlier Nov 24 read recorded in
// ops/research/2026-11-24-eden-evidence.md. Comparison figures for embody and
// welludr come from src/lib/price-index.ts at build time, not from this file.
// No customer reviews, no review-site data. Compounded semaglutide and
// tirzepatide are not FDA-approved. Nothing here is medical advice.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  sema: "https://www.eden.health/glp-1/semaglutide",
  tirz: "https://www.eden.health/glp-1/tirzepatide",
  terms: "https://www.eden.health/policies/terms-of-service",
  refund: "https://www.eden.health/policies/refund-policy",
  faq: "https://www.eden.health/frequently-asked-questions",
  wegovy: "https://www.eden.health/treatment/wegovy",
  zepbound: "https://www.eden.health/treatment/zepbound",
  home: "https://www.tryeden.com/",
  letter:
    "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/eden-health-international-inc-dba-eden-728279-06082026",
};

// Eden's listed monthly prices (Eden's product pages and Terms, read Nov 27, 2026).
const EDEN = { sema: 99, tirz: 129, wegovy: 1695, zepbound: 1399 };
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const months = (monthly: number, n: number) => usd(monthly * n);

// embody and welludr: the verified index is the only source for these numbers.
const idx = (id: string) => {
  const row = PRICE_INDEX.find((r) => r.providerId === id);
  if (!row) throw new Error(`price-index row missing: ${id}`);
  return {
    sema: priceValue(row.semaglutide) ?? 0,
    tirz: priceValue(row.tirzepatide) ?? 0,
  };
};
const EMBODY = idx("embody");
const WELLUDR = idx("wellmedr");

const stickerNote =
  EDEN.sema > Math.max(EMBODY.sema, WELLUDR.sema) && EDEN.tirz > Math.max(EMBODY.tirz, WELLUDR.tirz)
    ? "On sticker price Eden costs more than both."
    : "Compare the columns above; the order depends on the index values.";

export const edenCostArticle: Article = {
  slug: "eden-cost",
  image: "/article-images/eden-cost.webp",
  imageAlt: "Woman in her 50s at a sunlit kitchen counter with a blank notepad and a mug of tea, planning a monthly budget",
  title: "Eden Cost 2026: $99 Semaglutide, $129 Tirzepatide",
  description:
    "Eden (TryEden) pricing: semaglutide $99/mo and tirzepatide $129/mo, the same at every dose (site, read Nov 27, 2026). What the Terms add.",
  category: "Guide",
  readTime: "11 min read",
  publishedAt: "2026-11-27",
  updatedAt: "2026-11-27",
  heroColor: "#EEF4FB",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    `Eden lists compounded semaglutide at ${usd(EDEN.sema)} a month and compounded tirzepatide at ${usd(EDEN.tirz)}, the same every month and at every dose (eden.health, read Nov 27, 2026). Neither is FDA-approved.`,
    `Twelve months at the listed price is ${months(EDEN.sema, 12)} for semaglutide and ${months(EDEN.tirz, 12)} for tirzepatide (our arithmetic). Eden shows no 3-, 6- or 12-month plan, and its Terms let it change prices.`,
    `Eden's pages say "There is no separate membership fee," but its Terms still describe a "recurring membership model, as is displayed at checkout." We did not see checkout, so we have not seen the total due.`,
    `Brand-name Wegovy is listed at ${usd(EDEN.wegovy)} a month and Zepbound at ${usd(EDEN.zepbound)}. Cancel before your next scheduled billing date (48 hours ahead for the Eden Membership Program); charges are non-refundable once an order is fulfilled.`,
  ],
  sections: [
    {
      heading: "How much does Eden cost per month?",
      body: `<div class="qa"><strong>The short answer</strong>Eden lists compounded semaglutide at $99 a month and compounded tirzepatide at $129, the same in month 1, month 2, month 3 and every month, at every dose (eden.health, read Nov 27, 2026). Eden says there is no separate membership fee. We have not seen the checkout total. Compounded semaglutide and tirzepatide are not FDA-approved.</div>
<p>Eden (also known as TryEden) shows its prices on two product pages. There is no separate pricing page: eden.health/pricing returned a 404 when we read the site on Nov 27, 2026.</p>
<table><thead><tr><th>Month</th><th>Compounded semaglutide (not FDA-approved)</th><th>Compounded tirzepatide (not FDA-approved)</th></tr></thead><tbody>
<tr><td>Month 1</td><td>$99</td><td>$129</td></tr>
<tr><td>Month 2</td><td>$99</td><td>$129</td></tr>
<tr><td>Month 3</td><td>$99</td><td>$129</td></tr>
<tr><td>Every month after</td><td>$99</td><td>$129</td></tr>
</tbody></table>
<p>Source: the table on each of Eden's ${ext(S.sema, "semaglutide")} and ${ext(S.tirz, "tirzepatide")} pages, read Nov 27, 2026. The pages carry no date, so our read date is the only date we can give. The Terms (last revised Nov 16, 2026) repeat both figures in a California clause: "Your plan renews automatically each month at the price shown at checkout (currently $99.00 per month for compounded semaglutide and $129.00 per month for compounded tirzepatide) until you cancel" (${ext(S.terms, "Terms of Service")}, read Nov 27, 2026).</p>
<p>We found no first-month price, new-member discount or promo code on the GLP-1 pages or on the tryeden.com homepage. "First month" pricing appears only on Eden's non-GLP-1 products, and those figures changed between our reads, so we do not quote them. Eden also shows no 1-, 3-, 6- or 12-month plan and no prepay price. The pricing text says: "Plans are offered as a subscription service which you can cancel at any time."</p>`,
    },
    {
      heading: "What does Eden's monthly price include, and what does it leave out?",
      body: `<p>Eden says the monthly price "includes your prescribed Authentic Eden™ medication and the complete care system around it: provider review, clinician-guided clinical support, 24/7 messaging, dose and side-effect guidance, priority delivery, member community, and more" (FAQ on the ${ext(S.tirz, "tirzepatide page")}, read Nov 27, 2026). Its homepage FAQ, as we read it on Nov 24, 2026, adds that plans include "the cost of the provider visit, prescription medications, and free shipping."</p>
<table><thead><tr><th>Item</th><th>What Eden's pages say</th></tr></thead><tbody>
<tr><td>Medication</td><td>Included. Compounded, not FDA-approved: "The FDA does not review compounded medications for safety or effectiveness."</td></tr>
<tr><td>Provider review and follow-up</td><td>Included; Eden says clinician-guided clinical support and 24/7 messaging</td></tr>
<tr><td>Labwork</td><td>"Provider-directed labwork, included when needed"</td></tr>
<tr><td>Shipping</td><td>"Free expedited shipping on all orders"</td></tr>
<tr><td>Injection supplies</td><td>The page lists "smooth-glide supplies for easier injections" as marketing copy. It does not list items, so we do not say which supplies come in the box</td></tr>
<tr><td>Insurance</td><td>Not accepted: the Terms say Eden and its providers "do not accept commercial health insurance plans" (read Nov 24, 2026). The product pages say "No insurance needed" and, as read Nov 24, 2026, "FSA &amp; HSA eligible"</td></tr>
<tr><td>Sales tax and anything shown only at checkout</td><td>Not stated on any page we read</td></tr>
<tr><td>Brand-name drugs</td><td>Not part of the $99 or $129 plans; priced separately (see below)</td></tr>
</tbody></table>
<p>Eden's page also lists daily virtual workouts and a member community. We treat those as part of the same price because Eden says "Everything included in one clear monthly price," but we did not use them and cannot say how much they add.</p>`,
    },
    {
      heading: "Is Eden a membership or not?",
      body: `<p>Eden's own documents say two different things, and we cannot reconcile them from the public pages.</p>
<table><thead><tr><th>Where</th><th>What it says</th></tr></thead><tbody>
<tr><td>Product pages (read Nov 27, 2026)</td><td>The plan card says "No membership fees," repeated on each card. The FAQ says: "There is no separate membership fee."</td></tr>
<tr><td>Terms of Service, section 14 (revised Nov 16, 2026; read Nov 27, 2026)</td><td>"Eden's Services may be offered through a recurring membership model, as is displayed at checkout." Also: "Except as otherwise described at checkout, medical consultations and provider interactions are included within your membership fee and will not be separately charged."</td></tr>
<tr><td>Terms, refunds</td><td>A full refund of "your initial membership fee" if no prescription is issued after intake</td></tr>
<tr><td>Terms, California clause</td><td>The only GLP-1 dollar figures in the Terms are $99.00 and $129.00 a month, given as the renewal price with no second line</td></tr>
</tbody></table>
<p>We searched the semaglutide page, tirzepatide page, FAQ, Terms, refund page and homepage for any dollar amount tied to a membership, platform, enrollment or consultation fee. We found none. Some third-party sites quote a membership on top of the medication price; Eden's own pages say there is none (read Nov 27, 2026), and we found no Eden page that supports the higher figures.</p>
<p><strong>What we did not see.</strong> Eden's sign-up flow at app.eden.health returned only a shell page, and we did not enter personal details to reach the checkout screen. The Terms say the membership model is "displayed at checkout" and that billing frequency is "disclosed at checkout," so a checkout-only line cannot be ruled out from the public pages. Until someone shows the order summary, the honest statement is: Eden lists $99 and $129 a month and says no separate membership fee; we have not seen the checkout total, the renewal date or the tax.</p>`,
    },
    {
      heading: "Does Eden's $129 tirzepatide price stay the same at higher doses?",
      body: `<p>That is what Eden says. The tirzepatide page headline reads "Monthly pricing at every dose," and the page adds: "The price you start with is the price you keep. No pricing gimmicks or surprises. Just one flat, all-inclusive monthly price at every dose" (read Nov 27, 2026). The semaglutide page shows the same $99 in every column of its table.</p>
<p>The same-price promise has limits that Eden prints:</p>
<ul>
<li>The footer says the policy applies "regardless of dosage adjustments throughout your program (excluding new member discounts or specific plans). Terms apply."</li>
<li>The Terms say: "Prices are subject to change at any time in our sole discretion."</li>
<li>They also say: "Same price per dose offers automatically expire within 24 hours of any price changes available through eden.health."</li>
<li>"Promotional offers including 'first month' are not subject to the same price per dose offerings and are instead promotional offers. Same price per dose offers only apply to standard full-price purchases based on the price listed on the website."</li>
<li>The California clause adds that Eden "will notify you of any material change to subscription pricing or terms before the change takes effect."</li>
</ul>
<p>We cannot see a member's billing screen, so we have no way to confirm what a dose change does to a real invoice. The flat-price claim is Eden's statement, backed by its Terms. We found no GLP-1 promotion with a code or end date on the pages we read.</p>`,
    },
    {
      heading: "Does Eden's price go up if prices change or I come back later?",
      body: `<p>The FAQ asks whether the price is introductory and answers: "No. The price you see is the price you'll keep. No second-month increase. No dose-based price hikes. No long-term contract. Your price remains protected while your Eden account stays active, and permitted pauses won't affect it. If you close your account and later return, the price available at that time will apply" (tirzepatide page, read Nov 27, 2026).</p>
<p>Read that with the Terms sentence above: Eden can change prices in its sole discretion and has to notify you first. The plan card's "guaranteed for life" wording is Eden's marketing, and it depends on keeping the account open. If you cancel and return, you pay whatever the price is that day. The conditions for a permitted pause are not stated on the pages we read.</p>`,
    },
    {
      heading: "What does a year of Eden cost?",
      body: `<p>Eden shows no plan longer than one month, so a year is twelve monthly charges. The table multiplies the listed monthly price by the number of months. It assumes the price does not change, no discount applies, you do not pause, and tax and any checkout-only item are zero because we could not see them.</p>
<table><thead><tr><th>Product</th><th>Monthly</th><th>3 months</th><th>6 months</th><th>12 months</th></tr></thead><tbody>
<tr><td>Compounded semaglutide (not FDA-approved)</td><td>${usd(EDEN.sema)}</td><td>${months(EDEN.sema, 3)}</td><td>${months(EDEN.sema, 6)}</td><td>${months(EDEN.sema, 12)}</td></tr>
<tr><td>Compounded tirzepatide (not FDA-approved)</td><td>${usd(EDEN.tirz)}</td><td>${months(EDEN.tirz, 3)}</td><td>${months(EDEN.tirz, 6)}</td><td>${months(EDEN.tirz, 12)}</td></tr>
<tr><td>Wegovy (FDA-approved brand), as listed</td><td>${usd(EDEN.wegovy)}</td><td>${months(EDEN.wegovy, 3)}</td><td>${months(EDEN.wegovy, 6)}</td><td>${months(EDEN.wegovy, 12)}</td></tr>
<tr><td>Zepbound (FDA-approved brand), as listed</td><td>${usd(EDEN.zepbound)}</td><td>${months(EDEN.zepbound, 3)}</td><td>${months(EDEN.zepbound, 6)}</td><td>${months(EDEN.zepbound, 12)}</td></tr>
</tbody></table>
<p>Sources: Eden's ${ext(S.sema, "semaglutide")}, ${ext(S.tirz, "tirzepatide")}, ${ext(S.wegovy, "Wegovy")} and ${ext(S.zepbound, "Zepbound")} pages, read Nov 27, 2026; multiplication is ours. Tirzepatide costs ${usd(EDEN.tirz - EDEN.sema)} a month more than semaglutide on Eden, which is ${usd((EDEN.tirz - EDEN.sema) * 12)} over a year.</p>
<p><strong>The brand-name rows.</strong> Eden lists Wegovy at ${usd(EDEN.wegovy)} a month ("No long-term contracts. Same price at every dose.") and Zepbound at ${usd(EDEN.zepbound)} a month. Its footer says "Eden has no ownership over brand-name, FDA-approved medications or products," and the brand pages do not say which pharmacy fills those prescriptions. A year of Wegovy at the listed price is ${usd(EDEN.wegovy * 12 - EDEN.sema * 12)} more than a year of compounded semaglutide; a year of Zepbound is ${usd(EDEN.zepbound * 12 - EDEN.tirz * 12)} more than compounded tirzepatide. Those are different products with different regulatory status, not two prices for the same item. Eden's own page says compounded medications are not FDA-approved and that the FDA does not review them for safety or effectiveness. Which one is appropriate is a decision for you and a licensed clinician.</p>`,
    },
    {
      heading: "How do I cancel Eden, and what is the cutoff?",
      body: `<p>Per the Terms (revised Nov 16, 2026) and the FAQ, read Nov 27, 2026:</p>
<ol>
<li>Cancel "through your Account Settings or by contacting Customer Support." The FAQ says you can pause or cancel "from your patient portal."</li>
<li>Do it before the next billing date. For the Eden Membership Program, "cancellations must be submitted at least forty-eight (48) hours before your next renewal date, as further described at checkout if applicable." The California clause also says 48 hours.</li>
<li>Know what cancelling does not reach. "Cancellations apply to future billing cycles and do not apply to orders already processed or shipped." The FAQ adds that orders already sent to the pharmacy "may not be cancellable, but if an order is still pending, Eden support can help."</li>
</ol>
<p>We found no cancellation fee, early-termination fee or restocking fee on any page we read, and Eden says there is no long-term contract. We did not see the cancel screen, so we cannot say what it shows, whether it offers a discount to stay, or which renewal date it displays. For other providers' cutoffs side by side, see our guide to <a href="/weight-loss/articles/how-to-cancel-telehealth-glp1-subscription">cancelling a GLP-1 telehealth subscription</a>.</p>`,
    },
    {
      heading: "Can I get a refund from Eden?",
      body: `<p>Mostly no, once an order is fulfilled. These are the cases in the Terms and on the ${ext(S.refund, "refund policy page")} (read Nov 27, 2026):</p>
<table><thead><tr><th>Situation</th><th>What Eden's documents say</th></tr></thead><tbody>
<tr><td>No prescription is issued after intake</td><td>"You will receive a full refund of your initial membership fee."</td></tr>
<tr><td>A billing period has already started</td><td>"Membership fees for a billing period already commenced are non-refundable."</td></tr>
<tr><td>You cancel after an order has shipped</td><td>Cancellation does not apply to orders already processed or shipped; "We cannot accept returns of prescription products."</td></tr>
<tr><td>Eden cannot fill your plan</td><td>A prorated refund of the unshipped portion of the listed monthly price, with deductions only for treatment already provided. For members in the Eden Membership Program, "only the medication or product cost component of any prepaid amount is subject to prorated refund."</td></tr>
<tr><td>A shipment arrives damaged or is lost</td><td>The Terms point to the refund policy for this. We found no such text on the refund page, so we could not find the rule</td></tr>
</tbody></table>
<p>Approved refunds are "processed within 30 days of an approved request" (Terms section 15, as read Nov 24, 2026). The last sentence of the "cannot fill" row narrows that refund for Membership Program members. The warranty below is a separate refund route with its own conditions.</p>`,
    },
    {
      heading: "How does Eden's 15%-in-6-months guarantee work?",
      body: `<p>Eden's product pages say: "Follow the plan, lose at least 15% in 6 months or get your money back. See Terms of Service for additional details." The FAQ is more careful: "you may qualify for your money back. Eligibility depends on the full warranty terms, including plan adherence and required check-ins." Do not read it as a plain money-back guarantee. The conditions (Terms, revised Nov 16, 2026; read Nov 27, 2026):</p>
<table><thead><tr><th>Condition</th><th>The Terms</th></tr></thead><tbody>
<tr><td>Doses</td><td>26 consecutive weekly doses "without skipping any doses"</td></tr>
<tr><td>Community post</td><td>A weekly post in Eden's private Facebook group</td></tr>
<tr><td>Check-ins</td><td>Weekly check-ins</td></tr>
<tr><td>Proof</td><td>Two scale videos</td></tr>
<tr><td>Form of medication</td><td>Injectable only; "tablet or liquid forms" are not eligible</td></tr>
<tr><td>Exclusions</td><td>Listed in the Terms</td></tr>
<tr><td>Who decides</td><td>"The final eligibility decision will be made at the sole discretion of Eden."</td></tr>
<tr><td>Amount</td><td>"Limited to the amounts you paid for the eligible plan over the first six months"</td></tr>
<tr><td>Changes</td><td>"Participation is subject to change at any time."</td></tr>
</tbody></table>
<p>At the listed price, six months of plan fees are ${months(EDEN.sema, 6)} for semaglutide and ${months(EDEN.tirz, 6)} for tirzepatide (our arithmetic). That is the ceiling on what the warranty could return, not a promise of it. We read no weight-loss result on Eden's pages that we would use as evidence: its member averages are self-reported, with diet and exercise, and do not separate the drugs. For what trials measured, see our <a href="/weight-loss/articles/glp1-weight-loss-results">GLP-1 results guide</a>.</p>`,
    },
    {
      heading: "How fast does Eden ship?",
      body: `<p>Eden says "Free expedited shipping on all orders." The delivery step on the tirzepatide page is labelled "2 - 3 business days," and the provider-match step "Within 24 hours" (read Nov 27, 2026). The page does not say when the 2 to 3 days start, and the Terms contain no delivery-time promise. Treat it as an estimate and ask support in writing when the clock begins.</p>`,
    },
    {
      heading: "Which pharmacy does Eden use, and what did the FDA letter say?",
      body: `<p>Eden's FAQ says your medication "is prepared by Eden Pharmacy or one of Eden's vetted U.S. pharmacy partners." Eden Pharmacy is in Albuquerque, NM (Eden's pharmacy site, read Nov 24, 2026). The partner pharmacies are not named, and we found no statement of whether the pharmacy is a 503A pharmacy or a 503B outsourcing facility (see <a href="/weight-loss/articles/503a-vs-503b-pharmacy-28-day-rule">503A vs 503B</a>). The Terms say medical services come from "a contracted network of physicians licensed in the state where you reside," with no group named.</p>
<p>On the FDA's side, the ${ext(S.letter, "warning letter")} is dated June 8, 2026 (MARCS-CMS 728279), from the Office of Compounding Quality and Compliance to Eden Health International Inc. The FDA page reads "Content current as of: 06/16/2026." It makes two findings about the website, which the FDA reviewed in March 2026: product labels that show "Eden," "suggesting Eden is the compounder of those drugs when in fact it is not," and a claim that products come from "FDA-licensed 503(a) outsourcing facilities," which the FDA says is not a designation the law establishes. The FDA asked for a response within 15 business days. When we read the page on Nov 27, 2026 it showed no response letter and no close-out letter. The letter is about labelling and advertising claims. It makes no finding about the quality of the medication. We draw no conclusion beyond that, and the full record is in <a href="/weight-loss/articles/is-eden-legit">Is TryEden legit?</a></p>`,
    },
    {
      heading: "How does Eden's price compare with embody and welludr?",
      body: `<p>The two providers closest to Eden on price are embody and welludr. The figures below come from our verified price index, not from Eden's pages. Both are sale prices in the index: embody's was read Nov 26, 2026 with a Black Friday banner and a price-increase countdown, and welludr's ${usd(WELLUDR.sema)} and ${usd(WELLUDR.tirz)} are a Black Friday sale with no end date shown (read Nov 26, 2026). Compounded products here are not FDA-approved.</p>
<table><thead><tr><th>Provider</th><th>Semaglutide / month</th><th>Tirzepatide / month</th><th>12 months, semaglutide</th><th>12 months, tirzepatide</th></tr></thead><tbody>
<tr><td>Eden (list price)</td><td>${usd(EDEN.sema)}</td><td>${usd(EDEN.tirz)}</td><td>${months(EDEN.sema, 12)}</td><td>${months(EDEN.tirz, 12)}</td></tr>
<tr><td><a href="/weight-loss/reviews/embody">embody</a> (sale price)</td><td>${usd(EMBODY.sema)}</td><td>${usd(EMBODY.tirz)}</td><td>${months(EMBODY.sema, 12)}</td><td>${months(EMBODY.tirz, 12)}</td></tr>
<tr><td><a href="/weight-loss/reviews/wellmedr">welludr</a> (sale price)</td><td>${usd(WELLUDR.sema)}</td><td>${usd(WELLUDR.tirz)}</td><td>${months(WELLUDR.sema, 12)}</td><td>${months(WELLUDR.tirz, 12)}</td></tr>
</tbody></table>
<p>Source: <a href="/weight-loss/glp1-price-changes">our GLP-1 price index</a>, verified Nov 26, 2026; 12-month figures are the monthly price times 12. ${stickerNote} Eden's terms differ: it says every dose costs the same and there is no long-term contract, and it offers a 15% warranty that carries conditions. How the two cheaper providers handle plans and billing is in <a href="/weight-loss/articles/embody-cost">embody cost</a> and <a href="/weight-loss/articles/wellmedr-cost">welludr cost</a>, and our <a href="/weight-loss/eden-vs-embody">Eden vs embody</a> page sets the two side by side.</p>`,
    },
    {
      heading: "What could we not verify?",
      body: `<ul>
<li><strong>The checkout total.</strong> We did not reach checkout. Any membership line, tax, first-month discount or renewal date shown only there is unread.</li>
<li><strong>A member's invoice after a dose change.</strong> Only Eden's statement of flat pricing is available to us.</li>
<li><strong>Plan lengths.</strong> We found none, and a checkout view would confirm there is no multi-month prepay option.</li>
<li><strong>Partner pharmacy names, licence numbers, pharmacy type and the prescribing medical group.</strong> Not stated on any page we read.</li>
<li><strong>Delivery clock and the damaged-shipment refund rule.</strong> Not found.</li>
<li><strong>Ozempic and Mounjaro prices.</strong> We did not re-read them on Nov 27, 2026, so this page leaves them out.</li>
<li><strong>State boards and attorneys general.</strong> We searched only the FDA page and web search for other actions naming Eden, and found none.</li>
</ul>
<p>If you have a checkout or order-summary screenshot, we would like to see it. This article is general information, not medical advice. A licensed clinician decides whether any treatment is appropriate for you, and compounded semaglutide and tirzepatide are not FDA-approved.</p>`,
    },
    {
      heading: "Where to read next",
      body: `<p>Our <a href="/weight-loss/reviews/eden">Eden (TryEden) review</a> covers pros, cons and the verdict, and <a href="/weight-loss/articles/is-eden-legit">Is TryEden legit?</a> covers the company, pharmacy and refund terms in full. To compare against other budget plans, see <a href="/weight-loss/articles/embody-cost">embody cost</a>, <a href="/weight-loss/articles/wellmedr-cost">welludr cost</a> and the <a href="/weight-loss/glp1-provider-comparison">provider comparison</a>.</p>`,
    },
  ],
};
