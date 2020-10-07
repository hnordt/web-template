let defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  experimental: {
    uniformColorPalette: true,
    standardFontWeights: true,
    extendedFontSizeScale: true,
    defaultLineHeights: true,
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
  },
  purge: {
    content: ["src/**/*.js"],
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/ui")],
}
