module.exports = {
  target: "serverless",
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
}
