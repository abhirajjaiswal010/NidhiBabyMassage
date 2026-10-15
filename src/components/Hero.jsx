import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { 
  SoftLeafSvg, 
  BabyRattleSvg, 
  BabyPacifierSvg, 
  SleepingMoonSvg, 
  BabyFootprintSvg 
} from './common/SvgDecorations';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24">
      
      {/* Background Soft Organic Radial Blobs */}
      <div 
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-dusty-peach/20 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div 
        className="absolute -top-24 right-0 w-[350px] h-[350px] bg-blush-pink/25 rounded-full blur-2xl pointer-events-none -z-10" 
        aria-hidden="true"
      />

      {/* Floating Gentle Background Leaf SVG */}
      <motion.div 
        animate={{ y: [0, -8, 0], rotate: [8, 16, 8] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-28 left-8 sm:left-14 opacity-25 pointer-events-none -z-10 hidden sm:block"
      >
        <SoftLeafSvg className="w-12 h-12 text-muted-sage" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-5 text-center lg:text-left"
          >
            {/* Main Heading in Huglove with Color Combination */}
            <h1 className="font-huglove text-5xl sm:text-6xl lg:text-7xl tracking-wide leading-[1.25]">
              <span className="text-soft-terracotta">Gentle </span>
              <span className="text-warm-charcoal">care </span>
              <br className="hidden sm:inline" />
              <span className="text-muted-sage-dark">for your </span>
              <span className="text-soft-terracotta">little one.</span>
            </h1>

            {/* Light, Crisp Subtitle */}
            <p className="text-base sm:text-lg text-muted-brown max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Unhurried, at-home baby massage in Indore. Tailored strictly to your baby’s comfort, sleep, and feeding rhythm.
            </p>

            {/* Action Buttons with Smooth Interaction */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                to="/book"
                className="
                  w-full sm:w-auto inline-flex items-center justify-center
                  bg-soft-terracotta hover:bg-soft-terracotta-hover
                  text-white font-medium text-base
                  px-8 py-3.5 rounded-full shadow-sm hover:shadow-md
                  transition-all duration-300 ease-out active:scale-95
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
                  px-7 py-3.5 rounded-full border border-dusty-peach/60
                  hover:border-soft-terracotta/40 shadow-xs hover:shadow-sm
                  transition-all duration-300 ease-out active:scale-95
                "
              >
                <span>Explore Massage</span>
                <ArrowDown className="w-4 h-4 text-muted-brown" />
              </a>
            </div>

            {/* Location & Safety Notes */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-muted-brown">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-soft-terracotta" />
                Home visits across Indore
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-muted-sage" />
                Sanitized & Pediatric-Safe
              </span>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual with Smooth Floating Image & Baby SVGs */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Floating Sleeping Moon SVG (Background) */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute -top-10 right-4 z-0 opacity-80"
                aria-hidden="true"
              >
                <SleepingMoonSvg className="w-14 h-14" />
              </motion.div>

              {/* Floating Baby Rattle SVG (Top Left) */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="
                  absolute -top-5 -left-5 sm:-left-6 z-20
                  bg-white/95 backdrop-blur-sm p-2.5 rounded-2xl
                  shadow-md border border-dusty-peach/40
                "
                aria-label="Baby rattle icon"
              >
                <BabyRattleSvg className="w-7 h-7 sm:w-8 sm:h-8" />
              </motion.div>

              {/* Floating Baby Pacifier SVG (Top Right) */}
              <motion.div
                animate={{ y: [0, 8, 0], rotate: [6, -6, 6] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
                className="
                  absolute -top-4 -right-3 sm:-right-5 z-20
                  bg-white/95 backdrop-blur-sm p-2.5 rounded-2xl
                  shadow-md border border-dusty-peach/40
                "
                aria-label="Baby pacifier icon"
              >
                <BabyPacifierSvg className="w-7 h-7 sm:w-8 sm:h-8" />
              </motion.div>

              {/* Soft Peach Organic Backdrop Shape */}
              <div 
                className="absolute -inset-3 bg-gradient-to-tr from-dusty-peach/35 via-blush-pink/25 to-muted-sage/20 rounded-[2.5rem] transform -rotate-1"
                aria-hidden="true"
              />

              {/* Hero Image with Smooth Organic Floating Motion */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                className="relative rounded-[2rem] overflow-hidden shadow-lg border-4 border-white aspect-[4/5] bg-dusty-peach/20"
              >
                <img
                  src="https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=900&q=80"
                  alt="Gentle baby massage in the comfort of home in Indore"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </motion.div>

              {/* Floating Baby-Led Reassurance Card with Footprint SVG (Bottom) */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.8 }}
                className="
                  absolute -bottom-4 -left-3 sm:-left-5 z-20
                  bg-white/95 backdrop-blur-sm
                  py-2 px-3.5 rounded-2xl
                  shadow-md border border-dusty-peach/40
                  flex items-center gap-2.5
                "
              >
                <div className="w-7 h-7 rounded-full bg-dusty-peach/40 flex items-center justify-center text-soft-terracotta shrink-0">
                  <BabyFootprintSvg className="w-4 h-4 text-soft-terracotta" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-warm-charcoal">
                    100% Baby-Led Care
                  </p>
                  <p className="text-[11px] text-muted-brown">
                    Tailored to baby's rhythm
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
