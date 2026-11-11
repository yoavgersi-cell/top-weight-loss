import { DisclosureBar } from "@/components/disclosure-bar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PriceTicker, type TickerItem, type TickerStrip } from "@/components/price-ticker";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX, PRICE_INDEX_VERIFIED } from "@/lib/price-index";
import { ED_PRICE_INDEX_VERIFIED } from "@/lib/ed-price-index";
import { ED_TRACKER_PATH, edTickerItems } from "@/lib/ed-price-feed";
import { ChatHelper } from "@/components/chat-helper";
import { buildChatMatches } from "@/lib/chatbot";

// Ticker items: each indexed provider's verified starting price, in the
// weight-loss ranking order (providers the ranking doesn't list follow in
// index order). Built here, on the server, from the price index.
async function tickerItems(): Promise<TickerItem[]> {
  const config = await getConfig("weight-loss");
  const byId = new Map(config.providers.map((p) => [p.id, p]));
  const order = config.ranking?.providerOrder ?? [];
  const rank = (id: string) => {
    const i = order.indexOf(id);
    return i < 0 ? order.length : i;
  };
  return PRICE_INDEX.filter((r) => byId.has(r.providerId))
    .map((r, i) => ({ r, i }))
    .sort((a, b) => rank(a.r.providerId) - rank(b.r.providerId) || a.i - b.i)
    .map(({ r }) => {
      const cell = r.semaglutide ?? r.tirzepatide;
      const price = cell ? cell.price : r.plan ? `plans ${r.plan.price}` : "";
      return { id: r.providerId, name: byId.get(r.providerId)!.name, price: `${price}/mo`, href: `/weight-loss/reviews/${r.providerId}` };
    })
    .filter((it) => it.price);
}

// US-region chrome. Wraps every route in the (main) group (the whole existing
// site - URLs are unchanged by the route group). The UK region has its own
// chrome under /uk and never inherits this footer's US weight-loss drug links.
export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const items = await tickerItems();
  const chatMatches = buildChatMatches(await getConfig("weight-loss"));
  const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  // One price strip per vertical with a verified index: weight loss (GLP-1)
  // and, since Nov 11, 2026, ED. Each reads its own index and tracker.
  const strips: Record<string, TickerStrip> = {
    "/weight-loss": { items, verifiedLabel: `Prices verified ${fmt(PRICE_INDEX_VERIFIED)}`, trackerHref: "/weight-loss/glp1-price-changes", ariaLabel: "Verified GLP-1 starting prices" },
    "/ed": { items: await edTickerItems(), verifiedLabel: `Prices verified ${fmt(ED_PRICE_INDEX_VERIFIED)}`, trackerHref: ED_TRACKER_PATH, ariaLabel: "Verified ED treatment starting prices" },
  };
  return (
    <>
      <DisclosureBar />
      <Header />
      <PriceTicker strips={strips} />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatHelper matches={chatMatches} verifiedLabel={`Prices verified ${fmt(PRICE_INDEX_VERIFIED)}`} />
    </>
  );
}
