/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        'primary-dark': '#0d0d0d',
        accent: '#b76e79',
        'accent-light': '#e8d4d7',
        cream: '#faf9f7',
        'cream-dark': '#f2f0ec',
        charcoal: '#2d2d2d',
        sand: '#e8e6e3',
        /* Wig store: soft warm blush background */
        'page': '#faf6f5',
        'page-dark': '#f5efed',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      borderRadius: {
        'pill': '9999px',
        'card': '1rem',
        'card-lg': '1.25rem',
      },
      boxShadow: {
        'soft': '0 2px 12px rgba(0,0,0,0.06)',
        'card': '0 4px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.1)',
        'nav': '0 1px 0 rgba(0,0,0,0.06)',
      },
      letterSpacing: {
        'section': '0.2em',
      },
    },
  },
  plugins: [],
}
