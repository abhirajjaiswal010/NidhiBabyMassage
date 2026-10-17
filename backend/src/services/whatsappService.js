/**
 * WhatsApp Notification Service for Nidhi's Baby Massage
 * Dispatches real-time booking alerts directly to the owner's WhatsApp (+91 93436 08901).
 * 
 * Supports:
 * 1. CallMeBot (100% Free, instant personal WhatsApp bot, zero verification needed)
 * 2. Meta WhatsApp Cloud API (Official Business API)
 * 3. Webhook (Zapier, Pabbly, Make.com, Wati, Gupshup, etc.)
 * 4. Dev Simulation (Logs rich formatted message to console when no key is set)
 */

export async function notifyNewEnquiry(enquiry) {
  const recipient = process.env.NIDHI_ALERT_PHONE_NUMBER || process.env.CALLMEBOT_PHONE || '919343608901';

  const fullAddress = [enquiry.unitNo, enquiry.society, enquiry.locality]
    .filter(Boolean)
    .join(', ');

  const formattedDate = new Date(enquiry.preferredDate).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const alertText = 
    `🌸 *NEW BABY MASSAGE ENQUIRY* 🌸\n` +
    `──────────────────────────\n` +
    `*Ref ID:* #${enquiry.id.slice(0, 8)}\n` +
    `*Parent Name:* ${enquiry.parentName}\n` +
    `*Phone:* +91 ${enquiry.phone}\n` +
    `*Baby Age:* ${enquiry.babyAgeGroup}\n` +
    `*Preferred Date:* ${formattedDate}\n` +
    `*Address:* ${fullAddress || 'Indore'}\n` +
    (enquiry.additionalMessage ? `*Special Note:* "${enquiry.additionalMessage}"\n` : '') +
    `──────────────────────────\n` +
    `👉 *Quick Action*: Tap to call or chat with ${enquiry.parentName} at https://api.whatsapp.com/send?phone=91${enquiry.phone.replace(/\D/g, '')}`;

  let dispatched = false;

  // 1. PRIORITY 1: CallMeBot (Free, Instant, Personal WhatsApp Gateway)
  const callMeBotKey = process.env.CALLMEBOT_API_KEY;
  if (callMeBotKey) {
    try {
      const callMeBotUrl = `https://api.callmebot.com/whatsapp.php?phone=${recipient}&text=${encodeURIComponent(alertText)}&apikey=${callMeBotKey}`;
      const cmbRes = await fetch(callMeBotUrl);
      const cmbBody = await cmbRes.text();

      if (cmbRes.ok && !cmbBody.toLowerCase().includes('error')) {
        console.log(`[CallMeBot WhatsApp] ✅ Alert delivered to Nidhi's WhatsApp (+${recipient})!`);
        dispatched = true;
      } else {
        console.warn(`[CallMeBot WhatsApp] Response:`, cmbBody);
      }
    } catch (cmbErr) {
      console.error('[CallMeBot WhatsApp Error]', cmbErr.message);
    }
  }

  // 2. PRIORITY 2: Custom Webhook (Zapier, Pabbly, Make, Wati, Interakt)
  const webhookUrl = process.env.WHATSAPP_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const wbRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'new_booking_enquiry',
          recipient,
          message: alertText,
          enquiry: {
            id: enquiry.id,
            parentName: enquiry.parentName,
            phone: enquiry.phone,
            babyAgeGroup: enquiry.babyAgeGroup,
            preferredDate: enquiry.preferredDate,
            address: fullAddress,
            notes: enquiry.additionalMessage,
          },
        }),
      });
      if (wbRes.ok) {
        console.log(`[WhatsApp Webhook] ✅ Dispatched to webhook (${webhookUrl})`);
        dispatched = true;
      }
    } catch (wbErr) {
      console.error('[WhatsApp Webhook Error]', wbErr.message);
    }
  }

  // 3. PRIORITY 3: Meta WhatsApp Cloud API (if configured)
  const metaToken = process.env.WHATSAPP_API_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (metaToken && phoneId) {
    try {
      const url = `https://graph.facebook.com/v21.0/${phoneId}/messages`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${metaToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: recipient,
          type: 'text',
          text: {
            preview_url: false,
            body: alertText,
          },
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(`[Meta WhatsApp] ✅ Delivered alert to +${recipient}. Message ID:`, result.messages?.[0]?.id);
        dispatched = true;
      } else {
        console.error('[Meta WhatsApp] API Error:', result);
      }
    } catch (metaErr) {
      console.error('[Meta WhatsApp Error]', metaErr.message);
    }
  }

  // 4. DEVELOPMENT SIMULATION FALLBACK
  if (!dispatched) {
    console.log('\n📲 [WHATSAPP OWNER ALERT]');
    console.log(`Destination: +${recipient} (Nidhi's Phone)`);
    console.log(alertText);
    console.log('💡 To receive this directly on Nidhi\'s WhatsApp:');
    console.log('   Add +34 644 43 38 04 on WhatsApp -> Send "I allow callmebot to send me messages" -> Paste received API key into backend/.env as CALLMEBOT_API_KEY\n');
  }

  return { success: true, dispatched };
}
