import Image from "next/image"

const NOTES = [
  { n: "01", text: "Top — Bergamot, citrus & mint" },
  { n: "02", text: "Heart — Lavender, iris & spices" },
  { n: "03", text: "Base — Cedar, amber & musk" },
]

export function Editorial() {
  return (
    <section className="editorial" id="notes">
      <div className="editorial-image">
        <Image
          src="/images/perfume-2.jpg"
          alt="Winterman perfume bottle on dark background"
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="editorial-copy">
        <p className="eyebrow">FRAGRANCE NOTES</p>
        <h2>
          Cool at first.
          <br />
          <em>Unforgettable later.</em>
        </h2>
        <p>
          Our fragrances move through bright top notes, a character-rich heart and a smooth, lingering base. Each
          composition is built to feel polished without being overpowering.
        </p>
        <div className="note-list">
          {NOTES.map((note) => (
            <div key={note.n}>
              <b>{note.n}</b>
              <span>{note.text}</span>
            </div>
          ))}
        </div>
        <a className="text-link" href="#shop">
          Shop the scents →
        </a>
      </div>
    </section>
  )
}
