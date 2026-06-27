import Link from "next/link";
import { Shield, Users, Award, Info } from "lucide-react";
import type { SidebarConfig, Provider } from "@/lib/config";

function SidebarCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-[#EAEAEA] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

export function Sidebar({ config, providers }: { config: SidebarConfig; providers: Provider[] }) {
  // Providers are already passed in ranking order from the page
  const topProviders = providers.slice(0, 5);
  return (
    <aside className="hidden lg:block w-[340px] shrink-0">
      <div className="sticky top-6 space-y-4">
        {/* Card 1: Social Proof */}
        <SidebarCard>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0C4B75]/8">
              <Users className="h-6 w-6 text-[#0C4B75]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[22px] font-extrabold text-[#191919] leading-tight">{config.socialProofNumber}</p>
              <p className="text-[13px] leading-snug text-gray-400">
                {config.socialProofText}
              </p>
            </div>
          </div>
        </SidebarCard>

        {/* Card 2: Secure & Confidential */}
        <SidebarCard>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#09553D]/8">
              <Shield className="h-6 w-6 text-[#09553D]" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#191919]">{config.secureTitle}</p>
              <p className="text-[13px] leading-snug text-gray-400">
                {config.secureText}
              </p>
            </div>
          </div>
        </SidebarCard>

        {/* Card 3: Featured Provider Image */}
        <a href={config.featuredImageLink} className="block overflow-hidden rounded-xl border border-[#EAEAEA]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={config.featuredImageUrl}
            alt={config.featuredImageAlt}
            className="w-full h-auto"
          />
        </a>

        {/* Card 4: Editorial Reviews */}
        <SidebarCard className="!bg-[#fafafa]">
          <h3 className="mb-6 text-[20px] font-bold text-[#191919]">Editorial Reviews</h3>
          <div className="space-y-5">
            {topProviders.map((p) => (
              <Link
                key={p.id}
                href={`/reviews/${p.id}`}
                className="flex items-center gap-4 group"
              >
                <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-white border border-gray-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.smallLogo || p.logo}
                    alt={p.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#191919] group-hover:text-[#0B5E9E] transition-colors">{p.name}</p>
                  <p className="text-[13px] text-gray-500">Read Review</p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            href="/reviews"
            className="mt-8 block text-[14px] font-semibold text-[#0B5E9E] hover:underline"
          >
            Read All Reviews
          </Link>
        </SidebarCard>

        {/* Card 5: Ranking Methodology */}
        <SidebarCard>
          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50">
              <Award className="h-5 w-5 text-amber-500" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[15px] font-bold text-[#191919]">Our Ranking Methodology</p>
              <p className="mt-0.5 text-[13px] text-gray-400">
                Provider scores are based on:
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[#191919]">Medical credibility</span>
              <div className="h-1.5 w-24 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full w-[92%] rounded-full bg-amber-400" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[#191919]">Customer satisfaction</span>
              <div className="h-1.5 w-24 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full w-[85%] rounded-full bg-amber-400" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-[#191919]">Pricing & value</span>
              <div className="h-1.5 w-24 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full w-[78%] rounded-full bg-amber-400" />
              </div>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-gray-400">
            Scores are updated regularly by our editorial team.
          </p>
        </SidebarCard>

        {/* Card 5: Editorial Disclosure */}
        <SidebarCard>
          <div className="flex items-start gap-2">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={1.5} />
            <p className="text-xs leading-relaxed text-gray-400">
              We may earn compensation from some providers featured on this page. Rankings and reviews are determined independently by our editorial team.
            </p>
          </div>
        </SidebarCard>
      </div>
    </aside>
  );
}
