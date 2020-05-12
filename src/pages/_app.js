import React from "react"
import Head from "next/head"
import "styles/index.css"

export default function App(props) {
  return (
    <>
      <Head>
        <meta name="description" content="This is a web app" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Inter:100,200,300,400,500,600,700,800,900&display=swap"
        />
      </Head>
      <props.Component {...props.pageProps} />
    </>
  )
}
