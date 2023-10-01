
/** @type {import('tailwindcss').Config} */

module.exports = {

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'body': ['Poppins', 'sans-serif'],
        'heading': ['Lato', 'sans-serif'],
        'logo': ["Allison"],
      },


      fontSize: {
        'xs': '.75rem',
        'sm': '.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      borderRadius: {
        '9': '9px',
      },
      colors: {
        //Main colors//
        'py-blue': '#3970b4',
        'py-green': '#62A93F',
        'py-gray': '#B8B8B8',
        'py-orange': '#ee5627',
        'py-purple': '#674be4',


        //strong colors//
        'dk-blue': '#264D7B',
        'dk-green': '#417428',
        'dk-purple': '#3e1385',
        'dk-gray': '#333333',
        'dk-orange': '#b36200',


        //light colors//
        'lt-blue': '#6F9CE2',
        'lt-green': '#8CC76F',
        'lt-purple': '#9F79A1',
        'lt-gray': '#cecece',

        //Shadows//
        'custom-gray': '#e2e0f76c',
        'custom-blue': "#2570d6",
        'custom-purple': '#4C37A6',
        'mid-gray': '#5e5f61',
      },
      height: {
        '1/2screen': '50vh',
        "70screen": '70vh',
      }

    },
    variants: {
      extend: {
        // borderColor: ['focus'],
        boxShadow: ['focus'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Make sure this is correctly installed
    function ({ addUtilities }) {
      const newUtilities = {
        '.drop-shadow-blueish': {
          'filter': 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}