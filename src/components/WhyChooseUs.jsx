import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Clock, Baby } from 'lucide-react';

export default function WhyChooseUs() {
  const points = [
    {
      icon: Baby,
      title: 'Baby-Led, Never Forced',
      bgStyle: 'bg-[#FFDDDD]/80 backdrop-blur-md text-[#3A2822]',
    },
    {
      icon: ShieldCheck,
      title: 'Strict Hygiene',
      bgStyle: 'bg-[#FFE8C4]/80 backdrop-blur-md text-[#3A2822]',
    },
    {
      icon: Heart,
      title: 'Comfort of Your Home',
      bgStyle: 'bg-[#FFE8C4]/80 backdrop-blur-md text-[#3A2822]',
    },
    {
      icon: Clock,
      title: 'Calm, Respectful Pace',
      bgStyle: 'bg-[#FFCED8]/80 backdrop-blur-md text-[#3A2822]',
    },
  ];

  return (
    <section id="why-us" className="py-14 md:py-20 bg-warm-ivory/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Head Above the Image (Centered) */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <h2 className="font-huglove text-3xl sm:text-5xl lg:text-6xl text-warm-charcoal leading-tight tracking-wide">
            <span className="block text-warm-charcoal">Nurturing touch,</span>
            <span className="block text-soft-terracotta mt-1 sm:mt-1.5">always baby-first.</span>
          </h2>
        </div>

        {/* Centerpiece Image (Previous Size: aspect-[4/5] max-w-md / max-w-lg) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative mx-auto max-w-md sm:max-w-lg rounded-3xl overflow-hidden aspect-[4/5] bg-dusty-peach/15 shadow-md group"
        >
          {/* Main Background Image */}
          <img
            src="/baby/baby5.jpeg"
            alt="Nurturing gentle baby massage touch in Indore"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Smooth bottom vignette overlay for text clarity */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/60 via-black/25 to-transparent pointer-events-none" aria-hidden="true" />

          {/* All Points at Below Within the Image with UI Color BG Blur Transparent Effect */}
          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-5 z-10 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              {points.map((pt, idx) => {
                const Icon = pt.icon;
                return (
                  <div
                    key={idx}
                    className={`
                      ${pt.bgStyle} shadow-xs
                      px-2.5 sm:px-3 py-2 rounded-2xl
                      flex items-center gap-2
                      hover:scale-[1.02] transition-transform duration-200
                    `}
                  >
                    <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center flex-shrink-0 text-current">
                      <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold leading-tight line-clamp-1">
                      {pt.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
