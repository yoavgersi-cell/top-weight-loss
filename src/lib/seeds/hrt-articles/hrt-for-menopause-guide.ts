import type { ArticleData } from "../../config";

// ───── HRT for menopause: the complete 2026 guide (Nov 9, 2026) ─────
// Pillar hub for the hormone-therapy side of the HRT vertical (the menopause
// pillar, menopause-complete-guide, covers the life stage; this one covers the
// treatment). Built from Bing demand in Nov 2026: how long you can stay on HRT,
// the starting window, patch vs pill, bloating on patches, raising the dose,
// libido, HRT vs birth control, the black box removal, vaginal estriol, and
// Winona / Midi / "is Winona a scam" provider questions. Each section answers
// first and links the narrower spoke page.
// Sourcing rules: every external fact links a page read on 2026-11-09 (FDA
// press releases and drug pages, DailyMed labels for Veozah, Lynkuet and a
// once-weekly estradiol patch, ACOG's Oct 15, 2026 release and its compounded
// hormone consensus, NHS HRT pages, MedlinePlus). A few facts are reused from
// the hub's MHT 2026 article with that article's links (ACP Oct 6, 2026
// guideline; HHS Oct 30, 2026 patch labels; The Menopause Society's 2022
// statement and Nov 2025 comment; Harvard's WHI summary; the 2019 testosterone
// consensus) because menopause.org, hhs.gov, PubMed and JAMA blocked our
// fetches. NHS pages are UK guidance and are labelled as such.
// Provider facts and prices come only from src/lib/seeds/hrt.ts,
// hrt-guides.ts and the hrt-articles cost/legit pages, with their dates.
// No Trustpilot or Reddit content. No dosing instructions. Not medical review.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  // FDA (read 2026-11-09)
  fdaNov2025: "https://www.fda.gov/news-events/press-announcements/hhs-advances-womens-health-removes-misleading-fda-warnings-hormone-replacement-therapy",
  fdaRequest: "https://www.fda.gov/drugs/drug-alerts-and-statements/fda-requests-labeling-changes-related-safety-information-clarify-benefitrisk-considerations",
  fdaFeb2026: "https://www.fda.gov/news-events/press-announcements/fda-approves-labeling-changes-menopausal-hormone-therapy-products",
  fdaPatch: "https://www.fda.gov/drugs/drug-alerts-and-statements/fda-update-estradiol-transdermal-patch-availability",
  fdaGeneric: "https://www.fda.gov/news-events/press-announcements/fda-approves-once-weekly-generic-hormone-therapy-patch-women",
  fdaMenopause: "https://www.fda.gov/consumers/womens-health-topics/menopause",
  fdaVeozah: "https://www.fda.gov/drugs/drug-safety-and-availability/fda-adds-warning-about-rare-occurrence-serious-liver-injury-use-veozah-fezolinetant-hot-flashes-due",
  // DailyMed labels (read 2026-11-09)
  dmVeozah: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=cae9f798-24f9-4580-a4fc-e6c710cbda3c",
  dmLynkuet: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f42884ff-7dff-419c-8a0c-affe2ed73818",
  dmPatch: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e7e6da3b-8485-1382-61c9-e9b369018b98",
  // ACOG (read 2026-11-09)
  acogNews: "https://www.acog.org/news/2026/10/acog-expands-recommendations-for-management-of-menopause-symptoms/",
  acogCompounded: "https://www.acog.org/clinical/guidance/clinical-consensus/2023/11/compounded-bioidentical-menopausal-hormone-therapy",
  // NHS (UK guidance, read 2026-11-09)
  nhsAbout: "https://www.nhs.uk/medicines/hormone-replacement-therapy-hrt/about-hormone-replacement-therapy-hrt/",
  nhsTypes: "https://www.nhs.uk/medicines/hormone-replacement-therapy-hrt/types-of-hormone-replacement-therapy-hrt/",
  nhsBenefits: "https://www.nhs.uk/medicines/hormone-replacement-therapy-hrt/benefits-and-risks-of-hormone-replacement-therapy-hrt/",
  nhsSide: "https://www.nhs.uk/medicines/hormone-replacement-therapy-hrt/side-effects-of-hormone-replacement-therapy-hrt/",
  nhsWhen: "https://www.nhs.uk/medicines/hormone-replacement-therapy-hrt/when-to-take-hormone-replacement-therapy-hrt/",
  nhsOestrogen: "https://www.nhs.uk/medicines/oestrogen-tablets-patches-gel-and-spray/",
  nhsVaginalSide: "https://www.nhs.uk/medicines/hormone-replacement-therapy-hrt/vaginal-oestrogen/side-effects-of-vaginal-oestrogen/",
  nhsUtroSide: "https://www.nhs.uk/medicines/hormone-replacement-therapy-hrt/utrogestan-micronised-progesterone/side-effects-of-utrogestan/",
  // MedlinePlus (read 2026-11-09)
  medlineHrt: "https://medlineplus.gov/hormonetherapyformenopause.html",
  medlineEstrogen: "https://medlineplus.gov/druginfo/meds/a682922.html",
  // Reused from the hub's MHT 2026 article (hrt-articles/menopause-hormone-therapy-2026.ts)
  acpNews: "https://www.acponline.org/acp-newsroom/acp-recommends-hormonal-therapy-as-a-first-line-treatment-for-menopausal-vasomotor-symptoms",
  hhsOct30: "https://www.hhs.gov/press-room/fda-advances-menopause-care-hormone-therapy-labeling-access.html",
  tms2022: "https://pubmed.ncbi.nlm.nih.gov/35797481/",
  tmsFdaComment: "https://menopause.org/press-releases/the-menopause-society-comments-on-the-fda-announcement-on-hormone-therapy",
  whiHms: "https://hms.harvard.edu/news/comprehensive-results-hormone-therapy-trials",
  // Reused from hrt-articles/testosterone-for-women.ts
  testosteroneConsensus: "https://www.endocrine.org/news-and-advocacy/news-room/2019/coalition-issues-international-consensus-on-testosterone-treatment-for-women",
};

export const HRT_FOR_MENOPAUSE_GUIDE: ArticleData = {
  slug: "hrt-for-menopause-guide",
  title: "HRT for Menopause: The Complete 2026 Guide to Hormone Therapy",
  description:
    "HRT for menopause explained: who it suits, the starting window, how long to stay on it, patch vs pill, side effects, the label change and online care.",
  category: "Guide",
  readTime: "56 min read",
  publishedAt: "2026-11-09",
  updatedAt: "2026-11-09",
  heroColor: "#F5EEF6",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "HRT replaces the estrogen (plus a progestogen if you still have a uterus) that falls at menopause. ACOG's October 15, 2026 guideline recommends that, if chosen, systemic hormone therapy start before age 60 or within 10 years of menopause in women without contraindications.",
    "There is no fixed time limit. The NHS says there is no set limit on how long you can take HRT, with a yearly review, and the FDA asked makers in November 2025 to remove the 'lowest dose for the shortest time' recommendation from labels.",
    "Route matters: the NHS says HRT tablets can raise the risk of blood clots and slightly raise stroke risk, while patches, gels and sprays do not raise clot risk. Low-dose vaginal estrogen treats dryness but not hot flashes.",
    "The FDA removed heart disease, breast cancer and probable dementia from the boxed warning (first six products approved February 12, 2026), but kept the endometrial cancer box on systemic estrogen-alone products. The risks are still in the label, and a licensed clinician decides whether HRT suits you.",
  ],
  sections: [
    {
      heading: "What is HRT for menopause, and does it work?",
      body: `<div class="qa"><strong>The short answer</strong>Hormone replacement therapy (HRT), also called menopausal hormone therapy (MHT), is prescription estrogen, plus a progestogen if you still have a uterus, used to replace the hormones your ovaries stop making around menopause. It is the most effective treatment for hot flashes and night sweats, it treats vaginal dryness, and it helps prevent bone loss. In October 2026 both the American College of Physicians and ACOG put hormone therapy first for hot flashes in women without contraindications. It still carries real risks, including blood clots, stroke and breast-cancer considerations, so whether it suits you is a decision for you and a licensed clinician.</div>
<p>If you're reading this, you're probably somewhere between "I think this might be menopause" and "I've been on HRT for years and want to know if I can stay on it." This guide is written for both. The questions are connected: when you start affects how long you can stay on it, and the route you use affects your risks. Each section opens with a direct answer, then goes deeper and links to a narrower page.</p>
<p>Here is what we mean by the basic terms. The ${ext(S.medlineHrt, "US National Library of Medicine's MedlinePlus")} describes hormone therapy for menopause as taking estrogen, with or without progesterone or a similar hormone called a progestin, to replace some of the hormones the body no longer makes and relieve symptoms. The ${ext(S.nhsAbout, "NHS")} lists the symptoms HRT can help: hot flushes, night sweats, sleep problems, mood swings, anxiety and low mood, and vaginal dryness. It also says HRT helps prevent osteoporosis.</p>
<p>Does it work? For hot flashes and night sweats, the evidence is strong enough that two large US physician groups changed their guidance in the same month. On October 6, 2026, the American College of Physicians strongly recommended estrogen (with a progestogen if you have a uterus) as the first-line treatment for vasomotor symptoms (${ext(S.acpNews, "ACP")}). On October 15, 2026, ACOG published its Clinical Practice Guideline No. 13, its most comprehensive menopause guidance to date, with detailed advice on hormone therapy options and on timing (${ext(S.acogNews, "ACOG, October 15, 2026")}). The NHS says most women find their symptoms improve after a few days or weeks of taking HRT (${ext(S.nhsBenefits, "NHS")}).</p>
<p>Few women who might benefit actually use it. When it approved the first relabelled products on February 12, 2026, the FDA noted that about 41 million US women were aged 45 to 64 in 2020, yet only about 2 million women aged 46 to 65 received a hormone therapy prescription (${ext(S.fdaFeb2026, "FDA, February 12, 2026")}). Much of that gap goes back to the fear that followed the Women's Health Initiative results in 2002, covered below in the section on the black box warning. Later sections compare online providers, including <a href="/hrt/reviews/winona">Winona</a>, <a href="/hrt/reviews/midi">Midi Health</a> and <a href="/hrt/reviews/gala">Gala</a>.</p>
<p>If you'd like the wider picture of menopause first, the stages, symptoms and long-term health, start with our <a href="/hrt/articles/menopause-complete-guide">complete menopause guide</a> and come back. If you just want the plain-English basics of the treatment, <a href="/hrt/articles/what-is-hrt">what is HRT?</a> is the short version of this page.</p>`,
    },
    {
      heading: "What do perimenopause, menopause and postmenopause mean?",
      body: `<p><strong>Menopause is the point when your periods have stopped for 12 months in a row. Perimenopause is the run-up to it, often years long, when hormones swing and symptoms usually start. Postmenopause is everything after that 12-month mark.</strong> HRT can be used in perimenopause and after menopause; you don't have to wait for your periods to stop.</p>
<p>The FDA's consumer page on menopause puts it simply: a woman has reached menopause when she has not had a period for 12 months in a row, and during menopause the body slowly makes less estrogen and progesterone, often between ages 45 and 55 (${ext(S.fdaMenopause, "FDA, menopause page")}). The NHS gives the same 45-55 age range and adds that menopause can happen earlier (${ext(S.nhsAbout, "NHS")}).</p>
<p>What's the average age? Sources differ slightly. ACOG's October 2026 release says natural menopause happens on average at age 50 in the United States (${ext(S.acogNews, "ACOG")}), while the FDA's November 2025 labeling page gives the average US age as 51 (${ext(S.fdaRequest, "FDA")}). Either way, the important point for treatment is that bothersome hot flashes often start before the final period. The FDA's page notes that women typically experience them between about 45 and 55, much earlier than the average age of the women in the Women's Health Initiative trials, which was 63 (${ext(S.fdaRequest, "FDA")}).</p>
<h3>Why the stage matters for HRT</h3>
<ul><li><strong>Perimenopause.</strong> You can still get pregnant, periods can be unpredictable, and the type of HRT may differ. The NHS says you can take HRT during perimenopause and after your periods stop, and that you don't need to wait until your symptoms are severe or your periods have stopped completely (${ext(S.nhsWhen, "NHS")}). Our guide to <a href="/hrt/articles/hrt-for-perimenopause">HRT for perimenopause</a> goes through this in detail.</li><li><strong>Early or premature menopause.</strong> If periods stop before 40 (premature) or before 45 (early), the NHS says it is particularly important to take HRT or the combined pill to protect against conditions such as osteoporosis, usually until at least age 51 (${ext(S.nhsWhen, "NHS")}).</li><li><strong>Postmenopause.</strong> Periods have stopped. Any bleeding after menopause should be checked; the FDA tells women to always report vaginal bleeding after menopause, as it may be a sign of an urgent problem (${ext(S.fdaMenopause, "FDA")}).</li></ul>
<p>If you're not sure which stage you're in, that's normal, especially if hormonal contraception is masking your cycle. Our explainers on <a href="/hrt/articles/perimenopause-vs-menopause">perimenopause vs menopause</a> and <a href="/hrt/articles/perimenopause-symptoms">perimenopause symptoms</a> cover the signs. A clinician usually diagnoses menopause from your age, symptoms and cycle history rather than from a single blood test.</p>`,
    },
    {
      heading: "What's the difference between HRT, MHT, systemic and vaginal estrogen?",
      body: `<p><strong>HRT and MHT are the same thing: "menopausal hormone therapy" is the term US medical bodies now prefer, and "hormone replacement therapy" is the name most people search for. "Systemic" HRT reaches your whole body and treats hot flashes; "local" vaginal estrogen works mainly in the vagina and nearby tissues and treats dryness and urinary symptoms.</strong></p>
<p>The FDA uses both names side by side; its February 2026 release refers to "menopausal hormone therapy products, also known as hormone replacement therapy (HRT)" (${ext(S.fdaFeb2026, "FDA")}). MedlinePlus lists the aliases: ERT, estrogen replacement therapy, hormone replacement therapy, HRT, menopausal hormone therapy and MHT (${ext(S.medlineHrt, "MedlinePlus")}). We use "HRT" on this site because it's what most women type, and "MHT" when quoting guidance.</p>
<h3>A short glossary</h3>
<table>
<thead><tr><th>Term</th><th>What it means</th></tr></thead>
<tbody>
<tr><td>Estrogen (estradiol)</td><td>The main hormone in HRT. Estradiol is the form most often prescribed today, available as pills, patches, gels and sprays.</td></tr>
<tr><td>Progestogen</td><td>The umbrella word for progesterone and synthetic progestins. Added to estrogen if you have a uterus, to protect its lining.</td></tr>
<tr><td>Micronized progesterone</td><td>A progestogen that is chemically identical to the body's own progesterone, usually taken as a capsule. See our <a href="/hrt/articles/progesterone-side-effects">progesterone guide</a>.</td></tr>
<tr><td>Systemic HRT</td><td>Pills, patches, gels and sprays that raise estrogen throughout the body; used for hot flashes, night sweats and bone protection.</td></tr>
<tr><td>Vaginal (local) estrogen</td><td>Low-dose cream, tablet, ring or pessary placed in the vagina for dryness, discomfort and pain with sex.</td></tr>
<tr><td>Vasomotor symptoms (VMS)</td><td>Hot flashes and night sweats.</td></tr>
<tr><td>Genitourinary syndrome of menopause (GSM)</td><td>Vaginal, vulvar and urinary changes caused by lower estrogen; the FDA's term, alongside the older "vulvovaginal atrophy" (${ext(S.fdaRequest, "FDA")}).</td></tr>
<tr><td>Bioidentical</td><td>Hormones chemically identical to those the body makes. Many FDA-approved products are bioidentical; "bioidentical" does not mean compounded. See <a href="/hrt/articles/bioidentical-hormones-explained">bioidentical hormones explained</a>.</td></tr>
<tr><td>Compounded hormones</td><td>Custom mixes made by a pharmacy. They are not individually FDA-approved.</td></tr>
</tbody>
</table>
<p>The systemic-versus-local distinction matters more than almost anything else in this guide, because the risks are different. The NHS says vaginal estrogen does not carry the usual risks of HRT and does not increase the risk of breast cancer, and can be used without a progestogen even if you still have a womb. It also won't help hot flashes, mood swings or sleep problems (${ext(S.nhsTypes, "NHS")}). When the FDA rewrote labels in 2025-2026, it treated the two groups differently too: local vaginal estrogen labels were told to condense safety information and prioritise what is relevant to the local formulation (${ext(S.fdaRequest, "FDA")}).</p>
<p>One more naming trap: HRT for menopause is not the same as testosterone replacement therapy for men, even though both are "hormone replacement". Our explainer <a href="/hrt/articles/is-hrt-the-same-as-trt">is HRT the same as TRT?</a> covers the difference.</p>`,
    },
    {
      heading: "Who is HRT for, and who shouldn't take it?",
      body: `<p><strong>HRT is mainly for women with menopause symptoms that affect their life, especially hot flashes and night sweats, and for women whose menopause came early. It is usually avoided if you have had breast cancer or certain other cancers, a blood clot, a stroke or heart attack, liver disease, unexplained vaginal bleeding, or could be pregnant.</strong></p>
<p>The NHS says you can usually take HRT if you're having menopause symptoms (${ext(S.nhsAbout, "NHS")}). ACOG's 2026 guidance frames the decision as shared decision-making that considers your symptoms, your age, your medical history, your baseline risks of cardiovascular disease, breast cancer and blood clots, and your own goals (${ext(S.acogNews, "ACOG")}).</p>
<h3>Who should not use hormone therapy</h3>
<p>MedlinePlus says you should not use hormone therapy for menopause if you (${ext(S.medlineHrt, "MedlinePlus")}):</p>
<ul><li>are pregnant or think you may be pregnant</li><li>have unexplained vaginal bleeding</li><li>have had certain types of cancer</li><li>have had a stroke or heart attack</li><li>have had blood clots</li><li>have liver disease</li></ul>
<p>The NHS adds that HRT may not be suitable if you have a history of breast, ovarian or womb cancer, a history of blood clots (where patches or gels may be used instead of tablets), or untreated high blood pressure, which needs to be controlled first (${ext(S.nhsAbout, "NHS")}). An FDA-approved product label spells out its own contraindications. For example, the FDA's October 20, 2026 announcement of the first generic Climara Pro patch lists undiagnosed abnormal genital bleeding, breast cancer or a history of it, estrogen-dependent cancers, active or past deep vein thrombosis or pulmonary embolism, active or past arterial clotting disease, liver impairment or disease, and inherited clotting disorders (${ext(S.fdaGeneric, "FDA, October 20, 2026")}).</p>
<p>Migraine, high blood pressure, raised clot risk or a strong family history of breast cancer don't automatically rule HRT out, but they change which route and product make sense. If you can't or would rather not take hormones, see <a href="/hrt/articles/non-hormonal-menopause-treatment">non-hormonal menopause treatments</a>. A good HRT provider, online or in person, will take a full history before prescribing and will tell you plainly if hormones aren't right for you. That's one of the tests we apply to the providers we rank. If you want a fuller read on safety before you go further, see <a href="/hrt/articles/is-hrt-safe">is HRT safe?</a> and <a href="/hrt/articles/hrt-pros-and-cons">the pros and cons of HRT</a>.</p>`,
    },
    {
      heading: "What symptoms does HRT treat, and what won't it fix?",
      body: `<p><strong>HRT treats hot flashes, night sweats, the sleep problems they cause, vaginal dryness and pain with sex, and it helps prevent bone loss. It should not be used to prevent heart attacks, strokes or dementia, and the FDA says studies have not shown that it prevents ageing or wrinkles or increases sex drive.</strong></p>
<p>The FDA has approved hormone therapies for moderate to severe hot flashes, for vaginal dryness and discomfort, and for preventing bone loss (${ext(S.fdaFeb2026, "FDA, February 2026")}). The NHS lists the symptoms it can help as hot flushes, night sweats, sleep problems caused by menopause, anxiety and low mood caused by menopause, and vaginal dryness, and says HRT helps prevent osteoporosis and can improve muscle strength (${ext(S.nhsBenefits, "NHS")}).</p>
<h3>What HRT is not for</h3>
<p>The FDA's consumer page on menopause is blunt about this (${ext(S.fdaMenopause, "FDA menopause page")}):</p>
<ul><li>Do not use hormone therapy to prevent heart attacks or strokes.</li><li>Do not use hormone therapy to prevent memory loss or Alzheimer's disease.</li><li>Studies have not shown that hormone therapy prevents ageing and wrinkles or increases sex drive.</li></ul>
<p>That last point surprises people, and it's worth reading alongside the libido section below: HRT often helps sex indirectly, by treating dryness and pain and restoring sleep, but it isn't a desire drug. The NHS adds that research shows HRT has little or no effect on the risk of coronary heart disease, and that it's not known whether HRT reduces the risk of dementia (${ext(S.nhsBenefits, "NHS")}).</p>
<h3>Symptoms that often improve, and some that may not</h3>
<table>
<thead><tr><th>Symptom</th><th>What HRT tends to do</th><th>Worth knowing</th></tr></thead>
<tbody>
<tr><td>Hot flashes and night sweats</td><td>The most effective treatment available</td><td>Systemic HRT (pill, patch, gel, spray) is needed; vaginal estrogen won't help</td></tr>
<tr><td>Sleep problems from night sweats</td><td>Often improve as sweats settle</td><td>ACOG's 2026 guideline covers VMS-related sleep disturbance (${ext(S.acogNews, "ACOG")})</td></tr>
<tr><td>Vaginal dryness, pain with sex</td><td>Improves with systemic or vaginal estrogen</td><td>Low-dose vaginal estrogen is often enough on its own</td></tr>
<tr><td>Bone loss</td><td>Helps prevent osteoporosis</td><td>Particularly important if menopause comes before 45 (${ext(S.nhsBenefits, "NHS")})</td></tr>
<tr><td>Low mood and anxiety linked to menopause</td><td>Can improve</td><td>Persistent depression needs its own assessment and treatment</td></tr>
<tr><td>Weight gain</td><td>HRT is not a weight-loss treatment</td><td>The NHS says there's little evidence most types of HRT cause weight gain (${ext(S.nhsSide, "NHS")}); see <a href="/hrt/articles/does-hrt-cause-weight-gain">does HRT cause weight gain?</a></td></tr>
<tr><td>Hair thinning</td><td>Mixed</td><td>Several causes overlap; see <a href="/hrt/articles/hrt-and-hair-thinning">HRT and hair thinning</a></td></tr>
<tr><td>Low libido</td><td>Indirect help only</td><td>See the libido section below</td></tr>
</tbody>
</table>`,
    },
    {
      heading: "Is there a window when you should start HRT?",
      body: `<p><strong>Yes. US guidance now ties systemic HRT to a starting window: before age 60 or within 10 years of menopause. ACOG recommended this in October 2026, and the FDA said in November 2025 that its labeled recommendation would be to start systemic HRT within 10 years of menopause onset or before 60. Inside that window, the benefits generally outweigh the risks for healthy women with symptoms.</strong></p>
<p>The window comes from re-reading the Women's Health Initiative (WHI). The FDA has explained that the WHI's main aim was to test hormone therapy for chronic disease prevention across all postmenopausal ages, with an average participant age of 63, while women usually have bothersome hot flashes between about 45 and 55 (${ext(S.fdaRequest, "FDA")}). Later analyses split the results by age. Harvard Medical School's summary of the 2013 extended WHI analysis reported that among women in their 50s, fewer than 1 in 100 had an adverse event attributable to hormone therapy over five years, while risks were four to five times higher in older women (${ext(S.whiHms, "Harvard Medical School")}).</p>
<h3>What the official bodies say</h3>
<ul><li><strong>FDA, November 10, 2025:</strong> randomized studies show women who start HRT within 10 years of menopause (generally before 60) have lower all-cause mortality and fewer fractures; the labeled recommendation for systemic HRT will be to start within 10 years of menopause onset or before 60. The FDA adds that starting time and duration are decisions between the prescriber and the patient (${ext(S.fdaNov2025, "FDA")}).</li><li><strong>FDA labeling request:</strong> systemic product labels are to add consideration of starting hormone therapy for moderate to severe hot flashes in women under 60 or less than 10 years since menopause, and to add WHI data for women aged 50-59 (${ext(S.fdaRequest, "FDA")}).</li><li><strong>ACOG, October 15, 2026:</strong> if hormone therapy is chosen, start it before 60 or within 10 years of the start of natural menopause in people without contraindications (${ext(S.acogNews, "ACOG")}).</li><li><strong>The Menopause Society, 2022:</strong> for healthy women younger than 60 and within 10 years of menopause onset with no contraindications, the benefits of treating symptoms generally outweigh the risks (${ext(S.tms2022, "Menopause Society 2022 position statement")}).</li><li><strong>NHS (UK):</strong> if you're under 60, have menopause symptoms and aren't at high risk of breast cancer or blood clots, the benefits of HRT are likely to outweigh the risks (${ext(S.nhsBenefits, "NHS")}).</li></ul>
<h3>What the window does and doesn't mean</h3>
<p>The window is about starting systemic HRT, not stopping it. It doesn't mean HRT becomes dangerous on your 60th birthday, and it isn't a reason to rush if symptoms are mild. It does mean that "I'll tough it out and decide in ten years" is a choice with consequences. If you're in your late 40s or 50s and symptoms are affecting your sleep, work or relationships, now is a sensible time to have the conversation. Our dedicated page on <a href="/hrt/articles/when-to-start-hrt">when to start HRT</a> covers the timing question on its own.</p>`,
    },
    {
      heading: "Is it too late to start HRT after 60 or 10 years past menopause?",
      body: `<p><strong>Not automatically, but the case is weaker and the choice of product matters more. The FDA, ACOG and The Menopause Society all describe the benefit-risk balance as less favourable when systemic HRT is first started after 60 or more than 10 years after menopause. Vaginal estrogen for dryness is different and can be used at any age.</strong></p>
<p>The NHS explains why: as you get older, and particularly after 60, the risks of HRT may start to outweigh the benefits, partly because symptoms tend to ease with age and partly because breast cancer risk rises the longer you take combined HRT. If you want to start or continue HRT over 60, it says a doctor may recommend a low dose and patches or gel rather than tablets to reduce risk (${ext(S.nhsWhen, "NHS")}).</p>
<p>MedlinePlus's estrogen drug page also says women 65 or older should talk to their doctor about the risks and benefits, and that older women should not usually take oral estrogen unless they are also taking other hormones (${ext(S.medlineEstrogen, "MedlinePlus, estrogen")}).</p>
<h3>Starting late vs continuing</h3>
<p>Starting for the first time at 65 is not the same as continuing at 65 after starting at 52. The Menopause Society's 2022 statement said there is no data-based reason to stop routinely at 65, and that longer use should be for a documented reason, such as continuing hot flashes, with periodic reassessment (${ext(S.tms2022, "Menopause Society 2022")}). In other words, women who started inside the window are not pushed out of treatment by age alone.</p>
<h3>If you're past the window</h3>
<ul><li><strong>For vaginal dryness or pain with sex:</strong> low-dose vaginal estrogen is the usual first option, and the NHS says its dose is low enough that it's safe to use for a long time (${ext(S.nhsBenefits, "NHS")}).</li><li><strong>For hot flashes:</strong> ask about non-hormonal prescriptions, including the newer neurokinin receptor antagonists, alongside a careful discussion of whether low-dose transdermal estrogen is reasonable for you.</li><li><strong>For bone protection:</strong> there are other bone medicines and lifestyle measures; the FDA suggests asking your provider about them (${ext(S.fdaMenopause, "FDA")}).</li></ul>
<p>The honest answer is that it's an individual call. A clinician who specialises in menopause will look at your blood pressure, clot risk, family history and what you're trying to treat, and may well say yes, with conditions. Our <a href="/hrt/articles/how-long-can-you-stay-on-hrt">how long can you stay on HRT</a> page covers the continuing side of this question.</p>`,
    },
    {
      heading: "How long can you stay on HRT?",
      body: `<p><strong>There is no fixed maximum. The NHS says there is no set limit on how long you can take HRT and that you'll usually have a yearly review; it adds that most people take it for 2 to 5 years, though some take it longer. In November 2025 the FDA asked manufacturers to remove the "lowest dose for the shortest amount of time" recommendation from hormone therapy labels, and ACOG's 2026 guidance says decisions about stopping should be individualised.</strong></p>
<p>For years, women were told to use HRT at the lowest dose for the shortest time. That line has been softened. Here is where the main sources stood when we checked on November 9, 2026:</p>
<table>
<thead><tr><th>Source</th><th>What it says about duration</th></tr></thead>
<tbody>
<tr><td>FDA labeling request (November 10, 2025)</td><td>Remove the recommendation to use the lowest effective dose for the shortest amount of time from the boxed warning of all menopausal hormone therapies (${ext(S.fdaRequest, "FDA")})</td></tr>
<tr><td>FDA press release (November 10, 2025)</td><td>Starting time and duration of use are decisions made between the prescriber and the patient (${ext(S.fdaNov2025, "FDA")})</td></tr>
<tr><td>ACOG (October 15, 2026)</td><td>Decisions about when and how to discontinue should be individualised, based on ongoing risk factor assessment and discussion (${ext(S.acogNews, "ACOG")})</td></tr>
<tr><td>The Menopause Society (2022)</td><td>No routine stop at 65; longer use for a documented reason with periodic reassessment (${ext(S.tms2022, "Menopause Society")})</td></tr>
<tr><td>NHS (UK)</td><td>No fixed limit; yearly review; usually 2 to 5 years, sometimes longer; take it for as long as the benefits outweigh the risks (${ext(S.nhsWhen, "NHS")}, ${ext(S.nhsAbout, "NHS")})</td></tr>
<tr><td>MedlinePlus (updated July 24, 2026)</td><td>Still describes the lowest dose for the shortest time as the usual recommendation; suggests check-ins every 3 to 6 months at first, then yearly (${ext(S.medlineHrt, "MedlinePlus")})</td></tr>
</tbody>
</table>
<p>You'll notice that not every page has caught up. The FDA's own consumer menopause page, last updated before the label change, still says to use hormones at the lowest dose that helps and for the shortest time you need them (${ext(S.fdaMenopause, "FDA menopause page")}). That's a sign of how recently the official position moved, not a contradiction you need to resolve yourself.</p>
<h3>What decides your duration</h3>
<ul><li><strong>Your symptoms.</strong> The NHS says that if symptoms return when you try stopping and the benefits still outweigh the risks, you can keep taking HRT for longer (${ext(S.nhsWhen, "NHS")}).</li><li><strong>The type of HRT.</strong> Breast cancer risk with combined HRT rises the longer you take it and falls after you stop; estrogen-only HRT carries little or no increase (${ext(S.nhsBenefits, "NHS")}).</li><li><strong>Your age, route and health over time.</strong> A new diagnosis or a clot changes the picture.</li></ul>
<p>The model to aim for is an annual check-in, not a countdown. Menopause-focused online services build this in: <a href="/hrt/reviews/winona">Winona</a> includes physician messaging, and <a href="/hrt/reviews/midi">Midi Health</a> schedules follow-up visits. Our dedicated page on <a href="/hrt/articles/how-long-can-you-stay-on-hrt">how long you can stay on HRT</a> has more.</p>`,
    },
    {
      heading: "Will I have to be on HRT forever?",
      body: `<p><strong>No. HRT is something you can stop, and many women do after a few years. Stopping is best planned with your clinician: the NHS says reducing the dose gradually over 3 to 6 months is usually recommended, and that symptoms may come back for a while. If they return and don't settle within about 3 months, other treatments or a low dose of HRT can be discussed.</strong></p>
<p>The reality is flexible. Some women take it through the worst few years and stop; some find symptoms return and decide it's still worth it; some switch to vaginal estrogen alone once hot flashes fade but dryness doesn't.</p>
<h3>What happens when you stop</h3>
<p>According to the NHS (${ext(S.nhsWhen, "NHS, when to take HRT")}):</p>
<ul><li>Talk to your doctor before stopping.</li><li>You can stop suddenly, but reducing gradually over 3 to 6 months is usually recommended.</li><li>Symptoms may come back for a short time; this is less likely with a gradual reduction.</li><li>If symptoms return and don't go away after 3 months, a doctor may suggest other treatments or restarting a low dose of HRT.</li></ul>
<p>Two things are worth knowing. First, hot flashes don't always end on a schedule; in many women they last for years, which is one reason some women choose to stay on treatment. Second, vaginal symptoms tend to persist or worsen with time rather than fade. The NHS says vaginal estrogen doesn't carry the same risks as other types of HRT, so you can keep using it for as long as you need it (${ext(S.nhsWhen, "NHS")}).</p>
<p>Before stopping, ask whether to taper, how your progestogen should be reduced alongside the estrogen, and whether vaginal estrogen or a non-hormonal option would cover what's left. Don't stop abruptly because of a headline or a supply problem. The FDA's advice during the 2026 patch shortages was explicit: do not stop or change your medication without talking with your healthcare provider (${ext(S.fdaPatch, "FDA, September 3, 2026")}). Our menopause pillar also covers <a href="/hrt/articles/menopause-complete-guide">what happens if symptoms come back after stopping HRT</a>.</p>`,
    },
    {
      heading: "What's the difference between estrogen-only and combined HRT?",
      body: `<p><strong>If you have had a hysterectomy, you can usually take estrogen on its own. If you still have a uterus, you need a progestogen as well, because estrogen alone thickens the lining of the uterus and raises the risk of endometrial (womb) cancer. That risk is the one boxed warning the FDA kept on systemic estrogen-alone products.</strong></p>
<p>The NHS puts it simply: estrogen-only HRT is recommended if your womb has been removed; if you still have it, you need both estrogen and progestogen, which helps protect against womb cancer (${ext(S.nhsTypes, "NHS")}). MedlinePlus's estrogen page says the same thing more starkly: estrogen increases the risk of endometrial cancer, the longer you take it the greater the risk, and if you haven't had a hysterectomy you should be given a progestin with it. It also says to call your doctor immediately about abnormal or unusual vaginal bleeding during treatment (${ext(S.medlineEstrogen, "MedlinePlus")}).</p>
<p>The FDA's own announcement for the first generic Climara Pro, a once-weekly patch with both estradiol and a progestin, explains that the progestogen is included to reduce the risk of endometrial hyperplasia that can occur with estrogen alone (${ext(S.fdaGeneric, "FDA, October 20, 2026")}).</p>
<h3>Ways to get the progestogen</h3>
<ul><li><strong>Capsules or tablets.</strong> Micronized progesterone capsules are common in the US; see our <a href="/hrt/articles/progesterone-side-effects">progesterone guide</a>.</li><li><strong>A combined product.</strong> Pills or patches that contain both hormones, like Climara Pro and its new generic.</li><li><strong>A hormonal IUD.</strong> The NHS describes the Mirena coil as a way to provide the progestogen alongside estrogen tablets, patches, gel or spray; it can stay in place for up to 5 years and also works as contraception (${ext(S.nhsTypes, "NHS")}).</li></ul>
<h3>Sequential vs continuous</h3>
<p>The NHS describes sequential (cyclical) combined HRT, usually while you still have periods, with a withdrawal bleed after each progestogen course, and continuous combined HRT, usually once periods have stopped, where irregular spotting is common in the first 4 to 6 months (${ext(S.nhsSide, "NHS")}). Your clinician chooses the pattern.</p>
<p>One caution worth repeating: a progesterone cream from a compounding pharmacy is not interchangeable with progesterone capsules for protecting the uterus, as our <a href="/hrt/articles/is-winona-legit">Winona legitimacy review</a> notes. If you have a uterus, ask specifically how your plan protects the lining, and keep taking your progestogen whatever happens with your estrogen supply.</p>`,
    },
    {
      heading: "Patch, gel, spray, pill or vaginal: which HRT route is which?",
      body: `<p><strong>Estrogen can be swallowed (pills), absorbed through the skin (patches, gels, sprays) or placed in the vagina (creams, tablets, rings). Pills are simple but carry a higher clot risk than skin routes; patches, gels and sprays avoid that clot risk; vaginal estrogen treats local symptoms only.</strong></p>
<p>The NHS lists HRT as tablets, patches, gel, spray, vaginal rings, pessaries or cream, taken either cyclically or continuously, and says you may need to try different brands and methods to find the one that suits you (${ext(S.nhsTypes, "NHS")}). MedlinePlus notes that most US prescriptions are pills, with patches, gels or sprays, and vaginal creams, tablets or rings also available (${ext(S.medlineHrt, "MedlinePlus")}).</p>
<h3>HRT routes compared</h3>
<table>
<thead><tr><th>Route</th><th>How it's used</th><th>Pros</th><th>Cons</th><th>Treats</th></tr></thead>
<tbody>
<tr><td>Pill (tablet)</td><td>Usually once a day</td><td>Simple, familiar, widely available</td><td>Higher risk of blood clots than skin routes, and a slight rise in stroke risk (${ext(S.nhsBenefits, "NHS")})</td><td>Hot flashes, night sweats, bone</td></tr>
<tr><td>Patch</td><td>Stuck below the waist, changed once or twice a week depending on brand (${ext(S.nhsOestrogen, "NHS")})</td><td>No rise in clot risk; can avoid indigestion; good if you forget pills (${ext(S.nhsTypes, "NHS")})</td><td>May not stick well; redness or irritation; supply problems in 2026</td><td>Hot flashes, night sweats, bone</td></tr>
<tr><td>Gel</td><td>Spread on skin once a day</td><td>No rise in clot risk (${ext(S.nhsTypes, "NHS")})</td><td>Can take 5 minutes or more to dry</td><td>Hot flashes, night sweats</td></tr>
<tr><td>Spray</td><td>Sprayed onto inner arm or thigh once a day</td><td>No rise in clot risk (${ext(S.nhsTypes, "NHS")})</td><td>Wait 1 hour before bathing or showering</td><td>Hot flashes, night sweats</td></tr>
<tr><td>Vaginal cream, tablet, ring or pessary</td><td>Placed in the vagina</td><td>Very little reaches the bloodstream; no progestogen needed (${ext(S.nhsTypes, "NHS")})</td><td>Won't help hot flashes, mood or sleep</td><td>Dryness, irritation, pain with sex, some urinary symptoms</td></tr>
<tr><td>Hormonal IUD (progestogen only)</td><td>Fitted in the uterus</td><td>Provides the progestogen; also contraception (${ext(S.nhsTypes, "NHS")})</td><td>Can cause pain and bleeding</td><td>Protects the uterine lining; not a source of estrogen</td></tr>
</tbody>
</table>
<p>With gels and sprays, the NHS says not to let anyone, especially a child, touch the area until it's dry, and notes you may need to stop them 4 to 6 weeks before surgery because of clot risk, so tell your surgical team you're on HRT (${ext(S.nhsOestrogen, "NHS")}).</p>
<p>Which route is "best" depends on you: your clot risk, your skin, your routine and what you're treating. For a head-to-head on the two most common choices, read <a href="/hrt/articles/estrogen-patch-vs-pill">estrogen patch vs pill</a>.</p>`,
    },
    {
      heading: "Why a patch instead of a pill?",
      body: `<p><strong>Mainly blood clots. The NHS says HRT tablets can increase the risk of blood clots, though the risk is still very low, while patches, sprays and gels do not, because estrogen absorbed through the skin is safer. Tablets (but not patches, gel or spray) also slightly increase stroke risk. That's why clinicians often choose a patch or gel for women with clot risk factors, migraine, or who are older.</strong></p>
<p>Here's the NHS's position in its own words: "HRT patches, sprays and gels do not increase the risk of blood clots. This is because oestrogen is safer when it's absorbed into your body through your skin." It adds that if you're at risk of blood clots you'll usually be advised to use patches, spray or gel rather than tablets (${ext(S.nhsBenefits, "NHS")}). The Menopause Society's 2022 statement likewise said transdermal routes and lower doses may lower the risk of venous blood clots and stroke (${ext(S.tms2022, "Menopause Society 2022")}).</p>
<h3>Other reasons women choose a patch</h3>
<ul><li><strong>No daily pill to remember.</strong> Patches are changed once or twice a week, depending on the brand.</li><li><strong>Fewer stomach side effects.</strong> The NHS says patches can help avoid some side effects such as indigestion (${ext(S.nhsTypes, "NHS")}).</li><li><strong>Steadier delivery.</strong> Patches gradually release small amounts of hormone (${ext(S.nhsTypes, "NHS")}).</li><li><strong>Combined options.</strong> Some patches include a progestogen too, like Climara Pro and the generic the FDA approved in October 2026 (${ext(S.fdaGeneric, "FDA")}).</li></ul>
<p>A pill can still make sense if your skin reacts to adhesive, patches won't stay on, or you have no clot risk factors and prefer a daily routine; pills were also easier to find during the 2026 patch shortages.</p>
<h3>And if the patch is out of stock?</h3>
<p>Patches were hard to fill for much of 2026. On September 3, 2026 the FDA said it was working with all six patch manufacturers to increase supply, that patches remain available although specific products or brands may vary by pharmacy, and that supply of FDA-approved patches had nearly doubled in a year (${ext(S.fdaPatch, "FDA")}). Its advice: ask your pharmacist about another FDA-approved estradiol patch, ask your healthcare provider whether another estradiol product is appropriate, and don't stop or change your medication without talking to them (${ext(S.fdaPatch, "FDA")}). Don't cut patches or convert doses yourself. Our <a href="/hrt/articles/estrogen-patch-shortage">estrogen patch shortage guide</a> has the full picture and alternatives.</p>`,
    },
    {
      heading: "What is vaginal estrogen, and is it safer than systemic HRT?",
      body: `<p><strong>Vaginal estrogen is low-dose estrogen in a cream, tablet, ring or pessary placed in the vagina to treat dryness, irritation, pain with sex and some urinary symptoms. The NHS says it does not increase the risk of breast cancer, blood clots or other conditions, very little reaches the rest of the body, and it's safe to use long-term. It does not treat hot flashes.</strong></p>
<p>Genitourinary symptoms are often the ones women mention last, and the ones most likely to get worse over time.</p>
<h3>What the NHS says about vaginal estrogen</h3>
<ul><li>It comes as a cream, gel, vaginal tablet, pessary or ring, and doesn't need a progestogen even if you still have a womb (${ext(S.nhsTypes, "NHS")}).</li><li>Very little gets into the rest of the body, so it's safe to use for a long time (${ext(S.nhsBenefits, "NHS")}).</li><li>Common side effects include headache in the first days, unexpected bleeding in the first 3 to 6 months, vaginal discomfort or itching, and urinary or vaginal infections. Bleeding after 6 months, or heavy bleeding, should be reported (${ext(S.nhsVaginalSide, "NHS")}).</li></ul>
<h3>How US labels treat vaginal estrogen now</h3>
<p>The FDA's November 2025 request applied to all menopausal hormone therapies, systemic and vaginal: remove heart disease, breast cancer and probable dementia from the boxed warning, and remove endometrial cancer from the box except on systemic estrogen-alone drugs. For local vaginal products specifically, labels were to condense safety information and prioritise what's relevant to the local formulation (${ext(S.fdaRequest, "FDA")}). The first six products approved under the new labeling on February 12, 2026 included a topical vaginal estrogen (${ext(S.fdaFeb2026, "FDA")}). When the change was announced, The Menopause Society agreed with removing the box from low-dose vaginal estrogen (${ext(S.tmsFdaComment, "Menopause Society comment")}).</p>
<p>An FDA-approved estradiol patch label we read on DailyMed shows how this plays out in prescribing: when a doctor is treating only vaginal and vulvar symptoms, the label says to first consider topical vaginal products (${ext(S.dmPatch, "DailyMed, estradiol patch label")}).</p>
<p>Online providers handle vaginal estrogen routinely. Among those we rank, <a href="/hrt/reviews/gala">Gala</a> lists low-dose vaginal estradiol, <a href="/hrt/reviews/winona">Winona</a> sells a vaginal estrogen cream, and <a href="/hrt/reviews/midi">Midi Health</a> prescribes vaginal estrogen creams or rings to your pharmacy. If a cream is compounded rather than an FDA-approved product, the next section matters.</p>`,
    },
    {
      heading: "Does vaginal estriol carry a black box warning in the US?",
      body: `<p><strong>No FDA boxed warning applies to estriol, because there is no FDA-approved estriol product in the US to carry a label. The FDA says there are no FDA-approved drugs containing estriol, that marketed estriol products are compounded drugs, and that it has no evidence estriol is a "safer form of estrogen." FDA-approved vaginal estrogen products contain estradiol or conjugated estrogens, and their labels are the ones affected by the 2025-2026 boxed warning changes.</strong></p>
<p>This question comes up a lot because estriol is a licensed medicine in some other countries. The NHS, for example, lists "Estriol" among UK vaginal estrogen brand names (${ext(S.nhsVaginalSide, "NHS")}). US women who read British or European advice and then ask for estriol at home often find that it can only be supplied by a compounding pharmacy.</p>
<p>Here is the FDA's own answer, from its consumer menopause page: "FDA does not have evidence that drugs containing estriol are safe and effective, or are 'safer forms of estrogen.' There are no FDA-approved drugs containing estriol. Marketed drugs that contain estriol are compounded drugs, which are not FDA-approved." (${ext(S.fdaMenopause, "FDA menopause page")})</p>
<h3>What that means in practice</h3>
<ul><li><strong>No FDA label, so no box, but also no FDA review.</strong> The absence of a box on a compounded product is not reassurance.</li><li><strong>Approved alternatives exist.</strong> Low-dose vaginal estradiol creams, tablets and rings are FDA-approved, and The Menopause Society supported removing the boxed warning from low-dose vaginal estrogen (${ext(S.tmsFdaComment, "Menopause Society")}).</li><li><strong>ACOG's position on compounding.</strong> ACOG says compounded bioidentical hormone therapy should not be prescribed routinely when FDA-approved formulations exist (${ext(S.acogCompounded, "ACOG Clinical Consensus No. 6")}).</li></ul>
<p>If a provider offers you estriol, it's fair to ask why an approved vaginal estradiol product wouldn't work as well, and what the compounding pharmacy's quality standards are. Our hub's <a href="/hrt/articles/is-winona-legit">Winona legitimacy review</a> lists estriol among Winona's options; by the FDA's statement above, any estriol product in the US is compounded. That doesn't make a provider untrustworthy, but you should know what you're getting. More in <a href="/hrt/articles/bioidentical-hormones-explained">FDA-approved vs compounded hormones</a>.</p>`,
    },
    {
      heading: "What was the HRT black box warning removal?",
      body: `<p><strong>On November 10, 2025, HHS and the FDA announced they were removing heart disease, breast cancer and probable dementia from the boxed ("black box") warning on menopausal hormone therapy labels. The FDA approved the first six relabelled products on February 12, 2026, and three estradiol patches on October 30, 2026, for nine in total. The boxed warning for endometrial cancer stays on systemic estrogen-alone products.</strong></p>
<p>A boxed warning is the FDA's most prominent safety warning, printed at the top of a drug's prescribing information (${ext(S.fdaFeb2026, "FDA")}). Hormone therapy got one after the Women's Health Initiative. The FDA's own history: the WHI estrogen-plus-progestin trial was stopped in 2002 and the estrogen-alone trial in 2004, and in 2003 the FDA began approving class-wide labeling changes that eventually included a boxed warning on cardiovascular disorders, invasive breast cancer and probable dementia (${ext(S.fdaRequest, "FDA")}).</p>
<h3>The timeline</h3>
<table>
<thead><tr><th>Date</th><th>What happened</th></tr></thead>
<tbody>
<tr><td>July 17, 2025</td><td>FDA expert panel on the risks and benefits of menopausal hormone therapy, followed by a public comment period (${ext(S.fdaRequest, "FDA")})</td></tr>
<tr><td>November 10, 2025</td><td>HHS and FDA announce removal of the broad boxed warnings; FDA asks manufacturers to update labels. The FDA says it is not seeking to remove the endometrial cancer box from systemic estrogen-alone products (${ext(S.fdaNov2025, "FDA")})</td></tr>
<tr><td>February 12, 2026</td><td>First six products approved with the new labels, one from each category: systemic combined, systemic estrogen-alone, systemic progestogen-alone, and topical vaginal estrogen. 29 companies had submitted proposed changes (${ext(S.fdaFeb2026, "FDA")})</td></tr>
<tr><td>October 30, 2026</td><td>Updated labels approved for three estradiol patches, bringing the total to nine products (${ext(S.hhsOct30, "HHS")})</td></tr>
</tbody>
</table>
<h3>What the FDA asked labels to change</h3>
<p>From the FDA's labeling page (${ext(S.fdaRequest, "FDA")}):</p>
<ul><li><strong>All hormone therapies (systemic and vaginal), boxed warning:</strong> remove the language on cardiovascular disease, breast cancer and probable dementia; remove endometrial cancer except on systemic estrogen-alone drugs; remove the recommendation to use the lowest effective dose for the shortest time.</li><li><strong>All labels:</strong> remove the probable dementia warning.</li><li><strong>Systemic products:</strong> add consideration of starting therapy for moderate to severe hot flashes in women under 60 or less than 10 years since menopause; add WHI data for women aged 50-59; keep the endometrial cancer box on estrogen-alone products; keep the cardiovascular and breast cancer warnings in the label.</li><li><strong>Local vaginal products:</strong> condense safety information to what's relevant to the local formulation.</li></ul>
<p>Why the change? The FDA said the WHI's average participant was 63, unlike the younger women who start hormone therapy for hot flashes, and that the dementia data came from women aged 65 to 79 (${ext(S.fdaRequest, "FDA")}). Our full explainer, <a href="/hrt/articles/hrt-black-box-warning-removed">HRT black box warning removed</a>, covers the reactions and criticisms, and <a href="/hrt/articles/menopause-hormone-therapy-2026-what-changed">menopause hormone therapy in 2026: what changed</a> covers the autumn 2026 guidelines.</p>`,
    },
    {
      heading: "Does the label change mean HRT is risk-free now?",
      body: `<p><strong>No. The boxed warning moved, but the risks did not disappear. The FDA asked manufacturers to keep cardiovascular and breast cancer warnings in the body of systemic labels, kept the endometrial cancer box on systemic estrogen-alone products, and did not change who should avoid HRT. Many labels on pharmacy shelves also still carry the old box, because not every product has been relabelled yet.</strong></p>
<p>It helps to think of the change as moving information, not deleting it. The FDA's request explicitly said to retain information about cardiovascular diseases and breast cancer warnings in the labeling as a whole for systemic products (${ext(S.fdaRequest, "FDA")}). The contraindications in the labels, such as a history of breast cancer, blood clots or stroke, are unchanged.</p>
<h3>Why your leaflet may still show the old box</h3>
<p>The FDA said 29 companies submitted proposed labeling changes, and six products were approved in the first batch on February 12, 2026 (${ext(S.fdaFeb2026, "FDA")}); three patches followed on October 30, for a total of nine (${ext(S.hhsOct30, "HHS")}). That leaves many products still in the queue. As an example, the once-weekly estradiol patch label we read on DailyMed on November 9, 2026 (revised June 2025) still opened with "WARNING: ENDOMETRIAL CANCER, CARDIOVASCULAR DISORDERS, PROBABLE DEMENTIA and BREAST CANCER" (${ext(S.dmPatch, "DailyMed")}). If your box looks like that, nothing is wrong with your medicine; its label simply hasn't been updated yet.</p>
<h3>What still holds</h3>
<ul><li>Estrogen alone raises the risk of endometrial cancer in women with a uterus; a progestogen is needed (${ext(S.medlineEstrogen, "MedlinePlus")}).</li><li>For some women, hormone therapy may increase the risk of blood clots, heart attack, stroke, breast cancer and gallbladder disease, with the level of risk depending on the type, how long it's used and your history (${ext(S.medlineHrt, "MedlinePlus")}).</li><li>Hormone therapy should not be used to prevent heart disease or dementia (${ext(S.fdaMenopause, "FDA")}).</li><li>Who should not take it is unchanged: certain cancers, past clots, stroke or heart attack, liver disease, unexplained bleeding or pregnancy (${ext(S.medlineHrt, "MedlinePlus")}).</li></ul>
<p>What changed is the framing: the box no longer leads with risks that are small in absolute terms for a healthy 52-year-old, and labels now point to starting near menopause. For a balanced read of where the evidence stands, see <a href="/hrt/articles/is-hrt-safe">is HRT safe?</a></p>`,
    },
    {
      heading: "How do you choose an online menopause provider?",
      body: `<p><strong>Look for a real clinical gate (a licensed clinician reviews your full history before prescribing), FDA-approved options alongside any compounded ones, clear pricing and cancellation terms, and ongoing follow-up. Then choose the care model that fits you: an insurance-billed virtual clinic with video visits, or a cash-pay subscription that delivers medication to your door.</strong></p>
<p>Online menopause care can be excellent, and it can be thin if a low price comes from skipping the medical review. Here's the checklist we use on any provider.</p>
<h3>Green flags</h3>
<ul><li><strong>A licensed clinician makes the decision</strong> after a full medical history, and can say no.</li><li><strong>FDA-approved products are available</strong>, and the provider tells you which products are approved and which, if any, are compounded.</li><li><strong>A progestogen plan for women with a uterus</strong> is explained clearly.</li><li><strong>Follow-up is built in</strong>: messaging, scheduled reviews, dose and route changes.</li><li><strong>Prices and cancellation terms are published</strong> before you pay.</li><li><strong>Non-hormonal options</strong> are offered when hormones aren't right.</li></ul>
<h3>Red flags</h3>
<ul><li>Prescribing without a health history, or with no named, licensed clinicians.</li><li>"Hormone balancing" based on saliva tests.</li><li>Only compounded products, with no FDA-approved option.</li><li>Pressure to prepay for a year before you know whether treatment works.</li><li>Vague pricing, or a price that changes after the first month without saying so.</li></ul>
<h3>Which model suits you?</h3>
<table>
<thead><tr><th>If you...</th><th>Consider</th></tr></thead>
<tbody>
<tr><td>Have a commercial PPO plan and want a live conversation</td><td>An insurance-billed virtual clinic such as <a href="/hrt/reviews/midi">Midi Health</a></td></tr>
<tr><td>Want no appointments and home delivery</td><td>A cash-pay subscription such as <a href="/hrt/reviews/winona">Winona</a></td></tr>
<tr><td>Want one predictable monthly price</td><td>A flat-fee plan such as <a href="/hrt/reviews/gala">Gala</a></td></tr>
<tr><td>Have a complex history (past clot, breast cancer, unexplained bleeding)</td><td>A specialist who can examine you and coordinate with your other doctors; an online service may not be enough on its own</td></tr>
</tbody>
</table>
<p><strong>How we rank:</strong> our HRT ranking weighs the clinical gate and follow-up, the range of FDA-approved treatment options, how clearly pricing and terms are published, and how each provider handles insurance, as recorded in our provider reviews. Partner status does not change the facts we print, and we list each provider's weak points alongside its strengths. Step-by-step help is in <a href="/hrt/articles/how-to-get-hrt-online">how to get HRT online</a>, and the full field is on our <a href="/hrt">online HRT rankings</a>. Our three highest-ranked online menopause providers are below.</p>`,
    },
    {
      heading: "Winona vs Midi vs Gala: how do the top online HRT providers compare?",
      body: `<p><strong>Winona is our top pick: a menopause-only, physician-led service with a free consultation, published per-product prices and no video visit. Midi Health is the insurance option: video visits with menopause-trained clinicians, billed to most commercial PPO plans, with prescriptions sent to your pharmacy. Gala is the flat-price option: one monthly price for hormone therapy with no insurance involved.</strong></p>
<p>All three are legitimate US telehealth services where licensed clinicians review your history before prescribing. Facts below come from our provider reviews; prices are as published when we last checked, several are approximate, so confirm current rates.</p>
<table>
<thead><tr><th></th><th><a href="/hrt/reviews/winona">Winona</a> (#1)</th><th><a href="/hrt/reviews/midi">Midi Health</a> (#2)</th><th><a href="/hrt/reviews/gala">Gala</a> (#3)</th></tr></thead>
<tbody>
<tr><td>Care model</td><td>Online intake reviewed by a board-certified physician; no video visit; ongoing messaging</td><td>Scheduled video visits (about 30 minutes) with menopause-trained nurse practitioners or certified nurse midwives</td><td>Online assessment reviewed by a licensed provider; app for refills and messages</td></tr>
<tr><td>What it prescribes</td><td>Estrogen tablets, estrogen patch, estrogen and progesterone body creams, progesterone capsules, vaginal estrogen cream</td><td>Estradiol gels, creams, patches and pills; micronized progesterone; vaginal estrogen; non-hormonal prescriptions; testosterone in some states</td><td>Estradiol pill or patch, progesterone, vaginal estradiol, non-hormonal options</td></tr>
<tr><td>FDA-approved vs compounded</td><td>Tablets, patch and progesterone capsules FDA-approved; body creams compounded</td><td>Prescriptions filled at your own pharmacy</td><td>Ask which product you'll receive</td></tr>
<tr><td>Insurance</td><td>Not billed; FSA/HSA eligible</td><td>In-network with most commercial PPO plans; not HMO, Medicare or Medicaid</td><td>Not billed; FSA/HSA accepted</td></tr>
<tr><td>Price (as stored, dated)</td><td>Free consultation; $39-$149/month by product (creams and patch re-verified October 8, 2026)</td><td>About $50 a visit on average in-network (Midi's figure); self-pay $250 first visit, $150 follow-ups; medication via your plan (October 2026)</td><td>$69/month flat on its hormone-therapy page (captured October 8, 2026); exact plan shown at checkout</td></tr>
<tr><td>Delivery</td><td>Discreet home delivery; Winona says under 5 days</td><td>Your choice of pharmacy</td><td>Free discreet shipping in 1-2 days, per Gala</td></tr>
<tr><td>Best for</td><td>Women who've decided on HRT and want a dedicated, appointment-free service with transparent prices</td><td>Women with PPO coverage who want a live conversation and a broad menu, including non-hormonal care</td><td>Women who want an all-included monthly price without insurance paperwork</td></tr>
</tbody>
</table>
<h3>The honest trade-offs</h3>
<ul><li><strong>Winona</strong> is cash-only, doesn't prescribe testosterone, and its body creams are compounded, so ask which product you're prescribed and check your reorder settings. See the <a href="/hrt/articles/winona-cost">Winona cost guide</a>.</li><li><strong>Midi Health's</strong> costs depend on your plan and deductible, and most complaints we reviewed are about billing. Confirm coverage before booking; see the <a href="/hrt/articles/midi-cost">Midi cost guide</a>.</li><li><strong>Gala</strong> doesn't publish a per-product list, and its advertised figure has varied (a "from $79" headline has also appeared). Pay monthly rather than annually at first; see the <a href="/hrt/articles/gala-cost">Gala cost guide</a>.</li></ul>
<p>For head-to-heads, read <a href="/hrt/midi-vs-winona">Midi Health vs Winona</a>, <a href="/hrt/winona-vs-gala">Winona vs Gala</a> and <a href="/hrt/gala-vs-midi">Gala vs Midi Health</a>, or the three side by side in <a href="/hrt/articles/best-online-hrt-providers-compared">best online HRT providers compared</a>. The cards below show the three as we rank them.</p>`,
    },
    {
      heading: "What are the common side effects of HRT?",
      body: `<p><strong>The most common side effects are breast tenderness, headaches, nausea, bloating or stomach cramps, and irregular bleeding or spotting. They're usually mild and often settle within about 3 months, which is why the NHS suggests carrying on for at least 3 months if you can. Persistent or severe side effects are a reason to talk to your prescriber about the dose, type or route.</strong></p>
<p>The NHS says it's common to have no side effects or only mild ones, that side effects usually improve over time, and that side effects can resemble menopause symptoms, so it might not be your HRT causing them (${ext(S.nhsSide, "NHS")}).</p>
<h3>Side effects by hormone</h3>
<table>
<thead><tr><th>Hormone</th><th>Possible side effects (NHS)</th></tr></thead>
<tbody>
<tr><td>Estrogen</td><td>Headaches; breast pain or tenderness; unexpected vaginal bleeding or spotting; nausea; mood changes including low mood; leg cramps; mild rash or itching; diarrhoea; hair loss (${ext(S.nhsSide, "NHS")}). Patches can also cause skin irritation where they're stuck (${ext(S.nhsOestrogen, "NHS")})</td></tr>
<tr><td>Progestogen</td><td>Changes in periods including spotting; headaches; breast pain or tenderness; nausea; diarrhoea; tiredness or dizziness; mood changes including low mood; mild rash; acne (${ext(S.nhsSide, "NHS")})</td></tr>
<tr><td>Vaginal estrogen</td><td>Headache early on; unexpected bleeding in the first 3 to 6 months; vaginal discomfort or itching; urinary or vaginal infection; abdominal discomfort (${ext(S.nhsVaginalSide, "NHS")})</td></tr>
</tbody>
</table>
<p>The prescribing information for one FDA-approved once-weekly estradiol patch lists breast pain, upper respiratory tract infections, headaches, abdominal pain, pain and edema (swelling) as its most common adverse reactions, each in at least 10 percent of users in its trials (${ext(S.dmPatch, "DailyMed, estradiol patch label")}). Labels differ by product, so read the leaflet that comes with yours.</p>
<h3>Bleeding on HRT</h3>
<p>Irregular bleeding or spotting is common in the first few months and usually settles within 6 months, according to the NHS. On sequential combined HRT, a monthly withdrawal bleed is expected; on continuous combined HRT, irregular bleeding is common for the first 4 to 6 months. The NHS says to see a doctor if irregular bleeding lasts more than 6 months, gets heavier, or starts after you've had no periods for a while (${ext(S.nhsSide, "NHS")}). In the US, the FDA and MedlinePlus both say to report abnormal or unusual bleeding promptly (${ext(S.medlineEstrogen, "MedlinePlus")}).</p>
<h3>Managing side effects</h3>
<p>A prescriber might change the dose, the type of HRT, or the route; the NHS gives switching from tablets to patches as an example (${ext(S.nhsSide, "NHS")}). Don't make those changes yourself. Our <a href="/hrt/articles/hrt-side-effects">HRT side effects guide</a> covers what's common, what's manageable and what's serious, and the <a href="/hrt/articles/progesterone-side-effects">progesterone guide</a> covers the progestogen side in depth.</p>`,
    },
    {
      heading: "Why do HRT patches cause bloating?",
      body: `<p><strong>Bloating is a recognised side effect of estrogen, whatever the route. The patient information for one FDA-approved estradiol patch lists "stomach or abdominal cramps, bloating" and fluid retention among its common side effects. It often settles within the first few months; if it doesn't, the dose or the progestogen may need adjusting, which is your prescriber's call.</strong></p>
<p>Patches are the gentler route for clot risk and can avoid indigestion (${ext(S.nhsTypes, "NHS")}), but the estrogen still circulates, and bloating can come with it.</p>
<p>The once-weekly estradiol patch label we read on DailyMed lists these common side effects in its patient information: headache; breast tenderness or pain; irregular vaginal bleeding or spotting; stomach or abdominal cramps, bloating; nausea and vomiting; hair loss; fluid retention; and vaginal yeast infection (${ext(S.dmPatch, "DailyMed")}). Its list of most common reactions in trials includes abdominal pain and edema (${ext(S.dmPatch, "DailyMed")}).</p>
<h3>Is it the estrogen or the progestogen?</h3>
<p>It can be either. Progestogens are linked to several of the same complaints, including breast tenderness, nausea and mood changes (${ext(S.nhsUtroSide, "NHS, Utrogestan side effects")}). If your bloating comes and goes with a cyclical progestogen, mention that pattern; it's useful information for your prescriber.</p>
<h3>What to do about it</h3>
<p>If it's mild, give it time: the NHS suggests continuing for at least 3 months where possible (${ext(S.nhsSide, "NHS")}). Keep a short diary of when it happens, and talk to your prescriber if it's severe or lasts beyond 3 months; options include a different dose, progestogen or route. And don't assume it's weight gain: the NHS says there's little evidence most types of HRT make you put on weight (${ext(S.nhsSide, "NHS")}).</p>
<h3>When bloating isn't a side effect</h3>
<p>Persistent bloating, especially with pelvic pain, feeling full quickly or changes in bowel habit, shouldn't simply be put down to HRT. Get it checked, particularly if it's new after menopause. Swelling and pain in one leg is different again: the NHS lists it as a possible sign of a deep vein thrombosis that needs urgent advice (${ext(S.nhsOestrogen, "NHS")}).</p>`,
    },
    {
      heading: "What happens when your HRT dose is increased?",
      body: `<p><strong>HRT usually starts at a low dose and may be increased if symptoms persist. A higher dose can bring more relief, but it can also bring more estrogen-type side effects, such as breast tenderness, nausea and bleeding. That's why dose changes are made by your prescriber, usually after a review around 3 months in, never by doubling up yourself.</strong></p>
<p>The NHS says you'll usually start with a low dose that may be increased later, with a review appointment about 3 months after you start or change your HRT, then usually once a year (${ext(S.nhsAbout, "NHS")}). MedlinePlus says doctors may start low and increase if symptoms are still bothersome, or decrease if they're well controlled, and tells patients not to take more or less than prescribed (${ext(S.medlineEstrogen, "MedlinePlus")}).</p>
<h3>Side effects that can come with a higher dose</h3>
<p>The NHS notes that using too much estrogen can increase the risk of side effects such as breast tenderness, feeling sick and vaginal bleeding (${ext(S.nhsOestrogen, "NHS")}). In practice, women who've just had a dose increase most often notice:</p>
<ul><li>Breast tenderness or swelling</li><li>Nausea</li><li>Spotting or breakthrough bleeding</li><li>Headaches</li><li>Bloating or fluid retention</li></ul>
<p>Many of these settle as your body adjusts. If they don't, the answer may be a smaller step, a different route or a change in progestogen rather than going back to square one.</p>
<h3>The progestogen has to keep up</h3>
<p>If you have a uterus, an increase in estrogen may need a matching change in your progestogen to keep protecting the lining. This is one of the reasons dose changes belong with a clinician who knows your full regimen. Unexpected bleeding after a dose change should be reported, not ignored (${ext(S.medlineEstrogen, "MedlinePlus")}).</p>
<p>Don't adjust on your own: no doubling up, no cutting patches, and if you miss a dose, follow the leaflet; the NHS says not to take 2 doses to make up for a forgotten one (${ext(S.nhsOestrogen, "NHS")}).</p>
<p>Online providers make dose changes fairly easy: Winona offers physician messaging, Midi uses follow-up visits, and Gala says its price doesn't rise when your dose changes. See the <a href="/hrt/winona-vs-gala">Winona vs Gala</a> comparison for how the two cash-pay models handle changes.</p>`,
    },
    {
      heading: "What are the serious risks of HRT?",
      body: `<p><strong>The serious risks are blood clots, stroke, breast cancer and, for women with a uterus who take estrogen without a progestogen, endometrial cancer. Gallbladder disease is also listed. For healthy women under 60, these risks are low in absolute terms, and they depend heavily on the type of HRT, the route, how long you take it and your own history.</strong></p>
<p>MedlinePlus lists the risks as blood clots, heart attack, stroke, breast cancer and gallbladder disease for some women, with the level depending on the type of hormone therapy, how long it's used and your medical history and lifestyle (${ext(S.medlineHrt, "MedlinePlus")}). The NHS says the risk of serious side effects is usually very low and depends on the type you take, how long, and your own health risks (${ext(S.nhsBenefits, "NHS")}).</p>
<h3>Breast cancer</h3>
<p>The NHS (UK) puts numbers on it: around 5 extra cases of breast cancer for every 1,000 women who take combined HRT for 5 years. The risk rises the longer you take it and the older you are, and falls again after you stop. There is little or no increase from estrogen-only HRT, and vaginal estrogen does not increase breast cancer risk (${ext(S.nhsBenefits, "NHS")}). If you've had breast cancer, you'll usually be advised not to take HRT. Keep up with mammograms while you're on HRT.</p>
<h3>Blood clots and stroke</h3>
<p>HRT tablets can increase the risk of blood clots and slightly increase the risk of stroke, though the risk is still very low, particularly under 60; patches, gels and sprays do not increase clot risk (${ext(S.nhsBenefits, "NHS")}). This is the single biggest reason route matters.</p>
<h3>Endometrial cancer</h3>
<p>Estrogen on its own increases the risk of cancer of the uterine lining in women who still have a uterus, and a progestogen lowers that risk (${ext(S.fdaMenopause, "FDA")}; ${ext(S.medlineEstrogen, "MedlinePlus")}). It's the one boxed warning the FDA kept on systemic estrogen-alone products (${ext(S.fdaNov2025, "FDA")}).</p>
<h3>Warning signs: get help right away</h3>
<p>The NHS lists these possible signs of a serious problem on estrogen (${ext(S.nhsOestrogen, "NHS")}):</p>
<ul><li>Pain and swelling in a leg (possible deep vein thrombosis)</li><li>Sudden chest pain or difficulty breathing (possible pulmonary embolism)</li><li>Weakness on one side of the face, difficulty raising the arms, or difficulty speaking (possible stroke)</li><li>Yellowing of the eyes or skin (possible jaundice)</li><li>Swelling of the throat or tongue, or difficulty breathing (possible allergic reaction)</li></ul>
<p>In the US, call 911 for stroke, chest pain or breathing problems. For a deeper look at risk in absolute numbers, read <a href="/hrt/articles/is-hrt-safe">is HRT safe?</a>.</p>`,
    },
    {
      heading: "Does HRT help with low sex drive?",
      body: `<p><strong>Sometimes, but mostly indirectly. The FDA says studies have not shown that hormone therapy increases sex drive. What estrogen does do is treat vaginal dryness and pain with sex, and restore sleep lost to night sweats, which for many women is what was really holding desire back. If low desire persists once comfort and sleep are fixed, that's a separate conversation.</strong></p>
<p>The FDA's menopause page answers the question directly: studies have not shown that hormone therapy prevents ageing and wrinkles or increases sex drive (${ext(S.fdaMenopause, "FDA")}). That's worth hearing before you start, so you don't conclude the treatment "isn't working" when it's actually doing its job on hot flashes and sleep.</p>
<h3>Why libido drops in menopause</h3>
<ul><li><strong>Pain and dryness.</strong> Lower estrogen thins and dries vaginal tissue, so sex can hurt. The FDA lists dyspareunia (pain with sex) among the symptoms hormone therapy may relieve (${ext(S.fdaMenopause, "FDA")}).</li><li><strong>Poor sleep.</strong> Night sweats wreck sleep, and tired people want sex less.</li><li><strong>Mood.</strong> Low mood and anxiety linked to menopause dampen desire; the NHS lists both among symptoms HRT can help (${ext(S.nhsBenefits, "NHS")}).</li><li><strong>Everything else.</strong> Relationships, stress, body image, medicines (some antidepressants lower libido) and other health conditions.</li></ul>
<h3>How HRT can help</h3>
<p>Vaginal estrogen, or systemic HRT, treats dryness and discomfort; the NHS says vaginal estrogen helps with dryness, burning and pain during sex (${ext(S.nhsTypes, "NHS")}). Systemic HRT that quiets night sweats gives back sleep and energy. For many women, fixing comfort and sleep does more for their sex life than any drug aimed at desire. There's also a non-hormonal FDA-approved medicine for moderate to severe pain during sex due to menopause, listed on the FDA's menopause page (${ext(S.fdaMenopause, "FDA")}).</p>
<h3>Will HRT bring back my libido?</h3>
<p>If your libido dropped mainly because sex became painful or you were exhausted, there's a good chance HRT helps. If desire itself has gone, even when sex is comfortable and you're sleeping well, estrogen alone may not change it. In that case, ask about the other causes on the list above and about whether testosterone is appropriate, which is covered next.</p>
<p>When you talk to a clinician, be specific about which part is loudest: pain, dryness, low desire despite comfort, exhaustion or mood. The treatment follows the cause. Our <a href="/hrt/articles/hrt-and-libido">HRT and libido</a> guide goes further.</p>`,
    },
    {
      heading: "Can testosterone help women's libido?",
      body: `<p><strong>For one specific problem, yes: low sexual desire that causes distress after menopause, where an international consensus found a moderate benefit from carefully dosed transdermal testosterone. It isn't recommended for energy, mood or "anti-ageing", and no testosterone product for women is FDA-approved, so US prescribing is off-label.</strong></p>
<p>In 2019 an international coalition published a Global Consensus Position Statement on testosterone therapy for women, endorsed by bodies including the Endocrine Society (${ext(S.testosteroneConsensus, "Endocrine Society, 2019")}). As our <a href="/hrt/articles/testosterone-for-menopausal-women">testosterone for women guide</a> explains, the only evidence-based indication it identified is hypoactive sexual desire disorder (HSDD) in postmenopausal women. The NHS similarly notes that testosterone is not licensed in the UK to treat menopause symptoms but can be prescribed by a specialist (${ext(S.nhsTypes, "NHS")}).</p>
<h3>What a careful prescriber does</h3>
<ul><li>Confirms the problem is low desire causing distress, not pain, exhaustion or a relationship issue that needs a different fix.</li><li>Uses a transdermal (skin) preparation, not pellets or injections that overshoot.</li><li>Checks a baseline blood level and rechecks after starting.</li><li>Reviews at around six months and stops if there's no benefit.</li></ul>
<p>These steps come from the guidance summarised in our testosterone guide. Be wary of any service that sells testosterone to women for "energy" or general wellbeing without a diagnosis.</p>
<h3>Which online providers prescribe it?</h3>
<p>Among the providers we rank, <a href="/hrt/reviews/midi">Midi Health</a> prescribes testosterone in selected cases and only in some states; our records show it is self-pay at about $45 for 30 days to $100+ for 90 days (Midi's figures, October 2026), and extra labs and visits may be needed because it's a controlled substance. <a href="/hrt/reviews/winona">Winona</a> does not prescribe testosterone. Gala's menopause menu as we recorded it lists estradiol, progesterone, vaginal estradiol and non-hormonal options. Details in our <a href="/hrt/articles/midi-cost">Midi cost guide</a>.</p>
<p>Our <a href="/hrt/articles/menopause-hormone-therapy-2026-what-changed">2026 changes guide</a> covers preliminary October 2026 conference data on testosterone and cardiovascular events, a reason to ask about monitoring rather than to stop on your own.</p>`,
    },
    {
      heading: "What's the difference between HRT and birth control?",
      body: `<p><strong>Both can contain estrogen and a progestogen, but they do different jobs. Birth control uses hormones to stop ovulation and prevent pregnancy. HRT replaces hormones that have fallen at menopause to relieve symptoms, and it does not prevent pregnancy. The NHS says you can't take HRT at the same time as the combined pill, though the progestogen-only pill can usually be taken alongside HRT.</strong></p>
<table>
<thead><tr><th></th><th>Combined birth control pill</th><th>HRT</th></tr></thead>
<tbody>
<tr><td>Main purpose</td><td>Prevent pregnancy by suppressing ovulation</td><td>Relieve menopause symptoms and protect bone</td></tr>
<tr><td>Prevents pregnancy?</td><td>Yes</td><td>No (${ext(S.nhsAbout, "NHS")})</td></tr>
<tr><td>Hormone levels</td><td>Set to override your own cycle</td><td>Set to top up falling levels</td></tr>
<tr><td>Used during perimenopause?</td><td>Yes; can mask or improve menopause symptoms (${ext(S.nhsWhen, "NHS")})</td><td>Yes; you don't need to wait for periods to stop (${ext(S.nhsWhen, "NHS")})</td></tr>
<tr><td>Can be taken together?</td><td colspan="2">Not with the combined pill; the progestogen-only pill can usually be taken alongside HRT (${ext(S.nhsWhen, "NHS")})</td></tr>
<tr><td>Typical switch point</td><td colspan="2">The NHS says a GP may recommend staying on the combined pill until 50 and then switching to HRT (${ext(S.nhsWhen, "NHS")}); in the US, your clinician decides based on your age, health and contraception needs</td></tr>
</tbody>
</table>
<h3>Why the pill makes menopause hard to spot</h3>
<p>The NHS explains that hormonal contraception can affect your periods, so you may not know when you reach perimenopause or menopause, and that the combined pill can mask or improve menopause symptoms because it contains estrogen (${ext(S.nhsWhen, "NHS")}). The FDA adds a warning about home menopause tests: don't stop your birth control because of a positive result, because you may still be able to get pregnant (${ext(S.fdaMenopause, "FDA")}).</p>
<p>Our dedicated page, <a href="/hrt/articles/hrt-vs-birth-control">HRT vs birth control</a>, goes into when and how women usually switch.</p>`,
    },
    {
      heading: "Is HRT birth control? Can you get pregnant on HRT?",
      body: `<p><strong>No, HRT is not birth control, and yes, you can get pregnant on it if you're still ovulating. The NHS says to use contraception until 2 years after your last period if you're under 50, or for 1 year after your last period if you're over 50, and that contraception is no longer needed after 55.</strong></p>
<p>Fertility falls in perimenopause, but it doesn't vanish on a predictable date. Ovulation can still happen even when periods are irregular. The NHS is explicit that it's still possible to get pregnant while taking HRT, which is why it says to use contraception until 2 years after your last period if you're under 50, or for 1 year after your last period if you're over 50 (${ext(S.nhsAbout, "NHS")}). It adds that you'll no longer need contraception after 55, as natural pregnancy is very rare by then (${ext(S.nhsWhen, "NHS")}).</p>
<h3>Contraception options that work with HRT</h3>
<ul><li><strong>Progestogen-only pill.</strong> The NHS says you can usually take it alongside HRT (${ext(S.nhsWhen, "NHS")}).</li><li><strong>Hormonal IUD.</strong> Provides contraception and the progestogen component of HRT (${ext(S.nhsTypes, "NHS")}).</li><li><strong>Barrier methods.</strong> Condoms also protect against sexually transmitted infections, which the NHS notes remain a consideration at any age (${ext(S.nhsWhen, "NHS")}).</li><li><strong>Not the combined pill.</strong> The NHS says you can't take HRT at the same time as the combined pill (${ext(S.nhsWhen, "NHS")}).</li></ul>
<p>Pregnancy is a contraindication for hormone therapy (${ext(S.medlineHrt, "MedlinePlus")}) and for some non-hormonal hot flash medicines too; the Lynkuet label says pregnancy should be excluded before starting (${ext(S.dmLynkuet, "DailyMed, Lynkuet label")}).</p>
<p>US guidance on exactly when to stop contraception can differ from the NHS rules above, so confirm with your own clinician. If you're on the combined pill now and wondering when to move to HRT, our <a href="/hrt/articles/hrt-vs-birth-control">HRT vs birth control</a> page walks through the switch.</p>`,
    },
    {
      heading: "What are the non-hormonal alternatives to HRT?",
      body: `<p><strong>If you can't or would rather not take hormones, there are FDA-approved non-hormonal medicines for hot flashes, including two neurokinin receptor antagonists: Veozah (fezolinetant) and Lynkuet (elinzanetant). ACOG's 2026 guideline also reviews SSRIs and SNRIs, and non-drug options such as cognitive behavioural therapy, clinical hypnosis, mindfulness, exercise and acupuncture. It says the evidence does not support phytoestrogens or herbal supplements.</strong></p>
<h3>The neurokinin receptor antagonists</h3>
<p><strong>Veozah (fezolinetant)</strong> is a nonhormonal NK3 receptor antagonist the FDA approved in May 2023 for moderate to severe hot flashes due to menopause. It works on the brain's temperature control centre (${ext(S.fdaVeozah, "FDA")}). Its label now carries a boxed warning for hepatotoxicity (liver injury), added in December 2024, and requires liver blood tests before starting, monthly for the first 3 months, and at 6 and 9 months (${ext(S.dmVeozah, "DailyMed, Veozah label, revised 2/2026")}). The FDA says to stop it and call your prescriber if you notice signs such as unusual tiredness, nausea, itching, yellow eyes or skin, dark urine or pain in the upper right abdomen (${ext(S.fdaVeozah, "FDA")}).</p>
<p><strong>Lynkuet (elinzanetant)</strong> is an NK1 and NK3 receptor antagonist, first approved in 2025, for moderate to severe hot flashes due to menopause. Its label warns about sleepiness and daytime impairment: in the three OASIS trials, nervous system effects such as somnolence, fatigue and dizziness occurred in 11.9% of patients on Lynkuet versus 3.5% on placebo. It is contraindicated in pregnancy, and the most frequent side effects were headache, fatigue, dizziness and somnolence (${ext(S.dmLynkuet, "DailyMed, Lynkuet label, revised 8/2026")}).</p>
<h3>Hormonal vs non-hormonal options compared</h3>
<table>
<thead><tr><th>Option</th><th>Type</th><th>Treats</th><th>Key cautions</th></tr></thead>
<tbody>
<tr><td>Systemic HRT (estrogen ± progestogen)</td><td>Hormonal</td><td>Hot flashes, night sweats, vaginal symptoms, bone loss</td><td>Clots (pills), stroke, breast cancer considerations; not for some histories</td></tr>
<tr><td>Vaginal estrogen</td><td>Hormonal, local</td><td>Dryness, pain with sex, some urinary symptoms</td><td>Doesn't treat hot flashes</td></tr>
<tr><td>Veozah (fezolinetant)</td><td>Non-hormonal, NK3 antagonist</td><td>Moderate to severe hot flashes</td><td>Boxed warning for liver injury; regular liver tests (${ext(S.dmVeozah, "label")})</td></tr>
<tr><td>Lynkuet (elinzanetant)</td><td>Non-hormonal, NK1/NK3 antagonist</td><td>Moderate to severe hot flashes</td><td>Sleepiness and daytime impairment; contraindicated in pregnancy (${ext(S.dmLynkuet, "label")})</td></tr>
<tr><td>SSRIs/SNRIs</td><td>Non-hormonal</td><td>Hot flashes and depression</td><td>Reviewed in ACOG's 2026 guidance (${ext(S.acogNews, "ACOG")}); side effects vary by drug</td></tr>
<tr><td>CBT, clinical hypnosis, mindfulness, exercise, acupuncture</td><td>Non-drug</td><td>Hot flashes, sleep, mood</td><td>Usually used alongside medication (${ext(S.acogNews, "ACOG")})</td></tr>
<tr><td>Herbal supplements, phytoestrogens</td><td>Supplement</td><td>Not supported by evidence</td><td>ACOG says they're not FDA-regulated and not tested for safety, efficacy or purity (${ext(S.acogNews, "ACOG")})</td></tr>
</tbody>
</table>
<p>Of the providers we rank, <a href="/hrt/reviews/midi">Midi Health</a> lists non-hormonal prescriptions including SSRIs and neurokinin-3 antagonists, and <a href="/hrt/reviews/gala">Gala</a> lists non-hormonal options. More in <a href="/hrt/articles/non-hormonal-menopause-treatment">non-hormonal menopause treatments</a>.</p>`,
    },
    {
      heading: "Are bioidentical or compounded hormones safer?",
      body: `<p><strong>No evidence shows they are. "Bioidentical" just means chemically identical to your own hormones, and many FDA-approved products already are. Compounded "bioidentical" hormones are custom mixes made by pharmacies; they're not FDA-approved, and the FDA says it has no evidence they're safer or more effective. ACOG says they shouldn't be prescribed routinely when FDA-approved options exist.</strong></p>
<p>The FDA's menopause page says many marketed "bioidentical hormones" are compounded drugs, which are not FDA-approved, and that the FDA does not have evidence they are safe and effective, or safer or more effective than FDA-approved hormone therapy. It also notes that the FDA has approved hormones identical to those women make in their reproductive years (${ext(S.fdaMenopause, "FDA")}).</p>
<p>ACOG's Clinical Consensus No. 6 (November 2023, reaffirmed 2026) goes further: many compounding pharmacies use "bioidentical hormone" as a marketing term to imply their preparations are natural and therefore safer, but evidence for those claims is lacking. Compounded bioidentical hormone therapy should not be prescribed routinely when FDA-approved formulations exist, and patients who request it should be told about the lack of FDA approval and the risks specific to compounding (${ext(S.acogCompounded, "ACOG")}). The Menopause Society has also warned that compounded preparations can be a safety hazard because they are unregulated and often given in untested forms such as pellets or troches (${ext(S.tms2022, "Menopause Society 2022")}).</p>
<h3>FDA-approved bioidentical vs compounded</h3>
<table>
<thead><tr><th></th><th>FDA-approved (many are bioidentical)</th><th>Compounded</th></tr></thead>
<tbody>
<tr><td>Examples</td><td>Estradiol pills, patches, gels, sprays; micronized progesterone capsules; vaginal estradiol</td><td>Custom creams, troches, pellets; any estriol product in the US (${ext(S.fdaMenopause, "FDA")})</td></tr>
<tr><td>Reviewed for safety, effectiveness and quality</td><td>Yes, as a finished product</td><td>No individual FDA approval</td></tr>
<tr><td>FDA-approved label and leaflet</td><td>Yes</td><td>No</td></tr>
<tr><td>When it may make sense</td><td>First choice for most women</td><td>A documented reason an approved product won't work, such as an allergy to an ingredient</td></tr>
</tbody>
</table>
<p>How this applies to the providers we rank: <a href="/hrt/reviews/winona">Winona</a> lists its estrogen tablets, estrogen patch and progesterone capsules as FDA-approved, while its body creams are compounded. That's a clear disclosure, and it means you can choose the approved products if that matters to you. Our <a href="/hrt/articles/winona-products">Winona products guide</a> lists each. With any provider, ask: "Is this FDA-approved or compounded, and if compounded, why?" Our full explainer is <a href="/hrt/articles/bioidentical-hormones-explained">bioidentical hormones explained</a>.</p>`,
    },
    {
      heading: "How much does HRT cost, and does insurance cover it?",
      body: `<p><strong>It depends mostly on whether you use insurance. Generic estradiol and progesterone through a pharmacy are often on lower insurance tiers. Online, cash-pay HRT runs from about $39 to $149 a month per product at Winona, $69 a month flat at Gala (as captured October 8, 2026), or about $50 a visit in-network at Midi Health (Midi's average) plus pharmacy costs. Prices change, so confirm before you pay.</strong></p>
<p>How the three providers we rank charge, from our records:</p>
<table>
<thead><tr><th>Provider</th><th>How you pay</th><th>Published prices (as stored)</th><th>Insurance</th></tr></thead>
<tbody>
<tr><td><a href="/hrt/reviews/winona">Winona</a></td><td>Monthly, per product; consultation free</td><td>Progesterone capsules $39; estrogen tablets $54; estrogen and progesterone body creams and vaginal estrogen cream $89; estrogen patch $149 (creams and patch re-verified October 8, 2026; tablets and capsules as published August 2026)</td><td>Not billed; FSA/HSA eligible</td></tr>
<tr><td><a href="/hrt/reviews/gala">Gala</a></td><td>One flat monthly plan</td><td>$69/month on its hormone-therapy page, captured October 8, 2026; a "from $79" headline has also appeared; checkout shows the exact plan</td><td>Not billed; FSA/HSA accepted</td></tr>
<tr><td><a href="/hrt/reviews/midi">Midi Health</a></td><td>Per visit, plus your pharmacy for medication</td><td>About $50 per visit on average in-network (Midi's figure); self-pay $250 first visit, $150 follow-ups (October 2026, approximate)</td><td>Most commercial PPO plans; not HMO, Medicare or Medicaid</td></tr>
</tbody>
</table>
<p>With good PPO coverage, an insurance-billed clinic plus generic hormones from your pharmacy is often the cheapest route (our <a href="/hrt/articles/midi-cost">Midi cost guide</a> works through a first year). With an HMO, Medicare, a high deductible or no coverage, a flat cash plan can be simpler; compare <a href="/hrt/articles/gala-cost">Gala cost</a> and <a href="/hrt/articles/winona-cost">Winona cost</a>.</p>
<h3>Generics and new options</h3>
<p>Generic competition helps. The FDA notes that nine out of ten prescriptions filled in the US are for generics, and on October 20, 2026 it announced the first generic of Climara Pro, a once-weekly combined estradiol and levonorgestrel patch; it directs patients to contact the manufacturer about availability (${ext(S.fdaGeneric, "FDA")}). In November 2025 the FDA also approved the first generic of Premarin (conjugated estrogens) in more than 30 years (${ext(S.fdaNov2025, "FDA")}).</p>
<p>For every price in one place, plus year-one totals, see <a href="/hrt/articles/online-hrt-cost">how much HRT costs online</a>.</p>`,
    },
    {
      heading: "Is Winona legit, or is it a scam?",
      body: `<p><strong>Winona is legitimate, not a scam. It's a US telehealth company focused only on menopause and perimenopause: a board-certified physician reviews your online health intake and prescribes only if hormone therapy is appropriate, with ongoing care by secure messaging. Its estrogen tablets, patch and progesterone capsules are FDA-approved products; its body creams are compounded.</strong></p>
<p>People search "is Winona a scam" because it's online-only, has no video visit and sends hormones by mail. Those are features of its model, not signs of a scam. From our <a href="/hrt/articles/is-winona-legit">Winona legitimacy review</a> and <a href="/hrt/reviews/winona">full Winona review</a>:</p>
<ul><li><strong>A real clinical gate.</strong> A board-certified physician reviews your symptoms, history and medications and can decline.</li><li><strong>A free consultation.</strong> You pay only if a physician prescribes and you approve the plan.</li><li><strong>Published prices.</strong> From $39 a month for progesterone capsules to $149 for the patch, FSA/HSA eligible (dates in the cost section above).</li><li><strong>Ongoing care.</strong> Physician messaging, with dose and route adjustments over time.</li></ul>
<h3>The fair caveats</h3>
<ul><li><strong>Cash only.</strong> Winona doesn't bill insurance. If you have good PPO coverage, an insurance-billed clinic may cost less; compare <a href="/hrt/midi-vs-winona">Midi Health vs Winona</a>.</li><li><strong>No video visit.</strong> Many women like this. If you want to talk to a clinician face to face, Midi offers scheduled video visits.</li><li><strong>Compounded creams.</strong> Ask which product you're prescribed if FDA approval matters to you.</li><li><strong>Billing friction.</strong> The complaints we reviewed centre on billing and cancellation, as with most subscription telehealth. Check your reorder settings, cancel in writing and keep the confirmation.</li><li><strong>No testosterone.</strong> Midi is the option for that among those we rank.</li></ul>
<h3>Winona's vaginal health options</h3>
<p>For dryness and pain with sex, Winona offers a vaginal estrogen cream, priced at $89 a month in our records, and our legitimacy review lists estriol among its options. As covered above, the FDA says there are no FDA-approved estriol drugs in the US (${ext(S.fdaMenopause, "FDA")}), so any estriol is compounded. If you'd prefer an FDA-approved vaginal estradiol product, say so; it's a reasonable request of any provider.</p>
<p>Winona is our top-ranked online HRT provider overall. Like any HRT, its treatments carry real risks, including blood clots, stroke and breast-cancer considerations, and the physician decides whether they're appropriate for you.</p>`,
    },
    {
      heading: "Midi Health or Winona: which is better for you?",
      body: `<p><strong>Choose Midi Health if you have a commercial PPO plan, want a live video visit, or want a clinician who can weigh non-hormonal options or testosterone too. Choose Winona if you've decided on hormone therapy and want a dedicated, appointment-free service with flat published prices and home delivery. Both are menopause specialists.</strong></p>
<p>It's a genuine choice between two good models: Midi runs like a virtual specialist clinic, Winona like a focused hormone-therapy subscription.</p>
<table>
<thead><tr><th></th><th><a href="/hrt/reviews/midi">Midi Health</a></th><th><a href="/hrt/reviews/winona">Winona</a></th></tr></thead>
<tbody>
<tr><td>Focus</td><td>Perimenopause and menopause clinic</td><td>Menopause hormone therapy</td></tr>
<tr><td>Clinician contact</td><td>Scheduled video visits, about 30 minutes</td><td>Online intake and physician messaging; no video</td></tr>
<tr><td>Who prescribes</td><td>Menopause-trained nurse practitioners and certified nurse midwives</td><td>Board-certified physicians</td></tr>
<tr><td>Insurance</td><td>Most commercial PPO plans</td><td>Direct pay; FSA/HSA</td></tr>
<tr><td>Treatment range</td><td>Hormonal and non-hormonal; testosterone in some states</td><td>Body-identical hormone therapy in several forms</td></tr>
<tr><td>Medication</td><td>Sent to your pharmacy</td><td>Delivered to your door</td></tr>
<tr><td>Cost</td><td>About $50 a visit in-network (Midi's average); $250/$150 self-pay</td><td>$39-$149/month by product; free consultation</td></tr>
</tbody>
</table>
<p><strong>Pick Midi</strong> if your PPO plan participates, you want to talk things through in real time (perhaps about migraines, clot risk or family history), or you want non-hormonal options or a testosterone assessment. Watch for billing surprises: confirm in-network status and ask for an estimate. <strong>Pick Winona</strong> if you've decided on HRT and want it handled without appointments, value published prices and home delivery, or are on an HMO or Medicare plan that Midi doesn't bill. Watch for cash-only cost and compounded creams.</p>
<p>The full side-by-side is in <a href="/hrt/midi-vs-winona">Midi Health vs Winona</a>. If you're also weighing a flat-price option, see <a href="/hrt/winona-vs-gala">Winona vs Gala</a> and <a href="/hrt/gala-vs-midi">Gala vs Midi Health</a>, and our <a href="/hrt/articles/is-midi-legit">Midi Health legitimacy review</a> covers billing in detail.</p>`,
    },
    {
      heading: "What should you ask before starting HRT?",
      body: `<p><strong>Ask what the treatment is for, which estrogen and progestogen you'll get and in what form, whether it's FDA-approved or compounded, how your uterus is protected if you have one, what side effects to expect and which warning signs need urgent care, when you'll be reviewed, and how you'd stop.</strong></p>
<p>The NHS suggests going into the appointment prepared, noting any recent changes to your periods and any medicines or herbal remedies you take, and offers some starter questions: how will HRT help me, how soon will I feel better, what are the benefits and risks, is HRT the only treatment I can have, how long will I have to take it, and how will I know which type will work best (${ext(S.nhsAbout, "NHS")}). Here's a fuller list.</p>
<h3>About you</h3>
<ul><li>Given my age and time since my last period, am I inside the window where benefits usually outweigh risks?</li><li>Do my history, blood pressure, migraines or family history change which route you'd recommend?</li><li>Is a patch or gel better than a pill for me, and why?</li><li>Could I be pregnant, and do I still need contraception?</li></ul>
<h3>About the prescription</h3>
<ul><li>Which estrogen, which progestogen, in what form?</li><li>Is it FDA-approved or compounded? If compounded, why?</li><li>If I have a uterus, how is my lining protected?</li><li>Do you need any tests before starting?</li></ul>
<h3>About the first months</h3>
<ul><li>What side effects are normal, and how long should I give them?</li><li>What bleeding is expected, and when should I report it?</li><li>When will we review? (The NHS suggests about 3 months after starting or changing, then yearly; ${ext(S.nhsAbout, "NHS")}.)</li><li>What should I do if my pharmacy can't fill it?</li></ul>
<p>For the long term, ask how you'll decide together how long to stay on it, how you'd stop, and how often to have mammograms. Also tell your prescriber about every medicine and supplement you take. The NHS lists some epilepsy medicines, the antibiotic rifampicin, some HIV medicines and St John's wort among those that may not mix well with estrogen (${ext(S.nhsOestrogen, "NHS")}). A good clinician welcomes these questions, and how they answer is a useful test of the service. If you're doing this online, our <a href="/hrt/articles/how-to-get-hrt-online">how to get HRT online</a> guide explains what each step looks like.</p>`,
    },
    {
      heading: "How we researched this guide",
      body: `<p><strong>This guide was written by the Treatments Hub Research Team on November 9, 2026. Every medical statement links to the page it came from, and every source was read in full on that date. We are a comparison site, not a medical provider, and this guide hasn’t yet been through our medical-accuracy review.</strong></p>
<h3>Where the facts come from</h3>
<ul><li><strong>US regulators and labels:</strong> FDA press releases of November 10, 2025, February 12, 2026 and October 20, 2026; FDA pages on the labeling change, patch availability, menopause and Veozah; and current labels on DailyMed, the National Library of Medicine's label database.</li><li><strong>Medical bodies:</strong> ACOG's October 15, 2026 guideline release and its consensus on compounded hormones. A few facts (the American College of Physicians' October 6, 2026 guideline, the October 30, 2026 patch labels, The Menopause Society's 2022 statement and 2025 comment, Harvard's WHI summary and the 2019 testosterone consensus) are carried over from earlier guides on this site, with their original links.</li><li><strong>Patient information:</strong> MedlinePlus and NHS pages. NHS advice is UK guidance and is labelled as such; US practice can differ.</li><li><strong>Provider facts and prices:</strong> our own provider reviews and cost guides, with the dates we last verified each figure.</li></ul>
<h3>What we left out</h3>
<p>We don't give doses or conversions between products; your prescriber sets those. We don't quote customer ratings or social-media posts. Where a figure appeared only in a search snippet, we left it out. Where sources disagree, such as the average age of menopause (50 per ACOG, 51 per the FDA), we show both.</p>
<h3>How the providers are ranked</h3>
<p>Our HRT ranking order is Winona, Midi Health, Gala, using the criteria described in the provider-choice section above (full list on our <a href="/hrt">HRT rankings</a>). We may earn a commission through our links; it doesn't change the facts we print.</p>
<p>We'll update this guide as more products receive new labels and as guidance changes.</p>`,
    },
    {
      heading: "The bottom line",
      body: `<p>HRT for menopause is estrogen, plus a progestogen if you have a uterus, and it remains the most effective treatment for hot flashes and night sweats. In 2026 the official position moved decisively: the FDA removed heart disease, breast cancer and dementia from the boxed warning, and ACOG and the American College of Physicians both put hormone therapy first for hot flashes in women without contraindications, with ACOG advising a start before 60 or within 10 years of menopause.</p>
<p>What hasn't changed is that HRT carries real risks, including blood clots, stroke and breast-cancer considerations, and that route and timing shape them. Patches, gels and sprays avoid the clot risk linked to pills; vaginal estrogen treats dryness with very little reaching the rest of the body; and compounded "bioidentical" hormones are not individually FDA-approved. There's no fixed limit on how long you can stay on HRT; review it every year, and stop with a plan rather than abruptly.</p>
<p>If you're ready to talk to someone, an online menopause specialist can make it easier. <a href="/hrt/reviews/winona">Winona</a> is our top pick for focused, appointment-free care with published prices; <a href="/hrt/reviews/midi">Midi Health</a> is the choice if you have PPO insurance and want a video visit; and <a href="/hrt/reviews/gala">Gala</a> suits women who want one flat monthly price. Compare all three on our <a href="/hrt">online HRT rankings</a>, and whichever you choose, give the clinician your full history.</p>
<p>Facts checked November 9, 2026. <em>This guide is general information, not medical advice. A licensed clinician who knows your history should decide whether hormone therapy, or any treatment, is right for you.</em></p>`,
    },
  ],
};
