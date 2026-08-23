// ───── The product catalog ─────
// Ecommerce-style product entries for the shopping carousel. Prices are the
// same verified figures as the price index (one source of truth for numbers,
// this file adds the product framing + images). Images are provider-published
// product creatives supplied by the site operator - never generated. A null
// image renders the provider-logo tile fallback; never invent a product shot.

export type CatalogProduct = {
  id: string;
  providerId: string;
  /** Shopping-card product title, e.g. "Compounded Semaglutide Injection". */
  name: string;
  medication: "semaglutide" | "tirzepatide";
  format: "injection" | "drops" | "tablet";
  /** Headline monthly price, digits only after $ (used for sorting + schema). */
  price: string;
  /** Struck-through regular price when the headline is promotional. */
  regularPrice?: string;
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
    price: "$59",
    priceNote: "12-month plan; same price at every dose",
    shipping: "Free shipping",
    image: "/products/wellmedr-semaglutide.webp",
  },
  {
    id: "embody-semaglutide",
    providerId: "embody",
    name: "Compounded Semaglutide Injection",
    medication: "semaglutide",
    format: "injection",
    price: "$69",
    regularPrice: "$79",
    priceNote: "month-to-month",
    shipping: "Free 1-2 day shipping",
    image: "/products/embody-semaglutide.webp",
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
    shipping: "Free shipping",
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
    shipping: "Free shipping",
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
    price: "$179",
    regularPrice: "$299",
    priceNote: "first month",
    shipping: "Free tracked delivery",
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
    shipping: "Home delivery included",
    image: "/products/shed-semaglutide.webp",
  },
  // ── Tirzepatide ──
  {
    id: "wellmedr-tirzepatide",
    providerId: "wellmedr",
    name: "Compounded Tirzepatide (GLP-1/GIP) Injection",
    medication: "tirzepatide",
    format: "injection",
    price: "$99",
    priceNote: "shipped every 4 weeks",
    shipping: "Free shipping",
    image: "/products/wellmedr-tirzepatide.webp",
  },
  {
    id: "embody-tirzepatide",
    providerId: "embody",
    name: "Compounded Tirzepatide Injection",
    medication: "tirzepatide",
    format: "injection",
    price: "$119",
    regularPrice: "$129",
    priceNote: "month-to-month",
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
    id: "altrx-tirzepatide",
    providerId: "altrx",
    name: "Compounded GLP-1 + GIP (Tirzepatide) Injection",
    medication: "tirzepatide",
    format: "injection",
    price: "$149",
    regularPrice: "$299",
    priceNote: "flat at every dose",
    shipping: "Free shipping",
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
    shipping: "Free shipping",
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
    shipping: "Free tracked delivery",
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
    shipping: "Home delivery included",
    image: "/products/shed-tirzepatide.webp",
  },
  // ── Brand-name ──
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
];

/** Numeric value for sorting ("from $179" → 179). */
export function productPriceValue(p: CatalogProduct): number {
  return Number(p.price.replace(/[^0-9]/g, "")) || 9999;
}
