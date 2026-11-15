import type { ArticleData } from "../../config";

// ───── Sildenafil not working? The evidence-based fix list (Nov 15, 2026) ─────
// Troubleshooting guide for the most common ED search after "does it work":
// why a PDE5 pill fails and what the evidence says to change, in order. The
// edge over competitor pages is specificity: the actual error rates from the
// 100-non-responder study, the exact label numbers for dose, timing, food and
// half-life of all four pills, and the AUA statements on titration,
// testosterone and what comes next.
//
// Sourcing (all read Nov 15, 2026): the FDA labels for Viagra (DailyMed,
// revised 12/2017), Cialis (DailyMed), Levitra (DailyMed) and Stendra
// (DailyMed, 2024); the AUA Erectile Dysfunction guideline (J Urol 2018)
// read from the AUA PDF; the Fink 2002 meta-analysis (Arch Intern Med, link
// reused from the pillar guide); and two PubMed abstracts read through
// NCBI's BioC service (Hatzichristou 2005, Hatzimouratidis 2007). Provider
// statements come only from the review data in ../ed.ts. No ratings,
// Trustpilot content or testimonials appear.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  viagra: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0b0be196-0c62-461c-94f4-9a35339b4501",
  cialis: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=bcd8f8ab-81a2-4891-83db-24a0b0e25895",
  levitra: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=be38b325-3a6f-4569-9ae0-a03feff8535d",
  stendra: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fa7d93e3-b69b-4e02-8146-89760cd8e9d6",
  aua: "https://www.auanet.org/documents/Guidelines/PDF/ED-JU.pdf",
  fink: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/211714",
  hatzichristou: "https://pubmed.ncbi.nlm.nih.gov/15774252/",
  dayAfter: "https://pubmed.ncbi.nlm.nih.gov/16949200/",
};

const SAFETY =
  "Never combine a PDE5 inhibitor with nitrates. Seek emergency care for chest pain during sex, an erection lasting more than four hours, or a sudden loss of vision or hearing.";

export const ED_SILDENAFIL_NOT_WORKING: ArticleData = {
  slug: "sildenafil-not-working",
  image: "/article-images/sildenafil-not-working.webp",
  imageAlt: "Man sitting on the edge of a bed with a small pill box and a glass of water on the nightstand, thinking about his next step",
  title: "Sildenafil Not Working? The Evidence-Based Fix List (2026)",
  description:
    "Viagra didn't work? In one study of 100 'non-responders', 56 were using it wrong. The dose, timing, food and testosterone checks that turn failures around.",
  category: "Guide",
  readTime: "14 min read",
  publishedAt: "2026-11-15",
  updatedAt: "2026-11-15",
  heroColor: "#2b4a5f",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "A failed sildenafil trial is often a failed instruction, not a failed drug: in a study of 100 men labelled non-responders, 56 had used it incorrectly (45 had never tried 100 mg, 32 took it right after a full meal, 22 took it just before sex, 12 did not know arousal was required), and 31 responded once that was fixed.",
    "Used correctly, the label numbers are high: 63%, 74% and 82% of men on 25, 50 and 100 mg reported improved erections against 24% on placebo, and the AUA guideline says the dose should be titrated until it works or side effects say stop.",
    "A high-fat meal delays sildenafil's peak by about an hour and cuts it by 29%; tadalafil is unaffected by food, avanafil can be taken 15 minutes before sex, and daily tadalafil removes timing altogether. Switching is a real strategy, not a last resort.",
    "If pills still fail after a proper trial, the AUA guideline wants testosterone checked (it can make a PDE5 pill work better when low), and it lists injections, the urethral pellet, vacuum devices and implants as next steps that work for most men.",
  ],
  sections: [
    {
      heading: "Why isn't sildenafil working for me?",
      body: `<div class="qa"><strong>The short answer</strong>Most of the time, because of how it was used rather than whether it works. When urologists examined ${ext(S.hatzichristou, "100 consecutive men who said sildenafil had failed")} (European Urology, 2005), 56 of them had used it incorrectly: 45 had never tried the top 100 mg dose, 32 had taken it on a full stomach straight after a meal, 22 had taken it moments before sex rather than an hour ahead, and 12 did not know that sexual stimulation is required for the pill to do anything. After proper dose titration and timing advice, 31 of the 100 responded. Only 34 had ever been given a follow-up appointment.</div>
<p>That study is two decades old, but the pattern is the reason the American Urological Association (AUA) guideline now makes instruction a formal recommendation: "When men are prescribed an oral PDE5i for the treatment of ED, instructions should be provided to maximize benefit/efficacy" (${ext(S.aua, "AUA Erectile Dysfunction guideline, 2018")}, Statement 9, Strong Recommendation). The guideline's own explanation is blunt: incorrect use, such as lack of sexual stimulation or taking the medication with a large meal, "accounts for a large percentage of treatment failures," and "more than one trial with the medication may be required to establish efficacy."</p>
<p>So before you conclude that sildenafil is not for you, this guide walks through the checks in the order the evidence supports: the dose, the timing, the meal, the arousal, the number of attempts, the interactions, then the alternatives (a different pill, daily dosing, testosterone) and finally what urologists reach for when pills genuinely fall short. ${SAFETY}</p>`,
    },
    {
      heading: "How well does sildenafil work when it is used properly?",
      body: `<p>It helps to know what "working" looks like in the trials, because the bar is high. These are the numbers from the ${ext(S.viagra, "Viagra prescribing information")} (section 14) and from the largest independent pooling of sildenafil trials, ${ext(S.fink, "Fink and colleagues, Archives of Internal Medicine, 2002")} (27 randomized trials, 6,659 men).</p>
<table><thead><tr><th>Measure</th><th>Sildenafil</th><th>Placebo</th><th>Source</th></tr></thead><tbody>
<tr><td>Men reporting improved erections, fixed dose 25 mg</td><td>63%</td><td rowspan="3">24%</td><td rowspan="3">Viagra label, four fixed-dose studies (1,797 men)</td></tr>
<tr><td>Fixed dose 50 mg</td><td>74%</td></tr>
<tr><td>Fixed dose 100 mg</td><td>82%</td></tr>
<tr><td>Men reporting improved erections, pooled trials</td><td>78%</td><td>25%</td><td>Fink 2002 (3,535 men)</td></tr>
<tr><td>Intercourse attempts that succeeded</td><td>57%</td><td>21%</td><td>Fink 2002 (2,283 men)</td></tr>
<tr><td>At least one successful intercourse during the trial</td><td>83%</td><td>45%</td><td>Fink 2002 (2,205 men)</td></tr>
<tr><td>Men with diabetes: improved erections</td><td>57% (label) / 63% (Fink)</td><td>10% / 19%</td><td>Viagra label; Fink 2002</td></tr>
<tr><td>Men after radical prostatectomy: improved erections</td><td>43%</td><td>15%</td><td>Viagra label, all trials</td></tr>
<tr><td>Psychogenic ED: improved erections</td><td>84%</td><td>26%</td><td>Viagra label (328 men)</td></tr>
</tbody></table>
<p>Two things stand out. First, the dose matters: the jump from 25 mg to 100 mg takes the response rate from 63% to 82%. Second, "works" does not mean every attempt works. Even in men who respond, roughly four attempts in ten did not end in intercourse in the pooled trials. A single disappointing night is not a drug failure; it is one data point.</p>
<p>The flip side of the dose curve is side effects. In the pooled trials, 48% of men on sildenafil reported some adverse event against 36% on placebo, mostly headache (11% vs 4%), flushing (12% vs 2%), indigestion (5% vs 1%) and visual disturbance (3% vs 0.8%). Dropout because of side effects was no higher than placebo (1.3% vs 1.2%). That is the trade the AUA asks you and your prescriber to make deliberately: find the dose that meets expectations without unacceptable side effects, which "may require that initial doses be titrated up or down."</p>`,
    },
    {
      heading: "The six mistakes that make sildenafil look like it failed",
      body: `<p>Each of these has a number attached from the label or the non-responder study. Go through them honestly before changing anything else.</p>
<table><thead><tr><th>Mistake</th><th>What the evidence says</th><th>What to do</th></tr></thead><tbody>
<tr><td><strong>1. Never tried the full dose</strong></td><td>45 of the 56 misusers in the 2005 study had never taken 100 mg. The label's response rates rise from 63% at 25 mg to 82% at 100 mg.</td><td>Ask your prescriber about titrating up (next section). Do not double up on your own.</td></tr>
<tr><td><strong>2. Taken too close to sex</strong></td><td>22 of the 56 took it immediately before sex. Peak blood levels arrive at a median of 60 minutes (range 30 to 120) when fasted; the label says take it about 1 hour before, anywhere from 30 minutes to 4 hours.</td><td>Take it an hour ahead. If you want spontaneity, see the tadalafil and avanafil options below.</td></tr>
<tr><td><strong>3. Taken after a big meal</strong></td><td>32 of the 56 took it on a full stomach. A high-fat meal delays the peak by a mean of 60 minutes and lowers it by 29% (Viagra label, section 12.3).</td><td>Take it before eating, or leave a gap after a heavy or fatty meal.</td></tr>
<tr><td><strong>4. Expecting it to work without arousal</strong></td><td>12 of the 56 did not know stimulation was necessary. Sildenafil amplifies a signal; it does not create one.</td><td>Build in foreplay. Performance anxiety that blocks arousal blocks the drug too.</td></tr>
<tr><td><strong>5. Giving up after one or two tries</strong></td><td>The AUA says "more than one trial with the medication may be required." The 2005 study asked men to use at least four tablets before re-evaluating.</td><td>Count attempts at the right dose, taken the right way, before judging.</td></tr>
<tr><td><strong>6. Ignoring interactions and conditions</strong></td><td>Eight of the 100 had tried 100 mg despite factors that slow sildenafil's clearance. The label recommends a 25 mg starting dose with strong CYP3A4 inhibitors (such as ketoconazole, itraconazole or ritonavir), in men over 65, and with liver or severe kidney impairment.</td><td>Give your prescriber the full medication list, including supplements. Alpha-blockers for blood pressure or prostate symptoms need dose timing advice too.</td></tr>
</tbody></table>
<p>The 2005 authors also found that only a third of the men had ever been scheduled for follow-up. If nobody has asked you how the first prescription went, that is itself a gap worth closing: a 10-minute follow-up is where titration happens.</p>`,
    },
    {
      heading: "Should you increase the dose to 100 mg?",
      body: `<p>For most healthy men who have had a proper trial of 50 mg without enough effect, yes, that is the next step the guideline expects. AUA Statement 10 reads: "For men who are prescribed PDE5i, the dose should be titrated to provide optimal efficacy" (Strong Recommendation, Evidence Level Grade B). The Viagra label's usual starting dose is 50 mg, adjustable between 25 mg and 100 mg "based on efficacy and tolerability," with a maximum of once per day.</p>
<p>Three groups should <em>not</em> simply go up:</p>
<ul>
<li><strong>Men already on the maximum.</strong> 100 mg is the ceiling. More is not more effective and raises the side-effect rate, which the label notes increases with dose.</li>
<li><strong>Men the label says should start at 25 mg.</strong> Age over 65, liver impairment, severe kidney impairment, and strong CYP3A4-inhibiting drugs all raise sildenafil blood levels. Here the right move is a conversation, not a bigger pill.</li>
<li><strong>Men on alpha-blockers or with unstable cardiovascular disease.</strong> Sildenafil adds to the blood-pressure-lowering effect of alpha-blockers, and the AUA guideline treats ED itself as a cardiovascular warning sign: in the Prostate Cancer Prevention Trial, ED predicted future cardiac events as strongly as smoking or a family history of heart attack.</li>
</ul>
<p>If your prescriber agrees to 100 mg, run the same honest trial you should have run at 50 mg: several attempts, an hour ahead, away from heavy meals, with real arousal. Only then does "sildenafil doesn't work for me" become a conclusion rather than a guess.</p>`,
    },
    {
      heading: "Would a different ED pill work better than sildenafil?",
      body: `<p>Sometimes, though usually for practical reasons rather than potency. The AUA guideline's reading of the trials is that differences in efficacy between the four FDA-approved PDE5 inhibitors "are small and non-linear." Where they genuinely differ is timing, duration and the food effect, which is exactly where most sildenafil "failures" come from. The numbers below are taken from each drug's own label, so the efficacy measures are not identical across columns; the timing and food rows are the ones that matter for troubleshooting.</p>
<table><thead><tr><th></th><th>Sildenafil (Viagra)</th><th>Tadalafil (Cialis)</th><th>Vardenafil (Levitra)</th><th>Avanafil (Stendra)</th></tr></thead><tbody>
<tr><td>Take it this long before sex</td><td>About 1 hour (30 min to 4 h)</td><td>Before anticipated activity; proven up to 36 h</td><td>About 60 minutes</td><td>As early as about 15 minutes (50 mg: about 30)</td></tr>
<tr><td>Time to peak blood level (fasted)</td><td>Median 60 min</td><td>Median 2 h (30 min to 6 h)</td><td>Median 60 min</td><td>Median 30 to 45 min</td></tr>
<tr><td>High-fat meal effect</td><td>Peak delayed 60 min, 29% lower</td><td>None: "may be taken without regard to food"</td><td>Peak 18% to 50% lower</td><td>Peak delayed 1.1 to 1.25 h, 39% lower; label still allows food</td></tr>
<tr><td>Half-life</td><td>About 4 h</td><td>17.5 h</td><td>4 to 5 h</td><td>About 5 h</td></tr>
<tr><td>Usual start / range</td><td>50 mg / 25 to 100 mg</td><td>10 mg / 5 to 20 mg as needed; 2.5 to 5 mg daily</td><td>10 mg / 5 to 20 mg</td><td>100 mg / 50 to 200 mg</td></tr>
<tr><td>Label efficacy figure (metric differs by drug)</td><td>74% improved erections at 50 mg, 82% at 100 mg (placebo 24%)</td><td>Successful intercourse per attempt at 24 h: 56% (10 mg), 67% (20 mg) vs 42%</td><td>Successful intercourse: 64% (10 mg), 65% (20 mg) vs 32%</td><td>Successful intercourse: 57% (100 and 200 mg) vs 27%</td></tr>
<tr><td>Earliest-onset data</td><td>Not reported in the label</td><td>At or before 30 min: 52% on 20 mg vs 35% placebo</td><td>Not reported</td><td>At about 15 min: 26% to 29% of attempts vs 15%</td></tr>
</tbody></table>
<p>Sources: ${ext(S.viagra, "Viagra label")}, ${ext(S.cialis, "Cialis label")}, ${ext(S.levitra, "Levitra label")}, ${ext(S.stendra, "Stendra label")}, all on DailyMed, read November 15, 2026.</p>
<p>How to use the table: if your failures cluster around <strong>meals and timing</strong>, tadalafil removes the food problem and gives a day-and-a-half window. If the problem is <strong>spontaneity</strong>, avanafil's 15-minute label is the shortest, and tadalafil's long tail means a dose taken in the morning still covers the evening. If side effects at 100 mg sildenafil are the issue, a different molecule at a moderate dose is a reasonable experiment. What switching will not fix is a problem that is not pharmacological: unaddressed anxiety, a relationship issue, or an untreated medical cause will travel with you to the next pill. Our guide to <a href="/ed/articles/sildenafil-vs-cialis">sildenafil vs Cialis</a> goes deeper on the two most-prescribed options.</p>`,
    },
    {
      heading: "Does daily tadalafil help when on-demand pills fail?",
      body: `<p>For some men, yes, and it is one of the strategies the research literature specifically proposes for "non-responders." The 2007 European Urology review ${ext(S.dayAfter, "Phosphodiesterase type 5 inhibitors: the day after")} concluded that inappropriate instructions, lack of follow-up and the absence of patient-centred care are "the main reasons for non-response," and named "chronic, low, everyday doses" of PDE5 inhibitors as an alternative strategy worth developing.</p>
<p>The data behind once-daily tadalafil come from the ${ext(S.cialis, "Cialis label")}, section 14. In a 24-week US study, the proportion of intercourse attempts that succeeded rose by 31 percentage points on 2.5 mg daily and 35 points on 5 mg daily, against 10 points on placebo; the erectile-function score rose 6.1 and 7.0 points against 1.2. In men with diabetes, the gains were 26 and 25 points against 8. Because the drug is always present, there is nothing to time and no meal to avoid, which removes four of the six mistakes above in one move.</p>
<p>The trade-offs are a pill every day, the running cost of a daily prescription, and the fact that daily tadalafil is still a PDE5 inhibitor: the nitrate rule and the alpha-blocker caution apply every day, not just on the nights you plan to be active. Our comparison of <a href="/ed/articles/daily-vs-as-needed-tadalafil">daily vs as-needed tadalafil</a> covers how to decide.</p>`,
    },
    {
      heading: "Could low testosterone be why sildenafil isn't working?",
      body: `<p>It can be part of the picture, and the AUA guideline wants it checked rather than assumed. Statement 4 says morning serum total testosterone "should be measured" in men with ED (Moderate Recommendation), with testosterone deficiency defined as a total testosterone below 300 ng/dL together with symptoms. Statement 12 then adds the part that matters for a failed pill: "Men with ED and testosterone deficiency who are considering ED treatment with a PDE5i should be informed that PDE5i may be more effective if combined with testosterone therapy" (Moderate Recommendation, Evidence Level Grade C).</p>
<p>Two cautions from the same guideline keep this honest. Testosterone therapy "is not an effective monotherapy for ED": if your testosterone is low, the fix is usually testosterone <em>plus</em> a PDE5 pill, not instead of it. And low testosterone affects desire more directly than the plumbing of an erection, so a man with normal libido and a clear vascular cause is less likely to be helped. If your sildenafil trial failed and nobody has drawn a testosterone level, that is a reasonable next request; our guide to <a href="/ed/articles/can-low-testosterone-cause-ed">low testosterone and ED</a> explains what the result means.</p>`,
    },
    {
      heading: "Which health conditions make PDE5 pills less effective?",
      body: `<p>Response rates are lower, though far from zero, in three well-documented groups. The numbers are from the labels and the Fink pooled analysis cited above.</p>
<table><thead><tr><th>Condition</th><th>Sildenafil response</th><th>Placebo</th><th>Why</th></tr></thead><tbody>
<tr><td>Diabetes</td><td>57% improved erections (label); 44% of attempts succeeded (Fink)</td><td>10%; 16%</td><td>Nerve and small-vessel damage reduce the signal the drug amplifies</td></tr>
<tr><td>After radical prostatectomy</td><td>43% improved erections (label); vardenafil: 37% successful intercourse at 10 mg</td><td>15%; 10%</td><td>Cavernous nerve injury; the AUA notes early PDE5i use after surgery may not restore spontaneous erections</td></tr>
<tr><td>Severe vascular or neurological disease</td><td>Lower, per the 2007 review ("may be resistant")</td><td></td><td>Blood supply or nerve supply too damaged for a pill to compensate</td></tr>
</tbody></table>
<p>If you fall into one of these groups and pills are disappointing even at full dose, the realistic next step is often not a fourth pill but the second-line options below, which work by a different route. Diabetes also deserves its own management: our guide to <a href="/ed/articles/ed-and-diabetes">ED and diabetes</a> explains why glucose control and ED travel together.</p>`,
    },
    {
      heading: "What should you try if sildenafil truly doesn't work?",
      body: `<p>Once you have had a fair trial (right dose, right timing, several attempts, testosterone checked), the AUA guideline does not treat you as out of options. It says men should be told about <em>all</em> treatments not contraindicated for them, and it lists the following with their recommendation strengths:</p>
<ul>
<li><strong>A second PDE5 inhibitor or daily dosing</strong>, covered above.</li>
<li><strong>Vacuum erection devices</strong> (Moderate Recommendation): mechanical, drug-free, and usable alongside pills.</li>
<li><strong>Intraurethral alprostadil</strong> (Conditional Recommendation), a pellet absorbed through the urethra, with an in-office test dose first.</li>
<li><strong>Penile injections</strong> such as alprostadil or Trimix (Moderate Recommendation): the guideline's review found satisfaction rates of 53.7% to 100% across studies, with priapism in about 1.8% and needing instruction in the technique. Our guide to <a href="/ed/articles/trimix-for-ed">Trimix for ED</a> covers it in detail.</li>
<li><strong>Penile implants</strong> (Strong Recommendation to inform men), with the highest satisfaction of any option in the guideline's review.</li>
</ul>
<p>The right order depends on your health, your partner, how invasive you are willing to go and cost. Every option is lined up side by side in <a href="/ed/articles/ed-treatment-options-compared">ED treatments compared</a>.</p>`,
    },
    {
      heading: "When should you stop troubleshooting and get checked?",
      body: `<p>Some situations should end the home experiment and start a medical one:</p>
<ul>
<li><strong>Chest pain, breathlessness or dizziness during sex.</strong> Stop and seek care. The AUA frames ED as an early cardiovascular signal, and a pill that is "not working" in a man with silent heart disease is a reason for a cardiac check, not a bigger dose.</li>
<li><strong>You take nitrates in any form</strong>, including recreational "poppers". PDE5 inhibitors plus nitrates can cause a dangerous drop in blood pressure. The combination is contraindicated on every label.</li>
<li><strong>An erection lasting more than four hours</strong>, or sudden loss of vision or hearing: emergency care.</li>
<li><strong>A sudden onset</strong> of ED, ED with pain or curvature, or ED alongside new urinary symptoms, fatigue or low mood: these need evaluation, not a different pill.</li>
<li><strong>Pills bought without a prescription.</strong> If the product never went through a clinician, you cannot know the dose or even the ingredient. Start over with a legitimate prescription; our guide to <a href="/ed/articles/buying-ed-medication-online-safely">buying ED medication online safely</a> explains what to check.</li>
</ul>
<p>${SAFETY} This article is general information from published labels and guidelines; it is not medical advice, and the right dose for you is a decision for a licensed prescriber who knows your history.</p>`,
    },
    {
      heading: "Where online ED providers fit in",
      body: `<p>Telehealth is where most men now get these prescriptions, and it changes the troubleshooting in one useful way: adjusting a dose or switching molecules is a message to the clinician rather than a new appointment. The providers we rank each offer the standard generics (sildenafil and tadalafil) with a licensed clinician reviewing the intake; some add compounded multi-ingredient formulas for men a single pill has underserved, which are not FDA-approved and depend entirely on that clinician review being thorough. Our <a href="/ed/reviews">ED provider reviews</a> cover each one, and the <a href="/ed/ed-cost-index">ED treatment cost index</a> prices every option per dose.</p>
<p>Whichever route you take, carry the checklist from this page into the conversation: the dose you actually tried, how long before sex you took it, what you had eaten, how many attempts you made, your full medication list, and whether anyone has checked your testosterone. A clinician with those six facts can usually tell you within minutes whether sildenafil failed you or the instructions did.</p>`,
    },
  ],
};
