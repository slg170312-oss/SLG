// Centralized Google Apps Script endpoint + submit helper, shared by the
// enquiry modal and the contact page. The URL is necessarily public in a
// no-backend setup; abuse is mitigated by a hidden honeypot field, a
// client-side time gate, Google's rate limits, and the manual IsVerified
// review workflow in the sheet.
export const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbylFcEypYV-YH1kHr3FvcN8n1tzPncNRj5VeVDqd6QDV2EM-peVlNMFO34ZGVKwEO4D/exec';

// Appends a row to the Google Sheet. `fields` should carry the sheet columns
// (name, phone, location, email, product) plus the honeypot `_hp`.
export async function submitEnquiry(fields) {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ isActive: 1, isVerified: 0, ...fields }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res;
}
