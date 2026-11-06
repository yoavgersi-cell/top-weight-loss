// ───── Chat helper: flows and match data ─────
// A guided helper, not a free-text bot: every turn is one question with
// tap-to-answer options, and every path ends at one partner provider. The
// flow is plain data so each category can get its own (weight loss first,
// Nov 6, 2026; the other categories reuse the same component).
//
// Copy rules (same as the rest of the site):
//   - prices are never typed here: they come from the verified price index
//     at render time (buildChatMatches), so the helper can't drift from it;
//   - each "why" line is a fact already verified on the provider's review or
//     comparison pages, attributed where it is the provider's own claim;
//   - no outcome promises, no urgency, and the clinician always decides.

import { PRICE_INDEX, priceValue } from "@/lib/price-index";
import type { SiteConfig } from "@/lib/config";

/** The helper's display name. One place to rename it. */
export const CHATBOT_NAME = "Pip";

export type ChatOption = {
  id: string;
  label: string;
  /** The next step id, or "match:<providerId>". */
  next: string;
  /** A short bot reply shown right after this answer, before the next step. */
  reply?: string;
};

export type ChatStep = {
  id: string;
  /** Bot messages, in order; the last one is the question. */
  say: string[];
  options: ChatOption[];
};

export type ChatFlow = {
  vertical: string;
  start: string;
  steps: Record<string, ChatStep>;
  /** Teaser bubble next to the launcher. */
  teaser: string;
  /** Subtitle under the helper's name in the panel header. */
  subtitle: string;
  /** Where "see every provider" points. */
  allHref: string;
  /** Closing tip, keyed by the answer to the given step. */
  tips: { stepId: string; byAnswer: Record<string, { text: string; href?: string; linkLabel?: string }> };
};

export type ChatPrice = { label: string; price: string; note: string };

export type ChatMatch = {
  id: string;
  name: string;
  logo: string;
  href: string;
  /** false when there is no tracking link and href is our review page. */
  external: boolean;
  reviewHref: string;
  rank?: number;
  trustpilot?: { rating: string; count: string };
  /** Verified prices, keyed by the medication option id. */
  prices: Record<string, ChatPrice>;
  /** Shown instead of prices when the provider has none in the index. */
  priceNote?: string;
  commitment?: string;
  why: string[];
  alt?: { id: string; name: string; compareHref: string };
};

// ── Weight loss ──
const WEIGHT_LOSS_FLOW: ChatFlow = {
  vertical: "weight-loss",
  start: "first",
  teaser: "Hi! Looking for a GLP-1 provider? I can help 😊",
  subtitle: "Finds your GLP-1 match in 4 quick taps",
  allHref: "/weight-loss",
  steps: {
    first: {
      id: "first",
      say: [
        `Hi, I'm ${CHATBOT_NAME}! 👋`,
        "I'll help you find an online GLP-1 provider that fits you. Just 4 quick questions.",
        "Is this your first time trying a GLP-1 medication?",
      ],
      options: [
        { id: "yes", label: "Yes, it's my first time", next: "med", reply: "Welcome! You're in the right place." },
        { id: "no", label: "No, I've used one before", next: "med", reply: "Great, that helps." },
      ],
    },
    med: {
      id: "med",
      say: ["Which medication are you interested in?"],
      options: [
        { id: "semaglutide", label: "Semaglutide", next: "budget" },
        { id: "tirzepatide", label: "Tirzepatide", next: "budget" },
        {
          id: "unsure",
          label: "Not sure yet",
          next: "budget",
          reply:
            "No problem! Both are weekly GLP-1 injections. Semaglutide (the ingredient in Wegovy and Ozempic) usually costs less; tirzepatide (Zepbound, Mounjaro) led to more weight loss on average in trials. A licensed clinician helps you decide.",
        },
      ],
    },
    budget: {
      id: "budget",
      say: ["Is a budget-friendly price your top priority?"],
      options: [
        { id: "yes", label: "Yes, keep it affordable 💸", next: "commit" },
        { id: "no", label: "No, other things matter more", next: "priority" },
      ],
    },
    commit: {
      id: "commit",
      say: ["Last one! For the very lowest price, would you commit to a 12-month plan?"],
      options: [
        { id: "yes", label: "Yes, lowest price wins", next: "match:wellmedr" },
        { id: "no", label: "No, I want month to month", next: "match:embody" },
      ],
    },
    priority: {
      id: "priority",
      say: ["Last one! What matters most to you?"],
      options: [
        { id: "support", label: "A real team I can reach 24/7", next: "match:eden" },
        { id: "brand", label: "Brand-name meds or using my insurance", next: "match:ro" },
      ],
    },
  },
  tips: {
    stepId: "first",
    byAnswer: {
      yes: {
        text: "Tip for first-timers: the online intake takes a few minutes, and a licensed clinician decides whether treatment is right for you.",
        href: "/weight-loss/articles/how-to-start-glp1-treatment-online",
        linkLabel: "How starting online works",
      },
      no: {
        text: "Switching? Tell your new prescriber your current medication and dose so they can decide how to continue.",
        href: "/weight-loss/switch-from-ozempic",
        linkLabel: "How to switch without a gap",
      },
    },
  },
};

export const CHAT_FLOWS: Record<string, ChatFlow> = {
  "weight-loss": WEIGHT_LOSS_FLOW,
};

// Facts behind each weight-loss match. Each line is already verified on the
// provider's review / comparison pages (see config-store and price-index).
const WL_MATCH_COPY: Record<string, { why: string[]; priceNote?: string; alt: { id: string; compareSlug: string } }> = {
  wellmedr: {
    why: [
      "The lowest verified GLP-1 price in our index",
      "The same price at every dose",
      "Money-back guarantee if you don't lose weight in 90 days, per welludr (check the terms)",
    ],
    alt: { id: "embody", compareSlug: "embody-vs-wellmedr" },
  },
  embody: {
    why: [
      "Month to month, cancel anytime",
      "Ships in 1-2 days, cold-chain",
      "Full refund if you're not approved, per embody",
    ],
    alt: { id: "wellmedr", compareSlug: "embody-vs-wellmedr" },
  },
  eden: {
    why: [
      "24/7 human support with doctor-guided care",
      "One flat price every month, at every dose",
      "No membership and no long-term plan",
    ],
    alt: { id: "embody", compareSlug: "eden-vs-embody" },
  },
  ro: {
    why: [
      "FDA-approved brand-name medication: the Wegovy pill and pen and Zepbound",
      "Insurance can pay for the medication when your plan covers it",
      "A large, established brand with its own pharmacy",
    ],
    priceNote: "A membership plus the medication, billed separately; with insurance, the medication may be covered. See Ro's site for current prices.",
    alt: { id: "eden", compareSlug: "eden-vs-ro" },
  },
};

/** Server-side: the weight-loss matches with live config and price-index data. */
export function buildChatMatches(config: SiteConfig, prefix = "/weight-loss"): Record<string, ChatMatch> {
  const byId = new Map(config.providers.map((p) => [p.id, p]));
  const order = config.ranking?.providerOrder ?? [];
  const out: Record<string, ChatMatch> = {};
  for (const [id, copy] of Object.entries(WL_MATCH_COPY)) {
    const p = byId.get(id);
    if (!p) continue;
    // No live tracking link (e.g. a local build without the CMS data): the
    // match still shows, and its button goes to our review instead.
    const external = !!p.affiliateUrl && p.affiliateUrl !== "#";
    const row = PRICE_INDEX.find((r) => r.providerId === id);
    const prices: Record<string, ChatPrice> = {};
    if (row?.semaglutide) prices.semaglutide = { label: "Semaglutide", price: row.semaglutide.price, note: row.semaglutide.note };
    if (row?.tirzepatide) prices.tirzepatide = { label: "Tirzepatide", price: row.tirzepatide.price, note: row.tirzepatide.note };
    const tp = row?.trustpilot ?? (p.trustpilotRating && p.trustpilotReviewCount ? { rating: String(p.trustpilotRating), count: String(p.trustpilotReviewCount) } : undefined);
    // "Lowest verified price" is only claimed while it is still true.
    const lowest = Math.min(...PRICE_INDEX.map((r) => priceValue(r.semaglutide)).filter((v): v is number => typeof v === "number"));
    const why = copy.why.filter((w) => !/^The lowest verified/.test(w) || priceValue(row?.semaglutide ?? null) === lowest);
    const rank = order.indexOf(id);
    const alt = byId.get(copy.alt.id);
    out[id] = {
      id,
      name: p.name,
      logo: p.logo,
      href: external ? p.affiliateUrl : `${prefix}/reviews/${id}`,
      external,
      reviewHref: `${prefix}/reviews/${id}`,
      rank: rank >= 0 ? rank + 1 : undefined,
      trustpilot: tp ?? undefined,
      prices,
      priceNote: Object.keys(prices).length ? undefined : copy.priceNote,
      commitment: row?.commitment,
      why,
      alt: alt ? { id: alt.id, name: alt.name, compareHref: `${prefix}/${copy.alt.compareSlug}` } : undefined,
    };
  }
  return out;
}
