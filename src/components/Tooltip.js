import React from "react"
import BaseTooltip from "@reach/tooltip"

export default function Tooltip(props) {
  if (!props.content) {
    return props.children
  }

  return (
    <BaseTooltip
      className="absolute z-10 px-3 py-2 text-white whitespace-nowrap text-sm bg-gray-800 rounded-md pointer-events-none"
      label={props.content}
    >
      {props.children}
    </BaseTooltip>
  )
}
