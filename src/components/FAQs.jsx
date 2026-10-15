import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, AlertCircle } from 'lucide-react';
import { faqsData } from '../data/faqsData';

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faqs" className="py-20 md:py-28 bg-warm-ivory">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-muted-sage-dark font-semibold block mb-2">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-warm-charcoal">
            Frequently asked questions.
          </h2>
          <p className="mt-3.5 text-muted-brown text-base leading-relaxed">
            Everything you need to know about our baby massage approach, hygiene, and Indore home visits.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="
                  bg-white rounded-2xl border border-dusty-peach/40 overflow-hidden
                  transition-colors duration-200
                "
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="
                    w-full px-6 py-5 text-left
                    flex items-center justify-between gap-4
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-terracotta
                  "
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg text-warm-charcoal font-medium">
                    {faq.question}
                  </span>
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center shrink-0
                    transition-transform duration-200
                    ${isOpen ? 'bg-dusty-peach/50 rotate-180 text-soft-terracotta' : 'bg-warm-ivory text-muted-brown'}
                  `}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5 pt-1 text-sm text-muted-brown leading-relaxed border-t border-dusty-peach/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Gentle Pediatric Health Notice */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-muted-sage/30 flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 text-muted-sage-dark shrink-0 mt-0.5" />
          <p className="text-xs text-muted-brown leading-relaxed">
            <strong className="font-semibold text-warm-charcoal">Medical Disclaimer:</strong> Baby massage is a nurturing, non-medical wellness and bonding practice. It is not a diagnostic, therapeutic, or medical treatment for illnesses. Always consult your qualified pediatrician for medical advice regarding your baby’s health.
          </p>
        </div>

      </div>
    </section>
  );
}
