"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { PRODUCTS, matchesQuery, money } from "@/lib/products"
import { useStore } from "./store-provider"

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, add } = useStore()
  const [query, setQuery] = useState("")

  if (!searchOpen) return null

  const results = query.trim() ? PRODUCTS.filter((p) => matchesQuery(p, query)) : []

  return (
    <div className="search-overlay show" role="dialog" aria-modal="true" aria-label="Search fragrances">
      <button aria-label="Close search" onClick={() => setSearchOpen(false)}>
        <X size={30} strokeWidth={1.4} />
      </button>
      <div>
        <p className="eyebrow">SEARCH</p>
        <label htmlFor="searchInput" className="sr-only">
          Search fragrances
        </label>
        <input
          id="searchInput"
          type="search"
          placeholder="Search fragrances..."
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query.trim() &&
          (results.length ? (
            <ul className="search-results">
              {results.map((p) => (
                <li key={p.id}>
                  <Image src={p.img} alt="" width={56} height={70} />
                  <div>
                    <h4>{p.name}</h4>
                    <p>
                      {p.notes} · {money(p.price)}
                    </p>
                  </div>
                  <button className="add" onClick={() => add(p.id)}>
                    ADD TO BAG
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="search-empty" role="status">
              No fragrances match that search.
            </p>
          ))}
      </div>
    </div>
  )
}
