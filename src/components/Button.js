import React from "react"
import cn from "classnames"

export default function Button(props) {
  return (
    <span className="inline-flex rounded-md shadow-sm">
      <button
        className={cn(
          "inline-flex items-center px-3 py-2 text-sm font-medium border rounded-md focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out",
          props.variant === "primary" &&
            "text-white hover:bg-blue-500 bg-blue-600 active:bg-blue-700 focus:border-blue-700 border-transparent",
          props.variant === "secondary" &&
            "hover:text-gray-500 text-gray-700 active:text-gray-800 active:bg-gray-50 bg-white focus:border-blue-300 border-gray-300"
        )}
        type="button"
      >
        {props.children}
      </button>
    </span>
  )
}
