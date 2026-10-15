// WhatsApp utility for seamless one-click enquiries in Indore
export const BUSINESS_PHONE = '919876543210'; // Replace with Nidhi's verified number
export const BUSINESS_PHONE_DISPLAY = '+91 98765 43210';
export const BUSINESS_LOCATION = 'Indore, Madhya Pradesh';

export const createWhatsAppUrl = (customMessage = '') => {
  const defaultText = `Hello Nidhi, I am reaching out from Indore regarding your gentle baby massage services. I would like to check your availability for an at-home session for my little one.`;
  const message = customMessage || defaultText;
  return `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(message)}`;
};

export const createServiceWhatsAppUrl = (serviceName) => {
  const text = `Hello Nidhi, I would like to enquire about the "${serviceName}" in Indore. Could you please share the availability and details?`;
  return `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(text)}`;
};
