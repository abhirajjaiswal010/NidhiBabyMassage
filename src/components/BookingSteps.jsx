import React from 'react';
import { MessageSquare, CalendarClock, HeartHandshake } from 'lucide-react';


export default function BookingSteps() {
  const steps = [
    {
      number: '01',
      title: 'Get in Touch',
      description:
        'Drop a quick message on WhatsApp or send an enquiry with your locality in Indore and your baby’s age.',
      icon: MessageSquare,
    },
    {
      number: '02',
      title: 'Discuss Baby’s Routine',
      description:
        'We coordinate around your baby’s wake/sleep cycle to find the ideal, calmest time slot for the visit.',
    },
    {
      number: '03',
      title: 'Relaxed Home Visit',
      description:
        'Nidhi visits your Indore home with complete hygiene readiness for an unhurried, gentle, comforting session.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-warm-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-muted-sage-dark font-semibold block mb-2">
            Simple & Transparent
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-warm-charcoal">
            How booking a session works.
          </h2>
          <p className="mt-3.5 text-muted-brown text-base leading-relaxed">
            Planning around a baby shouldn’t be stressful. Here is how we ensure an easy, 
            supportive experience from the first message.
          </p>
        </div>

        {/* 3-Step Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="
                relative bg-white rounded-3xl p-8 border border-dusty-peach/30 shadow-xs
                hover:shadow-sm transition-shadow duration-200
                flex flex-col justify-between
              "
            >
              {/* Step Number Stamp */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-serif text-4xl text-dusty-peach-dark/80 font-bold">
                  {step.number}
                </span>
                <span className="text-xs uppercase tracking-wider text-muted-sage-dark font-semibold px-2.5 py-1 bg-muted-sage/15 rounded-full">
                  Step {idx + 1}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-xl text-warm-charcoal mb-2.5">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-brown leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-dusty-peach/20 text-xs text-soft-terracotta font-medium">
                {idx === 0 && 'Instant WhatsApp connection'}
                {idx === 1 && 'Flexible schedule matching'}
                {idx === 2 && 'Indore doorstep service'}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
