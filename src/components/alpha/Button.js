import React from "react"
import cn from "classnames"

function Button(props, ref) {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md focus:outline-none shadow-sm focus:ring-blue-500 focus:ring-offset-2 focus:ring-2",
        props.variant === "primary" &&
          `text-white bg-blue-600 ${
            props.disabled ? "" : "hover:bg-blue-700"
          } border-transparent`,
        props.variant === "secondary" &&
          `text-gray-700 ${
            props.disabled ? "" : "hover:bg-gray-50"
          } bg-white border-gray-300`,
        props.disabled && "opacity-60 cursor-auto"
      )}
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export default React.forwardRef(Button)
