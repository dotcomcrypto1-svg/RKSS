"use client"

import Image from "next/image"
import { useState } from "react"
import { getOption, money, type Product } from "@/lib/products"
import { useStore } from "./store-provider"

export function ProductCard({ product }: { product: Product }) {
  const { add } = useStore()
  const [size, setSize] = useState(product.size)
  const option = getOption(product, size)

  return (
    <article className="product-card">
      <div className="product-img">
        <Image
          src={product.img}
          alt={product.name}
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 25vw"
          style={{ objectFit: "cover" }}
        />
        <span className="tag">{product.tag}</span>
        <button className="quick" onClick={() => add(product.id, option.size)}>
          {`ADD TO BAG — ${money(option.price)}`}
        </button>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.notes}</p>
        <div className="size-options" role="radiogroup" aria-label={`${product.name} size`}>
          {product.options.map((o) => (
            <button
              key={o.size}
              type="button"
              role="radio"
              aria-checked={o.size === option.size}
              className={o.size === option.size ? "size-option active" : "size-option"}
              onClick={() => setSize(o.size)}
            >
              {o.size}
            </button>
          ))}
        </div>
        <div className="price">
          <strong>{money(option.price)}</strong>
          <del>
            <span className="sr-only">Original price </span>
            {money(option.old)}
          </del>
        </div>
      </div>
    </article>
  )
}
