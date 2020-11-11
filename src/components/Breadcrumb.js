import React from "react"
import { RiArrowRightSLine } from "react-icons/ri"

export default function Breadcrumb(props) {
  if (props.current) {
    return (
      <span className="font-medium text-gray-900 text-base">
        {props.children}
      </span>
    )
  }

  return (
    <>
      <a
        className="text-base text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
        href={props.href}
      >
        {props.children}
      </a>
      <RiArrowRightSLine className="flex-shrink-0 h-5 w-5 mx-1 text-gray-400" />
    </>
  )
}
