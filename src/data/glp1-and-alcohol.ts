import type { Article } from "./articles";

// ───── GLP-1s and alcohol (Nov 6, 2026) ─────
// Trend article: the JAMA Psychiatry survey (covered early Nov 2026), the
// Lancet SEMALCO trial (May 2026), the oral-semaglutide trial (Jul 2026),
// the BMJ Open hospitalisation study (Jul 2026) and the VA CRAVE trial put
// "can you drink on Ozempic" and "do GLP-1s curb drinking" in the news at
// once. Every figure links the study, release or report it came from, with
// its date. Label warnings link the FDA prescribing information. Survey and
// observational results are labelled as such; nothing here suggests using a
// GLP-1 to treat alcohol use disorder, which no GLP-1 is approved for.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  nihLancet: "https://www.nih.gov/news-events/news-releases/adding-weekly-glp-1-cognitive-behavioral-therapy-further-reduces-heavy-drinking",
  lancet: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(26)00305-3/fulltext",
  healioLancet: "https://www.healio.com/news/endocrinology/20260501/semaglutide-reduces-heavy-drinking-for-adults-with-alcohol-use-disorder-obesity",
  apaOral: "https://psychiatry.org/news-room/news-releases/new-research-oral-semaglutide-reduced-heavy-drinki",
  jamaSurvey: "https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2854926",
  harvardSurvey: "https://news.harvard.edu/gazette/story/2026/11/about-half-of-drinkers-on-glp-1s-say-they-imbibed-less/",
  bmjOpen: "https://bmjopen.bmj.com/content/16/7/e109259",
  healioBmj: "https://www.healio.com/news/endocrinology/20260819/semaglutide-tirzepatide-may-lower-risk-for-alcoholrelated-hospitalizations",
  vaCrave: "https://www.va.gov/orlando-health-care/news-releases/va-launches-trial-of-glp-1-treatment-for-alcohol-use-disorder/",
  militaryTimes: "https://militarytimes.com/veterans/2026/07/30/va-launches-trial-to-test-glp-1-medication-for-alcohol-use-disorder-in-veterans",
  vtPilot: "https://www.news-medical.net/news/20251015/GLP-1-medications-found-to-slow-alcohol-absorption-and-lessen-intoxication.aspx",
  wegovyLabel: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2021/215256s000lbl.pdf",
  niddkPancreatitis: "https://www.niddk.nih.gov/health-information/digestive-diseases/pancreatitis/symptoms-causes",
  samhsa: "https://www.samhsa.gov/find-help/helplines/national-helpline",
};

export const glp1AndAlcoholArticle: Article = {
  slug: "glp1-and-alcohol",
  title: "GLP-1s and Alcohol: Can You Drink on Ozempic or Zepbound?",
  description:
    "Is it safe to drink on semaglutide or tirzepatide? The real risks, who should skip it, and what the 2026 studies found about GLP-1s and drinking less.",
  category: "Guide",
  readTime: "7 min read",
  publishedAt: "2026-11-06",
  updatedAt: "2026-11-06",
  heroColor: "#EEF3F8",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "There's no blanket ban on alcohol with semaglutide or tirzepatide, but the two overlap on the side effects that matter: an upset stomach, dehydration, pancreatitis and, on diabetes medication, low blood sugar.",
    "Skip alcohol entirely if you've had pancreatitis, take insulin or a sulfonylurea without your prescriber's OK, are pregnant or trying, or think your drinking is out of control.",
    "Many people simply want to drink less on a GLP-1: 44% of drinkers in a 2026 JAMA Psychiatry survey said they cut back in the first three months.",
    "In a 2026 Lancet trial, semaglutide plus therapy cut heavy drinking days more than therapy alone, but no GLP-1 is approved to treat alcohol use disorder.",
  ],
  sections: [
    {
      heading: "Can you drink alcohol on Ozempic, Wegovy or Zepbound?",
      body: `<div class="qa"><strong>The short answer</strong>For most people, an occasional drink isn't off-limits. Neither semaglutide (Ozempic, Wegovy) nor tirzepatide (Mounjaro, Zepbound) comes with a rule against alcohol. The catch is that alcohol and these medications can cause some of the same problems: nausea and vomiting, dehydration, pancreatitis and, if you also take diabetes medication, low blood sugar. So keep it light, never drink on an empty stomach, and ask your prescriber what's sensible for you. Many people find they want less anyway.</div><p>It's one of the first questions people ask once they start a GLP-1, usually just before a wedding, a work dinner or the holidays. The honest answer has two parts. There's the safety side, which is mostly common sense once you know where the overlaps are. And there's the surprising side: a growing pile of research, much of it published this year, on why so many people on these drugs lose interest in drinking.</p>`,
    },
    {
      heading: "What are the risks of mixing alcohol and GLP-1s?",
      body: `<p>None of these are reasons to panic. They're the places where a drink and a GLP-1 push in the same direction, which is worth knowing before you order a second one.</p><ul><li><strong>Your stomach.</strong> Nausea, vomiting and diarrhea are the most common GLP-1 side effects, and they peak in the first weeks and after each dose increase. Alcohol irritates the gut too. A drink that was fine last month can hit differently the week you step up a dose. Our <a href="/weight-loss/articles/semaglutide-side-effects-guide">side effects guide</a> covers how to manage nausea.</li><li><strong>Dehydration.</strong> The ${ext(S.wegovyLabel, "Wegovy prescribing information")} warns that fluid loss from vomiting or diarrhea can lead to kidney problems. Alcohol makes you lose fluid as well, so drink water alongside it, especially if your stomach is already unsettled.</li><li><strong>Pancreatitis.</strong> Acute pancreatitis is a listed warning on GLP-1 labels, and heavy alcohol use is one of the main causes of pancreatitis, per the ${ext(S.niddkPancreatitis, "NIH's digestive diseases institute")}. Severe stomach pain that spreads to your back needs urgent care, whether or not you've been drinking.</li><li><strong>Low blood sugar.</strong> GLP-1s on their own rarely cause it, but the label warns the risk goes up with insulin or a sulfonylurea. Alcohol lowers blood sugar too, and on a GLP-1 you're often eating less, so an empty stomach is easier to end up with than you'd think.</li></ul>`,
    },
    {
      heading: "Who should skip alcohol completely on a GLP-1?",
      body: `<ul><li>Anyone who has had <strong>pancreatitis</strong>, or has been told their triglycerides are very high.</li><li>People taking <strong>insulin or a sulfonylurea</strong> (such as glipizide or glyburide), unless their prescriber has said exactly how much is safe.</li><li>Anyone <strong>pregnant or trying to conceive</strong>. GLP-1s are usually stopped before a planned pregnancy anyway, so that's a conversation to have with your clinician early.</li><li>Anyone who feels their <strong>drinking is hard to control</strong>. That's not a GLP-1 question; it's a reason to get proper support. SAMHSA's free, confidential ${ext(S.samhsa, "National Helpline")} is 1-800-662-4357, any time. If you drink heavily every day, don't stop suddenly on your own: withdrawal can be dangerous, and a clinician can help you do it safely.</li></ul>`,
    },
    {
      heading: "Does alcohol feel different on a GLP-1?",
      body: `<p>It can. GLP-1s slow down how fast your stomach empties, and a small pilot study from Virginia Tech, ${ext(S.vtPilot, "reported in October 2025")}, found that people on these drugs absorbed alcohol into their bloodstream more slowly and said they felt less drunk. It was a pilot, and the authors described it that way.</p><p>Feeling less drunk is not the same as being less impaired. Don't use it as a reason to drink more, and never drive after drinking. The slower absorption can also mean a drink catches up with you later than you expect.</p>`,
    },
    {
      heading: "Why do some people drink less on a GLP-1?",
      body: `<p>Plenty of people notice it without looking for it: the glass of wine at dinner stops being appealing, or one drink is enough. In a ${ext(S.jamaSurvey, "JAMA Psychiatry survey")} of 242 people who drank when they started a GLP-1, 44.2% said they drank less in the first three months, and 52.6% said nothing changed. Among those who screened as possibly drinking at unhealthy levels, 54.1% cut back. Most of them hadn't heard it might happen: only about 10% of everyone surveyed knew GLP-1s might lower drinking, ${ext(S.harvardSurvey, "the Harvard Gazette reported")} in November 2026. It's self-reported, so it can't prove the drug caused the change, but it matches what clinicians hear.</p><p>The leading idea is that the same signals that quiet "food noise" also take the edge off the pull of alcohol. That's what the trials in the next section are testing. If you're comparing providers, our three highest-ranked are below. Whichever you pick, mention how much you drink when you fill in the intake.</p>`,
    },
    {
      heading: "What did the 2026 alcohol studies actually find?",
      body: `<table><thead><tr><th>Study</th><th>Who</th><th>What happened</th><th>How strong</th></tr></thead><tbody>
<tr><td>${ext(S.lancet, "Lancet trial")} (May 2026)</td><td>108 adults with alcohol use disorder and obesity, 26 weeks, all given cognitive behavioral therapy</td><td>Weekly semaglutide 2.4 mg cut heavy drinking days by 41.1%, a 13.7% bigger reduction than placebo, per the ${ext(S.nihLancet, "NIH")}</td><td>Randomized and placebo-controlled, but small</td></tr>
<tr><td>${ext(S.apaOral, "Oral semaglutide trial")} (Jul 2026)</td><td>50 adults with moderate to severe alcohol use disorder, 8 weeks</td><td>Fewer heavy drinking days, but it missed its main goal (cravings)</td><td>Small and short; the authors call it hypothesis-generating</td></tr>
<tr><td>${ext(S.bmjOpen, "BMJ Open study")} (Jul 2026)</td><td>40,703 adults with alcohol use disorder plus type 2 diabetes or obesity</td><td>People on semaglutide or tirzepatide had fewer alcohol-related hospital stays over a year than people on sulfonylureas (hazard ratio 0.74), ${ext(S.healioBmj, "Healio reported")}</td><td>Observational, so it can't prove cause</td></tr>
<tr><td>${ext(S.jamaSurvey, "JAMA Psychiatry survey")} (2026)</td><td>242 people who drank when starting a GLP-1</td><td>44.2% drank less in the first three months</td><td>Self-reported</td></tr>
</tbody></table><p>The pattern is consistent, but the strongest evidence still comes from small trials. Bigger ones are under way: the VA's ${ext(S.militaryTimes, "CRAVE trial")} is enrolling more than 600 veterans with moderate or severe alcohol use disorder at 18 VA medical centers. None of these studies used compounded semaglutide or tirzepatide.</p>`,
    },
    {
      heading: "Is semaglutide approved to treat alcohol use disorder?",
      body: `<p>No. The American Psychiatric Association's ${ext(S.apaOral, "July 2026 release")} says plainly that semaglutide "is not currently approved as a treatment for alcohol use disorder," and the same is true of tirzepatide. The VA, running its own trial, ${ext(S.vaCrave, "tells veterans")} not to swap proven treatment for a GLP-1 without talking to a provider.</p><p>Proven options already exist: FDA-approved medicines such as naltrexone and acamprosate, counseling and therapy. If cutting back is the goal, those are where to start, and a doctor can tell you whether a GLP-1 makes sense on top for your weight.</p>`,
    },
    {
      heading: "Should you tell your online GLP-1 provider how much you drink?",
      body: `<p>Yes, and be accurate. The intake questionnaire asks about your health history for a reason: a prescriber who knows you drink most nights, or have had pancreatitis, will make different calls on the medication and dose. You won't be judged for an honest answer, and it can't be used against you the way a wrong prescription can. If you're starting out, our <a href="/weight-loss/articles/how-to-start-glp1-treatment-online">step-by-step guide to starting GLP-1 treatment online</a> shows what the questions look like.</p><p>It's also worth asking your prescriber directly: "How much is reasonable for me while I'm on this?" The answer depends on your dose, your other medications and how your stomach is handling it.</p>`,
    },
    {
      heading: "The bottom line",
      body: `<p>An occasional drink on a GLP-1 is fine for most people, as long as you eat first, drink water and go easy around dose increases. Skip it altogether if you've had pancreatitis, take insulin or a sulfonylurea without your prescriber's go-ahead, or are pregnant or trying. If you find you're drinking less, you're in good company; the research is promising but early, and it's not a substitute for real treatment if alcohol is a problem. For the rest of the picture, see <a href="/weight-loss/articles/glp1-weight-loss-results">how much weight people lose on GLP-1s</a>, <a href="/weight-loss/articles/what-to-eat-on-glp1-medication">what to eat on a GLP-1</a> and our <a href="/weight-loss/articles/glp1-and-mental-health">guide to GLP-1s and mental health</a>. This is general information, not medical advice.</p>`,
    },
  ],
};
