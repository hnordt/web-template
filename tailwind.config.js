const colors = require("tailwindcss/colors")
const defaultTheme = require("tailwindcss/defaultTheme")
const plugin = require("tailwindcss/plugin")

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
    radixPlugin(),
  ],
  purge: {
    content: ["src/**/*.js", "src/**/*.ts", "src/**/*.tsx"],
  },
}

function radixPlugin() {
  return plugin(({ addVariant, e }) =>
    [
      "open",
      "closed",
      "active",
      "inactive",
      "on",
      "off",
      "checked",
      "unchecked",
      "indeterminate",
      "loading",
      "complete",
      "hidden",
      "delayed-open",
    ].forEach((state) =>
      addVariant(`state-${state}`, ({ modifySelectors, separator }) =>
        modifySelectors(
          ({ className }) =>
            `.${e(
              `state-${state}${separator}${className}`
            )}[data-state="${state}"]`
        )
      )
    )
  )
}
