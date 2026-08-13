// Centralized Google Apps Script endpoint + submit helper, shared by the
// enquiry modal and the contact page. The URL is necessarily public in a
// no-backend setup; abuse is mitigated by a hidden honeypot field, a
// client-side time gate, Google's rate limits, and the manual IsVerified
// review workflow in the sheet.
export const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzOkQrLV9MKGddPHnyi5fPdV0g-yJXA8nbVDWb9JgDbKu-uvRtf5lOHXnQK2BAbhLVWdQ/exec';

// Appends a row to the Google Sheet. `fields` should carry the sheet columns
// (name, phone, location, email, product) plus the honeypot `_hp`.
export async function submitEnquiry(fields) {
  const res = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ isActive: 1, isVerified: 0, ...fields }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  if (data.status !== 'ok') {
    throw new Error(data.message || 'Enquiry submission failed');
  }
  return data;
}
