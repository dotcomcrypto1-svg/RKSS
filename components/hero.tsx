import Image from "next/image"

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">ART IN EVERY SCENT</p>
        <h1>
          A fragrance
          <br />
          <em>made to linger.</em>
        </h1>
        <p className="hero-text">
          Modern perfumery with an unmistakable Indian point of view. Fresh, refined and designed for the moments that
          matter.
        </p>
        <div className="hero-actions">
          <a className="btn btn-dark" href="#shop">
            Explore Collection <span aria-hidden="true">→</span>
          </a>
          <a className="text-link" href="#story">
            Discover our story
          </a>
        </div>
        <div className="trust-row">
          <span>✓ 100% Authentic</span>
          <span>✓ Secure Payments</span>
          <span>✓ Easy Returns</span>
        </div>
      </div>
      <div className="hero-image-wrap">
        <Image src="/images/perfume-1.jpg" alt="Winterman perfume editorial" fill priority sizes="(max-width: 900px) 100vw, 50vw" style={{ objectFit: "cover" }} />
        <div className="hero-badge">
          <strong>100 ML</strong>
          <span>EAU DE PARFUM</span>
        </div>
      </div>
    </section>
  )
}
