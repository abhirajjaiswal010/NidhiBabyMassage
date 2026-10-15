import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Calendar } from 'lucide-react';
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
    <motion.header
      initial={false}
      animate={{
        y: isScrolled ? 10 : 0,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      className={`
        fixed left-0 right-0 z-50 flex flex-col items-center pointer-events-none transition-all duration-500
        ${isScrolled ? 'px-3 sm:px-6' : 'px-3 sm:px-6 md:px-8'}
      `}
    >
      <motion.div
        layout
        transition={{
          layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        }}
        className={`
          w-full pointer-events-auto border-none outline-none transition-colors duration-500 ease-out
          ${isScrolled 
            ? 'max-w-5xl bg-warm-ivory/50 backdrop-blur-xl shadow-md rounded-full py-2 px-4 sm:px-6' 
            : 'max-w-7xl bg-gradient-to-b from-[#FFCED8]/60 via-[#FFDDDD]/35 via-[#FFE8C4]/15 to-transparent backdrop-blur-md rounded-2xl sm:rounded-3xl py-3.5 sm:py-4 px-4 sm:px-8'
          }
        `}
      >
        <div className="flex items-center justify-between">
          
          {/* Minimal Brand Logo */}
          <Link
            to="/"
            className="group focus:outline-none shrink-0"
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
          <div className="hidden md:flex items-center gap-2.5">
            <motion.a
              layout
              transition={{ layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
              href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
              className={`
                bg-white hover:bg-white/95 shadow-xs rounded-full overflow-hidden
                active:scale-95 flex items-center justify-center shrink-0
                ${isScrolled 
                  ? 'h-9 w-9 p-0 hover:scale-105 transition-transform duration-200' 
                  : 'h-9 px-3.5 gap-1.5 text-xs font-semibold text-[#4A352F]'
                }
              `}
              title={`Call ${BUSINESS_PHONE_DISPLAY}`}
              aria-label={`Call Nidhi at ${BUSINESS_PHONE_DISPLAY}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#D96B82] shrink-0" />
              <AnimatePresence initial={false}>
                {!isScrolled && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="whitespace-nowrap overflow-hidden text-xs"
                  >
                    {BUSINESS_PHONE_DISPLAY}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.a>

            <motion.div
              layout
              transition={{ layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
            >
              <Link
                to="/book"
                className={`
                  bg-[#FFDDDD] hover:bg-[#F2AEBA] hover:brightness-95
                  text-[#4A352F] rounded-full shadow-xs hover:shadow-md
                  active:scale-95 flex items-center justify-center shrink-0 overflow-hidden
                  transition-colors duration-200
                  ${isScrolled 
                    ? 'h-9 w-9 p-0 hover:scale-105 transition-transform duration-200' 
                    : 'h-9 px-5 font-poppins font-semibold text-xs'
                  }
                `}
                title="Book a Session"
                aria-label="Book a Session"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isScrolled ? (
                    <motion.span
                      key="calendar-icon"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center"
                    >
                      <Calendar className="w-4 h-4 text-[#4A352F]" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="book-text"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap"
                    >
                      Book a Session
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Action */}
          <div className="flex md:hidden items-center gap-1.5">
            <motion.a
              layout
              href={`tel:${BUSINESS_PHONE_DISPLAY.replace(/\s+/g, '')}`}
              className="h-8 w-8 flex items-center justify-center bg-white text-[#D96B82] rounded-full shadow-xs hover:bg-white/90 active:scale-95 transition-all"
              title={`Call ${BUSINESS_PHONE_DISPLAY}`}
              aria-label={`Call ${BUSINESS_PHONE_DISPLAY}`}
            >
              <Phone className="w-3.5 h-3.5" />
            </motion.a>

            <motion.div
              layout
              transition={{ layout: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
            >
              <Link
                to="/book"
                className={`
                  bg-[#FFDDDD] hover:bg-[#F2AEBA] hover:brightness-95 text-[#4A352F]
                  rounded-full shadow-xs hover:shadow-md active:scale-95
                  flex items-center justify-center overflow-hidden transition-colors duration-200
                  ${isScrolled ? 'h-8 w-8 p-0' : 'h-8 px-3.5 font-poppins font-semibold text-xs'}
                `}
                title="Book a Session"
                aria-label="Book a Session"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isScrolled ? (
                    <motion.span
                      key="m-calendar"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#4A352F]" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="m-book"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="whitespace-nowrap"
                    >
                      Book
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>

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
      </motion.div>

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
    </motion.header>
  );
}
