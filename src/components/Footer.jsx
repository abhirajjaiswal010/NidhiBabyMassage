import React from 'react';
import { MessageCircle, Phone, MapPin, Heart } from 'lucide-react';
import { createWhatsAppUrl, BUSINESS_PHONE_DISPLAY, BUSINESS_LOCATION } from '../utils/whatsapp';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-warm-charcoal text-warm-ivory/80 pt-16 pb-24 md:pb-16 border-t border-dusty-peach/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-soft-terracotta flex items-center justify-center text-white font-serif font-bold text-lg">
                N
              </div>
              <span className="font-huglove text-2xl sm:text-3xl text-white font-medium tracking-wide">
                <span>Nidhi's </span>
                <span className="text-dusty-peach">Baby Massage</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-warm-ivory/70 max-w-sm leading-relaxed">
              Providing gentle, hygienic, and unhurried baby massage services in the comfort of your home 
              across Indore, Madhya Pradesh.
            </p>

            <div className="flex items-center gap-2 text-xs text-warm-ivory/60 pt-2">
              <MapPin className="w-4 h-4 text-dusty-peach" />
              <span>{BUSINESS_LOCATION}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-base text-white font-semibold">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#services" className="hover:text-dusty-peach transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-dusty-peach transition-colors">Why Choose Nidhi</a>
              </li>
              <li>
                <a href="#about" className="hover:text-dusty-peach transition-colors">Meet Nidhi</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-dusty-peach transition-colors">How Booking Works</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-dusty-peach transition-colors">Frequently Asked Questions</a>
              </li>
            </ul>
          </div>

          {/* Contact Details & Indore Localities */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-base text-white font-semibold">
              Direct Contact & Bookings
            </h4>
            
            <div className="space-y-2.5 text-xs sm:text-sm">
              <a
                href={createWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-dusty-peach transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-muted-sage" />
                <span>WhatsApp: {BUSINESS_PHONE_DISPLAY}</span>
              </a>

              <a
                href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 hover:text-dusty-peach transition-colors"
              >
                <Phone className="w-4 h-4 text-muted-sage" />
                <span>Direct Call: {BUSINESS_PHONE_DISPLAY}</span>
              </a>
            </div>

            <p className="text-xs text-warm-ivory/50 pt-2 leading-relaxed">
              Serving: Vijay Nagar, Palasia, Saket, Bengali Square, Bicholi Mardana, Super Corridor, Annapurna, Rau, and nearby localities in Indore.
            </p>
          </div>

        </div>

        {/* Bottom Bar & Health Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warm-ivory/50">
          <p>© {currentYear} Nidhi's Baby Massage, Indore. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-soft-terracotta fill-soft-terracotta" /> for Indore families
          </p>
        </div>

      </div>
    </footer>
  );
}
