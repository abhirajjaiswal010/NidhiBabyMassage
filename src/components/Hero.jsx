import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, Smile, Sun } from 'lucide-react';
import { BabyRattleSvg, BabyPacifierSvg, BabyFootprintSvg } from './common/SvgDecorations';

export default function Hero() {
  return (
    <section className="relative overflow-x-clip min-h-screen flex flex-col justify-between pt-14 sm:pt-16 lg:pt-18 pb-2 sm:pb-4 bg-gradient-to-b from-[#FFCED8]/50 via-[#FFDDDD]/30 via-[#FFFBF4] to-[#FFE8C4]/25">
      
      {/* 1. Radiant Ambient Glow merging Navbar down into Hero */}
      <div 
        className="absolute -top-12 sm:-top-16 left-1/2 -translate-x-1/2 w-[850px] h-[450px] sm:w-[1250px] sm:h-[580px] bg-gradient-to-b from-[#FFCED8] via-[#FFDDDD]/85 via-[#FFE8C4]/50 to-transparent rounded-b-full pointer-events-none -z-10 blur-3xl opacity-90"
        aria-hidden="true"
      />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[300px] sm:w-[780px] sm:h-[380px] bg-gradient-to-b from-[#FFCED8] via-[#FFDDDD]/70 to-transparent rounded-full pointer-events-none -z-10 blur-2xl opacity-75"
        aria-hidden="true"
      />

      {/* 2. Subtle Floor Perspective Grid (matching reference) */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 opacity-35"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(31, 27, 26, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(31, 27, 26, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
          maskImage: 'linear-gradient(to bottom, transparent 5%, black 50%, transparent 95%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 5%, black 50%, transparent 95%)',
        }}
        aria-hidden="true"
      />

      {/* Main Top Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative flex-1 flex flex-col justify-center pt-2 sm:pt-4">
        
        {/* 3. Centered Social Proof Pill with Hand-Drawn Sunbeam Rays */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex flex-col items-center mb-2 sm:mb-3"
        >
          {/* Hand-drawn rays SVG */}
          <svg width="24" height="12" viewBox="0 0 28 14" fill="none" className="mb-0.5 text-warm-charcoal/70" aria-hidden="true">
            <path d="M14 1V5M6 4L9 8M22 4L19 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>

          {/* Avatar stack + Social text */}
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/95 backdrop-blur-sm border border-[#FFCED8]/60 shadow-xs">
            <div className="flex -space-x-1.5 overflow-hidden">
              <img
                className="inline-block h-5 w-5 sm:h-5.5 sm:w-5.5 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=120&q=80"
                alt="Indore parent"
              />
              <img
                className="inline-block h-5 w-5 sm:h-5.5 sm:w-5.5 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=120&q=80"
                alt="Indore parent"
              />
              <img
                className="inline-block h-5 w-5 sm:h-5.5 sm:w-5.5 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=120&q=80"
                alt="Indore parent"
              />
            </div>
            <span className="text-[11px] sm:text-xs font-semibold text-warm-charcoal">
              Loved by 100+ Indore parents
            </span>
          </div>
        </motion.div>

        {/* 4. Main Heading with Playful Hand-Drawn Doodles (Left & Right) */}
        <div className="relative max-w-3xl mx-auto">
          
          {/* Doodle 1: Sparkle / Star on the left */}
          <motion.div 
            animate={{ rotate: [-6, 6, -6], scale: [0.95, 1.05, 0.95] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-3 -left-3 sm:-left-8 text-warm-charcoal/60 pointer-events-none hidden sm:block"
            aria-hidden="true"
          >
            <svg width="32" height="32" viewBox="0 0 38 38" fill="none">
              <path d="M19 2L21 15L34 19L21 23L19 36L17 23L4 19L17 15L19 2Z" fill="#FFCED8" stroke="#1F1B1A" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="8" cy="8" r="2" fill="#C45B72" />
              <circle cx="30" cy="30" r="1.5" fill="#FFE8C4" />
            </svg>
          </motion.div>

          {/* Doodle 2: Curly Swirl / Loop on the right */}
          <motion.div 
            animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute -top-2 -right-3 sm:-right-8 text-warm-charcoal/60 pointer-events-none hidden sm:block"
            aria-hidden="true"
          >
            <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
              <path d="M8 28C8 28 14 34 22 28C30 22 26 12 18 12C10 12 8 20 16 22C24 24 28 16 28 8" stroke="#1F1B1A" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
            </svg>
          </motion.div>

          {/* The Main Headline in Huglove */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-huglove text-3xl sm:text-5xl lg:text-6xl tracking-wide leading-[1.12] text-warm-charcoal px-2"
          >
            <span className="text-warm-charcoal">Gentle care </span>
            <br className="hidden sm:inline" />
            <span className="text-warm-charcoal">for your </span>
            <span className="relative inline-block text-soft-terracotta">
              little one
              {/* User Underline SVG */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 1576 141"
                className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-auto text-[#D96B82] pointer-events-none"
                aria-hidden="true"
              >
                <path 
                  d="M153.58 20.56c54.61 7.77 11.57 2.06 114.89 15.59 13.33 1.74 90.26 10.48 91.36 10.58 134.57 12.96 190.69 18.5 388.54 25.15 129.22 1.29 93.08 1.1 154.55.57 81.39-.71 59.62-.04 125.55-4.57 63.95-4.4 45.79-3.03 63.95-4.82 122.74-12.1 74.45-6.7 196.81-22.16.11-.01 87.68-12.88 144.71-23.82l59.43-11.39c1.85-.35 3.34 1.62 4.26 2.89 5.62 7.81 7.57 23.36 5.18 27.51 24.07-1.73 36.84-3.04 53.78-2.26 2.94.14 5.88.72 8.79 1.14 7.63 2.7 13.25 29.31 8.37 33.57a11.5 11.5 0 0 1-6.34 3.04 61.01 61.01 0 0 1-21.5 10.23c-4.78 1.12-7.26 1.09-26.8 2.32-26.15 1.64-20.08 2.59-70.36 10.41-124.17 19.35-260.96 36.26-386.48 42.12-203.77 9.49-418.63-.99-621.76-19.77C188.84 102.05 36.15 75.18 30.07 74.7a10.51 10.51 0 0 1-4.75-1.64c-1.91-1.23-3.06-3.52-4.14-5.42-5.56-9.8-6.47-22.79-4.73-27.16-2.45-1.29-4.88-2.65-7.33-3.91C4.2 34.06-2.72 12.7 1.11 4.47c.85-1.32 1.61-2.4 2.71-3.52C4.57.19 5.83 0 6.95 0c7.42 0 128.62 17.94 146.63 20.56Z" 
                  fill="currentColor"
                />
              </svg>
            </span>
          </motion.h1>

        </div>

        {/* 5. Concise & Clear Subtitle in Poppins */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-poppins text-xs sm:text-sm md:text-base text-muted-brown max-w-md mx-auto mt-2 sm:mt-2.5 leading-relaxed font-normal"
        >
          Gentle at-home baby massage in Indore for peaceful sleep and calm comfort.
        </motion.p>

        {/* 6. Centered Dual Pill Buttons (matching reference) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-4 sm:mt-5"
        >
          {/* Primary Button: #FFDDDD, hover darker #F2AEBA */}
          <Link
            to="/book"
            className="
              inline-flex items-center justify-center
              bg-[#FFDDDD] hover:bg-[#F2AEBA] hover:brightness-95
              text-[#4A352F] font-poppins font-semibold text-xs sm:text-sm
              px-6 py-2.5 sm:px-7 sm:py-3 rounded-full border border-[#F2AEBA] shadow-xs hover:shadow-md
              transition-all duration-200 active:scale-95
            "
          >
            <span>Book a Session</span>
          </Link>

          {/* Secondary Button: #FFE8C4, hover darker #F5CE96 */}
          <a
            href="#services"
            className="
              inline-flex items-center justify-center
              bg-[#FFE8C4] hover:bg-[#F5CE96] hover:brightness-95
              text-[#4A352F] font-poppins font-semibold text-xs sm:text-sm
              px-5 py-2.5 sm:px-6 sm:py-3 rounded-full shadow-xs hover:shadow-sm
              transition-all duration-200 active:scale-95
            "
          >
            <span>Learn More</span>
          </a>
        </motion.div>

      </div>

      {/* 7. Signature 5 Cards - Fully Visible at Bottom, All Corners Rounded, Identical Size & Positions */}
      <div className="mt-auto pt-6 sm:pt-8 md:pt-10 pb-8 sm:pb-12 lg:pb-16 w-full flex items-end justify-center -space-x-10 sm:-space-x-16 md:-space-x-20 lg:-space-x-24 px-4 relative">
        
        {/* Card 1: Far Left Card (Identical Size & Position, Fully Visible at Bottom) */}
        <div
          className="
            relative
            rounded-2xl sm:rounded-3xl
            overflow-hidden
            shadow-lg z-0
            w-40 sm:w-52 md:w-60 lg:w-68 xl:w-72
            h-56 sm:h-68 md:h-78 lg:h-88 xl:h-96
            origin-bottom-center
            -rotate-6 sm:-rotate-8
            translate-y-10 sm:translate-y-14
          "
        >
          {/* Replaceable image: Card 1 */}
          <img
            src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80"
            alt="Gentle baby feet soothing massage"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card 2: Inner Left Card (Identical Size & Position, Fully Visible at Bottom) */}
        <div
          className="
            relative
            rounded-2xl sm:rounded-3xl
            overflow-hidden
            shadow-xl z-10
            w-40 sm:w-52 md:w-60 lg:w-68 xl:w-72
            h-56 sm:h-68 md:h-78 lg:h-88 xl:h-96
            origin-bottom-center
            -rotate-3 sm:-rotate-4
            translate-y-5 sm:translate-y-7
          "
        >
          {/* Replaceable image: Card 2 */}
          <img
            src="https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80"
            alt="Gentle soothing baby massage"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card 3: Center Card (Identical Size & Position, Fully Visible at Bottom) */}
        <div
          className="
            relative
            rounded-2xl sm:rounded-3xl
            overflow-hidden
            shadow-2xl z-20
            w-40 sm:w-52 md:w-60 lg:w-68 xl:w-72
            h-56 sm:h-68 md:h-78 lg:h-88 xl:h-96
            origin-bottom-center
            rotate-0
            translate-y-0
          "
        >
          {/* Replaceable image: Card 3 (Center) */}
          <img
            src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80"
            alt="Baby resting peacefully during home massage"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card 4: Inner Right Card (Identical Size & Position, Fully Visible at Bottom) */}
        <div
          className="
            relative
            rounded-2xl sm:rounded-3xl
            overflow-hidden
            shadow-xl z-10
            w-40 sm:w-52 md:w-60 lg:w-68 xl:w-72
            h-56 sm:h-68 md:h-78 lg:h-88 xl:h-96
            origin-bottom-center
            rotate-3 sm:rotate-4
            translate-y-5 sm:translate-y-7
          "
        >
          {/* Replaceable image: Card 4 */}
          <img
            src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80"
            alt="Baby gentle peaceful touch"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card 5: Far Right Card (Identical Size & Position, Fully Visible at Bottom) */}
        <div
          className="
            relative
            rounded-2xl sm:rounded-3xl
            overflow-hidden
            shadow-lg z-0
            w-40 sm:w-52 md:w-60 lg:w-68 xl:w-72
            h-56 sm:h-68 md:h-78 lg:h-88 xl:h-96
            origin-bottom-center
            rotate-6 sm:rotate-8
            translate-y-10 sm:translate-y-14
          "
        >
          {/* Replaceable image: Card 5 */}
          <img
            src="https://images.unsplash.com/photo-1505377059067-e285a7bac49b?auto=format&fit=crop&w=800&q=80"
            alt="Baby resting peacefully in deep sleep"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}
