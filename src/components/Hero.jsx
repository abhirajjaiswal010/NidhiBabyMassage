import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, MapPin, Sparkles, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28">
      {/* Background Soft Organic Blobs */}
      <div 
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-dusty-peach/20 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div 
        className="absolute -top-24 right-0 w-[350px] h-[350px] bg-blush-pink/25 rounded-full blur-2xl pointer-events-none -z-10" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-5 text-center lg:text-left"
          >
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted-sage/15 text-muted-sage-dark border border-muted-sage/25 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-muted-sage-dark" />
              <span>Gentle Care • Indore, MP</span>
            </div>

            {/* Editorial Main Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-warm-charcoal leading-[1.15]">
              Gentle care for <br className="hidden sm:inline" />
              <span className="italic font-normal text-soft-terracotta">your little one.</span>
            </h1>

            {/* Light, Crisp Subtitle */}
            <p className="text-base sm:text-lg text-muted-brown max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Unhurried, at-home baby massage in Indore. Tailored strictly to your baby’s comfort, sleep, and feeding rhythm.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                to="/book"
                className="
                  w-full sm:w-auto inline-flex items-center justify-center
                  bg-soft-terracotta hover:bg-soft-terracotta-hover
                  text-white font-medium text-base
                  px-7 py-3 rounded-full shadow-sm hover:shadow-md
                  transition-all duration-200 active:scale-[0.98]
                "
              >
                <span>Book a Session</span>
              </Link>

              <a
                href="#services"
                className="
                  w-full sm:w-auto inline-flex items-center justify-center gap-1.5
                  bg-white/80 hover:bg-white
                  text-warm-charcoal font-medium text-base
                  px-6 py-3 rounded-full border border-dusty-peach/60
                  transition-all duration-200
                "
              >
                <span>Learn More</span>
                <ArrowDown className="w-4 h-4 text-muted-brown" />
              </a>
            </div>

            {/* Location Pill */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-muted-brown">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-soft-terracotta" />
                Home visits across Indore
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-muted-sage" />
                Sanitized & Baby-Safe
              </span>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              <div 
                className="absolute -inset-3 bg-gradient-to-tr from-dusty-peach/30 to-muted-sage/20 rounded-[2.5rem] transform -rotate-1"
                aria-hidden="true"
              />

              <div className="relative rounded-[2rem] overflow-hidden shadow-md border-4 border-white aspect-[4/5] bg-dusty-peach/20">
                <img
                  src="https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=900&q=80"
                  alt="Gentle newborn baby massage session in Indore"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </div>

              {/* Floating Reassurance Badge */}
              <div className="
                absolute -bottom-3 -left-3 sm:-left-5
                bg-white/95 backdrop-blur-sm
                py-2 px-3.5 rounded-2xl
                shadow-md border border-dusty-peach/40
                flex items-center gap-2.5
              ">
                <div className="w-7 h-7 rounded-full bg-muted-sage/20 flex items-center justify-center text-muted-sage-dark">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-warm-charcoal">
                    Baby-Led Touch
                  </p>
                  <p className="text-[11px] text-muted-brown">
                    Zero harsh pressure
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
