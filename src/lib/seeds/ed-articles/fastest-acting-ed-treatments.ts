import type { ArticleData } from "../../config";

// ───── Fastest-acting ED treatments (Nov 6, 2026) ─────
// Trend article: a compounded vardenafil nasal spray (Roxus) began US
// prescribing in October 2026, the FDA approved the first sildenafil oral
// film (Vybrique) in February 2026, and under-the-tongue ED tablets are
// heavily advertised this autumn. Approval status is stated for every
// product: compounded products are named as not FDA-approved, with the
// FDA's own wording linked. Speed figures are blood-level (pharmacokinetic)
// results, labelled as such, never as time-to-erection. Label figures link
// the labels; company figures are attributed to the company.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  fdaCompounding: "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-the-fda-questions-and-answers",
  medscapeRoxus: "https://www.medscape.com/viewarticle/new-nasal-spray-erectile-dysfunction-now-available-us-2026a10012th",
  roxusRelease: "https://www.morningstar.com/news/pr-newswire/20261005ny63222/roxus-rises-to-the-occasion-with-the-next-generation-of-rapid-acting-intranasal-pde-5-treatment",
  roxusYahoo: "https://finance.yahoo.com/healthcare/articles/roxus-ed-nasal-spray-now-090000532.html",
  roxusPk: "https://stockhead.com.au/health/clinical-data-for-ltr-pharmas-ed-nasal-spray-published-in-peer-reviewed-journal",
  mensFitness: "https://www.mensfitness.com/nutrition/i-tried-erectile-dysfunction-nasal-spray-it-worked-in-minutes",
  vybrique: "https://www.drugtopics.com/view/fda-approves-sildenafil-as-first-oral-film-to-treat-men-with-erectile-dysfunction",
  vybriqueRelease: "https://www.biospace.com/press-releases/ibsa-usa-announces-fda-approval-of-vybrique-the-first-and-only-oral-film-to-treat-men-with-erectile-dysfunction",
  vybriqueTrial: "https://www.renalandurologynews.com/news/fda-approves-vybrique-oral-film-for-erectile-dysfunction/",
  viagraLabel: "https://labeling.pfizer.com/ShowLabeling.aspx?id=652",
  levitraLabel: "https://medlibrary.org/lib/rx/meds/levitra-1/",
  cialisLabel: "https://www.tga.gov.au/sites/default/files/auspar-tadalafil-130722-pi.pdf",
  staxyn: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0e5139d8-bf61-4f21-a36b-81b96b9b07d1",
  sparksAd: "https://marketingherald.com/articles/ro-casts-megan-fox-as-its-ed-pill-in-first-celebrity-sparks-campaign-8a319263",
  fdaTainted: "https://www.fda.gov/drugs/medication-health-fraud-notifications/erectus-plus-may-be-harmful-due-hidden-drug-ingredients",
};

export const ED_FASTEST_ACTING: ArticleData = {
  slug: "fastest-acting-ed-treatments",
  title: "Fastest-Acting ED Treatments: Sprays, Films & Sublinguals",
  description:
    "ED nasal spray, sildenafil oral film, under-the-tongue tablets: what's FDA-approved, how fast each really works, and what the evidence shows.",
  category: "Guide",
  readTime: "7 min read",
  publishedAt: "2026-11-06",
  updatedAt: "2026-11-06",
  heroColor: "#14243a",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "Standard ED pills reach peak levels in about an hour: sildenafil (Viagra) and vardenafil (Levitra) both have a median of 60 minutes on an empty stomach; tadalafil (Cialis) takes about two hours but lasts far longer.",
    "Roxus, a vardenafil nasal spray now prescribed in the US, reached peak blood levels in a median of 10 minutes in a small study, but it's compounded and not FDA-approved.",
    "Vybrique, approved in February 2026, is the first FDA-approved sildenafil film: it dissolves on the tongue with no water, but it's taken in the same 30-minute to 4-hour window as the pill.",
    "Faster blood levels aren't the same as a faster erection. Food, arousal and the right dose matter as much as the format, and nitrates rule all of these out.",
  ],
  sections: [
    {
      heading: "What's the fastest-acting ED treatment?",
      body: `<div class="qa"><strong>The short answer</strong>On paper, a nasal spray. In a small study, a vardenafil spray reached peak blood levels in a median of 10 minutes, against about an hour for tablets. But the version you can get in the US, Roxus, is compounded and not FDA-approved. Among FDA-approved options, sildenafil (Viagra, or the new Vybrique film) and vardenafil (Levitra) peak in around an hour on an empty stomach, and tadalafil (Cialis) peaks later but lasts up to a day and a half. For most men, taking a standard pill at the right time, without a heavy meal, works well.</div><p>Speed has become the selling point this year, with a nasal spray launching in October, a new film approved in February and under-the-tongue tablets advertised on prime-time TV. Here's what each one is, which ones the FDA has approved, and how much faster they really are.</p>`,
    },
    {
      heading: "How fast do Viagra, Cialis and Levitra work?",
      body: `<p>These figures come from the drugs' labels. They describe when the medicine peaks in your blood, which is a good guide to when it starts working, as long as you're aroused.</p><table><thead><tr><th>Medicine</th><th>Peak blood level (fasting)</th><th>When to take it</th><th>Effect of a heavy meal</th></tr></thead><tbody>
<tr><td>Sildenafil (Viagra)</td><td>30 to 120 minutes, median 60</td><td>30 minutes to 4 hours before sex, ${ext(S.viagraLabel, "per the label")}</td><td>A high-fat meal delays the peak by about an hour</td></tr>
<tr><td>Vardenafil (Levitra)</td><td>30 minutes to 2 hours, median 60, ${ext(S.levitraLabel, "per the label")}</td><td>About an hour before sex</td><td>High-fat meals lower the peak</td></tr>
<tr><td>Tadalafil (Cialis)</td><td>30 minutes to 6 hours, median 2 hours, ${ext(S.cialisLabel, "per the product information")}</td><td>Lasts up to 36 hours, or taken daily</td><td>Little effect</td></tr>
</tbody></table><p>So the simplest way to make a pill work faster is to take it on an empty stomach, or after a light meal. If spontaneity is the real goal, a daily low dose of tadalafil removes the timing question altogether; see <a href="/ed/articles/daily-vs-as-needed-tadalafil">daily vs as-needed tadalafil</a>. Our guide to <a href="/ed/articles/how-long-does-sildenafil-last">how long sildenafil lasts</a> covers the other end of the window.</p>`,
    },
    {
      heading: "Is there a nasal spray for ED in the US?",
      body: `<p>Yes, since October 2026, but it isn't FDA-approved. Roxus is a vardenafil nasal spray from the Australian company LTR Pharma. In the US it's a compounded product, ${ext(S.medscapeRoxus, "Medscape reported")}, "not approved by the U.S. Food and Drug Administration (FDA) for safety or efficacy." It's prescribed through Mavrox, a telehealth platform run by Shed, and filled by a compounding pharmacy that ships it to the patient, ${ext(S.roxusYahoo, "according to the companies")}. The company says it is separately developing an FDA-approved version, SPONTAN, which is heading toward a phase III trial.</p><p>The speed claim comes from a small study: in 18 healthy men, the spray reached peak blood levels in a median of 10 minutes against 45 to 60 minutes for a vardenafil tablet, ${ext(S.roxusPk, "as reported")} when the data were published. That's a blood-level measurement in healthy volunteers. As ${ext(S.mensFitness, "Men's Fitness put it")}, the studies didn't prove every user will get an erection within minutes. Side effects listed include headache, flushing, a stuffy or runny nose and indigestion, and, like every ED medicine in this class, it can't be used with nitrates.</p>`,
    },
    {
      heading: "What is Vybrique, the sildenafil oral film?",
      body: `<p>Vybrique is sildenafil in a thin film that dissolves on your tongue, no water needed. The FDA ${ext(S.vybrique, "approved it on February 5, 2026")} for men 18 and over; its maker, IBSA, calls it ${ext(S.vybriqueRelease, "the first and only oral film")} for ED. Approval rested on a 12-week placebo-controlled trial in 475 men, and it can be taken with or without food, 30 minutes to 4 hours before sex, ${ext(S.vybriqueTrial, "Renal &amp; Urology News reported")}.</p><p>The appeal is convenience and discretion rather than speed: it's the same medicine as Viagra, taken in the same window. It suits men who struggle to swallow pills, or who simply don't want to reach for a glass of water at the wrong moment.</p>`,
    },
    {
      heading: "Do under-the-tongue ED tablets work faster?",
      body: `<p>That's the claim, but most under-the-tongue ED products sold online are compounded, not FDA-approved, and the speed figures come from the companies selling them. One heavily advertised example is Ro's Sparks, a compounded sildenafil and tadalafil tablet that Ro markets as working in about 15 minutes, ${ext(S.sparksAd, "promoted in a celebrity campaign")} this autumn. We haven't found independent trial data for that figure.</p><p>There is one FDA-approved fast-dissolving format: vardenafil orally disintegrating tablets, first sold as Staxyn. Its ${ext(S.staxyn, "label")} warns it isn't interchangeable with a regular 10 mg vardenafil tablet, because it produces higher blood levels. If you want something you can take without water, ask the prescriber about the approved options first. Our three highest-ranked online ED providers are below; ask whichever you choose which formats it prescribes.</p>`,
    },
    {
      heading: "Are compounded fast-acting ED products safe?",
      body: `<p>They're legal when prescribed and made by a licensed pharmacy, but they don't go through FDA review. In the FDA's ${ext(S.fdaCompounding, "own words")}, "compounded drugs are not FDA-approved," and the agency doesn't verify their safety, effectiveness or quality before they're sold. That doesn't mean they don't work. It means the evidence behind them is thinner, and a combination product such as sildenafil plus tadalafil hasn't been studied the way each drug has on its own.</p><p>If you choose a compounded format, use a licensed US telehealth provider and pharmacy, and ask what's in it and why it's being recommended over an approved option. Our guide to <a href="/ed/articles/buying-ed-medication-online-safely">buying ED medication online safely</a> lists the checks.</p>`,
    },
    {
      heading: "Does faster mean better?",
      body: `<p>Not really. Every one of these medicines needs sexual arousal to work; none produces an erection on its own, however quickly it reaches your blood. What makes the bigger difference for most men is getting the basics right: the right dose, taken without a heavy meal, and enough time to let it work. If a standard dose isn't working, that's a conversation about the dose or a different medicine, not necessarily a faster format. See <a href="/ed/articles/sildenafil-doses-explained">sildenafil doses explained</a> and <a href="/ed/articles/sildenafil-vs-cialis">sildenafil vs Cialis</a>.</p>`,
    },
    {
      heading: "Who should be careful with fast-acting ED medicines?",
      body: `<ul><li><strong>Anyone on nitrates</strong> (such as nitroglycerin for chest pain, or "poppers") or riociguat. The combination can drop blood pressure dangerously. This rules out every product on this page.</li><li><strong>Men on alpha-blockers or several blood-pressure medicines</strong>, who need a prescriber to check the combination. See <a href="/ed/articles/ed-pills-and-blood-pressure-medication">ED pills and blood pressure medication</a>.</li><li><strong>Anyone tempted to stack products</strong>, like a spray plus a pill. Don't combine ED medicines unless a prescriber has told you to.</li><li><strong>Men with heart disease.</strong> ED can be an early sign of it, so a check-up matters; see <a href="/ed/articles/erectile-dysfunction-heart-disease-warning-sign">ED as a heart warning sign</a>.</li></ul><p>Get emergency help for chest pain, an erection lasting more than four hours, or sudden loss of vision or hearing. And avoid "fast-acting" supplements and gummies sold without a prescription: the FDA keeps finding ${ext(S.fdaTainted, "hidden sildenafil or tadalafil")} in them, at unknown doses.</p>`,
    },
    {
      heading: "The bottom line",
      body: `<p>The fastest-acting ED products on the market right now are new formats: a nasal spray that peaks in minutes in small studies, and under-the-tongue tablets marketed on speed. Both are compounded and not FDA-approved. Among approved options, the sildenafil film adds convenience rather than speed, and standard pills still work within about an hour, faster on an empty stomach. Pick the format that suits your life, but let a prescriber check your medicines and your heart first. For the full picture of treatments, see our <a href="/ed/articles/erectile-dysfunction-treatment-complete-guide">complete ED treatment guide</a>. This is general information, not medical advice.</p>`,
    },
  ],
};
