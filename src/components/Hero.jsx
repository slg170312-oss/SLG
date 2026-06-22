import { useState } from 'react';
import { Link } from 'react-router-dom';
import CertBadges from './CertBadges';
import EnquiryModal from './EnquiryModal';

export default function Hero() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <>
      <section className="hero">
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__content container">
          <div className="hero__label">
            <span className="hero__label-line" />
            <span>EST. 1989 · MADE IN INDIA · BHARAT STANDARDS</span>
            <span className="hero__label-line" />
          </div>
          <h1 className="hero__title">
            Precision Motors
            <br />
            <span className="hero__title-accent">for India.</span>
          </h1>
          <p className="hero__description">
            SLG manufactures high-efficiency AC Induction, servo, and BLDC motors for
            industrial, agricultural, and infrastructure applications across India —
            engineered to IEC standards, certified to BIS norms.
          </p>
          <div className="hero__actions">
            <Link to="/products" className="btn btn--primary">
              OUR PRODUCTS
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M6 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setEnquiryOpen(true)}
            >
              ENQUIRE NOW
            </button>
          </div>
        </div>
        <CertBadges />
      </section>
      {enquiryOpen && <EnquiryModal onClose={() => setEnquiryOpen(false)} />}
    </>
  );
}
