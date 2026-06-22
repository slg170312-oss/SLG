import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const onProductsPage = location.pathname === '/products';

  // Primary nav link is contextual: PRODUCTS on the home page,
  // HOME on the products page.
  const navLinks = [
    onProductsPage
      ? { label: 'HOME', to: '/' }
      : { label: 'PRODUCTS', to: '/products' },
    { label: 'ABOUT US', to: '#' },
    { label: 'CONTACT', to: '#' },
  ];

  return (
    <header className="header">
      <div className="header__inner container">
        <nav className="nav" aria-label="Main navigation">
          <ul className="nav__list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={`nav__link ${location.pathname === link.to ? 'nav__link--active' : ''}`}
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
