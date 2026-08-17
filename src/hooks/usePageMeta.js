import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig, siteUrl } from '../data/siteConfig';

// Sets document.title, the meta description, and the canonical link per
// route. Note: this only updates for users navigating the SPA and for search
// engines that execute JS — social-card crawlers read the static index.html,
// so the homepage OG tags there stay as the fallback for shared links.
export default function usePageMeta(title, description) {
  const location = useLocation();

  useEffect(() => {
    document.title = title
      ? `${title} | ${siteConfig.name}`
      : `${siteConfig.name} — ${siteConfig.tagline}`;

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${siteUrl}${location.pathname}`);
  }, [title, description, location.pathname]);
}
