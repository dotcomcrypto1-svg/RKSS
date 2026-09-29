"use client"

import Image from "next/image"
import { money, type Product } from "@/lib/products"
import { useStore } from "./store-provider"

export function ProductCard({ product }: { product: Product }) {
  const { add } = useStore()

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
        <button className="quick" onClick={() => add(product.id)}>
          {`ADD TO BAG — ${money(product.price)}`}
        </button>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>
          {product.notes} · {product.size}
        </p>
        <div className="price">
          <strong>{money(product.price)}</strong>
          <del>
            <span className="sr-only">Original price </span>
            {money(product.old)}
          </del>
        </div>
      </div>
    </article>
  )
}
