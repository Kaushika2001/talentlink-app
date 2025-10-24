/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#222831',
        'primary-variant': '#393E46',
        secondary: '#DFD0B8',
        error: '#B00020',
        background: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
