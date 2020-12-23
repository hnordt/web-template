const fs = require("fs")
const dotenv = require("dotenv")

let oldAppEnv = {}
let oldAppLocalEnv = {}

try {
  oldAppEnv = dotenv.parse(Buffer.from(fs.readFileSync("../.env")))
} catch {}

try {
  oldAppLocalEnv = dotenv.parse(Buffer.from(fs.readFileSync("../.env.local")))
} catch {}

const assetPrefix =
  process.env.NODE_ENV === "development" ? "" : "/new-reporting"

module.exports = {
  env: {
    ...[
      "API_URL",
      "AUTH0_CLIENT_ID",
      "AUTH0_SUBDOMAIN",
      "GTM_KEY",
      "SEGMENT_ID",
      "WHITELABEL_SEGMENT",
      "LOCATION_LOOKUP_URL",
      "IPSTACK_KEY",
      "ROLLBAR_TOKEN",
      "COMMIT_REF",
    ].reduce(
      (acc, v) => ({
        ...acc,
        [`NEXT_PUBLIC_${v}`]:
          process.env[`REACT_APP_${v}`] ||
          oldAppLocalEnv[`REACT_APP_${v}`] ||
          oldAppEnv[`REACT_APP_${v}`],
      }),
      {}
    ),
    NEXT_PUBLIC_ASSET_PREFIX: assetPrefix,
  },
  assetPrefix,
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
