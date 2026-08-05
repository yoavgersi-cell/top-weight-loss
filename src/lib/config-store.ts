import { put, list } from "@vercel/blob";
import { type SiteConfig, type ReviewData, type ArticleData, type BattleData, type LandingPageData, type TrustpilotReview, defaultConfig } from "./config";
import productsJson from "@/data/products.json";
import faqsJson from "@/data/faqs.json";
import { articles as defaultArticlesData } from "@/data/articles";

const BLOB_KEY = "site-config.json";

// Default Trustpilot reviews per provider id. Shown on battle pages until the
// provider's reviews are edited in the admin CMS, which then takes precedence.
const seedTrustpilot: Record<string, { rating?: string; reviewCount?: string; reviews: TrustpilotReview[] }> = {
  wellmedr: {
    reviews: [
      {
        title: "Contacted the company to slow my refills",
        text: "Contacted the company to slow my refills. Talked to Shelby. She was so helpful, so fast, and helped me set up exactly what I wanted within 5 minutes. Thank you Shelby",
        name: "Scott and Lisa Carter",
        location: "US",
        rating: 5,
      },
      {
        title: "Prompt solutions",
        text: "Candice listened and offered solutions.",
        name: "Gooie",
        location: "US",
        rating: 5,
      },
      {
        title: "Customer Service",
        text: "Thus far, the entire process using Wellmedr has been pretty successful, pleasant and above all reassuring! Speaking to this specific experience, I reached out to obtain an update on the shipment of my meds and the turnaround time for a response was almost immediate! Can't wait to begin this journey and looking forward to adding another success story to Wellmedr's site!",
        name: "Jessica",
        location: "US",
        rating: 5,
      },
    ],
  },
  altrx: {
    reviews: [
      {
        title: "Good experience but a little frustration",
        text: "I'm on my third month with altRx and while my first two months were very smooth, this third one has been terrible. My refill order has yet to be fulfilled with zero reason as to why. Customer service says they requested to “expedite it” but nothing yet. We shall see. I've been happy otherwise.",
        name: "jb",
        location: "US",
        rating: 4,
      },
      {
        title: "My first time ordering from AltRx",
        text: "I was looking for a telehealth that utilized the same pharmacy I was already using, and AltRx was one of the ones. Ordering through AltRx was almost a 3rd of the cost I spent the first 3 months through the FSA site. Everything else ran smoothly. I ordered 7/5 and received it today, 7/13. I paid through Afterpay, so they can't renew without my approval.",
        name: "Kimberly Williams",
        location: "US",
        rating: 4,
      },
      {
        title: "Fantastic customer service",
        text: "Fantastic customer service! I had a quick question about tracking my delivery, and their support team responded within an hour with all the details. The product quality is top-notch. Highly recommend",
        name: "Lenden",
        location: "US",
        rating: 4,
      },
    ],
  },
  ro: {
    reviews: [
      {
        title: "Very easy process!",
        text: "Very easy process!",
        name: "Jessica Phillips",
        location: "US",
        rating: 5,
      },
      {
        title: "All has been convenient and affordable",
        text: "All has been convenient and affordable so far.",
        name: "laura taylor",
        location: "US",
        rating: 5,
      },
      {
        title: "The meeting with the NP was on time",
        text: "The meeting with the NP was on time. She was very thorough and I could understand her language.",
        name: "Rebecca Kimble",
        location: "US",
        rating: 5,
      },
      {
        title: "It was really easy to sign up",
        text: "It was really easy to sign up and I got answers right away. I'm waiting for my order to arrive. Can't wait!! Thank you",
        name: "Teresa",
        location: "US",
        rating: 5,
      },
    ],
  },
  trimrx: {
    reviews: [
      {
        title: "TrimRX is a good deal",
        text: "I have to say that using TrimRx was the best decision I have made it a long time. I'm down 35 pounds since May 1st. I think the compounded B12 with Trizepatide does something really great for you. I feel better than I have in years. You'll be happy you did it trust me.",
        name: "Steve Toney",
        location: "US",
        rating: 5,
      },
      {
        title: "Excellent customer service",
        text: "Cynthia reached out not long after I had gone through the online process. She was very kind and helpful and understanding that I was looking to find the best support and costs for my weightloss. For those that need good support along the way you cant go wrong using Trim Rx.",
        name: "Katrina Campbell",
        location: "US",
        rating: 5,
      },
    ],
  },
  medvi: {
    reviews: [
      {
        title: "The personal service",
        text: "The personal service",
        name: "DB",
        location: "US",
        rating: 5,
      },
      {
        title: "She took her time",
        text: "She took her time, answered any questions. Very satisfied thank you",
        name: "Raymond Skwaritch",
        location: "US",
        rating: 5,
      },
      {
        title: "Friendly, prompt questions answered",
        text: "Friendly professional answered my questions. Thank you!",
        name: "lisa eckelhoff",
        location: "US",
        rating: 5,
      },
      {
        title: "Professional and helpful",
        text: "Professional summary, courtesy, thoroughly recommended and helpful information for my case.",
        name: "Brian",
        location: "US",
        rating: 5,
      },
    ],
  },
  wellorithm: {
    reviews: [
      {
        title: "Pleasant Experience Overall",
        text: "I had to reschedule my appointment twice, they should really look into their user experience of their app, but overall the doctor was nice and delivery was quicker then I expected.",
        name: "Tiro Mandal",
        location: "US",
        rating: 5,
      },
    ],
  },
  shed: {
    reviews: [
      {
        title: "Spoke with Tamika",
        text: "Spoke with Tamika. She was very helpful and informative. She's scheduled a coaching session. Gave me lots of good information.",
        name: "Cindy Cruse",
        location: "US",
        rating: 5,
      },
      {
        title: "Jamika was the representative that called me",
        text: "Jamika was the representative that called me and she was amazing VERY informative and nice. Asked me if I had any questions made sure I understood the entire process and made me feel very comfortable on my journey with shed!",
        name: "Jordan Rae",
        location: "US",
        rating: 5,
      },
      {
        title: "5 star customer service",
        text: "Amber was quick to respond to my concern and offered a quick solution! Great customer service!",
        name: "Joyce Headley",
        location: "US",
        rating: 5,
      },
    ],
  },
  sprout: {
    reviews: [
      {
        title: "I have had a great experience with Sprout",
        text: "I have had a great experience with Sprout. They were quick to respond and the process for approval worked seamlessly. Customer service was awesome, shout out to Frank!",
        name: "Holly Cattrell",
        location: "US",
        rating: 5,
      },
      {
        title: "Great experience!",
        text: "Super easy to join, reasonably priced, effective, and great customer service. Frank Burton with customer support was really helpful and quick to respond when I had an issue with my email. Great experience over all!",
        name: "Kayte Volz",
        location: "US",
        rating: 5,
      },
      {
        title: "Excellent Customer Service",
        text: "Customer Service team is very responsive and very helpful",
        name: "Rajat Rakkhit",
        location: "GB",
        rating: 5,
      },
      {
        title: "I have been very happy with Sprout",
        text: "I have been very happy with Sprout. When I have had questions or problems their support staff is very quick to respond. Outstanding customer service!!!",
        name: "Jennifer Volckaert",
        location: "US",
        rating: 5,
      },
    ],
  },
  directmeds: {
    reviews: [
      {
        title: "A great personnel",
        text: "A great personnel, you have answering the phone and following up. Plus its a wonderful product",
        name: "John",
        location: "US",
        rating: 5,
      },
      {
        title: "Chelsea King was the best customer service representative",
        text: "Chelsea King was the best customer service representative. She was smart, friendly and helpful. I would definitely recommend her!",
        name: "Charisse",
        location: "US",
        rating: 5,
      },
      {
        title: "I spoke with two of your agents",
        text: "I spoke with two of your agents and they were extremely helpful. First I spoke with Summer who was delightful and professional. Then I spoke with Leon, who helped me with an order I was having difficulty with. I was extremely pleased with their friendly professionalism and knowledge of the product.",
        name: "Customer",
        location: "US",
        rating: 5,
      },
    ],
  },
  skinnyrx: {
    reviews: [
      {
        title: "Starting my second yearly subscription",
        text: "Ivy assisted me with my second yearly subscription and was very informative and helpful. I've lost over 45lbs on SkinnyRx so far in one year. Just don't expect to lose it all at once. Eat healthy, and be patient. Thanks Ivy!!!",
        name: "Jill Wilson",
        location: "US",
        rating: 5,
      },
      {
        title: "Nice experience",
        text: "Great service",
        name: "mitra shaffy",
        location: "US",
        rating: 5,
      },
      {
        title: "Amy was awesome",
        text: "Amy was awesome! Super sweet, intelligent and love every time I get to work with her.",
        name: "Customer",
        location: "US",
        rating: 5,
      },
    ],
  },
  embody: {
    reviews: [
      {
        title: "Just started week 3 of tirzepatide",
        text: "Only on week 3; however, from my very first inquiry I've had excellent communication from customer service. When I was debating about the product and asking questions, the responses were always very prompt. When I made the decision to start, customer service updated me every step during process without me even needing to inquiry. All steps took place on time as informed and product shipped within days.",
        name: "MM",
        location: "US",
        rating: 5,
      },
      {
        title: "Love the fact that there are no surprises",
        text: "Love the fact that there are no surprises as in costly up front cost. So happy that it's monthly. Excited to start.",
        name: "Tiffany Coin",
        location: "US",
        rating: 5,
      },
      {
        title: "It went awesome such a nice professional person",
        text: "I've had a great experience with Embody over all. All those I've spoken to have been courteous informative and very helpful.",
        name: "Rebecca Kirk",
        location: "US",
        rating: 5,
      },
      {
        title: "Great customer service",
        text: "Great customer service fast and reliable",
        name: "Michael Tucker",
        location: "US",
        rating: 5,
      },
    ],
  },
};

const defaultReviews: ReviewData[] = [
  {
    slug: "altrx",
    providerId: "altrx",
    shortSummary: "Leading GLP-1 medication access platform with physician-guided treatment plans and transparent pricing.",
    reviewIntro: "ALT RX has emerged as one of the top providers for GLP-1 weight loss medication access. Their platform connects patients with licensed physicians who evaluate eligibility and prescribe FDA-approved treatments like semaglutide and tirzepatide. With a focus on transparency and patient care, ALT RX makes medical weight loss accessible without the traditional barriers of in-person visits.",
    keyFeatures: [
      "Access to semaglutide and tirzepatide medications",
      "Licensed physician consultations included",
      "Transparent pricing with no hidden fees",
      "Convenient home delivery of medications",
      "Ongoing provider support and monitoring"
    ],
    pricingSummary: "Plans start at competitive monthly rates with medication included. No long-term contracts required. Free initial consultation and medical evaluation.",
    treatmentOptions: [
      "Semaglutide (compounded)",
      "Tirzepatide (compounded)",
      "Oral GLP-1 medications",
      "Combination therapy programs"
    ],
    pros: [
      "Comprehensive GLP-1 medication options",
      "Physician-guided treatment from start to finish",
      "No long-term commitment required",
      "Transparent pricing with medication included",
      "Fast home delivery nationwide"
    ],
    cons: [
      "Only available in select states",
      "No in-person clinic visits",
      "May not be covered by insurance"
    ],
    bestFor: [
      "Adults seeking GLP-1 medication access",
      "Those who prefer telehealth convenience",
      "People looking for transparent, all-inclusive pricing"
    ],
    finalVerdict: "ALT RX stands out as a top-tier GLP-1 weight loss provider thanks to its physician-guided approach, transparent pricing, and comprehensive medication options. If you are looking for a reliable telehealth platform to access GLP-1 treatments without long-term commitments, ALT RX is an excellent choice."
  },
  {
    slug: "noom",
    providerId: "noom",
    shortSummary: "Behavior-based weight loss platform combining psychology-driven coaching with optional medical support.",
    reviewIntro: "Noom takes a unique approach to weight loss by combining cognitive behavioral therapy principles with personalized coaching and, more recently, medical weight loss options. Their app-based platform has helped millions build sustainable habits while offering GLP-1 medication access for eligible patients through their Noom Med program.",
    keyFeatures: [
      "Psychology-based behavior change curriculum",
      "Personal coaching and group support",
      "Noom Med for GLP-1 medication access",
      "Food logging with color-coded system",
      "Progress tracking and daily lessons"
    ],
    pricingSummary: "Noom offers monthly and annual subscription plans. Noom Med, which includes medication access, is priced separately with medication costs included in the subscription.",
    treatmentOptions: [
      "Behavior change coaching program",
      "Noom Med (GLP-1 medications)",
      "Personalized meal planning",
      "Exercise and activity guidance"
    ],
    pros: [
      "Evidence-based behavioral approach",
      "Comprehensive app with daily engagement",
      "Option to add medical weight loss",
      "Large community and support network",
      "Builds long-term healthy habits"
    ],
    cons: [
      "Can feel time-intensive with daily lessons",
      "Medication program costs extra",
      "Results depend heavily on user engagement"
    ],
    bestFor: [
      "People who want to change their relationship with food",
      "Those who benefit from coaching and accountability",
      "Anyone looking for a holistic approach combining behavior and medication"
    ],
    finalVerdict: "Noom is ideal for people who want more than just medication — it is a comprehensive behavior-change platform that addresses the psychological side of weight loss. With the addition of Noom Med, it now offers a complete solution that combines habit building with medical treatment options."
  },
  {
    slug: "ro",
    providerId: "ro",
    shortSummary: "Established telehealth platform offering straightforward online weight loss care with licensed providers.",
    reviewIntro: "Ro has built a strong reputation as a trusted telehealth provider, and their weight loss program continues that tradition. The platform offers a streamlined process for consulting with licensed providers, getting prescribed weight loss medications, and receiving ongoing support — all from the comfort of home.",
    keyFeatures: [
      "Board-certified provider consultations",
      "Multiple GLP-1 medication options",
      "Integrated pharmacy with home delivery",
      "Ongoing care and dosage adjustments",
      "Simple online enrollment process"
    ],
    pricingSummary: "Ro offers competitive monthly pricing that includes provider consultations and medication. No insurance required, though some plans may be FSA/HSA eligible.",
    treatmentOptions: [
      "Compounded semaglutide",
      "Brand-name GLP-1 medications",
      "Metabolic support supplements",
      "Provider-guided treatment adjustments"
    ],
    pros: [
      "Established and trusted telehealth brand",
      "Simple, user-friendly platform",
      "In-house pharmacy for reliable delivery",
      "Licensed providers review every case",
      "No long-term contracts"
    ],
    cons: [
      "Limited to telehealth — no in-person options",
      "Wait times can vary during peak periods",
      "Not available in all states"
    ],
    bestFor: [
      "Those who value a trusted, established telehealth brand",
      "People who want a simple and efficient process",
      "Adults seeking provider-supervised GLP-1 treatment"
    ],
    finalVerdict: "Ro delivers a polished and reliable telehealth weight loss experience. Their established reputation, integrated pharmacy, and licensed providers make it a solid choice for anyone looking for straightforward medical weight loss care online."
  },
  {
    slug: "trimrx",
    providerId: "trimrx",
    shortSummary: "Budget-friendly GLP-1 access with flexible treatment plans and clinical guidance included.",
    reviewIntro: "TrimRX has positioned itself as one of the most affordable options for GLP-1 weight loss treatment. Their platform focuses on making prescription weight loss medications accessible to more people by offering competitive pricing, flexible plans, and ongoing clinical support without the premium price tag.",
    keyFeatures: [
      "Competitive monthly pricing",
      "Flexible treatment plan options",
      "Clinical guidance throughout treatment",
      "Home delivery of medications",
      "No long-term commitment required"
    ],
    pricingSummary: "TrimRX offers some of the most competitive pricing in the GLP-1 space. Monthly plans include medication, provider consultations, and ongoing support. Discounts available for multi-month commitments.",
    treatmentOptions: [
      "Compounded semaglutide",
      "Compounded tirzepatide",
      "Customized dosing schedules",
      "Combination approaches"
    ],
    pros: [
      "Among the most affordable GLP-1 options",
      "Flexible plans without long-term contracts",
      "Ongoing clinical guidance included",
      "Fast and reliable home delivery",
      "Straightforward enrollment process"
    ],
    cons: [
      "Newer platform with less brand recognition",
      "Fewer medication options than some competitors",
      "Limited support hours"
    ],
    bestFor: [
      "Budget-conscious individuals seeking GLP-1 treatment",
      "Those who want flexibility without long-term commitments",
      "People looking for affordable medical weight loss"
    ],
    finalVerdict: "TrimRX is a strong choice for anyone who wants access to GLP-1 medications without paying premium prices. While they may not have the brand recognition of larger competitors, their affordable pricing and flexible plans make medical weight loss accessible to a broader audience."
  },
  {
    slug: "shed",
    providerId: "shed",
    shortSummary: "Personalized weight loss programs with coaching, medication options, and convenient home delivery.",
    reviewIntro: "Shed takes a personalized approach to weight loss, creating customized treatment plans based on each individual's health profile, goals, and preferences. Their platform combines provider-guided medication options with coaching support and convenient home delivery to create a well-rounded weight loss experience.",
    keyFeatures: [
      "Personalized treatment recommendations",
      "Coaching and behavioral support",
      "Multiple medication options available",
      "Convenient home delivery",
      "Progress tracking tools"
    ],
    pricingSummary: "Shed offers tiered pricing based on the level of support and medication selected. All plans include provider consultations and home delivery of medications.",
    treatmentOptions: [
      "GLP-1 receptor agonists",
      "Personalized medication combinations",
      "Lifestyle coaching programs",
      "Nutritional guidance"
    ],
    pros: [
      "Highly personalized treatment plans",
      "Combines medication with coaching support",
      "Convenient home delivery included",
      "Responsive customer support team",
      "Flexible plan options"
    ],
    cons: [
      "Pricing can be higher for premium tiers",
      "Personalization process takes longer initially",
      "Limited availability in some regions"
    ],
    bestFor: [
      "People who want a tailored weight loss approach",
      "Those who benefit from coaching alongside medication",
      "Anyone seeking a comprehensive, personalized program"
    ],
    finalVerdict: "Shed excels at creating personalized weight loss experiences that go beyond just prescribing medication. If you value a tailored approach with coaching support and are willing to invest in a comprehensive program, Shed is a strong contender."
  },
  {
    slug: "embody",
    providerId: "embody",
    shortSummary: "Doctor-led weight loss solutions with thorough medical evaluations and ongoing provider monitoring.",
    reviewIntro: "Embody takes a medically rigorous approach to weight loss, with board-certified doctors leading every aspect of treatment. Their platform emphasizes thorough medical evaluations, evidence-based treatment protocols, and ongoing monitoring to ensure safe and effective results.",
    keyFeatures: [
      "Board-certified doctor-led treatment",
      "Comprehensive medical evaluations",
      "Evidence-based treatment protocols",
      "Ongoing provider monitoring",
      "Access to prescription medications"
    ],
    pricingSummary: "Embody pricing includes medical evaluation, provider consultations, and medication. Plans are structured monthly with no hidden fees or long-term commitments required.",
    treatmentOptions: [
      "GLP-1 medications (semaglutide, tirzepatide)",
      "Medical evaluation and health screening",
      "Ongoing dosage optimization",
      "Provider-monitored treatment adjustments"
    ],
    pros: [
      "Doctor-led with thorough medical oversight",
      "Comprehensive health evaluations",
      "Evidence-based treatment approach",
      "Ongoing monitoring for safety",
      "Transparent pricing structure"
    ],
    cons: [
      "Higher price point than budget options",
      "Evaluation process can take longer",
      "Fewer lifestyle support resources"
    ],
    bestFor: [
      "People who prioritize medical oversight and safety",
      "Those with complex health histories",
      "Anyone who wants doctor-led treatment from start to finish"
    ],
    finalVerdict: "Embody is the right choice for individuals who want their weight loss journey led by qualified doctors with thorough medical oversight. While it may cost more than budget alternatives, the level of medical care and monitoring provides added peace of mind."
  },
  {
    slug: "wellmedr",
    providerId: "wellmedr",
    shortSummary: "Long-term weight management platform focused on sustainable results with clinical guidance throughout.",
    reviewIntro: "WellMedR differentiates itself by focusing on long-term weight management rather than quick fixes. Their platform provides continuous clinical guidance, progress tracking, and medication management designed to help patients achieve and maintain their weight loss goals over time.",
    keyFeatures: [
      "Long-term weight management focus",
      "Continuous clinical guidance",
      "Progress tracking and analytics",
      "Medication management and adjustments",
      "Maintenance phase support"
    ],
    pricingSummary: "WellMedR offers monthly plans with medication and clinical support included. Longer-term commitments may come with discounted rates to encourage sustained engagement.",
    treatmentOptions: [
      "GLP-1 medications",
      "Long-term maintenance protocols",
      "Progressive dosing strategies",
      "Lifestyle modification guidance"
    ],
    pros: [
      "Strong focus on long-term results",
      "Continuous clinical guidance",
      "Good progress tracking tools",
      "Maintenance phase included",
      "Sustainable approach to weight loss"
    ],
    cons: [
      "Less suited for those wanting quick results",
      "Smaller provider network",
      "Fewer medication options than top competitors"
    ],
    bestFor: [
      "People committed to long-term weight management",
      "Those who have struggled with weight regain",
      "Anyone seeking sustainable, medically-guided weight loss"
    ],
    finalVerdict: "WellMedR is an excellent option for individuals who are serious about long-term weight management. Their focus on sustainability, maintenance support, and ongoing clinical guidance sets them apart from providers that only address the initial weight loss phase."
  },
  {
    slug: "sunlight",
    providerId: "sunlight",
    shortSummary: "Flexible telehealth weight loss care with virtual consultations and individualized treatment plans.",
    reviewIntro: "Sunlight offers a flexible telehealth approach to weight loss, providing virtual consultations with licensed providers and individualized treatment plans. Their platform is designed for convenience, allowing patients to access care on their own schedule while receiving personalized attention.",
    keyFeatures: [
      "Virtual consultations with licensed providers",
      "Individualized treatment plans",
      "Flexible scheduling options",
      "Home delivery of medications",
      "Follow-up care and adjustments"
    ],
    pricingSummary: "Sunlight offers straightforward monthly pricing that includes virtual consultations, medication, and follow-up care. No hidden fees or long-term contracts.",
    treatmentOptions: [
      "GLP-1 receptor agonist medications",
      "Individualized dosing protocols",
      "Virtual follow-up consultations",
      "Treatment plan adjustments as needed"
    ],
    pros: [
      "Convenient and flexible scheduling",
      "Personalized treatment approach",
      "No long-term contracts required",
      "Responsive provider team",
      "Straightforward pricing"
    ],
    cons: [
      "Smaller provider network",
      "Less brand recognition than larger competitors",
      "Limited additional resources beyond medication"
    ],
    bestFor: [
      "Busy professionals who need flexible scheduling",
      "Those who prefer personalized telehealth care",
      "People looking for convenient, no-contract weight loss treatment"
    ],
    finalVerdict: "Sunlight is a solid telehealth option for people who value flexibility and personalized care. While they may not have the brand recognition of industry giants, their individualized approach and convenient scheduling make them a worthwhile consideration."
  },
  {
    slug: "medvi",
    providerId: "medvi",
    shortSummary: "Streamlined medical weight loss platform with prescription-based treatment and provider support.",
    reviewIntro: "Medvi focuses on making medical weight loss simple and accessible through a streamlined online platform. They offer prescription-based treatments with provider support throughout the process, making it easy for patients to get started and stay on track with their weight loss goals.",
    keyFeatures: [
      "Streamlined online enrollment",
      "Prescription-based treatment options",
      "Provider support throughout treatment",
      "Home delivery of medications",
      "Regular check-ins and monitoring"
    ],
    pricingSummary: "Medvi offers competitive monthly plans that include medication, provider consultations, and ongoing support. Pricing is transparent with no surprise charges.",
    treatmentOptions: [
      "Prescription GLP-1 medications",
      "Provider-guided treatment plans",
      "Dosage adjustments as needed",
      "Follow-up consultations"
    ],
    pros: [
      "Simple and easy enrollment process",
      "Transparent pricing",
      "Provider support included",
      "Reliable home delivery",
      "Regular monitoring and check-ins"
    ],
    cons: [
      "Fewer medication options",
      "Limited lifestyle support resources",
      "Newer platform with fewer reviews"
    ],
    bestFor: [
      "People who want a simple, straightforward process",
      "Those new to medical weight loss",
      "Anyone looking for an easy-to-use online platform"
    ],
    finalVerdict: "Medvi is a good choice for people who want a no-fuss medical weight loss experience. Their streamlined process and transparent pricing remove many of the barriers that can make starting a weight loss program feel overwhelming."
  },
  {
    slug: "sprout",
    providerId: "sprout",
    shortSummary: "Metabolic health-focused weight loss platform with customized treatment recommendations and lifestyle support.",
    reviewIntro: "Sprout takes a metabolic health-first approach to weight loss, focusing on understanding each patient's unique metabolic profile before recommending treatment. Their platform combines provider-guided medication options with lifestyle improvement strategies for a holistic approach to weight management.",
    keyFeatures: [
      "Metabolic health assessment",
      "Customized treatment recommendations",
      "Provider-guided medication options",
      "Lifestyle improvement strategies",
      "Long-term wellness focus"
    ],
    pricingSummary: "Sprout offers monthly plans that include metabolic assessment, provider consultations, and medication. Pricing varies based on the treatment plan selected.",
    treatmentOptions: [
      "GLP-1 medications",
      "Metabolic health optimization",
      "Lifestyle modification programs",
      "Nutritional guidance and support"
    ],
    pros: [
      "Unique metabolic health focus",
      "Customized treatment approach",
      "Combines medication with lifestyle changes",
      "Provider-guided throughout",
      "Focus on overall wellness"
    ],
    cons: [
      "Smaller platform with limited reviews",
      "May not be available in all states",
      "Higher starting price for comprehensive plans"
    ],
    bestFor: [
      "People interested in understanding their metabolic health",
      "Those who want a holistic approach to weight loss",
      "Anyone seeking long-term wellness improvement beyond just weight"
    ],
    finalVerdict: "Sprout stands out with its metabolic health-first approach, making it a compelling option for people who want to understand the science behind their weight loss journey. If you value a holistic approach that goes beyond just medication, Sprout is worth considering."
  },
  {
    slug: "wellorithm",
    providerId: "wellorithm",
    shortSummary: "Algorithm-driven weight loss platform using data insights to match patients with optimal GLP-1 treatment plans.",
    reviewIntro: "Wellorithm takes a technology-forward approach to weight loss, using proprietary algorithms to analyze patient data and recommend personalized treatment plans. Their platform combines data-driven insights with licensed provider oversight to create an efficient, tailored weight loss experience.",
    keyFeatures: [
      "Algorithm-based treatment matching",
      "Licensed provider consultations included",
      "Personalized GLP-1 medication protocols",
      "Data-driven progress tracking",
      "Home delivery of medications"
    ],
    pricingSummary: "Wellorithm offers monthly plans that include algorithmic treatment matching, provider consultations, medication, and ongoing monitoring. Pricing is competitive with transparent monthly rates.",
    treatmentOptions: [
      "Compounded semaglutide",
      "Compounded tirzepatide",
      "Algorithm-optimized dosing protocols",
      "Data-informed treatment adjustments"
    ],
    pros: [
      "Technology-driven personalization",
      "Efficient treatment matching process",
      "Licensed providers oversee all care",
      "Transparent pricing structure",
      "Convenient home delivery"
    ],
    cons: [
      "Newer platform with limited track record",
      "Less human touch than traditional providers",
      "Limited availability in some states"
    ],
    bestFor: [
      "Tech-savvy individuals who value data-driven decisions",
      "Those looking for efficient, streamlined treatment matching",
      "People who prefer a modern, algorithm-based approach"
    ],
    finalVerdict: "Wellorithm offers a fresh, technology-driven approach to weight loss that appeals to patients who value efficiency and data-informed treatment. While the platform is newer than some competitors, its algorithmic matching and transparent pricing make it a noteworthy option for those comfortable with a tech-forward healthcare experience."
  },
  {
    slug: "directmeds",
    providerId: "directmeds",
    shortSummary: "Pharmacy-direct weight loss platform offering GLP-1 medications with streamlined fulfillment and licensed provider oversight.",
    reviewIntro: "DirectMeds connects patients directly with pharmacy fulfillment for GLP-1 weight loss medications, cutting out unnecessary middlemen. Their platform pairs licensed medical providers with efficient pharmacy operations to deliver prescription weight loss treatments quickly and at competitive prices.",
    keyFeatures: [
      "Direct pharmacy fulfillment model",
      "Licensed provider consultations included",
      "GLP-1 medication access (semaglutide, tirzepatide)",
      "Streamlined ordering and delivery process",
      "Ongoing medical support and dosage adjustments"
    ],
    pricingSummary: "DirectMeds offers competitive monthly pricing that includes provider consultations, medication, and direct pharmacy shipping. No hidden fees or long-term contracts required.",
    treatmentOptions: [
      "Compounded semaglutide",
      "Compounded tirzepatide",
      "Provider-guided dosage optimization",
      "Ongoing treatment monitoring"
    ],
    pros: [
      "Fast pharmacy-direct fulfillment",
      "Competitive pricing on GLP-1 treatments",
      "Licensed providers oversee all prescriptions",
      "Simple, streamlined ordering process",
      "No long-term commitment required"
    ],
    cons: [
      "Smaller platform with fewer user reviews",
      "Limited lifestyle support resources",
      "Availability may vary by state"
    ],
    bestFor: [
      "People who want fast, direct pharmacy fulfillment",
      "Those looking for competitively priced GLP-1 access",
      "Anyone who values a simple, no-frills ordering process"
    ],
    finalVerdict: "DirectMeds is a solid option for patients who prioritize speed and simplicity in accessing GLP-1 weight loss medications. Their pharmacy-direct model cuts out unnecessary steps, and competitive pricing makes treatment more accessible. While the platform lacks some of the coaching and lifestyle features of larger competitors, it delivers on its core promise: affordable, provider-supervised GLP-1 treatment with fast delivery."
  },
  {
    slug: "found",
    providerId: "found",
    shortSummary: "Science-backed weight loss platform combining prescription medication with personalized coaching and behavior change support.",
    reviewIntro: "Found takes a comprehensive approach to weight loss by combining prescription medication with ongoing health coaching, behavioral science, and personalized treatment plans. Their platform is designed around the idea that sustainable weight loss requires more than just medication — it requires understanding your unique biology, habits, and lifestyle factors.",
    keyFeatures: [
      "Board-certified clinicians prescribe treatment",
      "GLP-1 and non-GLP-1 medication options available",
      "Dedicated health coaching included",
      "Personalized plans based on biology and habits",
      "Ongoing progress tracking and community support"
    ],
    pricingSummary: "Found offers monthly membership plans that include clinician consultations, coaching, and access to prescription medications. Medication costs vary depending on the treatment prescribed. Some plans may be eligible for insurance or HSA/FSA coverage.",
    treatmentOptions: [
      "GLP-1 medications (semaglutide, tirzepatide)",
      "Non-GLP-1 prescription options",
      "Health coaching and behavioral support",
      "Personalized nutrition and activity guidance"
    ],
    pros: [
      "Combines medication with coaching for a holistic approach",
      "Multiple medication options beyond just GLP-1",
      "Board-certified providers oversee all treatment",
      "Strong community and educational resources",
      "Personalized to individual biology and habits"
    ],
    cons: [
      "Coaching-focused approach may not suit everyone",
      "Medication costs can vary and add up",
      "Some users report longer onboarding process"
    ],
    bestFor: [
      "People who want medication plus coaching support",
      "Those interested in understanding the science behind their weight loss",
      "Anyone looking for a holistic, long-term approach"
    ],
    finalVerdict: "Found stands out for its combination of prescription medication and personalized health coaching. If you want more than just a prescription — if you want to understand why your body responds the way it does and build sustainable habits alongside medical treatment — Found is a strong choice. The platform is best suited for people who value a science-backed, coaching-supported approach to weight loss."
  },
  {
    slug: "yucca",
    providerId: "yucca",
    shortSummary: "Modern telehealth weight loss platform offering streamlined GLP-1 access with licensed clinicians and affordable pricing.",
    reviewIntro: "Yucca is a modern telehealth platform focused on making GLP-1 weight loss treatment simple and accessible. Their streamlined process connects patients with licensed clinicians who evaluate eligibility, prescribe medication, and provide ongoing support — all through a clean, easy-to-use online experience.",
    keyFeatures: [
      "Fast online eligibility evaluation",
      "Licensed clinician consultations included",
      "GLP-1 medication prescribed and delivered",
      "Affordable, transparent monthly pricing",
      "Ongoing clinical support and check-ins"
    ],
    pricingSummary: "Yucca offers straightforward monthly plans that include clinician consultations, GLP-1 medication, and home delivery. Pricing is transparent with no hidden fees or long-term contracts.",
    treatmentOptions: [
      "Compounded semaglutide",
      "Compounded tirzepatide",
      "Clinician-guided dosage adjustments",
      "Ongoing treatment monitoring"
    ],
    pros: [
      "Simple and fast onboarding process",
      "Affordable pricing compared to competitors",
      "Licensed clinicians oversee all care",
      "Clean, modern user experience",
      "No long-term contracts required"
    ],
    cons: [
      "Newer platform with limited brand recognition",
      "Fewer lifestyle support features",
      "Limited availability in some states"
    ],
    bestFor: [
      "People looking for affordable GLP-1 access",
      "Those who prefer a fast, simple onboarding process",
      "Anyone who values a modern, no-frills telehealth experience"
    ],
    finalVerdict: "Yucca delivers a clean, modern telehealth experience for patients seeking affordable GLP-1 weight loss treatment. While it lacks the coaching depth of some competitors, its streamlined process, transparent pricing, and licensed clinical oversight make it a compelling option for people who want effective treatment without complexity."
  },
  {
    slug: "synergyrx",
    providerId: "synergyrx",
    shortSummary: "Medically supervised weight loss platform offering compounded semaglutide and tirzepatide with personalized care in all 50 states.",
    reviewIntro: "SynergyRX positions itself as a personalized, medically supervised weight loss platform. With licensed physicians overseeing every treatment plan, they offer both compounded and brand-name GLP-1 medications at competitive prices. Their standout feature is availability across all 50 states with a fully online process, from evaluation to home delivery. The platform also offers oral dissolving tablets as an alternative to injections.",
    keyFeatures: [
      "Compounded semaglutide starting at $199/month",
      "Compounded tirzepatide starting at $349/month",
      "Oral dissolving tablet options available",
      "Brand-name Wegovy, Ozempic, and Mounjaro available",
      "Licensed physicians (MD) overseeing all care",
      "Available in all 50 states"
    ],
    pricingSummary: "Compounded semaglutide starts at $199/month and tirzepatide at $349/month. Brand-name options range from $499 to $947/month. A $100 welcome credit is applied at checkout. All plans include medical consultations, ongoing support, and home delivery. FSA/HSA eligible.",
    treatmentOptions: [
      "Compounded semaglutide (injectable)",
      "Compounded tirzepatide (injectable)",
      "Semaglutide oral dissolving tablets",
      "Tirzepatide oral dissolving tablets",
      "Brand-name Wegovy, Ozempic, Mounjaro"
    ],
    pros: [
      "Wide range of medication options including oral tablets",
      "Competitive pricing on compounded medications",
      "Available in all 50 states",
      "$100 welcome credit for new patients",
      "Monthly check-ins and ongoing medical support",
      "FSA/HSA eligible"
    ],
    cons: [
      "Brand-name options are significantly more expensive",
      "Newer platform with less established track record",
      "No behavioral coaching or nutrition program included"
    ],
    bestFor: [
      "Patients who want both injectable and oral medication options",
      "Those looking for affordable compounded GLP-1 access",
      "People in states with limited telehealth provider availability"
    ],
    finalVerdict: "SynergyRX offers a solid combination of medication variety, competitive pricing, and nationwide availability. The option to choose between injectable and oral dissolving tablets sets them apart from many competitors. With licensed physician oversight and transparent pricing, SynergyRX is a strong choice for patients seeking flexible, affordable GLP-1 treatment."
  },
  {
    slug: "bodybuildinghealth",
    providerId: "bodybuildinghealth",
    shortSummary: "Provider-guided weight loss program offering both GLP-1 and dual-agonist GIP+GLP-1 treatments with no commitment until approved.",
    reviewIntro: "Bodybuilding Health brings a provider-guided approach to medical weight loss, offering patients the choice between GLP-1 and the newer dual-agonist GIP+GLP-1 medications. Their no-commitment-until-approved model removes the financial risk from the evaluation process, and their current $100 off promotion makes the entry point more accessible. The platform is designed for people who want clinician oversight without the hassle of in-person visits.",
    keyFeatures: [
      "$100 off for new patients (limited-time offer)",
      "Choice between GLP-1 and GIP+GLP-1 treatments",
      "No commitment or payment until medically approved",
      "Provider-guided treatment plans",
      "Home delivery of medications"
    ],
    pricingSummary: "Plans are competitively priced with a current $100 discount for new patients. No payment is required until a provider reviews your case and approves treatment. Medication, consultations, and delivery are included in monthly pricing.",
    treatmentOptions: [
      "GLP-1 receptor agonists (semaglutide-based)",
      "Dual-agonist GIP+GLP-1 (tirzepatide-based)",
      "Provider-customized treatment protocols"
    ],
    pros: [
      "No financial commitment until approved by a provider",
      "Access to both GLP-1 and newer GIP+GLP-1 options",
      "$100 off for new patients",
      "Provider-guided with ongoing medical oversight",
      "Simple online process with home delivery"
    ],
    cons: [
      "Less established brand in the telehealth weight loss space",
      "Limited public information on pricing tiers",
      "No coaching or behavioral support component"
    ],
    bestFor: [
      "People who want to explore eligibility without financial risk",
      "Those interested in dual-agonist (GIP+GLP-1) treatment",
      "Patients who value provider-guided care over self-service platforms"
    ],
    finalVerdict: "Bodybuilding Health offers a risk-free entry point to medical weight loss with its no-commitment-until-approved model. The ability to choose between GLP-1 and the more advanced GIP+GLP-1 treatments gives patients flexibility, and the current $100 discount makes it an attractive option for those ready to start. It's a good fit for people who want medical guidance and don't want to pay before knowing they qualify."
  },
  {
    slug: "livbody",
    providerId: "livbody",
    shortSummary: "Science-backed weight loss platform offering clinician-prescribed compounded GLP-1 treatments designed to work with your biology.",
    reviewIntro: "LIV Body takes a biology-first approach to weight loss, emphasizing that their treatment plans are designed to work with your body's natural mechanisms rather than against them. Their platform offers clinician-prescribed compounded GLP-1 medications with a focus on sustainable results. The combination of medical oversight and science-backed protocols positions LIV Body as a thoughtful option for patients who want a more personalized treatment experience.",
    keyFeatures: [
      "Clinician-prescribed compounded GLP-1 medications",
      "Treatment plans designed around individual biology",
      "Science-backed weight loss protocols",
      "Ongoing medical oversight and support",
      "Home delivery of all medications"
    ],
    pricingSummary: "LIV Body offers competitive monthly plans for compounded GLP-1 medications. Pricing includes clinician consultations, medication, and home delivery. No long-term contracts required.",
    treatmentOptions: [
      "Compounded semaglutide",
      "Compounded tirzepatide",
      "Personalized dosing protocols",
      "Biology-based treatment customization"
    ],
    pros: [
      "Personalized approach based on individual biology",
      "Clinician-prescribed with ongoing medical oversight",
      "Compounded GLP-1 options at competitive pricing",
      "Science-backed treatment protocols",
      "No long-term commitment required"
    ],
    cons: [
      "Newer entrant with limited user reviews",
      "No brand-name medication options listed",
      "No behavioral coaching or nutrition guidance included"
    ],
    bestFor: [
      "People who want a personalized, biology-based approach",
      "Those seeking clinician-guided compounded GLP-1 treatment",
      "Patients who value science-backed protocols over generic programs"
    ],
    finalVerdict: "LIV Body stands out with its biology-first philosophy and clinician-prescribed treatment plans. While it's a newer platform, its focus on personalization and science-backed protocols makes it appealing for patients who want more than a one-size-fits-all approach. If you value medical oversight and a treatment plan tailored to how your body works, LIV Body is worth considering."
  },
  {
    slug: "skinnyrx",
    providerId: "skinnyrx",
    shortSummary: "Physician-prescribed GLP-1 weight loss platform offering compounded semaglutide and tirzepatide with fast home delivery.",
    reviewIntro: "SkinnyRx offers a straightforward path to physician-prescribed GLP-1 weight loss treatment. Their platform connects patients with licensed providers who evaluate eligibility and prescribe compounded semaglutide or tirzepatide. With a focus on simplicity and fast delivery, SkinnyRx aims to make medical weight loss accessible without the complexity of traditional healthcare channels.",
    keyFeatures: [
      "Physician-prescribed GLP-1 medications",
      "Compounded semaglutide and tirzepatide available",
      "Fast nationwide home delivery",
      "Online medical evaluation process",
      "Ongoing provider support included"
    ],
    pricingSummary: "SkinnyRx offers competitive monthly pricing for compounded GLP-1 medications. Plans include physician consultations, medication, and home delivery. No long-term contracts required.",
    treatmentOptions: [
      "Compounded semaglutide (injectable)",
      "Compounded tirzepatide (injectable)",
      "Graduated dosing protocols"
    ],
    pros: [
      "Simple and fast online enrollment process",
      "Both semaglutide and tirzepatide options",
      "Physician oversight for all prescriptions",
      "Home delivery included in all plans",
      "No long-term commitment required"
    ],
    cons: [
      "Limited information on pricing before sign-up",
      "No behavioral coaching or nutrition support",
      "Brand-name medications not available"
    ],
    bestFor: [
      "People who want a fast, no-hassle path to GLP-1 medication",
      "Those looking for compounded medication options",
      "Patients who prefer a simple online process without extras"
    ],
    finalVerdict: "SkinnyRx delivers a streamlined, physician-guided weight loss experience focused on getting patients started quickly. While it lacks the coaching and behavioral components of some competitors, its straightforward approach and fast delivery make it a solid option for people who know what they want and prefer simplicity over extensive support programs."
  }
];

// Corrected Embody vs altRx battle content — winner: Embody. Applied over the
// saved CMS copy only while that copy still favors altRx (winnerId !== "embody");
// once the battle is re-saved in the admin, the CMS version wins.
const embodyAltrxBattle: Omit<BattleData, "slug"> = {
  provider1Id: "embody",
  provider2Id: "altrx",
  title: "Embody vs altRx: Which GLP-1 Provider Wins in 2026?",
  subtitle: "We compared pricing, medical support, medication access, and real customer experience to see which provider comes out ahead.",
  description: "Embody vs altRx compared across pricing, GLP-1 medication options, medical support, and customer experience. See why Embody comes out on top in 2026.",
  intro: "Embody and altRx are two of the most popular telehealth weight loss providers offering GLP-1 medications. Both connect you with licensed providers and ship medication straight to your door — but they differ in pricing, medical oversight, and day-to-day experience. Embody's doctor-led model, $69/month introductory pricing, and fast free shipping give it the edge for most people, while altRx remains a strong option for those who want the widest medication selection. Here's the full breakdown.",
  verdict: "Both Embody and altRx are legitimate, well-reviewed telehealth options for GLP-1 weight loss — but Embody takes this one. Its $69/month introductory pricing, doctor-led care model, free 1-2 day shipping, and consistently strong recent customer feedback make it the better fit for most people starting treatment. altRx is still worth a look if your priority is the broadest possible medication selection.",
  verdictWinnerPoints: [
    "The lowest starting price at $69/month",
    "Doctor-led care with ongoing monitoring",
    "Free 1-2 day shipping and a fully online process",
  ],
  verdictLoserPoints: [
    "The widest GLP-1 medication selection",
    "Oral medication options alongside injectables",
    "An established, transparent pricing structure",
  ],
  winnerId: "embody",
  categories: [
    {
      name: "Pricing & Value",
      winner: "provider1",
      explanation: "Embody's limited-time $69/month GLP-1 offer makes it one of the most affordable ways to start treatment, with no insurance required and no hidden fees. altRx also offers transparent pricing with no long-term commitment, but typical monthly costs run higher than Embody's introductory rate.",
      supportingPoints: [
        "GLP-1 treatment from $69/month",
        "No insurance required to start",
        "Transparent pricing with no hidden fees",
        "No long-term commitment required",
      ],
    },
    {
      name: "Medical Support",
      winner: "provider1",
      explanation: "Embody is doctor-led from start to finish — board-certified physicians handle evaluations, treatment protocols, and ongoing monitoring. altRx includes provider consultations with every plan, but Embody's depth of medical oversight stands out.",
      supportingPoints: [
        "Board-certified doctors lead every treatment",
        "Ongoing monitoring and dosage optimization",
        "Provider consultations included with every plan",
        "Licensed clinicians available for follow-ups",
      ],
    },
    {
      name: "Medication Options",
      winner: "provider2",
      explanation: "altRx offers one of the most comprehensive GLP-1 lineups available, including semaglutide, tirzepatide, and oral options. Embody covers the core GLP-1 medications with evidence-based protocols, but altRx's selection is broader.",
      supportingPoints: [
        "Semaglutide and tirzepatide available",
        "Evidence-based dosing protocols",
        "Broadest GLP-1 medication selection",
        "Oral and injectable options offered",
      ],
    },
    {
      name: "Speed & Convenience",
      winner: "provider1",
      explanation: "Embody's process is 100% online, with free shipping that typically arrives in 1-2 days. altRx also delivers nationwide with a smooth online flow, but Embody's turnaround time is hard to beat.",
      supportingPoints: [
        "Free shipping — arrives in 1-2 days",
        "100% online medical visit",
        "Nationwide delivery included",
        "Simple online checkout and refills",
      ],
    },
    {
      name: "Customer Experience",
      winner: "provider1",
      explanation: "Recent customer reviews favor Embody, with patients praising fast, proactive communication and smooth onboarding. altRx reviews are positive overall, though some recent reviewers report refill delays.",
      supportingPoints: [
        "Highly rated onboarding and support",
        "Proactive shipment updates and communication",
        "Helpful provider consultations",
        "Responsive support on most requests",
      ],
    },
  ],
  features: [
    { feature: "Starting Price", provider1Value: "$69/month (limited offer)", provider2Value: "Varies by medication", highlight: "provider1" },
    { feature: "Medical Visit", provider1Value: "100% online", provider2Value: "100% online", highlight: "both" },
    { feature: "Shipping", provider1Value: "Free, arrives in 1-2 days", provider2Value: "Nationwide delivery", highlight: "provider1" },
    { feature: "Insurance Required", provider1Value: "No", provider2Value: "No", highlight: "both" },
    { feature: "GLP-1 Selection", provider1Value: "Semaglutide, tirzepatide", provider2Value: "Semaglutide, tirzepatide, oral options", highlight: "provider2" },
    { feature: "Doctor-Led Care", provider1Value: "Board-certified doctors throughout", provider2Value: "Provider consultations included", highlight: "provider1" },
  ],
};

function buildInitialConfig(): SiteConfig {
  return {
    ...defaultConfig,
    providers: productsJson.map((p) => ({
      id: p.id,
      name: p.name,
      tagline: p.tagline,
      logo: p.logo,
      smallLogo: `/logos/${p.id}-icon.svg`,
      highlights: p.highlights,
      affiliateUrl: p.affiliateUrl,
      ctaText: p.ctaText,
      trustpilotRating: seedTrustpilot[p.id]?.rating,
      trustpilotReviewCount: seedTrustpilot[p.id]?.reviewCount,
      trustpilotReviews: seedTrustpilot[p.id]?.reviews,
    })),
    ranking: {
      providerOrder: ["altrx", "noom", "ro", "trimrx", "shed", "embody", "wellmedr", "sunlight", "medvi", "sprout", "wellorithm", "synergyrx"],
      positions: [
        { score: 9.8, starRating: 5, label: "Exceptional", badge: "Our Most Popular" },
        { score: 9.6, starRating: 4.5, label: "Excellent" },
        { score: 9.5, starRating: 4.5, label: "Excellent" },
        { score: 9.4, starRating: 4, label: "Excellent" },
        { score: 9.3, starRating: 4, label: "Excellent" },
        { score: 9.1, starRating: 3.5, label: "Excellent" },
        { score: 8.9, starRating: 3.5, label: "Very Good" },
        { score: 8.7, starRating: 3, label: "Very Good" },
        { score: 8.5, starRating: 3, label: "Very Good" },
        { score: 8.4, starRating: 3, label: "Very Good" },
        { score: 8.2, starRating: 3, label: "Very Good" },
        { score: 8.0, starRating: 3, label: "Very Good" },
      ],
    },
    faqs: faqsJson,
    reviews: defaultReviews,
    articles: defaultArticlesData,
    battles: [
      {
        slug: "altrx-vs-ro",
        provider1Id: "altrx",
        provider2Id: "ro",
        title: "ALT RX vs Ro: Which Weight Loss Provider Is Better?",
        subtitle: "Compare pricing, medication options, medical support, convenience, and overall value side by side.",
        description: "Head-to-head comparison of ALT RX and Ro for GLP-1 weight loss treatment. Compare pricing, medical support, medication options, and overall value.",
        intro: "ALT RX and Ro are two of the most popular telehealth weight loss providers offering GLP-1 medications. Both platforms connect patients with licensed providers and deliver prescription medication to your door — but they differ in pricing structure, level of personalization, medication options, and overall patient experience. Here's how they compare across the categories that matter most.",
        verdict: "ALT RX edges ahead with its transparent all-inclusive pricing, wider medication selection, and more personalized treatment approach. Ro remains a strong choice for those who value brand reputation and a streamlined, no-frills process. Both are solid options — your best pick depends on whether you prioritize personalization (ALT RX) or simplicity (Ro).",
        verdictWinnerPoints: [
          "Transparent, all-inclusive pricing",
          "Broader GLP-1 medication selection",
          "More personalized treatment protocols",
        ],
        verdictLoserPoints: [
          "A well-known, established telehealth brand",
          "A simple, streamlined online experience",
          "Integrated in-house pharmacy fulfillment",
        ],
        winnerId: "altrx",
        categories: [
          { name: "Pricing & Value", winner: "provider1", explanation: "ALT RX offers clearer, all-inclusive pricing with no hidden fees, making it easier to budget for treatment. Ro is competitively priced but costs can vary depending on the medication and plan selected.", supportingPoints: ["Transparent all-inclusive monthly pricing", "No hidden fees or surprise charges", "Strong overall value for GLP-1 treatment"] },
          { name: "Medical Support", winner: "tie", explanation: "Both providers deliver strong medical oversight with licensed physicians guiding treatment from start to finish. ALT RX provides slightly more personalized protocols, while Ro leverages its established telehealth infrastructure.", supportingPoints: ["Board-certified providers on both platforms", "Ongoing dosage adjustments included", "Licensed physician oversight throughout treatment"] },
          { name: "Medication Options", winner: "provider1", explanation: "ALT RX provides access to a wider range of GLP-1 medications including semaglutide, tirzepatide, oral options, and combination therapy programs. Ro focuses primarily on compounded semaglutide and select brand-name GLP-1 treatments.", supportingPoints: ["Access to semaglutide and tirzepatide", "Oral GLP-1 medication options available", "Combination therapy programs offered"] },
          { name: "Convenience", winner: "tie", explanation: "Both platforms offer full telehealth convenience with home delivery of medications. Ro has an integrated in-house pharmacy that can streamline fulfillment, while ALT RX provides fast nationwide delivery with no contracts required.", supportingPoints: ["Full telehealth — no in-person visits needed", "Home delivery of medications included", "Flexible scheduling for consultations"] },
          { name: "Customer Experience", winner: "provider1", explanation: "ALT RX is consistently praised for responsive support and highly customized treatment plans. Ro benefits from strong brand trust and a polished interface, though some users report longer wait times during peak periods.", supportingPoints: ["Highly responsive customer support team", "Personalized treatment plan adjustments", "Strong patient satisfaction ratings"] },
        ],
        features: [
          { feature: "GLP-1 Treatment Access", provider1Value: "Semaglutide, tirzepatide, oral GLP-1", provider2Value: "Compounded semaglutide, brand-name GLP-1" },
          { feature: "Online Provider Consultation", provider1Value: "Included", provider2Value: "Included" },
          { feature: "Personalized Treatment Plans", provider1Value: "Customized protocols", provider2Value: "Provider-guided adjustments" },
          { feature: "Ongoing Medical Support", provider1Value: "Continuous monitoring", provider2Value: "Regular check-ins" },
          { feature: "Home Delivery", provider1Value: "Fast nationwide delivery", provider2Value: "In-house pharmacy fulfillment" },
          { feature: "Payment Flexibility", provider1Value: "No long-term contracts", provider2Value: "Monthly plans, FSA/HSA eligible" },
          { feature: "Best For", provider1Value: "Personalized care, broader options", provider2Value: "Simplicity, brand trust" },
        ],
      },
    ],
    sidebars: [
      {
        id: "articles-default",
        name: "Articles Sidebar",
        area: "articles" as const,
        active: true,
        blocks: [
          { type: "providers" as const, enabled: true },
          { type: "quizCta" as const, enabled: true },
          { type: "relatedArticles" as const, enabled: true },
        ],
        providerIds: ["altrx", "noom", "ro"],
        quizCta: {
          headline: "Not sure which provider is right?",
          description: "Take our free quiz and get a personalized recommendation.",
          ctaText: "Find My Match",
          ctaUrl: "/find-your-match",
        },
        articleSlugs: ["how-glp1-medications-work", "first-month-weight-loss-medication", "choosing-telehealth-weight-loss-provider"],
      },
    ],
    landingPages: [
      {
        slug: "semaglutide",
        seoTitle: "Best Semaglutide Providers 2026 — Compare GLP-1 Weight Loss Programs",
        seoDescription: "Compare the top semaglutide weight loss providers of 2026. Side-by-side pricing, medical support, and treatment options for Ozempic and Wegovy alternatives.",
        h1: "Best Semaglutide Providers 2026",
        h2: "Compare GLP-1 weight loss programs side by side",
        heroDescription: "Semaglutide (the active ingredient in Ozempic and Wegovy) is one of the most effective GLP-1 medications for weight loss. Compare providers offering semaglutide treatment below.",
        providerOrder: ["altrx", "noom", "ro", "trimrx", "shed", "embody", "wellmedr", "sunlight", "medvi", "sprout", "wellorithm"],
        editorialSections: [
          {
            heading: "What Is Semaglutide?",
            body: 'Semaglutide is a GLP-1 receptor agonist — a medication that mimics a natural gut hormone to reduce appetite and regulate blood sugar. Originally developed for type 2 diabetes (as Ozempic), it was later approved for chronic weight management under the brand name Wegovy. Learn more about <a href="/articles/how-glp1-medications-work">how GLP-1 medications work</a>.',
          },
          {
            heading: "Semaglutide Weight Loss Results",
            body: 'In the STEP clinical trials, patients taking semaglutide lost an average of 15% of their body weight over 68 weeks. Results vary by individual, but most patients begin noticing reduced appetite within the first two weeks. Read our guide on <a href="/articles/first-month-weight-loss-medication">what to expect your first month</a>.',
          },
          {
            heading: "How to Choose a Semaglutide Provider",
            body: 'Not all providers are equal — pricing, medical oversight, and medication quality can vary significantly. We evaluated each provider on transparency, clinical support, and overall value. For detailed guidance, read our article on <a href="/articles/choosing-telehealth-weight-loss-provider">choosing the right telehealth provider</a>.',
            bullets: ["Licensed medical providers", "Transparent all-inclusive pricing", "Compounded or brand-name options", "Ongoing clinical support"],
          },
          {
            heading: "Semaglutide vs Tirzepatide",
            body: 'Wondering how semaglutide compares to the newer dual-agonist tirzepatide? Both are effective, but they work differently. Read our full <a href="/articles/tirzepatide-vs-semaglutide">semaglutide vs tirzepatide comparison</a>, or see our <a href="/tirzepatide">tirzepatide providers page</a> for alternatives.',
          },
        ],
      },
      {
        slug: "tirzepatide",
        seoTitle: "Best Tirzepatide Providers 2026 — Compare GLP-1 Weight Loss Programs",
        seoDescription: "Compare the top tirzepatide weight loss providers of 2026. Side-by-side pricing, medical support, and treatment options for Mounjaro and Zepbound alternatives.",
        h1: "Best Tirzepatide Providers 2026",
        h2: "Compare dual-action GLP-1 weight loss programs",
        heroDescription: "Tirzepatide (the active ingredient in Mounjaro and Zepbound) targets both GLP-1 and GIP receptors for enhanced weight loss results. Compare providers offering tirzepatide treatment below.",
        providerOrder: ["altrx", "noom", "ro", "trimrx", "shed", "embody", "wellmedr", "sunlight", "medvi", "sprout", "wellorithm"],
        editorialSections: [
          {
            heading: "What Is Tirzepatide?",
            body: 'Tirzepatide is a dual-agonist medication that targets both GLP-1 and GIP receptors — making it unique among weight loss medications. It\'s the active ingredient in Mounjaro (for diabetes) and Zepbound (for weight loss). Learn more about <a href="/articles/how-glp1-medications-work">how GLP-1 medications work</a>.',
          },
          {
            heading: "Tirzepatide Weight Loss Results",
            body: 'The SURMOUNT clinical trials showed tirzepatide patients lost up to 22.5% of their body weight at the highest dose over 72 weeks — making it the most effective GLP-1 medication for weight loss currently available. For a head-to-head breakdown, read our <a href="/articles/tirzepatide-vs-semaglutide">tirzepatide vs semaglutide comparison</a>.',
          },
          {
            heading: "Cost and Availability",
            body: 'Brand-name tirzepatide costs over $1,000/month at retail price. Compounded versions through telehealth providers are significantly more affordable — typically $300–$500/month including consultations. See our <a href="/articles/weight-loss-medication-cost-guide">medication cost guide</a> for a full pricing breakdown.',
            bullets: ["Compounded tirzepatide from $300/month", "All-inclusive pricing with many providers", "Home delivery included", "No insurance required"],
          },
          {
            heading: "Is Tirzepatide Right for You?",
            body: 'Tirzepatide may be a better fit if you have significant weight loss goals or haven\'t seen enough results with semaglutide alone. Not sure if you qualify? Check our <a href="/articles/who-qualifies-for-glp1-weight-loss">eligibility guide</a> or <a href="/find-your-match">take our matching quiz</a> for a personalized recommendation.',
          },
        ],
      },
      {
        slug: "best-online-weight-loss-programs",
        seoTitle: "Best Online Weight Loss Programs 2026 — Clinician-Guided GLP-1 Treatment",
        seoDescription: "Compare the best online weight loss programs of 2026. Clinician-guided GLP-1 treatment with semaglutide and tirzepatide from trusted telehealth providers.",
        h1: "Best Online Weight Loss Programs 2026",
        h2: "Clinician-guided GLP-1 treatment from home",
        heroDescription: "Online weight loss programs now offer prescription GLP-1 medications with full medical oversight — all from home. We compared the top programs on pricing, clinical support, and results.",
        providerOrder: ["altrx", "noom", "ro", "trimrx", "shed", "embody", "wellmedr", "sunlight", "medvi", "sprout", "wellorithm"],
        editorialSections: [
          {
            heading: "How Online Weight Loss Programs Work",
            body: 'Modern online weight loss programs combine prescription GLP-1 medications with telehealth consultations, ongoing medical support, and home delivery. You complete a health evaluation online, get matched with a licensed provider, and receive your medication at your door. Read our detailed guide on <a href="/articles/first-month-weight-loss-medication">what to expect your first month</a>.',
            bullets: ["Online medical evaluation", "Licensed physician prescribing", "Medication shipped to your door", "Ongoing clinical check-ins"],
          },
          {
            heading: "What Sets the Best Programs Apart",
            body: 'The difference between a good and great program comes down to medical oversight, pricing transparency, and ongoing support. The best programs include everything in one monthly fee — medication, consultations, and follow-up care. Learn <a href="/articles/choosing-telehealth-weight-loss-provider">how to evaluate telehealth providers</a> before signing up.',
          },
          {
            heading: "GLP-1 Medications Used in These Programs",
            body: 'Most top programs offer <a href="/semaglutide">semaglutide</a> (Ozempic/Wegovy) and <a href="/tirzepatide">tirzepatide</a> (Mounjaro/Zepbound) — the two most effective GLP-1 medications for weight loss. Some offer both, while others specialize in one. Understand the difference in our <a href="/articles/tirzepatide-vs-semaglutide">comparison guide</a>.',
          },
          {
            heading: "Who Qualifies for These Programs?",
            body: 'Most programs require a BMI of 27+ with a weight-related condition, or a BMI of 30+. Medical history, current medications, and health status are also evaluated. Check our full <a href="/articles/who-qualifies-for-glp1-weight-loss">eligibility guide</a> or <a href="/find-your-match">take our quiz</a> to see which program fits you best.',
          },
        ],
      },
      {
        slug: "best-weight-loss-injections",
        seoTitle: "Best Weight Loss Injections 2026 — Compare GLP-1 Injectable Providers",
        seoDescription: "Compare the best weight loss injection providers of 2026. Semaglutide and tirzepatide injections with pricing, medical support, and home delivery options.",
        h1: "Best Weight Loss Injections 2026",
        h2: "Compare injectable GLP-1 weight loss treatments",
        heroDescription: "GLP-1 weight loss injections like semaglutide and tirzepatide have shown 15–22% average weight loss in clinical trials. Compare providers offering injectable treatment programs below.",
        providerOrder: ["altrx", "noom", "ro", "trimrx", "shed", "embody", "wellmedr", "sunlight", "medvi", "sprout", "wellorithm"],
        editorialSections: [
          {
            heading: "How Weight Loss Injections Work",
            body: 'GLP-1 weight loss injections work by mimicking a natural hormone that reduces appetite, slows gastric emptying, and helps regulate blood sugar. They are administered once weekly via a small subcutaneous injection — most patients describe the process as quick and nearly painless. Learn the full science behind these medications in our <a href="/articles/how-glp1-medications-work">GLP-1 medications guide</a>.',
          },
          {
            heading: "Types of Weight Loss Injections Available",
            body: 'The two main injectable GLP-1 medications are <a href="/semaglutide">semaglutide</a> (Ozempic, Wegovy) and <a href="/tirzepatide">tirzepatide</a> (Mounjaro, Zepbound). Both are available as brand-name and compounded versions through telehealth providers. Tirzepatide targets two receptors for potentially greater results, while semaglutide has a longer track record. See our <a href="/articles/tirzepatide-vs-semaglutide">side-by-side comparison</a>.',
            bullets: ["Semaglutide: 15% average weight loss", "Tirzepatide: up to 22% average weight loss", "Once-weekly self-injection", "Gradual dose escalation to minimize side effects"],
          },
          {
            heading: "What to Expect with Injectable Treatment",
            body: 'Most patients notice appetite changes within the first two weeks, with meaningful weight loss visible by weeks 4–8. Side effects are most common during dose increases and typically improve over time. For a week-by-week timeline, read our <a href="/articles/first-month-weight-loss-medication">first month guide</a> and <a href="/articles/semaglutide-side-effects-guide">side effects guide</a>.',
          },
          {
            heading: "Cost of Weight Loss Injections",
            body: 'Brand-name injections cost $900–$1,400/month at retail price. Compounded versions through telehealth providers typically run $200–$500/month, often all-inclusive. For a complete pricing breakdown, see our <a href="/articles/weight-loss-medication-cost-guide">cost guide</a>. <a href="/find-your-match">Take our quiz</a> to find a provider that fits your budget.',
          },
        ],
      },
      {
        slug: "ozempic-for-weight-loss",
        seoTitle: "Ozempic for Weight Loss 2026 — Compare Providers & Alternatives",
        seoDescription: "Compare providers offering Ozempic (semaglutide) for weight loss. Pricing, eligibility, alternatives, and how to get started with online treatment.",
        h1: "Ozempic for Weight Loss",
        h2: "Compare providers offering semaglutide treatment",
        heroDescription: "Ozempic (semaglutide) is widely used off-label for weight loss, with clinical trials showing 10–15% average weight loss. Compare providers offering semaglutide-based treatment programs below.",
        providerOrder: ["altrx", "noom", "ro", "trimrx", "shed", "embody", "wellmedr", "sunlight", "medvi", "sprout", "wellorithm"],
        editorialSections: [
          {
            heading: "Ozempic for Weight Loss: What You Need to Know",
            body: 'Ozempic contains semaglutide, the same active ingredient as Wegovy. While Ozempic is FDA-approved for type 2 diabetes, it is frequently prescribed off-label for weight loss. Many telehealth providers offer compounded semaglutide — the same active ingredient at a lower cost. Read our full breakdown of <a href="/articles/ozempic-vs-wegovy-differences">Ozempic vs Wegovy differences</a>.',
          },
          {
            heading: "Ozempic vs Compounded Semaglutide",
            body: 'Brand-name Ozempic costs $900–$1,000/month. Compounded semaglutide through telehealth providers offers the same active ingredient for $200–$500/month, often including consultations and delivery. The key difference is that compounded medications are made by licensed pharmacies rather than the original manufacturer. See our <a href="/articles/weight-loss-medication-cost-guide">cost guide</a> for full details.',
            bullets: ["Same active ingredient (semaglutide)", "Compounded versions significantly more affordable", "Available through licensed telehealth providers", "Includes medical oversight and home delivery"],
          },
          {
            heading: "Do You Qualify for Ozempic?",
            body: 'Eligibility typically requires a BMI of 27+ with a weight-related condition, or a BMI of 30+. Your medical history and current medications will also be evaluated. Read our <a href="/articles/who-qualifies-for-glp1-weight-loss">full eligibility guide</a> for detailed criteria.',
          },
          {
            heading: "Side Effects and What to Expect",
            body: 'The most common side effects are gastrointestinal — nausea, diarrhea, and constipation — especially during dose increases. These typically improve over time. For management strategies, see our <a href="/articles/semaglutide-side-effects-guide">semaglutide side effects guide</a>. Not sure which provider is right for you? <a href="/find-your-match">Take our matching quiz</a>.',
          },
        ],
      },
      {
        slug: "wegovy-providers",
        seoTitle: "Best Wegovy Providers & Alternatives 2026 — Compare Semaglutide Programs",
        seoDescription: "Compare Wegovy providers and affordable semaglutide alternatives in 2026. Side-by-side pricing, clinical support, and treatment options for weight loss.",
        h1: "Best Wegovy Providers & Alternatives 2026",
        h2: "Compare semaglutide weight loss programs",
        heroDescription: "Wegovy is the FDA-approved weight loss version of semaglutide, with clinical trials showing 15% average weight loss. Compare providers offering Wegovy and compounded semaglutide alternatives below.",
        providerOrder: ["altrx", "noom", "ro", "trimrx", "shed", "embody", "wellmedr", "sunlight", "medvi", "sprout", "wellorithm"],
        editorialSections: [
          {
            heading: "Wegovy vs Compounded Semaglutide",
            body: 'Wegovy is the brand-name semaglutide approved specifically for weight loss, with a maximum dose of 2.4 mg/week. Many telehealth providers now offer compounded semaglutide as a more affordable alternative using the same active ingredient. For a full comparison of the brand-name options, see <a href="/articles/ozempic-vs-wegovy-differences">Ozempic vs Wegovy</a>.',
            bullets: ["Wegovy: $1,300–$1,400/month retail", "Compounded semaglutide: $200–$500/month", "Same active ingredient", "Different dosing schedules available"],
          },
          {
            heading: "Wegovy Weight Loss Results",
            body: 'The STEP trials showed Wegovy patients lost an average of 15% of their body weight over 68 weeks — significantly more than lifestyle changes alone. Results begin with appetite changes in weeks 1–2, with visible weight loss around weeks 4–8. Read our <a href="/articles/first-month-weight-loss-medication">first month guide</a> for a week-by-week breakdown.',
          },
          {
            heading: "How to Choose the Right Provider",
            body: 'Whether you want brand-name Wegovy or a compounded alternative, the provider you choose matters. Look for licensed medical oversight, transparent pricing, and ongoing support. Read our <a href="/articles/choosing-telehealth-weight-loss-provider">provider selection guide</a> or <a href="/find-your-match">take our quiz</a> for a personalized match.',
          },
        ],
      },
      {
        slug: "cheapest-weight-loss-medication",
        seoTitle: "Cheapest Weight Loss Medication 2026 — Affordable GLP-1 Providers Compared",
        seoDescription: "Find the most affordable GLP-1 weight loss medication in 2026. Compare compounded semaglutide and tirzepatide providers by price, with total cost breakdowns.",
        h1: "Most Affordable Weight Loss Medication 2026",
        h2: "Compare the cheapest GLP-1 providers",
        heroDescription: "GLP-1 medications don't have to cost $1,000/month. Compounded semaglutide and tirzepatide from telehealth providers start at $200–$300/month — including medication, consultations, and delivery.",
        providerOrder: ["altrx", "trimrx", "shed", "ro", "noom", "embody", "wellmedr", "sunlight", "medvi", "sprout", "wellorithm"],
        editorialSections: [
          {
            heading: "Why GLP-1 Medication Is Getting More Affordable",
            body: 'Compounded versions of semaglutide and tirzepatide have made GLP-1 treatment accessible to far more patients. Licensed compounding pharmacies produce these medications using the same active ingredients at a fraction of the brand-name cost. Learn more in our <a href="/articles/weight-loss-medication-cost-guide">complete cost guide</a>.',
          },
          {
            heading: "What's Included in the Price",
            body: 'The best value providers bundle everything into one monthly fee. When comparing costs, make sure you\'re looking at the total — not just the medication price. Read <a href="/articles/choosing-telehealth-weight-loss-provider">how to evaluate providers</a> to avoid hidden fees.',
            bullets: ["Prescription medication", "Medical consultations and check-ins", "Dose adjustments and support", "Free home delivery", "No enrollment or hidden fees"],
          },
          {
            heading: "Cheap vs. Good Value",
            body: 'The cheapest provider isn\'t always the best choice. Cutting corners on medical oversight can lead to poor outcomes or safety concerns. A slightly higher-priced provider with thorough clinical support, responsive care teams, and quality medications is often the better investment. <a href="/">Compare providers</a> on our platform to find the best balance of cost and quality.',
          },
          {
            heading: "Find the Right Provider for Your Budget",
            body: '<a href="/find-your-match">Take our matching quiz</a> and we\'ll recommend providers that fit your goals and budget. You can also compare <a href="/semaglutide">semaglutide providers</a> or <a href="/tirzepatide">tirzepatide providers</a> specifically.',
          },
        ],
      },
    ],
    quiz: {
      welcomeTitle: "Find Your Best Weight Loss Provider",
      welcomeSubtitle: "Answer 4 quick questions and we'll match you with the provider that best fits your goals.",
      welcomeTrustPoints: ["Takes less than 1 minute", "Personalized provider recommendations", "Completely free"],
      welcomeCta: "Find My Match",
      midFlowMessage: "Great! Almost done — just a few more.",
      pageTitle: "Find Your Best Weight Loss Provider",
      pageSubtitle: "Answer 4 quick questions and we'll match you with the provider that best fits your goals.",
      resultsTitle: "Your Best Match",
      resultsSubtitle: "Based on your answers, this provider is the strongest fit for your goals and preferences.",
      resultsOthersTitle: "Other Providers You May Want to Consider",
      trustStrip: ["Updated Monthly", "Editorially Reviewed", "Independent Provider Comparison"],
      testimonials: [
        { text: "I finally found a provider that fit my budget and the whole process was much easier than I expected.", name: "Sarah M.", state: "Texas" },
        { text: "The matching quiz saved me hours of research. I was approved and had my medication within a week.", name: "Jessica R.", state: "Florida" },
        { text: "I was skeptical at first but the process was simple and my provider has been incredibly supportive.", name: "Amanda K.", state: "California" },
        { text: "Everything was handled online and my prescription arrived faster than I thought possible.", name: "Rachel T.", state: "New York" },
        { text: "I compared several options and this made it so easy to find the right fit for my goals and budget.", name: "Michelle D.", state: "Ohio" },
        { text: "The whole experience felt professional and trustworthy. I'm glad I took the quiz.", name: "Lauren P.", state: "Georgia" },
      ],
      loadingMessages: ["Comparing providers for you...", "Checking treatment options...", "Finding your best match...", "Almost there..."],
      loadingScreen: {
        headline: "Finding your best match",
        supportingTexts: [
          "Matching your preferences...",
          "Reviewing treatment options...",
          "Comparing pricing...",
          "Checking provider quality...",
          "Finalizing your recommendation...",
        ],
        providerLogos: ["altrx", "noom", "ro", "trimrx", "shed", "embody", "wellmedr", "sunlight"],
        durationMs: 4400,
      },
      questions: [
        {
          id: "goal",
          title: "What's your main weight loss goal?",
          subtitle: "This helps us recommend providers that best match your goals.",
          type: "cards" as const,
          options: [
            { label: "Lose up to <strong>20 lbs</strong>", value: "light" },
            { label: "Lose <strong>20–50 lbs</strong>", value: "moderate" },
            { label: "Lose <strong>50+ lbs</strong>", value: "significant" },
            { label: "<strong>I'm not sure yet</strong>", value: "exploring" },
          ],
        },
        {
          id: "experience",
          title: "Have you tried weight loss meds before?",
          subtitle: "No wrong answer — this just helps us personalize.",
          type: "cards" as const,
          options: [
            { label: "Yes, I have", value: "yes" },
            { label: "No, it's my first time", value: "no" },
            { label: "I'm not sure", value: "unsure" },
          ],
        },
        {
          id: "priority",
          title: "What's most important to you?",
          subtitle: "Pick the one that feels most important right now.",
          type: "cards" as const,
          options: [
            { label: "Lowest monthly cost", value: "cost" },
            { label: "Doctor-guided care", value: "medical" },
            { label: "Fast online treatment", value: "online" },
            { label: "Personalized care", value: "personalized" },
          ],
        },
        {
          id: "timing",
          title: "When would you like to get started?",
          subtitle: "No pressure — just helps us prioritize.",
          type: "cards" as const,
          options: [
            { label: "Today", value: "today" },
            { label: "This week", value: "this_week" },
            { label: "Just exploring", value: "exploring" },
          ],
        },
        {
          id: "state",
          title: "One last step — which state are you in?",
          subtitle: "Some providers aren't available in every state.",
          type: "dropdown" as const,
          options: [
            { label: "Alabama", value: "AL" }, { label: "Alaska", value: "AK" }, { label: "Arizona", value: "AZ" },
            { label: "Arkansas", value: "AR" }, { label: "California", value: "CA" }, { label: "Colorado", value: "CO" },
            { label: "Connecticut", value: "CT" }, { label: "Delaware", value: "DE" }, { label: "Florida", value: "FL" },
            { label: "Georgia", value: "GA" }, { label: "Hawaii", value: "HI" }, { label: "Idaho", value: "ID" },
            { label: "Illinois", value: "IL" }, { label: "Indiana", value: "IN" }, { label: "Iowa", value: "IA" },
            { label: "Kansas", value: "KS" }, { label: "Kentucky", value: "KY" }, { label: "Louisiana", value: "LA" },
            { label: "Maine", value: "ME" }, { label: "Maryland", value: "MD" }, { label: "Massachusetts", value: "MA" },
            { label: "Michigan", value: "MI" }, { label: "Minnesota", value: "MN" }, { label: "Mississippi", value: "MS" },
            { label: "Missouri", value: "MO" }, { label: "Montana", value: "MT" }, { label: "Nebraska", value: "NE" },
            { label: "Nevada", value: "NV" }, { label: "New Hampshire", value: "NH" }, { label: "New Jersey", value: "NJ" },
            { label: "New Mexico", value: "NM" }, { label: "New York", value: "NY" }, { label: "North Carolina", value: "NC" },
            { label: "North Dakota", value: "ND" }, { label: "Ohio", value: "OH" }, { label: "Oklahoma", value: "OK" },
            { label: "Oregon", value: "OR" }, { label: "Pennsylvania", value: "PA" }, { label: "Rhode Island", value: "RI" },
            { label: "South Carolina", value: "SC" }, { label: "South Dakota", value: "SD" }, { label: "Tennessee", value: "TN" },
            { label: "Texas", value: "TX" }, { label: "Utah", value: "UT" }, { label: "Vermont", value: "VT" },
            { label: "Virginia", value: "VA" }, { label: "Washington", value: "WA" }, { label: "West Virginia", value: "WV" },
            { label: "Wisconsin", value: "WI" }, { label: "Wyoming", value: "WY" }, { label: "Washington D.C.", value: "DC" },
          ],
        },
      ],
      providerProfiles: [
        { providerId: "altrx", priceLevel: "mid", strengths: ["medical", "online", "personalized"], matchReasons: { cost: "Transparent all-inclusive pricing", medical: "Physician-guided treatment plans", online: "Full telehealth platform", personalized: "Customized GLP-1 protocols" } },
        { providerId: "noom", priceLevel: "mid", strengths: ["personalized", "medical"], matchReasons: { cost: "Flexible subscription options", medical: "Noom Med clinical program", online: "App-based convenience", personalized: "Psychology-based coaching" } },
        { providerId: "ro", priceLevel: "mid", strengths: ["online", "medical"], matchReasons: { cost: "Competitive monthly pricing", medical: "Board-certified providers", online: "Streamlined telehealth experience", personalized: "Provider-guided adjustments" } },
        { providerId: "trimrx", priceLevel: "low", strengths: ["cost", "online"], matchReasons: { cost: "Among the most affordable options", medical: "Clinical guidance included", online: "Simple online enrollment", personalized: "Flexible treatment plans" } },
        { providerId: "shed", priceLevel: "mid", strengths: ["personalized", "online"], matchReasons: { cost: "Competitive plan pricing", medical: "Provider-supervised treatment", online: "Home delivery included", personalized: "Highly personalized programs" } },
        { providerId: "embody", priceLevel: "mid", strengths: ["medical", "personalized"], matchReasons: { cost: "Competitive treatment pricing", medical: "Doctor-led weight loss programs", online: "Full online medical evaluation", personalized: "Provider-monitored care plans" } },
        { providerId: "wellmedr", priceLevel: "mid", strengths: ["medical", "personalized"], matchReasons: { cost: "Affordable long-term plans", medical: "Clinical guidance throughout treatment", online: "Convenient telehealth access", personalized: "Focus on sustainable results" } },
        { providerId: "sunlight", priceLevel: "mid", strengths: ["online", "personalized"], matchReasons: { cost: "Flexible pricing options", medical: "Licensed provider consultations", online: "Easy online follow-up care", personalized: "Treatment adapted to your needs" } },
        { providerId: "medvi", priceLevel: "mid", strengths: ["online", "medical"], matchReasons: { cost: "Straightforward monthly pricing", medical: "Provider support throughout program", online: "Simple online enrollment", personalized: "Prescription-based treatment plans" } },
        { providerId: "sprout", priceLevel: "mid", strengths: ["personalized", "cost"], matchReasons: { cost: "Save $200 on your first month", medical: "Provider-guided weight loss", online: "Prescription shipped within 2 days", personalized: "Designed around your health goals" } },
        { providerId: "wellorithm", priceLevel: "low", strengths: ["cost", "online"], matchReasons: { cost: "Plans starting at just $147", medical: "No membership or hidden fees", online: "Free shipping included nationwide", personalized: "HSA/FSA eligible treatment plans" } },
        { providerId: "directmeds", priceLevel: "low", strengths: ["cost", "online"], matchReasons: { cost: "Plans starting at just $147", medical: "Online medical visit included", online: "Free shipping in 1-2 days", personalized: "No insurance required to qualify" } },
        { providerId: "found", priceLevel: "mid", strengths: ["medical", "personalized"], matchReasons: { cost: "Up to $100 off membership", medical: "Board-certified provider care", online: "Affordable GLP-1 delivered fast", personalized: "Covered by major insurance plans" } },
        { providerId: "yucca", priceLevel: "low", strengths: ["cost", "online"], matchReasons: { cost: "Weight loss plans from $146", medical: "Licensed providers in all 50 states", online: "Free expedited shipping", personalized: "Trusted by over 20,000 patients" } },
        { providerId: "synergyrx", priceLevel: "low", strengths: ["cost", "medical"], matchReasons: { cost: "Compounded semaglutide from $199", medical: "Licensed physician oversight", online: "Available in all 50 states", personalized: "Personalized medical supervision" } },
        { providerId: "bodybuildinghealth", priceLevel: "mid", strengths: ["medical", "personalized"], matchReasons: { cost: "$100 off limited-time offer", medical: "Provider-guided weight loss", online: "No commitment until approved", personalized: "Choose GLP-1 or GIP + GLP-1" } },
        { providerId: "livbody", priceLevel: "mid", strengths: ["personalized", "medical"], matchReasons: { cost: "Competitive compounded pricing", medical: "Clinician-prescribed care", online: "Home delivery included", personalized: "Biology-based treatment plans" } },
        { providerId: "skinnyrx", priceLevel: "mid", strengths: ["online", "medical"], matchReasons: { cost: "Competitive compounded pricing", medical: "Physician-prescribed GLP-1 care", online: "Fast home delivery nationwide", personalized: "Provider-guided treatment plans" } },
      ],
    },
  };
}

export async function getConfig(): Promise<SiteConfig> {
  try {
    const { blobs } = await list({ prefix: BLOB_KEY });
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, { cache: "no-store" });
      if (res.ok) {
        const saved = (await res.json()) as Partial<SiteConfig>;
        const initial = buildInitialConfig();
        // Merge providers: keep saved, add new defaults by id
        const savedProviders = (saved.providers || []).map((p) => ({
          ...p,
          smallLogo: p.smallLogo || `/logos/${p.id}-icon.svg`,
          // Backfill seeded Trustpilot content for providers saved before the
          // fields existed; CMS-edited values (including deletions) win.
          trustpilotRating: p.trustpilotRating ?? seedTrustpilot[p.id]?.rating,
          trustpilotReviewCount: p.trustpilotReviewCount ?? seedTrustpilot[p.id]?.reviewCount,
          trustpilotReviews: p.trustpilotReviews ?? seedTrustpilot[p.id]?.reviews,
        }));
        const savedProviderIds = new Set(savedProviders.map((p) => p.id));
        const newProviders = initial.providers
          .filter((p) => !savedProviderIds.has(p.id))
          .map((p) => ({ ...p, smallLogo: p.smallLogo || `/logos/${p.id}-icon.svg` }));
        const providers = [...savedProviders, ...newProviders];
        return {
          ...initial,
          ...saved,
          providers,
          ranking: saved.ranking && saved.ranking.providerOrder && saved.ranking.providerOrder.length > 0 ? saved.ranking : initial.ranking,
          reviews: (() => {
            const savedReviews = saved.reviews && saved.reviews.length > 0 ? saved.reviews : [];
            const savedSlugs = new Set(savedReviews.map((r) => r.slug));
            const newDefaults = initial.reviews.filter((r) => !savedSlugs.has(r.slug));
            return [...savedReviews, ...newDefaults];
          })(),
          articles: (() => {
            const savedArticles = saved.articles && saved.articles.length > 0 ? saved.articles : [];
            const savedSlugs = new Set(savedArticles.map((a) => a.slug));
            const newDefaults = initial.articles.filter((a) => !savedSlugs.has(a.slug));
            return [...savedArticles, ...newDefaults];
          })(),
          battles: (saved.battles && saved.battles.length > 0 ? saved.battles : initial.battles).map((b) => {
            const pair = [b.provider1Id, b.provider2Id];
            if (pair.includes("embody") && pair.includes("altrx") && b.winnerId !== "embody") {
              return { ...embodyAltrxBattle, slug: b.slug };
            }
            return b;
          }),
          sidebars: saved.sidebars && saved.sidebars.length > 0 ? saved.sidebars : initial.sidebars,
          landingPages: saved.landingPages && saved.landingPages.length > 0 ? saved.landingPages : initial.landingPages,
          quiz: saved.quiz && saved.quiz.questions && saved.quiz.questions.length > 0 ? { ...initial.quiz, ...saved.quiz } : initial.quiz,
        };
      }
    }
  } catch {
    // fall through to default
  }
  return buildInitialConfig();
}

export async function saveConfig(config: SiteConfig): Promise<void> {
  await put(BLOB_KEY, JSON.stringify(config, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}
