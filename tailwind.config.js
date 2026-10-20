/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#09090B",
          900: "#101014",
          850: "#16161C",
          800: "#1E1E26",
        },
        gold: {
          300: "#E5C97B",
          400: "#D4AF37",
          500: "#C5A059",
          600: "#A6823C",
        },
      },
      fontFamily: {
        serif: ['"Bodoni Moda"', "Georgia", "serif"],
        sans: ['"Manrope"', "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
