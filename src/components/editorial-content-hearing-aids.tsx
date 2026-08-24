import Link from "next/link";

const compareRows: [string, string, string][] = [
  ["Fitting", "OTC devices are self-fitted at home; prescription hearing aids are programmed to your measured hearing loss by an audiologist.", "Self-fitting is the core OTC trade-off - simpler and cheaper, but not customized."],
  ["Who it suits", "OTC is intended for adults with perceived mild-to-moderate hearing difficulty.", "Severe or complex hearing loss belongs with professional care, not an OTC device."],
  ["Cost", "OTC devices generally cost far less than professionally fitted prescription aids.", "Exact prices vary by brand - we only list figures we've verified."],
  ["Support", "Brand customer support, returns and warranty replace the audiologist relationship.", "Check the return window before buying - you're purchasing before you know it helps."],
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

// Editorial, general-information content for the hearing-aids vertical home.
// Claims are kept general and hedged - no fabricated prices, specs or medical
// claims - with links to the reviews and comparison and a clear when-to-see-a-
// professional note.
export function HearingAidsEditorialContent() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 pb-12 text-[16px] leading-[1.7] text-gray-700">
      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">OTC Hearing Aids You Can Order Online, Compared</h2>
      <p className="mb-4">
        Since the FDA created the over-the-counter hearing aid category, adults with perceived mild-to-moderate
        hearing difficulty can buy hearing devices directly online - no prescription, hearing exam or clinic visit.
        The appeal is cost and convenience; the trade-off is self-fitting instead of professional care. Brands differ
        in device design, battery approach, price, return terms and support - we compare them on those factors. Read
        our{" "}
        <Link href="/hearing-aids/reviews" className="font-semibold text-[#0C4B75] hover:underline">
          brand reviews
        </Link>{" "}
        or see the two head to head in our{" "}
        <Link href="/hearing-aids/audien-vs-oricle" className="font-semibold text-[#0C4B75] hover:underline">
          Audien vs Oricle comparison
        </Link>
        .
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">OTC vs prescription hearing aids</h3>
      <ComparisonTable colA="Factor" colB="Good to know" rows={compareRows} />

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">What to check before buying an OTC device</h3>
      <ul className="mb-4 list-disc space-y-2 pl-6">
        <li><strong>The current price</strong> - OTC pricing changes often; confirm it on the brand&rsquo;s site. Where we haven&rsquo;t verified a price, we say so rather than guess.</li>
        <li><strong>The return window</strong> - the single most important term. You&rsquo;re buying before you know the device helps you, so a real trial period matters.</li>
        <li><strong>Warranty and support</strong> - with no audiologist in the loop, the brand&rsquo;s support channel is your support channel.</li>
        <li><strong>Rechargeable vs battery</strong> - rechargeable designs skip fiddly disposable batteries; check charging time and daily battery life.</li>
      </ul>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">When to see a hearing professional instead</h3>
      <p className="mb-4">
        Some situations call for medical care, not an online purchase: sudden hearing loss, hearing loss in one ear
        only, pain, drainage or dizziness. A professional hearing test is also the right first step whenever
        you&rsquo;re unsure how significant your hearing loss is - OTC devices are built for perceived
        mild-to-moderate difficulty, and they can&rsquo;t compensate for severe loss.
      </p>

      <p className="mb-4 text-[14px] text-gray-500">
        This page is for general information and is not medical advice. If you have concerns about your hearing,
        consult a licensed hearing professional.
      </p>
    </div>
  );
}
