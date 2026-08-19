import { Link } from 'react-router-dom';

export default function CustomShowcase() {
  return (
    <section className="custom-showcase" aria-labelledby="custom-showcase-title">
      <div className="custom-showcase__overlay" aria-hidden="true" />
      <div className="custom-showcase__grid" aria-hidden="true" />

      <div className="custom-showcase__inner container">
        <span className="section-label section-label--light">
          OUR SPECIALTY · CUSTOM MANUFACTURING
        </span>
        <h2 className="custom-showcase__title" id="custom-showcase-title">
          We build motors to your exact requirement.
        </h2>
        <p className="custom-showcase__lead">
          Tell us the voltage, frame size, mounting and shaft you need, and we
          build to that. Winding, machining, assembly and testing are all done
          in our own factory, start to finish. We never compromise on quality,
          whatever the order size.
        </p>
        <div className="custom-showcase__actions">
          <Link to="/custom" className="btn btn--primary btn--lg">
            VIEW CUSTOM MANUFACTURING
          </Link>
        </div>
      </div>
    </section>
  );
}
