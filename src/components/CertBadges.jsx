const badges = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M8 14l-2 6 6-3 6 3-2-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
    iconClass: 'cert-badge__icon--blue',
    title: 'ISO 9001:2015',
    subtitle: 'Quality Management',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3l7 3v6c0 4.5-3.5 7.5-7 9-3.5-1.5-7-4.5-7-9V6l7-3z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M9 12l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    iconClass: 'cert-badge__icon--green',
    title: 'BIS CERTIFIED',
    subtitle: 'IS 325 · IS 12615',
  },
  {
    icon: <span className="cert-badge__ie3">IE3</span>,
    iconClass: 'cert-badge__icon--gold',
    title: 'IE3 EFFICIENCY',
    subtitle: 'Premium Grade Motors',
  },
];

export default function CertBadges() {
  return (
    <div className="cert-badges container">
      {badges.map((badge) => (
        <div key={badge.title} className="cert-badge">
          <div className={`cert-badge__icon ${badge.iconClass}`}>{badge.icon}</div>
          <div className="cert-badge__text">
            <strong>{badge.title}</strong>
            <span>{badge.subtitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
