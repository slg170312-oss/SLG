import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import { categories } from '../data/productCategories';
import { siteConfig, telHref, mailHref } from '../data/siteConfig';
import { submitEnquiry } from '../utils/enquiry';

const NAME_MAX = 35;
const PHONE_DIGITS = 10;
const MESSAGE_MAX = 500;
const EMAIL_PATTERN = '[^\\s@]+@[^\\s@]+\\.[^\\s@]+';

const MailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);
const PhoneIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
);
const PinIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
const ClockIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export default function Contact() {
  usePageMeta(
    'Contact',
    'Contact SLG Motors for industrial motor, pump, compressor and wash-system enquiries, dealer locations and wholesale pricing.',
  );

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    product: '',
    message: '',
  });
  const openedAt = useRef(Date.now());

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, PHONE_DIGITS);
      setForm((prev) => ({ ...prev, phone: digits }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Date.now() - openedAt.current < 2000) return; // time-gate spam check
    setStatus('submitting');
    try {
      await submitEnquiry({
        name: form.name,
        phone: form.phone,
        email: form.email,
        product: form.product,
        // The sheet has no dedicated message column; the free-text requirement
        // is stored in the Location column (used as a general details field).
        location: form.message,
        _hp: document.getElementById('contact-hp')?.value || '',
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const isSubmitting = status === 'submitting';

  const details = [
    { icon: MailIcon, label: 'Email', value: siteConfig.email, href: mailHref },
    { icon: PhoneIcon, label: 'Phone', value: siteConfig.phone, href: telHref },
    {
      icon: PinIcon,
      label: 'Factory & Office',
      value: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
    },
  ];

  return (
    <div className="page contact-page">
      <section className="page-hero">
        <div className="page-hero__overlay" aria-hidden="true" />
        <div className="page-hero__grid" aria-hidden="true" />
        <div className="page-hero__content container">
          <nav className="page-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/">HOME</Link>
            <span className="page-hero__crumb-sep" aria-hidden="true">›</span>
            <span className="page-hero__crumb-current">CONTACT</span>
          </nav>
          <div className="page-hero__label">
            <span className="page-hero__label-line" />
            <span>GET IN TOUCH · SLG MOTORS</span>
            <span className="page-hero__label-line" />
          </div>
          <h1 className="page-hero__title">
            Let's talk
            <br />
            <span className="page-hero__accent">about your requirement.</span>
          </h1>
          <p className="page-hero__description">
            Send us your specification and our sales team will get back to you
            with availability, pricing and the nearest authorised dealer.
          </p>
        </div>
      </section>

      <section className="contact-body">
        <div className="contact-body__inner container">
          <div className="contact-info">
            <span className="section-label">CONTACT DETAILS</span>
            <h2 className="contact-info__title">Reach us directly</h2>

            <ul className="contact-cards">
              {details.map((d) => (
                <li key={d.label} className="contact-card">
                  <span className="contact-card__icon" aria-hidden="true">{d.icon}</span>
                  <div className="contact-card__body">
                    <span className="contact-card__label">{d.label}</span>
                    {d.href ? (
                      <a className="contact-card__value" href={d.href}>{d.value}</a>
                    ) : (
                      <span className="contact-card__value">{d.value}</span>
                    )}
                  </div>
                </li>
              ))}
              <li className="contact-card">
                <span className="contact-card__icon" aria-hidden="true">{ClockIcon}</span>
                <div className="contact-card__body">
                  <span className="contact-card__label">Business Hours</span>
                  {siteConfig.hours.map((h) => (
                    <span key={h.days} className="contact-card__value contact-card__value--muted">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </div>
              </li>
            </ul>

            <iframe
              className="contact-map"
              title="SLG Motors factory & office location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.country}`)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="contact-form-wrap">
            {status === 'success' ? (
              <div className="contact-success">
                <span className="contact-success__icon" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="contact-success__title">Message sent</h3>
                <p className="contact-success__text">
                  Thank you, {form.name || 'there'}. We've received your enquiry and
                  our team will be in touch shortly.
                </p>
              </div>
            ) : (
              <>
                <span className="section-label section-label--light">SEND AN ENQUIRY</span>
                <h2 className="contact-form-wrap__title">Tell us what you need</h2>
                <form className="enquiry-form" onSubmit={handleSubmit}>
                  <input
                    id="contact-hp"
                    name="_hp"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
                  />

                  <div className="field">
                    <div className="field__head">
                      <label className="field__label" htmlFor="contact-name">Name</label>
                      <span className="field__counter">{form.name.length}/{NAME_MAX}</span>
                    </div>
                    <input
                      className="field__input"
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      maxLength={NAME_MAX}
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  <div className="contact-form__row">
                    <div className="field">
                      <label className="field__label" htmlFor="contact-phone">Contact No.</label>
                      <input
                        className="field__input"
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder={`${PHONE_DIGITS}-digit number`}
                        maxLength={PHONE_DIGITS}
                        pattern={`\\d{${PHONE_DIGITS}}`}
                        title={`Enter a valid ${PHONE_DIGITS}-digit phone number.`}
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                    <div className="field">
                      <label className="field__label" htmlFor="contact-email">
                        Email <span className="field__optional">(optional)</span>
                      </label>
                      <input
                        className="field__input"
                        id="contact-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        pattern={EMAIL_PATTERN}
                        title="Enter a valid email address, e.g. name@company.com"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="field__label" htmlFor="contact-product">Product Required</label>
                    <select
                      className="field__select"
                      id="contact-product"
                      name="product"
                      value={form.product}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                    >
                      <option value="" disabled>Select a product</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                      ))}
                      <option value="Custom Build (Bulk Order)">Custom Build (Bulk Order)</option>
                      <option value="Other">Other / Not sure</option>
                    </select>
                  </div>

                  <div className="field">
                    <div className="field__head">
                      <label className="field__label" htmlFor="contact-message">Message</label>
                      <span className="field__counter">{form.message.length}/{MESSAGE_MAX}</span>
                    </div>
                    <textarea
                      className="field__input field__textarea"
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Quantities, ratings, location or any specific requirement"
                      maxLength={MESSAGE_MAX}
                      rows={4}
                      disabled={isSubmitting}
                      required
                    />
                  </div>

                  {status === 'error' && (
                    <p className="enquiry-error">Something went wrong. Please try again.</p>
                  )}

                  <button className="btn btn--primary btn--lg" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className="spinner" aria-hidden="true" />
                        SENDING…
                      </>
                    ) : (
                      'SEND ENQUIRY'
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
