import type { ArticleData } from "../config";

// ───── Hair-loss guides written for treatmentshub.com/hair-loss, Oct 28, 2026 ─────
// Breezula (clascoterone) is the most-searched pipeline product in hair loss
// and is not approved anywhere. Every trial figure here is the company's own
// announcement as reported, labelled as such; the approved comparators
// (finasteride, minoxidil, Winlevi for acne) carry FDA label links.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  cosmoDec: "https://www.investing.com/news/stock-market-news/cosmo-shares-surge-over-20-after-breezula-phase-iii-trials-hit-key-goals-4387715",
  skincareMd: "https://press.skincare.md/2025/12/new-phase-iii-data-for-breezula.html",
  hlc2020: "https://www.hairlosscure2020.com/breezula-clascoterone-breakthrough-phase-iii-results/",
  ct: "https://clinicaltrials.gov/study/NCT05611593",
  winlevi: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2020/213433s000lbl.pdf",
  propecia: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2012/020788s020s021s023lbl.pdf",
  minoxMedline: "https://medlineplus.gov/druginfo/meds/a689003.html",
  finMedline: "https://medlineplus.gov/druginfo/meds/a698016.html",
};

export const HAIR_LOSS_ARTICLES_2026_10: ArticleData[] = [
  {
    slug: "breezula-clascoterone-hair-loss",
    title: "Breezula (Clascoterone) for Hair Loss: Phase 3 Results, Date",
    description:
      "What Cosmo's SCALP 1 and 2 trials of clascoterone 5% reported, the early-2027 filing plan, why nothing sold now is Breezula, and what to use meanwhile.",
    category: "Science",
    readTime: "15 min read",
    publishedAt: "2026-10-28",
    updatedAt: "2026-10-28",
    heroColor: "#EEF7FB",
    author: "Treatments Hub Research Team",
    keyTakeaways: [
      "Breezula is a 5% scalp solution of clascoterone, a topical anti-androgen that blocks DHT at the follicle without lowering DHT in the blood. It is not approved for hair loss anywhere; the 1% cream of the same molecule (Winlevi) is FDA-approved for acne.",
      "Cosmo Pharmaceuticals reported in December 2025 that both six-month phase 3 trials (SCALP 1 and SCALP 2, 1,465 men) met their hair-count endpoints, and in April 2026 that men who stayed on treatment kept gaining through month 12. These are company announcements; the peer-reviewed papers are not yet out.",
      "The company's stated plan is a US filing in early 2027, which puts any approval into 2028 at the earliest. Nothing sold online today as Breezula or clascoterone for hair is the trial product.",
      "For men losing hair now, the approved, evidence-backed routes are unchanged: finasteride, minoxidil (topical or low-dose oral, off-label) and their combination. A clascoterone that works would be a third option, not a replacement.",
    ],
    sections: [
      {
        heading: "What is Breezula, and does it work for hair loss?",
        body: `<div class="qa"><strong>Key takeaways and quick verdict</strong><p>Breezula is clascoterone 5%, a topical anti-androgen in late-stage trials for male pattern hair loss. Its two phase 3 trials met their primary endpoints on hair count over six months, and twelve-month data reported in April 2026 showed continued gains for men who stayed on it, according to the company. It is not approved, not for sale, and the earliest realistic US availability is 2028 after a planned early-2027 filing. The honest verdict today: promising, unproven in print, and not a reason to delay finasteride or minoxidil if you are losing hair now. Sources: ${ext(S.cosmoDec, "Cosmo phase 3 topline, December 2025, as reported")}; ${ext(S.hlc2020, "12-month data, April 2026, as reported")}, checked October 28, 2026.</p></div>
<p>Every few years a hair-loss product gets a release-date rumour mill of its own, and in 2026 that product is Breezula. The interest is justified, because it would be the first new mechanism approved for androgenetic alopecia since finasteride in 1997, and because it attacks the hormonal cause of the condition without the systemic effects that make many men hesitate over finasteride. The interest is also exploited: search results are full of clinics and shops describing results that have not been published, and of products with similar names that are not the trial drug. This guide separates the three.</p>`,
      },
      {
        heading: "How clascoterone works, and why 'topical anti-androgen' is the point",
        body: `<p>Male pattern hair loss is driven by dihydrotestosterone (DHT) acting on androgen receptors in genetically sensitive follicles, which shrink over successive cycles until the hair they produce is too fine to see. The two approved drugs attack this from different directions. Finasteride lowers the amount of DHT made in the body by blocking the 5-alpha-reductase enzyme; it works, and because it acts throughout the body it carries the sexual and mood side effects that appear on its label. Minoxidil does not touch DHT at all; it prolongs the growth phase and widens the follicle by a mechanism that is still not fully understood. Sources: ${ext(S.propecia, "Propecia prescribing information, FDA")}; ${ext(S.minoxMedline, "MedlinePlus, minoxidil topical")}, checked October 28, 2026.</p>
<p>Clascoterone takes a third route. It is an androgen receptor antagonist: it sits in the receptor in the follicle so DHT cannot. Applied to the scalp, it is designed to act where it lands and to be broken down quickly once absorbed, so circulating DHT and testosterone are left alone. That is the whole attraction. If it holds up, a man gets the anti-androgen effect at the follicle without the systemic anti-androgen effect in the rest of his body.</p>
<p>The molecule is not new. At a 1% concentration in a cream, clascoterone was approved by the FDA in August 2020 as Winlevi for acne, which is also an androgen-driven condition of the skin. The acne label is the only regulatory record of clascoterone's safety in humans, and it is for a lower strength, a different vehicle, a different body area and a different population, so it supports the plausibility of the scalp product without proving its safety. Source: ${ext(S.winlevi, "Winlevi prescribing information, FDA, 2020")}, checked October 28, 2026.</p>`,
      },
      {
        heading: "The phase 3 results: what was reported, and what was not",
        body: `<p>Cosmo Pharmaceuticals announced topline results from two identical phase 3 trials, SCALP 1 and SCALP 2, in December 2025. Together they enrolled 1,465 men with androgenetic alopecia across sites in the United States and Europe, randomised to clascoterone 5% solution or vehicle (the same solution without the drug) for six months, with target-area hair count as the primary endpoint. Both trials met that endpoint. The company's release, as reported by the financial press and trade outlets, gave relative improvements over vehicle of about 539% in one trial and about 168% in the other; the share price rose more than 20% on the day. Sources: ${ext(S.cosmoDec, "Investing.com, December 2025")}; ${ext(S.skincareMd, "trade summary of the release")}, checked October 28, 2026.</p>
<p>In April 2026 the company reported twelve-month data: men who continued clascoterone kept gaining hair between months six and twelve, while men switched to vehicle at month six gained markedly less, reported as a roughly 2.4-fold difference. Cosmo stated in mid-2026 that the phase 3 programme was complete and that regulatory preparation was under way, with a US filing planned for early 2027 and a European application in parallel. Source: ${ext(S.hlc2020, "12-month data as reported, April 2026")}, checked October 28, 2026.</p>
<h3>Reading the numbers</h3>
<p>Three things about these results deserve a plain statement. First, they are the sponsor's announcements, not peer-reviewed papers; the primary publications had not appeared when we checked, and until they do the absolute hair counts, the dropout rates and the full adverse-event tables are not public. Second, "relative improvement over vehicle" is a ratio of two changes, and when the vehicle group's change is small the ratio can be large even when the absolute gain is modest; a 539% figure tells you the drug beat the placebo, not that hair count rose fivefold. Third, six months is the minimum for a hair-count trial and twelve months is the point at which the comparators are usually judged, so the April 2026 data is the more meaningful of the two.</p>
<table>
<thead><tr><th>Question</th><th>What the sponsor reported</th><th>What is still unknown</th></tr></thead>
<tbody>
<tr><td>Did it beat placebo at 6 months?</td><td>Yes, in both trials, on target-area hair count</td><td>Absolute hair-count gains; investigator and patient assessments</td></tr>
<tr><td>Does the effect continue?</td><td>Yes through 12 months for men who stayed on it</td><td>Beyond 12 months; what happens on stopping</td></tr>
<tr><td>How does it compare with finasteride or minoxidil?</td><td>Not tested head to head</td><td>Everything; no comparative trial exists</td></tr>
<tr><td>Is it safe?</td><td>Company describes the safety profile as supportive</td><td>Full adverse-event data; long-term hormonal effects at the scalp</td></tr>
<tr><td>When can I buy it?</td><td>US filing planned early 2027</td><td>Whether the FDA approves it, and when</td></tr>
</tbody>
</table>`,
      },
      {
        heading: "When will Breezula be available?",
        body: `<p>Work the regulatory arithmetic rather than the rumours. A New Drug Application filed in early 2027 enters a standard review of about ten months from acceptance, which points to a decision around the end of 2027 or early 2028 if everything goes to plan, and later if the agency asks for more. Approval is not guaranteed: the acne approval helps on safety but the hair-loss indication stands on the two trials above, which the FDA will read in full rather than from a press release. A European decision would run on its own timetable.</p>
<p>Until then, no legitimate pharmacy can sell it. Three kinds of product are being sold under its name or in its shadow, and all three should be avoided. Compounded "clascoterone" solutions offered online use the acne-grade active ingredient at concentrations and in vehicles that have not been tested on the scalp. Grey-market imports labelled Breezula are, at best, mislabelled and at worst nothing of the kind. And research-chemical sites sell the molecule "for research use", which is a legal fig leaf for sale to the public with no quality control at all. The one trial of a new formulation listed on ClinicalTrials.gov is the only legitimate route to the drug before approval. Source: ${ext(S.ct, "ClinicalTrials.gov NCT05611593")}, checked October 28, 2026.</p>`,
      },
      {
        heading: "What should you use for hair loss while waiting for Breezula?",
        body: `<p>A man who waits for Breezula will lose two years of hair he could have kept. The treatments with decades of evidence are available today, online, from the providers we review, and none of them precludes adding clascoterone later if it is approved.</p>
<ul>
<li><strong>Finasteride 1 mg daily</strong> is the only approved oral treatment for male pattern hair loss and the most effective single agent on the evidence, with the systemic side-effect profile its label describes. Our guides to <a href="/hair-loss/articles/does-finasteride-work">whether finasteride works</a> and <a href="/hair-loss/articles/finasteride-side-effects">its side effects</a> cover the trade-off; <a href="/hair-loss/articles/how-to-get-finasteride-online">how to get finasteride online</a> covers the providers.</li>
<li><strong>Topical finasteride</strong> is the current attempt at the same idea as Breezula, lower systemic exposure, using the existing drug; it is compounded, not FDA-approved as a topical, and our <a href="/hair-loss/articles/topical-finasteride">topical finasteride guide</a> sets out the evidence.</li>
<li><strong>Minoxidil</strong>, topical 5% or low-dose oral (off-label), works independently of DHT and combines with either finasteride; see <a href="/hair-loss/articles/oral-minoxidil-vs-topical-minoxidil">oral versus topical minoxidil</a> and <a href="/hair-loss/articles/finasteride-and-minoxidil-together">using both together</a>.</li>
<li><strong>Dutasteride</strong>, off-label, for men who do not respond to finasteride; covered in <a href="/hair-loss/articles/dutasteride-vs-finasteride">dutasteride versus finasteride</a>.</li>
</ul>
<p>What each of these costs from the providers we review is on our <a href="/hair-loss/articles/hair-loss-treatment-cost">hair loss treatment cost</a> page, and the providers themselves are compared on the <a href="/hair-loss">hair loss treatment ranking</a>.</p>`,
      },
      {
        heading: "What people losing hair actually say: the pattern in the reviews",
        body: `<p>We capture customers' public reviews of the hair-loss providers we rank and quote them on the review pages. The pattern in them explains why Breezula has an audience before it has a product. The men who praise a provider praise the convenience of a prescription without a clinic visit and the first visible regrowth; the men who leave unhappy most often cite either side effects they attribute to finasteride or a subscription they found hard to cancel. Fear of finasteride's systemic effects is the single most common reason men in these reviews say they stopped or never started, and it is exactly the fear a topical anti-androgen promises to remove.</p>
<p>That is worth saying plainly because it cuts both ways. A drug that lets anxious men treat the hormonal cause without a systemic drug would be a real advance. It would also be marketed to men whose hair loss is not advanced enough to need an anti-androgen at all, or whose problem is the subscription model rather than the molecule. Our reviews of <a href="/hair-loss/reviews/hims">Hims</a>, <a href="/hair-loss/reviews/keeps">Keeps</a> and <a href="/hair-loss/reviews/happyhead">Happy Head</a> set out what each provider's customers report about both.</p>`,
      },
      {
        heading: "Who is Breezula not for, and what is still unknown?",
        body: `<ul>
<li><strong>Women.</strong> Both phase 3 trials enrolled men only. Female pattern hair loss has different hormonal drivers and different approved options; see our guide to <a href="/hair-loss/articles/hair-loss-treatment-for-women">hair loss treatment for women</a>.</li>
<li><strong>Men with advanced loss.</strong> Hair-count trials enrol men with active thinning, not bare scalp. No topical, including this one, regrows hair from follicles that have been gone for years; that is transplant territory, covered in <a href="/hair-loss/articles/hair-transplant-vs-medication">hair transplant versus medication</a>.</li>
<li><strong>Anyone being offered it now.</strong> If a clinic or site is selling clascoterone for hair loss in 2026, it is not the trial product and has not been tested on the scalp at that strength.</li>
<li><strong>Men looking for a finasteride replacement with proof.</strong> There is no head-to-head trial. A man doing well on finasteride has no evidence-based reason to switch.</li>
</ul>
<p>The questions that will decide whether Breezula matters are the ones the announcements do not answer: the size of the hair-count gain in absolute terms, whether the twelve-month gain compares with what minoxidil and finasteride achieve in the same period, what happens on stopping, whether any androgen-receptor blockade at the scalp has measurable systemic effects over years, and what the FDA makes of the adverse-event tables. We will update this page when the peer-reviewed papers and the filing are public.</p>`,
      },
      {
        heading: "Final verdict and next steps",
        body: `<p>Breezula is the most credible new hair-loss drug in two decades, and it is not available, not approved and not yet published. Treat it as a reason for optimism about 2028, not as a plan for 2026. The men who will benefit most from it are the men who kept their hair until it arrives, and that means starting the approved treatments now.</p>
<ol>
<li><strong>If you are losing hair now:</strong> start with the evidence that exists. Finasteride, minoxidil or both, prescribed by a licensed clinician; our <a href="/hair-loss">provider ranking</a> compares who prescribes them online.</li>
<li><strong>If finasteride's side effects are the obstacle:</strong> discuss topical finasteride or minoxidil alone with a prescriber, and keep clascoterone on the watch list rather than buying a grey-market copy.</li>
<li><strong>Set a reminder for early 2027</strong>, when the filing is due, and treat any "available now" claim before then as a red flag.</li>
<li><strong>Keep a baseline:</strong> a dated photograph of the crown and hairline under the same light every three months is the only way to know whether anything is working.</li>
</ol>
<h3>References and further reading</h3>
<ul>
<li>${ext(S.cosmoDec, "Cosmo Pharmaceuticals phase 3 topline results for Breezula, December 2025, as reported by Investing.com")}.</li>
<li>${ext(S.hlc2020, "Twelve-month SCALP data and filing timeline, April to July 2026, as reported")}.</li>
<li>${ext(S.ct, "ClinicalTrials.gov NCT05611593: a new clascoterone formulation for male androgenetic alopecia")}.</li>
<li>${ext(S.winlevi, "Winlevi (clascoterone 1% cream) prescribing information, FDA, 2020")}.</li>
<li>${ext(S.propecia, "Propecia (finasteride 1 mg) prescribing information, FDA")}; ${ext(S.finMedline, "MedlinePlus, finasteride")}.</li>
<li>${ext(S.minoxMedline, "MedlinePlus, minoxidil topical")}.</li>
</ul>
<p><em>This article is general information, not medical advice. Hair-loss treatments are prescription medicines with side effects; a licensed clinician who knows your history should decide what, if anything, is right for you.</em></p>`,
      },
    ],
  },
];
