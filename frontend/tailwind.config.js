/** @type {import('tailwindcss').Config} */;
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dndgold: '#FFD700',
        dndred: '#8B0000',
        dndbg: '#322018',
      },
      fontFamily: {
        dnd: ['"IM Fell English SC"', 'serif'],
      },
      boxShadow: {
        dnd: '0 0 10px rgba(0, 0, 0, 0.7), 0 0 0 2px #FFD700',
      },
    },
  },
  plugins: [],
}
