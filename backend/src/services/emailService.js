import nodemailer from 'nodemailer';

/**
 * Email Notification Service for Nidhi's Baby Massage Indore
 * Automatically dispatches real-time email alerts to the owner on new enquiries.
 */

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for 465, false for 587
      auth: { user, pass },
    });
  }

  return transporter;
}

export async function sendNewEnquiryEmail(enquiry) {
  const ownerEmail = process.env.OWNER_EMAIL || 'admin@nidhibabymassage.com';
  const fullAddress = [enquiry.unitNo, enquiry.society, enquiry.locality]
    .filter(Boolean)
    .join(', ');

  const formattedDate = enquiry.preferredDate
    ? new Date(enquiry.preferredDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Not specified';

  const cleanPhone = enquiry.phone.replace(/\D/g, '');
  const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
  const whatsappUrl = `https://wa.me/${phoneWithCountry}`;

  const mailOptions = {
    from: `"Nidhi's Baby Massage Portal" <${process.env.SMTP_USER || 'no-reply@nidhibabymassage.com'}>`,
    to: ownerEmail,
    subject: `👶 New Baby Massage Enquiry #${enquiry.id.slice(0, 8)} - ${enquiry.parentName} (${enquiry.locality})`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FFFBF4; color: #2D1E1A; margin: 0; padding: 20px; }
          .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #FFCED8; padding: 24px; box-shadow: 0 4px 12px rgba(217, 107, 130, 0.08); }
          .header { text-align: center; border-bottom: 1px solid #FFCED8; padding-bottom: 16px; margin-bottom: 20px; }
          .header h1 { color: #2D1E1A; font-size: 20px; margin: 0; }
          .header span { color: #D96B82; font-weight: bold; }
          .ref-badge { display: inline-block; background: #FFDDDD; color: #2D1E1A; font-family: monospace; font-size: 12px; font-weight: bold; padding: 4px 10px; border-radius: 20px; margin-top: 8px; }
          .table { width: 100%; border-collapse: collapse; margin-top: 12px; }
          .table td { padding: 10px 12px; border-bottom: 1px solid #F4E8E1; font-size: 14px; }
          .label { color: #7A635A; font-weight: 600; width: 38%; }
          .value { color: #2D1E1A; font-weight: 500; }
          .highlight { font-weight: 700; color: #2D1E1A; }
          .note-box { background: #FFF8EE; border: 1px solid #F0DDC9; border-radius: 8px; padding: 12px; margin-top: 16px; font-size: 13px; color: #5C453E; }
          .actions { margin-top: 24px; text-align: center; }
          .btn-wa { display: inline-block; background: #25D366; color: #ffffff !important; text-decoration: none; font-weight: bold; font-size: 13px; padding: 10px 20px; border-radius: 24px; margin: 4px; }
          .btn-call { display: inline-block; background: #2D1E1A; color: #ffffff !important; text-decoration: none; font-weight: bold; font-size: 13px; padding: 10px 20px; border-radius: 24px; margin: 4px; }
          .footer { text-align: center; font-size: 11px; color: #9E8981; margin-top: 24px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="header">
            <h1>Nidhi's <span>Baby Massage</span> Indore</h1>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #7A635A;">Doorstep Infant Care • New Booking Enquiry</p>
            <div class="ref-badge">Ref #${enquiry.id.slice(0, 8)}</div>
          </div>

          <table class="table">
            <tr>
              <td class="label">Parent Name:</td>
              <td class="value highlight">${enquiry.parentName}</td>
            </tr>
            <tr>
              <td class="label">Contact Phone:</td>
              <td class="value highlight">+91 ${enquiry.phone}</td>
            </tr>
            <tr>
              <td class="label">Baby's Age:</td>
              <td class="value">${enquiry.babyAgeGroup}</td>
            </tr>
            <tr>
              <td class="label">Preferred Date:</td>
              <td class="value highlight">${formattedDate}</td>
            </tr>
            <tr>
              <td class="label">Indore Address:</td>
              <td class="value">${fullAddress || 'Indore'}</td>
            </tr>
          </table>

          ${enquiry.additionalMessage ? `
            <div class="note-box">
              <strong>Parent's Special Note:</strong><br/>
              "${enquiry.additionalMessage}"
            </div>
          ` : ''}

          <div class="actions">
            <a href="${whatsappUrl}" class="btn-wa">Chat with Parent on WhatsApp</a>
            <a href="tel:${enquiry.phone}" class="btn-call">Call Parent (+91 ${enquiry.phone})</a>
          </div>

          <div class="footer">
            Received automatically from Nidhi's Baby Massage Portal • Indore, MP
          </div>
        </div>
      </body>
      </html>
    `,
  };

  const client = getTransporter();

  // If SMTP is not yet configured, log cleanly in Dev Simulation Mode
  if (!client) {
    console.log('\n[Email Service] (Dev Simulation Mode - Set SMTP_USER & SMTP_PASS in backend/.env to send live emails)');
    console.log(`[Alert to Owner: ${ownerEmail}]`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log(`Parent: ${enquiry.parentName} | Phone: +91 ${enquiry.phone} | Locality: ${enquiry.locality}`);
    console.log('--------------------------------------------------\n');
    return { success: true, simulated: true };
  }

  try {
    const info = await client.sendMail(mailOptions);
    console.log(`[Email Service] ✅ Booking alert email delivered to ${ownerEmail}. Message ID:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Email Service] Error dispatching email:', error.message);
    return { success: false, error: error.message };
  }
}
