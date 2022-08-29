/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '384px'
      },
      colors: {
        'primary': '#38470B',
        'second': '#949C7C',
      }
    },
    fontFamily: {
      sans: ['Noto Sans TC','Roboto'], 
      serif: ['Noto Serif TC','Times'],
      dela: ['Dela Gothic One']
    }
  }
}
