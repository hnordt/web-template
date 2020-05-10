import React from "react"

export default function Link(props) {
  return (
    <a
      className="text-indigo-600 hover:text-indigo-900"
      href={props.href}
      onClick={(e) => {
        e.preventDefault()
        // eslint-disable-next-line
        props?.onClick(e)
      }}
    >
      {props.children}
    </a>
  )
}
