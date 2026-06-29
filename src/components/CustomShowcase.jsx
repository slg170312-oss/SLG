import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    tag: 'INDUSTRIAL',
    title: 'Plant motors and pumps, configured to your line.',
    text: 'Motors and pumps built to plant electricals, duty cycles and ambient conditions — supplied in batch quantities to OEMs and EPC contractors.',
  },
  {
    tag: 'AGRICULTURE',
    title: 'Farm-duty pump sets, specified to your terrain.',
    text: 'Openwell, borewell and monoblock pump sets configured to local voltage, soil and water conditions — bulk supply for distributors and project contractors.',
  },
  {
    tag: 'TEXTILE',
    title: 'Loom-duty motors for the mill floor.',
    text: 'Ring-frame, loom and process-machine motors built to mill electricals and continuous-duty cycles — supplied in matched, tested batches.',
  },
  {
    tag: 'OEM BULK',
    title: 'OEM bulk builds, manufactured in-house.',
    text: 'Wound, machined, assembled and tested at our Coimbatore works — your specifications, our quality control, batch-supply terms.',
  },
];

const ROTATE_MS = 10000;

export default function CustomShowcase() {
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setIndex((i) => (i + 1) % slides.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="custom-showcase"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onFocus={() => { pausedRef.current = true; }}
      onBlur={() => { pausedRef.current = false; }}
      aria-roledescription="carousel"
      aria-label="Custom manufacturing capability showcase"
    >
      <div className="custom-showcase__overlay" aria-hidden="true" />
      <div className="custom-showcase__grid" aria-hidden="true" />
      <div className="custom-showcase__inner container">
        <span className="section-label section-label--light">OUR SPECIALTY · CUSTOM MANUFACTURING</span>
        <div className="custom-showcase__viewport">
          {slides.map((s, i) => (
            <div
              key={s.tag}
              className={`custom-showcase__slide ${i === index ? 'custom-showcase__slide--active' : ''}`}
              aria-hidden={i !== index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}: ${s.tag}`}
            >
              <span className="custom-showcase__tag">{s.tag}</span>
              <h2 className="custom-showcase__title">{s.title}</h2>
              <p className="custom-showcase__text">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="custom-showcase__actions">
          <Link to="/custom" className="btn btn--primary btn--lg">
            VIEW CUSTOM MANUFACTURING
          </Link>
        </div>
        <div className="custom-showcase__dots" role="tablist" aria-label="Choose showcase slide">
          {slides.map((s, i) => (
            <button
              key={s.tag}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${s.tag} slide`}
              className={`custom-showcase__dot ${i === index ? 'custom-showcase__dot--active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
