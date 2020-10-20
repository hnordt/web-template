import React from "react"
import Head from "next/head"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer, Slide, toast } from "react-toastify"
import "focus-visible"
import "react-toastify/dist/ReactToastify.css"
import "styles/index.css"

export default function App(props) {
  return (
    <>
      <Head>
        <meta name="description" content="" />
        <title>Foo</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Inter:100,200,300,400,500,600,700,800,900&amp;display=swap"
        />
      </Head>
      <div suppressHydrationWarning>
        {typeof window === "undefined" ? null : (
          <>
            <BrowserRouter>
              <props.Component {...props.pageProps} />
            </BrowserRouter>
            <ToastContainer
              toastClassName="pl-5"
              closeButton={null}
              position={toast.POSITION.TOP_RIGHT}
              transition={Slide}
            />
          </>
        )}
      </div>
    </>
  )
}
