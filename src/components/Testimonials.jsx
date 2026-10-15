import React from 'react';
import { Quote, Heart } from 'lucide-react';
import { testimonialsData } from '../data/testimonialsData';

export default function Testimonials() {
  const currentYear = new Date().getFullYear();
  const yearsOfCare = currentYear - 2016;

  return (
    <section className="hidden md:block py-20 md:py-28 bg-white/70 border-y border-dusty-peach/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with 2016 to Till Stat in Numbers */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFE8C4]/80 text-[#3A2822] text-xs font-semibold mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-soft-terracotta" />
            <span>2016 – {currentYear} • {yearsOfCare}+ Years of Trusted Care</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-warm-charcoal">
            Kind words from families.
          </h2>
          <p className="mt-3.5 text-muted-brown text-base leading-relaxed">
            Parents across Indore share their experience with Nidhi's unhurried, gentle care.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item, idx) => (
            <div
              key={idx}
              className="
                bg-warm-ivory/80 rounded-2xl sm:rounded-3xl p-5 sm:p-8
                border border-dusty-peach/30 shadow-xs
                flex flex-col justify-between
                hover:-translate-y-1 transition-transform duration-200
              "
            >
              <div>
                <Quote className="w-8 h-8 text-dusty-peach-dark mb-4 opacity-75" />
                <p className="text-sm text-warm-charcoal/90 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-dusty-peach/30 flex items-center justify-between">
                <div>
                  <h4 className="font-poppins font-semibold text-warm-charcoal text-sm sm:text-base">
                    {item.parent}
                  </h4>
                  <p className="text-xs text-muted-brown mt-0.5">
                    {item.area} • <span className="text-soft-terracotta">{item.babyAge}</span>
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-dusty-peach/40 flex items-center justify-center text-soft-terracotta">
                  <Heart className="w-4 h-4 fill-soft-terracotta" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Reassuring note */}
        <p className="text-center text-xs text-muted-brown mt-10">
          * Feedback shared with consent from parents residing in Indore. Individual baby experiences vary.
        </p>

      </div>
    </section>
  );
}
