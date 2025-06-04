/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        dnd: [
          'IM Fell English SC',
          'Cinzel Decorative',
          'Merriweather',
          'serif',
        ],
      },
      colors: {
        dndbg: '#2c1a12',
        dndred: '#a41e22',
        dndgold: '#d5ad6d',
      },
      boxShadow: {
        dnd: '0 4px 32px 0 rgba(164, 30, 34, 0.15)',
      },
      borderRadius: {
        '2xl': '1.25rem',
      }
    },
  },
  plugins: [],
};
