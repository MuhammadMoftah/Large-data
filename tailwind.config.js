const colors = require("tailwindcss/colors");
module.exports = {
  mode: "jit",
  theme: {
    extend: {
      colors: {
        teal: colors.teal
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [],
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}"
  ]
};
