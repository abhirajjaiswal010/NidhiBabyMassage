import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, MapPin, ArrowRight } from 'lucide-react';
import { createWhatsAppUrl, BUSINESS_PHONE_DISPLAY } from '../utils/whatsapp';

export default function BookingCTA() {
  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden bg-dusty-peach/30">
      
      {/* Decorative Blur Backgrounds */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 bg-blush-pink/30 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 left-1/4 w-80 h-80 bg-muted-sage/15 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 rounded-3xl sm:rounded-4xl p-5 sm:p-12 border border-dusty-peach/40 shadow-xs text-center space-y-4 sm:space-y-5">
          

          <h2 className="font-huglove text-3xl sm:text-5xl lg:text-6xl text-warm-charcoal leading-tight max-w-xl mx-auto tracking-wide">
            <span className="text-warm-charcoal">Let’s make time for </span>
            <span className="text-soft-terracotta">gentle care.</span>
          </h2>

          <p className="text-sm sm:text-base text-muted-brown max-w-md mx-auto leading-relaxed">
            Ready to book an at-home session for your baby? Fill our quick enquiry form or chat directly with Nidhi.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/book"
              className="
                w-full sm:w-auto inline-flex items-center justify-center
                bg-[#FFDDDD] hover:bg-[#F2AEBA] hover:brightness-95
                text-[#4A352F] font-semibold text-sm sm:text-base
                px-7 py-3 rounded-full shadow-xs hover:shadow-md
                transition-all duration-200 active:scale-[0.98]
              "
            >
              <span>Book a Session</span>
            </Link>

            <a
              href={createWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-full sm:w-auto inline-flex items-center justify-center gap-2
                bg-[#FFE8C4] hover:bg-[#F5CE96] hover:brightness-95
                text-[#4A352F] font-semibold text-sm sm:text-base
                px-6 py-3 rounded-full shadow-xs hover:shadow-sm
                transition-all duration-200 active:scale-95
              "
            >
              <MessageCircle className="w-4 h-4 text-[#D96B82]" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          {/* Service Area & Phone reassurance */}
          <div className="pt-4 border-t border-dusty-peach/30 flex flex-wrap items-center justify-center gap-5 text-xs text-muted-brown">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-soft-terracotta" />
              Serving residential areas across Indore
            </span>
            <a
              href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 hover:text-warm-charcoal transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-muted-sage" />
              <span>Call: {BUSINESS_PHONE_DISPLAY}</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
