/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '375px',
      'md': '480px',
      'lg': '768px',
      'xl': '1200px'
    },
    extend: {
      backgroundImage: {
        'pattern-bg-desktop': 'url("/images/pattern-bg-desktop.png")',
        'pattern-bg-mobile': 'url("/images/pattern-bg-mobile.png")'
      },
      colors: {
        'very-dark-gray': 'hsl(0, 0%, 17%)',
        'dark-gray': 'hsl(0, 0%, 59%)'
      }
    },
  },
  plugins: [],
}