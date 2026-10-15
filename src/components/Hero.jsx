import React, { useState } from 'react';
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
  // Multiple curated images representing authentic baby massage care
  const heroImages = [
    {
      id: 'main',
      src: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=900&q=80',
      alt: 'Gentle baby massage in the comfort of home in Indore',
      tag: 'Gentle Massage',
    },
    {
      id: 'feet',
      src: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80',
      alt: 'Tender baby feet reflexology and soothing touch',
      tag: 'Tiny Soles',
    },
    {
      id: 'sleep',
      src: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=600&q=80',
      alt: 'Newborn peacefully sleeping after soothing massage',
      tag: 'Deep Sleep',
    },
  ];

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28">
      
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
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

            {/* Action Buttons with Smooth Tactile Interaction */}
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

          {/* Right Column: Multi-Image Collage with Moving Baby SVGs */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-sm my-6 sm:my-8">
              
              {/* Floating Sleeping Moon SVG (Background Top Right) */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute -top-12 right-0 sm:-right-4 z-0 opacity-75 pointer-events-none"
                aria-hidden="true"
              >
                <SleepingMoonSvg className="w-14 h-14" />
              </motion.div>

              {/* Floating Baby Rattle SVG (Top Left) */}
              <motion.div
                animate={{ y: [0, -9, 0], rotate: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="
                  absolute -top-6 -left-4 sm:-left-6 z-30
                  bg-white/95 backdrop-blur-sm p-2 rounded-2xl
                  shadow-md border border-dusty-peach/40
                "
                aria-label="Baby rattle icon"
              >
                <BabyRattleSvg className="w-7 h-7 sm:w-8 sm:h-8" />
              </motion.div>

              {/* Soft Peach Organic Backdrop Shape */}
              <div 
                className="absolute -inset-3 bg-gradient-to-tr from-dusty-peach/35 via-blush-pink/25 to-muted-sage/20 rounded-[2.5rem] transform -rotate-1"
                aria-hidden="true"
              />

              {/* 1. Main Hero Image (Central & Moving Smoothly) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
                className="relative rounded-[2rem] overflow-hidden shadow-lg border-4 border-white aspect-[4/5] bg-dusty-peach/20 z-10"
              >
                <img
                  src={heroImages[0].src}
                  alt={heroImages[0].alt}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
              </motion.div>

              {/* 2. Secondary Floating Image (Top Right - Peaceful Sleep) */}
              <motion.div
                animate={{ y: [0, 8, 0], rotate: [2, -2, 2] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.4 }}
                className="
                  absolute -top-8 -right-6 sm:-right-10 z-20
                  w-28 h-28 sm:w-36 sm:h-36 rounded-2xl sm:rounded-3xl
                  overflow-hidden shadow-xl border-3 border-white
                  bg-white group
                "
              >
                <img
                  src={heroImages[2].src}
                  alt={heroImages[2].alt}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-charcoal/60 via-transparent to-transparent flex items-end p-2 sm:p-2.5">
                  <span className="text-[10px] sm:text-xs text-white font-medium drop-shadow-xs">
                    Peaceful Sleep
                  </span>
                </div>
              </motion.div>

              {/* 3. Third Floating Image (Bottom Left - Tiny Feet Touch) */}
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.8 }}
                className="
                  absolute -bottom-8 -left-6 sm:-left-10 z-20
                  w-28 h-28 sm:w-36 sm:h-36 rounded-2xl sm:rounded-3xl
                  overflow-hidden shadow-xl border-3 border-white
                  bg-white group
                "
              >
                <img
                  src={heroImages[1].src}
                  alt={heroImages[1].alt}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-charcoal/60 via-transparent to-transparent flex items-end p-2 sm:p-2.5">
                  <span className="text-[10px] sm:text-xs text-white font-medium drop-shadow-xs">
                    Gentle Touch
                  </span>
                </div>
              </motion.div>

              {/* Floating Baby Pacifier SVG (Bottom Right) */}
              <motion.div
                animate={{ y: [0, 7, 0], rotate: [5, -5, 5] }}
                transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.6 }}
                className="
                  absolute -bottom-5 right-2 sm:right-4 z-30
                  bg-white/95 backdrop-blur-sm p-2 rounded-2xl
                  shadow-md border border-dusty-peach/40
                "
                aria-label="Baby pacifier icon"
              >
                <BabyPacifierSvg className="w-7 h-7 sm:w-8 sm:h-8" />
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
