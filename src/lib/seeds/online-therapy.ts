import type {
  SiteConfig,
  Provider,
  ReviewData,
  BattleData,
  ArticleData,
  FaqItem,
} from "../config";

// ─────────────────────────────────────────────────────────────────────────────
// Online Therapy vertical
//
// Operator-chosen roster (Aug 28): BetterHelp, Talkspace, Headspace, Talkiatry.
//
// House rules, same as every vertical: real platforms with truthful, general
// descriptions and NO invented data - no fabricated prices, Trustpilot scores,
// session counts or clinical claims. Where we haven't verified a platform's
// published pricing, the copy says so and points to the platform's site. All
// reviews index (Aug 2026 operator policy); affiliate links and verified
// pricing get filled in as partnerships come online.
//
// Extra care for this vertical: mental-health content is YMYL at its most
// sensitive. Every crisis-adjacent surface points to the 988 Suicide & Crisis
// Lifeline (call or text 988 in the US), and nothing here diagnoses, promises
// outcomes, or discourages in-person care.
// ─────────────────────────────────────────────────────────────────────────────

const UPDATED = "2026-08-28";
const PRICING_TBD =
  "We haven't verified this platform's current published pricing yet - subscription rates, per-session fees and insurance arrangements change, so check the platform's site for current numbers. This page will carry exact verified prices once we've confirmed them.";

const providers: Provider[] = [
  {
    id: "betterhelp",
    name: "BetterHelp",
    tagline: "The largest online therapy platform - subscription talk therapy with live sessions and messaging",
    logo: "/logos/betterhelplogo.png",
    smallLogo: "/logos/betterhelplogo.png",
    highlights: [
      "Now accepts insurance - copays from around $23/session for covered members",
      "Match with a licensed therapist in as little as 2 days",
      "Switch therapists or cancel anytime",
    ],
    // Direct site link until an affiliate link exists - CTAs must work.
    affiliateUrl: "https://www.betterhelp.com",
    ctaText: "Visit Site",
    trustpilotRating: "3.9",
    trustpilotReviewCount: "9,652",
    // Verified from the operator's Trustpilot screenshots (claimed profile,
    // Aug 2026). A fourth captured review (Christy Lang) claimed BetterHelp
    // "works with your insurance" - factually wrong (BetterHelp takes no
    // insurance), so it is deliberately not displayed to avoid misleading.
    trustpilotReviews: [
      {
        title: "Affordable, Accessible Mental Health Care",
        text: "BetterHelp makes good-quality mental health care accessible and affordable. You can receive therapy online in whichever way you'd prefer, and financial aid is available. I have been using it for a few months, and it has really helped me. I have attended webinars, used wellness tools, and attended weekly therapy sessions with an excellent therapist. I highly recommend BetterHelp.",
        name: "Joan K.",
        location: "US",
        rating: 5,
        date: "Aug 25, 2026",
      },
      {
        title: "Wonderful community",
        text: "It was very easy to get my first appointment and to find a qualified and amazing therapist. The connectivity is easy, the sessions are wonderful, my therapist is the best and has helped me tremendously, and I think that BetterHelp is definitely a wonderful place to find the help that you need when you're looking for a therapist. My therapist is in Florida and I live in Maryland and I'm so glad that I was connected with her.",
        name: "Anonymous",
        location: "US",
        rating: 5,
        date: "Aug 18, 2026",
      },
      {
        title: "BetterHelp has been a wonderful resource",
        text: "BetterHelp has been a wonderful resource for me. It has helped me through many different situations by providing support, guidance, and useful tools. The classes are excellent and have given me valuable insights and strategies to improve my well-being and handle life's challenges more effectively.",
        name: "Donna Alexander",
        location: "US",
        rating: 5,
        date: "Aug 18, 2026",
      },
    ],
  },
  {
    id: "talkspace",
    name: "Talkspace",
    tagline: "Online therapy and psychiatry that many major insurance plans cover",
    logo: "/logos/talkspacelogo.png",
    smallLogo: "/logos/talkspacelogo.png",
    highlights: [
      "Most insured members pay a $0 copay (per Talkspace)",
      "Therapy and psychiatry (medication management) on one platform",
      "App-based care with 24/7 access - sessions plus messaging",
    ],
    // Direct site link until an affiliate link exists - CTAs must work.
    affiliateUrl: "https://www.talkspace.com",
    ctaText: "Visit Site",
    trustpilotRating: "4.4",
    trustpilotReviewCount: "2,370",
    // Verified from the operator's Trustpilot screenshots (claimed profile,
    // Aug 2026). All four captured reviews carry Trustpilot's "Invited" tag
    // (company-invited), noted here for the record.
    trustpilotReviews: [
      {
        title: "I've had multiple therapists... this one is the best!",
        text: "I've had multiple therapists throughout my lifetime, but this is the first therapist who has actually helped. She is amazing. I've been with Talkspace for over 2 years now, and I've made huge progress. I highly recommend them.",
        name: "Elizabeth Bissett",
        location: "US",
        rating: 5,
        date: "Aug 26, 2026",
      },
      {
        title: "Would recommend Talkspace to anyone",
        text: "How my therapist was chosen for me is unbeknownst but she is what makes me want to schedule another session each time one ends. She keeps me wanting to get and do better for myself.",
        name: "Talkspace Member",
        location: "US",
        rating: 5,
        date: "Jul 31, 2026",
      },
      {
        title: "Love it here!",
        text: "This has been the best platform since I first decided to start therapy in 2020. I have a great therapist who has supported me from my lowest moment to now a well thriving life.",
        name: "Talkspace Member",
        location: "US",
        rating: 5,
        date: "Feb 27, 2026",
      },
      {
        title: "Best app ever very good platform",
        text: "Best app ever very good platform",
        name: "Dawn",
        location: "US",
        rating: 5,
        date: "Aug 26, 2026",
      },
    ],
  },
  {
    id: "headspace",
    name: "Headspace",
    tagline: "The mindfulness and meditation app - now also offering online therapy that accepts insurance",
    logo: "/logos/headspacelogo.png",
    smallLogo: "/logos/headspacelogo.png",
    highlights: [
      "Guided meditation, sleep and stress content in one app",
      "Online therapy that accepts insurance - coverage check on its site",
      "HSA/FSA eligible; app subscription separate from therapy",
    ],
    // Direct site link until an affiliate link exists - CTAs must work.
    affiliateUrl: "https://www.headspace.com",
    ctaText: "Visit Site",
    trustpilotRating: "1.5",
    trustpilotReviewCount: "770",
    // Verified from the operator's Trustpilot screenshots (claimed profile,
    // Aug 2026). The 1.5 aggregate is shown as-is - honesty rule; the two
    // captured reviews are individual positive experiences from that profile.
    trustpilotReviews: [
      {
        title: "Life changing",
        text: "This is a great company that's changed my life very positively. I'm so happy I found it, there may be other good meditation apps but I've been happy with Headspace. Also, their customer care has been great.",
        name: "Tessa",
        location: "US",
        rating: 5,
        date: "Jun 13, 2025",
      },
      {
        title: "Love it",
        text: "Love this app. In difficult moment can really help you.",
        name: "Nicol\u00f2 Dardi",
        location: "IT",
        rating: 5,
        date: "Mar 15, 2026",
      },
    ],
  },
  {
    id: "talkiatry",
    name: "Talkiatry",
    tagline: "Psychiatry-first online care - psychiatrist visits billed through your insurance",
    logo: "/logos/talkiatrylogo.png",
    smallLogo: "/logos/talkiatrylogo.png",
    highlights: [
      "Care led by psychiatrists, not matched generalists",
      "In-network with many major insurance plans",
      "Therapy available alongside psychiatric care",
    ],
    // Direct site link until an affiliate link exists - CTAs must work.
    affiliateUrl: "https://www.talkiatry.com",
    ctaText: "Visit Site",
    trustpilotRating: "2.5",
    trustpilotReviewCount: "956",
    // Verified from the operator's Trustpilot screenshots (claimed profile,
    // Aug 2026). The 2.5 aggregate is shown as-is - honesty rule; the two
    // captured reviews are recent positive clinical experiences.
    trustpilotReviews: [
      {
        title: "Easy Access.",
        text: "Dr. Baker was very easy to talk with. He listened very well to my concerns and addressed them appropriately I feel. He has a very professional demeanor as well.",
        name: "Sandra",
        location: "US",
        rating: 5,
        date: "Aug 25, 2026",
      },
      {
        title: "I found my appointment with my doctor very helpful",
        text: "I found my doctor very easy to speak with. He made me feel heard and comfortable opening up to him. He was understanding and had some good insight and made me feel positive moving forward.",
        name: "MJ's Dreamer",
        location: "US",
        rating: 5,
        date: "Aug 25, 2026",
      },
    ],
  },
];

const reviews: ReviewData[] = [
  {
    slug: "betterhelp",
    providerId: "betterhelp",
    shortSummary:
      "The largest online-therapy platform: weekly live sessions plus ongoing messaging, now with insurance accepted - copays from around $23/session for covered members. Therapy only - no psychiatry.",
    reviewIntro:
      "BetterHelp is the biggest name in online therapy - a subscription platform that matches you with a licensed therapist for weekly live sessions (video, phone or live chat, your choice) plus messaging between sessions. BetterHelp itself reports 31,739 therapists on the platform and more than 6.6 million people helped - those are its own numbers, but the scale is real, and it shows in how fast matching and re-matching work. On Trustpilot it holds 3.9 across 9,652 reviews - solid, but the mixed band, not the stellar one; praise for accessibility and therapist quality runs alongside fit and billing complaints. It's talk therapy only - no psychiatry or medication management - but the old no-insurance knock is out of date: BetterHelp now accepts insurance, with copays cited from around $23/session for covered members, alongside self-pay subscriptions (commonly with a first-month discount) and a financial-aid questionnaire. Self-pay cost still varies by location and we haven't verified current rates, so confirm your number - covered or not - at signup. One more thing an honest review can't skip: in 2023 BetterHelp settled with the FTC over sharing user data with advertisers - the company has since updated its practices, but if data privacy is a top concern for you, read its current privacy policy before signing up.",
    keyFeatures: [
      "Weekly live session - video, phone or live chat",
      "Unlimited messaging with your therapist between sessions",
      "Group sessions, webinars and digital worksheets included",
      "Therapist switching at any time, at no extra cost",
      "Financial-aid pricing adjustment via questionnaire",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Individual talk therapy (subscription)",
      "Couples and teen counseling via sister platforms",
    ],
    pros: [
      "Largest therapist network in online therapy - matching is fast",
      "Flexible session formats: video, phone or chat",
      "Messaging between sessions is included",
      "Easy therapist switching",
    ],
    cons: [
      "No psychiatry or medication management",
      "Insurance coverage and the ~$23/session copay are plan-specific - verify yours before counting on them",
      "Self-pay pricing varies by location and isn't published as a single rate",
      "3.9 Trustpilot average (9,652 reviews) - solid but mixed, with fit and billing complaints alongside the praise",
      "2023 FTC settlement over past data-sharing practices - review the current privacy policy",
    ],
    bestFor: [
      "People who want talk therapy started quickly - matching in as little as 2 days",
      "Anyone who values switching therapists easily until the fit is right",
    ],
    finalVerdict:
      "BetterHelp is the default choice for subscription talk therapy for a reason: the network is huge, matching is fast, and the weekly-session-plus-messaging format suits how most people actually engage with therapy. It now takes insurance too - copays cited from around $23/session for covered members - which removes its old biggest weakness. The remaining honest trade-offs: no medication management, location/plan-based pricing you should confirm at signup, and a privacy history worth reading up on. If you expect to need psychiatry, Talkspace or Talkiatry fit better. And therapy platforms are not crisis services - if you're in crisis in the US, call or text 988.",
    trustBadges: ["Licensed therapists", "Video, phone & chat sessions", "Financial aid available"],
    updatedAt: UPDATED,
  },
  {
    slug: "talkspace",
    providerId: "talkspace",
    shortSummary:
      "Online therapy and psychiatry with the broadest insurance story among the big subscription platforms - many major plans and EAPs cover it.",
    reviewIntro:
      "Talkspace pairs the subscription-therapy format (live sessions plus messaging) with two things BetterHelp doesn't have: psychiatry with medication management, and insurance acceptance. Many major insurance plans and employee-assistance programs cover Talkspace, which can turn therapy from a significant monthly out-of-pocket cost into a copay - for eligible plans, that changes the affordability math entirely. Talkspace says most insured members pay a $0 copay - its own claim, but one your eligibility check confirms or denies in minutes - and the app-based format means 24/7 access to your therapy room, not just session slots. It also carries the strongest verified customer rating in our online-therapy coverage: 4.4 on Trustpilot across 2,370 reviews (ahead of BetterHelp's 3.9). Coverage is plan-specific, so run its eligibility check with your insurance details before assuming anything. We haven't verified Talkspace's current self-pay rates, so check those on its site if you're paying out of pocket.",
    keyFeatures: [
      "Insurance coverage through many major plans and EAPs",
      "Therapy and psychiatry (medication management) on one platform",
      "Live video sessions plus ongoing messaging",
      "Eligibility check shows your coverage before you commit",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Individual talk therapy",
      "Psychiatry - evaluation and medication management",
      "Couples and teen therapy",
    ],
    pros: [
      "The strongest insurance story among the big subscription platforms",
      "4.4 Trustpilot average (2,370 reviews) - the best verified score in our coverage",
      "Medication management available without leaving the platform",
      "Messaging-first format suits people who process in writing",
    ],
    cons: [
      "Insurance coverage is plan-specific - verify yours before signing up",
      "Self-pay rates unverified by us - check the site",
      "Therapist choice is match-based rather than browsing profiles",
    ],
    bestFor: [
      "Anyone whose insurance or EAP covers Talkspace - check first, it changes everything",
      "People who may need both therapy and medication",
    ],
    finalVerdict:
      "If your insurance covers it, Talkspace is very hard to beat: therapy plus psychiatry in one place, billed like healthcare instead of a subscription luxury. If your plan doesn't cover it, the decision reverts to format preference against BetterHelp - and you should compare self-pay rates directly on its site, since we haven't verified them. For psychiatry-led care specifically, compare Talkiatry too. Not a crisis service: in the US, call or text 988 in an emergency.",
    trustBadges: ["Insurance & EAP coverage", "Therapy + psychiatry", "Licensed clinicians"],
    updatedAt: UPDATED,
  },
  {
    slug: "headspace",
    providerId: "headspace",
    shortSummary:
      "The best-known mindfulness app - guided meditation, sleep and stress tools - which now also offers online therapy that accepts insurance. The app is daily practice, not treatment.",
    reviewIntro:
      "Headspace is the app that took meditation mainstream: guided sessions for stress, focus and sleep, structured courses, sleepcasts, and lately Ebb, an AI companion - all in a famously well-designed subscription app that Headspace says has passed 105 million downloads. Two honest lines have to be drawn. First, the app is mental fitness, not mental-health treatment - but Headspace now also offers actual online therapy that accepts insurance, with a coverage check on its site (HSA/FSA eligible too), alongside the coaching and EAP services it sells through employers. Second, its Trustpilot profile stands at just 1.5 across 770 reviews - a strikingly low number for so popular an app, and we show it as-is; weigh it alongside the app-store popularity Headspace cites, and read recent reviews yourself before subscribing. We haven't verified current pricing for the app or therapy; both are on Headspace's site.",
    keyFeatures: [
      "Guided meditation library - stress, focus, anxiety-adjacent practice",
      "Sleep content: sleepcasts, music, wind-downs",
      "Structured courses that teach the skill, not just play audio",
      "Online therapy that accepts insurance - coverage check on its site",
      "HSA/FSA eligible; Ebb AI companion in the app",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Mindfulness and meditation app (subscription)",
      "Online therapy billed through insurance - eligibility check on its site",
      "Coaching and EAP services through employer benefits, where offered",
    ],
    pros: [
      "Best-in-class daily practice app with an easy learning curve",
      "Sleep and stress content people actually keep using",
      "Online therapy accepts insurance - rare for a consumer app brand",
      "HSA/FSA eligible; employer benefits may include it entirely",
    ],
    cons: [
      "Trustpilot profile is strikingly low: 1.5 across 770 reviews - read recent ones before subscribing",
      "The app itself is not therapy and doesn't claim to treat conditions",
      "Therapy availability and coverage are plan-specific - verify with its coverage check",
      "App and therapy pricing unverified by us - check the site",
    ],
    bestFor: [
      "Daily stress management and better sleep habits alongside - or before - therapy",
      "Anyone whose employer benefits include Headspace",
    ],
    finalVerdict:
      "Judged as what it is - a daily mental-fitness practice - Headspace is excellent, and it pairs well with real therapy rather than competing with it. Its newer therapy offering is worth a look precisely because it accepts insurance - run the coverage check - though the 1.5 Trustpilot average (770 reviews) says the company's customer experience deserves scrutiny before you hand over a card; read recent reviews and know the cancellation terms. For treatment-first needs, compare BetterHelp, Talkspace and Talkiatry; keep the Headspace app as the between-sessions habit either way. In crisis, call or text 988 (US) - an app is not the tool for that moment.",
    trustBadges: ["Mindfulness & sleep app", "Therapy with insurance", "HSA/FSA eligible"],
    updatedAt: UPDATED,
  },
  {
    slug: "talkiatry",
    providerId: "talkiatry",
    shortSummary:
      "Psychiatry-first online care: evaluation and medication management by psychiatrists, billed through insurance, with therapy available alongside.",
    reviewIntro:
      "Talkiatry inverts the usual online-mental-health formula: instead of therapy with psychiatry bolted on, it's a psychiatry practice that happens to run on video. Care is led by psychiatrists - physicians who evaluate, diagnose and manage medication - with therapy available alongside psychiatric care. The other defining trait: Talkiatry is built around insurance, in-network with many major plans, and it's designed for insured patients - if you have no coverage it generally isn't the right fit. Visits are billed through your plan like any specialist visit. One number an honest review must carry: Talkiatry's Trustpilot profile stands at 2.5 across 956 reviews - the recent reviews we captured praise the psychiatrists themselves, and low aggregates at telehealth practices often cluster around logistics rather than clinical care, but we show the score as-is; read recent reviews before booking. We haven't verified plan-level costs, so its insurance check is the honest first step.",
    keyFeatures: [
      "Psychiatrist-led care - evaluation, diagnosis and medication management",
      "In-network with many major insurance plans",
      "Therapy available alongside psychiatric treatment",
      "Structured intake matches you to a psychiatrist suited to your needs",
    ],
    pricingSummary: PRICING_TBD,
    treatmentOptions: [
      "Psychiatric evaluation and ongoing medication management",
      "Individual therapy, alongside psychiatric care",
    ],
    pros: [
      "Actual psychiatrists leading care - rare in telehealth at this scale",
      "Insurance-first: billed like healthcare, not a subscription",
      "Medication and therapy coordinated in one practice",
    ],
    cons: [
      "2.5 Trustpilot average (956 reviews) - read recent reviews before booking",
      "Built for insured patients - limited fit without coverage",
      "Not the platform for therapy-only needs",
      "Controlled-substance prescribing follows strict telehealth rules - some medications may require in-person care",
    ],
    bestFor: [
      "People whose care likely involves medication - especially with insurance",
      "Anyone who wants a psychiatrist, not a subscription, running their treatment",
    ],
    finalVerdict:
      "For medication-involved mental-health care with insurance, Talkiatry is arguably the most clinically serious option in telehealth: psychiatrist-led, in-network, therapy coordinated alongside. It isn't trying to be a talk-therapy subscription - for that, BetterHelp and Talkspace are the comparison - and without insurance it mostly isn't the right door. Run its insurance check first. And in a crisis, don't wait for an intake: call or text 988 (US).",
    trustBadges: ["Psychiatrist-led", "In-network insurance billing", "Therapy alongside care"],
    updatedAt: UPDATED,
  },
];

const battles: BattleData[] = [
  {
    slug: "betterhelp-vs-talkspace",
    provider1Id: "betterhelp",
    provider2Id: "talkspace",
    title: "BetterHelp vs Talkspace (2026): Which Wins?",
    matchupLabel: "BetterHelp vs Talkspace",
    subtitle: "The two biggest names in online therapy - compared on insurance, psychiatry, and how the subscriptions actually work.",
    description:
      "BetterHelp vs Talkspace: both now take insurance, so psychiatry and verified ratings (4.4 vs 3.9 on Trustpilot) decide it. An honest comparison.",
    intro:
      "BetterHelp and Talkspace are the two defining platforms of online therapy, and both now take insurance - BetterHelp with copays cited from around $23/session for covered members, Talkspace with broad plan and EAP coverage and, by its own claim, a $0 copay for most insured members. That leaves two real differences: scope of care - Talkspace offers psychiatry with medication management alongside therapy, BetterHelp is talk therapy only - and track record, where Talkspace's 4.4 on Trustpilot (2,370 reviews) leads BetterHelp's 3.9 (9,652). We haven't verified either platform's current self-pay pricing, so where cost matters we tell you exactly what to check rather than quoting numbers.",
    verdict:
      "Talkspace wins on capability and record: therapy plus psychiatry on one platform, broad plan and EAP coverage with a claimed $0 copay for most insured members, and the better verified rating - 4.4 on Trustpilot (2,370 reviews) against BetterHelp's 3.9 (9,652). BetterHelp has closed its old gap - it now takes insurance too, with copays cited from around $23/session - and still wins on network size, 2-day matching, video/phone/chat flexibility and easy switching for pure talk therapy. The practical move: run both eligibility checks with your insurance details and let your actual copays decide; if you may ever need medication management, Talkspace settles it. Neither platform is a crisis service - in the US, call or text 988.",
    verdictWinnerPoints: [
      "Many major insurance plans and EAPs cover it",
      "Psychiatry and medication management available",
      "Live sessions plus messaging, like BetterHelp",
    ],
    verdictLoserPoints: [
      "Larger therapist network with faster matching",
      "Video, phone or chat sessions - your choice",
      "Insurance accepted too (copays from ~$23/session) - but no psychiatry",
    ],
    winnerId: "talkspace",
    categories: [
      {
        name: "Insurance & Affordability",
        winner: "provider2",
        explanation:
          "Both platforms now accept insurance, so this category is closer than it used to be. Talkspace still edges it: coverage through many major plans plus employer EAPs, and - by its own claim - a $0 copay for most insured members, against BetterHelp's cited copays from around $23/session. Both also serve self-pay (BetterHelp adds a financial-aid questionnaire). Coverage is plan-specific at both, so run both eligibility checks and let your actual numbers decide.",
        supportingPoints: [
          "Broad plans + EAPs; $0 copay for most insured members, per Talkspace",
          "Copays cited from ~$23/session (BetterHelp)",
        ],
      },
      {
        name: "Scope of Care",
        winner: "provider2",
        explanation:
          "Talkspace offers psychiatry - evaluation and medication management - alongside therapy. BetterHelp is talk therapy only, so if medication ever becomes part of your care, you'd be coordinating a second provider outside the platform.",
        supportingPoints: [
          "Therapy + psychiatry on one platform (Talkspace)",
          "Talk therapy only (BetterHelp)",
        ],
      },
      {
        name: "Network & Flexibility",
        winner: "provider1",
        explanation:
          "BetterHelp runs the largest therapist network in the category, which shows up as faster matching, easier switching until the fit is right, and three live-session formats (video, phone, chat). Talkspace's matching is solid but more constrained, particularly when filtering to in-network clinicians.",
        supportingPoints: [
          "Largest network, fast re-matching (BetterHelp)",
          "Video, phone or chat sessions (BetterHelp)",
        ],
      },
    ],
    features: [
      { feature: "Care model", provider1Value: "Subscription talk therapy", provider2Value: "Subscription therapy + psychiatry", highlight: "provider2" },
      { feature: "Insurance", provider1Value: "Accepted - copays from ~$23/session", provider2Value: "Many plans & EAPs - $0 copay for most (per Talkspace)", highlight: "provider2" },
      { feature: "Medication management", provider1Value: "No", provider2Value: "Yes (psychiatry)", highlight: "provider2" },
      { feature: "Live session formats", provider1Value: "Video, phone or chat", provider2Value: "Video (plans vary)", highlight: "provider1" },
      { feature: "Messaging between sessions", provider1Value: "Included", provider2Value: "Included", highlight: "both" },
      { feature: "Trustpilot", provider1Value: "3.9 (9,652 reviews)", provider2Value: "4.4 (2,370 reviews)", highlight: "provider2" },
      { feature: "Pricing", provider1Value: "Varies by location - verify at signup", provider2Value: "Verify coverage/self-pay on site", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "talkspace-vs-talkiatry",
    provider1Id: "talkspace",
    provider2Id: "talkiatry",
    title: "Talkspace vs Talkiatry (2026): Which Fits Your Care?",
    matchupLabel: "Talkspace vs Talkiatry",
    subtitle: "Two insurance-friendly platforms with opposite centers of gravity - subscription therapy with psychiatry added, vs a psychiatry practice with therapy alongside.",
    description:
      "Talkspace vs Talkiatry: both bill through insurance, both offer therapy and psychiatry - but one is therapy-led, one psychiatrist-led. Which fits you?",
    intro:
      "Talkspace and Talkiatry look similar from a distance - insurance-friendly online mental-health care with both therapy and medication available - but their centers of gravity are opposite. Talkspace is a therapy platform: subscription care with live sessions and messaging, with psychiatry available as an add-on service. Talkiatry is a psychiatry practice: psychiatrists lead evaluation, diagnosis and medication management, with therapy offered alongside treatment. The honest question isn't which is better - it's which one matches where your care starts. We haven't verified plan-level costs at either; both have insurance checks that answer that for your specific plan.",
    verdict:
      "Start from your likely care. If talk therapy is the core and medication is a maybe, Talkspace wins: the therapy product is the platform, insurance coverage is broad, and psychiatry is there if needed. If medication is likely central - you're seeking evaluation, a diagnosis question, or ongoing medication management - Talkiatry is the more clinically serious home: psychiatrist-led from the first visit, in-network billing, therapy coordinated around treatment rather than the reverse. The verified ratings favor Talkspace though - 4.4 on Trustpilot (2,370 reviews) against Talkiatry's 2.5 (956) - so with Talkiatry, read recent reviews and go in with eyes open on logistics. Insured either way: run both eligibility checks, they're fast. In a crisis, neither intake is the answer - call or text 988 (US).",
    verdictWinnerPoints: [
      "Therapy-led platform with live sessions and messaging",
      "Broad insurance and EAP coverage",
      "Psychiatry available when needed",
    ],
    verdictLoserPoints: [
      "Psychiatrist-led care from the first visit",
      "In-network insurance billing per visit",
      "Built for medication-involved care, not therapy-only",
    ],
    winnerId: "talkspace",
    categories: [
      {
        name: "Therapy Experience",
        winner: "provider1",
        explanation:
          "Talkspace's core product is therapy: matched therapist, live sessions, messaging between them. Talkiatry offers therapy alongside psychiatric care, but it isn't built as a therapy-first destination - therapy there supports the treatment plan rather than being the plan.",
        supportingPoints: [
          "Sessions + messaging as the core product (Talkspace)",
          "Therapy alongside psychiatric care (Talkiatry)",
        ],
      },
      {
        name: "Psychiatric Depth",
        winner: "provider2",
        explanation:
          "Talkiatry's clinicians are psychiatrists leading care end to end - evaluation, diagnosis, medication management, follow-up. Talkspace's psychiatry service is legitimate but sits as an add-on to a therapy platform. For medication-centered care, the psychiatry-first structure is the stronger clinical home.",
        supportingPoints: [
          "Psychiatrist-led practice (Talkiatry)",
          "Psychiatry as platform add-on (Talkspace)",
        ],
      },
      {
        name: "Insurance Model",
        winner: "tie",
        explanation:
          "Both are genuinely insurance-friendly, in-network with many major plans - Talkspace on a subscription/coverage model that also spans EAPs, Talkiatry billing per visit like a specialist practice. Coverage is plan-specific at both; the eligibility checks are the only honest answer for your numbers.",
        supportingPoints: [
          "Many major plans + EAPs (Talkspace)",
          "In-network per-visit billing (Talkiatry)",
        ],
      },
    ],
    features: [
      { feature: "Center of gravity", provider1Value: "Therapy-first", provider2Value: "Psychiatry-first", highlight: "none" },
      { feature: "Who leads care", provider1Value: "Matched therapist", provider2Value: "Psychiatrist", highlight: "none" },
      { feature: "Medication management", provider1Value: "Available (add-on service)", provider2Value: "Core of the practice", highlight: "provider2" },
      { feature: "Messaging between sessions", provider1Value: "Included", provider2Value: "Not the model", highlight: "provider1" },
      { feature: "Insurance", provider1Value: "Many plans & EAPs", provider2Value: "In-network, many major plans", highlight: "both" },
      { feature: "Trustpilot", provider1Value: "4.4 (2,370 reviews)", provider2Value: "2.5 (956 reviews)", highlight: "provider1" },
      { feature: "Without insurance", provider1Value: "Self-pay available - verify rates", provider2Value: "Generally not the right fit", highlight: "provider1" },
    ],
    updatedAt: UPDATED,
  },
  {
    slug: "headspace-vs-betterhelp",
    provider1Id: "headspace",
    provider2Id: "betterhelp",
    title: "Headspace vs BetterHelp (2026): App or Therapy?",
    matchupLabel: "Headspace vs BetterHelp",
    subtitle: "A daily mindfulness practice vs licensed talk therapy - different tools that people keep cross-shopping.",
    description:
      "Headspace vs BetterHelp: one is a meditation and sleep app, the other is licensed therapy with a real clinician. An honest guide to which you actually need - and when the answer is both.",
    intro:
      "People compare Headspace and BetterHelp constantly, and the honest answer starts with naming the category difference: Headspace's core product is a mindfulness app - guided meditation, sleep content, stress tools - while BetterHelp is licensed therapy with a real clinician. The line has blurred a little: Headspace now also sells online therapy that accepts insurance, per its own site. But the products remain different at heart - one builds a daily practice, the other treats what you're going through with a professional - and the comparison still turns on one question: is what you need right now a habit or a therapist? Worth weighing too: BetterHelp holds 3.9 on Trustpilot across 9,652 reviews, while Headspace's profile sits at a strikingly low 1.5 across 770.",
    verdict:
      "If something is genuinely weighing on you - persistent low mood, anxiety that interferes, a life situation you can't metabolize alone - BetterHelp is the relevant tool: a licensed therapist, live sessions, the category's largest network, and a 3.9 Trustpilot record across thousands of reviews. Headspace wins a different contest: the best daily mental-fitness practice on the market, at app-subscription cost. Its newer insurance-accepting therapy service is worth checking if coverage matters to you - but its 1.5 Trustpilot average (770 reviews) argues for reading recent customer experiences before subscribing to anything. The strongest pattern is often both - therapy for the work, the Headspace app between sessions. If any part of you is in crisis, skip both: call or text 988 (US).",
    verdictWinnerPoints: [
      "Licensed therapist and live sessions - actual treatment",
      "Video, phone or chat formats plus messaging",
      "Insurance accepted - copays from ~$23/session for covered members",
    ],
    verdictLoserPoints: [
      "Best-known daily meditation and sleep practice",
      "App-subscription cost - the accessible first step",
      "Care services included in some employer benefits",
    ],
    winnerId: "betterhelp",
    categories: [
      {
        name: "Actual Treatment",
        winner: "provider2",
        explanation:
          "BetterHelp is therapy through and through: a licensed clinician, live sessions, messaging, and the category's largest network. Headspace's app teaches meditation and supports sleep and stress - valuable, but not treatment - and while Headspace now also offers insurance-based online therapy, that service is young next to BetterHelp's therapy-first platform, and Headspace's 1.5 Trustpilot average (vs BetterHelp's 3.9) is hard to ignore when choosing who handles your care.",
        supportingPoints: [
          "Licensed therapist, live sessions, largest network (BetterHelp)",
          "Practice app + newer insurance-based therapy service (Headspace)",
        ],
      },
      {
        name: "Daily Practice & Prevention",
        winner: "provider1",
        explanation:
          "Nothing in therapy-land replaces a daily practice you actually keep, and Headspace is the best on-ramp to one: short guided sessions, structured courses, sleep content that earns its screen time. As an everyday stress-and-sleep tool it beats waiting a week between sessions with nothing in between.",
        supportingPoints: [
          "Daily guided practice and courses (Headspace)",
          "Weekly session rhythm (BetterHelp)",
        ],
      },
      {
        name: "Cost of Entry",
        winner: "provider1",
        explanation:
          "An app subscription costs a fraction of a therapy subscription - we haven't verified current rates at either, but the category gap is structural. Headspace is the low-cost first step; on the care side both now take insurance - BetterHelp with copays cited from around $23/session, Headspace via its therapy service's coverage check - and employer benefits can make Headspace free.",
        supportingPoints: [
          "App-level pricing (Headspace) - verify on site",
          "Financial aid available (BetterHelp)",
        ],
      },
    ],
    features: [
      { feature: "What it is", provider1Value: "Mindfulness & sleep app + therapy service", provider2Value: "Licensed talk therapy", highlight: "none" },
      { feature: "Human clinician", provider1Value: "App is self-guided; therapy service has clinicians", provider2Value: "Yes - your matched therapist", highlight: "provider2" },
      { feature: "Best at", provider1Value: "Daily stress, sleep, focus practice", provider2Value: "Working through real problems", highlight: "none" },
      { feature: "Session formats", provider1Value: "App practice; therapy by video", provider2Value: "Video, phone or chat + messaging", highlight: "provider2" },
      { feature: "Insurance", provider1Value: "Therapy service accepts insurance; app is subscription", provider2Value: "Accepted - copays from ~$23/session", highlight: "both" },
      { feature: "Trustpilot", provider1Value: "1.5 (770 reviews)", provider2Value: "3.9 (9,652 reviews)", highlight: "provider2" },
      { feature: "Pricing", provider1Value: "App + therapy - verify on site", provider2Value: "Varies by location - verify at signup", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
];

const articles: ArticleData[] = [
  // ───── Trend-riding coverage (Google Trends, Aug 31 2026) ─────
  // "best online therapy reddit" (+30%) and "cognitive behavioral therapy"
  // (+40%) were rising with zero coverage on our side. The Reddit article
  // quotes ONLY the verified excerpts already in our community registry -
  // no invented comments; the CBT article is qualitative established
  // knowledge with provider-decides framing.
  {
    slug: "online-therapy-reddit",
    title: "Online Therapy According to Reddit: What Real Users Say (2026)",
    description:
      "We collected real Reddit comments on BetterHelp, Talkspace and Talkiatry - the praise and the complaints, quoted as written. What the threads agree on, and what to check before you book.",
    category: "Advice",
    readTime: "7 min read",
    publishedAt: "2026-08-31",
    updatedAt: "2026-08-31",
    heroColor: "#F1EEF7",
    author: "TreatmentsHub Staff",
    keyTakeaways: [
      "Across platforms, Reddit's praise concentrates on the same two things: anytime messaging and flexible scheduling - the reasons people pick online over in-person.",
      "The complaints are rarely about the therapy itself - they target logistics: billing, insurance verification and records departments.",
      "The sharpest warning in the threads is Talkiatry's split: clinicians praised, back office slammed - one commenter was billed $300 per visit after an insurance-verification failure.",
      "The practical Reddit-derived rule: confirm insurance eligibility in writing before the first session, and keep copies of everything you send any platform.",
    ],
    sections: [
      {
        heading: "Why ask Reddit about online therapy at all?",
        body: `Because it is where people talk without a testimonial box. Platform sites show curated success stories; Trustpilot skews toward invited reviews; Reddit is where someone describes the therapist they liked <em>and</em> the records department that lost their forms, in the same comment. That texture is exactly what you want before trusting a platform with something as personal as therapy. Below are real comments from public Reddit threads about the three most-discussed platforms - quoted as written, the critical ones included, because that is the point. (The same excerpts, with more context, live on our <a href="/online-therapy/reviews">review pages</a>.)`,
      },
      {
        heading: "What does Reddit say about BetterHelp?",
        body: `The recurring theme across BetterHelp threads is flexibility - and an honest note about matching. "Having the option to message my therapist anytime was the thing that I needed," writes one commenter whose schedule was "all over the place." Another describes worksheets between sessions that "gave me something tangible to focus on," with the honest caveat that "it did take a couple of tries to find someone I clicked with, but once I did, it felt like a real breakthrough." That couple-of-tries pattern shows up repeatedly, which is why easy therapist switching keeps being named as the feature that matters. Our <a href="/online-therapy/reviews/betterhelp">BetterHelp review</a> carries the full picture, including its 3.9 Trustpilot average and the 2023 FTC privacy settlement - the context Reddit threads rarely include.`,
      },
      {
        heading: "What does Reddit say about Talkspace?",
        body: `Talkspace comments tend to come from people already in treatment, and they read calmer: "My provider is more relaxed (eg doesn't pressure you into scheduling at the end), and he's responsive," writes one - before adding, in the same breath, "The records department is pretty bad though." Another describes a therapist comfortably holding "grief, ptsd MDD, GAD, adhd all meshed together." That is the telehealth pattern in miniature: clinical care praised, administration criticized. Talkspace also holds the strongest verified Trustpilot record of the platforms we track (4.4 across 2,370 reviews) - details in our <a href="/online-therapy/reviews/talkspace">Talkspace review</a>.`,
      },
      {
        heading: "What does Reddit say about Talkiatry?",
        body: `Talkiatry threads are unusually consistent, and they are the reason this article exists: good words for the psychiatrists, hard words for the office behind them. One commenter: "The provider was good, but the office/billing staff are horrible. They said they took my insurance but didn't actually and I find out after two visits...each costing $300." Another had good experiences with clinicians but watched disability paperwork go missing repeatedly - and found the company's Manhattan office dark on a Friday afternoon with mail piling up outside the door. That two-sided story matches Talkiatry's 2.5 Trustpilot average almost exactly - our <a href="/online-therapy/reviews/talkiatry">Talkiatry review</a> breaks down the same split.`,
      },
      {
        heading: "So what's the Reddit-derived playbook?",
        body: `Read enough threads and the advice writes itself. <strong>Pick for flexibility, verify the logistics:</strong> the praise is real - messaging, scheduling, switching - and so are the administrative failures, so confirm your insurance eligibility <em>in writing</em> before the first session, keep copies of every form you send, and treat the first therapist match as a starting point rather than a verdict. Expect to switch once or twice; the platforms make it easy precisely because it is normal. Our <a href="/online-therapy">platform comparison</a> ranks the field with verified ratings, and the <a href="/online-therapy/articles/online-therapy-that-takes-insurance">insurance guide</a> covers the eligibility step in depth. If you are in crisis or having thoughts of self-harm, skip the platforms and call or text 988 - free, 24/7. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "cbt-online",
    title: "CBT Online: What It Is & Why Every Platform Offers It (2026)",
    description:
      "Cognitive behavioral therapy is the approach most online platforms are built around. What CBT actually involves, why it translates so well to video and messaging, and how to start online.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-08-31",
    updatedAt: "2026-08-31",
    heroColor: "#EDF3F6",
    author: "TreatmentsHub Staff",
    keyTakeaways: [
      "CBT is structured, present-focused talk therapy: it works on the loop between thoughts, feelings and behaviors, with skills you practice between sessions.",
      "It is among the most-studied forms of psychotherapy and the approach most online platforms are built around - structure and homework translate naturally to video and messaging.",
      "A course of CBT is typically goal-oriented rather than open-ended, which is part of why it fits subscription-style online care.",
      "Starting online is genuinely simple: match with a licensed therapist, say what you want to work on, and ask whether CBT fits it - the therapist tailors from there.",
    ],
    sections: [
      {
        heading: "What is cognitive behavioral therapy, actually?",
        body: `Strip away the jargon and CBT is a structured, practical form of talk therapy built on one observation: thoughts, feelings and behaviors feed each other in loops. An anxious thought drives avoidance; avoidance shrinks your life; the shrinking confirms the anxious thought. CBT works by making those loops visible and then deliberately interrupting them - questioning distorted thought patterns, testing feared situations in manageable steps, building new behavioral habits. It is present-focused (less about childhood, more about this week) and it comes with homework: worksheets, thought records, small experiments between sessions. If that sounds unusually concrete for therapy, that concreteness is exactly why it is so widely used.`,
      },
      {
        heading: "Does CBT work as well online as in person?",
        body: `CBT is arguably the approach best suited to the online format, and the reason is structural. Its ingredients - a defined agenda, skills teaching, between-session practice, progress you can name - do not depend on sharing a physical room. Worksheets travel well over an app; a thought record filled in at 11pm and messaged to your therapist is CBT working <em>better</em> than it does confined to a weekly hour. This fit is why most major platforms are built around CBT-trained therapists and CBT-shaped tools, and why <a href="/online-therapy/articles/online-therapy-vs-in-person">the online-vs-in-person question</a> is less about effectiveness and more about your preferences and circumstances.`,
      },
      {
        heading: "What is CBT good for - and what isn't it?",
        body: `Its strongest territory is the everyday heavyweights: anxiety, depression, stress, sleep problems, unhelpful habit loops - the conditions where thought-and-behavior patterns do much of the damage and skills genuinely help. It is not the only tool: deeper trauma work, complex diagnoses, and situations needing medication involve other approaches and other professionals - platforms like <a href="/online-therapy/reviews/talkiatry">Talkiatry</a> exist precisely for the psychiatric side, and <a href="/online-therapy/articles/online-therapy-with-medication">therapy with medication</a> covers how the two work together. An honest therapist will tell you within a session or two whether CBT fits what you brought in - and that conversation is the real starting point.`,
      },
      {
        heading: "How do I start CBT online?",
        body: `The mechanics take minutes: pick a platform, complete the intake, and say explicitly that you want to work in a CBT style on whatever brought you - the matching process uses that. <a href="/online-therapy/reviews/betterhelp">BetterHelp</a> matches most people within about 2 days and now takes insurance with copays from around $23/session; <a href="/online-therapy/reviews/talkspace">Talkspace</a> works with many plans and reports a $0 copay for most insured members. The full field is in our <a href="/online-therapy">platform comparison</a>. Two honest notes to carry in: the first match is a starting point, not a verdict - switching is normal and easy - and if you are in crisis or having thoughts of self-harm, skip the sign-up flows and call or text 988, free and available 24/7. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "online-therapy-that-takes-insurance",
    title: "Online Therapy That Takes Insurance (2026 Guide)",
    description:
      "Which online mental-health platforms take insurance, how coverage actually works, and how to check your plan in minutes - Talkspace and Talkiatry lead, and BetterHelp sits it out.",
    category: "Advice",
    readTime: "7 min read",
    publishedAt: UPDATED,
    updatedAt: UPDATED,
    heroColor: "#EEF2FB",
    author: "TreatmentsHub Research Team",
    sections: [
      {
        heading: "Does insurance cover online therapy?",
        body: "Often yes - and this is the single most money-saving fact in online mental-health care. Teletherapy and telepsychiatry are broadly reimbursable under most US insurance plans, and some major platforms are in-network with large insurers. The catch is that coverage is always plan-specific: the same platform can be a copay for one person and full price for their neighbor. That's why insurance-friendly platforms run free eligibility checks - use them before comparing anything else.",
      },
      {
        heading: "Which platforms accept insurance?",
        body: 'Two platforms in our coverage are built around insurance: <a href="/online-therapy/reviews/talkspace">Talkspace</a> - subscription therapy and psychiatry, covered by many major plans and employer EAPs - and <a href="/online-therapy/reviews/talkiatry">Talkiatry</a>, a psychiatry-first practice that is in-network with many major plans and bills per visit like a specialist. Even <a href="/online-therapy/reviews/betterhelp">BetterHelp</a>, long the holdout, now accepts insurance - with copays cited from around $23/session for covered members (plus a financial-aid questionnaire for self-pay) - and <a href="/online-therapy/reviews/headspace">Headspace</a> - best known for its meditation app - now offers online therapy that accepts insurance too, with a coverage check on its site.',
      },
      {
        heading: "How do I check if my plan covers a platform?",
        body: "Run the free eligibility checks: enter your insurer and member details at Talkspace and Talkiatry, and each returns your coverage and estimated cost in minutes - that beats any generic comparison table, including ours. Headspace's therapy coverage check works the same way. Then check whether your employer offers an EAP (employee-assistance program): EAPs often include a number of fully covered therapy sessions, Talkspace partners with many of them, and some employers bundle Headspace's services into benefits without employees ever noticing.",
      },
      {
        heading: "What if my insurance covers neither?",
        body: 'You still have leverage. Ask your insurer about out-of-network reimbursement - some plans repay part of self-pay therapy costs if you submit a superbill (an itemized receipt any legitimate provider can produce). On the self-pay side, <a href="/online-therapy/reviews/betterhelp">BetterHelp</a>\'s financial-aid questionnaire can lower its subscription. And see our guide to <a href="/online-therapy/articles/free-and-low-cost-therapy-options">free and low-cost therapy options</a> - real options exist below every platform\'s price.',
      },
      {
        heading: "The bottom line",
        body: 'If you have insurance, start with the platforms built for it: run the eligibility checks at <a href="/online-therapy/reviews/talkspace">Talkspace</a> (therapy-first) and <a href="/online-therapy/reviews/talkiatry">Talkiatry</a> (psychiatry-first) before paying anyone out of pocket, and check your employer benefits for EAP sessions or Headspace access. Compare all platforms on our <a href="/online-therapy">online therapy ranking</a>. And if you\'re in crisis right now, skip every signup flow: call or text 988 (US) for immediate, free support.',
      },
    ],
  },
  {
    slug: "online-therapy-vs-in-person",
    title: "Online Therapy vs In-Person: Honest 2026 Comparison",
    description:
      "When online therapy is a great fit, when in-person is worth the friction, and how to decide - without the marketing spin from either side.",
    category: "Advice",
    readTime: "7 min read",
    publishedAt: UPDATED,
    updatedAt: UPDATED,
    heroColor: "#EFF6F1",
    author: "TreatmentsHub Research Team",
    sections: [
      {
        heading: "Is online therapy as good as in-person therapy?",
        body: "For many common concerns - anxiety, stress, low mood, relationship strain - teletherapy with a licensed clinician is a legitimate, widely practiced form of care, and its biggest advantage is brutal in its simplicity: the best therapy is the one you actually attend. Online removes the commute, the waiting room, the geographic lottery of who practices near you, and most of the scheduling friction that quietly kills therapy attendance. In-person keeps advantages that matter to some people and some situations: full physical presence, a dedicated space away from home, and suitability for higher-acuity care.",
      },
      {
        heading: "When does online therapy fit best?",
        body: 'Online shines when access is the bottleneck: you live somewhere with few therapists, your schedule fights fixed appointments, leaving home is hard (new parents, caregivers, mobility limits), or you simply engage more honestly from your own space. It also widens choice - platforms like <a href="/online-therapy/reviews/betterhelp">BetterHelp</a> match from clinicians licensed across your whole state rather than your zip code, which makes finding someone suited to your specific concern far more realistic. And for medication-involved care, telepsychiatry through <a href="/online-therapy/reviews/talkiatry">Talkiatry</a> or <a href="/online-therapy/reviews/talkspace">Talkspace</a> brings a scarce specialty to places that simply don\'t have it locally.',
      },
      {
        heading: "When is in-person worth the friction?",
        body: "Some situations genuinely favor a room: severe or complex conditions needing coordinated, higher-acuity care; therapies that use the physical setting; anyone without reliable privacy at home; and people who find screens distancing rather than freeing. If sessions from your kitchen mean whispering while family listens through the wall, the office is the better clinical setting - privacy is part of the treatment. Certain medications also carry telehealth prescribing limits that can require in-person visits.",
      },
      {
        heading: "Can I combine both?",
        body: "Yes, and hybrids are increasingly normal: an online therapist as your regular rhythm with in-person care when circumstances call for it, or in-person therapy supported by app-based practice between sessions (this is exactly where a tool like Headspace fits - daily practice, not treatment). The formats are tools, not teams to pick; good care borrows from both.",
      },
      {
        heading: "How should I decide?",
        body: 'Decide on attendance, honestly: which format will you still be showing up to in month three? If the answer is "the one without the commute", start online - our <a href="/online-therapy">ranking</a> compares the platforms honestly, and <a href="/online-therapy/articles/how-to-choose-an-online-therapy-platform">this guide</a> walks through choosing one. If you\'re in crisis, neither format\'s waitlist is the answer: call or text 988 (US) now.',
      },
    ],
  },
  {
    slug: "online-therapy-with-medication",
    title: "Online Therapy With Medication Management: Your 2026 Options",
    description:
      "Which online platforms offer psychiatry alongside therapy, how medication management works via telehealth, and what it can't do remotely - Talkiatry and Talkspace compared.",
    category: "Advice",
    readTime: "7 min read",
    publishedAt: UPDATED,
    updatedAt: UPDATED,
    heroColor: "#F3F0FA",
    author: "TreatmentsHub Research Team",
    sections: [
      {
        heading: "Can online psychiatrists prescribe medication?",
        body: "Yes - licensed psychiatric clinicians can evaluate you by video and prescribe many mental-health medications, with prescriptions sent to your local pharmacy. The main category-wide exception: controlled substances (for example, stimulants and benzodiazepines) face much stricter telehealth prescribing rules, and platforms differ on whether and how they prescribe them - some medications may require in-person care. If a controlled medication is likely part of your picture, check the platform's medication policy before signing up.",
      },
      {
        heading: "Which platforms offer psychiatry?",
        body: 'Two in our coverage, with opposite structures. <a href="/online-therapy/reviews/talkiatry">Talkiatry</a> is psychiatry-first: a practice of psychiatrists who lead evaluation, diagnosis and medication management, in-network with many major insurance plans, with therapy alongside treatment. <a href="/online-therapy/reviews/talkspace">Talkspace</a> is therapy-first with psychiatry as an added service on the same platform, also with broad insurance coverage. Notably: <a href="/online-therapy/reviews/betterhelp">BetterHelp</a> is therapy-only - if medication becomes relevant there, you\'d coordinate a separate prescriber - and <a href="/online-therapy/reviews/headspace">Headspace</a>\'s consumer app doesn\'t prescribe anything.',
      },
      {
        heading: "Why does having both on one platform matter?",
        body: 'Because therapy and medication work best coordinated - and coordination across two unconnected providers is where care quietly falls apart. One platform or practice means shared records, aligned follow-up, and a therapist and prescriber who can actually communicate about how you\'re doing. Our <a href="/online-therapy/talkspace-vs-talkiatry">Talkspace vs Talkiatry comparison</a> walks through choosing between the therapy-led and psychiatry-led versions of that.',
      },
      {
        heading: "What does medication management look like remotely?",
        body: "A first evaluation visit (longer, by video), a prescription to your local pharmacy when appropriate, then shorter follow-ups to adjust dose and check effects - the same rhythm as office-based psychiatry. Good platforms use symptom check-ins between visits to catch problems early. What it can't replace: emergency care. Any severe reaction or crisis is an in-person or 988 (call or text, US) situation, not a follow-up-visit one.",
      },
      {
        heading: "Where should I start?",
        body: 'If medication is likely central to your care and you have insurance, start with <a href="/online-therapy/reviews/talkiatry">Talkiatry</a>\'s insurance check. If therapy is the core and medication is a maybe, start with <a href="/online-therapy/reviews/talkspace">Talkspace</a>. If you\'re unsure whether you need medication at all, that\'s a legitimate question to bring to an evaluation - a good psychiatric clinician sometimes concludes therapy alone is the right plan. Compare everything on our <a href="/online-therapy">online therapy ranking</a>.',
      },
    ],
  },
  {
    slug: "how-to-choose-an-online-therapy-platform",
    title: "How to Choose an Online Therapy Platform in 2026 (4 Questions)",
    description:
      "Four questions that sort the online mental-health market: insurance, medication, therapy vs daily practice, and format - mapped honestly to BetterHelp, Talkspace, Headspace and Talkiatry.",
    category: "Advice",
    readTime: "6 min read",
    publishedAt: UPDATED,
    updatedAt: UPDATED,
    heroColor: "#EEF4F6",
    author: "TreatmentsHub Research Team",
    sections: [
      {
        heading: "Do you need therapy - or a daily practice?",
        body: 'Name this honestly first. If something is genuinely weighing on you - persistent low mood, anxiety that interferes with life, a situation you can\'t metabolize alone - you want a licensed clinician: <a href="/online-therapy/reviews/betterhelp">BetterHelp</a>, <a href="/online-therapy/reviews/talkspace">Talkspace</a> or <a href="/online-therapy/reviews/talkiatry">Talkiatry</a>. If what you\'re after is everyday stress management, better sleep and a mindfulness habit, <a href="/online-therapy/reviews/headspace">Headspace</a>\'s app is the right tool at a fraction of the cost - and it pairs well with therapy rather than replacing it (Headspace also sells insurance-based therapy now, which our review covers honestly, low Trustpilot score included). Our <a href="/online-therapy/headspace-vs-betterhelp">Headspace vs BetterHelp comparison</a> covers this fork in depth.',
      },
      {
        heading: "Might medication be part of your care?",
        body: 'If yes - or maybe - choose a platform with psychiatry from the start: <a href="/online-therapy/reviews/talkiatry">Talkiatry</a> if medication is likely central (psychiatrist-led, insurance-based), or <a href="/online-therapy/reviews/talkspace">Talkspace</a> if therapy leads and medication support should be available. Starting therapy-only and bolting on an outside prescriber later is the most common coordination failure in online care. <a href="/online-therapy/reviews/betterhelp">BetterHelp</a> is therapy-only by design. Our <a href="/online-therapy/articles/online-therapy-with-medication">medication guide</a> covers how remote prescribing works.',
      },
      {
        heading: "Does your insurance cover any of them?",
        body: 'A covered platform at copay rates beats almost any out-of-pocket deal, so run the free eligibility checks at <a href="/online-therapy/reviews/talkspace">Talkspace</a> and <a href="/online-therapy/reviews/talkiatry">Talkiatry</a> before comparing further, and ask HR whether your benefits include EAP sessions or Headspace access. BetterHelp now accepts insurance too (copays cited from ~$23/session), with a financial-aid questionnaire as the self-pay lever. Details in our <a href="/online-therapy/articles/online-therapy-that-takes-insurance">insurance guide</a>.',
      },
      {
        heading: "How do you want sessions to actually work?",
        body: 'Formats differ more than the marketing suggests. <a href="/online-therapy/reviews/betterhelp">BetterHelp</a> offers the most live-session flexibility (video, phone or chat) plus messaging between sessions. <a href="/online-therapy/reviews/talkspace">Talkspace</a> leans messaging-first with live video per plan. <a href="/online-therapy/reviews/talkiatry">Talkiatry</a> runs like a medical practice - scheduled video visits with your psychiatrist. Pick the rhythm you\'ll still keep in month three; consistency is the outcome driver. And in a crisis, no signup flow is the tool: call or text 988 (US).',
      },
    ],
  },
  {
    slug: "free-and-low-cost-therapy-options",
    title: "Free Online Therapy: The Options That Actually Exist (2026)",
    description:
      "Real routes to affordable mental-health support - EAPs, community clinics, sliding-scale therapists, training clinics, support lines - and where the online platforms fit in.",
    category: "Advice",
    readTime: "8 min read",
    publishedAt: UPDATED,
    updatedAt: UPDATED,
    heroColor: "#F1F6EE",
    author: "TreatmentsHub Research Team",
    sections: [
      {
        heading: "Is free therapy a real thing?",
        body: "Some genuinely free routes exist, and knowing them matters even if you end up paying: employer EAPs (employee-assistance programs) commonly include several fully covered sessions per issue per year and go chronically unused because people don't know they have one - check with HR or your benefits portal today, and while you're there check whether your benefits include Headspace or Talkspace access. The 988 Suicide & Crisis Lifeline (call or text 988, US) is free, 24/7, and not only for suicidal crises - it's a legitimate immediate-support line for any overwhelming moment. Warmlines - non-crisis peer-support phone lines run in many states - fill the space below that.",
      },
      {
        heading: "Where does low-cost in-person therapy hide?",
        body: "Three underused doors: community mental-health centers (federally supported clinics that charge on income-based sliding scales), university training clinics (graduate students delivering supervised therapy at steep discounts - supervision by a licensed clinician is a feature, not a caveat), and individual therapists who reserve sliding-scale slots - therapist directories let you filter for exactly this, and it's always worth asking a therapist you like directly; many keep quiet low-fee slots.",
      },
      {
        heading: "Can online platforms be the affordable option?",
        body: 'Often, yes - in two different ways. If you\'re insured, in-network online care can drop to copay level: run the eligibility checks at <a href="/online-therapy/reviews/talkspace">Talkspace</a> (therapy and psychiatry) and <a href="/online-therapy/reviews/talkiatry">Talkiatry</a> (psychiatry-first) - our <a href="/online-therapy/articles/online-therapy-that-takes-insurance">insurance guide</a> explains how. Out of pocket, <a href="/online-therapy/reviews/betterhelp">BetterHelp</a> offers a financial-aid adjustment through a questionnaire, and <a href="/online-therapy/reviews/headspace">Headspace</a> delivers real daily-practice value at app-subscription cost - not therapy, but not pretending to be. We haven\'t verified current prices anywhere, so compare published rates directly.',
      },
      {
        heading: "What about group therapy and peer support?",
        body: "Group therapy - a licensed clinician leading a small group - typically costs a fraction of individual sessions and is clinically legitimate in its own right, not a consolation prize. Peer-support groups (NAMI's free groups, condition-specific communities, 12-step and similar programs) cost nothing and provide the through-the-week scaffolding weekly sessions can't. A common effective pattern: occasional individual sessions plus a weekly group, with a daily practice app in between.",
      },
      {
        heading: "The honest bottom line",
        body: 'Money should narrow your options, not close them. In order: check your EAP and employer benefits, run the insurance eligibility checks at <a href="/online-therapy/reviews/talkspace">Talkspace</a> and <a href="/online-therapy/reviews/talkiatry">Talkiatry</a>, look at community and training clinics locally, ask about sliding scales, and use BetterHelp\'s financial-aid questionnaire if you go the subscription route. Our <a href="/online-therapy">online therapy ranking</a> covers the platforms honestly. And the one option that\'s always free, always open: 988, call or text, US - use it any time things feel unmanageable.',
      },
    ],
  },
  {
    slug: "does-betterhelp-take-insurance",
    title: "Does BetterHelp Take Insurance? Yes - Here's How",
    description:
      "BetterHelp now accepts insurance, with copays cited from around $23/session for covered members. How coverage works, what self-pay costs depend on, and how it compares to Talkspace.",
    category: "Advice",
    readTime: "6 min read",
    publishedAt: UPDATED,
    updatedAt: UPDATED,
    heroColor: "#EEF4EE",
    author: "TreatmentsHub Research Team",
    keyTakeaways: [
      "BetterHelp now accepts insurance - a recent change most articles haven't caught up with.",
      "Copays are cited from around $23/session for covered members; coverage is plan-specific.",
      "Not covered? The financial-aid questionnaire and first-month discounts lower self-pay.",
      "Talkspace claims a $0 copay for most insured members - run both eligibility checks.",
    ],
    sections: [
      {
        heading: "Does BetterHelp take insurance?",
        body: 'Yes - and if you researched this even a year ago, that answer has changed. BetterHelp built its name as the platform that deliberately skipped insurance, and most articles you\'ll find still say it takes none. It now accepts insurance, with copays cited from around $23 per session for covered members. That single change removes what was, for years, the biggest reason to choose a competitor. Coverage is plan-specific - the ~$23 figure is a cited starting point, not a promise - so the only answer that matters is the one BetterHelp\'s own signup coverage check gives you for your plan.',
      },
      {
        heading: "How do I use my insurance at BetterHelp?",
        body: 'Enter your insurance details during signup and BetterHelp checks your eligibility before you commit - the same flow <a href="/online-therapy/reviews/talkspace">Talkspace</a> and <a href="/online-therapy/reviews/talkiatry">Talkiatry</a> use. If your plan is in, you pay a per-session copay instead of the subscription. If it isn\'t, you fall back to self-pay, where the price varies by location and therapist availability - BetterHelp doesn\'t publish one national rate, so treat any number you see in an article (including ours) as something to confirm at signup. First-month discounts for self-pay are commonly offered.',
      },
      {
        heading: "What if my plan isn't covered?",
        body: 'Three levers, in order. First, BetterHelp\'s financial-aid questionnaire - answer honestly about income and circumstances and the subscription price adjusts down. Second, out-of-network reimbursement: some insurance plans repay part of self-pay therapy if you submit a superbill (an itemized receipt); one call to your insurer answers whether yours does. Third, compare covered alternatives before defaulting to self-pay anywhere - our <a href="/online-therapy/articles/online-therapy-that-takes-insurance">insurance guide</a> maps which platforms your plan is most likely to cover, and our <a href="/online-therapy/articles/free-and-low-cost-therapy-options">low-cost therapy guide</a> covers the options below every platform\'s price.',
      },
      {
        heading: "How does BetterHelp's coverage compare to Talkspace's?",
        body: 'Talkspace has been insurance-first for years - many major plans plus employer EAPs - and Talkspace itself claims most insured members pay a $0 copay, against BetterHelp\'s cited ~$23/session. If both cover you, Talkspace is usually the cheaper covered option and adds psychiatry; BetterHelp counters with the larger network, 2-day matching and video/phone/chat flexibility. Run both eligibility checks - they\'re free and take minutes - and let your actual copays decide. Full comparison in our <a href="/online-therapy/betterhelp-vs-talkspace">BetterHelp vs Talkspace battle</a>.',
      },
      {
        heading: "The bottom line",
        body: 'BetterHelp accepting insurance is genuinely new information - most of the internet hasn\'t caught up. Check your coverage at signup, use the financial-aid questionnaire if you\'re out of pocket, and compare against <a href="/online-therapy/reviews/talkspace">Talkspace</a> before deciding. Our full <a href="/online-therapy/reviews/betterhelp">BetterHelp review</a> covers the rest - including the 3.9 Trustpilot record and the privacy history. In crisis, skip every signup flow: call or text 988 (US), free, 24/7.',
      },
    ],
  },
  {
    slug: "is-betterhelp-legit",
    title: "Is BetterHelp Legit in 2026? The Honest Answer",
    description:
      "BetterHelp is legitimate - licensed therapists, 9,652 Trustpilot reviews averaging 3.9, and insurance now accepted. The honest answer also covers the FTC settlement and what real users say.",
    category: "Advice",
    readTime: "7 min read",
    publishedAt: UPDATED,
    updatedAt: UPDATED,
    heroColor: "#EEF2F8",
    author: "TreatmentsHub Research Team",
    keyTakeaways: [
      "Yes - licensed, state-credentialed therapists; BetterHelp itself reports 31,739 of them.",
      "Verified Trustpilot: 3.9 across 9,652 reviews - solid but mixed, not stellar.",
      "The 2023 FTC privacy settlement is real - read the current privacy policy before signing up.",
      "No psychiatry: if medication may be part of your care, compare Talkspace or Talkiatry.",
    ],
    sections: [
      {
        heading: "Is BetterHelp legit?",
        body: 'Yes. BetterHelp is a real therapy platform staffed by licensed, credentialed therapists - licensed in your state, the same credential an office therapist holds. It\'s also the biggest platform in the category: BetterHelp itself reports 31,739 therapists and more than 6.6 million people helped (its own numbers, but the scale is consistent with everything publicly observable). "Legit" and "perfect" aren\'t the same thing, though - and an honest answer has to cover the rating, the reviews and the privacy history, so here they are.',
      },
      {
        heading: "What do real customer reviews say?",
        body: 'On Trustpilot, BetterHelp holds 3.9 across 9,652 reviews on a claimed profile dating to 2015 - solid, but the mixed band, not the stellar one. The recent reviews we verified praise accessibility ("You can receive therapy online in whichever way you\'d prefer, and financial aid is available"), therapist quality, and the webinars and worksheets that come with the subscription. On Reddit, the honest theme is that matching takes attempts: "it did take a couple of tries to find someone I clicked with, but once I did, it felt like a real breakthrough." That\'s the pattern to expect - the platform works, and the easy therapist-switching exists precisely because first matches often aren\'t final.',
      },
      {
        heading: "Is BetterHelp a scam?",
        body: 'No. A scam takes your money and delivers nothing; BetterHelp is a real company delivering real therapy from licensed clinicians to millions of people, with a working refund and cancellation process. What the "scam" searches usually trace back to is three real but different things: billing complaints (subscriptions renew until cancelled - know the terms), therapist-fit disappointment (first matches often aren\'t final; switching exists for that), and the 2023 FTC privacy settlement covered below. Those are legitimate criticisms of a legitimate company - worth weighing, but not fraud.',
      },
      {
        heading: "What about the FTC privacy settlement?",
        body: 'In 2023, BetterHelp settled with the US Federal Trade Commission over sharing user data - including health questionnaire data - with advertisers like Facebook and Snapchat. That happened; no legitimate review should bury it. The company has since updated its practices, and the settlement itself forced changes. What it means for you: read the current privacy policy before signing up, and opt out of data sharing where offered. If privacy is your deciding factor, weigh insurance-billed alternatives too - though those create claims records with your insurer instead, a different trade rather than a free lunch.',
      },
      {
        heading: "Does BetterHelp take insurance now?",
        body: 'Yes - new as of recently, and most articles haven\'t caught up: BetterHelp now accepts insurance, with copays cited from around $23/session for covered members, alongside self-pay subscriptions and a financial-aid questionnaire. Full details in our <a href="/online-therapy/articles/does-betterhelp-take-insurance">BetterHelp insurance guide</a>.',
      },
      {
        heading: "Who should choose BetterHelp - and who shouldn't?",
        body: 'Choose it if you want talk therapy with the largest therapist pool, matching in as little as 2 days, video/phone/chat flexibility, and messaging between sessions. Look elsewhere if medication might be part of your care - BetterHelp has no psychiatry, so compare <a href="/online-therapy/reviews/talkspace">Talkspace</a> (therapy + psychiatry, 4.4 on Trustpilot) and <a href="/online-therapy/reviews/talkiatry">Talkiatry</a> (psychiatry-first) - and see our <a href="/online-therapy">full ranking</a> for the vertical view. One thing BetterHelp is not, by its own admission: a crisis service. In the US, call or text 988 - free, confidential, 24/7.',
      },
    ],
  },
  {
    slug: "does-talkspace-take-insurance",
    title: "Talkspace Insurance Coverage 2026: $0 Copays & EAPs",
    description:
      "Talkspace is covered by many major insurance plans and employer EAPs - and says most insured members pay a $0 copay. How to check your plan, what psychiatry coverage looks like, and the honest caveats.",
    category: "Advice",
    readTime: "6 min read",
    publishedAt: UPDATED,
    updatedAt: UPDATED,
    heroColor: "#EDF3F6",
    author: "TreatmentsHub Research Team",
    keyTakeaways: [
      "Talkspace is covered by many major insurance plans and employer EAPs.",
      "Talkspace claims most insured members pay a $0 copay - its eligibility check confirms yours in minutes.",
      "Insurance can apply to Talkspace psychiatry too, plan permitting.",
      "Best verified rating in our coverage: 4.4 on Trustpilot across 2,370 reviews.",
    ],
    sections: [
      {
        heading: "Does Talkspace take insurance?",
        body: 'Yes - it\'s the most insurance-native of the big subscription platforms, covered by many major plans and employee-assistance programs (EAPs). This has been Talkspace\'s structural advantage for years, and it\'s the main reason it wins our <a href="/online-therapy/betterhelp-vs-talkspace">BetterHelp vs Talkspace comparison</a>: for an eligible plan, therapy stops being a subscription luxury and gets billed like healthcare. It also carries the strongest verified customer record in our coverage - 4.4 on Trustpilot across 2,370 reviews.',
      },
      {
        heading: "Will I really pay a $0 copay?",
        body: 'Talkspace claims most insured members pay a $0 copay. That\'s the company\'s own number, so treat it the way we do: as a claim your eligibility check confirms or denies in minutes. Enter your insurer and member details on Talkspace\'s site and it returns your actual coverage and per-session cost before you commit to anything. Plan-specific is the rule in this category - the same platform can be free for you and full-price for your neighbor - which is why we don\'t publish a coverage table and neither should anyone else.',
      },
      {
        heading: "Does insurance cover Talkspace psychiatry too?",
        body: 'Talkspace offers psychiatry - evaluation and medication management - alongside therapy, and insurance can apply there too, plan permitting. That combination matters: if medication ever becomes part of your care, staying on one platform keeps your therapist and prescriber coordinated instead of you playing messenger between two offices. How remote prescribing works, and its limits around controlled substances, is covered in our <a href="/online-therapy/articles/online-therapy-with-medication">medication management guide</a>. For a psychiatry-first alternative billed in-network, compare <a href="/online-therapy/talkspace-vs-talkiatry">Talkspace vs Talkiatry</a>.',
      },
      {
        heading: "What if my plan doesn't cover Talkspace?",
        body: 'First check your employer\'s EAP - Talkspace partners with many, and EAP sessions are commonly fully covered and chronically unused. Second, self-pay is available; we haven\'t verified current rates, so check them on the site. Third, compare the other covered doors before paying out of pocket anywhere: <a href="/online-therapy/articles/does-betterhelp-take-insurance">BetterHelp now accepts insurance too</a> (copays cited from ~$23/session), and <a href="/online-therapy/reviews/talkiatry">Talkiatry</a> bills in-network for psychiatry-led care. Our <a href="/online-therapy/articles/online-therapy-that-takes-insurance">full insurance guide</a> covers all of it, including superbill reimbursement.',
      },
      {
        heading: "The bottom line",
        body: 'If you have insurance, Talkspace should be one of the first eligibility checks you run - free, minutes, and it answers the only question that matters: what you\'ll actually pay. Read our full <a href="/online-therapy/reviews/talkspace">Talkspace review</a> for the rest. In crisis, no eligibility check is the tool: call or text 988 (US), free and open 24/7.',
      },
    ],
  },
  {
    slug: "is-talkiatry-legit",
    title: "Is Talkiatry Legit in 2026? The Honest Answer",
    description:
      "Talkiatry is a legitimate psychiatrist-led practice billed through insurance - and its 2.5 Trustpilot average is real too. What the split record means and how to protect yourself when booking.",
    category: "Advice",
    readTime: "7 min read",
    publishedAt: UPDATED,
    updatedAt: UPDATED,
    heroColor: "#F7F3EA",
    author: "TreatmentsHub Research Team",
    keyTakeaways: [
      "Yes - a real psychiatrist-led practice, billed in-network through many major plans.",
      "Its 2.5 Trustpilot average (956 reviews) is real too: clinicians praised, billing and back-office criticized.",
      "Protect yourself: confirm eligibility in writing, keep copies, check claims posted after visits.",
      "Therapy-only needs fit Talkspace or BetterHelp better; without insurance, Talkiatry usually isn't the door.",
    ],
    sections: [
      {
        heading: "Is Talkiatry legit?",
        body: 'Yes - Talkiatry is a real medical practice, not an app with prescribers attached: care is led by psychiatrists (physicians) who evaluate, diagnose and manage medication, with therapy available alongside treatment, billed in-network through many major insurance plans. In a telehealth market where "psychiatry" often means a 15-minute video with a rotating prescriber, that structure is genuinely more clinically serious. And yet its Trustpilot average is 2.5 across 956 reviews. Both facts are true at once, and understanding how is the whole point of this article.',
      },
      {
        heading: "Why is Talkiatry's Trustpilot rating so low?",
        body: 'The record splits cleanly in two. The clinical side draws praise - the recent reviews we verified describe doctors who listen: "Dr. Baker was very easy to talk with. He listened very well to my concerns," and "He made me feel heard and comfortable opening up to him." The operational side draws the anger: billing, insurance verification, records and responsiveness. A 2.5 aggregate at a practice whose doctors get 5-star reviews tells you where the problem lives - the back office, not the exam room. That doesn\'t excuse it; billing failures cost real money. It does tell you what to defend against.',
      },
      {
        heading: "What do Reddit users say about Talkiatry?",
        body: 'The community feedback we verified says the same thing with receipts. One user: "The provider was good, but the office/billing staff are horrible. They said they took my insurance but didn\'t actually and I find out after two visits...each costing $300." Another had disability paperwork go missing six times: "I\'ve had good experiences with the clinicians, but not the clinical staff." Same split, sharper consequences - the full threads are on our <a href="/online-therapy/reviews/talkiatry">Talkiatry review</a>. Notice what nobody disputes: the psychiatric care itself.',
      },
      {
        heading: "How do I protect myself when booking Talkiatry?",
        body: 'Three defenses, all cheap. One: confirm your insurance eligibility in writing before the first visit - not by phone reassurance; ask for the confirmation email and keep it. Two: keep copies of everything you send them (forms, faxes, portal messages) with dates. Three: after each visit, check the claim actually posted with your insurer - a two-minute portal check that catches billing failures while they\'re one visit deep instead of five. None of this is unique to Talkiatry, but the community record says it matters more here.',
      },
      {
        heading: "Who is Talkiatry right for?",
        body: 'People whose care likely centers on medication - an evaluation, a diagnosis question, ongoing medication management - who have insurance and want a psychiatrist, not a subscription, running treatment. If therapy is the core and medication is a maybe, <a href="/online-therapy/reviews/talkspace">Talkspace</a> (therapy-first, psychiatry available, 4.4 on Trustpilot) is the stronger home - our <a href="/online-therapy/talkspace-vs-talkiatry">Talkspace vs Talkiatry comparison</a> settles that fork. Without insurance, Talkiatry generally isn\'t the right door at all. And in crisis, no intake queue is the answer: call or text 988 (US), free, 24/7.',
      },
    ],
  },
  {
    slug: "how-much-does-betterhelp-cost",
    title: "How Much Does BetterHelp Cost Per Month? (2026)",
    description:
      "BetterHelp has no single price: insured members see copays cited from ~$23/session, self-pay varies by location, and financial aid cuts it further. The honest cost breakdown.",
    category: "Advice",
    readTime: "6 min read",
    publishedAt: UPDATED,
    updatedAt: UPDATED,
    heroColor: "#EFF3EE",
    author: "TreatmentsHub Research Team",
    keyTakeaways: [
      "There is no single BetterHelp price - anyone quoting one flat number is describing their own quote.",
      "Insurance is now accepted, with copays cited from ~$23/session for covered members.",
      "Self-pay varies by location; financial aid and first-month discounts pull it down.",
      "The subscription bills whether you attend or not - showing up weekly is what makes it good value.",
    ],
    sections: [
      {
        heading: "How much does BetterHelp cost per month?",
        body: 'The honest answer most articles dodge: there is no single BetterHelp price. Your monthly cost depends on three things - whether your insurance covers it (new: copays are cited from around $23 per session for covered members), where you live (self-pay subscription rates vary by location and therapist availability), and whether you qualify for financial aid through its questionnaire. Any article quoting one flat "BetterHelp price" is describing one person\'s quote, not yours - which is why we don\'t publish a number we can\'t verify for you, and why the real answer takes two minutes at signup.',
      },
      {
        heading: "Does insurance change what BetterHelp costs?",
        body: 'Dramatically - and this is new. BetterHelp long took no insurance at all; it now accepts it, with copays cited from around $23/session for covered members, which for weekly therapy lands far below typical self-pay subscriptions. Enter your insurance details at signup and the coverage check returns your actual number before you commit. The full story is in our <a href="/online-therapy/articles/does-betterhelp-take-insurance">BetterHelp insurance guide</a> - including what to do when your plan isn\'t covered.',
      },
      {
        heading: "What determines the self-pay price?",
        body: 'Self-pay BetterHelp is a weekly-billed subscription (charged monthly) covering one live session a week - video, phone or chat - plus unlimited messaging, group webinars and digital worksheets. The rate quoted at signup varies by location and therapist availability. Two levers pull it down: the financial-aid questionnaire (answer honestly about income and circumstances and the rate adjusts) and commonly offered first-month discounts. One lever quietly pushes cost up: unused weeks - the subscription bills whether or not you attend, so the real per-session price depends on you showing up.',
      },
      {
        heading: "What are the four BetterHelp cost paths?",
        body: '<table><thead><tr><th>Path</th><th>What you pay</th><th>How to get it</th></tr></thead><tbody><tr><td><strong>Insurance copay</strong></td><td>Cited from ~$23/session for covered members</td><td>Enter insurance details at signup; the coverage check answers in minutes</td></tr><tr><td><strong>Self-pay subscription</strong></td><td>Varies by location - no single national rate</td><td>Quoted at signup; billed monthly for weekly sessions + messaging</td></tr><tr><td><strong>Financial aid</strong></td><td>Reduced self-pay rate</td><td>Income questionnaire at signup - answer honestly, rate adjusts</td></tr><tr><td><strong>First-month discount</strong></td><td>Intro discounts commonly offered</td><td>Applied at signup; confirm current terms</td></tr></tbody></table><p>One path is checked in minutes and one is location roulette - which is why the insurance check comes first, every time.</p>',
      },
      {
        heading: "Is BetterHelp worth the cost?",
        body: 'Against in-office therapy at typical US private-pay rates, a used-weekly BetterHelp subscription generally costs less per session and adds the messaging layer between sessions. Against covered alternatives, run the math: <a href="/online-therapy/reviews/talkspace">Talkspace</a> claims a $0 copay for most insured members, and <a href="/online-therapy/reviews/talkiatry">Talkiatry</a> bills in-network per visit - if your plan covers those and not BetterHelp, they win on price. Our <a href="/online-therapy/betterhelp-vs-talkspace">BetterHelp vs Talkspace comparison</a> and <a href="/online-therapy/articles/free-and-low-cost-therapy-options">low-cost therapy guide</a> cover both directions.',
      },
      {
        heading: "The bottom line",
        body: 'Get your two real numbers before deciding: the insurance coverage check at signup (minutes, and the ~$23/session cited copay beats most alternatives if you\'re covered), and the financial-aid-adjusted self-pay quote if you\'re not. Then compare against your plan\'s covered options. Full platform verdict in our <a href="/online-therapy/reviews/betterhelp">BetterHelp review</a>. In crisis, cost math is the wrong tool: call or text 988 (US), free and open 24/7.',
      },
    ],
  },
  {
    slug: "online-couples-therapy",
    title: "Online Couples Therapy in 2026: Options, Costs & How It Works",
    description:
      "Where to actually get online couples therapy in 2026 - BetterHelp's couples offering and Talkspace's couples plans compared honestly, plus what remote sessions can and can't do.",
    category: "Advice",
    readTime: "6 min read",
    publishedAt: UPDATED,
    updatedAt: UPDATED,
    heroColor: "#F6EFF3",
    author: "TreatmentsHub Research Team",
    keyTakeaways: [
      "Both BetterHelp and Talkspace offer couples therapy - one subscription covers both partners.",
      "Verify couples coverage specifically: individual-therapy insurance doesn't always extend to it.",
      "Talkspace holds the stronger verified rating (4.4 vs 3.9 on Trustpilot).",
      "Safety concerns or active crisis call for individual support first - and 988 in an emergency.",
    ],
    sections: [
      {
        heading: "Can couples do therapy online?",
        body: 'Yes - couples therapy is one of the fastest-growing corners of online care, and for a practical reason: getting two working adults into the same office at the same hour is the single biggest reason couples counseling never starts. Online sessions remove that - both partners join a licensed therapist by video from wherever they each are, even from two different locations, which matters for couples navigating distance, travel schedules or separation.',
      },
      {
        heading: "Which platforms offer couples therapy?",
        body: 'Both of the big names we cover do. <a href="/online-therapy/reviews/betterhelp">BetterHelp</a>\'s signup asks up front whether you\'re seeking individual, couples or teen therapy, and routes couples to therapists who work with partners (its couples offering runs through its sister platform). <a href="/online-therapy/reviews/talkspace">Talkspace</a> offers dedicated couples therapy plans on its main platform - relevant because Talkspace\'s insurance coverage and EAP relationships can apply, and its 4.4 Trustpilot record (2,370 reviews) is the strongest verified score in our coverage. Check whether your plan covers couples sessions specifically; individual-therapy coverage doesn\'t always extend to couples work.',
      },
      {
        heading: "BetterHelp vs Talkspace for couples - how do they compare?",
        body: '<table><thead><tr><th></th><th>BetterHelp (couples)</th><th>Talkspace (couples)</th></tr></thead><tbody><tr><td><strong>How you start</strong></td><td>"Couples - for me and my partner" path at signup</td><td>Dedicated couples therapy plans on the main platform</td></tr><tr><td><strong>Insurance</strong></td><td>Now accepted - verify couples coverage specifically</td><td>Many plans & EAPs - verify couples coverage specifically</td></tr><tr><td><strong>Between sessions</strong></td><td>Messaging included</td><td>Messaging included, 24/7 app access</td></tr><tr><td><strong>Verified Trustpilot</strong></td><td>3.9 (9,652 reviews)</td><td>4.4 (2,370 reviews)</td></tr><tr><td><strong>Network</strong></td><td>Largest in the category</td><td>Strong, insurance-filtered</td></tr></tbody></table><p>Same decision rule as individual therapy: coverage first, then format. The full head-to-head is in our <a href="/online-therapy/betterhelp-vs-talkspace">BetterHelp vs Talkspace comparison</a>.</p>',
      },
      {
        heading: "What does online couples therapy cost?",
        body: 'Same honest rule as everywhere on this site: we don\'t quote prices we haven\'t verified, and couples pricing varies by platform, plan and insurance. The fast path: run Talkspace\'s eligibility check asking specifically about couples coverage, and get BetterHelp\'s quote at signup (its <a href="/online-therapy/articles/how-much-does-betterhelp-cost">cost model is explained here</a> - financial aid applies to couples subscriptions too). One structural note: a couples subscription is one subscription for two people, which often makes per-person cost lower than two individual therapies.',
      },
      {
        heading: "What can online couples therapy handle - and what can't it?",
        body: 'Remote couples work suits the common ground well: communication patterns, recurring conflict, intimacy and trust issues, big-decision alignment, co-parenting logistics. Where in-person or specialized care is the better call: situations involving abuse or safety concerns (couples therapy itself is often contraindicated there - individual support comes first), severe untreated mental illness in either partner, and active crisis. If any of that describes your situation, start with individual care - and in immediate crisis, call or text 988 (US), free and open 24/7.',
      },
      {
        heading: "How should couples choose a platform?",
        body: 'Three questions settle it. Insurance: does either partner\'s plan or EAP cover couples sessions? Run the checks - coverage decides most price questions. Format: scheduled video sessions work for most couples; if one partner processes better in writing, Talkspace\'s messaging-inclusive model helps between sessions. Commitment: pick the rhythm you\'ll both actually keep - consistency predicts outcomes in couples work even more than in individual therapy, because skipped weeks land on two calendars, not one. Compare everything on our <a href="/online-therapy">online therapy ranking</a>.',
      },
    ],
  },
];

const faqs: FaqItem[] = [
  {
    question: "What is online therapy?",
    answer:
      "Online therapy (teletherapy) is care from a licensed therapist delivered remotely - by video, phone, live chat or messaging - through a platform that handles matching, scheduling and billing. The clinicians are licensed in your state, the same as office-based therapists; what changes is access: no commute, wider choice of clinicians, and formats that fit around work and family.",
  },
  {
    question: "Does insurance cover online therapy?",
    answer:
      "Often, but it's always plan-specific. Talkspace (therapy and psychiatry) and Talkiatry (psychiatry-first) are built around insurance billing - each has a free eligibility check that shows your actual coverage in minutes. BetterHelp now accepts insurance as well, with copays cited from around $23/session for covered members, and Headspace's therapy service takes insurance too (the app itself is a subscription). If nothing is covered, ask your insurer about out-of-network reimbursement via superbills.",
  },
  {
    question: "Can online therapists prescribe medication?",
    answer:
      "Therapists don't prescribe - psychiatric clinicians do. Talkiatry is a psychiatrist-led practice built around evaluation and medication management; Talkspace offers psychiatry as a service alongside its therapy platform. Prescriptions go to your local pharmacy. Controlled substances face stricter telehealth rules and may require in-person care - check the medication policy before signing up if this matters to your situation.",
  },
  {
    question: "How much does online therapy cost?",
    answer:
      "It genuinely varies - by platform, plan, location and insurance - and we only publish prices we've verified, so this page doesn't quote numbers. The fast path to your real cost: run the insurance eligibility checks at Talkspace and Talkiatry, check BetterHelp's rate for your location at signup (and its financial-aid questionnaire), and see Headspace's published app pricing on its site.",
  },
  {
    question: "Is Headspace a substitute for therapy?",
    answer:
      "The app isn't - and Headspace itself doesn't claim it is. It builds a meditation, sleep and stress practice, which is genuinely valuable alongside therapy or as everyday prevention. Headspace does now offer a separate online-therapy service that accepts insurance; for treatment-first needs, compare it against BetterHelp, Talkspace and Talkiatry - and note Headspace's strikingly low 1.5 Trustpilot average (770 reviews) when weighing the company's customer experience.",
  },
  {
    question: "What should I do if I'm in crisis right now?",
    answer:
      "Don't start a signup flow. In the US, call or text 988 - the Suicide & Crisis Lifeline - free, confidential and open 24/7, for any overwhelming moment, not only suicidal crises. If you or someone else is in immediate danger, call 911. Online therapy platforms are for ongoing care, and none of them is an emergency service.",
  },
];

export function onlineTherapySeed(base: SiteConfig): SiteConfig {
  return {
    ...base,
    siteName: "treatmentshub.com",
    hero: {
      ...base.hero,
      backgroundImageUrl: "",
      imageAlt: "",
      updatedLabel: "Last Updated: August 2026",
      h1: "Best Online Therapy Platforms of 2026",
      h2: "The top therapy & psychiatry platforms, compared honestly",
      description:
        "Insurance, medication management and session formats - side by side, so you can pick the right platform. In crisis? Call or text 988 (US), free and open 24/7.",
    },
    providers,
    sidebar: {
      ...base.sidebar,
      blockOrder: ["secureBadge", "editorialReviews", "rankingMethodology", "disclosure"],
    },
    ranking: {
      providerOrder: providers.map((p) => p.id),
      positions: base.ranking.positions,
    },
    reviews,
    battles,
    articles,
    faqs,
  };
}
