import type { ArticleData } from "../../config";

// ───── Does Medicare cover online therapy? (Nov 6, 2026) ─────
// Seasonal trend article for Medicare open enrollment (Oct 15 - Dec 7, 2026,
// changes effective Jan 1, 2027). Coverage rules link Medicare.gov and the
// CMS telehealth FAQ (updated Oct 8, 2026); the 2026 Part B amounts link the
// CMS fact sheet; the 2027 extension links the ABA summary of the
// Consolidated Appropriations Act, 2026. Platform policies are each
// company's own published statements and are labelled that way;
// BetterHelp's insurance page (checked Nov 8, 2026) says Medicare, Medicaid
// and TRICARE aren't accepted. Consistent with the DEA guide
// (telehealth-controlled-substances-dea-rules-2026): the Medicare waiver runs
// to Dec 31, 2027, the DEA flexibilities to Dec 31, 2026.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  aba: "https://www.americanbar.org/groups/health_law/news/2026/medicare-telehealth-flexibilities-extended-2027/",
  medicareTelehealth: "https://www.medicare.gov/coverage/telehealth",
  medicareMentalHealth: "https://www.medicare.gov/coverage/mental-health-care-outpatient",
  nbcc: "https://nbcc.org/govtaffairs/medicarefactsheets",
  cms2026: "https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles",
  cmsFaq: "https://www.cms.gov/files/document/telehealth-faq-updated-10-09-2026.pdf",
  depression: "https://www.medicare.gov/coverage/depression-screening",
  openEnrollment: "https://www.medicare.gov/health-drug-plans/open-enrollment",
  talkspace: "https://www.talkspace.com/coverage/insurance/medicare",
  talkiatry: "https://www.talkiatry.com/help-center-articles/do-you-take-medicare-or-medicaid",
  headspace: "https://help.headspace.com/hc/en-us/articles/37974782380827",
  lifeline: "https://988lifeline.org/",
  betterhelpIns: "https://www.betterhelp.com/insurance2026",
};

export const OT_MEDICARE_ONLINE_THERAPY: ArticleData = {
  slug: "does-medicare-cover-online-therapy",
  title: "Does Medicare Cover Online Therapy? 2026-27 Guide",
  description:
    "Medicare covers therapy by video from home through 2027. What you'll pay, which online platforms take Medicare, and what to check before open enrollment.",
  category: "Advice",
  readTime: "7 min read",
  publishedAt: "2026-11-06",
  updatedAt: "2026-11-08",
  heroColor: "#EEF4EE",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "Yes. Medicare Part B covers therapy by video from home, at the same price as an in-person visit, through at least December 31, 2027.",
    "With Original Medicare you pay 20% of the Medicare-approved amount after the Part B deductible, which is $283 in 2026.",
    "Talkspace and Talkiatry say they take Original Medicare; Headspace works only through some Medicare Advantage plans. Always confirm with your plan.",
    "Open enrollment ends December 7, 2026. If you use online therapy or psychiatry, check your plan's network and copays before then.",
  ],
  sections: [
    {
      heading: "Does Medicare cover online therapy?",
      body: `<div class="qa"><strong>The short answer</strong>Yes. Medicare Part B covers outpatient mental health care, including talk therapy, and through December 31, 2027 it covers those visits by video from anywhere in the US, including your home. ${ext(S.medicareTelehealth, "Medicare.gov says")} you'll pay the same amount you would in person. The therapist or platform has to accept Medicare, and that's where most of the confusion comes in: some online services do, some only through Medicare Advantage plans, and some not at all.</div><p>Congress extended Medicare's telehealth rules through the end of 2027 in the ${ext(S.aba, "Consolidated Appropriations Act, 2026")}, signed in February. So for the coming year the question isn't whether Medicare covers online therapy, it's which services you can use and what you'll pay. If you need help right now, call or text 988, the Suicide and Crisis Lifeline, or call 911 if you're in danger.</p>`,
    },
    {
      heading: "How much does online therapy cost with Medicare?",
      body: `<p>With Original Medicare, after you've met the Part B deductible you pay ${ext(S.medicareMentalHealth, "20% of the Medicare-approved amount")} for each visit. In 2026 the deductible is $283 and the standard Part B premium is $202.90 a month, ${ext(S.cms2026, "according to CMS")}; the 2027 figures hadn't been announced when we checked. If you have a Medigap supplement plan, it may cover some or all of that 20%.</p><p>Medicare Advantage plans set their own costs, often a flat copay per therapy visit, and their own networks. That's why the same online service can be cheap on one plan and out of network on another. Part B also covers one ${ext(S.depression, "depression screening a year")} at no cost when the provider accepts assignment, though it has to happen in a primary care setting. For how Medicare compares with private insurance and self-pay, see our guide to <a href="/online-therapy/articles/online-therapy-cost">online therapy costs</a>.</p>`,
    },
    {
      heading: "Which therapists does Medicare cover?",
      body: `<p>Part B pays for mental health care from ${ext(S.medicareMentalHealth, "psychiatrists, clinical psychologists, clinical social workers, nurse practitioners, physician assistants, marriage and family therapists and mental health counselors")}. The last two were added on January 1, 2024, ${ext(S.nbcc, "under a 2023 law")}, which opened up a large share of the therapists who work on online platforms. If a platform matches you with a licensed counselor or family therapist, Medicare can now pay for them, as long as that clinician is enrolled with Medicare.</p>`,
    },
    {
      heading: "Which online therapy platforms take Medicare?",
      body: `<p>Here's what each of the platforms we compare says about Medicare on its own help pages. Policies change and vary by state, so check before you book.</p><table><thead><tr><th>Platform</th><th>Original Medicare</th><th>Medicare Advantage</th><th>Notes</th></tr></thead><tbody>
<tr><td><a href="/online-therapy/reviews/talkspace">Talkspace</a></td><td>Yes, in all 50 states and DC, ${ext(S.talkspace, "per Talkspace")}</td><td>Check your plan</td><td>Therapy only; Talkspace says psychiatry isn't yet covered under Original Medicare</td></tr>
<tr><td><a href="/online-therapy/reviews/talkiatry">Talkiatry</a></td><td>Yes, ${ext(S.talkiatry, "per Talkiatry")}</td><td>Select plans, by state</td><td>Psychiatry and medication management; doesn't take Medicaid</td></tr>
<tr><td><a href="/online-therapy/reviews/headspace">Headspace</a></td><td>No: not enrolled as a direct Medicare provider, ${ext(S.headspace, "per Headspace")}</td><td>In network with select plans</td><td>Check your Advantage plan's network</td></tr>
<tr><td><a href="/online-therapy/reviews/betterhelp">BetterHelp</a></td><td>No, ${ext(S.betterhelpIns, "per BetterHelp")}</td><td>No</td><td>BetterHelp takes some commercial insurance (see <a href="/online-therapy/articles/does-betterhelp-take-insurance">our guide</a>), but says Medicare, Medicaid and TRICARE aren't accepted</td></tr>
</tbody></table><p>For private insurance, our guides to <a href="/online-therapy/articles/does-talkspace-take-insurance">Talkspace insurance</a> and <a href="/online-therapy/articles/online-therapy-that-takes-insurance">online therapy that takes insurance</a> go further.</p>`,
    },
    {
      heading: "Does Medicare cover online psychiatry and medication?",
      body: `<p>Yes. Psychiatrists and psychiatric nurse practitioners are covered under Part B, so video visits for diagnosis and medication management are covered the same way as therapy. The medication itself is a Part D question: your drug plan, or the drug coverage in your Advantage plan, decides what you pay at the pharmacy. If you need both therapy and medication, check that your platform covers both under your plan; as the table shows, they don't all do both. Our guide to <a href="/online-therapy/articles/therapy-vs-psychiatry">therapy vs psychiatry</a> explains which you might need, and <a href="/online-therapy/articles/online-psychiatry">online psychiatry</a> covers how it works.</p><p>If you're comparing services, our three highest-ranked online therapy platforms are below. When you sign up, enter your Medicare or Advantage details so the platform can confirm coverage before your first session.</p>`,
    },
    {
      heading: "Do I need an in-person visit for Medicare telehealth therapy?",
      body: `<p>Not before the end of 2027. Under current law, things change on January 1, 2028. The ${ext(S.cmsFaq, "CMS telehealth FAQ")}, updated in October 2026, says that from then on Medicare will want an in-person visit within six months before your first mental-health telehealth session. If you started telehealth mental-health care at home before January 1, 2028, you'll instead need an in-person visit at least every 12 months. Behavioral health is exempt from the separate rule that will require most other telehealth patients to be in a rural medical facility.</p><p>Congress has extended these deadlines several times, so treat 2028 as the current law rather than a certainty. This Medicare rule is separate from the DEA rules on prescribing controlled medications by telehealth, which have their own deadline; see <a href="/online-therapy/articles/telehealth-controlled-substances-dea-rules-2026">telehealth prescribing and the DEA</a>.</p>`,
    },
    {
      heading: "Does Medicare cover therapy by phone?",
      body: `<p>Through December 31, 2027, yes: Medicare covers audio-only visits at home, ${ext(S.cmsFaq, "according to CMS")}. After that, audio-only mental health care will still be allowed in some situations, for example if you can't use video or don't want to. Ask your provider whether they offer phone sessions; not every platform does.</p>`,
    },
    {
      heading: "What should you check during Medicare open enrollment?",
      body: `<p>Open enrollment runs from October 15 to ${ext(S.openEnrollment, "December 7, 2026")}, and any change takes effect on January 1, 2027. If you use, or plan to use, online therapy or psychiatry:</p><ul><li><strong>On Medicare Advantage:</strong> confirm the platform or therapist you want is in your plan's network for 2027, and check the copay for a telehealth mental-health visit.</li><li><strong>On Original Medicare:</strong> check whether a Medigap plan would cover the 20% you'd otherwise pay.</li><li><strong>Your medications:</strong> make sure your Part D plan still covers what you take, at a price you can manage.</li><li><strong>Ask directly:</strong> 1-800-MEDICARE can confirm what your plan covers. Never give your Medicare number to someone who calls you out of the blue.</li></ul><p>If cost is the barrier, see our guide to <a href="/online-therapy/articles/free-and-low-cost-therapy-options">free and low-cost therapy options</a>.</p>`,
    },
    {
      heading: "The bottom line",
      body: `<p>Medicare covers online therapy and psychiatry by video from home through at least the end of 2027, at the same cost as in-person care: 20% after the Part B deductible on Original Medicare, or your plan's copay on Medicare Advantage. The catch is the provider: Talkspace and Talkiatry say they take Original Medicare, Headspace works through some Advantage plans, and you should confirm any service before your first session. Use open enrollment, which ends December 7, to make sure your 2027 plan covers the care you use. If you're struggling right now, call or text ${ext(S.lifeline, "988")}; veterans can press 1. Online therapy isn't an emergency service. Last checked November 6, 2026. This is general information, not medical or financial advice.</p>`,
    },
  ],
};
