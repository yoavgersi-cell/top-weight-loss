import type { ArticleData } from "../../config";

// ───── Testosterone for menopausal women (Oct 28, 2026) ─────
// The one evidence-based indication (HSDD after menopause), the global
// consensus and ISSWSH guideline positions, the absence of an FDA-approved
// product, the Australian cream, and how off-label prescribing works online.
// Guideline statements link the guideline; no price appears.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  consensus: "https://www.sciencedirect.com/science/article/abs/pii/S0378512219306280",
  endoNews: "https://www.endocrine.org/news-and-advocacy/news-room/2019/coalition-issues-international-consensus-on-testosterone-treatment-for-women",
  isswsh: "https://www.sciencedirect.com/science/article/pii/S1743609520309826",
  namsPearl: "https://www.huntingtonhealth.org/wp-content/uploads/2024/09/NAMS_practice-pearl-testosterone_.pdf",
  review2022: "https://www.nature.com/articles/s41443-022-00613-0",
  review2023: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9948121/",
  tga: "https://www.tga.gov.au/resources/section-14-consents/androfeme-1-testosterone-1-wv-10-mgml-cream-tube-lawley-pharmaceuticals-pty-ltd-con-1174",
  nejmJw: "https://clinician.nejm.org/consensus-statement-says-testosterone-therapy-warranted-women-hypoactive-sexual-desire-disorder-nejm-jw.NA49928",
};

export const HRT_TESTOSTERONE_FOR_WOMEN: ArticleData = {
  slug: "testosterone-for-menopausal-women",
  title: "Testosterone for Women in Menopause: What the Evidence Says",
  description:
    "Low sexual desire after menopause is the one indication with evidence. The global consensus, the ISSWSH guideline, why no US product exists, and online access.",
  category: "Science",
  readTime: "15 min read",
  publishedAt: "2026-10-28",
  updatedAt: "2026-10-28",
  heroColor: "#F6EEF2",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "The only evidence-based use of testosterone in women is hypoactive sexual desire disorder (HSDD) after menopause, where the 2019 Global Consensus Position Statement, endorsed by ten societies, found a moderate benefit. There is no evidence it helps mood, energy, cognition, bone or muscle in women, and the consensus says so.",
    "No testosterone product for women is approved in the United States. Clinicians prescribe a small fraction of a male gel or cream off-label, aiming for blood levels in the premenopausal female range; Australia has a registered 1% cream (AndroFeme), and Libigel, the US candidate, failed its phase 3 trials.",
    "Transdermal is the route the guidance supports. Oral testosterone raises LDL and lowers HDL and is not recommended; pellets and injections overshoot and are discouraged. A woman with signs of excess androgens should not be prescribed it.",
    "The decision needs a baseline testosterone and SHBG level, a trial of about six months with a level recheck, and a stop if there is no benefit. Online menopause clinics can do this; the ones to avoid are those that offer testosterone for 'energy' or 'anti-ageing' without a diagnosis.",
  ],
  sections: [
    {
      heading: "Does testosterone help women in menopause?",
      body: `<div class="qa"><strong>Key takeaways and quick verdict</strong><p>For one problem, yes: low sexual desire that causes distress after menopause, where randomised trials show a moderate benefit and the international consensus supports a trial of transdermal testosterone at a dose that keeps blood levels in the young-female range. For everything else it is marketed for, energy, mood, "brain fog", muscle, bone, the evidence does not support it and the consensus says it should not be used. No product for women is approved in the US, so prescribing is off-label with a fraction of a male preparation, and that is legitimate when done with a baseline level, a review at six months and a willingness to stop. Sources: ${ext(S.consensus, "Global Consensus Position Statement, 2019")}; ${ext(S.isswsh, "ISSWSH clinical practice guideline, 2021")}, checked October 28, 2026.</p></div>
<p>Testosterone for women is having the moment that testosterone for men had a decade ago: a real but narrow indication, a large population with symptoms that overlap it, a thin supply of approved products, and a telehealth industry willing to fill the gap. The result is confusion in both directions. Women who would benefit are told it is a male hormone and refused; women who would not benefit are sold it as a tonic. This guide sets out what the evidence actually supports, who wrote the guidance, how the drug is prescribed when no product exists, and how to tell a careful online prescriber from a careless one.</p>`,
    },
    {
      heading: "What the global consensus and the ISSWSH guideline actually say",
      body: `<p>In 2019 an international panel convened by the International Menopause Society published the Global Consensus Position Statement on the Use of Testosterone Therapy for Women, endorsed by the Endocrine Society, the North American Menopause Society, the International Society for the Study of Women's Sexual Health and others, ten societies in all. Its conclusions, drawn from randomised trials of at least twelve weeks, were narrow and clear: the only evidence-based indication for testosterone in women is hypoactive sexual desire disorder in postmenopausal women, with the data supporting a moderate therapeutic effect; when it is prescribed, blood levels should be kept within the range of healthy premenopausal women; and there is insufficient evidence to support its use for any other symptom or condition, including mood, cognition, energy, bone or muscle. Sources: ${ext(S.consensus, "Davis SR et al., Maturitas, 2019")}; ${ext(S.endoNews, "Endocrine Society announcement of the consensus")}, checked October 28, 2026.</p>
<p>In 2021 ISSWSH issued its own clinical practice guideline reaching the same place with more operational detail: diagnose HSDD properly, exclude modifiable causes, use transdermal formulations, measure a baseline total testosterone and recheck after starting to avoid supraphysiological levels, review at six months and stop if there is no benefit. The North American Menopause Society's practice pearl summarises it for clinicians in a page: transdermal testosterone is recommended for postmenopausal women with HSDD not primarily related to modifiable factors or comorbidities. Sources: ${ext(S.isswsh, "ISSWSH guideline, Journal of Sexual Medicine, 2021")}; ${ext(S.namsPearl, "NAMS practice pearl")}, checked October 28, 2026.</p>
<h3>What "moderate" means</h3>
<p>The trials behind the consensus measured satisfying sexual events and desire scores in postmenopausal women with distressing low desire, mostly on estrogen therapy as well. Testosterone produced an increase in satisfying sexual events of roughly one additional event per month over placebo in the larger trials, with improvements in desire and distress scores. That is a real effect that many women found worth having. It is not a transformation, and it is not what the marketing implies. A NEJM Journal Watch summary of the consensus put it in the same measured terms. Source: ${ext(S.nejmJw, "NEJM Journal Watch, 2019")}, checked October 28, 2026.</p>`,
    },
    {
      heading: "What does testosterone not do for women?",
      body: `<p>This is the section the online adverts leave out, so it gets its own table. The consensus statement reviewed each claimed benefit and found the evidence insufficient for all of them except sexual desire.</p>
<table>
<thead><tr><th>Claimed benefit</th><th>Evidence in women</th><th>Consensus position</th></tr></thead>
<tbody>
<tr><td>Low sexual desire with distress (HSDD), after menopause</td><td>Randomised trials; moderate benefit</td><td>Supported, transdermal, physiological dose</td></tr>
<tr><td>Low sexual desire before menopause</td><td>Limited data</td><td>Insufficient evidence</td></tr>
<tr><td>Mood, depression, general wellbeing</td><td>No consistent benefit in trials</td><td>Not recommended</td></tr>
<tr><td>Cognition, "brain fog"</td><td>No consistent benefit</td><td>Not recommended</td></tr>
<tr><td>Energy, fatigue</td><td>No trial evidence</td><td>Not recommended</td></tr>
<tr><td>Bone density, muscle mass</td><td>Insufficient evidence at physiological doses</td><td>Not recommended</td></tr>
<tr><td>Cardiovascular protection</td><td>No evidence; oral forms worsen lipids</td><td>Not recommended; oral forms discouraged</td></tr>
</tbody>
</table>
<p>None of this means a woman who feels better on testosterone is imagining it; it means the trials have not shown an effect beyond placebo for those outcomes, and a clinician who prescribes it for them is prescribing on hope. The pattern is familiar from men's clinics: a hormone with one proven use becomes a treatment for ageing, and the dose creeps up to chase benefits that were never there. Sources: ${ext(S.consensus, "Global Consensus, 2019")}; ${ext(S.review2023, "Testosterone therapy for women: still many questions, 2023")}, checked October 28, 2026.</p>`,
    },
    {
      heading: "Why is there no approved testosterone product for women, and how is it prescribed?",
      body: `<p>Women make testosterone, in the ovaries and adrenal glands, at roughly a tenth of male levels, and the level falls through the reproductive years rather than dropping abruptly at menopause. A product for women therefore needs to deliver a tenth of a male dose reliably, and no such product has reached the US market. Intrinsa, a testosterone patch, was approved in Europe for surgically menopausal women in 2006 and withdrawn by its maker in 2012; Libigel, a 1% gel developed for the US, failed to beat placebo in its phase 3 trials and was abandoned. The FDA has never approved a testosterone product for women. Source: ${ext(S.review2022, "Clinical management of testosterone therapy in postmenopausal women, review, 2022")}, checked October 28, 2026.</p>
<p>Australia is the exception. AndroFeme 1, a 1% testosterone cream made by Lawley Pharmaceuticals, was registered on the Australian Register of Therapeutic Goods in November 2020 for postmenopausal women with HSDD, and it is the only product in the world designed and approved for the purpose. The consensus notes it as the one exception to the general absence of approved female formulations. Source: ${ext(S.tga, "Therapeutic Goods Administration record, AndroFeme 1")}, checked October 28, 2026.</p>
<h3>Off-label prescribing in the US</h3>
<p>Everywhere else, including the US and UK, clinicians prescribe a male product off-label at a female dose: typically a small measured amount of a 1% gel or cream daily, about a tenth of the male starting dose, applied to the skin of the lower abdomen or thigh. Compounded testosterone creams at female strengths are also used, with the quality caveats that attach to any compounded product. The guideline conditions are what make this legitimate: a documented diagnosis of HSDD, a baseline total testosterone and SHBG, a recheck of the level after starting to confirm it sits in the premenopausal range, a six-month review, and a stop if there is no benefit. Pellets and injections, which produce high and uncontrollable levels in women, are discouraged by the consensus, and oral testosterone is not recommended because it raises LDL and lowers HDL. Sources: ${ext(S.isswsh, "ISSWSH guideline, 2021")}; ${ext(S.consensus, "Global Consensus, 2019")}, checked October 28, 2026.</p>`,
    },
    {
      heading: "Side effects and safety: what is known and what is not",
      body: `<p>At physiological doses the side effects are those of too much androgen at the skin: acne, increased hair growth where it is applied or more generally, and occasionally oily skin or a change in scalp hair. They are dose-related and largely reversible on stopping, with the exception of voice deepening and clitoral enlargement, which can be permanent and occur with supraphysiological levels, which is why the level check after starting is not optional. A woman who already has signs of excess androgen, such as hirsutism or androgenic alopecia, should not be prescribed testosterone. Source: ${ext(S.review2023, "review, 2023")}, checked October 28, 2026.</p>
<p>The long-term questions are open. The randomised trials ran for months, not years, and were not powered for breast cancer or cardiovascular outcomes; the consensus found no signal of harm at physiological doses in the trial data and no evidence of safety beyond their duration. That is the honest position: short-term safety at the right dose is reasonably established, long-term safety is not, and the dose creep that happens in unsupervised use is where the risk lives. A woman on testosterone should also usually be on estrogen therapy if she is a candidate for it, because the trials were largely conducted in women on estrogen and because estrogen is the treatment for the rest of menopause; our guides to <a href="/hrt/articles/is-hrt-safe">whether HRT is safe</a> and the <a href="/hrt/articles/hrt-black-box-warning-removed">2025 boxed-warning change</a> cover that side.</p>`,
    },
    {
      heading: "How online menopause clinics handle testosterone, and what their customers say",
      body: `<p>The online HRT providers we review differ on whether they prescribe testosterone at all and, where they do, on how carefully. Some offer it only after a consultation with a menopause-trained clinician, with a baseline level and a documented desire complaint; some list it as a product alongside estrogen and progesterone; some do not prescribe it. The careful pattern looks like the guideline: a question about desire and distress rather than a menu, a blood test before and after, and a review date. The careless pattern is testosterone offered for energy or "optimisation", a pellet or injection, and no level check. Our <a href="/hrt">HRT provider ranking</a> and the reviews of <a href="/hrt/reviews/winona">Winona</a>, <a href="/hrt/reviews/midi">Midi Health</a> and <a href="/hrt/reviews/gala">Gala</a> record what each offers and how; <a href="/hrt/articles/how-to-get-hrt-online">how to get HRT online</a> sets out the process.</p>
<p>In the customers' reviews we capture for those providers, testosterone is rarely the subject; women write about estrogen symptoms, the speed of a first prescription, the quality of the clinician conversation and the billing. Where it appears, it is usually as part of a plan a clinician proposed after discussing libido, which is the right context. The clearest signal in the reviews is about the clinician: the providers whose reviewers describe a long, specific first consultation are the ones where a testosterone prescription is likely to have been reasoned rather than sold.</p>`,
    },
    {
      heading: "Who should not take testosterone?",
      body: `<ul>
<li><strong>Women whose low desire has another cause.</strong> Depression, an antidepressant, relationship difficulty, pain with sex from vaginal dryness, or untreated hot flashes and poor sleep each lower desire and each has its own treatment. The guideline requires these be addressed first; vaginal estrogen for pain and systemic estrogen for symptoms often fix the desire problem on their own.</li>
<li><strong>Women before menopause.</strong> The evidence is thin and the consensus does not support it.</li>
<li><strong>Women with signs of androgen excess,</strong> a history of hormone-sensitive breast cancer not cleared for hormone therapy, or active liver disease.</li>
<li><strong>Women seeking it for energy, mood, weight or ageing.</strong> The evidence does not support it and the consensus says so.</li>
<li><strong>Anyone offered pellets, injections or oral testosterone.</strong> These are the routes the guidance discourages.</li>
</ul>`,
    },
    {
      heading: "Final verdict and next steps",
      body: `<p>Testosterone for women is a legitimate, evidence-based treatment for one problem, distressing low sexual desire after menopause, delivered through the skin at a dose that keeps the level where a younger woman's would be, with a check that it got there and a review that it helped. For that problem, a woman should be able to get it, and an online menopause clinic with a trained clinician can provide it. For every other problem it is sold for, the evidence is not there, and the risk of dose creep is.</p>
<ol>
<li><strong>If low desire is the problem and it bothers you:</strong> treat the other menopause symptoms first if they are present, then ask a menopause-trained clinician about a transdermal trial. Our <a href="/hrt/articles/best-online-hrt-providers-compared">comparison of online HRT providers</a> shows who offers that conversation.</li>
<li><strong>Insist on the three measurements:</strong> a level before, a level after, and a review at six months.</li>
<li><strong>Decline pellets, injections and tablets</strong>, and decline testosterone offered for energy or ageing.</li>
<li><strong>Read the labels and the guidance yourself:</strong> the consensus statement is short, free to read, and more honest than most of what is sold against it.</li>
</ol>
<h3>References and further reading</h3>
<ul>
<li>${ext(S.consensus, "Davis SR et al. Global Consensus Position Statement on the Use of Testosterone Therapy for Women. Maturitas, 2019")}; ${ext(S.endoNews, "Endocrine Society announcement")}.</li>
<li>${ext(S.isswsh, "Parish SJ et al. ISSWSH Clinical Practice Guideline for the Use of Systemic Testosterone for HSDD in Women. Journal of Sexual Medicine, 2021")}.</li>
<li>${ext(S.namsPearl, "North American Menopause Society practice pearl: testosterone use for HSDD")}.</li>
<li>${ext(S.review2022, "The clinical management of testosterone replacement therapy in postmenopausal women with HSDD: a review. IJIR, 2022")}.</li>
<li>${ext(S.review2023, "Testosterone therapy for women: still many questions to be answered, 2023")}.</li>
<li>${ext(S.tga, "Therapeutic Goods Administration: AndroFeme 1 testosterone 1% cream record")}.</li>
<li>${ext(S.nejmJw, "NEJM Journal Watch summary of the consensus statement, 2019")}.</li>
</ul>
<p><em>This article is general information, not medical advice. Testosterone is a prescription hormone with irreversible side effects at the wrong dose; whether it is appropriate for you is a decision for a licensed clinician with your history and blood results.</em></p>`,
    },
  ],
};
