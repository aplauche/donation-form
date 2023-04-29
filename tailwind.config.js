/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          100: '#F4F7FF',
          150: '#EAF0FF',
          200: '#CEDDFF',
          300: '#99B7FF',
          400: '#5487FF',
          500: '#004CFF',
          600: '#0022D2',
          700: '#0007A8',
        },
        slate: {
          100: '#F7F9FF',
          150: '#EDF0F7',
          200: '#CED3E0',
          300: '#9298AD',
          400: '#5F667E',
          500: '#4E5468',
          600: '#1F2129',
          700: '#1F2129',
          800: '#1F2129',
          900: '#1F2129',
        },
        strawberry: {
          100: '#FFF2F6',
          200: '#FCDEE7',
          300: '#FAA5BD',
          400: '#F56E94',
          500: '#F3376B',
          600: '#E40E49',
        },
      }
    },
  },
  plugins: [],
}