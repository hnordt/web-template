const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  theme: {
    extend: {
      colors: {
        gray: colors.blueGray,
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
  purge: {
    content: ["src/**/*.js", "src/**/*.ts", "src/**/*.tsx"],
  },
}
