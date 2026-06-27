export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  heroColor: string;
  sections: { heading: string; body: string }[];
}

export const articles: Article[] = [
  {
    slug: "how-glp1-medications-work",
    title: "How GLP-1 Medications Actually Work for Weight Loss",
    description:
      "A clear breakdown of how semaglutide and tirzepatide help with weight loss — the science, the process, and what happens in your body.",
    category: "Science",
    readTime: "6 min read",
    publishedAt: "2026-05-12",
    updatedAt: "2026-06-20",
    heroColor: "#EEF4FB",
    sections: [
      {
        heading: "What Are GLP-1 Medications?",
        body: "GLP-1 receptor agonists are a class of prescription medications originally developed for type 2 diabetes. They mimic a natural hormone called glucagon-like peptide-1, which your gut produces after eating. Medications like semaglutide (the active ingredient in Ozempic and Wegovy) and tirzepatide (used in Mounjaro and Zepbound) have shown remarkable results for weight management in clinical trials, leading to FDA approval specifically for weight loss.",
      },
      {
        heading: "How They Reduce Appetite",
        body: "GLP-1 medications work primarily by targeting receptors in the brain that regulate hunger and satiety. When you take these medications, they slow gastric emptying — meaning food stays in your stomach longer — and signal to your brain that you are full. Many patients describe it as the volume being turned down on food noise: the constant background chatter of cravings and hunger that can make weight management so difficult. This isn't willpower — it's biochemistry.",
      },
      {
        heading: "The Role of Insulin and Blood Sugar",
        body: "Beyond appetite suppression, GLP-1 medications help regulate blood sugar by stimulating insulin release when glucose levels are high and reducing glucagon secretion. This dual action helps prevent the blood sugar spikes and crashes that often trigger cravings and overeating. For patients with insulin resistance — a common factor in weight gain — this mechanism can be particularly beneficial.",
      },
      {
        heading: "Tirzepatide: The Dual-Action Approach",
        body: "Tirzepatide takes things a step further by targeting two receptors: GLP-1 and GIP (glucose-dependent insulinotropic polypeptide). This dual-agonist approach has shown even greater weight loss results in clinical trials, with some participants losing over 20% of their body weight. The GIP receptor activation provides additional metabolic benefits that complement the GLP-1 pathway.",
      },
      {
        heading: "What to Realistically Expect",
        body: "Clinical trials show average weight loss of 15-20% of body weight with semaglutide and up to 22% with tirzepatide over 68–72 weeks. However, results vary significantly between individuals. Most patients begin noticing appetite changes within the first two weeks, with meaningful weight loss becoming visible around weeks 4-8. The medications are typically administered as once-weekly injections, with doses gradually increased over several months to minimize side effects.",
      },
      {
        heading: "Common Side Effects",
        body: "The most common side effects are gastrointestinal: nausea, vomiting, diarrhea, and constipation. These are usually most pronounced during dose increases and tend to improve over time. Starting at a low dose and gradually titrating up helps most patients manage these effects. More serious but rare side effects include pancreatitis and gallbladder problems, which is why medical supervision during treatment is important.",
      },
    ],
  },
  {
    slug: "first-month-weight-loss-medication",
    title: "What to Expect Your First Month on Weight Loss Medication",
    description:
      "A week-by-week guide to your first 30 days on GLP-1 treatment — from the initial injection to early results and managing side effects.",
    category: "Guide",
    readTime: "7 min read",
    publishedAt: "2026-04-28",
    updatedAt: "2026-06-15",
    heroColor: "#F0FAF5",
    sections: [
      {
        heading: "Before You Start",
        body: "Your provider will typically begin with a medical evaluation — either in-person or via telehealth — to review your health history, current medications, and weight loss goals. Blood work may be ordered to check metabolic markers. Once approved, your medication will be shipped to your door (most telehealth providers include home delivery). You'll receive your first dose at the lowest available strength, which helps your body adjust gradually.",
      },
      {
        heading: "Week 1: The Adjustment Period",
        body: "Your first injection may feel anticlimactic — the needle is thin and the injection itself takes seconds. Within the first few days, many patients notice subtle changes in appetite. You might feel full faster at meals or find that you're simply not thinking about food as much. Some people experience mild nausea, especially after eating large or fatty meals. This is your body adjusting. Stay hydrated, eat smaller portions, and avoid greasy foods.",
      },
      {
        heading: "Week 2: Appetite Changes Become Clearer",
        body: "By the second week, appetite reduction is more noticeable for most patients. You may find yourself leaving food on your plate — something that might feel unfamiliar. Portion sizes that used to seem normal now feel like too much. Some patients report that cravings for specific foods (sugar, processed snacks) diminish significantly. If nausea persists, eating bland, protein-rich foods and staying well-hydrated helps. Ginger tea and small, frequent meals are common strategies.",
      },
      {
        heading: "Weeks 3-4: Early Results",
        body: "By the end of the first month, many patients see 3-5 pounds of weight loss, though this varies widely. The scale may not tell the whole story — changes in how clothes fit, energy levels, and relationship with food are equally important early indicators. Some patients lose more, some less. Remember: you're on the starting dose, and most of the weight loss acceleration happens as doses increase over the following months.",
      },
      {
        heading: "Managing Side Effects",
        body: "If you experience nausea, constipation, or digestive discomfort, know that these are the most commonly reported side effects and they usually improve. Practical tips that help: eat slowly, choose lean proteins and vegetables, avoid carbonated drinks, stay hydrated throughout the day, and don't eat until you're overly full. If side effects are severe or persistent, contact your provider — they may adjust your timeline for dose increases.",
      },
      {
        heading: "Setting Realistic Expectations",
        body: "The first month is about building a foundation, not dramatic transformation. The medication needs time to reach effective levels in your body, and dose titration happens gradually for good reason. Patients who see the best long-term results are those who combine medication with sustainable lifestyle changes: regular movement, adequate sleep, stress management, and balanced nutrition. Think of the medication as a powerful tool that makes these changes significantly easier — not a replacement for them.",
      },
    ],
  },
  {
    slug: "choosing-telehealth-weight-loss-provider",
    title: "How to Choose the Right Telehealth Weight Loss Provider",
    description:
      "Not all online weight loss programs are equal. Here's what to look for — and what to avoid — when picking a telehealth provider for GLP-1 treatment.",
    category: "Advice",
    readTime: "5 min read",
    publishedAt: "2026-05-20",
    updatedAt: "2026-06-22",
    heroColor: "#FBF5EE",
    sections: [
      {
        heading: "Why Provider Choice Matters",
        body: "The telehealth weight loss space has grown rapidly, with dozens of providers now offering GLP-1 medication access online. While this has made treatment more accessible, it also means the quality of care varies significantly. Some providers offer comprehensive medical oversight with board-certified physicians, while others take a more transactional approach. The provider you choose affects not just cost, but the safety and effectiveness of your treatment.",
      },
      {
        heading: "Check for Licensed Medical Providers",
        body: "This is non-negotiable. Your weight loss treatment should be prescribed and supervised by a licensed physician, nurse practitioner, or physician assistant. Avoid any platform that prescribes medication without a proper medical evaluation. Ask whether you'll have ongoing access to a medical professional for dose adjustments and questions — not just an initial consultation. Good providers include regular check-ins as part of their program.",
      },
      {
        heading: "Understand What's Included in the Price",
        body: "Pricing in this space can be confusing. Some providers quote a low monthly fee but charge separately for medication, consultations, or shipping. Others offer all-inclusive plans where everything is bundled. When comparing costs, look at the total monthly expense including medication, provider consultations, and delivery. Also check whether there are enrollment fees, cancellation fees, or minimum commitment periods. The cheapest option isn't always the best value if it cuts corners on medical oversight.",
      },
      {
        heading: "Compounded vs. Brand-Name Medications",
        body: "Some providers offer compounded versions of semaglutide or tirzepatide — medications made by compounding pharmacies rather than the original manufacturer. These are typically less expensive but come with trade-offs. Compounded medications are not FDA-approved in the same way as brand-name drugs, and quality can vary between pharmacies. Reputable providers use licensed 503B compounding pharmacies that follow strict manufacturing standards. Ask your provider which pharmacy they use and verify its credentials.",
      },
      {
        heading: "Look for Ongoing Support",
        body: "Weight loss medication works best as part of a comprehensive approach. The better telehealth providers offer more than just a prescription: they include nutritional guidance, behavioral coaching, progress tracking, and responsive support teams. Look for providers that have a clear process for dose adjustments, handle side effect concerns promptly, and provide educational resources. A provider that just ships medication without meaningful follow-up is not providing adequate care.",
      },
      {
        heading: "Red Flags to Watch For",
        body: "Be cautious of providers that guarantee specific weight loss amounts, offer medication without any medical evaluation, pressure you into long-term contracts, or lack clear information about their medical team. Also watch for providers that don't disclose their compounding pharmacy sources or that offer medications at prices that seem too good to be true. Legitimate medical weight loss is an investment in your health — and the provider managing your care should treat it that way.",
      },
    ],
  },
  {
    slug: "weight-loss-plateau-what-to-do",
    title: "Hit a Weight Loss Plateau? Here's What's Actually Happening",
    description:
      "Why weight loss stalls happen — even on GLP-1 medication — and evidence-based strategies to get past them without frustration.",
    category: "Wellness",
    readTime: "6 min read",
    publishedAt: "2026-06-01",
    updatedAt: "2026-06-25",
    heroColor: "#F5F0FB",
    sections: [
      {
        heading: "Plateaus Are Normal — Even on Medication",
        body: "If your weight loss has stalled after weeks or months of steady progress, you're not doing anything wrong. Plateaus are a well-documented physiological response that nearly every person experiences during weight loss, whether they're using medication or not. Your body is remarkably adaptive — as you lose weight, your metabolism adjusts, your hormonal profile shifts, and your body becomes more efficient at conserving energy. Understanding this process is the first step to moving through it.",
      },
      {
        heading: "What's Happening in Your Body",
        body: "When you lose weight, several things change simultaneously. Your resting metabolic rate decreases because a smaller body requires fewer calories to function. Levels of leptin (the satiety hormone) drop, while ghrelin (the hunger hormone) can increase. Your body also becomes more efficient at using calories — a survival mechanism that served our ancestors well but works against modern weight loss goals. This metabolic adaptation is not permanent, but it can create periods where the scale doesn't move.",
      },
      {
        heading: "The Dose Titration Factor",
        body: "For patients on GLP-1 medications, plateaus sometimes coincide with your body adjusting to a particular dose. As your system adapts, the appetite-suppressing effects may feel less pronounced. This is one reason why these medications use a graduated dosing schedule — moving to a higher dose often restarts progress. Talk to your provider about your plateau; if you haven't yet reached your maximum dose, an adjustment may be appropriate.",
      },
      {
        heading: "Reassess Your Nutrition",
        body: "Plateaus are a good time to take an honest look at your eating patterns. As appetite suppression from medication becomes your new normal, it's possible that portion sizes have gradually crept back up without you noticing. You don't need to obsessively track calories, but keeping a food diary for a week can reveal patterns. Focus on protein intake — it supports muscle preservation during weight loss and has the highest thermic effect of any macronutrient, meaning your body burns more calories digesting it.",
      },
      {
        heading: "The Role of Movement and Muscle",
        body: "If you haven't incorporated strength training into your routine, a plateau is a compelling reason to start. Resistance exercise builds and preserves lean muscle mass, which is metabolically active tissue that burns calories even at rest. You don't need an intense gym routine — bodyweight exercises, resistance bands, or moderate weight training 2-3 times per week can make a meaningful difference. Walking remains one of the most underrated tools for weight management: aim for consistent daily steps rather than sporadic intense cardio.",
      },
      {
        heading: "When to Talk to Your Provider",
        body: "A plateau lasting 2-4 weeks is normal and usually resolves on its own or with minor adjustments. If your weight has stalled for 6+ weeks despite consistent effort, it's worth having a conversation with your medical provider. They can assess whether a dose adjustment is appropriate, check for underlying factors like thyroid function or medication interactions, and help you recalibrate your approach. The goal is sustained, healthy weight loss — not a race to a number on the scale.",
      },
    ],
  },
];
