import type { Metadata } from "next"
import { CollectionPage } from "@/components/collection-page"
import { COLLECTIONS } from "@/lib/collections"

export const metadata: Metadata = {
  title: "Shop Classics — Winterman Parfums",
  description:
    "Shop the Winterman Classics: long-lasting eau de parfums for men in 30, 50 and 100 ml. Free shipping on ₹1,999+ and COD across India.",
}

export default function ShopPage() {
  return <CollectionPage collection={COLLECTIONS[0]} />
}
