import type { ArticleData } from "../../config";

// Deepened estrogen patch vs pill guide (same URL as the Sept 26 stub). Idea
// shared with hrtwomen.com's Oct 25, 2026 rewrite; written fresh for the hub
// from the same sources: the BMJ 2019 VTE study (Vinogradova), the BMJ 2010
// stroke study (Renoux), the Mayo Clinic transdermal estradiol listing, the
// FDA's patch-availability update, NPR's March 2026 shortage report and the
// Menopause Society's 2022 statement. Facts checked 2026-10-25.

const ext = (href: string, text: string) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const SRC = {
  bmjVte: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6326068",
  bmjStroke: "https://www.bmj.com/content/340/bmj.c2519",
  mayo: "https://www.mayoclinic.org/drugs-supplements/estradiol-transdermal-route/description/DRG-20075306",
  fdaPatch:
    "https://www.fda.gov/drugs/drug-alerts-and-statements/fda-update-estradiol-transdermal-patch-availability",
  nams2022: "https://doi.org/10.1097/GME.0000000000002028",
  npr: "https://www.npr.org/2026/03/10/nx-s1-5742817/menopause-hormone-therapy-shortages",
};

export const ESTROGEN_PATCH_VS_PILL: ArticleData = {
  slug: "estrogen-patch-vs-pill",
  title: "Estrogen Patch vs Pill (2026): Safety, Cost & How to Choose",
  description:
    "Estrogen patch vs pill: clot and stroke evidence, effectiveness, side effects, cost at Winona, Gala and Midi, gels and sprays, and the 2026 patch shortage.",
  category: "Treatments",
  readTime: "14 min read",
  publishedAt: "2026-09-26",
  updatedAt: "2026-10-25",
  heroColor: "#FBE9F0",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "Patches and pills relieve hot flashes and night sweats about equally well. The differences are safety profile, convenience and cost.",
    "Oral estrogen passes through the liver first. In a large 2019 BMJ study, oral HRT was associated with more blood clots and transdermal HRT was not.",
    "Low-dose patches were not linked to more strokes in a large 2010 UK study; oral estrogen carried a modest increase.",
    "Patches, gels or sprays are the usual choice with higher clot risk, migraine, obesity or high blood pressure. Generic pills are often cheaper and simpler.",
    "Whatever the route, you still need a progestogen if you have a uterus.",
  ],
  sections: [
    {
      heading: "Is an estrogen patch or pill better?",
      body: `<div class="qa"><strong>The short answer</strong>Neither for everyone. Both treat menopause symptoms well. Patches, gels and sprays skip the liver's first pass and were not associated with more blood clots or, at low doses, more strokes in large observational studies, which makes them the default for women with extra risk factors. Pills are simple, familiar and usually the cheapest. Your history, preferences and budget decide.</div>
<table><tr><th></th><th>Estrogen pill</th><th>Estrogen patch</th></tr><tr><td>Symptom relief</td><td>Effective</td><td>Effective</td></tr><tr><td>Blood clots</td><td>Increased in observational studies</td><td>Not increased in a large BMJ study</td></tr><tr><td>Stroke</td><td>Modest increase</td><td>Not increased at low doses in a large UK study</td></tr><tr><td>How often</td><td>Daily</td><td>Once or twice a week by brand</td></tr><tr><td>Hassles</td><td>Remembering a daily dose</td><td>Skin irritation, peeling</td></tr><tr><td>Cost</td><td>Generic oral estradiol is among the cheapest options</td><td>Usually more; supply was tight in 2026</td></tr><tr><td>Usually preferred for</td><td>Healthy women without extra clot or stroke risk who want simplicity</td><td>Higher clot risk, obesity, migraine, high blood pressure, smokers, gallbladder disease</td></tr></table>
<p>This guide goes through each difference, covers gels, sprays and creams, prices the options at the online providers we rank and ends with the questions to bring to your clinician. For the basics first, read <a href="/hrt/articles/what-is-hrt">What is HRT?</a></p>`,
    },
    {
      heading: "What forms does estrogen come in?",
      body: `<p><strong>Pills, patches, gels, sprays, a systemic vaginal ring, and low-dose vaginal products for local symptoms. Most modern products contain estradiol, the estrogen the ovaries make.</strong></p>
<table><tr><th>Form</th><th>Use</th><th>Reaches</th><th>US examples</th></tr><tr><td>Pill</td><td>Swallowed daily</td><td>Whole body, via the liver first</td><td>Generic estradiol tablets; conjugated estrogens</td></tr><tr><td>Patch</td><td>On the skin, changed once or twice a week</td><td>Whole body, through the skin</td><td>Climara, Vivelle-Dot, Minivelle, Alora, generics</td></tr><tr><td>Gel</td><td>Rubbed on daily</td><td>Whole body, through the skin</td><td>Divigel, EstroGel, Elestrin</td></tr><tr><td>Spray</td><td>Sprayed on the forearm daily</td><td>Whole body, through the skin</td><td>Evamist</td></tr><tr><td>Systemic vaginal ring</td><td>Inserted, replaced on schedule</td><td>Whole body</td><td>Higher-dose rings</td></tr><tr><td>Low-dose vaginal estrogen</td><td>Cream, insert or ring</td><td>Mainly local tissue</td><td>For dryness and urinary symptoms</td></tr></table>
<p>Brand names are from the ${ext(SRC.mayo, "Mayo Clinic's transdermal estradiol listing")}; coverage and availability vary. "Transdermal" simply means through the skin, so patches, gels and sprays share the same category and much of the same evidence.</p>`,
    },
    {
      heading: "Why does the route matter?",
      body: `<p><strong>Swallowed estrogen goes from the gut to the liver before it reaches the rest of you. That first pass changes how the liver makes clotting factors and other proteins. Estrogen through the skin largely skips it.</strong></p>
<ul><li><strong>Clotting factors:</strong> oral estrogen raises the liver's output of clotting proteins, the plausible mechanism behind the higher clot risk with pills.</li><li><strong>Other liver proteins:</strong> oral estrogen raises sex hormone-binding globulin and can raise triglycerides.</li><li><strong>Gallbladder:</strong> oral estrogen is thought to raise gallbladder risk more than skin routes.</li><li><strong>Steady levels:</strong> a patch releases estradiol continuously, without the daily peak and trough of a pill, which may help women whose migraines follow hormone swings.</li></ul>
<p>Both routes deliver estradiol to the same receptors in the brain, vagina and bone, which is why symptom relief is similar.</p>`,
    },
    {
      heading: "Are patches safer than pills for blood clots?",
      body: `<p><strong>The best available evidence says yes. In a 2019 BMJ study, oral HRT was associated with more venous thromboembolism and transdermal HRT was not.</strong></p>
<p>The ${ext(SRC.bmjVte, "study")} by Vinogradova and colleagues used UK primary-care records: more than 80,000 women aged 40 to 79 who had a clot, matched against nearly 400,000 who did not.</p>
<ul><li><strong>Oral HRT</strong> overall: about 58% higher odds of a clot (adjusted odds ratio 1.58).</li><li>By product: conjugated equine estrogens with medroxyprogesterone acetate highest (2.10); estradiol with dydrogesterone lowest of the oral options (1.18).</li><li><strong>Transdermal HRT</strong>: no increase (0.93, confidence interval spanning no effect).</li></ul>
<p>The authors called transdermal treatment the safest type of HRT when clot risk was assessed, and noted it appeared underused.</p>
<h3>Caveats</h3><ul><li>Observational, so association rather than proof; women given patches may differ from women given pills.</li><li>A healthy woman in her 50s has a low baseline clot risk, so even a relative increase is a small number of extra cases.</li><li>A past clot is still generally a reason to avoid systemic HRT, or to decide with a specialist.</li></ul>`,
    },
    {
      heading: "Do patches carry a lower stroke risk?",
      body: `<p><strong>Possibly, at low doses. A 2010 BMJ study of UK records found low-dose patches were not associated with more strokes, oral estrogen carried a modest increase, and high-dose patches an increase.</strong></p>
<p>In the ${ext(SRC.bmjStroke, "study by Renoux and colleagues")}:</p>
<ul><li>Transdermal users overall: a stroke rate similar to non-users (rate ratio 0.95).</li><li>Low-dose patches: 0.81, not significantly different from non-users.</li><li>High-dose patches: 1.89.</li><li>Oral estrogen: 1.28, at both low and high doses.</li></ul>
<p>Residual confounding could not be excluded and the low-dose interval still allowed a small increase. The practice that most clinicians draw from it: for women with higher stroke risk, a low-dose transdermal route, at the lowest dose that controls symptoms.</p>`,
    },
    {
      heading: "Do patches and pills work equally well for hot flashes?",
      body: `<p><strong>Yes. At equivalent doses, oral and transdermal estradiol relieve hot flashes, night sweats and other estrogen-deficiency symptoms about equally. Most women improve within weeks and reach full benefit by about three months on either.</strong></p>
<p>If one route is not controlling symptoms, the dose may need adjusting, or you may absorb a patch or gel less well than average, in which case switching route or brand helps. Dose is judged by symptoms, not by a blood test. Both routes help vaginal dryness and protect bone, though some women on systemic estrogen still need low-dose vaginal estrogen for persistent genitourinary symptoms.</p>`,
    },
    {
      heading: "Who should choose a patch, and who might prefer a pill?",
      body: `<p><strong>A patch or other transdermal estrogen is usually preferred with higher clot or stroke risk, obesity, migraine (especially with aura), high blood pressure, gallbladder disease, smoking, diabetes or raised triglycerides, and for many women over 60 or further from menopause. A pill suits healthy women near menopause without extra risk who want simplicity, react to adhesives or need the lowest cost.</strong></p>
<h3>Reasons for a patch, gel or spray</h3>
<ul><li>Obesity, a family history of clots, reduced mobility or a known clotting tendency (a personal clot history needs specialist input)</li><li>Migraine: steady levels avoid the swings that trigger attacks</li><li>High blood pressure, controlled first</li><li>Gallbladder disease</li><li>Smoking</li><li>Diabetes or high triglycerides</li><li>Older age or longer since menopause, when overall risk is higher</li></ul>
<h3>Reasons for a pill</h3>
<ul><li>One tablet a day, nothing to stick on or let dry</li><li>Adhesive reactions, or patches that will not stay on</li><li>Cost: generic oral estradiol is often the cheapest option with or without insurance</li><li>Availability: tablets were less affected by the 2026 supply problems</li><li>Preference for a single combination tablet with a progestogen</li></ul>
<p>For a healthy woman starting near menopause, the absolute difference in risk between routes is small, and preference and practicality reasonably carry weight.</p>`,
    },
    {
      heading: "Spray vs gel vs patch: what is the difference?",
      body: `<p><strong>All three are transdermal and share the lower-clot-risk profile. The differences are practical: a patch is changed once or twice a week; gels and sprays go on daily and need to dry.</strong></p>
<table><tr><th></th><th>Patch</th><th>Gel</th><th>Spray</th></tr><tr><td>How often</td><td>Once or twice a week</td><td>Daily</td><td>Daily</td></tr><tr><td>Where</td><td>Lower abdomen or buttock, rotating</td><td>Arm, thigh or other site per label</td><td>Inner forearm</td></tr><tr><td>Dose adjustment</td><td>By patch strength</td><td>Flexible by amount</td><td>Flexible by number of sprays</td></tr><tr><td>Hassles</td><td>Irritation, peeling</td><td>Drying time</td><td>Drying time</td></tr><tr><td>Transfer to others</td><td>Low</td><td>Possible before dry</td><td>Possible before dry</td></tr></table>
<p>Gels and sprays can transfer estrogen to children or pets through skin contact before they dry. Wash your hands, let the site dry fully and cover it if close contact is likely.</p>
<h3>What about creams?</h3>
<p>Two unrelated things share the name. <strong>Low-dose vaginal estrogen cream</strong> is FDA-approved, barely absorbed and treats dryness, painful sex and urinary symptoms locally. <strong>Compounded estrogen body creams</strong>, applied to the skin for whole-body symptoms, are not FDA-approved; <a href="/hrt/reviews/winona">Winona</a>'s body creams, for example, are compounded. Ask why a cream is recommended over an approved patch, gel or spray, and remember that progesterone in a cream is not considered reliable for protecting the uterus. See <a href="/hrt/articles/bioidentical-hormones-explained">bioidentical hormones explained</a> and <a href="/hrt/articles/winona-products">Winona's products explained</a>.</p>`,
    },
    {
      heading: "How much do patches cost compared with pills?",
      body: `<p><strong>Generic estradiol tablets are usually the cheapest estrogen. Patches, gels and sprays cost more, and brand products most. What you pay depends on your formulary, your pharmacy or the subscription service you use.</strong></p>
<p>Through insurance, generic oral estradiol is often on a low tier; generic patches are frequently covered but may cost more, and brand gels and sprays may need prior authorization. Through the online providers we rank:</p>
<table><tr><th>Provider</th><th>Pill</th><th>Patch</th></tr><tr><td><a href="/hrt/reviews/winona">Winona</a></td><td>Estradiol tablets from about $54/month</td><td>Estrogen patch from about $149/month</td></tr><tr><td><a href="/hrt/reviews/gala">Gala</a></td><td colspan="2">One flat plan covering estradiol as a pill or patch: $69/month on Gala's hormone-therapy page when we captured it (Oct 8, 2026); third-party reports have quoted $69 for pill plans and $99 for patch plans</td></tr><tr><td><a href="/hrt/reviews/midi">Midi Health</a></td><td colspan="2">Prescribed to your pharmacy; you pay your plan's price for the medication plus visit costs</td></tr></table>
<p>Add a progestogen if you have a uterus. Prices change; every figure is compared in <a href="/hrt/articles/online-hrt-cost">how much HRT costs online</a>.</p>`,
    },
    {
      heading: "What should you know about the 2026 estradiol patch shortage?",
      body: `<p><strong>Demand for patches jumped after the FDA's 2025-2026 label changes and some women could not find their brand or strength. The FDA says patches remain available and supply has grown, but availability still varies by pharmacy.</strong></p>
<p>In March 2026 ${ext(SRC.npr, "NPR reported")} a "mad scramble" to fill hormone therapy prescriptions, with CVS confirming shortfalls of several estrogen products. The ${ext(SRC.fdaPatch, "FDA later said")} supply of approved estradiol patches had nearly doubled over the previous year and that it was working with manufacturers to expand it further. The background is in our guide to the <a href="/hrt/articles/hrt-black-box-warning-removed">HRT black box warning removal</a>.</p>
<ul><li>Refill a week or two early.</li><li>Ask the pharmacist to check other branches or another approved brand at the same dose.</li><li>Ask your prescriber about an equivalent gel or spray.</li><li>Do not switch dose or route on your own, and do not stop your progestogen.</li></ul>`,
    },
    {
      heading: "How do you use an estrogen patch correctly?",
      body: `<p><strong>Clean, dry, unbroken skin below the waist, usually the lower abdomen or buttock. Press firmly for several seconds, rotate sites, follow your brand's once- or twice-weekly schedule.</strong></p>
<ul><li>Avoid the breasts and places where clothing rubs or skin folds.</li><li>No lotion or oil on the site; it stops the patch sticking.</li><li>Rotate sites and do not reuse a spot within a week.</li><li>If it falls off, follow your leaflet: usually reapply or apply a new patch and keep your original change day.</li><li>Hot baths, saunas and long swims can loosen patches.</li><li>Fold used patches sticky sides together before disposal; they still contain hormone.</li></ul>
<p>Mild redness under the patch is common and fades. Persistent rash or itching is a reason to try another brand or a gel.</p>`,
    },
    {
      heading: "Can you switch from a pill to a patch?",
      body: `<p><strong>Yes, and it is common, to lower clot risk, calm migraines or fix side effects. Your clinician picks an equivalent dose; many women start the patch the day after the last pill.</strong> Expect a few weeks of adjustment. If symptoms return or new ones appear, the dose may need fine-tuning. Keep taking your progestogen if you have a uterus and report any change in bleeding.</p>
<h3>Do you still need progesterone with a patch?</h3><p>Yes. The route of estrogen does not change the need for endometrial protection. Any systemic estrogen with a uterus means an adequate progestogen: oral micronized progesterone, another progestin, a combination patch containing both hormones, or a levonorgestrel IUD. Details in <a href="/hrt/articles/progesterone-side-effects">progesterone for menopause</a>.</p>
<h3>Is estradiol different from other estrogens?</h3><p>Yes. Most modern products contain estradiol, identical to the main ovarian estrogen. Older products such as conjugated equine estrogens, used in the Women's Health Initiative, contain a mix. In the 2019 BMJ study, conjugated estrogens with medroxyprogesterone acetate carried the highest clot risk of the oral combinations studied. Many clinicians now favor estradiol, often transdermal, with micronized progesterone, decided case by case.</p>
<h3>Which route for perimenopause?</h3><p>Any systemic form; the same safety and preference logic applies. Transdermal is often chosen when migraines worsen in perimenopause. Regimens usually pair a cyclical progestogen or a levonorgestrel IUD, and contraception may still be needed. See <a href="/hrt/articles/hrt-for-perimenopause">HRT for perimenopause</a>.</p>`,
    },
    {
      heading: "Questions to ask your clinician",
      body: `<ul><li>Given my history, is a patch, gel, spray or pill safest for me?</li><li>What dose would you start, and when do we review?</li><li>Which progestogen, and on what schedule?</li><li>Is this covered by my insurance, and what will it cost?</li><li>What should I do if my patch brand is out of stock?</li><li>Which side effects should I report?</li></ul>
<p>The right form depends on your health history, clot and stroke risk, symptoms, skin and preferences, and a clinician should make the call with you. The online providers differ in what they offer: <a href="/hrt/reviews/winona">Winona</a> prescribes estradiol as tablets, a patch or a compounded cream; <a href="/hrt/reviews/gala">Gala</a> as a pill or patch under one flat plan; <a href="/hrt/reviews/midi">Midi Health</a> through your own pharmacy and insurance. See <a href="/hrt/winona-vs-gala">Winona vs Gala</a> for a closer look.</p>`,
    },
    {
      heading: "The bottom line on estrogen patch vs pill",
      body: `<p>Both work. The case for patches, gels and sprays is safety: by skipping the liver, transdermal estrogen was not associated with more clots in a large BMJ study, and low-dose patches were not associated with more strokes, which makes transdermal the usual choice when you carry extra risk. The case for pills is simplicity and cost, and for a healthy woman starting near menopause the absolute difference is small.</p>
<p>Whichever you choose, add a progestogen if you have a uterus, review at about three months and keep up with screening. For the wider safety picture, read <a href="/hrt/articles/is-hrt-safe">Is HRT safe?</a> and the <a href="/hrt/articles/menopause-complete-guide">complete menopause guide</a>.</p>
<p><em>This article is general information, not medical advice. Sources are linked throughout and were checked on October 25, 2026. A licensed clinician who knows your history should help you choose.</em></p>`,
    },
  ],
};
