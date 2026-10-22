import Link from "next/link";

// Editorial body of the HRT vertical home (treatmentshub.com/hrt). Ported from
// hrtwomen.com on Oct 22, 2026 with every link re-prefixed under /hrt. Medical
// statements are general and hedged (no statistics or provider numbers), the
// treatment and patch-vs-pill tables are general comparisons, and the page
// closes on the not-medical-advice notice.

const treatmentRows: [string, string, string][] = [
  ["Systemic estrogen (± progestogen)", "Estradiol patches, gels, sprays or pills; plus a progestogen (e.g. micronized progesterone) if you have a uterus", "The most effective treatment for hot flashes and night sweats, and it helps protect bone. Women with a uterus need a progestogen to protect the uterine lining. Risks - including blood clots, stroke and breast cancer considerations - depend on age, timing, dose and personal history."],
  ["Vaginal (local) estrogen", "Low-dose vaginal creams, tablets or rings", "Targets vaginal dryness, discomfort with sex and some urinary symptoms. Very little is absorbed into the bloodstream, so the risk profile differs from systemic therapy - a clinician can explain what applies to you."],
  ["Testosterone (off-label, low dose)", "Low-dose testosterone prescribed by a clinician", "Sometimes considered for low sexual desire that causes distress after menopause. In the U.S. there is no FDA-approved testosterone product for women, so it is used off-label and needs monitoring."],
  ["Non-hormonal prescriptions", "Fezolinetant (Veozah), elinzanetant (Lynkuet), certain SSRIs/SNRIs (e.g. low-dose paroxetine), gabapentin", "Options for women who cannot or prefer not to take hormones - for example, after some cancers or a history of blood clots. They can reduce hot flashes but do not replace estrogen's effect on bone or vaginal tissue."],
  ["Lifestyle & self-care", "Sleep routines, regular exercise, strength training, limiting alcohol, cooling strategies, CBT", "Can ease some symptoms and supports long-term heart and bone health at midlife. Helpful for everyone, whether or not you also use medication."],
];

const drugRows: [string, string, string, string][] = [
  ["Delivery", "Skin patch changed once or twice a week (gels and sprays work similarly)", "Tablet taken by mouth, usually daily", "Some women prefer a daily pill; others prefer not having to remember one"],
  ["Blood clot & stroke considerations", "Absorbed through the skin, bypassing the liver; observational data associate transdermal estrogen with a lower risk of blood clots (VTE)", "Passes through the liver first; oral estrogen is associated with a higher risk of blood clots, and stroke risk is also a consideration", "Clot risk is a key factor for women with higher baseline risk - a clinician weighs your history"],
  ["Dosing", "Steady hormone release; a range of strengths allows gradual adjustment", "Levels rise and fall across the day; also available in several strengths", "The goal is the lowest effective dose for your symptoms, reviewed regularly"],
  ["Who it may suit", "Often considered for women with migraine, higher body weight or other clot risk factors, at a clinician's discretion", "Women who prefer tablets, have skin irritation from patches, and have no added clot risk", "Neither is right for everyone - suitability is a clinician's decision"],
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
            <th className="px-4 py-3 font-bold text-[#191919]">Estrogen patch (transdermal)</th>
            <th className="px-4 py-3 font-bold text-[#191919]">Estrogen pill (oral)</th>
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

export function HrtEditorialContent({ midSlot }: { midSlot?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 pb-12 text-[16px] leading-[1.7] text-gray-800">
      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        The Best Online HRT Providers for Women, Compared
      </h2>
      <p className="mb-4">
        To find the best online menopause care, we compare leading telehealth providers on the
        factors that actually matter. Choosing the right option involves more than picking a
        prescription - clinical expertise in menopause, treatment choice, follow-up, pricing
        transparency and insurance options can vary a lot between providers. Not sure where to start?
        Read our{" "}
        <Link href="/hrt/articles/best-online-hrt-providers-compared" className="font-semibold text-[#111111] hover:underline">
          guide to the best online HRT providers
        </Link>{" "}
        for the full breakdown.
      </p>
      <p className="mb-8">
        This page is a practical, evidence-based overview of what menopause and perimenopause are,
        how hormone therapy and its alternatives differ, the risks worth understanding, and how to pick
        a provider you can trust. Prefer to jump straight to the comparison? See our{" "}
        <Link href="/hrt/reviews" className="font-semibold text-[#111111] hover:underline">
          in-depth provider reviews
        </Link>{" "}
        or a head-to-head like{" "}
        <Link href="/hrt/winona-vs-gala" className="font-semibold text-[#111111] hover:underline">
          Winona vs Gala
        </Link>.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        What Are Menopause and Perimenopause?
      </h2>
      <p className="mb-4">
        Menopause is the point when menstrual periods stop for good, confirmed after 12 months in a
        row without a period. It happens as the ovaries make less estrogen and progesterone. Most women
        go through menopause between about 45 and 55, and the average age in the U.S. is around 51.
      </p>
      <p className="mb-8">
        Perimenopause is the transition leading up to it, and it can last several years. Hormone levels
        fluctuate, periods often become irregular, and symptoms can start well before the final period.
        Menopause is a natural life stage, not an illness - but symptoms can be disruptive, and you do
        not have to simply put up with them. Understanding what is happening is the first step toward
        the right support.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        Common Symptoms of Perimenopause and Menopause
      </h2>
      <p className="mb-4">
        Every woman&apos;s experience is different. Some notice very little change; others find
        symptoms affect sleep, work and relationships. Symptoms usually fall into a few groups, and
        they often overlap.
      </p>

      <h3 className="mb-2 text-[20px] font-bold text-[#191919]">Vasomotor & sleep</h3>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li>Hot flashes and flushing</li>
        <li>Night sweats</li>
        <li>Trouble falling or staying asleep</li>
        <li>Irregular, heavier or lighter periods during perimenopause</li>
      </ul>

      <h3 className="mb-2 text-[20px] font-bold text-[#191919]">Mood & cognition</h3>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li>Irritability, low mood or anxiety</li>
        <li>&quot;Brain fog&quot; and trouble concentrating</li>
        <li>Fatigue, often linked to poor sleep</li>
      </ul>

      <h3 className="mb-2 text-[20px] font-bold text-[#191919]">Vaginal, urinary & body changes</h3>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li>Vaginal dryness and discomfort during sex</li>
        <li>More frequent urinary urges or infections</li>
        <li>Lower libido, joint aches, and bone loss over time</li>
      </ul>

      <p className="mb-8 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-[15px]">
        <strong>Worth knowing:</strong> Some of these symptoms overlap with other conditions, such as
        thyroid problems, anemia or depression. And any bleeding after menopause should always be
        checked by a clinician promptly. That is one reason it is smart to get a proper clinical
        assessment rather than guess. Learn more in{" "}
        <Link href="/hrt/articles/perimenopause-symptoms" className="font-semibold text-[#111111] hover:underline">
          perimenopause symptoms explained
        </Link>{" "}
        and{" "}
        <Link href="/hrt/articles/is-hrt-safe" className="font-semibold text-[#111111] hover:underline">
          is HRT safe?
        </Link>
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        Types of Menopause Treatment, Compared
      </h2>
      <p className="mb-4">
        Menopause symptoms can be managed with hormone therapy, non-hormonal medication, lifestyle
        changes, or a combination. Here is how the main options compare - these are options to discuss
        with a licensed clinician, not a recommendation to take any specific product. New to the
        topic? Start with{" "}
        <Link href="/hrt/articles/what-is-hrt" className="font-semibold text-[#111111] hover:underline">
          what is HRT?
        </Link>{" "}
        - our plain-English guide to hormone replacement therapy.
      </p>
      <TreatmentTable rows={treatmentRows} />
      <p className="mb-8 text-[13.5px] text-gray-500">
        This table is general information, not medical advice. What&apos;s right for you depends on your
        health history and a clinician&apos;s judgment. Learn more in{" "}
        <Link href="/hrt/articles/bioidentical-hormones-explained" className="font-semibold text-[#111111] hover:underline">
          bioidentical hormones explained
        </Link>{" "}
        and{" "}
        <Link href="/hrt/articles/is-hrt-safe" className="font-semibold text-[#111111] hover:underline">
          is HRT safe?
        </Link>.
      </p>

      <h3 className="mb-2 text-[20px] font-bold text-[#191919]">Estrogen Patch vs Pill, Practically</h3>
      <p className="mb-4">
        Estrogen can be taken through the skin (patches, gels, sprays) or by mouth. Both can relieve
        symptoms effectively, but the route changes how estrogen is processed - and that matters for
        some risks. Neither is &quot;better&quot; universally; the right fit depends on your health
        history and a clinician&apos;s assessment.
      </p>
      <DrugTable rows={drugRows} />
      <p className="mb-8 text-[13.5px] text-gray-500">
        These are general comparisons; much of the clot-risk evidence comes from observational studies,
        and individual risk varies. Only a licensed clinician can tell you which option, if any, is
        appropriate for you. For a full breakdown see{" "}
        <Link href="/hrt/articles/estrogen-patch-vs-pill" className="font-semibold text-[#111111] hover:underline">
          estrogen patch vs pill
        </Link>{" "}
        and our overview of{" "}
        <Link href="/hrt/articles/bioidentical-hormones-explained" className="font-semibold text-[#111111] hover:underline">
          bioidentical hormones
        </Link>.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        How Online (Telehealth) Menopause Care Works
      </h2>
      <p className="mb-4">
        Telehealth has made it easier to reach clinicians who focus on menopause - often faster than
        waiting for a specialist appointment. The process at a legitimate provider follows the same
        clinical backbone:
      </p>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li><strong>Online intake</strong> - you complete a confidential questionnaire about symptoms, periods, personal and family history, and current medications.</li>
        <li><strong>Licensed clinician review</strong> - a real prescriber evaluates your risks and whether treatment is appropriate, often by video or message.</li>
        <li><strong>Prescription (if suitable)</strong> - if hormone or non-hormonal therapy is right for you, it is prescribed; you are never guaranteed a prescription.</li>
        <li><strong>Follow-up & monitoring</strong> - dose adjustments, side-effect check-ins, and reminders about routine screening such as mammograms.</li>
      </ul>
      <p className="mb-4"><strong>What a legitimate provider looks like:</strong> clinicians trained in menopause care, a real risk assessment, clear pricing before checkout, ongoing follow-up, and licensed U.S. pharmacies.</p>
      <p className="mb-8"><strong>Red flags to avoid:</strong> &quot;no prescription needed&quot; hormones, claims that any product is completely risk-free or &quot;reverses aging&quot;, no clinician involvement, no screening questions about clots or cancer history, and hidden fees. See our 
        <Link href="/hrt/reviews" className="font-semibold text-[#111111] hover:underline">
          provider reviews
        </Link>{" "}
        for vetted options.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        How to Choose an Online HRT Provider
      </h2>
      <p className="mb-3">
        Beyond a required licensed-clinician review, five checks separate the best providers from the
        rest:
      </p>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li><strong>Menopause expertise</strong> - clinicians who regularly treat perimenopause and menopause, not a one-size-fits-all form</li>
        <li><strong>Clear, upfront pricing</strong> - what you actually pay for visits, medication and membership, before checkout</li>
        <li><strong>Treatment choice</strong> - patches, gels, pills, vaginal estrogen, progesterone and non-hormonal options where appropriate</li>
        <li><strong>Ongoing support</strong> - follow-up visits, dose adjustments and a human to reach with questions</li>
        <li><strong>Insurance & lab options</strong> - some providers accept insurance for visits or can order labs when clinically useful</li>
      </ul>
      <p className="mb-8">
        Want to see how specific providers stack up? Read our reviews of{" "}
        <Link href="/hrt/reviews/winona" className="font-semibold text-[#111111] hover:underline">Winona</Link>, 
        <Link href="/hrt/reviews/gala" className="font-semibold text-[#111111] hover:underline">Gala</Link>{" "}
        and{" "}
        <Link href="/hrt/reviews/midi" className="font-semibold text-[#111111] hover:underline">Midi Health</Link>, or compare them head to head in 
        <Link href="/hrt/midi-vs-winona" className="font-semibold text-[#111111] hover:underline">Winona vs Midi</Link>{" "}
        and{" "}
        <Link href="/hrt/gala-vs-midi" className="font-semibold text-[#111111] hover:underline">Gala vs Midi</Link>.
      </p>

      {/* Mid-content slot */}
      {midSlot && <div className="mb-8">{midSlot}</div>}

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        What Does Online HRT Cost?
      </h2>
      <p className="mb-4">
        Cost is one of the biggest differences between providers. Rather than quote figures that
        change constantly, it helps to understand what actually drives the total:
      </p>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li><strong>Visit and membership fees</strong> - some providers charge per consultation, others use a monthly membership that bundles follow-up care.</li>
        <li><strong>Insurance</strong> - some menopause clinics, such as Midi Health, work with insurance for visits; others are cash-pay only. Coverage depends on your plan.</li>
        <li><strong>Medication type</strong> - FDA-approved generic estradiol and progesterone can be billed through a regular pharmacy, while custom-compounded products are usually cash-pay.</li>
        <li><strong>Labs and add-ons</strong> - lab tests, supplements or extra services can add to the monthly total.</li>
      </ul>
      <p className="mb-8">
        To compare fairly, look at the <strong>total monthly cost for the care and medication you would
        actually use</strong> - including visits, membership, pharmacy and shipping - not just the
        lowest advertised starting price. Our{" "}
        <Link href="/hrt" className="font-semibold text-[#111111] hover:underline">
          comparison of top providers
        </Link>{" "}
        is built to make that easier. Each provider confirms which states it serves during sign-up.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        Is HRT Safe? Understanding the Risks
      </h2>
      <p className="mb-4">
        It&apos;s the most-asked HRT question - and the honest answer is &quot;it depends on you.&quot;
        Hormone therapy has <strong>real benefits and real risks</strong>. For many healthy women who
        start within about 10 years of menopause or before age 60, major medical societies consider the
        benefits for bothersome symptoms to generally outweigh the risks.
      </p>
      <p className="mb-8">
        Risks depend on the type of hormone, the dose, the route, how long you use it, your age and
        your personal and family history. They can include <strong>blood clots, stroke</strong> and, with
        combined estrogen plus progestogen, a small increase in <strong>breast cancer</strong> risk with
        longer use. HRT is not recommended for everyone - for example, women with a history of
        certain cancers, blood clots, stroke or liver disease may need other options. No treatment is
        risk-free and none should promise to stop aging. We break this down in{" "}
        <Link href="/hrt/articles/is-hrt-safe" className="font-semibold text-[#111111] hover:underline">
          is HRT safe?
        </Link>.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        When to See a Doctor - and Staying Safe
      </h2>
      <p className="mb-4">
        Menopause is natural, but it is also a good moment to check in on your overall health - heart,
        bones, breasts and mood - not just symptoms. Speak with a clinician if symptoms affect your
        daily life, or if you have any of the warning signs below.
      </p>
      <ul className="mb-4 list-disc space-y-1 pl-6">
        <li><strong>Any bleeding after menopause</strong> (12+ months without a period) should be checked promptly.</li>
        <li><strong>Disclose your full medication list and health history</strong> - including clots, migraine, cancer and heart disease - so a prescriber can screen for contraindications.</li>
        <li><strong>Keep up with routine screening</strong> such as mammograms and cervical screening while on treatment.</li>
        <li><strong>Seek urgent care for signs of a clot or stroke</strong> - leg pain or swelling, chest pain, sudden shortness of breath, sudden weakness, vision or speech changes.</li>
      </ul>
      <p className="mb-8">
        In short: use a legitimate provider with real clinical oversight, review your treatment at
        least yearly, and treat menopause care as part of your overall health.
      </p>

      <hr className="mb-8 border-gray-200" />

      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">
        Frequently Asked Questions
      </h2>

      <h3 className="mb-2 text-[18px] font-bold text-[#191919]">What is the most effective treatment for hot flashes?</h3>
      <p className="mb-4">
        Systemic estrogen therapy is considered the most effective treatment for hot flashes and night
        sweats, but it is not suitable for everyone. Non-hormonal prescriptions can also help. The best
        choice depends on your health, symptoms and preferences - and it is one a licensed clinician
        should make with you.
      </p>

      <h3 className="mb-2 text-[18px] font-bold text-[#191919]">Can I start HRT during perimenopause?</h3>
      <p className="mb-4">
        Often, yes. Many women start treatment while still having periods, when symptoms first appear.
        A clinician can advise on options that suit an irregular cycle. See{" "}
        <Link href="/hrt/articles/hrt-for-perimenopause" className="font-semibold text-[#111111] hover:underline">
          HRT for perimenopause
        </Link>{" "}
        for how treatment works before periods stop, and{" "}
        <Link href="/hrt/articles/perimenopause-symptoms" className="font-semibold text-[#111111] hover:underline">
          perimenopause symptoms
        </Link>{" "}
        for what to look out for.
      </p>

      <h3 className="mb-2 text-[18px] font-bold text-[#191919]">Do I need a prescription for HRT?</h3>
      <p className="mb-4">
        Yes. Estrogen and progesterone therapies are prescription-only for safety reasons. Legitimate
        telehealth providers make this straightforward - a licensed clinician reviews your history
        before prescribing. Any site offering hormones with &quot;no prescription needed&quot; is a red
        flag.
      </p>

      <h3 className="mb-2 text-[18px] font-bold text-[#191919]">Are bioidentical hormones safer?</h3>
      <p className="mb-4">
        &quot;Bioidentical&quot; describes hormones chemically identical to those your body makes, and
        several FDA-approved products (like estradiol and micronized progesterone) fit that description.
        Custom-compounded versions are not FDA-approved and have not been shown to be safer. Read{" "}
        <Link href="/hrt/articles/bioidentical-hormones-explained" className="font-semibold text-[#111111] hover:underline">
          bioidentical hormones explained
        </Link>{" "}
        for the details.
      </p>

      <h3 className="mb-2 text-[18px] font-bold text-[#191919]">Is online HRT legit?</h3>
      <p className="mb-8">
        Reputable telehealth providers are legitimate and convenient, using licensed clinicians and
        pharmacies. The key is choosing a trustworthy one - which is exactly what our{" "}
        <Link href="/hrt/reviews" className="font-semibold text-[#111111] hover:underline">
          independent reviews
        </Link>{" "}
        and{" "}
        <Link href="/hrt/articles" className="font-semibold text-[#111111] hover:underline">
          HRT guides
        </Link>{" "}
        are for.
      </p>

      <hr className="mb-8 border-gray-200" />

      <p className="text-[13.5px] leading-[1.6] text-gray-500">
        <strong>General information, not medical advice.</strong> This content is for educational
        purposes only and is not a substitute for professional medical advice, diagnosis or treatment.
        It does not recommend any specific medication, product or provider for your individual
        situation, and it makes no promise of guaranteed results. Hormone therapy is not suitable for
        everyone and carries risks, including blood clots, stroke and breast cancer considerations.
        Always consult a licensed clinician about your health before starting or changing any
        treatment, and seek care promptly for concerning symptoms such as bleeding after menopause.
      </p>
    </div>
  );
}
