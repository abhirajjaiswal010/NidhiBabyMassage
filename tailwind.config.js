/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-ivory': '#FFF9F2',
        'muted-sage': {
          DEFAULT: '#9EAD96',
          light: '#B7C3B0',
          dark: '#7F9077',
        },
        'dusty-peach': {
          DEFAULT: '#F3C8B5',
          light: '#F8DDD0',
          dark: '#E4A890',
        },
        'soft-terracotta': {
          DEFAULT: '#B96F58',
          hover: '#A55F49',
          light: '#CE8B76',
        },
        'blush-pink': '#F6E0DF',
        'warm-charcoal': '#34342F',
        'muted-brown': '#77736C',
      },
      fontFamily: {
        huglove: ['Huglove', '"DM Serif Display"', 'cursive', 'sans-serif'],
        serif: ['"DM Serif Display"', 'Lora', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
