import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import { useEnquiry } from '../context/EnquiryContext';
import { siteConfig } from '../data/siteConfig';

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
    text: 'Shafts, end shields and housings machined to tight tolerances for dependable performance.',
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
    title: 'Fast Dispatch',
    text: 'Standard stock items dispatched within 48 hours; bulk custom orders of 300+ units fulfilled within 3 weeks.',
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
];

// Company fact sheet — quick-scan B2B credentials.
// NOTE: Udyam and GST numbers pending from client — shown as "available on request" until provided.
const factSheet = [
  { label: 'Nature of Business', value: 'Manufacturer & Supplier' },
  { label: 'Year of Establishment', value: String(siteConfig.established) },
  { label: 'Legal Status', value: 'MSME (Udyam Registered)' },
  { label: 'Head Office', value: 'Coimbatore, Tamil Nadu, India' },
  { label: 'Product Portfolio', value: 'Electric Motors · Pumps · Compressors · Washers' },
  { label: 'Quality Certifications', value: 'ISO 9001:2015 · BIS Certified' },
  { label: 'Markets Served', value: '10 states across India' },
  { label: 'Team Strength', value: '50+ skilled professionals' },
  { label: 'Key Customers', value: 'OEMs · Distributors · Government Departments · Industrial Buyers' },
  { label: 'Udyam Registration No.', value: 'Available on request' },
  { label: 'GST No.', value: 'Available on request' },
];

export default function About() {
  const { openEnquiry } = useEnquiry();
  usePageMeta(
    'About Us',
    'SLG Motors (Sree Lakshmi Ganapathy Engg. Industries) has manufactured high-efficiency industrial electric motors in Coimbatore, India since 2003 — ISO 9001 certified and BIS compliant.',
  );

  return (
    <div className="page about-page">
      <section className="page-hero page-hero--about">
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
            <span className="page-hero__accent">since 2003.</span>
          </h1>
          <p className="page-hero__description">
            Two decades of building rugged, high-efficiency motors engineered
            for India's demanding industrial conditions.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="about-story__inner container">
          <div className="about-story__text">
            <span className="section-label">WHO WE ARE</span>
            <h2 className="about-story__title">
              A Coimbatore-built manufacturer trusted across India.
            </h2>
            <p>
              Sree Lakshmi Ganapathy Engg. Industries (SLG Motors) designs and
              manufactures AC induction motors — single phase, three phase,
              flange-mounted and loom-duty — alongside pumps, compressors and
              high-pressure wash systems — for industrial, corporate and
              government projects across India.
            </p>
            <p>
              Founded in 2003 by an entrepreneur with hands-on experience in
              motor manufacturing, SLG started independently from a small base
              in rural Tamil Nadu. That single effort has grown into a team of
              50+ skilled professionals playing a major role across 5–8
              districts in Tamil Nadu, with a growing customer base spanning
              10 states.
            </p>
            <p>
              As a purely B2B manufacturer, we work directly with companies,
              corporates and government departments on state and central
              projects — one of the few in our segment doing government
              contract work. Our in-house manufacturing process and refusal to
              compromise on quality is what keeps new bulk-order customers
              coming to us.
            </p>
          </div>
        </div>
      </section>

      <section className="about-factsheet">
        <div className="about-factsheet__inner container">
          <h2 className="about-factsheet__title">Company fact sheet</h2>
          <dl className="factsheet">
            {factSheet.map((fact) => (
              <div key={fact.label} className="factsheet__item">
                <dt className="factsheet__label">{fact.label}</dt>
                <dd className="factsheet__value">{fact.value}</dd>
              </div>
            ))}
          </dl>
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
