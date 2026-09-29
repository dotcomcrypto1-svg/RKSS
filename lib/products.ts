export type ProductOption = {
  size: string
  price: number
  old: number
}

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
  options: ProductOption[]
}

type ProductSeed = Omit<Product, "options"> & { extra?: ProductOption[] }

function withOptions({ extra, ...product }: ProductSeed): Product {
  const base = { size: product.size, price: product.price, old: product.old }
  const options = extra
    ? [...extra, base]
    : [
        { size: "30 ml", price: Math.round((product.price * 0.45) / 10) * 10 - 1, old: Math.round((product.old * 0.45) / 10) * 10 - 1 },
        { size: "50 ml", price: Math.round((product.price * 0.65) / 10) * 10 - 1, old: Math.round((product.old * 0.65) / 10) * 10 - 1 },
        base,
      ]
  return { ...product, options }
}

export function getOption(product: Product, size?: string): ProductOption {
  return product.options.find((o) => o.size === size) ?? product.options[product.options.length - 1]
}

const SEEDS: ProductSeed[] = [
  {
    id: 1,
    name: "Winterman Glacier",
    type: "Eau de Parfum",
    size: "100 ml",
    price: 2499,
    old: 2999,
    img: "/images/bottle-glacier.jpeg",
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
    img: "/images/bottle-ice.png",
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
    img: "/images/bottle-signature.png",
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
    img: "/images/bottle-duo.png",
    notes: "Two complementary scents for day & night",
    tag: "GIFT",
    extra: [{ size: "2 × 30 ml", price: 1299, old: 1599 }],
  },
]

export const PRODUCTS: Product[] = SEEDS.map(withOptions)

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
