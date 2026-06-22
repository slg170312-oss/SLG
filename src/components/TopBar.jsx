const COMPANY_EMAIL = 'sales@slgmotors.in';
const COMPANY_PHONE = '+91 98765 43210';

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar__inner container">
        <div className="topbar__contact">
          <span className="topbar__label">CONTACT</span>
          <span className="topbar__divider" aria-hidden="true">·</span>
          <a className="topbar__contact-item" href={`mailto:${COMPANY_EMAIL}`}>
            {COMPANY_EMAIL}
          </a>
          <span className="topbar__divider" aria-hidden="true">·</span>
          <a
            className="topbar__contact-item"
            href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`}
          >
            {COMPANY_PHONE}
          </a>
        </div>
      </div>
    </div>
  );
}
