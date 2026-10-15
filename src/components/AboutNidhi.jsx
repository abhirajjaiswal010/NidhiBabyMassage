import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageCircle, Heart, MapPin } from 'lucide-react';
import { createWhatsAppUrl } from '../utils/whatsapp';

export default function AboutNidhi() {
  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-dusty-peach/30 shadow-xs relative">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left: Nidhi's Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="md:col-span-5 flex justify-center"
            >
              <div className="relative">
                <div 
                  className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-dusty-peach/30 absolute -top-2 -left-2 -z-10"
                  aria-hidden="true"
                />
                
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-white shadow-md bg-warm-ivory">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                    alt="Nidhi - Baby Massage in Indore"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>

                <div className="absolute bottom-1 right-1 bg-white px-3 py-1 rounded-full shadow-xs border border-dusty-peach/40 flex items-center gap-1.5 text-xs font-medium text-warm-charcoal">
                  <MapPin className="w-3.5 h-3.5 text-soft-terracotta" />
                  <span>Indore, MP</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Crisp Bio */}
            <div className="md:col-span-7 space-y-3.5 text-center md:text-left">

              <h2 className="font-huglove text-4xl sm:text-5xl tracking-wide">
                <span className="text-warm-charcoal">Hello, I’m </span>
                <span className="text-soft-terracotta">Nidhi.</span>
              </h2>

              <p className="text-sm text-muted-brown leading-relaxed">
                I specialize in gentle, at-home baby massage for newborns and young infants in Indore. 
                My focus is entirely on your baby's comfort, healthy relaxation, and peaceful rest.
              </p>

              <p className="text-sm text-muted-brown leading-relaxed">
                I never rush sessions or use harsh pressure. If your baby needs feeding, burping, or cuddles, we pause immediately.
              </p>

              <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Link
                  to="/book"
                  className="
                    inline-flex items-center gap-1.5
                    bg-soft-terracotta hover:bg-soft-terracotta-hover
                    text-white text-xs font-semibold
                    px-5 py-2.5 rounded-full shadow-xs
                    transition-all duration-300 ease-out active:scale-95
                  "
                >
                  <span>Book with Nidhi</span>
                </Link>

                <a
                  href={createWhatsAppUrl("Hello Nidhi, I would like to check your availability for an at-home baby massage in Indore.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-1.5
                    bg-warm-ivory hover:bg-dusty-peach/30
                    text-warm-charcoal text-xs font-semibold
                    px-4 py-2.5 rounded-full border border-dusty-peach/60
                    transition-all duration-300 ease-out active:scale-95
                  "
                >
                  <MessageCircle className="w-3.5 h-3.5 text-soft-terracotta" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
