"use client";

import { useState } from "react";
import { Globe, MessageCircle, MoreHorizontal, User, Users } from "lucide-react";
import type { FacebookThread } from "@/components/facebook-community";

// ───── Facebook-style post (Nov 12, 2026 redesign) ─────
// One container per thread, laid out the way a Facebook group post and its
// comments read: group avatar and name, "Anonymous member · date", the post
// text, a comment-count row, then each comment as a small avatar beside a
// gray bubble. It is a transcription styled after that interface, not an
// embed: nothing here loads from Facebook, the three-dot mark and the
// "Like · Reply" labels are decorative text, and the only control is the
// real "View more comments" expander. Privacy rules from facebook-community.tsx
// apply unchanged (no names, photos, links or doses).

const INITIAL_COMMENTS = 4;

function shortDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export function FacebookPost({ thread: t }: { thread: FacebookThread }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? t.comments : t.comments.slice(0, INITIAL_COMMENTS);
  const hidden = t.comments.length - shown.length;

  return (
    <article className="mb-4 overflow-hidden rounded-xl border border-[#E4E6EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
      {/* Post header */}
      <header className="flex items-start gap-3 px-4 pt-3.5 sm:px-5">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D8DADF] to-[#BCC0C4] text-white"
          aria-hidden
        >
          <Users className="h-5 w-5" strokeWidth={2.25} />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-[15px] font-semibold leading-snug text-[#050505]">{t.groupName}</p>
          <p className="mt-0.5 flex items-center gap-1 text-[13px] text-[#65676B]">
            <span>Anonymous member</span>
            <span aria-hidden>·</span>
            <time dateTime={t.postedAt}>{shortDate(t.postedAt)}</time>
            <span aria-hidden>·</span>
            <Globe className="h-3 w-3" strokeWidth={2.25} aria-label="Group post" />
          </p>
        </div>
        <span className="-mr-1 shrink-0 p-1 text-[#65676B]" aria-hidden>
          <MoreHorizontal className="h-5 w-5" strokeWidth={2.25} />
        </span>
      </header>

      {/* Post body */}
      <p className="px-4 pb-3 pt-3 text-[15px] leading-[1.4] text-[#050505] sm:px-5">{t.question}</p>

      {/* Stats row */}
      <div className="mx-4 flex items-center justify-between border-b border-[#E4E6EB] pb-2 text-[13px] text-[#65676B] sm:mx-5">
        <span className="inline-flex items-center gap-1.5">
          <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          {typeof t.commentCount === "number" ? `${t.commentCount} comments` : "Comments"}
        </span>
        <span className="text-[12px]">Shared anonymously</span>
      </div>

      {/* Comments */}
      <ul className="space-y-2.5 px-4 pb-3 pt-3 sm:px-5">
        {shown.map((c, j) => (
          <li key={j} className="flex items-start gap-2">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E4E6EB] text-[#8A8D91]" aria-hidden>
              <User className="h-4 w-4" strokeWidth={2.25} />
            </span>
            <div className="min-w-0">
              <div className="inline-block max-w-full rounded-2xl bg-[#F0F2F5] px-3 py-2">
                <p className="text-[13px] font-semibold leading-tight text-[#050505]">
                  Anonymous member
                  {c.role && <span className="ml-1.5 rounded-full bg-white px-1.5 py-px text-[11px] font-semibold text-[#0C4B75] ring-1 ring-[#0C4B75]/15">{c.role}</span>}
                </p>
                <blockquote className="mt-0.5 text-[15px] leading-[1.35] text-[#050505]">{c.body}</blockquote>
              </div>
              <p className="mt-0.5 pl-3 text-[12px] font-semibold text-[#65676B]" aria-hidden>
                Like <span className="mx-1.5 font-normal">·</span> Reply
              </p>
            </div>
          </li>
        ))}
      </ul>

      {hidden > 0 && (
        <div className="px-4 pb-3.5 sm:px-5">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="rounded-md px-1 py-1 text-[14px] font-semibold text-[#65676B] hover:underline"
          >
            View {hidden} more {hidden === 1 ? "comment" : "comments"}
          </button>
        </div>
      )}
      <p className="border-t border-[#E4E6EB] bg-[#F7F8FA] px-4 py-2 text-[11.5px] text-[#65676B] sm:px-5">
        Transcribed from a screenshot captured {shortDate(t.capturedAt)}; names, photos and profile links removed.
      </p>
    </article>
  );
}
