import React from "react"
import cn from "classnames"

export default function Button(props) {
  return (
    <button
      className={cn(
        "inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md focus:outline-none shadow-sm focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2",
        props.variant === "primary" &&
          "text-white bg-indigo-600 hover:bg-indigo-700 border-transparent",
        props.variant === "secondary" &&
          "text-gray-700 hover:bg-gray-50 bg-white border-gray-300"
      )}
      type={props.type ?? "button"}
      onClick={() => props.onClick?.()}
    >
      {props.children}
    </button>
  )
}
