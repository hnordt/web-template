import React from "react"
import BaseDocument, { Html, Head, Main, NextScript } from "next/document"

export default class Document extends BaseDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="by-white antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
