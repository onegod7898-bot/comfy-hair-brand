/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        'primary-dark': '#1d4ed8',
        accent: '#fbbf24',
        'accent-hover': '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'pill': '9999px',
        'card': '1rem',
      },
      boxShadow: {
        'nav': '0 -2px 10px rgba(0,0,0,0.08)',
        'card': '0 2px 8px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
