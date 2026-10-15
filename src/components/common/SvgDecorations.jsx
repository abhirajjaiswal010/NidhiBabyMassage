import React from 'react';

// Delicate, baby-friendly SVG elements and organic section dividers
export function WaveDivider({ flip = false, className = '' }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`} aria-hidden="true">
      <svg
        className={`relative block w-full h-8 sm:h-12 text-warm-ivory ${flip ? 'rotate-180' : ''}`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 C150,90 400,100 600,45 C800,-10 1050,75 1200,20 L1200,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function SoftLeafSvg({ className = 'w-6 h-6 text-muted-sage/60' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-11 5 4-2 8-1 10 0z" />
    </svg>
  );
}

export function TenderHeartSvg({ className = 'w-5 h-5 text-soft-terracotta/50' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function BabyFootprintSvg({ className = 'w-6 h-6 text-dusty-peach-dark/40' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <ellipse cx="14" cy="15" rx="5" ry="6" />
      <circle cx="9" cy="7" r="1.5" />
      <circle cx="12" cy="5.5" r="1.5" />
      <circle cx="15" cy="5.5" r="1.5" />
      <circle cx="18" cy="7" r="1.3" />
      <circle cx="20" cy="9.5" r="1.1" />
    </svg>
  );
}
