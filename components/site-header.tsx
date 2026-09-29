"use client"

import { useState } from "react"
import { Menu, Search, ShoppingBag, X } from "lucide-react"
import { useStore } from "./store-provider"

const LINKS = [
  { href: "#shop", label: "Shop" },
  { href: "#story", label: "Our Story" },
  { href: "#notes", label: "Fragrance Notes" },
  { href: "#reviews", label: "Reviews" },
]

export function SiteHeader() {
  const { count, setCartOpen, setSearchOpen } = useStore()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Winterman home">
          <span className="brand-mark" aria-hidden="true">
            W
          </span>
          <span>
            <b>WINTERMAN</b>
            <small>PARFUMS</small>
          </span>
        </a>
        <nav className="nav" aria-label="Main">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(true)}>
            <Search size={19} strokeWidth={1.6} />
          </button>
          <button className="icon-btn cart-btn" aria-label={`Shopping bag, ${count} items`} onClick={() => setCartOpen(true)}>
            <ShoppingBag size={19} strokeWidth={1.6} />
            <span aria-hidden="true">{count}</span>
          </button>
          <button
            className="menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobileNav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={20} strokeWidth={1.6} /> : <Menu size={20} strokeWidth={1.6} />}
          </button>
        </div>
      </header>
      <nav id="mobileNav" className={`mobile-nav${menuOpen ? " open" : ""}`} aria-label="Mobile">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
      </nav>
    </>
  )
}
