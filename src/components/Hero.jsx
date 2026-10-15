import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/whatsapp';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28">
      {/* Background Soft Organic Blobs */}
      <div 
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-dusty-peach/25 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div 
        className="absolute -top-24 right-0 w-[400px] h-[400px] bg-blush-pink/30 rounded-full blur-2xl pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-muted-sage/15 text-muted-sage-dark border border-muted-sage/25 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-muted-sage-dark" />
              <span>Gentle Care • Indore, MP</span>
            </div>

            {/* Editorial Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-warm-charcoal leading-[1.15]">
              Gentle care for <br className="hidden sm:inline" />
              <span className="italic font-normal text-soft-terracotta">your little one.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-muted-brown max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              A warm, baby-led approach to infant massage, helping Indore parents make time for comfort, 
              peaceful rest, and nurturing touch in the quiet comfort of their home.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/book"
                className="
                  w-full sm:w-auto inline-flex items-center justify-center gap-2.5
                  bg-soft-terracotta hover:bg-soft-terracotta-hover
                  text-white font-medium text-base
                  px-7 py-3.5 rounded-full
                  shadow-sm hover:shadow-md
                  transition-all duration-200 active:scale-[0.98]
                "
              >
                <span>Book a Session</span>
              </Link>

              <a
                href="#services"
                className="
                  w-full sm:w-auto inline-flex items-center justify-center gap-2
                  bg-white/80 hover:bg-white
                  text-warm-charcoal font-medium text-base
                  px-6 py-3.5 rounded-full
                  border border-dusty-peach/60 hover:border-soft-terracotta/40
                  shadow-xs hover:shadow-sm
                  transition-all duration-200
                "
              >
                <span>Explore Services</span>
                <ArrowDown className="w-4 h-4 text-muted-brown" />
              </a>
            </div>

            {/* Location & Trust Label */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-muted-brown">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-soft-terracotta" />
                Serving families across Indore (Vijay Nagar, Palasia, Saket & more)
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-muted-sage" />
                Sanitized & Baby-Safe Practices
              </span>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual with Organic Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Soft Peach Organic Backdrop Shape */}
              <div 
                className="absolute -inset-3 bg-gradient-to-tr from-dusty-peach/40 via-blush-pink/40 to-muted-sage/20 rounded-[2.5rem] transform -rotate-2"
                aria-hidden="true"
              />

              {/* Main Lifestyle Image */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-lg border-4 border-white aspect-[4/5] bg-dusty-peach/20">
                <img
                  src="https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=900&q=80"
                  alt="Gentle newborn baby massage session in Indore"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>

              {/* Floating Reassurance Badge */}
              <div className="
                absolute -bottom-4 -left-4 sm:-left-6
                bg-white/95 backdrop-blur-sm
                py-2.5 px-4 rounded-2xl
                shadow-md border border-dusty-peach/40
                flex items-center gap-3
              ">
                <div className="w-8 h-8 rounded-full bg-muted-sage/20 flex items-center justify-center text-muted-sage-dark">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-warm-charcoal leading-tight">
                    Personalised Care
                  </p>
                  <p className="text-[11px] text-muted-brown leading-tight">
                    Tailored to your baby's comfort
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
