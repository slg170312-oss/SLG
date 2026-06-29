import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import { useEnquiry } from '../context/EnquiryContext';

const sectors = [
  {
    title: 'Industrial',
    text: 'Plant rooms, machine shops and process lines — motors and pumps built to plant electricals, duty cycles and ambient conditions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21V10l5 3V10l5 3V10l5 3v8z" />
        <path d="M3 21h18M7 17h2M12 17h2M17 17h2" />
      </svg>
    ),
  },
  {
    title: 'Commercial',
    text: 'Pumps, blowers and motor sets for HVAC plant rooms, hotels, malls, hospitals and high-rise pumping installations.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 21V6l8-3 8 3v15" />
        <path d="M8 21V11h8v10M10 7h.01M14 7h.01M10 14h.01M14 14h.01" />
      </svg>
    ),
  },
  {
    title: 'Residential',
    text: 'Domestic pump sets, monoblock units and small-frame motors supplied in bulk to builders, project contractors and trade distributors.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    title: 'Agriculture',
    text: 'Openwell, borewell and monoblock pump sets and farm-duty motors specified for field voltage, soil and water conditions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22V8" />
        <path d="M12 8c-3 0-5-2-5-5 3 0 5 2 5 5z" />
        <path d="M12 8c3 0 5-2 5-5-3 0-5 2-5 5z" />
        <path d="M12 14c-3 0-5-2-5-5 3 0 5 2 5 5z" />
        <path d="M12 14c3 0 5-2 5-5-3 0-5 2-5 5z" />
      </svg>
    ),
  },
  {
    title: 'Textile',
    text: 'Loom-duty, ring-frame and process-machine motors built to mill electricals, frame profiles and continuous-duty cycles.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 5h16M4 9h16M4 13h16M4 17h16M4 21h16" />
        <path d="M7 3v4M12 3v4M17 3v4" />
      </svg>
    ),
  },
  {
    title: 'Infrastructure',
    text: 'High-pressure wash systems, compressor sets and pumping packages for EPC contractors, public works and utility projects.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18" />
        <path d="M6 21V9l3-2 3 2 3-2 3 2v12" />
        <path d="M9 21v-6M15 21v-6" />
      </svg>
    ),
  },
];

const parameters = [
  { title: 'Windings & Voltage', sub: 'Single, three-phase and special winding builds — non-standard voltages and frequencies on request.' },
  { title: 'Frame & Mounting', sub: 'Foot (B3), flange (B5/B14) and combined mountings; standard and special frame sizes.' },
  { title: 'IP & Insulation', sub: 'Enclosure protection and insulation class specified to the operating environment and ambient temperature.' },
  { title: 'Shaft & Coupling', sub: 'Shaft diameters, lengths, keyways and coupling profiles cut to drawing.' },
  { title: 'Finish & Nameplate', sub: 'Paint shade, branded nameplates and customer-specific identification for OEM supply.' },
  { title: 'Motor + Pump Sets', sub: 'Matched motor, pump and panel packages — wound, assembled and tested as one unit before dispatch.' },
];

const steps = [
  {
    n: '01',
    title: 'Share Specification',
    text: 'Send your drawings, ratings or use-case. Our engineering team reviews feasibility within two working days.',
  },
  {
    n: '02',
    title: 'Quotation',
    text: 'You receive a written quotation covering specification, batch quantity, lead time and commercial terms.',
  },
  {
    n: '03',
    title: 'Sample & Approval',
    text: 'A pre-production sample is built, tested and shared for your approval before the bulk order is released.',
  },
  {
    n: '04',
    title: 'Bulk Production',
    text: 'Batch production at our Coimbatore works — every unit load-tested, insulation-tested and shipped with a test certificate.',
  },
];

export default function Custom() {
  const { openEnquiry } = useEnquiry();
  usePageMeta(
    'Custom Manufacturing',
    'SLG Motors builds custom motors, pumps, compressors and wash systems to specification for bulk OEM, industrial, commercial, residential, agricultural and textile orders — manufactured in Coimbatore, India.',
  );

  return (
    <div className="page custom-page">
      <section className="page-hero">
        <div className="page-hero__overlay" aria-hidden="true" />
        <div className="page-hero__grid" aria-hidden="true" />
        <div className="page-hero__content container">
          <nav className="page-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">HOME</Link>
            <span className="page-hero__crumb-sep" aria-hidden="true">›</span>
            <span className="page-hero__crumb-current">CUSTOM MANUFACTURING</span>
          </nav>
          <div className="page-hero__label">
            <span className="page-hero__label-line" />
            <span>MADE TO ORDER · BULK &amp; OEM</span>
            <span className="page-hero__label-line" />
          </div>
          <h1 className="page-hero__title">
            Built to your
            <br />
            <span className="page-hero__accent">specification.</span>
          </h1>
          <p className="page-hero__description">
            Bulk and OEM manufacturing of motors, pumps, compressors and wash
            systems — engineered to your ratings, mountings and finishes, then
            wound, assembled and tested in-house at our Coimbatore works.
          </p>
        </div>
      </section>

      <section className="about-capabilities">
        <div className="about-capabilities__inner container">
          <span className="section-label section-label--light">WHO WE BUILD FOR</span>
          <h2 className="about-capabilities__title">Sectors we serve</h2>
          <p className="custom-intro">
            We accept custom builds across every sector in which our standard
            range is already operating — supplied exclusively against bulk and
            OEM orders, not single-piece retail.
          </p>
          <div className="capability-grid">
            {sectors.map((s) => (
              <div key={s.title} className="capability-card">
                <span className="capability-card__icon" aria-hidden="true">{s.icon}</span>
                <h3 className="capability-card__title">{s.title}</h3>
                <p className="capability-card__text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-certs">
        <div className="about-certs__inner container">
          <span className="section-label">WHAT WE CUSTOMISE</span>
          <h2 className="about-certs__title">Specifications built to drawing</h2>
          <div className="cert-grid">
            {parameters.map((p) => (
              <div key={p.title} className="cert-card">
                <strong className="cert-card__title">{p.title}</strong>
                <span className="cert-card__sub">{p.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-capabilities">
        <div className="about-capabilities__inner container">
          <span className="section-label section-label--light">HOW WE WORK</span>
          <h2 className="about-capabilities__title">From specification to dispatch</h2>
          <ol className="process-grid" aria-label="Custom manufacturing process">
            {steps.map((s) => (
              <li key={s.n} className="process-card">
                <span className="process-card__num" aria-hidden="true">{s.n}</span>
                <h3 className="process-card__title">{s.title}</h3>
                <p className="process-card__text">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="page-cta">
        <div className="page-cta__overlay" aria-hidden="true" />
        <div className="page-cta__content container">
          <span className="section-label section-label--light">BULK &amp; OEM ENQUIRIES</span>
          <h2 className="page-cta__title">
            Have a bulk requirement? Send your specification.
          </h2>
          <p className="page-cta__note">
            Custom builds are accepted on bulk-order terms only. Share your
            drawing, ratings and quantity — our team will respond with a written
            quotation and an indicative production schedule.
          </p>
          <div className="page-cta__actions">
            <button
              type="button"
              className="btn btn--primary btn--lg"
              onClick={() => openEnquiry('Custom Build (Bulk Order)')}
            >
              SEND SPECIFICATION
            </button>
            <Link to="/products" className="btn btn--ghost btn--lg">
              VIEW STANDARD RANGE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
