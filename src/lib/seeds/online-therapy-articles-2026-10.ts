import type { ArticleData } from "../config";

// ───── Online-therapy guides written for treatmentshub.com/online-therapy, Oct 28, 2026 ─────
// AI therapy chatbots against licensed online therapy: the one randomised
// trial, the state laws, the regulator's attention and the practical line.
// Legal provisions link the law-firm summaries of the statutes; the trial
// links the university's announcement and the journal.

const ext = (href: string, text: string) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const S = {
  dartmouth: "https://home.dartmouth.edu/news/2025/03/first-therapy-chatbot-trial-yields-mental-health-benefits",
  geisel: "https://geiselmed.dartmouth.edu/news/2025/the-first-trial-of-generative-ai-therapy-shows-it-might-help-with-depression-mit-technology-review/",
  hklaw: "https://www.hklaw.com/en/insights/publications/2025/08/new-illinois-law-restricts-use-of-ai-in-mental-health-therapy",
  orrick: "https://www.orrick.com/en/Insights/2025/08/Illinois-Enacts-Law-Regulating-AI-with-Sweeping-Implications-for-Behavioral-Health-Delivery",
  bloomberg: "https://news.bloomberglaw.com/health-law-and-business/ai-therapy-chatbots-spur-states-to-act-over-patient-safety-fears",
  apa: "https://www.apaservices.org/practice/business/technology/on-the-horizon/protecting-from-unlicensed-therapy",
  openTrial: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12303582/",
  lifeline: "https://988lifeline.org/",
};

export const ONLINE_THERAPY_ARTICLES_2026_10: ArticleData[] = [
  {
    slug: "ai-therapy-chatbots-vs-online-therapy",
    title: "AI Therapy Chatbots vs Online Therapy: Evidence & Laws 2026",
    description:
      "The one randomised trial of a generative AI therapist, the state laws banning unlicensed AI therapy, what chatbots can safely do, and when you need a therapist.",
    category: "Advice",
    readTime: "14 min read",
    publishedAt: "2026-10-28",
    updatedAt: "2026-10-28",
    heroColor: "#EEEEF6",
    author: "Treatments Hub Research Team",
    keyTakeaways: [
      "One randomised trial of a purpose-built generative AI therapist exists: Dartmouth's Therabot, published in NEJM AI in March 2025. It reported an average 51% reduction in depression symptoms over eight weeks against a waitlist, with clinicians monitoring every exchange. That is a promising first result from the tool's own developers, not proof that chatbots replace therapists.",
      "The law has moved faster than the evidence. Illinois banned AI from providing therapy without a licensed professional in August 2025, with fines up to $10,000 per violation; Nevada and Utah passed laws the same year and Tennessee, Colorado and Maine followed. General-purpose chatbots fall through the gaps, which is exactly where most people are using them.",
      "A chatbot is reasonable for skills practice, journaling, psychoeducation and the hours a therapist is not available. It is not for diagnosis, crisis, trauma processing, eating disorders, psychosis or anything involving medication, and a chatbot that does not hand off a suicidal user to a human is dangerous.",
      "The practical model that works in 2026 is a licensed online therapist as the clinician of record, with a vetted app for between-session practice. Our platform reviews cover the first half; nothing on the market yet replaces it.",
    ],
    sections: [
      {
        heading: "Can an AI chatbot replace online therapy?",
        body: `<div class="qa"><strong>Key takeaways and quick verdict</strong><p>Not yet, and the one trial that tested a purpose-built AI therapist did not claim it could. Dartmouth's Therabot reduced depression and anxiety symptoms against a waitlist in an eight-week trial of 210 people, with clinicians reviewing the chatbot's messages; it is the strongest evidence that exists and it is early, small and developer-run. Meanwhile Illinois, Nevada, Utah and other states have made it illegal to offer AI therapy without a licensed professional, and the FDA's advisory committee has flagged worsening symptoms and self-harm as risks. The sensible use of a chatbot is as a tool alongside a licensed therapist, for practice and the hours between sessions, never as the clinician. Sources: ${ext(S.dartmouth, "Dartmouth, March 2025")}; ${ext(S.hklaw, "Illinois law summary, Holland & Knight, August 2025")}, checked October 28, 2026.</p></div>
<p>More people now tell a chatbot about their depression than tell a therapist, because the chatbot is free, awake at 3 a.m., and never looks disappointed. That is not a moral failing of the people doing it; it is a market signal about access and cost that the therapy industry has not answered. It is also a safety problem, because the chatbots most people use were not built for the job, and a growing body of reporting describes harms when they are pressed into it. This guide sets out what has actually been tested, what the law now says, what a chatbot can safely do, and how to combine one with a licensed online therapist without pretending the two are the same thing.</p>`,
      },
      {
        heading: "The evidence: one randomised trial, and what it showed",
        body: `<p>Until 2025 the evidence for AI therapy consisted of small studies of rule-based apps, the scripted chatbots that follow a decision tree, and no controlled trial of a generative model holding an open conversation. Dartmouth's Therabot trial changed that. Published in NEJM AI on March 27, 2025, it randomised 210 adults with symptoms of depression, generalised anxiety or risk of an eating disorder to use the chatbot for eight weeks or to a waitlist. The generative model was trained by the researchers on evidence-based psychotherapy, and every exchange was monitored by clinicians who could intervene. As reported by the university, participants with depression saw an average 51% reduction in symptoms, those with anxiety about 31%, and those at risk of an eating disorder a reduction in body-image concerns; participants reported a working alliance with the chatbot comparable to what is reported for human therapists. Sources: ${ext(S.dartmouth, "Dartmouth News, March 2025")}; ${ext(S.geisel, "Geisel School of Medicine, 2025")}, checked October 28, 2026.</p>
<h3>Reading the result</h3>
<p>Three features of the trial limit what it can be taken to mean. The comparison was a waitlist, not a therapist, so the trial shows that the chatbot beat doing nothing, not that it matched a clinician. The chatbot was supervised: humans read the conversations and stepped in, which is the opposite of how a consumer app is used. And the trial was run by the tool's own designers. None of this makes the result wrong. It makes it a first result, of the kind that justifies larger trials, not a licence to replace care. An open trial of a different generative chatbot in college students, published in 2025, reported engagement and symptom change without a control group at all. Source: ${ext(S.openTrial, "open trial, 2025")}, checked October 28, 2026.</p>
<table>
<thead><tr><th></th><th>Licensed online therapy</th><th>Purpose-built AI therapist (Therabot-type)</th><th>General chatbot used as a therapist</th></tr></thead>
<tbody>
<tr><td>Evidence</td><td>Decades of trials; comparable to in-person for common conditions (see our evidence guide)</td><td>One randomised trial against a waitlist, 2025, supervised</td><td>None; case reports of harm</td></tr>
<tr><td>Diagnosis and treatment plan</td><td>Yes, by a licensed clinician</td><td>No; symptom support only</td><td>No, and it will produce one anyway if asked</td></tr>
<tr><td>Crisis handling</td><td>Trained; duty to act</td><td>Built-in escalation with human monitoring in the trial</td><td>Variable; documented failures</td></tr>
<tr><td>Medication</td><td>Via psychiatry on the platform</td><td>No</td><td>No, and may give drug information</td></tr>
<tr><td>Availability</td><td>Scheduled, with messaging between sessions on most platforms</td><td>24 hours</td><td>24 hours</td></tr>
<tr><td>Privacy</td><td>HIPAA-covered on reputable platforms</td><td>Research protocol</td><td>Consumer terms; conversations may train the model</td></tr>
<tr><td>Legal status (2026)</td><td>Licensed</td><td>Research; not a licensed provider</td><td>Illegal to offer as therapy in several states</td></tr>
<tr><td>Cost</td><td>Subscription or per session; see our cost guide</td><td>Free in the trial; no product</td><td>Free or app subscription</td></tr>
</tbody>
</table>`,
      },
      {
        heading: "The law caught up first: Illinois, Nevada, Utah and the rest",
        body: `<p>On August 1, 2025, Illinois enacted the Wellness and Oversight for Psychological Resources Act, the first state law aimed squarely at AI therapy. It prohibits offering therapy or psychotherapy services to the public unless a licensed professional provides them, and it applies that prohibition to AI systems that make recommendations about the diagnosis, treatment or improvement of a person's mental or behavioural health. Licensed clinicians may still use AI for administrative work and for supplementary support, but not to make therapeutic decisions or to communicate with clients in a therapeutic role without review. Violations carry civil penalties of up to $10,000 each, enforced by the state's financial and professional regulation department. Sources: ${ext(S.hklaw, "Holland & Knight, August 2025")}; ${ext(S.orrick, "Orrick, August 2025")}, checked October 28, 2026.</p>
<p>Nevada's AB 406 and a Utah law passed the same year with similar aims, and Bloomberg Law reported in 2026 that Tennessee, Colorado and Maine had enacted their own measures. The American Psychological Association, which lobbied for the Illinois law, has also said publicly that it does not go far enough, because it reaches purpose-built "therapy" products and leaves general-purpose chatbots, the ones most people actually confide in, largely untouched. That gap is the central fact of 2026: the products with the most users are the least regulated and the least tested. Sources: ${ext(S.bloomberg, "Bloomberg Law, 2026")}; ${ext(S.apa, "APA Services: protecting the public from unlicensed therapy")}, checked October 28, 2026.</p>
<p>Federal attention has followed. The FDA's Digital Health Advisory Committee met in November 2025 to consider generative AI mental health devices and, as reported, flagged worsening symptoms and self-harm among the risks a regulatory framework would need to address. No framework had been issued when we checked. Readers in states with these laws should know that a platform offering "AI therapy" without a licensed human in the loop is operating outside the law there, which is a reasonable thing to ask any platform about.</p>`,
      },
      {
        heading: "What can an AI chatbot safely do for mental health, and what can it not?",
        body: `<p>The evidence and the law point to the same division of labour, and it is worth stating as a list rather than a mood.</p>
<h3>Reasonable uses</h3>
<ul>
<li><strong>Skills practice between sessions.</strong> Rehearsing a thought record, a breathing exercise or a behavioural experiment a therapist assigned. This is what the scripted CBT apps were built for and what the Therabot trial essentially delivered.</li>
<li><strong>Journaling and reflection.</strong> A structured prompt to write about the day is useful, and a chatbot is a patient prompt.</li>
<li><strong>Psychoeducation.</strong> Explaining what a panic attack is, what CBT involves, what to expect from an SSRI, at the level of a good pamphlet; our guide to <a href="/online-therapy/articles/types-of-therapy">types of therapy</a> covers the same ground with sources.</li>
<li><strong>The 3 a.m. hours</strong>, for someone already in therapy, as a bridge to the next session and not as a substitute for a crisis line.</li>
</ul>
<h3>Not for</h3>
<ul>
<li><strong>Diagnosis.</strong> A chatbot will produce a diagnosis if asked and it will be confident; it has no licence, no history and no exam.</li>
<li><strong>Crisis.</strong> Anyone thinking about suicide or self-harm needs a human now. In the US the 988 Suicide and Crisis Lifeline answers calls and texts; a chatbot that keeps talking instead of handing off is a hazard, and this failure has been documented. Source: ${ext(S.lifeline, "988 Lifeline")}.</li>
<li><strong>Trauma processing, eating disorders, psychosis, bipolar disorder, substance dependence.</strong> These need a clinician, often a specialised one, and sometimes medication.</li>
<li><strong>Medication decisions.</strong> Starting, stopping or changing a psychiatric drug is a prescriber's job; our guide to <a href="/online-therapy/articles/online-therapy-with-medication">online therapy with medication</a> covers how that works on the platforms.</li>
<li><strong>Children and adolescents,</strong> where the consumer products have no evidence and the documented harms are concentrated.</li>
</ul>`,
      },
      {
        heading: "What people say about chatbots and about online therapy: the sentiment pattern",
        body: `<p>We capture customers' public reviews of the online therapy platforms we rank and quote them on the review pages, and we read the public discussion of chatbot therapy on Reddit for our <a href="/online-therapy/articles/online-therapy-reddit">online therapy according to Reddit</a> guide. The two conversations are almost mirror images. Platform reviewers praise or condemn a specific human: the therapist who listened, the therapist who cancelled twice, the matching process that took three tries. Their complaints are about scheduling, billing and therapist turnover, and their praise is about the relationship. Chatbot users praise availability, patience and the absence of judgement, and their complaints are about repetition, forgetting, and, in the serious cases, responses that were wrong or dangerous when the user was in distress.</p>
<p>The pattern suggests what each is for. The platform complaints are logistics problems around something that works; the chatbot complaints are the absence of the thing itself. The reviews of <a href="/online-therapy/reviews/betterhelp">BetterHelp</a>, <a href="/online-therapy/reviews/talkspace">Talkspace</a> and <a href="/online-therapy/reviews/talkiatry">Talkiatry</a> set out what each platform's customers report about the human side, and <a href="/online-therapy/articles/does-online-therapy-work">whether online therapy works</a> covers the evidence that the human side carries.</p>`,
      },
      {
        heading: "How do you combine a chatbot with online therapy safely?",
        body: `<ol>
<li><strong>Make a licensed clinician the clinician of record.</strong> Diagnosis, the treatment plan and any medication come from a human. Our guide to <a href="/online-therapy/articles/how-to-choose-an-online-therapy-platform">choosing an online therapy platform</a> and the <a href="/online-therapy">platform ranking</a> cover the options, and <a href="/online-therapy/articles/online-therapy-that-takes-insurance">which platforms take insurance</a> covers cost.</li>
<li><strong>Tell the therapist you use a chatbot</strong>, and what for. Most will be fine with skills practice and curious about the transcripts.</li>
<li><strong>Prefer a purpose-built tool to a general chatbot</strong> for anything mental-health related, and check whether it says what it does in a crisis before you need to know.</li>
<li><strong>Read the privacy terms once.</strong> A therapy platform is bound by HIPAA; a consumer chatbot is bound by its terms of service, which may allow your conversations to be stored and used.</li>
<li><strong>Set a rule for the bad nights:</strong> if the thought of harming yourself appears, the chatbot closes and 988 opens. Write it down while you are well.</li>
</ol>`,
      },
      {
        heading: "Who should not rely on an AI therapy chatbot?",
        body: `<ul>
<li><strong>Anyone in crisis.</strong> Call or text 988 in the US, or go to an emergency department. No chatbot and no online platform is an emergency service.</li>
<li><strong>Anyone hoping a chatbot will replace a therapist they cannot afford.</strong> The evidence does not support it. Our guide to <a href="/online-therapy/articles/free-and-low-cost-therapy-options">free and low-cost therapy options</a> lists the human routes that exist.</li>
<li><strong>Parents looking for a tool for a child or teenager.</strong> The consumer products have no evidence in minors and the documented harms are concentrated there.</li>
<li><strong>People with conditions that need a specialist:</strong> eating disorders, psychosis, bipolar disorder, PTSD, substance dependence.</li>
</ul>`,
      },
      {
        heading: "Final verdict and next steps",
        body: `<p>The honest position in late 2026 is that AI therapy has one good trial, several new laws and no product that a careful clinician would hand a patient in place of care. The same honesty cuts the other way: licensed online therapy is effective, and it is too expensive and too slow for many of the people now talking to chatbots instead. The answer is not to shame them; it is to make the human care easier to reach and to use the machines for what they are good at, which is practice, patience and the hours in between.</p>
<ol>
<li><strong>If you are using a chatbot for your mental health now:</strong> keep doing the parts that help, add a licensed therapist as the clinician of record, and set the crisis rule above.</li>
<li><strong>If you are choosing a platform:</strong> our <a href="/online-therapy">ranking</a> compares them on therapist credentials, matching, messaging and cost, and <a href="/online-therapy/articles/online-therapy-cost">online therapy cost</a> sets out what each charges.</li>
<li><strong>If a platform advertises AI therapy:</strong> ask whether a licensed clinician reviews the care, and whether the service is lawful in your state.</li>
<li><strong>Watch for the next trial.</strong> A head-to-head comparison of a supervised AI therapist against a human therapist is the study that would change this guide, and it has not been run.</li>
</ol>
<h3>References and further reading</h3>
<ul>
<li>${ext(S.dartmouth, "Dartmouth: First therapy chatbot trial yields mental health benefits (Therabot, NEJM AI, March 2025)")}; ${ext(S.geisel, "Geisel School of Medicine summary")}.</li>
<li>${ext(S.hklaw, "Holland & Knight: New Illinois law restricts use of AI in mental health therapy, August 2025")}; ${ext(S.orrick, "Orrick: Illinois enacts law regulating AI in behavioral health, August 2025")}.</li>
<li>${ext(S.bloomberg, "Bloomberg Law: AI therapy chatbots spur states to act over patient safety fears")}.</li>
<li>${ext(S.apa, "APA Services: protecting the public from unlicensed therapy")}.</li>
<li>${ext(S.openTrial, "Generative AI mental wellness chatbot for college students: open trial, 2025")}.</li>
<li>${ext(S.lifeline, "988 Suicide and Crisis Lifeline")}.</li>
</ul>
<p><em>This article is general information, not medical advice. If you are in crisis, contact 988 (US) or local emergency services. Decisions about diagnosis, therapy and medication belong to licensed clinicians.</em></p>`,
      },
    ],
  },
];
