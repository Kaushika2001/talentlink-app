// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Nunito', 'sans-serif'],
      },
      colors: {
        background: '#FFFFFF',
        primary: '#222831',
        'primary-variant': '#393E46',
        secondary: '#DFD0B8',
        error: '#B00020',
      },
    },
  },
  plugins: [],
}
