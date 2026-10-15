import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { BUSINESS_PHONE_DISPLAY } from '../utils/whatsapp';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Massage', href: '/#services' },
    { label: 'Moments', href: '/#gallery' },
    { label: 'Why Us', href: '/#why-us' },
    { label: 'About', href: '/#about' },
    { label: 'FAQs', href: '/#faqs' },
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-none outline-none
        ${isScrolled 
          ? 'bg-warm-ivory/40 backdrop-blur-xl shadow-xs py-3' 
          : 'bg-gradient-to-b from-[#FFCED8]/60 via-[#FFDDDD]/35 via-[#FFE8C4]/15 to-transparent backdrop-blur-md py-4 sm:py-5'
        }
      `}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Minimal Brand Logo */}
          <Link
            to="/"
            className="group focus:outline-none"
            aria-label="Nidhi's Baby Massage Home"
          >
            <span className="font-huglove text-2xl sm:text-3xl tracking-wide block leading-none">
              <span className="text-warm-charcoal">Nidhi's </span>
              <span className="text-soft-terracotta">Baby Massage</span>
            </span>
          </Link>

          {/* Smooth Pop-Out Interactive Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="
                  text-sm font-medium text-warm-charcoal/80
                  px-3.5 py-1.5 rounded-full
                  transition-all duration-300 ease-out
                  hover:text-[#4A352F] hover:bg-[#FFCED8]/75 hover:scale-105 hover:shadow-xs
                  active:scale-95
                "
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTA + Direct Phone Number */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
              className="
                inline-flex items-center gap-1.5 text-xs font-semibold
                text-[#4A352F] bg-white hover:bg-white/90 shadow-xs
                px-3.5 py-2 rounded-full
                transition-all duration-200 active:scale-95
              "
              aria-label={`Call Nidhi at ${BUSINESS_PHONE_DISPLAY}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#D96B82]" />
              <span>{BUSINESS_PHONE_DISPLAY}</span>
            </a>

            <Link
              to="/book"
              className="
                bg-[#FEF3E2] hover:bg-[#FFE8C4] hover:shadow-sm
                text-[#D96B82] hover:text-[#C2556C] text-xs font-semibold
                px-5 py-2.5 rounded-full shadow-xs
                transition-all duration-200 active:scale-95
              "
            >
              Book Session
            </Link>
          </div>

          {/* Mobile Menu Action */}
          <div className="flex md:hidden items-center gap-1.5">
            <a
              href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
              className="p-1.5 bg-white text-[#D96B82] rounded-full shadow-xs hover:bg-white/90 transition-colors"
              aria-label={`Call ${BUSINESS_PHONE_DISPLAY}`}
            >
              <Phone className="w-4 h-4" />
            </a>

            <Link
              to="/book"
              className="
                bg-[#FEF3E2] hover:bg-[#FFE8C4] text-[#D96B82] hover:text-[#C2556C]
                text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-xs
                transition-all duration-200 active:scale-95
              "
            >
              Book
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-warm-charcoal focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-warm-ivory/60 backdrop-blur-xl px-6 py-5 shadow-lg">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="
                  text-sm font-medium text-warm-charcoal px-3 py-2 rounded-xl
                  hover:bg-[#FFCED8]/75 hover:text-[#4A352F] hover:translate-x-1 hover:scale-[1.02]
                  transition-all duration-200
                "
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link
                to="/book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="
                  text-center bg-[#FEF3E2] hover:bg-[#FFE8C4]
                  text-[#D96B82] hover:text-[#C2556C] font-semibold py-2.5 rounded-full text-xs shadow-xs
                  transition-all duration-200 active:scale-95
                "
              >
                Book Session
              </Link>
              <a
                href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
                className="
                  inline-flex items-center justify-center gap-2
                  bg-white hover:bg-white/90 shadow-xs
                  text-[#4A352F] font-semibold py-2 rounded-full text-xs
                  transition-all duration-200
                "
              >
                <Phone className="w-3.5 h-3.5 text-[#D96B82]" />
                <span>Call: {BUSINESS_PHONE_DISPLAY}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
