import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, Smile, Sun } from 'lucide-react';
import { BabyRattleSvg, BabyPacifierSvg, BabyFootprintSvg } from './common/SvgDecorations';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-0 md:pt-36 lg:pt-40 bg-warm-ivory">
      
      {/* 1. Warm Golden Arch & Ambient Sun Glow (matching reference) */}
      <div 
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] sm:w-[1000px] sm:h-[480px] bg-gradient-to-b from-[#F3C8B5]/50 via-[#F8DDD0]/30 to-transparent rounded-b-full pointer-events-none -z-10 blur-xl"
        aria-hidden="true"
      />

      {/* 2. Subtle Floor Perspective Grid (matching reference) */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(185, 111, 88, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(185, 111, 88, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to bottom, transparent 10%, black 60%, transparent 95%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 10%, black 60%, transparent 95%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        
        {/* 3. Centered Social Proof Pill with Hand-Drawn Sunbeam Rays */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex flex-col items-center mb-5"
        >
          {/* Hand-drawn rays SVG */}
          <svg width="28" height="14" viewBox="0 0 28 14" fill="none" className="mb-1 text-warm-charcoal/70" aria-hidden="true">
            <path d="M14 1V5M6 4L9 8M22 4L19 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>

          {/* Avatar stack + Social text */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-dusty-peach/40 shadow-xs">
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=120&q=80"
                alt="Indore parent"
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=120&q=80"
                alt="Indore parent"
              />
              <img
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=120&q=80"
                alt="Indore parent"
              />
            </div>
            <span className="text-xs font-medium text-warm-charcoal">
              Loved by 100+ Indore parents
            </span>
          </div>
        </motion.div>

        {/* 4. Main Heading with Playful Hand-Drawn Doodles (Left & Right) */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Doodle 1: Sparkle / Star on the left */}
          <motion.div 
            animate={{ rotate: [-8, 8, -8], scale: [0.95, 1.05, 0.95] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-4 -left-2 sm:-left-10 text-warm-charcoal/60 pointer-events-none hidden sm:block"
            aria-hidden="true"
          >
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <path d="M19 2L21 15L34 19L21 23L19 36L17 23L4 19L17 15L19 2Z" fill="#F3C8B5" stroke="#34342F" strokeWidth="2" strokeLinejoin="round"/>
              <circle cx="8" cy="8" r="2" fill="#B96F58" />
              <circle cx="30" cy="30" r="1.5" fill="#9EAD96" />
            </svg>
          </motion.div>

          {/* Doodle 2: Curly Swirl / Loop on the right */}
          <motion.div 
            animate={{ y: [0, -6, 0], rotate: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
            className="absolute -top-3 -right-2 sm:-right-10 text-warm-charcoal/60 pointer-events-none hidden sm:block"
            aria-hidden="true"
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M8 28C8 28 14 34 22 28C30 22 26 12 18 12C10 12 8 20 16 22C24 24 28 16 28 8" stroke="#34342F" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
            </svg>
          </motion.div>

          {/* The Main Headline in Huglove */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-huglove text-4xl sm:text-6xl lg:text-7xl tracking-wide leading-[1.2] text-warm-charcoal px-2"
          >
            <span className="text-warm-charcoal">Gentle care </span>
            <br className="hidden sm:inline" />
            <span className="text-soft-terracotta">for your little one</span>
          </motion.h1>

        </div>

        {/* 5. Subtitle in Poppins */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-poppins text-sm sm:text-base text-muted-brown max-w-xl mx-auto mt-4 leading-relaxed"
        >
          Our unhurried at-home baby massage sessions in Indore provide the soothing touch 
          and calm to help your baby sleep peacefully and stay content.
        </motion.p>

        {/* 6. Centered Dual Pill Buttons (matching reference) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mt-7"
        >
          {/* Primary Dark Pill Button */}
          <Link
            to="/book"
            className="
              inline-flex items-center gap-2
              bg-warm-charcoal hover:bg-black
              text-white font-poppins font-medium text-xs sm:text-sm
              px-7 py-3 rounded-full shadow-md hover:shadow-lg
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
              px-6 py-3 rounded-full border border-dusty-peach/70 shadow-xs hover:shadow-sm
              transition-all duration-200 active:scale-95
            "
          >
            <span>Learn More</span>
          </a>
        </motion.div>

        {/* 7. Signature 3 Protruding Arched Cards (matching reference layout!) */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto relative">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 items-end justify-center px-4">
            
            {/* Card 1: Left Card (Sky Blue Theme, Tilted slightly) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="
                group relative bg-[#BAE6FD] rounded-[2.5rem] rounded-b-2xl p-4 sm:p-5
                border-3 border-warm-charcoal shadow-lg
                transform sm:-rotate-3 hover:rotate-0 transition-transform duration-300
                overflow-hidden text-left flex flex-col justify-between h-72 sm:h-80
              "
            >
              {/* Decorative Sun Icon & Pill */}
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-warm-charcoal text-[11px] font-poppins font-semibold shadow-xs">
                  <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                  <span>Morning Calm</span>
                </span>
                <span className="w-3 h-3 rounded-full bg-amber-400 border border-warm-charcoal"></span>
              </div>

              {/* Photo inside Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-warm-charcoal shadow-xs aspect-[4/3] bg-white">
                <img
                  src="https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=600&q=80"
                  alt="Gentle baby massage morning routine"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Bottom Card Title */}
              <div className="pt-2">
                <h3 className="font-huglove text-2xl text-warm-charcoal leading-none">
                  Soothe & Settle
                </h3>
                <p className="font-poppins text-[11px] text-warm-charcoal/80 mt-1">
                  Gentle pressure strictly guided by baby's comfort.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Center Card (Prominent, Blush Pink Theme, Taller) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="
                group relative bg-[#FBCFE8] rounded-[3rem] rounded-b-2xl p-5 sm:p-6
                border-3 border-warm-charcoal shadow-xl
                z-20 sm:-translate-y-4 hover:-translate-y-6 transition-transform duration-300
                overflow-hidden text-left flex flex-col justify-between h-84 sm:h-96
              "
            >
              {/* Top Tag & Footprint */}
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-warm-charcoal text-xs font-poppins font-semibold shadow-xs">
                  <Heart className="w-3.5 h-3.5 text-soft-terracotta fill-soft-terracotta" />
                  <span>At-Home Indore</span>
                </span>
                <BabyFootprintSvg className="w-5 h-5 text-soft-terracotta" />
              </div>

              {/* Photo inside Center Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-warm-charcoal shadow-sm aspect-[4/3] bg-white my-auto">
                <img
                  src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=700&q=80"
                  alt="Baby resting peacefully during massage"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Bottom Card Text */}
              <div className="pt-2">
                <h3 className="font-huglove text-3xl text-warm-charcoal leading-none">
                  Gentle Touch
                </h3>
                <p className="font-poppins text-xs text-warm-charcoal/85 mt-1">
                  Nidhi visits your doorstep across Indore. Zero travel stress.
                </p>
              </div>
            </motion.div>

            {/* Card 3: Right Card (Warm Apricot / Honey Theme, Tilted right) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="
                group relative bg-[#FED7AA] rounded-[2.5rem] rounded-b-2xl p-4 sm:p-5
                border-3 border-warm-charcoal shadow-lg
                transform sm:rotate-3 hover:rotate-0 transition-transform duration-300
                overflow-hidden text-left flex flex-col justify-between h-72 sm:h-80
              "
            >
              {/* Decorative Rattle & Tag */}
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-warm-charcoal text-[11px] font-poppins font-semibold shadow-xs">
                  <Smile className="w-3.5 h-3.5 text-soft-terracotta" />
                  <span>Deep Rest</span>
                </span>
                <BabyRattleSvg className="w-6 h-6 text-soft-terracotta" />
              </div>

              {/* Photo inside Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-warm-charcoal shadow-xs aspect-[4/3] bg-white">
                <img
                  src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80"
                  alt="Baby tiny feet soothing touch"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Bottom Card Title */}
              <div className="pt-2">
                <h3 className="font-huglove text-2xl text-warm-charcoal leading-none">
                  Peaceful Sleep
                </h3>
                <p className="font-poppins text-[11px] text-warm-charcoal/80 mt-1">
                  Supporting restful sleep cycles & colic comfort.
                </p>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
