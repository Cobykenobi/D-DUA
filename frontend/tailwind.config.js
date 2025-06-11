/** @type {import('tailwindcss').Config} */;
module.exports = {;
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dndgold: '#FFD700',
      },
      fontFamily: {
        dnd: ['"IM Fell English SC"', 'serif'],
      },
    },
  },
  plugins: [],
}
