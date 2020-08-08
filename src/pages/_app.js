import React from "react"
import "focus-visible/dist/focus-visible.min.js"
import "styles/index.css"

export default function App(props) {
  return <props.Component {...props.pageProps} />
}
