import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import { useEnquiry } from '../context/EnquiryContext';

const milestones = [
  { year: '1989', text: 'Founded in Maharashtra as a motor rewinding and repair workshop.' },
  { year: '1998', text: 'Commissioned the first in-house winding and assembly lines.' },
  { year: '2009', text: 'Certified to ISO 9001 with BIS approvals across the core range.' },
  { year: '2018', text: 'Expanded into IE3/IE4 high-efficiency and BLDC motor platforms.' },
  { year: 'Today', text: 'Supplying OEMs, EPCs and distributors across 38 states.' },
];

const capabilities = [
  {
    title: 'In-house Winding',
    text: 'Copper winding, varnishing and assembly under one roof for consistent quality control.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="8" width="13" height="8" rx="2" />
        <path d="M16 11h3M19 9v6M6 8V6M9 8V6M12 8V6" />
      </svg>
    ),
  },
  {
    title: 'Precision Machining',
    text: 'CNC-machined shafts, end shields and housings held to tight dimensional tolerances.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
      </svg>
    ),
  },
  {
    title: 'Performance Testing',
    text: 'Every motor is load, insulation and run-tested before dispatch with a test certificate.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12a9 9 0 0 1 18 0" />
        <path d="M12 12l4-3" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Pan-India Supply',
    text: 'A distributor and service network that keeps standard stock items moving within 48 hours.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9z" />
      </svg>
    ),
  },
];

const certs = [
  { title: 'ISO 9001:2015', sub: 'Quality Management System' },
  { title: 'BIS Certified', sub: 'IS 325 · IS 12615' },
  { title: 'IE3 / IE4', sub: 'Premium & Super-Premium Efficiency' },
  { title: 'CE · IECEx', sub: 'Export & Hazardous-area variants' },
];

export default function About() {
  const { openEnquiry } = useEnquiry();
  usePageMeta(
    'About Us',
    'SLG Motors has manufactured high-efficiency industrial electric motors in Maharashtra, India since 1989 — ISO 9001 certified and BIS compliant.',
  );

  return (
    <div className="page about-page">
      <section className="page-hero">
        <div className="page-hero__overlay" aria-hidden="true" />
        <div className="page-hero__grid" aria-hidden="true" />
        <div className="page-hero__content container">
          <nav className="page-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">HOME</Link>
            <span className="page-hero__crumb-sep" aria-hidden="true">›</span>
            <span className="page-hero__crumb-current">ABOUT US</span>
          </nav>
          <div className="page-hero__label">
            <span className="page-hero__label-line" />
            <span>OUR STORY · SLG MOTORS</span>
            <span className="page-hero__label-line" />
          </div>
          <h1 className="page-hero__title">
            Engineering motion
            <br />
            <span className="page-hero__accent">since 1989.</span>
          </h1>
          <p className="page-hero__description">
            Three decades of building rugged, high-efficiency motors engineered
            for India's demanding industrial and agricultural conditions.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="about-story__inner container">
          <div className="about-story__text">
            <span className="section-label">WHO WE ARE</span>
            <h2 className="about-story__title">
              A Maharashtra-built manufacturer trusted across India.
            </h2>
            <p>
              SLG Motors designs and manufactures AC induction, servo, BLDC,
              flameproof and brake motors — alongside pumps, compressors and
              high-pressure wash systems — for industrial, agricultural and
              infrastructure applications nationwide.
            </p>
            <p>
              From a single rewinding workshop founded in 1989, we have grown
              into an integrated facility that winds, machines, assembles and
              tests motors in-house. That vertical control is how we hold
              quality steady while serving everyone from local OEMs to national
              EPC contractors.
            </p>
          </div>
          <ol className="timeline" aria-label="Company milestones">
            {milestones.map((m) => (
              <li key={m.year} className="timeline__item">
                <span className="timeline__year">{m.year}</span>
                <span className="timeline__text">{m.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-capabilities">
        <div className="about-capabilities__inner container">
          <span className="section-label section-label--light">WHAT WE DO</span>
          <h2 className="about-capabilities__title">Manufacturing capabilities</h2>
          <div className="capability-grid">
            {capabilities.map((cap) => (
              <div key={cap.title} className="capability-card">
                <span className="capability-card__icon" aria-hidden="true">
                  {cap.icon}
                </span>
                <h3 className="capability-card__title">{cap.title}</h3>
                <p className="capability-card__text">{cap.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-certs">
        <div className="about-certs__inner container">
          <span className="section-label">QUALITY &amp; COMPLIANCE</span>
          <h2 className="about-certs__title">Certifications &amp; standards</h2>
          <div className="cert-grid">
            {certs.map((c) => (
              <div key={c.title} className="cert-card">
                <strong className="cert-card__title">{c.title}</strong>
                <span className="cert-card__sub">{c.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta">
        <div className="page-cta__overlay" aria-hidden="true" />
        <div className="page-cta__content container">
          <span className="section-label section-label--light">WORK WITH US</span>
          <h2 className="page-cta__title">
            Looking for a manufacturing partner you can rely on?
          </h2>
          <div className="page-cta__actions">
            <button type="button" className="btn btn--primary btn--lg" onClick={() => openEnquiry()}>
              REQUEST A QUOTE
            </button>
            <Link to="/products" className="btn btn--ghost btn--lg">
              VIEW PRODUCTS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
