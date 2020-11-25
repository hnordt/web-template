import React from "react"
import cn from "classnames"
import { StatsContext } from "components/Stats"

export default function Stat(props) {
  const statsContext = React.useContext(StatsContext)
  const variant = props.variant ?? statsContext.variant

  return (
    <div>
      <dt className="text-gray-500 text-sm font-medium truncate">
        {props.label}
      </dt>
      <dd
        className={cn(
          "mt-1 text-3xl font-semibold",
          !variant && "text-gray-900",
          variant === "primary" && "text-blue-600",
          variant === "secondary" && "text-gray-600",
          variant === "success" && "text-green-600",
          variant === "warning" && "text-orange-500",
          variant === "danger" && "text-red-600"
        )}
      >
        {props.children}
      </dd>
    </div>
  )
}
