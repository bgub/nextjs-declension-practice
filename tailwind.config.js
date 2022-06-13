/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'schnazzy-blue': '#0070f3',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
