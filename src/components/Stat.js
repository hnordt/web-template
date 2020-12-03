import React from "react"
import cn from "classnames"

export default function Stat(props) {
  return (
    <div>
      <dt className="text-gray-500 text-sm font-medium truncate">
        {props.label}
      </dt>
      <dd
        className={cn(
          "mt-1 text-3xl font-semibold",
          !props.variant && "text-gray-900",
          props.variant === "primary" && "text-blue-600",
          props.variant === "secondary" && "text-gray-600",
          props.variant === "success" && "text-green-600",
          props.variant === "warning" && "text-orange-500",
          props.variant === "danger" && "text-red-600"
        )}
      >
        {props.children}
      </dd>
    </div>
  )
}
