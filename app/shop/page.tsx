import type { Metadata } from "next"
import { StoreProvider } from "@/components/store-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SearchOverlay } from "@/components/search-overlay"
import { CartDrawer } from "@/components/cart-drawer"
import { CollectionView } from "@/components/collection-view"

export const metadata: Metadata = {
  title: "Shop Classics — Winterman Parfums",
  description:
    "Shop the Winterman Classics: long-lasting eau de parfums for men in 30, 50 and 100 ml. Free shipping on ₹1,999+ and COD across India.",
}

export default function ShopPage() {
  return (
    <StoreProvider>
      <div className="announcement">
        {"FREE SHIPPING ON ORDERS ₹1,999+ \u00a0 • \u00a0 COD AVAILABLE ACROSS INDIA"}
      </div>
      <SiteHeader />
      <main id="top">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/shop">Shop</a>
            </li>
            <li aria-current="page">Classics</li>
          </ol>
        </nav>
        <header className="collection-banner">
          <p className="eyebrow">THE WINTERMAN CLASSICS</p>
          <h1>Classics</h1>
          <p>
            Our most-loved signatures. Crisp alpine freshness, warm woods and smoky depth — each crafted to last
            from first light to late night.
          </p>
        </header>
        <CollectionView />
      </main>
      <SiteFooter />
      <SearchOverlay />
      <CartDrawer />
    </StoreProvider>
  )
}
