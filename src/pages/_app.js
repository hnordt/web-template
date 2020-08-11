import "focus-visible"
import "styles/index.css"

import React from "react"

export default function App(props) {
  return <props.Component {...props.pageProps} />
}
