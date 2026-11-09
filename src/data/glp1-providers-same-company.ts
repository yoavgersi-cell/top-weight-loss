import type { Article } from "./articles";

// ───── Are altRx, embody, welludr, TrimRx and Medvi the same company? (Nov 2, 2026) ─────
// Answers a recurring Bing question cluster ("is altrx and embody same
// company", "are wellmedr and embody same company", "is altrx the same as
// trimrx", "sister brands of altrx", "is wellmedr associated with medvi").
// Every structural fact is taken from the provider's own published documents
// (terms, privacy policy, about page, refund policy), linked inline. Forum
// posts and third-party review sites are not used as sources. Prices and
// plan terms come from the verified price index. Neutral by design: a shared
// clinician network is an ordinary industry structure, not a finding against
// any provider.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  altrxAbout: "https://www.altrx.com/about",
  altrxTerms: "https://www.altrx.com/v3/terms-and-conditions",
  embodyTerms: "https://joinem.co/pages/terms-conditions",
  welludrPrivacy: "https://www.wellmedr.com/pages/privacy-policy-1",
  welludrRefund: "https://www.wellmedr.com/pages/refund-and-cancellation-policy",
  welludrTerms: "https://www.wellmedr.com/pages/terms-conditions",
  trimrxTerms: "https://trimrx.com/terms-and-conditions",
  fdaCompounding: "https://www.fda.gov/drugs/guidance-compliance-regulatory-information/human-drug-compounding",
};

export const glp1ProvidersSameCompanyArticle: Article = {
  slug: "are-altrx-embody-welludr-same-company",
  title: "Are altRx, embody and welludr the Same Company? (2026)",
  description:
    "altRx, embody, welludr, TrimRx and Medvi are separate companies. Why some feel alike: a shared clinician network, per their own published documents.",
  category: "Guide",
  readTime: "6 min read",
  publishedAt: "2026-11-02",
  updatedAt: "2026-11-02",
  heroColor: "#EEF3F8",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "altRx, embody, welludr, TrimRx and Medvi are separate companies. Their own documents name different operating entities, and each sets its own prices, plans, support and guarantees.",
    "altRx, embody and welludr each name OpenLoop as the clinician network behind their prescriptions, which is why patients sometimes notice similar intake steps or portals.",
    "None of them is a pharmacy. Prescriptions are filled by independent, state-licensed pharmacies, and which pharmacy fills an order can differ by brand, treatment and state.",
    "A shared clinician network is a common, legitimate telehealth structure. What separates the brands for you is price, commitment, shipping speed and support.",
  ],
  sections: [
    {
      heading: "Are altRx, embody and welludr the same company?",
      body: `<div class="qa"><strong>The short answer</strong>No. altRx, embody and welludr (formerly wellmedr) are separate companies with different operating entities, prices and plan terms. They can feel alike because each one names the same telehealth clinician network, OpenLoop, in its own published documents, and none of them is a pharmacy: licensed clinicians in that network decide whether to prescribe, and independent licensed pharmacies fill the prescriptions. TrimRx and Medvi are also separate companies.</div><p>The question comes up because patients who try more than one of these services notice overlaps: a similar health questionnaire, a similar sequence of steps, sometimes a familiar-looking patient portal. The overlaps are real, and they have a plain explanation. Most online GLP-1 brands do not employ their own doctors or run their own pharmacies. They are consumer-facing companies that contract with a licensed clinician network and with licensed pharmacies, and several of the best-known brands contract with the same network.</p><p>Everything below comes from each company's own terms, privacy policy, about page or refund policy, linked in place, as published when we checked on November 2, 2026. Companies can change partners, so the documents themselves are the place to confirm the current arrangement.</p>`,
    },
    {
      heading: "Who runs each provider, and who prescribes?",
      body: `<table><thead><tr><th>Brand</th><th>Operating company (own documents)</th><th>Who prescribes</th><th>Who fills prescriptions</th></tr></thead><tbody>
<tr><td><a href="/weight-loss/reviews/altrx">altRx</a></td><td>Trinity HealthCare Supply, LLC d/b/a altRx, which provides the technology platform and administrative services (${ext(S.altrxAbout, "altRx about page")})</td><td>OpenLoop Healthcare Partners, PC (${ext(S.altrxAbout, "altRx about page")})</td><td>Independently owned, state-licensed 503A compounding pharmacies in the altRx pharmacy network (${ext(S.altrxTerms, "altRx terms")})</td></tr>
<tr><td><a href="/weight-loss/reviews/embody">embody</a></td><td>Modern Metabolic Medicine, Inc. (${ext(S.embodyTerms, "embody terms")})</td><td>Clinicians from OpenLoop Health (${ext(S.embodyTerms, "embody terms")})</td><td>Independent third-party pharmacies (${ext(S.embodyTerms, "embody terms")})</td></tr>
<tr><td><a href="/weight-loss/reviews/wellmedr">welludr</a> (formerly wellmedr)</td><td>welludr, which collects payment on behalf of the medical group (${ext(S.welludrTerms, "welludr terms")})</td><td>OpenLoop Health (${ext(S.welludrPrivacy, "welludr privacy policy")})</td><td>Named licensed pharmacies, including Logos Pharmacy, Emerald Compounding Pharmacy and Center City Pharmacy, varying by treatment and location (${ext(S.welludrRefund, "welludr refund policy")})</td></tr>
<tr><td><a href="/weight-loss/reviews/trimrx">TrimRx</a></td><td>A technology and administrative services platform (${ext(S.trimrxTerms, "TrimRx terms")})</td><td>Independent, affiliated physician groups (${ext(S.trimrxTerms, "TrimRx terms")})</td><td>A participating pharmacy, paid by TrimRx out of the fees it collects (${ext(S.trimrxTerms, "TrimRx terms")})</td></tr>
<tr><td><a href="/weight-loss/reviews/medvi">Medvi</a></td><td>A separate company</td><td>Not confirmed from Medvi's own documents</td><td>Not confirmed from Medvi's own documents</td></tr>
</tbody></table>
<p>Two things stand out. First, the operating companies are different: there is no shared parent named in any of these documents, so "sister brands" is not an accurate description on the evidence available. Second, three of the five name the same clinician network. That is the "cousins by infrastructure" relationship people sense when they compare portals.</p>`,
    },
    {
      heading: "Why do these providers look so similar?",
      body: `<p>Because the parts a patient touches first are often supplied by the same partners. The clinician network sets how an intake is reviewed, and network-wide tools can shape what the questionnaire and follow-up messages look like. The pharmacy side is similar: compounded semaglutide and tirzepatide are prepared by state-licensed compounding pharmacies, a regulated channel the FDA describes on its ${ext(S.fdaCompounding, "human drug compounding")} pages, and several brands work with pharmacies from the same pool.</p><p>What each brand controls is the part you pay for and live with: the price, whether you commit to a plan, how fast it ships, how support works and what guarantees apply. Those differ a lot, which is why choosing between them is a real decision rather than a choice between labels on the same box.</p>`,
    },
    {
      heading: "Is the medication the same if I switch between them?",
      body: `<p>The active ingredient is the same molecule, semaglutide or tirzepatide, but the specific compounded product depends on the pharmacy that fills the order, and that can differ by brand, by treatment and by state. welludr, for example, says the dispensing pharmacy varies with treatment and location (${ext(S.welludrRefund, "welludr refund policy")}). If consistency matters to you, ask the provider which pharmacy will fill your prescription before you switch, and tell your new prescriber your current dose so they can decide how to continue. Do not change or stretch a dose on your own; the prescriber decides.</p>`,
    },
    {
      heading: "Is a shared clinician network a red flag?",
      body: `<p>No. It is the standard structure for direct-to-consumer telehealth. A licensed clinician network provides the prescribers, the brand provides the service around them, and licensed pharmacies dispense. The legitimacy checks are the same as for any provider: a licensed clinician who reviews your history and can decline treatment, a licensed US pharmacy, published prices with their conditions, and clear cancellation terms. Each brand's page on our site walks through those checks: <a href="/weight-loss/articles/is-altrx-legit">is altRx legit</a>, <a href="/weight-loss/articles/is-embody-legit">is embody legit</a>, <a href="/weight-loss/articles/is-wellmedr-legit">is welludr legit</a> and <a href="/weight-loss/articles/is-trimrx-legit">is TrimRx legit</a>.</p>`,
    },
    {
      heading: "If they share a network, how do they actually differ?",
      body: `<p>On the things you will notice every month. Verified prices from our price index, with the condition attached to each:</p><table><thead><tr><th>Provider</th><th>Semaglutide</th><th>Tirzepatide</th><th>Commitment</th></tr></thead><tbody>
<tr><td>welludr</td><td>$41/month</td><td>$71/month</td><td>12-month plan for the lowest rate (pre-Black Friday sale)</td></tr>
<tr><td>embody</td><td>$49/month</td><td>$99/month</td><td>Month to month (pre-Black Friday sale)</td></tr>
<tr><td>altRx</td><td>$89/month</td><td>$149/month</td><td>Pause or cancel anytime; Buy Now, Pay Later</td></tr>
<tr><td>Medvi</td><td>$99/month (promo)</td><td>$166/month (promo)</td><td>No membership; dietician and coaching included</td></tr>
<tr><td>TrimRx</td><td>$149/month</td><td>$259/month</td><td>Month to month</td></tr>
</tbody></table><p>Beyond price: altRx is the one with a brand-name shelf (Ozempic, Zepbound, Wegovy) alongside compounded plans; embody ships in 1-2 days and refunds you if you are not approved; welludr includes a coach and a weight-loss warranty; Medvi bundles video visits and a dietician; TrimRx has the cleanest exit terms. Prices change, so check the <a href="/weight-loss/cheapest-glp1">cheapest GLP-1 comparison</a> or the <a href="/weight-loss/glp1-cost-calculator">cost calculator</a> before you decide.</p>`,
    },
    {
      heading: "Which one should I choose?",
      body: `<p>Choose on what differs, not on the shared network. Lowest price and happy to commit: welludr. Lowest price without a commitment: embody. A path to brand-name medication in the same account: altRx. The most hands-on support: Medvi. Flexibility above all: TrimRx. Side-by-side detail is in <a href="/weight-loss/embody-vs-wellmedr">embody vs welludr</a>, <a href="/weight-loss/altrx-vs-embody">altRx vs embody</a> and <a href="/weight-loss/embody-vs-altrx-vs-wellmedr">embody vs altRx vs welludr</a>, and the full ranking is on our <a href="/weight-loss">weight loss comparison</a>. This article is general information, not medical advice.</p>`,
    },
  ],
};
