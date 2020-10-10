import React from "react"
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
