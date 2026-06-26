import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// SPA fix: reset scroll to the top on every route change (otherwise the new
// page opens at whatever scroll position the previous one was left at).
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}
