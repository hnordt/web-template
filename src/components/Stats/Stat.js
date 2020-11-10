import React from "react"
import classNames from "classnames"

const Stat = (props) => {
  const Stats = {
    "text-blue-500": props.variant === "primary",
  }
  return (
    <div className="mb-8 pr-3 text-center grid border w-40 h-20 justify-items-end">
      <span variant="primary">{props.value}</span>
      <span>{props.label}</span>
    </div>
  )
}

export default Stat
