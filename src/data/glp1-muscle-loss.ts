import type { Article } from "./articles";

// ───── GLP-1 and muscle loss (Oct 28, 2026) ─────
// Investigative guide on the lean-mass question. Every trial figure links the
// trial or the dated report of it; conference results (BELIEVE at ADA 2025)
// are labelled as reported. Provider prices come from the verified index by
// reference, not by figure. No supplement, dose or protocol is recommended
// beyond what the labels and the cited guidance say.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  step1: "https://www.nejm.org/doi/full/10.1056/NEJMoa2032183",
  surmount1: "https://www.nejm.org/doi/full/10.1056/NEJMoa2206038",
  believeHealio: "https://www.healio.com/news/endocrinology/20250623/combination-bimagrumab-plus-semaglutide-confers-weight-loss-while-preserving-lean-mass",
  believeEurek: "https://www.eurekalert.org/news-releases/1118938",
  semalean: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12673431/",
  barbell: "https://www.barbellmedicine.com/blog/glp-1-muscle-loss/",
  dri: "https://nap.nationalacademies.org/catalog/10490/dietary-reference-intakes-for-energy-carbohydrate-fiber-fat-fatty-acids-cholesterol-protein-and-amino-acids",
  wegovyLabel: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/215256s000lbl.pdf",
};

export const glp1MuscleLossArticle: Article = {
  slug: "glp1-muscle-loss-how-to-protect-lean-mass",
  title: "GLP-1 Muscle Loss: How Much You Lose and How to Keep It",
  description:
    "What the semaglutide and tirzepatide DXA substudies show about lean mass, what bimagrumab changes, and the protein and training that protect muscle.",
  category: "Science",
  readTime: "16 min read",
  publishedAt: "2026-10-28",
  updatedAt: "2026-10-28",
  heroColor: "#EEF3F8",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "In the trials that scanned body composition, lean mass made up roughly 40% of the weight lost on semaglutide (STEP 1 DXA substudy) and about a quarter on tirzepatide (SURMOUNT-1 substudy). Lean mass is not the same as muscle: it includes water, organ tissue and the fat-free part of fat tissue that shrinks with the fat.",
    "Losing some lean mass with large weight loss is normal and happens with diet, surgery and drugs alike. The question is not whether, but how much and whether function keeps up; the SEMALEAN study found strength and function were maintained in its semaglutide group despite lean-mass change.",
    "The two levers with evidence are adequate protein and resistance training, which are also the two things a weekly injection does nothing about. A drug that blocks muscle loss directly (bimagrumab, with semaglutide) reported 93% of weight lost as fat in a phase 2 trial in 2025, but it is not approved and not for sale.",
    "Nobody should reduce or stretch a GLP-1 dose to protect muscle. The label dose and the prescriber's plan stay; muscle is protected at the table and in the gym.",
  ],
  sections: [
    {
      heading: "Do GLP-1 medications cause muscle loss?",
      body: `<div class="qa"><strong>Key takeaways and quick verdict</strong><p>Yes, people lose lean mass on semaglutide and tirzepatide, because people lose lean mass with any large weight loss. The scanned substudies put the lean share at about 40% of total loss for semaglutide and about 25% for tirzepatide, and a sizeable part of that "lean" figure is water and the support tissue of fat, not contractile muscle. Strength and physical function were maintained in the one study built to measure them. The practical answer is unglamorous: eat enough protein, lift something heavy twice a week, do not skip meals to speed the scale, and never cut the dose to spare muscle. Sources: ${ext(S.step1, "STEP 1, NEJM, 2021")}, ${ext(S.surmount1, "SURMOUNT-1, NEJM, 2022")}, ${ext(S.semalean, "SEMALEAN, 2025")}, checked October 28, 2026.</p></div>
<p>The muscle question has become the most-searched objection to GLP-1 treatment, and for a reason: the before-and-after photographs that sell these drugs show smaller bodies, and a smaller body with the same proportion of muscle is a weaker one. The fear is not irrational. It is, however, usually built on the wrong number. This guide sets out what the trials actually measured, what "lean mass" means on a DXA scan, what the one drug designed to prevent the loss showed, and what you can do about it this week without touching your prescription.</p>
<p>Two rules frame everything below. First, all of the body-composition data comes from trial substudies, with scans on a subset of participants, so the numbers are estimates with wide error bars, not laws. Second, nothing here is a reason to change a dose. The labels set the dose and the prescriber adjusts it; the tools for protecting muscle are food and training, and they work at any dose.</p>`,
    },
    {
      heading: "What the trials measured, and what 'lean mass' means",
      body: `<p>Both pivotal weight-loss trials ran a body-composition substudy in which a subset of participants had dual-energy X-ray absorptiometry (DXA) scans at baseline and at the end of treatment. DXA divides the body into bone mineral, fat mass and everything else, which it calls lean mass. That third category is the one that gets quoted as "muscle", and it is the source of most of the confusion.</p>
<h3>STEP 1: semaglutide 2.4 mg</h3>
<p>In STEP 1, published in the New England Journal of Medicine in 2021, the DXA substudy scanned 140 participants over 68 weeks. Fat mass fell by more than lean mass in absolute and proportional terms, but lean mass still accounted for roughly 40% of the total weight lost in the semaglutide group, a figure that secondary analyses have reported at about 39% to 40% depending on the statistical approach. The proportion of lean mass to total body mass went up, because fat fell faster. Source: ${ext(S.step1, "Wilding et al., NEJM, 2021")}, checked October 28, 2026.</p>
<h3>SURMOUNT-1: tirzepatide</h3>
<p>SURMOUNT-1, published in the same journal in 2022, ran a DXA substudy of its own. Its result is the one quoted most favourably for tirzepatide: pooled across doses, lean mass accounted for about a quarter of the weight lost, with fat mass falling by roughly three times as much as lean mass. The difference from STEP 1 is real but should not be over-read, because the substudies differed in size, population and total weight lost, and a trial that loses more weight tends to lose a larger absolute amount of lean tissue even when the proportion is lower. Source: ${ext(S.surmount1, "Jastreboff et al., NEJM, 2022")}, checked October 28, 2026.</p>
<h3>What is in the lean number</h3>
<p>DXA lean mass is everything that is not bone and not fat: skeletal muscle, yes, but also organ tissue, skin, connective tissue, the blood vessels and stroma that run through fat tissue, and water. When a person loses a large amount of fat, the scaffolding of that fat goes with it and registers as lean loss. When glycogen stores fall, as they do with lower food intake, the water bound to glycogen leaves and registers as lean loss. Neither is muscle fibre. A careful 2026 review of the trial literature makes the point that true skeletal-muscle loss on these drugs is probably smaller than the headline lean figures suggest, while also noting that the trials did not measure muscle directly. Source: ${ext(S.barbell, "Barbell Medicine evidence review, 2026")}, checked October 28, 2026.</p>
<table>
<thead><tr><th>Trial (substudy)</th><th>Drug</th><th>Scanned participants</th><th>Lean share of weight lost (as reported)</th><th>What it does not tell you</th></tr></thead>
<tbody>
<tr><td>STEP 1 DXA substudy</td><td>Semaglutide 2.4 mg, 68 weeks</td><td>140</td><td>About 40%</td><td>How much was muscle versus water and support tissue; strength or function</td></tr>
<tr><td>SURMOUNT-1 DXA substudy</td><td>Tirzepatide 5-15 mg, 72 weeks</td><td>Subset (see paper)</td><td>About 25% pooled</td><td>Same; plus comparability with STEP 1 (different population, larger total loss)</td></tr>
<tr><td>BELIEVE (phase 2b)</td><td>Bimagrumab + semaglutide, 72 weeks</td><td>507 enrolled</td><td>About 7% (93% of loss was fat), as reported at ADA 2025</td><td>Durability, safety at scale; not an approved product</td></tr>
<tr><td>SEMALEAN</td><td>Semaglutide, clinical cohort</td><td>Small</td><td>Lean mass changed; strength and function maintained</td><td>Long-term outcomes</td></tr>
</tbody>
</table>`,
    },
    {
      heading: "Is GLP-1 muscle loss worse than losing weight any other way?",
      body: `<p>Not on the evidence available. Lean loss of a quarter to a third of total weight lost is the long-standing rule of thumb for diet-induced weight loss, and bariatric surgery series report similar or higher proportions. The GLP-1 figures sit inside that range. What the drugs change is scale: more people are losing more weight, faster, and often without a dietitian or a training plan attached, so the absolute amount of lean tissue at stake in the population is larger than it has ever been. That is a reason to take protein and training seriously, not evidence that the drugs are uniquely catabolic.</p>
<p>The one study built to ask whether function suffers found that it did not. SEMALEAN, published in 2025, followed people on semaglutide with measures of muscle strength and physical function alongside body composition. Lean mass changed, as expected; grip strength and function were maintained. It is a small study and it is one study, but it is the right kind of study, and its answer matches what clinicians see: people who lose a lot of weight on these drugs usually move better, not worse, because the load on the muscle they keep has dropped. Source: ${ext(S.semalean, "SEMALEAN, PMC, 2025")}, checked October 28, 2026.</p>
<h3>Who should worry more</h3>
<p>Risk is not evenly spread. Adults over about 60, who are already losing muscle each year, people with low muscle mass to begin with, people losing weight very fast, and anyone eating far below their protein needs because the drug has removed their appetite are the groups where lean loss can tip into sarcopenia, the clinical state of low muscle and low function. For them, the section on protein and training below is not optional, and a conversation with the prescriber about rate of loss is reasonable. Our guide to <a href="/weight-loss/articles/glp1-weight-loss-over-40">GLP-1 weight loss over 40</a> covers the age dimension.</p>`,
    },
    {
      heading: "How much protein do you need on a GLP-1 to keep muscle?",
      body: `<p>Protein is the raw material for keeping muscle during a calorie deficit, and GLP-1 drugs make it harder to get enough of it, because they suppress appetite in general rather than appetite for fat and sugar in particular. The common failure is a day of a yoghurt, half a sandwich and a smoothie, which is well under 60 grams of protein for most adults and far below what a body in deficit needs to hold onto muscle.</p>
<p>The floor is the Recommended Dietary Allowance, 0.8 grams of protein per kilogram of body weight per day, which the National Academies set as the amount that prevents deficiency in healthy adults who are not losing weight. It was never designed for someone in a large deficit, and the sports-nutrition and geriatric literature has long argued for more in that situation; the figures clinicians use for people on GLP-1 treatment are above the RDA, and the right target for an individual depends on kidney function, age and body size, which is why the number belongs in a conversation with a dietitian or prescriber rather than in a blanket recommendation here. Source for the RDA: ${ext(S.dri, "Dietary Reference Intakes, National Academies")}, checked October 28, 2026.</p>
<h3>How people on GLP-1s actually hit it</h3>
<ul>
<li><strong>Protein first, every meal.</strong> With a small appetite, the order matters: eat the protein before the rest, because the rest will not get eaten.</li>
<li><strong>Dense sources.</strong> Greek yoghurt, cottage cheese, eggs, fish, poultry, lean meat, tofu and tempeh deliver the most protein per mouthful. Liquid protein (milk, a protein shake) is easier on days when nausea or early fullness make solid food hard.</li>
<li><strong>Spread it.</strong> Three or four protein-containing meals or snacks across the day beat one large one, because muscle protein synthesis responds per meal.</li>
<li><strong>Count for a week.</strong> Most people have no idea what they eat; a week of tracking usually shows the gap is bigger than they thought.</li>
</ul>
<p>Our guide to <a href="/weight-loss/articles/what-to-eat-on-glp1-medication">what to eat on GLP-1 medication</a> goes through meal structure when appetite is low, and <a href="/weight-loss/articles/semaglutide-side-effects-guide">the side-effects guide</a> covers the nausea that often stands between people and their protein.</p>`,
    },
    {
      heading: "Does resistance training prevent muscle loss on GLP-1 drugs?",
      body: `<p>Protein supplies the material; resistance training supplies the reason. In a calorie deficit the body is looking for tissue to shed, and unloaded muscle is a candidate. Loaded muscle is not. This is the oldest finding in the weight-loss literature and it has not changed with the drugs: people who lift during weight loss keep more lean mass than people who only walk, and people who walk keep more than people who do neither.</p>
<h3>What "enough" looks like</h3>
<p>Two sessions a week, each covering the major muscle groups (legs, hips, back, chest, shoulders, arms) with a resistance that makes the last two or three repetitions of a set hard, is the floor that most public-health and strength guidance converges on. It does not need a gym: bodyweight squats, push-ups against a counter, resistance bands and a pair of dumbbells cover it. It does need progression, meaning the resistance or the repetitions go up over the weeks, because muscle adapts to a load and then stops responding to it.</p>
<h3>Why cardio alone is not enough</h3>
<p>Walking, cycling and swimming are good for the heart, the mood and the appetite, and people on GLP-1 treatment should do them. They do not send a strong enough signal to preserve muscle in a deficit, and in large volumes they can add to the deficit and make the protein target harder to meet. The combination that works is modest cardio plus two resistance sessions, not a great deal of either. Our guide to <a href="/weight-loss/articles/exercise-while-on-glp1-medication">exercise on GLP-1 medication</a> covers starting points for people who have not trained before and the practicalities of training on an injection day.</p>
<h3>The tiredness problem</h3>
<p>A real obstacle is that people on these drugs often feel flat, particularly in the first weeks at a new dose, and training when under-fed and nauseated is unappealing. Two adjustments help: train on the days furthest from the injection, when side effects are usually lowest, and eat a protein-containing meal within a couple of hours of the session so the body has something to build with.</p>`,
    },
    {
      heading: "Bimagrumab and the muscle-sparing drugs: what BELIEVE showed",
      body: `<p>The pharmaceutical answer to the muscle question is a class of drugs that block the signals telling muscle to shrink, and the furthest along is bimagrumab, an antibody against the activin type II receptor. In the BELIEVE phase 2b trial, presented at the American Diabetes Association meeting in June 2025 and reported widely, 507 adults with obesity received semaglutide, bimagrumab or both over 72 weeks. As reported, the combination produced about 22% weight loss against about 16% for semaglutide alone, and about 93% of the weight lost on the combination was fat, compared with about 72% on semaglutide alone. On bimagrumab alone, lean mass went up while fat went down. Sources: ${ext(S.believeHealio, "Healio, June 23, 2025")}; ${ext(S.believeEurek, "EurekAlert, 2025")}, checked October 28, 2026.</p>
<p>Three cautions keep this in proportion. It is a phase 2 trial, presented at a conference and reported by the trade press; the full publication followed later and the figures above are as reported, not verified against the primary paper by us. Bimagrumab was given by intravenous infusion every twelve weeks in this trial, which is not how anyone buys a weight-loss drug. And the bimagrumab groups reported side effects, including acne and muscle spasms, that the researchers said need more study. It is not approved, it is not for sale, and anything sold online under that name or a similar one is not the trial drug.</p>
<h3>Why it matters anyway</h3>
<p>BELIEVE is the proof that the lean-loss problem is tractable and that the next generation of weight-loss treatment will be judged on body composition, not on the scale alone. Several companies are running similar programmes. For a reader deciding what to do in 2026, the conclusion is simpler: the drugs that spare muscle are years away, and the methods that spare muscle are available today for the cost of groceries and a set of dumbbells.</p>`,
    },
    {
      heading: "What customers say: results and dosing in the reviews we hold",
      body: `<p>We transcribe customers' Trustpilot reviews of the providers we rank and group them into themes on each review page, which gives a modest but real window on what people experience. Muscle loss is almost never the subject of a review; what reviewers write about are results on the scale, side effects, and how clinicians handled dose changes. On the <a href="/weight-loss/reviews/embody">embody review</a>, the results theme is specific numbers lost in the first months and deliveries that arrived cold; on the <a href="/weight-loss/reviews/wellmedr">welludr review</a>, reviewers credit the flat price for letting them move up a dose. The dosing complaints across providers, set out in our <a href="/weight-loss/articles/glp1-microdosing-complete-guide">microdosing guide</a>, are about doses that arrived at a different strength than discussed, not about anyone being told to eat more protein.</p>
<p>That silence is the finding. Among the reviews we hold, no provider is praised for nutrition or training support, and no reviewer mentions receiving a protein target or a resistance programme. The providers that bundle coaching, such as <a href="/weight-loss/reviews/medvi">Medvi</a> and <a href="/weight-loss/reviews/shed">SHED</a>, are the ones whose reviewers mention a dietitian or coach at all. For a man or woman worried about muscle, that is a reasonable thing to ask a provider before signing up: who, if anyone, will talk to me about protein and training?</p>`,
    },
    {
      heading: "Who is this not for, and what are the limits of the evidence?",
      body: `<p>This guide is for adults on, or considering, a prescribed GLP-1 weight-loss medication who want to keep the muscle they have. It is not for:</p>
<ul>
<li><strong>Anyone thinking of lowering, spacing or splitting a dose to protect muscle.</strong> The trials that produced the lean-mass figures used the labelled doses, and the protective tools work at those doses. Dosing outside the label is a prescriber's decision and is covered, with the evidence, in our <a href="/weight-loss/articles/glp1-microdosing-complete-guide">microdosing guide</a>.</li>
<li><strong>People with kidney disease or other conditions that limit protein,</strong> for whom a higher protein intake needs a clinician's sign-off first.</li>
<li><strong>Adults over about 70 or anyone with existing sarcopenia,</strong> who should be losing weight under supervision with function measured, not on a telehealth subscription alone.</li>
<li><strong>Anyone looking for a supplement answer.</strong> No supplement has evidence for preventing lean loss on GLP-1 treatment beyond ordinary protein, and products marketed for "GLP-1 muscle protection" are marketing.</li>
</ul>
<p>The limits of what is known are real. DXA cannot separate muscle from water and support tissue; the substudies were small; the trials did not measure strength, with the exception of the small SEMALEAN cohort; and no trial has yet tested a protein-and-training programme against usual care in people on these drugs, which is the study that would settle the question. Until it exists, the advice rests on decades of weight-loss physiology rather than on GLP-1-specific trials, and this guide says so.</p>`,
    },
    {
      heading: "Final verdict and next steps",
      body: `<p>The muscle objection to GLP-1 treatment is half right. Lean mass does fall, by roughly a quarter to two-fifths of the weight lost in the scanned trials, and part of that is muscle. It is also what happens with any large weight loss, function was maintained where it was measured, and the two things that protect muscle cost almost nothing. A person who eats protein first at every meal, lifts twice a week and loses weight at the rate the label produces will end up lighter and, in most cases, stronger relative to their size.</p>
<ol>
<li><strong>This week:</strong> track protein for seven days and find the gap. Add one resistance session, even if it is bands in the kitchen.</li>
<li><strong>At the next check-in:</strong> ask the prescriber or a dietitian for a protein target that fits your kidneys, age and weight, and mention any dizziness, weakness or falls.</li>
<li><strong>Choosing a provider:</strong> ask who will talk to you about nutrition and training. Our <a href="/weight-loss/how-to-choose-a-glp1-provider">provider guide</a> covers the rest of the checks, and the <a href="/weight-loss/glp1-cost-calculator">cost calculator</a> totals the verified prices.</li>
<li><strong>If you are over 60 or already low on muscle:</strong> lose weight under supervision, with grip strength or a sit-to-stand test tracked alongside the scale.</li>
</ol>
<h3>References and further reading</h3>
<ul>
<li>${ext(S.step1, "Wilding JPH et al. Once-weekly semaglutide in adults with overweight or obesity (STEP 1). NEJM, 2021")}, including the DXA substudy.</li>
<li>${ext(S.surmount1, "Jastreboff AM et al. Tirzepatide once weekly for the treatment of obesity (SURMOUNT-1). NEJM, 2022")}, including the body-composition substudy.</li>
<li>${ext(S.believeHealio, "Healio: Combination bimagrumab plus semaglutide confers weight loss while preserving lean mass (BELIEVE, ADA 2025)")} and ${ext(S.believeEurek, "EurekAlert release")}.</li>
<li>${ext(S.semalean, "SEMALEAN: impact of semaglutide on fat mass, lean mass and muscle function, 2025")}.</li>
<li>${ext(S.barbell, "Barbell Medicine: GLP-1 muscle loss evidence review, 2026")}.</li>
<li>${ext(S.dri, "National Academies: Dietary Reference Intakes for protein")}.</li>
<li>${ext(S.wegovyLabel, "Wegovy prescribing information, FDA")} for the labelled dose schedule.</li>
</ul>
<p><em>This article is general information, not medical advice. Do not change a prescribed dose, start a new exercise programme after a long break, or raise protein intake with kidney disease without a licensed clinician who knows your history.</em></p>`,
    },
  ],
};
