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

// Cute, gentle Baby Rattle SVG
export function BabyRattleSvg({ className = 'w-10 h-10' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="18" r="12" fill="#F3C8B5" stroke="#B96F58" strokeWidth="2.5" />
      <path d="M18 18C18 15 20.5 12.5 23.5 12.5" stroke="#B96F58" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="18" r="4" fill="#9EAD96" />
      <rect x="22" y="30" width="4" height="10" rx="2" fill="#B96F58" />
      <circle cx="24" cy="42" r="3.5" fill="#FFF9F2" stroke="#B96F58" strokeWidth="2" />
    </svg>
  );
}

// Cute, tender Baby Pacifier / Soother SVG
export function BabyPacifierSvg({ className = 'w-10 h-10' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <ellipse cx="24" cy="22" rx="14" ry="9" fill="#F8DDD0" stroke="#B96F58" strokeWidth="2.5" />
      <circle cx="24" cy="22" r="4.5" fill="#9EAD96" />
      <path d="M24 13C24 9.5 22 7 24 7C26 7 24 9.5 24 13Z" fill="#F3C8B5" />
      <path d="M19 28C19 33 29 33 29 28" stroke="#B96F58" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Gentle Sleeping Moon & Baby Star SVG
export function SleepingMoonSvg({ className = 'w-10 h-10' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M28 8C19 8 12 15 12 24C12 33 19 40 28 40C32.5 40 36.5 38 39.5 35C31 35 25 28 25 19.5C25 14.5 27.5 10 31.5 8C30.3 8 29.2 8 28 8Z"
        fill="#F3C8B5"
        stroke="#B96F58"
        strokeWidth="2"
      />
      {/* Sleeping closed eye */}
      <path d="M19 23C20.5 25 23.5 25 25 23" stroke="#77736C" strokeWidth="2" strokeLinecap="round" />
      {/* Little baby star */}
      <path
        d="M36 14L37 17L40 17.5L37.5 19.5L38.5 22.5L36 21L33.5 22.5L34.5 19.5L32 17.5L35 17L36 14Z"
        fill="#9EAD96"
      />
    </svg>
  );
}
