import type { ArticleData } from "../../config";

// ───── GLP-1 drugs and hair loss (Nov 6, 2026) ─────
// Trend article: the BMJ target-trial emulation (Jul 22, 2026), NYU
// Langone's genetic study (Sep 3, 2026) and the follow-up coverage
// (Washington Post Oct 3, Medscape Oct 28) made "Ozempic hair loss" one of
// the most-searched hair questions this autumn. Every figure links the study,
// release or report it came from. Association is never presented as cause,
// and the absolute risk is stated next to every relative one. No dosing
// advice; oral minoxidil is named as off-label.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  bmjRelease: "https://bmjgroup.com/glp-1-diabetes-drugs-linked-to-increased-risk-of-hair-loss/",
  healioBmj: "https://www.healio.com/news/dermatology/20260731/glp1-therapy-associated-with-hair-loss-in-people-with-type-2-diabetes",
  mxBmj: "https://medicalxpress.com/news/2026-07-glp-diabetes-drugs-linked-higher.html",
  smc: "https://www.sciencemediacentre.org/expert-reaction-to-a-target-trial-emulation-study-on-risk-of-hair-loss-associated-with-glp-1-ras-in-adults-with-type-2-diabetes/",
  nyu: "https://nyulangone.org/news/some-hair-loss-men-linked-use-weight-loss-drugs",
  wapo: "https://www.washingtonpost.com/wellness/2026/10/03/new-study-suggests-possible-connection-between-glp-1s-hair-loss-men/",
  review: "https://journals.sagepub.com/doi/10.1177/00368504261444578",
  meta: "https://www.sciencedirect.com/science/article/abs/pii/S0168822726002536",
  medscapeAdvice: "https://www.medscape.com/viewarticle/navigating-glp-1-hair-loss-your-patients-2026a1000t2l",
  medscapeOct: "https://www.medscape.com/viewarticle/hair-loss-associated-glp-1-ras-appear-similar-race-2026a10014r5",
};

export const HL_GLP1_HAIR_LOSS: ArticleData = {
  slug: "glp1-hair-loss",
  title: "Ozempic Hair Loss: What 2026 Studies Show & What Helps",
  description:
    "New 2026 studies tie Ozempic, Wegovy and Zepbound to a modestly higher risk of hair loss. Why shedding happens, whether it's permanent, and what helps.",
  category: "Guide",
  readTime: "7 min read",
  publishedAt: "2026-11-06",
  updatedAt: "2026-11-06",
  heroColor: "#EEF3F8",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "A July 2026 BMJ study found people with type 2 diabetes on GLP-1s were 1.37 to 1.68 times as likely to be diagnosed with hair loss as people on other diabetes drugs, but the extra risk works out to roughly two or three cases per 1,000 people a year.",
    "Most of it looks like telogen effluvium, a temporary shed triggered by fast weight loss and eating less, not damage to the follicles.",
    "Men already prone to pattern baldness may be more exposed: a September 2026 NYU genetic study linked higher GLP-1 receptor activity to about 7% higher odds of male-pattern hair loss.",
    "Eating enough protein, losing weight at a steadier pace and checking for low iron help with shedding; pattern hair loss needs its own treatment, such as minoxidil or finasteride.",
  ],
  sections: [
    {
      heading: "Does Ozempic cause hair loss?",
      body: `<div class="qa"><strong>The short answer</strong>It's linked to it, modestly. Studies published in 2026 found more hair-loss diagnoses in people taking GLP-1 drugs such as semaglutide (Ozempic, Wegovy) and tirzepatide (Mounjaro, Zepbound), but the absolute increase is small and no study has shown the drugs damage hair directly. Most cases look like temporary shedding set off by rapid weight loss, which usually settles once your weight steadies. If you were already losing hair to male- or female-pattern loss, a GLP-1 can make it more noticeable, and that part won't fix itself.</div><p>Hair loss is one of the most talked-about worries among people on these medications, ${ext(S.wapo, "the Washington Post noted")} in October 2026. The good news is that it's usually the kind of hair loss that grows back. The useful thing is knowing which kind you have, because the two need very different responses.</p>`,
    },
    {
      heading: "What did the 2026 studies actually find?",
      body: `<table><thead><tr><th>Study</th><th>Who</th><th>Finding</th><th>What it means</th></tr></thead><tbody>
<tr><td>${ext(S.bmjRelease, "BMJ, July 2026")}</td><td>Adults with type 2 diabetes in the University of Pennsylvania health system, 2019 to 2024</td><td>GLP-1 users were 1.37 times as likely to develop hair loss as people on SGLT-2 inhibitors, and 1.68 times as likely as people on DPP-4 inhibitors, ${ext(S.healioBmj, "Healio reported")}. The link held only for non-scarring hair loss</td><td>Absolute risk is low: about two to three extra recorded cases per 1,000 person-years, ${ext(S.smc, "one independent expert calculated")}</td></tr>
<tr><td>${ext(S.review, "Tirzepatide weight-loss trials")} (pooled in a 2026 review)</td><td>About 4,400 people in clinical trials</td><td>Hair loss reported in 5.4% on tirzepatide versus about 1% on placebo</td><td>The most direct trial evidence, in people losing a lot of weight</td></tr>
<tr><td>${ext(S.meta, "2026 meta-analysis")}</td><td>9 studies, 4,114 people</td><td>About three times the risk of hair loss on GLP-1s, with overall incidence under 5%</td><td>Higher relative risk, still uncommon</td></tr>
<tr><td>${ext(S.nyu, "NYU Langone, September 2026")}</td><td>Genetic data from more than 200,000 men</td><td>Higher GLP-1 receptor gene activity linked to about 7% higher odds of male-pattern hair loss</td><td>Genetic association only; the mechanism isn't established</td></tr>
</tbody></table><p>None of these studies can prove the drug itself causes the loss. The BMJ study was observational, and its authors couldn't measure how severe the hair loss was or whether it reversed. A 7% rise in odds is not the same as 7% of people losing hair; it's a modest shift in risk for men who are already predisposed.</p>`,
    },
    {
      heading: "Why do GLP-1 drugs make your hair fall out?",
      body: `<p>The leading explanation is ${ext(S.review, "telogen effluvium")}: a shock to the system pushes more hairs than usual into the resting phase at once, and they fall out together some weeks later. Rapid weight loss is a classic trigger, and so is eating much less than you used to, especially too little protein, iron or zinc. On a GLP-1 you're often doing both. The same 2026 review notes that a direct effect on the hair follicle "cannot be excluded," so researchers are still looking.</p><p>Telogen effluvium tends to look diffuse: more hair in the shower drain and on the brush, a thinner ponytail, but no bald patches. That's different from pattern hair loss, which follows a shape, a receding hairline or thinning crown in men, a widening part in women. Our explainer on <a href="/hair-loss/articles/can-stress-cause-hair-loss">stress and hair loss</a> covers telogen effluvium in more depth.</p>`,
    },
    {
      heading: "Is GLP-1 hair loss permanent?",
      body: `<p>Usually not. Clinicians are advised to tell patients the shedding is "likely temporary, non-scarring, and reversible," ${ext(S.medscapeAdvice, "Medscape's guidance for doctors says")}. The shed tends to show up a couple of months after the trigger, which is why it can catch people off guard well into treatment, and it fades once weight loss slows and eating settles into a routine.</p><p>Regrowth is slow because hair grows slowly. New hair comes in short and fine, so it takes months before your hair looks fuller again. If you're also seeing your hairline move back or your crown thin, that's likely pattern loss being unmasked, and it needs treatment to stop.</p>`,
    },
    {
      heading: "Are men with male-pattern baldness at higher risk?",
      body: `<p>Possibly. The ${ext(S.nyu, "NYU Langone study")} looked at genes, not prescriptions, and found that higher GLP-1 receptor activity went with higher odds of male-pattern hair loss. The senior investigator suggested that, if future experiments hold up, some men might one day be screened for hair-loss risk before starting a GLP-1. For now, the practical takeaway is simpler: if baldness runs in your family, keep an eye on your hairline once you start, and act early, because pattern hair loss is far easier to hold than to reverse. Our guide to <a href="/hair-loss/articles/dht-and-hair-loss">DHT and hair loss</a> explains why.</p><p>If you want treatment for pattern hair loss, our three highest-ranked online providers are below. Whichever you choose, mention that you're on a GLP-1 when you fill in the intake.</p>`,
    },
    {
      heading: "What helps with hair loss on a GLP-1?",
      body: `<ul><li><strong>Eat enough protein.</strong> Medscape's guidance for clinicians stresses protein, iron, zinc, vitamin D, B12 and folate. When appetite is low, protein is the thing to protect first. Our sister guide on <a href="/weight-loss/articles/what-to-eat-on-glp1-medication">what to eat on a GLP-1</a> has practical ideas.</li><li><strong>Lose weight at a steadier pace.</strong> ${ext(S.medscapeOct, "Medscape reported in October 2026")} that some clinicians suggest aiming for about half a pound to a pound a week. Talk to your prescriber before changing your dose.</li><li><strong>Check your iron.</strong> Low iron stores are a common, fixable cause of shedding. See our guide to <a href="/hair-loss/articles/iron-deficiency-hair-loss">iron deficiency and hair loss</a>.</li><li><strong>Don't stop your GLP-1 on your own.</strong> The shed usually passes, and stopping suddenly brings its own problems.</li><li><strong>Treat pattern loss if you have it.</strong> Topical minoxidil is FDA-approved for pattern hair loss; low-dose oral minoxidil is widely prescribed but off-label; finasteride is for men. None is proven to prevent GLP-1 shedding specifically, but they treat the pattern loss a GLP-1 can unmask. See <a href="/hair-loss/articles/oral-minoxidil-vs-topical-minoxidil">oral vs topical minoxidil</a> and <a href="/hair-loss/articles/finasteride-side-effects">finasteride side effects</a>.</li></ul>`,
    },
    {
      heading: "Can you take minoxidil or finasteride with a GLP-1?",
      body: `<p>Many people do, but tell the prescriber about both. Oral minoxidil was first a blood-pressure drug, and losing a lot of weight can lower blood pressure too, so a clinician will want to know you're on a GLP-1 before prescribing it. Topical minoxidil has much less effect on blood pressure. Finasteride isn't for anyone who is or could become pregnant. The safest route is one prescriber who sees your whole medication list; our guide to <a href="/hair-loss/articles/finasteride-and-minoxidil-together">using finasteride and minoxidil together</a> covers the combination itself.</p>`,
    },
    {
      heading: "When should you see a doctor about shedding?",
      body: `<p>See a clinician, ideally a dermatologist, if the hair loss comes in patches, if your scalp is itchy, scaly, red or painful, if you're losing eyebrow or body hair, or if heavy shedding goes on for many months without easing. Those point away from simple shedding and toward something that needs its own diagnosis, such as alopecia areata or a scarring condition. A blood test for iron and thyroid function is a sensible first step for anyone whose hair changes suddenly.</p>`,
    },
    {
      heading: "The bottom line",
      body: `<p>GLP-1 drugs are linked to a small rise in hair loss, mostly temporary shedding from losing weight quickly. It usually grows back once things settle, and eating enough protein, keeping weight loss steady and checking iron all help. If you're seeing a receding hairline or thinning crown, that's pattern hair loss, and it's worth treating early. For more, see our guides to <a href="/hair-loss/articles/how-long-hair-loss-treatment-works">how long hair-loss treatment takes to work</a> and <a href="/hair-loss/articles/hair-loss-treatment-for-women">hair-loss treatment for women</a>. This is general information, not medical advice.</p>`,
    },
  ],
};
