import type {
  SiteConfig,
  Provider,
  ReviewData,
  BattleData,
  FaqItem,
  ArticleData,
} from "../config";

// ─────────────────────────────────────────────────────────────────────────────
// HRT (menopause / hormone replacement therapy) vertical
//
// House rules, same as every vertical: real telehealth brands with truthful,
// general descriptions and NO invented data - no fabricated prices, Trustpilot
// scores, or program claims. Where we haven't verified a provider's published
// pricing yet, the copy says so and points to the provider's site. All
// reviews index (Aug 2026 operator policy).
//
// Oct 8, 2026 (operator decision): the ranking is the three partner providers
// only - Winona, Midi Health, Gala - each with an operator-supplied tracking
// link. Nurx, Inner Balance, Hone, Wisp and DirectMeds were removed along
// with their reviews and the two comparisons built on them (301s live in
// src/proxy.ts). This vertical ships from code only: config-store ignores
// any saved HRT blob, so edits must land here.
// ─────────────────────────────────────────────────────────────────────────────

const UPDATED = "2026-08-23";

const providers: Provider[] = [
  {
    id: "winona",
    name: "Winona",
    tagline: "Menopause-focused telehealth prescribing body-identical hormone therapy",
    logo: "/logos/winona.svg",
    smallLogo: "/logos/winona-icon.svg",
    highlights: [
      "Free physician consultation - pay only if prescribed",
      "Flat published prices $39-$149/month by product; FSA/HSA eligible",
      "Discreet monthly home delivery",
    ],
    // Operator-supplied tracking link, Oct 8, 2026.
    affiliateUrl: "https://track.revoffers.com/aff_c?offer_id=495&aff_id=12904",
    ctaText: "Visit Site",
    // Operator-verified from Winona's claimed Trustpilot profile ("By Winona",
    // claimed May 2021): 4.6 average across 8,678 reviews per the operator's
    // Oct 8, 2026 screenshots (was 8,138 in the Aug 2026 capture). The 26
    // October-page reviews below were captured in full, including the two
    // 3-star ones; the four August captures follow them. Names as first name
    // + initial; dates are Trustpilot's experience dates as displayed.
    trustpilotRating: "4.6",
    trustpilotReviewCount: "8,678",
    trustpilotReviews: [
      { title: "Confident care and medications", text: "The comunication between doctors and patients is wonderful. The doctors are very emphatic.", name: "Lourdes P.", location: "PR", rating: 5, date: "Oct 7, 2026" },
      { title: "Everything has been as expected", text: "Everything has been as expected! Feeling like my old self again!", name: "Jodi S.", location: "US", rating: 5, date: "Oct 7, 2026" },
      {
        title: "Overall pleased with the service",
        text: "Overall pleased with the service. My one complaint is that meds are reordered and charged without a notice it is about to happen.",
        name: "Alecia E.",
        location: "US",
        rating: 4,
        date: "Oct 7, 2026",
      },
      {
        title: "I was suffering through the change and...",
        text: "I was suffering through the change and having hot flashes all day, every day, along with all of the other side effects. As soon as I started my regimen, I have been symptom free and living my best life.",
        name: "Traci M.",
        location: "US",
        rating: 5,
        date: "Oct 7, 2026",
      },
      { title: "Easy to get in touch and get help from...", text: "Easy to get in touch and get help from Winona Doctor.", name: "Donna", location: "US", rating: 5, date: "Oct 7, 2026" },
      { title: "You've been prompt in your replies and...", text: "You've been prompt in your replies and I feel I've been listened to regarding my personalized plan.", name: "Anne", location: "US", rating: 5, date: "Oct 7, 2026" },
      { title: "They were very responsive the process...", text: "They were very responsive the process was very smooth. Every communication I sent was responded promptly.", name: "Ria K.", location: "US", rating: 5, date: "Oct 7, 2026" },
      {
        title: "Closer to a 4 star rating but I'm still...",
        text: "Closer to a 4 star rating but I'm still in the beginning stages. The dr has been very responsive and we may still have to make adjustments but I can definitely notice it helping. I love the fact that I don't have to block out large amounts of time to set in a drs office.",
        name: "Kim R.",
        location: "US",
        rating: 3,
        date: "Oct 7, 2026",
      },
      {
        title: "I've found my fountain of youth",
        text: "I've found my fountain of youth. Just kidding, but kinda yes lol. My irritation, anxiety, memory, and my night sweats are finally under control. There's really no reason to suffer anymore!",
        name: "Lynn O.",
        location: "US",
        rating: 5,
        date: "Oct 6, 2026",
      },
      { title: "High price and ZERO improvement.", text: "High price and ZERO improvement.", name: "Nicole N.", location: "US", rating: 3, date: "Oct 6, 2026" },
      {
        title: "I have recommended Winona to all of my...",
        text: "I have recommended Winona to all of my perimenopausal friends! The questionnaires are easy to navigate, and my Dr. is fantastic. She responds to me same day with any questions or concerns I have. Where else can you get that?!",
        name: "Jill J.",
        location: "US",
        rating: 5,
        date: "Oct 6, 2026",
      },
      { title: "Immediate response from Doctors", text: "Immediate response from Doctors", name: "Trenny D.", location: "US", rating: 4, date: "Oct 6, 2026" },
      { title: "Almost 3 months now with Winona", text: "Almost 3 months now with Winona, so far so good!", name: "Tracey J.", location: "US", rating: 5, date: "Oct 1, 2026" },
      { title: "Very quick and easy", text: "Very quick and easy. Answered all my questions. Service is amazing.", name: "customer", location: "US", rating: 5, date: "Oct 1, 2026" },
      { title: "Fast and friendly customer service and...", text: "Fast and friendly customer service and support! I'm feeling like myself again, no more hot flashes, body aches and brain fog!", name: "Chris", location: "US", rating: 5, date: "Oct 1, 2026" },
      {
        title: "I love that it was easy going online...",
        text: "I love that it was easy going online expressing what my concerns or questions were and getting to try a product delivered to me. I gave it some time and I don't know that it helped with my sleep or my activity level so I will probably try something different but it was worth a try.",
        name: "Cherie B.",
        location: "US",
        rating: 5,
        date: "Sep 30, 2026",
      },
      { title: "Everything works as it should!", text: "Everything works as it should!", name: "Stacy B.", location: "US", rating: 5, date: "Sep 30, 2026" },
      {
        title: "The entire process has been easy",
        text: "The entire process has been easy! The support I got from the Winona team was great! The Dr. was easy to work with and she suggested things for me I did not even think of! I would Suggest this app to everyone!",
        name: "Annie S.",
        location: "US",
        rating: 5,
        date: "Sep 30, 2026",
      },
      { title: "Winona saved my life!", text: "The hormone replacement therapy is a God send. The meds were so easy to get and I couldn't be happier. I love the service and have recommended it to everyone I know.", name: "Veronica O.", location: "US", rating: 5, date: "Sep 30, 2026" },
      { title: "I feel like I'm back to my old self", text: "I feel like I'm back to my old self. So happy I started treatment with Winona.", name: "Lamista M.", location: "US", rating: 5, date: "Sep 30, 2026" },
      { title: "I'm starting my second round of HRT and...", text: "I'm starting my second round of HRT and have noticed a great improvement in my health and well-being.", name: "Mandy S.", location: "US", rating: 5, date: "Sep 30, 2026" },
      { title: "Highly Recommend", text: "No waiting. No pressure to buy more supplements or products. Supportive. Emails and questions are answered within an hour. Very happy with Winona!", name: "Barbara H.", location: "US", rating: 5, date: "Sep 28, 2026" },
      { title: "I was able to get my prescriptions...", text: "I was able to get my prescriptions without any issues the Doctor that prescribed them is very helpful and I think I am feeling better,", name: "Maria T.", location: "US", rating: 5, date: "Sep 28, 2026" },
      { title: "Easy to use website and I'm starting to...", text: "Easy to use website and I'm starting to feel better. My libido is back! I referred my sister in law.", name: "Marcy L.", location: "US", rating: 5, date: "Aug 8, 2026" },
      {
        title: "Easy to work with and helped me quickly...",
        text: "Easy to work with and helped me quickly when other doctors weren't listening to my symptoms and would only prescribe based on blood work, I have high fluctuations so bloodwork is always inaccurate and that was just delaying my treatment. I feel like a totally new person now",
        name: "Jessica N.",
        location: "US",
        rating: 5,
        date: "Jul 23, 2026",
      },
      {
        title: "I needed help and Winona did that for me.",
        text: "I was having extreme menopausal symptoms and was so hesitant to try HRT but now i have my life back. The process was easy. Everyone including the doctor, was great. One minor adjustment with meds and i am free to live again. I would recommend ten times over. God bless",
        name: "Vickie S.",
        location: "US",
        rating: 5,
        date: "Jul 10, 2026",
      },
      {
        title: "Legit",
        text: "Legit. doctors, easy to use would recommend",
        name: "Sheila B.",
        location: "US",
        rating: 5,
        date: "Aug 26, 2026",
      },
      {
        title: "Great response time and attention to detail",
        text: "Great response time and attention to detail. Doctors are responsive.",
        name: "Melissa M.",
        location: "US",
        rating: 5,
        date: "Aug 26, 2026",
      },
      {
        title: "The meds really help",
        text: "The meds really help",
        name: "Kathryn J.",
        location: "US",
        rating: 5,
        date: "Aug 26, 2026",
      },
      {
        title: "Helpful",
        text: "Helpful, efficient, great results. Quick answers to questions.",
        name: "Ann I.",
        location: "US",
        rating: 5,
        date: "Aug 19, 2026",
      },
    ],
  },
  {
    id: "midi",
    name: "Midi Health",
    tagline: "Virtual perimenopause and menopause care, often covered by insurance",
    logo: "/logos/midi.svg",
    smallLogo: "/logos/midi-icon.svg",
    highlights: [
      "Clinicians trained in midlife women's health",
      "Hormonal and non-hormonal treatment paths",
      "Works with many major insurance plans",
    ],
    // Operator-supplied tracking link, Oct 8, 2026.
    affiliateUrl: "https://track.revoffers.com/aff_c?offer_id=1558&aff_id=12904",
    ctaText: "Visit Site",
    // Operator-verified from Midi Health's claimed Trustpilot profile
    // (claimed Oct 2023): 4.1 average across 1,707 reviews per the operator's
    // Oct 8, 2026 screenshots (was 1,572 in the Aug 2026 capture). The 32
    // reviews from the October page were captured in full - three 1-star, one
    // 2-star, two 3-star included - followed by the five August captures.
    // Names as first name + initial; dates are the experience dates shown.
    trustpilotRating: "4.1",
    trustpilotReviewCount: "1,707",
    trustpilotReviews: [
      { title: "Understanding an knowledgeable", text: "Understanding an knowledgeable", name: "Felicia M.", location: "US", rating: 5, date: "Oct 6, 2026" },
      { title: "Midi Health has been life changing", text: "Midi Health has been life changing. I can't recommend them enough. The staff is great and their portal is easy to use.", name: "Lisa", location: "US", rating: 5, date: "Oct 6, 2026" },
      {
        title: "What a disappointment",
        text: "What a disappointment. Stephanie, my provider, listened to my history, then suggested a course of treatment that I said I had already done with low results. I have PMDD and progesterone gives me anxiety, so asked what the thinking is to put me back on it. \"That's what we do\" and she shut down and stopped talking. The whole expressive tone on her face shifted. I tried to open the conversation back up, but she became defensive and quiet. \"Sorry, I don't have an answer for you. I wish you luck on your journey.\" And that was it. No offer to consult with someone else, refer me to someone more versed in my needs, or get back to me after doing some exploring. Just total shut down. I was not expecting to feel so dismissed by a company started by women for women. But, I have been left feeling rather abandoned. I wish there was a way to contact the company prior to making an appointment to ask if my case is something they have experience with. But there is no availability for that, and no way to choose which provider you see. The only positive is having a virtual visit, and being covered under insurance.",
        name: "customer",
        location: "US",
        rating: 2,
        date: "Oct 6, 2026",
      },
      {
        title: "Visit-Bloodwork-Visit= results. Worth the wait.",
        text: "Between my first visit, all the blood work and my second visit to get the results was a bit lengthy. BUT all worth it. I felt my clinician was knowledgeable. She came up with a health care plan that I was very pleased with. I have high hopes. Anxious to start my Journey to feeling better..",
        name: "Kathy F.",
        location: "US",
        rating: 5,
        date: "Oct 5, 2026",
      },
      {
        title: "I was looking for a doctor who could...",
        text: "I was looking for a doctor who could prescribe the estrogen I had always used since I had a hysterectomy at 16 years old due to ovarian cancer. My oncologist of 30 years went \"concierge\" and I could no longer afford her. I was having such bad night sweats and hot flashes that life became unbearable! My new GYN was too afraid to give me hormones due to my age. Somehow- a google search I think- I came across Midi and it has changed my life!! The PAs are amazing and they care about your quality of life!! I feel so much better and like my old self again!",
        name: "Debbie B.",
        location: "US",
        rating: 5,
        date: "Oct 5, 2026",
      },
      {
        title: "I am so happy",
        text: "I am so happy, I'm 47 years old and this is the first time I have felt heard. This is the first time people actually cared how I felt and wanted to help me. And not just gaslight me and make me feel like I was crazy. I would 100% recommend and do recommend all the women in my life to use midi",
        name: "Nirvana L.",
        location: "US",
        rating: 5,
        date: "Oct 5, 2026",
      },
      {
        title: "quick, fast very convenient and very friendly",
        text: "I love the flexibility. I had my appointment telehealth in my car. I was going from one place to another place and could not make the meeting on time so I pulled over and had my meeting via telehealth from my car. It was quick, to the point and got everything i needed addressed. No need to go in and wait at a doctor's office.",
        name: "Mariana M.",
        location: "US",
        rating: 5,
        date: "Oct 5, 2026",
      },
      {
        title: "It's hard to get really personal about...",
        text: "It's hard to get really personal about our most intimate health issues over a computer camera. Without the in-person care, it can only be so specific. And the 15-minute time slot constraint can really be felt, especially when one has detailed questions. I often feel I'm not getting all the info or guidance I could get.",
        name: "Angel D.",
        location: "US",
        rating: 3,
        date: "Oct 4, 2026",
      },
      { title: "The clinicians are great", text: "The clinicians are great. Highly recommend MIDI Health.", name: "Donna C.", location: "US", rating: 5, date: "Oct 2, 2026" },
      { title: "Top tier care", text: "Midi was extremely quick and easy to set up an appointment and the care given was excellent. I felt heard for the first time in my menopause journey.", name: "Jane", location: "US", rating: 5, date: "Oct 2, 2026" },
      {
        title: "Kind, Caring and Compassionate Care",
        text: "My primary turned me down on helping me with some issues because it was \"old age\" and I needed to learn to cope with it. After research, I found this place with an NP and decided to try it. I love my NP and highly would recommend her to anyone. The video teleahealth is wonderful and I'm on the road to getting back to where I hoped to be. She is kind, compassionate and listens to everything before making the decision for my plan.",
        name: "Michael C.",
        location: "US",
        rating: 5,
        date: "Oct 2, 2026",
      },
      { title: "Amazing !!", text: "My provider was friendly , understanding and thorough . She made sure I understood everything she recommended and how/why she recommended it .", name: "Carmen", location: "US", rating: 5, date: "Oct 2, 2026" },
      {
        title: "Hidden costs and misleading offers that...",
        text: "Hidden costs and misleading offers that this service is covered and in services with my insurance plan. Months later they charged me $250 for a very short Telehealth visit! I believe this is a deliberate attempt to make an apt with them. Higher than a regular Dr visit. STAY AWAY",
        name: "Esther K.",
        location: "US",
        rating: 1,
        date: "Oct 2, 2026",
      },
      {
        title: "Convenience and Excellent Provider and Care",
        text: "The provider has been amazing with listening and changing my treatment plan as needed. She has been friendly, kind, and clearly knowledgeable. She has been careful to make sure my medications are safe, monitor side effects, ensure they are working as they should, and make sure I have refills as needed. The convenience has just been amazing too!",
        name: "Erin W.",
        location: "US",
        rating: 5,
        date: "Oct 1, 2026",
      },
      {
        title: "What made my experience great is that...I feel heard and seen!",
        text: "What made my experience great is that they listened to me! I felt heard and seen! My concerns were not dismissed. I was suffering in silence for five years and no one would listen or believe me. The treatment plan put in place for me is changing my life! I am now mending relationships and getting my life back thanks to MIDI Health.",
        name: "Terri W.",
        location: "US",
        rating: 5,
        date: "Oct 1, 2026",
      },
      {
        title: "I feel incredibly fortunate to have a...",
        text: "I feel incredibly fortunate to have a knowledgeable, thorough, compassionate clinician who listens to me, takes my concerns seriously, and has helped me become much more proactive and up-to-date with my overall health - not just my peri-menopause symptoms!",
        name: "Jane A.",
        location: "US",
        rating: 5,
        date: "Sep 30, 2026",
      },
      {
        title: "My health care provider (Holly)...",
        text: "My health care provider (Holly) listened to my issues and took the time to explain them and address them. She made sure to provide a treatment that my insurance covers, and I am so happy to have received help. I am already feeling the effects of my treatment and I appreciate it a lot.",
        name: "Julie H.",
        location: "US",
        rating: 5,
        date: "Sep 29, 2026",
      },
      {
        title: "My provider",
        text: "My provider, Jayne Fortenberry, was kind and very informative! She listened to me and made me feel at ease with the process of starting HRT. I feel so grateful for her! The whole process was seamless!",
        name: "Candita S.",
        location: "US",
        rating: 5,
        date: "Sep 29, 2026",
      },
      {
        title: "I was a Person and not just a Patient",
        text: "Since going to the doctor on my own as a young adult until 40+, I have never spent more time with a doctor who saw me as a person and who truly heard me. From scheduling to logging off of the appointment was done with ease. My provider got to know me more in my 30 minute visit than my own PCP. She was very thorough, patient, knowledgeable and willing to see me as person and not just the next patient. I know it's crazy to say but I'm actually excited for my next appointment.",
        name: "Holman",
        location: "US",
        rating: 5,
        date: "Sep 29, 2026",
      },
      { title: "No BS", text: "There is no re-explaining, no over justifying. My clinician listened, she educated, we discussed, then there was a clear plan with clear check-ins. No BS, just women getting healthcare.", name: "Erin O.", location: "US", rating: 5, date: "Sep 28, 2026" },
      {
        title: "Feeling great!",
        text: "My provider was very attentive, listening to my concerns and explaining different treatment options thoroughly, including possible side effects. She is personable and remembers me from one visit to the next. My treatment plan has already alleviated so many of my symptoms. The system is easy to access and use.",
        name: "Karen M.",
        location: "US",
        rating: 5,
        date: "Sep 28, 2026",
      },
      { title: "Recommend Midi 100%", text: "Extremely happy with their service, in the short period I have been with them they have helped me substantially recommend them.", name: "Carmen", location: "US", rating: 5, date: "Sep 28, 2026" },
      {
        title: "I was falling apart and was suspicious...",
        text: "I was falling apart and was suspicious it was perimenopause- hearing that my horrible dizziness was actually low estrogen was such a relief about a year ago. Since then this journey hasn't been easy but if not for Midi I would have fallen apart. There are so few clinicians caught up about perimenopause. I hope Midi continues the important work it is doing but doesn't let their clinicians get burned out- an army is needed to help the huge gap in care for women!!",
        name: "Natalie",
        location: "US",
        rating: 5,
        date: "Sep 26, 2026",
      },
      {
        title: "Midi Health gets it. Highly recommend.",
        text: "I recommend Midi Health to anyone I meet that is dealing with symptoms of perimenopause. Tried several other women's health virtual clinics- this is far superior both on ease to work with and their clinical support.",
        name: "Crosky C.",
        location: "US",
        rating: 5,
        date: "Sep 25, 2026",
      },
      {
        title: "Disappointed",
        text: "I loved the actual clinical visit. The APRN was warm, friendly, and knowledgeable. My complaint? The communication via the portal. I came to Midi at the end of my rope. I couldn't have made it any clearer about how I was feeling. To write a script that is on back order...Shameful. To basically dangle a carrot in front of a menopausal woman is unkind. I requested an alternative med via the portal. No response. I updated my pharmacy information in my message... That was reviewed and updated. My actual concern? Not so much. I called Midi. I was told by another provider that she would elevate my concerns and make sure the provider reached out. It didn't happen. Very frustrating to know that 2 miles from house, sitting on a pharmacy counter, there's a medication that could help me, but because my provider only wrote for brand name, I couldn't get the generic. I feel very deflated and unheard. I messaged 3 times, called 3 times. Nada. If this relationship is to continue, you all need to do better with your communication.",
        name: "Laura B.",
        location: "US",
        rating: 3,
        date: "Sep 25, 2026",
      },
      {
        title: "Finally Heard, Finally Hopeful: My Midi Experience",
        text: "For the first time in years - maybe even decades - I finally felt like I was truly being heard by a healthcare provider. My experience with my Midi provider was exceptional. She listened, validated my concerns, and communicated with such authenticity, compassion, and understanding. I never felt rushed, dismissed, or like I had to convince someone that what I was experiencing was real. I left my appointment feeling something I haven't felt in a very long time: hope. Hope that I finally have someone partnering with me to help me feel like myself again. I am so grateful for this experience. Sometimes, simply being heard and knowing someone genuinely cares makes all the difference. For the first time in a long time, I truly believe I'm on the path to getting back to me.",
        name: "Jennifer B.",
        location: "US",
        rating: 5,
        date: "Sep 24, 2026",
      },
      { title: "Easy to access", text: "Easy to access, great clinicians and same day prescriptions for my needs.", name: "J. C.", location: "US", rating: 5, date: "Sep 24, 2026" },
      {
        title: "Avoid like the plague",
        text: "Avoid like the plague! They assigned me a Clinician, with zero personality, communication skills or empathy, then charged my insurance company for a \"mental health\" assessment on top of the cost for the virtual visit. The \"mental health\" assessment was not mentioned in any of their fees. Also, the Clinician assigned wasn't even credentialed to prescribe BHRT. Convenience does not equal quality!",
        name: "Debbie C.",
        location: "US",
        rating: 1,
        date: "Sep 23, 2026",
      },
      {
        title: "Beyond Grateful",
        text: "I was diagnosed with Premature Ovarian Insufficiency (POI) in my mid-30s, but no one ever explained what that meant for my long-term health. Every provider has treated my condition as if POI was just early menopause, and I've spent years feeling exhausted, foggy, and unlike myself. My Midi provider, Tracy Pozar, NP, was the first person to connect all the dots, explain POI as an endocrine condition, and start me on a treatment plan that actually addresses the root cause. For the first time, in a long time, I feel hopeful and truly supported.",
        name: "mrsdsmith",
        location: "US",
        rating: 5,
        date: "Sep 23, 2026",
      },
      {
        title: "Ahhhhhhmazing!",
        text: "Good goddess, I should have done this years ago! The knowledge, patience, and understanding that my clinician offered was bar none. They were incredibly thorough, patient, kind, fun, treated me like a human, and knew exactly how to get to the bottom of the struggles that I was having. It's only been a handful of days and I already feel like a new person. Thank you, thank you thank you!!",
        name: "JC",
        location: "US",
        rating: 5,
        date: "Sep 22, 2026",
      },
      {
        title: "No-show clinician, no follow-up, and forced to redo all my paperwork",
        text: "I was logged in five minutes before my scheduled appointment with everything completed. No one joined. I emailed support while waiting, and their answer was to refresh my browser and check my camera settings. I called as they suggested, and the person I spoke with couldn't help and said the scheduling team would get back to me. No one ever did. Instead, a new appointment was scheduled for me without anyone checking my availability. When I tried to pick a time that worked, the system made me redo all of my intake paperwork, even though I had already completed it for the original appointment. Midi sent an apology and offered to help me reschedule, but when I tried again, it still required me to redo all of the forms. At that point I decided not to move forward. I was excited to talk to menopause experts, but the missed appointment, lack of follow-through, and repeated paperwork made this a very poor first experience. I'll be finding another provider",
        name: "Jennifer K.",
        location: "US",
        rating: 1,
        date: "Sep 21, 2026",
      },
      {
        title: "Heard, Understood and Supported",
        text: "As a woman in my early 50s who was surgically induced into menopause more than 10 years ago, I had become exhausted from constantly having to advocate for myself just to get and maintain hormone replacement therapy. Making an appointment with Midi was honestly one of the best decisions I've made for my health. They ordered an extensive panel of bloodwork that helped validate the concerns I had been trying to communicate for years. Instead of dismissing my symptoms, they listened, explained my options, and worked with me to determine what needed to be addressed and how. The follow-up care has also been wonderful. After years of feeling dismissed and, at times, gaslit by clinicians, I finally feel heard, understood, and supported. I'm so grateful to have found a provider that truly listens and takes my concerns seriously. I only wish I had found Midi sooner!",
        name: "Jessica P.",
        location: "US",
        rating: 5,
        date: "May 29, 2026",
      },
      {
        title: "Scheduling a telehealth appointment was refreshingly simple",
        text: "The process was straightforward and quick - I was able to book a visit without any hassle or long waits. The clinician I met with was wonderful. She was kind, compassionate, and really took the time to listen and understand what I needed. She clearly knew the issues women face in midlife and approached everything with empathy and practical solutions.",
        name: "Gina",
        location: "US",
        rating: 5,
        date: "Aug 24, 2026",
      },
      {
        title: "I have had an exceptional experience",
        text: "I would highly recommend their care to any woman navigating peri/menopause. My clinician is knowledgeable, compassionate, thoughtful, and truly takes the time to listen and understand. I felt heard and supported and she took the time to answer my questions and develop a personalized treatment. I never felt rushed or dismissed, which can unfortunately be difficult to find when seeking menopause care.",
        name: "SD",
        location: "US",
        rating: 5,
        date: "Aug 24, 2026",
      },
      {
        title: "Highly recommend",
        text: "My PA was professional and very thorough. She took time to listen and clearly explained options. She verified my medical history. She answered all my questions demonstrating knowledge and understanding.",
        name: "Kristyn S.",
        location: "US",
        rating: 5,
        date: "Aug 20, 2026",
      },
      {
        title: "I felt heard and understood",
        text: "I felt heard. My doctor understood my concerns. She was kind and patient and demonstrated real care - I had not felt this from any other outside, local clinician. My exams were ordered within minutes enabling me to have these done same day. Unheard of! Honestly. Best experience ever!",
        name: "B. J.",
        location: "US",
        rating: 5,
        date: "Aug 19, 2026",
      },
      {
        title: "My provider is amazing and supportive",
        text: "She listens to me and addresses my concerns. She tells me the truth and discusses the pros and cons. I appreciate her so much!",
        name: "Elizabeth B.",
        location: "US",
        rating: 5,
        date: "Aug 19, 2026",
      },
    ],
  },
  {
    id: "gala",
    name: "Gala",
    tagline: "Doctor-prescribed hormone therapy at a flat $69/month - no membership, no insurance, no price rise at dose changes",
    logo: "/logos/gala.svg",
    smallLogo: "/logos/gala-icon.svg",
    // Gala's HRT page, operator screenshots Oct 8, 2026: "Menopause treatment
    // from $69/month - all included, no insurance needed", FSA & HSA accepted,
    // estradiol pill or patch, progesterone, vaginal estradiol and
    // non-hormonal options, "Provider-led", "Cancel anytime". Gala's hormone-
    // therapy landing page (same screenshots): "Hormone Therapy at $69/month -
    // flat, forever", "no membership fee, no insurance ... no price rise when
    // your dose changes", "Free, discreet shipping in 1-2 days". The page's own
    // "4.8 on Trustpilot" badge and its outcome statistics (70% / 30% / 1 in
    // 2) are Gala's marketing claims and are NOT reproduced; the verified
    // profile figure (4.6 across 4,212) is what we show.
    highlights: [
      "Flat $69/month - no price rise when your dose changes",
      "Estradiol pill or patch, progesterone, vaginal estradiol, non-hormonal options",
      "Free discreet shipping in 1-2 days; FSA/HSA accepted; cancel anytime",
    ],
    // Operator-supplied tracking link, Oct 8, 2026.
    affiliateUrl: "https://track.revoffers.com/aff_c?offer_id=1576&aff_id=12904&url_id=12556",
    ctaText: "Visit Site",
    // Operator-verified from Gala Health's claimed Trustpilot profile
    // (claimed May 2026; operator screenshots Oct 8, 2026): 4.6 average across
    // 4,212 reviews. The profile covers the whole Gala Health platform - the
    // recent page is dominated by GLP-1 weight-loss customers, not menopause
    // care - and the copy says so. Every review on the captured page is kept,
    // including the 1- and 2-star ones; names stored as first name + initial;
    // dates are Trustpilot's experience dates as displayed.
    trustpilotRating: "4.6",
    trustpilotReviewCount: "4,212",
    trustpilotReviews: [
      { title: "Easy process to start the program.", text: "Easy process to start the program.", name: "Jo Anne O.", location: "US", rating: 5, date: "Oct 7, 2026" },
      { title: "Can't wait to try, and I hope it works", text: "Can't wait to try it. I hope it works. Will provide results from beginning to end. Just doing a three month trial", name: "Loth", location: "US", rating: 5, date: "Oct 7, 2026" },
      { title: "Perfect help", text: "Perfect help", name: "Lori B.", location: "US", rating: 5, date: "Oct 7, 2026" },
      {
        title: "If I could provide Zero stars I would",
        text: "If I could provide Zero stars I would. If you have sought treatment with another provider or clinic, DO NOT contact GALA. Payment for services unfilled are not refundable and they will mess up your dosage. Anyone who's been on a glp1 understands the importance of maintaining your scheduled dosage. The contact team will waste valuable time. This company is not worth investing your time, money, or energy into. Please learn from my experience and continue your search for a GLP-1 solution.",
        name: "Patricia V.",
        location: "US",
        rating: 1,
        date: "Oct 6, 2026",
      },
      {
        title: "Incorrect addresses, long processing times, incorrect dosage/blends.",
        text: "All of these positive reviews must be bots or new customers. I had no issues the first two shipments and then things went downhill from there. I've been a customer for 6 months now and every single shipment I have to call in to fix one issue or another. My medication has been delivered to the incorrect address twice now. (I'm pretty sure that's a violation of some sort.) I have wait times of 2 weeks or longer when submitting a new order - this is almost double the time they promise. Their customer service team is among the worst I've seen. I called to change an address on file, the girl said she did, she tried to get off the call with me and I asked her to repeat the address, she froze and didn't say anything for a long time. Turns out she did not update the address. I gave her the correct address again, she repeats it and we end the call. The shipment notification I receive the next day says the incorrect address. This is just one interaction out of several I could share. These are people's medications and they need to be taken seriously. I will be reporting Gala GLP1 and the compounding pharmacy to the Florida Board of Pharmacy, Florida Attorney General, and FDA.",
        name: "Lindsey",
        location: "US",
        rating: 1,
        date: "Oct 6, 2026",
      },
      { title: "Frustrated", text: "Frustrated", name: "Lesleigh H.", location: "US", rating: 2, date: "Oct 5, 2026" },
      { title: "Helpful", text: "I like the Dr review!", name: "Lynda", location: "US", rating: 5, date: "Oct 5, 2026" },
      { title: "Very well", text: "Very well, also easy app, that real result", name: "Consumer", location: "CR", rating: 5, date: "Oct 5, 2026" },
      {
        title: "Packaging",
        text: "The shipping method needs to be rethought. It is very easy to throw away the medication due to an unsatisfactory packing method. Don't hide the vial in wrapper paper, please.",
        name: "Vanessa T.",
        location: "US",
        rating: 3,
        date: "Oct 4, 2026",
      },
      {
        title: "I thought managing everything would be...",
        text: "I thought managing everything would be a hassle, but the app is simple to use and my meds arrived really fast. Just what I needed to stay on track.",
        name: "Faye",
        location: "US",
        rating: 5,
        date: "Oct 4, 2026",
      },
      {
        title: "Real results that only took about 3...",
        text: "Real results that only took about 3 weeks! I was having hot flashes all day long, night sweats, acne and irritability before I started. Now all symptoms have sunsided and may get only 1 or 2 short hot flashes a day. Life changing! Great customer service.",
        name: "Shannon H.",
        location: "US",
        rating: 5,
        date: "Oct 4, 2026",
      },
      { title: "Super easy", text: "Super easy and I'm excited to start", name: "Peanut", location: "US", rating: 5, date: "Oct 4, 2026" },
      { title: "I just started", text: "I just started. I haven't received my medication yet", name: "Serena E.", location: "US", rating: 4, date: "Oct 4, 2026" },
      { title: "So far has been seamless", text: "So far has been seamless", name: "Sue", location: "US", rating: 5, date: "Oct 3, 2026" },
      {
        title: "The new patient intake process was...",
        text: "The new patient intake process was quick. The price was very competitive. And communication with the team was excellent.",
        name: "Kennetito",
        location: "US",
        rating: 5,
        date: "Oct 3, 2026",
      },
      { title: "Continued live support", text: "Continued live support. Price an results.", name: "Jorge", location: "US", rating: 4, date: "Oct 3, 2026" },
      { title: "Nice app user friendly", text: "Nice app user friendly", name: "Theresa", location: "US", rating: 4, date: "Oct 3, 2026" },
      { title: "Easy to use and very productive", text: "Easy to use and very productive", name: "Betsy K.", location: "US", rating: 5, date: "Oct 2, 2026" },
      {
        title: "Buyer BEWARE",
        text: "Buyer BEWARE. Order shipment has been postponed 4 times. They took money from my acct IMMEDIATELY (Sept 21) butorder has not been filled and each time I contact them, they say they're in their fulfillment window.NO THEY'RE NOT Not what's published on their website. Guess they've silently change fulfillment window, getting further and further out each time I call them. Now, instead of medication being shipped Sept 23-28th, it changed to Sept 30th, then Oct 2nd NOW Oct 9th Can we say scammed. If you can't ship in published timeframe, don't debit my acct UNTIL ORDER IS SHIPPED. Will be contacting my bank and refute this charge.",
        name: "Becky W.",
        location: "US",
        rating: 2,
        date: "Oct 2, 2026",
      },
      { title: "Great 😊 pricing good", text: "Great 😊 pricing good Easy to complete Covered everything we wanted", name: "Anna B.", location: "US", rating: 5, date: "Oct 2, 2026" },
      { title: "I try today", text: "I star today I happy and excited", name: "Silvia A.", location: "US", rating: 5, date: "Oct 2, 2026" },
      {
        title: "Mickey Mouse",
        text: "WARNING: DO NOT PREPAY ANNUALLY. A Complete Mickey Mouse Operation Run by AI Bots. If I could give this company a 0, I would. I paid for a full year in advance, which has turned out to be a massive mistake. Like many others, my medication schedule was completely disrupted by their fulfillment delays, causing dangerous gaps in my medical treatment. This isnt just a generic scam; its a completely Mickey Mouse amateur operation masquerading as a professional medical service. The entire customer service department is an AI bot loop that just echoes back whatever you want to hear to pacify you, without actually solving a single problem. You are promised escalations and resolutions by automated scripts, but there are no real human beings taking accountability. Because I paid a year upfront, they are attempting to hold thousands of my dollars hostage. Their standard defense that the prescription is already at the pharmacy only covers a single shipment - it cannot justify withholding a refund for the remaining unfulfilled months of an annual contract. Worse yet, they have completely ignored my official credit card dispute, completely abandoning their obligations the moment they got my money. Save your money, save your health, and do not trust this amateur setup.",
        name: "Debby",
        location: "US",
        rating: 1,
        date: "Sep 1, 2026",
      },
      {
        title: "I was skeptical about trying another...",
        text: "I was skeptical about trying another program, but the app is actually easy to use. It's made keeping track of everything a lot smoother than I expected.",
        name: "Szaiffa T.",
        location: "PH",
        rating: 5,
        date: "Oct 2, 2026",
      },
      { title: "The oil a long time to ship", text: "The oil a long time to ship", name: "Jennifer", location: "US", rating: 3, date: "Oct 1, 2026" },
      { title: "I like the product", text: "I like the product", name: "Tony", location: "US", rating: 4, date: "Oct 1, 2026" },
      {
        title: "Dropped a dress size and feel great in...",
        text: "Dropped a dress size and feel great in my clothes. The value I'm getting from this program is honestly impressive.",
        name: "Francisco C.",
        location: "US",
        rating: 5,
        date: "Oct 1, 2026",
      },
      { title: "Going good losing weights", text: "Going good losing weights", name: "Amy L.", location: "US", rating: 4, date: "Oct 1, 2026" },
      { title: "give it a try", text: "It was easy to understand and gave the best personal care", name: "anonymous", location: "US", rating: 5, date: "Sep 29, 2026" },
      { title: "Great start", text: "Great start", name: "Carmen", location: "US", rating: 5, date: "Sep 30, 2026" },
      {
        title: "Wasn't expecting the app to be so user-friendly...",
        text: "Wasn't expecting the app to be so user-friendly. Plus, my medication showed up right on time and the care feels super personalized. I haven't even gotten approved yet. Just super excited!",
        name: "Alan",
        location: "US",
        rating: 5,
        date: "Oct 1, 2026",
      },
      { title: "Lost 8 lbs in just a month", text: "Lost 8 lbs in just a month. The app is straightforward, and delivery was super quick every time.", name: "JMLM", location: "US", rating: 5, date: "Sep 25, 2026" },
      { title: "Great value", text: "Great value", name: "Nicole", location: "US", rating: 4, date: "Sep 28, 2026" },
      { title: "Fast service and quality products.", text: "Fast service and quality products.", name: "Mary", location: "US", rating: 5, date: "Sep 28, 2026" },
      {
        title: "I've already lost 8 lbs in a month",
        text: "I've already lost 8 lbs in a month. The app is easy to use, and the support from the team feels really personal.",
        name: "Martha",
        location: "US",
        rating: 5,
        date: "Sep 28, 2026",
      },
      { title: "Quick and easy process and seeing...", text: "Quick and easy process and seeing results at a steady pace", name: "Amanda", location: "US", rating: 5, date: "Sep 5, 2026" },
    ],
  },
];

const reviews: ReviewData[] = [
  {
    slug: "midi",
    providerId: "midi",
    shortSummary:
      "Virtual, insurance-friendly care for perimenopause and menopause with clinicians trained in midlife women's health.",
    reviewIntro:
      "Midi Health is a virtual clinic built specifically around perimenopause and menopause - \"Insurance-Covered Hormone Replacement Therapy\" is literally its headline. Care starts with an in-depth virtual visit where a clinician reviews your symptoms, health history and genetics before deciding whether HRT is appropriate; Midi itself notes HRT \"is not appropriate for all\", which is the right posture. Treatment paths span estradiol gels, creams, patches and pills, micronized progesterone, testosterone where clinically appropriate, and non-hormonal prescriptions when hormones aren't the answer. Midi says more than 230,000 women use its midlife care, and its claimed Trustpilot profile averages 4.1 across 1,707 reviews (re-verified October 8, 2026). The October page explains both the 4.1 and the loyalty: most reviews are women saying a Midi clinician was the first to listen after years of being dismissed, and a steady minority describe the other side - an unexpected $250 visit charge after being told insurance covered it, an insurance-billed assessment not listed in the fees, a no-show appointment, a back-ordered prescription with no portal reply. All of it is quoted below. This review covers the model and who it fits.",
    keyFeatures: [
      "Clinicians trained in midlife women's health",
      "Hormonal and non-hormonal treatment paths",
      "Works with many major insurance plans",
      "Ongoing virtual follow-up; labs ordered when needed",
      "Optional Midi supplement line, $31.99-$43.99 per product (sale prices, Oct 2026)",
    ],
    // Clinic visit pricing is still unverified (Midi bills through insurance
    // where it participates). The supplement shop prices below come from the
    // operator's Oct 8, 2026 screenshots of shop.joinmidi.com: sale price with
    // the struck regular price, free shipping on orders above $65. The shop's
    // own star ratings and "clinically-proven" wording are Midi's claims and
    // are not reproduced.
    pricingSummary:
      "Two different price questions. The clinic: Midi works with many major insurance plans, so for most patients the visit cost is a copay set by their plan; we haven't verified Midi's cash price for a visit, and one recent reviewer reports a $250 charge for a telehealth visit she believed was covered - ask what you'll owe before the appointment. The shop: Midi also sells its own supplement line separately from clinic care, with published prices we verified in October 2026 - Daily GLP-1 Support $31.99 (regularly $39.99), Daily Omega-3+ and Daily Cortisol Support $39.99 each (regularly $49.99), Daily Fiber+ and Berberine+ $43.99 each (regularly $54.99), with free shipping on orders above $65. Supplements are optional and are not hormone therapy. Prices as published in October 2026; confirm current rates on Midi's site.",
    pricingPlans: [
      { name: "Daily GLP-1 Support", medication: "Supplement - Midi shop (optional, not HRT)", price: "$31.99", regularPrice: "$39.99", cadence: "sale price, Oct 2026" },
      { name: "Daily Omega-3+", medication: "Supplement - Midi shop (optional, not HRT)", price: "$39.99", regularPrice: "$49.99", cadence: "sale price, Oct 2026" },
      { name: "Daily Cortisol Support", medication: "Supplement - Midi shop (optional, not HRT)", price: "$39.99", regularPrice: "$49.99", cadence: "sale price, Oct 2026" },
      { name: "Daily Fiber+", medication: "Supplement - Midi shop (optional, not HRT)", price: "$43.99", regularPrice: "$54.99", cadence: "sale price, Oct 2026" },
      { name: "Berberine+", medication: "Supplement - Midi shop (optional, not HRT)", price: "$43.99", regularPrice: "$54.99", cadence: "sale price, Oct 2026" },
    ],
    treatmentOptions: [
      "Estradiol gels, creams, patches and pills",
      "Micronized progesterone capsules",
      "Vaginal estrogen therapies (creams or rings)",
      "Testosterone therapy where clinically appropriate",
      "Non-hormonal prescriptions (e.g. SSRIs, neurokinin-3 antagonists) and lifestyle support",
      "Separate supplement line (Omega-3+, Cortisol Support, Fiber+, GLP-1 Support, Berberine+) - optional, sold through Midi's shop",
    ],
    // The flow as Midi describes it and as the captured reviews describe it
    // ("Visit-Bloodwork-Visit", "same day prescriptions").
    howItWorks: [
      { timing: "Day 1", title: "Book a virtual visit", detail: "Choose a time online; many major insurance plans are accepted, otherwise ask the cash price before booking." },
      { timing: "Visit 1", title: "Clinician reviews your symptoms and history", detail: "A clinician trained in midlife women's health takes your history and decides whether hormone therapy, a non-hormonal path, or labs first is appropriate." },
      { timing: "If needed", title: "Bloodwork", detail: "Labs are ordered when the clinician wants them before prescribing - reviewers describe a visit, bloodwork, then a results visit." },
      { timing: "Ongoing", title: "Prescription and follow-up", detail: "Prescriptions go to your pharmacy; follow-up visits and portal messaging adjust the plan over time." },
    ],
    pros: [
      "Menopause-specialist care, not general telehealth",
      "Insurance accepted in many cases - rare in this space",
      "Both hormonal and non-hormonal paths after review",
      "4.1 Trustpilot average across 1,707 reviews",
    ],
    cons: [
      "We haven't verified the cash price of a visit - only the supplement shop prices are verified",
      "Availability and insurance participation vary by state and plan",
      "Recent 1-star reviews cite surprise billing (a $250 visit, an unlisted assessment charge), a no-show clinician and unanswered portal messages",
      "15-minute slots feel short to some reviewers; you don't choose your clinician",
    ],
    bestFor: [
      "Women who want specialist menopause care online",
      "Anyone who wants to use insurance rather than pay cash",
    ],
    finalVerdict:
      "Midi Health is the insurance-friendly specialist of this ranking: dedicated menopause clinicians, a genuinely broad treatment menu (from estradiol formats through testosterone to non-hormonal prescriptions), and coverage through many major plans - backed by a 4.1 Trustpilot average across 1,707 reviews whose recent entries consistently praise clinicians who listen and know midlife medicine. Confirm your plan's participation and current costs on Midi's site - and if you'd rather have simple cash pricing, compare Winona's flat published prices.",
    trustBadges: ["Menopause-trained clinicians", "Licensed US providers", "Insurance-friendly"],
    // Oct 8, 2026: Trustpilot record re-verified (1,707 reviews) and 32 new
    // captured reviews added.
    updatedAt: "2026-10-08",
  },
  {
    slug: "gala",
    providerId: "gala",
    shortSummary:
      "Doctor-prescribed hormone therapy at a flat $69/month - no membership, no insurance, no price rise at dose changes - with estradiol pill or patch, progesterone, vaginal estradiol and non-hormonal options after an online provider review.",
    reviewIntro:
      "Gala Health runs a straightforward telehealth model for hormone care: an online evaluation reviewed by a licensed provider, prescription treatment shipped to your door if appropriate, and ongoing management through its app. The HRT line is priced as simply as it gets: $69/month, described on Gala's hormone-therapy page as flat for as long as you stay - no membership fee, no insurance, no price rise when your dose changes, free discreet shipping in 1-2 days, FSA/HSA accepted, cancel anytime - with estradiol as a pill or patch, progesterone, vaginal estradiol and non-hormonal options on the menu. Its claimed Trustpilot profile averages 4.6 across 4,212 reviews - a large record, with one honest caveat: the profile covers the whole Gala platform, and most recent reviewers are GLP-1 weight-loss customers rather than menopause patients. The recent page splits the way a high-volume telehealth service often does: praise for a quick intake, an easy app and responsive support, next to a cluster of 1- and 2-star reviews about fulfillment delays, a wrong-address shipment and a disputed annual prepayment refund - all quoted in full below. Gala doesn't publish a per-product price list the way Winona does; its promise is one flat number, with the exact plan shown before you pay.",
    keyFeatures: [
      "Flat $69/month - no membership fee, no price rise when your dose changes",
      "Estradiol pill or patch, progesterone, vaginal estradiol, non-hormonal options",
      "100% online: telehealth visit, prescription and free discreet 1-2 day shipping",
      "No insurance needed; FSA/HSA accepted; cancel anytime",
    ],
    pricingSummary:
      "Gala prices hormone therapy at $69/month and describes it as flat for as long as you stay: no membership fee, no insurance to deal with, and no price rise when your dose changes, with the exact plan and price shown before you pay. Shipping is free and discreet in 1-2 days; purchases are FSA/HSA eligible and you can cancel anytime. Gala's main site phrases it as 'from $69/month', its hormone-therapy page as a flat $69 - we quote both. It does not publish per-product prices the way Winona does. Prices as published in October 2026; confirm current rates on Gala's site.",
    pricingPlans: [
      {
        name: "Menopause treatment",
        medication: "Estradiol (pill or patch), progesterone, vaginal estradiol or non-hormonal options, as prescribed",
        price: "$69",
        unit: "/month",
        cadence: "flat - no price rise at dose changes",
        highlights: ["No membership fee, no insurance", "Free discreet shipping in 1-2 days", "FSA/HSA accepted; cancel anytime"],
      },
    ],
    howItWorks: [
      { timing: "Day 1", title: "Online assessment", detail: "Symptoms and history online; the exact plan and price are shown before you pay." },
      { timing: "Review", title: "Licensed provider reads your assessment", detail: "Gala describes care as provider-led, not chatbot-led; a provider decides between estradiol, progesterone, vaginal estradiol or non-hormonal options." },
      { timing: "1-2 days", title: "Free discreet shipping", detail: "Gala states free shipping in 1-2 days - weigh that against the fulfillment-delay reviews quoted on this page." },
      { timing: "Monthly", title: "Flat $69, cancel anytime", detail: "The same price every cycle with no rise at dose changes; the app handles refills and messaging. Pay monthly rather than annually until deliveries prove smooth." },
    ],
    treatmentOptions: [
      "Estradiol - daily pill or transdermal patch (bioidentical)",
      "Progesterone - daily oral capsule (bioidentical)",
      "Vaginal estradiol - low-dose local cream or tablet",
      "Non-hormonal prescription options",
    ],
    pros: [
      "Flat $69/month with no price rise at dose changes - no membership, no insurance",
      "Full menu: estradiol pill or patch, progesterone, vaginal estradiol and non-hormonal options",
      "4.6 Trustpilot average across 4,212 reviews (platform-wide)",
      "Fully online, provider-led process; free 1-2 day shipping; FSA/HSA accepted; cancel anytime",
    ],
    cons: [
      "No per-product price list like Winona's - one flat number, plan shown at checkout",
      "Recent 1- and 2-star reviews cite fulfillment delays and a disputed annual-prepay refund",
      "Trustpilot record covers all of Gala, mostly GLP-1 customers - not menopause care specifically",
    ],
    bestFor: [
      "Women who want an all-included monthly price without insurance paperwork",
      "Those who want hormonal and non-hormonal options from one online provider",
    ],
    finalVerdict:
      "Gala Health offers the standard modern telehealth flow - evaluate online, prescribe if appropriate, ship, follow up - and a 4.6 Trustpilot average across 4,212 reviews says most customers come away satisfied. Read the record with two things in mind: it speaks for the whole platform, mostly GLP-1 customers, and its most recent low-star reviews describe shipment delays and a refund dispute over an annual prepayment, so pay monthly rather than annually until you've had a few smooth deliveries. On price it is the simplest offer in our HRT ranking: a flat $69/month that Gala says never rises when your dose changes, with free 1-2 day shipping - against Winona's per-product list ($39-$149/month) and Midi's insurance route, which can cost less if your plan participates. Prices as published in October 2026; confirm current rates on Gala's site.",
    trustBadges: ["Flat $69/month", "4.6 across 4,212 Trustpilot reviews", "Licensed US providers"],
    // Oct 8, 2026: Trustpilot record, captured reviews and published pricing added.
    updatedAt: "2026-10-08",
  },
  {
    slug: "winona",
    providerId: "winona",
    shortSummary:
      "Menopause-focused telehealth prescribing physician-directed, body-identical hormone therapy with discreet monthly delivery.",
    reviewIntro:
      "Winona does one thing: menopause and perimenopause care. Board-certified physicians prescribe bioidentical hormone therapy after an online medical review - the consultation itself is free, and you pay only if a physician prescribes and you approve the treatment. Prices are flat and published: creams run $89/month, estrogen tablets $54, progesterone capsules $39, with FSA/HSA eligibility and discreet monthly delivery. Its claimed Trustpilot profile averages 4.6 across 8,678 reviews (re-verified October 8, 2026) - the strongest verified record in this ranking - and the October page reads the way a menopause clinic should: hot flashes, night sweats and brain fog gone, doctors who answer the same day, a free online intake with no video call. The counterweights are there too and quoted below: one reviewer paid and saw no improvement, one was charged for a refill without notice, and one found it did nothing for her sleep. Winona itself reports a 4.6/5 rating from 100,000+ women.",
    keyFeatures: [
      "Dedicated entirely to menopause and perimenopause",
      "Free physician consultation - pay only if prescribed",
      "Flat published prices ($39-$149/month by product); FSA/HSA eligible",
      "Discreet home delivery in under 5 days; 24-hour physician messaging",
    ],
    pricingSummary:
      "Winona publishes flat monthly prices, rare in menopause care: Estrogen Body Cream, Progesterone Body Cream, combined Estrogen + Progesterone Body Cream and Vaginal Estrogen Cream each run $89/month; the Estrogen Patch is $149/month; Estrogen Tablets are $54/month, Progesterone Capsules $39/month, and the DHEA supplement is $27 per 3 months. The physician consultation is free - you pay only if prescribed and you approve the plan - purchases are FSA/HSA eligible, Winona says treatment arrives in under 5 days, and physician messaging is available 24 hours. Cream and patch prices re-verified on Winona's site on October 8, 2026; tablet, capsule and DHEA prices as published in August 2026. Confirm current rates on Winona's site.",
    pricingPlans: [
      { name: "Progesterone Capsules", medication: "Micronized progesterone", price: "$39", unit: "/month" },
      { name: "Estrogen Tablets", medication: "Bioidentical estrogen", price: "$54", unit: "/month" },
      { name: "Estrogen Body Cream", medication: "Bioidentical estrogen", price: "$89", unit: "/month" },
      { name: "Progesterone Body Cream", medication: "Micronized progesterone", price: "$89", unit: "/month" },
      { name: "Estrogen + Progesterone Body Cream", medication: "Combined bioidentical formula", price: "$89", unit: "/month" },
      { name: "Vaginal Estrogen Cream", medication: "Localized bioidentical estrogen", price: "$89", unit: "/month" },
      // Operator screenshot of Winona's product page, Oct 8, 2026.
      { name: "Estrogen Patch", medication: "Transdermal bioidentical estrogen", price: "$149", unit: "/month" },
      { name: "DHEA", medication: "DHEA supplement (90 capsules)", price: "$27", unit: "/3 months" },
    ],
    howItWorks: [
      { timing: "Day 1", title: "Online questionnaire", detail: "Symptoms and history, all online - reviewers single out that there is no video call. The consultation is free." },
      { timing: "Within days", title: "Physician review", detail: "A board-certified physician reviews the answers and proposes a treatment; you pay only if prescribed and you approve the plan." },
      { timing: "Under 5 days", title: "Discreet delivery", detail: "Winona says treatment arrives in under 5 days; shipments then recur monthly." },
      { timing: "Ongoing", title: "Adjust with your doctor", detail: "24-hour physician messaging; reviewers describe dose adjustments as symptoms settle. Note the refill-charge complaint below - check your reorder settings." },
    ],
    treatmentOptions: [
      "Body creams - estrogen, progesterone, or combined",
      "Vaginal estrogen cream",
      "Estrogen tablets and progesterone capsules",
      "Estrogen patch (transdermal)",
      "DHEA supplement",
    ],
    pros: [
      "Menopause-only focus - the service is built for this",
      "Free consultation; flat published prices from $39/month",
      "4.6 Trustpilot average across 8,678 reviews",
      "FSA/HSA eligible with discreet recurring delivery",
    ],
    cons: [
      "Cash-pay model - no insurance path like Midi's",
      "Compounded formulations are not individually FDA-approved products",
      "A few recent reviewers report refills reordered and charged without notice, or no improvement for the price",
    ],
    bestFor: [
      "Women who want a dedicated menopause HRT service",
      "Those who prefer flat direct-pay pricing over insurance paperwork",
    ],
    finalVerdict:
      "Winona is the focused, direct-pay counterpart to Midi's insurance-based model: a service built entirely around menopause hormone therapy, with a free physician consultation, flat published prices ($39-$149/month by product), FSA/HSA eligibility and a 4.6 Trustpilot average across 8,678 reviews. If insurance coverage matters more than pricing simplicity, compare Midi Health first - otherwise this is the most transparent offer in our HRT ranking.",
    trustBadges: ["Menopause-focused physicians", "Licensed US providers", "Discreet delivery"],
    // Oct 8, 2026: Trustpilot record re-verified (8,678 reviews) and 26 new
    // captured reviews added.
    updatedAt: "2026-10-08",
  },
];

const battles: BattleData[] = [
  {
    slug: "midi-vs-winona",
    provider1Id: "midi",
    provider2Id: "winona",
    title: "Midi Health vs Winona (2026): Which Fits You?",
    matchupLabel: "Midi Health vs Winona",
    subtitle: "Insurance-friendly specialist visits vs a focused, direct-pay hormone-therapy subscription.",
    description:
      "Midi Health (menopause-trained clinicians, insurance-friendly) vs Winona (body-identical HRT, direct pay, monthly delivery). An honest comparison.",
    intro:
      "Midi Health and Winona are both built specifically around menopause - which makes this the most instructive matchup in our HRT ranking. The difference is the model. Midi runs like a virtual specialist clinic: menopause-trained clinicians, visits that many major insurance plans cover, and treatment plans that can be hormonal or non-hormonal. Winona runs like a focused product: physician-prescribed, body-identical hormone therapy on a direct-pay subscription, shipped discreetly every month. Winona publishes flat prices ($39-$149/month by product, re-verified October 2026) with a free consultation; Midi's cost runs through your insurance plan, and we haven't verified its cash pricing. Beyond that, this comparison is about the care model - the thing that actually separates them.",
    verdict:
      "Choose by how you want to pay and how broad you want the care to be. If you have insurance that participates and want a clinician who can also weigh non-hormonal options, Midi Health is the stronger model - specialist care with coverage is rare in this space. If you've decided on hormone therapy and want a dedicated service with predictable direct-pay delivery, Winona's focus is the draw. Confirm current pricing and availability on both sites before deciding.",
    verdictWinnerPoints: [
      "Works with many major insurance plans",
      "Hormonal AND non-hormonal treatment paths",
      "Clinicians trained in midlife women's health",
    ],
    verdictLoserPoints: [
      "Dedicated entirely to menopause hormone therapy",
      "Direct-pay subscription with monthly delivery",
      "No insurance paperwork to navigate",
    ],
    winnerId: "midi",
    categories: [
      {
        name: "Care Model",
        winner: "provider1",
        explanation:
          "Both are menopause-focused, but Midi's clinic model covers more ground: its clinicians can steer between hormonal and non-hormonal options after review, where Winona is built around hormone therapy specifically. For someone still deciding what treatment fits, the broader menu matters.",
        supportingPoints: [
          "Hormonal + non-hormonal paths (Midi)",
          "Dedicated HRT focus (Winona)",
          "Medical review before prescribing (both)",
        ],
      },
      {
        name: "Paying for It",
        winner: "provider1",
        explanation:
          "Midi works with many major insurance plans - genuinely unusual for telehealth menopause care, where direct pay is the norm. Winona is direct-pay by design, which is simpler but entirely out of pocket: flat published prices of $39-$149/month by product, and the consultation is free. We haven't verified Midi's cash pricing, so if your plan participates, coverage is the decidable fact; if it doesn't, Winona's published prices are the only known number.",
        supportingPoints: [
          "Many major insurance plans accepted (Midi)",
          "$39-$149/mo published, free consultation (Winona)",
        ],
      },
      {
        name: "Convenience & Delivery",
        winner: "provider2",
        explanation:
          "Winona's subscription model ships treatment discreetly to your door on a monthly cycle - a set-and-forget structure. Midi's clinic model centers on visits and prescriptions, with fulfillment depending on your plan and pharmacy.",
        supportingPoints: [
          "Discreet monthly home delivery (Winona)",
          "Visit-centered clinic flow (Midi)",
        ],
      },
      {
        name: "Specialization",
        winner: "tie",
        explanation:
          "This is the rare matchup where both sides are true specialists - Midi in midlife women's health broadly, Winona in menopause hormone therapy specifically. Neither is a general telehealth platform with a menopause page bolted on.",
        supportingPoints: [
          "Menopause-trained clinicians (Midi)",
          "Menopause-only service (Winona)",
        ],
      },
    ],
    features: [
      { feature: "Focus", provider1Value: "Perimenopause & menopause clinic", provider2Value: "Menopause hormone therapy", highlight: "both" },
      { feature: "Insurance", provider1Value: "Many major plans accepted", provider2Value: "Direct pay", highlight: "provider1" },
      { feature: "Treatment paths", provider1Value: "Hormonal + non-hormonal", provider2Value: "Body-identical hormone therapy", highlight: "provider1" },
      { feature: "Delivery", provider1Value: "Via plan/pharmacy", provider2Value: "Discreet monthly home delivery", highlight: "provider2" },
      { feature: "Pricing", provider1Value: "Depends on your insurance plan", provider2Value: "$39-$149/mo published; free consult", highlight: "provider2" },
      { feature: "Trustpilot", provider1Value: "4.1 (1,707 reviews)", provider2Value: "4.6 (8,678 reviews)", highlight: "provider2" },
    ],
    // Oct 8, 2026: pricing statements corrected (Winona's published prices
    // were already verified when the "neither verified" wording shipped).
    updatedAt: "2026-10-08",
  },
];

// SEO long-tail guides for the menopause/HRT query space. No provider pricing
// exists in this vertical yet, so every article is educational and hedged -
// zero invented numbers, no efficacy statistics, treatment decisions always
// deferred to a licensed clinician. Question headings feed the FAQPage schema.
const articles: ArticleData[] = [
  // ───── Trend-riding coverage (Google Trends, Aug 31 2026) ─────
  // "pros and cons of hrt" (+50%), "what is hrt" (+20% on the top list,
  // with "what does hrt stand for" +40%) and "hrt vs birth control" (+40%)
  // were rising with thin or no coverage. Qualitative established knowledge
  // only - no invented risk figures, clinician-decides framing throughout.
  // (The breast-cancer risk question is deliberately NOT a standalone
  // article per operator decision; pros-and-cons routes it to a clinician.)
  {
    slug: "what-is-hrt",
    title: "What Is HRT? Hormone Replacement Therapy, Explained (2026)",
    description:
      "HRT stands for hormone replacement therapy - restoring the estrogen (and often progesterone) that decline through menopause. What it treats, the forms it comes in, and how women start it online.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-08-31",
    updatedAt: "2026-08-31",
    heroColor: "#F7EEF4",
    author: "Treatments Hub Staff",
    keyTakeaways: [
      "HRT stands for hormone replacement therapy: restoring the hormones - mainly estrogen, often with progesterone - that decline through perimenopause and menopause.",
      "It remains the most effective treatment for the classic menopause symptoms - hot flashes, night sweats and genitourinary changes - and the sleep disruption those night sweats cause.",
      "It comes in multiple forms - pills, patches, gels and creams - and the form choice is a real medical decision, not just a preference.",
      "Whether HRT fits you depends on your symptoms, history and timing - a licensed clinician makes that call, and modern telehealth has made the evaluation genuinely accessible.",
    ],
    sections: [
      {
        heading: "What does HRT stand for?",
        body: `HRT stands for <strong>hormone replacement therapy</strong> (you will also see "menopausal hormone therapy" or MHT in medical writing - same thing). The idea is in the name: through perimenopause and menopause, the ovaries wind down production of estrogen and progesterone, and the symptoms that follow - covered below - trace back to that decline. HRT replaces what declined, at doses meant to relieve symptoms. One important scoping note: this article covers menopause-related HRT for women; testosterone therapy for men is a different treatment with its own rules - the differences are in <a href="/hrt/articles/is-hrt-the-same-as-trt">is HRT the same as TRT</a>.`,
      },
      {
        heading: "What does HRT actually treat?",
        body: `The strongest case is the classic menopause cluster: <strong>hot flashes and night sweats</strong> (where HRT remains the most effective treatment available), the sleep disruption they cause, mood changes tied to the transition, and the genitourinary symptoms - dryness, discomfort, urinary changes - that tend to worsen rather than pass with time. Estrogen also protects bone, which is part of the long-term conversation with your clinician. What it is not: an anti-aging cure-all, and a legitimate prescriber will frame it around your actual symptoms, not a promise of turning back clocks. If you are not sure whether what you are feeling is perimenopause yet, start with <a href="/hrt/articles/perimenopause-vs-menopause">perimenopause vs menopause</a>.`,
      },
      {
        heading: "Why do some women take estrogen and progesterone together?",
        body: `Because the two hormones have different jobs in treatment. Estrogen does the symptom-relief work - and for a woman who still has her uterus, taking estrogen alone lets the uterine lining build up, which is why progesterone (or a progestin) is added to protect it. Women who have had a hysterectomy typically use estrogen alone. This single distinction explains most of the "estrogen vs progesterone" confusion in search results, and it is one of the first things a prescriber sorts out from your history.`,
      },
      {
        heading: "What forms does HRT come in?",
        body: `More than most women expect: pills, skin patches, gels, sprays, creams and vaginal preparations for localized symptoms. The delivery route is a genuine medical decision - how the hormone enters the body affects the risk conversation, and localized symptoms sometimes need only localized treatment - which is why the form gets chosen with a clinician rather than off a shelf. The trade-offs between the two most common routes are covered in <a href="/hrt/articles/estrogen-patch-vs-pill">estrogen patch vs pill</a>.`,
      },
      {
        heading: "How do I find out if HRT is right for me?",
        body: `Through an evaluation, and it has gotten dramatically easier to get one. Telehealth menopause providers - <a href="/hrt/reviews/midi">Midi</a> and <a href="/hrt/reviews/winona">Winona</a> among the ones we review - run the intake, history and clinician consultation online, and prescribe when appropriate. The decision weighs your symptoms, your medical history, and timing relative to menopause; there are real contraindications, which is exactly why this runs through a licensed clinician and not a checkout page. Our <a href="/hrt">HRT provider comparison</a> maps the options, and <a href="/hrt/articles/how-to-get-hrt-online">how to get HRT online</a> walks the process. For the balanced picture before you decide, read <a href="/hrt/articles/hrt-pros-and-cons">the pros and cons of HRT</a>. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "hrt-pros-and-cons",
    title: "The Pros and Cons of HRT: A Balanced Look (2026)",
    description:
      "What HRT genuinely does well, the trade-offs and risks that deserve a clinician conversation, and how timing changes the picture - laid out without selling either direction.",
    category: "Advice",
    readTime: "7 min read",
    publishedAt: "2026-08-31",
    updatedAt: "2026-08-31",
    heroColor: "#F2EFF6",
    author: "Treatments Hub Staff",
    keyTakeaways: [
      "The pro side is real: HRT is the most effective treatment for hot flashes and night sweats, helps genitourinary symptoms that otherwise worsen, and protects bone.",
      "The con side is real too: side effects exist, some histories rule it out, and the risk conversation - including the breast-cancer question - genuinely depends on your history, the formulation and timing.",
      "Timing matters more than most women hear: starting near the menopause transition is a different proposition from starting many years after it.",
      "The honest bottom line: HRT is neither the danger of its 2000s reputation nor a universal fix - it is a personal risk-benefit call made with a clinician who knows your history.",
    ],
    sections: [
      {
        heading: "What are the real pros of HRT?",
        body: `Start with what is not controversial. For the defining symptoms of menopause - <strong>hot flashes and night sweats</strong> - HRT is the most effective treatment there is, and the sleep and mood improvements that follow often matter as much as the flashes themselves. Genitourinary symptoms (dryness, discomfort, urinary changes) respond well, which matters because they tend to worsen without treatment rather than pass. Estrogen protects bone density, a long-term benefit that becomes more relevant the earlier menopause arrives. For a woman whose symptoms are disrupting work, sleep and relationships, these are not marginal gains - they are the difference the treatment exists for.`,
      },
      {
        heading: "What are the cons and risks of HRT?",
        body: `Three categories, honestly stated. <strong>Side effects</strong>: some women experience breast tenderness, bloating, headaches or bleeding changes, especially early - often manageable by adjusting dose or form, but real. <strong>Contraindications</strong>: certain histories - including some cancers and blood-clot conditions - rule HRT out or reshape it substantially, which is why the medical history is not paperwork theater. <strong>The risk conversation</strong>: you have likely heard about breast-cancer risk, and the honest treatment of it is that the answer is personal - it depends on your history, the formulation, whether progesterone is in the picture, and when you start. That conversation belongs with a clinician who has your chart, not with a website's summary - ours included. What we can say responsibly: the modern understanding is considerably more nuanced than the reputation HRT acquired in the early 2000s, and blanket fear is as poor a guide as blanket enthusiasm.`,
      },
      {
        heading: "The factor that changes everything: timing",
        body: `The piece most women never hear: <em>when</em> you start HRT shapes the risk-benefit picture. Starting around the menopause transition - when symptoms actually begin - is a meaningfully different proposition from starting many years afterward, and much of the confusion in older headlines traces to studies that averaged those very different situations together. This is also why "I will tough it out for a few years and decide later" is itself a decision with consequences worth discussing, not a neutral default. If you are unsure where you are in the transition, <a href="/hrt/articles/perimenopause-vs-menopause">perimenopause vs menopause</a> is the primer.`,
      },
      {
        heading: "So how do you actually decide?",
        body: `Not alone, and not from headlines in either direction. The decision is a structured conversation: your symptoms and how much they cost you, your personal and family history, your timing, and the formulation and route that fit - <a href="/hrt/articles/estrogen-patch-vs-pill">patch vs pill</a> being one of the real choices. Menopause-focused telehealth has made that conversation accessible: providers like <a href="/hrt/reviews/midi">Midi</a> and <a href="/hrt/reviews/winona">Winona</a> are built around exactly this evaluation, and our <a href="/hrt">provider comparison</a> maps the field. Go in with your questions written down - a good clinician welcomes them, and how they handle the risk questions is itself a signal of quality. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "hrt-vs-birth-control",
    title: "HRT vs Birth Control: Not the Same Pills, Not the Same Job (2026)",
    description:
      "Birth control suppresses your cycle with contraceptive-dose hormones; HRT replaces declining hormones at lower doses - and doesn't prevent pregnancy. How the two differ and when women switch.",
    category: "Comparison",
    readTime: "6 min read",
    publishedAt: "2026-08-31",
    updatedAt: "2026-08-31",
    heroColor: "#EFF2F7",
    author: "Treatments Hub Staff",
    keyTakeaways: [
      "Both contain hormones, but the jobs are opposite: birth control overrides your cycle at contraceptive doses; HRT tops up declining hormones at substantially lower doses.",
      "HRT does not prevent pregnancy - a genuinely important point for perimenopausal women who can still conceive.",
      "Many women in perimenopause are on birth control for cycle control and symptom cover; the transition question is when to move from suppressing the cycle to replacing what has declined.",
      "The switch point is a clinician decision based on your age, symptoms and contraception needs - not a birthday.",
    ],
    sections: [
      {
        heading: "Aren't they basically the same hormones?",
        body: `Related molecules, opposite missions. <strong>Birth control</strong> uses synthetic hormones at doses high enough to override your natural cycle - suppressing ovulation is the entire point - and those doses are set for a body with full hormone production of its own. <strong>HRT</strong> works from the other direction: it replaces hormones that have declined, at substantially lower doses aimed at relieving symptoms, and it makes no attempt to suppress anything. Same hormone families, different molecules in many products, very different doses, opposite jobs - which is why the two are not interchangeable and why "I'm already on hormones" does not answer the menopause question.`,
      },
      {
        heading: "Does HRT prevent pregnancy?",
        body: `No - and for perimenopausal women this is the point that genuinely matters. HRT doses do not reliably suppress ovulation, and pregnancy remains possible through perimenopause until menopause is actually confirmed. A woman who switches from birth control to HRT while still perimenopausal may still need contraception alongside - one of several reasons the transition between the two is a planned, clinician-guided step rather than a swap. If you are unsure which side of the transition you are on, <a href="/hrt/articles/perimenopause-vs-menopause">perimenopause vs menopause</a> covers the signals.`,
      },
      {
        heading: "Why are so many perimenopausal women on birth control?",
        body: `Because it works as a bridge, and often deliberately: contraceptive-dose hormones smooth the erratic cycles of perimenopause, cover contraception while fertility is winding down, and blunt some early symptoms along the way. The catch is that the same suppression can mask where you actually are in the transition - symptoms and cycles are hidden behind the override - so the question "am I in menopause yet?" gets harder to answer from the inside. That is one of the standard things a menopause clinician untangles when planning the move from suppression to replacement.`,
      },
      {
        heading: "When do women switch from birth control to HRT?",
        body: `When the goal changes: from controlling a cycle (and preventing pregnancy) to treating the symptoms of hormone decline. In practice the switch is a judgment call built from your age, your symptoms, your contraception needs and your history - contraceptive doses carry their own considerations as women get older, which is part of why clinicians revisit the question rather than letting the prescription roll on by inertia. Menopause-focused telehealth providers handle exactly this transition: <a href="/hrt/reviews/midi">Midi</a> and <a href="/hrt/reviews/winona">Winona</a> both evaluate where you are and what fits next, and our <a href="/hrt">HRT provider comparison</a> maps the options. Before deciding anything, <a href="/hrt/articles/hrt-pros-and-cons">the pros and cons of HRT</a> is the balanced read. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "how-to-get-hrt-online",
    title: "How to Get HRT Online in 2026: The Legitimate Route",
    description:
      "How hormone replacement therapy is prescribed online: the telehealth process, what a legitimate provider always requires, and how to compare menopause care models.",
    category: "Guide",
    readTime: "5 min read",
    publishedAt: "2026-08-28",
    updatedAt: "2026-08-28",
    heroColor: "#F7EEF4",
    author: "Treatments Hub Staff",
    sections: [
      {
        heading: "Can you get HRT prescribed online?",
        body: `Yes - menopause care has moved online the same way other specialties have. Licensed clinicians evaluate your symptoms, health history and risk factors through a telehealth visit, and if hormone therapy is appropriate, prescriptions are filled through licensed pharmacies and shipped or sent to your local pharmacy. What never changes: HRT is prescription-only, and a legitimate service always puts a licensed clinician's evaluation before any treatment. Anything that skips that step isn't a shortcut - it's a red flag.`,
      },
      {
        heading: "How does the online HRT process work?",
        body: `The typical flow has three steps. First, an intake: your symptoms, cycle history, medical and family history, and any prior hormone use. Second, a clinician visit - at specialist menopause services this is usually a real video appointment rather than a questionnaire review, because hormone therapy decisions are individual and risk-dependent. Third, if prescribed, treatment ships with ongoing follow-up to adjust dose and delivery method. Compare how the leading services structure this in our <a href="/hrt/midi-vs-winona">Midi Health vs Winona</a> comparison.`,
      },
      {
        heading: "What should you check before choosing an online HRT provider?",
        body: `Four things separate serious menopause care from a checkout page: a licensed clinician who actually evaluates you (and can decline treatment); clarity about what's included in the visit and follow-up; transparency about whether they work with insurance or are cash-pay; and a real conversation about risks and alternatives, not just a yes. Our <a href="/hrt">HRT provider ranking</a> compares the care models side by side - and where we haven't verified a provider's pricing, we say so rather than guessing.`,
      },
      {
        heading: "Is online HRT right for everyone?",
        body: `No - and a good provider will tell you that. Hormone therapy has real contraindications, and the right first step depends on your history; some situations call for in-person care and exams. Telehealth shines for access and follow-up convenience, especially where menopause specialists are scarce locally. Start with <a href="/hrt/articles/perimenopause-vs-menopause">perimenopause vs menopause</a> to map where you are, and bring that picture to a licensed clinician.`,
      },
    ],
  },
  {
    slug: "estrogen-patch-vs-pill",
    title: "Estrogen Patch vs Pill: Which HRT Delivery Fits You?",
    description:
      "Estrogen patch vs pill for HRT: how the delivery methods differ, why clinicians weigh them differently, and the questions to bring to your prescriber.",
    category: "Guide",
    readTime: "5 min read",
    publishedAt: "2026-08-28",
    updatedAt: "2026-08-28",
    heroColor: "#EEF4FB",
    author: "Treatments Hub Staff",
    sections: [
      {
        heading: "What's the difference between the estrogen patch and the pill?",
        body: `Same hormone family, different route into the body. A patch delivers estrogen through the skin directly into the bloodstream and is typically changed once or twice a week; a pill is taken daily and is processed through the digestive system and liver first. That routing difference is why clinicians often weigh the two differently for different women - it's a genuine clinical decision, not a preference checkbox.`,
      },
      {
        heading: "Why do clinicians often prefer transdermal options?",
        body: `Because skin delivery bypasses first-pass liver processing, transdermal estrogen is often discussed for women where that pathway matters to risk assessment. Whether that applies to you depends on your personal and family history - which is exactly what the prescribing visit is for. The honest takeaway: neither format is universally "better"; the right one is the one your clinician matches to your profile and that you'll use consistently.`,
      },
      {
        heading: "Are there other HRT delivery methods?",
        body: `Yes - gels and sprays (also transdermal), vaginal formulations for localized symptoms, and progesterone components in their own forms for women with a uterus. Online menopause services differ in which formats they prescribe and whether they use standard FDA-approved products or compounded formulations - see <a href="/hrt/articles/bioidentical-hormones-explained">what "bioidentical" actually means</a> for that distinction, and compare provider approaches on our <a href="/hrt">HRT ranking</a>.`,
      },
      {
        heading: "How do you decide - patch, pill, or something else?",
        body: `Bring three things to a licensed clinician: your symptom picture, your health history (including clotting, cardiovascular and cancer history in you and your family), and your honest preference about daily pills versus weekly patches - adherence is a real clinical factor. A specialist visit is where this gets settled; our <a href="/hrt/midi-vs-winona">comparison of menopause care models</a> shows how the leading online services run that conversation.`,
      },
    ],
  },
  {
    slug: "bioidentical-hormones-explained",
    title: "Bioidentical Hormones: What the Term Actually Means",
    description:
      "\"Bioidentical\" is one of the most misused words in menopause care. What it really means, the difference between FDA-approved and compounded bioidenticals, and the questions that matter.",
    category: "Science",
    readTime: "5 min read",
    publishedAt: "2026-08-28",
    updatedAt: "2026-08-28",
    heroColor: "#F0FAF5",
    author: "Treatments Hub Staff",
    sections: [
      {
        heading: "What does \"bioidentical\" actually mean?",
        body: `Chemically, it means the hormone molecule matches the one your body produces - estradiol that is structurally estradiol, progesterone that is structurally progesterone. Here's what marketing often skips: many standard, FDA-approved HRT products are already bioidentical by that definition. The word describes the molecule, not the manufacturer, and it isn't a synonym for "natural" or "safer".`,
      },
      {
        heading: "FDA-approved vs compounded bioidenticals: what's the difference?",
        body: `FDA-approved bioidentical products are manufactured at standardized doses with regulatory oversight of quality and labeling. Compounded bioidentical hormone therapy is mixed per-prescription by a compounding pharmacy - which allows customized doses and combinations, with the trade-off that compounded preparations are not individually FDA-approved products. Online menopause services differ on exactly this line, and it's worth knowing which model a provider uses before you start - our <a href="/hrt">HRT provider comparison</a> notes each service's approach.`,
      },
      {
        heading: "Is compounded HRT right for you?",
        body: `That's a clinician conversation, not a marketing one. Reasonable candidates include women who need doses or combinations standard products don't offer. The important questions to ask any provider: why compounded rather than an FDA-approved product for my case, which pharmacy compounds it, and how will dosing be monitored and adjusted. A provider comfortable with those questions is a good sign in itself.`,
      },
      {
        heading: "What are the red flags to avoid?",
        body: `Claims that bioidentical means risk-free; hormone "pellets" or protocols sold with promises no evidence supports; salivary-test-driven dosing pitched as precision; and anyone prescribing without a real clinical evaluation. Hormone therapy is legitimate medicine with real trade-offs - treat any provider who pretends otherwise accordingly. Start from <a href="/hrt/articles/how-to-get-hrt-online">how legitimate online HRT works</a> and compare real services on our <a href="/hrt">ranking</a>.`,
      },
    ],
  },
  {
    slug: "perimenopause-vs-menopause",
    title: "Perimenopause vs Menopause: When Does Treatment Start?",
    description:
      "Perimenopause vs menopause: how the stages differ, why symptoms often start years before periods stop, and when a treatment conversation makes sense.",
    category: "Guide",
    readTime: "5 min read",
    publishedAt: "2026-08-28",
    updatedAt: "2026-08-28",
    heroColor: "#F7EEF4",
    author: "Treatments Hub Staff",
    sections: [
      {
        heading: "What is the difference between perimenopause and menopause?",
        body: `Menopause is technically a single milestone - twelve consecutive months without a period. Perimenopause is the transition running up to it, often lasting years, when hormone levels fluctuate and symptoms typically begin: cycle changes, hot flashes, sleep disruption, mood shifts. The distinction matters because many women assume treatment is only "for menopause" - while their hardest symptom years are happening before that milestone.`,
      },
      {
        heading: "Can you start treatment during perimenopause?",
        body: `Treatment conversations don't wait for the twelve-month mark - symptom relief during the transition is a legitimate clinical topic, and options (hormonal and non-hormonal) depend on your symptoms, cycle status and history. That's a licensed clinician's call, made with your full picture. Specialist menopause services are built around exactly this evaluation - see how the leading models compare in <a href="/hrt/midi-vs-winona">Midi Health vs Winona</a>.`,
      },
      {
        heading: "When should you actually talk to a clinician?",
        body: `A practical rule: when symptoms interfere with your life - sleep, work, relationships - that's enough reason, regardless of where you are on the timeline. Track your symptoms and cycle for a few weeks before the visit; concrete patterns make the evaluation better. And if a clinician dismisses menopause-related concerns outright, that's a reason to find one who specializes - which is much of why <a href="/hrt/articles/how-to-get-hrt-online">online menopause care</a> exists. Compare the services on our <a href="/hrt">HRT ranking</a>.`,
      },
    ],
  },
  {
    slug: "is-hrt-the-same-as-trt",
    title: "Is HRT the Same as TRT? The Difference, Explained",
    description:
      "HRT and TRT are both hormone replacement - but they answer different situations. What each treats, who each is for, and where to compare providers for both.",
    category: "Guide",
    readTime: "4 min read",
    publishedAt: "2026-08-28",
    updatedAt: "2026-08-28",
    heroColor: "#EEF4FB",
    author: "Treatments Hub Staff",
    sections: [
      {
        heading: "Is HRT the same as TRT?",
        body: `They're siblings, not twins. Both replace hormones the body is producing less of, but "HRT" conventionally refers to menopause hormone therapy - estrogen, usually with progesterone - while "TRT" is testosterone replacement therapy, most commonly for men with clinically low testosterone. Different hormones, different diagnostics, different specialists, and largely different providers.`,
      },
      {
        heading: "Who is each treatment for?",
        body: `Menopause HRT addresses symptoms of the menopause transition, confirmed mainly by symptoms and history. TRT addresses diagnosed low testosterone, which requires blood work - legitimate TRT providers always test before treating. Women can also be prescribed testosterone in specific clinical situations, but that's a specialist decision within menopause care, not "TRT" as marketed to men.`,
      },
      {
        heading: "Where do you compare providers for each?",
        body: `We rank them separately, because the clinical models are separate: the <a href="/hrt">HRT &amp; menopause provider comparison</a> covers the online menopause clinics, and the <a href="/trt">TRT provider comparison</a> covers testosterone services (including what each charges, where we've verified it). Whichever side you're on, the constant is the same: a licensed clinician's evaluation first, treatment second.`,
      },
    ],
  },
  // ───── Depth expansion (Sep 8 2026): high-volume HRT questions with thin or
  // no coverage - side effects, weight, duration, libido, non-hormonal options,
  // timing, and menopausal hair thinning (cross-linked to hair-loss). Qualitative
  // established knowledge only; no invented figures; clinician-decides framing.
  {
    slug: "hrt-side-effects",
    title: "HRT Side Effects: What's Common, What's Manageable, and What's Serious (2026)",
    description:
      "The side effects women actually report on HRT, which ones usually settle as the body adjusts, which ones a dose or delivery change fixes, and the warning signs that mean call your clinician.",
    category: "Science",
    readTime: "7 min read",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    heroColor: "#F4EEF3",
    author: "Treatments Hub Staff",
    keyTakeaways: [
      "Most early HRT side effects - breast tenderness, bloating, spotting, mild headaches - are the body adjusting, and often fade over the first weeks to months.",
      "Many persistent side effects are a formulation problem, not a verdict on HRT: changing the dose, the hormone, or the delivery route (patch vs pill) resolves a lot of them.",
      "A smaller set of symptoms are genuine warning signs that warrant prompt medical attention rather than waiting them out.",
      "Side effects are individual - the point of a prescribing clinician is to tune the regimen to you, which is why 'it didn't agree with me' rarely means 'HRT doesn't work'.",
    ],
    sections: [
      {
        heading: "What are the common, early side effects?",
        body: `The ones women report most in the first weeks are the body recalibrating to hormones it had been running short on: <strong>breast tenderness, bloating, mild nausea, headaches, mood shifts, and changes in bleeding or spotting</strong>. On a patch, some women get local skin irritation. The honest framing is that these are common and usually mild, and a large share settle as the regimen beds in over the first one to three months. What matters is not pretending they never happen - it is knowing that "unpleasant for a few weeks" and "wrong regimen for me" are different situations, and a good prescriber will tell you which milestones to expect before you start. If you are still weighing the decision itself, <a href="/hrt/articles/hrt-pros-and-cons">the pros and cons of HRT</a> lays out both sides.`,
      },
      {
        heading: "Which side effects mean the formulation needs adjusting?",
        body: `This is the part most search results skip. A side effect that persists past the adjustment window is frequently a <em>formulation</em> signal, not a reason to abandon treatment. Persistent bloating or breast tenderness can track to the estrogen dose or the type of progesterone; ongoing headaches or mood effects sometimes improve when a woman moves from an oral pill to a transdermal patch or gel, because the route changes how the hormone is delivered. Breakthrough bleeding often needs the progesterone side of the regimen revisited. None of this is something to self-adjust - but it is exactly why the first few months of HRT are a tuning period with your clinician, and why <a href="/hrt/articles/estrogen-patch-vs-pill">patch vs pill</a> is a real medical choice rather than a preference.`,
      },
      {
        heading: "What are the serious warning signs?",
        body: `A short, non-negotiable list. Symptoms that point to a possible blood clot - such as sudden leg pain or swelling, chest pain, breathlessness, or a sudden severe headache or vision change - are reasons to seek medical help promptly rather than wait for the next appointment. New or unusual breast changes, or bleeding that is unexpected for your situation, should be reported and evaluated rather than assumed benign. These are uncommon, but they are the reason HRT runs through a licensed clinician who takes your full history first: certain conditions and histories change the risk picture, which is covered honestly in <a href="/hrt/articles/hrt-pros-and-cons">the pros and cons</a>. This article is general information and cannot tell you which category your symptom falls into - that is what your prescriber is for.`,
      },
      {
        heading: "Do side effects depend on the type of HRT?",
        body: `They do, and that is genuinely good news, because it means side effects are often adjustable. The estrogen dose, whether progesterone is included and in what form, and the delivery route all shape what you feel. It is also why "bioidentical" marketing deserves a clear head - the term describes molecular structure, not a guarantee of fewer side effects, and we untangle that in <a href="/hrt/articles/bioidentical-hormones-explained">bioidentical hormones explained</a>. The practical takeaway: a side effect is information for your clinician to act on, not a fixed property of "HRT" as a single thing.`,
      },
      {
        heading: "How do I manage this in practice?",
        body: `Track what you feel and when, especially in the first three months, and bring it to your prescriber rather than quietly stopping - stopping abruptly can bring symptoms back and loses the information about what to adjust. Menopause-focused telehealth is built around this kind of iterative tuning: providers like <a href="/hrt/reviews/midi">Midi</a> and <a href="/hrt/reviews/winona">Winona</a> handle follow-ups and dose adjustments as part of the service, and our <a href="/hrt">HRT provider comparison</a> maps who offers what. If you are still at the "is this even for me" stage, start with <a href="/hrt/articles/what-is-hrt">what is HRT</a>. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "does-hrt-cause-weight-gain",
    title: "Does HRT Cause Weight Gain? Separating Menopause From the Medication (2026)",
    description:
      "The honest answer to one of the most-searched HRT fears: what menopause itself does to weight, what HRT does and doesn't do, and why the two get blamed for each other.",
    category: "Science",
    readTime: "7 min read",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    heroColor: "#EEF2F5",
    author: "Treatments Hub Staff",
    keyTakeaways: [
      "The weight changes women notice around this age are driven largely by menopause and aging - shifting metabolism and fat distribution - not by HRT itself.",
      "HRT is not a weight-loss treatment and should not be sold as one, but it is also not the cause of midlife weight gain it is often blamed for.",
      "Some early, temporary bloating or fluid shifts on HRT can feel like weight gain without being fat gain - and often settle as the regimen adjusts.",
      "If weight is the primary concern, that is a separate conversation with its own evidence-based options - not a reason to start or avoid HRT.",
    ],
    sections: [
      {
        heading: "Does HRT itself make you gain weight?",
        body: `The fear is understandable and the honest answer is reassuring: HRT is not established as a driver of fat gain, and it is not a weight-loss drug either. What genuinely happens around the menopause transition - a shift in metabolism, muscle mass and where the body stores fat, with more settling around the middle - is largely the work of falling estrogen and aging, and it tends to happen with or without HRT. In other words, the thing women are afraid HRT will cause is often already underway because of menopause itself, which is exactly why the two get tangled together in search results. A responsible clinician will not promise HRT will change your weight in either direction.`,
      },
      {
        heading: "So why do some women feel heavier after starting?",
        body: `Two honest reasons. First, timing: women often start HRT in the same window that menopausal body changes are accelerating, so changes that would have happened anyway get attributed to the new medication. Second, early <strong>fluid retention and bloating</strong> are among the common initial side effects - covered in <a href="/hrt/articles/hrt-side-effects">HRT side effects</a> - and that can register on the scale or in how clothes fit without being fat gain. That kind of shift frequently settles as the body adjusts over the first weeks to months, and if it does not, the regimen itself can be revisited with your prescriber.`,
      },
      {
        heading: "Can HRT actually help with midlife body changes?",
        body: `Indirectly, and this is where honesty matters most. By treating the symptoms that wreck sleep and energy - hot flashes, night sweats, disrupted sleep - HRT can make it more feasible to stay active and eat the way you intend, and poor sleep is itself tied to appetite and metabolism. That is a real, plausible benefit. What it is not is a shortcut: HRT does not do the work of a weight strategy, and any provider implying otherwise is overselling. The lever for weight is still the ordinary one - nutrition, activity, sleep, and where appropriate, treatments designed for weight.`,
      },
      {
        heading: "What if weight is my main concern?",
        body: `Then it deserves its own path rather than being routed through hormone therapy. Weight management has its own evidence-based options, and if that is genuinely the priority, our <a href="/weight-loss">weight-loss provider comparison</a> and guides cover them directly - including how the medical options actually work and what they cost. HRT and weight care can run in parallel under clinical guidance when both are warranted, but they answer different questions. Deciding which conversation you are actually trying to have is the first useful step.`,
      },
      {
        heading: "The honest bottom line",
        body: `Do not start HRT expecting to lose weight, and do not avoid HRT for fear of gaining it - both are the wrong reasons because neither reflects what the treatment does. Base the HRT decision on your menopause symptoms, history and timing, with a clinician - the framework is in <a href="/hrt/articles/hrt-pros-and-cons">the pros and cons of HRT</a> - and handle weight as its own project. Menopause-focused providers like <a href="/hrt/reviews/midi">Midi</a> and <a href="/hrt/reviews/winona">Winona</a> can evaluate the hormone side; see the field in our <a href="/hrt">HRT comparison</a>. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "how-long-can-you-stay-on-hrt",
    title: "How Long Can You Stay on HRT? The Honest Answer (2026)",
    description:
      "There is no universal expiry date on HRT. Why the old 'shortest time possible' rule has softened, what actually drives the duration decision, and why it's a periodic review rather than a countdown.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    heroColor: "#F2EFF6",
    author: "Treatments Hub Staff",
    keyTakeaways: [
      "There is no fixed maximum number of years that applies to everyone - the rigid 'stop after five years' rule has given way to individualized, periodically reviewed decisions.",
      "Duration depends on your symptoms, your risk profile, the formulation, and when you started - the same factors that shaped the decision to begin.",
      "The right model is a regular check-in with your clinician - typically about once a year - not a countdown to a hard stop.",
      "If and when you do stop, doing it as a planned, guided step reduces the chance of symptoms rebounding.",
    ],
    sections: [
      {
        heading: "Is there a hard limit on how long you can take HRT?",
        body: `No single number applies to every woman, and the blunt "shortest duration possible" guidance that many women still remember has been softened considerably as the understanding matured. The modern approach treats duration as an individual risk-benefit judgment that gets revisited over time, not a fixed prescription length set on day one. For some women that means a few years through the worst of the transition; for others, with their clinician's agreement, it means longer. The key shift is from a rule to a conversation.`,
      },
      {
        heading: "What actually decides how long you stay on it?",
        body: `The same factors that shaped starting, re-weighed as time passes: how much your symptoms would return without it, your personal and family history, the formulation and dose you are on, and your age and time since menopause. <strong>Timing</strong> matters here as much as it did at the start - the risk-benefit balance can shift as you get older, which is precisely why it is reviewed rather than assumed. Genitourinary symptoms in particular tend to persist or worsen with time rather than resolve, which is one reason some treatment continues in some form. The framework behind all of this is in <a href="/hrt/articles/hrt-pros-and-cons">the pros and cons of HRT</a>.`,
      },
      {
        heading: "How often should the decision be reviewed?",
        body: `As a rule of thumb, at least once a year - a deliberate check-in where you and your clinician look at whether the benefits still outweigh the considerations for you specifically, whether the dose or form should change, and whether anything in your health has shifted. This is one of the practical advantages of menopause-focused telehealth: providers such as <a href="/hrt/reviews/midi">Midi</a> and <a href="/hrt/reviews/winona">Winona</a> build these periodic reviews into the service rather than letting a prescription roll on untouched. A regimen that is never revisited is the actual thing to avoid - in either direction.`,
      },
      {
        heading: "What happens when you stop?",
        body: `Stopping is a legitimate decision, and like starting it works best as a planned step rather than an abrupt halt. Some women find symptoms return when they come off - sometimes briefly, sometimes enough to reconsider - and a clinician can guide how to taper or transition to minimize that, and what non-hormonal options exist if symptoms persist. If that scenario is on your mind, <a href="/hrt/articles/non-hormonal-menopause-treatment">non-hormonal menopause treatments</a> covers the alternatives, and the <a href="/hrt">HRT provider comparison</a> maps who supports the full arc. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "hrt-and-libido",
    title: "HRT and Libido: Can Hormone Therapy Bring Back Sex Drive? (2026)",
    description:
      "Low libido in menopause has more than one cause, so HRT helps some women and not others. How estrogen, comfort, sleep and testosterone each play a part - and why it's rarely a one-hormone fix.",
    category: "Science",
    readTime: "6 min read",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    heroColor: "#F4EEF3",
    author: "Treatments Hub Staff",
    keyTakeaways: [
      "Menopausal low libido usually has several overlapping causes, so there is no single hormone that reliably 'switches it back on'.",
      "Standard HRT often helps indirectly and substantially - by relieving painful dryness, restoring sleep, and lifting the mood and energy that desire depends on.",
      "Estrogen addresses comfort and the physical side; the role of testosterone in women is more limited, specialized and carefully prescribed.",
      "Because the causes are layered, the fix is usually a combination and a conversation, not a single pill.",
    ],
    sections: [
      {
        heading: "Why does libido drop in menopause?",
        body: `Because several things move at once. Falling estrogen brings <strong>vaginal dryness and discomfort</strong> that can make sex painful rather than appealing; hot flashes and night sweats wreck the sleep that desire depends on; mood and energy dip; and life stage and relationship factors sit on top of all of it. That layering is the whole reason low libido is frustrating to treat with a single lever - it is rarely "one hormone went down" and more often "four things went sideways together." Naming which factors are loudest for you is the first genuinely useful step, and it is a conversation a clinician is equipped to have.`,
      },
      {
        heading: "Does standard HRT help libido?",
        body: `Often, and frequently more than women expect - but usually <em>indirectly</em>, which is worth understanding so the result is not disappointing. Estrogen therapy, including localized vaginal preparations, treats the dryness and discomfort that were making intimacy unappealing; systemic HRT that restores sleep and lifts hot flashes gives back the energy and mood that desire runs on. For many women, fixing the comfort-and-sleep problem does more for libido than any drug aimed at desire directly. The forms and routes that do this are covered in <a href="/hrt/articles/estrogen-patch-vs-pill">estrogen patch vs pill</a>.`,
      },
      {
        heading: "What about testosterone for women?",
        body: `This is where honesty and caution matter. Testosterone does play a role in female libido, and in specific cases clinicians do prescribe low-dose testosterone for women - but it is a specialized, carefully dosed, closely monitored decision, not a routine add-on, and the products and guidance are more limited than for men. It is emphatically not the same thing as male testosterone therapy: the difference between the two treatments is laid out in <a href="/hrt/articles/is-hrt-the-same-as-trt">is HRT the same as TRT</a>. Anyone marketing testosterone to women as a simple libido switch is overstepping what the evidence and the prescribing norms support.`,
      },
      {
        heading: "How should I approach this with a provider?",
        body: `Go in ready to describe which piece is loudest - pain, dryness, low desire despite comfort, exhaustion, or mood - because the treatment follows the cause. A menopause-focused provider can address the estrogen-and-comfort side directly and assess whether anything more specialized is warranted; <a href="/hrt/reviews/midi">Midi</a> and <a href="/hrt/reviews/winona">Winona</a> are built for exactly this kind of evaluation, and our <a href="/hrt">HRT provider comparison</a> maps the options. For the broader trade-offs before starting anything, <a href="/hrt/articles/hrt-pros-and-cons">the pros and cons of HRT</a> is the read. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "non-hormonal-menopause-treatment",
    title: "Non-Hormonal Menopause Treatments: The Options When HRT Isn't Right (2026)",
    description:
      "HRT is the most effective menopause treatment, but it isn't for everyone. The legitimate non-hormonal routes - prescription and lifestyle - laid out honestly, without hype and without selling supplements.",
    category: "Advice",
    readTime: "7 min read",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    heroColor: "#EEF4F1",
    author: "Treatments Hub Staff",
    keyTakeaways: [
      "HRT remains the most effective option for hot flashes, but some women can't or would rather not take it - and there are legitimate non-hormonal routes.",
      "There are prescription non-hormonal medications for hot flashes; whether one fits you is a clinician decision, not an over-the-counter choice.",
      "Lifestyle measures - sleep, triggers, activity, temperature management - are real, modest levers that help many women and cost nothing to try.",
      "We don't recommend supplements: the evidence is inconsistent and 'natural' doesn't mean risk-free or interaction-free - run any supplement past your prescriber.",
    ],
    sections: [
      {
        heading: "Why would someone skip HRT?",
        body: `Several honest reasons. Some women have a history or condition that makes HRT inappropriate; some weigh the risk-benefit picture and personally prefer not to; some have symptoms that are mild enough not to warrant it; and some simply want to understand the alternatives before deciding. HRT being the <em>most effective</em> option for hot flashes - which it is - does not make it the only legitimate one, and a good clinician will discuss the alternatives rather than treating HRT as all-or-nothing. If you have not yet mapped the HRT side of the ledger, <a href="/hrt/articles/hrt-pros-and-cons">the pros and cons of HRT</a> is the starting point.`,
      },
      {
        heading: "Are there non-hormonal prescription options?",
        body: `Yes - there are prescription medications used specifically to reduce hot flashes that are not hormones, and they can be a genuine option for women who cannot or prefer not to take estrogen. Because these are prescription decisions with their own considerations and side effects, the responsible thing this article can do is tell you they exist and that they are worth asking about - not steer you toward a specific drug, which is your prescriber's call based on your history. The point is that "no HRT" does not have to mean "no medical help".`,
      },
      {
        heading: "What lifestyle measures actually help?",
        body: `The unglamorous ones, which nonetheless help a real share of women and carry no downside to trying: identifying and reducing personal <strong>hot-flash triggers</strong> (for many, alcohol, caffeine, spicy food or heat), keeping the sleep environment cool, regular physical activity, layered clothing, and stress and sleep management. None of these is a cure, and it is honest to say they are modest rather than dramatic - but for mild symptoms, or alongside other treatment, they are free, safe and often worthwhile. They are also entirely compatible with HRT for women who do take it.`,
      },
      {
        heading: "What about supplements and 'natural' remedies?",
        body: `Here we will be straight with you, because a lot of the internet is not: <strong>we do not recommend supplements for menopause.</strong> The evidence for the popular ones is inconsistent at best, "natural" does not mean free of side effects or drug interactions, and the category is poorly regulated compared with prescription medicine. That does not mean nothing in it could ever help anyone - it means the honest position is to run any supplement you are considering past your clinician, who can check it against your medications and history, rather than trusting a product page. Our house rule is that we would rather tell you the evidence is thin than sell you certainty we do not have.`,
      },
      {
        heading: "How do I decide between all this?",
        body: `Start by sizing the problem - how much your symptoms actually cost you day to day - and take that to a clinician who can lay out the full menu: HRT, non-hormonal prescription options, and lifestyle measures, with the trade-offs of each for your situation. Menopause-focused telehealth providers like <a href="/hrt/reviews/midi">Midi</a> and <a href="/hrt/reviews/winona">Winona</a> can run that evaluation, and our <a href="/hrt">HRT provider comparison</a> shows who covers what. Whichever direction you go, it should be a considered choice, not a default. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "when-to-start-hrt",
    title: "When Should You Start HRT? The Timing Window, Explained (2026)",
    description:
      "Timing is the factor most women never hear about. Why starting near the menopause transition is a different proposition from starting years later, and how to know when your window is open.",
    category: "Guide",
    readTime: "6 min read",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    heroColor: "#F2EFF6",
    author: "Treatments Hub Staff",
    keyTakeaways: [
      "When you start HRT shapes the risk-benefit balance - starting near the menopause transition is generally a more favorable proposition than starting many years afterward.",
      "The trigger to consider it is symptoms that affect your life, not hitting a particular birthday or a specific lab number.",
      "'I'll tough it out and decide later' is itself a decision with consequences - including that the favorable window doesn't stay open indefinitely.",
      "There's no single right age; the right time is individual and best judged with a clinician who knows your history and where you are in the transition.",
    ],
    sections: [
      {
        heading: "Is there a 'best time' to start HRT?",
        body: `There is a widely recognized concept that timing matters, often described as a window: starting HRT around the menopause transition - when symptoms begin - generally carries a more favorable risk-benefit balance than starting for the first time many years after menopause. Much of the fear that attached to HRT in the early 2000s traces to studies that averaged together women starting at very different ages and stages, which muddied exactly this point. The practical upshot is that timing is not a footnote - it is one of the main variables, and it is covered as such in <a href="/hrt/articles/hrt-pros-and-cons">the pros and cons of HRT</a>.`,
      },
      {
        heading: "What actually signals it's time to consider it?",
        body: `Symptoms that are costing you - disrupted sleep from night sweats, hot flashes that interfere with work or life, genitourinary changes, mood and energy shifts tied to the transition. The trigger is impact, not a birthday and not a single hormone reading; menopause is diagnosed clinically far more than by chasing lab numbers, and a good provider treats the woman in front of them rather than a value on a page. If you are unsure whether what you are feeling is even perimenopause yet, <a href="/hrt/articles/perimenopause-vs-menopause">perimenopause vs menopause</a> sorts out the stages.`,
      },
      {
        heading: "What's the risk of waiting?",
        body: `Two things worth being honest about. First, symptoms you "tough out" are real costs in the meantime - lost sleep, strained work and relationships, and genitourinary changes that tend to worsen rather than pass. Second, the favorable starting window does not stay open forever; deferring the decision for many years can change the risk-benefit math, so "later" is not a risk-free neutral. This is not a scare tactic - it is the reason clinicians frame waiting as an active choice to discuss rather than a safe default.`,
      },
      {
        heading: "So how do I time it right?",
        body: `Bring it up when symptoms start affecting your life, not when you have endured them long enough to feel you have earned help. Telehealth has removed most of the friction that used to make women wait: <a href="/hrt/reviews/midi">Midi</a> and <a href="/hrt/reviews/winona">Winona</a> run the evaluation online and can judge, with your history, whether now is a sensible time to start - and our <a href="/hrt">HRT provider comparison</a> maps the field. If you decide the time is right, <a href="/hrt/articles/how-to-get-hrt-online">how to get HRT online</a> walks the process. This article is general information, not medical advice.`,
      },
    ],
  },
  {
    slug: "hrt-and-hair-thinning",
    title: "HRT and Hair Thinning in Menopause: What Changes and What Helps (2026)",
    description:
      "Many women notice their hair thinning around menopause. How the hormone shift drives it, whether HRT helps, and where dedicated hair-loss treatment fits alongside it.",
    category: "Science",
    readTime: "6 min read",
    publishedAt: "2026-09-08",
    updatedAt: "2026-09-08",
    heroColor: "#F3EFEA",
    author: "Treatments Hub Staff",
    keyTakeaways: [
      "Hair thinning around menopause is common and largely driven by the shift in the estrogen-to-androgen balance as estrogen declines.",
      "HRT may help hair indirectly for some women by easing the hormonal shift, but it is not a hair-loss treatment and shouldn't be started primarily for hair.",
      "Female pattern hair thinning has its own dedicated, evidence-based treatments that work on the hair directly.",
      "Because thinning can have several causes - including iron and thyroid issues - it's worth getting the cause identified rather than guessing.",
    ],
    sections: [
      {
        heading: "Why does hair thin around menopause?",
        body: `As estrogen falls, the balance between estrogen and androgens shifts, and for many women that shows up as gradual <strong>thinning across the crown and part line</strong> - the female pattern - rather than the receding hairline men see. Hair may also feel finer or shed more during the transition. This is genuinely common and genuinely distressing, and it is one of the menopause changes women are least warned about. It is also not the only possible cause of thinning at this age, which matters for getting it treated correctly.`,
      },
      {
        heading: "Does HRT help with hair?",
        body: `Possibly, indirectly, for some women - and it is important not to oversell this. By addressing the underlying hormonal shift, HRT may support hair for certain women, but the evidence is not strong enough to call HRT a hair-loss treatment, and starting hormone therapy <em>primarily</em> to regrow hair is the wrong reason to start it. Base the HRT decision on your menopause symptoms and history - the framework is in <a href="/hrt/articles/hrt-pros-and-cons">the pros and cons of HRT</a> - and treat any hair benefit as a possible bonus rather than the goal.`,
      },
      {
        heading: "What actually treats menopausal hair thinning?",
        body: `Female pattern thinning has its own dedicated treatments that act on the hair directly, and they are better established for that job than hormone therapy is. If hair is a primary concern, it deserves its own evaluation and its own treatment plan rather than being folded into the menopause visit and hoped for. Our <a href="/hair-loss">hair-loss treatment comparison</a> covers the options that are designed for exactly this, and how women access them - it is a parallel track that can run alongside HRT under clinical guidance.`,
      },
      {
        heading: "What else could be causing it?",
        body: `Worth ruling out before assuming it is purely hormonal: <strong>iron deficiency</strong> and <strong>thyroid problems</strong> are both common, both more likely around this age, and both very treatable once identified - and either can thin hair on its own. That is why the sensible first move is getting the cause pinned down rather than guessing, whether through your menopause provider or a hair-focused evaluation. Providers like <a href="/hrt/reviews/midi">Midi</a> and <a href="/hrt/reviews/winona">Winona</a> handle the menopause side; the <a href="/hrt">HRT comparison</a> and the <a href="/hair-loss">hair-loss comparison</a> cover the two tracks. This article is general information, not medical advice.`,
      },
    ],
  },
];

const faqs: FaqItem[] = [
  {
    question: "What is HRT for menopause?",
    answer:
      "Hormone replacement therapy (HRT) uses estrogen - often with progesterone - to relieve menopause symptoms such as hot flashes and night sweats. It's a prescription treatment that a licensed provider tailors to your history and needs.",
  },
  {
    question: "Is hormone replacement therapy safe?",
    answer:
      "HRT has benefits and risks that depend on your age, health history, and the type and timing of treatment. A licensed provider will review your situation to determine whether it's appropriate for you - it isn't right for everyone.",
  },
  {
    question: "Do I need lab tests or an evaluation for HRT?",
    answer:
      "Providers evaluate your symptoms and medical history before prescribing, and some require bloodwork up front. Ongoing follow-up helps tailor treatment and monitor your response.",
  },
  {
    question: "Can HRT be prescribed online?",
    answer:
      "Yes - reputable telehealth services connect you with licensed clinicians who review your information before prescribing, and dispense through licensed pharmacies. Always confirm a provider's licensing and practices.",
  },
  {
    question: "Does insurance cover online menopause care?",
    answer:
      "It depends on the provider and your plan. Most telehealth HRT services are direct-pay, but some - Midi Health among them - work with many major insurance plans. Check both the provider's site and your plan before assuming either way.",
  },
  {
    question: "What symptoms can HRT help with?",
    answer:
      "HRT is commonly used for hot flashes, night sweats, and other menopause symptoms, and may help with additional concerns depending on your situation. A provider can explain what it may and may not address for you.",
  },
];

export function hrtSeed(base: SiteConfig): SiteConfig {
  return {
    ...base,
    siteName: "treatmentshub.com",
    hero: {
      ...base.hero,
      backgroundImageUrl: "",
      imageAlt: "",
      // Oct 8, 2026: ranking cut to the three partner providers.
      updatedLabel: "Last Updated: October 2026",
      h1: "Best HRT & Menopause Providers of 2026",
      h2: "Compare the top online menopause and hormone-therapy providers, side by side",
      description:
        "Compare the best online HRT and menopause providers - care models, specialist focus, insurance friendliness and treatment options - to find the program that fits you. Where we haven't verified a provider's pricing yet, we say so instead of guessing.",
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
