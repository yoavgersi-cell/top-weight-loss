import Link from "next/link";

const modelRows: [string, string, string][] = [
  ["Subscription therapy", "A matched licensed therapist, live sessions plus messaging, billed monthly.", "BetterHelp is the biggest example; Talkspace runs the same model with insurance coverage."],
  ["Psychiatry & medication", "Evaluation, diagnosis and medication management by psychiatric clinicians.", "Talkiatry is psychiatry-first and insurance-based; Talkspace offers it as an added service."],
  ["Mindfulness apps", "Self-guided meditation, sleep and stress practice - not treatment.", "Headspace is the best-known (it now sells insurance-based therapy too); pairs well with therapy rather than replacing it."],
];

// Verified Trustpilot standings, captured from each platform's live profile
// (operator screenshots, August 2026). Real aggregates only - never adjusted.
const ratingRows: [string, string, string][] = [
  ["Talkspace", "4.4 across 2,370 reviews", "The best verified score in our coverage - praise centers on therapists who stick; the captured reviews carry Trustpilot's \"Invited\" tag."],
  ["BetterHelp", "3.9 across 9,652 reviews", "Solid but mixed on the category's biggest review base - accessibility and therapist quality praised, fit and billing complaints alongside."],
  ["Talkiatry", "2.5 across 956 reviews", "A split record: psychiatrists praised in recent reviews, while billing and back-office draw the criticism. Read recent reviews before booking."],
  ["Headspace", "1.5 across 770 reviews", "Strikingly low for so popular an app - weigh it against the app-store popularity Headspace cites, and read recent reviews before subscribing."],
];

function ComparisonTable({ colA, colHeadB, colB, rows }: { colA: string; colHeadB?: string; colB: string; rows: [string, string, string][] }) {
  return (
    <div className="mb-4 overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[600px] text-left text-[14px]">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 font-bold text-[#191919]">{colA}</th>
            <th className="px-4 py-3 font-bold text-[#191919]">{colHeadB ?? "What it does"}</th>
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
// Mental-health claims are kept general and hedged; the only numbers on the
// page are verified Trustpilot aggregates captured from the live profiles -
// no fabricated statistics, prices or platform claims. Internal links, a 988
// crisis pointer and a disclaimer close it out.
export function OnlineTherapyEditorialContent() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pt-6 pb-12 text-[16px] leading-[1.7] text-gray-700">
      <h2 className="mb-4 text-[24px] font-bold text-[#191919]">The Best Online Therapy Platforms, Compared</h2>
      <p className="mb-4">
        Online therapy connects you with a licensed clinician by video, phone or messaging - no commute, wider choice
        of therapists, and formats that fit around work and family. The platforms differ far more than their ads
        suggest: insurance coverage and copays vary sharply between them, some offer psychiatry with medication
        management and some are therapy-only, and one of the best-known names isn&rsquo;t primarily therapy at all. We compare them on
        exactly those lines - with real published information and verified customer ratings, never invented numbers.
        Read our{" "}
        <Link href="/online-therapy/reviews" className="font-semibold text-[#0C4B75] hover:underline">
          platform reviews
        </Link>{" "}
        or compare the two biggest names in our{" "}
        <Link href="/online-therapy/betterhelp-vs-talkspace" className="font-semibold text-[#0C4B75] hover:underline">
          BetterHelp vs Talkspace comparison
        </Link>
        .
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">Verified customer ratings, side by side</h3>
      <p className="mb-4">
        These are each platform&rsquo;s real Trustpilot standings, checked against the live profiles in August 2026 -
        shown exactly as they are, including the uncomfortable ones. Aggregate ratings at telehealth companies tend to
        be driven by logistics (billing, cancellation, support) at least as much as by clinical care, so treat them as
        a customer-experience signal and read recent reviews for the current picture.
      </p>
      <ComparisonTable colA="Platform" colHeadB="Trustpilot (verified Aug 2026)" colB="What stands out" rows={ratingRows} />

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">Three different products, one label</h3>
      <p className="mb-4">
        &ldquo;Online therapy&rdquo; gets used for genuinely different products, and knowing which one you&rsquo;re
        buying is half the decision:
      </p>
      <ComparisonTable colA="Model" colB="Who does it" rows={modelRows} />

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">The insurance question comes first</h3>
      <p className="mb-4">
        The single biggest cost factor is whether your insurance covers a platform.{" "}
        <Link href="/online-therapy/reviews/talkspace" className="font-semibold text-[#0C4B75] hover:underline">
          Talkspace
        </Link>{" "}
        is covered by many major plans and employer EAPs,{" "}
        <Link href="/online-therapy/reviews/talkiatry" className="font-semibold text-[#0C4B75] hover:underline">
          Talkiatry
        </Link>{" "}
        bills through insurance like a specialist practice, and{" "}
        <Link href="/online-therapy/reviews/headspace" className="font-semibold text-[#0C4B75] hover:underline">
          Headspace
        </Link>
        &rsquo;s therapy service accepts insurance as well.{" "}
        <Link href="/online-therapy/reviews/betterhelp" className="font-semibold text-[#0C4B75] hover:underline">
          BetterHelp
        </Link>{" "}
        - long the insurance holdout - now accepts it too, with copays cited from around $23/session for covered
        members and a financial-aid questionnaire for self-pay. Every platform has a free eligibility check - run two
        or three before paying anyone out of pocket; each takes minutes and answers the question no comparison table
        can: what <em>you</em> will actually pay. Our{" "}
        <Link href="/online-therapy/articles/online-therapy-that-takes-insurance" className="font-semibold text-[#0C4B75] hover:underline">
          insurance guide
        </Link>{" "}
        walks through the whole thing, including out-of-network reimbursement when nothing is covered.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">Which platform fits which person</h3>
      <ul className="mb-4 list-disc space-y-2 pl-6">
        <li>
          <strong>You want talk therapy, started fast:</strong>{" "}
          <Link href="/online-therapy/reviews/betterhelp" className="font-semibold text-[#0C4B75] hover:underline">BetterHelp</Link>{" "}
          - the largest network, matching in as little as 2 days, video/phone/chat sessions with messaging in between, easy switching, and insurance now accepted (copays from ~$23/session for covered members).
        </li>
        <li>
          <strong>You have insurance, or might need medication too:</strong>{" "}
          <Link href="/online-therapy/reviews/talkspace" className="font-semibold text-[#0C4B75] hover:underline">Talkspace</Link>{" "}
          - therapy plus psychiatry on one platform, broad plan and EAP coverage, and the strongest verified rating in our coverage.
        </li>
        <li>
          <strong>Medication is likely the center of your care:</strong>{" "}
          <Link href="/online-therapy/reviews/talkiatry" className="font-semibold text-[#0C4B75] hover:underline">Talkiatry</Link>{" "}
          - psychiatrist-led from the first visit, billed in-network. Community feedback praises the doctors and warns on the back office, so confirm eligibility in writing.
        </li>
        <li>
          <strong>You want a daily practice for stress and sleep, not treatment:</strong>{" "}
          <Link href="/online-therapy/reviews/headspace" className="font-semibold text-[#0C4B75] hover:underline">Headspace</Link>{" "}
          - the best-known meditation app, best used alongside therapy rather than instead of it. Our{" "}
          <Link href="/online-therapy/headspace-vs-betterhelp" className="font-semibold text-[#0C4B75] hover:underline">Headspace vs BetterHelp comparison</Link>{" "}
          covers that fork in depth.
        </li>
      </ul>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">What online therapy costs</h3>
      <p className="mb-4">
        We publish prices only after we&rsquo;ve verified them, and in this category prices genuinely vary - by
        platform, location, plan and insurance - so this page quotes none. What we can tell you is where the cost
        levers are: insurance coverage (worth checking first, always), employer EAPs that quietly include free
        sessions, BetterHelp&rsquo;s financial-aid questionnaire for out-of-pocket subscribers, HSA/FSA eligibility
        where offered, and out-of-network reimbursement via superbills. Our{" "}
        <Link href="/online-therapy/articles/free-and-low-cost-therapy-options" className="font-semibold text-[#0C4B75] hover:underline">
          free and low-cost therapy guide
        </Link>{" "}
        maps the options below every platform&rsquo;s price, including community clinics and sliding-scale therapists.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">A word on privacy</h3>
      <p className="mb-4">
        Therapy data is as sensitive as data gets, and the category&rsquo;s record isn&rsquo;t spotless - BetterHelp
        settled with the FTC in 2023 over past sharing of user data with advertisers, a fact our{" "}
        <Link href="/online-therapy/reviews/betterhelp" className="font-semibold text-[#0C4B75] hover:underline">
          BetterHelp review
        </Link>{" "}
        covers rather than buries. Before signing up anywhere: read the platform&rsquo;s current privacy policy, check
        whether your data is used for advertising, and know that therapy notes and billing records are handled under
        different rules. Insurance-billed care (Talkspace, Talkiatry, Headspace&rsquo;s therapy service) also creates
        claims records with your insurer - a normal part of healthcare, but worth knowing.
      </p>

      <h3 className="mb-3 mt-8 text-[20px] font-bold text-[#191919]">What to look for in a platform</h3>
      <ul className="mb-4 list-disc space-y-2 pl-6">
        <li><strong>Licensed clinicians</strong> - therapists licensed in your state; psychiatric clinicians if medication may be part of your care. Our <Link href="/online-therapy/articles/online-therapy-with-medication" className="font-semibold text-[#0C4B75] hover:underline">medication guide</Link> explains how remote prescribing works and its limits.</li>
        <li><strong>The right care model</strong> - therapy-first, psychiatry-first, or daily practice. Our <Link href="/online-therapy/articles/how-to-choose-an-online-therapy-platform" className="font-semibold text-[#0C4B75] hover:underline">choosing guide</Link> sorts it in four questions.</li>
        <li><strong>A session rhythm you&rsquo;ll keep</strong> - video, phone, chat or messaging; consistency drives outcomes more than format, and the best platform is the one you&rsquo;re still attending in month three.</li>
        <li><strong>Easy switching</strong> - finding the right therapist can take more than one try (community feedback says exactly this), so how painless re-matching is matters more than it sounds.</li>
        <li><strong>Transparent terms</strong> - current rates, cancellation terms and refund rules on the platform&rsquo;s own site. We don&rsquo;t quote prices we haven&rsquo;t verified, and neither should your memory of an ad.</li>
      </ul>

      <p className="mb-4 text-[14px] text-gray-500">
        This page is for general information and is not medical advice or a substitute for professional care. Online
        platforms are for ongoing care, not emergencies - if you&rsquo;re in crisis in the US, call or text 988 (the
        Suicide &amp; Crisis Lifeline, free and open 24/7), or call 911 in immediate danger.
      </p>
    </div>
  );
}
