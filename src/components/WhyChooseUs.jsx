import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Clock, Baby } from 'lucide-react';

export default function WhyChooseUs() {
  const points = [
    {
      icon: Baby,
      title: 'Baby-Led, Never Forced',
      description:
        'We never impose rigid pressure or push through tears. If baby needs feeding, soothing, or a break, we pause and follow their cues.',
    },
    {
      icon: ShieldCheck,
      title: 'Pediatric Safety & Strict Hygiene',
      description:
        'Hands are thoroughly sanitized, nails kept smooth and trimmed, and only parent-approved, mild organic baby oils are used.',
    },
    {
      icon: Heart,
      title: 'Comfort of Your Own Home',
      description:
        'Newborns settle best in their familiar surroundings. We come to your doorstep across Indore without disruption to baby\'s space.',
    },
    {
      icon: Clock,
      title: 'Unhurried, Respectful Pace',
      description:
        'Unlike rushed traditional massagers, every appointment includes buffer time to answer questions and keep the room calm.',
    },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 bg-white/70 border-y border-dusty-peach/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Warm Lifestyle Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div 
                className="absolute -inset-4 bg-gradient-to-br from-muted-sage/20 via-dusty-peach/30 to-blush-pink/30 rounded-3xl transform rotate-1"
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

              {/* Reassuring floating card */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-white p-4 rounded-2xl shadow-lg border border-dusty-peach/40 max-w-[240px]">
                <p className="font-serif text-sm font-semibold text-warm-charcoal">
                  "Gentle hands, peaceful baby."
                </p>
                <p className="text-[11px] text-muted-brown mt-1">
                  Respecting Indian traditions while following modern pediatric comfort guidelines.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Philosophy & Points */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-muted-sage-dark font-semibold block mb-2">
                Our Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-warm-charcoal leading-snug">
                Nurturing touch that puts your baby's comfort first.
              </h2>
              <p className="mt-3.5 text-base text-muted-brown leading-relaxed">
                Traditional baby massage is a cherished practice, but too often it has been associated 
                with excessive pressure or distressed crying. At Nidhi's Baby Massage, our mission is to 
                restore calm, dignity, and gentle comfort to every visit.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {points.map((pt, idx) => {
                const Icon = pt.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-dusty-peach/30 flex items-center justify-center text-soft-terracotta">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg text-warm-charcoal font-medium">
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
