export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__left">
          <button type="button" className="footer__cookie-btn">
            Manage cookies or opt out
          </button>
          <span className="footer__company">
            PVT. LTD. · CIN U31100MH1989PTC054321
          </span>
        </div>
        <nav className="footer__nav" aria-label="Footer navigation">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Sale</a>
          <a href="#">Dealer Locator</a>
        </nav>
      </div>
    </footer>
  );
}
