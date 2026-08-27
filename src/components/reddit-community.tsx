import Link from "next/link";
import { ArrowBigUp, MessageSquare } from "lucide-react";

// ───── Verified Reddit community feedback ─────
// Single source of truth for real Reddit material, shared by the review pages
// (stacked thread layout) and the battle pages (carousel). Every field renders
// only when the source screenshot captured it - never estimated. Add a
// provider here only when real source material exists. All excerpts were
// captured against weight-loss offers, so callers gate rendering to that
// vertical.

export type RedditReply = { author: string; body: string };
export type RedditThread = {
  subreddit?: string; // "r/telehealth" - omit if the screenshot didn't show it
  author: string; // reddit username without the u/ prefix
  age?: string; // "6mo ago"
  title?: string; // post title; absent for standalone comments
  upvotes?: number; // only when visible in the source screenshot
  commentCount?: number; // only when visible in the source screenshot
  body: string[]; // real excerpt paragraphs
  replies?: RedditReply[];
};

export const REDDIT_COMMUNITY_FEEDBACK: Record<
  string,
  // `themes`: a 1-2 sentence human summary of what keeps coming up in this
  // provider's threads - rendered as the "What we found" synthesis on battle
  // pages. Write it from the displayed threads only, good and bad alike.
  // `vertical`: the vertical the threads were captured for; entries without
  // one are the original weight-loss research. Render sites match it against
  // the page's vertical so an id collision can never surface the wrong data.
  { intro: string; threads: RedditThread[]; takeaway: string; themes?: string; vertical?: string }
> = {
  midi: {
    vertical: "hrt",
    themes:
      "Both threads orbit the same two points: clinicians who actually know menopause medicine (the reason both writers left their regular doctors), and costs that landed soft either way - one writer's Anthem PPO covered everything beyond copays, the other paid out of pocket via Kaiser and still called it very reasonable.",
    intro:
      "Menopause forums are famously hard on providers - dismissive doctors are the default complaint. That's what makes these Midi threads stand out: specifics about clinicians, insurance and money.",
    threads: [
      {
        author: "NorCalChica1",
        age: "3y ago",
        body: [
          "MIDI has been a godsend! I'm 47, had a partial hysterectomy for a health issue at 34. My docs have been totally useless in being able to effectively address the symptoms I've had with fluctuating hormones even before I entered peri menopause.",
          "I had done a lot of research and wanted HRT and the MIDI physicians were so knowledgeable about the pros/cons of different options. I have Anthem Blue Cross PPO and besides my usual copay, Anthem has covered everything (including my meds). I cannot recommend MIDI enough. I feel so much better and my body is functioning better than it has in decades.",
        ],
        upvotes: 10,
        replies: [
          {
            author: "McNamara71",
            body: "Wow! Thank you for this amazing review! I'm creating my account on midi's website now. I'm 16 weeks post-op from a total hysterectomy and none of the drs in my area will discuss HRT.",
          },
        ],
      },
      {
        author: "[deleted]",
        age: "3y ago",
        body: [
          "I have been using them since Dec 1 for bHRT. My clinician has been AMAZING. I have Kaiser, so I pay out of pocket, and it's still been very reasonable. I am so relieved to have found them.",
        ],
        upvotes: 7,
        replies: [
          {
            author: "elle_dog",
            body: "You should get labs done to baseline where you are. Midi can help tell you what you need.",
          },
        ],
      },
    ],
    takeaway:
      "Two different insurance realities, one verdict: with an Anthem PPO everything beyond copays was covered, and even paying out of pocket through Kaiser the writer called it very reasonable. The recurring thread is clinicians who actually engage with menopause medicine - both posts exist because local doctors wouldn't.",
  },
  embody: {
    themes:
      "Communication and support come up again and again in the comments above - a nurse calling after the first dose, orders rushed after a quick complaint - and the prices users quote match the ones embody publishes. The one gripe that repeats: the wait between approval and the first shipment.",
    intro:
      "Beyond Trustpilot, recent Reddit comments about embody paint a consistent - and usefully unvarnished - picture. These are excerpts from real public comments:",
    threads: [
      {
        author: "SaltAvocado9500",
        body: [
          "“Nurse called me today asking have I taken the shot and if yes have I experienced any symptoms.”",
          "Ordered on 8/6, medication delivered 8/14 - with a clinical follow-up call after the first dose.",
        ],
      },
      {
        author: "Comfortable_Whole343",
        body: [
          "“$129 for all levels of tri and no contract - I already moved up my dosages with no issues or kick back.”",
        ],
      },
      {
        author: "LondyRocks",
        body: [
          "“Arrived the next day from the pharmacy. Packaged nicely with ice packs.”",
          "Three vials at $129 each; the honest catch: about two weeks between approval and the medication actually shipping - transit itself was next-day.",
        ],
      },
      {
        author: "TheseFrosting6548",
        body: [
          "Order sat at the pharmacy for a couple of days - then, after a comment on embody's Facebook post: “they contacted me right away... rushed my order. I had it next day.”",
          "“They just billed for the 2nd month - the amount is correct.” Gripes: the pharmacy premixed an anti-nausea ingredient without asking, and the 50-unit doses were larger than expected.",
        ],
      },
      {
        author: "Maybee77",
        body: ["“No complaints.”"],
      },
    ],
    takeaway:
      "The community picture matches the Trustpilot one: communication and service are the consistent strength, delivery is fast once medication ships, and the honest watch-out is pipeline time between approval and shipment - if timing matters, order before your current supply runs low. The $129 figures Reddit users mention line up with embody's regular tirzepatide price ($119 promotional / $129 regular).",
  },
  medvi: {
    themes:
      "The posts above are full-year stories, not first impressions: steady results (just under 15% body weight, 40 pounds), dose adjustments when progress stalled, and support that answered. The caveat users raise themselves is the ongoing monthly cost.",
    intro:
      "Beyond its 14,372-review Trustpilot record, the most-upvoted recent Reddit threads about Medvi are full-year write-ups rather than first-week impressions. Excerpts from the real posts:",
    threads: [
      {
        subreddit: "r/telehealth",
        author: "marlsygarlsy",
        age: "6mo ago",
        title: "Medvi GLP-1 telehealth experience breakdown",
        upvotes: 55,
        commentCount: 8,
        body: [
          "“Within a few days, I heard back from a licensed provider... Most of the communication happened through secure messaging.”",
          "“I did have some mild nausea when my dose increased, but it was manageable and improved after a short time... Around the middle of the year, progress slowed and I hit a plateau. I reached out through the messaging system, and my provider adjusted my dose, which helped me start moving again.”",
          "“After about 12 months, I had lost just under 15 percent of my starting body weight... There were a couple times where replies took longer than expected, but nothing major. The main factor to consider is cost since it is an ongoing monthly expense.”",
          "“It has not been effortless, but it has felt sustainable, which is something I had not experienced before.”",
        ],
        replies: [
          {
            author: "Canadian_Insulin",
            body: "“Clinically speaking, losing around 10 to 15 percent of starting body weight over a year is very much within the expected and healthy range for semaglutide treatment.”",
          },
        ],
      },
      {
        subreddit: "r/productreview",
        author: "External-Neck-7278",
        age: "6mo ago",
        title: "My 2026 MEDVI review after using it for a full year",
        upvotes: 55,
        commentCount: 31,
        body: [
          "“The first thing I noticed was that my appetite felt different in a calm manageable way rather than feeling like I was constantly fighting hunger.”",
          "“Over the course of the year I lost just over 40 pounds and more importantly I've been able to maintain that loss without feeling burnt out.”",
          "“After a full year I'd say Medvi was worth it for me. Not because it was a miracle solution but because it helped make sustainable weight loss feel possible again.”",
        ],
        replies: [
          {
            author: "Decent_Feature_9060",
            body: "“medvi is the best triz provider i ever had (changed 3 providers so far)”",
          },
          {
            author: "DebuggingDave",
            body: "“I've been using Medvi too and the biggest thing for me was exactly what you said, it quieted the food noise instead of turning weight loss into a daily mental fight.”",
          },
        ],
      },
    ],
    takeaway:
      "The Reddit picture matches the Trustpilot one from a different angle: the ongoing monthly cost is the caveat users themselves raise - though Medvi's current $99/month promotion (regularly $199) blunts it considerably - but the year-long accounts describe exactly what that price buys: medical structure, dose adjustments when progress stalls, and 10-15% body-weight results over a year that felt “sustainable, which is something I had not experienced before.”",
  },
  ro: {
    themes:
      "Real results show up in the threads above - 22 to 60 pounds - and getting started draws consistent praise. The friction that keeps repeating is cost: the most upvoted commenter left over price after an otherwise great experience, and another found the cost breakdown confusing.",
    intro:
      "Reddit's recent Ro threads are unusually rich in real numbers - starting weights, pounds lost, and what people actually pay. Excerpts from the real public comments:",
    threads: [
      {
        author: "Opposite_You3133",
        age: "5mo ago",
        upvotes: 11,
        body: [
          "“I used Ro for 3 months and dropped 25 lbs. (sw: 180lbs) I personally had a great experience with Ro and they were seamless throughout the whole process.”",
          "“The pricing ended up being the deciding factor for me after those few months, I started with another provider and lost another 30 lbs... my other provider has been great and no shipping issues.”",
        ],
      },
      {
        author: "Upstairs_Procedure33",
        age: "5mo ago",
        upvotes: 1,
        body: [
          "“I have been a member of Ro since Jan 2024, and I am loyal because they delivered what was promised and paid for. I've lost 50-60 lbs. I get my Wegovy shots through insurance and Walgreens.”",
        ],
      },
      {
        author: "Thick_Ad_2011",
        age: "5mo ago",
        body: ["“I've been on Ro for 3 months and have lost 22 pounds! Extremely happy!”"],
      },
      {
        author: "PrestigiousRest7476",
        age: "5mo ago",
        upvotes: 1,
        body: [
          "“I have been on Zepbound 2.5mg vials for two months. I've lost 1 pound. Just one... I'm taking my first 5mg dose today. Hopefully, things will start changing for me soon. It's been expensive and frustrating.”",
        ],
      },
      {
        author: "KitchenYam8596",
        age: "4mo ago",
        upvotes: 1,
        body: [
          "“My insurance no longer covers and I had a friend who has great success with Ro!... Could someone explain the cost breakdown to me? It's somewhat confusing.”",
        ],
      },
    ],
    takeaway:
      "The results stories are real and substantial - 22 to 60 pounds across the positive accounts - and the service itself draws little criticism. The recurring friction is exactly what Ro's own pricing pages show: the membership-plus-medication cost structure. One highly upvoted commenter left specifically over price after a great experience, and another calls the cost breakdown \"somewhat confusing.\" If brand-name medication through insurance works for you, Ro's model shines; paying cash, the math deserves a hard look first.",
  },
  wellmedr: {
    themes:
      "Most comments above are short and positive - \"legit,\" a named Florida pharmacy, annual plans at \-\/month that match the published rates. The honest exception: one detailed account got fast shipping and good service but saw little progress after 8 weeks.",
    intro:
      "wellmedr's Reddit footprint is comment-level rather than long write-ups: short, recent verdicts, mostly from people who paid for annual plans. Excerpts from the real public comments:",
    threads: [
      {
        author: "Fun-Violinist-6449",
        age: "2mo ago",
        upvotes: 2,
        body: [
          "“They are legit with their pharmacy in Florida. I did a ton of research and ended up paying for a whole year at 88 a month. I am going on my 3rd month and so far they are great! I'm happy”",
        ],
      },
      {
        author: "Ok_Rub4064",
        age: "11d ago",
        upvotes: 1,
        body: [
          "“I am seriously considering switching to Wellmedr. I can get a whole year for $99/month. That's the lowest I've seen.”",
        ],
      },
      {
        author: "Useful-Commercial-49",
        age: "4mo ago",
        upvotes: 1,
        body: [
          "“I received it right away. They kept me on the 15mg of Tirz I was already on. Very responsive customer service.”",
          "The honest catch, after leaving a previous provider (RemedyMeds) over refill delays: “I've been in it for 8 weeks and I'm only down 1 pound... I ordered a 6 month supply for $1143 from WellMedr trying to avoid the shipping delays of monthly refills but I'm currently looking for another company because I'm not wasting my time for no results.”",
        ],
      },
      {
        author: "Fun-Violinist-6449",
        age: "2mo ago",
        upvotes: 2,
        body: [
          "“I have been with them 2 months and so far no complaints. I paid for a whole year.”",
        ],
      },
      {
        author: "GlippyApp",
        age: "16d ago",
        upvotes: 2,
        body: ["“We have some members using them and they like them.”"],
      },
      {
        author: "Professional_Tree843",
        age: "1mo ago",
        upvotes: 1,
        body: ["“They are legit”"],
      },
    ],
    takeaway:
      "The comment-level picture is mostly positive: “legit,” a named Florida pharmacy, fast delivery, responsive service, and the prices commenters actually paid on annual plans ($88-$99/month) sit right in the range of wellmedr's published 12-month rates ($59/month semaglutide, $99/month tirzepatide). The honest counterweight is one detailed account of being down only 1 pound after 8 weeks on tirzepatide despite good service - a fair reminder that response to GLP-1 medication varies by person, and no provider's service quality can guarantee results.",
  },
};

// A minimal Snoo-style mark drawn inline (no external assets) - used to give
// the community section an unmistakable Reddit identity.
export function RedditMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#FF4500" />
      <g fill="#fff">
        <ellipse cx="20" cy="23.5" rx="10.5" ry="7" />
        <circle cx="8.8" cy="21" r="2.6" />
        <circle cx="31.2" cy="21" r="2.6" />
        <circle cx="26.5" cy="9.5" r="2.2" />
        <path d="M20.6 16.9l1.2-6.6 5.3 1.1-.4 1.6-3.8-.8-1 5z" />
      </g>
      <g fill="#FF4500">
        <circle cx="15.8" cy="22.3" r="1.7" />
        <circle cx="24.2" cy="22.3" r="1.7" />
      </g>
      <path d="M15.5 26.6c1.3 1.1 2.8 1.6 4.5 1.6s3.2-.5 4.5-1.6" stroke="#FF4500" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// ───── Reddit thread carousel (battle pages) ─────
// One thread per scroll-snap card, styled like the Reddit post it excerpts:
// r/ identity line, title, body excerpt, top reply, vote/comment footer. On a
// two-provider page each card is tagged with the provider it's about. Cards
// keep to the first two excerpt paragraphs - the full threads live on each
// provider's review page, which the section links to.

function ThreadCard({
  thread,
  providerName,
  reviewHref,
}: {
  thread: RedditThread;
  providerName: string;
  reviewHref: string;
}) {
  return (
    <div className="flex w-[320px] shrink-0 snap-start flex-col rounded-xl border border-gray-200 bg-[#FCFCFC] p-4 sm:w-[350px]">
      {/* Identity line - nowrap with a truncating author so the provider tag
          never drops to a second row on long usernames */}
      <div className="mb-2 flex items-center gap-x-1.5 text-[12px]">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF4500] text-[10px] font-bold text-white">
          r/
        </span>
        <span className="shrink-0 font-bold text-[#191919]">{thread.subreddit ?? "Reddit"}</span>
        <span className="text-gray-400">·</span>
        <span className="min-w-0 truncate text-gray-500">u/{thread.author}</span>
        {thread.age && (
          <>
            <span className="text-gray-400">·</span>
            <span className="shrink-0 text-gray-500">{thread.age}</span>
          </>
        )}
        <span className="ml-auto shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10.5px] font-semibold text-gray-500">
          about {providerName}
        </span>
      </div>

      {thread.title && (
        <p className="mb-1.5 text-[14px] font-bold leading-snug text-[#191919]">{thread.title}</p>
      )}

      <div className="space-y-2">
        {thread.body.slice(0, 2).map((p, i) => (
          <p key={i} className="text-[13px] leading-relaxed text-gray-700">
            {p}
          </p>
        ))}
      </div>

      {thread.replies && thread.replies.length > 0 && (
        <div className="mt-3 border-l-2 border-gray-200 pl-3">
          <p className="text-[11.5px] font-semibold text-gray-500">u/{thread.replies[0].author}</p>
          <p className="mt-0.5 text-[12.5px] leading-relaxed text-gray-600">{thread.replies[0].body}</p>
        </div>
      )}

      {/* Footer - counts only when the screenshot captured them */}
      <div className="mt-auto flex items-center gap-4 pt-3 text-[12px] font-semibold text-gray-500">
        {typeof thread.upvotes === "number" && (
          <span className="flex items-center gap-1">
            <ArrowBigUp className="h-4 w-4 text-[#FF4500]" strokeWidth={2} />
            {thread.upvotes}
          </span>
        )}
        {typeof thread.commentCount === "number" && (
          <span className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" strokeWidth={2} />
            {thread.commentCount}
          </span>
        )}
        <Link href={reviewHref} className="ml-auto font-semibold text-[#0C4B75] hover:underline">
          Full thread in review
        </Link>
      </div>
    </div>
  );
}

export function RedditThreadCarousel({
  providers,
  reviewHrefFor,
}: {
  providers: { id: string; name: string }[];
  reviewHrefFor: (providerId: string) => string;
}) {
  const withData = providers.filter((p) => REDDIT_COMMUNITY_FEEDBACK[p.id]);
  if (withData.length === 0) return null;

  // Interleave the providers' threads so both brands appear within the first
  // couple of cards instead of one provider's whole list running first.
  const lists = withData.map((p) =>
    REDDIT_COMMUNITY_FEEDBACK[p.id].threads.map((t) => ({ provider: p, thread: t }))
  );
  const cards: { provider: { id: string; name: string }; thread: RedditThread }[] = [];
  for (let i = 0; lists.some((l) => i < l.length); i++) {
    for (const l of lists) if (i < l.length) cards.push(l[i]);
  }
  const names = withData.map((p) => p.name).join(" and ");

  return (
    <div className="mb-14">
      <div className="mb-2 flex items-center gap-2.5">
        <RedditMark className="h-7 w-7 shrink-0" />
        <h2 className="text-[20px] font-bold text-[#191919]">What Reddit says about {names}</h2>
      </div>
      <p className="mb-5 max-w-[640px] text-[14.5px] leading-relaxed text-gray-600">
        Excerpts from real public Reddit posts and comments - the strengths and the caveats, in
        users&rsquo; own words.
        {withData.length < providers.length &&
          " We only show providers with verified Reddit material, so not every contender appears here."}
      </p>

      <div className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 [scrollbar-width:thin]">
        {cards.map(({ provider, thread }, i) => (
          <ThreadCard
            key={i}
            thread={thread}
            providerName={provider.name}
            reviewHref={reviewHrefFor(provider.id)}
          />
        ))}
      </div>

      <p className="mt-3 text-[11.5px] leading-relaxed text-gray-400">
        Excerpts from public Reddit posts, lightly trimmed; vote and comment counts shown as
        captured at the time of review. Reddit is a trademark of Reddit, Inc. and is not affiliated
        with this site.
      </p>
    </div>
  );
}
