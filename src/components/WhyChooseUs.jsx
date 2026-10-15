import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Clock, Baby } from 'lucide-react';

export default function WhyChooseUs() {
  const points = [
    {
      icon: Baby,
      title: 'Baby-Led, Never Forced',
      description: 'Zero harsh force or pushing through tears. We respect baby’s cues.',
    },
    {
      icon: ShieldCheck,
      title: 'Strict Hygiene',
      description: 'Sanitized hands, clean towels, and gentle natural baby oils.',
    },
    {
      icon: Heart,
      title: 'Comfort of Your Home',
      description: 'Unhurried doorstep visits across Indore. Zero travel stress.',
    },
    {
      icon: Clock,
      title: 'Calm, Respectful Pace',
      description: 'We pause whenever baby needs feeding, burping, or soothing.',
    },
  ];

  return (
    <section id="why-us" className="py-16 md:py-24 bg-white/70 border-y border-dusty-peach/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div 
                className="absolute -inset-3 bg-gradient-to-br from-muted-sage/20 to-dusty-peach/30 rounded-3xl transform rotate-1"
                aria-hidden="true"
              />
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/5] bg-dusty-peach/10">
                <img
                  src="https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80"
                  alt="Gentle touch and comfort for newborn in Indore"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="absolute -bottom-4 -right-3 bg-white py-2.5 px-3.5 rounded-2xl shadow-md border border-dusty-peach/40">
                <p className="font-serif text-xs font-semibold text-warm-charcoal">
                  Gentle hands, happy baby.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Points */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-muted-sage-dark font-semibold block mb-1.5">
                Our Approach
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-warm-charcoal leading-snug">
                Nurturing touch that puts your baby first.
              </h2>
              <p className="mt-2 text-sm text-muted-brown leading-relaxed">
                We avoid outdated, aggressive massage traditions. Every session is gentle, unhurried, and calming.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {points.map((pt, idx) => {
                const Icon = pt.icon;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="w-8 h-8 rounded-lg bg-dusty-peach/30 flex items-center justify-center text-soft-terracotta mb-2">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif text-base text-warm-charcoal font-medium">
                      {pt.title}
                    </h3>
                    <p className="text-xs text-muted-brown leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
