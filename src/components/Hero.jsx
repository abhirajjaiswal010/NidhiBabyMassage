import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, Smile, Sun } from 'lucide-react';
import { BabyRattleSvg, BabyPacifierSvg, BabyFootprintSvg } from './common/SvgDecorations';

export default function Hero() {
  return (
    <section className="relative overflow-x-clip min-h-screen flex flex-col justify-between pt-14 sm:pt-16 lg:pt-18 pb-2 sm:pb-4 bg-warm-ivory">
      
      {/* 1. Warm Golden Arch & Ambient Sun Glow (matching reference) */}
      <div 
        className="absolute -top-28 sm:-top-32 left-1/2 -translate-x-1/2 w-[700px] h-[340px] sm:w-[950px] sm:h-[440px] bg-gradient-to-b from-[#F3C8B5]/50 via-[#F8DDD0]/30 to-transparent rounded-b-full pointer-events-none -z-10 blur-xl"
        aria-hidden="true"
      />

      {/* 2. Subtle Floor Perspective Grid (matching reference) */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 opacity-35"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(185, 111, 88, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(185, 111, 88, 0.08) 1px, transparent 1px)
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
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/90 backdrop-blur-sm border border-dusty-peach/40 shadow-xs">
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
            <span className="text-[11px] sm:text-xs font-medium text-warm-charcoal">
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
              <path d="M19 2L21 15L34 19L21 23L19 36L17 23L4 19L17 15L19 2Z" fill="#F3C8B5" stroke="#34342F" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="8" cy="8" r="2" fill="#B96F58" />
              <circle cx="30" cy="30" r="1.5" fill="#9EAD96" />
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
              <path d="M8 28C8 28 14 34 22 28C30 22 26 12 18 12C10 12 8 20 16 22C24 24 28 16 28 8" stroke="#34342F" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
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
            <span className="text-soft-terracotta">for your little one</span>
          </motion.h1>

        </div>

        {/* 5. Subtitle in Poppins */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-poppins text-xs sm:text-sm md:text-base text-muted-brown max-w-lg mx-auto mt-2 sm:mt-2.5 leading-relaxed"
        >
          Our unhurried at-home baby massage sessions in Indore provide the soothing touch 
          and calm to help your baby sleep peacefully and stay content.
        </motion.p>

        {/* 6. Centered Dual Pill Buttons (matching reference) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-4 sm:mt-5"
        >
          {/* Primary Dark Pill Button */}
          <Link
            to="/book"
            className="
              inline-flex items-center gap-2
              bg-warm-charcoal hover:bg-black
              text-white font-poppins font-medium text-xs sm:text-sm
              px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full shadow-md hover:shadow-lg
              transition-all duration-200 active:scale-95
            "
          >
            <span>Book a Session</span>
            <span className="text-dusty-peach">✦</span>
          </Link>

          {/* Secondary White Pill Button */}
          <a
            href="#services"
            className="
              inline-flex items-center gap-1.5
              bg-white hover:bg-warm-ivory
              text-warm-charcoal font-poppins font-medium text-xs sm:text-sm
              px-5 py-2.5 sm:px-5.5 sm:py-2.5 rounded-full border border-dusty-peach/70 shadow-xs hover:shadow-sm
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
            h-50 sm:h-62 md:h-72 lg:h-80 xl:h-86
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
            h-50 sm:h-62 md:h-72 lg:h-80 xl:h-86
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
            h-50 sm:h-62 md:h-72 lg:h-80 xl:h-86
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
            h-50 sm:h-62 md:h-72 lg:h-80 xl:h-86
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
            h-50 sm:h-62 md:h-72 lg:h-80 xl:h-86
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
