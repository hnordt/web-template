import React from "react"
import BaseDocument, { Html, Head, Main, NextScript } from "next/document"

export default class Document extends BaseDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="description" content="This is a web app" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Inter:100,200,300,400,500,600,700,800,900&display=swap"
          />
        </Head>
        <body className="bg-gray-100 antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}