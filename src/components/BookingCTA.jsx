import React, { useState } from 'react';
import { MessageCircle, Phone, MapPin, Send, Sparkles, Clock, Baby, Check } from 'lucide-react';
import { createWhatsAppUrl, BUSINESS_PHONE_DISPLAY } from '../utils/whatsapp';

export default function BookingCTA() {
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    serviceType: 'Baby Massage Session',
    babyAgeStage: '1 - 3 months',
    locality: 'Vijay Nagar',
    preferredTime: 'Morning (after bath)',
    notes: '',
  });

  const serviceOptions = [
    'Baby Massage Session',
    'At-Home Visits',
    'Parent Guidance Coaching',
  ];

  const ageStageOptions = [
    'Under 1 month',
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
      `I would like to enquire about a gentle baby session in Indore:\n\n` +
      `• Parent Name: ${formData.parentName}\n` +
      `• Contact Number: ${formData.phone}\n` +
      `• Service: ${formData.serviceType}\n` +
      `• Baby Age: ${formData.babyAgeStage}\n` +
      `• Preferred Time Window: ${formData.preferredTime}\n` +
      `• Locality in Indore: ${formData.locality}\n` +
      (formData.notes.trim() ? `• Specific Note / Needs: ${formData.notes}\n\n` : `\n`) +
      `Could you please let me know your availability for this week?`;

    window.open(createWhatsAppUrl(message), '_blank');
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden bg-dusty-peach/30">
      
      {/* Decorative Blur Backgrounds */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-blush-pink/40 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-1/4 w-80 h-80 bg-muted-sage/20 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Reassurance & Quick Contact */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-sage-dark font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-muted-sage-dark" />
              <span>Easy Booking Enquiry</span>
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-warm-charcoal leading-tight">
              Let’s make time for gentle care.
            </h2>

            <p className="text-base text-muted-brown leading-relaxed max-w-lg mx-auto lg:mx-0">
              Have questions about baby massage, session duration, or home visit availability in Indore? 
              Fill in your baby's details or tap directly to chat on WhatsApp.
            </p>

            {/* Direct Quick Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href={createWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                  bg-soft-terracotta hover:bg-soft-terracotta-hover
                  text-white font-medium text-base
                  px-7 py-3.5 rounded-full
                  shadow-sm hover:shadow-md
                  transition-all duration-200 active:scale-[0.98]
                "
              >
                <MessageCircle className="w-5 h-5" />
                <span>Quick WhatsApp Chat</span>
              </a>

              <a
                href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
                className="
                  w-full sm:w-auto inline-flex items-center justify-center gap-2
                  bg-white hover:bg-warm-ivory
                  text-warm-charcoal font-medium text-base
                  px-6 py-3.5 rounded-full
                  border border-dusty-peach/70
                  transition-all duration-200
                "
              >
                <Phone className="w-4 h-4 text-muted-sage" />
                <span>{BUSINESS_PHONE_DISPLAY}</span>
              </a>
            </div>

            {/* Local Trust Badges */}
            <div className="pt-6 border-t border-dusty-peach/40 space-y-2 text-xs text-muted-brown">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <MapPin className="w-4 h-4 text-soft-terracotta shrink-0" />
                <span>Serving Indore: Vijay Nagar, Palasia, Saket, Bypass, Super Corridor & more</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Clock className="w-4 h-4 text-muted-sage shrink-0" />
                <span>Visits planned strictly around your baby’s feeding & sleep rhythm</span>
              </div>
            </div>
          </div>

          {/* Right Column: Thoughtfully Structured, Non-Cluttered Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-9 shadow-lg border border-dusty-peach/40">
              
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-serif text-2xl text-warm-charcoal">
                    Session Enquiry
                  </h3>
                  <p className="text-xs text-muted-brown mt-0.5">
                    Essential details to plan an unhurried, comfortable visit for your baby.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-muted-sage-dark bg-muted-sage/15 px-3 py-1 rounded-full">
                  <span>Fast WhatsApp reply</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* 1. Parent Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-warm-charcoal mb-1.5">
                      Your Name (Parent) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
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
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98260 12345"
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

                {/* 2. Service Selection Chips */}
                <div>
                  <label className="block text-xs font-semibold text-warm-charcoal mb-1.5">
                    Service Needed
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {serviceOptions.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => setFormData({ ...formData, serviceType: service })}
                        className={`
                          px-3 py-2 rounded-xl text-xs font-medium text-center
                          transition-all duration-150 border flex items-center justify-center gap-1.5
                          ${formData.serviceType === service
                            ? 'bg-soft-terracotta text-white border-soft-terracotta shadow-xs'
                            : 'bg-warm-ivory/60 text-warm-charcoal hover:bg-dusty-peach/30 border-dusty-peach/50'
                          }
                        `}
                      >
                        {formData.serviceType === service && <Check className="w-3 h-3 shrink-0" />}
                        <span>{service}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Baby's Age Pill Selector */}
                <div>
                  <label className="block text-xs font-semibold text-warm-charcoal mb-1.5 flex items-center gap-1.5">
                    <Baby className="w-3.5 h-3.5 text-muted-sage-dark" />
                    <span>Baby’s Age Stage</span>
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
                            ? 'bg-muted-sage-dark text-white border-muted-sage-dark shadow-xs'
                            : 'bg-warm-ivory/60 text-warm-charcoal hover:bg-dusty-peach/30 border-dusty-peach/50'
                          }
                        `}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Preferred Time Window & Locality in Indore */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-warm-charcoal mb-1.5">
                      Your Locality in Indore *
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

                {/* 5. Any Specific Note (Optional) */}
                <div>
                  <label className="block text-xs font-semibold text-warm-charcoal mb-1.5">
                    Any Specific Note <span className="font-normal text-muted-brown">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mild colic, sensitive skin, or specific question"
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

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="
                      w-full flex items-center justify-center gap-2.5
                      bg-soft-terracotta hover:bg-soft-terracotta-hover
                      text-white font-medium text-sm sm:text-base
                      py-3.5 rounded-full
                      shadow-sm hover:shadow-md
                      transition-all duration-200 active:scale-[0.98]
                    "
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Enquiry via WhatsApp</span>
                  </button>
                  <p className="text-[11px] text-center text-muted-brown mt-2.5">
                    Tap to review & send directly on WhatsApp. No account or password required.
                  </p>
                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
