import type { ArticleData } from "../../config";

// ───── Online-therapy guide written for treatmentshub.com/online-therapy, Oct 31, 2026 ─────
// The federal telehealth rules for prescribing controlled substances (ADHD
// stimulants, benzodiazepines, buprenorphine) as they stand on October 31,
// 2026: the fourth temporary DEA-HHS extension that runs through December 31,
// 2026, the January 2025 special registration proposal (sent for White House
// review on August 25, 2026, text not public), the two January 2025 final
// rules (buprenorphine, VA), the Ryan Haight Act default, and the separate
// Medicare in-person rule for tele-mental health. Rules link the Federal
// Register or the agency; summaries of rules link the law firm or trade body
// that published them; enforcement cases link the dated news report. The
// January 2027 section sets out labelled scenarios and does not predict.
// Provider facts come from the vertical seed file or from each company's own
// help pages, labelled "the company says". Medication schedules are stated
// only where a source in the reference list states them.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  // Temporary extensions and the 2026 deadline
  fr4: "https://www.federalregister.gov/documents/2025/12/31/2025-24123/fourth-temporary-extension-of-covid-19-telemedicine-flexibilities-for-prescription-of-controlled",
  dea2025: "https://www.dea.gov/press-releases/2025/12/31/dea-extends-telemedicine-flexibilities-ensure-continued-access-care",
  hk2026: "https://www.hklaw.com/en/insights/publications/2026/01/dea-and-hhs-extend-telemedicine-prescribing-flexibilities-through-2026",
  fierce4: "https://www.fiercehealthcare.com/regulatory/dea-issues-fourth-extension-telehealth-controlled-substance-flexibilities-debate-enters",
  mcd2026: "https://www.mcdermottlaw.com/insights/dea-telemedicine-flexibilities-for-controlled-substances-2026/",
  ncpa: "https://www.ncpa.org/newsroom/qam/2026/01/06/telemedicine-controlled-substance-prescribing-flexibilities-extended",
  connect: "https://connectwithcare.org/dea-prescribing-of-controlled-substances/",
  klgates2023: "https://klgates.com/DEA-Temporarily-Extends-COVID-19-Flexibilities-for-Controlled-Substance-Prescriptions-via-Telemedicine-While-Evaluating-Permanent-Rule-Changes-5-11-2023",
  policymed2023: "https://policymed.com/2023/05/dea-announces-extension-of-telemedicine-flexibilities-despite-phe-ending.html",
  dea2023: "https://www.dea.gov/documents/2023/2023-10/2023-10-06/dea-and-hhs-extend-telemedicine-flexibilities-through-2024",
  foley2023: "https://www.foley.com/en/insights/publications/2023/10/dea-extends-telemedicine-prescribing-controlled",
  dea2024: "https://dea.gov/documents/2024/2024-11/2024-11-15/dea-and-hhs-extend-telemedicine-flexibilities-through-2025",
  foley2024: "https://www.foley.com/insights/publications/2024/11/new-dea-rule-extends-controlled-substance-telemedicine-prescribing/",
  // Ryan Haight Act and the SUPPORT Act
  foleyWhite: "https://connectwithcare.org/wp-content/uploads/2023/03/DEA-Special-Registration-Rule-Ryan-Haight-Act-White-Paper-Foley-Lardner-March-2023.pdf",
  dinsmore: "https://dinsmore.com/publications/support-act-expands-telehealth-treatment-for-substance-use-disorders",
  // Special registration proposal and its status
  srNprm: "https://www.federalregister.gov/documents/2025/01/17/2025-01099/special-registrations-for-telemedicine-and-limited-state-telemedicine-registrations",
  apaSR: "https://www.psychiatry.org/psychiatrists/practice/telepsychiatry/blog/dea-special-registration-for-telemedicine",
  techtargetSR: "https://techtarget.com/virtualhealthcare/feature/What-DEAs-special-registrations-mean-for-telehealth-prescribing",
  foleySR: "https://foley.com/insights/publications/2025/01/dea-special-registration-telemedicine-proposed-rule/",
  ahaSR: "https://www.aha.org/lettercomment/2025-03-18-aha-comments-dea-proposed-rule-special-registrations-telemedicine-prescribing",
  nrha: "https://www.ruralhealth.us/getmedia/d59952a4-9fbc-44f6-a4c7-d72686626523/NRHA-Special-Registration-comment-3-12-2025.pdf",
  cta: "https://cta.tech/media/bywhfiel/dea-special-registration-comments-fin.pdf",
  mcdOira: "https://www.mcdermottlaw.com/insights/dea-appears-close-to-finalizing-telemedicine-special-registration/",
  frierOira: "https://www.frierlevitt.com/articles/dea-telemedicine-special-registration-final-rule-oira/",
  hitnSR: "https://www.healthcareitnews.com/news/dea-seeks-finalize-framework-e-prescribing-controlled-substances",
  // The two January 2025 final rules
  bupRule: "https://www.govinfo.gov/content/pkg/FR-2025-01-17/html/2025-01049.htm",
  vaRule: "https://www.federalregister.gov/documents/2025/01/17/2025-01044/continuity-of-care-via-telemedicine-for-veterans-affairs-patients",
  aamcVA: "https://www.aamc.org/advocacy-policy/washington-highlights/dea-allows-va-practitioners-prescribe-controlled-substances-telemedicine",
  ahaDelay: "https://www.aha.org/news/headline/2025-03-21-dea-hhs-delay-implementation-buprenorphine-final-rule-until-dec-31",
  natlawBup: "https://natlawreview.com/article/dea-tightens-buprenorphine-telemedicine-prescribing-rules",
  benesch: "https://beneschlaw.com/resources/new-final-rules-for-telemedicine-prescribing-extending-telemedicine-flexibilities-and-what-substance-use-disorder-sud-treatment-providers-need-to-know.html",
  // Medicare tele-mental health in-person requirement
  hhsMedicare: "https://telehealth.hhs.gov/providers/billing-and-reimbursement/medicare-payment-policies",
  cmsFaq: "https://www.cms.gov/files/document/telehealth-faq-updated-02-04-2026.pdf",
  pya: "https://www.pyapc.com/insights/medicare-extends-telehealth-coverage-through-2027-updates-and-reminders-for-providers/",
  medEcon: "https://medicaleconomics.com/view/what-changed-in-medicare-telehealth-under-the-2026-spending-bill",
  // Enforcement context: Cerebral and Done
  fortuneCerebral: "https://fortune.com/2022/05/07/cerebral-receives-grand-jury-subpoena-from-us-attorney-adderall-ritalin",
  additude: "https://www.additudemag.com/cerebral-stops-new-adhd-meds-prescriptions/",
  bhbCerebral2022: "https://bhbusiness.com/2022/05/17/cerebral-halts-controlled-substance-prescribing-prepares-for-end-of-covid-era-regs/",
  bhbCerebral2024: "https://bhbusiness.com/2024/11/05/cerebral-hit-with-6-6m-penalty-in-settlement-with-prosecutors/",
  hitCerebral: "https://hitconsultant.net/2024/11/04/cerebral-inc-agrees-to-3-6m-settlement-over-unauthorized-distribution-of-controlled-substances",
  fierceDone2024: "https://www.fiercehealthcare.com/health-tech/digital-health-company-done-indicted-alleged-100m-illegal-adderall-distribution-scheme",
  cbsDone: "https://www.cbsnews.com/news/ruthia-he-done-global-charged-fraud-adderall-stimulants",
  fierceDoneConv: "https://www.fiercehealthcare.com/health-tech/founder-telehealth-startup-done-convicted-adderall-fraud-scheme",
  fierceDoneSent: "https://www.fiercehealthcare.com/health-tech/founder-telehealth-startup-done-sentenced-six-years-prison-adderall-fraud-scheme",
  bhbDoneSent: "https://bhbusiness.com/2026/07/08/done-global-ceo-gets-6-years-in-prison-for-adderall-distribution-fraud/",
  // Providers' own pages and dated reports
  hitnTalkiatry: "https://www.healthcareitnews.com/news/telemental-health-roundup-talkiatry-expands-nationwide",
  fierceTalkiatry: "https://www.fiercehealthcare.com/health-tech/talkiatry-takes-therapy-nationwide-it-builds-out-behavioral-health-platform",
  fierceTalkiatryData: "https://www.fiercehealthcare.com/telehealth/talkiatry-data-shows-if-covid-exemptions-were-end-thousands-would-lose-care",
  talkiatryHelp: "https://www.talkiatry.com/help-center-articles/can-talkiatry-prescribe-controlled-substances",
  talkiatryBlog: "https://www.talkiatry.com/blog/psychiatrist-prescribe-online-vs-in-person",
  talkiatryMeds: "https://www.talkiatry.com/medications",
  talkiatryAnx: "https://www.talkiatry.com/medication/anxiety",
  talkiatryAdhd: "https://www.talkiatry.com/adhd-medication-lp",
  talkspaceHelp: "https://help.talkspace.com/hc/en-us/articles/45996987833115",
  bhbTalkspace2022: "https://bhbusiness.com/2022/06/07/talkspace-cfo-cerebrals-controlled-substances-pivot-could-create-more-daylight-in-virtual-mental-health-market/",
  betterhelpFaq: "https://www.betterhelp.com/advice/general/betterhelp-customer-service-quick-answers-to-your-questions/",
  epic: "https://epicresearch.org/articles/adhd-medications-prescribed-at-similar-rates-during-telehealth-and-in-person-visits",
};

export const OT_TELEHEALTH_CONTROLLED: ArticleData = {
  slug: "telehealth-controlled-substances-dea-rules-2026",
  title: "Telehealth ADHD Meds After 2026: DEA Rules Explained",
  description:
    "The DEA telehealth rules for stimulants, benzodiazepines and buprenorphine, the Dec 31, 2026 expiry, three Jan 2027 scenarios and what patients can do now.",
  category: "Guide",
  readTime: "50 min read",
  publishedAt: "2026-10-31",
  updatedAt: "2026-10-31",
  heroColor: "#EEF1F7",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "Until December 31, 2026, a fourth temporary DEA-HHS rule lets DEA-registered clinicians prescribe Schedule II-V controlled medications by telemedicine without first seeing the patient in person, subject to state law. It is the fourth one-year-or-shorter extension of a COVID-era policy since May 2023.",
    "The permanent replacement, a special registration for telemedicine proposed in January 2025, was sent to the White House Office of Information and Regulatory Affairs on August 25, 2026. As of October 31, 2026 its final text has not been published, and no fifth extension has been issued either.",
    "If nothing new is published, the Ryan Haight Act's default returns on January 1, 2027: at least one in-person medical evaluation before a controlled substance is prescribed by telemedicine, with limited exceptions. Buprenorphine for opioid use disorder and VA care already have their own final rules, in effect since December 31, 2025.",
    "Antidepressants and other non-controlled medications are not affected by the DEA rules. If you take a stimulant or a benzodiazepine prescribed by an online-only clinician, ask now how the practice will handle January and line up an in-person visit if you may need one. BetterHelp does not prescribe at all, and Talkspace says it does not prescribe controlled substances.",
  ],
  sections: [
    {
      heading: "What are the telehealth rules for ADHD medication and other controlled substances in 2026?",
      body: `<div class="qa"><strong>The short answer</strong><p>Through December 31, 2026, US clinicians registered with the DEA can prescribe controlled medications such as ADHD stimulants and benzodiazepines by video without an in-person visit first, under a fourth temporary DEA-HHS rule, as long as state law allows it. The permanent rule meant to replace it was sent for White House review in August 2026 but has not been published. If neither a final rule nor a fifth extension appears, the 2008 Ryan Haight Act's in-person requirement applies again from January 1, 2027. Sources: ${ext(S.fr4, "Federal Register, December 31, 2025")}; ${ext(S.mcdOira, "McDermott Will &amp; Emery, September 18, 2026")}, checked October 31, 2026.</p></div>
<p>Many people now get their psychiatric medication from a clinician they have only ever seen on a screen. For most medications that is ordinary telehealth, governed by state medical boards and the prescriber's judgment. For one group it is not. Controlled substances, the medications on the Drug Enforcement Administration's controlled substances list, sit under a federal law that, by default, requires an in-person medical evaluation before a prescription can be issued by telemedicine. Since the pandemic that default has been suspended by a series of temporary rules. The current one ends on December 31, 2026.</p>
<p>That date matters to a specific set of people: adults and children on ADHD stimulants such as Adderall, Vyvanse, Ritalin or Concerta; people on benzodiazepines such as Xanax, Ativan or Klonopin; people treated for opioid use disorder with buprenorphine; and veterans whose VA prescriber is remote. It matters much less, or not at all, to people whose treatment is talk therapy or a non-controlled antidepressant. This guide sets out what the rules are today, how they got here, the three ways January 1, 2027 could look, which medications are affected, how the platforms we cover handle controlled prescriptions, and a checklist for what to do in each situation.</p>
<p>Three ground rules for reading it. First, we describe the law as it stands on October 31, 2026, with links to the Federal Register and to the agencies, and we will update the page when anything is published. Second, the January 2027 section presents scenarios, clearly labelled, and does not predict which one will happen; nobody outside the agencies knows the text of the rule under review. Third, nothing here is a reason to stop or change a medication on your own. If your access is at risk, the answer is a conversation with your prescriber this month, not a change to your dose. If you are in crisis, call or text 988 in the US, free and open around the clock.</p>`,
    },
    {
      heading: "The core facts at a glance",
      body: `<p>Before the detail, this is the state of play on October 31, 2026, assembled from the Federal Register, the DEA, CMS and the law-firm analyses linked in each row. Each line is unpacked in a section further down.</p>
<table>
<thead><tr><th>Question</th><th>Answer on October 31, 2026</th><th>Source</th></tr></thead>
<tbody>
<tr><td>Can a clinician prescribe a controlled medication by telemedicine without ever seeing you in person?</td><td>Yes, through December 31, 2026, if the clinician is DEA-registered and state law allows it</td><td>${ext(S.fr4, "Fourth temporary rule, Federal Register")}</td></tr>
<tr><td>Which schedules does the temporary rule cover?</td><td>Schedule II through V</td><td>${ext(S.fr4, "Federal Register")}; ${ext(S.hk2026, "Holland &amp; Knight, January 13, 2026")}</td></tr>
<tr><td>Has a fifth extension been published?</td><td>No, as of our check on October 31, 2026</td><td>${ext(S.connect, "Alliance for Connected Care tracker")}</td></tr>
<tr><td>Has the permanent special registration rule been published?</td><td>No. A final rule was sent to the White House Office of Information and Regulatory Affairs (OIRA) on August 25, 2026; its text is not public</td><td>${ext(S.mcdOira, "McDermott, September 18, 2026")}; ${ext(S.frierOira, "Frier Levitt")}</td></tr>
<tr><td>Expected timing of the final rule</td><td>The Justice Department's regulatory agenda listed November 2026, as reported; agenda dates are targets, not commitments</td><td>${ext(S.frierOira, "Frier Levitt")}</td></tr>
<tr><td>What applies if nothing new is issued by January 1, 2027?</td><td>The Ryan Haight Act default: at least one in-person medical evaluation before a controlled-substance prescription by telemedicine, with limited exceptions</td><td>${ext(S.foleyWhite, "Foley &amp; Lardner white paper, March 2023")}</td></tr>
<tr><td>Buprenorphine for opioid use disorder</td><td>Covered by its own final rule, in effect since December 31, 2025, allowing an initial six-month supply by telemedicine, including audio-only</td><td>${ext(S.bupRule, "Final rule, January 17, 2025")}; ${ext(S.ncpa, "NCPA, January 2026")}</td></tr>
<tr><td>VA patients</td><td>Covered by its own final rule: a VA clinician can prescribe by telemedicine if another VA clinician has evaluated the patient in person</td><td>${ext(S.vaRule, "Final rule, January 17, 2025")}</td></tr>
<tr><td>Medicare's in-person rule for tele-mental health</td><td>A separate rule. Waived through December 31, 2027 by the Consolidated Appropriations Act, 2026</td><td>${ext(S.hhsMedicare, "HHS telehealth.hhs.gov")}; ${ext(S.cmsFaq, "CMS FAQ, February 4, 2026")}</td></tr>
<tr><td>Antidepressants and other non-controlled medications</td><td>Not affected by the DEA rules</td><td>${ext(S.talkspaceHelp, "Talkspace help centre")}</td></tr>
</tbody>
</table>
<p>Two things in that table are easy to confuse and worth separating at the start. The DEA rules decide whether a controlled prescription can legally be written after a video visit. The Medicare rule decides whether Medicare pays for a mental-health telehealth visit. They are different laws, run by different agencies, with different deadlines: December 31, 2026 for the DEA flexibilities and December 31, 2027 for the Medicare waiver. A Medicare patient on an antidepressant is touched by the second and not the first; a privately insured adult on Adderall is touched by the first and not the second.</p>`,
    },
    {
      heading: "What is the Ryan Haight Act, and why does it require an in-person visit?",
      body: `<p>The Ryan Haight Online Pharmacy Consumer Protection Act of 2008 is the federal law behind the in-person requirement. Its general rule is short: a practitioner must conduct at least one in-person medical evaluation of a patient before issuing a prescription for a controlled substance. A prescription is lawful under the Act either because that in-person evaluation took place, or because the prescriber's conduct falls within one of the Act's defined exceptions for the "practice of telemedicine". Source: ${ext(S.foleyWhite, "Foley &amp; Lardner, DEA Special Registration Rule white paper, March 2023")}, checked October 31, 2026.</p>
<h3>The seven exceptions, and the one that was never switched on</h3>
<p>The Act lists seven situations that count as the practice of telemedicine. Most are narrow. One was meant to be the general route for ordinary telehealth: a special registration for telemedicine that DEA would create by regulation. DEA did not issue that regulation for more than a decade. The Foley white paper describes the special registration as one of the seven exceptions that "to date has not been activated", and the same was true when the 2025 proposal was published. Source: ${ext(S.foleyWhite, "Foley &amp; Lardner, March 2023")}.</p>
<h3>The missed 2019 deadline</h3>
<p>Congress tried to force the issue in 2018. Section 3232 of the SUPPORT for Patients and Communities Act gave the Attorney General one year to promulgate final regulations creating the special registration, which put the deadline at October 24, 2019. The deadline passed without a rule. Sources: ${ext(S.dinsmore, "Dinsmore &amp; Shohl, SUPPORT Act analysis")}; ${ext(S.foleyWhite, "Foley &amp; Lardner, March 2023")}.</p>
<h3>Why this matters to you in practical terms</h3>
<p>The in-person requirement is not a DEA policy preference that can be dropped by a press release. It is in the statute. What DEA and HHS can do, and have done, is use temporary rules to suspend it, and eventually use the special registration exception to replace it. Every scenario for January 2027 in this guide is a version of one of those three things: the suspension continues, the special registration replaces it, or neither happens and the statute's default applies on its own.</p>
<p>The requirement also explains a quirk patients notice. As the general rule is written, the requirement is at least one in-person evaluation before prescribing; it is a gate, not a monthly visit rule. The 2025 proposal tried to define when that gate can be passed remotely, and that is exactly what remains undecided.</p>`,
    },
    {
      heading: "How did the rules get here? A timeline from 2008 to 2027",
      body: `<p>The temporary flexibilities have now been extended four times, each time close to an expiry date. The table puts the full sequence in one place, from the 2008 Act to the January 2028 Medicare date, with the source for each step. Dates are the publication or effective dates given in the linked documents.</p>
<table>
<thead><tr><th>Date</th><th>What happened</th><th>Effect for patients</th><th>Source</th></tr></thead>
<tbody>
<tr><td>2008</td><td>Ryan Haight Act enacted</td><td>In-person evaluation required before a controlled prescription by telemedicine, with seven exceptions, including a special registration DEA was to create</td><td>${ext(S.foleyWhite, "Foley &amp; Lardner")}</td></tr>
<tr><td>2018</td><td>SUPPORT Act, Section 3232, orders DEA to create the special registration within one year</td><td>Deadline of October 24, 2019 passes with no rule</td><td>${ext(S.dinsmore, "Dinsmore")}</td></tr>
<tr><td>COVID-19 public health emergency</td><td>Telemedicine flexibilities allow controlled prescribing without an in-person visit</td><td>The period in which, per Done Global, the events in its later prosecution principally occurred (February 2020 to January 2023)</td><td>${ext(S.fr4, "Federal Register (title of the 2025 extension)")}; ${ext(S.fierceDone2024, "Fierce Healthcare")}</td></tr>
<tr><td>March 1, 2023</td><td>DEA proposes permanent telemedicine rules</td><td>More than 38,000 public comments; DEA holds two days of listening sessions</td><td>${ext(S.dea2023, "DEA, October 6, 2023")}</td></tr>
<tr><td>May 2023</td><td>First temporary rule, effective May 11, 2023</td><td>Flexibilities continue through November 11, 2023, and through November 11, 2024 for relationships set up by November 11, 2023</td><td>${ext(S.klgates2023, "K&amp;L Gates, May 11, 2023")}; ${ext(S.policymed2023, "PolicyMed, May 2023")}</td></tr>
<tr><td>October 2023</td><td>Second temporary rule (88 Fed. Reg. 69879)</td><td>Full flexibilities through December 31, 2024</td><td>${ext(S.dea2023, "DEA, October 6, 2023")}; ${ext(S.foley2023, "Foley, October 2023")}</td></tr>
<tr><td>November 2024</td><td>Third temporary rule</td><td>Full flexibilities through December 31, 2025</td><td>${ext(S.dea2024, "DEA, November 15, 2024")}; ${ext(S.foley2024, "Foley, November 2024")}</td></tr>
<tr><td>January 17, 2025</td><td>Special registration proposed rule; buprenorphine final rule; VA final rule</td><td>Proposal opens for comment through March 18, 2025; the two final rules are scheduled for February 2025</td><td>${ext(S.srNprm, "Federal Register")}; ${ext(S.bupRule, "buprenorphine rule")}; ${ext(S.vaRule, "VA rule")}</td></tr>
<tr><td>February and March 2025</td><td>Effective dates of the two final rules delayed, then moved to December 31, 2025</td><td>No change for patients during 2025</td><td>${ext(S.ahaDelay, "AHA, March 21, 2025")}</td></tr>
<tr><td>December 31, 2025</td><td>Fourth temporary rule published; buprenorphine and VA final rules take effect</td><td>Full flexibilities from January 1 through December 31, 2026</td><td>${ext(S.fr4, "Federal Register")}; ${ext(S.dea2025, "DEA press release")}</td></tr>
<tr><td>February 3, 2026</td><td>Consolidated Appropriations Act, 2026 signed</td><td>Medicare telehealth flexibilities, including the delay of the tele-mental health in-person visit, extended through December 31, 2027</td><td>${ext(S.medEcon, "Medical Economics, February 10, 2026")}</td></tr>
<tr><td>July 7, 2026</td><td>Done Global's founder sentenced</td><td>Context for enforcement attention on stimulant telehealth</td><td>${ext(S.fierceDoneSent, "Fierce Healthcare")}</td></tr>
<tr><td>August 25, 2026</td><td>DEA sends a final special registration rule to OIRA for review</td><td>Text not public</td><td>${ext(S.mcdOira, "McDermott, September 18, 2026")}</td></tr>
<tr><td>November 2026 (target)</td><td>Final action date in the Justice Department's regulatory agenda, as reported</td><td>A target, not a commitment</td><td>${ext(S.frierOira, "Frier Levitt")}</td></tr>
<tr><td>December 31, 2026</td><td>Fourth temporary rule expires</td><td>See the scenario table below</td><td>${ext(S.fr4, "Federal Register")}</td></tr>
<tr><td>January 1, 2027</td><td>First day without the current flexibilities, unless replaced</td><td>Depends on which scenario applies</td><td>-</td></tr>
<tr><td>January 1, 2028</td><td>Medicare's in-person requirement for tele-mental health takes effect, unless changed</td><td>An in-person visit within six months before the first Medicare mental-health telehealth service, then every 12 months</td><td>${ext(S.cmsFaq, "CMS FAQ")}; ${ext(S.pya, "PYA")}</td></tr>
</tbody>
</table>
<h3>What the pattern shows, and what it does not</h3>
<p>Every extension so far has arrived late. The first came days before the public health emergency ended; the last was published on December 31, 2025, one day before the flexibilities were due to expire, according to ${ext(S.hk2026, "Holland &amp; Knight")}. That history is a reason not to read anything into the absence of an announcement in October or November. It is not evidence that a fifth extension will come. Each extension was a separate decision, and the agency's own stated purpose for the fourth was to give it time to finish permanent rules, not to keep extending. ${ext(S.mcd2026, "McDermott reported in December 2025")} that DEA was not planning a new proposed rule and would instead finalise one of its previous proposals. One reported discrepancy worth noting: ${ext(S.fierce4, "Fierce Healthcare")} gave the end date as December 30, 2026, while the Federal Register and DEA give December 31; we use the Federal Register date.</p>
<h3>How the four temporary rules differed</h3>
<p>Patients often talk about "the extension" as one thing. There have been four, and the first was different in a way that matters for thinking about January 2027. The table compares them using the agency releases and law-firm summaries in our references.</p>
<table>
<thead><tr><th>Temporary rule</th><th>When</th><th>How long it ran</th><th>Treatment of existing patients</th><th>Source</th></tr></thead>
<tbody>
<tr><td>First</td><td>Effective May 11, 2023, as the public health emergency ended</td><td>Full flexibilities through November 11, 2023</td><td>A further year, through November 11, 2024, for practitioner-patient relationships set up by telemedicine on or before November 11, 2023</td><td>${ext(S.klgates2023, "K&amp;L Gates")}; ${ext(S.policymed2023, "PolicyMed")}</td></tr>
<tr><td>Second</td><td>Announced October 6, 2023; published October 10, 2023 (88 Fed. Reg. 69879)</td><td>Full flexibilities through December 31, 2024</td><td>No distinction needed: the full flexibilities applied to new and existing patients</td><td>${ext(S.dea2023, "DEA")}; ${ext(S.foley2023, "Foley")}</td></tr>
<tr><td>Third</td><td>Submitted to the Federal Register November 15, 2024</td><td>Full flexibilities through December 31, 2025</td><td>As above</td><td>${ext(S.dea2024, "DEA")}; ${ext(S.foley2024, "Foley")}</td></tr>
<tr><td>Fourth</td><td>Published December 31, 2025</td><td>Full flexibilities January 1 through December 31, 2026</td><td>As above; practitioners covered by the two final rules may keep using the temporary rule</td><td>${ext(S.fr4, "Federal Register")}; ${ext(S.dea2025, "DEA")}</td></tr>
</tbody>
</table>
<h3>Why the first rule is the useful precedent</h3>
<p>The first temporary rule was the only one that separated new patients from existing ones. It kept full flexibilities for everyone for six months, then gave an extra year only to relationships already established. The later three dropped that distinction and extended everything. When people ask whether existing patients will be protected in 2027, the honest answer is that the agencies have used a grace period for existing relationships once, in 2023, and have not said whether they would do so again. A final rule could include one, or not; a lapse would not.</p>
<h3>Why DEA kept extending</h3>
<p>The October 2023 release set the second extension against the response to the March 2023 proposals: more than 38,000 comments and two days of public listening sessions. Those proposals were never finalised, and the 2025 special registration proposal came next. McDermott reported in December 2025 that DEA was not planning another new proposed rule and would instead finalise one of its previous proposals; the August 2026 submission to OIRA is consistent with that. Sources: ${ext(S.dea2023, "DEA, October 6, 2023")}; ${ext(S.mcd2026, "McDermott, December 30, 2025")}; ${ext(S.mcdOira, "McDermott, September 18, 2026")}.</p>`,
    },
    {
      heading: "What do the temporary flexibilities allow until December 31, 2026?",
      body: `<p>The fourth temporary rule, titled "Fourth Temporary Extension of COVID-19 Telemedicine Flexibilities for Prescription of Controlled Medications" and issued jointly by DEA and HHS, keeps the full set of pandemic-era flexibilities in place from January 1 through December 31, 2026. Under it, DEA-registered practitioners can prescribe Schedule II through V controlled substances via telemedicine without a prior in-person evaluation, subject to the rule's conditions and to state law. Source: ${ext(S.fr4, "Federal Register, December 31, 2025")}; ${ext(S.hk2026, "Holland &amp; Knight, January 13, 2026")}.</p>
<h3>What "full flexibilities" means in practice</h3>
<ul>
<li><strong>No in-person visit first.</strong> A new patient can be evaluated by video and, if the clinician judges it appropriate, prescribed a controlled medication. That includes Schedule II drugs, which the 2025 special registration proposal would have treated more strictly.</li>
<li><strong>The prescriber still needs a DEA registration.</strong> The flexibility removes the in-person step, not the registration. A clinician without a DEA registration cannot prescribe controlled substances in person or remotely.</li>
<li><strong>State law still applies.</strong> The federal rule sets a floor of permission, not an entitlement. Where a state requires an in-person examination for some or all controlled prescriptions, that requirement stands. We cover state differences below.</li>
<li><strong>Clinical judgment still applies.</strong> Nothing in the rule obliges a clinician to prescribe. A legitimate practice can and will say no, or say "not yet", and some decline controlled prescribing altogether as a business policy.</li>
</ul>
<h3>How the temporary rule sits alongside the two final rules</h3>
<p>Two permanent rules took effect at the same moment the fourth extension did. The buprenorphine rule and the VA rule each set out a narrower permanent pathway. The DEA said that practitioners covered by one or both of those final rules may continue to use the flexibilities in the fourth temporary rule, which imposes fewer requirements, for as long as it lasts. In practice that means the two permanent rules are mostly dormant in 2026; they become the operative rules for their groups when the temporary rule ends, unless something replaces it. Source: ${ext(S.dea2025, "DEA press release, December 31, 2025")}; ${ext(S.hk2026, "Holland &amp; Knight")}.</p>
<h3>What it does not cover</h3>
<p>The temporary rule concerns the federal in-person requirement for controlled substances. It says nothing about non-controlled medications, which were never subject to that requirement. It does not change state licensing rules. And it does not cover Medicare payment rules, which are a separate statute. Patients sometimes hear "the telehealth rules expire in December" and assume all virtual psychiatry is at risk. It is not. The December date concerns controlled substances.</p>
<h3>What this means for you</h3>
<p>If you started a stimulant or a benzodiazepine with an online clinician you have never met in person, the legal basis for your prescriptions since 2023 has been one of these temporary rules. Nothing about your treatment needs to change before December 31. What you can usefully do now is find out what your prescriber plans for January, which is covered in the checklist section.</p>`,
    },
    {
      heading: "What did the January 2025 special registration proposal say?",
      body: `<p>On January 17, 2025, DEA published "Special Registrations for Telemedicine and Limited State Telemedicine Registrations" as a proposed rule. It was released on January 15 and open for comment through March 18, 2025. It is the proposal the agency is now finalising, though, as McDermott noted in September 2026, the text of the draft final rule is not public and it is unknown how it compares to the January 2025 version. Treat everything in this section as the starting point, not the outcome. Sources: ${ext(S.srNprm, "Federal Register, January 17, 2025")}; ${ext(S.techtargetSR, "TechTarget")}; ${ext(S.mcdOira, "McDermott, September 18, 2026")}.</p>
<h3>Three registrations</h3>
<table>
<thead><tr><th>Proposed registration</th><th>Who</th><th>What it would allow</th><th>Key conditions in the proposal</th></tr></thead>
<tbody>
<tr><td>Telemedicine Prescribing Registration</td><td>Clinicians who show a "legitimate need"</td><td>Prescribing Schedule III-V controlled substances by telemedicine without a prior in-person visit</td><td>A state telemedicine registration for each state where patients are located; prescription monitoring checks</td></tr>
<tr><td>Advanced Telemedicine Prescribing Registration</td><td>Specialists: psychiatrists, hospice and palliative care physicians, physicians treating patients in long-term care facilities, pediatricians and neurologists, plus mid-level practitioners and other physicians board-certified in treating psychiatric or psychological disorders</td><td>Prescribing Schedule II-V, adding Schedule II</td><td>For Schedule II: the clinician must be physically in the same state as the patient, and telemedicine Schedule II prescriptions must stay under 50% of the clinician's total Schedule II prescriptions each month</td></tr>
<tr><td>Telemedicine Platform Registration</td><td>Online platforms</td><td>Dispensing controlled substances through the platform</td><td>Registration of the platform itself</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.foleySR, "Foley &amp; Lardner, January 2025")}; ${ext(S.apaSR, "American Psychiatric Association")}; ${ext(S.techtargetSR, "TechTarget")}; ${ext(S.hitnSR, "Healthcare IT News")}.</p>
<h3>The other proposed conditions</h3>
<ul>
<li><strong>Nationwide prescription monitoring checks.</strong> Clinicians would have to check the prescription drug monitoring programme (PDMP) of all 50 states and any district or territory for each prescription issued under a special registration, with a three-year delay before that requirement applied. The APA argued that checking every state's PDMP is not feasible given how much state systems vary. Source: ${ext(S.apaSR, "APA")}; ${ext(S.techtargetSR, "TechTarget")}.</li>
<li><strong>Fees.</strong> The proposal listed a fee of $888 per type of special registration, as reported by ${ext(S.techtargetSR, "TechTarget")}.</li>
<li><strong>Legitimate need.</strong> Applicants for the clinician registrations would have to demonstrate a legitimate need for them. Source: ${ext(S.foleySR, "Foley")}.</li>
</ul>
<h3>Why psychiatry objected</h3>
<p>The two provisions that drew the most fire were the Schedule II same-state requirement and the 50% cap. The American Psychiatric Association called for both to be dropped, describing them as arbitrary limits on potentially life-saving medication. The Consumer Technology Association said the 50% requirement would essentially bar virtual-only providers from prescribing Schedule II drugs. The National Rural Health Association said the same-state limit would cut off some rural patients, and the American Hospital Association asked DEA to widen the Advanced registration to every practitioner who can prescribe these medications in person. Sources: ${ext(S.apaSR, "APA")}; ${ext(S.cta, "CTA comments")}; ${ext(S.nrha, "NRHA comments, March 12, 2025")}; ${ext(S.ahaSR, "AHA comments, March 18, 2025")}.</p>
<h3>Where the stakeholders stand now</h3>
<p>The positions taken in 2025 are the best public guide to what the final text will be argued over. Psychiatrists, hospitals and rural providers wanted wider eligibility and fewer Schedule II limits. Telehealth companies wanted a pathway that virtual-only practices can actually use. When DEA sent its final rule for review in August 2026, ATA Action, the advocacy arm of the American Telemedicine Association, called it "a major step toward a permanent federal framework" and said it was engaging with OMB on the review, as reported by ${ext(S.hitnSR, "Healthcare IT News")}. None of these organisations has seen the final text either.</p>
<h3>What the proposal would mean for an ADHD patient, worked through</h3>
<p>Take the proposal as written and apply it to a common case: an adult whose ADHD stimulant is a Schedule II drug, prescribed by a psychiatrist at a national telehealth practice who has never met the patient. Under the proposal, the psychiatrist would need the Advanced registration, a state telemedicine registration for the patient's state, to be physically in that state at the moment of prescribing, and to keep telemedicine Schedule II prescriptions below half of their monthly Schedule II total. A psychiatrist in one state treating patients in twenty, entirely by video, would fail the same-state test for most of them and the 50% test for all of them. The same patient on a Schedule III-V medication would be in a much easier position: the ordinary Telemedicine Prescribing Registration and a state registration would cover it. That asymmetry is why the final text matters so much more for stimulant patients than for anyone else.</p>
<p>Whether your stimulant is Schedule II is something your pharmacist or the DEA's published schedules can confirm; we do not list schedules for individual products in this guide where our sources did not state them.</p>`,
    },
    {
      heading: "What changed with the buprenorphine and VA final rules?",
      body: `<p>Alongside the proposal, DEA and HHS finalised two narrower rules on January 17, 2025. Both were originally due to take effect in February 2025, were delayed twice, and took effect on December 31, 2025. Sources: ${ext(S.ahaDelay, "AHA, March 21, 2025")}; ${ext(S.ncpa, "NCPA, January 6, 2026")}; ${ext(S.dea2025, "DEA, December 31, 2025")}.</p>
<h3>Buprenorphine for opioid use disorder</h3>
<p>"Expansion of Buprenorphine Treatment via Telemedicine Encounter" (90 FR 6504) lets DEA-registered practitioners prescribe Schedule III-V controlled substances approved for treating opioid use disorder through a telemedicine encounter, including an audio-only one. Its main provisions, as described in the rule and in the summaries linked here:</p>
<ul>
<li><strong>An initial six-month supply by telemedicine.</strong> The practitioner can prescribe up to six calendar months of medication, which may be split across several prescriptions, after reviewing the patient's prescription monitoring data.</li>
<li><strong>Audio-only allowed.</strong> A phone call can be the encounter, which matters for patients without reliable video.</li>
<li><strong>A fallback if monitoring data is unavailable.</strong> If the PDMP data cannot be checked, the practitioner may prescribe only a seven-day supply.</li>
<li><strong>After six months.</strong> Summaries of the final rule describe what happens after the initial period differently. Some say further prescriptions require an in-person visit; another says the requirement for an in-person evaluation to prescribe beyond the initial supply was removed in the final version. Ask your prescriber how their practice applies the rule to you.</li>
</ul>
<p>Sources: ${ext(S.bupRule, "Final rule, Federal Register, January 17, 2025")}; ${ext(S.natlawBup, "National Law Review")}; ${ext(S.benesch, "Benesch")}.</p>
<h3>Veterans Affairs patients</h3>
<p>"Continuity of Care via Telemedicine for Veterans Affairs Patients" (90 FR 6523) authorises VA practitioners, acting within their VA employment, to prescribe Schedule II-V controlled substances by telemedicine to a VA patient they have not personally evaluated in person, provided another VA practitioner has previously conducted an in-person medical evaluation of that patient. The rule requires the prescriber to review the patient's records before prescribing. It does not apply to contracted practitioners working outside a VA facility through the community care network, or to clinicians conducting disability compensation examinations. Sources: ${ext(S.vaRule, "Final rule, Federal Register, January 17, 2025")}; ${ext(S.aamcVA, "AAMC")}.</p>
<h3>What this means for you</h3>
<p>For these two groups, January 1, 2027 is lower-stakes than for everyone else. If the temporary rule lapses with nothing new, buprenorphine patients still have a permanent telemedicine pathway with a six-month initial supply, and VA patients who have been seen in person by any VA clinician can still be prescribed to remotely by another. What changes is the detail: buprenorphine patients may meet monitoring checks and supply rules they did not meet under the temporary flexibilities, and VA patients receiving care through community care contractors are outside the VA rule. If you are in either group, ask your prescriber which pathway they will use from January.</p>`,
    },
    {
      heading: "What happens on January 1, 2027? Three scenarios",
      body: `<p>The federal position on January 1, 2027 depends on which of three things has happened by then. We set them out as scenarios, not forecasts. Each is legally possible; we do not know which will occur, and the agencies have not said. Where an outcome inside a scenario depends on rule text that has not been published, the table says so.</p>
<table>
<thead><tr><th>Scenario (labelled, not predicted)</th><th>What it would mean</th><th>ADHD stimulant and benzodiazepine patients of online-only prescribers</th><th>Buprenorphine and VA patients</th><th>What to watch for</th></tr></thead>
<tbody>
<tr><td><strong>A. Fifth temporary extension</strong></td><td>DEA and HHS publish another temporary rule carrying the current flexibilities into 2027</td><td>No change on January 1. Prescribing by video without an in-person visit continues for the period of the extension, subject to state law</td><td>No change; the temporary rule can continue to be used alongside the two final rules, as in 2026</td><td>A Federal Register notice and a DEA press release; past extensions were published between May and late December</td></tr>
<tr><td><strong>B. Special registration final rule published and in effect</strong></td><td>The rule now at OIRA is published and its provisions govern telemedicine prescribing</td><td>Depends on the final text. Under the January 2025 proposal, prescribers would need a special registration and state registrations; Schedule II prescribing would carry the same-state and 50% limits. Practices would need time to register, so the effective date and any transition period matter</td><td>The two final rules continue; the final special registration rule may add a further pathway</td><td>The published text: which registrations exist, whether the Schedule II limits survived, the effective date, and any grace period for existing patients</td></tr>
<tr><td><strong>C. Lapse</strong></td><td>Neither a fifth extension nor a final rule takes effect by January 1</td><td>The Ryan Haight default applies: a prescriber who has never evaluated you in person cannot lawfully issue a new controlled prescription by telemedicine unless an exception applies. An in-person evaluation would be needed</td><td>The buprenorphine rule (initial six-month supply) and the VA rule continue; these are permanent</td><td>Practice notices asking for in-person visits; pharmacies questioning telemedicine prescriptions</td></tr>
</tbody>
</table>
<h3>A variant: a final rule with a delayed effective date</h3>
<p>Scenario B has an important variant. A final rule can be published before January 1 but take effect later, or it can include a transition for patients already in care. If that happens, what applies in the gap depends on whether the agencies also extend the temporary flexibilities to bridge it. That is how the two January 2025 final rules were handled: their effective dates were moved to December 31, 2025 so they would not overlap confusingly with the temporary period, according to ${ext(S.hk2026, "Holland &amp; Knight")}. We are not predicting a repeat; we note it because a headline saying "DEA finalises telehealth rule" will not, on its own, tell you what applies to your next prescription.</p>
<h3>What existing patients should not assume</h3>
<p>The first temporary rule in 2023 gave a year's grace to practitioner-patient relationships already set up by video. Nothing we found says a lapse in 2027 would do the same. Under scenario C the statute's general rule applies to any prescription issued by telemedicine, and we found no provision in the sources reviewed that would exempt existing telehealth-only patients. Under scenario B, whether existing patients get a transition depends entirely on the final text.</p>
<h3>The question that applies in every scenario</h3>
<p>In all three, one fact helps: an in-person evaluation by your prescriber. Under the Act, a clinician who has evaluated you in person can prescribe by telemedicine afterwards. Getting that evaluation done before January is the one step that protects you in scenario C, costs you little in scenario A, and is likely to simplify things in scenario B. It is not always possible. When it is, it is the most useful thing on the checklist below.</p>
<h3>How to check which scenario has happened</h3>
<ol>
<li>Search the Federal Register for "telemedicine" with DEA as the agency. The fourth extension is ${ext(S.fr4, "document 2025-24123")}; a fifth extension or a final rule would appear the same way.</li>
<li>Check the DEA's press releases page. Each extension has been announced there, as with the ${ext(S.dea2025, "December 31, 2025 release")}.</li>
<li>Read your prescriber's notice. Legitimate practices tell patients what is changing; the ${ext(S.talkiatryBlog, "Talkiatry blog")}, for example, already refers to the December 31, 2026 date.</li>
</ol>`,
    },
    {
      heading: "Worked examples: what January 2027 could mean for six patients",
      body: `<p>The scenario table is abstract. These examples apply it to typical situations. The people are illustrative, not real cases; the rules applied to them are the ones in the linked sources. In each, "scenario A", "B" and "C" refer to the fifth extension, the final special registration rule, and a lapse.</p>
<h3>1. An adult on an ADHD stimulant, seen only by video</h3>
<p>A 34-year-old was diagnosed with ADHD by a psychiatrist at a national telehealth practice in 2024 and has been prescribed a stimulant ever since, entirely by video. They have never met the psychiatrist. In scenario A nothing changes on January 1. In scenario C, the psychiatrist cannot lawfully issue a new prescription by telemedicine until an in-person evaluation has happened, so the patient needs either an in-person visit with that psychiatrist or a local prescriber. In scenario B, the outcome depends on the final text; under the January 2025 proposal, if the stimulant is Schedule II, the psychiatrist would need the Advanced registration, a state telemedicine registration for the patient's state, to be in that state when prescribing, and to stay under the 50% cap. The single step that removes most of the uncertainty is an in-person evaluation before the end of December. Sources: ${ext(S.foleyWhite, "Foley &amp; Lardner")}; ${ext(S.apaSR, "APA")}; ${ext(S.techtargetSR, "TechTarget")}.</p>
<h3>2. A parent whose child is on a stimulant from a telehealth pediatric service</h3>
<p>The federal rules make no exception for children. The same three scenarios apply. One detail of the 2025 proposal is relevant: pediatricians were among the specialists eligible for the Advanced registration, which would allow Schedule II prescribing by telemedicine, subject to the same-state and 50% conditions. The parent's useful question for the service is the same as anyone's: what happens in January, and can you see my child in person if needed. Source: ${ext(S.foleySR, "Foley &amp; Lardner")}; ${ext(S.apaSR, "APA")}.</p>
<h3>3. Someone on a benzodiazepine in a state with its own in-person rule</h3>
<p>A patient in one of the states that Talkiatry lists as prohibiting telehealth prescribing of controlled substances has, by that account, already had to meet the state rule to be prescribed at all, so the federal December date changes little for them in any scenario. A patient in a state without such a rule, prescribed a benzodiazepine by video only, is in the same position as the stimulant patient in example 1. In both cases the patient should not change their dose while they sort it out. Source: ${ext(S.talkiatryHelp, "Talkiatry help centre")}; ${ext(S.talkiatryAnx, "Talkiatry, anxiety medication")}.</p>
<h3>4. A patient treated for opioid use disorder by phone</h3>
<p>A patient started buprenorphine for opioid use disorder through a telehealth programme in 2026, with audio-only follow-ups. Under the temporary rule that has been permitted without the buprenorphine rule's conditions. From January, in scenario C, the permanent buprenorphine rule governs: an initial six-month supply by telemedicine, including audio-only, after the prescriber reviews the patient's prescription monitoring data, with a seven-day limit if that data is unavailable. The patient's questions are what the six-month clock means for someone already in treatment and what happens at the end of it. Sources: ${ext(S.bupRule, "final rule")}; ${ext(S.natlawBup, "National Law Review")}; ${ext(S.benesch, "Benesch")}.</p>
<h3>5. A veteran with a remote VA psychiatrist</h3>
<p>A veteran sees a VA psychiatrist by video and had an in-person visit with a VA primary care clinician two years ago. Under the VA rule, the in-person evaluation by another VA practitioner meets the rule's condition, and the psychiatrist can prescribe Schedule II-V medication by telemedicine after reviewing the records. If instead the veteran's prescriber were a community care contractor outside a VA facility, the VA rule would not apply, and the veteran would be in the same position as a civilian patient. Sources: ${ext(S.vaRule, "VA final rule")}; ${ext(S.aamcVA, "AAMC")}.</p>
<h3>6. A Medicare patient in online therapy with an antidepressant</h3>
<p>A 68-year-old sees a therapist and a psychiatric prescriber by video, billed to Medicare, and takes a non-controlled antidepressant. The DEA date does not apply to the antidepressant. The Medicare in-person requirement is waived through December 31, 2027. If it takes effect on January 1, 2028 as currently written, and the patient started before that date, PYA's summary says they would not need the six-month pre-visit but would need an in-person visit at least every 12 months. Sources: ${ext(S.cmsFaq, "CMS")}; ${ext(S.pya, "PYA")}.</p>`,
    },
    {
      heading: "Which psychiatric medications are controlled, and which are not?",
      body: `<p>The DEA rules apply only to controlled substances. The table separates the main groups of psychiatric medication by whether they are controlled, what the telehealth rules mean for each, and whether the platforms in our coverage can prescribe them. Product examples are the ones the companies themselves name in their help pages. For any specific medication, the authoritative source is the DEA's published list of controlled substances, which Talkspace's help centre also points patients to.</p>
<table>
<thead><tr><th>Medication group</th><th>Examples named by the sources</th><th>Controlled under federal law?</th><th>What the telehealth rules mean</th><th>Talkiatry / Talkspace / BetterHelp</th></tr></thead>
<tbody>
<tr><td>ADHD stimulants</td><td>Adderall, Vyvanse, Ritalin, Concerta</td><td>Yes</td><td>Video-only prescribing allowed through December 31, 2026. After that, depends on the scenario. Schedule II products would face the strictest conditions under the 2025 proposal</td><td>Talkiatry: where state law allows and clinically appropriate (company says) / Talkspace: no / BetterHelp: no prescribing</td></tr>
<tr><td>Benzodiazepines</td><td>Xanax, Ativan, Klonopin</td><td>Yes</td><td>Same federal position as stimulants. Some states require an in-person visit for benzodiazepines in particular, according to Talkiatry's anxiety page</td><td>Talkiatry: state-dependent / Talkspace: no / BetterHelp: no</td></tr>
<tr><td>Buprenorphine for opioid use disorder</td><td>Buprenorphine</td><td>Yes, within the Schedule III-V opioid use disorder medications covered by its own rule</td><td>Permanent final rule since December 31, 2025: initial six-month supply by telemedicine, including audio-only</td><td>Talkiatry: does not provide medication-assisted treatment for substance use disorders (company says) / Talkspace: no / BetterHelp: no</td></tr>
<tr><td>Antidepressants</td><td>SSRIs and other antidepressants</td><td>No</td><td>The DEA rules do not apply; ordinary state telehealth law and clinical judgment do</td><td>Talkiatry: yes / Talkspace: yes / BetterHelp: no</td></tr>
<tr><td>Non-controlled anti-anxiety medications</td><td>As described by Talkspace, without product names</td><td>No</td><td>The DEA rules do not apply</td><td>Talkiatry: yes / Talkspace: yes / BetterHelp: no</td></tr>
<tr><td>Non-stimulant ADHD medications</td><td>Ask your prescriber</td><td>Check the DEA list for the specific product</td><td>If not controlled, the DEA rules do not apply</td><td>Ask the platform</td></tr>
</tbody>
</table>
<p>Sources: ${ext(S.talkspaceHelp, "Talkspace help centre")}; ${ext(S.talkiatryHelp, "Talkiatry help centre")}; ${ext(S.talkiatryAnx, "Talkiatry, anxiety medication")}; ${ext(S.talkiatryMeds, "Talkiatry, medications")}; ${ext(S.bupRule, "buprenorphine final rule")}; ${ext(S.betterhelpFaq, "BetterHelp FAQ")}, checked October 31, 2026.</p>
<h3>What the controlled-or-not line means for your choices</h3>
<p>The line is regulatory, not a judgment about which medication is better. Whether a non-controlled option suits you is a clinical decision for your prescriber, who will weigh your diagnosis, history, other medications and what has worked before. For anxiety, Talkiatry says SSRIs and other non-controlled medications are usually considered first for ongoing treatment, with benzodiazepines generally used short-term or as needed; that is the company's description of its practice. For ADHD, if a stimulant works well for you, January is not a reason to switch. It is a reason to make sure your prescriber can keep prescribing it lawfully.</p>
<h3>What it means for depression and anxiety patients</h3>
<p>If your treatment is an antidepressant and talk therapy, the DEA deadline does not touch you. You can keep seeing an online psychiatrist by video in 2027 under the same rules as today. Our guides to <a href="/online-therapy/articles/online-therapy-for-depression">online therapy for depression</a> and <a href="/online-therapy/articles/online-therapy-for-anxiety">online therapy for anxiety</a> cover how online care fits those conditions; the only regulatory dates that may matter to you are Medicare's, if you are a Medicare patient.</p>`,
    },
    {
      heading: "Why did regulators focus on ADHD stimulants? The Cerebral and Done cases",
      body: `<p>The policy debate over telehealth prescribing is not abstract. Two companies that grew quickly during the pandemic by prescribing ADHD stimulants online became federal cases, and the record in each explains why the 2025 proposal treated Schedule II drugs so differently. We describe them as context; neither is a judgment about telehealth psychiatry in general, and the companies we cover were not involved.</p>
<h3>Cerebral</h3>
<p>In May 2022 Cerebral received a grand jury subpoena from the US Attorney's Office for the Eastern District of New York seeking documents related to its prescribing of controlled substances, as reported by ${ext(S.fortuneCerebral, "Fortune on May 7, 2022")}. The company paused new ADHD stimulant prescriptions effective May 9, 2022, while continuing existing patients' medication for the time being, according to ${ext(S.additude, "ADDitude")}. Behavioral Health Business reported on May 17, 2022 that Cerebral would stop prescribing most controlled substances and transition current patients to local providers or off controlled substances by October 15, while continuing controlled medication in its medication-assisted treatment programme. Source: ${ext(S.bhbCerebral2022, "Behavioral Health Business, May 17, 2022")}.</p>
<p>In November 2024 Cerebral entered a non-prosecution agreement with the Eastern District of New York. As reported, it agreed to forfeit $3,652,000, the revenue prosecutors linked to its increase in ADHD treatment and stimulant prescribing, with a further $2,922,000 fine deferred for the agreement's 30-month term and waived if the company complies; the agreement records the company's representation that it was unable to pay that penalty. Prosecutors said Cerebral had set targets to raise its initial-visit prescription rate to 95% and its ADHD stimulant prescription rate to nearly 100%, and had left thousands of duplicate patient accounts unaddressed until at least early 2022. The agreement credited remedial steps from May 2022, including terminating its chief executive and dropping those prescription metrics. Sources: ${ext(S.bhbCerebral2024, "Behavioral Health Business, November 5, 2024")}; ${ext(S.hitCerebral, "HIT Consultant, November 4, 2024")}.</p>
<h3>Done Global</h3>
<p>In June 2024 Done Global's founder and chief executive, Ruthia He, and its clinical president, David Brody, were arrested and charged in the Northern District of California. Prosecutors alleged a scheme in which the company arranged for more than 40 million pills of Adderall and other stimulants and obtained over $100 million in revenue, with subscribers paying a monthly fee and prescribers' initial visits allegedly required to last under 30 minutes. Done said it strongly disagreed with the charges, which it said were based on events that principally occurred between February 2020 and January 2023. Sources: ${ext(S.fierceDone2024, "Fierce Healthcare, June 2024")}; ${ext(S.cbsDone, "CBS News, June 2024")}.</p>
<p>On November 18, 2025 a federal jury convicted He and Brody; He was also convicted of conspiring to obstruct justice. On July 7, 2026 He was sentenced to 72 months in prison and a $1 million fine, and Brody to 24 months and a $1 million fine. In the sentencing announcement prosecutors said the platform was used to distribute more than 37 million Adderall pills while defrauding insurers of more than $12 million, as reported. Sources: ${ext(S.fierceDoneConv, "Fierce Healthcare, November 2025")}; ${ext(S.fierceDoneSent, "Fierce Healthcare, July 2026")}; ${ext(S.bhbDoneSent, "Behavioral Health Business, July 8, 2026")}.</p>
<h3>What these cases do and do not show</h3>
<p>They show what regulators were reacting to: business models in which the prescription was the product, with targets and short visits that pushed toward yes. They do not show that video evaluation of ADHD is unsafe in itself. Epic Research has reported that ADHD medications were prescribed at similar rates during telehealth and in-person visits. A prescribing rate is not an outcome and the analysis is not a trial, so it does not settle the question either way. Source: ${ext(S.epic, "Epic Research")}. Talkiatry has published data arguing that thousands of its patients could lose care if the pandemic-era rules ended, as reported by ${ext(S.fierceTalkiatryData, "Fierce Healthcare")}; that is company data, presented in a policy argument.</p>
<p>For a patient choosing a service today, the practical lesson is the one in our <a href="/online-therapy/articles/online-psychiatry">online psychiatry guide</a>: a legitimate practice does a real evaluation, follows up, and is willing to say no. A service that markets fast access to a specific controlled drug is showing you its business model.</p>`,
    },
    {
      heading: "How do you tell a careful online prescriber from a risky one?",
      body: `<p>The rules will settle eventually. The question of which service to trust with a controlled prescription does not depend on them. The enforcement record and the published policies of legitimate practices give a usable set of signals. These are our editorial criteria, built from the sources cited.</p>
<table>
<thead><tr><th>Signal</th><th>Careful practice</th><th>Warning sign</th><th>Where it comes from</th></tr></thead>
<tbody>
<tr><td>What is being sold</td><td>An evaluation and ongoing care; medication only if appropriate</td><td>Marketing built around a named controlled drug, or a subscription that is in effect a subscription to the drug</td><td>Done's alleged model of monthly subscriber fees for access to stimulants (${ext(S.fierceDone2024, "Fierce Healthcare")})</td></tr>
<tr><td>Prescribing targets</td><td>None visible; clinicians decide</td><td>Any sign that prescribing rates are a performance goal</td><td>Cerebral's reported targets of a 95% initial-visit prescription rate and nearly 100% for ADHD stimulants (${ext(S.bhbCerebral2024, "Behavioral Health Business")})</td></tr>
<tr><td>Length of the first visit</td><td>A real evaluation, with history, symptoms and options</td><td>A short visit that ends with a prescription by design</td><td>Done's alleged requirement that initial visits last under 30 minutes (${ext(S.fierceDone2024, "Fierce Healthcare")})</td></tr>
<tr><td>Willingness to say no</td><td>States that a prescription is never guaranteed</td><td>Promises or implies a prescription</td><td>Talkiatry's help centre (${ext(S.talkiatryHelp, "Talkiatry")})</td></tr>
<tr><td>Honesty about the law</td><td>Explains state and federal limits up front, including the December 31, 2026 date</td><td>Says nothing about the rules, or says they do not apply</td><td>${ext(S.talkiatryBlog, "Talkiatry blog")}; ${ext(S.talkspaceHelp, "Talkspace help centre")}</td></tr>
<tr><td>Clear scope</td><td>Says what it does not treat or prescribe</td><td>Claims to do everything</td><td>Talkiatry's list of services it does not provide; Talkspace's no-controlled-substances policy</td></tr>
<tr><td>Follow-up</td><td>Scheduled follow-ups to adjust and monitor</td><td>Refills without review</td><td>Our <a href="/online-therapy/articles/online-psychiatry">online psychiatry guide</a></td></tr>
</tbody>
</table>
<h3>What this means for you</h3>
<p>A practice that tells you plainly it may need to see you in person in 2027, or that it does not prescribe a particular drug, is giving you accurate information. That is a reason to trust it more, not less. If you are comparing services, the questions in the clinician section below work as a screening script before you book.</p>`,
    },
    {
      heading: "What counts as an in-person evaluation, and how do you arrange one?",
      body: `<p>The Ryan Haight Act's general rule is one in-person medical evaluation before a controlled prescription by telemedicine. Once that has happened, the Act does not require repeated in-person visits for each prescription. That is the reason an in-person visit before January is useful under every scenario. Source: ${ext(S.foleyWhite, "Foley &amp; Lardner")}.</p>
<h3>Who has to do the evaluation</h3>
<p>The cleanest case is an in-person evaluation by the clinician who prescribes for you. Whether an evaluation by a different clinician counts depends on the pathway. The VA final rule is the one finalised case built on an evaluation by another practitioner: a VA prescriber can rely on an in-person evaluation by a different VA practitioner. Outside the VA, whether your online prescriber can rely on an evaluation by your local primary care doctor depends on how the rules in force in 2027 define it, and we do not know that yet. Ask your prescriber before you book. Source: ${ext(S.vaRule, "VA final rule")}; ${ext(S.aamcVA, "AAMC")}.</p>
<h3>Five ways to arrange one</h3>
<ol>
<li><strong>Ask your current online practice first.</strong> Ask whether it has physical offices or partner clinics, or can arrange a visit when you travel: "If an in-person evaluation is needed in January, can you provide one, where, and how soon?"</li>
<li><strong>Book with a local psychiatrist or psychiatric clinician.</strong> If your online practice cannot see you in person, a local prescriber can evaluate you and either take over prescribing or, if the 2027 rules allow, work alongside your online clinician. Book now rather than in December, in case appointments are scarce at the end of the year.</li>
<li><strong>Ask your primary care doctor.</strong> Ask whether yours prescribes your medication. If yours is willing to take over, that is often the simplest continuity plan, though it means a different prescriber.</li>
<li><strong>Check your insurer's directory for in-network psychiatry.</strong> In-network visits cost less; our guide to <a href="/online-therapy/articles/online-therapy-that-takes-insurance">online therapy that takes insurance</a> explains how to verify coverage, and the same steps apply to in-person psychiatry.</li>
<li><strong>Veterans: ask the VA.</strong> If your prescriber is a VA clinician, an in-person evaluation by any VA practitioner meets the VA rule's condition.</li>
</ol>
<h3>What to bring</h3>
<ul>
<li>A current medication list, with doses, and the date of your last prescription.</li>
<li>Your diagnosis history: when and by whom you were diagnosed, and any rating scales or testing.</li>
<li>Visit notes or a summary from your online prescriber, requested through the practice's portal.</li>
<li>Your pharmacy's name and address.</li>
<li>Questions about what happens next: who prescribes from January, and how refills will work.</li>
</ul>
<h3>What the visit is not</h3>
<p>An in-person evaluation is a medical evaluation, not a rubber stamp. A new clinician may want to reassess the diagnosis or the dose, and that is legitimate care. If you have been well on a medication for years, bring the evidence and say so. Do not stop or change your medication while you wait for an appointment; if you are running short, tell your current prescriber now.</p>`,
    },
    {
      heading: "How do state laws change the picture?",
      body: `<p>The federal rules set what is permitted nationally. States can be stricter, and many regulate controlled prescribing and telehealth through their medical and pharmacy boards. The fourth temporary rule itself makes telemedicine prescribing subject to state law. Source: ${ext(S.fr4, "Federal Register")}.</p>
<h3>What one national practice reports</h3>
<p>Talkiatry's help centre says the answer to whether it can prescribe controlled substances "depends on your state's laws": certain states require an in-person visit before a controlled substance can be prescribed, and as a virtual practice it cannot always meet that requirement. It lists Alabama, Arkansas, Delaware, Hawaii, Louisiana, Minnesota and Rhode Island as states that, in its words, prohibit telehealth prescribing of controlled substances, and says it does not operate in Hawaii. Its anxiety medication page adds that some state laws require an in-person visit for certain prescriptions, including benzodiazepines. These are the company's summaries of state law, not legal advice, and state rules change. Sources: ${ext(S.talkiatryHelp, "Talkiatry help centre")}; ${ext(S.talkiatryBlog, "Talkiatry blog, 2026")}; ${ext(S.talkiatryAnx, "Talkiatry, anxiety medication")}, checked October 31, 2026.</p>
<h3>Three general points that hold everywhere</h3>
<ul>
<li><strong>The rules follow where you are.</strong> Under the 2025 proposal, the state telemedicine registration would be for the state where the patient is located. If you move or spend long periods in another state, check with your prescriber before you go.</li>
<li><strong>Federal permission does not override a stricter state.</strong> Even in scenario A, a state that requires an in-person examination keeps requiring it.</li>
<li><strong>Practices may apply the strictest rule everywhere.</strong> Some multi-state practices choose not to prescribe certain drugs at all, even where it is legal, to keep one policy. The Talkiatry blog notes that many telehealth platforms choose not to prescribe controlled substances.</li>
</ul>
<h3>What this means for you</h3>
<p>If you live in a state with its own in-person requirement, the federal December deadline may change little for you, because your prescriber has already had to meet the state rule. If you live in a state without one, your prescriber has relied on the federal flexibility, and January matters more. Your prescriber's office can tell you which applies; ask the question in those words.</p>`,
    },
    {
      heading: "Does Medicare require in-person visits for telehealth mental health care?",
      body: `<p>Yes, but not yet, and it is a separate rule from the DEA's. Medicare's requirement concerns payment for mental-health telehealth visits, not the legality of controlled prescriptions. It applies to Medicare beneficiaries whatever medication they take, including none.</p>
<h3>The requirement and its current delay</h3>
<p>Under the statute, Medicare requires an in-person, non-telehealth visit within six months before a beneficiary's first mental-health telehealth service, and in-person visits every 12 months after that. Congress has delayed it, most recently in the Consolidated Appropriations Act, 2026. That law, signed on February 3, 2026, extended Medicare's telehealth flexibilities, including the delay of this requirement, through December 31, 2027. The waivers had briefly lapsed at the end of January 2026, and the law covered that gap retroactively. Sources: ${ext(S.cmsFaq, "CMS telehealth FAQ, updated February 4, 2026")}; ${ext(S.hhsMedicare, "HHS, Medicare payment policies")}; ${ext(S.medEcon, "Medical Economics, February 10, 2026")}.</p>
<h3>What happens in 2028</h3>
<p>Unless Congress acts again, the requirement takes effect on January 1, 2028. According to ${ext(S.pya, "PYA's summary")}, a beneficiary who began receiving mental-health services on or before December 31, 2027 would not need the in-person visit within six months, but would still need at least one in-person visit every 12 months. CMS has proposed conforming changes in its calendar-year 2027 physician fee schedule so that the in-person requirement does not apply to services furnished through December 31, 2027; at the time of our sources that was a proposal, not a final rule.</p>
<table>
<thead><tr><th></th><th>DEA controlled-substance rules</th><th>Medicare tele-mental health rule</th></tr></thead>
<tbody>
<tr><td>What it governs</td><td>Whether a controlled prescription can be issued after telemedicine only</td><td>Whether Medicare pays for a mental-health telehealth visit</td></tr>
<tr><td>Who it affects</td><td>Anyone prescribed a controlled substance by telemedicine</td><td>Medicare beneficiaries receiving mental-health care by telehealth</td></tr>
<tr><td>Current status</td><td>Waived through December 31, 2026</td><td>Waived through December 31, 2027</td></tr>
<tr><td>Default if not extended</td><td>One in-person evaluation before a controlled prescription by telemedicine</td><td>In-person visit within six months before the first service, then every 12 months</td></tr>
<tr><td>Source</td><td>${ext(S.fr4, "Federal Register")}</td><td>${ext(S.cmsFaq, "CMS")}; ${ext(S.hhsMedicare, "HHS")}</td></tr>
</tbody>
</table>
<h3>The Medicare clocks, worked through</h3>
<p>Take the rule as CMS and PYA describe it and apply it to two people. The first starts Medicare-billed telehealth mental-health care in March 2027. Because they began before December 31, 2027, under PYA's summary they would not need an in-person visit in the six months before that first service, but from 2028 would need an in-person visit at least every 12 months. The second starts in March 2028. They would need an in-person, non-telehealth visit in the six months before the first telehealth service, then an in-person visit every 12 months after. Both clocks are about Medicare payment; neither decides whether a controlled prescription is lawful. Sources: ${ext(S.cmsFaq, "CMS FAQ")}; ${ext(S.pya, "PYA")}.</p>
<h3>What this means for you</h3>
<p>A Medicare patient on a stimulant through an online prescriber faces both dates: December 31, 2026 for the prescription, December 31, 2027 for payment. An in-person visit in late 2026 helps with the first and, if the 2028 rule arrives as written, the 12-month clock in the second will need its own visit later. A Medicare patient in talk therapy only has nothing to do until 2027, when it is worth checking whether Congress has extended the waiver again.</p>`,
    },
    {
      heading: "How do the online psychiatry providers on our site handle controlled substances?",
      body: `<p>We cover four platforms in the online-therapy vertical: Talkiatry, Talkspace, BetterHelp and Headspace. Only two offer psychiatry, and only one says it prescribes controlled substances. The facts below come from our reviews and from each company's own help pages, labelled as the company's statements.</p>
<h3>Talkiatry</h3>
<p>Talkiatry is a psychiatry-first practice. Care is led by psychiatrists who evaluate, diagnose and manage medication, with therapy available alongside, and it is in-network with many major insurance plans; our <a href="/online-therapy/reviews/talkiatry">Talkiatry review</a> covers the detail. On controlled substances, the company says its psychiatrists can prescribe Adderall and other controlled medications through virtual visits where clinically appropriate and legally permissible, that the answer depends on your state's laws, and that a prescription is never guaranteed. Its June 2026 blog states that under current federal rules, through December 31, 2026, its DEA-registered psychiatrists can prescribe Schedule II-V controlled substances by telehealth without an in-person visit first. Talkiatry also says it does not currently provide treatment for schizophrenia, primary eating disorder treatment, or medication-assisted treatment for substance use disorders, so buprenorphine for opioid use disorder is outside its services. Sources: ${ext(S.talkiatryHelp, "Talkiatry help centre")}; ${ext(S.talkiatryBlog, "Talkiatry blog")}; ${ext(S.talkiatryAdhd, "Talkiatry, ADHD medication")}, checked October 31, 2026.</p>
<p>On October 22, 2026 Talkiatry announced that its therapy services are now available in all 50 states alongside its psychiatric care. Healthcare IT News reported the expansion on October 23, 2026. The company says it directly employs more than 400 full-time therapists and 800 full-time psychiatrists rather than contractors, and that it works with more than 100 insurers; the expansion followed a $210 million Series D financing earlier in 2026, as reported. Sources: ${ext(S.hitnTalkiatry, "Healthcare IT News, October 23, 2026")}; ${ext(S.fierceTalkiatry, "Fierce Healthcare, October 2026")}. Therapy availability nationwide does not change the state-law position on controlled prescriptions described above.</p>
<p>One fact a fair account has to carry: Talkiatry's Trustpilot profile stands at 2.5 across 956 reviews, with clinicians widely praised and billing and administration drawing most complaints, as covered in <a href="/online-therapy/articles/is-talkiatry-legit">is Talkiatry legit</a>. For a patient planning around January, the practical implication is to get answers about in-person options in writing.</p>
<h3>If you are a Talkiatry patient on a controlled medication</h3>
<ol>
<li>Send a portal message asking how Talkiatry will handle your prescription if the flexibilities lapse on December 31, 2026, and keep the reply.</li>
<li>Ask whether your psychiatrist can see you in person, or whether Talkiatry can help arrange an in-person evaluation that would count.</li>
<li>Check your state against the company's own list of states where it says telehealth prescribing of controlled substances is prohibited; if you are in one, your care has already been arranged around that rule.</li>
<li>If you also use Talkiatry's therapy, now available in all 50 states, note that the therapy side is not affected by the DEA date.</li>
</ol>
<h3>Talkspace</h3>
<p>Talkspace offers therapy and psychiatry on one platform, with insurance coverage through many major plans and employee assistance programmes; see our <a href="/online-therapy/reviews/talkspace">Talkspace review</a>. Its help centre is explicit: "for safety and legal reasons", Talkspace does not prescribe controlled substances, naming Adderall, Vyvanse, Ritalin, Concerta, Xanax, Ativan and Klonopin as examples and noting the list is not exhaustive. Its psychiatric providers can prescribe antidepressants, anti-anxiety medications and other non-controlled medications, and no referral is needed. In 2022 a Talkspace executive told Behavioral Health Business the company had never prescribed controlled substances. Sources: ${ext(S.talkspaceHelp, "Talkspace help centre")}; ${ext(S.bhbTalkspace2022, "Behavioral Health Business, June 7, 2022")}.</p>
<p>The consequence for this guide: Talkspace's psychiatry patients are unaffected by the December 31 deadline, because none of them receive controlled prescriptions from Talkspace. That is a deliberate design choice and, for depression and anxiety treated with non-controlled medication, a stable one.</p>
<h3>BetterHelp and Headspace</h3>
<p>BetterHelp is talk therapy only. Its own FAQ says its therapists cannot prescribe medication, and suggests people considering medication see their primary care physician or a psychiatrist; you can continue therapy on BetterHelp while receiving medication elsewhere. Source: ${ext(S.betterhelpFaq, "BetterHelp FAQ")}. Headspace offers a mindfulness app and online therapy that accepts insurance; our coverage does not list psychiatry or prescribing among its services. See our <a href="/online-therapy/reviews/betterhelp">BetterHelp review</a> and <a href="/online-therapy/reviews/headspace">Headspace review</a>.</p>
<table>
<thead><tr><th>Platform</th><th>Prescribes at all?</th><th>Controlled substances?</th><th>Affected by December 31, 2026?</th><th>Source</th></tr></thead>
<tbody>
<tr><td>Talkiatry</td><td>Yes, psychiatrist-led</td><td>Yes, where state law allows and clinically appropriate (company says); not medication-assisted treatment for substance use disorders</td><td>Yes, for patients on controlled medications who have not been evaluated in person</td><td>${ext(S.talkiatryHelp, "Talkiatry")}</td></tr>
<tr><td>Talkspace</td><td>Yes, psychiatry service</td><td>No (company policy)</td><td>No</td><td>${ext(S.talkspaceHelp, "Talkspace")}</td></tr>
<tr><td>BetterHelp</td><td>No</td><td>No</td><td>No</td><td>${ext(S.betterhelpFaq, "BetterHelp")}</td></tr>
<tr><td>Headspace</td><td>Not in our coverage</td><td>Not in our coverage</td><td>Not as a prescriber</td><td>Our review</td></tr>
</tbody>
</table>
<h3>Can therapy-only platforms help if you need a controlled medication?</h3>
<p>They can help, but not by prescribing it. The distinction matters because people sometimes sign up for a therapy platform expecting medication and find out later that the platform does not offer it, or does not offer the drug they need.</p>
<h3>What therapy-only and non-controlled platforms do</h3>
<ul>
<li><strong>Therapy for the condition itself.</strong> Therapy can run alongside medication from another prescriber; our <a href="/online-therapy/articles/online-therapy-for-anxiety">anxiety guide</a> covers the approaches used online for anxiety.</li>
<li><strong>A record of your symptoms.</strong> A therapist's notes can help a prescriber elsewhere understand how you have been doing.</li>
<li><strong>Coordination.</strong> BetterHelp says you can keep therapy on its platform while receiving medication elsewhere. Talkspace's psychiatry can manage non-controlled medication alongside therapy on one platform.</li>
</ul>
<h3>What they do not do</h3>
<ul>
<li>BetterHelp therapists do not prescribe any medication. Source: ${ext(S.betterhelpFaq, "BetterHelp FAQ")}.</li>
<li>Talkspace does not prescribe controlled substances, including stimulants and benzodiazepines. Source: ${ext(S.talkspaceHelp, "Talkspace help centre")}.</li>
<li>Neither is an emergency service. In crisis, call or text 988 in the US.</li>
</ul>
<h3>The sensible combination</h3>
<p>If you need a controlled medication and want online therapy, the arrangement that holds up under every January scenario is a therapy platform for therapy and a prescriber who can see you in person when the rules require it. The difference between the two roles is explained in our guide to <a href="/online-therapy/articles/therapy-vs-psychiatry">therapy vs psychiatry</a>, and the options for getting both online are in <a href="/online-therapy/articles/online-therapy-with-medication">online therapy with medication</a>.</p>
<h3>What a change of prescriber might cost, and how to check</h3>
<p>If January means an in-person visit or a new prescriber, cost is the next question. We do not have verified prices for in-person psychiatry visits, which vary by plan, region and clinician, and we will not guess. What we can give is the verified insurance position of the platforms in our coverage and a method for checking your own costs.</p>
<table>
<thead><tr><th>Platform</th><th>Insurance position (from our reviews)</th><th>What we have not verified</th></tr></thead>
<tbody>
<tr><td>Talkiatry</td><td>In-network with many major insurance plans; built for insured patients and billed through your plan like a specialist visit</td><td>Plan-level costs; run its insurance check</td></tr>
<tr><td>Talkspace</td><td>Covered by many major plans and employee assistance programmes; Talkspace says most insured members pay a $0 copay</td><td>Self-pay rates</td></tr>
<tr><td>BetterHelp</td><td>Now accepts insurance, with copays cited from around $23 per session for covered members; plan-specific. Therapy only</td><td>Self-pay rates, which vary by location</td></tr>
<tr><td>Headspace</td><td>Online therapy that accepts insurance, with a coverage check on its site; HSA/FSA eligible</td><td>App and therapy pricing</td></tr>
</tbody>
</table>
<p>The figures above are the ones in our <a href="/online-therapy/reviews/talkiatry">Talkiatry</a>, <a href="/online-therapy/reviews/talkspace">Talkspace</a>, <a href="/online-therapy/reviews/betterhelp">BetterHelp</a> and <a href="/online-therapy/reviews/headspace">Headspace</a> reviews, with their conditions. They are company statements or plan-dependent figures, not quotes for your plan.</p>
<h3>How to check your own cost before January</h3>
<ol>
<li><strong>Find out whether the in-person clinician is in-network.</strong> Use your insurer's directory, then confirm with the clinician's office.</li>
<li><strong>Ask for the eligibility confirmation in writing.</strong> Our <a href="/online-therapy/articles/is-talkiatry-legit">Talkiatry guide</a> recommends this for any insurance-billed practice: an email you can keep, not a phone reassurance.</li>
<li><strong>Ask how the visit will be billed.</strong> Ask the office what you will owe for the first visit and for follow-ups, before you book.</li>
<li><strong>Check the claim after the visit.</strong> Look in your insurer's portal to confirm it posted. Catching a billing problem after one visit is easier than after five.</li>
<li><strong>Use an employee assistance programme if you have one.</strong> Some employer EAPs include covered therapy sessions; check what yours includes, including whether it covers any prescribing. Our <a href="/online-therapy/articles/online-therapy-that-takes-insurance">insurance guide</a> has the steps.</li>
</ol>`,
    },
    {
      heading: "What should patients do now? A checklist by situation",
      body: `<p>Two months is enough time to protect continuity of care if you start now. Practices will be fielding the same questions in December, and pharmacies will be applying whatever rule is in force on the day you fill. The table sets out what to do by situation, then a general list that applies to everyone on a controlled medication.</p>
<table>
<thead><tr><th>Your situation</th><th>Risk on January 1, 2027</th><th>What to do before December 31</th></tr></thead>
<tbody>
<tr><td>On an ADHD stimulant from an online-only prescriber you have never met in person</td><td>Highest. Under a lapse, new prescriptions by telemedicine would need an in-person evaluation first; under a final rule, it depends on the text</td><td>Ask your prescriber their January plan in writing. Book an in-person evaluation, with them if possible, or with a local clinician who could take over. Request your records</td></tr>
<tr><td>On a benzodiazepine from an online-only prescriber</td><td>Same federal position as stimulants; some states already require in-person visits for benzodiazepines</td><td>As above. Ask whether your state already requires an in-person visit. Do not change your dose on your own</td></tr>
<tr><td>On a controlled medication from a prescriber who has seen you in person</td><td>Low. The Act's in-person evaluation has been met</td><td>Confirm with your prescriber that your earlier visit counts; keep your next appointment</td></tr>
<tr><td>On buprenorphine for opioid use disorder by telemedicine</td><td>Lower. A permanent final rule allows an initial six-month supply by telemedicine</td><td>Ask which pathway your prescriber will use from January and what happens after the initial six months</td></tr>
<tr><td>VA patient with a remote VA prescriber</td><td>Lower, if another VA clinician has evaluated you in person</td><td>Confirm an in-person VA evaluation is on record. Community care contractors outside VA facilities are not covered by the VA rule</td></tr>
<tr><td>Seeking a new ADHD evaluation online now</td><td>Timing risk. A new prescription started in November may need an in-person step in January</td><td>Ask any practice before booking how it will handle January. Consider a practice that can see you in person</td></tr>
<tr><td>On antidepressants or other non-controlled medication only</td><td>None from the DEA rules</td><td>Nothing for January. Keep your follow-ups</td></tr>
<tr><td>Medicare patient in tele-mental health care</td><td>None from Medicare until 2028 under current law; the DEA date still applies to any controlled medication</td><td>Note January 1, 2028; watch for further congressional action in 2027</td></tr>
<tr><td>Therapy-only platform user who thinks medication may help</td><td>None, but the platform cannot prescribe</td><td>Ask your therapist for a referral or see a psychiatric prescriber; see our online psychiatry guide</td></tr>
<tr><td>Moving or spending long periods in another state</td><td>The rules follow where you are</td><td>Tell your prescriber before you move; ask whether they are licensed and registered for the new state</td></tr>
</tbody>
</table>
<h3>The general checklist</h3>
<ol>
<li><strong>Check whether your medication is controlled.</strong> Look it up on the DEA's list or ask your pharmacist. If it is not, the DEA deadline does not apply to you.</li>
<li><strong>Write down when you were last seen in person by your prescriber.</strong> If never, you are the group most affected.</li>
<li><strong>Ask your prescriber's office three questions in writing.</strong> What will you do if the flexibilities lapse? Can you see me in person, and where? If not, will you help me transfer care?</li>
<li><strong>Book any in-person appointment now.</strong> Earlier is better; December capacity is unknown.</li>
<li><strong>Request your records.</strong> Diagnosis, medication history, visit notes. A new prescriber will need them.</li>
<li><strong>Do not stockpile and do not ration.</strong> Take your medication as prescribed. If you are running short, tell your prescriber now rather than stretching doses.</li>
<li><strong>Know your pharmacy's position.</strong> Ask whether it anticipates any change in January for telemedicine-issued controlled prescriptions.</li>
<li><strong>Watch for the notice.</strong> Check the Federal Register and DEA in mid to late December, and read every message your practice sends.</li>
<li><strong>Have a fallback prescriber.</strong> Your primary care doctor may be willing to bridge or take over; ask before you need it.</li>
<li><strong>Keep crisis numbers handy.</strong> If a medication change affects your mood or safety, call or text 988.</li>
</ol>
<h3>The terms you will see in notices, defined</h3>
<p>Practice emails and news reports about the deadline use regulatory language. These are the terms, defined as the sources in this guide use them.</p>
<table>
<thead><tr><th>Term</th><th>What it means here</th><th>Source</th></tr></thead>
<tbody>
<tr><td>Controlled substance</td><td>A medication on the DEA's controlled substances list, sorted into schedules. Stimulants such as Adderall and benzodiazepines such as Xanax are examples named by Talkspace</td><td>${ext(S.talkspaceHelp, "Talkspace")}</td></tr>
<tr><td>Schedule II, Schedule III-V</td><td>The schedules the rules treat differently. The temporary rule covers II-V; the 2025 proposal's ordinary registration covered III-V and reserved II for the Advanced registration</td><td>${ext(S.fr4, "Federal Register")}; ${ext(S.foleySR, "Foley")}</td></tr>
<tr><td>DEA registration</td><td>The registration a clinician needs to prescribe controlled substances at all. The temporary rule applies to DEA-registered practitioners</td><td>${ext(S.fr4, "Federal Register")}</td></tr>
<tr><td>In-person medical evaluation</td><td>The Ryan Haight Act's default condition: at least one before a controlled prescription by telemedicine</td><td>${ext(S.foleyWhite, "Foley")}</td></tr>
<tr><td>Practice of telemedicine exceptions</td><td>The seven situations in the Act in which a prescription after telemedicine is lawful without that evaluation</td><td>${ext(S.foleyWhite, "Foley")}</td></tr>
<tr><td>Special registration</td><td>One of those exceptions, created by the 2008 Act but never put into effect; the 2025 proposal would implement it with three registrations</td><td>${ext(S.foleyWhite, "Foley")}; ${ext(S.srNprm, "Federal Register")}</td></tr>
<tr><td>State telemedicine registration</td><td>In the 2025 proposal, a DEA-issued registration for each state where the clinician's patients are located</td><td>${ext(S.srNprm, "Federal Register")}; ${ext(S.techtargetSR, "TechTarget")}</td></tr>
<tr><td>PDMP</td><td>A state prescription drug monitoring programme, the database of controlled prescriptions. The buprenorphine rule requires a check before prescribing; the 2025 proposal would require checking every state's</td><td>${ext(S.bupRule, "buprenorphine rule")}; ${ext(S.apaSR, "APA")}</td></tr>
<tr><td>Temporary rule or extension</td><td>A time-limited rule keeping the pandemic-era flexibilities. Four have been issued since 2023</td><td>${ext(S.fr4, "Federal Register")}</td></tr>
<tr><td>Final rule</td><td>A rule that has completed rulemaking and has an effective date. The buprenorphine and VA rules are final; the special registration rule is not yet</td><td>${ext(S.dea2025, "DEA")}</td></tr>
<tr><td>OIRA review</td><td>Review of a draft rule by the White House Office of Information and Regulatory Affairs before publication. The special registration rule has been there since August 25, 2026</td><td>${ext(S.mcdOira, "McDermott")}</td></tr>
<tr><td>Audio-only</td><td>A telephone encounter without video, allowed for buprenorphine under its final rule</td><td>${ext(S.bupRule, "buprenorphine rule")}</td></tr>
</tbody>
</table>
<p>If a notice from your practice uses a term not in this list, ask the practice to explain it in writing. A practice that can explain its own notice clearly is more likely to handle the change well.</p>`,
    },
    {
      heading: "Who this guide is for, and who it isn't for",
      body: `<h3>It is for</h3>
<ul>
<li>Adults, and parents of children, who receive an ADHD stimulant from a telehealth prescriber and want to know whether January 2027 affects them.</li>
<li>People prescribed a benzodiazepine by an online clinician.</li>
<li>People treated for opioid use disorder by telemedicine who want to understand the buprenorphine rule.</li>
<li>Veterans with remote VA prescribers.</li>
<li>Anyone choosing an online psychiatry service now and wanting to understand what it can and cannot prescribe.</li>
<li>Medicare beneficiaries using tele-mental health who want to separate the Medicare date from the DEA date.</li>
</ul>
<h3>It isn't for</h3>
<ul>
<li>Clinicians and practice managers looking for compliance advice. The law-firm analyses in our references are written for you; this page is written for patients.</li>
<li>Anyone looking for a way to obtain a controlled medication without an evaluation. The rules exist for a reason, and we will not help with that.</li>
<li>Anyone in crisis. Call or text 988, or go to the nearest emergency department.</li>
<li>Readers outside the United States. These are US federal rules.</li>
</ul>
<p>If your treatment is talk therapy or non-controlled medication, most of this guide is background. The parts that might still matter are the Medicare section and the provider section.</p>`,
    },
    {
      heading: "What questions should you ask your prescriber before January?",
      body: `<p>Use this as a script for a portal message or the next appointment. Written answers are better than phone reassurance, because you may need to show a new clinician or a pharmacist what was agreed.</p>
<h3>About January</h3>
<ol>
<li>Is my medication a controlled substance, and which schedule is it?</li>
<li>What is your plan for my prescriptions if the temporary flexibilities lapse on December 31, 2026?</li>
<li>If a final special registration rule is published, will you register, and how long might that take?</li>
<li>Does my state already require an in-person visit for this medication?</li>
<li>Have I had an in-person evaluation that counts? If not, can you provide one, where and when?</li>
</ol>
<h3>About continuity</h3>
<ol>
<li>If you cannot keep prescribing, will you help me transfer to a local prescriber, and send my records?</li>
<li>If I need a bridge prescription while I wait for an in-person appointment, what is your policy?</li>
<li>Who do I contact if a pharmacy questions my prescription in January?</li>
</ol>
<h3>About the medication itself</h3>
<ol>
<li>Is a non-controlled alternative appropriate for me, or is my current medication the right one to keep?</li>
<li>If my medication changes, what should I watch for, and when should I call?</li>
</ol>
<p>Two rules for the conversation. Do not let the regulatory question push a clinical decision; if your medication works, the goal is to keep it lawfully, not to switch to avoid paperwork. And do not change your dose yourself, whatever you hear about the deadline. Your prescriber decides doses.</p>`,
    },
    {
      heading: "What we don't know yet",
      body: `<p>This guide is accurate to the sources we could check on October 31, 2026. Several important things are unknown, and we say so rather than guess.</p>
<ul>
<li><strong>The final rule's text.</strong> The draft final special registration rule has been under review since August 25, 2026, and its text is not public. Whether the Schedule II same-state requirement, the 50% cap, the platform registration or the nationwide PDMP check survived is unknown. Source: ${ext(S.mcdOira, "McDermott")}.</li>
<li><strong>The timing.</strong> The regulatory agenda target of November 2026 is a target. A rule can be published later, or published with a later effective date.</li>
<li><strong>Whether there will be a fifth extension.</strong> No extension has been announced. Past extensions have come late, but that pattern does not tell us whether another will come.</li>
<li><strong>Transition for existing patients.</strong> The 2023 rule gave a year's grace to existing telehealth relationships. Nothing we found says the next step will.</li>
<li><strong>How pharmacies will respond.</strong> We found no published guidance on how pharmacy chains will treat telemedicine-issued controlled prescriptions in January.</li>
<li><strong>The buprenorphine rule after six months.</strong> Published summaries describe the requirement for continuing prescriptions after the initial six-month supply differently. Ask your prescriber.</li>
<li><strong>State changes.</strong> States update their telehealth rules on their own timetables. The state list in this guide is one company's summary.</li>
<li><strong>The evidence on telehealth stimulant prescribing.</strong> The data we found is observational. There is no randomised trial comparing outcomes for ADHD patients evaluated by video with those evaluated in person in our sources.</li>
</ul>
<p>We will update this page when the Federal Register publishes a fifth extension or a final rule.</p>`,
    },
    {
      heading: "Final verdict and next steps",
      body: `<p>The rule that has let online clinicians prescribe controlled medications without ever meeting the patient runs out on December 31, 2026. A permanent replacement exists in draft and has been under White House review since August; nobody outside government knows what it says. If neither it nor another extension arrives in time, the 2008 default of an in-person evaluation comes back on January 1, 2027. Buprenorphine for opioid use disorder and VA care have their own permanent rules and are better protected. Antidepressants and other non-controlled medications are not affected at all.</p>
<p>The one step that helps in every scenario is an in-person evaluation by your prescriber, or a clear plan with a prescriber who can see you. If you are on a stimulant or a benzodiazepine prescribed entirely online, ask your prescriber this week what happens in January, book any in-person visit now, and get your records. If you are choosing a service now, ask before you book how it will handle January.</p>
<h3>Next steps by reader</h3>
<ul>
<li><strong>On a stimulant or benzodiazepine, prescribed online only:</strong> message your prescriber this week, book an in-person evaluation, request your records, and identify a fallback prescriber.</li>
<li><strong>On a controlled medication from a prescriber who has seen you in person:</strong> confirm that visit counts and keep your follow-ups.</li>
<li><strong>On buprenorphine by telemedicine:</strong> ask which pathway applies from January and what happens after the initial six months.</li>
<li><strong>A veteran:</strong> confirm a VA clinician has evaluated you in person, and check whether your prescriber is a VA employee or a community care contractor.</li>
<li><strong>On non-controlled medication:</strong> nothing to do for January. If you are on Medicare, note January 1, 2028.</li>
<li><strong>Choosing a new service:</strong> ask how it will handle January before you book, and use the red-flag table above.</li>
<li><strong>In therapy only:</strong> nothing changes. If you think medication might help, see our guide to <a href="/online-therapy/articles/online-psychiatry">online psychiatry</a>.</li>
</ul>
<h3>Where to go next on Treatments Hub</h3>
<ul>
<li><a href="/online-therapy/articles/online-psychiatry">Online psychiatry: how it works and how to pick a legitimate service</a></li>
<li><a href="/online-therapy/articles/online-therapy-with-medication">Online therapy with medication</a></li>
<li><a href="/online-therapy/articles/therapy-vs-psychiatry">Therapist vs psychiatrist: who does what</a></li>
<li><a href="/online-therapy/articles/is-talkiatry-legit">Is Talkiatry legit?</a> and the <a href="/online-therapy/talkspace-vs-talkiatry">Talkspace vs Talkiatry comparison</a></li>
<li><a href="/online-therapy/articles/online-therapy-that-takes-insurance">Online therapy that takes insurance</a></li>
<li><a href="/online-therapy/articles/online-therapy-for-anxiety">Online therapy for anxiety</a> and <a href="/online-therapy/articles/online-therapy-for-depression">online therapy for depression</a></li>
<li><a href="/online-therapy">Compare the online therapy and psychiatry platforms we cover</a></li>
</ul>
<p>This guide is general information, not medical or legal advice. If you are in crisis, call or text 988 in the US, free and open 24/7.</p>`,
    },
    {
      heading: "References",
      body: `<ol>
<li>${ext(S.fr4, "Fourth Temporary Extension of COVID-19 Telemedicine Flexibilities for Prescription of Controlled Medications")}. DEA and HHS, Federal Register, December 31, 2025.</li>
<li>${ext(S.dea2025, "DEA Extends Telemedicine Flexibilities to Ensure Continued Access to Care")}. Drug Enforcement Administration, press release, December 31, 2025.</li>
<li>${ext(S.hk2026, "DEA and HHS Extend Telemedicine Prescribing Flexibilities Through 2026")}. Holland &amp; Knight, January 13, 2026.</li>
<li>${ext(S.fierce4, "DEA issues 4th extension of telehealth controlled substance flexibilities as debate enters 6th year")}. Fierce Healthcare, December 2025.</li>
<li>${ext(S.mcd2026, "DEA extends telemedicine flexibilities for controlled substance prescribing for 2026")}. McDermott Will &amp; Emery, December 30, 2025.</li>
<li>${ext(S.ncpa, "Telemedicine controlled substance prescribing flexibilities extended")}. National Community Pharmacists Association, January 6, 2026.</li>
<li>${ext(S.connect, "DEA Prescribing of Controlled Substances")}. Alliance for Connected Care, accessed October 31, 2026.</li>
<li>${ext(S.klgates2023, "DEA Temporarily Extends COVID-19 Flexibilities for Controlled Substance Prescriptions via Telemedicine")}. K&amp;L Gates, May 11, 2023.</li>
<li>${ext(S.policymed2023, "DEA Announces Extension of Telemedicine Flexibilities, Despite PHE Ending")}. PolicyMed, May 2023.</li>
<li>${ext(S.dea2023, "DEA and HHS Extend Telemedicine Flexibilities through 2024")}. Drug Enforcement Administration, October 6, 2023.</li>
<li>${ext(S.foley2023, "DEA Extends Telemedicine Flexibilities for Prescribing of Controlled Medications: Second Time is the Charm")}. Foley &amp; Lardner, October 2023.</li>
<li>${ext(S.dea2024, "DEA and HHS Extend Telemedicine Flexibilities through 2025")}. Drug Enforcement Administration, November 15, 2024.</li>
<li>${ext(S.foley2024, "New DEA Rule Extends Controlled Substance Telemedicine Prescribing Flexibilities One More Year")}. Foley &amp; Lardner, November 2024.</li>
<li>${ext(S.foleyWhite, "DEA Special Registration Rule: Ryan Haight Act white paper")}. Foley &amp; Lardner, March 2023.</li>
<li>${ext(S.dinsmore, "SUPPORT Act Expands Telehealth Treatment for Substance Use Disorders")}. Dinsmore &amp; Shohl.</li>
<li>${ext(S.srNprm, "Special Registrations for Telemedicine and Limited State Telemedicine Registrations (proposed rule)")}. DEA, Federal Register, January 17, 2025.</li>
<li>${ext(S.apaSR, "DEA Special Registration for Telemedicine")}. American Psychiatric Association, 2025.</li>
<li>${ext(S.techtargetSR, "What DEA's special registrations mean for telehealth prescribing")}. TechTarget, 2025.</li>
<li>${ext(S.foleySR, "DEA Unveils Long-Overdue Special Registration for Telemedicine in Proposed Rule")}. Foley &amp; Lardner, January 2025.</li>
<li>${ext(S.ahaSR, "AHA Comments on DEA Proposed Rule on Special Registrations for Telemedicine Prescribing")}. American Hospital Association, March 18, 2025.</li>
<li>${ext(S.nrha, "Comments on the Special Registration proposed rule")}. National Rural Health Association, March 12, 2025.</li>
<li>${ext(S.cta, "Comments on DEA special registration")}. Consumer Technology Association, 2025.</li>
<li>${ext(S.mcdOira, "DEA appears close to finalizing telemedicine special registration")}. McDermott Will &amp; Emery, September 18, 2026.</li>
<li>${ext(S.frierOira, "DEA Telemedicine Special Registration Final Rule Sent to OIRA")}. Frier Levitt, 2026.</li>
<li>${ext(S.hitnSR, "DEA seeks to finalize framework for e-prescribing of controlled substances")}. Healthcare IT News.</li>
<li>${ext(S.bupRule, "Expansion of Buprenorphine Treatment via Telemedicine Encounter (final rule)")}. DEA and HHS, Federal Register, January 17, 2025.</li>
<li>${ext(S.vaRule, "Continuity of Care via Telemedicine for Veterans Affairs Patients (final rule)")}. DEA and HHS, Federal Register, January 17, 2025.</li>
<li>${ext(S.aamcVA, "DEA Allows VA Practitioners to Prescribe Controlled Substances via Telemedicine")}. Association of American Medical Colleges, January 2025.</li>
<li>${ext(S.ahaDelay, "DEA, HHS delay implementation of buprenorphine final rule until Dec. 31")}. American Hospital Association, March 21, 2025.</li>
<li>${ext(S.natlawBup, "DEA Tightens Buprenorphine Telemedicine Prescribing Rules")}. National Law Review, 2025.</li>
<li>${ext(S.benesch, "New Final Rules for Telemedicine Prescribing: What SUD Treatment Providers Need to Know")}. Benesch, 2025.</li>
<li>${ext(S.hhsMedicare, "Medicare payment policies")}. HHS, telehealth.hhs.gov, accessed October 31, 2026.</li>
<li>${ext(S.cmsFaq, "Telehealth FAQ, updated February 4, 2026")}. Centers for Medicare &amp; Medicaid Services.</li>
<li>${ext(S.pya, "Medicare Extends Telehealth Coverage Through 2027: Updates and Reminders for Providers")}. PYA, 2026.</li>
<li>${ext(S.medEcon, "What changed in Medicare telehealth under the 2026 spending bill")}. Medical Economics, February 10, 2026.</li>
<li>${ext(S.fortuneCerebral, "Cerebral receives grand jury subpoena from US Attorney")}. Fortune, May 7, 2022.</li>
<li>${ext(S.additude, "Cerebral stops new ADHD medication prescriptions")}. ADDitude, May 2022.</li>
<li>${ext(S.bhbCerebral2022, "Cerebral halts controlled substance prescribing, prepares for end of COVID-era regs")}. Behavioral Health Business, May 17, 2022.</li>
<li>${ext(S.bhbCerebral2024, "Cerebral hit with $6.6M penalty in settlement with prosecutors")}. Behavioral Health Business, November 5, 2024.</li>
<li>${ext(S.hitCerebral, "Cerebral Inc. agrees to $3.6M settlement over unauthorized distribution of controlled substances")}. HIT Consultant, November 4, 2024.</li>
<li>${ext(S.fierceDone2024, "Digital health company Done indicted on alleged $100M illegal Adderall distribution scheme")}. Fierce Healthcare, June 2024.</li>
<li>${ext(S.cbsDone, "Report on charges against Done Global's founder")}. CBS News, June 2024.</li>
<li>${ext(S.fierceDoneConv, "Founder of telehealth startup Done convicted in Adderall fraud scheme")}. Fierce Healthcare, November 2025.</li>
<li>${ext(S.fierceDoneSent, "Founder of telehealth startup Done sentenced to six years in prison for Adderall fraud scheme")}. Fierce Healthcare, July 2026.</li>
<li>${ext(S.bhbDoneSent, "Done Global CEO gets 6 years in prison for Adderall distribution fraud")}. Behavioral Health Business, July 8, 2026.</li>
<li>${ext(S.epic, "ADHD medications prescribed at similar rates during telehealth and in-person visits")}. Epic Research.</li>
<li>${ext(S.fierceTalkiatryData, "Thousands of patients could lose mental health services if pandemic-era rules end, Talkiatry data show")}. Fierce Healthcare.</li>
<li>${ext(S.hitnTalkiatry, "Telemental health roundup: Talkiatry expands nationwide")}. Healthcare IT News, October 23, 2026.</li>
<li>${ext(S.fierceTalkiatry, "Talkiatry takes therapy nationwide as it builds out behavioral health platform")}. Fierce Healthcare, October 2026.</li>
<li>${ext(S.talkiatryHelp, "Can Talkiatry prescribe controlled substances?")}. Talkiatry help centre, accessed October 31, 2026.</li>
<li>${ext(S.talkiatryBlog, "What Can a Psychiatrist Prescribe Online vs. In Person?")}. Talkiatry, 2026.</li>
<li>${ext(S.talkiatryMeds, "Online Medication Management With a Psychiatrist")}. Talkiatry, accessed October 31, 2026.</li>
<li>${ext(S.talkiatryAnx, "Telehealth for Anxiety Medication")}. Talkiatry, accessed October 31, 2026.</li>
<li>${ext(S.talkiatryAdhd, "ADHD medication")}. Talkiatry, accessed October 31, 2026.</li>
<li>${ext(S.talkspaceHelp, "Help centre article on medications and controlled substances")}. Talkspace help centre, accessed October 31, 2026.</li>
<li>${ext(S.bhbTalkspace2022, "Talkspace CFO: Cerebral's controlled substances pivot could create more daylight in virtual mental health market")}. Behavioral Health Business, June 7, 2022.</li>
<li>${ext(S.betterhelpFaq, "BetterHelp Customer Service: Quick Answers To Your Questions")}. BetterHelp, accessed October 31, 2026.</li>
</ol>`,
    },
  ],
};
