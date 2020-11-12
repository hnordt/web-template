import React from "react"
import { Link as BaseLink } from "react-router-dom"

export default function Link(props) {
  const className =
    "hover:text-blue-500 text-blue-600 focus:underline font-medium focus:outline-none transition duration-150 ease-in-out"

  if (props.href) {
    const external = props.href.startsWith("http")

    return React.createElement(
      external ? "a" : BaseLink,
      {
        className: props.unstyled ? undefined : className,
        [external ? "href" : "to"]: props.href,
        target: props.target,
      },
      props.children
    )
  }

  return (
    <button className={className} onClick={props.onClick}>
      {props.children}
    </button>
  )
}
