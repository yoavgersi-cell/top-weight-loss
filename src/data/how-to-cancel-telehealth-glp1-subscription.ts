import type { Article } from "./articles";

// ───── How to cancel a GLP-1 telehealth subscription (Nov 22, 2026) ─────
// Built only from the seven providers' own terms, refund policies and FAQs,
// read Nov 22, 2026. Research: the cancel-guide evidence file dated Nov 22,
// 2026 (sections 2.1 to 2.7, 7 and 8). TrimRx, Medvi, Eden, Shed, Sprout,
// bmiMD and Hims could not be read and are named on the page. No consumer-
// protection rule or card-dispute guidance is stated: no primary source was
// read. Compounded semaglutide and tirzepatide are not FDA-approved. Nothing
// on this page is medical advice.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  wmRefund: "https://wellmedr.com/pages/refund-and-cancellation-policy",
  wmTerms: "https://wellmedr.com/pages/terms-conditions",
  wmFaq: "https://wellmedr.com/pages/faq",
  altRefund: "https://altrx.com/refund-cancellation-policy",
  altTerms: "https://altrx.com/terms-and-conditions",
  altHome: "https://altrx.com/",
  embRefund: "https://joinem.co/pages/refund-policy",
  embTerms: "https://joinem.co/pages/terms-conditions",
  hrxRefund: "https://healthrx.com/returns-refund-policy",
  hrxTerms: "https://healthrx.com/terms",
  hrxFaq: "https://healthrx.com/faq",
  dmTerms: "https://directmeds.com/dm-company/terms.html",
  dmWl: "https://directmeds.com/solutions/weight-loss",
  rexTerms: "https://rexmd.com/terms.php",
  rexFaq: "https://rexmd.com/faq.php",
  collTerms: "https://www.collective.org/legal/terms-of-use",
  fda: "https://www.fda.gov/drugs/drug-alerts-and-statements/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss",
};

export const howToCancelTelehealthGlp1SubscriptionArticle: Article = {
  slug: "how-to-cancel-telehealth-glp1-subscription",
  image: "/article-images/how-to-cancel-telehealth-glp1-subscription.webp",
  imageAlt: "Woman in her fifties on a sofa with a laptop on her knees and a phone in her hand, reviewing an account at home on a quiet morning",
  title: "How to Cancel a GLP-1 Telehealth Subscription: 7 Providers",
  description:
    "Cancel steps, charge cutoffs (72 hours down to 12) and refund rules taken from seven GLP-1 telehealth providers' own terms, read Nov 22, 2026.",
  category: "Guide",
  readTime: "11 min read",
  publishedAt: "2026-11-22",
  updatedAt: "2026-11-22",
  heroColor: "#EEF3F8",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "Three different windows in seven sets of terms, all read Nov 22, 2026: 72 hours before the next billing date (altRx, embody), 48 hours or 2 days (DirectMeds, wellmedr's terms) and 12 hours (REX MD). HealthRx and Collective state no hour count for month-to-month billing.",
    "wellmedr's two documents disagree. Its terms (updated Oct 16, 2026) require cancelling at least 2 days before the renewal date. Its refund policy (no date shown) says cancellation is effective when received and states no cutoff. Neither says it overrides the other.",
    "No provider here promises a refund for medication you have already received. altRx and embody refund the unused part of a term only if their provider finds you not clinically eligible. HealthRx still bills the rest of a 3, 6 or 12-month minimum if you cancel early.",
    "We could not read the cancel terms for TrimRx, Medvi, Eden, Shed, Sprout, bmiMD or Hims, so this page does not cover them.",
  ],
  sections: [
    {
      heading: "How do you cancel a telehealth GLP-1 subscription?",
      body: `<div class="qa"><strong>The short answer</strong>Use the channel in the provider's own terms and cancel before its cutoff: 72 hours before the next billing date at altRx and embody, 48 hours at DirectMeds, 2 days at wellmedr (its terms), 12 hours at REX MD. None of the seven states a right to a refund for medication you already received. Keep the confirmation. Cancelling billing does not tell your prescriber to stop treatment.</div>
<p>This table comes from the providers' own documents, not from reviews or forum posts. Every cell is quoted or closely paraphrased in the sections below the table, with the document's URL and date. "Not stated" means the documents we read do not say. All documents were read on Nov 22, 2026.</p>
<table><thead><tr><th>Provider</th><th>How to cancel</th><th>Cutoff before the next charge</th><th>Billing cadence</th><th>Refund after shipment</th><th>Pause option</th></tr></thead><tbody>
<tr><td>wellmedr</td><td>Account or portal message, email, or phone</td><td>Terms: 2 days before the renewal date. Refund policy: none, effective when received</td><td>21-Day plan every 21 days; 3, 6 and 12-month plans prepaid in full; "Monthly Plan" cadence not stated</td><td>None once the pharmacy has started the order, except the unearned part of a prepaid plan</td><td>"May" be offered; only valid once confirmed in writing</td></tr>
<tr><td>altRx</td><td>Email, phone or patient portal</td><td>72 hours before the next billing date</td><td>"Recurring intervals disclosed" at checkout</td><td>All payments final; partial refund of the unused term only if the provider finds you not clinically eligible</td><td>Homepage FAQ says "pause or cancel"; how it works not stated</td></tr>
<tr><td>embody</td><td>Email, phone, portal, or reply to an embody email</td><td>72 hours before the next billing date</td><td>Automatic recurring billing; interval not stated</td><td>Same refund text as altRx</td><td>Not stated</td></tr>
<tr><td>HealthRx</td><td>Email</td><td>Month-to-month: none stated. Paid-up-front plans: "before your next renewal date"</td><td>Monthly; 3, 6 and 12-month plans bill monthly with a minimum; paid-in-full plans renew every 3, 6 or 12 months</td><td>Unshipped dose refunded; once handed to carriers, sales are final</td><td>Not stated</td></tr>
<tr><td>DirectMeds</td><td>Turn off auto-refill in the account portal</td><td>48 hours before the next processing date</td><td>Every 30 days, with notice 5 to 7 days before each charge</td><td>None for medication received; returns only for listed cases</td><td>Not stated</td></tr>
<tr><td>REX MD</td><td>Phone for all customers; portal or email for some</td><td>Within 12 hours of the renewal date</td><td>Charged in advance; interval not stated</td><td>All sales final; medications not refundable</td><td>FAQ says "pause or cancel"; how it works not stated</td></tr>
<tr><td>Collective</td><td>Online, in your account</td><td>Before the 21-day trial ends, or before the membership period ends</td><td>$199 a year membership billed annually; medication charged when the pharmacy ships</td><td>Membership non-refundable; medication non-refundable unless Collective decides otherwise</td><td>Not stated</td></tr>
</tbody></table>
<p>Source: each provider's own terms, refund policy or FAQ, read Nov 22, 2026. Document dates and quotes are in the sections below.</p>
<p>Most of these providers sell compounded semaglutide or tirzepatide. The FDA states that "compounded drugs are not FDA approved" and that it does not review them "for safety, effectiveness or quality before they are marketed" (${ext(S.fda, "FDA, content current as of 10/01/2026")}, read Nov 22, 2026). This page is general information, not medical advice. For what each plan costs, see the <a href="/weight-loss/glp1-price-changes">verified price index</a>; for whether each provider is what it says it is, see <a href="/weight-loss/articles/is-wellmedr-legit">is welludr (wellmedr) legit</a>, <a href="/weight-loss/articles/is-altrx-legit">is altRx legit</a>, <a href="/weight-loss/articles/is-embody-legit">is embody legit</a>, <a href="/weight-loss/articles/is-healthrx-legit">is HealthRx legit</a> and <a href="/weight-loss/articles/is-directmeds-legit">is DirectMeds legit</a>.</p>`,
    },
    {
      heading: "How do I cancel welludr (formerly wellmedr)?",
      body: `<p>welludr (formerly wellmedr) has two documents that cover cancelling, and they give different rules.</p>
<table><thead><tr><th>Document</th><th>Date shown</th><th>Cutoff</th><th>When cancellation takes effect</th></tr></thead><tbody>
<tr><td>${ext(S.wmTerms, "Terms and Conditions")}</td><td>Last updated Oct 16, 2026</td><td>At least 2 days before the scheduled renewal date, "measured from the originally scheduled date even if a charge or shipment is processed early"</td><td>"at the end of your current billing period"</td></tr>
<tr><td>${ext(S.wmRefund, "Refund, Cancellation and Subscription Policy")}</td><td>No date shown on the page</td><td>None stated: "You may cancel automatic renewal at any time"</td><td>"at the timestamp our system receives the online request, email, telephone request, or voicemail"</td></tr>
</tbody></table>
<p>Source: both pages read Nov 22, 2026. Neither document says it overrides the other, so we do not pick one. A request sent more than 2 days before your renewal date satisfies both. Keep the confirmation.</p>
<p><strong>How to cancel.</strong> The terms say: "Cancel any time in your account, by emailing [the support address on the terms page], or by calling 1-888-397-6905 (8 AM to 8 PM ET)." The refund policy adds a portal message ("Cancel my subscription") and says "A voicemail clearly requesting cancellation will be treated as a cancellation request." It also says "No retention conversation or administrative approval is required."</p>
<p><strong>If the charge is already submitted.</strong> The refund policy: "A request received before a scheduled charge is actually submitted will stop that charge. If the charge was already submitted before cancellation became effective, cancellation stops later renewals and the current payment is reviewed under the refund rules below."</p>
<p><strong>Reminders.</strong> The refund policy says wellmedr sends a reminder "at least seven days before each 21-Day or 3-Month Plan charge and at least 15 days before each 6-Month Plan charge," and for a 12-Month Plan "notice 30 days before the Billing Date and a courtesy reminder seven days before it."</p>
<p>The same documents say what cancelling does not do. See <a href="#does-cancelling-stop-my-treatment">does cancelling stop my treatment</a> below, and our <a href="/weight-loss/articles/is-wellmedr-legit">wellmedr legitimacy check</a> and <a href="/weight-loss/articles/wellmedr-cost">wellmedr cost page</a>. Read our <a href="/weight-loss/reviews/wellmedr">full welludr review</a>.</p>`,
    },
    {
      heading: "How do I cancel altRx, embody, HealthRx, DirectMeds, REX MD or Collective?",
      body: `<h3>altRx</h3>
<p>Documents: ${ext(S.altRefund, "refund and cancellation policy")} (Last Updated: August 25, 2026) and ${ext(S.altTerms, "terms")} (Last Updated: May 6, 2026).</p>
<ul><li><strong>How:</strong> "To cancel, contact patient support at care@altrx.com or +1 607-601-6969 and request cancellation, or cancel through your online account/patient portal."</li>
<li><strong>Cutoff:</strong> "Cancellation requests must be received at least 72 hours prior to your next billing date in order to stop the next charge. If your request is received inside that 72-hour window, your Subscription Service will be charged in accordance with the then-current billing cycle, that charge is non-refundable, and the cancellation will take effect at the start of the subsequent billing cycle."</li>
<li><strong>Cadence:</strong> "your selected payment method will be automatically charged at the recurring intervals disclosed for that product during the checkout process unless and until you cancel." The interval is not in the terms.</li>
<li><strong>Pause:</strong> the ${ext(S.altHome, "homepage")} FAQ says "You may pause or cancel your membership at any time." Neither the terms nor the refund policy explains pausing. The homepage also says "Cancel anytime"; the 72-hour cutoff above is in the policy.</li></ul>
<h3>embody</h3>
<p>Documents: ${ext(S.embRefund, "refund policy")} (Last Updated: August 25, 2026) and ${ext(S.embTerms, "terms")} (Last updated: April 24th, 2026). The cancellation and refund text matches altRx's word for word.</p>
<ul><li><strong>How:</strong> "contact patient support at support@joinem.co or +1 (347) 269-4270 and request cancellation, or cancel through your online account/patient portal." The terms add "by replying to any email communications sent from Embody."</li>
<li><strong>Cutoff:</strong> the same 72-hour sentence as altRx, including that a late request is charged, non-refundable, and takes effect at the start of the next billing cycle.</li>
<li><strong>Cadence:</strong> the terms say charges "will continue until you cancel your subscription." The interval is not stated. <strong>Pause:</strong> not found.</li></ul>
<h3>HealthRx</h3>
<p>Documents: ${ext(S.hrxTerms, "terms")} (Last updated November 7, 2026), ${ext(S.hrxRefund, "returns and refund policy")} (no date shown) and ${ext(S.hrxFaq, "FAQ")}. Read our <a href="/weight-loss/reviews/healthrx">full HealthRx review</a>.</p>
<ul><li><strong>How:</strong> "You can cancel future renewals anytime by emailing support@healthrx.com." The FAQ adds: "No phone call needed."</li>
<li><strong>Cutoff:</strong> none stated for month-to-month plans. For paid-up-front plans the terms say "To cancel, email support@healthrx.com before your next renewal date," with no hours or days given.</li>
<li><strong>Cadence:</strong> the refund policy says "Subscribe &amp; Save renews automatically at the price and interval shown at checkout until canceled." The 3, 6 and 12-month plans carry "a minimum of 3, 6 or 12 monthly payments" and bill monthly; paid-in-full plans "renew at the same price every 3, 6 or 12 months."</li>
<li><strong>The minimum:</strong> "On a 3, 6 or 12-month plan, the monthly payments in your minimum are still due if you cancel early." The terms add "Payments still due in your minimum are charged on their normal dates, and your medication keeps shipping." After the minimum the plan "continues month to month at the same price until you cancel." Month-to-month plans "have no minimum."</li>
<li><strong>Price changes:</strong> "If we propose a change to your renewal price or billing period, we will notify you at the email address on your account before it takes effect. You may cancel before the change." <strong>Pause:</strong> not found.</li></ul>
<h3>DirectMeds</h3>
<p>Document: ${ext(S.dmTerms, "terms")} (Last updated: April 16, 2026), sections 5 and 7. Read our <a href="/weight-loss/reviews/directmeds">full DirectMeds review</a>.</p>
<ul><li><strong>How and cutoff:</strong> "You may cancel any time up to 48 hours before the next processing date by turning off auto-refill in your account portal. Contact help@directmeds.com for assistance."</li>
<li><strong>Cadence:</strong> "You will be charged the total subscription price (which may include pharmacy, medical group, and platform fees) every 30 days. You will receive advance notification 5-7 days prior to each charge." The statement descriptor is "DM2*Directmeds".</li>
<li><strong>A gap on its own site:</strong> the ${ext(S.dmWl, "weight-loss page")} says "no subscriptions, no surprise charges, and no pressure," while the terms say "Certain products are sold on a subscription basis" with a charge every 30 days. Both statements are on DirectMeds' own site. <strong>Pause:</strong> not found.</li></ul>
<h3>REX MD</h3>
<p>Documents: ${ext(S.rexTerms, "terms")} (Last Updated: May 22, 2026) and ${ext(S.rexFaq, "FAQ")}.</p>
<ul><li><strong>How:</strong> the terms say "you may do so at any time by calling us at: (866) 294-3772." For California and New York customers, and select Vermont customers with an initial subscription of one year or longer, the terms add the member portal or email. The FAQ is broader: "Simply reach out to our customer Care Team at 1-866-294-3772, [email], or through your patient portal." The two sections differ, so use the phone number if in doubt.</li>
<li><strong>Cutoff:</strong> "all automatic renewal program subscription orders must be cancelled within (12) hours of the renewal subscription date to avoid the order being shipped and you incurring charges for same." This is the shortest window we found.</li>
<li><strong>Cadence:</strong> "Recurring Fees will be charged in advance." The interval is not stated in the terms. The statement descriptor is "REX MD 866-294-3772" or "REX Wellness."</li>
<li><strong>Pause:</strong> the FAQ says "We offer the flexibility to pause or cancel your subscription at any time." Mechanics are not stated.</li></ul>
<h3>Collective</h3>
<p>Document: ${ext(S.collTerms, "terms of use")}, "Version 2026-11-19 ... last updated: 19 November 2026," and the homepage FAQ. Read our <a href="/weight-loss/reviews/collective">full Collective review</a>.</p>
<ul><li><strong>How:</strong> "You can cancel anytime, right from your account - no phone calls, no retention games." The terms say the membership renews "unless you cancel your membership before the end of the then-current membership period by canceling online through our Platform."</li>
<li><strong>Cutoff:</strong> the 21-day free trial "will automatically convert to a paid annual membership ... unless you cancel before the Trial Period expires." No hour count is stated for the membership period or for medication orders.</li>
<li><strong>Cadence:</strong> membership "$199/year, billed annually-not monthly." Medication is billed separately: "we obtain a pre-authorization on your payment card at checkout and charge your card only when the pharmacy ships your order." <strong>Pause:</strong> not found.</li></ul>`,
    },
    {
      heading: "What is the cutoff to avoid the next charge?",
      body: `<p>Cutoffs from longest notice to shortest, as the documents word them:</p>
<table><thead><tr><th>Provider</th><th>Cutoff</th><th>If you miss it</th></tr></thead><tbody>
<tr><td>altRx, embody</td><td>72 hours before the next billing date</td><td>The charge goes through, is non-refundable, and the cancellation starts with the following billing cycle</td></tr>
<tr><td>wellmedr (terms)</td><td>2 days before the scheduled renewal date, measured from the original date</td><td>"Otherwise your subscription renews for another period"</td></tr>
<tr><td>DirectMeds</td><td>48 hours before the next processing date</td><td>Not stated</td></tr>
<tr><td>REX MD</td><td>Within 12 hours of the renewal subscription date</td><td>The order ships and you incur the charges</td></tr>
<tr><td>wellmedr (refund policy)</td><td>None: effective when received</td><td>A charge submitted before the request took effect is reviewed under the refund rules</td></tr>
<tr><td>HealthRx</td><td>None stated for month-to-month; "before your next renewal date" for paid-up-front plans</td><td>On a 3, 6 or 12-month minimum, the remaining minimum payments are still due</td></tr>
<tr><td>Collective</td><td>Before the trial ends or the membership period ends; no hours stated</td><td>The trial converts to a paid annual membership</td></tr>
</tbody></table>
<p>Source: the documents listed in the sections above, read Nov 22, 2026. "2 days" is wellmedr's wording; it equals 48 hours. REX MD's 12 hours is counted from the renewal date as its terms word it. wellmedr says early processing can happen: its first renewal "may be charged early to avoid a gap in treatment," and later renewals and shipments "may be processed up to two (2) days early for holidays or operational reasons."</p>
<p>A cutoff is a deadline set by the provider's own contract. We have not tested any of these by cancelling.</p>`,
    },
    {
      heading: "Can I get a refund after the medication ships?",
      body: `<p>Not on the terms we read, apart from the exceptions listed. The wording, provider by provider:</p>
<ul><li><strong>wellmedr:</strong> the refund policy says "Documented clinical services already performed and patient-specific medication for which Medication Fulfillment Start occurred are nonrefundable, except where law requires otherwise. Every objectively unearned or unfulfilled portion will be refunded, and future renewals will stop." "Medication Fulfillment Start" means "the dispensing pharmacy has documented that it began preparing, compounding, filling, or dispensing the patient-specific prescription." The terms are shorter: "Medication is not refundable once shipped." If the initial clinician does not approve treatment, the policy says the "full initial checkout payment will be refunded automatically within seven business days."</li>
<li><strong>altRx and embody:</strong> "ALL PAYMENTS FOR THE SUBSCRIPTION SERVICES ARE FINAL AND NON-REFUNDABLE AT THE TIME OF PURCHASE." "Cancellation of your Subscription Service stops future billing only. It does not refund amounts already paid." Medications are "non-returnable and non-refundable under all circumstances." Multi-month and bundled plans "ARE NON-REFUNDABLE IN WHOLE AND IN PART." The exception: if their provider finds you "not clinically eligible," you get "a refund for any unused portion of the amount paid for the then-current term," less the consultation, review, prescriptions, shipped medication and labs already used. The policy gives no prices for those, so the refund cannot be worked out in advance.</li>
<li><strong>HealthRx:</strong> "State and Federal regulations do not allow the return of prescription medications after being dispensed by the pharmacy. Once charged and handed to carriers, all sales become final." If the provider declines you, "HealthRX.com will issue a full refund of the related charge to the original payment method." The FAQ says it will "refund any unshipped dose."</li>
<li><strong>DirectMeds:</strong> "Subscriptions can be canceled anytime, but no refunds for medication already received." Returns are accepted only for "incorrect medication, damaged products, products not meeting safety standards, unshipped products, or medication denied by a Direct Meds doctor," and "Returned medication incurs a $35 disposal fee." A prescription order can be cancelled "within 24 hours of placing it (if not yet received by the provider network)"; after that, orders "generally cannot be canceled."</li>
<li><strong>REX MD:</strong> "UNLESS OTHERWISE INDICATED, ALL SALES ARE FINAL AND NON-REFUNDABLE." "Medications are not eligible for return or refund." The FAQ says a provider who finds you ineligible leads to "a full refund," and mentions refunds "on a case-by-case basis."</li>
<li><strong>Collective:</strong> "all membership fees are non-refundable, and partial-period refunds are not provided" except as law or checkout states. Products "may not be returned and are nonrefundable except as otherwise determined by CollectiveOS in its sole discretion." If the doctor declines: "you get a full refund - you're never charged for medication you don't receive."</li></ul>
<p>Source: the refund and terms documents named above, read Nov 22, 2026. wellmedr also asks you to "Contact patient portal support within seven calendar days after delivery if an item is missing, damaged, leaking, incorrect, or otherwise unusable." The other providers' damaged-item rules we did not compare beyond DirectMeds' return list above.</p>`,
    },
    {
      heading: "What if I am still charged after cancelling?",
      body: `<p>Only wellmedr's and altRx's documents describe this case, so this is what they state and nothing more.</p>
<ul><li><strong>wellmedr:</strong> the refund policy lists "Charge submitted after an effective cancellation: Full refund of the post-cancellation charge." Its FAQ asks you to call with "the charge date and amount, the date of your cancellation request, and any confirmation or message reference." Refunds go back to "the original payment method," approved refunds are submitted "within seven business days," and "Your bank or card issuer determines when the credit appears on your statement." This is why the confirmation matters: the policy ties the refund to when the request was received.</li>
<li><strong>altRx:</strong> "If you believe a charge was made in error, contact patient support at care@altrx.com or +1 607-601-6969 before initiating a dispute with your card issuer or bank so that we can review the charge. Initiating a payment dispute does not alter the non-refundable nature of the Subscription Services under this policy." That is altRx's request in its own policy, not a rule from a regulator.</li></ul>
<p>We did not find a process for a charge after cancelling in the other five providers' documents. A late request is a different case: altRx, embody and REX MD say a charge inside their window goes through (see the cutoff table). This page does not cover consumer-protection rules or card disputes, because we did not read a primary source on either.</p>`,
    },
    {
      heading: "Does cancelling stop my treatment?",
      body: `<p>No, not by itself, and the providers say so. wellmedr's refund policy: "Canceling automatic renewal does not automatically: Refund a payment already processed; Cancel a prescription or order that has received Medication Fulfillment Start; End the Current Term of a prepaid plan; or Tell your clinician to discontinue treatment." It then says: "Do not discontinue prescribed treatment solely because you canceled billing without first obtaining appropriate medical guidance." Its terms add: "Cancelling your membership also cancels your Medication Plan." HealthRx's refund policy says "Canceling a subscription does not return medication already dispensed."</p>
<p>Whether to stop, taper or switch is a question for your prescriber. altRx's FAQ makes the same point: "If you and your provider decide to discontinue GLP-1 treatment, your provider may recommend a tapering schedule." For what the research says about stopping, read <a href="/weight-loss/articles/stopping-glp1-medication-what-happens">what happens when you stop a GLP-1</a>. For how plans can change if compounding rules change, read <a href="/weight-loss/articles/compounded-semaglutide-going-away">is compounded semaglutide going away</a>.</p>`,
    },
    {
      heading: "What could we not verify?",
      body: `<p>We could not read the cancellation terms for <strong>TrimRx, Medvi, Eden, Shed, Sprout, bmiMD or Hims</strong>. Their sites or terms pages did not load for us on Nov 22, 2026 (or loaded without any text), so this page says nothing about their cutoffs, refunds or pause options. TrimRx's homepage shows the line "Cancel Before Your Next Billing Cycle," which is marketing text with no steps or deadline behind it. Check their own terms before you rely on a rule from another company's page.</p>
<p>Three more limits. First, wellmedr's "Monthly Plan" shows "Cancel or change anytime" on its plan page, but none of the documents we read says how often that plan is charged; ask for the billing date in writing. Second, we did not test any cancellation flow, and the documents above can change; the dates shown are the dates on the documents, and Nov 22, 2026 is the date we read them. Third, a provider's terms are its side of a contract. They are not a ruling on what you can recover in every state.</p>
<p>Compounded semaglutide and tirzepatide are not FDA-approved. Nothing here is medical advice. Questions about your own treatment go to your prescriber.</p>`,
    },
  ],
};
