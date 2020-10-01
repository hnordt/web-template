import React from "react"
import { ToastContainer, Slide, toast } from "react-toastify"
import "focus-visible"
import "react-toastify/dist/ReactToastify.css"
import "styles/index.css"

export default function App(props) {
  return (
    <>
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
