const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,js,tsx,ts}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
      },
      colors: {
        mainOrange: colors.orange[400],
        mainBlue: colors.cyan[400],
      },
      transformOrigin: {
        0: '0%',
      },
      backgroundImage: {
        'hero-svg': 'url("/src/assets/windy.svg")',
      },
      variants: {
        borderColor: ['responsive', 'hover', 'focus', 'focus-within'],
      },
    },
  },
  plugins: [],
};
