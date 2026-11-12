import Link from "next/link";
import { imgDims } from "@/lib/image-dims";

const tirzVsSemaRows: [string, string, string][] = [
  ["Drug class", "Dual GIP/GLP-1 receptor agonist", "GLP-1 receptor agonist"],
  ["Average Weight Loss in Trials", "~15.0%-20.9% average loss measured at the 72-week assessment point (SURMOUNT)", "~14.9% mean loss measured at the 68-week assessment point (STEP)"],
  ["FDA Approval Status", "Zepbound® injection is FDA-approved for chronic weight management; the same molecule is approved for type 2 diabetes as Mounjaro® injection", "Wegovy® injection and Wegovy® tablets are FDA-approved for chronic weight management; the same molecule is approved for type 2 diabetes as Ozempic® injection"],
  ["Dosing Schedule", "Once-weekly injection", "Once-weekly injection (Wegovy®, Ozempic®); Wegovy® tablets are taken once daily"],
  ["Best For", "Patients seeking greater average weight loss observed in clinical trials, when appropriate", "Patients seeking an FDA-approved GLP-1 therapy with extensive long-term safety and outcomes data"],
  ["Insurance Coverage", "May not always be covered by insurance yet", "Coverage varies; may be available on more formularies depending on insurer"],
];

const wegovyVsOzempicRows: [string, string, string][] = [
  ["Average Weight Loss in Trials", "~14.9% mean weight loss measured at the 68-week assessment point (STEP 1, injection)", "5-10% weight loss observed in type 2 diabetes trials, depending on dose"],
  ["FDA Approval Status", "Wegovy® injection and Wegovy® tablets are FDA-approved for chronic weight management", "Ozempic® injection is FDA-approved for type 2 diabetes; use for weight loss is off-label"],
  ["Dosing Schedule", "Once-weekly injection; Wegovy® tablets are taken once daily", "Once-weekly injection"],
  ["Best For", "Patients seeking an FDA-approved medication for long-term weight management", "Patients with diabetes who may also benefit from weight loss"],
  ["Insurance Coverage", "Coverage varies; often limited for obesity medications", "May have broader insurance coverage when prescribed for diabetes"],
];

function ComparisonTable({ colA, colB, rows }: { colA: string; colB: string; rows: [string, string, string][] }) {
  return (
    <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[600px] text-left text-[14px]">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 font-bold text-[#191919]">Key Consideration</th>
            <th className="px-4 py-3 font-bold text-[#191919]">{colA}</th>
            <th className="px-4 py-3 font-bold text-[#191919]">{colB}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map(([k, a, b], i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-gray-50/50" : ""}>
              <td className="px-4 py-3 align-top font-medium text-[#191919]">{k}</td>
              <td className="px-4 py-3 align-top text-gray-600">{a}</td>
              <td className="px-4 py-3 align-top text-gray-600">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EditorialContent({ midSlot }: { midSlot?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 pb-12 text-[16px] leading-[1.7] text-gray-800">
      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        The Best Weight Loss Injections and Programs, Compared
      </h2>
      <p className="mb-4">
        To find the best weight loss injections and programs, we compare leading GLP-1 providers on the factors that actually matter. Choosing the right weight loss provider involves more than selecting a medication - pricing, clinical support, treatment plans, eligibility requirements, and long-term value can vary significantly between providers. Not sure where to start? Try our{" "}
        <Link href="/weight-loss/find-your-match" className="font-semibold text-[#0C4B75] hover:underline">
          provider matching quiz
        </Link>{" "}
        for a personalized recommendation.
      </p>
      <p className="mb-4">
        To help simplify the decision, we reviewed leading weight loss programs and compared them based on medication access, affordability, provider support, customer experience, and overall value. Read our{" "}
        <Link href="/weight-loss/reviews" className="font-semibold text-[#0C4B75] hover:underline">
          in-depth provider reviews
        </Link>{" "}
        for detailed breakdowns, or jump straight to a head-to-head like{" "}
        <Link href="/weight-loss/altrx-vs-embody" className="font-semibold text-[#0C4B75] hover:underline">
          altRx vs embody
        </Link>. Prefer an evidence-led view without scores? Our{" "}
        <Link href="/weight-loss/glp1-provider-comparison" className="font-semibold text-[#0C4B75] hover:underline">
          GLP-1 provider comparison
        </Link>{" "}
        sets eight providers side by side on verified prices, Trustpilot patterns, Reddit experiences and cancellation terms, and the{" "}
        <Link href="/weight-loss/glp1-weight-loss-statistics" className="font-semibold text-[#0C4B75] hover:underline">
          GLP-1 price index
        </Link>{" "}
        holds every verified price with a public log of each change.
      </p>
      <p className="mb-8">
        Our goal is to help you identify the provider that best aligns with your health goals, budget, and treatment preferences.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        What Do the Best Online Weight Loss Programs Cost in 2026?
      </h2>
      <p className="mb-4">
        These are the published monthly prices at every provider in our ranking - checked against
        each provider&apos;s own site, not estimated. Most plans are all-inclusive: prescription
        medication, medical consultations, ongoing support, and home delivery in one monthly fee.
      </p>
      <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-[600px] text-left text-[14px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 font-bold text-[#191919]">Provider</th>
              <th className="px-4 py-3 font-bold text-[#191919]">Semaglutide</th>
              <th className="px-4 py-3 font-bold text-[#191919]">Tirzepatide</th>
              <th className="px-4 py-3 font-bold text-[#191919]">Pricing model</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              ["welludr", "$41/mo", "$71/mo", "12-month plan for best rate"],
              ["embody", "$49/mo", "$99/mo", "Flat monthly, no commitment"],
              ["altRx", "$89/mo", "$149/mo", "Flat at every dose, BNPL"],
              ["Medvi", "$99/mo promo (reg. $199)", "$166/mo promo (reg. $299)", "All-inclusive + dietician"],
              ["HealthRx", "from $97/mo", "from $177/mo", "12-month plan for best rate"],
              ["DirectMeds", "$147/mo", "$147/mo", "Flat, needle-free option"],
              ["Sprout", "from $99/mo", "from $149/mo", "12-month plan for best rate; monthly $149/$199"],
              ["trimrx", "$149/mo, same at every dose", "$259/mo", "No contract"],
              ["SHED", "$199/mo", "$299/mo", "Money-back results guarantee"],
            ].map(([name, sema, tirz, model], i) => (
              <tr key={name} className={i % 2 === 1 ? "bg-gray-50/50" : ""}>
                <td className="px-4 py-3 align-top font-medium text-[#191919]">{name}</td>
                <td className="px-4 py-3 align-top text-gray-600">{sema}</td>
                <td className="px-4 py-3 align-top text-gray-600">{tirz}</td>
                <td className="px-4 py-3 align-top text-gray-600">{model}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mb-8 text-[13.5px] text-gray-500">
        Prices as published in August 2026 - confirm current pricing on each provider&apos;s site.
        For annual math and the budget tier in depth, see the{" "}
        <Link href="/weight-loss/cheapest-glp1" className="font-semibold text-[#0C4B75] hover:underline">
          cheapest verified GLP-1 comparison
        </Link>
        .
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        How to Choose a GLP-1 Telehealth Provider
      </h2>
      <p className="mb-3">
        Every legitimate online weight loss clinic shares the same backbone - a licensed clinician
        reviews your health intake before anything is prescribed. Beyond that, five checks separate
        the best telehealth weight loss providers from the rest:
      </p>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li>
          <strong>Published, all-inclusive pricing</strong> - a real monthly number on the site, not
          &quot;from&quot; teasers that grow at checkout
        </li>
        <li>
          <strong>Licensed prescriber review</strong> - and a provider willing to decline treatment
          when it isn&apos;t appropriate
        </li>
        <li>
          <strong>Pharmacy transparency</strong> - US-licensed 503A compounding pharmacies, named or
          verifiable
        </li>
        <li>
          <strong>Support you&apos;ll actually use</strong> - dose adjustments, side-effect guidance,
          a human to reach
        </li>
        <li>
          <strong>Shipping that fits the medication</strong> - tracked, insured, cold-chain where
          needed
        </li>
      </ul>
      <p className="mb-8">
        Our{" "}
        <Link href="/weight-loss/how-we-rank" className="font-semibold text-[#0C4B75] hover:underline">
          full ranking methodology
        </Link>{" "}
        explains how we score each of these. Prefer a shortcut? The{" "}
        <Link href="/weight-loss/find-your-match" className="font-semibold text-[#0C4B75] hover:underline">
          60-second matching quiz
        </Link>{" "}
        weighs your budget and priorities, or read our step-by-step{" "}
        <Link href="/weight-loss/articles/choosing-telehealth-weight-loss-provider" className="font-semibold text-[#0C4B75] hover:underline">
          guide to choosing a telehealth weight loss provider
        </Link>
        .
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
              src="/editorial-injection.webp" {...imgDims("/editorial-injection.webp")}
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
        <Link href="/weight-loss/articles/first-month-weight-loss-medication" className="font-semibold text-[#0C4B75] hover:underline">
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
        Comparing providers side-by-side - like{" "}
        <Link href="/weight-loss/altrx-vs-ro" className="font-semibold text-[#0C4B75] hover:underline">
          altRx vs Ro
        </Link>,{" "}
        <Link href="/weight-loss/altrx-vs-trimrx" className="font-semibold text-[#0C4B75] hover:underline">
          altRx vs TrimRx
        </Link>, or{" "}
        <Link href="/weight-loss/embody-vs-ro" className="font-semibold text-[#0C4B75] hover:underline">
          Embody vs Ro
        </Link>{" "}
        - can help you better understand the differences and make a more informed decision.
      </p>

      {/* Safety section added at the medical reviewer's request, Nov 12, 2026.
          Every statement is taken from the current FDA labels (Zepbound rev.
          01/2026, Wegovy June 2026, read on DailyMed) or FDA's page on
          compounded GLP-1 drugs; nothing here is our own clinical claim. */}
      <section id="safety" className="mb-8 rounded-2xl border border-amber-200 bg-amber-50/40 p-5 sm:p-6" aria-labelledby="safety-heading">
        <h2 id="safety-heading" className="mb-2 text-[22px] font-bold text-[#191919]">
          Safety: what to know before you start
        </h2>
        <p className="mb-4 text-[15px] text-gray-700">
          Semaglutide and tirzepatide are prescription medicines. The points below come from the <a href="https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=ee06186f-2aa3-4990-a760-757579d8f77b" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0C4B75] hover:underline">Wegovy label</a> and the <a href="https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=487cd7e7-434c-4925-99fa-aa80b1cc776b" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0C4B75] hover:underline">Zepbound label</a> and from the <a href="https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers/fdas-concerns-unapproved-glp-1-drugs-used-weight-loss" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0C4B75] hover:underline">FDA guidance on compounded GLP-1 drugs</a>; a licensed prescriber decides whether either medicine is right for you.
        </p>

        <h3 className="mb-1.5 text-[16px] font-bold text-[#191919]">Side effects</h3>
        <ul className="mb-4 list-disc space-y-1 pl-6 text-[15px]">
          <li><strong>Common:</strong> nausea, vomiting, diarrhoea and constipation, most often when starting or after a dose increase.</li>
          <li><strong>Serious but less common:</strong> pancreatitis, gallbladder disease, and kidney injury from dehydration after prolonged vomiting or diarrhoea.</li>
          <li><strong>Seek urgent assessment</strong> for persistent severe abdominal pain, an inability to keep fluids down, or signs of an allergic reaction (swelling of the face, lips or throat, trouble breathing, a spreading rash).</li>
        </ul>

        <h3 className="mb-1.5 text-[16px] font-bold text-[#191919]">Who should not take them</h3>
        <ul className="mb-4 list-disc space-y-1 pl-6 text-[15px]">
          <li>Anyone with a personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia syndrome type 2 (MEN 2), the boxed warning on both labels.</li>
          <li>Anyone who has had a serious allergic reaction to the medicine.</li>
          <li>Severe gastroparesis is a reason these medicines are not recommended.</li>
        </ul>

        <h3 className="mb-1.5 text-[16px] font-bold text-[#191919]">Pregnancy and contraception</h3>
        <ul className="mb-4 list-disc space-y-1 pl-6 text-[15px]">
          <li>These medicines should not be used for weight loss during pregnancy. Semaglutide should be stopped at least two months before a planned pregnancy.</li>
          <li>Tirzepatide can reduce the effectiveness of oral contraceptives: use a non-oral method, or add barrier contraception, for four weeks after starting and for four weeks after every dose increase.</li>
        </ul>

        <h3 className="mb-1.5 text-[16px] font-bold text-[#191919]">Dosing and medication review</h3>
        <ul className="list-disc space-y-1 pl-6 text-[15px]">
          <li>Doses are increased step by step, and only under prescriber supervision.</li>
          <li>With compounded injections, your instructions should state the dose in milligrams, the concentration of the vial, and the matching syringe volume. Syringe &ldquo;units&rdquo; alone cause confusion: FDA has received reports of dosing errors, some requiring hospital care, from patients measuring the wrong dose.</li>
          <li>If you take insulin or a sulfonylurea, those doses may need review because of the risk of low blood sugar (hypoglycaemia).</li>
        </ul>
      </section>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        Popular Weight Loss Medications
      </h2>
      <p className="mb-3">
        Many leading weight loss programs offer access to GLP-1 receptor agonist medications. Learn{" "}
        <Link href="/weight-loss/articles/how-glp1-medications-work" className="font-semibold text-[#0C4B75] hover:underline">
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
        Prefer a non-injection option? See our guide to{" "}
        <Link href="/weight-loss/weight-loss-pills" className="font-semibold text-[#0C4B75] hover:underline">
          weight loss pills
        </Link>.
      </p>

      {/* Mid-content slot - the product carousel lands here, mid-text below
          the ranking, without this static editorial knowing about catalogs. */}
      {midSlot && <div className="mb-8">{midSlot}</div>}

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
              <td className="px-4 py-3 font-medium">Semaglutide injection (Wegovy®)<span className="block text-xs font-normal text-gray-500">GLP-1 receptor agonist</span></td>
              <td className="px-4 py-3">~15% of body weight (average)</td>
              <td className="px-4 py-3">Measured at 68 weeks (STEP trials)</td>
              <td className="hidden sm:table-cell px-4 py-3">From $41/month (verified)</td>
            </tr>
            <tr className="bg-gray-50/50">
              <td className="px-4 py-3 font-medium">Tirzepatide injection (Zepbound®)<span className="block text-xs font-normal text-gray-500">Dual GIP/GLP-1 receptor agonist</span></td>
              <td className="px-4 py-3">Up to 22.5% of body weight (average at the top dose)</td>
              <td className="px-4 py-3">Measured at 72 weeks (SURMOUNT trials)</td>
              <td className="hidden sm:table-cell px-4 py-3">From $69/month (verified)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium">Liraglutide injection (Saxenda®)<span className="block text-xs font-normal text-gray-500">GLP-1 receptor agonist</span></td>
              <td className="px-4 py-3">~5-8% of body weight (average)</td>
              <td className="px-4 py-3">Measured at 56 weeks (SCALE)</td>
              <td className="hidden sm:table-cell px-4 py-3">$1,300+/month (brand only)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mb-4 text-[13px] text-gray-400">
        Source: Published results from STEP (semaglutide), SURMOUNT (tirzepatide), and SCALE (liraglutide)
        clinical trials; the percentages are trial averages measured at each trial&apos;s assessment point, and
        individual response and timing vary. Compounded prices are the lowest listed rates in our verified
        price index as of November 2026 (semaglutide: welludr, 12-month plan; tirzepatide: Collective, plus a
        $199/year membership).
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">
        Tirzepatide vs Semaglutide
      </h3>
      <p className="mb-4">
        Tirzepatide and semaglutide are the two most effective GLP-1 medications for weight loss. They work
        in similar ways but differ in average results, approvals, and coverage. Compare{" "}
        <Link href="/weight-loss/tirzepatide" className="font-semibold text-[#0C4B75] hover:underline">tirzepatide providers</Link>{" "}
        and{" "}
        <Link href="/weight-loss/semaglutide" className="font-semibold text-[#0C4B75] hover:underline">semaglutide providers</Link>{" "}
        to see which fits your goals.
      </p>
      <ComparisonTable colA="Tirzepatide" colB="Semaglutide" rows={tirzVsSemaRows} />

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">
        Wegovy vs Ozempic
      </h3>
      <p className="mb-4">
        Both Wegovy and Ozempic use semaglutide, but the difference is in dosage and indication. Wegovy is
        tailored for weight loss, while Ozempic was developed for diabetes but is often prescribed off-label.
        See our{" "}
        <Link href="/weight-loss/wegovy-providers" className="font-semibold text-[#0C4B75] hover:underline">Wegovy providers</Link>{" "}
        and{" "}
        <Link href="/weight-loss/ozempic-for-weight-loss" className="font-semibold text-[#0C4B75] hover:underline">Ozempic for weight loss</Link>{" "}
        guides for details.
      </p>
      <ComparisonTable colA="Wegovy" colB="Ozempic" rows={wegovyVsOzempicRows} />
      <p className="mb-8 text-[13px] text-gray-400">
        Source: STEP-1 (semaglutide) and SURMOUNT (tirzepatide) clinical trial data. Brand names Zepbound®,
        Mounjaro®, Wegovy®, and Ozempic® are trademarks of their respective manufacturers. Individual results
        vary; medications require a prescription from a licensed clinician.
      </p>

      <h3 className="mb-3 mt-6 text-[18px] font-bold text-[#191919]">
        How Much Does GLP-1 Weight Loss Medication Cost?
      </h3>
      <p className="mb-3">
        Brand-name GLP-1 medications cost $900-$1,400 per month at retail price without insurance.
        Compounded versions of semaglutide and tirzepatide are available through licensed telehealth
        providers at significantly lower prices - typically $199-$500 per month including physician
        consultations, medication, and home delivery. Learn more in our{" "}
        <Link href="/weight-loss/articles/weight-loss-medication-cost-guide" className="font-semibold text-[#0C4B75] hover:underline">
          complete cost guide
        </Link>.
      </p>

      <h3 className="mb-3 mt-6 text-[18px] font-bold text-[#191919]">
        How Long Does It Take for GLP-1 Medication to Work?
      </h3>
      <p className="mb-3">
        Many people notice a change in appetite within the first weeks, but response and timing vary
        from person to person, and there is no fixed week by which visible weight loss begins. The
        68-week (STEP) and 72-week (SURMOUNT) figures quoted on this page are the points at which those
        trials measured <em>average</em> results; they are study assessment points, not a universal time
        at which weight loss stops. Doses are increased step by step under prescriber supervision, and
        the trials measured results at the maintenance doses. Read our{" "}
        <Link href="/weight-loss/articles/how-long-for-semaglutide-to-work" className="font-semibold text-[#0C4B75] hover:underline">
          detailed semaglutide timeline
        </Link>.
      </p>

      <h3 className="mb-3 mt-6 text-[18px] font-bold text-[#191919]">
        Can You Get GLP-1 Medication Online?
      </h3>
      <p className="mb-8">
        Yes. Licensed telehealth providers can prescribe GLP-1 medications through fully online
        medical evaluations. The process typically takes 1-5 days from sign-up to medication delivery.
        All providers featured on our platform use licensed physicians for prescribing and include
        ongoing medical oversight. Read our{" "}
        <Link href="/weight-loss/articles/how-to-get-ozempic-online" className="font-semibold text-[#0C4B75] hover:underline">
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
        <Link href="/weight-loss/reviews" className="font-semibold text-[#0C4B75] hover:underline">
          compare leading weight loss solutions
        </Link>{" "}
        with confidence. Browse all{" "}
        <Link href="/weight-loss/articles" className="font-semibold text-[#0C4B75] hover:underline">
          weight loss articles
        </Link>{" "}
        for more research and guides.
      </p>
    </div>
  );
}
