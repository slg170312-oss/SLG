import { Link } from 'react-router-dom';
import { useEnquiry } from '../context/EnquiryContext';

export default function Hero() {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="hero">
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />
        <div className="hero__content container">
          <div className="hero__label">
            <span className="hero__label-line" />
            <span>EST. 2003 · MADE IN INDIA</span>
            <span className="hero__label-line" />
          </div>
          <h1 className="hero__title">
            Precision Motors
            <br />
            <span className="hero__title-accent">for India.</span>
          </h1>
          <p className="hero__description">
            SLG manufactures high-efficiency AC induction motors — single phase
            and three phase, in <span className="nowrap">foot</span>,{' '}
            <span className="nowrap">flange</span> and{' '}
            <span className="nowrap">foot-cum-flange</span> mountings —
            engineered to IEC standards for agricultural, industrial, textile
            and general engineering applications across India.
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
              onClick={() => openEnquiry()}
            >
              ENQUIRE NOW
            </button>
          </div>
        </div>
    </section>
  );
}
