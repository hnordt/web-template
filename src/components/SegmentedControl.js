import React from "react"
import cn from "classnames"
import Tooltip from "components/Tooltip"

export default function SegmentedControl(props) {
  return (
    <div className="inline-flex items-center justify-center h-8 bg-gray-100 rounded-md">
      {props.options.map((option, optionIndex) => (
        <Tooltip key={option.value} content={option.helpText}>
          <button
            className={cn(
              "border-white px-6 h-full focus:outline-none focus:ring focus:ring-inset text-sm transition ease-in-out duration-500",
              {
                "border-r": optionIndex < props.options.length - 1,
                "rounded-l-md": optionIndex === 0,
                "rounded-r-md": optionIndex === props.options.length - 1,
                "bg-gray-600":
                  props.variant === "secondary" && option.value === props.value,
                "bg-red-500":
                  props.variant === "danger" && option.value === props.value,
                "bg-yellow-300":
                  props.variant === "warning" && option.value === props.value,
                "bg-blue-500":
                  props.variant === "primary" && option.value === props.value,
                "text-white": option.value === props.value,
                "text-gray-500": option.value !== props.value,
                "focus:ring-gray-200": props.variant === "secondary",
                "focus:ring-red-200": props.variant === "danger",
                "focus:ring-yellow-200": props.variant === "warning",
                "focus:ring-blue-200": props.variant === "primary",
              }
            )}
            onClick={() => props.onChange?.(option.value)}
          >
            {option.icon
              ? React.createElement(option.icon, {
                  className: "w-5 h-5",
                })
              : option.label}
          </button>
        </Tooltip>
      ))}
    </div>
  )
}
