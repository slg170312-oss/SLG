// Single source of truth for company contact details and identity.
// NOTE: email, udyamNumber and gstNumber are still placeholders — update before launch.
// Legal entity is an MSME (Udyam registered), NOT a Private Limited company — do not add a CIN.
export const siteConfig = {
  name: 'SLG Motors',
  fullName: 'Sree Lakshmi Ganapathy Engg. Industries',
  legalName: 'Sree Lakshmi Ganapathy Engg. Industries',
  established: 2003,
  legalStatus: 'MSME (Udyam Registered)',
  udyamNumber: null, // TODO: add real Udyam Registration No. once provided
  gstNumber: null, // TODO: add real GST No. once provided
  tagline: 'Precision Motors for India.',
  email: 'slgengg@mail.com',
  phone: '+91 98435 50403',
  phoneAlt: '+91 93632 44891',
  whatsapp: '+91 98435 50403',
  // Social profiles are in progress. Until the real SLG profile exists for
  // each platform, these point at the platform's general site (not a dead
  // "#" link) — replace each with the real profile URL once it's live.
  socials: {
    youtube: 'https://www.youtube.com/', // TODO: replace with the real channel URL once live
    instagram: 'https://www.instagram.com/', // TODO: replace with the real profile URL once live
    x: 'https://www.x.com/', // TODO: replace with the real profile URL once live
  },
  address: {
    line1: '7/74, SKV Employees Colony, Kamatchi Puram',
    line2: 'Coimbatore 641016',
    country: 'India',
  },
  hours: [
    { days: 'Mon – Sat', time: '9:30 AM – 6:30 PM IST' },
    { days: 'Sunday', time: 'Closed' },
  ],
};

// Phone as a clean tel: href (strip spaces and punctuation except leading +).
export const telHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`;
export const mailHref = `mailto:${siteConfig.email}`;

// Base site URL — used to build per-page canonical links. Matches the
// origin already used for OG/Twitter tags and the sitemap in index.html.
export const siteUrl = 'https://sreelakshmiganapathyengg.netlify.app';
