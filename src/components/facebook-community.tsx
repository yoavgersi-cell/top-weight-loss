import { Users } from "lucide-react";
import { FacebookPost } from "@/components/facebook-post";

// ───── Community voices: Facebook group discussions ─────
// Operator-supplied screenshots of Facebook group threads, transcribed as text.
// Privacy rules (Nov 10, 2026): no real names, photos or profile links - every
// commenter is "Group member" plus a role tag taken only from their own words
// ("3 months in", "family member"); the group is named only by its generic
// descriptive name (operator's Nov 12, 2026 brief), never linked (private
// groups). Quotes are verbatim, lightly trimmed with "…";
// medication doses are removed from quotes. Positives and complaints are both
// kept; the "What we found" line is written from the displayed quotes only.
// No ratings and no Review/AggregateRating schema: a screenshot cannot support
// an aggregate, so this stays plain quoted text.

export type FacebookComment = {
  /** Shown as a chip next to "Group member", e.g. "4th shipment". Omit when the comment gives no context. */
  role?: string;
  body: string;
};

export type FacebookThread = {
  /** Generic description of the group, never its exact name. */
  group: string;
  /** Display name for the post header (generic descriptive name, no link). */
  groupName: string;
  /** Date the operator supplied the screenshot (YYYY-MM-DD). */
  capturedAt: string;
  /** Date the post was made (YYYY-MM-DD), from the capture ("4d" before a Nov 10 capture = Nov 6). */
  postedAt: string;
  /** Relative age of the post as displayed in the capture, e.g. "4 days before capture". */
  age?: string;
  /** The original post, verbatim. */
  question: string;
  /** Comment count only when visible in the capture. */
  commentCount?: number;
  comments: FacebookComment[];
  /** Why the thread is on the page, derived from its content. */
  topic?: string;
};

export const FACEBOOK_COMMUNITY_FEEDBACK: Record<
  string,
  { vertical: string; threads: FacebookThread[]; themes: string }
> = {
  embody: {
    vertical: "weight-loss",
    themes:
      "Across both threads most replies are positive on results, on the flat $129 price with no membership fee (which matches our verified pricing) and on shipments arriving within the promised window. The recurring complaint is shipping: two members describe late or warm deliveries, and one says the fill pharmacy \"takes a bit long\". One member is looking at switching away. Off-topic replies (\"do your research\", an insurance remark, member-to-member thanks) are not shown.",
    threads: [
      // Operator-supplied screenshots, Nov 10, 2026, from a Zepbound support
      // group; post shown as "4d" old. Names removed; one dose figure removed.
      {
        group: "A Zepbound weight-loss support group",
        groupName: "Zepbound Weight Loss Support Group",
        capturedAt: "2026-11-10",
        postedAt: "2026-11-06",
        age: "4 days before capture",
        topic: "Results / shipping / first order",
        question: "I'm looking into going with Embody. Anybody have good or bad reviews while using this company?",
        commentCount: 17,
        comments: [
          { role: "4th shipment", body: "I've had good success with them, just received my 4th vial. I've stayed on my starting dose and I'm down 30 lbs since 8/7." },
          { role: "3rd shipment", body: "Just took my 3rd shot through embody. Decent experience. I'd go for it." },
          {
            role: "First shipment",
            body: "I was worried after reading reviews. However, my meds were sent to the pharmacy on the first… Today I received a text with FedEx tracking for my shipment. I'm in California and they're coming from Utah. So the five days they say seems to be true. It's my first shipment. Like I said, I was worried after the reviews, but we shall see.",
          },
          { role: "Family member", body: "My husband uses them and has had no issues at all." },
          { role: "Family member", body: "My daughter is pleased with them." },
          { body: "Love Embody!!!" },
          { role: "Joined last week", body: "I joined last week, no complaint, already down 3 lbs and it hasn't been a week yet." },
          { body: "Some people complain about late shipment." },
          {
            role: "3 months in",
            body: "I was with them 3 months. The first order was fine. They changed my pharmacy and my 2nd order was 10 days late and arrived hot to touch. My third shipment arrived hot too. There are no refunds or replacements. I am not going to use my last two shipments, because I am afraid it's lost its integrity. I did call the shipping pharmacy and they tried to put me at ease, but they were not successful.",
          },
          { body: "Read reviews, lots of unhappy people with Embody." },
        ],
      },
      // Second operator-supplied thread, same group, posted Oct 28, 2026 (56
      // comments; the visible part is shown). Names removed; member-to-member
      // replies ("super interested", "I sent you the link", thanks) and a
      // mention of another provider the member was considering are not shown.
      {
        group: "The same Zepbound weight-loss support group",
        groupName: "Zepbound Weight Loss Support Group",
        capturedAt: "2026-11-10",
        postedAt: "2026-10-28",
        age: "Posted Oct 28, 2026",
        topic: "Flat price / membership / shipping",
        question: "Does anyone go through Embody? Give me your input please and thank u!",
        commentCount: 56,
        comments: [
          {
            role: "Family member",
            body: "My husband does and they have been really good. He does everything online or through the app. Inputs his information and the doctors ask how he is doing, if he wants to increase or stay the same. Shipment is easy. He pays $129 no matter what his dosage is.",
          },
          { role: "Asking", body: "Is there a \"membership\" fee? Are they just compound or offer all? I'm so tired of researching and filling out pages to find out they want $300-$400 or don't offer what the doctor prescribed." },
          { role: "Family member", body: "He does not have a membership fee." },
          { role: "Switching away", body: "I've been looking at another provider. I hate making the switch but circumstances have made me start looking elsewhere." },
          { body: "I love embody. I haven't had any issues with them. My last shipment came in within 5 days after they billed me. After months of not having a cycle I had one. I don't crave junk food like I used to." },
          { role: "Current member", body: "I do and it's legit. The pharmacy they use to fill mine takes a bit long but I usually have enough left from the previous month if it's late. Other than that the quality is fine." },
          { role: "Current member", body: "I am pretty happy with them and it's 129 for the tirz no matter the dose." },
        ],
      },
    ],
  },
};

export function FacebookCommunityBlock({
  providerId,
  providerName,
  vertical,
  className = "",
}: {
  providerId: string;
  providerName: string;
  vertical: string;
  className?: string;
}) {
  const data = FACEBOOK_COMMUNITY_FEEDBACK[providerId];
  if (!data || data.vertical !== vertical) return null;
  return (
    <section className={`mb-14 ${className}`} aria-labelledby={`fb-voices-${providerId}`}>
      <div className="mb-2 flex items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1877F2]/10 text-[#1877F2]">
          <Users className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <h2 id={`fb-voices-${providerId}`} className="text-[20px] font-bold text-[#191919]">
          What people say about {providerName} in Facebook groups
        </h2>
      </div>
      <p className="mb-5 max-w-[680px] text-[14.5px] leading-relaxed text-gray-700">
        Real conversations from Facebook support groups. Shared anonymously, including both positive and
        negative experiences.
      </p>

      {data.threads.map((t, i) => (
        <FacebookPost key={i} thread={t} />
      ))}

      <div className="rounded-xl border-l-[3px] border-[#0C4B75] bg-[#0C4B75]/[0.04] px-4 py-3">
        <p className="text-[12px] font-bold uppercase tracking-wider text-[#0C4B75]">What we found</p>
        <p className="mt-1 text-[14px] leading-relaxed text-gray-800">{data.themes}</p>
      </div>
      <p className="mt-3 text-[11.5px] leading-relaxed text-gray-400">
        Quotes are transcribed from screenshots of Facebook group discussions supplied to our editors; names,
        photos and profile links are removed and medication doses are omitted. Each is one person&rsquo;s
        experience; any weight-loss result mentioned is not typical and results vary. Facebook is a trademark
        of Meta Platforms, Inc. and is not affiliated with this site.
      </p>
    </section>
  );
}
