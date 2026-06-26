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
        <button
          type="button"
          className="btn btn--primary btn--lg"
          onClick={() => openEnquiry()}
        >
          CONTACT SALES TEAM
        </button>
      </div>
    </section>
  );
}
