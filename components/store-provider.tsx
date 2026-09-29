"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { PRODUCTS, type Product } from "@/lib/products"

type CartLine = { id: number; qty: number }
export type CartItem = Product & { qty: number }

type StoreContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  add: (id: number) => void
  change: (id: number, delta: number) => void
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
}

const STORAGE_KEY = "winterman-cart"
const StoreContext = createContext<StoreContextValue | null>(null)

function readCart(): CartLine[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    return Array.isArray(parsed)
      ? parsed.filter((l) => PRODUCTS.some((p) => p.id === l?.id) && Number.isInteger(l?.qty) && l.qty > 0)
      : []
  } catch {
    return []
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [hydrated, setHydrated] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    setLines(readCart())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  }, [lines, hydrated])

  useEffect(() => {
    if (!cartOpen && !searchOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCartOpen(false)
        setSearchOpen(false)
      }
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [cartOpen, searchOpen])

  const add = useCallback((id: number) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === id)
      if (existing) return prev.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + 1, 10) } : l))
      return [...prev, { id, qty: 1 }]
    })
    setSearchOpen(false)
    setCartOpen(true)
  }, [])

  const change = useCallback((id: number, delta: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + delta, 10) } : l))
        .filter((l) => l.qty > 0),
    )
  }, [])

  const value = useMemo<StoreContextValue>(() => {
    const items = lines.flatMap((l) => {
      const product = PRODUCTS.find((p) => p.id === l.id)
      return product ? [{ ...product, qty: l.qty }] : []
    })
    return {
      items,
      count: items.reduce((a, i) => a + i.qty, 0),
      subtotal: items.reduce((a, i) => a + i.price * i.qty, 0),
      add,
      change,
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
    }
  }, [lines, add, change, cartOpen, searchOpen])

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}
