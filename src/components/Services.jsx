import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageCircle, Check, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { babyMassageDetails } from '../data/servicesData';
import { createWhatsAppUrl } from '../utils/whatsapp';

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted-sage/15 text-muted-sage-dark text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Service</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-warm-charcoal">
            Pure, gentle baby massage.
          </h2>
          <p className="mt-3.5 text-muted-brown text-base leading-relaxed">
            We don’t dilute our care across multiple commercial services. 
            Our entire practice in Indore is devoted to one single focus: 
            <strong> peaceful, pediatric-safe baby massage at home.</strong>
          </p>
        </div>

        {/* Core Service Spotlight Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-dusty-peach/40 shadow-xs mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase tracking-wider text-soft-terracotta font-semibold">
                Home Visit Service in Indore
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-warm-charcoal">
                {babyMassageDetails.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-brown leading-relaxed">
                {babyMassageDetails.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {babyMassageDetails.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-warm-charcoal/90">
                    <span className="w-4 h-4 rounded-full bg-muted-sage/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-muted-sage-dark" />
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <Link
                  to="/book"
                  className="
                    inline-flex items-center gap-2
                    bg-soft-terracotta hover:bg-soft-terracotta-hover
                    text-white text-sm font-medium
                    px-6 py-3 rounded-full
                    shadow-sm hover:shadow-md
                    transition-all duration-200 active:scale-[0.98]
                  "
                >
                  <span>Book Baby Massage</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={createWhatsAppUrl("Hello Nidhi, I would like to enquire about your at-home baby massage session in Indore.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-2
                    bg-warm-ivory hover:bg-dusty-peach/30
                    text-warm-charcoal text-sm font-medium
                    px-5 py-3 rounded-full
                    border border-dusty-peach/60
                    transition-all duration-200
                  "
                >
                  <MessageCircle className="w-4 h-4 text-soft-terracotta" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Visual */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-dusty-peach/20 shadow-sm border-2 border-white">
                <img
                  src="https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=900&q=80"
                  alt="Gentle baby massage in the comfort of home in Indore"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>

        {/* 3 Developmental Care Focus Areas */}
        <div>
          <h4 className="font-serif text-xl sm:text-2xl text-warm-charcoal text-center mb-8">
            How our massage adapts as your baby grows
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {babyMassageDetails.pillars.map((pillar, index) => (
              <motion.article
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
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
                    <h5 className="font-serif text-xl text-warm-charcoal mb-2">
                      {pillar.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-muted-brown leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <Link
                    to="/book"
                    className="
                      inline-flex items-center gap-1.5 text-xs font-semibold
                      text-soft-terracotta hover:text-soft-terracotta-hover
                      transition-colors
                    "
                  >
                    <span>Request this session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
