import React from "react"
import cn from "classnames"

export default function Tag(props) {
  return (
    <span
      className={cn("inline-flex items-center rounded-md px-4 py-1 text-base", {
        "font-bold": props.bold,
        "text-blue-500 bg-blue-100": props.variant === "primary",
        "text-gray-700 bg-gray-200": props.variant === "secondary",
        "text-red-600 bg-red-100": props.variant === "danger",
      })}
    >
      {props.icon &&
        React.createElement(props.icon, {
          className: "w-5 h-5 mr-0.5",
        })}
      {props.children}
    </span>
  )
}
