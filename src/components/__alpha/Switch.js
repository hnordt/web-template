import React from "react"
import cn from "classnames"

export default function Switch(props) {
  return (
    <button
      className={cn(
        "relative inline-flex flex-shrink-0 items-center w-11 h-6 border-2 border-transparent rounded-full focus:outline-none cursor-pointer space-x-3 transition-colors duration-200 ease-in-out focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2",
        props.checked ? "bg-indigo-600" : "bg-gray-200"
      )}
      type="button"
      onClick={() => props.onChange?.(props.value, !props.checked)}
      aria-pressed={props.on}
    >
      <span
        className={cn(
          "inline-block w-5 h-5 bg-white rounded-full shadow transform transition duration-200 ease-in-out ring-0",
          props.checked ? "translate-x-5" : "translate-x-0"
        )}
        aria-hidden
      />
      <span className="text-gray-900 text-sm">{props.label}</span>
    </button>
  )
}
