const ITEMS = ["CRAFTED FOR INDIA", "LONG-LASTING SCENTS", "PREMIUM PERFUMERY", "CRAFTED FOR INDIA"]

export function Marquee() {
  return (
    <section className="marquee" aria-label="Brand highlights">
      {ITEMS.map((item, i) => (
        <Fragment key={i} item={item} last={i === ITEMS.length - 1} />
      ))}
    </section>
  )
}

function Fragment({ item, last }: { item: string; last: boolean }) {
  return (
    <>
      <span>{item}</span>
      {!last && <i aria-hidden="true">✦</i>}
    </>
  )
}
