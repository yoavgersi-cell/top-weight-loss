import { Users } from "lucide-react";

// Desktop-only speech bubble anchored to the #1 card's CTA. Its tail kisses the
// CTA's top-left corner and it animates in ~2.6s after load (pure CSS delay, so
// it works without client JS). Number + text come from config.cardSocialProof.
export function SocialProofBubble({ number, text }: { number: string; text: string }) {
  return (
    <div className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block">
      <div
        className="absolute bottom-2.5 right-[-6px] w-[250px] origin-bottom-right opacity-0"
        style={{ animation: "socialProofPop 0.5s cubic-bezier(0.18,0.89,0.32,1.28) 2.6s forwards" }}
      >
        <div className="relative rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_12px_34px_-8px_rgba(16,24,40,0.28)] ring-1 ring-black/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
              <span className="absolute inset-0 rounded-full ring-2 ring-[#E8536A]/40" />
              <Users className="h-[18px] w-[18px] text-[#E8536A]" strokeWidth={2} />
            </span>
            <p className="text-[13px] leading-[1.35] text-gray-600">
              <span className="font-extrabold text-[#191919]">{number}</span> {text}
            </p>
          </div>
          {/* Speech tail — points down to the CTA's top-left corner */}
          <span className="absolute -bottom-[6px] right-6 h-3.5 w-3.5 rotate-45 rounded-[3px] bg-white shadow-[3px_3px_6px_-3px_rgba(16,24,40,0.28)]" />
        </div>
      </div>
    </div>
  );
}
