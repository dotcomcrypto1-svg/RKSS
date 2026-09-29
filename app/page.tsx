import { StoreProvider } from "@/components/store-provider"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { ShopSection } from "@/components/shop-section"
import { Editorial } from "@/components/editorial"
import { Story } from "@/components/story"
import { Reviews } from "@/components/reviews"
import { Newsletter } from "@/components/newsletter"
import { SiteFooter } from "@/components/site-footer"
import { SearchOverlay } from "@/components/search-overlay"
import { CartDrawer } from "@/components/cart-drawer"

export default function Page() {
  return (
    <StoreProvider>
      <div className="announcement">
        {"FREE SHIPPING ON ORDERS ₹1,999+ \u00a0 • \u00a0 COD AVAILABLE ACROSS INDIA"}
      </div>
      <SiteHeader />
      <main id="top">
        <Hero />
        <Marquee />
        <ShopSection />
        <Editorial />
        <Story />
        <Reviews />
        <Newsletter />
      </main>
      <SiteFooter />
      <SearchOverlay />
      <CartDrawer />
    </StoreProvider>
  )
}
