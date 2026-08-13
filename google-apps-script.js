// ============================================================
// Google Apps Script — paste this into Extensions → Apps Script
// in your Google Sheet, then Deploy → Web App:
//   Execute as: Me
//   Who has access: Anyone
// Copy the deployed URL into src/components/EnquiryModal.jsx
// ============================================================

const SHEET_NAME = 'Sheet1'; // Change if your sheet tab has a different name
const NOTIFY_EMAIL = 'slg170312@gmail.com'; // TEMPORARY test address — replace with official company email later

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Honeypot check — if the hidden field has a value, it's a bot
    if (data._hp) {
      return json({ status: 'ok' }); // Silently discard
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const timestamp = new Date();

    sheet.appendRow([
      timestamp,             // A: Timestamp
      data.name || '',      // B: Name
      data.phone || '',     // C: Phone
      data.location || '',  // D: Location
      data.email || '',     // E: Email
      data.product || '',   // F: Product
      data.isActive,        // G: IsActive  (always 1 from React)
      data.isVerified,      // H: IsVerified (always 0 from React)
    ]);

    // Email is a convenience on top of the sheet write, which is the
    // source of truth. If sending fails for any reason, swallow it here
    // so the row that's already saved still counts as a success.
    try {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: 'New Enquiry — ' + (data.name || 'Unknown'),
        body:
          'A new enquiry was submitted on the SLG Motors website.\n\n' +
          'Name: ' + (data.name || '') + '\n' +
          'Phone: ' + (data.phone || '') + '\n' +
          'Location: ' + (data.location || '') + '\n' +
          'Email: ' + (data.email || '') + '\n' +
          'Product: ' + (data.product || '') + '\n' +
          'Timestamp: ' + timestamp,
      });
    } catch (mailErr) {
      // Ignore — the row is already saved, so the submission still succeeded.
    }

    return json({ status: 'ok' });
  } catch (err) {
    return json({ status: 'error', message: err.toString() });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
