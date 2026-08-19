import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// SPA fix: reset scroll to the top on every route change (otherwise the new
// page opens at whatever scroll position the previous one was left at).
export default function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // Product arrows, dots and cards rewrite the URL while the visitor is part
    // way down the detail panel. Those navigations flag themselves so the page
    // isn't yanked back to the top mid-browse; everything else still resets.
    if (state?.preserveScroll) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, state]);

  return null;
}
