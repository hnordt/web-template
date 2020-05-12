import React from "react"
import Head from "next/head"

export default function Screen(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      {props.children}
    </>
  )
}
