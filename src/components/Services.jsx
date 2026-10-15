import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Check } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { createServiceWhatsAppUrl } from '../utils/whatsapp';

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <span className="text-xs uppercase tracking-widest text-muted-sage-dark font-semibold block mb-2">
            Our Offerings in Indore
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-warm-charcoal">
            Thoughtful care, made personal.
          </h2>
          <p className="mt-3.5 text-muted-brown text-base leading-relaxed">
            Every baby has their own unique rhythm. Our sessions are unhurried, gentle, 
            and designed around your baby’s comfort and sleep routine.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="
                group bg-white rounded-3xl overflow-hidden
                border border-dusty-peach/30 shadow-xs hover:shadow-md
                transition-all duration-300 ease-out
                hover:-translate-y-1.5 flex flex-col justify-between
              "
            >
              <div>
                {/* Image Container with Subtle Zoom on Hover */}
                <div className="relative h-56 w-full overflow-hidden bg-dusty-peach/20">
                  <img
                    src={service.image}
                    alt={service.alt}
                    className="
                      w-full h-full object-cover object-center
                      transition-transform duration-500 ease-out
                      group-hover:scale-105
                    "
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="
                      inline-block bg-white/95 backdrop-blur-xs
                      text-warm-charcoal text-xs font-semibold
                      px-3 py-1 rounded-full shadow-xs
                    ">
                      {service.tag}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7">
                  <h3 className="font-serif text-2xl text-warm-charcoal mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs font-medium text-soft-terracotta mb-3">
                    {service.subtitle}
                  </p>
                  <p className="text-sm text-muted-brown leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Highlights / Benefits */}
                  <ul className="space-y-2.5 pt-2 border-t border-dusty-peach/20">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-warm-charcoal/90">
                        <span className="w-4 h-4 rounded-full bg-muted-sage/20 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-muted-sage-dark" />
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-6 pb-6 pt-0">
                <a
                  href={createServiceWhatsAppUrl(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    w-full flex items-center justify-center gap-2
                    bg-warm-ivory hover:bg-soft-terracotta
                    text-warm-charcoal hover:text-white
                    border border-dusty-peach/60 hover:border-transparent
                    text-sm font-medium py-3 rounded-full
                    transition-all duration-200
                  "
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
