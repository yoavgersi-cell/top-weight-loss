import Link from "next/link";

const modelRows: [string, string, string][] = [
  ["Subscription therapy", "A matched licensed therapist, live sessions plus messaging, billed monthly.", "BetterHelp is the biggest example; Talkspace runs the same model with insurance coverage."],
  ["Psychiatry & medication", "Evaluation, diagnosis and medication management by psychiatric clinicians.", "Talkiatry is psychiatry-first and insurance-based; Talkspace offers it as an added service."],
  ["Mindfulness apps", "Self-guided meditation, sleep and stress practice - not treatment.", "Headspace is the best-known (it now sells insurance-based therapy too); pairs well with therapy rather than replacing it."],
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

// Editorial, general-information content for the online-therapy vertical home.
// Mental-health claims are kept general and hedged - no fabricated statistics
// or platform numbers - with internal links, a 988 crisis pointer and a
// disclaimer. Same pattern as the other verticals' editorial blocks.
export function OnlineTherapyEditorialContent() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 pb-12 text-[16px] leading-[1.7] text-gray-700">
      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">The Best Online Therapy Platforms, Compared</h2>
      <p className="mb-4">
        Online therapy connects you with a licensed clinician by video, phone or messaging - no commute, wider choice
        of therapists, and formats that fit around work and family. The platforms differ far more than their ads
        suggest: some take insurance and some don&rsquo;t, some offer psychiatry with medication management and some
        are therapy-only, and one of the best-known names isn&rsquo;t therapy at all. We compare them on exactly those
        lines. Read our{" "}
        <Link href="/online-therapy/reviews" className="font-semibold text-[#0C4B75] hover:underline">
          platform reviews
        </Link>{" "}
        or compare the two biggest names in our{" "}
        <Link href="/online-therapy/betterhelp-vs-talkspace" className="font-semibold text-[#0C4B75] hover:underline">
          BetterHelp vs Talkspace comparison
        </Link>
        .
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">Three different products, one label</h3>
      <ComparisonTable colA="Model" colB="Who does it" rows={modelRows} />

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">The insurance question comes first</h3>
      <p className="mb-4">
        The single biggest cost factor is whether your insurance covers a platform.{" "}
        <Link href="/online-therapy/reviews/talkspace" className="font-semibold text-[#0C4B75] hover:underline">
          Talkspace
        </Link>{" "}
        is covered by many major plans and employer EAPs, and{" "}
        <Link href="/online-therapy/reviews/talkiatry" className="font-semibold text-[#0C4B75] hover:underline">
          Talkiatry
        </Link>{" "}
        bills through insurance like a specialist practice.{" "}
        <Link href="/online-therapy/reviews/betterhelp" className="font-semibold text-[#0C4B75] hover:underline">
          BetterHelp
        </Link>{" "}
        takes no insurance and offers a financial-aid questionnaire instead. Both insurance-friendly platforms have
        free eligibility checks - run them before paying anyone out of pocket. Our{" "}
        <Link href="/online-therapy/articles/online-therapy-that-takes-insurance" className="font-semibold text-[#0C4B75] hover:underline">
          insurance guide
        </Link>{" "}
        walks through it.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">What to look for in a platform</h3>
      <ul className="mb-4 list-disc space-y-2 pl-6">
        <li><strong>Licensed clinicians</strong> - therapists licensed in your state; psychiatric clinicians if medication may be part of your care.</li>
        <li><strong>The right care model</strong> - therapy-first, psychiatry-first, or daily practice. Our <Link href="/online-therapy/articles/how-to-choose-an-online-therapy-platform" className="font-semibold text-[#0C4B75] hover:underline">choosing guide</Link> sorts it in four questions.</li>
        <li><strong>A session rhythm you&rsquo;ll keep</strong> - video, phone, chat or messaging; consistency drives outcomes more than format.</li>
        <li><strong>Transparent terms</strong> - we don&rsquo;t quote prices we haven&rsquo;t verified, so confirm current rates and cancellation terms on the platform&rsquo;s site.</li>
      </ul>

      <p className="mb-4 text-[14px] text-gray-500">
        This page is for general information and is not medical advice or a substitute for professional care. Online
        platforms are for ongoing care, not emergencies - if you&rsquo;re in crisis in the US, call or text 988 (the
        Suicide &amp; Crisis Lifeline, free and open 24/7), or call 911 in immediate danger.
      </p>
    </div>
  );
}
