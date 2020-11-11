import React from "react"
import cNames from "classnames"
import Tags from "./Tags"

export default function Tag(props) {
  return (
    <span
      className={cNames("pl-5 pr-5 text-xl pt-1 pb-1", {
        "text-blue-500 bg-blue-100 rounded-sm": props.variant === "primary",
        "font-bold": props.number === true,
        "text-gray-700 bg-gray-200 rounded-md": props.variant === "secondary",
        "text-red-600 bg-red-100 rounded-md": props.variant === "danger",
      })}
    >
      {props.children}
    </span>
  )
}
