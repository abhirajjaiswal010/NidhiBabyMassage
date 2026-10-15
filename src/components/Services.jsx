import React from 'react';
import { motion } from 'framer-motion';
import { babyMassageDetails } from '../data/servicesData';

export default function Services() {
  const cards = [
    // Column 1: Top (Tall), Bottom (Short)
    {
      id: 'milestone-1',
      focus: 'Newborns & Infants',
      badgeStyle: 'bg-[#FFDDDD]/80 backdrop-blur-md text-[#3A2822] shadow-xs',
      image: '/baby/baby%20(1).jpg',
      alt: 'Gentle soothing newborn baby massage',
    },
    {
      id: 'milestone-2',
      focus: 'Colic & Gas Relief',
      badgeStyle: 'bg-[#FFE8C4]/80 backdrop-blur-md text-[#3A2822] shadow-xs',
      image: '/baby/baby%20(2).jpg',
      alt: 'Gentle baby tummy comfort and relaxation',
    },
    // Column 2: Top (Short), Bottom (Tall)
    {
      id: 'milestone-3',
      focus: 'Calm & Deep Sleep',
      badgeStyle: 'bg-[#FFE8C4]/80 backdrop-blur-md text-[#3A2822] shadow-xs',
      image: '/baby/middle.jpg',
      alt: 'Swaddled peaceful baby massage rest',
    },
    {
      id: 'milestone-4',
      focus: '3 to 12 Months',
      badgeStyle: 'bg-[#FFCED8]/80 backdrop-blur-md text-[#3A2822] shadow-xs',
      image: '/baby/baby%20(3).jpg',
      alt: 'Baby flexibility and motor growth session',
    },
  ];

  return (
    <section id="services" className="py-12 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <h2 className="font-huglove text-3xl sm:text-5xl lg:text-6xl tracking-wide">
            <span className="text-warm-charcoal">Gentle </span>
            <span className="text-soft-terracotta">Baby Massage</span>
          </h2>
          <p className="mt-2 text-muted-brown text-xs sm:text-sm md:text-base leading-relaxed">
            Unhurried at-home visits across Indore, adapted to each developmental milestone.
          </p>
        </div>

        {/* Interlocking 2-Column Mosaic Cards (Matching Reference Diagram) */}
        <div className="max-w-2xl sm:max-w-3xl mx-auto grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          
          {/* Left Column: [Tall Card] over [Short Card] */}
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
            {/* 1. Left Tall Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="
                group relative rounded-2xl sm:rounded-3xl overflow-hidden
                aspect-[3/3.8] sm:aspect-[3/3.6]
                shadow-xs hover:shadow-lg
                transition-all duration-300 ease-out hover:-translate-y-1 bg-dusty-peach/20
              "
            >
              <img
                src={cards[0].image}
                alt={cards[0].alt}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Subtle bottom vignette */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 via-black/5 to-transparent pointer-events-none" aria-hidden="true" />
              {/* Frosted Blur Badge at Below within Card */}
              <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-10">
                <span className={`inline-block text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full ${cards[0].badgeStyle}`}>
                  {cards[0].focus}
                </span>
              </div>
            </motion.div>

            {/* 2. Left Short Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="
                group relative rounded-2xl sm:rounded-3xl overflow-hidden
                aspect-[4/2.5] sm:aspect-[4/2.4]
                shadow-xs hover:shadow-lg
                transition-all duration-300 ease-out hover:-translate-y-1 bg-dusty-peach/20
              "
            >
              <img
                src={cards[1].image}
                alt={cards[1].alt}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Subtle bottom vignette */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 via-black/5 to-transparent pointer-events-none" aria-hidden="true" />
              {/* Frosted Blur Badge at Below within Card */}
              <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-10">
                <span className={`inline-block text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full ${cards[1].badgeStyle}`}>
                  {cards[1].focus}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: [Short Card] over [Tall Card] */}
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
            {/* 3. Right Short Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="
                group relative rounded-2xl sm:rounded-3xl overflow-hidden
                aspect-[4/2.5] sm:aspect-[4/2.4]
                shadow-xs hover:shadow-lg
                transition-all duration-300 ease-out hover:-translate-y-1 bg-dusty-peach/20
              "
            >
              <img
                src={cards[2].image}
                alt={cards[2].alt}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Subtle bottom vignette */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 via-black/5 to-transparent pointer-events-none" aria-hidden="true" />
              {/* Frosted Blur Badge at Below within Card */}
              <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-10">
                <span className={`inline-block text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full ${cards[2].badgeStyle}`}>
                  {cards[2].focus}
                </span>
              </div>
            </motion.div>

            {/* 4. Right Tall Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="
                group relative rounded-2xl sm:rounded-3xl overflow-hidden
                aspect-[3/3.8] sm:aspect-[3/3.6]
                shadow-xs hover:shadow-lg
                transition-all duration-300 ease-out hover:-translate-y-1 bg-dusty-peach/20
              "
            >
              <img
                src={cards[3].image}
                alt={cards[3].alt}
                className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Subtle bottom vignette */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 via-black/5 to-transparent pointer-events-none" aria-hidden="true" />
              {/* Frosted Blur Badge at Below within Card */}
              <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-10">
                <span className={`inline-block text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full ${cards[3].badgeStyle}`}>
                  {cards[3].focus}
                </span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
