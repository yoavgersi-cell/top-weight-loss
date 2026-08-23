import Link from "next/link";

const optionRows: [string, string, string][] = [
  ["Estrogen therapy", "Replaces estrogen to ease symptoms like hot flashes and night sweats.", "Given as patches, gels, sprays or pills; the form and dose are individualized."],
  ["Progesterone", "Added for women who still have a uterus, to protect the uterine lining.", "Often paired with estrogen as part of combined therapy."],
  ["Non-hormonal options", "Prescription and lifestyle approaches for those who can't or prefer not to use hormones.", "A clinician can advise when non-hormonal treatment is the better fit."],
];

function ComparisonTable({ colA, colB, rows }: { colA: string; colB: string; rows: [string, string, string][] }) {
  return (
    <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[600px] text-left text-[14px]">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 font-bold text-[#191919]">{colA}</th>
            <th className="px-4 py-3 font-bold text-[#191919]">What it does</th>
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

// Editorial, general-information content for the HRT / menopause vertical home.
// Medical claims are kept general and hedged - no fabricated statistics or
// provider numbers - with links to the reviews and comparison and a disclaimer.
export function HrtEditorialContent() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 pb-12 text-[16px] leading-[1.7] text-gray-700">
      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">The Best Online Menopause & HRT Providers, Compared</h2>
      <p className="mb-4">
        Menopause care has become far more accessible online: telehealth clinics connect you with menopause-trained
        clinicians who review your symptoms and history and, where appropriate, prescribe hormone therapy (HRT) or
        non-hormonal treatment - with follow-up from home. Providers differ in the clinicians they use, whether they
        take insurance, the treatments they offer, and price. We compare them on those factors. Read our{" "}
        <Link href="/hrt/reviews" className="font-semibold text-[#0C4B75] hover:underline">
          provider reviews
        </Link>{" "}
        or compare two directly in our{" "}
        <Link href="/hrt/midi-vs-winona" className="font-semibold text-[#0C4B75] hover:underline">
          Midi vs Winona comparison
        </Link>
        .
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">What hormone therapy does</h3>
      <p className="mb-4">
        Hormone therapy replaces hormones - primarily estrogen, often with progesterone - that decline during
        perimenopause and menopause. For many women it eases symptoms such as hot flashes, night sweats, sleep
        disruption and vaginal dryness. It isn&rsquo;t right for everyone, and a clinician weighs the benefits and
        risks based on your health history and preferences.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">Common treatment options</h3>
      <ComparisonTable colA="Option" colB="Good to know" rows={optionRows} />

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">What to expect from an online visit</h3>
      <p className="mb-4">
        A good telehealth menopause provider starts with a thorough review of your symptoms, history and goals with a
        clinician trained in menopause care. Treatment is individualized - hormonal or non-hormonal - and adjusted
        over time with follow-up. Some providers accept insurance for visits, which can affect your overall cost.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">What to look for in a menopause provider</h3>
      <ul className="mb-4 list-disc space-y-2 pl-6">
        <li><strong>Menopause-trained clinicians</strong> - providers who specialize in perimenopause and menopause.</li>
        <li><strong>Hormonal and non-hormonal options</strong> - so your plan fits your health and preferences.</li>
        <li><strong>Ongoing support</strong> - follow-up visits and the ability to adjust treatment over time.</li>
        <li><strong>Transparent terms</strong> - check pricing, whether insurance is accepted, and what&rsquo;s included, on the provider&rsquo;s site.</li>
      </ul>

      <p className="mb-4 text-[14px] text-gray-500">
        This page is for general information and is not medical advice. Hormone therapy is prescribed at a
        clinician&rsquo;s discretion after a medical review. Always consult a licensed provider about what&rsquo;s
        right for you.
      </p>
    </div>
  );
}
