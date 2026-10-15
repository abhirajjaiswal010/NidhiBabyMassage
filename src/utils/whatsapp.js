// WhatsApp & Booking utilities for Nidhi's Baby Massage Indore
export const BUSINESS_PHONE = '919343608901';
export const BUSINESS_PHONE_DISPLAY = '+91 93436 08901';
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

/**
 * Automatically dispatches booking details:
 * 1. To your Node.js + PostgreSQL Backend (/api/enquiries)
 * 2. To Web3Forms (if configured)
 * 3. Saves locally in browser localStorage for offline backup
 */
export async function sendAutomaticBookingNotification(bookingData) {
  let backendResult = null;

  // 1. Send directly to your PostgreSQL Backend API
  try {
    const apiUrl = import.meta.env?.VITE_API_URL || 'http://localhost:5000';
    const apiResponse = await fetch(`${apiUrl}/api/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parentName: bookingData.parentName,
        phone: bookingData.phone,
        babyAgeGroup: bookingData.babyAgeStage,
        preferredDate: bookingData.preferredStartDate || new Date().toISOString().split('T')[0],
        unitNo: bookingData.unitNo?.trim() || '',
        society: bookingData.society?.trim() || '',
        locality: bookingData.locality?.trim() || 'Indore',
        additionalMessage: bookingData.notes?.trim() || null,
      }),
    });

    if (apiResponse.ok) {
      backendResult = await apiResponse.json();
      console.log('✅ Enquiry saved to PostgreSQL database:', backendResult);
    } else {
      const errorJson = await apiResponse.json().catch(() => ({}));
      console.error('❌ Backend validation failed:', apiResponse.status, errorJson);
    }
  } catch (error) {
    console.warn('Backend API offline or unreachable (fallback active):', error.message);
  }

  // 2. Save submission locally in browser localStorage for zero data loss
  try {
    const existing = JSON.parse(localStorage.getItem('nidhi_baby_bookings') || '[]');
    existing.unshift({
      ...bookingData,
      databaseId: backendResult?.data?.id || null,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('nidhi_baby_bookings', JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    console.warn('localStorage cache failed:', e);
  }

  // 3. Fallback / Parallel: Dispatch via Web3Forms if key is provided
  try {
    const web3formsKey = import.meta.env?.VITE_WEB3FORMS_ACCESS_KEY;
    if (web3formsKey && !web3formsKey.includes('your_web3forms')) {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          subject: `👶 New Baby Massage Booking: ${bookingData.parentName} (${bookingData.locality}) - Ref #${bookingData.refId}`,
          from_name: "Nidhi's Baby Massage Portal",
          parent_name: bookingData.parentName,
          phone: bookingData.phone,
          baby_age_stage: bookingData.babyAgeStage,
          preferred_date: bookingData.preferredStartDate,
          unit_no: bookingData.unitNo,
          society: bookingData.society,
          locality: bookingData.locality,
          special_notes: bookingData.notes || 'None',
          booking_reference: bookingData.refId,
        }),
      });
    }
  } catch (err) {
    console.warn('Web3Forms dispatch error:', err);
  }

  return { 
    success: true, 
    databaseId: backendResult?.data?.id,
    refId: bookingData.refId 
  };
}
