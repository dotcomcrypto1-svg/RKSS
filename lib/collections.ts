import { PRODUCTS, type Product } from "./products"

export type Collection = {
  slug: string
  name: string
  eyebrow: string
  description: string
  match: (product: Product) => boolean
}

export const COLLECTIONS: Collection[] = [
  {
    slug: "classics",
    name: "Classics",
    eyebrow: "THE WINTERMAN CLASSICS",
    description:
      "Our most-loved signatures. Crisp alpine freshness, warm woods and smoky depth — each crafted to last from first light to late night.",
    match: () => true,
  },
  {
    slug: "bestsellers",
    name: "Bestsellers",
    eyebrow: "MOST LOVED",
    description:
      "The scents our customers reach for again and again. Proven performers with thousands of five-star reviews.",
    match: (p) => p.tag === "BESTSELLER" || p.tag === "POPULAR" || p.reviews >= 900,
  },
  {
    slug: "new-arrivals",
    name: "New Arrivals",
    eyebrow: "JUST LANDED",
    description: "Fresh from the atelier. Discover the newest additions to the Winterman wardrobe.",
    match: (p) => p.tag === "NEW",
  },
  {
    slug: "gift-sets",
    name: "Gift Sets",
    eyebrow: "GIFTING, SORTED",
    description:
      "Beautifully boxed duos and discovery sets — the easiest way to gift a signature scent, or find your own.",
    match: (p) => p.type === "Gift Set",
  },
  {
    slug: "fresh-aquatic",
    name: "Fresh & Aquatic",
    eyebrow: "FOR THE DAYTIME",
    description:
      "Clean citrus, cool mint and sea-salt accords. Light, bright and made for long, warm days.",
    match: (p) => p.family === "Fresh" || p.family === "Aquatic",
  },
  {
    slug: "woody-oriental",
    name: "Woody & Oriental",
    eyebrow: "FOR THE EVENING",
    description:
      "Smoked oud, soft leather, vanilla and tonka. Rich, warm and deep — made to be noticed after dark.",
    match: (p) => p.family === "Woody" || p.family === "Oriental",
  },
]

export function getCollection(slug: string) {
  return COLLECTIONS.find((c) => c.slug === slug)
}

export function productsFor(collection: Collection) {
  return PRODUCTS.filter(collection.match)
}

export const collectionHref = (slug: string) => (slug === "classics" ? "/shop" : `/shop/${slug}`)
