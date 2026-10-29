import { MedicalReviewBar } from "@/components/medical-review-bar";
import { DEFAULT_OG_IMAGE } from "@/lib/og";
import { pageReviewSchema } from "@/data/reviewers";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Clock } from "lucide-react";
import { GuideCluster } from "@/components/guide-cluster";
import { TopTwoPicks } from "@/components/top-providers-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MedicalSources } from "@/components/medical-sources";
import { enhanceArticleHtml } from "@/components/prose";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX_VERIFIED } from "@/lib/price-index";

// ─────────────────────────────────────────────────────────────────────────────
// GLP-1 pills vs injections - the long-form comparison.
//
// Oct 22, 2026 rebuild (operator request): the page now uses the same masthead
// and 1100px layout as every weight-loss article (light-blue hero band, the
// vertical's hero image on the right on desktop, category + read time, the
// quick-answer box instead of a "winner" verdict), and the body went from a
// 700-word summary to a full guide. Every clinical figure is the published
// trial result with its source linked inline; every provider price is the
// verified price index (PRICE_INDEX_VERIFIED) or a provider's own published
// terms as captured on its review page; manufacturer prices are reported from
// the dated sources linked and are labelled as not verified by us. Nothing is
// estimated.
// ─────────────────────────────────────────────────────────────────────────────

export const revalidate = 60;

const CANONICAL = "https://www.treatmentshub.com/weight-loss/glp1-pills-vs-injections";
const PAGE_PUBLISHED = "2026-08-09";
const PAGE_UPDATED = "2026-10-22";
const HERO_COLOR = "#EDF2F8";
const READ_TIME = "16 min read";

export const metadata: Metadata = {
  title: "GLP-1 Pills vs Injections (2026): Results, Cost & Routine",
  description:
    "GLP-1 pills vs injections in 2026: the Wegovy pill and Foundayo against Wegovy and Zepbound on trial results, price by route, side effects and daily routine.",
  alternates: { canonical: CANONICAL },
  openGraph: { images: [DEFAULT_OG_IMAGE],
    title: "GLP-1 Pills vs Injections (2026): Results, Cost & Routine",
    description:
      "The two FDA-approved GLP-1 pills against the weekly injections: trial results, verified prices, side effects and how to choose.",
    url: CANONICAL,
    type: "article",
  },
};

const fmt = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const ext = (href: string, label: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;

const SRC = {
  step1: "https://doi.org/10.1056/NEJMoa2032183",
  surmount1: "https://doi.org/10.1056/NEJMoa2206038",
  oasis4: "https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/40/oasis-4",
  attain1: "https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/48/attain-1",
  step1ext: "https://doi.org/10.1111/dom.14725",
  wegovyPillApproval: "https://www.healio.com/news/endocrinology/20260213/fda-approves-wegovy-pill-the-first-oral-glp1-to-treat-obesity",
  foundayoApproval: "https://www.fda.gov/news-events/press-announcements/fda-approves-first-new-molecular-entity-under-national-priority-voucher-program",
  wegovyApproval: "https://www.fda.gov/news-events/press-announcements/fda-approves-new-drug-treatment-chronic-weight-management-first-2014",
  zepboundApproval: "https://www.fda.gov/news-events/press-announcements/fda-approves-new-medication-chronic-weight-management",
  fdaConcerns: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss",
  fdaCompounding: "https://www.fda.gov/drugs/human-drug-compounding",
  medlineSema: "https://medlineplus.gov/druginfo/meds/a618008.html",
  medlineTirz: "https://medlineplus.gov/druginfo/meds/a622044.html",
  lillyRelease: "https://www.biospace.com/press-releases/foundayo-orforglipron-lillys-new-oral-glp-1-pill-for-weight-loss-now-available-in-the-u-s",
  sciam: "https://www.scientificamerican.com/article/how-eli-lillys-new-glp-1-pill-stacks-up-against-wegovy-and-other-weight-loss/",
  noom: "https://www.noom.com/blog/weight-management/wegovy-pill-cost-with-and-without-insurance/",
  bridge: "https://www.stlpr.org/npr/2026-05-06/a-new-medicare-option-for-weight-loss-drugs-is-coming-heres-what-to-know",
};

const QUICK_ANSWER =
  "Injections still produce the largest average weight loss: tirzepatide (Zepbound) reached 20.9% at the top dose in SURMOUNT-1 and semaglutide (Wegovy) 14.9% in STEP 1. The two FDA-approved pills are close behind on semaglutide's side of that gap: the Wegovy pill produced 13.6% in OASIS 4, which its authors describe as similar to the weekly injection, and Foundayo 11.2% in ATTAIN-1. Pills win on routine - no needle, and Foundayo has no food or water rules - but at cash prices the brand pills ($149-$349 a month) and brand pens ($1,149 and up) both sit far above compounded injections ($41-$299). With commercial coverage either pill can be $25 a month, and on Medicare's pilot both are $50.";

const KEY_TAKEAWAYS = [
  "Four products, two categories. Injections: Wegovy (semaglutide) and Zepbound (tirzepatide), weekly pens approved in 2021 and 2023. Pills: the Wegovy pill (oral semaglutide 25 mg, approved December 2025) and Foundayo (orforglipron, approved April 1, 2026), both daily tablets.",
  "On the published trial results, injectable tirzepatide leads (up to 20.9% mean weight loss), the Wegovy pill and injectable semaglutide are close to each other (13.6% and 14.9%), and Foundayo trails (11.2%). The trials are separate, not head to head.",
  "The daily routine is the practical difference: the Wegovy pill needs an empty stomach, a sip of water and a 30-minute wait; Foundayo can be taken any time; the injections are once a week.",
  "Price depends on the route more than the format. Verified: the Wegovy pill at Ro is $149 the first month then $299 plus membership; compounded injections run $41-$299 a month. Reported: Foundayo $149-$349 self-pay, $25 with commercial coverage for either pill, $50 on Medicare's GLP-1 Bridge.",
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Are GLP-1 pills as effective as injections?",
    answer:
      "It depends which pill and which injection. The Wegovy pill produced 13.6% mean weight loss at 64 weeks in OASIS 4 (16.6% among people who stayed on treatment), which its authors describe as similar to the weekly semaglutide injection's 14.9% in STEP 1. Foundayo reached 11.2% at its top dose in ATTAIN-1. Injectable tirzepatide (Zepbound) remains the strongest average performer, at 20.9% at 15 mg in SURMOUNT-1 (22.5% in the analysis that assumes everyone stayed on treatment). None of these trials compared a pill with an injection directly.",
  },
  {
    question: "Which is cheaper, GLP-1 pills or injections?",
    answer:
      "At cash prices, compounded injections are cheapest by a wide margin: verified prices run $41-$199 a month for compounded semaglutide and $71-$299 for compounded tirzepatide. The brand pills sit in the middle: the Wegovy pill is $149 the first month then $299 plus membership at Ro (verified), and Foundayo lists $149-$349 a month self-pay (reported). Brand injections bought for cash are the most expensive, from $1,149 a month at the providers we track. With commercial insurance that covers the drug, either pill is reported at $25 a month, and both pills and both injections are in Medicare's $50 GLP-1 Bridge pilot through December 2027.",
  },
  {
    question: "Do GLP-1 pills have fewer side effects than injections?",
    answer:
      "No. They are the same drug class, and the side-effect profile is the same family: mostly gastrointestinal, mostly early, mostly during dose increases. In OASIS 4, 74% of people on the Wegovy pill reported a gastrointestinal adverse event against 42% on placebo; in ATTAIN-1 gastrointestinal events were also the most frequent with Foundayo. The labels for the injections list the same leading effects. How gradually you step up the dose matters more than whether it is a tablet or a pen.",
  },
  {
    question: "Why does the Wegovy pill contain 25 mg when the injection is 2.4 mg?",
    answer:
      "Because semaglutide is a peptide, and peptides are poorly absorbed from the gut. The tablet carries a much larger dose so that enough reaches the bloodstream, and it must be taken on an empty stomach with a small sip of water, followed by a 30-minute wait before food, drink or other medicines; miss the timing and absorption drops. Foundayo is a small molecule rather than a peptide, which is why it can be taken any time of day with no food or water restrictions.",
  },
  {
    question: "Can you switch from injections to pills, or vice versa?",
    answer:
      "Often, under medical supervision. People move between formulations for tolerance, convenience, coverage or availability. There is no do-it-yourself dose conversion between a weekly pen and a daily tablet; the prescribing clinician decides the medication, the starting dose and the titration when you switch. Both routes are long-term treatments: in the STEP 1 extension, people who stopped semaglutide regained about two-thirds of the lost weight within a year.",
  },
  {
    question: "Are the compounded 'pills' and 'drops' some telehealth programs sell the same as the Wegovy pill?",
    answer:
      "No. The Wegovy pill and Foundayo are FDA-approved finished drugs with their own trials. Compounded oral semaglutide or tirzepatide, sold as tablets, sublingual drops or troches, is prepared by a licensed 503A pharmacy for an individual prescription. That is a legal, regulated channel, but the products are not FDA-approved, have no trials of their own, and an oral compounded peptide is absorbed differently from the approved 25 mg tablet. They are cheaper for that reason.",
  },
  {
    question: "Is there a GLP-1 pill approved specifically for weight loss?",
    answer:
      "Yes, two. The FDA approved the Wegovy pill (oral semaglutide 25 mg) in December 2025, the first oral GLP-1 for chronic weight management, and Foundayo (orforglipron, Eli Lilly) on April 1, 2026, the first that can be taken with no food or water restrictions. Rybelsus, a lower-dose oral semaglutide, is approved for type 2 diabetes rather than weight management.",
  },
  {
    question: "Do I need a prescription for either one?",
    answer:
      "Yes. Every GLP-1 on this page, brand or compounded, pill or injection, is prescription-only in the United States. A licensed clinician reviews your health history and decides whether the medication is appropriate; any website offering a GLP-1 without that step is selling something you should not take.",
  },
];

type Section = { heading: string; body: string };

const PRICE_DATE = fmt(PRICE_INDEX_VERIFIED);

const SECTIONS: Section[] = [
  {
    heading: "What counts as a GLP-1 pill, and what counts as an injection",
    body: `<p>"Pills versus injections" sounds like one comparison. It is really four products in two categories, and the one you are offered online may be none of them, so the first job is to name them.</p>
<h3>The injections: Wegovy and Zepbound</h3>
<p><strong>Wegovy</strong> is semaglutide, approved by the FDA for chronic weight management on ${ext(SRC.wegovyApproval, "June 4, 2021")}. <strong>Zepbound</strong> is tirzepatide, approved on ${ext(SRC.zepboundApproval, "November 8, 2023")}. Both are once-weekly injections under the skin from a pre-filled pen, started at a low dose and stepped up over months. Semaglutide acts on the GLP-1 receptor; tirzepatide acts on two receptors, GLP-1 and GIP, which is the usual explanation for its larger trial result. The same two molecules are also sold as <strong>compounded injections</strong> by state-licensed pharmacies through telehealth providers, at a fraction of the brand price and without FDA approval of the product. That is the route most of the providers on this site use, and most of the "injection" prices quoted online refer to it.</p>
<h3>The pills: the Wegovy pill and Foundayo</h3>
<p><strong>The Wegovy pill</strong> is semaglutide in a 25 mg once-daily tablet, approved in ${ext(SRC.wegovyPillApproval, "December 2025")} as the first oral GLP-1 for chronic weight management. <strong>Foundayo</strong> is orforglipron, a small-molecule GLP-1 receptor agonist from Eli Lilly, approved on ${ext(SRC.foundayoApproval, "April 1, 2026")}. Both are brand-name, prescription-only and FDA-approved; neither is compounded. A third tablet, <strong>Rybelsus</strong>, is lower-dose oral semaglutide approved for type 2 diabetes, not for weight management, and produces less weight loss at its diabetes doses.</p>
<h3>And a category that is neither</h3>
<p>Some telehealth programs sell <strong>compounded oral semaglutide or tirzepatide</strong> as tablets, sublingual drops or troches. These are not the Wegovy pill. They are compounded preparations with no trial data of their own, and a peptide taken by mouth is poorly absorbed without the formulation work the approved tablet went through. They belong in this guide only as a warning: if a program's "pill" is compounded, you are buying an unstudied product, not a cheaper Wegovy pill. The rest of this page compares the four approved products, plus the compounded injections, because those are the things with evidence and published prices behind them.</p>`,
  },
  {
    heading: "Results: what the trials actually showed",
    body: `<p>Every serious claim about these drugs traces back to four randomized, placebo-controlled trials, each run by the manufacturer on top of lifestyle advice. They were separate trials with different lengths and populations. Nobody has run a pill against an injection head to head, so the honest comparison is "each against its own placebo", not "pill versus shot".</p>
<table><thead><tr><th>Product</th><th>Trial</th><th>Length</th><th>Mean weight change</th><th>Placebo</th></tr></thead><tbody>
<tr><td>Zepbound (tirzepatide 15 mg weekly injection)</td><td>${ext(SRC.surmount1, "SURMOUNT-1")}, NEJM, July 21, 2022</td><td>72 weeks</td><td><strong>-20.9%</strong></td><td>-3.1%</td></tr>
<tr><td>Zepbound (tirzepatide 5 mg weekly injection)</td><td>SURMOUNT-1</td><td>72 weeks</td><td>-15.0%</td><td>-3.1%</td></tr>
<tr><td>Wegovy (semaglutide 2.4 mg weekly injection)</td><td>${ext(SRC.step1, "STEP 1")}, NEJM, March 18, 2021</td><td>68 weeks</td><td><strong>-14.9%</strong></td><td>-2.4%</td></tr>
<tr><td>Wegovy pill (oral semaglutide 25 mg daily)</td><td>${ext(SRC.oasis4, "OASIS 4")}, NEJM, September 2025</td><td>64 weeks</td><td><strong>-13.6%</strong></td><td>-2.2%</td></tr>
<tr><td>Foundayo (orforglipron 36 mg daily)</td><td>${ext(SRC.attain1, "ATTAIN-1")}, NEJM, September 2025</td><td>72 weeks</td><td><strong>-11.2%</strong></td><td>-2.1%</td></tr>
</tbody></table>
<p>Two sets of numbers circulate for each of these trials, and both are real. The figures above count everyone who was randomized, whether or not they stayed on the drug (the treatment-policy or treatment-regimen analysis). Each manufacturer also publishes an on-treatment figure describing people who took the drug as directed to the end: 22.5% for tirzepatide at 15 mg, 16.6% for the Wegovy pill and 12.4% for Foundayo. Marketing tends to quote the second set; this guide uses the first, because it is closer to what a population of real patients experiences. They are not contradictory, just answers to different questions.</p>
<h3>How to read the gap</h3>
<p>Three conclusions survive the caveats. First, <strong>tirzepatide injection is still the strongest average performer</strong> of any GLP-1, pill or pen, by about six percentage points over semaglutide at the top dose, and in SURMOUNT-1 a substantially larger share of participants lost 20% or more. Second, <strong>the Wegovy pill and the Wegovy injection are close</strong>: 13.6% against 14.9% in their own trials, and the OASIS 4 authors describe the pill's effect as similar to the weekly injection. Third, <strong>Foundayo trails on the published number</strong> but still produced more weight loss than any non-GLP-1 pill ever approved; in ATTAIN-1, 19% of participants on the top dose lost 20% or more of their body weight, against 3% on placebo.</p>
<p>What the numbers do not say is also worth stating. They are averages measured at the full maintenance dose after a long titration, so they describe month fifteen, not month two. In STEP 1, about a third of participants lost 20% or more and some lost very little, and nothing on an intake form predicts which group you will be in. And every trial included lifestyle counselling that most telehealth programs do not provide. Treat the trial figures as a ceiling that a well-run, fully-dosed course can approach, not a promise for either format.</p>`,
  },
  {
    heading: "Why a pill needs a bigger dose than a pen",
    body: `<p>The Wegovy injection delivers 2.4 mg of semaglutide once a week. The Wegovy pill contains 25 mg, taken every day, for a drug that produces a similar result. The difference is absorption. Semaglutide is a peptide, and peptides are broken down in the gut; only a small fraction of a swallowed dose reaches the bloodstream, so the tablet carries far more and has to be taken under conditions that protect what little is absorbed. That is the reason for the empty-stomach rule described in the next section, and it is why compounded "oral semaglutide" without that formulation work is a different and unstudied thing.</p>
<p>Foundayo takes the other path. Orforglipron is not a peptide but a small molecule designed to be absorbed through the gut the way most ordinary tablets are, which is why it can be taken at any time of day with or without food. Its trade-off, on the published numbers, is a smaller average weight loss than semaglutide in either form. The injections sidestep absorption entirely: the drug goes under the skin and into circulation, which is why a weekly dose measured in milligrams works.</p>`,
  },
  {
    heading: "The routine: empty stomach, any time, or once a week",
    body: `<p>For most people this is the difference they will feel every day, and it is where the "pills are more convenient" assumption needs unpacking.</p>
<table><thead><tr><th>Product</th><th>How often</th><th>The rules</th></tr></thead><tbody>
<tr><td>Wegovy pill</td><td>Once a day</td><td>On an empty stomach, with a small sip of water, then a 30-minute wait before food, drink or other medicines. Dose stepped up from 1.5 mg to 25 mg over the first months.</td></tr>
<tr><td>Foundayo</td><td>Once a day</td><td>Any time of day, with or without food or water. Stepped up across 6, 12 and 36 mg tablets.</td></tr>
<tr><td>Wegovy or Zepbound pen</td><td>Once a week</td><td>A self-injection under the skin from a pre-filled, factory-sealed pen. No daily routine; dose stepped up every few weeks.</td></tr>
<tr><td>Compounded injection</td><td>Once a week</td><td>Drawn from a multi-dose vial into a syringe. You measure the dose in units yourself, which is where the FDA has recorded dosing errors.</td></tr>
</tbody></table>
<p><strong>The Wegovy pill is the most demanding routine on the table.</strong> A 30-minute wait every morning before coffee, breakfast or other medication is manageable for many people and a deal-breaker for some; miss the timing and absorption drops, so the rule is not optional. <strong>Foundayo is the simplest.</strong> No timing, no food rule, no needle: for someone who takes morning medication or does not want a timed routine, that is its main argument. <strong>The weekly pen is a different kind of simple.</strong> Fifty-two small, sealed, pre-measured doses a year and nothing to think about in between; the needle is fine and short, and most people who were anxious about it report that the first injection settles the question. <strong>The compounded vial is the least convenient and the most error-prone</strong>, because the patient measures the dose. The FDA's ${ext(SRC.fdaConcerns, "statement on unapproved GLP-1 drugs")} records adverse-event reports that trace to dosing mistakes with vials, and our guide to <a href="/weight-loss/articles/503a-vs-503b-pharmacy-28-day-rule">reading a compounded prescription</a> explains the units.</p>`,
  },
  {
    heading: "Cost: every verified price, by route",
    body: `<p>Format decides far less than route. Two facts organise the whole table: the brand products, pill or pen, cost brand prices for cash, and the compounded injections cost a fraction of that because the product is not FDA-approved. Everything below is either a provider's own published price as we verified it (the compounded and Ro figures, checked on each provider's site on ${PRICE_DATE} for the price index and in August 2026 for Ro's brand products) or a manufacturer price as reported by the dated source linked, which we have not verified ourselves.</p>
<table><thead><tr><th>Route</th><th>Monthly price</th><th>The condition</th></tr></thead><tbody>
<tr><td>Compounded semaglutide injection (verified)</td><td><strong>$41-$199</strong></td><td>$41 at <a href="/weight-loss/reviews/wellmedr">welludr</a> on a 12-month plan; $49 month to month at <a href="/weight-loss/reviews/embody">embody</a>; $89 flat at every dose at <a href="/weight-loss/reviews/altrx">altRx</a>; $99 promotional, all-inclusive, at <a href="/weight-loss/reviews/medvi">Medvi</a></td></tr>
<tr><td>Compounded tirzepatide injection (verified)</td><td><strong>$71-$299</strong></td><td>$71 at welludr on a 12-month plan; $99 month to month at embody; $149 flat at altRx; $166 promotional at Medvi</td></tr>
<tr><td>Wegovy pill at <a href="/weight-loss/reviews/ro">Ro</a> (verified)</td><td><strong>$149</strong> first month, then <strong>$299</strong></td><td>Plus Ro's membership: $39 the first month, then $74-$149 a month. The pill is billed separately, so insurance can apply where your plan covers Wegovy</td></tr>
<tr><td>Wegovy pill, NovoCare direct self-pay (reported)</td><td><strong>$149-$299</strong> by dose</td><td>Per ${ext(SRC.noom, "third-party trackers")}: $149 at the starting dose rising to $299 at the 25 mg maintenance dose. Not verified by us</td></tr>
<tr><td>Foundayo, LillyDirect self-pay (reported)</td><td><strong>$149-$349</strong> by dose</td><td>As reported by ${ext(SRC.sciam, "Scientific American")} from Lilly material. No telehealth provider we track has published a Foundayo price we could verify</td></tr>
<tr><td>Either pill with commercial insurance that covers it (reported)</td><td><strong>$25</strong></td><td>Lilly's savings card per its ${ext(SRC.lillyRelease, "April 9, 2026 release")}; Novo Nordisk's offer reported at as low as $25, capped at $100 of savings per 30-day supply. Not available on government plans</td></tr>
<tr><td>Medicare GLP-1 Bridge: both pills, both pens</td><td><strong>$50</strong> flat copay</td><td>CMS pilot, ${ext(SRC.bridge, "July 1, 2026 through December 31, 2027")}; eligibility and approval through your Part D plan. The $50 does not rise with the dose</td></tr>
<tr><td>Brand Zepbound pen, cash (verified)</td><td><strong>$1,249-$1,599</strong></td><td>$1,249 at altRx, $1,599 at welludr; Ro sells Zepbound KwikPens from $299 the first month, then $399-$449, plus membership</td></tr>
<tr><td>Brand Wegovy pen at Ro (verified)</td><td>from <strong>$199</strong> introductory, then <strong>$299-$399</strong></td><td>Plus the same membership; billed separately so insurance can apply</td></tr>
</tbody></table>
<h3>The year-one arithmetic</h3>
<p>Month-one prices mislead in both directions. Put together at Ro's cash prices, a first year on the Wegovy pill comes to roughly $4,300-$5,100: $3,438 of medication plus $853-$1,678 of membership depending on the tier. A year of compounded semaglutide runs from $492 on welludr's 12-month plan to roughly $1,800-$2,400 at month-to-month providers, and compounded tirzepatide about $500-$1,200 more. A year of brand Zepbound for cash is five figures. The only routes that undercut compounded are the $25 commercial savings cards and Medicare's $50 pilot, which is why coverage is the first question, not the format. Our <a href="/weight-loss/articles/glp1-true-cost-month-1-vs-year-one">month 1 vs year one</a> guide does this arithmetic for every provider we track, and <a href="/weight-loss/articles/wegovy-pill-price-online">Wegovy pill price online</a> walks the semaglutide pill's routes in full.</p>`,
  },
  {
    heading: "Side effects: same class, same profile",
    body: `<p>A pill is not a gentler GLP-1. All four products act on the same receptor family and share the same side-effect profile: mostly gastrointestinal, mostly in the first weeks, mostly around dose increases. In OASIS 4, gastrointestinal adverse events occurred in 74% of people on the Wegovy pill against 42% on placebo, led by nausea and diarrhoea. In ATTAIN-1, gastrointestinal events were also the most frequent with Foundayo and were typically mild to moderate. The injection labels, summarised on MedlinePlus for ${ext(SRC.medlineSema, "semaglutide")} and ${ext(SRC.medlineTirz, "tirzepatide")}, list the same leading effects: nausea, diarrhoea, vomiting, constipation, abdominal pain and reduced appetite.</p>
<p>The serious warnings are shared too. Every product here carries the class boxed warning about thyroid C-cell tumours observed in rodents and is contraindicated for people with a personal or family history of medullary thyroid carcinoma or Multiple Endocrine Neoplasia syndrome type 2; the labels also warn about pancreatitis and gallbladder disease. Tirzepatide's label adds that it can reduce the effectiveness of oral contraceptives for four weeks after starting and after each dose increase. Neither pill trial reported a safety signal outside the known class profile.</p>
<p>What actually changes tolerability is the titration: how low you start and how slowly you step up. A clinician who manages that, and who slows the schedule when side effects persist, matters more than whether the drug is a tablet or a pen. Our <a href="/weight-loss/articles/semaglutide-side-effects-guide">semaglutide side-effects guide</a> covers what helps in the first weeks on either format.</p>`,
  },
  {
    heading: "Insurance and Medicare: where the pills pull ahead",
    body: `<p>This is the one area where the format genuinely changes the answer, because the brand pills launched inside programmes the compounded injections can never join.</p>
<p><strong>Commercial insurance.</strong> If your plan covers the drug for weight management, each manufacturer offers a savings card: Lilly's brings Foundayo to $25 a month, and Novo Nordisk's is reported to bring the Wegovy pill to as low as $25, capped at $100 of savings per 30-day supply. Neither card works on Medicare, Medicaid or other government plans. Coverage itself is the gate; many plans still exclude weight-management GLP-1s or require prior authorisation, and <a href="/weight-loss/articles/glp1-with-insurance">our insurance guide</a> explains how to check your formulary before choosing. Where a plan covers the brand injection instead, the same logic applies to Wegovy and Zepbound pens, and a telehealth prescriber such as Ro can run the prior authorisation and bill the medication as its own line item.</p>
<p><strong>Medicare.</strong> Since July 1, 2026, the Medicare GLP-1 Bridge pilot charges eligible beneficiaries a flat $50 copay a month for the Wegovy pill and injection, the Zepbound KwikPen and Foundayo, through December 31, 2027. The $50 does not rise with the dose, and it applies to both formats equally, so a Medicare patient chooses on routine and results, not price. Medicare never covers compounded GLP-1s. <a href="/weight-loss/articles/glp1-after-65-medicare">GLP-1s after 65</a> covers what to ask your Part D plan.</p>
<p><strong>Paying cash.</strong> Then the compounded injections are the cheapest route by thousands of dollars a year, the brand pills are the cheapest FDA-approved route, and the brand pens are the most expensive option on the page.</p>`,
  },
  {
    heading: "Compounded versions: legal under conditions, not FDA-approved",
    body: `<p>Because most of the "injection" prices in this guide are compounded prices, it is worth being precise about what that means. Compounding is a licensed pharmacist preparing a medication for an individual patient under a prescription, allowed under two federal frameworks described on the FDA's ${ext(SRC.fdaCompounding, "human drug compounding")} page: section 503A, state-licensed pharmacies compounding for a specific patient, which is the route almost every telehealth GLP-1 program uses; and section 503B, registered outsourcing facilities producing larger batches under tighter oversight.</p>
<p>Compounded GLP-1s grew when semaglutide and tirzepatide were on the FDA's shortage list, which allows compounding with fewer restrictions. That window closed: the FDA declared the tirzepatide shortage resolved on December 19, 2024 and the semaglutide shortage on February 21, 2025. What remains legal is a patient-specific prescription where the prescriber documents a clinical need the approved product does not meet. The FDA's own ${ext(SRC.fdaConcerns, "summary of its concerns")} is the thing to read before buying: compounded products are not reviewed for safety, effectiveness or quality before sale; the agency has received adverse-event reports including dosing errors from vials; some products have been found to contain salt forms of semaglutide that are not the approved active ingredient; and products sold without a prescription may be counterfeit.</p>
<p>None of that makes compounded injections a scam. It means the quality lives in the pharmacy rather than in a brand, and that you are trusting the telehealth provider's choice of pharmacy. The providers on this site name theirs, and that is the first thing we check. Note that there is no compounded equivalent of Foundayo at all, and no compounded oral product that has the Wegovy pill's evidence behind it: if you want a pill, the two approved pills are the pills. Our <a href="/weight-loss/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name</a> guide and the <a href="/weight-loss/articles/503a-vs-503b-pharmacy-28-day-rule">503A vs 503B explainer</a> go deeper.</p>`,
  },
  {
    heading: "Switching, stopping and the long term",
    body: `<p>People move between formats more often than the marketing suggests: a pill to an injection after plateauing, an injection to a pill when insurance changes, a brand pen to a compounded vial when a savings card expires. All of it goes through the prescriber. There is no do-it-yourself conversion between a weekly 2.4 mg pen and a daily 25 mg tablet, or between semaglutide and orforglipron, and a clinician will usually restart a titration rather than jump to the equivalent dose.</p>
<p>Whichever format you choose, it is a maintenance medication in the way blood-pressure medication is. In the STEP 1 extension, participants who stopped semaglutide and the lifestyle program regained about two-thirds of the weight they had lost within a year (Wilding et al., ${ext(SRC.step1ext, "Diabetes, Obesity and Metabolism")}, April 19, 2022). That is the number to budget around, and it is the strongest argument for choosing the route whose year-two price you can sustain rather than the one with the cheapest first month. Our guide to <a href="/weight-loss/articles/stopping-glp1-medication-what-happens">what happens when you stop</a> covers the tapering and maintenance strategies clinicians use.</p>`,
  },
  {
    heading: "Which should you choose? Five readers, five answers",
    body: `<p>There is no universal right answer, but most people fit one of these.</p>
<p><strong>Your insurance covers a GLP-1 for weight management.</strong> Take the covered product. At $25 a month either pill, or a covered pen, beats every cash route on this page, and the gap between the pills is a rounding error at that price. Check the formulary first; it decides more than anything else here.</p>
<p><strong>You are on Medicare.</strong> Ask your Part D plan about the GLP-1 Bridge before pricing anything. At a flat $50 for all four brand products, choose on routine and results: the injection for the larger trial result, Foundayo for the simplest routine.</p>
<p><strong>You are paying cash and the result is what matters most.</strong> The published evidence points to tirzepatide, and the compounded injection is the only affordable way to it: $89 a month on a 12-month plan, $99 with no commitment on embody's pre-Black Friday sale. Read <a href="/weight-loss/articles/best-tirzepatide-online">best tirzepatide online</a> for every verified price, and go in understanding that it is not an FDA-approved product.</p>
<p><strong>You are paying cash and you will not inject.</strong> The Wegovy pill through Ro is the one verified telehealth route to an approved pill today, at $149 then $299 plus membership; Foundayo's reference price is LillyDirect's reported $149-$349. Between the two, the Wegovy pill has the larger trial result and Foundayo has no timing rules; <a href="/weight-loss/articles/foundayo-vs-wegovy-pill">Foundayo vs the Wegovy pill</a> compares them line by line. Do not accept a compounded "pill" as a substitute.</p>
<p><strong>You are paying cash and price decides.</strong> Compounded semaglutide injection from $41-$99 a month is the floor of the whole market, and the needle is a weekly thirty seconds that most people stop noticing by the second month. <a href="/weight-loss/articles/what-100-to-200-a-month-gets-you-glp1">What $100-$200 a month gets you</a> lays out what each price band buys.</p>
<p>Whatever you pick, a licensed clinician decides on your history, not on a table, and can decline to prescribe any of them.</p>`,
  },
  {
    heading: "How to get either one online",
    body: `<p>The process is the same for a pill or an injection, and it is the only legal process: an online intake covering your weight, health history, medications and goals; a review by a licensed clinician, by questionnaire, message or video; a prescription if appropriate, filled either by the provider's partner pharmacy and shipped to you, or sent to a pharmacy of your choice where insurance applies; and follow-up as the dose steps up. For the brand pill, <a href="/weight-loss/reviews/ro">Ro</a> is the provider we have verified. For compounded injections, the providers ranked on our <a href="/weight-loss">weight-loss comparison</a> all run that review before prescribing, and the <a href="/weight-loss/articles/glp1-weight-loss-online-complete-guide">complete guide to GLP-1 weight loss online</a> walks every step from intake to first dose, including what to check about the pharmacy, the refund terms if you are not approved, and the questions to ask before prepaying.</p>
<p><em>This guide is general information, not medical advice. GLP-1 medications require evaluation and supervision by a licensed healthcare provider, who decides whether any of them is appropriate for you.</em></p>`,
  },
];

export default async function Glp1PillsVsInjectionsPage() {
  const config = await getConfig("weight-loss");
  const wordCount = SECTIONS.reduce((n, s) => n + s.body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length, 0);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "GLP-1 Pills vs Injections (2026): Results, Cost & Routine",
    description: metadata.description,
    datePublished: PAGE_PUBLISHED,
    dateModified: PAGE_UPDATED,
    wordCount,
    ...pageReviewSchema("/weight-loss/glp1-pills-vs-injections"),
    author: { "@type": "Organization", name: "Treatments Hub Research Team", url: "https://www.treatmentshub.com" },
    publisher: { "@type": "Organization", name: "Treatments Hub", url: "https://www.treatmentshub.com" },
    mainEntityOfPage: CANONICAL,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.treatmentshub.com/weight-loss" },
      { "@type": "ListItem", position: 2, name: "Articles", item: "https://www.treatmentshub.com/weight-loss/articles" },
      { "@type": "ListItem", position: 3, name: "GLP-1 Pills vs Injections", item: CANONICAL },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero band - the article masthead: light-blue band, the vertical's
            hero image on the right on desktop, category + read time, H1, dek,
            date and the medical review line. Same layout and widths as
            src/components/pages/article-page.tsx. */}
        <div className="relative w-full overflow-hidden" style={{ backgroundColor: HERO_COLOR }}>
          {config.hero?.backgroundImageUrl && (
            <div className="absolute right-[380px] top-1/2 hidden h-[270px] w-[50%] -translate-y-1/2 sm:block lg:h-[300px]">
              <Image
                src={config.hero.backgroundImageUrl}
                alt={config.hero.imageAlt || ""}
                fill
                preload
                fetchPriority="high"
                sizes="(min-width: 640px) 50vw, 1px"
                className="object-contain object-right"
              />
            </div>
          )}
          <div className="relative z-10 mx-auto max-w-[1100px] px-4 pt-4 pb-5 sm:px-6 sm:py-10">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/weight-loss" },
                { label: "Articles", href: "/weight-loss/articles" },
                { label: "GLP-1 Pills vs Injections" },
              ]}
            />
            <div className="mb-2 flex items-center gap-3">
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">Guide</span>
              <span className="flex items-center gap-1 text-[12px] text-gray-400">
                <Clock className="h-3 w-3" strokeWidth={1.5} />
                {READ_TIME}
              </span>
            </div>
            <h1 className="text-[22px] font-bold leading-[1.2] tracking-[-0.01em] text-[#191919] sm:max-w-[640px] sm:text-[32px] sm:leading-tight sm:tracking-normal">
              GLP-1 Pills vs Injections (2026): Results, Cost and Routine
            </h1>
            <p className="mt-2 max-w-[640px] text-[14px] leading-[1.45] text-gray-600 sm:text-[16px] sm:leading-[1.55]">
              The two FDA-approved GLP-1 pills against the weekly injections: what the trials showed,
              what each route costs at verified prices, the side effects they share, and the daily
              routine that decides it for most people.
            </p>
            <p className="mt-2 text-[12px] text-gray-400">Updated {fmt(PAGE_UPDATED)}</p>
            <MedicalReviewBar path="/weight-loss/glp1-pills-vs-injections" className="mt-3 max-w-[760px]" />
          </div>
        </div>

        {/* Body - the article container */}
        <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6">
          {/* Quick answer (featured-snippet target), in the article's neutral
              box rather than a "winner" verdict: this is a guide, not a battle. */}
          <div className="article-body mb-8 text-[16px] leading-[1.75] text-gray-800">
            <div className="qa">
              <strong>The quick answer</strong>
              {QUICK_ANSWER}
              <span className="mt-2 block text-[13px] text-gray-500">
                Trial figures are the published treatment-policy results linked below. Compounded and Ro
                prices verified on each provider&rsquo;s site ({PRICE_DATE}{" "}for the price index, August 2026
                for Ro&rsquo;s brand products); manufacturer prices are as reported by dated sources and not
                verified by us.
              </span>
            </div>
          </div>

          <div className="mb-8 rounded-xl border border-[#0C4B75]/15 bg-[#F4F8FB] p-5 sm:p-6">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-[#0C4B75]">Key takeaways</p>
            <ul className="space-y-2">
              {KEY_TAKEAWAYS.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-gray-800">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Table of contents" className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
            <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-gray-400">In this article</p>
            <ol className="space-y-1.5">
              {SECTIONS.map((s, i) => (
                <li key={s.heading} className="flex gap-2 text-[14px] leading-snug">
                  <span className="shrink-0 font-semibold text-gray-400">{i + 1}.</span>
                  <a href={`#${slugify(s.heading)}`} className="text-[#0C4B75] hover:underline">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="space-y-8">
            {SECTIONS.map((section, i) => (
              <div key={section.heading}>
                <section id={slugify(section.heading)}>
                  <h2 className="mb-3 text-[20px] font-bold text-[#191919] scroll-mt-24">{section.heading}</h2>
                  <div
                    className="article-body text-[16px] leading-[1.75] text-gray-800 [&_a]:text-[#0C4B75] [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#093d61]"
                    dangerouslySetInnerHTML={{ __html: enhanceArticleHtml(section.body) }}
                  />
                </section>
                {/* The ranked provider picks follow the cost section, where the
                    reader has just seen the prices those cards carry. */}
                {i === 4 && (
                  <div className="mt-8">
                    <TopTwoPicks config={config} linkPrefix="/weight-loss" />
                  </div>
                )}
              </div>
            ))}
          </article>

          {/* FAQ */}
          <section className="mt-12 mb-12">
            <h2 className="mb-6 text-[24px] font-bold text-[#191919]">GLP-1 pills vs injections: FAQ</h2>
            <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-200 bg-white">
              {FAQS.map((f) => (
                <div key={f.question} className="p-6">
                  <h3 className="mb-2 text-[16px] font-bold text-[#191919]">{f.question}</h3>
                  <p className="text-[14px] leading-[1.7] text-gray-600">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-[24px] font-bold text-[#191919]">Compare providers</h2>
            <p className="mb-6 text-[16px] leading-[1.75] text-gray-800">
              Whether you lean toward a pill or an injection, the licensed telehealth providers we track are
              compared on verified pricing, medical support and value.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/weight-loss"
                className="inline-flex h-[46px] items-center justify-center rounded-lg bg-[#0C4B75] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
              >
                Compare top providers
              </Link>
              <Link
                href="/weight-loss/weight-loss-pills"
                className="inline-flex h-[46px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#191919] transition-colors hover:bg-gray-50"
              >
                Weight loss pills guide
              </Link>
            </div>
          </section>

          <GuideCluster currentSlug="glp1-pills-vs-injections" />

          <MedicalSources vertical="weight-loss" />

          {/* Sources + disclaimer */}
          <section className="mt-10">
            <p className="mb-3 text-[13px] leading-relaxed text-gray-400">
              Sources: trial results as published in the New England Journal of Medicine - STEP 1 (March 18,
              2021), SURMOUNT-1 (July 21, 2022), and OASIS 4 and ATTAIN-1 (September 2025, summarised by the
              American College of Cardiology on September 24, 2025) - and the STEP 1 extension in Diabetes,
              Obesity and Metabolism (April 19, 2022), each linked where cited. FDA approvals: Wegovy (June 4,
              2021), Zepbound (November 8, 2023), the Wegovy pill (December 2025) and Foundayo (April 1,
              2026). Prices: the providers&rsquo; own published figures, verified {PRICE_DATE} for the price
              index and August 2026 for Ro&rsquo;s brand products; Foundayo and NovoCare prices and savings
              cards as reported by Scientific American, Lilly&rsquo;s April 9, 2026 release and third-party
              trackers, not verified by us. Weight-loss figures are trial averages; individual results vary.
              Brand names are trademarks of their manufacturers.
            </p>
            <p className="text-[13px] leading-relaxed text-gray-400">
              treatmentshub.com is not a medical provider and does not prescribe medications. This page is
              for educational and comparison purposes only and is not medical advice. GLP-1 medications
              require evaluation and supervision by a licensed healthcare provider.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
