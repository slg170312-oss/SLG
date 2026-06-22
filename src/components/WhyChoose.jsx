const features = [
  { value: '0.18 kW – 315 kW', label: 'Power Range' },
  { value: 'IP55 / IP65', label: 'Protection Class' },
  { value: '-20°C to +60°C', label: 'Ambient Temp Range' },
  { value: '48h Dispatch', label: 'Standard Stock Items' },
];

export default function WhyChoose() {
  return (
    <section className="why-choose">
      <div className="why-choose__inner container">
        <div className="why-choose__content">
          <span className="section-label">WHY CHOOSE SLG</span>
          <h2 className="why-choose__title">
            Engineering-grade motors built for Indian conditions.
          </h2>
          <p className="why-choose__description">
            Designed for high ambient temperatures, voltage fluctuations, and dusty
            environments — SLG motors deliver class-leading MTBF across pumps,
            compressors, conveyors, and CNC applications.
          </p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <div key={feature.label} className="feature-card">
              <strong className="feature-card__value">{feature.value}</strong>
              <span className="feature-card__label">{feature.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
