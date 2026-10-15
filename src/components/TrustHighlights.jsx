import React from 'react';
import { HeartHandshake, Smile, MapPin, Sparkles } from 'lucide-react';

export default function TrustHighlights() {
  const highlights = [
    {
      icon: Smile,
      title: 'Baby-Led Care',
      description: 'Care tailored strictly to baby’s comfort & daily cues.',
    },
    {
      icon: Sparkles,
      title: 'Zero Forced Pressure',
      description: 'No harsh pressure or crying. Calm, rhythmic touch.',
    },
    {
      icon: MapPin,
      title: 'Indore Home Visits',
      description: 'Hygienic visits at your doorstep in Indore.',
    },
    {
      icon: HeartHandshake,
      title: 'Unhurried Pace',
      description: 'We pause anytime for nursing, cuddles, or rest.',
    },
  ];

  return (
    <section className="border-y border-dusty-peach/30 bg-white/60 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-3 p-1.5">
                <div className="w-8 h-8 rounded-lg bg-dusty-peach/30 flex items-center justify-center shrink-0 text-soft-terracotta">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-semibold text-warm-charcoal">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-brown mt-0.5 leading-tight">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
