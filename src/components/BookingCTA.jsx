import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone, MapPin, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { createWhatsAppUrl, BUSINESS_PHONE_DISPLAY } from '../utils/whatsapp';

export default function BookingCTA() {
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/90 backdrop-blur-xs rounded-4xl p-8 sm:p-12 lg:p-16 border border-dusty-peach/40 shadow-sm text-center space-y-6">
          
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-muted-sage/15 text-muted-sage-dark text-xs font-semibold uppercase tracking-wider mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gentle At-Home Care in Indore</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-warm-charcoal leading-tight max-w-2xl mx-auto">
            Let’s make time for gentle, comforting care.
          </h2>

          <p className="text-base text-muted-brown leading-relaxed max-w-xl mx-auto">
            Ready to arrange an at-home baby massage session tailored to your little one’s comfort and sleep routine? 
            Fill our quick enquiry form or message Nidhi directly.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/book"
              className="
                w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                bg-soft-terracotta hover:bg-soft-terracotta-hover
                text-white font-medium text-base
                px-8 py-3.5 rounded-full
                shadow-sm hover:shadow-md
                transition-all duration-200 active:scale-[0.98]
              "
            >
              <span>Book a Session</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={createWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-full sm:w-auto inline-flex items-center justify-center gap-2
                bg-warm-ivory hover:bg-dusty-peach/30
                text-warm-charcoal font-medium text-base
                px-6 py-3.5 rounded-full
                border border-dusty-peach/70
                transition-all duration-200
              "
            >
              <MessageCircle className="w-4 h-4 text-soft-terracotta" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Service Area & Phone reassurance */}
          <div className="pt-6 border-t border-dusty-peach/30 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-brown">
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
