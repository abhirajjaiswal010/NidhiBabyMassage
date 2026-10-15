import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TenderHeartSvg } from './common/SvgDecorations';

export default function MomentsGallery() {

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white/60 relative overflow-hidden">
      
      {/* Background Subtle SVG Accent */}
      <div className="absolute top-10 right-10 opacity-30 pointer-events-none" aria-hidden="true">
        <TenderHeartSvg className="w-24 h-24 text-dusty-peach" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <h2 className="font-huglove text-3xl sm:text-5xl lg:text-6xl tracking-wide">
            <span className="text-warm-charcoal">Moments of </span>
            <span className="text-soft-terracotta">Calm & Care</span>
          </h2>
          <p className="mt-2 text-muted-brown text-xs sm:text-sm md:text-base leading-relaxed">
            Every movement is gentle, soothing, and tailored with deep affection for your baby.
          </p>
        </div>

        {/* Centerpiece: Enlarged Baby Elephant with Floating Heart Badges */}
        <div className="relative my-6 sm:my-10 max-w-4xl mx-auto flex flex-col items-center justify-center">
          
          {/* Subtle soft warm glowing ambient aura */}
          <div className="absolute inset-0 bg-dusty-peach/25 rounded-full blur-3xl scale-90 pointer-events-none -z-10" aria-hidden="true" />

          {/* Elephant Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="relative flex items-center justify-center p-2 sm:p-4"
          >
            <img
              src="/baby/elephant-with-baby.png"
              alt="Moments of calm and care baby massage"
              className="w-72 h-72 sm:w-96 sm:h-96 md:w-[460px] md:h-[460px] lg:w-[500px] lg:h-[500px] object-contain drop-shadow-md hover:scale-105 transition-transform duration-500 ease-out"
            />

            {/* Desktop Floating Badges (positioned organically around the elephant) */}
            {/* Top-Left: Calm & Soothe */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="hidden md:flex absolute top-12 left-4 lg:left-0 z-10"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 backdrop-blur-md shadow-xs text-warm-charcoal text-xs sm:text-sm font-medium hover:-translate-y-0.5 transition-transform">
                <span className="w-6 h-6 rounded-full bg-[#FFDDDD] flex items-center justify-center text-soft-terracotta">
                  ♥
                </span>
                <span>Calm & Soothe</span>
              </div>
            </motion.div>

            {/* Bottom-Left: Tummy Comfort */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="hidden md:flex absolute bottom-20 left-6 lg:left-2 z-10"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 backdrop-blur-md shadow-xs text-warm-charcoal text-xs sm:text-sm font-medium hover:-translate-y-0.5 transition-transform">
                <span className="w-6 h-6 rounded-full bg-[#FFE8C4] flex items-center justify-center text-[#3A2822]">
                  ♥
                </span>
                <span>Tummy Comfort</span>
              </div>
            </motion.div>

            {/* Top-Right: Deep Rest */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="hidden md:flex absolute top-20 right-6 lg:right-2 z-10"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 backdrop-blur-md shadow-xs text-warm-charcoal text-xs sm:text-sm font-medium hover:-translate-y-0.5 transition-transform">
                <span className="w-6 h-6 rounded-full bg-[#FFE8C4] flex items-center justify-center text-[#3A2822]">
                  ♥
                </span>
                <span>Deep Rest</span>
              </div>
            </motion.div>

            {/* Bottom-Right: Parent Bonding */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="hidden md:flex absolute bottom-16 right-4 lg:right-0 z-10"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 backdrop-blur-md shadow-xs text-warm-charcoal text-xs sm:text-sm font-medium hover:-translate-y-0.5 transition-transform">
                <span className="w-6 h-6 rounded-full bg-[#FFCED8] flex items-center justify-center text-soft-terracotta">
                  ♥
                </span>
                <span>Parent Bonding</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile / Small Screens Floating Tags Grid (neatly wrapped below elephant) */}
          <div className="flex md:hidden flex-wrap items-center justify-center gap-2.5 mt-2 px-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-xs text-warm-charcoal text-xs font-medium">
              <span className="text-soft-terracotta text-xs">♥</span>
              <span>Calm & Soothe</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-xs text-warm-charcoal text-xs font-medium">
              <span className="text-[#B96F58] text-xs">♥</span>
              <span>Tummy Comfort</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-xs text-warm-charcoal text-xs font-medium">
              <span className="text-[#B96F58] text-xs">♥</span>
              <span>Deep Rest</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-xs text-warm-charcoal text-xs font-medium">
              <span className="text-soft-terracotta text-xs">♥</span>
              <span>Parent Bonding</span>
            </span>
          </div>

        </div>

        {/* Bottom Call to Action */}
        <div className="mt-6 sm:mt-8 text-center">
          <Link
            to="/book"
            className="
              inline-flex items-center justify-center
              bg-[#FFDDDD] hover:bg-[#F2AEBA] hover:brightness-95
              text-[#4A352F] text-xs sm:text-sm font-semibold
              px-7 sm:px-8 py-3 rounded-full shadow-xs hover:shadow-md
              transition-all duration-200 active:scale-95
            "
          >
            <span>Book a Session for Your Baby</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
