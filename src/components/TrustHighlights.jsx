import React from 'react';
import { HeartHandshake, Smile, MapPin, Sparkles } from 'lucide-react';

export default function TrustHighlights() {
  const highlights = [
    {
      icon: Smile,
      title: 'Gentle Approach',
      description: 'Care tailored strictly to the baby’s comfort & daily cues.',
    },
    {
      icon: HeartHandshake,
      title: 'Parent-Focused',
      description: 'Transparent communication, coaching & unhurried care.',
    },
    {
      icon: MapPin,
      title: 'Indore Local Service',
      description: 'Reliable, hygienic at-home visits across Indore city.',
    },
    {
      icon: Sparkles,
      title: 'Zero Forced Force',
      description: 'No harsh pressure or crying; only soothing, rhythmic touch.',
    },
  ];

  return (
    <section className="border-y border-dusty-peach/30 bg-white/60 backdrop-blur-xs py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3.5 p-2 rounded-xl"
              >
                <div className="w-10 h-10 rounded-xl bg-dusty-peach/30 flex items-center justify-center shrink-0 text-soft-terracotta">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-warm-charcoal">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-brown mt-0.5 leading-relaxed">
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
