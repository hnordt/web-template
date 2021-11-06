import resolveConfig from "tailwindcss/resolveConfig"

const theme = resolveConfig(require("../../tailwind.config.js")).theme

export default theme
