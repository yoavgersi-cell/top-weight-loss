import { PRODUCT_CATALOG, type CatalogProduct } from "@/lib/product-catalog";
import { TRIO_FACTS } from "@/lib/three-way";

// ───── Keyword landing pages: what makes each one its own page ─────
// The seven weight-loss landings (/semaglutide, /tirzepatide, /wegovy-providers,
// /ozempic-for-weight-loss, /best-weight-loss-injections,
// /best-online-weight-loss-programs, /cheapest-weight-loss-medication) used to
// render the ranking's eleven cards unchanged - 91-93% of their text was the
// ranking page's text. Each landing now carries the page's own facts on every
// card: the verified price for the molecule or brand the page is about, pulled
// from the product catalog (and, for a provider the catalog does not carry,
// the same verified fact line the three-way comparisons publish). A molecule
// page lists only providers that publish that molecule. Nothing is invented:
// a provider with no verified figure for the page's subject gets no line, and
// on a molecule page it is left out.

type Medication = CatalogProduct["medication"];

type Focus = {
  medication?: Medication;
  /** Brand-name product the page is about; its cataloged price leads the line. */
  brand?: "Ozempic" | "Wegovy";
  /** Molecule and brand pages list only providers with a verified figure. */
  restrict: boolean;
};

const FOCUS: Record<string, Focus> = {
  semaglutide: { medication: "semaglutide", restrict: true },
  tirzepatide: { medication: "tirzepatide", restrict: true },
  "ozempic-for-weight-loss": { medication: "semaglutide", brand: "Ozempic", restrict: true },
  "wegovy-providers": { medication: "semaglutide", brand: "Wegovy", restrict: true },
  "cheapest-weight-loss-medication": { restrict: false },
  "best-weight-loss-injections": { restrict: false },
  "best-online-weight-loss-programs": { restrict: false },
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const isBrand = (p: CatalogProduct) => /^brand-name/i.test(p.name);
const byPrice = (a: CatalogProduct, b: CatalogProduct) =>
  (Number(a.price.replace(/[^0-9]/g, "")) || 9999) - (Number(b.price.replace(/[^0-9]/g, "")) || 9999);

function compoundedLine(providerId: string, medication: Medication): { text: string; source: "catalog" | "fact" } | undefined {
  const p = PRODUCT_CATALOG.filter((x) => x.providerId === providerId && x.medication === medication && !isBrand(x)).sort(byPrice)[0];
  if (p) return { text: `${cap(medication)} ${p.price}/mo · ${p.priceNote}`, source: "catalog" };
  // Providers the catalog does not carry (e.g. ro) fall back to the verified
  // fact line published on the three-way comparisons - which may itself be a
  // brand-name figure, so callers never label it "compounded".
  const fact = TRIO_FACTS[providerId]?.[medication];
  return fact ? { text: `${cap(medication)}: ${fact}`, source: "fact" } : undefined;
}

function brandLine(providerId: string, brand: "Ozempic" | "Wegovy"): string | undefined {
  const p = PRODUCT_CATALOG.find((x) => x.providerId === providerId && isBrand(x) && x.name.includes(brand));
  if (!p) return undefined;
  const note = p.priceNote.replace(/^brand-name;\s*/i, "");
  return `Brand-name ${brand} ${p.price}/mo · ${note}`;
}

export function landingFocusFor(
  slug: string,
  providerIds: string[],
): { priceNotes: Record<string, string>; providerIds: string[] } | null {
  const focus = FOCUS[slug];
  if (!focus) return null;
  const priceNotes: Record<string, string> = {};
  const kept: string[] = [];
  for (const id of providerIds) {
    let line: string | undefined;
    if (focus.brand && focus.medication) {
      // Brand page: the brand price where the provider sells it, otherwise the
      // compounded alternative for the same molecule. A fact-line fallback is
      // printed as-is (it may be the brand itself, e.g. ro's Wegovy pen).
      const b = brandLine(id, focus.brand);
      const c = compoundedLine(id, focus.medication);
      const compounded = c?.source === "catalog" ? c.text : undefined;
      line = b
        ? compounded
          ? `${b} · compounded from ${compounded.split(" ")[1]}`
          : b
        : compounded
          ? `No brand-name ${focus.brand}; compounded ${compounded.charAt(0).toLowerCase()}${compounded.slice(1)}`
          : c?.text;
    } else if (focus.medication) {
      line = compoundedLine(id, focus.medication)?.text;
    } else {
      // Generic pages: both molecules' verified figures on one line.
      const s = PRODUCT_CATALOG.filter((x) => x.providerId === id && x.medication === "semaglutide" && !isBrand(x)).sort(byPrice)[0];
      const t = PRODUCT_CATALOG.filter((x) => x.providerId === id && x.medication === "tirzepatide" && !isBrand(x)).sort(byPrice)[0];
      const parts = [s && `Semaglutide ${s.price}/mo`, t && `Tirzepatide ${t.price}/mo`].filter(Boolean);
      line = parts.length ? parts.join(" · ") : undefined;
    }
    if (line) priceNotes[id] = line;
    if (line || !focus.restrict) kept.push(id);
  }
  return { priceNotes, providerIds: kept };
}
