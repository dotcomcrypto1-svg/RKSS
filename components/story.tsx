import Image from "next/image"

const STATS = [
  { value: "100 ML", label: "Signature size" },
  { value: "₹", label: "Indian pricing" },
  { value: "COD", label: "Available nationwide" },
]

export function Story() {
  return (
    <section className="story" id="story">
      <div className="story-copy">
        <p className="eyebrow">THE WINTERMAN STORY</p>
        <h2>Born from the feeling of a cool mountain morning.</h2>
        <p>
          Winterman pairs crisp freshness with warm, elegant woods. The result is a fragrance wardrobe for Indian days
          and nights — from office hours to celebrations.
        </p>
        <div className="stats">
          {STATS.map((s) => (
            <div key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="story-image">
        <Image
          src="/images/perfume-3.jpg"
          alt="Winterman perfume product image"
          fill
          sizes="(max-width: 900px) 100vw, 45vw"
          style={{ objectFit: "cover" }}
        />
      </div>
    </section>
  )
}
