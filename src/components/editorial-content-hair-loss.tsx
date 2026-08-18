import Link from "next/link";

const treatmentRows: [string, string, string][] = [
  [
    "How it works",
    "Finasteride & dutasteride are oral prescriptions that lower DHT, the hormone linked to male-pattern hair loss (dutasteride blocks it more broadly).",
    "Minoxidil is applied to the scalp (or taken orally off-label) and supports hair growth through a different, non-hormonal mechanism.",
  ],
  [
    "Typical form",
    "Oral tablet (finasteride/dutasteride)",
    "Topical solution or foam (also available orally by prescription)",
  ],
  [
    "Often used by",
    "Men with male-pattern hair loss; dutasteride is generally reserved for stronger DHT suppression under medical guidance.",
    "Men and women — certain minoxidil formulas are used by women, unlike finasteride/dutasteride.",
  ],
  [
    "Good to know",
    "Prescription only; requires a provider review. Continued use is needed to maintain results.",
    "Available OTC at 5% and, by prescription, at higher strengths or combined with other actives.",
  ],
];

function ComparisonTable({ colA, colB, rows }: { colA: string; colB: string; rows: [string, string, string][] }) {
  return (
    <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[600px] text-left text-[14px]">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 font-bold text-[#191919]">Consideration</th>
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

// Editorial, general-information content for the hair-loss vertical home. Keeps
// medical claims general and appropriately hedged — no fabricated statistics or
// provider-specific numbers — while giving the page real depth and internal
// links to the reviews and comparison.
export function HairLossEditorialContent() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 pb-12 text-[16px] leading-[1.7] text-gray-700">
      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">The Best Online Hair-Loss Providers, Compared</h2>
      <p className="mb-4">
        Treating hair loss online has become simpler than ever: you complete a short medical intake, a licensed
        clinician reviews whether treatment is appropriate, and prescription medication ships discreetly to your
        door. But providers differ in the treatments they offer, whether they serve men, women or both, and how
        much they personalize your plan. We compare leading providers on treatment options, medical support and
        overall value. Read our in-depth{" "}
        <Link href="/hair-loss/reviews" className="font-semibold text-[#0C4B75] hover:underline">
          provider reviews
        </Link>{" "}
        or see them go head to head in our{" "}
        <Link href="/hair-loss/maximus-vs-happy-head" className="font-semibold text-[#0C4B75] hover:underline">
          Maximus vs Happy Head comparison
        </Link>
        .
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">
        Finasteride, dutasteride and minoxidil: how the main treatments work
      </h3>
      <p className="mb-4">
        Most evidence-based hair-loss treatment comes down to a few actives, often used together under medical
        guidance. Finasteride and dutasteride are oral prescriptions that reduce DHT — the hormone most associated
        with male-pattern hair loss — while minoxidil supports hair growth through a separate, non-hormonal pathway
        and is the active many people recognize from over-the-counter products.
      </p>
      <ComparisonTable colA="Finasteride / Dutasteride" colB="Minoxidil" rows={treatmentRows} />

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">Topical vs oral: which route is right?</h3>
      <p className="mb-4">
        Both routes can be effective, and many plans combine them. Oral medication is simple and consistent, while
        topical formulas are applied directly to the scalp and may limit how much of the medicine reaches the rest
        of the body. Some providers, like{" "}
        <Link href="/hair-loss/reviews/happyhead" className="font-semibold text-[#0C4B75] hover:underline">
          Happy Head
        </Link>
        , build customizable topical solutions that combine several actives at once, while others, like{" "}
        <Link href="/hair-loss/reviews/maximus" className="font-semibold text-[#0C4B75] hover:underline">
          Maximus
        </Link>
        , offer a broad set of oral options plus a compounded topical. The best route depends on your goals,
        tolerance and a clinician&rsquo;s assessment.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">How long until you see results?</h3>
      <p className="mb-4">
        Hair-loss treatment takes patience. Most people need several months of consistent use — commonly around 3
        to 6 months — before visible changes appear, with fuller results developing later. It&rsquo;s also normal
        to see some early shedding as new growth cycles begin. Because these treatments work by maintaining an
        active growth environment, stopping them generally reverses the gains over time.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">What to look for in an online provider</h3>
      <ul className="mb-4 list-disc space-y-2 pl-6">
        <li>
          <strong>The right treatments for you</strong> — men and women have different options; confirm a provider
          offers formulas appropriate for you (for example, Happy Head serves both men and women, while Maximus is
          men-focused).
        </li>
        <li>
          <strong>Licensed medical oversight</strong> — a real clinician should review your intake before anything
          is prescribed, and medication should come from a licensed pharmacy.
        </li>
        <li>
          <strong>Personalization</strong> — some services tailor formulas to your needs, adding or removing actives
          and adjusting strength.
        </li>
        <li>
          <strong>Transparent terms</strong> — check current pricing, what&rsquo;s included, shipping, and how easily
          you can pause or cancel, on the provider&rsquo;s own site.
        </li>
      </ul>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">What causes hair loss? DHT and male-pattern baldness</h3>
      <p className="mb-4">
        The most common cause of hair loss in men is <strong>androgenetic alopecia</strong> — male-pattern baldness —
        and a related pattern affects many women too. It&rsquo;s driven largely by <strong>DHT (dihydrotestosterone)</strong>,
        a hormone that gradually shrinks hair follicles, leading to a receding hairline, a thinning crown, or a widening
        part. Genetics strongly influence who&rsquo;s affected, which is why pattern hair loss tends to run in families.
        Because it&rsquo;s progressive, starting treatment early gives you the best chance to keep the hair you have — our
        guide on <Link href="/hair-loss/articles/how-to-stop-hair-loss" className="font-semibold text-[#0C4B75] hover:underline">how to stop hair loss</Link>{" "}
        walks through the options.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">Does hair-loss treatment really work?</h3>
      <p className="mb-4">
        For most people with pattern hair loss, evidence-based treatments genuinely help — finasteride and dutasteride
        slow loss by lowering DHT, and minoxidil supports regrowth. Results vary, and treatments work best when started
        early and used consistently. They&rsquo;re maintenance therapies: benefits are sustained with continued use and
        generally fade if you stop. For a deeper look, see{" "}
        <Link href="/hair-loss/articles/does-finasteride-work" className="font-semibold text-[#0C4B75] hover:underline">does finasteride really work</Link>{" "}
        and{" "}
        <Link href="/hair-loss/articles/finasteride-vs-minoxidil" className="font-semibold text-[#0C4B75] hover:underline">finasteride vs minoxidil</Link>.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">Hair-loss treatment for women</h3>
      <p className="mb-4">
        Women&rsquo;s hair loss often shows up as diffuse thinning or a widening part rather than a receding hairline,
        and the right treatments differ. Minoxidil is commonly used for women, and some are prescribed spironolactone,
        while finasteride and dutasteride are generally <em>not</em> recommended for women — especially during pregnancy.
        Choose a provider that formulates for women:{" "}
        <Link href="/hair-loss/reviews/happyhead" className="font-semibold text-[#0C4B75] hover:underline">Happy Head</Link>{" "}
        serves both men and women. Read more in{" "}
        <Link href="/hair-loss/articles/hair-loss-treatment-for-women" className="font-semibold text-[#0C4B75] hover:underline">hair-loss treatment for women</Link>.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">How much does online hair-loss treatment cost?</h3>
      <p className="mb-4">
        Pricing depends on the provider, the treatment, and whether you choose an oral medication or a custom topical
        formula, so it&rsquo;s best to check current pricing on each provider&rsquo;s own site. When you compare, look at
        what&rsquo;s included — the online consultation, the medication itself, and shipping — rather than the headline
        number alone. Generic finasteride and minoxidil tend to be the most affordable, while personalized compounded
        formulas can cost more.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">Are online hair-loss treatments safe and legitimate?</h3>
      <p className="mb-4">
        Reputable telehealth providers connect you with licensed clinicians who review your medical history before
        prescribing, and dispense medication through licensed pharmacies. That review is the key sign of a legitimate
        service — avoid anywhere that ships prescription medication without one. The providers in our rankings all use
        licensed medical oversight; still, always confirm a provider&rsquo;s licensing and read the details before you
        start.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">Hair-loss guides &amp; research</h3>
      <ul className="mb-4 list-disc space-y-2 pl-6">
        <li><Link href="/hair-loss/articles/how-to-stop-hair-loss" className="font-semibold text-[#0C4B75] hover:underline">How to stop hair loss: treatments that actually work</Link></li>
        <li><Link href="/hair-loss/articles/finasteride-vs-minoxidil" className="font-semibold text-[#0C4B75] hover:underline">Finasteride vs minoxidil: which is right for you?</Link></li>
        <li><Link href="/hair-loss/articles/how-long-hair-loss-treatment-works" className="font-semibold text-[#0C4B75] hover:underline">How long until hair-loss treatment works?</Link></li>
        <li><Link href="/hair-loss/articles/best-online-hair-loss-treatment" className="font-semibold text-[#0C4B75] hover:underline">Best online hair-loss treatment: how to choose a provider</Link></li>
      </ul>

      <p className="mb-4 text-[14px] text-gray-500">
        This page is for general information and is not medical advice. Hair-loss treatments are prescribed at a
        clinician&rsquo;s discretion after a medical review. Always consult a licensed provider about what&rsquo;s
        right for you.
      </p>
    </div>
  );
}
