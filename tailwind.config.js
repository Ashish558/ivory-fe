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
        primary: '#1B72C0',
        secondary: '#CDF7FF',
        secondaryLight: '#EEFCFF',
        primaryDark: '#1B1B1E',
        lightGray: '#74777F',
        lightBlack: '#49454F',
        LightSky: "#DEF9FF",
        primaryGreen: '#26A925',
        SkyBlue: "#1B72C0",
      },
      fontSize: {
        xxs: '10px'
      },
      backgroundImage: {
        'activities-gradient': 'linear-gradient(180.1deg, #59E3FF 2.72%, #FFFFFF 98.73%)',
        'linear-grad': 'linear-gradient(180deg, rgba(0, 85, 191, 0.8) 1.84%, rgba(89, 227, 255, 0.8) 130.78%)'
      },
      boxShadow: {
        'light': '0px 0px 4px rgba(0, 0, 0, 0.18)',
      }
    },
  },
  plugins: [require("daisyui")]

}
