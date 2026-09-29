import { StoreProvider } from "./store-provider"
import { SiteHeader } from "./site-header"
import { SiteFooter } from "./site-footer"
import { SearchOverlay } from "./search-overlay"
import { CartDrawer } from "./cart-drawer"
import { CollectionView } from "./collection-view"
import { COLLECTIONS, collectionHref, productsFor, type Collection } from "@/lib/collections"

export function CollectionPage({ collection }: { collection: Collection }) {
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
            <li aria-current="page">{collection.name}</li>
          </ol>
        </nav>
        <header className="collection-banner">
          <p className="eyebrow">{collection.eyebrow}</p>
          <h1>{collection.name}</h1>
          <p>{collection.description}</p>
        </header>
        <nav className="collection-tabs" aria-label="Collections">
          <ul>
            {COLLECTIONS.map((c) => (
              <li key={c.slug}>
                <a
                  href={collectionHref(c.slug)}
                  aria-current={c.slug === collection.slug ? "page" : undefined}
                >
                  {c.name}
                  <small>{productsFor(c).length}</small>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <CollectionView products={productsFor(collection)} />
      </main>
      <SiteFooter />
      <SearchOverlay />
      <CartDrawer />
    </StoreProvider>
  )
}
