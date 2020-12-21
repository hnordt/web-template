import React from "react"
import cn from "classnames"

export default function SegmentedControl(props) {
  const onlyIcons = props.options.every((option) => option.icon)

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-gray-100 h-9",
        {
          "p-1": !onlyIcons,
        }
      )}
    >
      {props.options.map((option, optionIndex) => (
        <button
          key={option.value}
          className={cn(
            "h-full focus:outline-none focus:ring text-sm transition ease-in-out duration-500",
            {
              "rounded-md": !onlyIcons,
              "rounded-l-md": onlyIcons && optionIndex === 0,
              "rounded-r-md":
                onlyIcons && optionIndex === props.options.length - 1,
              "bg-gray-600":
                props.variant === "secondary" && option.value === props.value,
              "bg-red-500":
                props.variant === "danger" && option.value === props.value,
              "bg-yellow-300":
                props.variant === "warning" && option.value === props.value,
              "bg-blue-500":
                props.variant === "primary" && option.value === props.value,
              "px-3": onlyIcons,
              "px-6": !onlyIcons,
              "text-white": option.value === props.value,
              "text-gray-400": onlyIcons && option.value !== props.value,
              "text-gray-500": !onlyIcons && option.value !== props.value,
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
      ))}
    </div>
  )
}
