import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, Sparkles, MapPin } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/whatsapp';

export default function AboutNidhi() {
  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-dusty-peach/30 shadow-sm relative">

          {/* Subtle Corner Decoration */}
          <div
            className="absolute top-0 right-0 w-48 h-48 bg-dusty-peach/15 rounded-bl-full pointer-events-none -z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">

            {/* Left: Nidhi's Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="md:col-span-5 flex justify-center"
            >
              <div className="relative">
                {/* Decorative Circular Backdrop */}
                <div
                  className="w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-dusty-peach/40 absolute -top-3 -left-3 -z-10"
                  aria-hidden="true"
                />

                {/* Photo Frame */}
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-white shadow-md bg-warm-ivory">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                    alt="Nidhi - Baby Massage Specialist in Indore"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>

                {/* Location Badge */}
                <div className="absolute bottom-2 right-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-dusty-peach/40 flex items-center gap-1.5 text-xs font-medium text-warm-charcoal">
                  <MapPin className="w-3.5 h-3.5 text-soft-terracotta" />
                  <span>Based in Indore</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Personal Bio & Care Statement */}
            <div className="md:col-span-7 space-y-4 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-sage-dark font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Meet Your Practitioner</span>
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl text-warm-charcoal">
                Hello, I’m Nidhi.
              </h2>

              <p className="text-sm sm:text-base text-muted-brown leading-relaxed">
                As a baby care practitioner and mother based in Indore, I believe that every touch given
                to a newborn should communicate safety, gentleness, and peace.
              </p>

              <p className="text-sm sm:text-base text-muted-brown leading-relaxed">
                I work closely with parents to create a calming home ritual. I never use aggressive force,
                and I always respect the baby’s cues—pausing for feeding, cuddles, or quiet moments whenever needed.
              </p>

              {/* Guiding Principles */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-warm-charcoal font-medium">
                <span className="flex items-center gap-1.5 bg-warm-ivory px-3 py-1.5 rounded-full border border-dusty-peach/30">
                  <Heart className="w-3.5 h-3.5 text-soft-terracotta fill-soft-terracotta/20" />
                  Baby-Led Comfort
                </span>
                <span className="flex items-center gap-1.5 bg-warm-ivory px-3 py-1.5 rounded-full border border-dusty-peach/30">
                  <Heart className="w-3.5 h-3.5 text-soft-terracotta fill-soft-terracotta/20" />
                  Hygienic Home Visits
                </span>
                <span className="flex items-center gap-1.5 bg-warm-ivory px-3 py-1.5 rounded-full border border-dusty-peach/30">
                  <Heart className="w-3.5 h-3.5 text-soft-terracotta fill-soft-terracotta/20" />
                  Parent Coaching
                </span>
              </div>

              {/* Action Button */}
              <div className="pt-4 flex justify-center md:justify-start">
                <a
                  href={createWhatsAppUrl("Hello Nidhi, I read your profile on the website and would love to consult with you about gentle baby massage in Indore.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-2
                    bg-soft-terracotta hover:bg-soft-terracotta-hover
                    text-white text-sm font-medium
                    px-6 py-3 rounded-full
                    shadow-sm hover:shadow-md
                    transition-all duration-200
                  "
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect with Nidhi on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
