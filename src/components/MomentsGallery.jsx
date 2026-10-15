import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import { TenderHeartSvg } from './common/SvgDecorations';

export default function MomentsGallery() {
  const galleryItems = [
    {
      id: 1,
      title: 'Gentle Back & Spine Rhythm',
      caption: 'Soothing rhythmic strokes that help release daily tension and settle fussy newborns.',
      tag: 'Calm & Soothe',
      image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=800&q=80',
      alt: 'Baby resting during peaceful massage session',
      span: 'md:col-span-2',
    },
    {
      id: 2,
      title: 'Tummy & Digestive Relief',
      caption: 'Gentle clockwise circles aiding natural digestion and relieving uncomfortable gas.',
      tag: 'Tummy Comfort',
      image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
      alt: 'Baby receiving gentle abdominal massage for gas relief',
      span: 'md:col-span-1',
    },
    {
      id: 3,
      title: 'Tiny Feet & Reflexology',
      caption: 'Soft thumb pressure on tiny soles encouraging relaxation before sleep.',
      tag: 'Deep Rest',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
      alt: 'Gentle foot massage for baby comfort',
      span: 'md:col-span-1',
    },
    {
      id: 4,
      title: 'Mother & Baby Connection',
      caption: 'Unhurried sessions where mothers feel reassured, empowered, and fully supported.',
      tag: 'Parent Bonding',
      image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
      alt: 'Mother holding her calm and contented baby',
      span: 'md:col-span-2',
    },
  ];

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white/60 relative overflow-hidden">
      
      {/* Background Subtle SVG Accent */}
      <div className="absolute top-10 right-10 opacity-30 pointer-events-none" aria-hidden="true">
        <TenderHeartSvg className="w-24 h-24 text-dusty-peach" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-huglove text-4xl sm:text-5xl lg:text-6xl tracking-wide">
            <span className="text-warm-charcoal">Moments of </span>
            <span className="text-soft-terracotta">Calm & Care</span>
          </h2>
          <p className="mt-2.5 text-muted-brown text-sm sm:text-base leading-relaxed">
            Every movement is gentle, soothing, and tailored with deep affection for your baby.
          </p>
        </div>

        {/* Gallery Grid with Overlays */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className={`
                group relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11]
                shadow-xs hover:shadow-lg transition-all duration-300
                border border-dusty-peach/30 ${item.span}
              `}
            >
              {/* Image with subtle hover zoom */}
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Tender Gradient Overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-warm-charcoal/85 via-warm-charcoal/25 to-transparent transition-opacity duration-300"
                aria-hidden="true"
              />

              {/* Tag Pill (Top Left) */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-warm-charcoal text-[11px] font-semibold shadow-xs">
                  <Heart className="w-3 h-3 text-soft-terracotta fill-soft-terracotta" />
                  <span>{item.tag}</span>
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 text-white">
                <h3 className="font-serif text-lg sm:text-xl font-medium leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-white/80 mt-1 leading-relaxed line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-10 text-center">
          <Link
            to="/book"
            className="
              inline-flex items-center gap-2
              bg-soft-terracotta hover:bg-soft-terracotta-hover
              text-white text-xs sm:text-sm font-semibold
              px-7 py-3 rounded-full shadow-sm hover:shadow-md
              transition-all duration-200 active:scale-95
            "
          >
            <span>Book a Session for Your Baby</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
