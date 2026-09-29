const REVIEWS = [
  { quote: "The bottle looks premium and the scent lasts beautifully through my workday.", who: "Arjun, Mumbai" },
  { quote: "Clean, fresh and easy to wear. I keep reaching for it on weekends.", who: "Riya, Bengaluru" },
  { quote: "Bought it as a gift and the presentation was excellent.", who: "Karan, Delhi" },
]

export function Reviews() {
  return (
    <section className="reviews" id="reviews">
      <div className="section-head center">
        <div>
          <p className="eyebrow">THE WORD ON THE STREET</p>
          <h2>Loved in India.</h2>
        </div>
      </div>
      <div className="review-grid">
        {REVIEWS.map((r) => (
          <article key={r.who}>
            <div className="stars" role="img" aria-label="5 out of 5 stars">
              ★★★★★
            </div>
            <p>{`“${r.quote}”`}</p>
            <b>— {r.who}</b>
          </article>
        ))}
      </div>
    </section>
  )
}
