import React from "react"
import Head from "next/head"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer, Slide, toast } from "react-toastify"

export default function Index() {
  if (typeof window === "undefined") {
    return null
  }

  return (
    <>
      <Head>
        <meta name="description" content="" />
        <title></title>
      </Head>
      <BrowserRouter>
        <main className="p-6"></main>
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
