import { SOCIAL_PROFILES, type SocialProfile } from "@/lib/social";

// ───── Social icon row ─────
// Brand marks inline as SVG (no icon-font, no extra request). rel="me" tells
// crawlers the profile is ours; target=_blank because it leaves the site.

function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function InstagramMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YouTubeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
    </svg>
  );
}

export function SocialMark({ id, className }: { id: SocialProfile["id"]; className?: string }) {
  if (id === "instagram") return <InstagramMark className={className} />;
  if (id === "youtube") return <YouTubeMark className={className} />;
  return <LinkedInMark className={className} />;
}

export function SocialLinks({
  className = "",
  size = "sm",
  withLabels = false,
}: {
  className?: string;
  size?: "sm" | "md";
  withLabels?: boolean;
}) {
  const icon = size === "md" ? "h-5 w-5" : "h-4 w-4";
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {SOCIAL_PROFILES.map((p) => (
        <li key={p.id}>
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label={withLabels ? undefined : `Treatments Hub on ${p.label}`}
            className={
              withLabels
                ? "inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-[13.5px] font-semibold text-gray-700 transition-colors hover:border-[#0C4B75]/40 hover:text-[#0C4B75]"
                : "inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-[#0C4B75]"
            }
          >
            <SocialMark id={p.id} className={icon} />
            {withLabels && (
              <span>
                {p.label} <span className="font-normal text-gray-400">{p.handle}</span>
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
