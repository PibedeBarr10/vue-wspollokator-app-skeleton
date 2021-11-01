module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Poppins', 'Sans-serif']
    },
    height: {
      'map': '90vh'
    },
    minWidth: {
      '120': '120px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
  daisyui: {
    themes: [
      'light', // first one will be the default theme
      // 'dark'
    ],
  }
}
