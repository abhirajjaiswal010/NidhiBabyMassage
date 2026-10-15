import React from 'react';
import { MessageCircle } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/whatsapp';

export default function FloatingWhatsApp() {
  return (
    <aside 
      aria-label="Quick WhatsApp Consultation"
      className="fixed z-40 flex items-center"
      style={{
        bottom: 'max(1.25rem, env(safe-area-inset-bottom, 1.25rem))',
        right: 'max(1.25rem, env(safe-area-inset-right, 1.25rem))',
      }}
    >
      <a
        href={createWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="
          group relative flex items-center justify-center
          w-10 h-10 sm:w-11 sm:h-11 rounded-full
          shadow-md hover:shadow-xl hover:shadow-[#25D366]/35
          transition-all duration-300 ease-out active:scale-90
          focus:outline-none focus-visible:ring-3 focus-visible:ring-[#25D366]/50
        "
        aria-label="Chat on WhatsApp with Nidhi in Indore"
      >
        {/* Subtle pulsing background glow ring in WhatsApp green */}
        <span className="animate-ping absolute inset-0 rounded-full bg-[#25D366] opacity-35 pointer-events-none" />

        {/* Provided Official WhatsApp PNG Image */}
        <img
          src="/whatsapp.png"
          alt="WhatsApp Chat"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 relative z-10"
        />
      </a>
    </aside>
  );
}
