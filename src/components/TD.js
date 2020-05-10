import React from "react"
import { cn } from "@smalldots/toolkit"

export default function TD(props) {
  return (
    <td
      className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap"
      colSpan={props.colSpan}
    >
      <span className={cn("flex", props.align === "right" && "justify-end")}>
        {props.children}
      </span>
    </td>
  )
}
