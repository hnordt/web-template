import React from "react"
import cn from "classnames"

export default function Icon(props) {
  return React.createElement(props.name, {
    className: cn(
      !props.variant && "text-gray-900",
      props.variant === "primary" && "text-blue-500",
      props.variant === "secondary" && "text-gray-500",
      props.variant === "success" && "text-green-500",
      props.variant === "warning" && "text-orange-400",
      props.variant === "danger" && "text-red-500",
      props.size === "xs" && "w-4 h-4",
      props.size === "sm" && "w-5 h-5"
    ),
  })
}
