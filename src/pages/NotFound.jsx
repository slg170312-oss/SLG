import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta('Page Not Found', 'The page you are looking for could not be found.');

  return (
    <div className="page notfound-page">
      <section className="page-hero notfound-hero">
        <div className="page-hero__overlay" aria-hidden="true" />
        <div className="page-hero__grid" aria-hidden="true" />
        <div className="page-hero__content container">
          <div className="page-hero__label">
            <span className="page-hero__label-line" />
            <span>ERROR 404</span>
            <span className="page-hero__label-line" />
          </div>
          <h1 className="page-hero__title">
            Page not <span className="page-hero__accent">found.</span>
          </h1>
          <p className="page-hero__description">
            The page you're looking for doesn't exist or may have moved. Let's get
            you back on track.
          </p>
          <div className="notfound-actions">
            <Link to="/" className="btn btn--primary btn--lg">
              BACK TO HOME
            </Link>
            <Link to="/products" className="btn btn--ghost btn--lg">
              VIEW PRODUCTS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
