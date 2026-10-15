import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { babyMassageDetails } from '../data/servicesData';

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted-sage/15 text-muted-sage-dark text-xs font-semibold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Service</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-warm-charcoal">
            Gentle Baby Massage
          </h2>
          <p className="mt-2.5 text-muted-brown text-sm sm:text-base leading-relaxed">
            Unhurried at-home visits across Indore, adapted to each developmental milestone.
          </p>
        </div>

        {/* 3 Milestone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {babyMassageDetails.pillars.map((pillar, index) => (
            <motion.article
              key={pillar.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="
                group bg-white rounded-3xl overflow-hidden
                border border-dusty-peach/30 shadow-xs hover:shadow-md
                transition-all duration-300 ease-out
                hover:-translate-y-1 flex flex-col justify-between
              "
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-dusty-peach/20">
                  <img
                    src={pillar.image}
                    alt={pillar.alt}
                    className="
                      w-full h-full object-cover object-center
                      transition-transform duration-500 ease-out
                      group-hover:scale-105
                    "
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="
                      inline-block bg-white/95 backdrop-blur-xs
                      text-warm-charcoal text-xs font-semibold
                      px-3 py-1 rounded-full shadow-xs
                    ">
                      {pillar.focus}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-xl text-warm-charcoal mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-brown leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0">
                <Link
                  to="/book"
                  className="
                    w-full flex items-center justify-center gap-1.5
                    bg-warm-ivory hover:bg-soft-terracotta
                    text-warm-charcoal hover:text-white
                    text-xs font-semibold py-2.5 rounded-full
                    border border-dusty-peach/60 hover:border-transparent
                    transition-all duration-200
                  "
                >
                  <span>Book for this stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
