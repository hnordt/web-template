import React from "react"
import cn from "classnames"
import { StatsContext } from "components/Stats"

export default function Stat(props) {
  const statsContext = React.useContext(StatsContext)
  const variant = props.variant ?? statsContext.variant

  return (
    <li className="flex flex-col items-end">
      <div
        className={cn(
          "font-bold text-lg",
          variant === "secondary" && "text-gray-600",
          variant === "primary" && "text-blue-500",
          variant === "warning" && "text-yellow-400",
          variant === "danger" && "text-red-500"
        )}
      >
        {props.children}
      </div>
      <div className="text-gray-500 text-sm">{props.label}</div>
    </li>
  )
}
