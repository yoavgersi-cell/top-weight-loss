import type { ArticleData } from "../config";
import { MENOPAUSE_COMPLETE_GUIDE } from "./hrt-articles/menopause-complete-guide";
import { HOW_TO_GET_HRT_ONLINE } from "./hrt-articles/how-to-get-hrt-online";
import { IS_WINONA_LEGIT, IS_MIDI_LEGIT } from "./hrt-articles/provider-legit";

// ─────────────────────────────────────────────────────────────────────────────
// HRT guides ported from hrtwomen.com on Oct 22, 2026 (its claude branch at
// f5d72f6, the operator-designated source of truth). Thirteen guides the hub
// did not have - the menopause and how-to-get-HRT-online pillars, the
// perimenopause, safety, progesterone and provider-comparison guides, and the
// seven brand pages (cost, products, "is it legit") - plus the fuller
// versions of four guides the hub carried as short stubs (what-is-hrt,
// estrogen-patch-vs-pill, bioidentical-hormones-explained and the
// how-to-get-hrt-online slug, now the pillar). Every internal link is
// re-prefixed under /hrt; the sources, dates and figures are as the source
// site published them (Trustpilot counts are dated Oct 4, 2026 in the copy;
// the provider cards carry the hub's later capture). Reviewer names in quoted
// Trustpilot excerpts are stored as first name + initial, per house rule.
// ─────────────────────────────────────────────────────────────────────────────

export const HRT_GUIDES_PORTED: ArticleData[] = [
  MENOPAUSE_COMPLETE_GUIDE,
  HOW_TO_GET_HRT_ONLINE,
  IS_WINONA_LEGIT,
  IS_MIDI_LEGIT,
  {
    slug: "perimenopause-symptoms",
    title: "Perimenopause Symptoms: What's Normal and When to Get Help",
    description:
      "Perimenopause symptoms explained - hot flashes, poor sleep, mood changes, irregular periods and more, why they happen and when treatment is worth discussing.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-09-26",
    updatedAt: "2026-09-30",
    heroColor: "#FCE4EC",
    author: "Treatments Hub Research Team",
    keyTakeaways: [
      "Perimenopause is the transition before menopause, when hormone levels - especially estrogen - fluctuate unpredictably, often for several years.",
      "Common symptoms include irregular periods, hot flashes and night sweats, sleep problems, mood changes, brain fog and vaginal dryness.",
      "Menopause itself is confirmed after 12 consecutive months without a period; symptoms can start well before that.",
      "Effective treatments exist - hormonal and non-hormonal - and a licensed clinician can help you decide what fits your history.",
    ],
    sections: [
      {
        heading: "What is perimenopause?",
        body: `<p><strong>Perimenopause</strong> means "around menopause" - the transition years before your final period. During this time the ovaries' output of estrogen and progesterone becomes erratic rather than simply declining in a straight line. Some months levels swing high, others low, and that unpredictability is behind many of the symptoms women notice.</p><p>Perimenopause most often begins in a woman's 40s, though it can start earlier, and it can last anywhere from a few years to longer. <strong>Menopause</strong> is the point confirmed once you have gone 12 consecutive months without a period; everything after that is postmenopause.</p>`,
      },
      {
        heading: "The most common symptoms",
        body: `<p>Every woman's experience is different, but the symptoms clinicians hear about most include:</p><ul><li><strong>Irregular periods</strong> - cycles that become shorter, longer, heavier, lighter or skipped.</li><li><strong>Hot flashes and night sweats</strong> - sudden waves of heat, flushing and sweating (known as vasomotor symptoms).</li><li><strong>Sleep problems</strong> - trouble falling or staying asleep, often worsened by night sweats.</li><li><strong>Mood changes</strong> - irritability, anxiety or low mood, sometimes new for women who never experienced them before.</li><li><strong>Brain fog</strong> - trouble concentrating or finding words.</li><li><strong>Vaginal dryness and discomfort</strong> - and related urinary symptoms, which tend to persist or worsen over time.</li><li><strong>Changes in libido, joint aches and weight distribution</strong> - our sister site Treatments Hub has a separate guide to <a href="https://www.treatmentshub.com/weight-loss/articles/menopause-weight-gain">weight gain around menopause</a>.</li></ul><p>Because many of these overlap with other conditions - thyroid problems, anemia, depression - it is worth having a clinician look at the whole picture rather than assuming everything is hormonal.</p>`,
      },
      {
        heading: "Why hormone levels matter",
        body: `<p>Estrogen affects far more than reproduction. It plays a role in temperature regulation, sleep, mood, bone density, and the health of vaginal and urinary tissue. When levels fluctuate and then fall, those systems feel it. Progesterone also declines, which can contribute to heavier or irregular bleeding and sleep changes.</p><p>One practical point: because hormones fluctuate so much in perimenopause, a single blood test is often not very useful for diagnosing it. Clinicians typically rely mainly on your age, symptoms and cycle history.</p>`,
      },
      {
        heading: "When to talk to a clinician",
        body: `<p>You don't need to wait until symptoms are unbearable. It is reasonable to seek care if symptoms are affecting your sleep, work, relationships or quality of life. And some changes should always be checked promptly, including <strong>very heavy bleeding, bleeding between periods, bleeding after sex, or any bleeding after menopause</strong>.</p><p>A menopause-literate clinician can talk you through options ranging from lifestyle changes to <strong>hormone replacement therapy (HRT)</strong> and <strong>non-hormonal prescriptions</strong>. You don't have to wait until your periods stop - see our guide to <a href="/hrt/articles/hrt-for-perimenopause">HRT for perimenopause</a>. If you are weighing hormone therapy, our guide to <a href="/hrt/articles/is-hrt-safe">whether HRT is safe</a> explains the current evidence on risks and benefits.</p>`,
      },
      {
        heading: "Getting care online",
        body: `<p>Many women now get menopause care through licensed telehealth services. Some, like <a href="/hrt/reviews/winona">Winona</a>, work through a detailed online intake reviewed by a physician; others, like <a href="/hrt/reviews/midi">Midi Health</a>, offer insurance-billed video visits. You can see how they stack up in our <a href="/hrt/articles/best-online-hrt-providers-compared">comparison of online HRT providers</a> or on our <a href="/hrt">HRT provider rankings</a>.</p><p><em>This article is general information, not medical advice. A licensed clinician should decide what treatment, if any, is right for you.</em></p>`,
      },
    ],
  },
  {
    slug: "is-hrt-safe",
    title: "Is HRT Safe? What the Evidence Says in 2026",
    description:
      "HRT's reputation swung after 2002 and has shifted again since. A balanced look at its benefits, its real risks and who should and shouldn't consider it.",
    category: "Safety",
    readTime: "8 min read",
    publishedAt: "2026-09-26",
    updatedAt: "2026-09-27",
    heroColor: "#F8D7E3",
    author: "Treatments Hub Research Team",
    keyTakeaways: [
      "HRT is the most effective treatment for hot flashes and night sweats, but it carries real risks, including blood clots, stroke and breast-cancer considerations.",
      "Risk depends heavily on age, time since menopause, the type and route of hormones, and your personal and family history.",
      "The FDA began removing the boxed warnings on heart disease, breast cancer and dementia in November 2025 and approved the first updated labels in February 2026 - but kept the endometrial-cancer warning for estrogen-alone products.",
      "HRT is not for everyone - a licensed clinician should weigh your individual history before prescribing.",
    ],
    sections: [
      {
        heading: "Why HRT got a bad reputation",
        body: `<p>For many women, the word "HRT" still comes with a warning attached. That largely traces back to the <strong>Women's Health Initiative (WHI)</strong>, a large set of US trials whose early results, published in 2002, reported increased risks of breast cancer, heart disease, stroke and blood clots in women taking hormone therapy. Prescriptions fell dramatically afterward, and boxed warnings were added to product labels.</p><p>In the years since, researchers have re-examined that data. An important nuance: the WHI participants were, on average, in their 60s and many years past menopause - older than most women who start HRT for symptoms today. Later analyses suggested that the balance of risks and benefits looks different for younger women who start treatment closer to menopause.</p>`,
      },
      {
        heading: "What changed: the FDA's 2025-2026 labeling decision",
        body: `<p>In <strong>November 2025</strong>, the FDA <a href="https://www.fda.gov/drugs/drug-alerts-and-statements/fda-requests-labeling-changes-related-safety-information-clarify-benefitrisk-considerations" target="_blank" rel="noopener noreferrer">asked manufacturers</a> to remove the boxed warnings about cardiovascular disease, breast cancer and probable dementia from menopausal hormone therapy products, and to add more age-specific context about starting therapy. On <strong>February 12, 2026</strong> it <a href="https://www.fda.gov/news-events/press-announcements/fda-approves-labeling-changes-menopausal-hormone-therapy-products" target="_blank" rel="noopener noreferrer">approved the first six updated labels</a> - including Prometrium (progesterone), Divigel (estradiol gel) and Estring (vaginal estradiol) - with other products following as their manufacturers' changes are reviewed. The agency pointed to evidence that HRT started within about 10 years of menopause, generally before age 60, has a more favorable balance of benefits and risks.</p><p>That matches the long-term findings of the Women's Health Initiative itself: a <a href="https://doi.org/10.1001/jama.2024.6542" target="_blank" rel="noopener noreferrer">2024 review of the trials in <em>JAMA</em></a> concluded that women who start hormone therapy in early menopause have lower absolute risks than women who start it later.</p><p>Two important caveats: the FDA did <strong>not</strong> remove the boxed warning about <strong>endometrial cancer</strong> for systemic estrogen-alone products (which is why women with a uterus are generally prescribed a progestogen alongside estrogen), and removing a boxed warning does <strong>not</strong> mean the risks disappeared. They remain part of the prescribing information and part of the conversation with your clinician.</p>`,
      },
      {
        heading: "The real risks to understand",
        body: `<p>Hormone therapy is a real medication with real risks. The main ones clinicians weigh include:</p><ul><li><strong>Blood clots (venous thromboembolism)</strong> - the risk is associated particularly with oral estrogen; transdermal routes (patch, gel) are thought to carry a lower clot risk, which is one reason route matters.</li><li><strong>Stroke</strong> - a small increased risk, especially with oral estrogen and in older women.</li><li><strong>Breast cancer</strong> - combined estrogen-plus-progestogen therapy has been associated with a small increase in risk with longer use; the picture differs for estrogen alone.</li><li><strong>Endometrial cancer</strong> - estrogen alone in a woman with a uterus raises this risk, which progestogen protects against.</li><li><strong>Gallbladder disease</strong> and common side effects such as breast tenderness, bloating or bleeding.</li></ul><p>These risks are why an honest, complete medical intake matters so much - and why dosing and route are clinician decisions.</p>`,
      },
      {
        heading: "Who usually should not take HRT",
        body: `<p>HRT is not suitable for everyone. Clinicians are generally cautious or will avoid systemic hormone therapy in women with a history of:</p><ul><li>Breast cancer or other estrogen-sensitive cancers</li><li>Blood clots, stroke or heart attack</li><li>Unexplained vaginal bleeding</li><li>Active liver disease</li><li>Certain clotting disorders</li></ul><p>This list is not exhaustive. Some women in these groups may still be candidates for <strong>low-dose vaginal estrogen</strong> or <strong>non-hormonal treatments</strong>, but that is a decision for a specialist who knows your full history.</p>`,
      },
      {
        heading: "The benefits side of the ledger",
        body: `<p>For appropriate candidates, HRT is the most effective treatment available for <strong>hot flashes and night sweats</strong>, and it can improve sleep disrupted by those symptoms. Vaginal estrogen is highly effective for dryness and related urinary symptoms. Systemic estrogen also helps prevent bone loss. Major professional bodies, including <a href="https://doi.org/10.1097/GME.0000000000002028" target="_blank" rel="noopener noreferrer">The Menopause Society</a>, support hormone therapy as an appropriate option for many healthy women with bothersome symptoms who start it before age 60 or within 10 years of menopause - while emphasizing individualized decisions.</p>`,
      },
      {
        heading: "Making a safe decision",
        body: `<p>The safest path is a clinician who takes a full history, explains your personal risk, chooses the route and dose deliberately, and reviews your treatment over time. Licensed online services can do this well - compare how <a href="/hrt/reviews/winona">Winona</a>, <a href="/hrt/reviews/gala">Gala</a> and <a href="/hrt/reviews/midi">Midi Health</a> handle it, or see our head-to-head of <a href="/hrt/midi-vs-winona">Winona vs Midi Health</a>.</p><p><em>This article is general information, not medical advice. Only a licensed clinician can determine whether hormone therapy is appropriate for you.</em></p>`,
      },
    ],
  },
  {
    slug: "estrogen-patch-vs-pill",
    title: "Estrogen Patch vs Pill: Which Form of HRT Is Right for You?",
    description:
      "Estradiol comes as pills, patches, gels, creams and vaginal products. How the main forms differ in convenience, side effects and clot-risk considerations.",
    category: "Treatments",
    readTime: "7 min read",
    publishedAt: "2026-09-26",
    updatedAt: "2026-09-27",
    heroColor: "#FBE9F0",
    author: "Treatments Hub Research Team",
    keyTakeaways: [
      "Estradiol can be taken by mouth (pill), through the skin (patch, gel, spray or cream) or vaginally for local symptoms.",
      "Oral estrogen passes through the liver first, which is associated with a higher risk of blood clots than transdermal routes.",
      "Pills are simple and inexpensive; patches avoid daily dosing and first-pass liver metabolism but can irritate skin or fall off.",
      "Women with a uterus taking systemic estrogen generally also need a progestogen to protect the uterine lining.",
    ],
    sections: [
      {
        heading: "The main ways to take estrogen",
        body: `<p>Most modern HRT uses <strong>estradiol</strong>, the same estrogen the ovaries produce. What differs is how it gets into your body:</p><ul><li><strong>Oral (pill)</strong> - swallowed daily.</li><li><strong>Transdermal</strong> - absorbed through the skin via a <strong>patch</strong> (changed once or twice a week), <strong>gel</strong>, <strong>spray</strong> or <strong>cream</strong>.</li><li><strong>Vaginal</strong> - low-dose creams, tablets or rings aimed at local symptoms like dryness and urinary discomfort.</li></ul><p>Pills and transdermal products are "systemic" - they treat whole-body symptoms like hot flashes. Low-dose vaginal products work mainly locally.</p>`,
      },
      {
        heading: "Estrogen pills: pros and cons",
        body: `<p><strong>Pros:</strong> pills are familiar, easy to take, widely available as generics and usually inexpensive. There's nothing to stick on or rub in.</p><p><strong>Cons:</strong> oral estrogen is processed by the liver first ("first-pass metabolism"). That is associated with changes in clotting factors, and oral estrogen has been linked to a <strong>higher risk of blood clots</strong> and possibly stroke compared with transdermal estrogen. For women with certain risk factors, clinicians often prefer a transdermal route for that reason.</p>`,
      },
      {
        heading: "Estrogen patches: pros and cons",
        body: `<p><strong>Pros:</strong> patches deliver estradiol steadily through the skin and bypass first-pass liver metabolism, which is why transdermal estrogen is thought to carry a <strong>lower clot risk</strong> than pills. Changing a patch once or twice a week also suits women who forget daily pills.</p><p><strong>Cons:</strong> patches can cause skin irritation, sometimes loosen with heat, sweat or swimming, and can cost more than generic pills. Gels and sprays are alternatives for women who don't get on with patches.</p>`,
      },
      {
        heading: "Creams, gels and vaginal estrogen",
        body: `<p>Transdermal <strong>gels and creams</strong> offer flexible dosing without a patch. Note that some creams sold online are <strong>compounded</strong> - prepared by a pharmacy rather than manufactured as an FDA-approved product - so it's worth asking your clinician which you are getting and why.</p><p><strong>Vaginal estrogen</strong> is in a category of its own: low-dose and aimed at dryness, pain with sex and urinary symptoms. Because very little is absorbed into the bloodstream, clinicians consider it for some women who aren't candidates for systemic HRT - but that is an individual decision.</p>`,
      },
      {
        heading: "Don't forget progesterone",
        body: `<p>If you still have a uterus, taking systemic estrogen on its own raises the risk of endometrial (uterine lining) cancer. That's why women with a uterus are generally prescribed a <strong>progestogen</strong> - often micronized progesterone - alongside estrogen. Women who have had a hysterectomy typically don't need it. Your clinician will decide on the right combination and schedule.</p>`,
      },
      {
        heading: "A note on patch availability in 2026",
        body: `<p>Demand for estradiol patches rose sharply after the FDA's 2025-2026 boxed-warning changes, and some women have had trouble finding their usual brand or strength at the pharmacy. The <a href="https://www.fda.gov/drugs/drug-alerts-and-statements/fda-update-estradiol-transdermal-patch-availability" target="_blank" rel="noopener noreferrer">FDA says</a> estradiol patches remain available and that manufacturers have been expanding production, but availability can still vary by pharmacy and brand.</p><p>If your patch is hard to find, don't switch products or doses on your own - ask your clinician or pharmacist. Options can include a different patch brand, a gel or spray, or another route your clinician thinks suits you.</p>`,
      },
      {
        heading: "How to choose - and where to get it",
        body: `<p>The right form depends on your health history, clot and stroke risk, symptoms, skin and preferences - a clinician should make the call with you. Online providers differ in what they offer: <a href="/hrt/reviews/winona">Winona</a> offers estradiol as pill, patch or cream; <a href="/hrt/reviews/gala">Gala</a> offers pill or patch estradiol; and <a href="/hrt/reviews/midi">Midi Health</a> prescribes through your own pharmacy and insurance. See <a href="/hrt/winona-vs-gala">Winona vs Gala</a> for a closer look.</p><p><em>This article is general information, not medical advice. A licensed clinician should decide which form of HRT, if any, is right for you.</em></p>`,
      },
    ],
  },
  {
    slug: "bioidentical-hormones-explained",
    title: "Bioidentical Hormones Explained: FDA-Approved vs Compounded",
    description:
      "What \"bioidentical\" means, the FDA-approved bioidentical hormones (estradiol, progesterone, Bijuva), how compounded hormones differ and what the evidence says.",
    category: "Treatments",
    readTime: "7 min read",
    publishedAt: "2026-09-26",
    updatedAt: "2026-10-03",
    heroColor: "#F6DCE7",
    author: "Treatments Hub Research Team",
    keyTakeaways: [
      "\"Bioidentical\" means a hormone is chemically identical to what the body makes - estradiol and progesterone are common examples.",
      "FDA-approved bioidentical products exist, including estradiol pills, patches and gels and micronized progesterone.",
      "Compounded \"bioidentical\" hormones are custom-mixed by pharmacies and are not FDA-approved; evidence does not show they are safer or more effective.",
      "Any estrogen - bioidentical or not - carries the same class of risks, so the clinician review matters either way.",
    ],
    sections: [
      {
        heading: "What \"bioidentical\" actually means",
        body: `<p>A <strong>bioidentical hormone</strong> has the same chemical structure as the hormone your body produces. In menopause care that usually means <strong>17-beta estradiol</strong> (the main estrogen made by the ovaries) and <strong>progesterone</strong>. By contrast, some older therapies used conjugated estrogens derived from other sources or synthetic progestins with different structures.</p><p>The term has become a marketing phrase, and it's often used as if "bioidentical" automatically means "natural," "custom" or "safer." None of those follow from the definition.</p>`,
      },
      {
        heading: "FDA-approved bioidentical hormones exist",
        body: `<p>A common misconception is that you need a specialty pharmacy to get bioidentical hormones. In fact, many <strong>FDA-approved</strong> products are bioidentical - including estradiol pills, patches, gels and sprays, vaginal estradiol products, and oral micronized progesterone. These are manufactured to consistent standards, tested for safety and effectiveness, and come with standardized prescribing information.</p>`,
      },
      {
        heading: "List of FDA-approved bioidentical hormones",
        body: `<p>These FDA-approved products contain hormones that are chemically identical to the ones your body makes - <strong>estradiol</strong> and/or <strong>progesterone</strong>. Many are also available as generics, and brand availability changes over time, so treat this as a guide to the categories rather than a shopping list:</p><ul><li><strong>Estradiol pills</strong> - oral estradiol tablets (generic; originally sold as Estrace).</li><li><strong>Estradiol patches</strong> - including Climara, Alora, Vivelle-Dot and Dotti, plus generic patches.</li><li><strong>Estradiol gels and spray</strong> - Divigel, EstroGel and Elestrin (gels) and Evamist (spray).</li><li><strong>Vaginal estradiol</strong> - Estrace vaginal cream, the Estring and Femring vaginal rings, and the Vagifem, Yuvafem and Imvexxy vaginal inserts.</li><li><strong>Micronized progesterone</strong> - Prometrium oral capsules and their generics.</li><li><strong>Estradiol + progesterone in one capsule</strong> - Bijuva, approved by the FDA in 2018 as the first combination of bioidentical estradiol and progesterone in a single oral capsule, for women with a uterus.</li></ul><p>Which product, route and dose suits you - and whether you need progesterone at all - is a decision for a licensed clinician. If an online provider offers you a "bioidentical" hormone, it is reasonable to ask whether it is one of these FDA-approved products or a compounded preparation.</p>`,
      },
      {
        heading: "What compounded hormones are",
        body: `<p><strong>Compounded bioidentical hormones</strong> are mixed by a compounding pharmacy for an individual prescription - sometimes in doses or combinations not available commercially, or in forms like custom creams or pellets. Compounding has legitimate uses, such as for someone allergic to an ingredient in an approved product.</p><p>However, compounded hormones are <strong>not FDA-approved</strong>. That means they haven't gone through the same review of safety, effectiveness and manufacturing consistency, and dose strength can vary more from batch to batch.</p>`,
      },
      {
        heading: "Is bioidentical safer?",
        body: `<p>This is the key question - and the honest answer is that <strong>the evidence does not show compounded bioidentical hormones are safer or more effective</strong> than FDA-approved hormone therapy. Major professional bodies, including <a href="https://doi.org/10.1097/GME.0000000000002028" target="_blank" rel="noopener noreferrer">The Menopause Society</a> and the American College of Obstetricians and Gynecologists, generally recommend FDA-approved products over compounded ones for most women.</p><p>It is also worth being clear that estradiol is estradiol: being bioidentical does not remove the class risks of estrogen therapy - blood clots, stroke, breast-cancer considerations and, without a progestogen, endometrial cancer for women with a uterus. Be skeptical of any provider claiming otherwise, and be cautious about saliva-test-based "custom" dosing, which is not considered reliable for guiding therapy.</p>`,
      },
      {
        heading: "Questions to ask any provider",
        body: `<p>Before starting HRT online or in person, it's reasonable to ask:</p><ul><li>Is this an FDA-approved product or a compounded one - and if compounded, why?</li><li>Which estrogen and which progestogen am I getting, in what form and dose?</li><li>How will my treatment be monitored and adjusted?</li><li>What should prompt me to stop and seek care?</li></ul><p>Among the providers we review, <a href="/hrt/reviews/gala">Gala</a> offers estradiol and progesterone, <a href="/hrt/reviews/winona">Winona</a> offers a range of forms including creams, and <a href="/hrt/reviews/midi">Midi Health</a> prescribes through your own pharmacy. Compare them in <a href="/hrt/gala-vs-midi">Gala vs Midi Health</a>.</p><p><em>This article is general information, not medical advice. A licensed clinician should decide which hormone products, if any, are right for you.</em></p>`,
      },
    ],
  },
  {
    slug: "best-online-hrt-providers-compared",
    title: "Best Online HRT Providers: Winona vs Gala vs Midi Health",
    description:
      "A side-by-side look at three leading online menopause providers - how they work, what they prescribe, how you pay and which fits your situation.",
    category: "Comparison",
    readTime: "8 min read",
    publishedAt: "2026-09-26",
    updatedAt: "2026-10-19",
    heroColor: "#FDEEF3",
    author: "Treatments Hub Research Team",
    keyTakeaways: [
      "Winona: physician-led, no video visit, several estrogen forms, self-pay subscription with free delivery.",
      "Gala: US-licensed clinicians, estradiol and progesterone, one flat self-pay monthly price.",
      "Midi Health: insurance-billed video visits with menopause-trained NPs and nurse midwives; prescriptions go to your own pharmacy.",
      "All three require a clinician's decision - HRT carries real risks and isn't right for everyone.",
    ],
    sections: [
      {
        heading: "Two models of online menopause care",
        body: `<p>Online HRT providers generally follow one of two models. <strong>Subscription services</strong> use an online intake reviewed by a clinician and ship medication to your door for a monthly fee, usually without billing insurance. <strong>Virtual clinics</strong> work more like a specialist practice: you book a video visit, your insurance may be billed, and prescriptions go to your own pharmacy.</p><p>Winona and Gala follow the subscription model; Midi Health is a virtual clinic. Neither model is inherently better - the right one depends on your insurance, budget and how you like to communicate with a clinician.</p> New to online care? Our step-by-step guide on <a href="/hrt/articles/how-to-get-hrt-online">how to get HRT online</a> covers eligibility, the intake, costs and red flags.`,
      },
      {
        heading: "Winona: our top pick",
        body: `<p><a href="/hrt/reviews/winona">Winona</a> is physician-led: board-certified doctors review a detailed online intake, and there is <strong>no video visit</strong> - ongoing care happens through unlimited secure messaging. It offers estradiol as a pill, patch or cream, plus progesterone and vaginal estrogen, with free delivery.</p><p><strong>Watch-outs:</strong> self-pay only, no testosterone, and state availability varies. Pricing varies by the form prescribed - approximate only, so confirm at checkout.</p>`,
      },
      {
        heading: "Gala: flat-fee simplicity",
        body: `<p><a href="/hrt/reviews/gala">Gala</a> focuses on estradiol (pill or patch), oral or vaginal progesterone and vaginal estradiol, prescribed by US-licensed clinicians. Its selling point is one monthly price that includes the clinician, check-ins, dose adjustments and shipping. Gala also runs a separate weight-management program.</p><p><strong>Watch-outs:</strong> self-pay only, and a narrower list of estrogen forms than Winona. Advertised pricing varies - approximate only, confirm at checkout.</p>`,
      },
      {
        heading: "Midi Health: best for insurance",
        body: `<p><a href="/hrt/reviews/midi">Midi Health</a> is a virtual menopause clinic that is <strong>in-network with most major commercial insurance</strong>. You meet a menopause-trained nurse practitioner or certified nurse midwife by video, receive a Care Plan that can include hormonal and non-hormonal options, and prescriptions are sent to your pharmacy of choice.</p><p><strong>Watch-outs:</strong> it requires scheduled visits, it is not billed to Medicare, and your cost depends on your plan. Check your coverage when you register.</p>`,
      },
      {
        heading: "Head-to-head at a glance",
        body: `<ul><li><strong>Most convenient:</strong> Winona - no appointments, delivered to your door. See <a href="/hrt/winona-vs-gala">Winona vs Gala</a>.</li><li><strong>Most predictable price:</strong> Gala - one flat monthly fee.</li><li><strong>Best if you have insurance:</strong> Midi Health. See <a href="/hrt/midi-vs-winona">Winona vs Midi Health</a> and <a href="/hrt/gala-vs-midi">Gala vs Midi Health</a>.</li><li><strong>Want a live conversation:</strong> Midi Health's video visits.</li><li><strong>Want FDA-approved products specifically:</strong> <a href="/hrt/reviews/winona">Winona</a> lists which of its products are FDA-approved (tablets, patch, progesterone capsules) and which are compounded; with any provider, ask which product you will receive.</li></ul>`,
      },
      {
        heading: "Are online menopause clinics worth it?",
        body: `<div class="qa"><strong>The short answer</strong>For many women, yes - if the service has a real clinical gate, prescribes mainstream treatment and includes follow-up. Online clinics remove the two biggest barriers to menopause care: finding a clinician who takes symptoms seriously, and waiting weeks for an appointment. They are not worth it if a low price comes from skipping the medical review, or if your insurance would cover the same care and medication for less elsewhere.</div><p><strong>Where they are worth it:</strong></p><ul><li>You have struggled to get menopause symptoms taken seriously, or there is no menopause specialist near you.</li><li>You want treatment started in days rather than weeks, with follow-up by message or video.</li><li>You value home delivery and a clinician you can reach between visits.</li></ul><p><strong>Where they may not be:</strong></p><ul><li>Your insurance covers a menopause specialist and generic estradiol and progesterone at low copays - your own doctor plus your pharmacy may cost less than a cash subscription (Midi is the online option that bills insurance).</li><li>You need an in-person exam - for example unexplained or postmenopausal bleeding, a breast lump, or pelvic pain.</li><li>You have a complex history (such as a past blood clot or breast cancer) that calls for a specialist who can coordinate with your other doctors.</li></ul><p><strong>Red flags in any online clinic:</strong> prescribing without a full health history, no named or licensed clinicians, "hormone balancing" via saliva tests, only compounded products with no FDA-approved options, or vague pricing and cancellation terms. All three providers on this page pass the clinical checks; their trade-offs are covered in <a href="/hrt/articles/is-winona-legit">Is Winona legit?</a>, <a href="/hrt/articles/is-gala-legit">Is Gala legit?</a> and <a href="/hrt/articles/is-midi-legit">Is Midi Health legit?</a> For the bigger picture of treatment options, see <a href="/hrt/articles/menopause-complete-guide">our complete menopause guide</a>.</p>`,
      },
      {
        heading: "Whichever you choose",
        body: `<p>A legitimate provider will always take a full history and let a licensed clinician decide whether HRT is appropriate. Hormone therapy carries real risks - including blood clots, stroke and breast-cancer considerations - and women with a history of certain cancers, clots or stroke may not be candidates. Read our guide to <a href="/hrt/articles/is-hrt-safe">whether HRT is safe</a>, and see the full <a href="/hrt">HRT provider rankings</a>.</p><p><em>This article is general information, not medical advice. A licensed clinician should decide what treatment, if any, is right for you.</em></p>`,
      },
    ],
  },
  {
    slug: "what-is-hrt",
    title: "What Is HRT? Hormone Replacement Therapy Explained",
    description:
      "What is HRT and what does it treat? A plain-English guide to hormone replacement therapy - types, forms, benefits, risks and your treatment options.",
    category: "Guide",
    readTime: "8 min read",
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
    heroColor: "#FCE4EC",
    author: "Treatments Hub Research Team",
    keyTakeaways: [
      "HRT (hormone replacement therapy) replaces some of the estrogen - and, for women with a uterus, progesterone - that the body makes less of around menopause.",
      "It is the most effective treatment for hot flashes and night sweats, and it also helps with vaginal dryness and bone loss.",
      "HRT comes as estrogen-only or combined therapy, and as pills, patches, gels, sprays and vaginal products - the right choice depends on your history.",
      "HRT carries real risks and isn't for everyone; non-hormonal treatment options exist, and a licensed clinician should help you decide.",
    ],
    sections: [
      {
        heading: "What is HRT? The meaning in plain English",
        body: `<p><strong>HRT</strong> stands for <strong>hormone replacement therapy</strong>. In menopause care it means taking medication that replaces some of the hormones - mainly <strong>estrogen</strong>, and for many women <strong>progesterone</strong> - that the ovaries produce less of during perimenopause and after menopause. You may also see it called <strong>menopausal hormone therapy (MHT)</strong> or simply "hormone therapy"; they all refer to the same kind of treatment.</p><p>HRT doesn't "reverse" menopause or restore hormones to the levels of your 20s. The aim is more practical: to relieve symptoms that are affecting your quality of life, and in some cases to protect long-term health such as bone density, at the lowest dose that works for you.</p>`,
      },
      {
        heading: "What HRT treatment is used for",
        body: `<p>Falling and fluctuating estrogen affects many parts of the body, which is why HRT therapy can help with a range of symptoms. The main ones it is used for are:</p><ul><li><strong>Hot flashes and night sweats</strong> - HRT is the most effective treatment available for these vasomotor symptoms.</li><li><strong>Sleep disruption</strong> - especially when night sweats keep waking you up.</li><li><strong>Vaginal dryness, discomfort and urinary symptoms</strong> - known as genitourinary syndrome of menopause (GSM), which tends to persist or worsen over time without treatment.</li><li><strong>Bone protection</strong> - systemic estrogen helps prevent the bone loss that speeds up after menopause.</li></ul><p>Some women also notice improvements in mood, joint aches or brain fog, but these respond less predictably, and they can have other causes worth checking. Our guide to <a href="/hrt/articles/perimenopause-symptoms">perimenopause symptoms</a> covers the full picture.</p>`,
      },
      {
        heading: "Types of HRT: estrogen-only vs combined",
        body: `<p>The first big distinction is whether you take estrogen on its own or with a progestogen:</p><ul><li><strong>Estrogen-only HRT</strong> - generally used by women who have had a hysterectomy (no uterus).</li><li><strong>Combined HRT</strong> - estrogen plus a <strong>progestogen</strong> (either micronized progesterone or a synthetic progestin). Women who still have a uterus generally need this, because systemic estrogen on its own raises the risk of endometrial (uterine lining) cancer, and the progestogen protects against that.</li></ul><p>Combined HRT can be taken <strong>cyclically</strong> (progestogen for part of each month, usually with a monthly bleed) or <strong>continuously</strong> (every day, usually aiming for no bleeding). Which schedule makes sense often depends on whether you are still having periods. Our guide to <a href="/hrt/articles/progesterone-side-effects">progesterone for menopause</a> explains this in more detail.</p>`,
      },
      {
        heading: "Systemic vs vaginal HRT, and the forms it comes in",
        body: `<p>HRT is also divided by how much of the body it is meant to reach:</p><ul><li><strong>Systemic HRT</strong> circulates through the bloodstream and treats whole-body symptoms like hot flashes. It comes as a <strong>pill</strong>, a <strong>patch</strong>, a <strong>gel</strong> or a <strong>spray</strong> (and some higher-dose vaginal rings).</li><li><strong>Vaginal (local) estrogen</strong> - low-dose <strong>creams</strong>, <strong>tablets</strong> or <strong>rings</strong> - works mainly on vaginal and urinary tissue. Very little reaches the bloodstream, so it treats dryness and related symptoms rather than hot flashes.</li></ul><p>The route matters for safety as well as convenience: oral estrogen is associated with a higher risk of blood clots than transdermal forms such as patches and gels. We compare the options in <a href="/hrt/articles/estrogen-patch-vs-pill">estrogen patch vs pill</a>. Most modern HRT uses estradiol, which is chemically identical to the estrogen your ovaries make - see <a href="/hrt/articles/bioidentical-hormones-explained">bioidentical hormones explained</a> for what that label does and doesn't mean.</p>`,
      },
      {
        heading: "Benefits, risks and who shouldn't take HRT",
        body: `<p>For many healthy women with bothersome symptoms who start before age 60 or within about 10 years of menopause, major medical societies consider HRT an appropriate option. But it is a real medication with real risks, including <strong>blood clots</strong>, <strong>stroke</strong>, <strong>breast-cancer considerations</strong> with longer use of combined therapy, and <strong>endometrial cancer</strong> if estrogen is taken without a progestogen by a woman with a uterus. Risk depends on your age, time since menopause, the type, dose and route of hormones, and your personal and family history.</p><p>Clinicians are generally cautious about or avoid systemic HRT in women with a history of breast or other estrogen-sensitive cancers, blood clots, stroke or heart attack, unexplained vaginal bleeding, or active liver disease. Some of these women may still be candidates for low-dose vaginal estrogen or non-hormonal treatment - a specialist decision. For the full evidence, including the FDA's 2025-2026 boxed-warning changes, read <a href="/hrt/articles/is-hrt-safe">is HRT safe?</a></p>`,
      },
      {
        heading: "HRT treatment options beyond hormones",
        body: `<p>HRT isn't the only way to treat menopause symptoms, and it isn't the right choice for everyone. Other evidence-based options a clinician may discuss include:</p><ul><li><strong>Fezolinetant (Veozah)</strong> - a non-hormonal prescription for moderate to severe hot flashes due to menopause, approved in 2023. It carries a boxed warning about rare but serious liver injury, so liver blood tests are part of treatment.</li><li><strong>Elinzanetant (Lynkuet)</strong> - another non-hormonal prescription for moderate to severe hot flashes due to menopause, approved by the FDA on October 24, 2025.</li><li><strong>Certain antidepressants (SSRIs/SNRIs)</strong> - low-dose paroxetine is FDA-approved for hot flashes, and clinicians use some others off-label.</li><li><strong>Gabapentin</strong> - sometimes used off-label, particularly for night sweats.</li><li><strong>Cognitive behavioral therapy (CBT)</strong> - has good evidence for helping women cope with hot flashes and sleep problems.</li><li><strong>Vaginal moisturizers and lubricants</strong> - first-line, non-prescription options for dryness.</li></ul><p>Each of these has its own side effects and suitability questions, so the choice should be made with a clinician who knows your history.</p>`,
      },
      {
        heading: "How to get HRT: in person or online",
        body: `<p>You can get HRT from a primary-care doctor, a gynecologist or a menopause specialist - or from a licensed <strong>online HRT</strong> provider. Online services differ mainly in how you see the clinician and how you pay: <a href="/hrt/reviews/winona">Winona</a> uses a physician-reviewed online intake with no video visit, <a href="/hrt/reviews/gala">Gala</a> charges one flat monthly price, and <a href="/hrt/reviews/midi">Midi Health</a> offers insurance-billed video visits. Compare all three in our <a href="/hrt/articles/best-online-hrt-providers-compared">online HRT providers comparison</a> or head-to-heads like <a href="/hrt/winona-vs-gala">Winona vs Gala</a>.</p><p>Whichever route you choose, a legitimate provider will take a full health history before prescribing - and should be willing to explain which product, dose and route you're getting and why.</p><p><em>This article is general information, not medical advice. A licensed clinician should decide whether HRT, or any treatment, is right for you.</em></p>`,
      },
    ],
  },
  {
    slug: "hrt-for-perimenopause",
    title: "HRT for Perimenopause: Can You Start Before Periods Stop?",
    description:
      "You don't have to wait for menopause. How HRT for perimenopause works, why irregular bleeding complicates it and other perimenopause treatment options.",
    category: "Treatments",
    readTime: "7 min read",
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
    heroColor: "#F8D7E3",
    author: "Treatments Hub Research Team",
    keyTakeaways: [
      "You don't have to wait until your periods stop - clinicians commonly prescribe HRT during perimenopause when symptoms are bothersome.",
      "Perimenopause regimens often pair estradiol with a cyclical progestogen; some women are offered low-dose hormonal contraception instead.",
      "Menopausal HRT is not birth control - if pregnancy is possible and unwanted, you still need contraception.",
      "Irregular bleeding is expected in perimenopause, but heavy, prolonged or unusual bleeding should be checked before and during treatment.",
    ],
    sections: [
      {
        heading: "Can you take HRT during perimenopause?",
        body: `<p>Yes. A common misconception is that hormone therapy is only for women who have already reached menopause - 12 months without a period. In reality, symptoms like hot flashes, night sweats, poor sleep and mood changes often start years earlier, and clinicians commonly prescribe <strong>HRT for perimenopause</strong> when those symptoms are affecting daily life.</p><p>The same safety questions apply as at any other stage: your personal and family history, clot and stroke risk, and any history of breast or other estrogen-sensitive cancers. But being "not there yet" is not, by itself, a reason to go without treatment. If you're unsure whether what you're experiencing is perimenopause, our guide to <a href="/hrt/articles/perimenopause-symptoms">perimenopause symptoms</a> is a good place to start.</p>`,
      },
      {
        heading: "How HRT for perimenopause is usually set up",
        body: `<p>Because your ovaries are still producing hormones - just erratically - perimenopause treatment is often set up a little differently from HRT after menopause. Approaches a clinician may consider include:</p><ul><li><strong>Estradiol plus a cyclical progestogen</strong> - estrogen daily, with progesterone for part of each month. This usually produces a predictable monthly bleed and is a common choice while periods are still happening.</li><li><strong>Estradiol plus a continuous progestogen</strong> - taken every day. This is more often used after menopause, because in perimenopause it can lead to unpredictable bleeding, though some clinicians use it earlier.</li><li><strong>A levonorgestrel IUD</strong> - some clinicians use a hormonal IUD to provide the progestogen part of HRT (and contraception) alongside estrogen.</li><li><strong>Low-dose combined hormonal contraception</strong> - for some women who also need birth control and have no reasons to avoid it (such as smoking over age 35 or certain migraine or clot histories), a low-dose pill can help regulate cycles and ease symptoms.</li></ul><p>Which of these fits depends on your symptoms, bleeding pattern, contraception needs and health history - it's a clinician decision. For more on the progestogen part, see <a href="/hrt/articles/progesterone-side-effects">progesterone for menopause</a>.</p>`,
      },
      {
        heading: "HRT is not birth control",
        body: `<p>This is easy to miss: the doses in menopausal HRT are much lower than in hormonal contraceptives and are not designed to stop ovulation. Pregnancy is still possible in perimenopause, even with irregular periods. If you don't want to become pregnant, you'll need a reliable form of contraception until your clinician confirms you no longer need it - something to raise at your appointment, especially if you're under 50.</p>`,
      },
      {
        heading: "Why irregular bleeding complicates things",
        body: `<p>Irregular periods are one of the hallmarks of perimenopause - cycles can get shorter, longer, heavier, lighter or skipped altogether. HRT adds another layer: cyclical regimens create a withdrawal bleed of their own, and any regimen can cause spotting, particularly in the first few months. That can make it harder to tell what is "normal" for you.</p><p>For that reason, clinicians often want a clear picture of your bleeding pattern <strong>before</strong> starting treatment, and may suggest keeping a simple diary once you start.</p>`,
      },
      {
        heading: "When bleeding needs to be checked",
        body: `<p>Some bleeding changes shouldn't be put down to perimenopause or HRT without being evaluated. Talk to a clinician promptly about:</p><ul><li>Very heavy bleeding - for example, soaking through protection every hour or two, or passing large clots.</li><li>Periods that last much longer than usual, or bleeding between periods.</li><li>Bleeding after sex.</li><li>Bleeding that continues beyond the first few months of HRT, or starts again after it had settled.</li><li>Any bleeding after you've gone 12 months without a period.</li></ul><p>These can have many causes, most of them not serious, but some - such as polyps, fibroids or changes in the uterine lining - need investigation.</p>`,
      },
      {
        heading: "Other perimenopause treatment options",
        body: `<p>HRT isn't the only route. Depending on your symptoms and history, a clinician may also discuss:</p><ul><li><strong>Non-hormonal prescriptions</strong> - such as certain SSRIs/SNRIs or gabapentin for hot flashes. The newer non-hormonal drugs fezolinetant (Veozah) and elinzanetant (Lynkuet) are approved for hot flashes due to menopause; whether they suit you during perimenopause is a question for your clinician.</li><li><strong>Vaginal estrogen, moisturizers and lubricants</strong> for dryness and discomfort.</li><li><strong>Cognitive behavioral therapy (CBT)</strong>, which has good evidence for hot flashes, sleep and coping with symptoms.</li><li><strong>Lifestyle foundations</strong> - regular exercise, strength training for bone health, limiting alcohol, not smoking and good sleep habits. These won't eliminate hot flashes for most women, but they support overall health through the transition.</li></ul><p>For a broader overview, see our guide to <a href="/hrt/articles/what-is-hrt">what HRT is and your treatment options</a>.</p>`,
      },
      {
        heading: "Getting perimenopause treatment online",
        body: `<p>Licensed online menopause services generally see women in perimenopause as well as after menopause, but the clinician will want details about your cycle, bleeding and contraception before recommending anything. <a href="/hrt/reviews/midi">Midi Health</a> offers video visits and care plans that can include hormonal and non-hormonal options, while <a href="/hrt/reviews/winona">Winona</a> and <a href="/hrt/reviews/gala">Gala</a> work through an online intake reviewed by a clinician. Ask any provider directly how they handle perimenopause and irregular bleeding, and compare them in our <a href="/hrt/articles/best-online-hrt-providers-compared">online HRT providers comparison</a> or <a href="/hrt/midi-vs-winona">Winona vs Midi Health</a>.</p><p><em>This article is general information, not medical advice. A licensed clinician should decide what perimenopause treatment, if any, is right for you.</em></p>`,
      },
    ],
  },
  {
    slug: "progesterone-side-effects",
    title: "Progesterone for Menopause: Benefits and Side Effects",
    description:
      "Why progesterone is prescribed with estrogen, micronized progesterone vs progestins, common progesterone side effects and when to call a clinician.",
    category: "Treatments",
    readTime: "7 min read",
    publishedAt: "2026-09-30",
    updatedAt: "2026-09-30",
    heroColor: "#FBE9F0",
    author: "Treatments Hub Research Team",
    keyTakeaways: [
      "If you have a uterus and take systemic estrogen, a progestogen such as progesterone is generally needed to protect the uterine lining.",
      "Micronized progesterone (for example, Prometrium) is chemically identical to the body's own progesterone; synthetic progestins are related but different molecules.",
      "Common side effects include drowsiness or dizziness, breast tenderness, bloating, mood changes and spotting - oral progesterone is usually taken at bedtime.",
      "Prometrium capsules contain peanut oil and should not be used by people allergic to peanuts; serious symptoms need prompt medical attention.",
    ],
    sections: [
      {
        heading: "Why progesterone is part of HRT",
        body: `<p>Estrogen is the part of HRT that relieves hot flashes and night sweats. But in a woman who still has a uterus, systemic estrogen taken on its own stimulates the uterine lining (endometrium) to grow, which raises the risk of endometrial hyperplasia and endometrial cancer. Adding a <strong>progestogen</strong> - the umbrella term for progesterone and synthetic progestins - counteracts that effect.</p><p>That is why women with a uterus are generally prescribed combined HRT, while women who have had a hysterectomy usually take estrogen alone. Progesterone's main job in menopausal HRT is <strong>endometrial protection</strong>, not symptom relief.</p>`,
      },
      {
        heading: "Micronized progesterone vs synthetic progestins",
        body: `<p><strong>Micronized progesterone</strong> is chemically identical to the progesterone the ovaries make; "micronized" refers to the fine particle size that helps it be absorbed when swallowed. The best-known FDA-approved product is <strong>Prometrium</strong>, and generic versions are widely available. <strong>Synthetic progestins</strong> - such as medroxyprogesterone acetate or norethindrone - are related molecules with somewhat different effects, and they're used in some combined pills and patches and in the levonorgestrel IUD.</p><p>Many menopause clinicians favor micronized progesterone for its side-effect profile, but progestins remain valid options, and some women tolerate one better than the other. As with estrogen, "bioidentical" doesn't mean risk-free - see <a href="/hrt/articles/bioidentical-hormones-explained">bioidentical hormones explained</a>.</p>`,
      },
      {
        heading: "Oral vs vaginal, cyclical vs continuous",
        body: `<p><strong>Oral micronized progesterone</strong> is the standard, FDA-approved form for protecting the uterine lining in menopausal HRT. Some clinicians prescribe <strong>vaginal progesterone</strong> for women who get side effects from the oral form; in the US this is generally an off-label use for endometrial protection, and the evidence is more limited than for oral progesterone, so it's worth asking your clinician why it's being recommended.</p><p>Progesterone can be taken on two main schedules:</p><ul><li><strong>Cyclical (sequential)</strong> - taken for part of each month. The Prometrium label, for example, describes 200 mg at bedtime for 12 days of each 28-day cycle alongside daily estrogen. This usually brings a monthly withdrawal bleed and is common in perimenopause.</li><li><strong>Continuous</strong> - a lower dose every day, usually aiming for no bleeding once things settle. It is more often used after menopause.</li></ul><p>Your clinician will choose the product, dose and schedule based on your bleeding pattern and history - don't change them on your own. If you're still having periods, see <a href="/hrt/articles/hrt-for-perimenopause">HRT for perimenopause</a>.</p>`,
      },
      {
        heading: "Common progesterone side effects",
        body: `<p>Many women take progesterone without much trouble, but side effects are common, especially in the first few months. The ones most often reported include:</p><ul><li><strong>Drowsiness or dizziness</strong> - which is why oral progesterone is usually taken at bedtime. Be cautious driving or operating machinery until you know how it affects you.</li><li><strong>Breast tenderness</strong>.</li><li><strong>Bloating</strong> and other stomach upset.</li><li><strong>Mood changes</strong> - some women notice low mood, irritability or PMS-like symptoms, particularly on the progestogen days of a cyclical regimen.</li><li><strong>Headache</strong>.</li><li><strong>Spotting or bleeding</strong> - irregular bleeding is common early on, and cyclical regimens usually produce a regular monthly bleed.</li></ul><p>If side effects are bothering you, tell your clinician. Options can include changing the timing, dose, schedule or type of progestogen - but those are decisions to make together.</p>`,
      },
      {
        heading: "Less common and serious warnings",
        body: `<p>A few important points from the prescribing information:</p><ul><li><strong>Peanut allergy</strong> - Prometrium capsules contain peanut oil and should not be used by anyone allergic to peanuts. Tell your clinician about any food allergies, and ask whether a generic you're given has the same ingredients.</li><li><strong>Severe dizziness or drowsiness</strong> - during early treatment some women have had extreme dizziness or drowsiness, along with symptoms like blurred vision, slurred speech or difficulty walking. These need medical attention.</li><li><strong>Contraindications</strong> - progesterone is generally not used in women with unexplained vaginal bleeding, known or suspected breast cancer, active or past blood clots or stroke, or significant liver disease, among others.</li></ul><p>On <strong>February 12, 2026</strong>, the FDA approved updated labeling for Prometrium as one of the first six menopausal hormone therapy products to drop the boxed warning about cardiovascular disease, breast cancer and probable dementia. That reflects newer evidence about timing and age - it does <strong>not</strong> mean those risks disappeared. They remain in the prescribing information, and combined estrogen-plus-progestogen therapy is still associated with a small increase in breast-cancer risk with longer use. Read more in <a href="/hrt/articles/is-hrt-safe">is HRT safe?</a></p>`,
      },
      {
        heading: "When to call a clinician",
        body: `<p><strong>Seek emergency care</strong> for possible signs of a blood clot, stroke or heart attack: chest pain, sudden shortness of breath, pain or swelling in one leg, a sudden severe headache, sudden vision changes, or weakness, numbness or trouble speaking. Also get urgent help for signs of a serious allergic reaction.</p><p><strong>Contact your clinician soon</strong> if you notice a new breast lump, yellowing of your skin or eyes, heavy or persistent bleeding (or any bleeding after you had stopped bleeding for 12 months), significant mood changes or depression, or side effects that don't settle after the first few months.</p>`,
      },
      {
        heading: "Getting progesterone through an online provider",
        body: `<p>If you take estrogen and have a uterus, any legitimate HRT provider should include a progestogen in your plan. <a href="/hrt/reviews/winona">Winona</a> prescribes progesterone alongside its estradiol options, <a href="/hrt/reviews/gala">Gala</a> offers oral or vaginal progesterone with estradiol, and <a href="/hrt/reviews/midi">Midi Health</a> sends prescriptions to your own pharmacy. See how they compare in <a href="/hrt/winona-vs-gala">Winona vs Gala</a>, <a href="/hrt/gala-vs-midi">Gala vs Midi Health</a>, or our guide to <a href="/hrt/articles/what-is-hrt">what HRT is</a>.</p><p><em>This article is general information, not medical advice. A licensed clinician should decide which progestogen, dose and schedule, if any, is right for you.</em></p>`,
      },
    ],
  },
  // ═════ Brand clusters (is-X-legit / X-cost / X-products) ═════
  // Same house rules as the sister site's brand-cluster pieces: every price,
  // fact and quote is real (provider pages as surfaced in search, Midi's own
  // help center, and the Trustpilot reviews transcribed above); no shared
  // section skeleton; prices flagged as approximate where we could not see
  // the checkout. Facts checked 2026-10-06 - see the top-of-file comment.
  {
    slug: "gala-cost",
    title: "Gala Health HRT Cost (2026): One Flat Monthly Price",
    description:
      "Gala's menopause HRT is advertised from about $79/month cash-pay, with clinician, check-ins, dose changes and shipping included. Year-one math and comparisons.",
    category: "Provider Guide",
    readTime: "6 min read",
    publishedAt: "2026-10-06",
    updatedAt: "2026-10-06",
    heroColor: "#FCE4EC",
    author: "Treatments Hub Research Team",
    keyTakeaways: [
      "Gala advertises its menopause HRT plan from about $79/month, cash-pay. Third-party reviews report pill-based plans from $69/month (billed $207 every 12 weeks) and patch plans from $99/month (billed $297 every 12 weeks). Confirm at checkout.",
      "The price bundles the US-licensed clinician, messaging, symptom check-ins, dose adjustments, the medication and free shipping. There is no separate consult fee and no copay.",
      "Gala does not bill insurance. Twelve months cost about $828 at $69/month, $948 at $79 and $1,188 at $99; on 12-week billing a full year is closer to $897 (pills) or $1,287 (patches).",
      "Winona prices each product separately (about $39 to $149/month), and Midi bills your insurance or charges $250/$150 per self-pay visit plus pharmacy costs. Gala is the simplest single number of the three.",
    ],
    sections: [
      {
        heading: "What Gala charges for menopause HRT",
        body: `<div class="qa"><strong>The short answer</strong>Gala advertises its hormone therapy plan <strong>from about $79 a month</strong>, paid in cash with no insurance involved. Third-party reviews that walked through the checkout report a lower entry point for pills (<strong>from $69 a month, billed $207 every 12 weeks</strong>) and a higher one for patches (<strong>from $99 a month, billed $297 every 12 weeks</strong>). The fee covers the clinician, ongoing check-ins and dose adjustments, the medication and shipping. Prices move with promotions, so the number on Gala's checkout is the one that counts.</div><p>We have seen Gala's starting price quoted as both $69 and $79 in different places, and the explanation is most likely the route: the cheaper figure is for estradiol pills and the advertised "from $79" is the headline. Gala's HRT sits on the same site as its GLP-1 weight-loss program (galaglp1.com/hormone-health), and those GLP-1 prices ($149 and up) are a separate product. If a page quotes you three figures, check that you are reading the hormone health plan.</p>`,
      },
      {
        heading: "What the monthly fee covers, and what to ask about",
        body: `<p>Gala's plan puts the clinician relationship inside the price instead of billing it per visit:</p><ul><li><strong>A US-licensed clinician</strong> reviews your symptom and health assessment and decides whether HRT is appropriate. Not everyone is prescribed.</li><li><strong>The medication</strong>: estradiol as a pill or patch, progesterone (oral or vaginal) for women with a uterus, or vaginal estradiol for local symptoms.</li><li><strong>Messaging, symptom check-ins and dose adjustments</strong>, with no consult fee or copay on top.</li><li><strong>Free shipping</strong>.</li></ul><p>Three questions are worth asking before you pay. Does adding progesterone, or vaginal estradiol alongside systemic estrogen, change the monthly figure? Is the plan billed monthly or every 12 weeks, and what is the cancellation window? And does Gala accept HSA or FSA cards? Prescription HRT is generally an HSA/FSA-eligible expense and one third-party review says Gala accepts these cards, but we could not confirm that on Gala's own pages.</p>`,
      },
      {
        heading: "Pill or patch: why the route moves Gala's price",
        body: `<p>The route your clinician chooses is the biggest variable in what Gala costs. Estradiol patches deliver the hormone through the skin and avoid the liver's first pass, which is why they are associated with a lower clot risk than pills (see <a href="/hrt/articles/estrogen-patch-vs-pill">estrogen patch vs pill</a>). They also cost Gala more to supply, and the price reflects it. Year-one cost at each reported rate:</p><table><tr><th>Plan</th><th>Reported price</th><th>12 months</th><th>52 weeks on 12-week billing</th></tr><tr><td>Estradiol pill plan</td><td>$69/mo ($207 per 12 weeks)</td><td>$828</td><td>about $897</td></tr><tr><td>Advertised starting price</td><td>$79/mo</td><td>$948</td><td>-</td></tr><tr><td>Estradiol patch plan</td><td>$99/mo ($297 per 12 weeks)</td><td>$1,188</td><td>about $1,287</td></tr></table><p>Twelve-week billing means 4.33 charges a year, not 4, so the true annual figure is about 8% above "monthly price × 12". The route should be a medical decision, made on your history and clot and stroke risk, not on the $30 difference.</p>`,
      },
      {
        heading: "Gala vs Winona vs Midi Health on price",
        body: `<p>The three providers we rank charge in three different ways, so the fair comparison is a typical estrogen-plus-progesterone plan rather than one headline number:</p><table><tr><th>Provider</th><th>How you pay</th><th>Typical estrogen + progesterone cost</th><th>Insurance</th></tr><tr><td><strong>Gala</strong></td><td>One plan price, clinician included</td><td>About $69-$99/month depending on route</td><td>Not billed</td></tr><tr><td><a href="/hrt/reviews/winona">Winona</a></td><td>Per product, physician and messaging included</td><td>About $89/month (estrogen body cream with progesterone) to about $188/month (patch $149 + progesterone capsules $39)</td><td>Not billed; HSA/FSA eligible</td></tr><tr><td><a href="/hrt/reviews/midi">Midi Health</a></td><td>Per visit, medication at your pharmacy</td><td>Your copays, or $250 first visit / $150 follow-ups self-pay, plus pharmacy cost</td><td>In-network with most PPO plans; not Medicare</td></tr></table><p>Read it this way: if you have good commercial insurance, generic estradiol and progesterone through <a href="/hrt/gala-vs-midi">Midi Health</a> can cost less in a year than any cash plan. If you are paying cash, Gala's single figure is lower than most Winona combinations, while Winona offers more forms of estrogen, including body creams. The trade-offs are covered in <a href="/hrt/winona-vs-gala">Winona vs Gala</a>.</p>`,
      },
      {
        heading: "Who gets the best value from Gala",
        body: `<p><strong>Good value</strong> if you are paying cash anyway (no insurance, an HMO, a high deductible, or Medicare and you are happy to self-pay), you want one predictable figure with the clinician built in, and a pill or patch suits you. <strong>Less good value</strong> if your insurance covers a menopause specialist and generic hormones, if you want a body cream or a wider choice of forms, or if you want a live video conversation before starting. Whatever you pay, HRT carries real risks, including blood clots, stroke and breast-cancer considerations, and women with a uterus need progesterone to protect the uterine lining. A licensed clinician decides whether it is right for you; our guide to <a href="/hrt/articles/is-hrt-safe">whether HRT is safe</a> covers the evidence.</p><p class="cta-row"><a href="/hrt/reviews/gala">→ Read the full Gala Health review</a></p><p class="cta-row"><a href="/hrt/articles/is-gala-legit">→ Is Gala legit? What 4,199 Trustpilot reviews show</a></p><p class="cta-row"><a href="/hrt/gala-vs-midi">→ Gala vs Midi Health: flat cash price vs insurance</a></p><p>Prices are approximate, from Gala's advertised pricing and third-party reviews at our last check; confirm the current price on Gala's site. This article is general information, not medical advice.</p>`,
      },
    ],
  },
  {
    slug: "is-gala-legit",
    title: "Is Gala Health Legit? Yes - What 4,199 Reviews Show (2026)",
    description:
      "Yes. Gala uses US-licensed clinicians, prescribes only after review and holds a 4.6 Trustpilot rating across 4,199 reviews. Reviews, BBB complaints and caveats.",
    category: "Provider Guide",
    readTime: "6 min read",
    publishedAt: "2026-10-06",
    updatedAt: "2026-10-19",
    heroColor: "#F8D7E3",
    author: "Treatments Hub Research Team",
    keyTakeaways: [
      "Yes, Gala Health is a legitimate US telehealth service: a US-licensed clinician reviews your health assessment and prescribes only if HRT is appropriate, then handles check-ins and dose adjustments.",
      "Its claimed Trustpilot profile rates it 4.6 across 4,199 reviews (as shown on Oct 4, 2026). Recent reviewers mention a quick intake, competitive pricing and responsive support.",
      "The rating covers the whole brand, including Gala's GLP-1 weight-loss program, so many reviews are not about menopause care. The one recent 3-star review we transcribed is about slow shipping.",
      "Its BBB profile showed a C- rating, not accredited, with 37 complaints in three years when we checked on Oct 19, 2026 - the profile covers Gala's much larger weight-loss business too.",
      "Legit is not a guarantee of results or safety for you: HRT carries real risks (blood clots, stroke, breast-cancer considerations), and Gala does not bill insurance.",
    ],
    sections: [
      {
        heading: "The short answer on Gala",
        body: `<div class="qa"><strong>The short answer</strong>Yes. Gala Health runs a real clinical process: you complete an online symptom and health assessment, a <strong>US-licensed clinician</strong> reviews it and decides whether hormone therapy is appropriate, and only then is anything prescribed. Its HRT page describes <strong>bioidentical estradiol and progesterone</strong> (ask whether yours is an FDA-approved product or compounded - see below), and its claimed Trustpilot profile shows <strong>4.6 stars across 4,199 reviews</strong>. What "legit" does not settle is whether Gala's cash-only, mostly message-based model suits you.</div><p>We judge legitimacy the same way for every provider we rank (see <a href="/weight-loss/how-we-rank">how we rank</a>): is there a genuine clinical gate, is it clear what you will pay, and what do reviewers say when you read the low-star reviews as carefully as the five-star ones.</p>`,
      },
      {
        heading: "The checks Gala passes",
        body: `<ul><li><strong>Prescription only after review.</strong> A licensed clinician looks at your symptoms, history and medications and can decline. A site that ships hormones without that step is a red flag, and Gala is not one.</li><li><strong>Mainstream medication.</strong> Estradiol as a pill or patch, progesterone (oral or vaginal) for women with a uterus, and vaginal estradiol for local symptoms. These are standard menopause treatments, not exotic protocols.</li><li><strong>Ongoing care.</strong> Messaging, symptom check-ins and dose adjustments are part of the plan rather than an upsell.</li><li><strong>Clear pricing.</strong> One plan price, advertised from about $79/month, with no copays (the math is in our <a href="/hrt/articles/gala-cost">Gala cost guide</a>).</li><li><strong>A public, claimed review profile.</strong> 4,199 Trustpilot reviews is a large record for a company to stand behind.</li></ul><p>One thing to check for yourself: Gala's HRT shares a website and a site-wide disclaimer with its GLP-1 program, which uses compounded medication, and the disclaimer notes that compounded drugs are not FDA-approved. Gala's own press materials say it offers both FDA-approved and compounded HRT products, and at least one independent review reports that its hormones are compounded, so the answer may depend on what you are prescribed. If it matters to you (it is a fair thing to care about - see <a href="/hrt/articles/bioidentical-hormones-explained">FDA-approved vs compounded hormones</a>), ask your clinician which product you are being prescribed.</p>`,
      },
      {
        heading: "What Gala's Trustpilot reviewers say",
        body: `<p>We transcribed Gala's newest reviews from its Trustpilot profile on October 4, 2026, leaving out the ones about weight loss. The themes are intake speed, price and support.</p><p>"The new patient intake process was quick. The price was very competitive. And communication with the team was excellent." - Kennetito, 5 stars, Oct 3, 2026</p><p>"Great pricing good. Easy to complete. Covered everything we wanted." - Anna Bracey, 5 stars, Oct 2, 2026</p><p>"Scrolling through the app in the morning is simple and straightforward. I like that everything I need is right there, making it easy to stick with my plan." - Michele, 5 stars, Sep 22, 2026</p><p>"The oil a long time to ship" - Jennifer, 3 stars, Oct 1, 2026</p><p>Most recent reviews are short ("So far has been seamless", "Great support"), which tells you the experience was smooth but not much more. The useful signal is the absence of the complaints that sink telehealth companies: we did not see recent reviews about surprise charges, unreachable clinicians or prescriptions issued without review.</p>`,
      },
      {
        heading: "What do Gala's BBB complaints say?",
        body: `<p>When we checked on October 19, 2026, Gala Health's <a href="https://www.bbb.org/us/de/wilmington/profile/health-and-wellness/gala-health-0251-92034883" target="_blank" rel="noopener noreferrer">Better Business Bureau profile</a> (Wilmington, Delaware) showed a <strong>C- rating</strong>, <strong>not BBB-accredited</strong>, with <strong>37 complaints in the past three years</strong>. The BBB cites the number of complaints and how long the business has been operating as reasons for the rating. Some review sites reported an F earlier in 2026, tied to complaints that went unanswered - so check bbb.org for the current grade.</p><p>Two things put that in context. First, like the Trustpilot score, the BBB profile covers <strong>all of Gala's business</strong>, and Gala is best known for its GLP-1 weight-loss program; we found no complaints specific to HRT. Second, the themes match what we see across subscription telehealth: <strong>shipping delays, slow replies and cancellation or refund disputes</strong>.</p><p>A C- is a weaker BBB record than Winona's B or Midi's B with accreditation, and it is a fair reason for caution. If you choose Gala, keep written records of any cancellation request, order before your current supply runs out, and check renewal terms before you subscribe.</p>`,
      },
      {
        heading: "Three caveats the 4.6 does not show",
        body: `<p><strong>The rating is for the whole brand.</strong> Gala is best known for GLP-1 weight management, and the same Trustpilot profile covers both programs. A 4.6 tells you Gala runs a competent operation; it does not tell you how many of the 4,199 reviewers were menopause patients.</p><p><strong>Shipping is the recurring friction.</strong> The only below-4-star review in our recent sample was about a slow delivery. If you are switching from another provider, order before your current supply runs low, and remember that some estradiol patch brands have been intermittently hard to find in 2026.</p><p><strong>Cash only.</strong> Gala does not bill insurance. For women with good commercial coverage, an in-network clinic such as <a href="/hrt/reviews/midi">Midi Health</a> plus generic hormones through a pharmacy benefit can cost less. Gala also offers fewer estrogen forms than <a href="/hrt/reviews/winona">Winona</a>, which adds body creams and a wider product line.</p>`,
      },
      {
        heading: "What \"legit\" does not mean",
        body: `<p>A legitimate provider is not a promise that HRT will work for you or that it is safe for you. Hormone therapy carries real risks - including blood clots, stroke and breast-cancer considerations - and estrogen without progesterone raises the risk of endometrial cancer in women with a uterus. It is generally avoided after breast cancer, a clot or stroke, or with unexplained bleeding. The clinician, not the website or the price, decides whether you are a candidate, so answer the intake fully and honestly. Our guide to <a href="/hrt/articles/is-hrt-safe">whether HRT is safe</a> explains the current evidence, including the FDA's 2025-2026 label changes.</p><p class="cta-row"><a href="/hrt/reviews/gala">→ Read the full Gala Health review, with real customer reviews</a></p><p class="cta-row"><a href="/hrt/winona-vs-gala">→ Winona vs Gala: more forms vs one flat price</a></p><p class="cta-row"><a href="/hrt/gala-vs-midi">→ Gala vs Midi Health: cash plan vs insurance-billed visits</a></p><p>Trustpilot figures as shown on Oct 4, 2026; prices are approximate - confirm on Gala's site. This article is general information, not medical advice.</p>`,
      },
    ],
  },
  IS_WINONA_LEGIT,
  IS_MIDI_LEGIT,
  {
    slug: "winona-cost",
    title: "Winona Cost Per Month (2026): Prices by Treatment",
    description:
      "Winona costs about $39/month for progesterone up to about $149 for the estrogen patch. No insurance billing, but HSA/FSA works. Prices, bundles and yearly math.",
    category: "Provider Guide",
    readTime: "7 min read",
    publishedAt: "2026-10-06",
    updatedAt: "2026-10-19",
    heroColor: "#FBE9F0",
    author: "Treatments Hub Research Team",
    keyTakeaways: [
      "Winona prices each treatment separately. Listed starting prices: progesterone capsules about $39/month, estradiol tablets about $54, estrogen body cream (with or without progesterone) about $89, vaginal estrogen cream about $89 and the estrogen patch about $149.",
      "Each subscription includes the physician review, unlimited messaging and follow-ups, and free shipping. There is no video visit.",
      "Winona does not bill insurance, but you can pay with an HSA or FSA card and submit receipts to your insurer for possible out-of-network reimbursement, depending on your plan.",
      "A year of a common estrogen-plus-progesterone plan runs from about $1,068 (body cream with progesterone) to about $2,256 (patch plus progesterone capsules) at listed prices.",
    ],
    sections: [
      {
        heading: "Winona's prices, treatment by treatment",
        body: `<div class="qa"><strong>The short answer</strong>Winona is self-pay and priced per treatment. At listed starting prices, <strong>progesterone capsules are about $39/month</strong>, <strong>estradiol tablets about $54</strong>, the <strong>estrogen body cream about $89</strong> (also about $89 in the version with progesterone), <strong>vaginal estrogen cream about $89</strong> and the <strong>estrogen patch about $149</strong>. Every subscription includes the physician's review, unlimited messaging and follow-ups, and free shipping. Winona does not take insurance, but HSA and FSA cards work.</div><table><tr><th>Treatment</th><th>Listed from</th><th>Per year at that price</th></tr><tr><td>Progesterone capsules</td><td>$39/mo</td><td>$468</td></tr><tr><td>Estradiol tablets</td><td>$54/mo</td><td>$648</td></tr><tr><td>Estrogen body cream</td><td>$89/mo</td><td>$1,068</td></tr><tr><td>Estrogen body cream with progesterone</td><td>$89/mo</td><td>$1,068</td></tr><tr><td>Vaginal estrogen cream</td><td>$89/mo</td><td>$1,068</td></tr><tr><td>Estrogen patch</td><td>$149/mo</td><td>$1,788</td></tr><tr><td>Blossom arousal cream (non-HRT)</td><td>$79 per order</td><td>-</td></tr></table><p>The $39 and $89 figures match what we have tracked since launch; the $54, $149 and $79 figures come from Winona's product pages as shown in search results and from third-party reviews, because Winona's site could not be loaded directly. "From" means the lowest dose or plan, so a higher dose can cost more, and promotions change. Your checkout is the final word.</p>`,
      },
      {
        heading: "What a typical Winona plan costs per month",
        body: `<p>Most women with a uterus who take systemic estrogen also need progesterone to protect the uterine lining, so the realistic number is usually a combination:</p><ul><li><strong>Estrogen body cream with progesterone</strong> - one product, about <strong>$89/month</strong>. The cheapest systemic combination on Winona's list.</li><li><strong>Estradiol tablets + progesterone capsules</strong> - about $54 + $39 = <strong>$93/month</strong>, if each is billed at its listed price.</li><li><strong>Estrogen patch + progesterone capsules</strong> - about $149 + $39 = <strong>$188/month</strong>.</li><li><strong>Progesterone alone</strong> - about <strong>$39/month</strong>, which some clinicians use on its own, for example for certain perimenopause situations.</li><li><strong>Vaginal estrogen cream alone</strong> - about <strong>$89/month</strong> for dryness and urinary symptoms.</li></ul><p>We could not confirm whether Winona discounts two products bought together, so treat the combined figures as the upper end. The cheapest option on paper is not automatically the right one: the progesterone in a body cream and the progesterone in a capsule are not interchangeable for protecting the uterus (see <a href="/hrt/articles/winona-products">Winona's products explained</a>), and patches are often chosen because of lower clot risk. Your physician picks the route; the price follows.</p>`,
      },
      {
        heading: "Does Winona take insurance?",
        body: `<p><strong>No.</strong> Winona does not bill insurance companies and cannot submit claims for you. Two things soften that:</p><ul><li><strong>HSA and FSA cards are accepted.</strong> Prescription hormone therapy is a qualified medical expense, so you can pay with pre-tax money.</li><li><strong>Out-of-network reimbursement is possible on some plans.</strong> You can submit Winona's receipts to your insurer yourself. Whether you get anything back depends entirely on your plan's out-of-network benefits, so check before counting on it.</li></ul><p><strong>Are Winona's medications covered by insurance?</strong> Not through Winona. Its subscription price bundles the physician, follow-ups, medication and shipping, and Winona ships the medication itself rather than sending a prescription to your pharmacy, so there is no pharmacy claim for your drug plan to pay. If you want your insurance to cover the hormones, you would need a prescriber who sends prescriptions to a pharmacy in your network - an insurance-billed clinic such as <a href="/hrt/reviews/midi">Midi Health</a>, or your own doctor.</p><p>The honest comparison: if your insurance covers a menopause specialist and generic estradiol and progesterone, filling those at your pharmacy can cost less than any cash subscription. What Winona sells for the price is speed and convenience: no appointment to wait for, a physician reachable by message, and medication delivered to your door.</p>`,
      },
      {
        heading: "A year at Winona vs Gala and Midi Health",
        body: `<table><tr><th>Provider</th><th>Typical estrogen + progesterone, per month</th><th>First year</th><th>What is included</th></tr><tr><td><strong>Winona</strong></td><td>About $89 (body cream with progesterone) to about $188 (patch + capsules)</td><td>About $1,068-$2,256</td><td>Physician review, unlimited messaging, shipping</td></tr><tr><td><a href="/hrt/reviews/gala">Gala</a></td><td>About $69 (pill) to $99 (patch); advertised from $79</td><td>About $828-$1,188</td><td>Clinician, check-ins, dose changes, medication, shipping</td></tr><tr><td><a href="/hrt/reviews/midi">Midi Health</a></td><td>Visit copays, or $250 first visit / $150 follow-ups self-pay, plus pharmacy cost</td><td>Depends on your plan</td><td>Video visits; medication through your pharmacy benefit</td></tr></table><p>On cash price alone, Gala's single plan figure is usually lower than a Winona combination. Winona's case is range: it offers body creams, tablets, patches, vaginal cream and estriol, so your physician has more ways to match treatment to your history and preferences. The head-to-heads are <a href="/hrt/winona-vs-gala">Winona vs Gala</a> and <a href="/hrt/midi-vs-winona">Winona vs Midi Health</a>.</p>`,
      },
      {
        heading: "Is Winona worth what it costs?",
        body: `<p><strong>Worth it</strong> if you are paying cash anyway, value never booking an appointment, and want a choice of estrogen forms with a physician on call by message. Winona's Trustpilot record (4.6 across 8,631 reviews as of Oct 4, 2026) suggests most customers think so; one reviewer, Sharon Dragovich, praised the "variety of product available to adjust route with Dr review and approval" (Oct 3, 2026). <strong>Probably not worth it</strong> if good insurance would cover your care and generic hormones, or if you want a live conversation before starting. Whichever provider you choose, HRT carries real risks - blood clots, stroke and breast-cancer considerations among them - and a licensed physician decides whether it is appropriate for you.</p><p class="cta-row"><a href="/hrt/reviews/winona">→ Read the full Winona review</a></p><p class="cta-row"><a href="/hrt/winona-vs-gala">→ Winona vs Gala: per-product pricing vs one flat plan</a></p><p class="cta-row"><a href="/hrt/midi-vs-winona">→ Winona vs Midi Health: cash subscription vs insurance</a></p><p>Prices are approximate, from Winona's listed starting prices at our last check, and change; confirm on Winona's site. This article is general information, not medical advice.</p>`,
      },
    ],
  },
  {
    slug: "winona-products",
    title: "Winona Products Explained: Estradiol, Progesterone & Creams",
    description:
      "Every Winona product: estradiol tablets and patch, estrogen body cream, progesterone capsules, vaginal cream, estriol and Blossom - FDA status, uses, prices.",
    category: "Provider Guide",
    readTime: "8 min read",
    publishedAt: "2026-10-06",
    updatedAt: "2026-10-06",
    heroColor: "#F6DCE7",
    author: "Treatments Hub Research Team",
    keyTakeaways: [
      "Winona's estradiol tablets, estrogen patch and progesterone capsules are FDA-approved products; its estrogen body creams (estradiol plus estriol, with or without progesterone) are compounded in Winona's own 503A pharmacies.",
      "Women with a uterus who use systemic estrogen need a progestogen. Oral micronized progesterone is the FDA-approved standard for that; guidance does not support progesterone in a skin cream as reliable protection, so ask how yours is covered.",
      "The vaginal estrogen cream treats dryness, painful sex and urinary symptoms locally. Estriol, used in Winona's face cream, is not in any FDA-approved US product.",
      "Non-HRT add-ons include Blossom, a sildenafil and pentoxifylline arousal cream (about $79 per order), and a 7% minoxidil hair serum for current patients. Winona does not prescribe testosterone.",
    ],
    sections: [
      {
        heading: "Winona's product line at a glance",
        body: `<div class="qa"><strong>The short answer</strong>Winona prescribes <strong>estradiol</strong> (tablets, a patch, or a body cream), <strong>progesterone</strong> (capsules, or combined in a body cream), <strong>vaginal estrogen cream</strong> and <strong>estriol</strong> skin care, plus non-hormonal add-ons such as the <strong>Blossom arousal cream</strong> and a <strong>minoxidil hair serum</strong>. The tablets, patch and progesterone capsules are FDA-approved products; the body creams are compounded in Winona's own pharmacies. A Winona physician chooses which, if any, suits you.</div><table><tr><th>Product</th><th>Used for</th><th>FDA-approved or compounded</th><th>Listed from</th></tr><tr><td>Estradiol tablets</td><td>Hot flashes, night sweats, whole-body symptoms</td><td>FDA-approved</td><td>$54/mo</td></tr><tr><td>Estrogen patch</td><td>Whole-body symptoms, through the skin</td><td>FDA-approved</td><td>$149/mo</td></tr><tr><td>Estrogen body cream (with or without progesterone)</td><td>Whole-body symptoms, through the skin</td><td>Compounded</td><td>$89/mo</td></tr><tr><td>Progesterone capsules</td><td>Protecting the uterine lining with estrogen</td><td>FDA-approved</td><td>$39/mo</td></tr><tr><td>Vaginal estrogen cream</td><td>Dryness, painful sex, urinary symptoms</td><td>Ask your physician</td><td>$89/mo</td></tr><tr><td>Estriol cream with tretinoin</td><td>Facial skin</td><td>Compounded</td><td>-</td></tr><tr><td>Blossom (sildenafil arousal cream)</td><td>Arousal and sensitivity</td><td>Pharmacy-prepared Rx</td><td>$79/order</td></tr></table><p>Prices are Winona's listed starting prices at our last check; the full cost breakdown is in our <a href="/hrt/articles/winona-cost">Winona cost guide</a>.</p>`,
      },
      {
        heading: "Estradiol tablets and the estrogen patch",
        body: `<p>Both deliver <strong>estradiol</strong>, the main estrogen the ovaries make, and both are FDA-approved products, the same class of medication you could fill at a high-street pharmacy.</p><p><strong>Estradiol tablets (pills)</strong> are taken by mouth once a day. They are simple and the cheapest estrogen on Winona's list (from about $54/month). Because oral estrogen passes through the liver first, it is associated with a higher risk of blood clots than estrogen through the skin, so it may not suit women with clot risk factors, a history of migraine with aura, or other reasons a clinician prefers a transdermal route.</p><p><strong>The estrogen patch</strong> is stuck on the skin and changed once or twice a week, depending on the brand. It bypasses the liver, which is why transdermal estrogen is thought to carry a lower clot risk, and it suits women who forget daily pills. It is Winona's most expensive estrogen (about $149/month), it can irritate skin or loosen with heat and sweat, and some patch brands have been intermittently hard to find in 2026. Our <a href="/hrt/articles/estrogen-patch-vs-pill">estrogen patch vs pill</a> guide compares the two in detail.</p>`,
      },
      {
        heading: "Estrogen body cream, with or without progesterone",
        body: `<p>Winona's <strong>Estrogen Body Cream</strong> contains two bioidentical estrogens, <strong>estradiol and estriol</strong> (a combination often called "bi-est"), rubbed into the skin daily for whole-body symptoms. A second version, the <strong>Estrogen Body Cream with Progesterone</strong>, adds progesterone to the same cream. Both start at about $89/month.</p><p>These creams are <strong>compounded</strong>: Winona says it prepares them in its own 503A-regulated compounding pharmacies from FDA-approved ingredients, and that the finished creams are not FDA-approved. That is not unusual, but it matters. Compounded hormones have not been through the FDA's review of safety, effectiveness and batch consistency, and The Menopause Society and ACOG generally recommend FDA-approved products for most women (see <a href="/hrt/articles/bioidentical-hormones-explained">bioidentical hormones explained</a>). "Bioidentical" does not make estrogen safer; the same class risks - blood clots, stroke, breast-cancer considerations - apply.</p><p><strong>The progesterone question.</strong> If you have a uterus, the progestogen in your plan is there to protect the uterine lining from estrogen. The evidence for that comes mainly from oral micronized progesterone; major menopause guidance does not consider progesterone absorbed from a skin cream reliable endometrial protection. If you are prescribed the combined cream, ask your physician directly how your uterine lining is being protected and what bleeding should prompt a check.</p>`,
      },
      {
        heading: "Progesterone capsules",
        body: `<p>Winona's <strong>progesterone capsules</strong> (from about $39/month) are oral micronized progesterone, an FDA-approved form chemically identical to the body's own progesterone and the standard choice for protecting the uterine lining in women with a uterus who take estrogen. Women who have had a hysterectomy usually do not need it.</p><p>They are usually taken at bedtime because drowsiness and dizziness are common; breast tenderness, bloating, mood changes and spotting are other frequent side effects, especially early on. The FDA-approved brand, Prometrium, contains peanut oil and should not be used by anyone with a peanut allergy, so mention food allergies in your intake. Your physician chooses the dose and whether it is taken every day or for part of each month. More in <a href="/hrt/articles/progesterone-side-effects">progesterone side effects</a>.</p>`,
      },
      {
        heading: "Vaginal estrogen cream and estriol",
        body: `<p>Winona's <strong>vaginal estrogen cream</strong> (from about $89/month) delivers a low dose of estradiol directly to vaginal and urinary tissue. It is used for vaginal dryness, irritation, painful sex and urinary urgency, symptoms that tend to persist or worsen after menopause rather than fade. It is applied inside the vagina, usually more often at the start and then a couple of times a week, on a schedule your physician sets, and it can take several weeks to work fully. Because little is absorbed into the bloodstream, clinicians sometimes consider it for women who are not candidates for systemic HRT, but that is an individual decision, especially after breast cancer.</p><p>Winona describes the cream's active ingredient as FDA-approved estradiol, which is the same wording it uses for its compounded creams, so we could not confirm whether it is compounded or a manufactured product. If that matters to you, ask your physician.</p><p><strong>Estriol</strong> is a weaker estrogen. No FDA-approved US product contains it, so any estriol you get in the US is compounded. At Winona it appears in the estrogen body cream and in an <strong>Estriol Cream with Tretinoin</strong> for facial skin. Tretinoin can irritate skin and increases sun sensitivity, and it should not be used in pregnancy.</p>`,
      },
      {
        heading: "Blossom, minoxidil and the non-HRT add-ons",
        body: `<p><strong>Blossom</strong> is Winona's prescription arousal cream (about $79 per order). It combines <strong>sildenafil</strong> (the active ingredient in Viagra) and <strong>pentoxifylline</strong>, both of which widen blood vessels, and is applied to the clitoral and vulvar area before intimacy to increase blood flow and sensitivity. There is no FDA-approved sildenafil cream for women; Blossom is a pharmacy-prepared prescription, and the evidence for it is far thinner than for HRT. Winona says not to use it if you are allergic to sildenafil, pentoxifylline or caffeine-containing products. If your main problem is dryness or pain, vaginal estrogen addresses that; Blossom does not.</p><p>Current HRT patients can also add a <strong>7% minoxidil hair serum</strong> for thinning hair, a non-hormonal treatment. Winona <strong>does not prescribe testosterone</strong>; if low libido is your main concern and you want that discussed, an insurance-based clinic such as <a href="/hrt/reviews/midi">Midi Health</a> prescribes it in selected cases.</p><p>Whatever you are prescribed, HRT carries real risks and is not right for everyone - see <a href="/hrt/articles/is-hrt-safe">is HRT safe?</a> - and a Winona physician decides what fits your history.</p><p class="cta-row"><a href="/hrt/reviews/winona">→ Read the full Winona review, with real customer reviews</a></p><p class="cta-row"><a href="/hrt/articles/winona-cost">→ What Winona costs per month, product by product</a></p><p>Product details and prices are from Winona's product and help pages as surfaced in search at our last check and can change; confirm on Winona's site. This article is general information, not medical advice.</p>`,
      },
    ],
  },
  {
    slug: "midi-cost",
    title: "Midi Health Cost (2026): Insurance, Self-Pay & Verdict",
    description:
      "With in-network PPO insurance Midi visits average about $50; self-pay is $250 first visit, $150 follow-ups. Medicare isn't billed. Full first-year math inside.",
    category: "Provider Guide",
    readTime: "7 min read",
    publishedAt: "2026-10-06",
    updatedAt: "2026-10-19",
    heroColor: "#FDEEF3",
    author: "Treatments Hub Research Team",
    keyTakeaways: [
      "Midi Health charges per visit, not a membership. It is in-network with most PPO plans, and Midi says patients pay about $50 per visit on average with insurance; HMO plans are not in-network.",
      "Self-pay visits are $250 for the first visit and $150 for each follow-up. Medication is billed separately through your pharmacy, usually under your drug coverage.",
      "Midi does not bill Medicare (Medicare patients can pay as self-pay but cannot claim) and cannot treat Medicaid patients. Testosterone is out of pocket, about $45 for 30 days to $100+ for 90 days.",
      "For a first year of one visit plus three follow-ups, visits cost about $200 at Midi's insured average or $700 self-pay, before medication.",
    ],
    sections: [
      {
        heading: "What Midi Health costs, in one paragraph",
        body: `<div class="qa"><strong>The short answer</strong>Midi is a per-visit clinic, not a subscription. With <strong>in-network insurance</strong> (most PPO plans) you pay your usual specialist copay, coinsurance or deductible; Midi says patients pay <strong>about $50 per visit on average</strong>. <strong>Without insurance</strong> the first visit is <strong>$250</strong> and follow-ups are <strong>$150</strong>. Medication goes to your own pharmacy and is paid through your drug coverage or at the pharmacy's cash price. Midi does <strong>not bill Medicare</strong>.</div><p>That makes Midi's cost harder to predict than a flat subscription and, for many insured women, lower. The rest of this guide shows where the money goes and when the math favors Midi over a cash-pay service.</p>`,
      },
      {
        heading: "The insurance path: what you actually pay",
        body: `<p>Midi is in-network with most commercial PPO plans. You upload your insurance card when you register and see whether you are covered. Three lines make up the bill:</p><ul><li><strong>Visits</strong> - billed to your insurer like any specialist visit. Your copay, coinsurance and deductible still apply; Midi's own figure is about $50 out of pocket per visit on average. If you have not met your deductible, you may owe up to $250 for a new-patient visit and up to $150 for a follow-up.</li><li><strong>Medication</strong> - sent to the pharmacy you choose and priced by your pharmacy benefit. Generic estradiol and progesterone are often on lower formulary tiers, but your plan decides.</li><li><strong>Labs</strong> - only if your clinician orders them, billed separately by the lab.</li></ul><p>If your plan is an <strong>HMO</strong>, Midi is not in-network and visits are self-pay. Reviewers notice when a clinician works within their coverage. Julie Harris wrote that her provider "made sure to provide a treatment that my insurance covers, and I am so happy to have received help" (5 stars, Sep 29, 2026).</p>`,
      },
      {
        heading: "Without insurance, on Medicare, and the extras",
        body: `<ul><li><strong>Self-pay:</strong> $250 for the first visit, $150 for each follow-up. No monthly fee between visits.</li><li><strong>Medicare:</strong> Midi is not covered by Medicare or Medicare-related plans. Medicare beneficiaries can be seen as self-pay patients but cannot submit claims for Midi visits, medications or related services.</li><li><strong>Medicaid:</strong> Midi is not enrolled with state Medicaid programs (including Medi-Cal) and cannot treat Medicaid patients, even as self-pay.</li><li><strong>Testosterone:</strong> prescribed in selected cases and not covered by insurance. Midi puts creams and gels at about $45 for a 30-day supply to $100+ for 90 days, and because it is a controlled substance, extra labs and visits may be needed. It is only offered in some states.</li><li><strong>Location:</strong> Midi treats patients in the United States only.</li></ul><p>Self-pay Midi is the most expensive way to start among the providers we rank, but you are paying for something the others do not offer: a scheduled video visit, about 30 minutes, with a menopause-trained nurse practitioner or nurse midwife.</p>`,
      },
      {
        heading: "Does Midi Health prescribe testosterone, and what does it cost?",
        body: `<p><strong>Yes, in selected cases and only in some states.</strong> The evidence-supported use of testosterone in women is for postmenopausal low sexual desire that causes distress. Insurance does not cover it at Midi: Midi puts creams and gels at <strong>about $45 for a 30-day supply to $100+ for 90 days</strong>. Because testosterone is a controlled substance, extra lab tests and visits may be needed, which add to the cost. There is no FDA-approved testosterone product for women in the US, so it is prescribed off-label at carefully adjusted doses. <a href="/hrt/reviews/winona">Winona</a> does not prescribe testosterone.</p>`,
      },
      {
        heading: "A worked first year at Midi",
        body: `<p>Illustrative only - these are assumptions, not a quote. We assume one initial visit plus three follow-ups in year one (your clinician may want more or fewer), and we write your pharmacy cost as a variable because it depends on your plan and the products prescribed.</p><table><tr><th>Scenario</th><th>Visits, year one</th><th>Medication</th><th>Total</th></tr><tr><td>In-network, visits at Midi's ~$50 average</td><td>4 × $50 = $200</td><td>12 × your monthly pharmacy copay</td><td>$200 + 12 × copay</td></tr><tr><td>In-network, deductible not yet met</td><td>Up to $250 + 3 × $150 = $700, falling once the deductible is met</td><td>Your pharmacy cost</td><td>Up to $700 + medication</td></tr><tr><td>Self-pay (no insurance, HMO, or Medicare)</td><td>$250 + 3 × $150 = $700</td><td>Pharmacy cash price</td><td>$700 + medication</td></tr></table><p>Example: if your plan's copay for generic estradiol and progesterone came to $15 a month in total, the in-network year would be $200 + $180 = $380. Your real number could be higher or lower; check your plan's specialist copay and formulary before you book.</p>`,
      },
      {
        heading: "Midi vs Winona vs Gala on cost",
        body: `<table><tr><th>Provider</th><th>Model</th><th>Typical estrogen + progesterone, first year</th><th>Insurance</th></tr><tr><td><strong>Midi Health</strong></td><td>Per visit + your pharmacy</td><td>About $200 in visits + copays if in-network; $700 + medication self-pay</td><td>Most PPO plans; not HMO, Medicare or Medicaid</td></tr><tr><td><a href="/hrt/reviews/winona">Winona</a></td><td>Monthly per product, all-inclusive</td><td>About $1,068 (body cream with progesterone) to $2,256 (patch + capsules)</td><td>Not billed; HSA/FSA</td></tr><tr><td><a href="/hrt/reviews/gala">Gala</a></td><td>One monthly plan, all-inclusive</td><td>About $828 (pill) to $1,188 (patch)</td><td>Not billed</td></tr></table><p>With good PPO coverage, Midi is usually the cheapest route on our list, and it is the only one with a live video visit. Without coverage, Gala's flat plan typically costs less than self-pay Midi once medication is added, and Winona costs more but needs no appointment at all. Details in <a href="/hrt/midi-vs-winona">Winona vs Midi Health</a> and <a href="/hrt/gala-vs-midi">Gala vs Midi Health</a>.</p>`,
      },
      {
        heading: "Is Midi Health worth it?",
        body: `<p><strong>Worth it</strong> if you have an in-network PPO plan, want a real-time conversation before starting HRT, or have a more complicated history (migraines, clot risk, a cancer history in the family) that benefits from a longer visit. That is what Midi's reviewers praise. "My provider got to know me more in my 30 minute visit than my own PCP," wrote Holman (5 stars, Sep 29, 2026). Erin Woltjen said her provider "has been careful to make sure my medications are safe, monitor side effects, ensure they are working as they should, and make sure I have refills as needed" (5 stars, Oct 1, 2026). Midi's Trustpilot profile shows 4.1 across 1,695 reviews (Oct 4, 2026).</p><p><strong>Less worth it</strong> if you are on Medicare or an HMO and would pay $250 per first visit plus medication, or if you simply want hormones delivered without scheduling anything; then a flat cash plan from Gala or Winona is simpler. HRT carries real risks - blood clots, stroke and breast-cancer considerations among them - and a licensed clinician decides whether it suits you.</p><p class="cta-row"><a href="/hrt/reviews/midi">→ Read the full Midi Health review</a></p><p class="cta-row"><a href="/hrt/midi-vs-winona">→ Winona vs Midi Health: cash subscription vs insurance</a></p><p class="cta-row"><a href="/hrt/gala-vs-midi">→ Gala vs Midi Health: flat price vs per-visit billing</a></p><p>Prices are approximate, from Midi's published pricing and help center at our last check; confirm your coverage and current prices with Midi and your insurer. This article is general information, not medical advice.</p>`,
      },
    ],
  },
];
