import type { ArticleData } from "../../config";

// ───── Online TRT and the December 31, 2026 DEA deadline (Nov 6, 2026) ─────
// Trend article: the temporary DEA-HHS rule that lets clinicians prescribe
// Schedule III-V drugs, testosterone included, by video with no prior
// in-person visit runs out on December 31, 2026. DEA's permanent "special
// registration" rule has been at White House review since August 25, 2026
// and its text isn't public. Written as unresolved: every outcome (final
// rule, fifth extension, lapse) is described, none predicted. Regulatory
// facts link the DEA, FDA, HHS or the law-firm analyses that summarised
// them; the FDA pages were read directly. Not legal advice. Re-check the
// moment DEA acts. Consistent with the online-therapy guide to the same
// rules (telehealth-controlled-substances-dea-rules-2026).

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  deaExtension: "https://www.dea.gov/press-releases/2025/12/31/dea-extends-telemedicine-flexibilities-ensure-continued-access-care",
  hklaw: "https://www.hklaw.com/en/insights/publications/2026/01/dea-and-hhs-extend-telemedicine-prescribing-flexibilities-through-2026",
  mondaq: "https://www.mondaq.com/unitedstates/healthcare/1736074/2026-extension-of-telemedicine-prescribing-flexibilities-impacts-on-patients-and-providers",
  frierOira: "https://www.frierlevitt.com/articles/dea-telemedicine-special-registration-final-rule-oira/",
  mcdermott: "https://www.mcdermottlaw.com/insights/dea-appears-close-to-finalizing-telemedicine-special-registration/",
  deaProposed: "https://www.dea.gov/press-releases/2025/01/16/dea-announces-three-new-telemedicine-rules-continue-open-access",
  aha: "https://www.aha.org/news/headline/2025-01-15-hhs-dea-release-rules-related-telemedicine-prescribing-controlled-substances",
  bradley: "https://www.bradley.com/insights/publications/2025/05/dea-proposed-rule-for-special-registrations-for-telemedicine-and-limited-state-registrations",
  fdaLabel2025: "https://www.fda.gov/drugs/drug-alerts-and-statements/fda-issues-class-wide-labeling-changes-testosterone-products",
  fdaTestosterone: "https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/testosterone-information",
  healioJune: "https://www.healio.com/news/endocrinology/20260619/hhs-proposes-changes-to-loosen-warnings-on-testosterone-therapy",
  fdaPanel: "https://www.fda.gov/patients/fda-expert-panels/fda-expert-panel-testosterone-replacement-therapy-men-12102025",
};

export const TRT_DEA_DEADLINE: ArticleData = {
  slug: "online-trt-dea-deadline-2026",
  title: "Online TRT After Dec 31, 2026: The DEA Deadline Explained",
  description:
    "The rule that lets online clinics prescribe testosterone without an in-person visit ends Dec 31, 2026. What could change, and what TRT patients should do now.",
  category: "Guide",
  readTime: "7 min read",
  publishedAt: "2026-11-06",
  updatedAt: "2026-11-06",
  heroColor: "#EEF3F8",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "Testosterone is a controlled substance, and a temporary federal rule is what lets online clinics prescribe it by video with no in-person visit. That rule runs out on December 31, 2026.",
    "The DEA's permanent replacement has been under White House review since August 25, 2026, and its text isn't public. It could be finalized, extended again or allowed to lapse; every deadline since 2023 has ended in another extension.",
    "If the rules tighten, the likely ask is an in-person evaluation. Ask your clinic now what its plan is, and don't stockpile or buy testosterone from unlicensed sellers.",
    "Separately, the FDA asked in June 2026 for testosterone labels to drop the age-related low-T limitation and narrow the prostate warnings.",
  ],
  sections: [
    {
      heading: "Is online TRT ending on December 31, 2026?",
      body: `<div class="qa"><strong>The short answer</strong>Not necessarily, but the rules could change. The temporary DEA rule that lets clinicians prescribe testosterone by video without seeing you in person first ${ext(S.deaExtension, "runs through December 31, 2026")}. The DEA has drafted a permanent replacement, but it hasn't been published. If nothing replaces it, the old federal law comes back, which generally requires at least one in-person medical evaluation before a controlled substance is prescribed by telemedicine. Existing patients may need an in-person visit; new patients would almost certainly need one. Ask your clinic what its plan is.</div><p>This page is about the federal rules as of November 6, 2026. It's not legal advice, state rules can be stricter, and the DEA could act any day. We'll update it when it does.</p>`,
    },
    {
      heading: "Why does the DEA control testosterone prescriptions?",
      body: `<p>Testosterone is a Schedule III controlled substance, in the same broad category as some prescription painkillers and anabolic steroids, because of its potential for misuse. Prescribing controlled substances over the internet is governed by the Ryan Haight Act of 2008, which ${ext(S.mondaq, "generally requires at least one in-person medical evaluation")} before a controlled drug is prescribed by telemedicine. After that one evaluation, the federal law doesn't set a repeat or annual exam.</p><p>During the pandemic, the DEA and HHS waived the in-person requirement. That waiver has been extended four times. The latest, ${ext(S.hklaw, "published at the end of 2025")}, lets DEA-registered clinicians prescribe Schedule II to V drugs through audio-video telemedicine with no prior in-person visit until December 31, 2026. The DEA called it a "bridge" to permanent rules. Our online-therapy team covers the same rules for ADHD and anxiety medication in <a href="/online-therapy/articles/telehealth-controlled-substances-dea-rules-2026">telehealth prescribing and the DEA in 2026</a>.</p>`,
    },
    {
      heading: "What is the DEA's special registration rule?",
      body: `<p>It's the permanent framework meant to replace the temporary waiver. The ${ext(S.deaProposed, "proposed version, released in January 2025")}, would create a special DEA registration for clinicians who prescribe Schedule III to V drugs, testosterone included, by telemedicine. As summarized by the ${ext(S.aha, "American Hospital Association")} and ${ext(S.bradley, "law firm Bradley")}, it proposed:</p><ul><li>a separate DEA telemedicine registration for each state where patients are treated;</li><li>prescribing by audio-video visit, with limited exceptions;</li><li>checks of state prescription-monitoring databases before prescribing;</li><li>no special registration needed where the clinician has already seen the patient in person.</li></ul><p>The DEA sent its final version to the White House Office of Information and Regulatory Affairs on ${ext(S.frierOira, "August 25, 2026")}. Its text hasn't been made public, and it's ${ext(S.mcdermott, "unknown how it compares")} with the 2025 proposal.</p>`,
    },
    {
      heading: "Will I need an in-person visit to keep my TRT?",
      body: `<p>It depends on what happens in the next eight weeks. There are three realistic outcomes:</p><ol><li><strong>The final rule is published.</strong> Online clinics register under the new system and keep prescribing by video, under its conditions. Some patients may still need an in-person visit, depending on the final text.</li><li><strong>Another extension.</strong> The waiver is pushed back again, as it has been at every deadline since 2023, and nothing changes for now.</li><li><strong>The waiver lapses with nothing in place.</strong> The Ryan Haight Act's in-person requirement applies again, and clinics would need patients to have an in-person evaluation, typically with the prescribing clinician or through an arrangement the law allows.</li></ol><p>In every case, the one thing that protects you is a plan. A good online clinic should be able to tell you today what it will do in each scenario, including whether it can arrange an in-person visit near you.</p><p>If you're choosing or switching provider, our three highest-ranked online TRT clinics are below. When you compare them, ask each one how it's preparing for the deadline.</p>`,
    },
    {
      heading: "What should TRT patients do before the deadline?",
      body: `<ul><li><strong>Ask your clinic directly</strong> what its plan is for January 1, 2027, and whether it has a way to arrange an in-person evaluation in your state.</li><li><strong>Keep your labs current.</strong> Up-to-date <a href="/trt/articles/trt-blood-work">blood work</a> makes any transition, to a new clinic or an in-person doctor, faster.</li><li><strong>Don't stockpile, and don't buy from unlicensed sellers.</strong> "Research chemical" or overseas testosterone has no quality control, and stopping or changing your dose abruptly carries its own risks.</li><li><strong>Know your local options.</strong> If you'd rather not depend on telehealth rules at all, see our comparison of <a href="/trt/articles/trt-clinic-vs-online">TRT clinics vs online providers</a>.</li></ul>`,
    },
    {
      heading: "Do state laws limit online testosterone prescribing?",
      body: `<p>Yes. The federal rules set the floor, and states can add their own requirements, such as an in-person exam before a controlled-substance prescription or limits on which clinicians can prescribe by telehealth. Those rules vary and change often, so check with your clinic, which has to follow the rules of the state you're in when you're treated. Our guide to <a href="/trt/articles/how-to-get-trt-online">how to get TRT online</a> covers the standard steps.</p>`,
    },
    {
      heading: "What else changed for testosterone in 2026?",
      body: `<p>The FDA has been loosening some of testosterone's label language. In ${ext(S.fdaLabel2025, "February 2025")} it removed the wording about increased cardiovascular risk from the boxed warning, after the large TRAVERSE trial, while adding a class-wide warning that testosterone can raise blood pressure. In ${ext(S.fdaTestosterone, "June 2026")} it asked manufacturers to remove the limitation on use for age-related low testosterone and to revise the safety information on prostate cancer and benign prostatic hyperplasia. Under HHS's proposal, the prostate cancer contraindication would apply only to metastatic disease, and labels would still tell doctors to screen and monitor men, ${ext(S.healioJune, "Healio reported")}. These were requests to manufacturers, so check whether the new labels have been finalized.</p><p>An ${ext(S.fdaPanel, "FDA expert panel")} on testosterone therapy met in December 2025, and some panelists argued testosterone shouldn't be a controlled substance at all. Panel views aren't binding, and testosterone remains Schedule III. For the safety picture as it stands, see <a href="/trt/articles/is-trt-safe">is TRT safe?</a> and <a href="/trt/articles/trt-side-effects">TRT side effects</a>.</p>`,
    },
    {
      heading: "The bottom line",
      body: `<p>Online TRT isn't guaranteed to end on December 31, 2026, but the rule that makes video-only prescribing possible does expire then, and the permanent replacement still isn't public. The most likely impact, if any, is an in-person evaluation. Ask your clinic for its plan, keep your labs current, and don't stockpile or turn to unlicensed sellers. If low testosterone is new to you, start with <a href="/trt/articles/how-low-testosterone-is-diagnosed">how low testosterone is diagnosed</a>. Last checked November 6, 2026. This is general information, not legal or medical advice.</p>`,
    },
  ],
};
