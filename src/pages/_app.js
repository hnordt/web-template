import React from "react"
import "focus-visible"
import "react-toastify/dist/ReactToastify.css"
import "styles/index.css"

export default function App(props) {
  return <props.Component {...props.pageProps} />
}
