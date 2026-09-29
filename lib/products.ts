export type Product = {
  id: number
  name: string
  type: string
  size: string
  price: number
  old: number
  img: string
  notes: string
  tag: "BESTSELLER" | "NEW" | "POPULAR" | "GIFT"
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Winterman Glacier",
    type: "Eau de Parfum",
    size: "100 ml",
    price: 2499,
    old: 2999,
    img: "/images/perfume-4.jpeg",
    notes: "Cool bergamot, cedarwood & clean musk",
    tag: "BESTSELLER",
  },
  {
    id: 2,
    name: "Winterman Ice",
    type: "Eau de Parfum",
    size: "100 ml",
    price: 2299,
    old: 2799,
    img: "/images/perfume-5.jpeg",
    notes: "Fresh citrus, aquatic accords & amber",
    tag: "NEW",
  },
  {
    id: 3,
    name: "Winterman Signature",
    type: "Eau de Parfum",
    size: "100 ml",
    price: 2699,
    old: 3299,
    img: "/images/perfume-6.jpeg",
    notes: "Warm woods, vanilla & soft leather",
    tag: "POPULAR",
  },
  {
    id: 4,
    name: "Winterman Discovery Duo",
    type: "Gift Set",
    size: "2 × 50 ml",
    price: 1999,
    old: 2499,
    img: "/images/perfume-4.jpeg",
    notes: "Two complementary scents for day & night",
    tag: "GIFT",
  },
]

export type Filter = "all" | "bestseller" | "gift"

export function matchesFilter(product: Product, filter: Filter) {
  if (filter === "bestseller") return product.tag === "BESTSELLER" || product.tag === "POPULAR"
  if (filter === "gift") return product.tag === "GIFT"
  return true
}

export function matchesQuery(product: Product, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return product.name.toLowerCase().includes(q) || product.notes.toLowerCase().includes(q)
}

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })
export const money = (n: number) => inr.format(n)
