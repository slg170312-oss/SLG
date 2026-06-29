import { Link } from 'react-router-dom';
import { useEnquiry } from '../../context/EnquiryContext';

export default function ProductsCTA() {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="products-cta">
      <div className="products-cta__overlay" aria-hidden="true" />
      <div className="products-cta__content container">
        <span className="section-label">Wholesale &amp; Corporate Enquiries</span>
        <h2 className="products-cta__title">
          Volume pricing for OEMs, EPCs &amp; distributors.
        </h2>
        <div className="page-cta__actions">
          <button
            type="button"
            className="btn btn--primary btn--lg"
            onClick={() => openEnquiry()}
          >
            CONTACT SALES TEAM
          </button>
          <Link to="/custom" className="btn btn--ghost btn--lg">
            NEED A CUSTOM BUILD?
          </Link>
        </div>
      </div>
    </section>
  );
}
