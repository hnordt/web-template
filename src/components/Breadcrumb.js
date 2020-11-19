import React from "react"
import { RiArrowRightSLine } from "react-icons/ri"

export default function Breadcrumb(props) {
  if (props.current) {
    return (
      <span className="text-gray-500 text-sm font-medium transition">
        {props.children}
      </span>
    )
  }

  return (
    <>
      <a
        className="text-gray-500 hover:text-gray-700 text-sm font-medium transition"
        href={props.href}
      >
        {props.children}
      </a>
      <RiArrowRightSLine className="flex-shrink-0 mx-4 w-5 h-5 text-gray-400" />
    </>
  )
}
