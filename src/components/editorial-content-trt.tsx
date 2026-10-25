import Link from "next/link";

// Editorial body of the TRT vertical home (treatmentshub.com/trt). Ported from
// toptrt.io on Oct 22, 2026 with every link re-prefixed under /trt. Medical
// statements are general and hedged (no statistics or provider numbers); the
// treatment and injections-vs-gels tables are general comparisons.

const treatmentRows: [string, string, string][] = [
  ["Testosterone injections", "Intramuscular or subcutaneous testosterone (e.g. cypionate, enanthate)", "The most common and usually most affordable form of TRT - self-administered on a weekly or twice-weekly schedule once a clinician sets the dose."],
  ["Gels & creams", "Topical testosterone applied to the skin once daily", "Needle-free and give steady daily levels, but must be applied carefully to avoid transferring testosterone to partners or children through skin contact."],
  ["Pellets", "Small testosterone pellets implanted under the skin", "Inserted by a clinician and release testosterone over several months, so there's nothing to do day to day - but the dose can't be changed until they wear off."],
  ["Lab testing & diagnosis", "Two morning total-testosterone blood tests plus symptoms", "TRT starts with a diagnosis: clinically low testosterone confirmed on bloodwork alongside symptoms - not levels that sit in the normal range."],
  ["Ongoing monitoring", "Follow-up bloodwork for testosterone, hematocrit and PSA", "TRT is long-term and clinician-directed; regular monitoring confirms levels are on target and keeps an eye on red blood cells and prostate markers."],
];

const drugRows: [string, string, string, string][] = [
  ["Administration", "Self-injected, typically weekly or twice weekly", "Applied to the skin once daily", "Injections mean fewer doses to remember; gels are needle-free"],
  ["Level stability", "Can peak and trough between injections", "Tends to give steadier day-to-day levels", "A clinician adjusts frequency or dose to smooth levels out"],
  ["Transfer risk", "None once injected", "Can transfer to others through skin contact if not covered", "Gels require care around partners and children"],
  ["Monitoring", "Regular blood tests for testosterone, hematocrit and PSA", "Regular blood tests for testosterone, hematocrit and PSA", "Both are long-term and require ongoing clinical oversight"],
];

function TreatmentTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[600px] text-left text-[14px]">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 font-bold text-[#191919]">Approach</th>
            <th className="px-4 py-3 font-bold text-[#191919]">Examples</th>
            <th className="px-4 py-3 font-bold text-[#191919]">What to know</th>
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

function DrugTable({ rows }: { rows: [string, string, string, string][] }) {
  return (
    <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[640px] text-left text-[14px]">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 font-bold text-[#191919]">Factor</th>
            <th className="px-4 py-3 font-bold text-[#191919]">Testosterone Injections</th>
            <th className="px-4 py-3 font-bold text-[#191919]">Gels &amp; Creams</th>
            <th className="px-4 py-3 font-bold text-[#191919]">Why it matters</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map(([f, s, t, w], i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-gray-50/50" : ""}>
              <td className="px-4 py-3 align-top font-medium text-[#191919]">{f}</td>
              <td className="px-4 py-3 align-top text-gray-600">{s}</td>
              <td className="px-4 py-3 align-top text-gray-600">{t}</td>
              <td className="px-4 py-3 align-top text-gray-600">{w}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TrtEditorialContent({ midSlot }: { midSlot?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 pb-12 text-[16px] leading-[1.7] text-gray-800">
      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        The Best TRT Clinics, Compared
      </h2>
      <p className="mb-4">
        To find the best testosterone replacement therapy provider, we compare leading online TRT
        clinics on the factors that actually matter. Choosing the right one involves more than the
        lowest price - lab testing, clinician oversight, monitoring, treatment choice and long-term
        value can vary a lot between clinics. Not sure where to start? Read our{" "}
        <Link href="/trt/articles/best-online-trt-clinics-compared" className="font-semibold text-[#111111] hover:underline">
          guide to the best online TRT clinics
        </Link>{" "}
        for the full breakdown.
      </p>
      <p className="mb-8">
        This page is a practical, evidence-based overview of what low testosterone is, what causes it,
        how the main TRT options differ, and how to pick a clinic you can trust. Prefer to jump
        straight to the comparison? See our{" "}
        <Link href="/trt/reviews" className="font-semibold text-[#111111] hover:underline">
          in-depth clinic reviews
        </Link>{" "}
        or a head-to-head like{" "}
        <Link href="/trt/hone-vs-tmates" className="font-semibold text-[#111111] hover:underline">
          Hone vs TMates
        </Link>.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        What Is Low Testosterone - and How Common Is It?
      </h2>
      <p className="mb-4">
        Low testosterone (clinically, hypogonadism) is when the body doesn&apos;t produce enough
        testosterone and a man has symptoms to match - things like persistent fatigue, low sex drive,
        loss of muscle or motivation, and low mood. A diagnosis isn&apos;t made on symptoms alone: it
        requires blood testing that confirms low levels, usually on more than one morning sample.
      </p>
      <p className="mb-8">
        Testosterone naturally declines as men age, so low testosterone becomes more common in older
        men - but it can affect men at any age when there&apos;s an underlying cause. If you&apos;re
        dealing with symptoms, it&apos;s worth investigating rather than guessing: many things can
        cause them, and only bloodwork and a clinician&apos;s review can tell whether low testosterone
        is actually the reason. Understanding the cause is the first step toward the right treatment.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        What Causes Low Testosterone?
      </h2>
      <p className="mb-4">
        Testosterone production depends on the testes and on signals from the brain (the pituitary and
        hypothalamus). A problem anywhere along that chain can lower levels. Causes usually fall into a
        few groups, and they often overlap.
      </p>

      <h3 className="mb-2 text-[20px] font-bold text-[#191919]">Testicular (primary) causes</h3>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li>Injury to the testicles or their removal</li>
        <li>Certain infections affecting the testes</li>
        <li>Some genetic conditions present from birth</li>
        <li>Chemotherapy or radiation</li>
      </ul>

      <h3 className="mb-2 text-[20px] font-bold text-[#191919]">Brain-signal (secondary) causes</h3>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li>Pituitary or hypothalamus disorders</li>
        <li>Certain medications, including long-term opioids and steroids</li>
        <li>Significant stress or acute illness that suppresses the signal</li>
      </ul>

      <h3 className="mb-2 text-[20px] font-bold text-[#191919]">Lifestyle &amp; general health</h3>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li>Obesity and metabolic problems such as type 2 diabetes</li>
        <li>Poor sleep and untreated sleep apnea</li>
        <li>Heavy alcohol use</li>
        <li>Chronic illness (for example kidney or liver disease)</li>
      </ul>

      <p className="mb-8 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[15px]">
        <strong>Worth knowing:</strong> The symptoms of low testosterone overlap with many other
        conditions - thyroid problems, depression, sleep apnea and more - which is exactly why a
        proper diagnosis matters. That&apos;s one reason it&apos;s smart to test and speak with a
        clinician rather than assume low testosterone is the cause. Learn more in{" "}
        <Link href="/trt/articles/what-causes-low-testosterone" className="font-semibold text-[#111111] hover:underline">
          what causes low testosterone
        </Link>{" "}
        and{" "}
        <Link href="/trt/articles/signs-of-low-testosterone" className="font-semibold text-[#111111] hover:underline">
          the signs of low testosterone
        </Link>.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        TRT Options in 2026, Compared
      </h2>
      <p className="mb-4">
        When TRT is appropriate, testosterone can be delivered in a few ways - most commonly
        injections, gels or creams, and pellets. Here is how the main options compare - these are
        options to discuss with a licensed clinician, not a recommendation to use any specific
        product.
      </p>
      <TreatmentTable rows={treatmentRows} />
      <p className="mb-8 text-[13.5px] text-gray-500">
        This table is general information, not medical advice. What&apos;s right for you depends on
        your health history, your bloodwork and a clinician&apos;s judgment. Learn more in{" "}
        <Link href="/trt/articles/types-of-trt" className="font-semibold text-[#111111] hover:underline">
          the types of TRT
        </Link>{" "}
        and{" "}
        <Link href="/trt/articles/natural-ways-to-boost-testosterone" className="font-semibold text-[#111111] hover:underline">
          natural ways to boost testosterone
        </Link>.
      </p>

      <h3 className="mb-2 text-[20px] font-bold text-[#191919]">Injections vs Gels, Practically</h3>
      <p className="mb-4">
        Injections and topical gels are the two most common ways men take TRT. Both replace
        testosterone effectively when dosed and monitored properly; neither is &quot;better&quot;
        universally. The right fit depends on your routine, your household, and a clinician&apos;s
        assessment.
      </p>
      <DrugTable rows={drugRows} />
      <p className="mb-8 text-[13.5px] text-gray-500">
        These are general comparisons and vary by person and dose. Only a licensed clinician can tell
        you which form, if any, is appropriate for you. Compare them in more depth in{" "}
        <Link href="/trt/articles/testosterone-injections-vs-gel" className="font-semibold text-[#111111] hover:underline">
          testosterone injections vs gel
        </Link>.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        How Online (Telehealth) TRT Works
      </h2>
      <p className="mb-4">
        Telehealth has made getting evaluated for low testosterone simpler and more private. The
        process at a legitimate clinic follows the same clinical backbone:
      </p>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li><strong>Online intake</strong> - you answer a confidential questionnaire about symptoms, history and current medications.</li>
        <li><strong>Blood testing</strong> - you complete an at-home kit or a visit to a local lab; a diagnosis usually needs a morning total-testosterone reading, often confirmed on a second sample.</li>
        <li><strong>Licensed clinician review</strong> - a real prescriber reviews your labs and symptoms and decides whether TRT is safe and appropriate.</li>
        <li><strong>Treatment (if suitable)</strong> - if diagnosed and approved, treatment is prescribed and shipped or arranged; you are never guaranteed testosterone sight unseen.</li>
        <li><strong>Ongoing monitoring</strong> - follow-up bloodwork tracks testosterone, hematocrit and PSA, and the dose is adjusted over time.</li>
      </ul>
      <p className="mb-4"><strong>What a legitimate clinic looks like:</strong> real lab testing, a genuine clinician review, clear pricing before checkout, ongoing monitoring, and licensed U.S. pharmacies.</p>
      <p className="mb-8"><strong>Red flags to avoid:</strong> &quot;no blood test needed&quot; offers, testosterone marketed to men with normal levels, promises of guaranteed results, no clinician involvement, hidden fees, and unbranded product from unverified overseas sellers. See our{" "}
        <Link href="/trt/reviews" className="font-semibold text-[#111111] hover:underline">
          clinic reviews
        </Link>{" "}
        for vetted options.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        How to Choose an Online TRT Clinic
      </h2>
      <p className="mb-3">
        Beyond a required licensed-clinician review and real lab testing, five checks separate the
        best clinics from the rest:
      </p>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li><strong>Lab-based diagnosis</strong> - a real blood test and clinician review, not an instant &quot;guaranteed&quot; prescription off a form</li>
        <li><strong>Clear, upfront pricing</strong> - what you actually pay for treatment, labs and consultations, before checkout</li>
        <li><strong>Treatment choice</strong> - injections, gels or creams, and pellets where appropriate</li>
        <li><strong>Ongoing monitoring</strong> - follow-up bloodwork and dose adjustments included, not an afterthought</li>
        <li><strong>Discreet, reliable delivery</strong> - private packaging and dependable refills</li>
      </ul>
      <p className="mb-8">
        Want to see how specific clinics stack up? Read our reviews of{" "}
        <Link href="/trt/reviews/hone" className="font-semibold text-[#111111] hover:underline">Hone Health</Link>,{" "}
        <Link href="/trt/reviews/tmates" className="font-semibold text-[#111111] hover:underline">TMates</Link>,{" "}
        <Link href="/trt/reviews/taurus" className="font-semibold text-[#111111] hover:underline">Taurus Meds</Link>{" "}
        and{" "}
        <Link href="/trt/reviews/dudemeds" className="font-semibold text-[#111111] hover:underline">DudeMeds</Link>.
      </p>

      {/* Mid-content slot */}
      {midSlot && <div className="mb-8">{midSlot}</div>}

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        What Does TRT Cost?
      </h2>
      <p className="mb-4">
        Price is one of the biggest reasons men switch clinics - and it is where the market varies
        most. Rather than quote figures that change constantly, it helps to understand what actually
        drives the cost:
      </p>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li><strong>Form of treatment</strong> - generic testosterone injections are typically the most affordable; gels, creams and pellets usually cost more.</li>
        <li><strong>Subscription vs per-visit</strong> - a monthly plan can lower the ongoing price but bills on a schedule; some clinics charge per visit or per refill instead.</li>
        <li><strong>Lab and consult fees</strong> - some clinics bundle bloodwork and the clinician review into the price; others add them separately.</li>
        <li><strong>Dose and monitoring frequency</strong> - higher doses and more frequent follow-up labs change the monthly total.</li>
      </ul>
      <p className="mb-8">
        To compare fairly, look at the <strong>total ongoing cost including treatment, lab work and
        monitoring for the plan you would actually use</strong> - not just the lowest advertised
        starting price. Our{" "}
        <Link href="/trt" className="font-semibold text-[#111111] hover:underline">
          comparison of top clinics
        </Link>{" "}
        is built to make that easier, and{" "}
        <Link href="/trt/articles/trt-cost" className="font-semibold text-[#111111] hover:underline">
          our guide to TRT cost
        </Link>{" "}
        breaks down what to expect, while the{" "}
        <Link href="/trt/cheapest-online-trt" className="font-semibold text-[#111111] hover:underline">
          cheapest online TRT ranking
        </Link>{" "}
        lists every verified price, lowest first.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        Is TRT a Lifelong Commitment?
      </h2>
      <p className="mb-4">
        It&apos;s one of the most-asked TRT questions - and the honest answer matters. TRT
        <strong> replaces</strong> testosterone rather than restarting the body&apos;s own production.
        Because the body often reduces its natural production once treatment begins, TRT is usually
        <strong> long-term</strong>, and stopping typically means symptoms return.
      </p>
      <p className="mb-8">
        That said, when low testosterone has a <strong>reversible cause</strong> - significant weight
        gain, poor sleep, heavy alcohol use, or a medication side effect - addressing that root cause
        can raise levels naturally for some men, sometimes enough to avoid treatment. It&apos;s also
        important to know that TRT can reduce sperm production and affect fertility, which is a key
        consideration for men who may want children. No clinic should promise a cure or guaranteed
        results; the right path is the one your bloodwork and clinician support. We cover this in{" "}
        <Link href="/trt/articles/trt-and-fertility" className="font-semibold text-[#111111] hover:underline">
          TRT and fertility
        </Link>{" "}
        and{" "}
        <Link href="/trt/articles/trt-benefits" className="font-semibold text-[#111111] hover:underline">
          the benefits of TRT
        </Link>.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        When to See a Doctor - and Staying Safe
      </h2>
      <p className="mb-4">
        Low testosterone is treatable, but it&apos;s also a signal worth investigating properly. Speak
        with a clinician if you have ongoing symptoms - it&apos;s a chance to test your levels and
        check on related aspects of your health, not just chase a number.
      </p>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li><strong>Never start testosterone without a confirmed diagnosis</strong> - bloodwork plus symptoms, reviewed by a clinician. TRT is not an enhancement product for men with normal levels.</li>
        <li><strong>Disclose your full medication list and health history</strong> so a prescriber can screen for interactions and reasons not to treat.</li>
        <li><strong>Expect ongoing monitoring.</strong> TRT can raise your red blood cell count (hematocrit) and needs regular checks of testosterone and PSA, so follow-up bloodwork is part of safe treatment.</li>
        <li><strong>Consider fertility.</strong> Because TRT can lower sperm production, raise it with your clinician if you may want children.</li>
        <li><strong>Only use licensed, verified sources.</strong> Unverified overseas testosterone may be counterfeit, mis-dosed or contaminated.</li>
      </ul>
      <p className="mb-8">
        In short: use a legitimate clinic with real lab testing and ongoing clinical oversight, and
        treat TRT as part of your overall health.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        Frequently Asked Questions
      </h2>

      <h3 className="mb-2 text-[18px] font-bold text-[#191919]">What is the best form of TRT?</h3>
      <p className="mb-4">
        There is no single &quot;best&quot; form for everyone. Injections are the most common and
        usually the most affordable, gels and creams are needle-free with steady daily levels, and
        pellets are low-maintenance but can&apos;t be adjusted until they wear off. The right choice
        depends on your routine, your household and what a licensed clinician recommends for you.
      </p>

      <h3 className="mb-2 text-[18px] font-bold text-[#191919]">Can low testosterone improve without TRT?</h3>
      <p className="mb-4">
        Sometimes, yes. When there&apos;s a reversible cause, addressing it - losing excess weight,
        improving sleep, treating sleep apnea, cutting back on alcohol, or reviewing a medication with
        your clinician - can raise testosterone for some men. See{" "}
        <Link href="/trt/articles/natural-ways-to-boost-testosterone" className="font-semibold text-[#111111] hover:underline">
          natural ways to boost testosterone
        </Link>{" "}
        for realistic, evidence-based expectations.
      </p>

      <h3 className="mb-2 text-[18px] font-bold text-[#191919]">Do I need a prescription for TRT?</h3>
      <p className="mb-4">
        Yes. Testosterone is prescription-only for safety reasons, and a diagnosis requires blood
        testing plus symptoms reviewed by a licensed clinician. Legitimate telehealth clinics make
        this straightforward - lab testing and a clinician review come before any prescription. Any
        service offering testosterone with &quot;no blood test needed&quot; is a red flag.
      </p>

      <h3 className="mb-2 text-[18px] font-bold text-[#191919]">How is TRT monitored over time?</h3>
      <p className="mb-4">
        TRT is long-term and clinician-directed. After starting, you have follow-up blood tests that
        track testosterone, hematocrit (red blood cells) and PSA (a prostate marker), and your dose or
        frequency is adjusted based on those results and how you feel. Ongoing monitoring is part of
        doing TRT safely.
      </p>

      <h3 className="mb-2 text-[18px] font-bold text-[#191919]">Is online TRT legit?</h3>
      <p className="mb-8">
        Reputable telehealth clinics are legitimate and convenient, using licensed clinicians, real
        lab testing and ongoing monitoring. The key is choosing a trustworthy one - which is exactly
        what our{" "}
        <Link href="/trt/reviews" className="font-semibold text-[#111111] hover:underline">
          independent reviews
        </Link>{" "}
        and{" "}
        <Link href="/trt/articles" className="font-semibold text-[#111111] hover:underline">
          TRT guides
        </Link>{" "}
        are for.
      </p>

      <hr className="mb-8 border-gray-200" />

      <p className="text-[13.5px] leading-[1.6] text-gray-500">
        <strong>General information, not medical advice.</strong> This content is for educational
        purposes only and is not a substitute for professional medical advice, diagnosis or treatment.
        It does not recommend any specific treatment, product or clinic for your individual situation,
        and it makes no promise of a cure or guaranteed results. TRT is a prescription treatment for
        clinically diagnosed low testosterone that requires blood testing and ongoing monitoring, and
        it is not intended for men with normal testosterone levels. Always consult a licensed clinician
        about your health, before starting or changing any treatment, and seek care for any concerning
        symptoms. Never start testosterone without appropriate bloodwork and clinical review.
      </p>
    </div>
  );
}
