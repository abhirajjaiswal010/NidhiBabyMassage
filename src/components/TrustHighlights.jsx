import { HeartHandshake, Smile, MapPin, ShieldCheck } from 'lucide-react';

export default function TrustHighlights() {
  const highlights = [
    {
      icon: Smile,
      title: 'Baby-Led Care',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Forced Pressure',
    },
    {
      icon: MapPin,
      title: 'Indore Home Visits',
    },
    {
      icon: HeartHandshake,
      title: 'Unhurried Pace',
    },
  ];

  return (
    <section className="relative mt-4 sm:mt-6 mb-5 sm:mb-7 py-5 sm:py-6 bg-gradient-to-r from-transparent via-white/70 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-2.5 sm:gap-3.5 p-1.5 sm:p-2">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-[#FFCED8]/60 flex items-center justify-center shrink-0 text-soft-terracotta shadow-2xs">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="font-poppins text-xs sm:text-sm md:text-base font-semibold text-warm-charcoal leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
