const stats = [
  { value: '2,400+', label: 'Motor Variants' },
  { value: '38', label: 'States Served' },
  { value: '35 yr', label: 'Manufacturing Experience' },
  { value: 'ISO 9001', suffix: ':2015 Certified', label: '' },
];

export default function StatsBar() {
  return (
    <section className="stats-bar">
      <div className="stats-bar__inner container">
        {stats.map((stat) => (
          <div key={stat.value} className="stat">
            <div className="stat__value">
              {stat.value}
              {stat.suffix && <span className="stat__suffix">{stat.suffix}</span>}
            </div>
            {stat.label && <div className="stat__label">{stat.label}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
