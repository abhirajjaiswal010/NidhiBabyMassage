import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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

          {/* Minimal Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-warm-charcoal/80 hover:text-soft-terracotta transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/book"
              className="
                bg-[#FFDDDD] hover:bg-[#FFCED8]
                text-[#4A352F] text-xs font-semibold
                px-5 py-2.5 rounded-full border border-[#FFCED8] shadow-xs
                transition-all duration-150 active:scale-95
              "
            >
              Book Session
            </Link>
          </div>

          {/* Mobile Menu Action */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/book"
              className="
                bg-[#FFDDDD] hover:bg-[#FFCED8] text-[#4A352F]
                text-xs font-semibold px-3.5 py-1.5 rounded-full border border-[#FFCED8]
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
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-medium text-warm-charcoal py-1 hover:text-soft-terracotta"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link
                to="/book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-center bg-[#FFDDDD] hover:bg-[#FFCED8] text-[#4A352F] font-semibold py-2 rounded-full text-xs border border-[#FFCED8]"
              >
                Book Session
              </Link>
              <a
                href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
                className="text-center text-xs text-muted-brown py-1"
              >
                Call: {BUSINESS_PHONE_DISPLAY}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
