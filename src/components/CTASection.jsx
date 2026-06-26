import { useEnquiry } from '../context/EnquiryContext';

export default function CTASection() {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="cta-section">
      <div className="cta-section__overlay" aria-hidden="true" />
      <div className="cta-section__content container">
        <span className="section-label section-label--light">WHOLESALE &amp; CORPORATE ENQUIRIES</span>
        <h2 className="cta-section__title">
          Volume pricing available for OEMs &amp; distributors.
        </h2>
        <button
          type="button"
          className="btn btn--ghost btn--lg"
          onClick={() => openEnquiry()}
        >
          REQUEST A QUOTE
        </button>
      </div>
    </section>
  );
}
