/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#F9F9F9',
        light: '#93BE5B',
        dark: '#76974B',
        danger: '#D55923'
      },
      fontFamily: {
        nunito: ["Nunito-Regular", "sans-serif"],
        nunitobold: ["Nunito-Bold", "sans-serif"]
      }
    },
  },
  plugins: [],
}

