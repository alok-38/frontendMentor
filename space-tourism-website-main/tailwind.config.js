/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#0b0d17",
        accent: "#d0d6f9",
        white: "#ffffff",
      },

      fontFamily: {
        serif: ["Bellefair", "serif"],
        sans: ["Barlow", "sans-serif"],
        condensed: ["Barlow Condensed", "sans-serif"],
      },

      fontSize: {
        '900': '9rem',
        '800': '6.25rem',
        '700': '3.5rem',
        '600': '2rem',
        '500': '1.75rem',
        '400': '1.125rem',
        '300': '1rem',
        '200': '0.875rem',
      },

      letterSpacing: {
        1: '2px',
        2: '4px',
      },

      spacing: {
        25: '0.125rem',
        50: '0.25rem',
        100: '0.5rem',
        150: '0.75rem',
        200: '1rem',
        300: '1.5rem',
        400: '2rem',
        500: '2.5rem',
        600: '3rem',
        800: '4rem',
        1000: '5rem',
        1200: '6rem',
        1600: '8rem',
      },
    },
  },
  plugins: [],
}