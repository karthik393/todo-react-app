/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
          'custom-orange':'#de483a',
       'custom-bg-orange':'hsl(13, 85%, 54%)'
        }
    },
  },
  plugins: [],
}

