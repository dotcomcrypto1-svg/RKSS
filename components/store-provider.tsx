"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { getOption, PRODUCTS, type Product } from "@/lib/products"

type CartLine = { id: number; size: string; qty: number }
export type CartItem = Product & { qty: number; key: string }

type StoreContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  add: (id: number, size?: string) => void
  change: (key: string, delta: number) => void
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
}

const STORAGE_KEY = "winterman-cart-v2"
const StoreContext = createContext<StoreContextValue | null>(null)
const lineKey = (l: { id: number; size: string }) => `${l.id}::${l.size}`

function readCart(): CartLine[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
    return Array.isArray(parsed)
      ? parsed.filter(
          (l) =>
            PRODUCTS.some((p) => p.id === l?.id && p.options.some((o) => o.size === l?.size)) &&
            Number.isInteger(l?.qty) &&
            l.qty > 0,
        )
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

  const add = useCallback((id: number, size?: string) => {
    const product = PRODUCTS.find((p) => p.id === id)
    if (!product) return
    const line = { id, size: getOption(product, size).size }
    const key = lineKey(line)
    setLines((prev) => {
      if (prev.some((l) => lineKey(l) === key))
        return prev.map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(l.qty + 1, 10) } : l))
      return [...prev, { ...line, qty: 1 }]
    })
    setSearchOpen(false)
    setCartOpen(true)
  }, [])

  const change = useCallback((key: string, delta: number) => {
    setLines((prev) =>
      prev
        .map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(l.qty + delta, 10) } : l))
        .filter((l) => l.qty > 0),
    )
  }, [])

  const value = useMemo<StoreContextValue>(() => {
    const items = lines.flatMap((l) => {
      const product = PRODUCTS.find((p) => p.id === l.id)
      if (!product) return []
      const option = getOption(product, l.size)
      return [{ ...product, ...option, qty: l.qty, key: lineKey(l) }]
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
