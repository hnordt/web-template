import React from "react"
import cn from "classnames"
import { StatsContext } from "components/Stats"

export default function Stat(props) {
  const statsContext = React.useContext(StatsContext)
  const variant = props.variant ?? statsContext.variant

  return (
    <li className="flex flex-col items-end">
      <span
        className={cn("block font-bold text-lg", {
          "text-gray-600": variant === "secondary",
          "text-blue-500": variant === "primary",
          "text-yellow-400": variant === "warning",
          "text-red-500": variant === "danger",
        })}
      >
        {props.children}
      </span>
      <span className="block text-gray-500 text-sm">{props.label}</span>
    </li>
  )
}
