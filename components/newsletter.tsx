"use client"

import { useState } from "react"

export function Newsletter() {
  const [joined, setJoined] = useState(false)

  return (
    <section className="newsletter">
      <div>
        <p className="eyebrow">THE SCENT LETTER</p>
        <h2>10% off your first order.</h2>
        <p>Join for launches, scent guides and private offers.</p>
      </div>
      {joined ? (
        <p className="newsletter-thanks" role="status">
          Thank you — welcome to the Scent Letter.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setJoined(true)
          }}
        >
          <label htmlFor="newsletterEmail" className="sr-only">
            Email address
          </label>
          <input id="newsletterEmail" type="email" placeholder="Your email address" autoComplete="email" required />
          <button className="btn btn-light" type="submit">
            Join
          </button>
        </form>
      )}
    </section>
  )
}
