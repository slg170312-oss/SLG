import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'HOME', to: '/' },
  { label: 'PRODUCTS', to: '/products' },
  { label: 'CUSTOMIZATION', to: '/custom' },
  { label: 'ABOUT US', to: '/about' },
  { label: 'CONTACT', to: '/contact' },
];

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className={`header ${menuOpen ? 'header--menu-open' : ''}`}>
      <div className="header__inner container">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="SLG Motors" className="logo__img" />
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>

        <nav
          id="primary-nav"
          className={`nav ${menuOpen ? 'nav--open' : ''}`}
          aria-label="Main navigation"
        >
          <ul className="nav__list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={`nav__link ${location.pathname === link.to ? 'nav__link--active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
