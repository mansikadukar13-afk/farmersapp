/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        farm: {
          dark: '#1b4332',
          primary: '#2d6a4f',
          medium: '#40916c',
          light: '#52b788',
          soft: '#74c69d',
          pale: '#d8f3dc',
          bg: '#fdfbf7',
          card: '#ffffff',
          accent: '#f97316',
          yellow: '#eab308',
          lime: '#84cc16'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
