import type { ArticleData } from "../../config";

// ───── Online therapy and psychiatry: the complete guide (Nov 9, 2026) ─────
// Pillar hub for the online-therapy vertical. It links every narrower page
// (legitimacy, insurance, Medicare, cost, free options, CBT, therapy vs
// psychiatry, medication, DEA rules, chatbots) and answers the broad
// questions none of them owns: how online care works, whether it works,
// formats, clinician types, who it isn't for, how to vet a platform,
// privacy, payment routes, choosing and switching a therapist, session one.
//
// Sourcing. Evidence and public-health facts link pages read on Nov 9, 2026:
// NIMH (telemental health fact sheet, psychotherapies, find help, technology
// and apps, tips for talking with a provider), SAMHSA (988 and the National
// Helpline), the NHS CBT overview, MedlinePlus (telehealth; types of health
// care providers), Medicare.gov (telehealth; outpatient mental health), the
// CMS MHPAEA page, and five open-access papers on PMC (Andersson 2014,
// Hull 2020, Thomas 2021, Greenwood 2022, Song 2023). Facts reused from
// existing articles keep those articles' links and dates: the 2026 Part B
// deductible and the 2028 in-person rule (Medicare article, Nov 6, 2026),
// the FTC BetterHelp settlement and refunds (is-betterhelp-legit, Nov 8,
// 2026; ftc.gov was not reachable from our fetcher), platform Medicare
// policies (Nov 6-8, 2026), controlled-substance policies and Talkiatry's
// October 2026 expansion (DEA guide, Oct 31, 2026), NAMI, HRSA and Open
// Path (free and low-cost guide, Nov 8, 2026).
//
// Provider facts come only from the vertical seed (reviews dated Aug 28,
// 2026) and those dated articles. No Trustpilot content, no Reddit quotes,
// no rank numbers (the live order can be changed in the CMS). The only price
// quoted is BetterHelp's stored "copays cited from around $23/session"
// (Aug 28, 2026), always labelled as plan-specific. Not medically reviewed;
// no diagnostic or medication instructions.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  // Read Nov 9, 2026
  nimhTele: "https://www.nimh.nih.gov/health/publications/what-is-telemental-health",
  nimhPsy: "https://www.nimh.nih.gov/health/topics/psychotherapies",
  nimhHelp: "https://www.nimh.nih.gov/health/find-help",
  nimhTech: "https://www.nimh.nih.gov/health/topics/technology-and-the-future-of-mental-health-treatment",
  nimhTips: "https://www.nimh.nih.gov/health/publications/tips-for-talking-with-your-health-care-provider",
  samhsa988: "https://www.samhsa.gov/mental-health/988",
  samhsaHelpline: "https://www.samhsa.gov/find-help/helplines/national-helpline",
  nhsCbt: "https://www.nhs.uk/mental-health/talking-therapies-medicine-treatments/talking-therapies-and-counselling/cognitive-behavioural-therapy-cbt/overview/",
  medlineTele: "https://medlineplus.gov/telehealth.html",
  medlineProviders: "https://medlineplus.gov/ency/article/001933.htm",
  medicareTelehealth: "https://www.medicare.gov/coverage/telehealth",
  medicareMentalHealth: "https://www.medicare.gov/coverage/mental-health-care-outpatient",
  cmsParity: "https://www.cms.gov/marketplace/private-health-insurance/mental-health-parity-addiction-equity",
  andersson: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4219070/",
  hull: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7291694/",
  thomas: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8451850/",
  greenwood: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8956990/",
  song: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10365600/",
  // Reused from existing articles, with their check dates
  cms2026: "https://www.cms.gov/newsroom/fact-sheets/2026-medicare-parts-b-premiums-deductibles",
  cmsFaq: "https://www.cms.gov/files/document/telehealth-faq-updated-10-09-2026.pdf",
  ftcRefunds: "https://www.ftc.gov/news-events/news/press-releases/2024/05/betterhelp-customers-will-begin-receiving-notices-about-refunds-related-2023-privacy-settlement-ftc",
  betterhelpIns: "https://www.betterhelp.com/insurance2026",
  betterhelpFaq: "https://www.betterhelp.com/advice/general/betterhelp-customer-service-quick-answers-to-your-questions/",
  talkspaceMedicare: "https://www.talkspace.com/coverage/insurance/medicare",
  talkspaceHelp: "https://help.talkspace.com/hc/en-us/articles/45996987833115",
  talkiatryMedicare: "https://www.talkiatry.com/help-center-articles/do-you-take-medicare-or-medicaid",
  talkiatryHelp: "https://www.talkiatry.com/help-center-articles/can-talkiatry-prescribe-controlled-substances",
  hitnTalkiatry: "https://www.healthcareitnews.com/news/telemental-health-roundup-talkiatry-expands-nationwide",
  headspaceMedicare: "https://help.headspace.com/hc/en-us/articles/37974782380827",
  nami: "https://www.nami.org/support-education/nami-helpline/",
  hrsa: "https://findahealthcenter.hrsa.gov/",
  openPath: "https://openpathcollective.org/",
};

export const OT_ONLINE_THERAPY_PSYCHIATRY_GUIDE: ArticleData = {
  slug: "online-therapy-psychiatry-guide",
  title: "Online Therapy & Psychiatry: The Complete 2026 Guide",
  description:
    "How online therapy and online psychiatry work in 2026: the evidence, formats, costs, insurance, free options and privacy, plus how the main platforms differ.",
  category: "Guide",
  readTime: "56 min read",
  publishedAt: "2026-11-09",
  updatedAt: "2026-11-09",
  heroColor: "#EEF2F7",
  author: "Treatments Hub Research Team",
  keyTakeaways: [
    "Online therapy works for many people: a 2014 meta-analysis of 13 trials (1,053 people) found guided internet CBT and face-to-face CBT produced equivalent overall effects, and NIMH says virtual care can be effective for anxiety, ADHD, bipolar disorder, depression and PTSD.",
    "Therapy and psychiatry are different jobs. Therapists provide talk therapy; psychiatrists and psychiatric nurse practitioners can prescribe. BetterHelp is therapy only, Talkspace offers both, and Talkiatry is psychiatrist-led.",
    "Check coverage before paying cash. Medicare covers therapy by video from home through December 31, 2027, employer EAPs are free, and federal parity law limits how plans that cover mental health can restrict it.",
    "Online therapy is not an emergency service. In the US, call or text 988 (veterans press 1) for a crisis, or call 911 if anyone is in immediate danger.",
  ],
  sections: [
    {
      heading: "What is online therapy, and how does it work?",
      body: `<div class="qa"><strong>The short answer</strong>Online therapy is talk therapy with a licensed mental health professional, delivered by video, phone, live chat or messaging instead of in an office. Online psychiatry is the medication side of the same care: a psychiatrist or psychiatric nurse practitioner evaluates you by video and, where appropriate, prescribes and manages medication. The National Institute of Mental Health (NIMH) says virtual care can be effective for anxiety, ADHD, bipolar disorder, depression and PTSD. Start by deciding whether you need therapy, psychiatry or both, then check what your insurance or employer covers before paying out of pocket. Online therapy is not an emergency service: in the US, call or text 988, or call 911 if you're in danger.</div>
<p><strong>If you need help right now:</strong> call or text <strong>988</strong>, the Suicide and Crisis Lifeline, which offers free, confidential support 24 hours a day, or chat at 988lifeline.org. Veterans and the people who support them can dial 988 and press 1 for the Veterans Crisis Line. If you or someone else is in immediate danger, call 911 or go to the nearest emergency room. Those instructions come straight from ${ext(S.nimhHelp, "NIMH's Help for Mental Illnesses page")}, checked November 9, 2026. No app, platform or chatbot in this guide replaces them.</p>
<p>For everyone else, here is the plain picture. A few years ago, seeing a therapist online felt like a workaround. In 2026 it's simply one of the normal ways people get mental health care. According to ${ext(S.nimhTele, "NIMH's fact sheet on getting mental health support virtually")}, many online platforms let patients and providers communicate through video calls, phone calls, text messaging or email, and depending on your insurance and the type of provider, you may be able to get a mental health assessment, a diagnosis and treatment plan, individual, group or family therapy, a prescription for medication, and regular check-ins, all without leaving home.</p>
<h3>How a typical online therapy service works</h3>
<ol>
<li><strong>You sign up and answer an intake questionnaire.</strong> It asks what's bringing you in, what you've tried before, and practical things like your state, your schedule and whether you have insurance.</li>
<li><strong>You're matched with a clinician, or you choose one.</strong> Subscription platforms such as <a href="/online-therapy/reviews/betterhelp">BetterHelp</a> and <a href="/online-therapy/reviews/talkspace">Talkspace</a> match you based on your answers. Insurance-first practices such as <a href="/online-therapy/reviews/talkiatry">Talkiatry</a> confirm your coverage and then book you with a psychiatrist.</li>
<li><strong>You meet, usually weekly for therapy.</strong> Sessions happen by video, phone or live chat. Many platforms also let you message your therapist between sessions.</li>
<li><strong>You pay through insurance, a subscription or per visit.</strong> The model varies a lot between services, which is why this guide has a whole section on payment routes.</li>
<li><strong>You can switch or stop.</strong> Good services make it easy to change therapists if the fit isn't right.</li>
</ol>
<p>This guide is the hub for everything we've written about online mental health care. It covers how the care works, what the research says, the different formats, the clinicians you might see, who online care isn't right for, how to tell a legitimate platform from a risky one, privacy, every way to pay for it (including free routes), how to choose and switch a therapist, and what to expect in your first session. Where a question deserves its own page, we link to it. If you'd rather jump straight to the platforms, our <a href="/online-therapy">online therapy comparison</a> lays them side by side.</p>`,
    },
    {
      heading: "How did we research this guide?",
      body: `<p>Treatments Hub is a comparison site, not a healthcare provider. This guide hasn't yet been through our medical-accuracy review. What we can do is read the primary sources carefully, keep them separate from company marketing, and tell you exactly where each fact comes from. Here's how this page was put together.</p>
<ul>
<li><strong>Public health and evidence facts</strong> link to the page we read, with the date we read it. For this guide that means the National Institute of Mental Health, SAMHSA, MedlinePlus (from the National Library of Medicine), Medicare.gov, the Centers for Medicare and Medicaid Services, the NHS, and peer-reviewed studies that are free to read on PubMed Central. Everything in that group was checked on November 9, 2026, unless a different date is given.</li>
<li><strong>Platform facts</strong> come from our own reviews of <a href="/online-therapy/reviews/betterhelp">BetterHelp</a>, <a href="/online-therapy/reviews/talkspace">Talkspace</a>, <a href="/online-therapy/reviews/headspace">Headspace</a> and <a href="/online-therapy/reviews/talkiatry">Talkiatry</a>, last updated August 28, 2026, and from the companies' own help pages, which we label as the company's statements and date.</li>
<li><strong>Prices</strong> are quoted only where we've stored a figure, with its date and its conditions. Online therapy prices change often and depend on your plan and location, so for most services we tell you how to get your own number instead of printing one.</li>
<li><strong>Things we leave out:</strong> star ratings, customer-review quotes and anything we couldn't trace to a readable source. If a fact didn't survive that test, it isn't here.</li>
</ul>
<p>We compare platforms on the things that decide whether care actually works for a person: whether the clinicians are licensed, whether the service offers therapy, psychiatry or both, how sessions work, how insurance and payment work, privacy, and how easy it is to switch or cancel. The <a href="/online-therapy">online therapy comparison page</a> summarizes that approach next to each platform. We describe each service by what it's best for rather than by a position in a list, because the right platform for one person is the wrong one for the next.</p>
<p>One more promise: we don't publish outcome claims that the sources don't make. Where research is early, small or run by a company with a stake in the result, we say so. Online therapy has real evidence behind it, and it doesn't need to be oversold.</p>`,
    },
    {
      heading: "Does online therapy actually work?",
      body: `<p>Yes, for many people and many of the problems people most often seek help for. That's the consistent message from public health agencies and from the research that directly compares online and in-person care. The fair version of the answer comes with limits, and they're worth knowing before you start.</p>
<h3>What NIMH says</h3>
<p>The National Institute of Mental Health puts it simply: ${ext(S.nimhTele, "virtual care can be effective")} for treating mental illnesses like anxiety, attention-deficit/hyperactivity disorder (ADHD), bipolar disorder, depression and post-traumatic stress disorder (PTSD). The same NIMH fact sheet lists the benefits as convenience (no travel), flexibility (appointments often available with less notice and at more flexible hours), accessibility (for people who can't drive or live in remote areas) and comfort (it may feel less intimidating than walking into an office).</p>
<h3>What head-to-head studies show</h3>
<p>The strongest evidence comes from trials that randomly assigned people to online or in-person versions of the same therapy. Three reviews stand out:</p>
<ul>
<li><strong>Guided internet CBT vs face-to-face CBT (2014).</strong> A systematic review and meta-analysis by Gerhard Andersson and colleagues in ${ext(S.andersson, "World Psychiatry (October 2014)")} pooled 13 randomized trials with 1,053 participants, covering social anxiety, panic disorder, depressive symptoms and several other conditions. Guided internet-delivered CBT and face-to-face CBT "produce equivalent overall effects", with a pooled effect size close to zero. The authors added an honest caveat: there were still few studies for each condition, and more research was needed to establish equivalence.</li>
<li><strong>Therapy by video (2021).</strong> A review of the evidence on videoconferencing therapy for adults, published in ${ext(S.thomas, "Psychology and Psychotherapy (2021)")}, concluded that video has an established evidence base for cognitive behavioral therapies for PTSD and depression, with prolonged exposure, cognitive processing therapy and behavioral activation found to be no less effective than in-person delivery. Clients rated the therapeutic alliance and their satisfaction similarly to in-person therapy, though therapists found non-verbal cues harder to judge.</li>
<li><strong>Telehealth for less common conditions (2022).</strong> A systematic review and meta-analysis in ${ext(S.greenwood, "JMIR Mental Health (March 2022)")} looked at 12 randomized trials (931 patients) of therapy by video or phone for conditions including addiction, eating disorders and childhood mental health problems. It found no significant difference in symptom severity between telehealth and face-to-face therapy right after treatment or at later follow-ups.</li>
</ul>
<h3>Where the evidence is thinner</h3>
<p>The same papers mark the edges. The 2022 review found no includable trials for some serious conditions, such as schizophrenia and bipolar disorder, and called for more high-quality research on them. The 2021 video review noted that use in severe and complex mental health problems had yet to be studied. And most comparisons test structured therapies like CBT delivered by trained clinicians; they don't tell you that every app or every platform works equally well.</p>
<p>There's also a point that research and common sense agree on: the format matters less than whether you keep showing up and whether you work well with your therapist. NIMH's own guidance on ${ext(S.nimhPsy, "choosing a therapist")} says rapport and trust are essential. Our shorter explainer, <a href="/online-therapy/articles/does-online-therapy-work">does online therapy work</a>, goes further into the format question, and <a href="/online-therapy/articles/online-therapy-vs-in-person">online therapy vs in-person</a> covers when an office is still the better choice.</p>`,
    },
    {
      heading: "What is online CBT, and why do so many platforms use it?",
      body: `<p>Cognitive behavioral therapy (CBT) is a structured, practical form of talk therapy that helps you notice unhelpful patterns of thinking and behavior and change them. It's the approach most online platforms are built around, and it's the one with the most research behind its online versions.</p>
<h3>A plain definition</h3>
<p>NIMH describes CBT as helping a person ${ext(S.nimhPsy, "become aware of automatic ways of thinking that are inaccurate or harmful")}, for example having a low opinion of their own abilities, then question those thoughts, understand how they affect emotions and behavior, and change self-defeating behavior patterns. NIMH also describes exposure therapy, a type of CBT for anxiety disorders, in which a person spends brief periods in a supportive environment learning to tolerate the distress caused by certain things, ideas or imagined scenes until the fear goes down over time.</p>
<p>The ${ext(S.nhsCbt, "NHS overview of CBT")} (last reviewed March 28, 2025) calls it a recommended treatment for many mental health problems, including depression, anxiety (including social anxiety, phobias and OCD), PTSD, eating disorders, bipolar disorder and personality disorders, and says it can also help with sleep problems such as insomnia. In a typical session you talk about situations you find difficult and how they make you think, feel and act, then work with your therapist on different ways of approaching them.</p>
<h3>Why it suits online care</h3>
<ul>
<li><strong>It's structured.</strong> Sessions have an agenda and goals, which translate cleanly to a video call.</li>
<li><strong>It involves practice between sessions.</strong> The NHS says you'll usually be asked to practise what you've learned between sessions, and that it's important to do this for CBT to work; you may record progress in a worksheet or diary. A worksheet in an app or a message to your therapist fits that perfectly.</li>
<li><strong>It's often time-limited.</strong> The NHS says you'll usually have between 5 and 15 sessions of CBT, depending on what it's for. That fits the way many people use online therapy: a focused stretch of work on a specific problem.</li>
<li><strong>It has been tested online.</strong> NIMH's page on ${ext(S.nimhTech, "technology and mental health treatment")} states that research has shown internet-based CBT is as effective as conventional CBT for disorders that include depression, anxiety, social anxiety disorder and panic disorder.</li>
</ul>
<h3>Online CBT comes in three shapes</h3>
<p>The NHS lists three ways to have CBT: <strong>guided self-help</strong> (a workbook or online course with a therapist's help), <strong>one-to-one sessions</strong> with a therapist, and <strong>group</strong> sessions, all of which can be done in person, online or by phone. Online platforms in the US mostly offer the second, often with worksheets and messaging that borrow from the first. Self-guided CBT apps without a therapist are a different product, covered later in this guide.</p>
<p>CBT isn't the only option. Dialectical behavior therapy (DBT), acceptance and commitment therapy (ACT), psychodynamic therapy and others each have their place, and NIMH notes that therapists may use one approach or combine elements from several. Our guide to <a href="/online-therapy/articles/types-of-therapy">types of therapy</a> explains the main ones, and <a href="/online-therapy/articles/cbt-online">CBT online</a> goes deeper on starting CBT through a platform.</p>`,
    },
    {
      heading: "What's the difference between video, phone, messaging and app-based care?",
      body: `<p>"Online therapy" covers several quite different experiences. The format you choose shapes how the care feels, how much the research says about it, and what it costs. Here's how the main formats compare.</p>
<table><thead><tr><th>Format</th><th>How it works</th><th>What the evidence says</th><th>Best for</th><th>Watch out for</th></tr></thead><tbody>
<tr><td><strong>Live video</strong></td><td>A scheduled session with your therapist on camera, usually about the length of an office session</td><td>The closest match to in-person care; reviews find video CBT no less effective than in-person for several conditions (${ext(S.thomas, "2021 review")})</td><td>Most people, and most concerns</td><td>You need a private space and a steady connection</td></tr>
<tr><td><strong>Phone</strong></td><td>A scheduled call, audio only</td><td>Included with video in the 2022 telehealth review, which found no significant difference from face-to-face therapy (${ext(S.greenwood, "JMIR Mental Health")})</td><td>People without reliable video, or who talk more easily without a camera</td><td>Not every platform offers it</td></tr>
<tr><td><strong>Live chat</strong></td><td>A scheduled session typed in real time</td><td>Less studied as a standalone format</td><td>People who find speaking aloud hard, or who lack privacy for a call</td><td>Slower than speaking; tone is easier to misread</td></tr>
<tr><td><strong>Messaging</strong></td><td>Written messages exchanged with your therapist over days, not in one sitting</td><td>Early trials are encouraging but small (see the next section)</td><td>Busy schedules, and people who process in writing</td><td>Replies aren't instant; not for urgent problems</td></tr>
<tr><td><strong>Self-guided apps</strong></td><td>Exercises, courses and tracking with no clinician involved</td><td>NIMH says most apps lack peer-reviewed research to support their claims (${ext(S.nimhTech, "NIMH")})</td><td>Building daily habits; practice alongside therapy</td><td>Not treatment; quality varies widely</td></tr>
</tbody></table>
<h3>Which platforms offer which formats</h3>
<p>Platforms mix these formats differently. According to our reviews (August 28, 2026), <a href="/online-therapy/reviews/betterhelp">BetterHelp</a> offers a weekly live session by video, phone or live chat, your choice, plus messaging with your therapist between sessions. <a href="/online-therapy/reviews/talkspace">Talkspace</a> pairs live sessions with ongoing messaging in its app, with live video varying by plan. <a href="/online-therapy/reviews/talkiatry">Talkiatry</a> runs like a medical practice, with scheduled video visits with your psychiatrist. <a href="/online-therapy/reviews/headspace">Headspace</a> is best known for its self-guided meditation and sleep app, and separately offers online therapy that accepts insurance.</p>
<h3>How to choose a format</h3>
<p>Think about the week you actually have, not an ideal one. If you can protect a private hour, video is the default with the strongest research behind it. If your evenings are unpredictable, a platform with messaging between sessions keeps the work going. If you share a small home, phone or chat might be the only way you can speak freely. And if what you want right now is a calmer bedtime or a daily breathing habit rather than treatment, a well-made app may be the right first step, with therapy available when you need more. NIMH's ${ext(S.nimhTele, "telehealth fact sheet")} also lists the practical drawbacks to plan for: you need an internet connection and a device, technical problems can interrupt a session, and visits can feel less private if people nearby can overhear.</p>`,
    },
    {
      heading: "Is messaging therapy real therapy?",
      body: `<p>Yes, when it's with a licensed clinician, but it's a different experience from a live session, and the research on it is younger. Messaging therapy means exchanging written messages with your therapist over the course of days, rather than meeting at a fixed time. Several platforms include it, either as the main format or as a layer between live sessions.</p>
<h3>What the studies show so far</h3>
<p>The best-designed study we found is a randomized controlled trial published in the ${ext(S.song, "Journal of Medical Internet Research in June 2023")}. Researchers assigned 83 adults with moderate depression to either message-based therapy, where they exchanged asynchronous messages with a therapist on an agreed schedule, or once-weekly 45-minute video therapy. People in the messaging group showed significant, medium-to-large improvements in depression, anxiety and functional impairment, and the changes were "noninferior" to the video group. There were no significant differences in how credible people found the treatment, in their sense of alliance with the therapist, or in engagement.</p>
<p>Two things to keep in mind about that trial. It was small, and two of its authors were employees of Talkspace, the service whose therapists delivered the care; the paper discloses this. That doesn't make the result wrong, but it does make it a first result rather than the last word.</p>
<p>An earlier observational study in ${ext(S.hull, "BMC Psychiatry (June 2020)")} followed 10,718 people who messaged daily with licensed clinicians on a telemedicine platform over 12 weeks. About 30.7% reached remission of depression and anxiety symptoms, 36.9% improved, and 32.4% showed no change in symptoms. The authors said improvement rates were consistent with face-to-face therapy, and that people who wrote more tended to do best. Because there was no control group, the study can't prove the messaging caused the improvement; the authors themselves called for a direct comparison with usual treatment.</p>
<h3>Who messaging suits, and who it doesn't</h3>
<ul>
<li><strong>It can suit</strong> people who think more clearly in writing, people whose work or caregiving makes fixed appointments hard, and people who want to capture a difficult moment while it's fresh and talk about it later.</li>
<li><strong>It's a poor fit</strong> for anything urgent, because replies aren't immediate, and it may feel thin for people who need the warmth of a voice or face. Many people use messaging alongside live sessions rather than instead of them.</li>
<li><strong>It's never a crisis line.</strong> If you're thinking about harming yourself, a message to your therapist is not the right tool. Call or text 988.</li>
</ul>
<p>If messaging matters to you, ask a platform exactly what's included: whether messages go to the same therapist you see live, how often they reply, and whether messaging is part of your plan or an extra. Our <a href="/online-therapy/betterhelp-vs-talkspace">BetterHelp vs Talkspace comparison</a> covers how the two biggest messaging-inclusive services differ.</p>`,
    },
    {
      heading: "What's the difference between online therapy and online psychiatry?",
      body: `<p>Online therapy is talk therapy. Online psychiatry is medical care for mental health, centered on evaluation, diagnosis and, where appropriate, prescribing and managing medication. Many people use one; many use both. The difference matters because it decides which platform can help you.</p>
<p>NIMH puts the relationship clearly: ${ext(S.nimhPsy, "psychotherapy and medication are the most common forms of mental health treatment")}, psychotherapy can be used as an alternative to or alongside medication, and even when medication relieves symptoms, therapy can help with things like self-defeating ways of thinking, fears, relationship problems or difficulty coping at home, school or work. The choice of treatment plan, NIMH adds, should be based on a person's needs and medical situation, under the guidance of a mental health professional.</p>
<table><thead><tr><th></th><th>Online therapy</th><th>Online psychiatry</th></tr></thead><tbody>
<tr><td><strong>What happens</strong></td><td>Regular conversations using structured techniques such as CBT</td><td>An evaluation, a diagnosis, and if appropriate a prescription, then follow-up visits to check how it's working</td></tr>
<tr><td><strong>Who provides it</strong></td><td>Licensed counselors, social workers, marriage and family therapists, psychologists</td><td>Psychiatrists (medical doctors) and psychiatric nurse practitioners</td></tr>
<tr><td><strong>Can prescribe?</strong></td><td>No</td><td>Yes</td></tr>
<tr><td><strong>Typical rhythm</strong></td><td>Often weekly</td><td>A longer first visit, then shorter follow-ups</td></tr>
<tr><td><strong>Platforms we cover</strong></td><td>BetterHelp, Talkspace, Headspace (therapy service), Talkiatry (therapy alongside psychiatry)</td><td>Talkiatry (psychiatrist-led), Talkspace (psychiatry service)</td></tr>
<tr><td><strong>Federal telehealth rules to know</strong></td><td>None specific to prescribing</td><td>Controlled substances follow DEA telehealth rules; the current flexibilities run through December 31, 2026</td></tr>
</tbody></table>
<h3>How the platforms split</h3>
<p>BetterHelp is talk therapy only. Its own FAQ says its therapists can't prescribe medication and suggests seeing a primary care physician or psychiatrist if you're considering it, while you continue therapy on BetterHelp (${ext(S.betterhelpFaq, "BetterHelp FAQ")}, checked October 31, 2026). Talkspace offers therapy and psychiatry on one platform. Talkiatry is the reverse: a psychiatry practice that also offers therapy. Headspace's app doesn't prescribe anything, and our coverage doesn't list psychiatry among its services.</p>
<p>On controlled medications such as stimulants and benzodiazepines, the platforms differ again. Talkspace's help centre says it doesn't prescribe controlled substances, naming examples such as Adderall and Xanax (${ext(S.talkspaceHelp, "Talkspace help centre")}). Talkiatry says it can prescribe them where state law allows and where clinically appropriate, that the answer depends on your state, and that a prescription is never guaranteed (${ext(S.talkiatryHelp, "Talkiatry help centre")}). Both were checked October 31, 2026. The federal rules behind this, and what may change on January 1, 2027, are in our guide to <a href="/online-therapy/articles/telehealth-controlled-substances-dea-rules-2026">telehealth prescribing and the DEA</a>.</p>
<p>For a fuller explanation of the two professions, see <a href="/online-therapy/articles/therapy-vs-psychiatry">therapist vs psychiatrist</a>. For how remote medication management works, see <a href="/online-therapy/articles/online-psychiatry">online psychiatry</a> and <a href="/online-therapy/articles/online-therapy-with-medication">online therapy with medication</a>.</p>`,
    },
    {
      heading: "Who will you actually see: LCSW, LPC, LMFT, psychologist, psychiatrist or PMHNP?",
      body: `<p>Online platforms use a mix of licensed professionals, and the letters after a name tell you what kind of training they have and what they can do. All of them should hold an active license in the state where you are. Only some can prescribe.</p>
<p>NIMH lists ${ext(S.nimhPsy, "psychiatrists, psychologists, social workers, counselors and psychiatric nurses")} as examples of professionals who offer psychotherapy. Medicare's own list of the clinicians it pays for outpatient mental health care is similar: ${ext(S.medicareMentalHealth, "psychiatrists or other doctors, clinical psychologists, clinical social workers, marriage and family therapists and mental health counselors")}, plus clinical nurse specialists, nurse practitioners and physician assistants. Here's what the common credentials mean in practice.</p>
<table><thead><tr><th>Credential</th><th>What it stands for</th><th>What they do</th><th>Can prescribe?</th></tr></thead><tbody>
<tr><td><strong>LCSW</strong> (or LICSW)</td><td>Licensed clinical social worker</td><td>Talk therapy; often strong on practical, family and community supports</td><td>No</td></tr>
<tr><td><strong>LPC</strong> (also LMHC or LPCC in some states)</td><td>Licensed professional counselor / mental health counselor</td><td>Talk therapy for a wide range of concerns</td><td>No</td></tr>
<tr><td><strong>LMFT</strong></td><td>Licensed marriage and family therapist</td><td>Talk therapy with individuals, couples and families, with a focus on relationships</td><td>No</td></tr>
<tr><td><strong>Psychologist</strong> (PhD or PsyD)</td><td>Doctoral-level clinician</td><td>Therapy and psychological testing and assessment</td><td>Generally no</td></tr>
<tr><td><strong>Psychiatrist</strong> (MD or DO)</td><td>Medical doctor specializing in mental health</td><td>Evaluation, diagnosis and medication management; some also provide therapy</td><td>Yes</td></tr>
<tr><td><strong>PMHNP</strong></td><td>Psychiatric-mental health nurse practitioner</td><td>Evaluation, diagnosis and medication management</td><td>Yes</td></tr>
</tbody></table>
<h3>A note on nurse practitioners</h3>
<p>Nurse practitioners (NPs) are, in MedlinePlus's words, ${ext(S.medlineProviders, "nurses with graduate training")} who can prescribe medicines. A PMHNP is a nurse practitioner who specializes in psychiatric and mental health care, and many online psychiatry services use them alongside psychiatrists. Talkiatry is unusual in being led by psychiatrists; our <a href="/online-therapy/reviews/talkiatry">Talkiatry review</a> covers what that means for you.</p>
<h3>Does the credential matter for therapy?</h3>
<p>Less than you might think. Counselors, social workers, family therapists and psychologists can all be excellent therapists, and the research on what predicts good outcomes keeps coming back to the relationship and the approach rather than the letters. NIMH suggests asking any prospective therapist about their credentials and experience, whether they have a specialty, what approach they'll use and why, and whether they've treated your age group and your specific concern. Those questions matter more than the acronym.</p>
<p>What the credential does decide is <strong>prescribing</strong>. If medication may be part of your care, you need a psychiatrist or psychiatric NP somewhere in the picture, either on the same platform or coordinated with your therapist.</p>
<h3>How to check a license</h3>
<p>Every state's licensing boards publish a way to look up a license. Search for your state's board for the profession (for example, "[your state] board of behavioral health license lookup" or "[your state] medical board license verification"), then enter the clinician's name. You're looking for an active license with no disciplinary actions you'd want to ask about. A legitimate therapist won't mind you checking, and most platforms show license details on clinician profiles or will tell you if you ask.</p>`,
    },
    {
      heading: "Do I need therapy, psychiatry or both?",
      body: `<p>You don't have to work this out perfectly before you start. Many people begin with therapy and add a psychiatric evaluation later if their therapist or doctor suggests it; others start with a psychiatric evaluation and are encouraged to add therapy. What follows is a way to think it through, not a diagnosis. A licensed clinician is the right person to make the call with you.</p>
<h3>Therapy is a natural starting point when you want to...</h3>
<ul>
<li>work through stress, grief, a breakup, a family situation, or a life change</li>
<li>understand and change patterns in how you think, react or relate to people</li>
<li>learn practical skills for anxiety, low mood, sleep or anger</li>
<li>talk to someone outside your life who is trained to help</li>
</ul>
<p>NIMH's list of ${ext(S.nimhPsy, "reasons people seek psychotherapy")} includes severe or long-term stress from work or family, the loss of a loved one, relationship problems, and symptoms such as changes in sleep or appetite, low energy, losing interest in things you used to enjoy, persistent irritability, excessive worry, or hopelessness that won't go away.</p>
<h3>A psychiatric evaluation may make sense when...</h3>
<ul>
<li>symptoms are getting in the way of work, school, relationships or looking after yourself, despite your efforts</li>
<li>a therapist or doctor has suggested medication might help</li>
<li>you've been prescribed mental health medication before and need someone to manage it</li>
<li>you want a diagnosis assessed by a physician</li>
</ul>
<h3>Why many people end up with both</h3>
<p>NIMH notes that therapy can be used alongside medication, and that even when medication relieves symptoms, therapy can help address specific issues. In practice that often means a psychiatrist or PMHNP for medication visits and a therapist for weekly sessions. The question then becomes coordination: are your therapist and prescriber on the same platform, sharing notes, or do you have to keep each of them updated?</p>
<h3>Start with a physical check-up if you can</h3>
<p>NIMH makes a point that's easy to skip: being examined by a health care provider can help ${ext(S.nimhPsy, "rule out a physical health issue")}, because symptoms like a change in mood or trouble concentrating are sometimes due to a medical condition. A primary care provider can also do an initial mental health screening and refer you on, according to ${ext(S.nimhHelp, "NIMH's find-help page")}.</p>
<p>If you'd like a structured way to decide, our guide to <a href="/online-therapy/articles/how-to-choose-an-online-therapy-platform">choosing an online therapy platform</a> sorts the market with four questions, and <a href="/online-therapy/articles/therapy-vs-psychiatry">therapist vs psychiatrist</a> covers the professions in more depth. For anxiety and depression specifically, see <a href="/online-therapy/articles/online-therapy-for-anxiety">online therapy for anxiety</a> and <a href="/online-therapy/articles/online-therapy-for-depression">online therapy for depression</a>.</p>`,
    },
    {
      heading: "Who is online therapy not right for?",
      body: `<p>Online therapy is a good fit for a great many people, but not for every situation. Being clear about the limits is part of using it safely.</p>
<h3>Situations that need something else first</h3>
<ul>
<li><strong>A crisis or risk of harm.</strong> If you're thinking about suicide or harming yourself or someone else, you need immediate support, not a weekly appointment. Call or text 988, or call 911 if anyone is in danger. Platforms are built for ongoing care, and none of them is an emergency service.</li>
<li><strong>Severe or complex mental illness that needs close, coordinated care.</strong> The research gaps line up with this. A 2022 review found no includable trials of telehealth therapy for schizophrenia or bipolar disorder (${ext(S.greenwood, "JMIR Mental Health")}), and a 2021 review noted that video therapy had yet to be studied in severe and complex mental health problems (${ext(S.thomas, "Psychology and Psychotherapy")}). That's an absence of evidence rather than proof it can't help, but it means a weekly online session shouldn't be the whole plan.</li>
<li><strong>Conditions that need a specialist team.</strong> Some services say plainly what they don't treat. Talkiatry, for example, says it doesn't provide medication-assisted treatment for substance use disorders (company statement, checked October 31, 2026). Eating disorders, psychosis and substance dependence often need specialized care, sometimes in person.</li>
<li><strong>Anything that needs a physical exam or tests.</strong> MedlinePlus notes that in some cases a provider ${ext(S.medlineTele, "may not be able to make the right diagnosis without examining you in person")}, or may need you to come in for a lab test.</li>
</ul>
<h3>Situations where online care may be harder</h3>
<ul>
<li><strong>No private space.</strong> If you can't speak without being overheard, or if someone at home monitors your phone, online sessions may not be safe or useful. Ask about chat sessions, use a parked car or a friend's place, or consider an office.</li>
<li><strong>Unreliable internet or no suitable device.</strong> NIMH lists access to technology as a drawback of virtual care.</li>
<li><strong>Relationship abuse.</strong> Couples therapy is often not recommended when there are safety concerns between partners; individual support comes first. Our <a href="/online-therapy/articles/online-couples-therapy">online couples therapy guide</a> covers this.</li>
<li><strong>Some controlled medications.</strong> Depending on your state and the federal rules after December 31, 2026, some prescriptions may need an in-person visit. See <a href="/online-therapy/articles/telehealth-controlled-substances-dea-rules-2026">our DEA guide</a>.</li>
</ul>
<p>None of this means you can't use online care at all. Many people combine it with in-person support: an online therapist for weekly sessions and a local psychiatrist, or a local clinic with telehealth follow-ups. If you're unsure where you fit, a primary care provider or the SAMHSA National Helpline (1-800-662-4357) can help you find the right level of care.</p>`,
    },
    {
      heading: "What should you do in a mental health crisis?",
      body: `<p>Contact a crisis service, not a therapy platform. In the US, the number to remember is <strong>988</strong>.</p>
<h3>The crisis options, in one place</h3>
<table><thead><tr><th>Service</th><th>How to reach it</th><th>What it's for</th></tr></thead><tbody>
<tr><td><strong>988 Suicide and Crisis Lifeline</strong></td><td>Call or text 988, or chat at 988lifeline.org</td><td>Free, confidential support 24/7 for anyone in suicidal crisis or emotional distress</td></tr>
<tr><td><strong>Veterans Crisis Line</strong></td><td>Dial 988 and press 1, text 838255, or chat online</td><td>24/7 confidential support for all veterans and the people who support them, even if they aren't enrolled in VA care</td></tr>
<tr><td><strong>911 or the nearest emergency room</strong></td><td>Call 911</td><td>Life-threatening situations and immediate danger</td></tr>
<tr><td><strong>Disaster Distress Helpline</strong></td><td>Call or text 1-800-985-5990</td><td>Crisis counseling after any natural or human-caused disaster</td></tr>
<tr><td><strong>SAMHSA National Helpline</strong></td><td>1-800-662-4357</td><td>Free, confidential treatment referrals 24/7 (not a crisis line, but a route into care)</td></tr>
</tbody></table>
<p>Sources: ${ext(S.nimhHelp, "NIMH, Help for Mental Illnesses")}; ${ext(S.samhsa988, "SAMHSA, 988 Suicide and Crisis Lifeline")}; ${ext(S.samhsaHelpline, "SAMHSA National Helpline")}, all checked November 9, 2026.</p>
<h3>What 988 is, and isn't</h3>
<p>SAMHSA describes 988 as offering ${ext(S.samhsa988, "24/7, judgment-free support for mental health, substance use and more")}, by text, call or chat, with access for Deaf and hard of hearing people and Spanish speakers. Congress designated the 988 dialing code in 2020, to be operated through the existing National Suicide Prevention Lifeline. You don't have to be suicidal to call. If things feel unmanageable, that's reason enough.</p>
<h3>Why platforms aren't the answer in a crisis</h3>
<p>Online therapy runs on scheduled sessions and messages that may take hours to answer. Every platform we review tells users it isn't a crisis service. Your therapist is part of your support, and it's good to tell them about difficult moments, but in the moment itself, use 988 or 911.</p>
<h3>Make a plan while you're well</h3>
<p>NIMH lists ${ext(S.nimhPsy, "creating a safety plan")} among the elements of psychotherapy: a plan to help with thoughts of self-harm or suicide, recognize warning signs, and use coping strategies such as contacting friends, family or emergency services. If you're starting online therapy and this applies to you, ask your therapist to build one with you in the first few sessions, and save 988 in your phone today.</p>`,
    },
    {
      heading: "How can you tell if an online therapy platform is legitimate?",
      body: `<p>A legitimate online therapy service connects you with licensed clinicians, tells you plainly what it does and doesn't do, protects your information, and is honest about cost and cancellation. You can check most of that in ten minutes before you hand over a card.</p>
<h3>A ten-point legitimacy checklist</h3>
<ol>
<li><strong>Licensed clinicians, licensed where you are.</strong> The service should tell you your clinician's full name, credential and license, and you should be able to verify it on your state board's lookup. Platforms in our coverage match you with clinicians licensed in your state.</li>
<li><strong>A real intake.</strong> Expect questions about your history, symptoms and safety. A service that skips straight to payment, or to a prescription, is a warning sign.</li>
<li><strong>A clear scope.</strong> Good services say what they don't treat and when you need in-person care. Talkiatry, for example, publishes a list of services it doesn't provide; Talkspace says it doesn't prescribe controlled substances.</li>
<li><strong>Honest prescribing.</strong> For psychiatry, a prescription should never be guaranteed. Treat any service that promises frictionless access to tightly controlled medications as a red flag; our <a href="/online-therapy/articles/telehealth-controlled-substances-dea-rules-2026">DEA guide</a> explains why regulators cracked down on that model.</li>
<li><strong>Crisis information up front.</strong> NIMH suggests checking whether an app ${ext(S.nimhTech, "offers recommendations for what to do if symptoms get worse or there is a psychiatric emergency")}. Legitimate platforms point you to 988 and 911 and say they aren't emergency services.</li>
<li><strong>A secure platform.</strong> NIMH advises finding a provider who ${ext(S.nimhTele, "uses a secure platform that protects your privacy and verifies your identity")}.</li>
<li><strong>A readable privacy policy.</strong> You should be able to find out what data is collected, who it's shared with, and how to opt out. More on this in the privacy section below.</li>
<li><strong>Transparent pricing.</strong> You should see your actual cost, or your insurance estimate, before your first session, along with how billing renews.</li>
<li><strong>Easy switching and cancellation.</strong> You should be able to change therapists and cancel without a fight. Know the renewal terms of any subscription.</li>
<li><strong>A real company you can contact.</strong> Look for a physical address, a support channel that answers, and a track record you can read about.</li>
</ol>
<h3>For apps, NIMH adds a few more checks</h3>
<p>NIMH's page on ${ext(S.nimhTech, "technology and mental health treatment")} says there are no review boards, checklists or widely accepted rules for evaluating mental health apps, and that most apps lack peer-reviewed research to support their claims. Its suggestions: ask a trusted health care provider for a recommendation, look up the developer's credentials and experience, decide whether you want a fully automated app or one with access to a trained professional, beware of misleading logos (NIMH says it has not developed and does not endorse any apps, and that some developers have unlawfully used its logo), and check whether the app is based on a tested treatment such as internet-based CBT.</p>
<h3>What "legit" doesn't mean</h3>
<p>A legitimate company can still have real problems: billing disputes, slow customer service, a therapist who isn't right for you, or a privacy history worth reading about. Those are reasons to go in with your eyes open and to keep records, not proof of a scam. Our dedicated pages on <a href="/online-therapy/articles/is-betterhelp-legit">whether BetterHelp is legit</a> and <a href="/online-therapy/articles/is-talkiatry-legit">whether Talkiatry is legit</a> apply this test to two services people ask about most, and the next two sections summarize them.</p>`,
    },
    {
      heading: "Is BetterHelp a scam?",
      body: `<p>No. BetterHelp is a real, large therapy platform staffed by licensed therapists. It's also a company with a real privacy history that's worth understanding, and the questions people search for usually trace back to that history or to ordinary subscription frustrations rather than to fraud.</p>
<h3>What BetterHelp is</h3>
<p>BetterHelp is the biggest name in subscription talk therapy. It matches you with a licensed therapist for a weekly live session by video, phone or live chat, with messaging between sessions, plus group sessions, webinars and worksheets. BetterHelp itself reports 31,739 therapists on the platform and more than 6.6 million people helped; those are the company's own figures. It says matching can take as little as 2 days, and you can switch therapists at any time at no extra cost. It now accepts insurance, with copays cited from around $23 a session for covered members, and offers self-pay subscriptions and a financial-aid questionnaire. These details are from our <a href="/online-therapy/reviews/betterhelp">BetterHelp review</a> (August 28, 2026); coverage and copays are plan-specific.</p>
<h3>What happened with the FTC</h3>
<p>In 2023, BetterHelp settled with the US Federal Trade Commission over sharing user data, including health questionnaire data, with advertisers such as Facebook and Snapchat. The FTC order bars BetterHelp from sharing health data for advertising and requires consent before sharing health information with third parties. In May 2024 the FTC ${ext(S.ftcRefunds, "began sending refund notices")} from the $7.8 million settlement to about 800,000 people who paid for the service between August 2017 and December 2020. BetterHelp did not admit wrongdoing. (This summary is from our <a href="/online-therapy/articles/is-betterhelp-legit">is BetterHelp legit</a> article, updated November 8, 2026, which links the FTC's announcement.)</p>
<p>What that means for you today: read BetterHelp's current privacy policy before signing up, and use any data-sharing opt-outs it offers. That advice applies to every platform, not just this one.</p>
<h3>Why people search "is BetterHelp a scam"</h3>
<ul>
<li><strong>Subscription billing.</strong> Self-pay plans renew until you cancel. Know the terms and set a reminder if you're unsure.</li>
<li><strong>Therapist fit.</strong> First matches aren't always the right one. That's normal in therapy, online or off, and it's why switching is built in.</li>
<li><strong>The privacy settlement</strong> described above.</li>
</ul>
<p>Those are legitimate things to weigh. They're not signs that the therapy itself isn't real.</p>
<h3>What BetterHelp doesn't do</h3>
<p>BetterHelp doesn't prescribe medication; its FAQ says to see a primary care physician or psychiatrist for that while continuing therapy on the platform. Its insurance page says it doesn't accept Medicare, Medicaid or TRICARE (${ext(S.betterhelpIns, "BetterHelp")}, checked November 8, 2026). If you may need medication, or you're on one of those programs, compare <a href="/online-therapy/reviews/talkspace">Talkspace</a> or <a href="/online-therapy/reviews/talkiatry">Talkiatry</a>.</p>
<p>For BetterHelp's insurance in detail, see <a href="/online-therapy/articles/does-betterhelp-take-insurance">does BetterHelp take insurance</a>; for its pricing model, see <a href="/online-therapy/articles/how-much-does-betterhelp-cost">how much BetterHelp costs</a>.</p>`,
    },
    {
      heading: "Is Talkiatry legit?",
      body: `<p>Yes. Talkiatry is a real psychiatry practice that runs on video, with care led by psychiatrists who evaluate, diagnose and manage medication, and with therapy available alongside. It's built around insurance and is in-network with many major plans. Like many insurance-billed practices, its administrative side draws more complaints than its clinicians do, so a few simple habits will protect you.</p>
<h3>What makes Talkiatry different</h3>
<p>Most online mental health services start with therapy and add psychiatry. Talkiatry starts with psychiatry. According to our <a href="/online-therapy/reviews/talkiatry">Talkiatry review</a> (August 28, 2026), its psychiatrists are physicians who lead care end to end, it's designed for insured patients, and visits are billed through your plan like a specialist visit. If you have no coverage, it generally isn't the right fit.</p>
<p>The practice has grown. On October 22, 2026, Talkiatry announced that its therapy services are available in all 50 states alongside its psychiatric care, as ${ext(S.hitnTalkiatry, "Healthcare IT News reported on October 23, 2026")}. The company says it directly employs more than 400 full-time therapists and 800 full-time psychiatrists rather than contractors, and that it works with more than 100 insurers. Those are the company's figures, as reported.</p>
<h3>Insurance and Medicare</h3>
<p>Talkiatry says it accepts Original Medicare and select Medicare Advantage plans, varying by state, and that it doesn't take Medicaid (${ext(S.talkiatryMedicare, "Talkiatry help centre")}, checked November 6, 2026).</p>
<h3>Controlled medications</h3>
<p>Talkiatry says its psychiatrists can prescribe controlled medications through virtual visits where clinically appropriate and legally permissible, that the answer depends on your state's laws, and that a prescription is never guaranteed (${ext(S.talkiatryHelp, "Talkiatry help centre")}, checked October 31, 2026). It's one of the few services in our coverage that prescribes them at all, which makes the federal DEA date of December 31, 2026 relevant to some of its patients.</p>
<h3>How to protect yourself with any insurance-billed practice</h3>
<ol>
<li><strong>Get your eligibility confirmed in writing</strong> before the first visit, and keep the email.</li>
<li><strong>Keep copies</strong> of every form and message you send, with dates.</li>
<li><strong>Check that each claim posts</strong> with your insurer after a visit. A two-minute check in your insurer's portal catches billing errors early.</li>
</ol>
<p>The full assessment is in <a href="/online-therapy/articles/is-talkiatry-legit">is Talkiatry legit</a>, and <a href="/online-therapy/talkspace-vs-talkiatry">Talkspace vs Talkiatry</a> compares it with the closest alternative.</p>`,
    },
    {
      heading: "How private is online therapy?",
      body: `<p>Online therapy can be as confidential as an office visit, but privacy depends on three things you can check: the platform's security, the platform's data practices, and your own surroundings. The first two are the company's job; the third is yours.</p>
<h3>1. The platform's security</h3>
<p>NIMH advises choosing ${ext(S.nimhTele, "a provider who uses a secure platform that protects your privacy and verifies your identity")}. In practice, that means sessions happen inside the platform's own app or website, not over a personal phone number or a general video app, and your account has a strong password and, ideally, two-step sign-in.</p>
<h3>2. The platform's data practices</h3>
<p>This is where the BetterHelp FTC case is instructive. It wasn't about hackers. It was about a company sharing information, including answers to health questions, with advertising platforms. The FTC's order now bars BetterHelp from sharing health data for advertising and requires consent before sharing health information with third parties. The lesson for every service: read the privacy policy, look for what's shared with "partners" or used for marketing, and switch off anything optional.</p>
<p>NIMH raises the same issue for apps, asking ${ext(S.nimhTech, "how the app maker guarantees users' privacy")}, considering many apps deal with sensitive personal information, and noting that some apps collect data such as location, movement and phone use. If an app's privacy terms aren't clear, assume the data may be used in ways you wouldn't choose.</p>
<h3>3. Insurance creates records too</h3>
<p>Using insurance has a privacy trade-off that's easy to miss. Billing through a health plan means your insurer receives claims with diagnosis and visit information, the same as any covered medical care. That's normal and protected, but if you're on a family plan, explanation-of-benefits statements may go to the policyholder. If that matters, ask your insurer how statements are delivered, or weigh self-pay or an employer assistance program.</p>
<h3>4. Your own space</h3>
<p>NIMH notes that virtual visits ${ext(S.nimhTele, "may feel less private if people nearby can see or overhear")}, and that some people feel uncomfortable with a provider seeing their surroundings. Practical fixes:</p>
<ul>
<li>Use headphones, so only you hear your therapist.</li>
<li>Pick a spot where nobody can walk in, or put a sign on the door.</li>
<li>A parked car makes a surprisingly good therapy room.</li>
<li>Blur or change your video background if you'd rather not show your home.</li>
<li>Use chat sessions on days when you can't speak freely.</li>
<li>Lock your phone and don't save session notes where others can read them.</li>
</ul>
<h3>What your therapist keeps confidential</h3>
<p>NIMH reminds patients that discussions with a health care provider are ${ext(S.nimhTips, "private and cannot be shared without your expressed permission")}. There are limits that therapists explain at the start, most commonly when someone is at serious risk of harm. NIMH suggests asking any therapist directly: are meetings confidential, how is confidentiality assured, and are there limits?</p>`,
    },
    {
      heading: "How do BetterHelp, Talkspace, Headspace and Talkiatry compare?",
      body: `<p>The four services we cover in this vertical do different jobs. The short version: <strong>BetterHelp</strong> is best for flexible talk therapy with fast matching; <strong>Talkspace</strong> is best if you have insurance or an EAP and may want therapy and psychiatry in one place; <strong>Talkiatry</strong> is best if medication is likely central to your care and you're insured; and <strong>Headspace</strong> is best for a daily mindfulness, sleep and stress habit, with an insurance-based therapy service alongside.</p>
<table><thead><tr><th></th><th>BetterHelp</th><th>Talkspace</th><th>Talkiatry</th><th>Headspace</th></tr></thead><tbody>
<tr><td><strong>What it is</strong></td><td>Subscription talk therapy</td><td>Therapy and psychiatry on one platform</td><td>Psychiatrist-led practice, therapy alongside</td><td>Mindfulness app, plus online therapy</td></tr>
<tr><td><strong>Best for</strong></td><td>Starting therapy quickly; easy switching</td><td>Insured or EAP members; therapy that may need medication</td><td>Medication-involved care with insurance</td><td>Daily stress and sleep practice</td></tr>
<tr><td><strong>Session formats</strong></td><td>Video, phone or live chat, plus messaging</td><td>Live sessions plus messaging; video varies by plan</td><td>Scheduled video visits</td><td>Self-guided app; therapy by video</td></tr>
<tr><td><strong>Prescribes medication</strong></td><td>No</td><td>Yes, non-controlled only (company policy)</td><td>Yes, including some controlled medications where state law allows (company says)</td><td>No</td></tr>
<tr><td><strong>Insurance</strong></td><td>Accepted; copays cited from around $23/session for covered members</td><td>Many major plans and EAPs; says most insured members pay $0 copay</td><td>In-network with many major plans</td><td>Therapy accepts insurance; app is a subscription, HSA/FSA eligible</td></tr>
<tr><td><strong>Original Medicare</strong></td><td>No (company says)</td><td>Yes, therapy (company says)</td><td>Yes (company says)</td><td>No; select Medicare Advantage plans</td></tr>
<tr><td><strong>Medicaid</strong></td><td>No (company says)</td><td>Check your plan</td><td>No (company says)</td><td>Check your plan</td></tr>
<tr><td><strong>Without insurance</strong></td><td>Self-pay subscription; financial-aid questionnaire</td><td>Self-pay available; check rates on its site</td><td>Generally not the right fit</td><td>App subscription; check therapy rates</td></tr>
<tr><td><strong>Our review</strong></td><td><a href="/online-therapy/reviews/betterhelp">BetterHelp review</a></td><td><a href="/online-therapy/reviews/talkspace">Talkspace review</a></td><td><a href="/online-therapy/reviews/talkiatry">Talkiatry review</a></td><td><a href="/online-therapy/reviews/headspace">Headspace review</a></td></tr>
</tbody></table>
<p>Sources: our reviews (August 28, 2026); Medicare policies from ${ext(S.talkspaceMedicare, "Talkspace")}, ${ext(S.talkiatryMedicare, "Talkiatry")}, ${ext(S.headspaceMedicare, "Headspace")} and ${ext(S.betterhelpIns, "BetterHelp")} (checked November 6-8, 2026); prescribing policies from ${ext(S.talkspaceHelp, "Talkspace")} and ${ext(S.talkiatryHelp, "Talkiatry")} (checked October 31, 2026). Talkspace says psychiatry isn't yet covered under Original Medicare. Insurance coverage and copays at every service are plan-specific; run each eligibility check with your own details.</p>
<h3>A few things the table can't show</h3>
<ul>
<li><strong>BetterHelp's</strong> size is its advantage: it reports the largest therapist pool, which shows in quick matching and easy re-matching. It also includes group sessions and worksheets with the subscription.</li>
<li><strong>Talkspace's</strong> app-based format means 24/7 access to your therapy room for messaging, not just session slots. It also offers couples and teen therapy, and its matching is match-based rather than browsing profiles.</li>
<li><strong>Talkiatry's</strong> structure is unusual at its scale: physicians running care, with therapy coordinated around the treatment plan.</li>
<li><strong>Headspace's</strong> app is mental fitness, not treatment, and it doesn't claim to treat conditions. It pairs well with therapy from any provider.</li>
</ul>
<p>Three of the online therapy services we review are below.</p>`,
    },
    {
      heading: "Talkiatry vs Talkspace vs BetterHelp: which should you pick?",
      body: `<p>Pick by where your care starts. If talk therapy is the core and medication is unlikely, BetterHelp or Talkspace. If therapy is the core but medication is a real possibility, Talkspace. If medication is likely central and you have insurance, Talkiatry. The details below are drawn from our three head-to-head comparisons.</p>
<h3>Talkiatry vs Talkspace</h3>
<p>These two look alike from a distance: both bill insurance and both offer therapy and medication. Their centers of gravity are opposite. Talkspace is a therapy platform with psychiatry as an added service; Talkiatry is a psychiatry practice with therapy offered alongside treatment. That shows up in daily life:</p>
<ul>
<li><strong>Who leads your care:</strong> a matched therapist at Talkspace; a psychiatrist at Talkiatry.</li>
<li><strong>Messaging between sessions:</strong> included at Talkspace; not the model at Talkiatry.</li>
<li><strong>Controlled medications:</strong> Talkspace says it doesn't prescribe them; Talkiatry says it can where state law allows and it's clinically appropriate.</li>
<li><strong>Without insurance:</strong> Talkspace offers self-pay; Talkiatry generally isn't the right fit.</li>
<li><strong>Billing style:</strong> Talkspace works on a subscription and coverage model that also spans employer EAPs; Talkiatry bills per visit like a specialist practice.</li>
</ul>
<p>If you're seeking an evaluation, have a diagnosis question, or need ongoing medication management, Talkiatry's psychiatrist-led structure is the stronger home. If you mainly want therapy with medication available in case, Talkspace fits better. The full comparison is in <a href="/online-therapy/talkspace-vs-talkiatry">Talkspace vs Talkiatry</a>.</p>
<h3>BetterHelp vs Talkspace</h3>
<p>Both now take insurance, so the old "one takes insurance, one doesn't" split is out of date. The real differences:</p>
<ul>
<li><strong>Scope:</strong> Talkspace offers psychiatry with medication management; BetterHelp is talk therapy only.</li>
<li><strong>Insurance:</strong> Talkspace has broad plan and EAP coverage and says most insured members pay a $0 copay; BetterHelp cites copays from around $23 a session for covered members. Both figures are plan-specific.</li>
<li><strong>Flexibility:</strong> BetterHelp offers video, phone or chat for live sessions and reports the largest therapist network, with matching in as little as 2 days. Talkspace's live sessions are video, varying by plan.</li>
</ul>
<p>The practical move is to run both eligibility checks with your insurance details and let your actual copays decide; if you may ever need medication management, Talkspace settles it. See <a href="/online-therapy/betterhelp-vs-talkspace">BetterHelp vs Talkspace</a> for the full comparison.</p>
<h3>Where Headspace fits</h3>
<p>People often compare Headspace with BetterHelp, but they're different tools. Headspace's app builds a daily practice; BetterHelp provides a therapist. Many people do best with both: therapy for the work, an app for the days in between. Headspace's own therapy service accepts insurance and is worth checking if your plan covers it. Our <a href="/online-therapy/headspace-vs-betterhelp">Headspace vs BetterHelp comparison</a> covers that choice.</p>
<h3>A quick decision guide</h3>
<table><thead><tr><th>If this sounds like you...</th><th>Start by checking</th></tr></thead><tbody>
<tr><td>"I want to talk to someone soon, and I value choice of format."</td><td>BetterHelp</td></tr>
<tr><td>"I have insurance or an EAP and might want medication later."</td><td>Talkspace</td></tr>
<tr><td>"I think I need medication, or I'm already on it, and I'm insured."</td><td>Talkiatry</td></tr>
<tr><td>"I mostly want help with stress and sleep, day to day."</td><td>Headspace app, with therapy if you need more</td></tr>
<tr><td>"I'm on Medicare."</td><td>Talkspace or Talkiatry; see the Medicare section below</td></tr>
<tr><td>"Money is very tight."</td><td>Your EAP, insurance, and the free and low-cost routes below</td></tr>
</tbody></table>`,
    },
    {
      heading: "Does insurance cover online therapy?",
      body: `<p>Often, yes. Many health plans cover therapy and psychiatry by video, and several online services bill insurance directly. Coverage is always specific to your plan, so the only reliable answer comes from checking your own details. Before you pay anything out of pocket, it's worth ten minutes to find out.</p>
<h3>The federal rules in plain English</h3>
<p>Two federal laws shape mental health coverage for most people with private insurance. The ${ext(S.cmsParity, "CMS page on the Mental Health Parity and Addiction Equity Act")} (MHPAEA) explains them:</p>
<ul>
<li><strong>Parity.</strong> If a plan covers mental health benefits, MHPAEA generally says its financial requirements (such as copays and coinsurance) and treatment limits (such as visit limits) can't be more restrictive than those that apply to substantially all medical and surgical benefits. Plans also can't impose separate requirements that apply only to mental health care.</li>
<li><strong>Coverage itself.</strong> MHPAEA doesn't require plans to cover mental health care. But the Affordable Care Act requires coverage of mental health and substance use disorder services as one of ten essential health benefit categories in non-grandfathered individual and small group plans.</li>
<li><strong>Who it applies to.</strong> The parity rules apply to group health plans of employers with more than 50 employees and to individual market coverage; they apply to small group plans indirectly through the essential health benefit requirements. Medicare and Medicaid are public programs with their own rules, though Medicaid managed care plans must comply with certain parity requirements.</li>
</ul>
<p>Parity isn't the same as "telehealth must be covered". Whether your plan covers video visits, and which providers count as in-network, is still set by your plan, and NIMH notes that ${ext(S.nimhTele, "policies vary from state to state")}.</p>
<h3>How to check your coverage in four steps</h3>
<ol>
<li><strong>Run the platform's eligibility check.</strong> Talkspace, Talkiatry, BetterHelp and Headspace's therapy service each check your insurance before you commit. This is the fastest route to a real number.</li>
<li><strong>Call the number on your insurance card</strong> and ask: Do I have outpatient mental health benefits? Are telehealth visits covered? What's my copay or coinsurance for an in-network therapy visit, and for a psychiatry visit? Have I met my deductible? Is this platform in network?</li>
<li><strong>Ask for confirmation in writing</strong> before your first session.</li>
<li><strong>Check your claims</strong> in your insurer's portal after each visit.</li>
</ol>
<h3>In network, out of network, and superbills</h3>
<p>"In network" means the provider has a contract with your plan, so you pay your plan's copay or coinsurance. If a therapist is out of network, some plans still repay part of the cost if you submit a superbill, an itemized receipt that legitimate providers can produce. Your insurer can tell you whether your plan has out-of-network mental health benefits.</p>
<p>Our guides go into each piece: <a href="/online-therapy/articles/online-therapy-that-takes-insurance">online therapy that takes insurance</a>, <a href="/online-therapy/articles/does-talkspace-take-insurance">Talkspace insurance coverage</a> and <a href="/online-therapy/articles/does-betterhelp-take-insurance">does BetterHelp take insurance</a>.</p>`,
    },
    {
      heading: "Does Medicare cover online therapy and online psychiatry?",
      body: `<p>Yes. Medicare Part B covers outpatient mental health care, including therapy and psychiatric evaluation, and through December 31, 2027 it covers telehealth services from anywhere in the US, including your home. For most telehealth services you pay the same as you would in person.</p>
<h3>What Medicare covers</h3>
<p>Medicare.gov says Part B covers ${ext(S.medicareMentalHealth, "a wide range of outpatient mental health services")}, including individual and group psychotherapy, family counseling when the main purpose is to help with your treatment, and psychiatric evaluation. It pays for care from psychiatrists and other doctors, clinical psychologists, clinical social workers, marriage and family therapists, mental health counselors, clinical nurse specialists, nurse practitioners and physician assistants. Mental health visits, Medicare.gov adds, can be individual, group or family sessions. Its ${ext(S.medicareTelehealth, "telehealth page")} lists psychotherapy among the services you can get by telehealth and confirms the home-based coverage through December 31, 2027. Both pages were checked November 9, 2026.</p>
<h3>What you'll pay</h3>
<p>With Original Medicare, after you meet the Part B deductible you pay 20% of the Medicare-approved amount. In 2026 the deductible is $283, ${ext(S.cms2026, "according to CMS")}, as reported in our Medicare guide on November 6, 2026. A Medigap plan may cover some or all of the 20%. Medicare Advantage plans set their own copays and networks. You pay nothing for a yearly depression screening if your provider accepts assignment, though Medicare says it has to happen in a primary care setting.</p>
<h3>Which online services take Medicare</h3>
<ul>
<li><strong>Talkspace</strong> says it accepts Original Medicare for therapy in all 50 states and DC; it says psychiatry isn't yet covered under Original Medicare (${ext(S.talkspaceMedicare, "Talkspace")}).</li>
<li><strong>Talkiatry</strong> says it accepts Original Medicare and select Medicare Advantage plans, by state (${ext(S.talkiatryMedicare, "Talkiatry")}).</li>
<li><strong>Headspace</strong> says it isn't enrolled as a direct Medicare provider but is in network with select Medicare Advantage plans (${ext(S.headspaceMedicare, "Headspace")}).</li>
<li><strong>BetterHelp</strong> says it doesn't accept Medicare (${ext(S.betterhelpIns, "BetterHelp")}).</li>
</ul>
<p>Those company statements were checked November 6-8, 2026. Policies change, so confirm before you book.</p>
<h3>The 2028 change to watch</h3>
<p>Under current law, things change on January 1, 2028. The ${ext(S.cmsFaq, "CMS telehealth FAQ")} (updated October 2026) says Medicare will then want an in-person visit within six months before your first mental health telehealth session, and, for people who started telehealth mental health care at home before that date, an in-person visit at least every 12 months. Congress has moved these deadlines before. Medicare open enrollment runs until December 7, 2026.</p>
<p>Everything above, with a step-by-step open enrollment checklist, is in <a href="/online-therapy/articles/does-medicare-cover-online-therapy">does Medicare cover online therapy</a>.</p>`,
    },
    {
      heading: "What about Medicaid, TRICARE and veterans' care?",
      body: `<p>Medicaid, TRICARE and the VA are separate systems, and the big subscription platforms mostly sit outside them. That doesn't mean online care is off the table; it means you'll usually reach it through your plan or your local system rather than a consumer app.</p>
<h3>Medicaid</h3>
<p>Medicaid is delivered through state programs, so what's covered and who's in network depends on where you live and, often, on which managed care plan you're in. The CMS parity page notes that Medicaid managed care plans that contract with states must comply with certain parity requirements (${ext(S.cmsParity, "CMS")}). Of the services in our coverage, BetterHelp says it doesn't accept Medicaid, and Talkiatry says it doesn't take Medicaid (company statements checked November 6-8, 2026). For Talkspace and Headspace, check with your plan.</p>
<p>The most direct routes:</p>
<ul>
<li><strong>Call your Medicaid plan's member services</strong> (the number is on your card) and ask for in-network behavioral health providers who offer telehealth.</li>
<li><strong>Call the SAMHSA National Helpline</strong> at 1-800-662-4357. SAMHSA says it can ${ext(S.samhsaHelpline, "often refer you to facilities that charge on a sliding fee scale or accept Medicare or Medicaid")}, and if you have no insurance or are underinsured it will refer you to your state office responsible for state-funded treatment programs.</li>
<li><strong>Try a community health center.</strong> HRSA-funded health centers offer behavioral health care and must discount fees for patients on lower incomes; you can ${ext(S.hrsa, "search by ZIP code")} (link checked November 8, 2026, for our free and low-cost guide).</li>
</ul>
<h3>TRICARE</h3>
<p>BetterHelp's insurance page says TRICARE isn't accepted (${ext(S.betterhelpIns, "BetterHelp")}, checked November 8, 2026). If you're covered by TRICARE, ask TRICARE directly which mental health providers near you, or by telehealth, are in network, and confirm before a first visit, just as you would with a private plan.</p>
<h3>Veterans</h3>
<p>Veterans in crisis can dial 988 and press 1 for the Veterans Crisis Line, available 24/7 to all veterans and their supporters, even if they aren't registered with the VA or enrolled in VA health care, according to ${ext(S.nimhHelp, "NIMH")}. For ongoing care, NIMH points to the VA's online tool for finding VA locations and providers.</p>`,
    },
    {
      heading: "Can you get free therapy through an employee assistance program (EAP)?",
      body: `<p>Often, yes, and it's one of the most overlooked benefits at work. An employee assistance program (EAP) is, in ${ext(S.nimhHelp, "NIMH's words")}, a free and confidential service that your company pays for, which can help with issues related to mental health, drug or alcohol use, grief and trauma.</p>
<h3>How to find out if you have one</h3>
<ul>
<li>Search your benefits portal or employee handbook for "EAP" or "employee assistance".</li>
<li>Ask HR. You don't have to say why you're asking.</li>
<li>Check whether your benefits also include access to a specific platform. Talkspace partners with many EAPs, and some employers include Headspace's services in benefits, according to our reviews.</li>
</ul>
<h3>What an EAP usually gives you</h3>
<p>EAPs typically cover a limited number of counseling sessions at no cost to you, often by phone or video. Sessions are confidential from your manager. The exact number of sessions and the format are set by your employer's contract, so ask the EAP directly how many you have and whether they reset each year or for each new concern.</p>
<h3>How to use it well</h3>
<ol>
<li><strong>Use it early.</strong> A handful of free sessions is ideal for a focused problem, or to get your bearings before choosing longer-term care.</li>
<li><strong>Ask about next steps.</strong> If you need more than the EAP covers, the EAP counselor can often help you find in-network care under your health plan.</li>
<li><strong>Combine it.</strong> Some people use EAP sessions to start, then continue with the same platform under their insurance.</li>
</ol>
<p>Students have a similar door: NIMH notes that students may have access to mental health services through their school's health center or peer support groups.</p>`,
    },
    {
      heading: "How much does online therapy cost without insurance?",
      body: `<p>It depends on the service, the plan and where you live, and most platforms don't publish one national price. That's why we don't print self-pay prices we haven't verified. What we can do is explain how pricing works and how to get your real number in a few minutes.</p>
<h3>The three pricing models</h3>
<table><thead><tr><th>Model</th><th>How you pay</th><th>Examples in our coverage</th><th>Watch for</th></tr></thead><tbody>
<tr><td><strong>Subscription</strong></td><td>A recurring weekly or monthly fee for a bundle, often one live session a week plus messaging</td><td>BetterHelp self-pay; Talkspace self-pay</td><td>It bills whether or not you attend; know the renewal terms</td></tr>
<tr><td><strong>Insurance copay or coinsurance</strong></td><td>Your plan's cost share per visit</td><td>Talkiatry, Talkspace, BetterHelp (covered members), Headspace therapy</td><td>Deductibles; confirm you're in network</td></tr>
<tr><td><strong>App subscription</strong></td><td>A fee for self-guided content, no clinician</td><td>Headspace app</td><td>It's practice, not treatment</td></tr>
</tbody></table>
<h3>What we know about specific services</h3>
<ul>
<li><strong>BetterHelp</strong> self-pay varies by location and therapist availability; a financial-aid questionnaire can lower it, and first-month discounts are commonly offered. Covered members see copays cited from around $23 a session (our review, August 28, 2026; plan-specific). See <a href="/online-therapy/articles/how-much-does-betterhelp-cost">how much BetterHelp costs</a>.</li>
<li><strong>Talkspace</strong> offers self-pay; we haven't verified current rates, so check its site.</li>
<li><strong>Talkiatry</strong> is designed for insured patients and generally isn't the right fit without coverage.</li>
<li><strong>Headspace</strong> app pricing and therapy pricing are on its site; the app is HSA/FSA eligible, according to our review.</li>
</ul>
<h3>How to compare fairly</h3>
<p>Work out the price per live session you'll actually attend. A subscription that looks cheaper per month can cost more per session if you skip weeks, and a per-visit price can be better value if you only want sessions every other week. Ask too whether messaging, worksheets or group sessions are included, and what cancelling involves.</p>
<p>If you pay out of pocket for an out-of-network therapist, ask for a superbill and check whether your plan reimburses part of it. And if you have a health savings account (HSA) or flexible spending account (FSA), ask your plan administrator whether therapy qualifies. Our full guide to <a href="/online-therapy/articles/online-therapy-cost">online therapy cost</a> compares the models in more depth.</p>`,
    },
    {
      heading: "Where can you find free or low-cost therapy?",
      body: `<p>More places than most people realize. Free and low-cost care exists at every level, from crisis lines to sliding-scale clinics, and it's worth knowing these routes even if you end up paying for a platform.</p>
<table><thead><tr><th>Option</th><th>Cost</th><th>What it is</th><th>How to reach it</th></tr></thead><tbody>
<tr><td><strong>988 Suicide and Crisis Lifeline</strong></td><td>Free</td><td>24/7 support in any overwhelming moment</td><td>Call or text 988</td></tr>
<tr><td><strong>SAMHSA National Helpline</strong></td><td>Free</td><td>24/7 treatment referrals in English and Spanish, including sliding-scale and Medicaid options</td><td>1-800-662-4357, or text your ZIP code to 435748</td></tr>
<tr><td><strong>NAMI HelpLine</strong></td><td>Free</td><td>Information and referrals, Monday to Friday, 10am to 10pm ET</td><td>800-950-6264, or text "helpline" to 62640</td></tr>
<tr><td><strong>Employer EAP</strong></td><td>Free sessions</td><td>Counseling sessions your employer pays for</td><td>HR or your benefits portal</td></tr>
<tr><td><strong>Community health centers</strong></td><td>Sliding scale by income</td><td>HRSA-funded centers offering behavioral health care</td><td>Search by ZIP code</td></tr>
<tr><td><strong>University training clinics</strong></td><td>Reduced fees</td><td>Therapy from supervised graduate trainees</td><td>Local psychology or counseling departments</td></tr>
<tr><td><strong>Sliding-scale therapists</strong></td><td>Based on income</td><td>Private therapists who reduce fees for some clients</td><td>Ask directly</td></tr>
<tr><td><strong>Open Path Collective</strong></td><td>Reduced rates plus a membership</td><td>A nonprofit network of reduced-rate therapists</td><td>openpathcollective.org</td></tr>
</tbody></table>
<p>Sources: ${ext(S.samhsaHelpline, "SAMHSA National Helpline")} (checked November 9, 2026); ${ext(S.nami, "NAMI HelpLine")}, ${ext(S.hrsa, "HRSA health center finder")} and ${ext(S.openPath, "Open Path Collective")} (checked November 8, 2026 for our <a href="/online-therapy/articles/free-and-low-cost-therapy-options">free and low-cost therapy guide</a>); ${ext(S.nimhPsy, "NIMH on training clinics and sliding scales")}.</p>
<h3>Three tips that make a real difference</h3>
<ol>
<li><strong>Call SAMHSA's line if you don't know where to start.</strong> SAMHSA says the referral service is free and confidential, won't ask for personal information, and can refer people without insurance to the state office responsible for state-funded treatment.</li>
<li><strong>Ask about sliding scales.</strong> NIMH suggests that when talking with a prospective therapist, you ask about fees, whether they accept insurance, and ${ext(S.nimhPsy, "whether there is a sliding scale for fees according to income")}.</li>
<li><strong>Look at universities and local government.</strong> NIMH notes that many universities and medical schools run training clinics, and that your state or county health department website may list mental health programs.</li>
</ol>
<p>Group therapy, led by a licensed clinician, usually costs less than individual sessions and is a legitimate treatment in its own right. Free peer-support groups, such as those run by local NAMI affiliates, can add support between sessions.</p>`,
    },
    {
      heading: "Is there online therapy available 24/7?",
      body: `<p>Not in the sense of a therapist on call around the clock. What some platforms offer at any hour is access: you can open the app, write to your therapist, book or move a session, or do an exercise at 2 a.m. Live sessions are still scheduled, and replies to messages aren't instant. For immediate human support at any hour, the service is 988.</p>
<h3>What "24/7" usually means on a platform</h3>
<ul>
<li><strong>Messaging any time.</strong> Talkspace describes its app-based format as 24/7 access to your therapy room; BetterHelp includes messaging between sessions. You write when it suits you, and your therapist replies later.</li>
<li><strong>Booking any time.</strong> Many services let you schedule or reschedule online whenever you like.</li>
<li><strong>Self-guided tools.</strong> Worksheets, journals and apps such as Headspace are there whenever you are. NIMH lists around-the-clock support among the potential advantages of mental health apps.</li>
</ul>
<h3>When you need someone right now</h3>
<p>SAMHSA describes the 988 Lifeline as providing ${ext(S.samhsa988, "24/7, free and confidential support")} to people in suicidal crisis or emotional distress, by call, text or chat. The SAMHSA National Helpline is open 24/7, 365 days a year, for treatment referrals. Neither requires an account, an insurance card or an appointment.</p>
<h3>Booking quickly</h3>
<p>If what you mean by 24/7 is "I want to start soon", that's a fair ask. NIMH notes that telehealth appointments can often be scheduled with less notice and at more flexible hours than in-person care, and BetterHelp says matching can take as little as 2 days.</p>`,
    },
    {
      heading: "How do you choose the right therapist?",
      body: `<p>Look for three things: the right qualifications for what you need, an approach that fits your concern, and a person you feel comfortable with. The last one matters most. NIMH says ${ext(S.nimhPsy, "rapport and trust are essential")}, because discussions in therapy are deeply personal.</p>
<h3>Questions NIMH suggests asking</h3>
<ul>
<li>What are your credentials and experience? Do you have a specialty?</li>
<li>What approach will you use, and why? What's the evidence for it?</li>
<li>Have you treated people my age with this specific concern?</li>
<li>What are the goals of therapy? Is there a time frame or number of sessions? How will we know if it's working?</li>
<li>Are medications an option? Can you prescribe?</li>
<li>Are sessions confidential, and what are the limits?</li>
</ul>
<p>NIMH's ${ext(S.nimhHelp, "find-help page")} adds a few practical ones: How do you usually treat someone with my issue? How long do you expect treatment to last? Do you accept my insurance? How much will it cost?</p>
<h3>Things you can ask a platform for</h3>
<ul>
<li><strong>A therapist with a specific focus</strong>, such as anxiety, trauma, grief, LGBTQ+ experience, faith, or a particular culture or language.</li>
<li><strong>A particular approach</strong>, such as CBT.</li>
<li><strong>Practical fit:</strong> a time zone, evening sessions, or a preference for a therapist of a particular gender.</li>
</ul>
<p>Say these in your intake answers. Matching works better with more information.</p>
<h3>Give it a fair chance, then trust your gut</h3>
<p>A first session can feel awkward even with a great therapist. After two or three sessions, ask yourself: do I feel heard? Do I understand what we're working on? Do I leave with something to try? If the answer is no, it's fine to switch, and NIMH says that if you've been in therapy for what feels like a reasonable time and aren't getting better, talk to your therapist and consider other professionals or approaches.</p>
<p>NIMH's ${ext(S.nimhTele, "telehealth fact sheet")} adds one more idea: consider a provider who offers a free introductory session, so you can decide whether you're a good match before committing.</p>`,
    },
    {
      heading: "What happens in your first online therapy session?",
      body: `<p>Mostly, getting to know each other. The first session is usually an assessment: your therapist asks what brings you in, what you'd like to be different, and a few questions about your history and safety. You'll also agree how you'll work together. You don't need to prepare a speech; "I'm not sure where to start" is a perfectly good opening.</p>
<h3>What to expect</h3>
<ul>
<li><strong>Questions about your symptoms and goals.</strong> The NHS describes the CBT assessment the same way: the therapist ${ext(S.nhsCbt, "asks about your symptoms and what you hope to get from treatment")}, then recommends a type of therapy.</li>
<li><strong>Questions about safety.</strong> Many clinicians ask whether you've had thoughts of harming yourself; NIMH notes that even in primary care you may be asked about thoughts of suicide. It's a standard question, and an honest answer helps them help you.</li>
<li><strong>The practical rules.</strong> How sessions work, how to message, what happens if you miss one, and the limits of confidentiality.</li>
<li><strong>A plan.</strong> By the end of the first session or two, you should have a rough sense of what you're working on and how often you'll meet.</li>
</ul>
<h3>How to prepare</h3>
<p>NIMH's ${ext(S.nimhTips, "tips for talking with a health care provider")} work well here:</p>
<ol>
<li><strong>Write down what you want to discuss</strong>, including any questions.</li>
<li><strong>List your medications</strong>, including over-the-counter drugs, herbal remedies, vitamins and supplements.</li>
<li><strong>Think about family history.</strong> NIMH notes that certain mental illnesses tend to run in families.</li>
<li><strong>Be honest and specific</strong> about when symptoms started, how severe they are and how often they happen, and mention any major stresses or changes.</li>
<li><strong>Ask questions</strong>, and say so if a suggestion doesn't feel right.</li>
</ol>
<h3>Tech check</h3>
<p>Ten minutes before, test your camera, microphone and connection, close other apps, charge your device, and find your private spot. Keep a glass of water and something to write on nearby. Agree with your therapist early on what you'll do if the connection fails, for example rejoining or switching to a phone call.</p>`,
    },
    {
      heading: "How can you get the most out of online therapy?",
      body: `<p>Show up consistently, do the work between sessions, and be honest with your therapist about what is and isn't helping. Those habits matter more than any feature a platform offers.</p>
<h3>Practical habits that help</h3>
<ul>
<li><strong>Protect the slot.</strong> Treat sessions like any other important appointment. If the subscription bills weekly, unused weeks are wasted money as well as missed care.</li>
<li><strong>Practice between sessions.</strong> For CBT, the NHS is clear that practising what you've learned between sessions is important for it to work.</li>
<li><strong>Keep brief notes.</strong> Jot down moments during the week that you'd like to talk about. They make sessions more focused.</li>
<li><strong>Use messaging wisely.</strong> It's good for sharing a thought record or a quick update, not for anything urgent.</li>
<li><strong>Give feedback.</strong> Tell your therapist if something isn't working, if the pace feels wrong, or if you'd like a different approach. Good therapists welcome it.</li>
<li><strong>Plan for the end.</strong> The NHS notes that after CBT finishes, it's important to keep using the skills you've learned, and your therapist will usually help you plan how.</li>
</ul>
<h3>Pair it with a daily habit if it helps</h3>
<p>Some people find a mindfulness, sleep or mood-tracking app useful between sessions. NIMH lists "support" among the potential advantages of apps: complementing traditional therapy by reinforcing new skills and providing support and monitoring. Tell your therapist what you're using so they can build on it.</p>
<h3>Keep track of the admin</h3>
<p>If you use insurance, save your eligibility confirmation and check that claims post after each visit. If you're on a subscription, note the renewal date. Admin problems are the most common frustration with online care, and a little record-keeping prevents most of them.</p>`,
    },
    {
      heading: "What if your therapist isn't the right fit, and how do you switch?",
      body: `<p>Switch. It's normal, it isn't rude, and online platforms are designed to make it easy. A poor fit is one of the most common reasons therapy stalls, and finding the right person is worth a couple of tries.</p>
<h3>Signs it may be time to change</h3>
<ul>
<li>You don't feel heard or understood after a few sessions.</li>
<li>You're not clear what you're working on.</li>
<li>Their approach doesn't suit your concern, or you'd like a specialist.</li>
<li>Practical issues keep getting in the way: frequent cancellations, slow replies, timing.</li>
</ul>
<h3>How switching works on the platforms</h3>
<p>BetterHelp lets you switch therapists at any time at no extra cost, according to our review. Talkspace matches you rather than letting you browse profiles, so ask its support team how to request a different therapist. With insurance-billed practices such as Talkiatry, ask the practice directly about changing clinicians. With any service, you don't have to explain at length; "I'd like to try someone with a different style" is enough.</p>
<h3>Switching platforms</h3>
<p>If the platform itself isn't working for you, perhaps because you now need medication or your insurance changed, you can move. Ask your current therapist for a short summary to share with the new one, or request your records. If you're on medication, line up your new prescriber before your current supply runs low, and never stop or change a medication without talking to a prescriber. Our <a href="/online-therapy/articles/how-to-choose-an-online-therapy-platform">platform-choice guide</a> helps you pick the next one.</p>
<h3>Cancelling cleanly</h3>
<p>Cancel through your account settings before the next billing date, save the confirmation, and check your statement afterwards. If you paid for an annual plan or prepaid weeks, ask about the refund policy before you cancel.</p>`,
    },
    {
      heading: "Can teens and couples use online therapy?",
      body: `<p>Yes. Both are common, with a few extra considerations.</p>
<h3>Couples</h3>
<p>Both BetterHelp and Talkspace offer couples therapy, according to our reviews: BetterHelp routes couples through its sister platform, and Talkspace offers couples plans on its main platform. Online sessions remove the hardest part of couples counseling, getting two busy people into one office at the same hour, and partners can even join from different places. Check whether your insurance covers couples sessions specifically; individual-therapy coverage doesn't always extend to them. Couples therapy is usually not the right starting point when there are safety concerns between partners; individual support comes first. Our <a href="/online-therapy/articles/online-couples-therapy">online couples therapy guide</a> covers the options.</p>
<h3>Teens</h3>
<p>Talkspace offers teen therapy, and BetterHelp offers teen counseling through a sister platform, according to our reviews. Ask at the start how consent works for your teen and what the therapist will and won't share with parents. NIMH suggests asking any therapist whether they have experience with the specific age group and, for a child, how parents or caregivers will be involved in treatment (${ext(S.nimhPsy, "NIMH")}).</p>
<p>NIMH's ${ext(S.nimhHelp, "find-help page")} also points students to their school's health center and peer support groups. For a younger child, a pediatrician or primary care provider is a good first stop.</p>
<p>One caution for families: be wary of consumer chatbots and unvetted apps for young people. NIMH says most apps don't have peer-reviewed research behind their claims, and our <a href="/online-therapy/articles/ai-therapy-chatbots-vs-online-therapy">guide to AI therapy chatbots</a> explains why a licensed clinician should be the one providing care.</p>`,
    },
    {
      heading: "Should you use a mental health app or an AI chatbot instead?",
      body: `<p>Use them alongside a clinician, not instead of one, if you need treatment. Apps can be genuinely helpful for daily habits, skills practice and the hours between sessions. They aren't the same as therapy, and most haven't been tested the way therapy has.</p>
<h3>What NIMH says about apps</h3>
<p>NIMH's page on ${ext(S.nimhTech, "technology and mental health treatment")} lists real advantages: convenience, anonymity, a gentle introduction to care, lower cost, around-the-clock availability, and support between therapy sessions. It also lists the open questions: whether an app is backed by evidence, whether it works for everyone it's meant for, how it protects privacy, and whether it promises more than it delivers. It says there are no national standards for evaluating mental health apps, and that people should be cautious about trusting one.</p>
<h3>Self-guided apps vs guided internet CBT</h3>
<p>The research on internet CBT mostly involves programs with a therapist's guidance. The 2014 meta-analysis that found internet CBT equivalent to face-to-face CBT looked specifically at <em>guided</em> programs (${ext(S.andersson, "World Psychiatry")}). An app with no human involvement is a different thing, and NIMH suggests deciding whether you want a fully automated app or one that offers contact with a trained professional.</p>
<h3>AI chatbots</h3>
<p>General-purpose chatbots weren't built to provide therapy, and several US states now restrict offering AI therapy without a licensed professional. Our full guide, <a href="/online-therapy/articles/ai-therapy-chatbots-vs-online-therapy">AI therapy chatbots vs online therapy</a>, covers the evidence and the laws. The short rule: a chatbot can help with journaling or practicing a skill your therapist taught you; it should never be your crisis plan, your diagnosis or your medication adviser.</p>
<p>If you like the app route, Headspace is the best-known meditation and sleep app in our coverage, and our <a href="/online-therapy/reviews/headspace">Headspace review</a> explains where it fits next to therapy.</p>`,
    },
    {
      heading: "How do you get started with online therapy today?",
      body: `<p>Here's the whole guide as a checklist you can work through in an afternoon.</p>
<ol>
<li><strong>Check your safety.</strong> If you're in crisis, stop here and call or text 988, or call 911 if you're in danger.</li>
<li><strong>Decide what you need:</strong> therapy, psychiatry or both. If you're unsure, start with therapy or ask your primary care provider. See <a href="/online-therapy/articles/therapy-vs-psychiatry">therapist vs psychiatrist</a>.</li>
<li><strong>Check free routes first:</strong> your employer's EAP, a student health center, and the options in our <a href="/online-therapy/articles/free-and-low-cost-therapy-options">free and low-cost guide</a>.</li>
<li><strong>Check your coverage.</strong> Run the eligibility checks at the platforms that interest you, and call your insurer. On Medicare, read <a href="/online-therapy/articles/does-medicare-cover-online-therapy">our Medicare guide</a> before open enrollment ends on December 7, 2026.</li>
<li><strong>Pick a format</strong> you'll keep up: video, phone, chat or messaging.</li>
<li><strong>Choose a platform</strong> using the comparison above and our <a href="/online-therapy">online therapy comparison</a>.</li>
<li><strong>Read the privacy policy</strong> and switch off optional data sharing.</li>
<li><strong>Prepare for session one</strong> with a short list of what you want to talk about and your medications.</li>
<li><strong>Give it three sessions</strong>, then decide whether to continue, switch therapists, or change approach.</li>
<li><strong>Keep records</strong> of coverage confirmations, claims and renewal dates.</li>
</ol>
<p>Starting is often the hardest part, especially when you're anxious or low on energy. If the whole list feels like too much, do only step one and step four today. That's enough.</p>`,
    },
    {
      heading: "The bottom line",
      body: `<p>Online therapy and online psychiatry are now ordinary, legitimate ways to get mental health care in the US. The research that compares them directly with in-person care finds similar results for many common problems, especially for structured therapies like CBT, and NIMH says virtual care can be effective for anxiety, ADHD, bipolar disorder, depression and PTSD. The limits are real too: crises, severe and complex illness, and some medications need more than a weekly video call.</p>
<p>The choice comes down to what you need and how you'll pay. For flexible talk therapy, <a href="/online-therapy/reviews/betterhelp">BetterHelp</a> is built for quick matching and easy switching. For therapy with psychiatry available, especially with insurance or an EAP, <a href="/online-therapy/reviews/talkspace">Talkspace</a> fits. For medication-centered care with insurance, <a href="/online-therapy/reviews/talkiatry">Talkiatry</a> is psychiatrist-led. For a daily stress and sleep habit, <a href="/online-therapy/reviews/headspace">Headspace</a> is a good companion to any of them. Check your EAP and insurance before paying cash, read the privacy policy, and give your first therapist a fair chance before deciding whether to switch.</p>
<p>If you're struggling right now, call or text 988, the Suicide and Crisis Lifeline, free and open 24/7; veterans can press 1. If anyone is in immediate danger, call 911. Online therapy is not an emergency service.</p>
<p><em>Sources last checked November 9, 2026, unless another date is given. This guide is general information, not medical advice. Decisions about diagnosis, therapy and medication belong with a licensed clinician.</em></p>`,
    },
  ],
};
