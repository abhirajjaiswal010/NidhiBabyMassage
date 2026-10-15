import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Phone, MapPin, Send, 
  Baby, Clock, ShieldCheck 
} from 'lucide-react';
import { createWhatsAppUrl, BUSINESS_PHONE_DISPLAY } from '../utils/whatsapp';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    babyAgeStage: '1 - 3 months',
    preferredTime: 'Morning (after bath)',
    locality: 'Vijay Nagar',
    customLocality: '',
    notes: '',
  });

  const ageStageOptions = [
    'Under 1 month',
    '1 - 3 months',
    '3 - 6 months',
    '6 - 12 months',
  ];

  const timeOptions = [
    'Morning (after bath)',
    'Afternoon calm',
    'Evening settling',
  ];

  const indoreLocalities = [
    'Vijay Nagar',
    'Palasia (Old & New)',
    'Saket / Kanadia Road',
    'Bicholi Mardana / Bypass',
    'Bengali Square',
    'Annapurna / Sudama Nagar',
    'Super Corridor',
    'Mahalaxmi Nagar',
    'Rau / AB Road',
    'Other Indore Locality',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalLocality =
      formData.locality === 'Other Indore Locality'
        ? (formData.customLocality.trim() ? `Other: ${formData.customLocality.trim()}` : 'Other (Indore)')
        : formData.locality;

    const message =
      `Hello Nidhi,\n` +
      `I would like to book a baby massage session in Indore:\n\n` +
      `• Parent Name: ${formData.parentName}\n` +
      `• Contact: ${formData.phone}\n` +
      `• Baby Age: ${formData.babyAgeStage}\n` +
      `• Time Window: ${formData.preferredTime}\n` +
      `• Locality in Indore: ${finalLocality}\n` +
      (formData.notes.trim() ? `• Note: ${formData.notes}\n\n` : `\n`) +
      `Please let me know your availability!`;

    window.open(createWhatsAppUrl(message), '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-warm-ivory py-6 sm:py-10"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-dusty-peach/30 mb-8">
          <Link
            to="/"
            className="
              inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-warm-charcoal
              hover:text-soft-terracotta transition-colors py-1.5 px-3 rounded-lg hover:bg-dusty-peach/20
            "
          >
            <ArrowLeft className="w-4 h-4 text-soft-terracotta" />
            <span>Back to Home</span>
          </Link>

          <a
            href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-warm-charcoal/80 hover:text-warm-charcoal"
          >
            <Phone className="w-3.5 h-3.5 text-muted-sage" />
            <span>Call: {BUSINESS_PHONE_DISPLAY}</span>
          </a>
        </div>

        {/* Minimal Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <h1 className="font-huglove text-4xl sm:text-5xl lg:text-6xl tracking-wide">
            <span className="text-warm-charcoal">Book a </span>
            <span className="text-soft-terracotta">Baby Massage</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-muted-brown">
            Fill in your details below to connect directly on WhatsApp.
          </p>
        </div>

        {/* 2-Column Booking Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-dusty-peach/40">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Parent Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-warm-charcoal mb-1">
                    Parent's Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="
                      w-full px-3.5 py-2.5 rounded-xl bg-warm-ivory/60 border border-dusty-peach/60
                      text-sm text-warm-charcoal placeholder:text-muted-brown/50
                      focus:outline-none focus:ring-2 focus:ring-soft-terracotta/40
                    "
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-warm-charcoal mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 79871 09645"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="
                      w-full px-3.5 py-2.5 rounded-xl bg-warm-ivory/60 border border-dusty-peach/60
                      text-sm text-warm-charcoal placeholder:text-muted-brown/50
                      focus:outline-none focus:ring-2 focus:ring-soft-terracotta/40
                    "
                  />
                </div>
              </div>

              {/* Baby's Age Stage */}
              <div>
                <label className="block text-xs font-semibold text-warm-charcoal mb-1.5 flex items-center gap-1">
                  <Baby className="w-3.5 h-3.5 text-muted-sage-dark" />
                  <span>Baby’s Age *</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ageStageOptions.map((stage) => (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => setFormData({ ...formData, babyAgeStage: stage })}
                      className={`
                        px-2.5 py-2 rounded-xl text-xs font-medium text-center
                        transition-all duration-150 border
                        ${formData.babyAgeStage === stage
                          ? 'bg-soft-terracotta text-white border-soft-terracotta'
                          : 'bg-warm-ivory/60 text-warm-charcoal hover:bg-dusty-peach/30 border-dusty-peach/50'
                        }
                      `}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
              </div>

              {/* Locality in Indore & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-warm-charcoal mb-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-soft-terracotta" />
                    <span>Locality in Indore *</span>
                  </label>
                  <select
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="
                      w-full px-3 py-2.5 rounded-xl bg-warm-ivory/60 border border-dusty-peach/60
                      text-xs sm:text-sm text-warm-charcoal
                      focus:outline-none focus:ring-2 focus:ring-soft-terracotta/40
                    "
                  >
                    {indoreLocalities.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-warm-charcoal mb-1 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted-brown" />
                    <span>Preferred Time</span>
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="
                      w-full px-3 py-2.5 rounded-xl bg-warm-ivory/60 border border-dusty-peach/60
                      text-xs sm:text-sm text-warm-charcoal
                      focus:outline-none focus:ring-2 focus:ring-soft-terracotta/40
                    "
                  >
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* If "Other Indore Locality" is selected, ask specifically where! */}
              {formData.locality === 'Other Indore Locality' && (
                <div className="p-3.5 bg-dusty-peach/20 rounded-2xl border border-dusty-peach/50">
                  <label className="block text-xs font-semibold text-warm-charcoal mb-1">
                    Where in Indore? *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Geeta Bhawan, Scheme 78, Tilak Nagar, etc."
                    value={formData.customLocality}
                    onChange={(e) => setFormData({ ...formData, customLocality: e.target.value })}
                    className="
                      w-full px-3.5 py-2 rounded-xl bg-white border border-dusty-peach/70
                      text-xs sm:text-sm text-warm-charcoal placeholder:text-muted-brown/60
                      focus:outline-none focus:ring-2 focus:ring-soft-terracotta/40
                    "
                  />
                  <p className="text-[11px] text-muted-brown mt-1">
                    We will confirm whether home visits are available in your area.
                  </p>
                </div>
              )}

              {/* Specific Needs / Notes */}
              <div>
                <label className="block text-xs font-semibold text-warm-charcoal mb-1">
                  Note <span className="font-normal text-muted-brown">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mild colic, sensitive skin, or specific questions"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="
                    w-full px-3.5 py-2.5 rounded-xl bg-warm-ivory/60 border border-dusty-peach/60
                    text-xs sm:text-sm text-warm-charcoal placeholder:text-muted-brown/50
                    focus:outline-none focus:ring-2 focus:ring-soft-terracotta/40
                  "
                />
              </div>

              {/* Submit Trigger */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="
                    w-full flex items-center justify-center gap-2
                    bg-soft-terracotta hover:bg-soft-terracotta-hover
                    text-white font-medium text-sm
                    py-3 rounded-full shadow-sm hover:shadow-md
                    transition-all duration-200 active:scale-[0.98]
                  "
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry via WhatsApp</span>
                </button>
              </div>

            </form>
          </div>

          {/* Minimal Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white/80 rounded-3xl p-5 border border-dusty-peach/30 space-y-2.5">
              <h3 className="font-serif text-base font-semibold text-warm-charcoal">
                How It Works
              </h3>
              <ul className="space-y-2 text-xs text-muted-brown">
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-dusty-peach/50 flex items-center justify-center text-[11px] font-bold text-soft-terracotta shrink-0">1</span>
                  <span>Share baby's age and locality</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-dusty-peach/50 flex items-center justify-center text-[11px] font-bold text-soft-terracotta shrink-0">2</span>
                  <span>Confirm preferred time window</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-dusty-peach/50 flex items-center justify-center text-[11px] font-bold text-soft-terracotta shrink-0">3</span>
                  <span>Unhurried home session by Nidhi</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/80 rounded-3xl p-5 border border-dusty-peach/30 space-y-2 text-xs text-muted-brown">
              <div className="flex items-center gap-1.5 font-semibold text-muted-sage-dark">
                <ShieldCheck className="w-4 h-4" />
                <span>Hygiene & Safety</span>
              </div>
              <p className="leading-relaxed">
                Clean sanitized hands, gentle pressure, and zero forced crying. Always tailored to baby's comfort.
              </p>
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
