import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { BUSINESS_PHONE_DISPLAY } from '../utils/whatsapp';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 35);
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
        fixed left-0 right-0 z-50 transition-all duration-500 ease-out flex flex-col items-center pointer-events-none
        ${isScrolled 
          ? 'top-2.5 sm:top-3.5 px-3 sm:px-6' 
          : 'top-0 px-0 w-full'
        }
      `}
    >
      <div
        className={`
          w-full pointer-events-auto transition-all duration-500 ease-out border-none outline-none
          ${isScrolled 
            ? 'max-w-5xl bg-warm-ivory/45 backdrop-blur-xl shadow-md rounded-full py-2 px-4 sm:px-6' 
            : 'max-w-full bg-gradient-to-b from-[#FFCED8]/60 via-[#FFDDDD]/35 via-[#FFE8C4]/15 to-transparent backdrop-blur-md rounded-none py-3.5 sm:py-4 px-4 sm:px-8 lg:px-12 shadow-none'
          }
        `}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
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
                  hover:text-[#4A352F] hover:bg-white hover:scale-105 hover:shadow-xs
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
                inline-flex items-center justify-center
                bg-[#FFDDDD] hover:bg-[#F2AEBA] hover:brightness-95
                text-[#4A352F] font-poppins font-semibold text-xs
                px-5 py-2.5 rounded-full shadow-xs hover:shadow-md
                transition-all duration-200 active:scale-95
              "
            >
              Book a Session
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
                inline-flex items-center justify-center
                bg-[#FFDDDD] hover:bg-[#F2AEBA] hover:brightness-95
                text-[#4A352F] font-poppins font-semibold text-xs
                px-3.5 py-1.5 rounded-full shadow-xs hover:shadow-md
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
        <div className="md:hidden pointer-events-auto w-full max-w-sm mt-2 bg-warm-ivory/80 backdrop-blur-2xl rounded-3xl px-6 py-5 shadow-xl border-none">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="
                  text-sm font-medium text-warm-charcoal px-3 py-2 rounded-xl
                  hover:bg-white hover:text-[#4A352F] hover:translate-x-1 hover:scale-[1.02] hover:shadow-xs
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
                  text-center bg-[#FFDDDD] hover:bg-[#F2AEBA] hover:brightness-95
                  text-[#4A352F] font-poppins font-semibold py-2.5 rounded-full text-xs shadow-xs hover:shadow-md
                  transition-all duration-200 active:scale-95
                "
              >
                Book a Session
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
