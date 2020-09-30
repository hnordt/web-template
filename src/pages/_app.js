import React from "react"
import Head from "next/head"
import { ToastContainer, Slide, toast } from "react-toastify"
import "focus-visible"
import "react-toastify/dist/ReactToastify.css"
import "styles/index.css"

export default function App(props) {
  return (
    <>
      <Head>
        <title>TODO</title>
      </Head>
      <props.Component {...props.pageProps} />
      <ToastContainer
        toastClassName="pl-5"
        closeButton={null}
        position={toast.POSITION.TOP_RIGHT}
        transition={Slide}
      />
    </>
  )
}
