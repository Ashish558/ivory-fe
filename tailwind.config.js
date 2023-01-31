/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '3.5': '14px'
      },
      colors: {
        primaryDark: '#1B1B1E',
        lightGray: '#74777F',
        lightBlack: '#49454F',
        primary: '#1B72C0'
      },
      fontSize: {
        xxs: '10px'
      },
      backgroundImage:{
        'activities-gradient' : 'linear-gradient(180.1deg, #59E3FF 2.72%, #FFFFFF 98.73%)'
      },
      boxShadow: {
        'light': '0px 0px 4px rgba(0, 0, 0, 0.18)',
      }
    },
  },
  // plugins: [require("daisyui")],
  plugins: [],
}
