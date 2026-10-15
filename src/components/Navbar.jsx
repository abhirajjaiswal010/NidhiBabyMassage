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
  ];

  return (
    <header
      className={`
        fixed left-0 right-0 z-50 transition-all duration-500 ease-out flex flex-col items-center pointer-events-none
        ${isScrolled 
          ? 'top-2 sm:top-3.5 px-2.5 sm:px-6' 
          : 'top-0 px-0 w-full'
        }
      `}
    >
      <div
        className={`
          w-full pointer-events-auto transition-all duration-500 ease-out border-none outline-none
          ${isScrolled 
            ? 'max-w-4xl bg-warm-ivory/60 backdrop-blur-xl shadow-md rounded-full py-1.5 px-3 sm:px-5' 
            : 'max-w-full bg-gradient-to-b from-[#FFCED8]/60 via-[#FFDDDD]/35 via-[#FFE8C4]/15 to-transparent backdrop-blur-md rounded-none py-2 sm:py-2.5 px-2.5 xs:px-3.5 sm:px-6 lg:px-8 shadow-none'
          }
        `}
      >
          {/* DESKTOP LAYOUT (md and up) - Compact & Sized for Laptop/Desktop */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Brand Logo - Compact Laptop/Desktop Sizing */}
            <Link
              to="/"
              className="group focus:outline-none"
              aria-label="Nidhi's Baby Massage Home"
            >
              <span className="font-huglove text-xl lg:text-2xl tracking-wide block leading-none">
                <span className="text-warm-charcoal">Nidhi's </span>
                <span className="text-soft-terracotta">Baby Massage</span>
              </span>
            </Link>

            {/* Smooth Desktop Nav Links - Compact Spacing */}
            <nav className="flex items-center space-x-0.5" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="
                    text-xs lg:text-[13px] font-medium text-warm-charcoal/80
                    px-2.5 lg:px-3 py-1 rounded-full
                    transition-all duration-300 ease-out
                    hover:text-[#4A352F] hover:bg-white hover:scale-105 hover:shadow-xs
                    active:scale-95
                  "
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Action CTA + Direct Phone Number - Compact Sizing */}
            <div className="flex items-center gap-2 lg:gap-2.5">
              <a
                href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
                className="
                  inline-flex items-center gap-1.5 text-[11px] lg:text-xs font-semibold
                  text-[#4A352F] bg-white hover:bg-white/90 shadow-xs
                  px-3 py-1.5 rounded-full
                  transition-all duration-200 active:scale-95
                "
                aria-label={`Call Nidhi at ${BUSINESS_PHONE_DISPLAY}`}
              >
                <Phone className="w-3 h-3 text-[#D96B82]" />
                <span>{BUSINESS_PHONE_DISPLAY}</span>
              </a>

              <Link
                to="/book"
                className="
                  inline-flex items-center justify-center
                  bg-[#FFDDDD] hover:bg-[#F2AEBA] hover:brightness-95
                  text-[#4A352F] font-poppins font-semibold text-[11px] lg:text-xs
                  px-3.5 lg:px-4 py-1.5 rounded-full shadow-xs hover:shadow-md
                  transition-all duration-200 active:scale-95
                "
              >
                Book a Session
              </Link>
            </div>
          </div>

          {/* MOBILE LAYOUT (< md): Perfectly Centered Brand Name + Vertically Aligned Sandwich & Action Buttons */}
          <div className="relative flex md:hidden items-center justify-between w-full h-10 xs:h-11">
            
            {/* Left: Sandwich Menu in Baby Font-Like Style */}
            <div className="z-10 flex items-center shrink-0">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="
                  inline-flex items-center gap-1
                  bg-white/95 hover:bg-white border border-[#FFCED8]
                  text-warm-charcoal p-1.5 xs:px-2.5 xs:py-1.5 rounded-full shadow-2xs
                  transition-all duration-200 active:scale-95 focus:outline-none
                "
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 text-[#C24B66]" />
                ) : (
                  <span className="flex items-center gap-1">
                    {/* Cute baby-style 3-bar sandwich icon with rounded soft bars */}
                    <svg width="16" height="13" viewBox="0 0 18 15" fill="none" className="text-[#C24B66] shrink-0">
                      <line x1="2" y1="2.5" x2="16" y2="2.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="2" y1="7.5" x2="12" y2="7.5" stroke="#3A2822" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="2" y1="12.5" x2="16" y2="12.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    <span className="font-huglove text-[11px] text-[#3A2822] tracking-wide hidden sm:inline">
                      menu
                    </span>
                  </span>
                )}
              </button>
            </div>

            {/* Center: Truly Centered Brand Name (Larger & More Prominent) */}
            <div className="absolute inset-x-0 inset-y-0 flex items-center justify-center pointer-events-none px-11 xs:px-14">
              <Link
                to="/"
                className="pointer-events-auto inline-flex items-center justify-center group focus:outline-none max-w-full"
                aria-label="Nidhi's Baby Massage Home"
              >
                <span className="font-huglove text-xl xs:text-2xl sm:text-3xl tracking-wide leading-none whitespace-nowrap block truncate">
                  <span className="text-[#3A2822]">Nidhi's </span>
                  <span className="text-[#C24B66]">Baby Massage</span>
                </span>
              </Link>
            </div>

            {/* Right: Contact Call & Book in same line */}
            <div className="z-10 flex items-center gap-1 xs:gap-1.5 shrink-0">
              <a
                href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
                className="p-1.5 bg-white text-[#C24B66] rounded-full border border-[#FFCED8] shadow-2xs hover:bg-white/90 transition-colors"
                aria-label={`Call ${BUSINESS_PHONE_DISPLAY}`}
                title="Call Nidhi"
              >
                <Phone className="w-3.5 h-3.5" />
              </a>

              <Link
                to="/book"
                className="
                  inline-flex items-center justify-center
                  bg-[#FFDDDD] hover:bg-[#F2AEBA] hover:brightness-95
                  text-[#3A2822] font-poppins font-semibold text-[11px] xs:text-xs
                  px-2.5 xs:px-3 py-1.5 rounded-full shadow-2xs
                  transition-all duration-200 active:scale-95 whitespace-nowrap
                "
              >
                Book
              </Link>
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
