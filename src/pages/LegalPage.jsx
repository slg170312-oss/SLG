import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import { mailHref, siteConfig } from '../data/siteConfig';

// Honest, plain-language summaries — not a substitute for a full legal review.
// Replace/expand these with counsel-approved policy text before launch.
const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    crumb: 'PRIVACY POLICY',
    label: 'YOUR DATA · SLG MOTORS',
    meta: 'How SLG Motors collects, uses and protects the information you submit through enquiry and contact forms.',
    sections: [
      {
        title: 'What we collect',
        text: 'When you submit an enquiry or contact form we collect the name, phone number, optional email address, product interest and requirement details you choose to provide.',
      },
      {
        title: 'How we use it',
        text: 'We use this information only to respond to your enquiry, prepare quotations and connect you with the nearest authorised dealer. We do not sell your information to third parties.',
      },
      {
        title: 'Where it is stored',
        text: 'Submissions are recorded in a private spreadsheet accessible only to authorised SLG Motors personnel and are reviewed manually before any follow-up.',
      },
      {
        title: 'Your choices',
        text: 'You may request access to, correction of, or deletion of the information you have shared at any time by writing to us.',
      },
    ],
  },
  terms: {
    title: 'Terms of Sale',
    crumb: 'TERMS OF SALE',
    label: 'COMMERCIAL TERMS · SLG MOTORS',
    meta: 'A summary of the terms under which SLG Motors quotes, supplies and warrants its products.',
    sections: [
      {
        title: 'Quotations',
        text: 'Prices, lead times and availability shared in response to an enquiry are indicative and confirmed only on a formal proforma invoice or order acknowledgement.',
      },
      {
        title: 'Specifications',
        text: 'Product specifications are subject to continuous improvement and may change without prior notice. Always confirm critical ratings against the latest datasheet at the time of order.',
      },
      {
        title: 'Warranty',
        text: 'Products carry the standard SLG Motors manufacturing warranty against defects in material and workmanship, subject to correct installation and rated operating conditions.',
      },
      {
        title: 'Orders & dispatch',
        text: 'Standard stock items are typically dispatched within 48 hours of confirmed order; made-to-order variants are scheduled at the time of acknowledgement.',
      },
    ],
  },
};

export default function LegalPage({ page }) {
  const content = CONTENT[page] ?? CONTENT.privacy;
  usePageMeta(content.title, content.meta);

  return (
    <div className="page legal-page">
      <section className="page-hero">
        <div className="page-hero__overlay" aria-hidden="true" />
        <div className="page-hero__grid" aria-hidden="true" />
        <div className="page-hero__content container">
          <nav className="page-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">HOME</Link>
            <span className="page-hero__crumb-sep" aria-hidden="true">›</span>
            <span className="page-hero__crumb-current">{content.crumb}</span>
          </nav>
          <div className="page-hero__label">
            <span className="page-hero__label-line" />
            <span>{content.label}</span>
            <span className="page-hero__label-line" />
          </div>
          <h1 className="page-hero__title">{content.title}</h1>
        </div>
      </section>

      <section className="legal-body">
        <div className="legal-body__inner container">
          <p className="legal-note">
            This is a plain-language summary for convenience. For the complete,
            current policy or any clarification, please{' '}
            <a href={mailHref}>email {siteConfig.email}</a>.
          </p>
          {content.sections.map((s) => (
            <div key={s.title} className="legal-section">
              <h2 className="legal-section__title">{s.title}</h2>
              <p className="legal-section__text">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
