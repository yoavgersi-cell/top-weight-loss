import Link from "next/link";
import type { Expert } from "@/lib/config";

function initials(name: string) {
  const words = name.replace(/^The\s+/i, "").split(/\s+/).filter(Boolean);
  const letters = words.length >= 2 ? words[0][0] + words[words.length - 1][0] : (words[0]?.slice(0, 2) ?? "");
  return letters.toUpperCase();
}

// Reusable credibility byline. Drops into battle pages, reviews, articles.
// `label` sets the framing: "Analysis by", "Reviewed by", "Written by".
export function ExpertByline({
  expert,
  label = "Analysis by",
  href = "/weight-loss/about",
  showRole = true,
  compact = false,
}: {
  expert: Expert;
  label?: string;
  href?: string;
  /** Hide the trailing "· <role>" - keeps the byline to name only. */
  showRole?: boolean;
  /** Smaller avatar + tighter padding for a lower-weight metadata line. */
  compact?: boolean;
}) {
  const credit = expert.credentials ? `${expert.name}, ${expert.credentials}` : expert.name;

  return (
    <Link
      href={href}
      className={`group inline-flex items-center rounded-full border border-gray-200 bg-white transition-colors hover:border-[#0C4B75]/30 ${
        compact ? "gap-2.5 py-1 pl-1 pr-3.5" : "gap-3 py-1.5 pl-1.5 pr-4"
      }`}
    >
      <span
        className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0C4B75]/10 text-[12px] font-bold text-[#0C4B75] ${
          compact ? "h-7 w-7" : "h-9 w-9"
        }`}
      >
        {expert.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={expert.avatar} alt={expert.name} className="h-full w-full object-cover" loading="lazy" decoding="async" />
        ) : (
          initials(expert.name)
        )}
      </span>
      <span className="leading-tight">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.05em] text-gray-400">
          {label}
        </span>
        <span className="block text-[13px] font-bold text-[#191919] group-hover:text-[#0C4B75]">
          {credit}
          {showRole && <span className="ml-1 font-medium text-gray-400">· {expert.role}</span>}
        </span>
      </span>
    </Link>
  );
}
