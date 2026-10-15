import React from 'react';
import { MapPin, Heart } from 'lucide-react';
import { BUSINESS_LOCATION } from '../utils/whatsapp';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/95 border-t border-dusty-peach/30 pt-10 pb-28 sm:pb-20 md:pb-12 text-warm-charcoal relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top: Brand Info + Centered Live Website Pill */}
        <div className="flex flex-col items-center text-center gap-3 pb-6 border-b border-dusty-peach/20">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="Nidhi's Baby Massage Logo"
              className="w-11 h-11 sm:w-12 sm:h-12 object-contain drop-shadow-2xs"
            />
            <span className="font-huglove text-2xl sm:text-3xl tracking-wide">
              <span className="text-warm-charcoal">Nidhi's </span>
              <span className="text-soft-terracotta">Baby Massage</span>
            </span>
          </div>

          {/* Location Under Brand */}
          <p className="text-xs text-muted-brown flex items-center justify-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-soft-terracotta shrink-0" />
            <span>{BUSINESS_LOCATION}</span>
          </p>
        </div>

        {/* Middle: Clean Navigation Links */}
        <nav className="py-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-muted-brown">
          <a href="#services" className="hover:text-soft-terracotta transition-colors py-1">Services</a>
          <a href="#why-us" className="hover:text-soft-terracotta transition-colors py-1">Our Approach</a>
          <a href="#gallery" className="hover:text-soft-terracotta transition-colors py-1">Moments of Care</a>
          <a href="#about" className="hover:text-soft-terracotta transition-colors py-1">About Nidhi</a>
          <a href="/book" className="hover:text-soft-terracotta transition-colors py-1">Book Session</a>
        </nav>

        {/* Localities in Indore */}
        <div className="flex flex-col items-center justify-center text-center gap-3 pb-6 max-w-lg mx-auto">
          <p className="text-[11px] sm:text-xs text-muted-brown/75 leading-relaxed">
            At-home baby massage across Vijay Nagar, Palasia, Saket, Bicholi Mardana, Super Corridor & nearby Indore localities.
          </p>

          {/* Live Pill Below the Locations */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-[11px] sm:text-xs font-semibold text-emerald-800 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Website Live • {currentYear}</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Love Note */}
        <div className="pt-4 border-t border-dusty-peach/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-muted-brown/70 text-center sm:text-left">
          <p>© {currentYear} Nidhi's Baby Massage. Gentle newborn care.</p>
          <p className="flex items-center justify-center gap-1">
            <span>Crafted with love</span>
            <Heart className="w-3 h-3 text-soft-terracotta fill-soft-terracotta" />
            <span>for Indore mothers & babies</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
