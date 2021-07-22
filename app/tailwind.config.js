module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        serif: ['"DM Serif Display"'],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['focus', 'active'],
      borderWidth: ['hover', 'focus'],
      boxShadow: ['hover', 'active'],
    },
  },
  plugins: [],
}
