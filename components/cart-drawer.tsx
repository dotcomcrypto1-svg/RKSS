"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { money } from "@/lib/products"
import { useStore } from "./store-provider"

export function CartDrawer() {
  const { items, subtotal, change, cartOpen, setCartOpen } = useStore()
  const [notice, setNotice] = useState(false)

  return (
    <>
      <aside
        className={`cart-drawer${cartOpen ? " open" : ""}`}
        aria-label="Shopping bag"
        aria-hidden={!cartOpen}
        inert={!cartOpen}
      >
        <div className="drawer-head">
          <h3>Your bag</h3>
          <button aria-label="Close bag" onClick={() => setCartOpen(false)}>
            <X size={24} strokeWidth={1.4} />
          </button>
        </div>
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty">Your bag is waiting for a signature scent.</div>
          ) : (
            items.map((item) => (
              <div className="cart-line" key={item.key}>
                <Image src={item.img} alt="" width={75} height={90} />
                <div>
                  <h4>{item.name}</h4>
                  <p>
                    {money(item.price)} · {item.size}
                  </p>
                  <div className="qty">
                    <button aria-label={`Decrease ${item.name} quantity`} onClick={() => change(item.key, -1)}>
                      −
                    </button>
                    <span aria-live="polite">{item.qty}</span>
                    <button
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() => change(item.key, 1)}
                      disabled={item.qty >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>
                <b>{money(item.price * item.qty)}</b>
              </div>
            ))
          )}
        </div>
        <div className="cart-bottom">
          <div>
            <span>Subtotal</span>
            <strong>{money(subtotal)}</strong>
          </div>
          <button
            className="btn btn-dark checkout"
            style={{ width: "100%" }}
            disabled={items.length === 0}
            onClick={() => setNotice(true)}
          >
            Proceed to checkout
          </button>
          {notice ? (
            <small className="checkout-note" role="status">
              Demo checkout — connect Razorpay / UPI / COD for live orders.
            </small>
          ) : (
            <small>Secure checkout • COD available</small>
          )}
        </div>
      </aside>
      <div className={`scrim${cartOpen ? " show" : ""}`} onClick={() => setCartOpen(false)} aria-hidden="true" />
    </>
  )
}
