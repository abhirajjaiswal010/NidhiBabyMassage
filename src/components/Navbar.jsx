import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, Phone, Calendar } from 'lucide-react';
import { createWhatsAppUrl, BUSINESS_PHONE_DISPLAY } from '../utils/whatsapp';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Baby Massage', href: '/#services' },
    { label: 'Why Nidhi', href: '/#why-us' },
    { label: 'Meet Nidhi', href: '/#about' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'FAQs', href: '/#faqs' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-warm-ivory/95 backdrop-blur-md shadow-sm py-3 border-b border-dusty-peach/30' 
          : 'bg-warm-ivory/80 backdrop-blur-sm py-4'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-terracotta rounded-lg"
          >
            <div className="w-10 h-10 rounded-full bg-dusty-peach/60 flex items-center justify-center text-soft-terracotta border border-soft-terracotta/20 transition-transform group-hover:scale-105">
              <span className="font-serif font-bold text-lg">N</span>
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-warm-charcoal block leading-tight">
                Nidhi's Baby Massage
              </span>
              <span className="text-[11px] uppercase tracking-wider text-muted-brown font-medium block">
                Indore • Home Visits
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="
                  text-sm font-medium text-warm-charcoal/80
                  hover:text-soft-terracotta
                  transition-colors duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-terracotta rounded
                "
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
              className="
                inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-warm-charcoal/80
                hover:text-warm-charcoal transition-colors
              "
              title="Call Nidhi directly"
            >
              <Phone className="w-3.5 h-3.5 text-muted-sage" />
              <span>{BUSINESS_PHONE_DISPLAY}</span>
            </a>

            <Link
              to="/book"
              className="
                inline-flex items-center gap-2
                bg-soft-terracotta hover:bg-soft-terracotta-hover
                text-white text-sm font-medium
                px-5 py-2.5 rounded-full
                shadow-sm hover:shadow-md
                transition-all duration-200 active:scale-[0.98]
              "
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Session</span>
            </Link>
          </div>

          {/* Mobile Menu Action */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/book"
              className="
                inline-flex items-center gap-1.5
                bg-soft-terracotta text-white
                text-xs font-medium
                px-3 py-1.5 rounded-full
              "
              aria-label="Book a Session"
            >
              <span>Book</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="
                p-2 rounded-lg text-warm-charcoal
                hover:bg-dusty-peach/30
                focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-terracotta
              "
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-warm-ivory border-b border-dusty-peach/30 px-4 pt-3 pb-6 shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="
                  text-base font-medium text-warm-charcoal
                  py-2 px-3 rounded-md
                  hover:bg-dusty-peach/20 hover:text-soft-terracotta
                  transition-colors
                "
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-dusty-peach/30 flex flex-col gap-2.5">
              <Link
                to="/book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="
                  flex items-center justify-center gap-2
                  w-full bg-soft-terracotta text-white font-medium
                  py-2.5 rounded-full text-sm shadow-sm
                "
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Session (Enquiry Form)</span>
              </Link>
              <a
                href={createWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center justify-center gap-2
                  w-full bg-[#25D366] text-white font-medium
                  py-2.5 rounded-full text-sm shadow-sm
                "
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
                className="
                  flex items-center justify-center gap-2
                  w-full bg-white text-warm-charcoal font-medium
                  py-2.5 rounded-full text-sm border border-dusty-peach
                "
              >
                <Phone className="w-4 h-4 text-muted-sage" />
                <span>Call {BUSINESS_PHONE_DISPLAY}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
