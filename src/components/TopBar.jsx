import { siteConfig, telHref, mailHref } from '../data/siteConfig';

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar__inner container">
        <div className="topbar__contact">
          <span className="topbar__label">CONTACT</span>
          <span className="topbar__divider" aria-hidden="true">·</span>
          <a className="topbar__contact-item" href={mailHref}>
            {siteConfig.email}
          </a>
          <span className="topbar__divider" aria-hidden="true">·</span>
          <a className="topbar__contact-item" href={telHref}>
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
