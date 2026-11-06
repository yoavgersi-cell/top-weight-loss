import type { ArticleData } from "../../config";

// ───── Estrogen patch shortage 2026 (Nov 6, 2026) ─────
// Trend article: estradiol patches have been hard to fill since early 2026,
// with coverage from June (CNBC) through November (local TV), a House letter
// (Aug 6), a Senate letter (Oct 22, answers due Nov 16) and Reuters reporting
// the crunch spreading to injections and creams (Oct 28). Every figure links
// the report or release it came from. The FDA's wording ("not in shortage")
// and the pharmacists' listing are presented side by side, not merged.
// Midi's survey is labelled as company data. No dose conversions are given:
// a prescriber sets any switch. Supply changes fast - re-check after Nov 16.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  cnbc: "https://www.cnbc.com/2026/06/26/estrogen-patches-are-in-short-supply-as-women-seek-menopause-support.html",
  cbs: "https://www.cbsnews.com/news/estrogen-patch-shortage-fda-declaration-hormone-replacement-therapy/",
  urologyTimes: "https://www.urologytimes.com/view/fda-reports-increased-demand-supply-efforts-for-estradiol-transdermal-patches",
  stateline: "https://stateline.org/2026/09/16/fda-acknowledges-estrogen-patch-shortage-says-its-working-to-increase-supply/",
  senate: "https://www.gillibrand.senate.gov/news/press/release/gillibrand-duckworth-schiff-press-fda-on-plan-to-mitigate-estrogen-patch-shortage/",
  dingell: "https://debbiedingell.house.gov/news/documentsingle.aspx?DocumentID=7194",
  reuters: "https://whbl.com/2026/10/28/us-estrogen-supply-crunch-widens-as-women-seek-alternatives-to-scarce-patches/",
  nbc: "https://www.nbcnews.com/health/womens-health/fda-estrogen-patch-shortage-hormone-therapy-alternatives-rcna344233",
  climaraGeneric: "https://www.healio.com/news/endocrinology/20261020/fda-approves-first-generic-of-climara-pro-a-onceweekly-hormone-therapy-patch",
  aarp: "https://www.aarp.org/health/drugs-supplements/estrogen-patch-shortage-tips/",
  midiSurvey: "https://www.prnewswire.com/news-releases/the-menopause-society-features-midi-health-studies-on-estrogen-patch-challenges-and-symptom-research-302916107.html",
  midiPage: "https://www.joinmidi.com/estrogen-shortage",
};

export const HRT_ESTROGEN_PATCH_SHORTAGE: ArticleData = {
  slug: "estrogen-patch-shortage",
  title: "Estrogen Patch Shortage 2026: What to Do & Alternatives",
  description:
    "Can't fill your estradiol patch? What the FDA says, why it's happening, when supply may improve, and the alternatives to ask your prescriber about.",
  category: "Guide",
  readTime: "7 min read",
  publishedAt: "2026-11-06",
  updatedAt: "2026-11-06",
  heroColor: "#F6EFF4",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "Estradiol patches have been hard to fill across the US since early 2026. The FDA says they're not officially in shortage, but pharmacists have listed them as short since January, and lawmakers have pressed the FDA to act.",
    "The cause is demand: prescriptions rose from about 594,000 in June 2024 to 1.6 million in May 2026, after the FDA's November 2025 label change, and patches are slow to manufacture.",
    "Your options are another patch brand or strength, a gel or spray, a pill, or a combined patch, but the switch and the new dose belong to your prescriber. Don't cut or double up patches on your own.",
    "If you have a uterus, keep taking your progesterone whatever happens to the estrogen, and don't stop hormone therapy abruptly.",
  ],
  sections: [
    {
      heading: "Is there an estrogen patch shortage in 2026?",
      body: `<div class="qa"><strong>The short answer</strong>In practice, yes, even if not on paper. Women across the US have struggled to fill estradiol patch prescriptions for most of 2026. The FDA's position is that patches "are not in shortage" and remain available, ${ext(S.cbs, "a spokesperson told CBS News")}, while the pharmacists' professional body, ASHP, has listed them as short since January. Supply is growing but demand is growing faster. The fix for most people is a conversation with their prescriber about another brand, strength or form of estrogen.</div><p>If your pharmacy has turned you away, you're far from alone. In a survey presented at The Menopause Society's meeting in October, ${ext(S.midiSurvey, "Midi Health reported")} that nearly half of its patients had struggled to get patches and 34% found their pharmacy out of stock; 10% of those affected had stopped hormone therapy altogether. That's company data, not a national survey, but it matches what doctors and pharmacists describe.</p>`,
    },
    {
      heading: "Why are estradiol patches so hard to find?",
      body: `<p>Mostly because far more women want them. Estradiol patch prescriptions rose from about 594,000 in June 2024 to 1.6 million in May 2026, according to HealthVerity data reported by ${ext(S.cbs, "CBS News")}, and patches now make up 44% of all estrogen prescriptions. The surge followed the FDA's November 2025 decision to remove the boxed warning from menopause hormone therapy labels, ${ext(S.nbc, "NBC News reported")}; our guide to <a href="/hrt/articles/hrt-black-box-warning-removed">the black box warning change</a> explains what that decision did and didn't mean.</p><p>Patches are also hard to make more of quickly. They need specialized equipment, and manufacturers can't simply switch a pill line over, ${ext(S.cnbc, "CNBC explained")} in June, when experts estimated it could take at least a year for supply to catch up.</p>`,
    },
    {
      heading: "When will the estrogen patch shortage end?",
      body: `<p>Nobody has given a firm date. In a ${ext(S.urologyTimes, "September 3 update")}, the FDA said it was working with all six patch manufacturers to raise supply and that patches remain available, even if not always at your usual pharmacy. Pressure is building for more: eight House members ${ext(S.dingell, "asked the FDA in August")} to add patches to its official shortage list, and three senators ${ext(S.senate, "wrote in October")} asking what it would take for the FDA to declare a shortage, citing ASHP's count of nearly 20 patch formulations with supply problems. They asked for answers by November 16, 2026.</p><p>There is one new option on the shelf. In October the FDA ${ext(S.climaraGeneric, "approved the first generic")} of Climara Pro, a once-weekly patch that combines estradiol with a progestin, for women who still have a uterus.</p>`,
    },
    {
      heading: "Are other forms of estrogen running short too?",
      body: `<p>Some are. ${ext(S.reuters, "Reuters reported on October 28")} that the crunch is spreading as women look for alternatives: several estradiol injections are on ASHP's shortage list, and some vaginal estrogen creams are on backorder or allocation. Gels, sprays and pills have generally been easier to get, but availability varies by pharmacy and region, so it's worth calling ahead.</p>`,
    },
    {
      heading: "What can I use instead of an estrogen patch?",
      body: `<p>Start with the simplest swaps and work outward. Your prescriber makes the call, but these are the options to ask about:</p><ul><li><strong>A different brand or strength of patch.</strong> The FDA suggests asking your pharmacist to look for another FDA-approved estradiol patch, ${ext(S.aarp, "AARP reports")}. A different manufacturer, or a twice-weekly instead of a weekly patch, may be in stock when yours isn't.</li><li><strong>Estradiol gel or spray.</strong> These go on the skin like a patch, so they're the closest switch in how the estrogen enters your body.</li><li><strong>Estradiol pills.</strong> Widely available and inexpensive, but swallowed estrogen behaves differently: it carries a higher clot risk than estrogen through the skin. Our comparison of <a href="/hrt/articles/estrogen-patch-vs-pill">the estrogen patch vs the pill</a> covers who that matters for.</li><li><strong>A combined patch</strong>, if you have a uterus, such as the new generic Climara Pro.</li><li><strong>Compounded estradiol.</strong> Some providers offer compounded gels or creams, usually paid out of pocket. These aren't FDA-approved products, so ask what you're getting and why.</li></ul><p>If you're between forms and struggling with symptoms, ask about <a href="/hrt/articles/non-hormonal-menopause-treatment">non-hormonal treatments</a> too.</p>`,
    },
    {
      heading: "Can an online HRT provider help during the shortage?",
      body: `<p>Often, yes, mainly because a menopause specialist can switch your prescription quickly instead of leaving you to call round pharmacies. ${ext(S.midiPage, "Midi says")} its clinicians can move patients to a weekly patch or a daily gel covered by insurance, or to compounded options paid out of pocket. Online providers can also send a new prescription to whichever pharmacy has stock. Our guide to <a href="/hrt/articles/how-to-get-hrt-online">getting HRT online</a> walks through how it works, and <a href="/hrt/articles/online-hrt-cost">online HRT costs</a> breaks down what you'll pay.</p><p>If you're looking for a provider, our three highest-ranked are below. Whichever you choose, tell them which patch and strength you're on now, and that you're having trouble filling it.</p>`,
    },
    {
      heading: "Is it safe to switch from a patch to gel, spray or pills?",
      body: `<p>Generally yes, with your prescriber setting the new dose. Doses don't convert neatly between a patch, a gel, a spray and a pill, so don't try to work it out yourself from a chart online. A few things your prescriber will want to check:</p><ul><li><strong>Your clot risk.</strong> If you've had a blood clot, have migraine with aura, or have other clot risk factors, moving from the skin to a pill needs a proper review.</li><li><strong>Your progesterone.</strong> If you have a uterus, keep taking your progesterone whatever happens to your estrogen; it protects the lining of the womb. The dose may need adjusting after a switch. See our <a href="/hrt/articles/progesterone-side-effects">progesterone guide</a>.</li><li><strong>How you feel in the first weeks.</strong> A new form can feel different. Note any change in hot flashes, sleep, bleeding or mood and report it.</li></ul><p>And try not to stop abruptly. Symptoms often come back quickly, which is reason enough to get a bridging prescription sorted before you run out.</p>`,
    },
    {
      heading: "Can I cut my patch or wear two smaller ones?",
      body: `<p>Not without asking. Some women are moved to two lower-strength patches when their usual strength is out of stock, but that's a prescription decision, not a home fix. Cutting patches is a different matter: many aren't designed to be cut, and the dose you get can become unpredictable. Don't stretch a patch beyond its wear time to make a box last longer either. If you're running low, call your prescriber now rather than the day you run out. You can also report supply problems to the FDA at drugshortages@fda.hhs.gov, as ${ext(S.aarp, "AARP notes")}.</p>`,
    },
    {
      heading: "The bottom line",
      body: `<p>Estradiol patches are genuinely hard to get in 2026 because demand jumped after the label change and production is slow to catch up. You have good options: another brand or strength, a gel or spray, a pill if your risk profile allows, or a combined patch. Let your prescriber make the switch, keep taking progesterone if you have a uterus, and don't cut, double up or stop on your own. We'll update this page as the FDA responds; last checked November 6, 2026. For the wider picture, read <a href="/hrt/articles/menopause-hormone-therapy-2026-what-changed">what changed for menopause hormone therapy in 2026</a> and <a href="/hrt/articles/is-hrt-safe">is HRT safe?</a>. This is general information, not medical advice.</p>`,
    },
  ],
};
