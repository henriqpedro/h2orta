/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: '#F9F9F9',
        light: '#93BE5B',
        medium: '#76A136',
        dark: '#455E1C',
        danger: '#D55923',
        gray: '#555'
      },
      fontFamily: {
        nunito: ["Nunito-Regular", "sans-serif"],
        nunitobold: ["Nunito-Bold", "sans-serif"]
      }
    },
  },
  plugins: [],
}

