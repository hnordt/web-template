module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: "/api/:slug*",
      },
      {
        source: "/:slug*",
        destination: "/",
      },
    ]
  },
  devIndicators: {
    autoPrerender: false,
  },
  future: {
    webpack5: true,
  },
}
