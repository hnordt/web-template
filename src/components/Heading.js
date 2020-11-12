import React from "react"
import cn from "classnames"

export default function Heading(props) {
  return React.createElement(
    `h${props.level}`,
    {
      className: cn(
        "text-gray-900 font-medium",
        props.size === "lg" && "text-lg",
        props.align === "center" && "text-center"
      ),
    },
    props.children
  )
}
