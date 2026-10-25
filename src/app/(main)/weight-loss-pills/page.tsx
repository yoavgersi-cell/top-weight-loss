import { MedicalReviewBar } from "@/components/medical-review-bar";
import { DEFAULT_OG_IMAGE } from "@/lib/og";
import { pageReviewSchema } from "@/data/reviewers";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, Clock, ArrowRight, TriangleAlert } from "lucide-react";
import { GuideCluster } from "@/components/guide-cluster";
import { TopTwoPicks } from "@/components/top-providers-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProviderCta } from "@/components/provider-cta";
import { MedicalSources } from "@/components/medical-sources";
import { enhanceArticleHtml } from "@/components/prose";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX_VERIFIED } from "@/lib/price-index";

// ─────────────────────────────────────────────────────────────────────────────
// Weight loss pills - the long-form guide to every oral option.
//
// Oct 22, 2026 rebuild (operator request): the page now uses the article
// masthead and 1100px layout (light-blue band, the vertical's hero image on
// desktop, category + read time, quick answer, key takeaways, contents) and
// the body grows from a summary into a full guide. Facts: the GLP-1 pill
// figures are the published NEJM treatment-policy results and FDA approval
// dates, linked inline; the older prescription pills are described from their
// labels as summarised on MedlinePlus and the NIDDK's prescription-medication
// page, linked inline, with their typical results kept as the hedged ranges
// this page already carried; provider prices are the verified price index or
// Ro's published figures; manufacturer prices are reported from dated sources
// and labelled as not verified. Nothing is estimated.
// ─────────────────────────────────────────────────────────────────────────────

// Providers confirmed to offer compounded oral options (site owner confirmed).
// Featured accurately using verified provider data - no invented pill claims.
const PILL_PROVIDER_IDS = ["embody", "trimrx", "medvi", "shed"];

export const revalidate = 60;

const CANONICAL = "https://www.treatmentshub.com/weight-loss/weight-loss-pills";
const PAGE_PUBLISHED = "2026-08-01";
const PAGE_UPDATED = "2026-10-22";
const HERO_COLOR = "#EEF4F1";
const READ_TIME = "17 min read";

export const metadata: Metadata = {
  title: "Weight Loss Pills 2026: Wegovy Pill, Foundayo & More",
  description:
    "Prescription weight loss pills in 2026: FDA-approved GLP-1 pills (Wegovy pill, Foundayo, Rybelsus), Qsymia, Contrave, phentermine and compounded options.",
  alternates: { canonical: CANONICAL },
  openGraph: { images: [DEFAULT_OG_IMAGE],
    title: "Weight Loss Pills 2026: Wegovy Pill, Foundayo & More",
    description:
      "Every prescription weight loss pill, compared: the FDA-approved GLP-1 pills, the older approved pills, compounded oral options, results, prices and safety.",
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
  oasis4: "https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/40/oasis-4",
  attain1: "https://www.acc.org/latest-in-cardiology/journal-scans/2025/09/24/16/48/attain-1",
  step1: "https://doi.org/10.1056/NEJMoa2032183",
  surmount1: "https://doi.org/10.1056/NEJMoa2206038",
  wegovyPillApproval: "https://www.healio.com/news/endocrinology/20260213/fda-approves-wegovy-pill-the-first-oral-glp1-to-treat-obesity",
  foundayoApproval: "https://www.fda.gov/news-events/press-announcements/fda-approves-first-new-molecular-entity-under-national-priority-voucher-program",
  niddk: "https://www.niddk.nih.gov/health-information/weight-management/prescription-medications-treat-overweight-obesity",
  qsymia: "https://medlineplus.gov/druginfo/meds/a612037.html",
  contrave: "https://medlineplus.gov/druginfo/meds/a619020.html",
  fdaConcerns: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss",
  fdaCompounding: "https://www.fda.gov/drugs/human-drug-compounding",
  fdaAlfia: "https://www.fda.gov/drugs/medication-health-fraud/public-notification-alfia-weight-loss-capsules-contain-hidden-drug-ingredient",
  lillyRelease: "https://www.biospace.com/press-releases/foundayo-orforglipron-lillys-new-oral-glp-1-pill-for-weight-loss-now-available-in-the-u-s",
  sciam: "https://www.scientificamerican.com/article/how-eli-lillys-new-glp-1-pill-stacks-up-against-wegovy-and-other-weight-loss/",
  noom: "https://www.noom.com/blog/weight-management/wegovy-pill-cost-with-and-without-insurance/",
  bridge: "https://www.stlpr.org/npr/2026-05-06/a-new-medicare-option-for-weight-loss-drugs-is-coming-heres-what-to-know",
};

const PRICE_DATE = fmt(PRICE_INDEX_VERIFIED);

const QUICK_ANSWER =
  "The strongest weight loss pills are the two FDA-approved GLP-1 tablets: the Wegovy pill (oral semaglutide 25 mg, approved December 2025), which produced 13.6% mean weight loss in its trial, and Foundayo (orforglipron, approved April 1, 2026), which produced 11.2%. Below them sit the older prescription pills - Qsymia, Contrave, phentermine and orlistat - at roughly 3-10%, and below those the over-the-counter products with little evidence behind them. The GLP-1 pills cost $149-$349 a month self-pay as reported, $149 then $299 plus membership at Ro (verified), $25 with commercial coverage and $50 on Medicare's pilot. Compounded oral semaglutide sold by some telehealth programs is a different, non-FDA-approved product.";

const KEY_TAKEAWAYS = [
  "Two GLP-1 pills are FDA-approved for chronic weight management: the Wegovy pill (13.6% mean weight loss at 64 weeks in OASIS 4) and Foundayo (11.2% at 72 weeks in ATTAIN-1). Rybelsus is oral semaglutide at diabetes doses and is not approved for weight loss.",
  "The older FDA-approved pills still have a place: Qsymia (phentermine/topiramate) and Contrave (naltrexone/bupropion) for long-term use, phentermine for short-term use, and orlistat, which blocks part of dietary fat. Each has specific people who must not take it.",
  "Price is about the route. Verified: the Wegovy pill at Ro is $149 the first month then $299 plus membership. Reported: Foundayo $149-$349 self-pay, $25 with commercial coverage for either pill, $50 on Medicare's GLP-1 Bridge through December 2027.",
  "Compounded oral semaglutide or tirzepatide is not the Wegovy pill: it is a legal pharmacy-prepared product with no trials of its own and no FDA approval. Over-the-counter diet pills have been found by the FDA to contain hidden, banned drugs.",
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Do weight loss pills actually work?",
    answer:
      "Prescription weight loss pills can work, and the gap to injections has narrowed. The two FDA-approved GLP-1 pills produced 13.6% (Wegovy pill, OASIS 4) and 11.2% (Foundayo, ATTAIN-1) mean weight loss in their trials; the older FDA-approved pills such as Qsymia and Contrave produce roughly 5-10%. Over-the-counter 'fat burner' or 'natural' pills are largely unproven and are not a substitute for prescription treatment.",
  },
  {
    question: "Is there a weight loss pill as effective as Ozempic or Wegovy?",
    answer:
      "Yes, for semaglutide. The Wegovy pill (oral semaglutide 25 mg), FDA-approved in December 2025, produced 13.6% mean weight loss at 64 weeks in OASIS 4, an effect the trial authors describe as similar to the weekly Wegovy injection in its own trial. Foundayo (orforglipron), approved April 1, 2026, reached 11.2% at its top dose. Injectable tirzepatide (Zepbound) still leads on average results, at 20.9% at the top dose in SURMOUNT-1.",
  },
  {
    question: "What is the strongest prescription weight loss pill?",
    answer:
      "On published trial results, the Wegovy pill (oral semaglutide 25 mg) at 13.6% mean weight loss, followed by Foundayo at 11.2%; separate trials, not head to head. Among the non-GLP-1 pills, Qsymia (phentermine/topiramate) tends to produce the most weight loss, roughly 8-10% on average.",
  },
  {
    question: "How much do the FDA-approved GLP-1 pills cost?",
    answer:
      "At the one telehealth route we have verified, Ro sells the Wegovy pill at $149 for the first month, then $299 a month, plus a $39-then-$74-149 membership. Novo Nordisk's direct-pay tiers are reported at $149-$299 by dose, and Foundayo lists $149-$349 a month self-pay through LillyDirect. Both manufacturers offer a $25-a-month savings card with commercial coverage, and both pills are in Medicare's $50 GLP-1 Bridge pilot through December 2027.",
  },
  {
    question: "Can you get weight loss pills online?",
    answer:
      "Yes. Licensed telehealth providers can evaluate you online and, when appropriate, prescribe oral weight loss medication. Ro sells the FDA-approved Wegovy pill; several providers we review offer compounded oral semaglutide or tirzepatide, which are not FDA-approved products. A clinician determines whether an oral or injectable option fits your health profile.",
  },
  {
    question: "Are compounded weight loss pills the same as the Wegovy pill or Foundayo?",
    answer:
      "No. The Wegovy pill and Foundayo are FDA-approved finished drugs with their own trials. Compounded oral semaglutide or tirzepatide is prepared by a licensed 503A pharmacy for an individual prescription; it is a legal, regulated channel, but the products are not FDA-approved, have no trials of their own, and absorb differently from the approved tablets. They are cheaper for that reason.",
  },
  {
    question: "Who should not take weight loss pills?",
    answer:
      "It depends on the pill. The GLP-1 pills are contraindicated for people with a personal or family history of medullary thyroid carcinoma or MEN 2. Qsymia must not be used in pregnancy, glaucoma or hyperthyroidism. Contrave carries a boxed warning for suicidal thoughts and must not be combined with opioids, seizure disorders, uncontrolled high blood pressure or MAO inhibitors. Phentermine is a controlled stimulant with cardiovascular cautions. None of them is appropriate in pregnancy, and a licensed clinician screens for all of this before prescribing.",
  },
  {
    question: "Are weight loss pills or injections better?",
    answer:
      "It depends on your priorities. Injections still produce the greatest average weight loss (tirzepatide 20.9% at the top dose), but the Wegovy pill now matches semaglutide injections in its own trial, and Foundayo removes the needle and the timing rules entirely. If maximum results matter most, injections lead today; if avoiding needles matters more, a GLP-1 pill is a strong fit. A clinician makes the call on your history.",
  },
  {
    question: "Are over-the-counter diet pills safe?",
    answer:
      "Treat them with suspicion. Most have little evidence behind their claims, and the FDA has repeatedly found weight-loss supplements sold online that secretly contain sibutramine, a prescription drug withdrawn from the US market in 2010 for cardiovascular risk. Orlistat 60 mg (Alli) is the one over-the-counter weight-loss medicine with an FDA approval behind it.",
  },
];

type Section = { heading: string; body: string };

const SECTIONS: Section[] = [
  {
    heading: "Do weight loss pills work? The short version",
    body: `<p>Some do, and the answer changed in the last year. For two decades "weight loss pill" meant either a modest prescription option or an over-the-counter product with a bold label and thin evidence. Two things are different now. First, two GLP-1 medications - the same class as Ozempic, Wegovy and Zepbound - are FDA-approved as daily tablets for chronic weight management: the <strong>Wegovy pill</strong> (oral semaglutide 25 mg), approved in ${ext(SRC.wegovyPillApproval, "December 2025")}, and <strong>Foundayo</strong> (orforglipron, Eli Lilly), approved on ${ext(SRC.foundayoApproval, "April 1, 2026")}. In their trials they produced 13.6% and 11.2% mean weight loss, and the Wegovy pill's result is described by its own trial authors as similar to the weekly semaglutide injection. Second, the older prescription pills have not gone away; they still suit people who cannot take a GLP-1, cannot afford one, or do not need that much.</p>
<p>The evidence sorts the options into four tiers, and this guide walks them in that order:</p>
<ul>
<li><strong>The FDA-approved GLP-1 pills</strong> - the Wegovy pill and Foundayo, plus Rybelsus, which is semaglutide at diabetes doses and is not approved for weight loss.</li>
<li><strong>The older FDA-approved prescription pills</strong> - Qsymia, Contrave, phentermine and orlistat - at roughly 3-10% average weight loss, each with people who must not take it.</li>
<li><strong>Compounded oral semaglutide and tirzepatide</strong> - sold by some telehealth programs, legal under conditions, not FDA-approved and without trials of their own.</li>
<li><strong>Over-the-counter "diet pills"</strong> - the category the FDA keeps finding hidden, banned drugs in.</li>
</ul>
<p>Prefer injections? Our guides to <a href="/weight-loss/semaglutide">semaglutide</a> and <a href="/weight-loss/tirzepatide">tirzepatide</a> providers cover them, and <a href="/weight-loss/glp1-pills-vs-injections">GLP-1 pills vs injections</a> compares the two formats line by line.</p>`,
  },
  {
    heading: "The FDA-approved GLP-1 pills: Wegovy pill, Foundayo and Rybelsus",
    body: `<p>These are the same class of medication as the injections, in tablet form. The trial figures are the published New England Journal of Medicine results counting everyone randomised; both manufacturers also quote higher on-treatment figures (16.6% for the Wegovy pill, 12.4% for Foundayo), which describe people who took the pill as directed to the end. Prices are Ro's verified published figures and manufacturer prices as reported by the sources linked in the cost section.</p>
<table><thead><tr><th>Pill</th><th>Status and how it is taken</th><th>Trial result</th><th>Published price</th></tr></thead><tbody>
<tr><td><strong>Wegovy pill</strong> (oral semaglutide 25 mg), Novo Nordisk</td><td>Approved December 2025 for chronic weight management. Once daily on an empty stomach with a sip of water, then a 30-minute wait before food</td><td>${ext(SRC.oasis4, "OASIS 4")} (64 weeks): 13.6% mean weight loss vs 2.2% on placebo; 30% lost 20% or more</td><td>Ro: $149 first month, then $299, plus membership (verified). NovoCare self-pay reported at $149-$299 by dose; $25 with commercial coverage (reported)</td></tr>
<tr><td><strong>Foundayo</strong> (orforglipron), Eli Lilly</td><td>Approved April 1, 2026. Small-molecule GLP-1: once daily, any time, no food or water restrictions; 6, 12 and 36 mg tablets</td><td>${ext(SRC.attain1, "ATTAIN-1")} (72 weeks): 11.2% mean weight loss at 36 mg vs 2.1% on placebo; 19% lost 20% or more</td><td>LillyDirect self-pay $149-$349 a month by dose; $25 a month with commercial coverage (Lilly, as reported)</td></tr>
<tr><td><strong>Rybelsus</strong> (oral semaglutide 7-14 mg), Novo Nordisk</td><td>Approved for type 2 diabetes, not for weight management. Same empty-stomach rule as the Wegovy pill</td><td>Modest weight loss at diabetes doses, well below the 25 mg Wegovy pill</td><td>Prescribed under its diabetes label; weight-loss use is off-label and not covered as such</td></tr>
</tbody></table>
<h3>The Wegovy pill</h3>
<p>Semaglutide is a peptide, and peptides are poorly absorbed from the gut, which is why the tablet carries 25 mg against the injection's 2.4 mg a week and why it comes with a rule: take it on an empty stomach with a small sip of water, then wait about 30 minutes before eating, drinking or taking other medicines. Miss the timing and absorption drops. The dose is stepped up over the first months from a 1.5 mg starting tablet to the 25 mg maintenance dose that produced the trial result. It is approved for reducing excess body weight and maintaining the loss in adults with obesity, or overweight with a weight-related condition, and for lowering cardiovascular risk in that group. <a href="/weight-loss/articles/wegovy-pill-price-online">Wegovy pill price online</a> walks every route to it.</p>
<h3>Foundayo</h3>
<p>Orforglipron is not a peptide but a small molecule, designed to be absorbed the way most ordinary tablets are. That is what lets it be taken at any time of day with or without food or water, stepped up across 6 mg, 12 mg and 36 mg tablets. Its published result is smaller than the Wegovy pill's, with the caveat that the two were tested in separate trials of different lengths and nobody has run them head to head. For someone who takes morning medication, drinks coffee on waking or simply will not keep a timed routine, the absence of rules is its main argument. <a href="/weight-loss/articles/foundayo-vs-wegovy-pill">Foundayo vs the Wegovy pill</a> compares them line by line.</p>
<h3>Rybelsus</h3>
<p>Rybelsus is the same semaglutide molecule at 7 mg and 14 mg, approved for type 2 diabetes. People lose some weight on it, but the doses are far below the 25 mg weight-management tablet, it carries the same empty-stomach rule, and insurance will not cover it for weight loss because that is not its label. If you are offered Rybelsus "for weight loss", you are being offered an off-label diabetes drug when an approved weight-loss version of the same molecule now exists.</p>`,
  },
  {
    heading: "How the GLP-1 pills compare with the injections",
    body: `<p>The honest summary: injections still deliver the greatest average weight loss, the Wegovy pill now matches semaglutide injections in its own trial, and Foundayo removes the needle and the timing rules.</p>
<table><thead><tr><th>Factor</th><th>GLP-1 pills</th><th>GLP-1 injections</th></tr></thead><tbody>
<tr><td>Average weight loss in trials</td><td>13.6% (Wegovy pill, OASIS 4) and 11.2% (Foundayo, ATTAIN-1) at their top doses</td><td>14.9% (semaglutide, ${ext(SRC.step1, "STEP 1")}) to 20.9% (tirzepatide 15 mg, ${ext(SRC.surmount1, "SURMOUNT-1")})</td></tr>
<tr><td>Format</td><td>Daily tablet, no needles</td><td>Once-weekly injection from a pen or a compounded vial</td></tr>
<tr><td>Published price</td><td>From $149 a month at the starting dose; $299 (Wegovy pill) to $349 (Foundayo) at the top dose, as reported; $25 with commercial coverage</td><td>Brand pens $1,149-$1,799 a month cash at providers we track; compounded from $49 (semaglutide) and $89 (tirzepatide)</td></tr>
<tr><td>Routine</td><td>Wegovy pill and Rybelsus need empty-stomach timing; Foundayo does not</td><td>One dose a week, nothing in between</td></tr>
<tr><td>Best for</td><td>Needle-averse patients; those who want a daily routine or, with Foundayo, no rules at all</td><td>Those prioritising the greatest average weight loss, or the lowest cash price via compounded</td></tr>
</tbody></table>
<p>Side effects do not split by format: the pills and the injections share the same gastrointestinal profile, mostly early and around dose increases, and the same class warnings. The full comparison, including year-one costs and the routine in detail, is in <a href="/weight-loss/glp1-pills-vs-injections">GLP-1 pills vs injections</a>.</p>`,
  },
  {
    heading: "The older FDA-approved prescription pills, one by one",
    body: `<p>Before the GLP-1s, these were the prescription weight loss pills, and they are still prescribed every day. They work in different ways - appetite suppression, craving reduction, blocking fat absorption - and produce less weight loss on average than the GLP-1 pills, generally at lower prices because most are generic. The ${ext(SRC.niddk, "NIDDK's overview of prescription medications for overweight and obesity")} lists them with their approvals; the typical results below are the ranges this guide has carried, and individual results vary widely.</p>
<table><thead><tr><th>Pill</th><th>How it works and who must not take it</th><th>Typical results</th></tr></thead><tbody>
<tr><td><strong>Qsymia</strong> (phentermine/topiramate ER)</td><td>Appetite suppression plus reduced cravings; a once-daily capsule stepped up over the first weeks, with a weight check at 12 weeks. Not for use in pregnancy (topiramate causes birth defects); contraindicated in glaucoma and hyperthyroidism</td><td>Among the most effective non-GLP-1 pills, roughly 8-10% average weight loss</td></tr>
<tr><td><strong>Contrave</strong> (naltrexone/bupropion)</td><td>Targets appetite and reward-related eating; a daily tablet. Boxed warning for suicidal thoughts and behaviour; not with opioids, seizure disorders, uncontrolled high blood pressure or MAO inhibitors</td><td>Roughly 5-9% average weight loss</td></tr>
<tr><td><strong>Phentermine</strong> (Adipex-P and generics)</td><td>Short-term appetite suppressant; a controlled stimulant with cardiovascular cautions, approved for a few weeks of use</td><td>Roughly 3-5% over short-term use</td></tr>
<tr><td><strong>Orlistat</strong> (Xenical by prescription, Alli over the counter)</td><td>Blocks absorption of part of the fat you eat; taken with meals. Gastrointestinal side effects are common and track the fat in the meal</td><td>Roughly 3-5%</td></tr>
<tr><td><strong>Metformin</strong></td><td>A diabetes drug used off-label for weight; improves insulin sensitivity. Not FDA-approved for weight loss</td><td>Modest, around 2-3%; often used as a lower-cost option</td></tr>
</tbody></table>
<h3>Qsymia</h3>
<p>Qsymia combines phentermine with an extended-release form of topiramate, a seizure and migraine medicine that also reduces appetite. It is prescribed for adults, and children aged 12 and over, with obesity or overweight and a weight-related condition, alongside a reduced-calorie diet and exercise; the ${ext(SRC.qsymia, "MedlinePlus monograph")} describes the low starting dose, the step-up after 14 days and the 12-week check at which a clinician decides whether to continue, increase or stop. The hard rules come from topiramate: it can cause birth defects, so a negative pregnancy test before starting and reliable contraception during treatment are required, and it is contraindicated in glaucoma and overactive thyroid. On the published figures it is the strongest of the older pills.</p>
<h3>Contrave</h3>
<p>Contrave combines naltrexone, an opioid blocker, with bupropion, an antidepressant also sold to help people stop smoking. The ${ext(SRC.contrave, "MedlinePlus monograph")} opens on its boxed warning: bupropion has been linked to suicidal thoughts in a small number of young people in studies, and anyone on it should be watched for mood changes. It must not be taken with opioids (naltrexone blocks them and can trigger withdrawal), by people with seizure disorders or uncontrolled high blood pressure, or within 14 days of an MAO inhibitor. For the right patient, often someone whose eating is driven by cravings rather than hunger, it is a reasonable, generic-era option.</p>
<h3>Phentermine</h3>
<p>Phentermine on its own is the oldest drug on this list and still the most prescribed. It is a stimulant-type appetite suppressant and a controlled substance, approved for short-term use measured in weeks, with cautions around heart disease, high blood pressure, overactive thyroid, glaucoma and MAO inhibitors. It is inexpensive as a generic and it works while you take it; the weight tends to return after the course ends, which is why clinicians increasingly reserve it for a short start rather than a plan.</p>
<h3>Orlistat</h3>
<p>Orlistat works in the gut rather than the brain: it blocks the enzyme that digests fat, so part of the fat in a meal passes through unabsorbed. The 120 mg prescription strength is Xenical; the 60 mg strength, Alli, is the only over-the-counter weight-loss medicine with an FDA approval behind it. Its side effects are the direct consequence of its mechanism - oily stools, urgency, gas - and they scale with how much fat is in the meal, which in practice teaches a low-fat diet. It also reduces absorption of fat-soluble vitamins, so a daily multivitamin taken apart from the dose is standard advice.</p>
<h3>Metformin</h3>
<p>Metformin is a type 2 diabetes medicine that some clinicians prescribe off-label for weight, particularly for people with insulin resistance or prediabetes. The effect is modest, it is not FDA-approved for weight loss, and it is on this list because it is cheap, familiar and often the first thing a primary-care doctor reaches for. It is not a substitute for any of the drugs above when the goal is substantial weight loss.</p>`,
  },
  {
    heading: "What weight loss pills cost, by route",
    body: `<p>Two different price worlds sit on this page. The GLP-1 pills are new brand-name products priced like brand-name products, with savings cards and a Medicare pilot that change the number entirely. The older pills are mostly generic and generally inexpensive at a retail pharmacy; we do not quote figures for them because they vary by pharmacy and plan, and your pharmacist can give you the cash price in a minute. The GLP-1 figures below are Ro's own published prices, verified by us in August 2026, and manufacturer prices as reported by the dated sources linked, which we have not verified.</p>
<table><thead><tr><th>Route</th><th>Wegovy pill</th><th>Foundayo</th></tr></thead><tbody>
<tr><td>Telehealth (verified)</td><td><a href="/weight-loss/reviews/ro">Ro</a>: <strong>$149</strong> first month, then <strong>$299</strong>, plus membership ($39 first month, then $74-$149)</td><td>Available through LillyDirect and telehealth providers per Lilly; none of the providers we track has published a price we could verify</td></tr>
<tr><td>Manufacturer direct, self-pay (reported)</td><td><strong>$149-$299</strong> a month by dose through NovoCare Pharmacy, per ${ext(SRC.noom, "third-party trackers")}; not verified by us</td><td><strong>$149-$349</strong> a month by dose through LillyDirect, as reported by ${ext(SRC.sciam, "Scientific American")} from Lilly material</td></tr>
<tr><td>Commercial insurance that covers the drug (reported)</td><td><strong>as low as $25</strong> with Novo Nordisk's savings offer, capped at $100 of savings per 30-day supply</td><td><strong>$25</strong> with Lilly's savings card, per its ${ext(SRC.lillyRelease, "April 9, 2026 release")}</td></tr>
<tr><td>Medicare GLP-1 Bridge</td><td><strong>$50</strong> flat copay</td><td><strong>$50</strong> flat copay</td></tr>
</tbody></table>
<p>The Medicare GLP-1 Bridge is a CMS pilot running ${ext(SRC.bridge, "July 1, 2026 through December 31, 2027")}, covering the Wegovy pill and injection, the Zepbound KwikPen and Foundayo at $50 a month regardless of dose, with eligibility and approval through your Part D plan; neither savings card works on Medicare or Medicaid. For context, compounded semaglutide injections run $49-$199 a month and compounded tirzepatide $89-$299 at the providers we track, verified on each provider's site on ${PRICE_DATE}, which is why a needle-averse reader paying cash should read <a href="/weight-loss/articles/what-100-to-200-a-month-gets-you-glp1">what $100-$200 a month gets you</a> before deciding the pill is worth the premium. <a href="/weight-loss/articles/glp1-with-insurance">Our insurance guide</a> explains how to check your formulary first, and <a href="/weight-loss/articles/glp1-after-65-medicare">GLP-1s after 65</a> covers the Medicare questions.</p>`,
  },
  {
    heading: "Compounded oral semaglutide and tirzepatide: not FDA-approved",
    body: `<p>Several telehealth providers offer compounded oral forms of semaglutide or tirzepatide - tablets, sublingual drops or dissolving films - alongside their injections, and some market them simply as "the pill". They are prepared by licensed 503A compounding pharmacies for an individual prescription, under the framework described on the FDA's ${ext(SRC.fdaCompounding, "human drug compounding")} page. That is a legal, regulated channel, but it is a different thing from the pills above: <strong>compounded products are not FDA-approved</strong>, they have no trials of their own, and an oral compounded peptide is absorbed differently from the approved 25 mg tablet, which went through specific formulation work to survive the stomach. The FDA's ${ext(SRC.fdaConcerns, "statement on unapproved GLP-1 drugs")} sets out its concerns: no pre-market review for safety, effectiveness or quality; adverse-event reports including dosing errors; and products found to contain salt forms of semaglutide that are not the approved active ingredient.</p>
<p>Their advantage is price and a familiar provider relationship, and the honest framing is this: a compounded oral product is a bet that the pharmacy's formulation delivers enough of the drug, with no published evidence that it does. If you want a pill with evidence behind it, the two approved pills are the pills. If price decides and you can accept an injection, the compounded injections below are the same molecules with far more real-world use. The trade-offs are set out in <a href="/weight-loss/articles/compounded-semaglutide-vs-brand-name">compounded vs brand-name</a> and the <a href="/weight-loss/articles/503a-vs-503b-pharmacy-28-day-rule">503A vs 503B explainer</a>. A licensed clinician reviews your health profile and decides whether an oral or injectable option is the right fit; no in-person visit is required.</p>`,
  },
  {
    heading: "Over-the-counter diet pills: what the FDA keeps finding",
    body: `<p>Most non-prescription weight loss products - "fat burners", appetite "blockers", herbal blends, detox teas - have little or no rigorous evidence behind their claims, and they are not regulated the way prescription medicines are. The risk is not only that they do nothing. The FDA has repeatedly tested weight-loss supplements sold online and in stores and found hidden prescription drugs in them, most often <strong>sibutramine</strong>, a weight-loss drug withdrawn from the US market in 2010 because it raised blood pressure and heart rate and increased cardiovascular risk. The agency's ${ext(SRC.fdaAlfia, "February 2023 notice on Alfia Weight Loss Capsules")} is one of a long series, and the FDA has said it cannot test every product on the market, so absence from its list is not reassurance.</p>
<p>The one over-the-counter product with an FDA approval behind it is orlistat 60 mg (Alli), described above. Everything else sold without a prescription for weight loss should be treated as unproven at best. If you are serious about results, a licensed clinician and an FDA-approved medication are the evidence-based path, and every option on this page except Alli requires exactly that.</p>`,
  },
  {
    heading: "Who should not take weight loss pills",
    body: `<p>Every pill here has a group of people who must not take it, and the intake form at a legitimate provider exists to find them. The non-negotiables, from the labels:</p>
<ul>
<li><strong>Pregnancy and breastfeeding.</strong> None of these medicines is used in pregnancy. Qsymia is the strictest because topiramate causes birth defects: a pregnancy test before starting and reliable contraception throughout.</li>
<li><strong>GLP-1 pills (Wegovy pill, Foundayo, Rybelsus).</strong> Contraindicated with a personal or family history of medullary thyroid carcinoma or Multiple Endocrine Neoplasia syndrome type 2; warnings about pancreatitis and gallbladder disease; the Wegovy pill's absorption rule means other morning medicines need rescheduling.</li>
<li><strong>Qsymia.</strong> Glaucoma, overactive thyroid, and within 14 days of an MAO inhibitor; topiramate can also affect mood, memory and kidney-stone risk.</li>
<li><strong>Contrave.</strong> Any opioid use, seizure disorders, uncontrolled high blood pressure, an eating disorder history, abrupt withdrawal from alcohol or sedatives, and MAO inhibitors; the boxed warning on suicidal thoughts applies to everyone starting it.</li>
<li><strong>Phentermine.</strong> Heart disease, uncontrolled high blood pressure, overactive thyroid, glaucoma, a history of drug misuse, and MAO inhibitors.</li>
<li><strong>Orlistat.</strong> Chronic malabsorption or gallbladder problems; it also changes the absorption of some other medicines, including thyroid hormone and some anticoagulants, which need spacing.</li>
</ul>
<p>Two general points. All of these are prescription medicines in a treatment plan, not a purchase, and the clinician who prescribes one is also the person who manages side effects and decides when to stop. And weight returns when most of them stop; the GLP-1 extension studies showed about two-thirds of lost weight regained within a year of stopping semaglutide, and the older pills behave the same way in practice, so the realistic question is which option you can sustain.</p>`,
  },
  {
    heading: "Which weight loss pill should you choose?",
    body: `<p>There is no universal answer, but most readers fit one of these.</p>
<p><strong>You want the strongest pill and your insurance covers a GLP-1.</strong> The Wegovy pill or Foundayo, whichever your plan covers, at a reported $25 a month with the savings card. Between the two, the Wegovy pill has the larger trial result and Foundayo has no timing rules.</p>
<p><strong>You are on Medicare.</strong> Ask your Part D plan about the GLP-1 Bridge: both pills at a flat $50, no dose increase. Choose on routine and results, not price.</p>
<p><strong>You want a GLP-1 pill and are paying cash.</strong> The Wegovy pill through Ro is the verified telehealth route today, at $149 then $299 plus membership; Foundayo's reference is LillyDirect's reported $149-$349. Budget for the maintenance-dose price, not the first month, and do not accept a compounded "pill" as a substitute.</p>
<p><strong>You cannot take a GLP-1, or do not need that much.</strong> Qsymia is the strongest of the older pills, Contrave suits craving-driven eating, and both are long-term options with specific exclusions; a clinician who knows your history chooses between them.</p>
<p><strong>You want the lowest cost with evidence behind it.</strong> Generic phentermine for a short start, or orlistat, both inexpensive at a pharmacy; or, if you can accept a weekly injection, compounded semaglutide from $49 a month, which produces far more weight loss than any older pill. <a href="/weight-loss">Our provider comparison</a> lists every verified compounded price.</p>
<p><strong>You were about to buy an over-the-counter product.</strong> Read the FDA section above first. Alli is the one with an approval; the rest are a gamble on contents as much as on results.</p>
<p>Whatever you choose, the prescriber decides on your history, not on a table, and can decline to prescribe any of them.</p>`,
  },
  {
    heading: "How to get weight loss pills online",
    body: `<p>The process is the same for every prescription option: an online intake covering your weight, health history, medications and goals; a review by a licensed clinician; a prescription if appropriate, filled either by the provider's partner pharmacy and shipped to you or sent to a pharmacy of your choice where insurance applies; and follow-up as the dose steps up or at the 12-week check the older pills' labels call for. For the FDA-approved Wegovy pill, <a href="/weight-loss/reviews/ro">Ro</a> is the provider we have verified. For compounded oral or injectable semaglutide and tirzepatide, the providers below and on our <a href="/weight-loss">comparison</a> all run a clinician review before prescribing. The <a href="/weight-loss/articles/glp1-weight-loss-online-complete-guide">complete guide to GLP-1 weight loss online</a> walks every step, including what to check about the pharmacy and the refund terms if you are not approved.</p>
<p><em>This guide is general information, not medical advice. Prescription weight loss medications require evaluation and supervision by a licensed healthcare provider, who decides whether any of them is appropriate for you.</em></p>`,
  },
];

export default async function WeightLossPillsPage() {
  const config = await getConfig();
  const pillProviders = PILL_PROVIDER_IDS
    .map((id) => config.providers.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => !!p);
  const wordCount = SECTIONS.reduce((n, s) => n + s.body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length, 0);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Weight Loss Pills 2026: Wegovy Pill, Foundayo, Rybelsus & Every Other Prescription Option",
    description: metadata.description,
    datePublished: PAGE_PUBLISHED,
    dateModified: PAGE_UPDATED,
    wordCount,
    ...pageReviewSchema("/weight-loss/weight-loss-pills"),
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
      { "@type": "ListItem", position: 3, name: "Weight Loss Pills", item: CANONICAL },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  const providerCards = pillProviders.length > 0 && (
    <div className="mt-8">
      <p className="mb-3 text-[12px] font-bold uppercase tracking-wider text-gray-400">Providers with compounded oral options</p>
      <div className="grid gap-4 sm:grid-cols-2">
        {pillProviders.map((p) => (
          <div key={p.id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-4 flex h-[34px] w-[120px] items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.logo} alt={`${p.name} logo`} className="max-h-full max-w-full object-contain" loading="lazy" decoding="async" />
            </div>
            {p.highlights?.length > 0 && (
              <ul className="mb-5 space-y-2">
                {p.highlights.slice(0, 3).map((h, hi) => (
                  <li key={hi} className="flex items-start gap-2 text-[13px] leading-snug text-gray-600">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" strokeWidth={2.5} />
                    {h}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2">
              <ProviderCta
                href={p.affiliateUrl}
                providerName={p.name}
                providerSlug={p.id}
                pageType="listing"
                sourceFlow="main_comparison"
                className="inline-flex h-[42px] items-center justify-center gap-1.5 rounded-lg bg-[#0C4B75] px-5 text-[14px] font-bold text-white transition-colors hover:bg-[#093d61]"
              >
                Visit {p.name}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </ProviderCta>
              <Link href={`/weight-loss/reviews/${p.id}`} className="text-[13px] font-bold text-[#0C4B75] hover:underline">
                Read our review
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-gray-50">
        {/* Hero band - the article masthead, same layout and widths as
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
                { label: "Weight Loss Pills" },
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
              Weight Loss Pills in 2026: Every Prescription Option, Compared
            </h1>
            <p className="mt-2 max-w-[640px] text-[14px] leading-[1.45] text-gray-600 sm:text-[16px] sm:leading-[1.55]">
              The two FDA-approved GLP-1 pills, the older prescription pills, the compounded tablets
              and the over-the-counter products, clearly labelled: what each one does, what the
              evidence shows, what it costs and who must not take it.
            </p>
            <p className="mt-2 text-[12px] text-gray-400">Updated {fmt(PAGE_UPDATED)}</p>
            <MedicalReviewBar path="/weight-loss/weight-loss-pills" className="mt-3 max-w-[760px]" />
          </div>
        </div>

        <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6">
          <div className="article-body mb-8 text-[16px] leading-[1.75] text-gray-800">
            <div className="qa">
              <strong>The quick answer</strong>
              {QUICK_ANSWER}
              <span className="mt-2 block text-[13px] text-gray-500">
                Trial figures are the published treatment-policy results linked below. Ro&rsquo;s price is its
                own published figure, verified August 2026; manufacturer prices are as reported by dated sources
                and not verified by us.
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
                {/* The ranked picks follow the GLP-1 pills section; the
                    compounded-oral provider cards follow their own section. */}
                {i === 1 && (
                  <div className="mt-8">
                    <TopTwoPicks config={config} linkPrefix="/weight-loss" />
                  </div>
                )}
                {i === 5 && providerCards}
                {i === 6 && (
                  <div className="mt-6 flex items-start gap-4 rounded-xl border border-amber-200 bg-amber-50/60 p-5">
                    <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" strokeWidth={2} />
                    <p className="text-[14px] leading-[1.7] text-gray-600">
                      If you have already taken an over-the-counter weight-loss product and feel unwell - racing heart,
                      chest pain, severe headache or a spike in blood pressure - seek care and tell them what you took.
                      The FDA accepts reports of suspect products through its MedWatch programme.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </article>

          <section className="mt-12 mb-12">
            <h2 className="mb-6 text-[24px] font-bold text-[#191919]">Weight loss pills: FAQ</h2>
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
                Compare all providers
              </Link>
              <Link
                href="/weight-loss/find-your-match"
                className="inline-flex h-[46px] items-center justify-center rounded-lg border border-gray-200 bg-white px-6 text-[14px] font-semibold text-[#191919] transition-colors hover:bg-gray-50"
              >
                Take the quiz
              </Link>
            </div>
          </section>

          <GuideCluster currentSlug="weight-loss-pills" />

          <MedicalSources vertical="weight-loss" />

          <section className="mt-10">
            <p className="mb-3 text-[13px] leading-relaxed text-gray-400">
              Sources: FDA approvals - the Wegovy pill (oral semaglutide 25 mg), approval announced December 22,
              2025 (Healio); Foundayo (orforglipron), approved April 1, 2026 (FDA). Trial data: OASIS 4 and
              ATTAIN-1 as published in the New England Journal of Medicine, September 2025, summarised by the
              American College of Cardiology; STEP 1 and SURMOUNT-1 for the injections. The older pills are
              described from their labels as summarised on MedlinePlus (phentermine/topiramate,
              naltrexone/bupropion) and the NIDDK&rsquo;s overview of prescription medications for overweight and
              obesity; their typical results are approximate ranges from their registration trials. Prices:
              Ro&rsquo;s published pricing, verified August 2026; compounded prices verified {PRICE_DATE};
              Foundayo and NovoCare prices and savings cards as reported by Scientific American, Lilly&rsquo;s
              April 9, 2026 release and third-party trackers, not verified by us. Weight-loss figures are trial
              averages; individual results vary. Trademarks belong to their manufacturers.
            </p>
            <p className="text-[13px] leading-relaxed text-gray-400">
              treatmentshub.com is not a medical provider and does not prescribe medications. This page is for
              educational and comparison purposes only and is not medical advice. Prescription weight loss
              medications require evaluation and supervision by a licensed healthcare provider. Always consult a
              qualified physician before starting any treatment.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
