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

      {/* 7. Signature 3 Protruding Arched Cards (matching reference layout!) */}
      <div className="mt-auto pt-3 sm:pt-4 max-w-5xl mx-auto w-full px-2 sm:px-4 relative">
        
        <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 items-end justify-center">
          
          {/* Card 1: Left Card (Sky Blue Theme, Tilted slightly) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="
              group relative bg-[#BAE6FD] rounded-[1.75rem] sm:rounded-[2.5rem] rounded-b-none sm:rounded-b-2xl p-2.5 sm:p-4
              border-2 sm:border-3 border-warm-charcoal shadow-md
              transform -rotate-1 sm:-rotate-3 hover:rotate-0 transition-transform duration-300
              overflow-hidden text-left flex flex-col justify-between h-48 sm:h-60 lg:h-64 xl:h-70
            "
          >
            {/* Decorative Sun Icon & Pill */}
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white text-warm-charcoal text-[9px] sm:text-[11px] font-poppins font-semibold shadow-xs">
                <Sun className="w-3 h-3 text-amber-500 fill-amber-400" />
                <span className="hidden xs:inline">Morning Calm</span>
                <span className="xs:hidden">Calm</span>
              </span>
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-400 border border-warm-charcoal"></span>
            </div>

            {/* Photo inside Card */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border sm:border-2 border-warm-charcoal shadow-xs aspect-[4/3] bg-white my-auto">
              <img
                src="https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=600&q=80"
                alt="Gentle baby massage morning routine"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Bottom Card Title */}
            <div className="pt-1 sm:pt-2">
              <h3 className="font-huglove text-base sm:text-xl lg:text-2xl text-warm-charcoal leading-none truncate">
                Soothe & Settle
              </h3>
              <p className="font-poppins text-[9px] sm:text-[11px] text-warm-charcoal/80 mt-0.5 line-clamp-1 sm:line-clamp-2">
                Gentle pressure guided by baby's comfort.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Center Card (Prominent, Blush Pink Theme, Taller) */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="
              group relative bg-[#FBCFE8] rounded-[2rem] sm:rounded-[3rem] rounded-b-none sm:rounded-b-2xl p-3 sm:p-5
              border-2 sm:border-3 border-warm-charcoal shadow-xl
              z-20 -translate-y-1 sm:-translate-y-2 hover:-translate-y-4 transition-transform duration-300
              overflow-hidden text-left flex flex-col justify-between h-56 sm:h-68 lg:h-74 xl:h-80
            "
          >
            {/* Top Tag & Footprint */}
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white text-warm-charcoal text-[10px] sm:text-xs font-poppins font-semibold shadow-xs">
                <Heart className="w-3 h-3 text-soft-terracotta fill-soft-terracotta" />
                <span>At-Home Indore</span>
              </span>
              <BabyFootprintSvg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-soft-terracotta" />
            </div>

            {/* Photo inside Center Card */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border sm:border-2 border-warm-charcoal shadow-sm aspect-[4/3] bg-white my-auto">
              <img
                src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=700&q=80"
                alt="Baby resting peacefully during massage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Bottom Card Text */}
            <div className="pt-1 sm:pt-2">
              <h3 className="font-huglove text-lg sm:text-2xl lg:text-3xl text-warm-charcoal leading-none truncate">
                Gentle Touch
              </h3>
              <p className="font-poppins text-[10px] sm:text-xs text-warm-charcoal/85 mt-0.5 line-clamp-1 sm:line-clamp-2">
                Nidhi visits your doorstep across Indore. Zero travel stress.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Right Card (Warm Apricot / Honey Theme, Tilted right) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="
              group relative bg-[#FED7AA] rounded-[1.75rem] sm:rounded-[2.5rem] rounded-b-none sm:rounded-b-2xl p-2.5 sm:p-4
              border-2 sm:border-3 border-warm-charcoal shadow-md
              transform rotate-1 sm:rotate-3 hover:rotate-0 transition-transform duration-300
              overflow-hidden text-left flex flex-col justify-between h-48 sm:h-60 lg:h-64 xl:h-70
            "
          >
            {/* Decorative Rattle & Tag */}
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white text-warm-charcoal text-[9px] sm:text-[11px] font-poppins font-semibold shadow-xs">
                <Smile className="w-3 h-3 text-soft-terracotta" />
                <span className="hidden xs:inline">Deep Rest</span>
                <span className="xs:hidden">Rest</span>
              </span>
              <BabyRattleSvg className="w-4 h-4 sm:w-5 sm:h-5 text-soft-terracotta" />
            </div>

            {/* Photo inside Card */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border sm:border-2 border-warm-charcoal shadow-xs aspect-[4/3] bg-white my-auto">
              <img
                src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80"
                alt="Baby tiny feet soothing touch"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Bottom Card Title */}
            <div className="pt-1 sm:pt-2">
              <h3 className="font-huglove text-base sm:text-xl lg:text-2xl text-warm-charcoal leading-none truncate">
                Peaceful Sleep
              </h3>
              <p className="font-poppins text-[9px] sm:text-[11px] text-warm-charcoal/80 mt-0.5 line-clamp-1 sm:line-clamp-2">
                Supporting restful sleep cycles & colic comfort.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
