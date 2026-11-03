import { DisclosureBar } from "@/components/disclosure-bar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PriceTicker, type TickerItem } from "@/components/price-ticker";
import { getConfig } from "@/lib/config-store";
import { PRICE_INDEX, PRICE_INDEX_VERIFIED } from "@/lib/price-index";

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
      return { id: r.providerId, name: byId.get(r.providerId)!.name, price, href: `/weight-loss/reviews/${r.providerId}` };
    })
    .filter((it) => it.price);
}

// US-region chrome. Wraps every route in the (main) group (the whole existing
// site - URLs are unchanged by the route group). The UK region has its own
// chrome under /uk and never inherits this footer's US weight-loss drug links.
export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const items = await tickerItems();
  const verified = new Date(PRICE_INDEX_VERIFIED).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  return (
    <>
      <DisclosureBar />
      <Header />
      <PriceTicker items={items} verifiedLabel={`Prices verified ${verified}`} trackerHref="/weight-loss/glp1-price-changes" />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
