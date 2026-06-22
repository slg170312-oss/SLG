import { useEffect, useMemo, useState } from 'react';
import { categories } from '../data/productCategories';
import { countries } from '../data/countries';
import CountrySelect from './CountrySelect';

const EMAIL_PATTERN = '[^\\s@]+@[^\\s@]+\\.[^\\s@]+';
const NAME_MAX = 35;
const LOCATION_MAX = 250;

export default function EnquiryModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    country: 'IN',
    phone: '',
    location: '',
    email: '',
    product: '',
  });

  const selectedCountry = useMemo(
    () => countries.find((c) => c.iso2 === form.country) ?? countries[0],
    [form.country]
  );

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

    if (name === 'country') {
      const next = countries.find((c) => c.iso2 === value) ?? countries[0];
      setForm((prev) => ({ ...prev, country: value, phone: prev.phone.slice(0, next.digits) }));
      return;
    }

    if (name === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, selectedCountry.digits);
      setForm((prev) => ({ ...prev, phone: digits }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Front-end only for now — wire this up to an API/email service to persist it.
    setSubmitted(true);
  };

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

        {submitted ? (
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
                  required
                />
              </div>

              <div className="field">
                <label className="field__label" htmlFor="enq-phone">
                  Contact No.
                </label>
                <div className="phone-row">
                  <CountrySelect
                    value={form.country}
                    onChange={(iso2) =>
                      handleChange({ target: { name: 'country', value: iso2 } })
                    }
                  />
                  <input
                    className="field__input"
                    id="enq-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={`${selectedCountry.digits}-digit number`}
                    maxLength={selectedCountry.digits}
                    pattern={`\\d{${selectedCountry.digits}}`}
                    title={`Enter a valid ${selectedCountry.digits}-digit number for ${selectedCountry.name}.`}
                    required
                  />
                </div>
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
                  <option value="Other">Other / Not sure</option>
                </select>
              </div>

              <button className="btn btn--primary btn--lg" type="submit">
                SUBMIT ENQUIRY
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
