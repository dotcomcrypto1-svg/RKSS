"use client"

import Image from "next/image"
import { useState } from "react"
import { Star } from "lucide-react"
import { getOption, money, type Product } from "@/lib/products"
import { useStore } from "./store-provider"

export function CollectionCard({ product }: { product: Product }) {
  const { add } = useStore()
  const [size, setSize] = useState(product.size)
  const option = getOption(product, size)
  const off = Math.round(((option.old - option.price) / option.old) * 100)

  return (
    <article className="c-card">
      <div className="c-card-img">
        <Image
          src={product.img}
          alt={product.name}
          fill
          sizes="(max-width: 560px) 50vw, (max-width: 1100px) 33vw, 25vw"
          style={{ objectFit: "cover" }}
        />
        <span className="c-tag">{product.tag}</span>
      </div>
      <div className="c-card-body">
        <p className="c-rating">
          <Star size={12} fill="currentColor" strokeWidth={0} aria-hidden="true" />
          <span>
            <b>{product.rating.toFixed(1)}</b>
            <span className="sr-only"> out of 5 stars,</span>
          </span>
          <span className="c-reviews">{`(${product.reviews.toLocaleString("en-IN")} reviews)`}</span>
        </p>
        <h3>{product.name}</h3>
        <p className="c-meta">{`${product.type} · ${product.family}`}</p>
        <p className="c-notes">{product.notes}</p>
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
        <div className="c-price">
          <strong>{money(option.price)}</strong>
          <del>
            <span className="sr-only">Original price </span>
            {money(option.old)}
          </del>
          <span className="c-off">{`${off}% off`}</span>
        </div>
        <button type="button" className="c-add" onClick={() => add(product.id, option.size)}>
          Add to cart
        </button>
      </div>
    </article>
  )
}
