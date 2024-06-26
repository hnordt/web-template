import React from "react"
import cx from "classnames"

interface BadgeProps {
  variant: "primary" | "secondary" | "success" | "warning" | "danger"
  icon?: React.FunctionComponent<{ className: string }>
  children: React.ReactNode
}

export default function Badge(props: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center px-3 py-0.5 whitespace-nowrap text-sm font-medium rounded-full",
        props.variant === "primary" && "text-blue-800 bg-blue-100",
        props.variant === "secondary" && "text-gray-800 bg-gray-100",
        props.variant === "success" && "text-green-800 bg-green-100",
        props.variant === "warning" && "text-orange-800 bg-orange-100",
        props.variant === "danger" && "text-red-800 bg-red-100"
      )}
    >
      {props.icon &&
        React.createElement(props.icon, {
          className: "w-5 h-5 mr-1.5",
        })}
      {props.children}
    </span>
  )
}
