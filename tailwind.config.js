/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.html",
    "./**/*.js",       // Corrigido
    "./style/**/*.css"
  ],
  theme: {
    extend: {
      backgroundImage: {
        home: "url('./assets/bg.png')",
      },
    },
  },
  plugins: [],
}
