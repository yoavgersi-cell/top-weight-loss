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
      "Largest online therapy platform in the US",
      "Weekly live sessions - video, phone or chat",
      "Message your therapist between sessions",
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
      "Covered by many major insurance plans and EAPs",
      "Therapy and psychiatry (medication management) on one platform",
      "Live sessions plus ongoing messaging",
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
      "The largest subscription online-therapy platform: weekly live sessions plus ongoing messaging. Therapy only - no psychiatry - and insurance isn't accepted.",
    reviewIntro:
      "BetterHelp is the biggest name in online therapy - a subscription platform that matches you with a licensed therapist for weekly live sessions (video, phone or live chat, your choice) plus messaging between sessions. BetterHelp itself reports 31,739 therapists on the platform and more than 6.6 million people helped - those are its own numbers, but the scale is real, and it shows in how fast matching and re-matching work. On Trustpilot it holds 3.9 across 9,652 reviews - solid, but the mixed band, not the stellar one; praise for accessibility and therapist quality runs alongside fit and billing complaints. It's talk therapy only: no psychiatry or medication management, and no insurance, though a financial-aid adjustment is available via questionnaire. Subscription cost varies by location, and we haven't verified current rates, so confirm pricing at signup. One more thing an honest review can't skip: in 2023 BetterHelp settled with the FTC over sharing user data with advertisers - the company has since updated its practices, but if data privacy is a top concern for you, read its current privacy policy before signing up.",
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
      "Doesn't accept insurance - subscription is out of pocket",
      "Pricing varies by location and isn't published as a single rate",
      "3.9 Trustpilot average (9,652 reviews) - solid but mixed, with fit and billing complaints alongside the praise",
      "2023 FTC settlement over past data-sharing practices - review the current privacy policy",
    ],
    bestFor: [
      "People who want talk therapy started quickly, without insurance paperwork",
      "Anyone who values switching therapists easily until the fit is right",
    ],
    finalVerdict:
      "BetterHelp is the default choice for subscription talk therapy for a reason: the network is huge, matching is fast, and the weekly-session-plus-messaging format suits how most people actually engage with therapy. The honest trade-offs: no medication management, no insurance, location-based pricing you should confirm at signup, and a privacy history worth reading up on. If you expect to need psychiatry or want insurance to pay, look at Talkspace or Talkiatry instead. And therapy platforms are not crisis services - if you're in crisis in the US, call or text 988.",
    trustBadges: ["Licensed therapists", "Video, phone & chat sessions", "Financial aid available"],
    updatedAt: UPDATED,
  },
  {
    slug: "talkspace",
    providerId: "talkspace",
    shortSummary:
      "Online therapy and psychiatry with the broadest insurance story among the big subscription platforms - many major plans and EAPs cover it.",
    reviewIntro:
      "Talkspace pairs the subscription-therapy format (live sessions plus messaging) with two things BetterHelp doesn't have: psychiatry with medication management, and insurance acceptance. Many major insurance plans and employee-assistance programs cover Talkspace, which can turn therapy from a significant monthly out-of-pocket cost into a copay - for eligible plans, that changes the affordability math entirely. It also carries the strongest verified customer rating in our online-therapy coverage: 4.4 on Trustpilot across 2,370 reviews (ahead of BetterHelp's 3.9). Coverage is plan-specific, so run its eligibility check with your insurance details before assuming anything. We haven't verified Talkspace's current self-pay rates, so check those on its site if you're paying out of pocket.",
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
    title: "BetterHelp vs Talkspace: Which Online Therapy Platform Wins in 2026?",
    matchupLabel: "BetterHelp vs Talkspace",
    subtitle: "The two biggest names in online therapy - compared on insurance, psychiatry, and how the subscriptions actually work.",
    description:
      "BetterHelp vs Talkspace: both offer subscription online therapy with live sessions and messaging, but they split hard on insurance and medication management. An honest comparison with no invented numbers.",
    intro:
      "BetterHelp and Talkspace are the two defining platforms of online therapy, and the choice between them turns on two structural differences rather than vibes. BetterHelp is the larger network - fast matching, flexible session formats, easy switching - but it's talk therapy only and takes no insurance. Talkspace offers psychiatry with medication management alongside therapy, and many major insurance plans and EAPs cover it - which, for eligible plans, changes the entire affordability equation. We haven't verified either platform's current self-pay pricing, so where cost matters we tell you exactly what to check rather than quoting numbers.",
    verdict:
      "Talkspace wins on capability: therapy plus psychiatry on one platform, the strongest insurance story in subscription therapy - and now the better verified customer record too, at 4.4 on Trustpilot (2,370 reviews) against BetterHelp's 3.9 (9,652). If your plan or EAP covers it, the decision is basically made - therapy at copay-level cost with medication support available beats any out-of-pocket subscription. BetterHelp wins if insurance isn't in play and you want the biggest network with the fastest matching and easiest therapist switching for pure talk therapy. Check Talkspace's eligibility tool with your insurance details first; that one answer decides most cases. Neither platform is a crisis service - in the US, call or text 988.",
    verdictWinnerPoints: [
      "Many major insurance plans and EAPs cover it",
      "Psychiatry and medication management available",
      "Live sessions plus messaging, like BetterHelp",
    ],
    verdictLoserPoints: [
      "Larger therapist network with faster matching",
      "Video, phone or chat sessions - your choice",
      "No insurance and no psychiatry - out-of-pocket talk therapy only",
    ],
    winnerId: "talkspace",
    categories: [
      {
        name: "Insurance & Affordability",
        winner: "provider2",
        explanation:
          "Talkspace is covered by many major insurance plans and employee-assistance programs; BetterHelp takes no insurance and offers only a financial-aid questionnaire. For anyone whose plan qualifies, Talkspace turns therapy into a copay while BetterHelp stays a full out-of-pocket subscription. Neither publishes one flat national rate, so verify your actual numbers on each site.",
        supportingPoints: [
          "Insurance and EAP coverage (Talkspace)",
          "No insurance accepted (BetterHelp)",
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
      { feature: "Insurance", provider1Value: "Not accepted", provider2Value: "Many major plans & EAPs", highlight: "provider2" },
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
    title: "Talkspace vs Talkiatry: Therapy-First or Psychiatry-First in 2026?",
    matchupLabel: "Talkspace vs Talkiatry",
    subtitle: "Two insurance-friendly platforms with opposite centers of gravity - subscription therapy with psychiatry added, vs a psychiatry practice with therapy alongside.",
    description:
      "Talkspace vs Talkiatry: both bill through many major insurance plans and both offer therapy and psychiatry - but one is therapy-led and one is psychiatrist-led. Which fits depends on where your care starts.",
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
    title: "Headspace vs BetterHelp: Meditation App or Real Therapy in 2026?",
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
      "The right tool when something is genuinely weighing on you",
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
          "An app subscription costs a fraction of a therapy subscription - we haven't verified current rates at either, but the category gap is structural. Headspace is the low-cost first step; BetterHelp's financial-aid questionnaire can lower its cost, and employer benefits can make Headspace free. Neither takes consumer insurance.",
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
      { feature: "Insurance", provider1Value: "Therapy service accepts insurance; app is subscription", provider2Value: "Not accepted", highlight: "provider1" },
      { feature: "Trustpilot", provider1Value: "1.5 (770 reviews)", provider2Value: "3.9 (9,652 reviews)", highlight: "provider2" },
      { feature: "Pricing", provider1Value: "App + therapy - verify on site", provider2Value: "Varies by location - verify at signup", highlight: "none" },
    ],
    updatedAt: UPDATED,
  },
];

const articles: ArticleData[] = [
  {
    slug: "online-therapy-that-takes-insurance",
    title: "Online Therapy That Takes Insurance: How It Actually Works in 2026",
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
        body: 'Two platforms in our coverage are built around insurance: <a href="/online-therapy/reviews/talkspace">Talkspace</a> - subscription therapy and psychiatry, covered by many major plans and employer EAPs - and <a href="/online-therapy/reviews/talkiatry">Talkiatry</a>, a psychiatry-first practice that is in-network with many major plans and bills per visit like a specialist. By contrast, <a href="/online-therapy/reviews/betterhelp">BetterHelp</a> takes no insurance at all (it offers a financial-aid questionnaire instead), and <a href="/online-therapy/reviews/headspace">Headspace</a> - best known for its meditation app - now offers online therapy that accepts insurance too, with a coverage check on its site.',
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
    title: "Online Therapy vs In-Person Therapy: An Honest Comparison for 2026",
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
        body: 'A covered platform at copay rates beats almost any out-of-pocket deal, so run the free eligibility checks at <a href="/online-therapy/reviews/talkspace">Talkspace</a> and <a href="/online-therapy/reviews/talkiatry">Talkiatry</a> before comparing further, and ask HR whether your benefits include EAP sessions or Headspace access. BetterHelp takes no insurance - its lever is a financial-aid questionnaire. Details in our <a href="/online-therapy/articles/online-therapy-that-takes-insurance">insurance guide</a>.',
      },
      {
        heading: "How do you want sessions to actually work?",
        body: 'Formats differ more than the marketing suggests. <a href="/online-therapy/reviews/betterhelp">BetterHelp</a> offers the most live-session flexibility (video, phone or chat) plus messaging between sessions. <a href="/online-therapy/reviews/talkspace">Talkspace</a> leans messaging-first with live video per plan. <a href="/online-therapy/reviews/talkiatry">Talkiatry</a> runs like a medical practice - scheduled video visits with your psychiatrist. Pick the rhythm you\'ll still keep in month three; consistency is the outcome driver. And in a crisis, no signup flow is the tool: call or text 988 (US).',
      },
    ],
  },
  {
    slug: "free-and-low-cost-therapy-options",
    title: "Free & Low-Cost Therapy Options That Actually Exist in 2026",
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
      "Often, but it's always plan-specific. Talkspace (therapy and psychiatry) and Talkiatry (psychiatry-first) are built around insurance billing - each has a free eligibility check that shows your actual coverage in minutes. BetterHelp doesn't accept insurance (it offers a financial-aid questionnaire instead), and Headspace's consumer app is a subscription, though some employer benefit packages include its care services. If nothing is covered, ask your insurer about out-of-network reimbursement via superbills.",
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
