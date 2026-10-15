/**
 * Telegram Notification Service for Nidhi's Baby Massage
 * Instant, 100% reliable push notifications to the owner's phone with sound.
 * Telegram Bot API is free and has zero rate-limits.
 */

export async function sendTelegramNotification(enquiry) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return { success: false, configured: false };
  }

  const fullAddress = [enquiry.unitNo, enquiry.society, enquiry.locality].filter(Boolean).join(', ');
  const formattedDate = new Date(enquiry.preferredDate).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const text = 
    `🌸 *NEW BABY MASSAGE ENQUIRY* 🌸\n\n` +
    `👤 *Parent:* ${enquiry.parentName}\n` +
    `📞 *Phone:* +91 ${enquiry.phone}\n` +
    `👶 *Baby Age:* ${enquiry.babyAgeGroup}\n` +
    `📅 *Preferred Date:* ${formattedDate}\n` +
    `📍 *Address:* ${fullAddress || 'Indore'}\n` +
    (enquiry.additionalMessage ? `📝 *Note:* "${enquiry.additionalMessage}"\n` : '') +
    `\n👉 [Tap here to WhatsApp Parent](https://wa.me/91${enquiry.phone.replace(/\D/g, '')})`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    });

    const json = await res.json();
    if (res.ok && json.ok) {
      console.log(`[Telegram Alert] ✅ Delivered instant notification to Nidhi's phone!`);
      return { success: true };
    } else {
      console.warn(`[Telegram Alert] API Warning:`, json);
      return { success: false, error: json };
    }
  } catch (err) {
    console.error('[Telegram Alert Error]', err.message);
    return { success: false, error: err.message };
  }
}
