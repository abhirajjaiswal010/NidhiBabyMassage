import React from 'react';

export default function BookingSteps() {
  const steps = [
    {
      number: '01',
      title: 'Get in Touch',
      description: 'Send a quick enquiry with your baby’s age and your locality in Indore.',
    },
    {
      number: '02',
      title: 'Match Baby’s Routine',
      description: 'We agree on a calm time window that fits your baby’s nap and feeding schedule.',
    },
    {
      number: '03',
      title: 'Gentle Home Visit',
      description: 'Nidhi arrives at your home for an unhurried, hygienic, baby-led session.',
    },
  ];

  return (
    <section id="how-it-works" className="hidden md:block py-16 md:py-24 bg-warm-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-muted-sage-dark font-semibold block mb-2">
            Simple Process
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-warm-charcoal">
            How booking works
          </h2>
          <p className="mt-2 text-muted-brown text-sm sm:text-base leading-relaxed">
            Planning a session around your baby is easy and flexible.
          </p>
        </div>

        {/* 3-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="
                bg-white rounded-3xl p-6 sm:p-7 border border-dusty-peach/30 shadow-xs
                flex flex-col justify-between
              "
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl text-dusty-peach-dark font-bold">
                  {step.number}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-muted-sage-dark font-semibold px-2.5 py-0.5 bg-muted-sage/15 rounded-full">
                  Step {idx + 1}
                </span>
              </div>

              <div>
                <h3 className="font-poppins text-base sm:text-lg font-semibold text-warm-charcoal mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-brown leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
