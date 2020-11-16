import React from "react"
import BaseTooltip from "@reach/tooltip"

export default function Tooltip(props) {
  return (
    <BaseTooltip
      className="absolute z-10 px-3 py-2 text-white whitespace-no-wrap text-sm bg-gray-800 rounded-md pointer-events-none"
      label={props.content}
    >
      <span className="inline-block">{props.children}</span>
    </BaseTooltip>
  )
}
