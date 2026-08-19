import Link from "next/link";

const formRows: [string, string, string][] = [
  ["Injections", "Testosterone given by injection on a set schedule.", "Common and cost-effective; some people prefer less-frequent dosing, others dislike needles."],
  ["Gels & creams", "Topical testosterone applied to the skin daily.", "Needle-free and steady, but requires care to avoid transferring to others by skin contact."],
  ["Other forms", "Pellets, patches or other options depending on the provider.", "Availability and suitability vary — a clinician recommends what fits your situation."],
];

function ComparisonTable({ colA, colB, rows }: { colA: string; colB: string; rows: [string, string, string][] }) {
  return (
    <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[600px] text-left text-[14px]">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 font-bold text-[#191919]">{colA}</th>
            <th className="px-4 py-3 font-bold text-[#191919]">How it works</th>
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

// Editorial, general-information content for the TRT vertical home. Medical
// claims are kept general and hedged — no fabricated statistics or provider
// numbers — with links to the reviews and comparison and a clear disclaimer.
export function TrtEditorialContent() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 pb-12 text-[16px] leading-[1.7] text-gray-700">
      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">The Best Online TRT Providers, Compared</h2>
      <p className="mb-4">
        Testosterone replacement therapy (TRT) has moved online: reputable telehealth clinics start with lab work,
        connect you with a licensed provider to review your results and symptoms, and — where appropriate — prescribe
        and monitor treatment from home. Providers differ in how they test, which treatment forms they offer, how
        closely they monitor you, and price. We compare them on those factors. Read our{" "}
        <Link href="/trt/reviews" className="font-semibold text-[#0C4B75] hover:underline">
          provider reviews
        </Link>{" "}
        or see two go head to head in our{" "}
        <Link href="/trt/maximus-vs-hims" className="font-semibold text-[#0C4B75] hover:underline">
          Maximus vs Hims comparison
        </Link>
        .
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">What TRT is — and who it&rsquo;s for</h3>
      <p className="mb-4">
        TRT is a medical treatment that restores testosterone in men with clinically low levels confirmed by
        bloodwork, alongside symptoms such as low energy, reduced libido or changes in mood. It is not a treatment
        for everyone, and a provider weighs the potential benefits against the risks for your individual situation.
        Low testosterone should always be confirmed with lab testing before any treatment begins.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">Forms of testosterone</h3>
      <ComparisonTable colA="Form" colB="Good to know" rows={formRows} />

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">Testing and monitoring: what to expect</h3>
      <p className="mb-4">
        A legitimate online TRT program starts with bloodwork to confirm low testosterone and check your overall
        health, followed by a provider review. If treatment is appropriate, expect follow-up labs during therapy to
        track your response and keep it safe. This ongoing monitoring is a key difference between a responsible
        provider and one to avoid.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">What to look for in an online TRT provider</h3>
      <ul className="mb-4 list-disc space-y-2 pl-6">
        <li><strong>Real lab testing</strong> — bloodwork before prescribing, and re-testing during treatment.</li>
        <li><strong>Licensed medical oversight</strong> — a clinician reviews your labs and history, and is available for follow-up.</li>
        <li><strong>Treatment options</strong> — the forms of testosterone and dosing that suit you.</li>
        <li><strong>Transparent terms</strong> — check current pricing, what labs and follow-ups are included, and cancellation, on the provider&rsquo;s site.</li>
      </ul>

      <p className="mb-4 text-[14px] text-gray-500">
        This page is for general information and is not medical advice. TRT is prescribed at a clinician&rsquo;s
        discretion after a medical review and lab testing. Always consult a licensed provider about what&rsquo;s
        right for you.
      </p>
    </div>
  );
}
