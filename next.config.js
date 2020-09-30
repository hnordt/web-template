module.exports = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/",
      },
    ]
  },
  devIndicators: {
    autoPrerender: false,
  },
}
