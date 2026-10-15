import React from 'react';
import { MessageCircle } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/whatsapp';

export default function FloatingWhatsApp() {
  return (
    <aside 
      aria-label="Quick WhatsApp Consultation"
      className="fixed bottom-5 right-5 z-40 flex items-center"
    >
      <a
        href={createWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="
          group flex items-center gap-2.5
          bg-[#25D366] hover:bg-[#20BD5A] text-white
          py-3 px-4.5 rounded-full shadow-lg hover:shadow-xl
          transition-all duration-300 ease-out active:scale-95
          focus:outline-none focus-visible:ring-3 focus-visible:ring-[#25D366]/40
        "
        aria-label="Chat on WhatsApp with Nidhi in Indore"
      >
        <MessageCircle className="w-5 h-5 fill-white stroke-none shrink-0" />
        <span className="text-xs sm:text-sm font-semibold tracking-wide hidden sm:inline">
          Chat with Nidhi
        </span>
        <span className="text-xs font-semibold sm:hidden">
          WhatsApp
        </span>
      </a>
    </aside>
  );
}
