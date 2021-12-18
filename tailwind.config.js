module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.html', './src/**/*.scss']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      padding: {
        '6': '1.5rem',
        '12': '3rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
