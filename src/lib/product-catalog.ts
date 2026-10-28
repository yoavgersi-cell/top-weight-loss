// ───── The product catalog ─────
// Ecommerce-style product entries for the shopping carousel. Prices are the
// same verified figures as the price index (one source of truth for numbers,
// this file adds the product framing + images). Images are provider-published
// product creatives supplied by the site operator - never generated. A null
// image renders the provider-logo tile fallback; never invent a product shot.

export type CatalogProduct = {
  id: string;
  providerId: string;
  /** Which vertical's pages show the product. Defaults to weight-loss. */
  vertical?: "weight-loss" | "hrt";
  /** Shopping-card product title, e.g. "Compounded Semaglutide Injection". */
  name: string;
  medication: "semaglutide" | "tirzepatide" | "estradiol" | "progesterone" | "estrogen-progesterone";
  format: "injection" | "drops" | "tablet" | "patch" | "cream" | "capsule" | "pill-or-patch" | "vaginal";
  /** Short form label for the image chip on HRT cards, e.g. "Patch", "Body cream". */
  form?: string;
  /** Verified regulatory status; set only when confirmed from the provider's own copy. */
  fdaStatus?: "fda-approved" | "compounded";
  /** One factual sentence (HRT cards): what it is and what it is used for. */
  description?: string;
  /** Headline monthly price, digits only after $ (used for sorting + schema). */
  price: string;
  /** Shown before the price, e.g. "From" for a starting price. */
  pricePrefix?: string;
  /** Shown after the price; defaults to "/mo". */
  priceUnit?: string;
  /** Struck-through regular price when the headline is promotional. */
  regularPrice?: string;
  /** Short sale-end label, e.g. "Sep 20". Shows a "Sale ends" badge when set. */
  saleEnds?: string;
  /** The honest condition attached to the price. */
  priceNote: string;
  shipping: string;
  image: string | null;
};

export const PRODUCT_CATALOG: CatalogProduct[] = [
  // ── Semaglutide ──
  {
    id: "wellmedr-semaglutide",
    providerId: "wellmedr",
    name: "Compounded Semaglutide (GLP-1) Injection",
    medication: "semaglutide",
    format: "injection",
    price: "$49",
    priceNote: "12-month plan; same price at every dose",
    shipping: "Free discreet shipping, 3-5 day delivery",
    image: "/products/wellmedr-semaglutide.webp",
  },
  {
    id: "embody-semaglutide",
    providerId: "embody",
    name: "Compounded Semaglutide Injection",
    medication: "semaglutide",
    format: "injection",
    price: "$49",
    regularPrice: "$79",
    priceNote: "month-to-month; pre-Black Friday sale seen Oct 28, 2026",
    shipping: "Free 1-2 day shipping",
    image: "/products/embody-semaglutide.webp",
  },
  {
    id: "eden-semaglutide",
    providerId: "eden",
    name: "Compounded Semaglutide Injection",
    medication: "semaglutide",
    format: "injection",
    price: "$99",
    priceNote: "flat every month, every dose; no membership",
    shipping: "Home delivery",
    image: "/products/eden-semaglutide.webp",
  },
  // Luvo (Oct 25, 2026): prices read from the provider's product pages;
  // billed every 4 weeks. No operator-supplied product shots yet, so the
  // logo tile renders until they are added under /public/products.
  {
    id: "luvo-semaglutide",
    providerId: "luvo",
    name: "Compounded Semaglutide Injection",
    medication: "semaglutide",
    format: "injection",
    price: "$104.50",
    regularPrice: "$209",
    priceNote: "50% off the first 4 weeks; $209 every 4 weeks from the second delivery",
    shipping: "Discreet shipping included",
    image: null,
  },
  {
    id: "luvo-semaglutide-tablets",
    providerId: "luvo",
    name: "Compounded Semaglutide Tablets",
    medication: "semaglutide",
    format: "tablet",
    price: "$129.50",
    regularPrice: "$259",
    priceNote: "50% off the first 4 weeks; $259 every 4 weeks from the second delivery",
    shipping: "Discreet shipping included",
    image: null,
  },
  {
    id: "altrx-semaglutide",
    providerId: "altrx",
    name: "Compounded GLP-1 (Semaglutide) Injection",
    medication: "semaglutide",
    format: "injection",
    price: "$89",
    regularPrice: "$199",
    priceNote: "flat at every dose",
    shipping: "Free overnight cold shipping",
    image: "/products/altrx-glp1.webp",
  },
  {
    id: "medvi-semaglutide",
    providerId: "medvi",
    name: "Compounded Semaglutide (GLP-1) Injection",
    medication: "semaglutide",
    format: "injection",
    price: "$99",
    regularPrice: "$199",
    priceNote: "promo; all-inclusive with coaching",
    shipping: "Free fast & discreet shipping",
    image: "/products/medvi-semaglutide.webp",
  },
  {
    id: "healthrx-semaglutide",
    providerId: "healthrx",
    name: "Compounded Semaglutide Injection",
    medication: "semaglutide",
    format: "injection",
    price: "$99",
    priceNote: "12-mo prepaid - $1,188 at checkout",
    shipping: "Free overnight shipping",
    image: null,
  },
  {
    id: "directmeds-semaglutide-injection",
    providerId: "directmeds",
    name: "Compounded Semaglutide Injection",
    medication: "semaglutide",
    format: "injection",
    price: "$147",
    priceNote: "flat at every dose",
    shipping: "Free 1-2 day shipping",
    image: "/products/directmeds-semaglutide-injection.webp",
  },
  {
    id: "directmeds-semaglutide-drops",
    providerId: "directmeds",
    name: "Semaglutide Sublingual Drops - No Needles",
    medication: "semaglutide",
    format: "drops",
    price: "$147",
    priceNote: "flat at every dose",
    shipping: "Free 1-2 day shipping",
    image: "/products/directmeds-semaglutide-drops.webp",
  },
  {
    id: "sprout-semaglutide",
    providerId: "sprout",
    name: "Compounded Semaglutide Injection",
    medication: "semaglutide",
    format: "injection",
    price: "$149",
    priceNote: "starting price",
    shipping: "Ships within 2 days",
    image: "/products/sprout-semaglutide.webp",
  },
  {
    id: "trimrx-semaglutide",
    providerId: "trimrx",
    name: "Compounded Semaglutide Injection",
    medication: "semaglutide",
    format: "injection",
    price: "$149",
    regularPrice: "$289",
    priceNote: "same price at every dose; $140 discount applied",
    shipping: "Free discreet 1-2 day delivery",
    image: "/products/trimrx-semaglutide.webp",
  },
  {
    id: "shed-semaglutide",
    providerId: "shed",
    name: "Compounded Semaglutide Injection",
    medication: "semaglutide",
    format: "injection",
    price: "$199",
    priceNote: "20% off month one; coaching included",
    shipping: "Home delivery included, 4-8 day total turnaround",
    image: "/products/shed-semaglutide.webp",
  },
  // ── Tirzepatide ──
  {
    id: "wellmedr-tirzepatide",
    providerId: "wellmedr",
    name: "Compounded Tirzepatide (GLP-1/GIP) Injection",
    medication: "tirzepatide",
    format: "injection",
    price: "$89",
    priceNote: "shipped every 4 weeks",
    shipping: "Free discreet shipping, 3-5 day delivery",
    image: "/products/wellmedr-tirzepatide.webp",
  },
  {
    id: "embody-tirzepatide",
    providerId: "embody",
    name: "Compounded Tirzepatide Injection",
    medication: "tirzepatide",
    format: "injection",
    price: "$99",
    regularPrice: "$129",
    priceNote: "month-to-month; pre-Black Friday sale seen Oct 28, 2026",
    shipping: "Free 1-2 day shipping",
    image: "/products/embody-tirzepatide.webp",
  },
  {
    id: "directmeds-tirzepatide-injection",
    providerId: "directmeds",
    name: "Compounded Tirzepatide Injection",
    medication: "tirzepatide",
    format: "injection",
    price: "$147",
    priceNote: "flat at every dose",
    shipping: "Free 1-2 day shipping",
    image: "/products/directmeds-tirzepatide-injection.webp",
  },
  {
    id: "directmeds-tirzepatide-drops",
    providerId: "directmeds",
    name: "Tirzepatide Sublingual Drops - No Needles",
    medication: "tirzepatide",
    format: "drops",
    price: "$147",
    priceNote: "flat at every dose",
    shipping: "Free 1-2 day shipping",
    image: "/products/directmeds-tirzepatide-drops.webp",
  },
  {
    id: "eden-tirzepatide",
    providerId: "eden",
    name: "Compounded Tirzepatide Injection",
    medication: "tirzepatide",
    format: "injection",
    price: "$129",
    priceNote: "flat every month, every dose; no membership",
    shipping: "Home delivery",
    image: "/products/eden-tirzepatide.webp",
  },
  {
    id: "luvo-tirzepatide",
    providerId: "luvo",
    name: "Compounded Tirzepatide Injection",
    medication: "tirzepatide",
    format: "injection",
    price: "$124.50",
    regularPrice: "$249",
    priceNote: "50% off the first 4 weeks; $249 every 4 weeks from the second delivery",
    shipping: "Discreet shipping included",
    image: null,
  },
  {
    id: "altrx-tirzepatide",
    providerId: "altrx",
    name: "Compounded GLP-1 + GIP (Tirzepatide) Injection",
    medication: "tirzepatide",
    format: "injection",
    price: "$149",
    regularPrice: "$299",
    priceNote: "flat at every dose",
    shipping: "Free overnight cold shipping",
    image: "/products/altrx-glp1-tight.webp",
  },
  {
    id: "medvi-tirzepatide",
    providerId: "medvi",
    name: "Compounded Tirzepatide (GLP-1/GIP) Injection",
    medication: "tirzepatide",
    format: "injection",
    price: "$166",
    regularPrice: "$299",
    priceNote: "promo; all-inclusive with coaching",
    shipping: "Free fast & discreet shipping",
    image: "/products/medvi-tirzepatide.webp",
  },
  {
    id: "healthrx-tirzepatide",
    providerId: "healthrx",
    name: "Compounded Tirzepatide Injection",
    medication: "tirzepatide",
    format: "injection",
    price: "from $179",
    priceNote: "per month",
    shipping: "Free overnight shipping",
    image: null,
  },
  {
    id: "sprout-tirzepatide",
    providerId: "sprout",
    name: "Compounded Tirzepatide Injection",
    medication: "tirzepatide",
    format: "injection",
    price: "$199",
    priceNote: "starting price",
    shipping: "Ships within 2 days",
    image: "/products/sprout-tirzepatide.webp",
  },
  {
    id: "trimrx-tirzepatide",
    providerId: "trimrx",
    name: "Compounded Tirzepatide (GLP-1 + GIP) Injection",
    medication: "tirzepatide",
    format: "injection",
    price: "$259",
    priceNote: "custom dosing, unlimited check-ins",
    shipping: "Free discreet 1-2 day delivery",
    image: "/products/trimrx-tirzepatide.webp",
  },
  {
    id: "shed-tirzepatide",
    providerId: "shed",
    name: "Compounded Tirzepatide Injection",
    medication: "tirzepatide",
    format: "injection",
    price: "$299",
    priceNote: "20% off month one; coaching included",
    shipping: "Home delivery included, 4-8 day total turnaround",
    image: "/products/shed-tirzepatide.webp",
  },
  // ── Brand-name ──
  // welludr brand shelf (operator-supplied card creatives, Sept 2026):
  // month-to-month plans that include the licensed provider review, a
  // Medical Weight-Care Coach and tailored dosage adjustments.
  {
    id: "wellmedr-ozempic",
    providerId: "wellmedr",
    name: "Brand-Name Ozempic (Semaglutide) Pen",
    medication: "semaglutide",
    format: "injection",
    price: "$1,399",
    priceNote: "brand-name; starting price, month-to-month",
    shipping: "Provider review, coach and dosage adjustments included",
    image: "/products/wellmedr-ozempic.webp",
  },
  {
    id: "wellmedr-zepbound",
    providerId: "wellmedr",
    name: "Brand-Name Zepbound (Tirzepatide) Pen",
    medication: "tirzepatide",
    format: "injection",
    price: "$1,599",
    priceNote: "brand-name; starting price, month-to-month",
    shipping: "Provider review, coach and dosage adjustments included",
    image: "/products/wellmedr-zepbound.webp",
  },
  // altRx brand-name shelf (operator-supplied screenshots of altRx's product
  // pages, Oct 6, 2026): Zepbound $1,249, Wegovy $1,579, Ozempic $1,149 per
  // month, each "Rx only, single-patient-use pen", "No Price Hike, Cancel
  // anytime". Figures match the brand shelf in the price index.
  {
    id: "altrx-zepbound",
    providerId: "altrx",
    name: "Brand-Name Zepbound (Tirzepatide) Pen",
    medication: "tirzepatide",
    format: "injection",
    price: "$1,249",
    priceNote: "brand-name; flat, no price hike; cancel anytime",
    shipping: "Free overnight cold shipping",
    image: "/products/altrx-zepbound.webp",
  },
  {
    id: "altrx-wegovy",
    providerId: "altrx",
    name: "Brand-Name Wegovy (Semaglutide) Pen",
    medication: "semaglutide",
    format: "injection",
    price: "$1,579",
    priceNote: "brand-name; flat, no price hike; cancel anytime",
    shipping: "Free overnight cold shipping",
    image: "/products/altrx-wegovy.webp",
  },
  {
    id: "altrx-ozempic",
    providerId: "altrx",
    name: "Brand-Name Ozempic (Semaglutide) Pen",
    medication: "semaglutide",
    format: "injection",
    price: "$1,149",
    priceNote: "brand-name; flat, no price hike; cancel anytime",
    shipping: "Free overnight cold shipping",
    image: "/products/altrx-ozempic.webp",
  },
  {
    id: "luvo-ozempic",
    providerId: "luvo",
    name: "Brand-Name Ozempic (Semaglutide) Pen",
    medication: "semaglutide",
    format: "injection",
    price: "$1,299",
    priceNote: "brand-name; 4 weeks of injections, delivered every 4 weeks; cancel anytime",
    shipping: "Discreet shipping included",
    image: null,
  },
  {
    id: "sprout-wegovy",
    providerId: "sprout",
    name: "Brand-Name Wegovy (Semaglutide) Pen",
    medication: "semaglutide",
    format: "injection",
    price: "$1,799",
    priceNote: "brand-name; starting price",
    shipping: "Ships within 2 days",
    image: "/products/sprout-wegovy.webp",
  },

  // ═════ HRT (treatmentshub.com/hrt) ═════
  // Oct 25, 2026: the HRT product shelf, the idea ported from hrtwomen.com's
  // carousel with the hub's own verified figures. Images are crops of the
  // providers' product creatives supplied by the operator. Honesty rules:
  //  - fdaStatus only where the provider's own copy confirms it (Winona:
  //    tablets, patch and progesterone capsules FDA-approved; body creams
  //    compounded). Gala's approved-vs-compounded status is unresolved, so
  //    its entries carry no badge.
  //  - Prices match src/lib/seeds/hrt.ts: Winona per-product list ($89
  //    creams, $149 patch); Gala's hormone-therapy page showed a flat $69 a
  //    month on the operator's Oct 8, 2026 screenshots ("from $69" on its
  //    main site), covering every product in the plan. Gala has also been
  //    quoted "from $79" elsewhere - the Gala cost guide explains the spread.
  //  - No marketing adjectives in names or descriptions; plain product facts.
  {
    id: "winona-estrogen-progesterone-cream",
    providerId: "winona",
    vertical: "hrt",
    name: "Estrogen + Progesterone Body Cream",
    medication: "estrogen-progesterone",
    format: "cream",
    form: "Body cream",
    fdaStatus: "compounded",
    description:
      "A compounded body cream combining estrogen and progesterone, applied to the skin for whole-body menopause symptoms.",
    price: "$89",
    priceNote: "Monthly subscription; physician review, messaging and shipping included",
    shipping: "Free shipping",
    image: "/products/winona-estrogen-progesterone-cream.webp",
  },
  {
    id: "winona-estrogen-cream",
    providerId: "winona",
    vertical: "hrt",
    name: "Estrogen Body Cream",
    medication: "estradiol",
    format: "cream",
    form: "Body cream",
    fdaStatus: "compounded",
    description:
      "A compounded estrogen body cream applied to the skin for hot flashes, night sweats and other whole-body symptoms.",
    price: "$89",
    priceNote: "Monthly subscription; physician review, messaging and shipping included",
    shipping: "Free shipping",
    image: "/products/winona-estrogen-cream.webp",
  },
  {
    id: "winona-estrogen-patch",
    providerId: "winona",
    vertical: "hrt",
    name: "Estrogen Patch",
    medication: "estradiol",
    format: "patch",
    form: "Patch",
    fdaStatus: "fda-approved",
    description:
      "An FDA-approved estradiol skin patch that delivers a steady dose of estrogen through the skin for hot flashes and night sweats.",
    price: "$149",
    priceNote: "Monthly subscription; physician review, messaging and shipping included",
    shipping: "Free shipping",
    image: "/products/winona-estrogen-patch.webp",
  },
  {
    id: "gala-estradiol",
    providerId: "gala",
    vertical: "hrt",
    name: "Estradiol (Pill or Patch)",
    medication: "estradiol",
    format: "pill-or-patch",
    form: "Pill or patch",
    description:
      "Estradiol, the main estrogen the ovaries stop making, as a daily pill or a skin patch for hot flashes, sleep and mood symptoms.",
    price: "$69",
    pricePrefix: "From",
    priceNote: "One flat plan; clinician, check-ins, medication and 1-2 day shipping included",
    shipping: "Free 1-2 day shipping",
    image: "/products/gala-estradiol.webp",
  },
  {
    id: "gala-progesterone",
    providerId: "gala",
    vertical: "hrt",
    name: "Progesterone",
    medication: "progesterone",
    format: "capsule",
    form: "Oral or vaginal",
    description:
      "Progesterone that protects the uterine lining when you take estrogen and still have a uterus; oral or vaginal as prescribed.",
    price: "$69",
    pricePrefix: "From",
    priceNote: "Covered by the same flat plan; not billed separately",
    shipping: "Free 1-2 day shipping",
    image: "/products/gala-progesterone.webp",
  },
  {
    id: "gala-vaginal-estradiol",
    providerId: "gala",
    vertical: "hrt",
    name: "Vaginal Estradiol",
    medication: "estradiol",
    format: "vaginal",
    form: "Local treatment",
    description:
      "Low-dose vaginal estradiol that treats vaginal dryness and urinary symptoms locally rather than whole-body symptoms.",
    price: "$69",
    pricePrefix: "From",
    priceNote: "Covered by the same flat plan; not billed separately",
    shipping: "Free 1-2 day shipping",
    image: "/products/gala-vaginal-estradiol.webp",
  },
];

/** Month the HRT shelf's prices were last checked against hrt.ts. */
export const HRT_PRODUCT_PRICES_AS_OF = "October 2026";

/** Numeric value for sorting ("from $179" → 179). */
export function productPriceValue(p: CatalogProduct): number {
  // Keep decimals (Luvo prices its first four weeks at $104.50), strip $ and commas.
  return Number(p.price.replace(/[^0-9.]/g, "")) || 9999;
}

/**
 * Lowest verified headline price per medication for a provider, as a snippet
 * for meta descriptions: "semaglutide from $49/mo, tirzepatide from $89/mo".
 * Reads the catalog at render time so a snippet can never lag a verified
 * price change. Empty string when the provider has no catalog entry.
 */
export function catalogPriceSnippet(providerId: string): string {
  const parts: string[] = [];
  for (const med of ["semaglutide", "tirzepatide"] as const) {
    const cheapest = PRODUCT_CATALOG.filter((p) => p.providerId === providerId && p.medication === med)
      .sort((a, b) => productPriceValue(a) - productPriceValue(b))[0];
    if (!cheapest) continue;
    const value = productPriceValue(cheapest);
    if (value === 9999) continue;
    parts.push(`${med} from $${value.toLocaleString("en-US")}/mo`);
  }
  return parts.join(", ");
}
