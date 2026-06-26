import { useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';

// Sets document.title and the meta description per route. Note: this only
// updates titles/descriptions for users navigating the SPA and for search
// engines that execute JS — social-card crawlers read the static index.html,
// so the canonical OG tags live there.
export default function usePageMeta(title, description) {
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
  }, [title, description]);
}
