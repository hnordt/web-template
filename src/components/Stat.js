import React from "react"
import cn from "classnames"

export default function Stat(props) {
  return (
    <div className="flex flex-col items-end">
      <dd
        className={cn("font-bold text-lg", {
          "text-gray-600": props.variant === "secondary",
          "text-blue-500": props.variant === "primary",
          "text-yellow-400": props.variant === "warning",
          "text-red-500": props.variant === "danger",
        })}
      >
        {props.value}
      </dd>
      <dt className="text-gray-500 text-sm">{props.label}</dt>
    </div>
  )
}
