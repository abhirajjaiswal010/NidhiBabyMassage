import React, { useState } from 'react';
import { MessageCircle, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { createWhatsAppUrl, BUSINESS_PHONE_DISPLAY } from '../utils/whatsapp';

export default function BookingCTA() {
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    locality: 'Vijay Nagar',
    babyAge: '',
    notes: '',
  });

  const indoreLocalities = [
    'Vijay Nagar',
    'Palasia (Old & New)',
    'Saket / Kanadia Road',
    'Bicholi Mardana / Bypass',
    'Bengali Square',
    'Annapurna / Sudama Nagar',
    'Super Corridor',
    'Rau / AB Road',
    'Mahalaxmi Nagar',
    'Other Indore Locality',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hello Nidhi,\n` +
      `I would like to book a baby massage session in Indore.\n` +
      `• Parent Name: ${formData.parentName}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Locality in Indore: ${formData.locality}\n` +
      `• Baby's Age: ${formData.babyAge || 'Not specified'}\n` +
      (formData.notes ? `• Note: ${formData.notes}\n` : '') +
      `Please let me know your availability!`;

    window.open(createWhatsAppUrl(message), '_blank');
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden bg-dusty-peach/30">
      
      {/* Decorative Blur Backdrops */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-blush-pink/40 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-1/4 w-80 h-80 bg-muted-sage/20 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Reassuring Pitch */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <span className="inline-block text-xs uppercase tracking-widest text-muted-sage-dark font-semibold">
              Get in Touch
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-warm-charcoal leading-tight">
              Let’s make time for gentle care.
            </h2>
            <p className="text-base text-muted-brown leading-relaxed max-w-lg mx-auto lg:mx-0">
              Have questions about baby massage, session duration, or home visit availability in Indore? 
              Reach out directly to Nidhi to discuss your little one's routine.
            </p>

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
                <span>Chat on WhatsApp</span>
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

            <div className="pt-4 border-t border-dusty-peach/40 flex items-center justify-center lg:justify-start gap-2 text-xs text-muted-brown">
              <MapPin className="w-4 h-4 text-soft-terracotta shrink-0" />
              <span>Serving residential areas across Indore, Madhya Pradesh</span>
            </div>
          </div>

          {/* Right Column: Direct Booking Enquiry Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-dusty-peach/40">
              <h3 className="font-serif text-2xl text-warm-charcoal mb-1">
                Quick Session Enquiry
              </h3>
              <p className="text-xs text-muted-brown mb-5">
                Fill in your details to immediately connect with Nidhi on WhatsApp.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-warm-charcoal mb-1">
                    Your Name (Parent) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="
                      w-full px-4 py-2.5 rounded-xl bg-warm-ivory/60 border border-dusty-peach/50
                      text-sm text-warm-charcoal placeholder:text-muted-brown/50
                      focus:outline-none focus:ring-2 focus:ring-soft-terracotta/50
                    "
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-warm-charcoal mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98260XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="
                        w-full px-4 py-2.5 rounded-xl bg-warm-ivory/60 border border-dusty-peach/50
                        text-sm text-warm-charcoal placeholder:text-muted-brown/50
                        focus:outline-none focus:ring-2 focus:ring-soft-terracotta/50
                      "
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-warm-charcoal mb-1">
                      Baby’s Age (approx.)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2 months"
                      value={formData.babyAge}
                      onChange={(e) => setFormData({ ...formData, babyAge: e.target.value })}
                      className="
                        w-full px-4 py-2.5 rounded-xl bg-warm-ivory/60 border border-dusty-peach/50
                        text-sm text-warm-charcoal placeholder:text-muted-brown/50
                        focus:outline-none focus:ring-2 focus:ring-soft-terracotta/50
                      "
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-warm-charcoal mb-1">
                    Your Locality in Indore
                  </label>
                  <select
                    value={formData.locality}
                    onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                    className="
                      w-full px-4 py-2.5 rounded-xl bg-warm-ivory/60 border border-dusty-peach/50
                      text-sm text-warm-charcoal
                      focus:outline-none focus:ring-2 focus:ring-soft-terracotta/50
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
                  <label className="block text-xs font-semibold text-warm-charcoal mb-1">
                    Any Specific Requests or Preferred Time
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Morning time preferred after bath"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="
                      w-full px-4 py-2.5 rounded-xl bg-warm-ivory/60 border border-dusty-peach/50
                      text-sm text-warm-charcoal placeholder:text-muted-brown/50
                      focus:outline-none focus:ring-2 focus:ring-soft-terracotta/50
                    "
                  />
                </div>

                <button
                  type="submit"
                  className="
                    w-full flex items-center justify-center gap-2
                    bg-soft-terracotta hover:bg-soft-terracotta-hover
                    text-white font-medium text-sm
                    py-3 rounded-full
                    shadow-sm hover:shadow-md
                    transition-all duration-200 active:scale-[0.98]
                  "
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry via WhatsApp</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
