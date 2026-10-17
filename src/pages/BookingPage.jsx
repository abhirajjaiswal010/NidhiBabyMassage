import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  ArrowLeft, Phone, CheckCircle2, Loader2, Home, RotateCcw, Send, Calendar, MapPin, Search, AlertCircle, Copy
} from 'lucide-react';
import { 
  BUSINESS_PHONE,
  BUSINESS_PHONE_DISPLAY,
  sendAutomaticBookingNotification 
} from '../utils/whatsapp';

// Comprehensive list of Indore residential areas and colonies for auto-suggestions
const INDORE_LOCALITIES = [
  'Vijay Nagar',
  'New Palasia',
  'Old Palasia',
  'Mahalaxmi Nagar',
  'Saket Nagar',
  'Nipania',
  'AB Bypass Road',
  'Rau',
  'Bhawarkua',
  'Annapurna Road',
  'Rajendra Nagar',
  'Sudama Nagar',
  'Bengali Square',
  'Tilak Nagar',
  'Geeta Bhavan',
  'Manoramaganj',
  'Khatiwala Tank',
  'Sapna Sangeeta',
  'AB Road',
  'Super Corridor',
  'Kanadia Road',
  'Pipliyahana',
  'Scheme 78',
  'Scheme 54',
  'Scheme 140',
  'Scheme 114',
  'Silicon City',
  'Silver Springs',
  'Treasure Fantasy',
  'Omaxe City',
  'Apollo DB City',
  'DLF Garden City',
  'Chhatribagh',
  'Limbodi',
  'Khandwa Road',
  'Ujjain Road',
  'Aerodrome Road',
  'Bada Sarafa',
  'Rani Bagh',
  'Khajrana',
  'LIG Colony',
  'MIG Colony',
  'Snehat Nagar',
  'Vaishali Nagar',
  'Airport Road',
  'Lokmanya Nagar',
  'Gopur Colony',
];

// Top residential areas for 1-click quick-pick chips
const POPULAR_INDORE_AREAS = [
  'Vijay Nagar',
  'Palasia',
  'Mahalaxmi Nagar',
  'Saket',
  'Nipania',
  'Rau',
  'Annapurna',
  'Bypass Road',
];

export default function BookingPage() {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    babyAgeGroup: '1 - 3 Months',
    preferredDate: todayStr,
    unitNo: '',
    society: '',
    locality: '',
    additionalMessage: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRefId, setBookingRefId] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  // Form Validation Errors State
  const [errors, setErrors] = useState({});

  const validateStep1 = (notifyToast = true) => {
    const errs = {};
    const cleanName = (formData.parentName || '').trim();
    if (!cleanName) {
      errs.parentName = "Please enter parent's name";
    } else if (cleanName.length < 2) {
      errs.parentName = 'Name must be at least 2 characters';
    }

    const cleanPhone = (formData.phone || '').trim();
    if (!cleanPhone) {
      errs.phone = 'Phone number is required';
    } else if (cleanPhone.length < 4) {
      errs.phone = 'Please enter a valid phone number';
    }

    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      if (notifyToast) {
        toast.error(errs.parentName || errs.phone || 'Please fill in required details');
      }
      return false;
    }
    return true;
  };

  const validateStep2 = (notifyToast = true) => {
    const errs = {};
    if (!formData.preferredDate) {
      errs.preferredDate = 'Please select a preferred date';
    } else {
      const selected = new Date(formData.preferredDate);
      const today = new Date(todayStr);
      if (selected < today) {
        errs.preferredDate = 'Selected date cannot be in the past';
      }
    }

    if (!formData.locality || !formData.locality.trim()) {
      errs.locality = 'Please select or type your area/locality in Indore';
    }

    if (!formData.society || !formData.society.trim()) {
      errs.society = 'Please enter society, colony, or building name';
    } else if (formData.society.trim().length < 2) {
      errs.society = 'Society/building name is too short';
    }

    if (!formData.unitNo || !formData.unitNo.trim()) {
      errs.unitNo = 'Please enter house / flat / unit number';
    }

    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      if (notifyToast) {
        toast.error(
          errs.preferredDate || errs.locality || errs.society || errs.unitNo || 'Please complete Indore address'
        );
      }
      return false;
    }
    return true;
  };

  // Indore Locality Autocomplete State
  const [showLocalitySuggestions, setShowLocalitySuggestions] = useState(false);
  const localityWrapperRef = useRef(null);

  // Filter localities based on user typing
  const filteredLocalities = useMemo(() => {
    const q = (formData.locality || '').trim().toLowerCase();
    if (!q) return INDORE_LOCALITIES.slice(0, 10);
    return INDORE_LOCALITIES.filter((loc) =>
      loc.toLowerCase().includes(q)
    );
  }, [formData.locality]);

  // Click-outside listener to dismiss suggestions dropdown smoothly
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (localityWrapperRef.current && !localityWrapperRef.current.contains(e.target)) {
        setShowLocalitySuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const babyAgeOptions = [
    { label: '0 - 1 Month', sub: 'Newborn' },
    { label: '1 - 3 Months', sub: 'Infant' },
    { label: '3 - 6 Months', sub: 'Growing' },
    { label: '6 - 12 Months', sub: 'Active' },
  ];

  const fullAddress = [
    formData.unitNo ? `Unit: ${formData.unitNo.trim()}` : '',
    formData.society ? `Society: ${formData.society.trim()}` : '',
    formData.locality ? `Locality: ${formData.locality.trim()}` : '',
  ].filter(Boolean).join(', ');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep1(true)) {
      setCurrentStep(1);
      return;
    }
    if (!validateStep2(true)) {
      setCurrentStep(2);
      return;
    }

    setIsSubmitting(true);

    const ref = `NBM-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRefId(ref);

    const summaryMessage = 
      `New Baby Massage Enquiry #${ref}\n` +
      `Parent: ${formData.parentName}\n` +
      `Phone: ${formData.phone}\n` +
      `Baby Age: ${formData.babyAgeGroup}\n` +
      `Preferred Date: ${formData.preferredDate}\n` +
      `Address: ${fullAddress}\n` +
      (formData.additionalMessage.trim() ? `Note: ${formData.additionalMessage.trim()}\n` : '');

    // 1. Toast Notification for immediate user feedback
    toast.success('Enquiry received! Connecting to WhatsApp...', {
      icon: '🌸',
      duration: 4500,
    });

    // 2. Prepare WhatsApp URL with complete lead details to Nidhi's phone
    const waUrl = getWhatsAppMessageUrl(ref);

    // 3. Dispatch save to PostgreSQL database
    const savePromise = sendAutomaticBookingNotification({
      refId: ref,
      parentName: formData.parentName,
      phone: formData.phone,
      babyAgeStage: formData.babyAgeGroup,
      preferredStartDate: formData.preferredDate,
      unitNo: formData.unitNo,
      society: formData.society,
      locality: formData.locality,
      address: fullAddress,
      notes: formData.additionalMessage,
      message: summaryMessage,
    });

    // 4. Immediately switch UI to Thank You confirmation card
    setIsSubmitting(false);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 5. Automatically trigger WhatsApp directly to Nidhi's phone (+91 93436 08901)
    // On mobile, window.location.href directly launches native WhatsApp without popup blocker issues
    // On desktop, window.open opens WhatsApp Web
    const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    setTimeout(() => {
      try {
        if (isMobile) {
          window.location.href = waUrl;
        } else {
          window.open(waUrl, '_blank');
        }
      } catch {
        // Fallback handled by on-screen prominent button
      }
    }, 450);

    await savePromise;
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setErrors({});
    setFormData({
      parentName: '',
      phone: '',
      babyAgeGroup: '1 - 3 Months',
      preferredDate: todayStr,
      unitNo: '',
      society: '',
      locality: '',
      additionalMessage: '',
    });
    toast('Form reset for new enquiry', {
      icon: '🔄',
    });
  };

  const getWhatsAppMessageUrl = (overrideRefId = null) => {
    const activeRef = overrideRefId || bookingRefId || 'NEW';
    const formattedDate = formData.preferredDate 
      ? new Date(formData.preferredDate).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      : formData.preferredDate;

    const text = 
      `🌸 *NIDHI'S BABY MASSAGE — BOOKING ENQUIRY* 🌸\n` +
      `──────────────────────────\n\n` +
      `Hello Nidhi, I have submitted a booking enquiry on your website and would like to confirm your availability.\n\n` +
      `*Ref ID:* *#${activeRef}*\n` +
      `*Parent Name:* *${formData.parentName}*\n` +
      `*Phone Number:* *${formData.phone}*\n` +
      `*Baby's Age Group:* *${formData.babyAgeGroup}*\n` +
      `*Preferred Date:* *${formattedDate}*\n` +
      `*Service Address:* *${fullAddress}*\n` +
      (formData.additionalMessage.trim() ? `*Special Notes:* *"${formData.additionalMessage.trim()}"*\n` : '') +
      `\n──────────────────────────\n` +
      `Please let me know your available session timings in Indore. Thank you!`;

    return `https://api.whatsapp.com/send?phone=${BUSINESS_PHONE}&text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-[100dvh] relative overflow-hidden bg-gradient-to-b from-[#FFCED8]/50 via-[#FFDDDD]/30 via-[#FFFBF4] to-[#FFE8C4]/25 text-[#2D1E1A] flex flex-col justify-between py-2 sm:py-4 px-3 sm:px-6">
      
      {/* 1. Radiant Ambient Glow (Exact match to Hero section) */}
      <div 
        className="absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 w-[650px] h-[350px] sm:w-[1250px] sm:h-[580px] bg-gradient-to-b from-[#FFCED8] via-[#FFDDDD]/85 via-[#FFE8C4]/50 to-transparent rounded-b-full pointer-events-none -z-10 blur-3xl opacity-90"
        aria-hidden="true"
      />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-[250px] sm:w-[780px] sm:h-[380px] bg-gradient-to-b from-[#FFCED8] via-[#FFDDDD]/70 to-transparent rounded-full pointer-events-none -z-10 blur-2xl opacity-75"
        aria-hidden="true"
      />

      {/* 2. Subtle Floor Perspective Grid */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(31, 27, 26, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(31, 27, 26, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, transparent 5%, black 50%, transparent 95%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 5%, black 50%, transparent 95%)',
        }}
        aria-hidden="true"
      />

      {/* Top Header - Ultra-clean & compact */}
      <header className="max-w-xl w-full mx-auto flex items-center justify-between pb-2 sm:pb-3 border-b border-[#FFCED8]/40 relative z-10 shrink-0 gap-1.5">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#2D1E1A] hover:text-[#D96B82] py-1 px-2.5 sm:px-3 rounded-full bg-white/70 hover:bg-white backdrop-blur-sm border border-[#FFCED8]/50 shadow-2xs transition-all shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#D96B82]" />
          <span className="hidden xs:inline">Back to Home</span>
          <span className="xs:hidden">Home</span>
        </Link>

        <span className="font-huglove text-base sm:text-xl lg:text-2xl tracking-wide text-[#2D1E1A] text-center truncate">
          Nidhi's <span className="text-[#D96B82]">Baby Massage</span>
        </span>

        <a
          href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
          className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#2D1E1A] bg-white hover:bg-stone-50 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-[#FFCED8]/60 shadow-2xs transition-all shrink-0"
        >
          <Phone className="w-3 h-3 text-[#D96B82]" />
          <span className="hidden sm:inline">Call Nidhi</span>
          <span className="sm:hidden">Call</span>
        </a>
      </header>

      {/* Main Container - Scaled & compact on small screens */}
      <main className="max-w-xl w-full mx-auto my-auto py-1.5 sm:py-3 relative z-10">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            /* Thank You Confirmation View */
            <motion.div
              key="submitted-card"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#FFCED8]/60 shadow-lg shadow-[#FFCED8]/20 text-center space-y-3 sm:space-y-4"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2]" />
              </div>

              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[10px] sm:text-xs font-semibold text-[#D96B82] bg-[#FFDDDD]/70 px-2.5 py-0.5 rounded-full border border-[#FFCED8]">
                  Enquiry Received
                </span>
                <h1 className="font-huglove text-2xl sm:text-3xl text-[#2D1E1A] pt-1">
                  Thanks for submitting, <span className="text-[#D96B82]">{formData.parentName || 'Parent'}!</span> 🌸
                </h1>
                <p className="text-[11px] sm:text-sm font-medium text-[#5C453E]">
                  We will contact you within <span className="font-bold text-[#2D1E1A]">24 hours</span> at <span className="font-bold text-[#2D1E1A]">{formData.phone}</span>.
                </p>
              </div>

              {/* Summary Details */}
              <div className="bg-[#FFFDF9] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-[#E2D5CC] text-[11px] sm:text-xs space-y-1.5 sm:space-y-2 text-left text-[#2D1E1A]">
                <div className="flex justify-between items-center pb-1 border-b border-[#E2D5CC] text-[10px] sm:text-[11px] text-[#7A635A]">
                  <span>Enquiry Reference:</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(bookingRefId);
                      }
                      toast.success(`Reference #${bookingRefId} copied!`);
                    }}
                    className="inline-flex items-center gap-1 font-mono font-semibold text-[#2D1E1A] hover:text-[#D96B82] bg-white px-2 py-0.5 rounded-md border border-[#E2D5CC] hover:border-[#D96B82] transition-colors"
                    title="Click to copy Reference ID"
                  >
                    <span>#{bookingRefId}</span>
                    <Copy className="w-3 h-3 text-stone-400" />
                  </button>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A635A]">Baby's Age:</span>
                  <span className="font-semibold">{formData.babyAgeGroup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A635A]">Preferred Date:</span>
                  <span className="font-semibold">{formData.preferredDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A635A]">Unit & Building:</span>
                  <span className="font-semibold">{formData.unitNo}, {formData.society}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A635A]">Locality (Indore):</span>
                  <span className="font-semibold">{formData.locality}</span>
                </div>
                {formData.additionalMessage.trim() && (
                  <div className="pt-1 border-t border-[#E2D5CC] text-[#7A635A]">
                    <span className="font-semibold text-[#2D1E1A] block mb-0.5">Note:</span>
                    <p className="italic">{formData.additionalMessage}</p>
                  </div>
                )}
              </div>

              {/* Prominent Direct WhatsApp Confirmation Button */}
              <div className="pt-1 space-y-1.5">
                <a
                  href={getWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-full transition-all active:scale-[0.98] shadow-md shadow-[#25D366]/25"
                >
                  <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>Notify Nidhi on WhatsApp Now ({BUSINESS_PHONE_DISPLAY})</span>
                </a>
                <p className="text-[10px] text-[#7A635A]">
                  Tap above to send your booking directly to Nidhi's WhatsApp for priority response.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <Link
                  to="/"
                  className="flex-1 bg-[#FFDDDD] hover:bg-[#F2AEBA] text-[#2D1E1A] font-semibold text-xs py-2 sm:py-2.5 px-4 rounded-full transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Back to Home</span>
                </Link>

                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-white hover:bg-stone-50 border border-[#D1C2B8] text-[#2D1E1A] font-medium text-xs py-2 sm:py-2.5 px-4 rounded-full transition-all flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#7A635A]" />
                  <span>Submit Another Enquiry</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* Scaled Multi-Step Form Card for Small Devices */
            <motion.div
              key="form-card"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 border border-[#FFCED8]/60 shadow-lg shadow-[#FFCED8]/15 space-y-3 sm:space-y-4"
            >
              {/* Form Heading & Brand Subtitle */}
              <div className="text-center pb-1">
                <h1 className="font-huglove text-xl sm:text-2xl lg:text-3xl text-[#2D1E1A] tracking-wide leading-tight">
                  <span>Book a </span>
                  <span className="text-[#D96B82]">Baby Massage</span>
                </h1>
                <p className="text-[10px] sm:text-xs text-[#7A635A] mt-0.5 font-medium">
                  Doorstep sessions in Indore • Dedicated gentle care
                </p>
              </div>

              {/* Multi-Step Progress Bar (Baby Styled) */}
              <div className="bg-[#FFF8EE] rounded-2xl p-2.5 sm:p-3 border border-[#F0DDC9] space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#2D1E1A]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#FFDDDD] border border-[#FFCED8] text-[#D96B82] text-[10px] flex items-center justify-center font-bold">
                      {currentStep}
                    </span>
                    <span>
                      {currentStep === 1 && "Step 1: Baby & Parent Details"}
                      {currentStep === 2 && "Step 2: Date & Service Address"}
                      {currentStep === 3 && "Step 3: Notes & Final Confirmation"}
                    </span>
                  </span>
                  <span className="text-[10px] text-[#7A635A] font-medium">
                    {currentStep} / 3
                  </span>
                </div>

                {/* Progress bar track */}
                <div className="w-full h-1.5 bg-[#EFE4DA] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FFCED8] to-[#D96B82] rounded-full transition-all duration-300"
                    style={{
                      width: currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%'
                    }}
                  />
                </div>

                {/* Step Pills Quick Navigation */}
                <div className="grid grid-cols-3 gap-1 pt-0.5 text-center text-[10px] font-medium text-[#7A635A]">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className={`py-0.5 rounded transition-colors ${currentStep === 1 ? 'text-[#D96B82] font-bold' : ''}`}
                  >
                    1. Baby
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep1()) {
                        setCurrentStep(2);
                      }
                    }}
                    className={`py-0.5 rounded transition-colors ${currentStep === 2 ? 'text-[#D96B82] font-bold' : ''}`}
                  >
                    2. Address
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep1() && validateStep2()) {
                        setCurrentStep(3);
                      }
                    }}
                    className={`py-0.5 rounded transition-colors ${currentStep === 3 ? 'text-[#D96B82] font-bold' : ''}`}
                  >
                    3. Review
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                
                {/* STEP 1: Parent Name, Phone, and Baby's Age Group */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2.5 sm:space-y-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      <div>
                        <label className="block text-[11px] sm:text-xs font-semibold text-[#2D1E1A] mb-0.5 sm:mb-1">
                          Parent's Name <span className="text-[#D96B82]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your full name"
                          value={formData.parentName}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData({ ...formData, parentName: val });
                            if (errors.parentName && val.trim().length >= 2) {
                              setErrors((prev) => {
                                const next = { ...prev };
                                delete next.parentName;
                                return next;
                              });
                            }
                          }}
                          className={`w-full px-3 py-2 rounded-xl bg-white border text-xs sm:text-sm font-medium text-[#2D1E1A] placeholder:text-stone-400 placeholder:font-normal focus:outline-none focus:ring-2 shadow-2xs transition-all ${
                            errors.parentName
                              ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-200'
                              : 'border-[#CFC0B5] hover:border-[#D96B82]/60 focus:ring-[#D96B82]/20 focus:border-[#D96B82]'
                          }`}
                        />
                        {errors.parentName && (
                          <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1 font-medium animate-in fade-in">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.parentName}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] sm:text-xs font-semibold text-[#2D1E1A] mb-0.5 sm:mb-1">
                          WhatsApp / Phone Number <span className="text-[#D96B82]">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Your phone / WhatsApp number"
                          value={formData.phone}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormData({ ...formData, phone: val });
                            if (errors.phone && val.trim().length >= 4) {
                              setErrors((prev) => {
                                const next = { ...prev };
                                delete next.phone;
                                return next;
                              });
                            }
                          }}
                          className={`w-full px-3 py-2 rounded-xl bg-white border text-xs sm:text-sm font-medium text-[#2D1E1A] placeholder:text-stone-400 placeholder:font-normal focus:outline-none focus:ring-2 shadow-2xs transition-all ${
                            errors.phone
                              ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-200'
                              : 'border-[#CFC0B5] hover:border-[#D96B82]/60 focus:ring-[#D96B82]/20 focus:border-[#D96B82]'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1 font-medium animate-in fade-in">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Baby Age Group: 2x2 grid on mobile for spacious touch buttons, 4 cols on tablet */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-semibold text-[#2D1E1A] mb-1">
                        Baby's Age Group <span className="text-[#D96B82]">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                        {babyAgeOptions.map((opt) => {
                          const isSelected = formData.babyAgeGroup === opt.label;
                          return (
                            <button
                              key={opt.label}
                              type="button"
                              onClick={() => setFormData({ ...formData, babyAgeGroup: opt.label })}
                              className={`
                                py-2 px-2 rounded-xl text-center border transition-all active:scale-[0.98]
                                ${isSelected
                                  ? 'bg-[#FFDDDD] border-[#D96B82] text-[#2D1E1A] font-semibold shadow-xs ring-1 ring-[#D96B82]'
                                  : 'bg-white hover:bg-stone-50 border-[#CFC0B5] text-[#2D1E1A] font-medium shadow-2xs'
                                }
                              `}
                            >
                              <span className="block text-[11px] sm:text-xs leading-tight">{opt.label}</span>
                              <span className="text-[10px] text-[#7A635A] block mt-0.5 leading-none">{opt.sub}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 1 Next Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (validateStep1()) {
                            setCurrentStep(2);
                          }
                        }}
                        className="
                          w-full bg-[#FFDDDD] hover:bg-[#F2AEBA] hover:brightness-95
                          text-[#2D1E1A] font-semibold text-xs sm:text-sm
                          py-2.5 sm:py-3 rounded-full shadow-xs hover:shadow-md
                          transition-all duration-200 active:scale-[0.98]
                          flex items-center justify-center gap-1.5
                        "
                      >
                        <span>Next: Date & Indore Address</span>
                        <ArrowLeft className="w-3.5 h-3.5 rotate-180 text-[#D96B82]" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Preferred Date and Address in Indore */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2.5 sm:space-y-3"
                  >
                    {/* Preferred Date */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-semibold text-[#2D1E1A] mb-0.5 sm:mb-1 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#D96B82]" />
                        <span>Preferred Session Date <span className="text-[#D96B82]">*</span></span>
                      </label>
                      <input
                        type="date"
                        required
                        min={todayStr}
                        value={formData.preferredDate}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData({ ...formData, preferredDate: val });
                          if (errors.preferredDate && val) {
                            setErrors((prev) => {
                              const next = { ...prev };
                              delete next.preferredDate;
                              return next;
                            });
                          }
                        }}
                        className={`w-full px-3 py-2 rounded-xl bg-white border text-xs sm:text-sm font-medium text-[#2D1E1A] focus:outline-none focus:ring-2 shadow-2xs transition-all ${
                          errors.preferredDate
                            ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-200'
                            : 'border-[#CFC0B5] hover:border-[#D96B82]/60 focus:ring-[#D96B82]/20 focus:border-[#D96B82]'
                        }`}
                      />
                      {errors.preferredDate && (
                        <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1 font-medium animate-in fade-in">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.preferredDate}</span>
                        </p>
                      )}
                    </div>

                    {/* Enhanced Address Section */}
                    <div className="space-y-2.5">
                      {/* 1. Indore Area / Locality with Smart Autocomplete */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] sm:text-xs font-semibold text-[#2D1E1A] flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#D96B82]" />
                            <span>Indore Locality / Area <span className="text-[#D96B82]">*</span></span>
                          </label>
                          <span className="text-[10px] text-[#8C7469]">Auto-suggests or type custom area</span>
                        </div>

                        <div ref={localityWrapperRef} className="relative">
                          <div className="relative">
                            <input
                              type="text"
                              required
                              list="indore-localities-list"
                              placeholder="Type or select area (e.g. Vijay Nagar, Palasia, Rau)..."
                              value={formData.locality}
                              onFocus={() => setShowLocalitySuggestions(true)}
                              onChange={(e) => {
                                const val = e.target.value;
                                setFormData({ ...formData, locality: val });
                                setShowLocalitySuggestions(true);
                                if (errors.locality && val.trim()) {
                                  setErrors((prev) => {
                                    const next = { ...prev };
                                    delete next.locality;
                                    return next;
                                  });
                                }
                              }}
                              className={`w-full pl-9 pr-8 py-2.5 rounded-xl bg-white border text-xs sm:text-sm font-medium text-[#2D1E1A] placeholder:text-stone-400 focus:outline-none focus:ring-2 shadow-2xs transition-all ${
                                errors.locality
                                  ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-200'
                                  : 'border-[#CFC0B5] hover:border-[#D96B82]/60 focus:ring-[#D96B82]/20 focus:border-[#D96B82]'
                              }`}
                            />
                            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            {formData.locality && (
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, locality: '' });
                                  setShowLocalitySuggestions(true);
                                }}
                                className="w-5 h-5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-xs font-bold"
                              >
                                ×
                              </button>
                            )}
                          </div>

                          {/* HTML5 datalist for native keyboard suggestions on mobile */}
                          <datalist id="indore-localities-list">
                            {INDORE_LOCALITIES.map((loc) => (
                              <option key={loc} value={loc} />
                            ))}
                          </datalist>

                          {/* Interactive Floating Suggestions Dropdown */}
                          {showLocalitySuggestions && (
                            <div className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-white rounded-2xl border border-[#FFCED8] shadow-xl overflow-hidden max-h-56 overflow-y-auto animate-in fade-in slide-in-from-top-1">
                              <div className="p-2 border-b border-stone-100 bg-[#FFFDF9] flex items-center justify-between text-[11px] text-[#7A635A]">
                                <span className="font-semibold">Indore Residential Areas</span>
                                <span>{filteredLocalities.length} matches</span>
                              </div>
                              {filteredLocalities.length > 0 ? (
                                <div className="py-1">
                                  {filteredLocalities.map((loc) => (
                                    <button
                                      key={loc}
                                      type="button"
                                      onMouseDown={() => {
                                        setFormData({ ...formData, locality: loc });
                                        setShowLocalitySuggestions(false);
                                        if (errors.locality) {
                                          setErrors((prev) => {
                                            const next = { ...prev };
                                            delete next.locality;
                                            return next;
                                          });
                                        }
                                      }}
                                      className="w-full text-left px-3.5 py-2 text-xs hover:bg-[#FFF0F3] hover:text-[#D96B82] font-medium text-[#2D1E1A] flex items-center justify-between transition-colors cursor-pointer"
                                    >
                                      <span className="flex items-center gap-2">
                                        <MapPin className="w-3.5 h-3.5 text-[#D96B82]/70 shrink-0" />
                                        <span>{loc}</span>
                                      </span>
                                      <span className="text-[10px] text-stone-400 font-semibold uppercase">Select</span>
                                    </button>
                                  ))}
                                </div>
                              ) : (
                                <div className="p-3 text-center text-xs text-[#7A635A]">
                                  <span>No preset match for "<strong>{formData.locality}</strong>".</span>
                                  <p className="text-[11px] text-[#D96B82] font-semibold mt-0.5">
                                    ✓ That's completely fine! Your custom colony is saved as typed.
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {errors.locality && (
                          <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1 font-medium animate-in fade-in">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{errors.locality}</span>
                          </p>
                        )}

                        {/* Popular Indore Area Quick-Pick Chips */}
                        <div className="pt-1">
                          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                            <span className="text-[10px] uppercase font-bold text-[#8C7469] whitespace-nowrap shrink-0">
                              Quick Pick:
                            </span>
                            {POPULAR_INDORE_AREAS.map((area) => (
                              <button
                                key={area}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, locality: area });
                                  setShowLocalitySuggestions(false);
                                  if (errors.locality) {
                                    setErrors((prev) => {
                                      const next = { ...prev };
                                      delete next.locality;
                                      return next;
                                    });
                                  }
                                }}
                                className={`px-2.5 py-0.5 rounded-full border transition-all whitespace-nowrap shrink-0 text-xs ${
                                  formData.locality.toLowerCase() === area.toLowerCase()
                                    ? 'bg-[#FFDDDD] border-[#D96B82] text-[#2D1E1A] font-bold shadow-2xs'
                                    : 'bg-white hover:bg-stone-50 border-[#D8CBC3] text-[#5C453E] font-medium'
                                }`}
                              >
                                {area}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 2. Building & Flat / Unit No Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                        <div>
                          <label className="block text-[11px] font-semibold text-[#2D1E1A] mb-0.5">
                            Society / Building / Colony <span className="text-[#D96B82]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Shalimar Palms, Silver Springs"
                            value={formData.society}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData({ ...formData, society: val });
                              if (errors.society && val.trim().length >= 2) {
                                setErrors((prev) => {
                                  const next = { ...prev };
                                  delete next.society;
                                  return next;
                                });
                              }
                            }}
                            className={`w-full px-3 py-2 rounded-xl bg-white border text-xs sm:text-sm font-medium text-[#2D1E1A] placeholder:text-stone-400 focus:outline-none focus:ring-2 shadow-2xs transition-all ${
                              errors.society
                                ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-200'
                                : 'border-[#CFC0B5] hover:border-[#D96B82]/60 focus:ring-[#D96B82]/20 focus:border-[#D96B82]'
                            }`}
                          />
                          {errors.society && (
                            <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1 font-medium animate-in fade-in">
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              <span>{errors.society}</span>
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#2D1E1A] mb-0.5">
                            Flat / House / Unit No. <span className="text-[#D96B82]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Flat 302, House #14"
                            value={formData.unitNo}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData({ ...formData, unitNo: val });
                              if (errors.unitNo && val.trim()) {
                                setErrors((prev) => {
                                  const next = { ...prev };
                                  delete next.unitNo;
                                  return next;
                                });
                              }
                            }}
                            className={`w-full px-3 py-2 rounded-xl bg-white border text-xs sm:text-sm font-medium text-[#2D1E1A] placeholder:text-stone-400 focus:outline-none focus:ring-2 shadow-2xs transition-all ${
                              errors.unitNo
                                ? 'border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-200'
                                : 'border-[#CFC0B5] hover:border-[#D96B82]/60 focus:ring-[#D96B82]/20 focus:border-[#D96B82]'
                            }`}
                          />
                          {errors.unitNo && (
                            <p className="text-[11px] text-rose-600 flex items-center gap-1 mt-1 font-medium animate-in fade-in">
                              <AlertCircle className="w-3 h-3 shrink-0" />
                              <span>{errors.unitNo}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Indore City Limits Notice */}
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-[#6E4F32] bg-[#FFF8EE] border border-[#F0DDC9] px-2.5 py-1.5 rounded-xl">
                        <MapPin className="w-3.5 h-3.5 text-[#D96B82] shrink-0" />
                        <span>
                          Doorstep infant care sessions available across all residential areas in <strong>Indore</strong>.
                        </span>
                      </div>
                    </div>

                    {/* Step 2 Back & Next Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="
                          w-1/3 bg-white hover:bg-stone-50 border border-[#CFC0B5]
                          text-[#2D1E1A] font-medium text-xs sm:text-sm
                          py-2.5 sm:py-3 rounded-full shadow-2xs
                          transition-all active:scale-[0.98]
                        "
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (validateStep2()) {
                            setCurrentStep(3);
                          }
                        }}
                        className="
                          flex-1 bg-[#FFDDDD] hover:bg-[#F2AEBA] hover:brightness-95
                          text-[#2D1E1A] font-semibold text-xs sm:text-sm
                          py-2.5 sm:py-3 rounded-full shadow-xs hover:shadow-md
                          transition-all duration-200 active:scale-[0.98]
                          flex items-center justify-center gap-1.5
                        "
                      >
                        <span>Next: Review & Confirm</span>
                        <ArrowLeft className="w-3.5 h-3.5 rotate-180 text-[#D96B82]" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Notes & Final Review Confirmation */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    {/* Optional Note */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-semibold text-[#2D1E1A] mb-0.5 sm:mb-1">
                        Any Special Baby Notes or Questions? <span className="font-normal text-[#7A635A]">(Optional)</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Baby prefers late morning session, colicky lately..."
                        value={formData.additionalMessage}
                        onChange={(e) => setFormData({ ...formData, additionalMessage: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#CFC0B5] hover:border-[#D96B82]/60 text-xs sm:text-sm font-medium text-[#2D1E1A] placeholder:text-stone-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[#D96B82]/20 focus:border-[#D96B82] shadow-2xs transition-all resize-none"
                      />
                    </div>

                    {/* Summary Preview Box */}
                    <div className="bg-[#FFFDF9] rounded-2xl p-3 sm:p-4 border border-[#E2D5CC] text-xs space-y-1.5 text-left text-[#2D1E1A]">
                      <div className="text-[11px] font-bold text-[#D96B82] uppercase tracking-wider pb-1 border-b border-[#E2D5CC] flex items-center justify-between">
                        <span>Enquiry Details Summary</span>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="text-[10px] lowercase text-[#7A635A] hover:text-[#D96B82] underline font-normal"
                        >
                          edit
                        </button>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-[#7A635A]">Parent:</span>
                        <span className="font-semibold">{formData.parentName} ({formData.phone})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#7A635A]">Baby Age:</span>
                        <span className="font-semibold">{formData.babyAgeGroup}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#7A635A]">Date:</span>
                        <span className="font-semibold">{formData.preferredDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#7A635A]">Address:</span>
                        <span className="font-semibold text-right">{fullAddress}</span>
                      </div>
                    </div>

                    {/* Step 3 Back & Submit Action */}
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="
                          w-1/3 bg-white hover:bg-stone-50 border border-[#CFC0B5]
                          text-[#2D1E1A] font-medium text-xs sm:text-sm
                          py-2.5 sm:py-3 rounded-full shadow-2xs
                          transition-all active:scale-[0.98]
                        "
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="
                          flex-1 bg-[#FFDDDD] hover:bg-[#F2AEBA] hover:brightness-95
                          text-[#2D1E1A] font-semibold text-xs sm:text-sm
                          py-2.5 sm:py-3 rounded-full shadow-xs hover:shadow-md
                          transition-all duration-200 active:scale-[0.98]
                          flex items-center justify-center gap-1.5 sm:gap-2 disabled:opacity-75
                        "
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D96B82]" />
                            <span>Sending Enquiry...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 text-[#D96B82]" />
                            <span>Submit Booking Enquiry</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Minimal Footer */}
      <footer className="max-w-xl w-full mx-auto text-center text-[10px] sm:text-xs text-[#7A635A] pt-1.5 pb-0.5 border-t border-[#FFCED8]/40 relative z-10 shrink-0">
        © {new Date().getFullYear()} Nidhi's Baby Massage, Indore • Dedicated to Gentle Home Care
      </footer>

    </div>
  );
}
