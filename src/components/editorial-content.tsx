import Link from "next/link";

export function EditorialContent() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 text-[16px] leading-[1.7] text-gray-700">
      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        Weight Loss Injections Compared
      </h2>
      <p className="mb-4">
        Choosing the right weight loss provider involves more than selecting a medication. Pricing, clinical support, treatment plans, eligibility requirements, and long-term value can vary significantly between providers. Not sure where to start? Try our{" "}
        <Link href="/find-your-match" className="font-semibold text-[#0C4B75] hover:underline">
          provider matching quiz
        </Link>{" "}
        for a personalized recommendation.
      </p>
      <p className="mb-4">
        To help simplify the decision, we reviewed leading weight loss programs and compared them based on medication access, affordability, provider support, customer experience, and overall value. Read our{" "}
        <Link href="/reviews" className="font-semibold text-[#0C4B75] hover:underline">
          in-depth provider reviews
        </Link>{" "}
        for detailed breakdowns.
      </p>
      <p className="mb-8">
        Our goal is to help you identify the provider that best aligns with your health goals, budget, and treatment preferences.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        Weight Loss Program Pricing Comparison
      </h2>
      <p className="mb-4">
        Monthly costs can vary depending on the provider, medication prescribed, and level of support included in the program. Learn more about{" "}
        <Link href="/articles/choosing-telehealth-weight-loss-provider" className="font-semibold text-[#0C4B75] hover:underline">
          how to choose the right telehealth provider
        </Link>{" "}
        to understand what you should expect to pay.
      </p>
      <p className="mb-3">Many providers offer all-inclusive plans that may include:</p>
      <ul className="mb-8 list-disc space-y-1 pl-6">
        <li>Prescription medication</li>
        <li>Medical consultations</li>
        <li>Ongoing provider support</li>
        <li>Progress tracking tools</li>
        <li>Home delivery</li>
      </ul>
      <p className="mb-8">
        Some programs focus on affordability, while others provide more personalized care and additional clinical services.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        What to Consider Before Starting Treatment
      </h2>
      <p className="mb-3">
        Before choosing a weight loss provider, it&apos;s important to evaluate several key factors. Our guide on{" "}
        <Link href="/articles/first-month-weight-loss-medication" className="font-semibold text-[#0C4B75] hover:underline">
          what to expect your first month on medication
        </Link>{" "}
        can help you prepare:
      </p>
      <ul className="mb-8 list-disc space-y-1 pl-6">
        <li>Available medication options</li>
        <li>Medical eligibility requirements</li>
        <li>Potential side effects</li>
        <li>Level of provider support</li>
        <li>Program flexibility</li>
        <li>Overall treatment costs</li>
      </ul>
      <p className="mb-8">
        Comparing providers side-by-side can help you better understand the differences and make a more informed decision.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        Popular Weight Loss Medications
      </h2>
      <p className="mb-3">
        Many leading weight loss programs offer access to GLP-1 receptor agonist medications. Learn{" "}
        <Link href="/articles/how-glp1-medications-work" className="font-semibold text-[#0C4B75] hover:underline">
          how GLP-1 medications actually work
        </Link>{" "}
        for a detailed breakdown. Common options include:
      </p>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li>Semaglutide</li>
        <li>Tirzepatide</li>
        <li>Liraglutide</li>
      </ul>
      <p className="mb-8">
        Medication availability may vary depending on your location, medical history, and provider policies.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        How We Evaluated Providers
      </h2>
      <p className="mb-3">Our rankings are based on a combination of factors including:</p>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li>Pricing transparency</li>
        <li>Medication availability</li>
        <li>Clinical oversight</li>
        <li>Customer experience</li>
        <li>Program flexibility</li>
        <li>Overall value</li>
      </ul>
      <p>
        We continuously review and update our recommendations to help consumers{" "}
        <Link href="/reviews" className="font-semibold text-[#0C4B75] hover:underline">
          compare leading weight loss solutions
        </Link>{" "}
        with confidence. Browse all{" "}
        <Link href="/articles" className="font-semibold text-[#0C4B75] hover:underline">
          weight loss articles
        </Link>{" "}
        for more research and guides.
      </p>
    </div>
  );
}
