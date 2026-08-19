import { Link } from 'react-router-dom';
import { categories } from '../data/productCategories';
import { siteConfig, telHref, mailHref } from '../data/siteConfig';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <img src="/logo.png" alt="SLG Motors" className="footer__logo" />
          <p className="footer__tagline">
            High-efficiency industrial motors, pumps, compressors and wash
            systems — engineered to IEC standards and BIS certified. Made in
            India since {siteConfig.established}.
          </p>
        </div>

        <nav className="footer__col" aria-label="Company links">
          <h3 className="footer__heading">Company</h3>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/custom">Custom Manufacturing</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <nav className="footer__col" aria-label="Product links">
          <h3 className="footer__heading">Products</h3>
          {categories.map((c) => (
            <Link key={c.id} to={`/products/${c.id}/${c.variants[0].id}`}>
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="footer__col">
          <h3 className="footer__heading">Get in touch</h3>
          <a href={mailHref}>{siteConfig.email}</a>
          <a href={telHref}>{siteConfig.phone}</a>
          {siteConfig.phoneAlt && (
            <a href={`tel:${siteConfig.phoneAlt.replace(/[^\d+]/g, '')}`}>{siteConfig.phoneAlt}</a>
          )}
          <span className="footer__addr">
            {siteConfig.address.line1}, {siteConfig.address.line2}
          </span>
        </div>
      </div>

      <div className="footer__inner container">
        <div className="footer__left">
          <button type="button" className="footer__cookie-btn">
            Manage cookies or opt out
          </button>
          <span className="footer__company">
            © {new Date().getFullYear()} {siteConfig.legalName} · MSME (Udyam Registered)
          </span>
        </div>
        <nav className="footer__nav" aria-label="Legal">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/contact">Dealer Locator</Link>
        </nav>
      </div>
    </footer>
  );
}
