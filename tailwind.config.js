/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./blog/**/*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#000F57",
        teal: "#097788",
        "teal-light": "#0a9db3",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
