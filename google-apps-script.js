// ============================================================
// Google Apps Script — paste this into Extensions → Apps Script
// in your Google Sheet, then Deploy → Web App:
//   Execute as: Me
//   Who has access: Anyone
// Copy the deployed URL into src/components/EnquiryModal.jsx
// ============================================================

const SHEET_NAME = 'Sheet1'; // Change if your sheet tab has a different name

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Honeypot check — if the hidden field has a value, it's a bot
    if (data._hp) {
      return json({ status: 'ok' }); // Silently discard
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    sheet.appendRow([
      new Date(),           // A: Timestamp
      data.name || '',      // B: Name
      data.phone || '',     // C: Phone
      data.location || '',  // D: Location
      data.email || '',     // E: Email
      data.product || '',   // F: Product
      data.isActive,        // G: IsActive  (always 1 from React)
      data.isVerified,      // H: IsVerified (always 0 from React)
    ]);

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
