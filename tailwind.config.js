module.exports = {
  content: ['./src/**/*.{html,js}'],
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,js}']
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
