/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-ivory': '#FFFBF4', // Lightened warm cream background
        'palette-cream': '#FFFBF4',
        'palette-apricot': '#FFE8C4',
        'palette-blush': '#FFDDDD',
        'palette-rose': '#FFCED8',
        'muted-sage': {
          DEFAULT: '#889C82',
          light: '#A3B59D',
          dark: '#6B7E65',
        },
        'dusty-peach': {
          DEFAULT: '#FFE8C4',
          light: '#FFFBF4',
          dark: '#FFCED8',
        },
        'warm-charcoal': '#4A352F', // Warm soft cocoa brown (not too dark, matches palette)
        'muted-brown': '#725B54',   // Gentle readable warm brown
        'soft-terracotta': {
          DEFAULT: '#D96B82',       // Rose matching #FFCED8
          hover: '#C2556C',
          light: '#FFCED8',
        },
      },
      fontFamily: {
        huglove: ['Huglove', '"DM Serif Display"', 'cursive', 'sans-serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        serif: ['"DM Serif Display"', 'Lora', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
