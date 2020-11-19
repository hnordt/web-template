import React from "react"
import { useId } from "@reach/auto-id"
import cn from "classnames"

export default function Switch(props) {
  const id = useId(props.id)

  return (
    <div className="flex items-center space-x-3">
      <span
        className={cn(
          "relative inline-flex flex-shrink-0 w-11 h-6 border-2 border-transparent rounded-full focus:outline-none focus:ring cursor-pointer transition-colors duration-200 ease-in-out",
          props.checked ? "bg-indigo-600" : "bg-gray-200"
        )}
        role="checkbox"
        tabIndex={0}
        onClick={() => props.onChange?.(props.value, !props.checked)}
        aria-labelledby={id}
        aria-checked={props.on}
      >
        <span
          className={cn(
            "inline-block w-5 h-5 bg-white rounded-full shadow transform transition duration-200 ease-in-out",
            props.checked ? "translate-x-5" : "translate-x-0"
          )}
          aria-hidden
        />
      </span>
      <span className="text-gray-900 text-sm" id={id}>
        {props.label}
      </span>
    </div>
  )
}
