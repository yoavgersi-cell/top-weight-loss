import type { ArticleData } from "../../config";

// "Is X legit?" brand pages for Winona and Midi Health, matching the format of
// is-gala-legit (which ranks on page 1). Trustpilot figures are from the
// operator's screenshots of the claimed profiles on 2026-10-04 (same data as
// the provider records in hrt.ts). BBB figures are as listed on each BBB
// profile when researched on 2026-10-19 - ratings and counts change, so the
// copy always dates them and points readers to bbb.org.

const ext = (href: string, text: string) =>
  `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const BBB_WINONA = "https://www.bbb.org/us/tx/austin/profile/medication/winona-inc-0825-1000227596";
const BBB_MIDI = "https://www.bbb.org/us/ca/palo-alto/profile/health-care/midi-1216-1000012109";

export const IS_WINONA_LEGIT: ArticleData = {
  slug: "is-winona-legit",
  title: "Is Winona Legit? Yes - What 8,631 Reviews and the BBB Show",
  description:
    "Yes. Winona's board-certified physicians review every intake before prescribing, and it holds a 4.6 Trustpilot rating across 8,631 reviews. What the BBB shows.",
  category: "Provider Guide",
  readTime: "7 min read",
  publishedAt: "2026-10-19",
  updatedAt: "2026-10-19",
  heroColor: "#FBE9F0",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "Yes, Winona is a legitimate US telehealth company: a board-certified physician reviews your online health intake and prescribes only if hormone therapy is appropriate, with ongoing care by secure messaging.",
    "Its claimed Trustpilot profile ('By Winona') rates it 4.6 across 8,631 reviews (as shown on Oct 4, 2026). Reviewers praise fast relief, responsive doctors and home delivery.",
    "Its BBB profile (Winona Inc, Austin, TX) showed a B rating, not accredited, with 19 complaints in three years when we checked on Oct 19, 2026 - mostly about billing, cancellations and supply.",
    "Legit is not the same as right for you: Winona is cash-only, has no video visit, and its body creams are compounded, while its tablets, patch and progesterone capsules are FDA-approved.",
  ],
  sections: [
    {
      heading: "The short answer on Winona",
      body: `<div class="qa"><strong>The short answer</strong>Yes. Winona runs a genuine clinical process: you complete a detailed online health questionnaire, a <strong>board-certified physician</strong> reviews it and decides whether hormone therapy is appropriate, and only then is anything prescribed and shipped. Its claimed Trustpilot profile shows <strong>4.6 stars across 8,631 reviews</strong>, one of the largest review records among online menopause services. What "legit" does not settle is whether a cash-only, message-based service with no video visit suits you - and which of its products (FDA-approved or compounded) you end up on.</div><p>We judge legitimacy the same way for every provider we rank (see <a href="/weight-loss/how-we-rank">how we rank</a>): is there a real clinical gate, is it clear what you will pay, and what do people say when you read the complaints as carefully as the five-star reviews.</p>`,
    },
    {
      heading: "The checks Winona passes",
      body: `<ul><li><strong>Prescription only after physician review.</strong> A board-certified physician reviews your symptoms, history and medications and can decline or ask follow-up questions. Services that ship hormones without that step are a red flag; Winona is not one.</li><li><strong>Mainstream treatment options.</strong> Estradiol as tablets, a patch or a body cream; progesterone capsules for women with a uterus; vaginal estrogen cream for dryness and urinary symptoms; and estriol. Its <strong>estradiol tablets, estrogen patch and progesterone capsules are FDA-approved products</strong>.</li><li><strong>Ongoing care, not a one-off script.</strong> Unlimited messaging with the medical team and follow-ups are included in the subscription, so doses and routes can be adjusted.</li><li><strong>Clear, published prices.</strong> From about $39/month for progesterone up to about $149/month for the patch, with free shipping (full breakdown in our <a href="/hrt/articles/winona-cost">Winona cost guide</a>).</li><li><strong>A large, claimed review profile.</strong> More than 8,600 Trustpilot reviews is a substantial public record for a company to stand behind.</li></ul>`,
    },
    {
      heading: "What Winona's Trustpilot reviewers say",
      body: `<p>We transcribed Winona's newest reviews from its Trustpilot profile on October 4, 2026. The recurring themes are how quickly symptoms improved, how responsive the doctors are, and the convenience of home delivery.</p><p>"Within weeks of beginning my treatment I felt better, slept better and was happier. I asked myself every day why did I wait so long." - Alena Farley, 5 stars, Oct 2, 2026</p><p>"Responsive with messages or questions. Product help when I needed it... Variety of product available to adjust route with Dr review and approval." - Sharon Dragovich, 5 stars, Oct 3, 2026</p><p>"The Winona products have made all the difference in my life. No more night sweats. No more vaginal dryness." - Jamie Wilkins, 5 stars, Sep 10, 2026</p><p>The lower-rated reviews are just as useful. A 4-star reviewer reported that an estradiol shipment "arrived stuck all together" in Texas humidity (Stephanie B., Oct 4, 2026). A 3-star reviewer said her crying spells and "feeling of doom" had subsided, but libido and mood swings had not yet improved (Amber G., Oct 2, 2026) - a reminder that hormone therapy helps some symptoms faster than others, and that low libido often needs more than estrogen.</p><p>Read more reviews in our full <a href="/hrt/reviews/winona">Winona review</a>.</p>`,
    },
    {
      heading: "What do Winona's BBB complaints say?",
      body: `<p>When we checked on October 19, 2026, Winona's ${ext(BBB_WINONA, "Better Business Bureau profile")} (listed as Winona Inc, Austin, Texas) showed a <strong>B rating</strong>, <strong>not BBB-accredited</strong>, with <strong>19 complaints in the past three years</strong>, 7 of them in the past 12 months. Some third-party review sites have claimed Winona has an A+ and no complaints; the BBB's own profile does not support that, so check bbb.org directly for the current figures.</p><p>The complaints we reviewed cluster around a few themes:</p><ul><li><strong>Billing and cancellation</strong> - for example, being charged after asking to cancel, with the company saying it had no record of the request.</li><li><strong>Supply and charges</strong> - confusion over how much medication a charge covered.</li><li><strong>Expectations about the doctor</strong> - some customers expected more direct, real-time contact with a physician than a message-based service provides.</li><li><strong>Packaging</strong> - one complaint objected that branded packaging could reveal what was inside.</li></ul><p>For context, 19 complaints over three years is a small number relative to a review base in the thousands, and these are the same friction points we see across subscription telehealth. Practical protection: <strong>cancel in writing (in the app or by email) and keep the confirmation</strong>, check how many days' supply each order covers, and read the renewal terms before you subscribe.</p>`,
    },
    {
      heading: "Three caveats the 4.6 does not show",
      body: `<p><strong>Not every product is FDA-approved.</strong> Winona's tablets, patch and progesterone capsules are FDA-approved; its estrogen body creams are compounded by a pharmacy, which means they are not FDA-approved as finished products. Compounded hormones are not proven safer or more effective, and the progesterone in a body cream is not interchangeable with progesterone capsules for protecting the uterus. If this matters to you, ask your physician which product you are being prescribed - see <a href="/hrt/articles/winona-products">Winona's products explained</a> and <a href="/hrt/articles/bioidentical-hormones-explained">FDA-approved vs compounded hormones</a>.</p><p><strong>No video visit.</strong> Winona's care runs through an online intake and messaging. Many women like that; if you want to talk to a clinician face to face, <a href="/hrt/reviews/midi">Midi Health</a> offers scheduled video visits.</p><p><strong>Cash only.</strong> Winona does not bill insurance, though HSA and FSA cards work. If you have good commercial coverage, an insurance-billed clinic plus generic hormones from your pharmacy can cost less (see <a href="/hrt/midi-vs-winona">Winona vs Midi Health</a>).</p>`,
    },
    {
      heading: "Is Winona safe?",
      body: `<p>Winona's key safety step is the physician review: hormones are prescribed only after a doctor assesses your history, and you can message the medical team about side effects. That is the right model. But no provider can make hormone therapy risk-free. HRT carries real risks - including blood clots, stroke and breast-cancer considerations - and estrogen without a progestogen raises the risk of endometrial cancer in women with a uterus. It is generally avoided after breast cancer, a blood clot or stroke, or with unexplained vaginal bleeding.</p><p>Answer the intake fully and honestly, tell the physician about every medication and condition, and report new symptoms such as unusual bleeding, chest pain, leg swelling or severe headaches promptly. Our guide <a href="/hrt/articles/is-hrt-safe">Is HRT safe?</a> explains the current evidence, including the FDA's 2025-2026 label changes.</p>`,
    },
    {
      heading: "Our verdict",
      body: `<p>Winona is a legitimate, physician-led menopause service with a large and mostly positive review record, published prices and a wider range of estrogen forms than most online competitors. Its weak spots are the ones common to subscription telehealth - billing and cancellation friction - plus the need to ask which of its products are FDA-approved. That is why it is our <a href="/hrt">top-ranked online HRT provider</a> overall, while women who want insurance billing or video visits may prefer Midi Health, and those who want one flat price may prefer Gala.</p><p class="cta-row"><a href="/hrt/reviews/winona">→ Read the full Winona review, with real customer reviews</a></p><p class="cta-row"><a href="/hrt/articles/winona-cost">→ What Winona costs per month, and whether insurance helps</a></p><p class="cta-row"><a href="/hrt/winona-vs-gala">→ Winona vs Gala: more forms vs one flat price</a></p><p>Trustpilot figures as shown on Oct 4, 2026; BBB figures as shown on Oct 19, 2026; prices are approximate - confirm on Winona's site. This article is general information, not medical advice.</p>`,
    },
  ],
};

export const IS_MIDI_LEGIT: ArticleData = {
  slug: "is-midi-legit",
  title: "Is Midi Health Legit? Yes - Reviews, BBB & Billing",
  description:
    "Yes. Midi Health is a BBB-accredited virtual menopause clinic with video visits and insurance billing. What 1,695 Trustpilot reviews and BBB complaints show.",
  category: "Provider Guide",
  readTime: "7 min read",
  publishedAt: "2026-10-19",
  updatedAt: "2026-10-19",
  heroColor: "#FDEEF3",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "Yes, Midi Health is a legitimate US virtual clinic for perimenopause and menopause, founded in 2021, with video visits by menopause-trained nurse practitioners and certified nurse midwives.",
    "It is in-network with most commercial PPO plans and sends prescriptions to your own pharmacy. It does not bill Medicare, and HMO plans are not in-network.",
    "Its claimed Trustpilot profile rates it 4.1 across 1,695 reviews (Oct 4, 2026); recent reviewers say they finally felt heard. Its BBB profile showed a B rating and BBB accreditation on Oct 19, 2026.",
    "Most complaints are about billing - visits patients thought were covered turning into bills, or copays changing - so check your coverage and ask for an estimate before you book.",
  ],
  sections: [
    {
      heading: "The short answer on Midi Health",
      body: `<div class="qa"><strong>The short answer</strong>Yes. Midi Health is a real, venture-backed virtual clinic founded in 2021 that focuses on perimenopause and menopause. You book a <strong>video visit with a menopause-trained nurse practitioner or certified nurse midwife</strong>, who can prescribe hormonal and non-hormonal treatment and send it to <strong>the pharmacy you choose</strong>. Midi is <strong>in-network with most commercial PPO plans</strong>, is <strong>BBB-accredited</strong>, and holds <strong>4.1 stars across 1,695 Trustpilot reviews</strong>. The main thing to watch is billing: insurance-based care is cheaper for many women but less predictable than a flat price.</div><p>We judge legitimacy the same way for every provider we rank (see <a href="/weight-loss/how-we-rank">how we rank</a>): a real clinical process, transparent costs, and an honest read of the complaints as well as the praise.</p>`,
    },
    {
      heading: "The checks Midi passes",
      body: `<ul><li><strong>A real clinical visit.</strong> Care starts with a scheduled video appointment - about 30 minutes - with a clinician trained in menopause, not just a questionnaire.</li><li><strong>Licensed clinicians.</strong> Nurse practitioners and certified nurse midwives who specialize in midlife women's health.</li><li><strong>Insurance billing.</strong> Midi bills most commercial PPO plans like any specialist; it says patients pay about $50 per visit on average with insurance. Self-pay is $250 for the first visit and $150 for follow-ups (see <a href="/hrt/articles/midi-cost">Midi Health cost</a>).</li><li><strong>Your own pharmacy.</strong> Prescriptions go to the pharmacy you pick, priced through your drug coverage, so you can see exactly what each medication costs.</li><li><strong>Broad treatment range.</strong> Hormone therapy, non-hormonal options and, in some states, testosterone for low libido.</li><li><strong>BBB accreditation.</strong> Midi is accredited by the Better Business Bureau, which requires a business to commit to resolving complaints.</li></ul>`,
    },
    {
      heading: "What Midi's Trustpilot reviewers say",
      body: `<p>We transcribed Midi Health's newest reviews from its Trustpilot profile on October 4, 2026. The dominant theme is feeling listened to after years of being dismissed.</p><p>"What made my experience great is that they listened to me! I felt heard and seen! My concerns were not dismissed. I was suffering in silence for five years and no one would listen or believe me." - Terri Wilson, 5 stars, Oct 1, 2026</p><p>"Scheduling with Midi was easy and I quickly had my appointment... My hot flashes are gone and I feel like myself again." - Marcy Wofford, 5 stars, Oct 1, 2026</p><p>"She made sure to provide a treatment that my insurance covers, and I am so happy to have received help." - Julie Harris, 5 stars, Sep 29, 2026</p><p>"My provider got to know me more in my 30 minute visit than my own PCP." - Holman, 5 stars, Sep 29, 2026</p><p>Midi's overall 4.1 is lower than Winona's and Gala's 4.6, and the gap mostly reflects the billing complaints described below rather than the quality of the visits themselves. More reviews are in our full <a href="/hrt/reviews/midi">Midi Health review</a>.</p>`,
    },
    {
      heading: "What do Midi Health's BBB complaints say?",
      body: `<p>When we checked on October 19, 2026, Midi's ${ext(BBB_MIDI, "Better Business Bureau profile")} showed a <strong>B rating</strong> and <strong>BBB accreditation</strong>, with roughly <strong>175 complaints closed in the past three years</strong>. Billing issues are a listed complaint category. That number is higher than Winona's or Gala's, but Midi also handles insurance claims - the most complaint-prone part of US healthcare - and sees a large number of patients.</p><p>The complaints cluster around:</p><ul><li><strong>Coverage surprises</strong> - patients told a visit would be covered who later received a self-pay bill, or whose plan was later found not to be in-network.</li><li><strong>Changing copays</strong> - for example, a copay that rose after Midi changed how it submits claims.</li><li><strong>Deductibles</strong> - insured patients who had not met their deductible paying up to the full visit price.</li></ul><p>How to protect yourself: before booking, confirm with your insurer that Midi is in-network for your specific plan (PPO, not HMO), ask Midi for an estimate of your visit cost, know where you stand on your deductible, and keep records of what you were told. Medicare beneficiaries can only be seen as self-pay.</p>`,
    },
    {
      heading: "Three caveats the 4.1 does not show",
      body: `<p><strong>Cost is less predictable.</strong> With insurance, Midi is often the cheapest route on our list; without it, self-pay visits plus pharmacy costs can exceed a flat subscription. Your plan, deductible and formulary decide.</p><p><strong>You manage the pharmacy side.</strong> Prescriptions go to your pharmacy, which gives you control over price but means dealing with stock (including the 2026 estradiol patch shortages) and prior authorizations yourself.</p><p><strong>Not for Medicare or HMO plans.</strong> Midi does not bill Medicare and is not in-network with HMO plans, and it cannot treat Medicaid patients. If that is you, a cash-pay service such as <a href="/hrt/reviews/gala">Gala</a> or <a href="/hrt/reviews/winona">Winona</a> may be simpler.</p>`,
    },
    {
      heading: "Is Midi Health safe?",
      body: `<p>A scheduled video visit with a menopause-trained clinician is a strong safety model: there is time to review your history, discuss risks and agree on a follow-up plan. Midi also offers non-hormonal options for women who cannot take estrogen. Hormone therapy itself still carries real risks - including blood clots, stroke and breast-cancer considerations - and is generally avoided after breast cancer, a clot or stroke, or with unexplained bleeding. Share your full history, and use follow-up visits to report side effects. For the evidence, see <a href="/hrt/articles/is-hrt-safe">Is HRT safe?</a></p>`,
    },
    {
      heading: "Our verdict",
      body: `<p>Midi Health is a legitimate, BBB-accredited menopause clinic, and the best option on our list for women who want insurance billing and a real conversation with a clinician. Its weak spot is the unpredictability of insurance billing, which drives most of its complaints - so verify your coverage before you book. If you would rather pay one predictable price, compare <a href="/hrt/gala-vs-midi">Gala vs Midi Health</a>; if you want more estrogen forms and no appointments, see <a href="/hrt/midi-vs-winona">Winona vs Midi Health</a>.</p><p class="cta-row"><a href="/hrt/reviews/midi">→ Read the full Midi Health review, with real patient reviews</a></p><p class="cta-row"><a href="/hrt/articles/midi-cost">→ What Midi costs with and without insurance</a></p><p>Trustpilot figures as shown on Oct 4, 2026; BBB figures as shown on Oct 19, 2026; prices are approximate - confirm with Midi and your insurer. This article is general information, not medical advice.</p>`,
    },
  ],
};
