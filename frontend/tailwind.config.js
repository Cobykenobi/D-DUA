const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: colors.amber,
        brown: {
          50: '#efebe9',
          100: '#d7ccc8',
          200: '#bcaaa4',
          300: '#a1887f',
          400: '#8d6e63',
          500: '#795548',
          600: '#6d4c41',
          700: '#5d4037',
          800: '#4e342e',
          900: '#3e2723',
        },
        dndgold: '#FFD700',
        dndred: '#8B0000',
        dndbg: '#322018',
      },
      fontFamily: {
        dnd: ['"IM Fell English SC"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        'uncial-antiqua': ['"Uncial Antiqua"', 'cursive'],
        medieval: ['"MedievalSharp"', 'cursive'],
      },
      boxShadow: {
        dnd: '0 0 10px rgba(0, 0, 0, 0.7), 0 0 0 2px #FFD700',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
        },
      };
      addUtilities(newUtilities);
    },
  ],
}
