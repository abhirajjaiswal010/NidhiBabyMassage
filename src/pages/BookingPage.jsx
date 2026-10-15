import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MessageCircle, Phone, MapPin, Send, 
  Baby, Clock, ShieldCheck, Heart, Sparkles 
} from 'lucide-react';
import { createWhatsAppUrl, BUSINESS_PHONE_DISPLAY } from '../utils/whatsapp';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    babyAgeStage: '1 - 3 months',
    preferredTime: 'Morning (after bath)',
    locality: 'Vijay Nagar',
    notes: '',
  });

  const ageStageOptions = [
    'Under 1 month (Newborn)',
    '1 - 3 months',
    '3 - 6 months',
    '6 - 12 months',
  ];

  const timeOptions = [
    'Morning (after bath)',
    'Mid-day calm',
    'Late afternoon / Evening',
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
    const message =
      `Hello Nidhi,\n` +
      `I would like to book a baby massage session in Indore:\n\n` +
      `• Parent Name: ${formData.parentName}\n` +
      `• Contact Number: ${formData.phone}\n` +
      `• Service: Baby Massage (At Home)\n` +
      `• Baby Age: ${formData.babyAgeStage}\n` +
      `• Preferred Time Window: ${formData.preferredTime}\n` +
      `• Locality in Indore: ${formData.locality}\n` +
      (formData.notes.trim() ? `• Specific Focus / Notes: ${formData.notes}\n\n` : `\n`) +
      `Could you please let me know your availability?`;

    window.open(createWhatsAppUrl(message), '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-warm-ivory py-8 sm:py-12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Bar / Return to Home */}
        <div className="flex items-center justify-between pb-8 border-b border-dusty-peach/30 mb-8 sm:mb-12">
          <Link
            to="/"
            className="
              inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-warm-charcoal
              hover:text-soft-terracotta transition-colors py-2 px-3 rounded-lg hover:bg-dusty-peach/20
            "
          >
            <ArrowLeft className="w-4 h-4 text-soft-terracotta" />
            <span>Back to Homepage</span>
          </Link>

          <a
            href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-medium text-warm-charcoal/80 hover:text-warm-charcoal"
          >
            <Phone className="w-3.5 h-3.5 text-muted-sage" />
            <span>Call directly: {BUSINESS_PHONE_DISPLAY}</span>
          </a>
        </div>

        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted-sage/15 text-muted-sage-dark text-xs font-semibold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Indore At-Home Sessions</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-warm-charcoal leading-tight">
            Book a gentle baby massage.
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-brown leading-relaxed">
            Fill in your baby's details below to connect directly with Nidhi on WhatsApp. 
            No advance account or tedious paperwork required.
          </p>
        </div>

        {/* 2-Column Booking Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-9 shadow-md border border-dusty-peach/40">
            <h2 className="font-serif text-xl sm:text-2xl text-warm-charcoal mb-1">
              Baby Massage Enquiry Details
            </h2>
            <p className="text-xs text-muted-brown mb-6">
              Carefully organized so Nidhi knows exactly how to adapt the session for your little one.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Parent Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-warm-charcoal mb-1.5">
                    Parent's Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Verma"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="
                      w-full px-4 py-2.5 rounded-xl bg-warm-ivory/60 border border-dusty-peach/60
                      text-sm text-warm-charcoal placeholder:text-muted-brown/50
                      focus:outline-none focus:ring-2 focus:ring-soft-terracotta/40
                      transition-colors
                    "
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-warm-charcoal mb-1.5">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 79871 09645"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="
                      w-full px-4 py-2.5 rounded-xl bg-warm-ivory/60 border border-dusty-peach/60
                      text-sm text-warm-charcoal placeholder:text-muted-brown/50
                      focus:outline-none focus:ring-2 focus:ring-soft-terracotta/40
                      transition-colors
                    "
                  />
                </div>
              </div>

              {/* Baby's Age Stage Pill Selector */}
              <div>
                <label className="block text-xs font-semibold text-warm-charcoal mb-1.5 flex items-center gap-1.5">
                  <Baby className="w-3.5 h-3.5 text-muted-sage-dark" />
                  <span>Baby’s Age Stage *</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ageStageOptions.map((stage) => (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => setFormData({ ...formData, babyAgeStage: stage })}
                      className={`
                        px-3 py-2.5 rounded-xl text-xs font-medium text-center
                        transition-all duration-150 border
                        ${formData.babyAgeStage === stage
                          ? 'bg-soft-terracotta text-white border-soft-terracotta shadow-xs'
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
                  <label className="block text-xs font-semibold text-warm-charcoal mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-soft-terracotta" />
                    <span>Locality in Indore *</span>
                  </label>
                  <select
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="
                      w-full px-3.5 py-2.5 rounded-xl bg-warm-ivory/60 border border-dusty-peach/60
                      text-xs sm:text-sm text-warm-charcoal
                      focus:outline-none focus:ring-2 focus:ring-soft-terracotta/40
                      transition-colors
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
                  <label className="block text-xs font-semibold text-warm-charcoal mb-1.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted-brown" />
                    <span>Preferred Time Window</span>
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="
                      w-full px-3.5 py-2.5 rounded-xl bg-warm-ivory/60 border border-dusty-peach/60
                      text-xs sm:text-sm text-warm-charcoal
                      focus:outline-none focus:ring-2 focus:ring-soft-terracotta/40
                      transition-colors
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

              {/* Specific Needs / Notes */}
              <div>
                <label className="block text-xs font-semibold text-warm-charcoal mb-1.5">
                  Any Specific Focus or Questions <span className="font-normal text-muted-brown">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Mild colic, sensitive skin, or preference for morning post-bath session"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="
                    w-full px-4 py-2.5 rounded-xl bg-warm-ivory/60 border border-dusty-peach/60
                    text-xs sm:text-sm text-warm-charcoal placeholder:text-muted-brown/50
                    focus:outline-none focus:ring-2 focus:ring-soft-terracotta/40
                    transition-colors
                  "
                />
              </div>

              {/* Submit Trigger */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="
                    w-full flex items-center justify-center gap-2.5
                    bg-soft-terracotta hover:bg-soft-terracotta-hover
                    text-white font-medium text-base
                    py-3.5 rounded-full
                    shadow-sm hover:shadow-md
                    transition-all duration-200 active:scale-[0.98]
                  "
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry via WhatsApp</span>
                </button>
                <p className="text-[11px] text-center text-muted-brown mt-2.5">
                  Opens directly in WhatsApp with your details cleanly prepared for Nidhi.
                </p>
              </div>

            </form>
          </div>

          {/* Reassurance Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* What to expect card */}
            <div className="bg-white/80 rounded-3xl p-6 sm:p-7 border border-dusty-peach/30 shadow-xs space-y-4">
              <h3 className="font-serif text-lg font-semibold text-warm-charcoal">
                What happens next?
              </h3>
              
              <ul className="space-y-3.5 text-xs sm:text-sm text-muted-brown">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-dusty-peach/40 flex items-center justify-center font-bold text-soft-terracotta shrink-0 mt-0.5 text-xs">
                    1
                  </span>
                  <span>Nidhi reviews your baby's age and preferred time slot on WhatsApp.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-dusty-peach/40 flex items-center justify-center font-bold text-soft-terracotta shrink-0 mt-0.5 text-xs">
                    2
                  </span>
                  <span>We confirm the appointment date and answer any preparation queries.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-dusty-peach/40 flex items-center justify-center font-bold text-soft-terracotta shrink-0 mt-0.5 text-xs">
                    3
                  </span>
                  <span>Nidhi visits your Indore doorstep for a relaxed, baby-led massage session.</span>
                </li>
              </ul>
            </div>

            {/* Safety & Hygiene Reassurance */}
            <div className="bg-white/80 rounded-3xl p-6 sm:p-7 border border-dusty-peach/30 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-sage-dark">
                <ShieldCheck className="w-4 h-4" />
                <span>Our Safety Promise</span>
              </div>
              <p className="text-xs text-muted-brown leading-relaxed">
                Hands are strictly sanitized before every touch. We use only mild, pediatric-safe oils and never push through tears. If baby needs to feed or rest, we pause immediately.
              </p>
            </div>

            {/* Direct WhatsApp / Call Card */}
            <div className="p-6 rounded-3xl bg-dusty-peach/25 border border-dusty-peach/40 text-center space-y-3">
              <p className="text-xs font-medium text-warm-charcoal">
                Prefer to chat or call right away?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <a
                  href={createWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-xs font-semibold py-2.5 px-4 rounded-full shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
                <a
                  href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 bg-white text-warm-charcoal text-xs font-semibold py-2.5 px-4 rounded-full border border-dusty-peach"
                >
                  <Phone className="w-3.5 h-3.5 text-muted-sage" />
                  <span>{BUSINESS_PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}
