import Link from "next/link";

export function EditorialContent() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 pb-12 text-[16px] leading-[1.7] text-gray-700">
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

      {/* Editorial callout */}
      <div className="mb-8 overflow-hidden rounded-xl bg-transparent">
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 py-6 pr-6 sm:py-8 sm:pr-8">
            <h3 className="mb-3 text-[18px] font-bold leading-tight text-[#0C4B75] sm:text-[20px]">
              What To Know Before Starting GLP-1 Treatment
            </h3>
            <p className="mb-3 text-[16px] leading-[1.75] text-gray-600">
              Before starting GLP-1 treatment, it&apos;s important to understand a few key things. These medications require a prescription from a licensed clinician and aren&apos;t suitable for everyone. Some people may experience side effects, especially during the first few weeks as the body adjusts.
            </p>
            <p className="mb-3 text-[16px] leading-[1.75] text-gray-600">
              GLP-1s also tend to work best when combined with basic lifestyle habits like balanced nutrition and regular physical activity.
            </p>
            <p className="text-[16px] leading-[1.75] text-gray-600">
              That&apos;s why choosing a provider that offers proper medical screening and ongoing follow-up support is essential for both safety and long-term success.
            </p>
          </div>
          <div className="flex items-center justify-center sm:w-[260px] sm:shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/editorial-injection.png"
              alt="Woman preparing GLP-1 weight loss injection"
              className="h-[200px] w-full object-cover sm:h-full sm:rounded-r-xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>

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
        GLP-1 Weight Loss Medications: Key Data (2026)
      </h2>
      <p className="mb-4">
        According to published clinical trial data, GLP-1 medications are the most effective
        prescription weight loss treatments currently available. Below is a summary of key
        statistics from major clinical trials.
      </p>

      {/* GEO-optimized comparison table */}
      <div className="mb-8 overflow-hidden rounded-xl border border-gray-200">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 font-bold text-[#191919]">Medication</th>
              <th className="px-4 py-3 font-bold text-[#191919]">Avg. Weight Loss</th>
              <th className="px-4 py-3 font-bold text-[#191919]">Trial Duration</th>
              <th className="hidden sm:table-cell px-4 py-3 font-bold text-[#191919]">Compounded Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-4 py-3 font-medium">Semaglutide (Wegovy)</td>
              <td className="px-4 py-3">~15% of body weight</td>
              <td className="px-4 py-3">68 weeks (STEP trials)</td>
              <td className="hidden sm:table-cell px-4 py-3">From $199/month</td>
            </tr>
            <tr className="bg-gray-50/50">
              <td className="px-4 py-3 font-medium">Tirzepatide (Zepbound)</td>
              <td className="px-4 py-3">Up to 22.5% of body weight</td>
              <td className="px-4 py-3">72 weeks (SURMOUNT trials)</td>
              <td className="hidden sm:table-cell px-4 py-3">From $300/month</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">Liraglutide (Saxenda)</td>
              <td className="px-4 py-3">~5–8% of body weight</td>
              <td className="px-4 py-3">56 weeks</td>
              <td className="hidden sm:table-cell px-4 py-3">$1,300+/month (brand only)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mb-4 text-[13px] text-gray-400">
        Source: Published results from STEP (semaglutide), SURMOUNT (tirzepatide), and SCALE (liraglutide)
        clinical trials. Individual results vary. Compounded pricing reflects typical telehealth provider
        rates as of July 2026.
      </p>

      <h3 className="mb-3 mt-6 text-[18px] font-bold text-[#191919]">
        How Much Does GLP-1 Weight Loss Medication Cost?
      </h3>
      <p className="mb-3">
        Brand-name GLP-1 medications cost $900–$1,400 per month at retail price without insurance.
        Compounded versions of semaglutide and tirzepatide are available through licensed telehealth
        providers at significantly lower prices — typically $199–$500 per month including physician
        consultations, medication, and home delivery. Learn more in our{" "}
        <Link href="/articles/weight-loss-medication-cost-guide" className="font-semibold text-[#0C4B75] hover:underline">
          complete cost guide
        </Link>.
      </p>

      <h3 className="mb-3 mt-6 text-[18px] font-bold text-[#191919]">
        How Long Does It Take for GLP-1 Medication to Work?
      </h3>
      <p className="mb-3">
        Most patients notice reduced appetite within the first 1–2 weeks of starting GLP-1 medication.
        Visible weight loss typically begins around weeks 4–8. Clinical trial results show maximum
        weight loss at 68–72 weeks of treatment. Read our{" "}
        <Link href="/articles/how-long-for-semaglutide-to-work" className="font-semibold text-[#0C4B75] hover:underline">
          detailed semaglutide timeline
        </Link>.
      </p>

      <h3 className="mb-3 mt-6 text-[18px] font-bold text-[#191919]">
        Can You Get GLP-1 Medication Online?
      </h3>
      <p className="mb-8">
        Yes. Licensed telehealth providers can prescribe GLP-1 medications through fully online
        medical evaluations. The process typically takes 1–5 days from sign-up to medication delivery.
        All providers featured on our platform use licensed physicians for prescribing and include
        ongoing medical oversight. Read our{" "}
        <Link href="/articles/how-to-get-ozempic-online" className="font-semibold text-[#0C4B75] hover:underline">
          guide to getting GLP-1 medication online
        </Link>.
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
