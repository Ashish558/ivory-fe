/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primaryDark: '#1B1B1E',
        lightGray: '#74777F',
        lightBlack: '#49454F',
        primary: '#1B72C0'
      },
      fontSize: {
        xxs: '10px'
      }
    },
  },
  plugins: [],
}
