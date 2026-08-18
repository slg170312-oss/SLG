// ============================================================
// Google Apps Script — paste this into Extensions → Apps Script
// in your Google Sheet, then Deploy → Web App:
//   Execute as: Me
//   Who has access: Anyone
// Copy the deployed URL into src/components/EnquiryModal.jsx
// ============================================================

const SHEET_NAME = 'Sheet1'; // Change if your sheet tab has a different name
const NOTIFY_EMAIL = 'slg170312@gmail.com'; // TEMPORARY test address — replace with official company email later

// Google Sheets treats a cell starting with =, +, -, @, tab or CR as a
// formula, not text. Without this, a submitted field like
// =HYPERLINK("http://evil.example","Click me") becomes a live, clickable
// formula the moment someone opens the sheet. Prefixing with an apostrophe
// forces Sheets to store it as literal text instead.
function sanitizeForSheet(value) {
  const str = String(value == null ? '' : value);
  return /^[=+\-@\t\r]/.test(str) ? "'" + str : str;
}

// The React form enforces these lengths client-side, but the endpoint is
// public, so anyone can POST to it directly and skip that check. Truncating
// here keeps the sheet from being flooded with oversized junk (and keeps the
// notification email from ballooning) without rejecting genuine submissions,
// which never exceed these lengths anyway.
const FIELD_LIMITS = { name: 35, phone: 20, location: 500, email: 100, product: 100 };

function clean(value, maxLength) {
  return sanitizeForSheet(String(value == null ? '' : value).slice(0, maxLength));
}

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
      timestamp,                                    // A: Timestamp
      clean(data.name, FIELD_LIMITS.name),          // B: Name
      clean(data.phone, FIELD_LIMITS.phone),        // C: Phone
      clean(data.location, FIELD_LIMITS.location),  // D: Location
      clean(data.email, FIELD_LIMITS.email),        // E: Email
      clean(data.product, FIELD_LIMITS.product),    // F: Product
      1,                                             // G: IsActive (always 1)
      0,                                             // H: IsVerified — always starts
                                                      //    unverified; only set to 1 by
                                                      //    editing the sheet directly,
                                                      //    never trusted from the request
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
    // Log the real error for debugging (visible in Apps Script's own
    // execution log), but don't echo internal error details back to
    // whoever called the endpoint.
    console.error(err);
    return json({ status: 'error', message: 'Submission failed. Please try again.' });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
