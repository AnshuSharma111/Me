/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#1a2028',
        'bg-light': '#2a3040',
        'text-primary': '#f0f0e8',
        'text-secondary': '#e8e4d8',
        'emotion-joy': '#f2d478',
        'emotion-calm': '#7fb9b9',
        'emotion-melancholy': '#8e9eb3',
        'emotion-anxiety': '#b893c0',
        'emotion-hope': '#a8c896',
        'emotion-wonder': '#b8a0cc',
        'emotion-gratitude': '#d9a679',
        'emotion-anger': '#e57373',
        'emotion-queasy': '#81c784',
      },
      fontFamily: {
        sans: ['Atkinson Hyperlegible', 'system-ui', 'sans-serif'],
        handwritten: ['Indie Flower', 'cursive'],
      },
    },
  },
  plugins: [],
}