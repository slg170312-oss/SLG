// Single source of truth for company contact details and identity.
// NOTE: email and CIN are still placeholders — update before launch.
export const siteConfig = {
  name: 'SLG Motors',
  fullName: 'Sree Lakshmi Ganapathy Engg. Industries',
  legalName: 'Sree Lakshmi Ganapathy Engg. Industries',
  established: 2003,
  cin: 'U31100TN2003PTC054321', // TODO: placeholder only — replace with real CIN before launch
  tagline: 'Precision Motors for India.',
  email: 'sales@slgmotors.in', // TODO: replace with real email
  phone: '+91 98435 50403',
  phoneAlt: '+91 93632 44891',
  whatsapp: '+91 98435 50403',
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
