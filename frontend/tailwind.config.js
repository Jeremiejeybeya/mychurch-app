/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue:  { DEFAULT: '#1A56DB', dark: '#0F3A8A', light: '#EBF2FF' },
        gold:  { DEFAULT: '#F5A623', dark: '#C07B00', light: '#FFF8EB' },
        navy:  { DEFAULT: '#0D1B3E' }
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
