/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['"Nunito"', 'sans-serif'],
      },
      colors: {
        background: '#f9fafb',
        card: '#ffffff',
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#10b981',
      },
    },
  },
  plugins: [],
}
