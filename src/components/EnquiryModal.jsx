import { useEffect, useRef, useState } from 'react';
import { categories } from '../data/productCategories';
import { submitEnquiry } from '../utils/enquiry';

const EMAIL_PATTERN = '[^\\s@]+@[^\\s@]+\\.[^\\s@]+';
const NAME_MAX = 35;
const PHONE_DIGITS = 10;
const LOCATION_MAX = 250;

export default function EnquiryModal({ onClose, prefillProduct = '' }) {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [form, setForm] = useState({
    name: '',
    phone: '',
    location: '',
    email: '',
    product: prefillProduct,
  });
  const openedAt = useRef(Date.now());

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

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

    // Time-based spam check — reject if submitted < 2s after opening
    if (Date.now() - openedAt.current < 2000) return;

    setStatus('submitting');

    try {
      await submitEnquiry({
        ...form,
        _hp: document.getElementById('enq-hp')?.value || '',
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const isSubmitting = status === 'submitting';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal__close"
          type="button"
          aria-label="Close enquiry form"
          onClick={onClose}
        >
          ×
        </button>

        {status === 'success' ? (
          <div className="enquiry-success">
            <span className="enquiry-success__icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h2 className="enquiry-success__title">Enquiry submitted successfully</h2>
            <p className="enquiry-success__text">
              Thank you, {form.name || 'there'}. Our sales team will review your
              requirement and get back to you shortly.
            </p>
            <button className="btn btn--primary btn--lg" type="button" onClick={onClose}>
              DONE
            </button>
          </div>
        ) : (
          <>
            <h2 className="modal__title" id="enquiry-title">
              Product Enquiry
            </h2>
            <p className="modal__subtitle">
              Tell us what you need and our team will get back to you.
            </p>
            <form className="enquiry-form" onSubmit={handleSubmit}>
              {/* Honeypot — hidden from humans, bots auto-fill it */}
              <input
                id="enq-hp"
                name="_hp"
                type="text"
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
              />

              <div className="field">
                <div className="field__head">
                  <label className="field__label" htmlFor="enq-name">
                    Name
                  </label>
                  <span className="field__counter">
                    {form.name.length}/{NAME_MAX}
                  </span>
                </div>
                <input
                  className="field__input"
                  id="enq-name"
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

              <div className="field">
                <label className="field__label" htmlFor="enq-phone">
                  Contact No.
                </label>
                <input
                  className="field__input"
                  id="enq-phone"
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
                <div className="field__head">
                  <label className="field__label" htmlFor="enq-location">
                    Location
                  </label>
                  <span className="field__counter">
                    {form.location.length}/{LOCATION_MAX}
                  </span>
                </div>
                <textarea
                  className="field__input field__textarea"
                  id="enq-location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="City, state or full address"
                  maxLength={LOCATION_MAX}
                  rows={2}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="field">
                <label className="field__label" htmlFor="enq-email">
                  Email <span className="field__optional">(optional)</span>
                </label>
                <input
                  className="field__input"
                  id="enq-email"
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

              <div className="field">
                <label className="field__label" htmlFor="enq-product">
                  Product Required
                </label>
                <select
                  className="field__select"
                  id="enq-product"
                  name="product"
                  value={form.product}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                >
                  <option value="" disabled>
                    Select a product
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                  <option value="Custom Build (Bulk Order)">Custom Build (Bulk Order)</option>
                  <option value="Other">Other / Not sure</option>
                </select>
              </div>

              {status === 'error' && (
                <p className="enquiry-error">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                className="btn btn--primary btn--lg"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    SUBMITTING…
                  </>
                ) : (
                  'SUBMIT ENQUIRY'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
