"use client"

import { useState } from "react"
import { PRODUCTS, matchesFilter, type Filter } from "@/lib/products"
import { ProductCard } from "./product-card"

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "bestseller", label: "Bestsellers" },
  { value: "gift", label: "Gifting" },
]

export function ShopSection() {
  const [filter, setFilter] = useState<Filter>("all")
  const list = PRODUCTS.filter((p) => matchesFilter(p, filter))

  return (
    <section className="shop-section" id="shop">
      <div className="section-head">
        <div>
          <p className="eyebrow">THE COLLECTION</p>
          <h2>Find your signature.</h2>
        </div>
        <div className="filters" role="group" aria-label="Filter products">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`filter${filter === f.value ? " active" : ""}`}
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div className="product-grid">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
