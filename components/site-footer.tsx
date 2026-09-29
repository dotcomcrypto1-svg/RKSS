export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand">
        <span className="brand-mark" aria-hidden="true">
          W
        </span>
        <div>
          <b>WINTERMAN</b>
          <small>PARFUMS</small>
        </div>
        <p>Modern fragrance, made for India.</p>
      </div>
      <div>
        <b>Shop</b>
        <a href="#shop">All fragrances</a>
        <a href="#shop">Bestsellers</a>
        <a href="#shop">Gift sets</a>
      </div>
      <div>
        <b>Help</b>
        <a href="#">{"Shipping & delivery"}</a>
        <a href="#">Returns</a>
        <a href="#">Contact</a>
      </div>
      <div>
        <b>Payments</b>
        <p>UPI • Cards • Net Banking • COD</p>
        <p className="muted">© 2026 Winterman. Demo storefront.</p>
      </div>
    </footer>
  )
}
