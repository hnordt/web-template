import React from "react"
import cn from "classnames"

export default function Tag(props) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded",
        props.variant === "primary" && "text-blue-800 bg-blue-100",
        props.variant === "secondary" && "text-gray-800 bg-gray-100",
        props.variant === "success" && "text-green-800 bg-green-100",
        props.variant === "warning" && "text-orange-800 bg-orange-100",
        props.variant === "danger" && "text-red-800 bg-red-100"
      )}
    >
      {props.icon &&
        React.createElement(props.icon, {
          className: "w-5 h-5 mr-1.5",
        })}
      {props.children}
    </span>
  )
}
