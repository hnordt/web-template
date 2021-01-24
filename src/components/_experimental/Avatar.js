import React from "react"
import cn from "classnames"

export default function Avatar(props) {
  return (
    <img
      className={cn(
        "inline-block rounded-full",
        props.size === "xs" && "w-6 h-6",
        props.size === "sm" && "w-8 h-8",
        props.size === "md" && "w-10 h-10",
        props.size === "lg" && "w-12 h-12",
        props.size === "xl" && "w-14 h-14"
      )}
      src={props.src}
      alt={props.alt}
    />
  )
}
