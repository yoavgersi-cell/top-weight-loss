import type { Article } from "./articles";

// ───── Is Eden (TryEden) legit or a scam? (Nov 24, 2026) ─────
// Built only from ops/research/2026-11-24-eden-evidence.md (UPDATE 2, Eden's own
// pages on eden.health, edenpharmacy.com and tryeden.com, read Nov 24, 2026) and
// the FDA facts in ops/research/2026-11-22-eden-trimrx-evidence.md (letter and
// warning-letters list, read Nov 22, 2026). No customer reviews, no review-site
// ratings and no forum quotes are used. Compounded semaglutide and tirzepatide
// are not FDA-approved. Nothing on this page is medical advice.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  terms: "https://www.eden.health/policies/terms-of-service",
  refund: "https://www.eden.health/policies/refund-policy",
  faq: "https://www.eden.health/frequently-asked-questions",
  safety: "https://www.eden.health/safety-info",
  sema: "https://www.eden.health/glp-1/semaglutide",
  tirz: "https://www.eden.health/glp-1/tirzepatide",
  wegovy: "https://www.eden.health/treatment/wegovy",
  zepbound: "https://www.eden.health/treatment/zepbound",
  ozempic: "https://www.eden.health/treatment/ozempic",
  mounjaro: "https://www.eden.health/treatment/mounjaro",
  pharmacy: "https://www.edenpharmacy.com",
  home: "https://www.tryeden.com/",
  letter:
    "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/eden-health-international-inc-dba-eden-728279-06082026",
  altrxLetter:
    "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/trinity-healthcare-supply-llc-dba-altrx-728236-06082026",
  list: "https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/compliance-actions-and-activities/warning-letters?search_api_fulltext=eden%20health%20international",
  fdaCompounding: "https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss",
};

export const isEdenLegitArticle: Article = {
  slug: "is-eden-legit",
  image: "/article-images/is-eden-legit.webp",
  imageAlt: "Man in his 40s sitting on a park bench in late afternoon light, reading on his phone with a tote bag beside him",
  title: "Is Eden (TryEden) Legit or a Scam? Pharmacy, Price, Refunds",
  description:
    "Is Eden (TryEden) legit or a scam? We read its Terms and pharmacy pages on Nov 24, 2026: the $99 price, who fills the prescription, how to cancel, refunds.",
  category: "Advice",
  readTime: "13 min read",
  publishedAt: "2026-11-24",
  updatedAt: "2026-11-24",
  heroColor: "#EEF4FB",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    `Eden lists compounded semaglutide at $99 a month and compounded tirzepatide at $129, the same every month and at every dose (eden.health, read Nov 24, 2026). Compounded drugs are not FDA-approved, and Eden's Terms let it change prices.`,
    `Eden Pharmacy (formerly Contigo, Albuquerque, NM) is named. The prescribing medical group, the partner pharmacies and the licence numbers are not.`,
    `Cancel in Account Settings at least 48 hours before renewal. Charges are non-refundable once an order is fulfilled, and the 15%-in-six-months warranty carries 26-dose, weekly-post and two-video conditions that Eden decides at its sole discretion.`,
    `The FDA's June 8, 2026 warning letter was about website and label wording (two findings), not product quality. We found no close-out letter on the FDA's list when we last read it on Nov 22, 2026.`,
  ],
  sections: [
    {
      heading: "Is TryEden legit?",
      body: `<div class="qa"><strong>The short answer</strong>Eden is run by Eden Health International Inc., names its own pharmacy (Eden Pharmacy, Albuquerque, NM) and publishes cancel and refund terms, all of which we read on Nov 24, 2026. Compounded semaglutide is $99 a month and tirzepatide $129; neither is FDA-approved. We could not verify the prescribing medical group, partner pharmacies or licence numbers. The FDA's June 2026 letter concerned website wording.</div>
<p>TryEden is the older name of the website. Eden's pages now sit at eden.health: tryeden.com pages redirect there (as read Nov 24, 2026), covered below. This page records what Eden's own documents say and where they stop. It uses no customer reviews, and it does not say whether the program suits you. That depends on your health history, which a licensed clinician reviews. For the product itself, see our <a href="/weight-loss/reviews/eden">Eden (TryEden) review</a>.</p>`,
    },
    {
      heading: "What did we check, and when?",
      body: `<p>Every fact below comes from Eden's own pages or from the FDA. Eden's pages carry no dates except the Terms, so our read date is the only date we can give for prices.</p>
<table><thead><tr><th>Document</th><th>Date on the document</th><th>Read</th></tr></thead><tbody>
<tr><td>${ext(S.terms, "Terms of Service")} (eden.health)</td><td>Last revision Nov 16, 2026</td><td>Nov 24, 2026</td></tr>
<tr><td>${ext(S.refund, "Refund policy page")}</td><td>None shown</td><td>Nov 24, 2026</td></tr>
<tr><td>${ext(S.sema, "Semaglutide")} and ${ext(S.tirz, "tirzepatide")} pages</td><td>None shown</td><td>Nov 24, 2026</td></tr>
<tr><td>Brand-name pages: ${ext(S.wegovy, "Wegovy")}, ${ext(S.zepbound, "Zepbound")}, ${ext(S.ozempic, "Ozempic")}, ${ext(S.mounjaro, "Mounjaro")}</td><td>None shown</td><td>Nov 24, 2026</td></tr>
<tr><td>${ext(S.faq, "FAQ")} and ${ext(S.safety, "Important Safety Information")}</td><td>None shown</td><td>Nov 24, 2026</td></tr>
<tr><td>${ext(S.pharmacy, "Eden Pharmacy site")}</td><td>None shown</td><td>Nov 24, 2026</td></tr>
<tr><td>${ext(S.home, "tryeden.com homepage")}</td><td>Served copy last modified Nov 20, 2026</td><td>Nov 24, 2026</td></tr>
<tr><td>${ext(S.letter, "FDA warning letter")}, MARCS-CMS 728279</td><td>June 8, 2026 (posted June 16, 2026)</td><td>Nov 22, 2026</td></tr>
<tr><td>${ext(S.list, "FDA warning letters list")} (response and close-out columns)</td><td>Live list</td><td>Nov 22, 2026</td></tr>
</tbody></table>
<p>We did not read checkout or the intake after its first question, because we entered no personal details. We also did not read Eden's blog posts or the press release about the pharmacy's name change, and we did not look up LegitScript or BBB directory entries.</p>`,
    },
    {
      heading: "How much does Eden cost?",
      body: `<p>Eden lists two compounded products at one monthly price each. The tirzepatide page reads "Monthly pricing at every dose" with $129 a month, and a table shows the same figure for month 1, month 2, month 3 and every month. The semaglutide page shows $99 in the same table. The FAQ on the tirzepatide page says: "The price you see is the price you'll keep. No second-month increase. No dose-based price hikes. No long-term contract." (${ext(S.sema, "semaglutide")} and ${ext(S.tirz, "tirzepatide")} pages, FAQ, read Nov 24, 2026).</p>
<table><thead><tr><th>Medication</th><th>Price per month</th><th>What the page says</th></tr></thead><tbody>
<tr><td>Compounded semaglutide (not FDA-approved)</td><td>$99</td><td>Same in month 1, 2, 3 and every month</td></tr>
<tr><td>Compounded tirzepatide (not FDA-approved)</td><td>$129</td><td>Same in month 1, 2, 3 and every month</td></tr>
<tr><td>Wegovy (FDA-approved brand)</td><td>$1,695</td><td>"No long-term contracts. Same price at every dose."</td></tr>
<tr><td>Zepbound (FDA-approved brand)</td><td>$1,399</td><td>Listed price per month</td></tr>
<tr><td>Ozempic (FDA-approved brand)</td><td>$1,399</td><td>Listed price per month</td></tr>
<tr><td>Mounjaro (FDA-approved brand)</td><td>$1,399</td><td>Listed price per month</td></tr>
</tbody></table>
<p>Sources: Eden's semaglutide and tirzepatide pages and its four brand pages (${ext(S.wegovy, "Wegovy")}, ${ext(S.zepbound, "Zepbound")}, ${ext(S.ozempic, "Ozempic")}, ${ext(S.mounjaro, "Mounjaro")}), read Nov 24, 2026. Eden's footer says it "has no ownership over brand-name, FDA-approved medications or products," and the brand pages do not say which pharmacy fills those prescriptions.</p>
<p><strong>The limits Eden prints.</strong> The footer says the "Same Price at Every Dose" policy applies "excluding new member discounts or specific plans." The Terms add that "Prices are subject to change at any time in our sole discretion" and that "Same price per dose offers automatically expire within 24 hours of any price changes." They also say "first month" promotions are separate from the same-price offer, which "only apply to standard full-price purchases based on the price listed on the website." The FAQ says the price "remains protected while your Eden account stays active, and permitted pauses won't affect it," and that if you close your account and come back, "the price available at that time will apply." The plan card's line "guaranteed for life" should be read with those sentences. We found no GLP-1 promotion with an end date or code on the pages we read.</p>
<table><thead><tr><th>Flat list price, no discounts (our arithmetic)</th><th>Semaglutide</th><th>Tirzepatide</th></tr></thead><tbody>
<tr><td>First 6 months</td><td>$594</td><td>$774</td></tr>
<tr><td>First 12 months</td><td>$1,188</td><td>$1,548</td></tr>
</tbody></table>
<p>Those totals multiply the listed monthly price by 6 and 12. They assume Eden does not change the price and that you do not pause. For other providers' prices, see our <a href="/weight-loss/glp1-price-changes">GLP-1 price tracker</a>.</p>
<p><strong>What the price includes.</strong> Eden says the monthly price covers "your prescribed Authentic Eden™ medication and the complete care system around it": provider review, clinician-guided support, 24/7 messaging, dose and side-effect guidance, priority delivery, a member community, and provider-directed labwork "when needed." Shipping is free and described as expedited. A step on the tirzepatide page is labelled "2 - 3 business days" for delivery, without saying whether the count starts at the prescription or at shipment, and we found no guaranteed delivery time in the Terms. The page says the program is "FSA & HSA eligible." Per the Terms, Eden and its providers "do not accept commercial health insurance plans."</p>`,
    },
    {
      heading: "What pharmacy does Eden use?",
      body: `<p>Eden names one: Eden Pharmacy. Its site, ${ext(S.pharmacy, "edenpharmacy.com")}, carries the banner "Contigo is now Eden Pharmacy!" (we did not read the press release it links to). The site lists "Sterile & Non-Sterile Compounding" and the address 8300 Carmel Ave, Suite 601, Albuquerque, NM 87122. It states: "Our pharmacy is licensed and operates in 38 states and Washington, D.C. For patients outside those areas, we work with a trusted network of partners." It lists twelve partner-served states: Alaska, Arkansas, California, Illinois, Kentucky, Louisiana, Mississippi, Nebraska, North Carolina, South Carolina, Tennessee and Virginia (read Nov 24, 2026).</p>
<p>The FAQ on the tirzepatide page says your medication "is prepared by Eden Pharmacy or one of Eden's vetted U.S. pharmacy partners, each held to Eden standards." The tirzepatide page says: "Authentic Eden™ medication is prepared in our U.S. pharmacy network, with direct oversight at every step before it ships to your door." Its homepage also says medications are "dispensed by state-licensed pharmacies."</p>
<table><thead><tr><th>Question</th><th>Answer on Eden's pages</th></tr></thead><tbody>
<tr><td>Is a pharmacy named?</td><td>Yes: Eden Pharmacy, Albuquerque, NM</td></tr>
<tr><td>Are the partner pharmacies named?</td><td>No</td></tr>
<tr><td>Are state licence numbers shown?</td><td>No</td></tr>
<tr><td>Is it a 503A pharmacy or a 503B outsourcing facility?</td><td>Not stated (we explain the difference in <a href="/weight-loss/articles/503a-vs-503b-pharmacy-28-day-rule">503A vs 503B</a>)</td></tr>
<tr><td>Is the pharmacy's legal entity named?</td><td>Not stated</td></tr>
<tr><td>Is the prescribing medical group named?</td><td>No</td></tr>
</tbody></table>
<p><strong>Who prescribes.</strong> The Terms say: "Eden does not provide medical services. Medical services are provided through a contracted network of physicians licensed in the state where you reside" (capitalized in the original). The footer says "independent licensed medical professionals," and the homepage says prescriptions are issued "only after an online consultation with an independent licensed provider." No medical group or practice is named in the Terms, home page, FAQ or Safety Information. If you want the pharmacy and prescriber names before you pay, ask Eden's support in writing, then check each licence on the state board's website.</p>
<p>Compounded semaglutide and tirzepatide are not FDA-approved, and Eden's own page says so. The FDA does not review them for safety or effectiveness.</p>`,
    },
    {
      heading: "Is TryEden the same company as Eden?",
      body: `<p>Yes. The tryeden.com footer reads "© 2026 Eden Health International Inc.," and the FDA addressed its June 2026 letter to "Eden Health International Inc. dba Eden" for the website www.tryeden.com. The Terms (revised Nov 16, 2026) say "Eden Health International Inc. and its affiliates" own and operate the website at www.eden.health. They give a notice address of Firstbase Agent LLC, 1007 N Orange St., Wilmington, DE 19801, and name Delaware law. The FDA letter lists a Denver, CO address. One accessibility notice on Eden's pages says "Eden Health International, LLC," while the Terms and footers say "Inc."</p>
<p><strong>The website move.</strong> On Nov 24, 2026, tryeden.com served only its homepage. The other ten paths we tried (the Terms, FAQ, Safety Info, Reviews, treatment pages and others) each answered with a permanent redirect to the same path on www.eden.health, as did tryeden.com/sitemap.xml. The cached tryeden.com homepage, last modified Nov 20, 2026, already points its semaglutide, tirzepatide, Terms and FAQ links at eden.health. We cannot say when the redirect began. The earliest Eden-published page we can date that names eden.health as its website is the Terms revision of Nov 16, 2026, and edenpharmacy.com's footer still linked to tryeden.com policy pages on Nov 24.</p>
<p>Eden's homepage FAQ says it can serve GLP-1 programs in "all 50 states." The Terms require that "You are located in a state where we operate (depending on the type of Services)."</p>`,
    },
    {
      heading: "Does Eden charge a membership fee?",
      body: `<p>Eden's pages say two things, and it does not reconcile them. The pricing pages say "No membership fees," and the FAQ on the tirzepatide page says "There is no separate membership fee." The Terms (section 14) say "Eden's Services may be offered through a recurring membership model, as is displayed at checkout," that "Payments made to Eden cover the cost of membership fees and/or products," and that "Eden offers a recurring membership program for which automatic billing is a material term of enrollment." The refund clause refers to "the initial membership fee when no prescription is issued."</p>
<p>The safe reading is this: the monthly price you see is the whole charge on Eden's pricing pages, and the Terms still call the arrangement a recurring membership. We did not read checkout, so we cannot say what it shows.</p>`,
    },
    {
      heading: "How do I cancel Eden?",
      body: `<p>Per the Terms (revised Nov 16, 2026) and FAQ, read Nov 24, 2026:</p>
<ol>
<li>Cancel "through your Account Settings or by contacting Customer Support." The FAQ on the tirzepatide page says you can pause or cancel "from your patient portal."</li>
<li>Do it at least 48 hours before renewal. Section 14.3 says: "For the Eden Membership Program, cancellations must be submitted at least forty-eight (48) hours before your next renewal date, as further described at checkout if applicable." The California clause repeats the 48 hours.</li>
<li>Know what cancelling does not reach. "Cancellations apply to future billing cycles and do not apply to orders already processed or shipped." The same FAQ adds that orders already sent to the pharmacy "may not be cancellable, but if an order is still pending, Eden support can help."</li>
</ol>
<p>Billing is automatic. The Terms say you authorize Eden "to charge your payment method automatically at the frequency disclosed at checkout," and the California clause says the plan "renews automatically each month at the price shown at checkout (currently $99.00 per month for compounded semaglutide and $129.00 per month for compounded tirzepatide) until you cancel." That matches the prices on the product pages. Note the date of your next renewal when you sign up. Our guide to <a href="/weight-loss/articles/how-to-cancel-telehealth-glp1-subscription">cancelling a GLP-1 telehealth subscription</a> sets other providers' cutoffs side by side.</p>`,
    },
    {
      heading: "Does Eden give refunds?",
      body: `<p>Mostly not once an order is fulfilled. The Terms and the ${ext(S.refund, "refund policy page")} set out these cases (read Nov 24, 2026):</p>
<table><thead><tr><th>Situation</th><th>What the Terms say</th></tr></thead><tbody>
<tr><td>No prescription is issued after your intake</td><td>"You will receive a full refund of your initial membership fee" (California clause; elsewhere as shown at checkout); the Terms' general refund section (14.4) makes this exception only "as provided at checkout"</td></tr>
<tr><td>The order has been fulfilled</td><td>Section 14.4: "all charges are non-refundable"; section 14: fees are "generally non-refundable, in whole or in part, once the order has been fulfilled"; "We cannot accept returns of prescription products"</td></tr>
<tr><td>Eden cannot fulfill the plan (supply shortage, FDA regulations or other factors outside its control)</td><td>Section 15: a prorated refund for the unshipped part of the prepaid plan, less the monthly cost of treatment already provided, or a credit to switch plans; "within 30 days of an approved request"</td></tr>
<tr><td>The order was cancelled after it shipped</td><td>Cancellation does not apply to "orders already processed or shipped" (section 14.3)</td></tr>
<tr><td>A shipment arrives damaged or is lost</td><td>Section 14.4 points to "our full Refund Policy for specific exceptions regarding damaged or lost shipments." The refund policy page we read has no damaged or lost shipment text, so we could not find the rule</td></tr>
</tbody></table>
<p>Eden's separate weight-loss warranty is covered next.</p>`,
    },
    {
      heading: "What are the conditions of Eden's 15% weight-loss warranty?",
      body: `<p>Eden's pricing page says: "Follow the plan, lose at least 15% in 6 months or get your money back. See Terms of Service for additional details." Section 17 of the Terms says you "may be eligible for a refund or program credit if, after strictly following the program as prescribed, you do not lose 15% of your body weight within six months." The baseline is the weight noted "during your initial medical intake." These are the conditions as the Terms state them (revised Nov 16, 2026, read Nov 24, 2026):</p>
<table><thead><tr><th>Condition</th><th>The Terms</th></tr></thead><tbody>
<tr><td>Medical approval</td><td>Complete the medical evaluation and be approved</td></tr>
<tr><td>Follow-through</td><td>"Weekly medication use, diet, exercise, attending all follow-up appointments, and completing weekly check-ins through the member portal"</td></tr>
<tr><td>Community post</td><td>"Post about your journey once per calendar week in Eden's private Facebook group"</td></tr>
<tr><td>Doses</td><td>"Consecutive weekly doses" for "26 consecutive weeks, totaling 26 doses without skipping any doses," ordered through the client portal</td></tr>
<tr><td>Forms</td><td>"Tablet or liquid forms" are not eligible</td></tr>
<tr><td>Exclusions</td><td>Certain medical conditions; pregnant or breastfeeding; "experienced hormonal changes during program"; other weight loss methods or medications</td></tr>
<tr><td>Proof</td><td>Two videos with a scale reading: the first within 15 days, the second at the end of six months</td></tr>
<tr><td>Who decides</td><td>"The final eligibility decision will be made at the sole discretion of Eden."</td></tr>
<tr><td>What is paid</td><td>"Limited to the amounts you paid for the eligible plan over the first six months," within 30 days of verification, to the original payment method only. Incidental costs, other program fees and additional products or services are not included</td></tr>
<tr><td>Changes</td><td>"Participation is subject to change at any time. We reserve the right to cancel the program."</td></tr>
</tbody></table>
<p>At the listed monthly price, six months of plan fees come to $594 for semaglutide or $774 for tirzepatide (our arithmetic). The actual amount is whatever you paid for the eligible plan. Compounded semaglutide and tirzepatide are not FDA-approved, and no weight-loss result is certain: <a href="/weight-loss/articles/glp1-weight-loss-results">trial averages</a> are measured at a set assessment point and are not a promise for any one person.</p>`,
    },
    {
      heading: "What did the FDA's June 2026 warning letter to Eden say?",
      body: `<p>The ${ext(S.letter, "letter")} is dated June 8, 2026 (MARCS-CMS 728279), from the FDA's Office of Compounding Quality and Compliance to Eden Health International Inc., and was posted June 16, 2026. We read it in full on Nov 22, 2026. It makes two findings about the wording and images on Eden's website, which the FDA reviewed in March 2026:</p>
<table><thead><tr><th>What the FDA wrote</th><th>The subject</th></tr></thead><tbody>
<tr><td>"The compounded semaglutide and tirzepatide products displayed on your website identify 'Eden' on the pictured label, suggesting Eden is the compounder of those drugs when in fact it is not."</td><td>Product labels</td></tr>
<tr><td>The site claims its compounded products come from "FDA-licensed 503(a) outsourcing facilities." The FDA wrote that compounding facilities "are not 'FDA-approved' or 'FDA-licensed' entities."</td><td>Description of pharmacies</td></tr>
</tbody></table>
<p>The FDA classed both as misbranding under sections 502(a) and 502(bb) of the Federal Food, Drug, and Cosmetic Act. It asked for a written response within 15 business days, including the entities that produce the products and a sample label. The letter makes no finding about product quality or sterility, and says it is "not an all-inclusive list." ${ext(S.altrxLetter, "altRx received a letter dated the same day")}.</p>
<p><strong>What Eden's pages say now.</strong> We searched every Eden page we read on Nov 24, 2026 for the phrase the FDA quoted. "FDA-licensed 503(a) outsourcing facilities" does not appear, and neither does the word "outsourcing." The wording Eden uses now is quoted in the pharmacy section above, and none of its pages mentions the letter. We did not read blog posts, checkout or the press release. On the FDA's warning letters list, the response and close-out letter columns for Eden were empty when we read them on Nov 22, 2026; we did not re-read the list on Nov 24. We draw no conclusion about whether the current wording meets the law. That is for the FDA and Eden. Our <a href="/weight-loss/reviews/eden">Eden review</a> carries a short summary of this section.</p>`,
    },
    {
      heading: "Is Eden a scam?",
      body: `<p>We cannot test that from the outside. We did not place an order, so we cannot say how fast a package ships or how support answers. What we can check is whether the paper trail exists, and on Eden's own pages it does:</p>
<ul>
<li>A named company, a notice address and a governing law in the Terms.</li>
<li>A named pharmacy with a street address and a stated state count.</li>
<li>A stated requirement that "Prescription medications are provided only after consultation with a licensed clinician."</li>
<li>Written billing, cancel and refund terms. The prices in the Terms match the prices on the product pages.</li>
</ul>
<p>The places where a buyer can be caught out are also in writing. Billing renews automatically. Charges are non-refundable once an order is fulfilled. The price can change, and the "same price" promise excludes new member discounts and specific plans. The 15% warranty depends on 26 uninterrupted doses, a weekly group post and two scale videos, and Eden decides eligibility. The pages call the plan "no membership fee" while the Terms describe a membership program. Read those sections before you pay, not after.</p>
<p>Gaps remain in what we could verify, listed next. A missing detail is not evidence of wrongdoing, and it is not evidence of safety either.</p>`,
    },
    {
      heading: "What could we not verify?",
      body: `<ul>
<li><strong>Checkout.</strong> We did not enter personal details, so anything shown only at checkout, including the renewal date and the "membership" wording there, is unread.</li>
<li><strong>Partner pharmacy names.</strong> Eden refers to "vetted U.S. pharmacy partners" and a partner network in twelve states without naming them.</li>
<li><strong>Licence numbers and pharmacy type.</strong> No state licence numbers, legal entity or 503A or 503B status is stated for Eden Pharmacy.</li>
<li><strong>The medical group.</strong> The Terms describe a contracted network of physician practices and name none.</li>
<li><strong>Damaged or lost shipments.</strong> The refund rule the Terms point to was not on the refund policy page we read.</li>
<li><strong>LegitScript and BBB.</strong> Eden's homepage loads LegitScript seal scripts, but we did not check a directory listing, so we do not report a certification. We did not check BBB.</li>
<li><strong>When the site moved.</strong> We can date our own read of the redirect (Nov 24, 2026) and the Terms revision (Nov 16, 2026), not the switch.</li>
<li><strong>The FDA list today.</strong> Our last read was Nov 22, 2026.</li>
</ul>
<p>We will update this page when Eden or the FDA publishes something new, or when we read a source on this list.</p>`,
    },
    {
      heading: "How to compare Eden with other providers",
      body: `<p>Put the same questions to any provider: who fills the prescription, who prescribes, what is charged and when, how you cancel, and what is refunded. We ran the same checks on <a href="/weight-loss/articles/is-embody-legit">embody</a>, <a href="/weight-loss/articles/is-wellmedr-legit">welludr</a> and <a href="/weight-loss/articles/is-altrx-legit">altRx</a>. Side-by-side pages cover <a href="/weight-loss/eden-vs-embody">Eden vs embody</a>, <a href="/weight-loss/altrx-vs-eden">altRx vs Eden</a> and <a href="/weight-loss/eden-vs-ro">Eden vs Ro</a>, and our <a href="/weight-loss/glp1-provider-comparison">provider comparison</a> sets prices and terms next to each other. This article is general information, not medical advice. A licensed clinician decides whether any treatment is appropriate for you.</p>`,
    },
  ],
};
