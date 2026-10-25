import type { ArticleData } from "../../config";

// The hub's explainer on the 2025-2026 removal of most boxed ("black box")
// warnings from menopausal hormone therapy. The idea is shared with
// hrtwomen.com's Oct 24, 2026 piece; this is a fresh write in the hub's voice
// from the same primary sources, every figure tied to a dated link: FDA/HHS
// releases and the FDA expert-panel page, the 2002 WHI JAMA paper, the 2024
// JAMA WHI review, the Menopause Society's 2022 statement and 2025 comment,
// ACOG/ASCO/SGO/SWHR reactions (via their own sites or Breastcancer.org),
// NPR and Truveta-via-eMarketer for demand and supply, AP/Penguin/TODAY for
// the public-figure section. Where sources disagree the copy says so.
// Facts checked 2026-10-25.

const ext = (href: string, text: string) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const SRC = {
  fdaPanel:
    "https://www.fda.gov/patients/fda-expert-panels/fda-expert-panel-menopause-and-hormone-replacement-therapy-women-07172025",
  axiosPanel: "https://www.axios.com/2025/07/18/fda-menopause-hormone-therapy",
  ncHR: "https://www.center4research.org/f-d-a-panel-to-reassess-hormone-therapy-warnings/",
  fdaNov:
    "https://www.fda.gov/news-events/press-announcements/hhs-advances-womens-health-removes-misleading-fda-warnings-hormone-replacement-therapy",
  hhsFact:
    "https://www.hhs.gov/press-room/fact-sheet-fda-initiates-removal-of-black-box-warnings-from-menopausal-hormone-replacement-therapy-products.html",
  fdaRequest:
    "https://www.fda.gov/drugs/drug-alerts-and-statements/fda-requests-labeling-changes-related-safety-information-clarify-benefitrisk-considerations",
  fdaFeb:
    "https://www.fda.gov/news-events/press-announcements/fda-approves-labeling-changes-menopausal-hormone-therapy-products",
  fdaPatch:
    "https://www.fda.gov/drugs/drug-alerts-and-statements/fda-update-estradiol-transdermal-patch-availability",
  whi2002: "https://pubmed.ncbi.nlm.nih.gov/12117397/",
  jamaWhi: "https://doi.org/10.1001/jama.2024.6542",
  nams2022: "https://doi.org/10.1097/GME.0000000000002028",
  namsComment:
    "https://menopause.org/press-releases/the-menopause-society-comments-on-the-fda-announcement-on-hormone-therapy",
  bcoReact: "https://www.breastcancer.org/news/FDA-removes-black-box-warning-HRT",
  swhr: "https://swhr.org/celebrating-the-removal-but-cautioning-the-removal-of-all-warnings-on-hrt/",
  cnn: "https://www.cnn.com/2025/11/10/health/hormone-therapy-menopause-fda-warning-wellness",
  sgo: "https://www.sgo.org/news/fda-removes-black-box-warnings-on-hormone-replacement-therapy/",
  ajmc: "https://www.ajmc.com/view/fda-to-remove-black-box-warnings-from-hrt-debate-ensues",
  npr: "https://www.npr.org/2026/03/10/nx-s1-5742817/menopause-hormone-therapy-shortages",
  emarketer:
    "https://www.emarketer.com/content/hormone-therapy-prescriptions-climb-safety-label-changes-drive-women-s-health-demand",
  berry:
    "https://www.clickondetroit.com/health/2024/05/02/halle-berry-shouts-from-the-capitol-im-in-menopause-as-she-seeks-to-end-a-stigma-and-win-funding/",
  watts: "https://www.penguin.co.uk/books/465043/dare-i-say-it-by-watts-naomi/9781785045462",
  obama: "https://www.today.com/today/amp/tdna189234",
  pj: "https://pharmaceutical-journal.com/article/news/hrt-prescribing-increases-by-370-in-past-decade",
  stat: "https://www.statnews.com/2026/01/08/hormone-therapy-menopause-history-hype",
  swan: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2110996",
  testosterone: "https://academic.oup.com/jcem/article/104/11/4597/5556103",
  uspharm: "https://www.uspharmacist.com/article/fda-asks-for-removal-of-most-hrt-black-box-warnings",
  uspstf: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/osteoporosis-screening",
  fdaVeozah:
    "https://www.fda.gov/drugs/drug-safety-and-availability/fda-adds-warning-about-rare-occurrence-serious-liver-injury-use-veozah-fezolinetant-hot-flashes-due",
};

export const HRT_BLACK_BOX_WARNING: ArticleData = {
  slug: "hrt-black-box-warning-removed",
  title: "HRT Black Box Warning Removed: What Changed and What Didn't",
  description:
    "The FDA removed HRT's boxed warnings on heart disease, breast cancer and dementia in 2025-2026. What the WHI found, what changed, what still applies.",
  category: "Safety",
  readTime: "32 min read",
  publishedAt: "2026-10-25",
  updatedAt: "2026-10-25",
  heroColor: "#F8D7E3",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "On November 10, 2025, HHS and the FDA announced that the boxed warnings about cardiovascular disease, breast cancer and probable dementia would come off menopausal hormone therapy labels; the first six revised labels were approved on February 12, 2026.",
    "One boxed warning stayed: endometrial cancer on systemic estrogen-alone products. A woman with a uterus who takes estrogen still needs a progestogen.",
    "The warnings came from the 2002 Women's Health Initiative, whose participants averaged 63 and took one older oral regimen. Later analyses showed risk depends on age, time since menopause and the type and route of hormones.",
    "Specialists broadly welcomed the change, especially for low-dose vaginal estrogen. ACOG, ASCO and others stressed that systemic HRT still carries individual risks and remains off the table after breast cancer.",
    "Demand jumped afterward: prescriptions rose and some estradiol patches were hard to find in early 2026. The medicines, their contraindications and the need for a clinician's judgment did not change.",
  ],
  sections: [
    {
      heading: "What happened to HRT's black box warning?",
      body: `<div class="qa"><strong>The short answer</strong>On <strong>November 10, 2025</strong>, the US Department of Health and Human Services and the FDA announced that the "black box" warnings about cardiovascular disease, breast cancer and probable dementia would be removed from menopausal hormone therapy products. On <strong>February 12, 2026</strong>, the FDA approved the first six updated labels. The boxed warning about <strong>endometrial cancer</strong> stays on systemic estrogen-alone products. The medicines themselves did not change, and neither did the list of women who should not take them.</div>
<p>For 22 years, every estrogen product approved for menopause in the United States opened with the FDA's most severe warning: a black-bordered box naming heart attacks, strokes, blood clots, breast cancer and dementia. The box traced back to one study, the Women's Health Initiative, whose first results in July 2002 ended an era in which hormone therapy was among the most prescribed medicines in the country. Use fell from more than a quarter of postmenopausal women to under 5% and never recovered.</p>
<p>The ${ext(SRC.fdaNov, "November 2025 announcement")} undid most of that box. FDA Commissioner Marty Makary and HHS Secretary Robert F. Kennedy Jr. framed it as the correction of risk messaging that had grown outdated. Many menopause clinicians called it overdue. Several cancer specialists and researchers said the process was too informal and worried the headlines would be read as "HRT is now safe for everyone."</p>
<p>This guide is the long version for women who want to understand the decision rather than just hear about it: what a boxed warning is, what the 2002 trial measured, what the FDA changed and kept, how the medical societies responded, where the disagreement is, and what it does and does not mean for a woman deciding about hormone therapy in 2026. Shorter reads on the same topic: <a href="/hrt/articles/is-hrt-safe">Is HRT safe?</a> and our <a href="/hrt/articles/menopause-complete-guide">complete menopause guide</a>.</p>
<h3>Timeline at a glance</h3>
<table><tr><th>When</th><th>What happened</th></tr><tr><td>July 2002</td><td>The WHI's estrogen-plus-progestin trial is stopped early; ${ext(SRC.whi2002, "results in <em>JAMA</em>")} report more breast cancer, heart disease, stroke and blood clots</td></tr><tr><td>2003</td><td>The FDA requires boxed warnings on menopausal estrogen products; prescribing collapses</td></tr><tr><td>2000s to 2020s</td><td>Long-term WHI follow-up and new trials show the risk picture depends on age, timing and the type of hormones</td></tr><tr><td>July 17, 2025</td><td>The FDA convenes a public ${ext(SRC.fdaPanel, "expert panel")} on menopause and hormone therapy</td></tr><tr><td>November 10, 2025</td><td>HHS and the FDA announce the removal; the FDA ${ext(SRC.fdaRequest, "asks manufacturers")} to revise their labels</td></tr><tr><td>February 12, 2026</td><td>The FDA ${ext(SRC.fdaFeb, "approves the first six revised labels")}</td></tr><tr><td>2026</td><td>Prescriptions rise; some estradiol patches run short; the FDA says ${ext(SRC.fdaPatch, "patch supply is expanding")}</td></tr></table>`,
    },
    {
      heading: "What is a boxed warning, and what does removing one mean?",
      body: `<p><strong>A boxed warning is the strongest safety statement the FDA puts on a prescription drug label. It sits at the very top of the prescribing information inside a black border and flags risks serious enough that a prescriber should weigh them before writing the prescription. Removing one changes where and how prominently a risk is communicated. It does not delete the risk from the label.</strong></p>
<p>A box is not a ban, and it is not a prediction that a patient will be harmed. Several everyday medicines carry one, including some antidepressants and some anti-inflammatory drugs. What makes a box powerful is placement: it is the first thing a clinician reads and it is reprinted in the leaflet that comes home in the pharmacy bag. For hormone therapy, that meant the first thing a 49-year-old with drenching night sweats read about her new prescription was a list of cancers and strokes, with no sense of how large or small those risks were for someone her age.</p>
<h3>Three things a boxed warning is not</h3>
<ul><li><strong>Not the whole safety story.</strong> The Warnings and Precautions and Contraindications sections carry the detail. Those sections still describe cardiovascular disease, breast cancer and dementia on the revised HRT labels.</li><li><strong>Not individualized.</strong> The same box applied to a woman starting estradiol at 50 and a woman starting it at 70, even though their absolute risks differ by a wide margin.</li><li><strong>Not a measure of the medicine's safety.</strong> HRT in 2026 is exactly as safe or risky as it was in 2024. What changed is the regulator's judgment about how the risks should be framed for the women most likely to use it.</li></ul>
<p>Keep that last point in mind for everything that follows. The FDA's own ${ext(SRC.fdaNov, "announcement")} says the risk information remains in the label.</p>`,
    },
    {
      heading: "How did hormone therapy end up with a black box?",
      body: `<p><strong>Through a randomized trial that did its job. The Women's Health Initiative set out to test whether hormone therapy prevented chronic disease, as decades of observational studies had implied. It found that one widely used regimen did not, and that it raised several serious risks in the women studied. The boxed warnings followed in 2003.</strong></p>
<h3>Before 2002: the prevention era</h3>
<p>Estrogen for menopause had been prescribed in the US since the 1940s. The 1966 bestseller <em>Feminine Forever</em> sold it as a way to stay young; its author's work, as ${ext(SRC.stat, "STAT has recounted")}, was funded by the maker of Premarin. A scare in the mid-1970s, when estrogen taken alone was linked to a several-fold rise in endometrial cancer, cut use sharply and led to the practice of adding a progestogen for women with a uterus. By the 1990s, observational studies suggesting women on estrogen had less heart disease had turned hormone therapy into something close to routine preventive care. A JAMA analysis cited by ${ext(SRC.emarketer, "eMarketer")} puts use at 27% of postmenopausal women in 1999.</p>
<p>There was already a warning sign. The HERS trial, published in 1998, found that hormone therapy did not reduce heart events in women who already had heart disease.</p>
<h3>The trial</h3>
<p>The WHI enrolled tens of thousands of postmenopausal women aged 50 to 79. Women with a uterus were randomized to conjugated equine estrogens 0.625 mg plus medroxyprogesterone acetate 2.5 mg daily, or placebo. Women who had had a hysterectomy were randomized to estrogen alone or placebo. The combined-therapy arm was stopped after an average of 5.2 years because the risks had crossed a pre-set safety line.</p>
<h3>What the 2002 paper reported</h3>
<p>The ${ext(SRC.whi2002, "principal results")}, expressed per 10,000 women per year on hormones compared with placebo:</p>
<table><tr><th>Outcome</th><th>Difference per 10,000 women-years</th></tr><tr><td>Coronary heart disease events</td><td>7 more</td></tr><tr><td>Strokes</td><td>8 more</td></tr><tr><td>Pulmonary embolism</td><td>8 more</td></tr><tr><td>Invasive breast cancer</td><td>8 more</td></tr><tr><td>Colorectal cancer</td><td>6 fewer</td></tr><tr><td>Hip fracture</td><td>5 fewer</td></tr><tr><td>Death from any cause</td><td>No significant difference</td></tr></table>
<p>The news coverage led with relative numbers, such as a 26% higher risk of breast cancer. The absolute differences were a handful of extra events per 10,000 women each year. Both framings are accurate; only the second tells an individual woman how much her risk might move. The trial's central message, though, was unambiguous: in this population, on this regimen, hormone therapy did not protect the heart and should not be used to prevent disease.</p>
<h3>The aftermath</h3>
<p>Women stopped en masse, clinicians stopped prescribing, residency programs stopped teaching menopause medicine in any depth, and in 2003 the FDA required the boxed warnings. By 2020, the same JAMA analysis found that 4.7% of postmenopausal women used hormone therapy.</p>`,
    },
    {
      heading: "Why did the 2002 results turn out to be the wrong lens for most women?",
      body: `<p><strong>Not because the trial was flawed, but because its findings were stretched to cover women it did not represent. The average participant was 63 and more than a decade past menopause. The regimen was oral conjugated estrogens with a synthetic progestin. Most women who ask about HRT today are in their late 40s or 50s, with symptoms, and are offered estradiol, often through the skin, with micronized progesterone.</strong></p>
<h3>Age and timing</h3>
<p>Re-analyses of the WHI by age and years since menopause found that women who started hormone therapy under 60, or within about 10 years of their final period, did not show the rise in coronary disease seen in older starters. The idea that estrogen behaves differently in arteries that are still healthy than in arteries with established plaque became known as the timing hypothesis. HHS's ${ext(SRC.hhsFact, "2025 fact sheet")} leans on exactly this point. The ${ext(SRC.jamaWhi, "2024 <em>JAMA</em> review")} written by WHI investigators concludes that hormone therapy is appropriate for treating menopausal symptoms in early menopause and should not be used to prevent chronic disease.</p>
<h3>Estrogen alone was different</h3>
<p>The estrogen-alone arm, in women without a uterus, was stopped early in 2004 mainly because of stroke. It did not show more breast cancer. In long-term follow-up, women who had taken estrogen alone had fewer breast cancers than women on placebo. That pointed the finger at the progestin in the combined regimen, medroxyprogesterone acetate, and is one reason many clinicians now prefer micronized progesterone, even though head-to-head trial evidence is thin.</p>
<h3>Different hormones, different routes</h3>
<p>The WHI tested oral conjugated equine estrogens. It did not test transdermal estradiol, which avoids the first pass through the liver and, in observational studies, carries a lower risk of blood clots. It did not test micronized progesterone. Our guide to <a href="/hrt/articles/estrogen-patch-vs-pill">estrogen patch vs pill</a> covers that evidence.</p>
<h3>Relative versus absolute</h3>
<p>A 26% relative increase and 8 extra cases per 10,000 women per year describe the same finding. Over five years that is roughly 40 extra cases per 10,000 women, or about 0.4 percentage points. Reporting that led with the percentage produced fear out of proportion to the size of the change.</p>
<h3>What the WHI still gets right</h3>
<p>Hormone therapy should not be prescribed to prevent heart disease or dementia. Starting it late carries more risk. Combined therapy is associated with a small rise in breast cancer risk that grows with years of use. None of that was overturned in 2025. The argument was about whether one box, written for a 63-year-old on a 1990s regimen, described the risks for a 51-year-old starting estradiol today.</p>`,
    },
    {
      heading: "How should you read HRT risk numbers?",
      body: `<p><strong>Ask for the absolute risk: how many extra events, in how many women, over how long. Then ask whether the women in that number look like you. A relative increase without a baseline tells you almost nothing about your own situation.</strong></p>
<table><tr><th>How it is said</th><th>What it conveys</th><th>What it hides</th></tr><tr><td>"26% higher breast cancer risk"</td><td>The relative change</td><td>How common the outcome is to begin with</td></tr><tr><td>"About 8 more cases per 10,000 women per year"</td><td>The absolute change in the trial</td><td>That the trial's women averaged 63 on an older regimen</td></tr><tr><td>"About 0.4 percentage points over five years"</td><td>A personal-scale version</td><td>That your baseline depends on age, genetics, alcohol, weight and breast density</td></tr></table>
<p>Absolute numbers also explain why age matters so much. Strokes are rare in women in their 50s and more common in their 70s. The same relative increase therefore produces far fewer extra strokes in a younger woman. When you sit down with a clinician, "what does this mean in numbers for someone like me?" is the single most useful question you can ask.</p>`,
    },
    {
      heading: "Why did the label take more than 20 years to catch up?",
      body: `<p><strong>Because a boxed warning is hard to remove. Agencies rarely soften a warning without a large new trial, and the evidence that accumulated after 2002 came in pieces: re-analyses, long-term follow-up, and smaller trials that measured artery changes rather than heart attacks.</strong></p>
<h3>The evidence that built up</h3>
<ul><li><strong>WHI follow-up</strong> by age showed the cardiovascular harm concentrated in older starters, and the estrogen-alone group ending up with fewer breast cancers than placebo.</li><li><strong>KEEPS</strong>, in recently menopausal women, did not find that hormone therapy accelerated markers of atherosclerosis.</li><li><strong>ELITE</strong> found that oral estradiol slowed thickening of the carotid artery wall in women who started within six years of menopause but not in women who started ten or more years after. Its lead investigator, Howard Hodis, later sat on the FDA's 2025 panel.</li><li><strong>Observational work</strong> on transdermal estradiol and micronized progesterone suggested a kinder clot profile, and possibly breast profile, than the WHI regimen.</li></ul>
<h3>Why that was not enough on its own</h3>
<ul><li>The newer trials used surrogate markers, not strokes and heart attacks.</li><li>Removing a box is a conspicuous regulatory act, and the institutional memory of 2002 made caution the default.</li><li>Professional guidance moved first. The Menopause Society's ${ext(SRC.nams2022, "2022 position statement")} already endorsed individualized therapy for younger women years before the FDA acted.</li></ul>
<p>What tipped it in 2025 was a combination: the accumulated evidence, years of public advocacy, and an FDA leadership that made the change a priority. That mix is why the decision has both strong supporters and strong critics.</p>`,
    },
    {
      heading: "What was the cost of two decades of fear?",
      body: `<p><strong>A generation of women with treatable symptoms who were told to wait it out, and a generation of clinicians who never learned menopause medicine. Use fell from 27% of postmenopausal women in 1999 to 4.7% in 2020, while the symptoms did not become any shorter.</strong></p>
<ul><li><strong>Fear on both sides of the desk.</strong> The box deterred women who were good candidates and clinicians who could have treated them.</li><li><strong>A training gap.</strong> As prescribing fell, fewer clinicians gained experience, and the topic shrank in medical education.</li><li><strong>Missed diagnoses.</strong> Joint pain, anxiety, brain fog and recurrent urinary infections were worked up as separate problems rather than recognized as menopausal.</li></ul>
<p>The symptoms are not brief. In the ${ext(SRC.swan, "SWAN study")}, women with frequent hot flashes had them for a median of 7.4 years. Genitourinary symptoms tend to worsen rather than fade. Early menopause left untreated carries long-term bone and cardiovascular consequences. Part of the case for revising the box was simply that the cost of under-treatment had been invisible in the original calculation.</p>`,
    },
    {
      heading: "What happened at the FDA's July 2025 expert panel?",
      body: `<p><strong>On July 17, 2025, the FDA hosted a two-hour public panel of clinicians and researchers who argued, nearly unanimously, that the boxed warnings overstated risk for women starting therapy around menopause and had steered women away from effective treatment. The panel took no vote and had no formal power. It set up the November decision.</strong></p>
<h3>Who sat on it</h3>
<p>The ${ext(SRC.fdaPanel, "FDA's event page")} lists panelists including neuroscientist Roberta Diaz Brinton, urologists Kelly Casperson and Rachel Rubin, internist Heather Hirsch, cardiologist and former Menopause Society executive director Howard Hodis, Yale emeritus professor Philip Sarrel, James Simon of George Washington University, and orthopedic surgeon Vonda Wright. Coverage described the group as about a dozen experts.</p>
<h3>What they argued</h3>
<ul><li>The WHI's findings had been applied to younger, healthier women they did not describe.</li><li>Low-dose vaginal estrogen, which is barely absorbed, had carried the same box as systemic pills, scaring women away from treating painful and progressive genitourinary symptoms.</li><li>Fear of hormones had left women with untreated symptoms and lost the bone benefits of therapy.</li></ul>
<h3>The criticism</h3>
<p>${ext(SRC.axiosPanel, "Axios")} noted that the panel took no vote, had no authority to change policy, and consisted largely of like-minded physicians. The American College of Obstetricians and Gynecologists argued that a two-hour panel was no substitute for a formal FDA advisory committee, which has voting members and formal conflict-of-interest screening. The FDA opened a public docket afterward; the ${ext(SRC.ncHR, "National Center for Health Research")} reported close to 3,000 comments by the September 24 deadline.</p>
<p>Process questions aside, the panel marked the first time in more than two decades that the agency publicly reconsidered how hormone therapy risks were communicated.</p>`,
    },
    {
      heading: "What exactly did the FDA change in November 2025?",
      body: `<p><strong>It asked manufacturers to take cardiovascular disease, breast cancer and probable dementia out of the boxed warning, to keep the endometrial cancer box on systemic estrogen-alone products, and to add language about the age and timing of starting therapy.</strong></p>
<table><tr><th>Element</th><th>Before</th><th>After the 2025-2026 revision</th></tr><tr><td>Cardiovascular disease in the box</td><td>Yes</td><td>No; remains in Warnings and Precautions</td></tr><tr><td>Breast cancer in the box</td><td>Yes</td><td>No; remains in Warnings and Precautions</td></tr><tr><td>Probable dementia in the box</td><td>Yes</td><td>No; remains in Warnings and Precautions</td></tr><tr><td>Endometrial cancer (estrogen alone)</td><td>Yes</td><td>Yes, kept</td></tr><tr><td>Timing of initiation</td><td>Not emphasized</td><td>Added: more favorable before 60 or within 10 years of menopause</td></tr></table>
<h3>The FDA's reasoning</h3>
<p>Per the ${ext(SRC.fdaNov, "announcement")} and the ${ext(SRC.hhsFact, "HHS fact sheet")}, the agency reviewed the literature, held the July panel, took public comment and analyzed outcomes in women who started therapy within ten years of menopause. Its conclusion was that the 2002 results, drawn from women averaging 63 on an older formulation, did not describe the risks for women starting around menopause today. Commissioner Makary said the change applies to both bioidentical and synthetic FDA-approved hormones, and he and colleagues published the rationale as a viewpoint in <em>JAMA</em>.</p>
<h3>Which products</h3>
<p>Every FDA-approved menopausal hormone therapy: estrogen pills, patches, gels, sprays, vaginal products and combination products. Because each manufacturer had to submit and clear a revised label, the change arrived product by product through 2026 rather than on one day.</p>`,
    },
    {
      heading: "What the label change does not do",
      body: `<p><strong>It approves no new drug, changes no dose or ingredient, lifts no contraindication, and leaves compounded hormones exactly as unapproved as they were. It is not a recommendation that any particular woman take HRT.</strong></p>
<ul><li><strong>Same products.</strong> Only the wording on the label changed.</li><li><strong>Same indications.</strong> HRT is approved for menopausal symptoms and, for some products, prevention of osteoporosis. Not for preventing heart disease or dementia.</li><li><strong>Same contraindications.</strong> Breast cancer, blood clots, stroke, heart attack, active liver disease and unexplained bleeding still rule systemic therapy out for most women.</li><li><strong>Same prescribing rules.</strong> A licensed clinician still has to assess you before prescribing, online or in person.</li><li><strong>Same status for compounded hormones.</strong> Pharmacy-compounded "bioidentical" products have no FDA-approved label to revise. See <a href="/hrt/articles/bioidentical-hormones-explained">bioidentical hormones explained</a>.</li></ul>`,
    },
    {
      heading: "When did the new labels take effect?",
      body: `<p><strong>The first six revised labels were approved on February 12, 2026, one for each of the main product categories, and the rest followed as manufacturers' submissions cleared review.</strong></p>
<p>The ${ext(SRC.fdaFeb, "February 2026 announcement")} named Prometrium (micronized progesterone), Divigel (estradiol gel) and Estring (vaginal estradiol ring) among the first products, and said 29 companies had submitted proposed label changes at the FDA's request.</p>
<h3>Why it took months</h3>
<p>A drug label is a legal document. Each company drafts the new text, submits it, waits for approval, then reprints the package insert. Generics generally follow the brand's label. So for a stretch of 2026, two boxes of the same generic could carry different versions of the warning. The product inside was identical.</p>`,
    },
    {
      heading: "Do the revised labels still warn about heart disease, breast cancer and dementia?",
      body: `<p><strong>Yes. They moved out of the box and into the Warnings and Precautions section, where the detail actually lives. The Contraindications section is unchanged.</strong></p>
<p>Headlines that read "FDA removes HRT warnings" skipped this distinction. The agency's own language was about removing items from the boxed warning and adding context about timing, not about deleting safety information. If you pick up a revised package insert, expect to find cardiovascular disease, breast cancer and dementia discussed a few paragraphs down.</p>
<h3>Who still should not take systemic HRT</h3>
<ul><li>Current or past breast cancer or other estrogen-dependent cancers</li><li>Unexplained vaginal bleeding</li><li>Current or past deep vein thrombosis or pulmonary embolism</li><li>Stroke or heart attack</li><li>Active liver disease</li><li>Known clotting disorders</li><li>Pregnancy</li></ul>
<h3>Why the endometrial box stayed</h3>
<p>Estrogen taken alone by a woman with a uterus thickens the lining and raises endometrial cancer risk. The evidence is old, strong and undisputed, and the risk is preventable with a progestogen. Keeping it boxed keeps that instruction impossible to miss. The ${ext(SRC.sgo, "Society of Gynecologic Oncology")} pointed to the retained box as a reminder that cancer considerations remain real. Our guide to <a href="/hrt/articles/progesterone-side-effects">progesterone for menopause</a> explains the protection.</p>`,
    },
    {
      heading: "How does the change apply to pills, patches, gels and vaginal estrogen?",
      body: `<p><strong>The revised wording applies across approved forms, but the forms never carried the same risk. Oral estrogen raises clot risk more than transdermal estrogen, and low-dose vaginal estrogen is barely absorbed at all.</strong></p>
<table><tr><th>Form</th><th>Label change</th><th>What still differs</th></tr><tr><td>Estrogen pills</td><td>Cardiovascular, breast cancer and dementia items out of the box</td><td>Higher clot and gallbladder risk than skin routes</td></tr><tr><td>Patches</td><td>Same</td><td>Lower clot risk in observational studies; some brands ran short in 2026</td></tr><tr><td>Gels and sprays</td><td>Same (Divigel was in the first six)</td><td>Daily application; keep the site covered until dry</td></tr><tr><td>Low-dose vaginal estrogen</td><td>Same (Estring was in the first six)</td><td>Minimal absorption; the least controversial part of the decision</td></tr><tr><td>Micronized progesterone</td><td>Prometrium was in the first six</td><td>Still required with systemic estrogen if you have a uterus</td></tr><tr><td>Combination products</td><td>Same</td><td>Convenient; less flexible for adjusting each hormone</td></tr></table>
<p>For a practical comparison of the routes, including the 2026 patch shortage, see <a href="/hrt/articles/estrogen-patch-vs-pill">estrogen patch vs pill</a>.</p>`,
    },
    {
      heading: "What did the medical societies say?",
      body: `<p><strong>Broad agreement on vaginal estrogen, measured support for systemic therapy, and clear warnings against reading the change as a green light for everyone.</strong></p>
<h3>The Menopause Society</h3>
<p>The society ${ext(SRC.namsComment, "agreed")} with removing the box from low-dose vaginal estrogen for genitourinary symptoms, saying the warning had likely kept women from a safe and effective treatment, and restated its position that systemic therapy calls for an individualized risk assessment, consistent with its ${ext(SRC.nams2022, "2022 statement")}.</p>
<h3>WHI investigators</h3>
<p>JoAnn Manson, a lead WHI investigator and past president of the Menopause Society, told ${ext(SRC.cnn, "CNN")} the change was overdue, which is notable coming from one of the scientists whose work produced the original box. Other WHI researchers pushed back on some of the broader health claims made around the announcement.</p>
<h3>ACOG</h3>
<p>ACOG president Steven Fleischman commended the change for low-dose vaginal estrogen, then drew a line: systemic estrogen has a different safety profile, longer use may still carry a slightly higher breast cancer risk depending on age and history, and the decision belongs in an individualized conversation, as ${ext(SRC.bcoReact, "Breastcancer.org reported")}.</p>
<h3>Oncology</h3>
<p>The American Society of Clinical Oncology stated that systemic hormone therapy remains contraindicated after breast cancer. Breast oncologists quoted by ${ext(SRC.bcoReact, "Breastcancer.org")} noted that the FDA gave no specific guidance for survivors, which left patients asking.</p>
<h3>Advocates</h3>
<p>The ${ext(SRC.swhr, "Society for Women's Health Research")} celebrated the removal and cautioned against treating it as the removal of all warnings.</p>
<table><tr><th>Organization</th><th>Position</th></tr><tr><td>FDA / HHS</td><td>Removed the three boxed items; kept endometrial cancer for estrogen alone; added timing language</td></tr><tr><td>The Menopause Society</td><td>Agreed for vaginal estrogen; individualized decisions for systemic therapy</td></tr><tr><td>ACOG</td><td>Welcomed the vaginal change; systemic therapy still needs individualized counseling; criticized the use of a panel instead of an advisory committee</td></tr><tr><td>ASCO</td><td>Systemic HRT remains contraindicated after breast cancer</td></tr><tr><td>Society of Gynecologic Oncology</td><td>The retained endometrial box shows cancer considerations remain valid</td></tr><tr><td>SWHR</td><td>Celebrated the change; warned against reading it as "no warnings"</td></tr></table>
<p>The common ground across every statement: vaginal estrogen should never have shared the box with pills, systemic therapy suits many healthy women with symptoms near menopause, and the decision is individual.</p>`,
    },
    {
      heading: "What were the main criticisms of the decision?",
      body: `<p><strong>Mostly about process and messaging rather than the underlying science: an informal panel instead of a formal advisory committee, and public statements that went further than the evidence.</strong></p>
<h3>Process</h3>
<ul><li>Major label changes usually follow a public advisory committee with voting members and conflict-of-interest screening. ACOG argued a two-hour panel did not meet that bar.</li><li>The July panel was described as largely of one view; dissenting experts were, critics said, under-represented.</li><li>Commentators summarized by ${ext(SRC.ajmc, "AJMC")} argued that systemic HRT labeling changes normally follow a more extensive and transparent review.</li></ul>
<h3>Messaging</h3>
<ul><li>Some officials' remarks implied population-level benefits for heart disease or dementia that no guideline supports. The Menopause Society does not recommend HRT for preventing either.</li><li>Framing the WHI as discredited misread a trial whose core findings still hold for the women it studied.</li><li>Breast cancer survivors were left to parse headlines without specific guidance.</li></ul>
<p>Both camps can be partly right. The 2002-era box was outdated and discouraged appropriate treatment, and the manner of the change could have been more rigorous. For an individual woman, the practical question is what the evidence says about her own situation, which is where the rest of this guide goes.</p>`,
    },
    {
      heading: "So is HRT safe now?",
      body: `<p><strong>HRT is no safer than it was the day before the announcement. What changed is the recognition that for healthy women under 60 or within 10 years of menopause with bothersome symptoms, the benefits generally outweigh the risks, and that for women with certain histories or who start much later, they may not.</strong></p>
<p>That position is not new. The Menopause Society's ${ext(SRC.nams2022, "2022 statement")} reached it before the FDA moved: a favorable benefit-risk ratio for treating hot flashes and preventing bone loss in women under 60 or within 10 years of menopause without contraindications, and a less favorable one for women who start more than 10 years out or after 60, because the absolute risks of coronary disease, stroke, clots and dementia are higher.</p>
<h3>Benefits</h3>
<ul><li>The most effective treatment for hot flashes and night sweats</li><li>Better sleep when night sweats are the cause</li><li>Effective relief of vaginal dryness and genitourinary symptoms</li><li>Prevention of bone loss and fewer fractures</li><li>For many women, a return to functioning at work and at home</li></ul>
<h3>Risks that remain</h3>
<ul><li><strong>Blood clots</strong>, higher with oral estrogen than skin routes</li><li><strong>Stroke</strong>, a small increase, mostly with oral therapy and in older women</li><li><strong>Breast cancer</strong>, a small increase with combined therapy that rises with years of use</li><li><strong>Endometrial cancer</strong> with estrogen alone in a woman with a uterus, prevented by a progestogen</li><li><strong>Gallbladder disease</strong>, higher with oral estrogen</li></ul>
<p>Your own balance turns on age, time since your last period, your symptoms, your personal and family history, blood pressure, weight, smoking, and which hormones by which route. That is precisely why a single box failed, and why the replacement is a conversation rather than a blanket answer. <a href="/hrt/articles/is-hrt-safe">Is HRT safe?</a> walks through each risk.</p>`,
    },
    {
      heading: "Where does the breast cancer evidence stand?",
      body: `<p><strong>Combined estrogen-plus-progestogen therapy is associated with a small increase in breast cancer risk that grows with duration and falls after stopping. Estrogen alone, in women without a uterus, showed no increase in the WHI and a lower rate in long-term follow-up. Small is not zero.</strong></p>
<ul><li><strong>Combined therapy:</strong> about 8 more invasive breast cancers per 10,000 women per year in the 2002 results, on conjugated estrogens plus medroxyprogesterone acetate.</li><li><strong>Estrogen alone:</strong> no increase, and fewer cases than placebo in long-term follow-up, as summarized in the ${ext(SRC.jamaWhi, "2024 <em>JAMA</em> review")}.</li></ul>
<p>Many clinicians put the combined-therapy increase in the same range as other common risk factors, such as regular alcohol use or obesity after menopause. That context helps you weigh it against the benefit you are getting; it does not erase it. Observational data suggest micronized progesterone may carry less breast risk than some synthetic progestins, but that has not been confirmed in large randomized trials, so it is a reasonable question for your clinician rather than a settled fact.</p>
<p>If you have had breast cancer, nothing changed. ASCO restated that systemic hormone therapy remains contraindicated. Non-hormonal options for hot flashes and non-hormonal vaginal products come first; low-dose vaginal estrogen is sometimes considered together with the oncology team. Whatever you decide, keep up with mammography for your age and report breast changes promptly.</p>`,
    },
    {
      heading: "Where does the heart, stroke and clot evidence stand?",
      body: `<p><strong>Starting HRT before 60 or within 10 years of menopause does not appear to raise coronary heart disease, but HRT is not a heart-protection drug. Oral estrogen modestly raises clot and stroke risk; transdermal estrogen appears to carry less clot risk. Starting late raises cardiovascular risk.</strong></p>
<h3>Heart disease</h3>
<p>The WHI's extra coronary events were concentrated in older women and those far from menopause. For younger, healthy women the cardiovascular profile appears acceptable, but no guideline recommends prescribing HRT to prevent heart disease.</p>
<h3>Stroke</h3>
<p>About 8 more strokes per 10,000 women per year on combined therapy in 2002. Baseline stroke risk is low in the 50s and climbs with age, so the same relative increase means more events in older women. Lower doses and skin routes are thought to carry less risk, mostly on observational evidence.</p>
<h3>Blood clots</h3>
<p>Oral estrogen passes through the liver first and changes clotting factors. Transdermal estrogen at standard doses has not been linked to higher clot risk in large observational studies, which is why patches and gels are the usual choice for women with higher baseline risk, such as those with obesity. A personal history of clots still generally rules systemic HRT out.</p>
<p>Practical version: know your blood pressure, cholesterol, glucose and weight, because they move your heart risk more than HRT does; ask whether a transdermal route suits you; and start HRT for symptoms and bone, not for your arteries.</p>`,
    },
    {
      heading: "Does HRT cause or prevent dementia?",
      body: `<p><strong>Neither is established for women who start around menopause. The "probable dementia" warning came from the WHI Memory Study, which enrolled women 65 and older; starting hormone therapy at that age was associated with more dementia. HRT is not recommended to prevent dementia at any age.</strong></p>
<p>Whether starting earlier is neutral, protective or harmful for long-term brain health is unresolved. Observational studies point in different directions and randomized trials in younger women have been small and short. What we can say: perimenopausal brain fog is common, usually improves and is not dementia; treating night sweats improves sleep and concentration; starting systemic HRT for the first time in your late 60s is not advised for brain health; and the strongest evidence for protecting your brain is still blood pressure, blood sugar, cholesterol, exercise, hearing, sleep and not smoking. Be wary of anyone who promises more than that.</p>`,
    },
    {
      heading: "What about bone?",
      body: `<p><strong>Bone protection is one of HRT's best-proven benefits and the label change left it alone. The 2002 WHI results showed about 5 fewer hip fractures per 10,000 women per year on combined therapy.</strong></p>
<p>Bone loss speeds up in the years around the final period. The Menopause Society considers hormone therapy an appropriate way to prevent bone loss in women at elevated fracture risk who are under 60 or within 10 years of menopause, especially if they also have symptoms. Established osteoporosis is usually treated with other medicines. The US Preventive Services Task Force ${ext(SRC.uspstf, "recommends screening")} all women from 65 and younger postmenopausal women at increased risk. Protection fades after stopping HRT, so plan a bone review if you stop.</p>`,
    },
    {
      heading: "Why was the vaginal estrogen change the one everyone agreed on?",
      body: `<p><strong>Because low-dose vaginal estrogen is barely absorbed into the bloodstream, yet for years its package insert warned about breast cancer, stroke and dementia. Clinicians watched women read the leaflet and throw the tube away.</strong></p>
<p>Genitourinary syndrome of menopause, the cluster of dryness, pain with sex and urinary symptoms, affects a large share of postmenopausal women and tends to progress without treatment. Low-dose vaginal estrogen as a cream, insert or ring treats the tissue directly with tiny doses. The ${ext(SRC.namsComment, "Menopause Society")} and ACOG both singled this part of the decision out for support.</p>
<ul><li>If you have dryness, painful sex or recurrent urinary infections after menopause, this is worth raising; it can be used long term.</li><li>Many women who cannot take systemic HRT can use it; breast cancer survivors decide with their oncology team.</li><li>Non-estrogen prescription options exist too: vaginal DHEA (prasterone) and oral ospemifene, alongside moisturizers and lubricants.</li></ul>`,
    },
    {
      heading: "What does the change mean for you?",
      body: `<p><strong>It depends on where you are. Already on HRT: nothing about your treatment needs to change. Put off by the warnings: a good moment to revisit the question. Living with a contraindication: the advice is the same as before.</strong></p>
<h3>You already take HRT</h3>
<ul><li>Carry on as prescribed; the label change requires no action.</li><li>Use your next review to confirm the dose, route and progestogen still fit.</li></ul>
<h3>You avoided HRT because of the box</h3>
<ul><li>If you are under 60 or within 10 years of menopause, have symptoms that bother you and none of the contraindications above, it is reasonable to raise it again.</li><li>Bring your full history. Ask specifically about transdermal estradiol and micronized progesterone.</li></ul>
<h3>You stopped after 2002 and are now older</h3>
<ul><li>Starting systemic HRT for the first time after 60 or more than 10 years out carries higher risks and needs a careful, ideally specialist, conversation.</li><li>Low-dose vaginal estrogen can be started at any age.</li></ul>
<h3>You have had breast cancer, a clot, a stroke or a heart attack</h3>
<ul><li>Systemic HRT is still generally not recommended. Non-hormonal medicines for hot flashes (fezolinetant, elinzanetant, certain antidepressants, gabapentin, oxybutynin) and non-hormonal vaginal treatments are the main options; see the <a href="/hrt/articles/menopause-complete-guide">complete menopause guide</a>.</li></ul>
<h3>You are in perimenopause</h3>
<ul><li>HRT can start before periods stop, usually with a cyclical progestogen or a hormonal IUD. It is not contraception. See <a href="/hrt/articles/hrt-for-perimenopause">HRT for perimenopause</a>.</li></ul>
<h3>You had early or surgical menopause</h3>
<ul><li>Replacement until around the average age of natural menopause was recommended before the change and still is.</li></ul>`,
    },
    {
      heading: "Four scenarios, worked through",
      body: `<p><em>Illustrative examples, not real patients and not medical advice.</em></p>
<h3>49, perimenopausal, scared off by the box</h3>
<p>Severe night sweats, broken sleep, irregular periods, no history of clots or breast cancer, normal blood pressure. The evidence and the revised labels support a conversation about starting HRT, most likely transdermal estradiol with a progestogen suited to perimenopause (cyclical progesterone or a hormonal IUD, which also covers contraception), after her clinician reviews her history and screening.</p>
<h3>56, four years past menopause, on a patch since 52</h3>
<p>Feels well on estradiol and micronized progesterone. Nothing changes. At her yearly review her clinician checks blood pressure, mammogram and bleeding pattern and they decide together whether to continue. There is no arbitrary stop date.</p>
<h3>64, fourteen years past menopause, considering HRT for the first time</h3>
<p>Persistent hot flashes and vaginal dryness. The label change does not alter the evidence that starting systemic HRT this late carries higher absolute risk. Her clinician offers low-dose vaginal estrogen for the dryness, discusses non-hormonal options for the flashes, and reserves systemic therapy for a specialist discussion.</p>
<h3>52, breast cancer survivor</h3>
<p>Headlines made her wonder if HRT is now an option. It is not. Her team offers non-hormonal treatment for hot flashes, chosen around her tamoxifen, and non-hormonal vaginal products, with low-dose vaginal estrogen considered only with her oncologist.</p>
<p>The pattern: the change matters most for women who were good candidates all along and were deterred. For everyone else, the evidence-based advice looks much as it did.</p>`,
    },
    {
      heading: "Did HRT prescriptions rise after the change, and why were patches hard to find?",
      body: `<p><strong>Yes. Prescription data and manufacturers reported a sharp rise in demand, and several estradiol products, patches in particular, ran short in early 2026.</strong></p>
<p>Truveta Research figures reported by ${ext(SRC.emarketer, "eMarketer")} put estrogen-based hormone therapy prescriptions at roughly double their 2023 level, with a 26% rise among women aged 45 to 54 between July 2025 and February 2026. Amneal, which makes estradiol patches, described a significant increase in demand after the box came off and said it was raising production. In March 2026 ${ext(SRC.npr, "NPR")} reported a "mad scramble" to fill prescriptions, with CVS confirming shortfalls of several estrogen products. The FDA later said ${ext(SRC.fdaPatch, "estradiol patches remain available")}, that approved patch supply had nearly doubled over the prior year, and that availability still varies by pharmacy and brand.</p>
<h3>If your product is out of stock</h3>
<ul><li>Refill a week or two early.</li><li>Ask the pharmacist to check other branches or another approved brand at the same dose.</li><li>Ask your prescriber about an equivalent gel or spray rather than going without.</li><li>Do not change dose or route on your own, and do not let your progestogen lapse if you have a uterus.</li></ul>
<p>Even after the surge, use remains far below the late-1990s peak. Much of the rise is women who were symptomatic and untreated coming back to care.</p>`,
    },
    {
      heading: "How did public figures change the conversation?",
      body: `<p><strong>By saying the word out loud. Halle Berry, Naomi Watts, Michelle Obama and, in the UK, Davina McCall each helped pull menopause out of the whisper register in the years before the FDA acted.</strong></p>
<p>In May 2024, Halle Berry stood with a bipartisan group of senators at the US Capitol to back legislation directing $275 million to menopause research and education, ${ext(SRC.berry, "the Associated Press reported")}. "I'm in menopause, OK?" she said, describing how a doctor had first misdiagnosed her symptoms. Naomi Watts has described unexplained symptoms from age 36 and learning only later that she was in early menopause; her 2025 book <em>${ext(SRC.watts, "Dare I Say It")}</em> pairs her story with expert advice. Michelle Obama ${ext(SRC.obama, "recounted a hot flash")} aboard Marine One on her 2020 podcast with OB-GYN Sharon Malone. In the UK, Davina McCall's 2021 documentary is widely credited with sending women to their doctors; the ${ext(SRC.pj, "Pharmaceutical Journal")} reported a 370% rise in HRT prescribing in England over a decade and noted the shortages that followed.</p>
<p>Celebrity stories lower stigma and prompt questions. They are not treatment plans. What suited one woman's history may not suit yours.</p>`,
    },
    {
      heading: "Myths and facts after the black box removal",
      body: `<table><tr><th>Myth</th><th>Fact</th></tr><tr><td>"The FDA says HRT is risk-free now."</td><td>The three risks left the box and stayed in the label; contraindications are unchanged.</td></tr><tr><td>"All the warnings are gone."</td><td>The endometrial cancer box remains on systemic estrogen-alone products.</td></tr><tr><td>"The WHI was wrong."</td><td>Its findings hold for the women it studied; the problem was applying them to everyone.</td></tr><tr><td>"HRT prevents heart disease and dementia."</td><td>No guideline recommends it for either.</td></tr><tr><td>"I can drop the progesterone."</td><td>Not if you have a uterus and take systemic estrogen.</td></tr><tr><td>"Breast cancer survivors can take HRT now."</td><td>Systemic HRT remains contraindicated after breast cancer.</td></tr><tr><td>"Compounded hormones are FDA-approved now."</td><td>They never were and still are not.</td></tr><tr><td>"I'm over 60, so it's too late."</td><td>Starting late needs careful assessment; continuing earlier-started therapy is often reasonable; vaginal estrogen works at any age.</td></tr><tr><td>"Vaginal estrogen is as risky as pills."</td><td>It is minimally absorbed; its old box was the most criticized of all.</td></tr><tr><td>"If my doctor hesitates, they're behind the times."</td><td>Hesitation may reflect your history. Ask for the reasoning; see a menopause specialist if you feel dismissed.</td></tr></table>`,
    },
    {
      heading: "What should you ask your clinician?",
      body: `<ul><li>"Given my age and time since my last period, how do the benefits and risks balance for me, in numbers?"</li><li>"Does anything in my history change which treatment you would choose: clots, migraine, family breast cancer, blood pressure?"</li><li>"Would a patch or gel be safer for me than a pill?"</li><li>"Do I need a progestogen, and which one?"</li><li>"Are the products you're prescribing FDA-approved or compounded?"</li><li>"How will we judge whether it's working, and when do we review?"</li><li>"If HRT isn't right for me, what are my non-hormonal options?"</li><li>"Would low-dose vaginal estrogen help my dryness or urinary symptoms?"</li></ul>
<p>Bring the date of your last period, a list of symptoms, your medications and your screening dates. A two-week symptom diary makes the appointment far more productive.</p>`,
    },
    {
      heading: "Does the change apply to compounded, bioidentical or testosterone products?",
      body: `<p><strong>It applies to FDA-approved products, including FDA-approved bioidentical ones such as estradiol and micronized progesterone. It does not reach pharmacy-compounded hormones, which have no approved label, and it does not touch testosterone for women, which has no FDA-approved product in the US at all.</strong></p>
<p>Commissioner Makary said the change covers both bioidentical and synthetic approved hormones. Compounded preparations raise the same questions they always did about dose consistency and evidence. Testosterone prescribed to women, usually for low sexual desire after menopause, is off-label; the ${ext(SRC.testosterone, "2019 global consensus statement")} supports it only for postmenopausal hypoactive sexual desire disorder, at doses that restore premenopausal levels with blood monitoring, and advises against compounded products. Among the providers we rank, only <a href="/hrt/reviews/midi">Midi Health</a> prescribes it, in some states. See <a href="/hrt/articles/bioidentical-hormones-explained">bioidentical hormones explained</a>.</p>`,
    },
    {
      heading: "Has the change made HRT easier to get online?",
      body: `<p><strong>The rules did not change; the demand did. Online menopause clinics became one of the main ways newly willing women found a clinician without a months-long wait, and the standards for a good one are the same as ever: a full history, a licensed prescriber, FDA-approved options and real follow-up.</strong></p>
<p>HRT carries the same risks whether it is prescribed over video or across a desk. What varies is the care model. <a href="/hrt/reviews/winona">Winona</a> runs a physician-reviewed intake with messaging and ships per-product plans; <a href="/hrt/reviews/gala">Gala</a> bundles clinician, medication and shipping into one flat monthly price; <a href="/hrt/reviews/midi">Midi Health</a> offers video visits, bills most PPO insurance and prescribes to your own pharmacy. Our walkthrough of <a href="/hrt/articles/how-to-get-hrt-online">how to get HRT online</a> covers eligibility, costs and red flags, and the <a href="/hrt">HRT rankings</a> compare all three.</p>`,
    },
    {
      heading: "Does the label change affect non-hormonal treatments or insurance?",
      body: `<p><strong>No to both, directly. Non-hormonal medicines carry their own labels, and insurance coverage follows your plan's formulary, not the boxed warning.</strong></p>
<p>Fezolinetant (Veozah), a non-hormonal hot flash drug, ${ext(SRC.fdaVeozah, "gained a boxed warning")} in December 2024 about rare serious liver injury, with liver tests required before starting, monthly for three months and at months six and nine. Elinzanetant (Lynkuet), approved in October 2025, carries warnings about drowsiness and liver enzyme rises. For women who cannot take estrogen, these, certain antidepressants, gabapentin, oxybutynin, cognitive behavioral therapy and clinical hypnosis remain real options. On cost, generic estradiol and micronized progesterone are often on low formulary tiers; brand products may need prior authorization. If your preferred product is out of stock, your plan may cover an equivalent.</p>`,
    },
    {
      heading: "Checklist before you start or restart HRT in 2026",
      body: `<ul><li><strong>Your stage:</strong> date of your last period and how your cycles have changed.</li><li><strong>Your symptoms,</strong> ranked by how much they bother you.</li><li><strong>Your history:</strong> breast or other cancers, clots, stroke, heart disease, migraine with aura, liver disease, unexplained bleeding.</li><li><strong>Family history</strong> of breast cancer, clots and early heart disease.</li><li><strong>A recent blood pressure reading.</strong></li><li><strong>Screening up to date:</strong> mammogram, cervical screening.</li><li><strong>The route question:</strong> patch or gel versus pill, especially with clot risk or migraine.</li><li><strong>Endometrial protection</strong> confirmed if you have a uterus.</li><li><strong>FDA-approved or compounded</strong>, asked and answered.</li><li><strong>A review</strong> planned at about three months, then yearly.</li><li><strong>Warning signs</strong> that need urgent care: chest pain, sudden breathlessness, one swollen leg, sudden weakness or trouble speaking.</li><li><strong>Early refills</strong> in case your product runs short.</li></ul>`,
    },
    {
      heading: "What happens next?",
      body: `<p>More labels will carry the revised wording as submissions clear. The FDA says it is working with manufacturers on patch supply. Researchers on both sides agree the biggest gap is large, long-term randomized evidence on today's most-used regimens, transdermal estradiol with micronized progesterone, in women starting near menopause. Debate about the process will continue. Menopause training and access to clinicians who know the field, in person and online, are expanding. We will update this guide as the picture changes.</p>
<h3>How we researched this</h3>
<p>Primary sources wherever one exists: the FDA and HHS announcements and fact sheet, the FDA's panel page and February 2026 approvals, the 2002 WHI paper in <em>JAMA</em>, the 2024 <em>JAMA</em> review by WHI investigators, and the Menopause Society's 2022 statement and 2025 comment. Society reactions come from their own statements or from Breastcancer.org, CNN, Axios and AJMC. Demand and supply figures are NPR's reporting and Truveta data as reported by eMarketer; we label them as third-party figures. Public-figure statements are from the Associated Press, Penguin, TODAY and the Pharmaceutical Journal. Everything was checked on October 25, 2026. Where sources disagree we say so instead of picking a number. See <a href="/weight-loss/how-we-rank">how we rank</a> for our editorial standards.</p>`,
    },
    {
      heading: "The bottom line",
      body: `<p>Taking most of the black box off hormone therapy was the biggest change in how the US presents menopause treatment in more than twenty years. It reflects two decades of evidence that the risks seen in older women on an older regimen did not describe the woman who typically asks about HRT today.</p>
<p>The box moved. The risks stayed in the label, and they stay in the conversation: clots, stroke, breast cancer considerations and the need to protect the uterus. The best reading of the evidence is what the specialist societies have said for years. For a healthy woman with bothersome symptoms who starts before 60 or within 10 years of menopause, hormone therapy is usually a reasonable and effective choice. For a woman with certain histories, or who starts much later, other options may be safer. Low-dose vaginal estrogen is appropriate for most women with genitourinary symptoms, at any age.</p>
<p>If the old warnings stopped you from asking, this is a good time to ask, with your history, your priorities and the questions above in hand. Start with <a href="/hrt/articles/is-hrt-safe">Is HRT safe?</a>, the <a href="/hrt/articles/menopause-complete-guide">complete menopause guide</a>, or our comparison of licensed <a href="/hrt">online HRT providers</a>.</p>
<p class="cta-row"><a href="/hrt/articles/how-to-get-hrt-online">→ How to get HRT online: eligibility, costs and red flags</a></p>
<p class="cta-row"><a href="/hrt/articles/online-hrt-cost">→ How much HRT costs online: every provider's prices in one place</a></p>
<p><em>This article is general information, not medical advice. Sources are linked throughout and were checked on October 25, 2026; regulatory and product details may change. A licensed clinician who knows your history should help you decide what, if any, treatment is right for you.</em></p>`,
    },
  ],
};
