/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-ivory': '#FFF4DE', // User primary warm cream background
        'palette-cream': '#FFF4DE',
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
          light: '#FFF4DE',
          dark: '#FFCED8',
        },
        'soft-terracotta': {
          DEFAULT: '#C45B72', // Rich berry-rose matching #FFCED8
          hover: '#A6455B',
          light: '#FFCED8',
        },
        'blush-pink': {
          DEFAULT: '#FFCED8',
          light: '#FFDDDD',
        },
        'warm-charcoal': '#1F1B1A', // Darker main text color
        'muted-brown': '#4E4440',   // Darker readable secondary text
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
