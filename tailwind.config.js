/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // This tells Tailwind to scan all your Angular files
  ],
  theme: {
    extend: {
      // Add your custom color palette
      colors: {
        'primary': '#222831',
        'primary-variant': '#393E46',
        'secondary': '#DFD0B8',
        'background': '#FFFFFF',
        'error': '#B00020',
      },
      // Add your custom font
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      // Add your custom font sizes from the image
      fontSize: {
        'body': '14pt',
        'h3': '18pt',
        'h2': '22pt',
        'h1': '32pt',
      }
    },
  },
  plugins: [],
}