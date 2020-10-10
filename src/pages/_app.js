import React from "react"
import Head from "next/head"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer, Slide, toast } from "react-toastify"
import "focus-visible"
import "react-toastify/dist/ReactToastify.css"
import "styles/index.css"

export default function App(props) {
  if (typeof window === "undefined") {
    return null
  }

  return (
    <>
      <Head>
        <title>App</title>
      </Head>
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
  )
}
