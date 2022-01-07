module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      pink: '#ED1576',
      purple: '#6B21A8'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
