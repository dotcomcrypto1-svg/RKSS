"use client"

import { useMemo, useState } from "react"
import { SlidersHorizontal, X } from "lucide-react"
import { FAMILIES, PRODUCTS, type Family, type Product } from "@/lib/products"
import { CollectionCard } from "./collection-card"

type Sort = "featured" | "price-asc" | "price-desc" | "rating" | "discount"

const SORTS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "discount", label: "Biggest Discount" },
]

const PRICE_RANGES = [
  { id: "under-2000", label: "Under ₹2,000", test: (p: number) => p < 2000 },
  { id: "2000-2500", label: "₹2,000 – ₹2,500", test: (p: number) => p >= 2000 && p <= 2500 },
  { id: "above-2500", label: "Above ₹2,500", test: (p: number) => p > 2500 },
] as const

const TYPES = ["Eau de Parfum", "Eau de Toilette", "Gift Set"] as const

const discount = (p: Product) => (p.old - p.price) / p.old

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

export function CollectionView() {
  const [families, setFamilies] = useState<Family[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [prices, setPrices] = useState<string[]>([])
  const [sort, setSort] = useState<Sort>("featured")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const list = useMemo(() => {
    const filtered = PRODUCTS.filter(
      (p) =>
        (families.length === 0 || families.includes(p.family)) &&
        (types.length === 0 || types.includes(p.type)) &&
        (prices.length === 0 || PRICE_RANGES.some((r) => prices.includes(r.id) && r.test(p.price))),
    )
    const sorted = [...filtered]
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price)
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price)
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating)
    if (sort === "discount") sorted.sort((a, b) => discount(b) - discount(a))
    return sorted
  }, [families, types, prices, sort])

  const activeCount = families.length + types.length + prices.length
  const clearAll = () => {
    setFamilies([])
    setTypes([])
    setPrices([])
  }

  return (
    <section className="collection" aria-label="Products">
      <aside id="collectionFilters" className={`filter-panel${filtersOpen ? " open" : ""}`} aria-label="Filters">
        <div className="filter-panel-head">
          <h2>Filters</h2>
          {activeCount > 0 && (
            <button type="button" className="clear-filters" onClick={clearAll}>
              Clear all
            </button>
          )}
          <button type="button" className="filter-close" aria-label="Close filters" onClick={() => setFiltersOpen(false)}>
            <X size={18} strokeWidth={1.6} />
          </button>
        </div>

        <fieldset className="filter-group">
          <legend>Fragrance family</legend>
          {FAMILIES.map((f) => (
            <label key={f} className="check">
              <input type="checkbox" checked={families.includes(f)} onChange={() => setFamilies((l) => toggle(l, f))} />
              <span>{f}</span>
              <small>{PRODUCTS.filter((p) => p.family === f).length}</small>
            </label>
          ))}
        </fieldset>

        <fieldset className="filter-group">
          <legend>Product type</legend>
          {TYPES.map((t) => (
            <label key={t} className="check">
              <input type="checkbox" checked={types.includes(t)} onChange={() => setTypes((l) => toggle(l, t))} />
              <span>{t}</span>
              <small>{PRODUCTS.filter((p) => p.type === t).length}</small>
            </label>
          ))}
        </fieldset>

        <fieldset className="filter-group">
          <legend>Price</legend>
          {PRICE_RANGES.map((r) => (
            <label key={r.id} className="check">
              <input type="checkbox" checked={prices.includes(r.id)} onChange={() => setPrices((l) => toggle(l, r.id))} />
              <span>{r.label}</span>
            </label>
          ))}
        </fieldset>

        <button type="button" className="btn btn-dark filter-apply" onClick={() => setFiltersOpen(false)}>
          {`Show ${list.length} products`}
        </button>
      </aside>

      <div className="collection-main">
        <div className="toolbar">
          <button
            type="button"
            className="filter-toggle"
            aria-expanded={filtersOpen}
            aria-controls="collectionFilters"
            onClick={() => setFiltersOpen(true)}
          >
            <SlidersHorizontal size={15} strokeWidth={1.6} />
            {activeCount > 0 ? `Filters (${activeCount})` : "Filters"}
          </button>
          <p className="result-count" aria-live="polite">
            {`${list.length} ${list.length === 1 ? "product" : "products"}`}
          </p>
          <label className="sort">
            <span>Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {list.length > 0 ? (
          <div className="collection-grid">
            {list.map((p) => (
              <CollectionCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="collection-empty">
            <p>No fragrances match these filters.</p>
            <button type="button" className="btn btn-dark" onClick={clearAll}>
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
