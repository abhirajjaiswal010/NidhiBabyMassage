import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { BUSINESS_PHONE_DISPLAY } from '../utils/whatsapp';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        // Compress smoothly when the user leaves the Hero section
        setIsScrolled(rect.bottom <= 120 || window.scrollY > 350);
      } else {
        setIsScrolled(window.scrollY > 150);
      }
    };
    handleScroll();
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
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out border-none outline-none
        ${isScrolled 
          ? 'bg-warm-ivory/60 backdrop-blur-xl shadow-xs py-2.5 sm:py-3' 
          : 'bg-gradient-to-b from-[#FFCED8]/60 via-[#FFDDDD]/35 via-[#FFE8C4]/15 to-transparent backdrop-blur-md py-5 sm:py-7 lg:py-8'
        }
      `}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300">
        <div className="flex items-center justify-between">
          
          {/* Minimal Brand Logo */}
          <Link
            to="/"
            className="group focus:outline-none transition-transform duration-300"
            aria-label="Nidhi's Baby Massage Home"
          >
            <span className={`font-huglove tracking-wide block leading-none transition-all duration-300 ${
              isScrolled ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'
            }`}>
              <span className="text-warm-charcoal">Nidhi's </span>
              <span className="text-soft-terracotta">Baby Massage</span>
            </span>
          </Link>

          {/* Smooth Pop-Out Interactive Desktop Nav Links */}
          <nav 
            className={`hidden md:flex items-center transition-all duration-300 ${
              isScrolled ? 'space-x-1' : 'space-x-2 lg:space-x-3'
            }`} 
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`
                  font-medium text-warm-charcoal/80 rounded-full
                  transition-all duration-300 ease-out
                  hover:text-[#4A352F] hover:bg-white hover:scale-105 hover:shadow-xs
                  active:scale-95
                  ${isScrolled ? 'text-sm px-3.5 py-1.5' : 'text-sm sm:text-base px-4 py-2'}
                `}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTA + Direct Phone Number */}
          <div className={`hidden md:flex items-center transition-all duration-300 ${isScrolled ? 'gap-3' : 'gap-4'}`}>
            <a
              href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
              className={`
                inline-flex items-center gap-1.5 font-semibold
                text-[#4A352F] bg-white hover:bg-white/90 shadow-xs
                rounded-full transition-all duration-300 active:scale-95
                ${isScrolled ? 'text-xs px-3.5 py-2' : 'text-xs sm:text-sm px-4 sm:px-4.5 py-2.5'}
              `}
              aria-label={`Call Nidhi at ${BUSINESS_PHONE_DISPLAY}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#D96B82]" />
              <span>{BUSINESS_PHONE_DISPLAY}</span>
            </a>

            <Link
              to="/book"
              className={`
                inline-flex items-center justify-center
                bg-[#FFDDDD] hover:bg-[#F2AEBA] hover:brightness-95
                text-[#4A352F] font-poppins font-semibold
                rounded-full shadow-xs hover:shadow-md
                transition-all duration-300 active:scale-95
                ${isScrolled ? 'text-xs px-5 py-2.5' : 'text-xs sm:text-sm px-6 py-2.5 sm:px-7 sm:py-3'}
              `}
            >
              Book a Session
            </Link>
          </div>

          {/* Mobile Menu Action */}
          <div className={`flex md:hidden items-center transition-all duration-300 ${isScrolled ? 'gap-1.5' : 'gap-2.5'}`}>
            <a
              href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
              className={`bg-white text-[#D96B82] rounded-full shadow-xs hover:bg-white/90 transition-all ${
                isScrolled ? 'p-1.5' : 'p-2'
              }`}
              aria-label={`Call ${BUSINESS_PHONE_DISPLAY}`}
            >
              <Phone className={isScrolled ? 'w-4 h-4' : 'w-4.5 h-4.5'} />
            </a>

            <Link
              to="/book"
              className={`
                inline-flex items-center justify-center
                bg-[#FFDDDD] hover:bg-[#F2AEBA] hover:brightness-95
                text-[#4A352F] font-poppins font-semibold
                rounded-full shadow-xs hover:shadow-md
                transition-all duration-300 active:scale-95
                ${isScrolled ? 'text-xs px-3.5 py-1.5' : 'text-xs px-4 py-2'}
              `}
            >
              Book
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`text-warm-charcoal focus:outline-none transition-all ${
                isScrolled ? 'p-1.5' : 'p-2'
              }`}
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
