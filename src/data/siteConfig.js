// Single source of truth for company contact details and identity.
// NOTE: values below are placeholders — update them with the real
// business email, phone, address and CIN before launch.
export const siteConfig = {
  name: 'SLG Motors',
  legalName: 'SLG Motors Pvt. Ltd.',
  established: 1989,
  cin: 'U31100MH1989PTC054321',
  tagline: 'Precision Motors for India.',
  email: 'sales@slgmotors.in',
  phone: '+91 98765 43210',
  whatsapp: '+91 98765 43210',
  address: {
    line1: 'Plot No. 14, MIDC Industrial Area',
    line2: 'Pune, Maharashtra 411019',
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
