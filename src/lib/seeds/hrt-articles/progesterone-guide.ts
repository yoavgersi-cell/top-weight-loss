import type { ArticleData } from "../../config";

// Deepened progesterone guide (same URL as the Sept 30 stub, so rankings carry
// over). Idea shared with hrtwomen.com's Oct 25, 2026 rewrite; written fresh
// for the hub from the same sources: the FDA Prometrium label, the British
// Menopause Society's May 2026 progestogen guidance, the Menopause Society's
// 2022 statement, the E3N cohort, the progesterone hot-flash trials, the MJA
// review of progesterone creams and the FDA's 2026 labeling approvals.
// Facts checked 2026-10-25.

const ext = (href: string, text: string) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const SRC = {
  prometriumLabel: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/019781s026lbl.pdf",
  bms: "https://thebms.org.uk/wp-content/uploads/2026/05/14-NEW-BMS-TfC-Progestogens-and-endometrial-protection-MAY2026-A.pdf",
  mja: "https://www.mja.com.au/journal/2005/182/5/transdermal-progesterone-creams-postmenopausal-women-more-hype-hope",
  nams2022: "https://doi.org/10.1097/GME.0000000000002028",
  e3n: "https://www.hal.inserm.fr/inserm-00129104",
  prior2023: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10241804",
  fdaFeb:
    "https://www.fda.gov/news-events/press-announcements/fda-approves-labeling-changes-menopausal-hormone-therapy-products",
  jamaWhi: "https://doi.org/10.1001/jama.2024.6542",
};

export const PROGESTERONE_GUIDE: ArticleData = {
  slug: "progesterone-side-effects",
  title: "Progesterone for Menopause: Benefits, Side Effects & Doses",
  description:
    "Why progesterone goes with estrogen, micronized vs progestins, 100 vs 200 mg, side effects and fixes, bleeding, breast cancer, creams and hysterectomy.",
  category: "Treatments",
  readTime: "18 min read",
  publishedAt: "2026-09-30",
  updatedAt: "2026-10-25",
  heroColor: "#FBE9F0",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "If you have a uterus and take systemic estrogen, you need a progestogen, usually micronized progesterone, to stop the uterine lining overgrowing. That is the one HRT warning the FDA kept in a black box in 2025-2026.",
    "Micronized progesterone (Prometrium and generics) is chemically identical to your own progesterone. Progestins such as medroxyprogesterone acetate are synthetic relatives with different side-effect and, in observational data, breast-risk profiles.",
    "Two standard regimens: 200 mg at bedtime for 12 to 14 days a month (cyclical, with a monthly bleed) or 100 mg every night (continuous, usually no bleed once settled).",
    "The common side effects are drowsiness, dizziness, breast tenderness, bloating and PMS-like mood changes. Bedtime dosing and a change of type, route or schedule fix most of them.",
    "Over-the-counter progesterone creams are not considered reliable for protecting the uterus, and Prometrium contains peanut oil.",
  ],
  sections: [
    {
      heading: "What does progesterone do in menopause hormone therapy?",
      body: `<div class="qa"><strong>The short answer</strong>Progesterone's job in HRT is to protect the lining of the uterus. Estrogen on its own makes the lining (the endometrium) grow; progesterone holds that growth in check and prevents the overgrowth that can turn into endometrial cancer. It is not the part of HRT that treats hot flashes. That is estrogen. If you still have a uterus and take systemic estrogen, a progestogen is not optional.</div>
<p>Before menopause your ovaries make progesterone in the second half of each cycle, after ovulation, to prepare the lining for a pregnancy; when none happens its fall brings on your period. In perimenopause many cycles skip ovulation and produce little or no progesterone, which is one reason periods turn heavy and erratic. After menopause the body makes very little.</p>
<p>Take estrogen for symptoms and the lining responds as it did to your own estrogen: it thickens. Left unbalanced, that thickening can progress to hyperplasia and, over years, cancer. A progestogen prevents it. Everything else in this guide follows from that one fact.</p>
<h3>Three words that get mixed up</h3>
<ul><li><strong>Progesterone</strong>: the hormone your body makes. "Micronized progesterone" is a manufactured version with the identical molecule.</li><li><strong>Progestin</strong>: a synthetic compound that acts on progesterone receptors but has a different structure (medroxyprogesterone acetate, norethindrone acetate, levonorgestrel, drospirenone).</li><li><strong>Progestogen</strong>: the umbrella term for both.</li></ul>
<table><tr><th>Question</th><th>Short answer</th></tr><tr><td>Who needs it?</td><td>Women with a uterus taking systemic estrogen</td></tr><tr><td>Who usually does not?</td><td>Women after hysterectomy (with exceptions) and most women on low-dose vaginal estrogen only</td></tr><tr><td>Most common form</td><td>Oral micronized progesterone, 100 mg or 200 mg capsules</td></tr><tr><td>Typical regimens</td><td>200 mg nightly for 12-14 days a month, or 100 mg nightly</td></tr><tr><td>Most common side effect</td><td>Drowsiness, which is why it is taken at bedtime</td></tr><tr><td>Main caution</td><td>Prometrium contains peanut oil</td></tr></table>`,
    },
    {
      heading: "Why do you need progesterone with estrogen?",
      body: `<p><strong>Because unopposed estrogen raises endometrial cancer risk in women with a uterus, and a progestogen prevents it. This is settled enough that when the FDA removed most of HRT's boxed warnings in 2025-2026, it kept this one on systemic estrogen-alone products.</strong></p>
<p>The lesson dates to the 1970s, when estrogen alone was widely prescribed and studies found a several-fold rise in endometrial cancer. Adding a progestogen became standard and the excess risk largely disappeared. The British Menopause Society's ${ext(SRC.bms, "2026 guidance on progestogens and endometrial protection")} specifies progestogen for 12 to 14 days a month on a sequential regimen or every day on a continuous one; the Menopause Society's ${ext(SRC.nams2022, "2022 position statement")} says the same in American terms.</p>
<h3>"Adequate" is a real word here</h3>
<p>Protection depends on the type of progestogen, the dose and the number of days a month. Too little, or too few days, may not fully protect the lining, which is why the doses are not arbitrary and why skipping or trimming your progestogen while continuing estrogen is the one change you should never make alone. No regimen is perfect, either: bleeding that is heavy, that persists past the first months of continuous treatment, or that starts after a long bleed-free stretch needs reporting.</p>
<p>The story behind the retained black box is in our guide to the <a href="/hrt/articles/hrt-black-box-warning-removed">HRT black box warning removal</a>.</p>`,
    },
    {
      heading: "Who needs progesterone, and who doesn't?",
      body: `<p><strong>You need a progestogen if you have a uterus and take systemic estrogen by pill, patch, gel or spray. You usually do not if you have had a hysterectomy or use only low-dose vaginal estrogen. The exceptions matter.</strong></p>
<table><tr><th>Your situation</th><th>Progestogen?</th></tr><tr><td>Uterus plus systemic estrogen</td><td><strong>Yes</strong></td></tr><tr><td>Hysterectomy plus systemic estrogen</td><td>Usually no</td></tr><tr><td>Hysterectomy done for endometriosis</td><td>Sometimes; a progestogen may be advised so estrogen does not stimulate remaining endometriosis</td></tr><tr><td>Subtotal hysterectomy with the cervix kept</td><td>Ask; some endometrial tissue may remain</td></tr><tr><td>Endometrial ablation</td><td>Yes; islands of lining can survive the procedure</td></tr><tr><td>Low-dose vaginal estrogen only</td><td>Usually no</td></tr><tr><td>Levonorgestrel IUD in place</td><td>The IUD may be your progestogen; confirm with your clinician</td></tr></table>
<p>If you are not sure which row you are in, for instance whether your cervix was removed or why your hysterectomy was done, check your surgical records before you start estrogen.</p>`,
    },
    {
      heading: "Micronized progesterone vs progestins: what is the difference?",
      body: `<p><strong>Micronized progesterone is the same molecule your ovaries made. Progestins are synthetic compounds that do the same job on the uterus with different side effects, different effects on mood and lipids and, in observational research, possibly different breast cancer risk.</strong></p>
<table><tr><th>Progestogen</th><th>Type</th><th>Typical use</th><th>Notes</th></tr><tr><td><strong>Micronized progesterone</strong> (Prometrium, generics)</td><td>Body-identical</td><td>Oral capsule, cyclical or continuous</td><td>Sedating; contains peanut oil; the usual first choice today</td></tr><tr><td><strong>Medroxyprogesterone acetate</strong></td><td>Progestin</td><td>Tablets; the WHI progestin</td><td>Higher breast cancer risk with estrogen in the WHI</td></tr><tr><td><strong>Norethindrone acetate</strong></td><td>Progestin</td><td>Combination tablets and patches</td><td>Effective endometrial protection</td></tr><tr><td><strong>Levonorgestrel</strong></td><td>Progestin</td><td>Hormonal IUD; some patches</td><td>The IUD delivers it mainly to the uterus</td></tr><tr><td><strong>Drospirenone</strong></td><td>Progestin</td><td>Some combination products</td><td>Distinct side-effect profile</td></tr></table>
<h3>Why clinicians lean toward micronized progesterone</h3>
<ul><li>Body-identical and generally well tolerated.</li><li>Its sedative effect helps sleep when taken at bedtime.</li><li>In the French ${ext(SRC.e3n, "E3N cohort")}, estrogen with micronized progesterone was not associated with a significant rise in breast cancer over the period studied, while estrogen with synthetic progestins was. Observational, not randomized, but consistent across follow-ups.</li><li>A more neutral effect on cholesterol than some progestins.</li></ul>
<h3>When a progestin wins</h3>
<ul><li>Progesterone makes you too drowsy or dizzy.</li><li>You want one combined pill or patch.</li><li>A levonorgestrel IUD solves heavy perimenopausal bleeding and contraception at the same time.</li><li>Peanut allergy rules out Prometrium (some generics differ; ask the pharmacist).</li></ul>
<p>As with estrogen, "bioidentical" does not mean risk-free, and you do not need a compounded product to get body-identical progesterone. See <a href="/hrt/articles/bioidentical-hormones-explained">bioidentical hormones explained</a>.</p>`,
    },
    {
      heading: "What is micronized progesterone (Prometrium)?",
      body: `<p><strong>An FDA-approved oral form of progesterone, chemically identical to the body's own, sold as Prometrium and generics in 100 mg and 200 mg capsules.</strong> "Micronized" means the hormone is milled into very fine particles suspended in oil so it can be absorbed when swallowed. From the ${ext(SRC.prometriumLabel, "FDA prescribing information")}:</p>
<ul><li>Strengths: <strong>100 mg and 200 mg</strong>.</li><li>Capsules contain <strong>peanut oil</strong>; Prometrium is contraindicated in peanut allergy.</li><li>Blood levels peak within about three hours of a dose.</li><li>If swallowing is difficult, the label advises taking it standing, with a glass of water.</li></ul>
<p>Prometrium was among the first six menopause products whose labels the FDA ${ext(SRC.fdaFeb, "revised in February 2026")}, dropping the boxed warnings about cardiovascular disease, breast cancer and probable dementia. Those risks stay in the prescribing information.</p>`,
    },
    {
      heading: "Cyclical or continuous: how is progesterone taken?",
      body: `<p><strong>Two main patterns. Cyclical (sequential): 200 mg at bedtime for 12 to 14 days each month, usually with a withdrawal bleed afterward. Continuous combined: 100 mg every night, with spotting early on and usually no bleeding once things settle.</strong></p>
<table><tr><th></th><th>Cyclical</th><th>Continuous combined</th></tr><tr><td>Typical dose</td><td>200 mg nightly, 12-14 days a month</td><td>100 mg nightly</td></tr><tr><td>Bleeding</td><td>A bleed after each course</td><td>Irregular spotting for a few months, then usually none</td></tr><tr><td>Usually chosen</td><td>Perimenopause or early after menopause, while periods are recent</td><td>Clearly postmenopausal, often 12 months or more after the last period</td></tr><tr><td>Long-term note</td><td>The BMS flags a small endometrial risk with very long sequential use (over 5 years), depending on dose and duration</td><td>Generally preferred for long-term use</td></tr></table>
<p>Start continuous treatment too soon after your last period and your own fluctuating hormones produce unpredictable bleeding; a cyclical regimen gives a predictable bleed during that phase. Later, continuous treatment usually brings no bleeding at all, which most women prefer. If your estrogen dose goes up, your progestogen may need to go up too. Change neither on your own. If you are still having periods, see <a href="/hrt/articles/hrt-for-perimenopause">HRT for perimenopause</a>.</p>`,
    },
    {
      heading: "Oral, vaginal, IUD or cream: which forms actually protect the uterus?",
      body: `<p><strong>Oral micronized progesterone, progestin tablets, combination patches and the levonorgestrel IUD are established. Vaginal progesterone is used off-label by some clinicians. Over-the-counter and compounded progesterone creams are not considered reliable for endometrial protection.</strong></p>
<h3>Oral capsules</h3><p>The standard, with the most evidence for micronized progesterone. Bedtime.</p>
<h3>Vaginal progesterone</h3><p>Some clinicians prescribe the capsules or a gel vaginally, off-label in the US, to cut drowsiness or mood effects because more of the dose acts locally on the uterus. A specialist decision; ask why it is being recommended.</p>
<h3>Levonorgestrel IUD</h3><p>Releases progestin mainly into the uterus, so less reaches the rest of you. In perimenopause it also tames heavy bleeding and provides contraception. It needs an in-person fitting and a replacement schedule set for HRT use.</p>
<h3>Combination patches and tablets</h3><p>Estrogen and a progestin in one product. Convenient, less flexible for adjusting each hormone.</p>
<h3>Why creams are not enough</h3>
<p>Progesterone creams, whether "natural progesterone" from a shelf or a compounded preparation, are absorbed unpredictably through the skin. The British Menopause Society says ${ext(SRC.bms, "absorption is variable and may not provide sufficient endometrial protection")}, and a <em>Medical Journal of Australia</em> review concluded that ${ext(SRC.mja, "the claims for transdermal progesterone creams are overstated")}. If you take systemic estrogen with a uterus, do not rely on a cream. If you have been prescribed an estrogen-plus-progesterone body cream, ask your clinician how your lining is being protected. This applies to <a href="/hrt/reviews/winona">Winona</a>'s combined cream, which is compounded; Winona also sells FDA-approved progesterone capsules.</p>`,
    },
    {
      heading: "What are the benefits of progesterone in menopause?",
      body: `<p><strong>One proven benefit, uterine protection, and one welcome side effect, sleep. The evidence that progesterone on its own treats hot flashes is mixed.</strong></p>
<h3>Protecting the uterus</h3><p>The reason it is prescribed. A progestogen is what makes estrogen therapy safe for a woman with a uterus.</p>
<h3>Sleep</h3><p>Oral micronized progesterone is broken down into compounds that act on the brain's GABA system, the same target as some sleep and anti-anxiety medicines. At bedtime that sedation becomes a benefit for women whose sleep perimenopause has wrecked.</p>
<h3>Hot flashes: mixed</h3><p>A 2012 randomized trial in <em>Menopause</em> found 300 mg of oral micronized progesterone at bedtime reduced hot flashes and night sweats in healthy postmenopausal women against placebo. A later trial in perimenopausal women by the same group, published in ${ext(SRC.prior2023, "<em>Scientific Reports</em> in 2023")}, did not beat placebo on its primary outcome. Progesterone alone is not a first-line hot flash treatment; estrogen is far more effective and several non-hormonal options have stronger evidence.</p>
<h3>Heavy perimenopausal bleeding</h3><p>Progestogens, above all the levonorgestrel IUD, are used to control the heavy bleeding that anovulatory cycles produce.</p>
<h3>What it is not proven to do</h3><p>"Hormone balance," weight loss, anxiety, bone building, anti-aging. None of these is established, and progesterone should not stand in for evidence-based treatment of any of them.</p>`,
    },
    {
      heading: "What are the most common side effects of progesterone?",
      body: `<p><strong>Drowsiness and dizziness soon after a dose, breast tenderness, bloating, headache and PMS-like mood changes. Most ease within a few months, and bedtime dosing removes most of the daytime drowsiness.</strong></p>
<table><tr><th>Side effect</th><th>Why</th><th>What usually helps</th></tr><tr><td>Drowsiness, dizziness</td><td>Sedating breakdown products of oral progesterone</td><td>Bedtime dosing; no driving until you know its effect on you</td></tr><tr><td>Breast tenderness</td><td>Hormonal effect on breast tissue, often with estrogen</td><td>Usually settles; dose review if not</td></tr><tr><td>Bloating, fluid retention</td><td>Effects on fluid balance and the gut</td><td>Usually settles; a different progestogen or route</td></tr><tr><td>Low mood, irritability</td><td>Progestogen sensitivity in some women</td><td>Different progestogen, shorter or continuous regimen, vaginal route or an IUD</td></tr><tr><td>Headache</td><td>Hormone fluctuation</td><td>Continuous rather than cyclical may help</td></tr><tr><td>Spotting, irregular bleeding</td><td>The lining adjusting</td><td>Common early; report if heavy or persistent</td></tr><tr><td>Nausea</td><td>Gastrointestinal</td><td>Usually mild; a light snack if advised</td></tr></table>
<h3>Progestogen intolerance</h3><p>Some women feel distinctly worse during the progestogen days of a cyclical regimen: low, anxious, irritable, bloated, like severe PMS. That has a name and it has fixes: a different progestogen, a lower continuous dose, off-label vaginal use, or a levonorgestrel IUD that keeps the progestin mostly in the uterus. What it does not have is a safe shortcut. Do not stop the progestogen while continuing estrogen.</p>
<h3>Weight gain?</h3><p>Progesterone can cause bloating and fluid retention that feel like weight gain. It is not established as a cause of fat gain. Midlife weight change usually has several drivers: age, muscle loss, activity, sleep.</p>`,
    },
    {
      heading: "What are the serious side effects and warnings?",
      body: `<p><strong>Rare, but they need fast action: signs of a blood clot or stroke, a severe allergic reaction, or sudden vision changes. Unexplained bleeding and breast lumps need prompt, if less urgent, attention.</strong></p>
<h3>Emergency care</h3><ul><li>Chest pain, sudden shortness of breath, coughing blood</li><li>Pain, swelling or warmth in one leg</li><li>Sudden weakness or numbness, facial droop, slurred speech, severe headache or vision loss</li><li>Swelling of the face, lips or throat, difficulty breathing (relevant to peanut allergy with Prometrium)</li></ul>
<h3>Call your clinician</h3><ul><li>Unexplained, heavy or persistent vaginal bleeding</li><li>A breast lump or other breast change</li><li>Yellowing of the skin or eyes</li><li>New or worsening depression</li><li>Severe or persistent dizziness</li></ul>
<h3>Who should not take it</h3><p>Contraindications in the prescribing information include peanut allergy (Prometrium), unexplained vaginal bleeding, known or suspected breast cancer, active or past clots, stroke or heart attack, and liver disease, among others. Most overlap with estrogen's. Your clinician reviews the full list against your history.</p>`,
    },
    {
      heading: "Does progesterone increase breast cancer risk?",
      body: `<p><strong>Combined estrogen-plus-progestogen therapy is associated with a small rise in breast cancer risk that grows with years of use. Observational evidence suggests micronized progesterone may carry less of that risk than synthetic progestins, but large randomized trials have not confirmed it.</strong></p>
<ul><li><strong>WHI:</strong> the combined arm, which used medroxyprogesterone acetate, found about 8 more invasive breast cancers per 10,000 women per year. The estrogen-alone arm, in women without a uterus, showed no increase and, in long-term follow-up, fewer cases than placebo, as the ${ext(SRC.jamaWhi, "2024 <em>JAMA</em> review")} summarizes. That put the spotlight on the progestogen.</li><li><strong>E3N:</strong> among more than 54,000 French postmenopausal women, estrogen with synthetic progestins was associated with higher breast cancer risk (relative risk about 1.4) while estrogen with micronized progesterone was not (about 0.9) over the period studied. The authors suggested micronized progesterone may be preferable for short-term HRT.</li></ul>
<p>Caveats: E3N is observational, follow-up was relatively short, and the absolute change for most women starting HRT near menopause is small but not zero. The practical point is that if you have a uterus and take estrogen, the breast cancer question is about <em>which</em> progestogen, never <em>whether</em>. Ask your clinician whether micronized progesterone suits you, keep up with mammography and report breast changes. Women with a history of breast cancer are generally advised against systemic HRT.</p>`,
    },
    {
      heading: "Does progesterone help with sleep and anxiety?",
      body: `<p><strong>Many women find bedtime micronized progesterone helps them fall and stay asleep through its calming effect on GABA receptors. It is not approved as a sleep or anxiety treatment, and some women get the opposite: low mood or irritability.</strong></p>
<ul><li>If night sweats drive the insomnia, treating them with estrogen (plus progesterone if you have a uterus) usually helps most.</li><li>For persistent insomnia, cognitive behavioral therapy for insomnia is the first-line treatment.</li><li>If progesterone worsens your mood, say so; a different progestogen or route may suit you better.</li></ul>`,
    },
    {
      heading: "What bleeding is normal on progesterone?",
      body: `<p><strong>Cyclical: a withdrawal bleed a few days after each progesterone course. Continuous: irregular spotting for the first months, then usually nothing. Heavy, prolonged, or new bleeding after months without any needs reporting.</strong></p>
<table><tr><th>Regimen</th><th>Expected</th><th>Report</th></tr><tr><td>Cyclical</td><td>A regular bleed around the end of, or after, the progesterone days</td><td>Bleeding at other times; very heavy or prolonged bleeds</td></tr><tr><td>Continuous</td><td>Light, irregular spotting in the first few months</td><td>Bleeding that persists past the settling-in period, gets heavier, or starts after a bleed-free stretch</td></tr><tr><td>Any</td><td></td><td>Bleeding after sex; anything that worries you</td></tr></table>
<p>Unexpected bleeding on HRT is usually the regimen, but it can signal a problem in the lining, so it may need an ultrasound or another assessment, sometimes in person. On a continuous regimen after menopause most women stop bleeding once settled; in perimenopause, cyclical progesterone makes bleeding more predictable rather than stopping it, and a levonorgestrel IUD often reduces or stops periods.</p>`,
    },
    {
      heading: "Do you need progesterone after a hysterectomy?",
      body: `<p><strong>Usually not. No uterus, no lining to protect, so estrogen alone is standard. Exceptions: a hysterectomy done for endometriosis, or a partial hysterectomy that may have left endometrial tissue.</strong></p>
<p>Estrogen-alone therapy has the more reassuring evidence base: in the WHI, women without a uterus on estrogen alone did not have higher breast cancer risk. A progestogen you do not need adds side effects without benefit. If your hysterectomy was for endometriosis, some clinicians continue a progestogen for a time so estrogen does not stimulate what remains. Tell your clinician why the surgery was done and whether your ovaries and cervix were removed. If you are on progesterone after a hysterectomy and do not know why, ask.</p>`,
    },
    {
      heading: "Is 200 mg of progesterone a high dose?",
      body: `<p><strong>No. 200 mg at bedtime for 12 to 14 days a month is the standard cyclical dose. 100 mg nightly is the usual continuous dose. Higher doses are sometimes used with higher estrogen doses or to control bleeding.</strong> If 200 mg leaves you very drowsy or dizzy, say so rather than cutting the dose yourself; an inadequate dose may not protect the lining.</p>
<h3>Blood tests?</h3><p>Generally no. Doses are chosen on evidence about dose and duration, not titrated to a blood level, and progesterone levels in blood or saliva do not tell you whether your uterus is protected. Monitoring is clinical: your bleeding pattern, side effects and, when needed, an ultrasound. Be wary of services selling repeated hormone panels to "balance" progesterone.</p>
<h3>Missed a dose?</h3><p>Follow your leaflet and prescriber. In general, take a missed bedtime dose if you remember the same night; if it is nearly time for the next one, skip it rather than doubling. Repeated misses on a cyclical regimen cause irregular bleeding and can reduce protection. Set a nightly reminder.</p>`,
    },
    {
      heading: "Can you take progesterone without estrogen?",
      body: `<p><strong>Sometimes, at a clinician's discretion, for sleep or certain perimenopausal bleeding patterns. It is not a substitute for estrogen for hot flashes, vaginal dryness or bone, and you do not need it for uterine protection if you are not taking estrogen.</strong> Decide what you want treatment to achieve; estrogen-based HRT or a non-hormonal option may fit better. In perimenopause, remember HRT is not contraception; a levonorgestrel IUD can be both the progestogen and the contraceptive.</p>`,
    },
    {
      heading: "How can you get progesterone online?",
      body: `<p><strong>Licensed online menopause providers prescribe progesterone as part of an HRT regimen after reviewing your history.</strong></p>
<ul><li><a href="/hrt/reviews/winona">Winona</a> lists FDA-approved progesterone capsules from about $39 a month alongside its estradiol options; a board-certified physician reviews your intake.</li><li><a href="/hrt/reviews/gala">Gala</a> includes oral or vaginal progesterone in its one flat plan ($69 a month on its hormone-therapy page when we last captured it).</li><li><a href="/hrt/reviews/midi">Midi Health</a> prescribes to your own pharmacy after a video visit, so generic micronized progesterone may run through your insurance.</li></ul>
<p>Whichever you choose, confirm the progestogen dose and schedule match your estrogen, and know how to report bleeding or side effects. Prices are compared in <a href="/hrt/articles/online-hrt-cost">how much HRT costs online</a>, and the process in <a href="/hrt/articles/how-to-get-hrt-online">how to get HRT online</a>.</p>`,
    },
    {
      heading: "The bottom line on progesterone",
      body: `<p>If you have a uterus and take estrogen, a progestogen is what makes the estrogen safe. Micronized progesterone at bedtime is the usual choice today: body-identical, generally well tolerated and, in observational research, associated with less breast risk than some synthetic progestins. Drowsiness, bloating and mood changes are common and nearly always manageable by adjusting the dose, schedule, type or route.</p>
<p>Do not rely on a cream for protection, do not skip the progestogen while continuing estrogen, report unexpected bleeding, and if you have a peanut allergy ask about alternatives to Prometrium. For the wider picture, read <a href="/hrt/articles/what-is-hrt">What is HRT?</a>, <a href="/hrt/articles/is-hrt-safe">Is HRT safe?</a> and the <a href="/hrt/articles/menopause-complete-guide">complete menopause guide</a>.</p>
<p><em>This article is general information, not medical advice. Sources are linked throughout and were checked on October 25, 2026. A licensed clinician who knows your history should decide which progestogen, dose and schedule, if any, is right for you.</em></p>`,
    },
  ],
};
