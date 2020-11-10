let defaultTheme = require("tailwindcss/defaultTheme")

const plugin = require("tailwindcss/plugin")

module.exports = {
  future: {
    standardFontWeights: true,
    defaultLineHeights: true,
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  experimental: {
    uniformColorPalette: true,
    extendedFontSizeScale: true,
    extendedSpacingScale: true,
    applyComplexClasses: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    boxShadow: ["responsive", "hover", "focus", "focus-visible"],
    textDecoration: ["responsive", "hover", "focus", "focus-visible"],
    primary: "text-blue-500",
  },
  purge: {
    content: ["src/**/*.js"],
  },
}
