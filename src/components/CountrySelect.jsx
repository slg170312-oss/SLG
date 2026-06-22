import { useEffect, useRef, useState } from 'react';
import { countries } from '../data/countries';

const flagSrc = (iso2) => `https://flagcdn.com/w40/${iso2.toLowerCase()}.png`;

export default function CountrySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = countries.find((c) => c.iso2 === value) ?? countries[0];

  useEffect(() => {
    if (!open) return undefined;
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const choose = (iso2) => {
    onChange(iso2);
    setOpen(false);
  };

  return (
    <div className="country-select" ref={ref}>
      <button
        type="button"
        className="country-select__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country code: ${selected.name} (${selected.dial})`}
        onClick={() => setOpen((o) => !o)}
      >
        <img
          className="country-select__flag"
          src={flagSrc(selected.iso2)}
          alt=""
          width="20"
          height="15"
        />
        <span className="country-select__dial">{selected.dial}</span>
        <svg
          className="country-select__chevron"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open && (
        <ul className="country-select__list" role="listbox">
          {countries.map((c) => (
            <li key={c.iso2}>
              <button
                type="button"
                role="option"
                aria-selected={c.iso2 === value}
                className={`country-select__option ${c.iso2 === value ? 'is-selected' : ''}`}
                onClick={() => choose(c.iso2)}
              >
                <img
                  className="country-select__flag"
                  src={flagSrc(c.iso2)}
                  alt=""
                  width="20"
                  height="15"
                />
                <span className="country-select__name">{c.name}</span>
                <span className="country-select__dial">{c.dial}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
