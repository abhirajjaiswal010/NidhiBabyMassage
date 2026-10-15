import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, Smile, Sun } from 'lucide-react';
import { BabyRattleSvg, BabyPacifierSvg, BabyFootprintSvg } from './common/SvgDecorations';

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen lg:h-screen lg:max-h-[960px] flex flex-col justify-between pt-16 sm:pt-20 lg:pt-22 pb-0 bg-warm-ivory">
      
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

      {/* 7. Signature 3 Long Overlapping Arched Cards (matching reference image) */}
      <div className="mt-auto w-full flex items-end justify-center -space-x-7 sm:-space-x-12 md:-space-x-14 lg:-space-x-16 px-4 pt-4 overflow-hidden relative">
        
        {/* Card 1: Left Card (Cyan / Sky Blue, Long Arch, Behind Center) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="
            group relative bg-[#38BDF8]
            rounded-t-[2.75rem] sm:rounded-t-[3.75rem] lg:rounded-t-[4.5rem] rounded-b-none
            border-[2.5px] sm:border-3 border-warm-charcoal border-b-0
            shadow-xl z-10
            w-40 sm:w-56 md:w-64 lg:w-72
            h-60 sm:h-72 md:h-80 lg:h-[360px]
            p-2 sm:p-3 pb-0
            flex flex-col justify-between
            hover:-translate-y-2 transition-transform duration-300
          "
        >
          {/* Top Arch: Playful Smiling Sun & Confetti Doodles (matching reference) */}
          <div className="flex items-center justify-center pt-1 sm:pt-2">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="w-9 h-9 sm:w-11 sm:h-11">
              {/* Confetti dots */}
              <circle cx="8" cy="14" r="2" fill="#F472B6" />
              <circle cx="36" cy="12" r="1.5" fill="#C084FC" />
              <circle cx="10" cy="30" r="1.5" fill="#34D399" />
              {/* Smiling sun face */}
              <circle cx="22" cy="22" r="12" fill="#FDE047" stroke="#34342F" strokeWidth="2.2" />
              <circle cx="18" cy="20" r="1.4" fill="#34342F" />
              <circle cx="26" cy="20" r="1.4" fill="#34342F" />
              <path d="M18 24C19.5 26.5 24.5 26.5 26 24" stroke="#34342F" strokeWidth="2" strokeLinecap="round" />
              <circle cx="15.5" cy="23" r="1.3" fill="#F472B6" />
              <circle cx="28.5" cy="23" r="1.3" fill="#F472B6" />
              {/* Sun rays */}
              <path d="M22 4V7M22 37V40M4 22H7M37 22H40M9 9L11.5 11.5M32.5 32.5L35 35M9 35L11.5 32.5M32.5 11.5L35 9" stroke="#34342F" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Lower Arch: Pure Baby Massage Visual (No Text) */}
          <div className="relative rounded-t-[2rem] sm:rounded-t-[2.8rem] border-2 border-warm-charcoal border-b-0 overflow-hidden w-full h-[72%] sm:h-[75%] bg-white shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=700&q=80"
              alt="Gentle soothing baby massage"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>

        {/* Card 2: Center Card (Blush Pink, Longest Arch, In Front Overlapping) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="
            group relative bg-[#F472B6]
            rounded-t-[3.25rem] sm:rounded-t-[4.5rem] lg:rounded-t-[5.5rem] rounded-b-none
            border-[2.5px] sm:border-3 border-warm-charcoal border-b-0
            shadow-2xl z-20
            w-46 sm:w-64 md:w-72 lg:w-80
            h-68 sm:h-84 md:h-92 lg:h-[420px]
            p-2.5 sm:p-3.5 pb-0
            flex flex-col justify-between
            hover:-translate-y-3 transition-transform duration-300
          "
        >
          {/* Top Arch: Cartoon Peace/Gentle Hand & Flowers (matching reference) */}
          <div className="flex items-center justify-center pt-1.5 sm:pt-2.5">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="w-10 h-10 sm:w-12 sm:h-12">
              {/* Cartoon hand */}
              <path d="M19 36V22C19 20.5 20.5 19 22 19C23.5 19 25 20.5 25 22V29M25 22C25 20.5 26.5 19 28 19C29.5 19 31 20.5 31 22V30M31 25C31 23.5 32.5 22.5 34 22.5C35.5 22.5 37 23.5 37 25V33C37 39 33 43 27 43C21 43 17 39 17 33V27C17 25.5 18.5 24 20 24" fill="#FFFFFF" stroke="#34342F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              {/* Cute flower beside hand */}
              <circle cx="10" cy="16" r="3.5" fill="#FDE047" stroke="#34342F" strokeWidth="1.8" />
              <circle cx="10" cy="10" r="3" fill="#A7F3D0" stroke="#34342F" strokeWidth="1.8" />
              <circle cx="10" cy="22" r="3" fill="#A7F3D0" stroke="#34342F" strokeWidth="1.8" />
              <circle cx="4" cy="16" r="3" fill="#A7F3D0" stroke="#34342F" strokeWidth="1.8" />
              <circle cx="16" cy="16" r="3" fill="#A7F3D0" stroke="#34342F" strokeWidth="1.8" />
              {/* Golden sparkles */}
              <path d="M38 10L39 13L42 14L39 15L38 18L37 15L34 14L37 13L38 10Z" fill="#FDE047" stroke="#34342F" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Lower Arch: Pure Loving Care Visual (No Text) */}
          <div className="relative rounded-t-[2.5rem] sm:rounded-t-[3.4rem] border-2 border-warm-charcoal border-b-0 overflow-hidden w-full h-[74%] sm:h-[78%] bg-white shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80"
              alt="Baby resting peacefully during home massage"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>

        {/* Card 3: Right Card (Warm Coral Orange, Long Arch, Behind Center) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="
            group relative bg-[#FB923C]
            rounded-t-[2.75rem] sm:rounded-t-[3.75rem] lg:rounded-t-[4.5rem] rounded-b-none
            border-[2.5px] sm:border-3 border-warm-charcoal border-b-0
            shadow-xl z-10
            w-40 sm:w-56 md:w-64 lg:w-72
            h-60 sm:h-72 md:h-80 lg:h-[360px]
            p-2 sm:p-3 pb-0
            flex flex-col justify-between
            hover:-translate-y-2 transition-transform duration-300
          "
        >
          {/* Top Arch: Cartoon Sunflower & Star Doodles (matching reference) */}
          <div className="flex items-center justify-center pt-1 sm:pt-2">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="w-9 h-9 sm:w-11 sm:h-11">
              {/* Petals */}
              <circle cx="22" cy="11" r="3.5" fill="#FDE047" stroke="#34342F" strokeWidth="1.8" />
              <circle cx="22" cy="33" r="3.5" fill="#FDE047" stroke="#34342F" strokeWidth="1.8" />
              <circle cx="11" cy="22" r="3.5" fill="#FDE047" stroke="#34342F" strokeWidth="1.8" />
              <circle cx="33" cy="22" r="3.5" fill="#FDE047" stroke="#34342F" strokeWidth="1.8" />
              <circle cx="14" cy="14" r="3.5" fill="#FDE047" stroke="#34342F" strokeWidth="1.8" />
              <circle cx="30" cy="30" r="3.5" fill="#FDE047" stroke="#34342F" strokeWidth="1.8" />
              <circle cx="14" cy="30" r="3.5" fill="#FDE047" stroke="#34342F" strokeWidth="1.8" />
              <circle cx="30" cy="14" r="3.5" fill="#FDE047" stroke="#34342F" strokeWidth="1.8" />
              {/* Face center */}
              <circle cx="22" cy="22" r="9" fill="#6EE7B7" stroke="#34342F" strokeWidth="2.2" />
              <circle cx="19" cy="20.5" r="1.3" fill="#34342F" />
              <circle cx="25" cy="20.5" r="1.3" fill="#34342F" />
              <path d="M19 24.5C20.5 26.5 23.5 26.5 25 24.5" stroke="#34342F" strokeWidth="1.8" strokeLinecap="round" />
              {/* Blue Star Doodle */}
              <path d="M37 6L38.2 9.5L42 10.5L38.2 11.8L37 15L35.8 11.8L32 10.5L35.8 9.5L37 6Z" fill="#38BDF8" stroke="#34342F" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Lower Arch: Pure Deep Sleep Visual (No Text) */}
          <div className="relative rounded-t-[2rem] sm:rounded-t-[2.8rem] border-2 border-warm-charcoal border-b-0 overflow-hidden w-full h-[72%] sm:h-[75%] bg-white shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=700&q=80"
              alt="Baby resting peacefully in deep sleep"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
