import React from "react"
import cn from "classnames"

export default function Text(props) {
  return (
    <span className={cn("text-gray-900", !props.size && "text-base")}>
      {props.children}
    </span>
  )
}
