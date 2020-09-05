let defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
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
  future: {
    removeDeprecatedGapUtilities: true,
  },
  experimental: {
    uniformColorPalette: true,
    extendedFontSizeScale: true,
    defaultLineHeights: true,
    extendedSpacingScale: true,
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/ui")],
  purge: ["src/**/*.js"],
}
