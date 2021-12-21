module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.html', './src/**/*.scss']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        '4/5': '80%'
      },
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
