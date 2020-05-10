import React from "react"
import { cn } from "@smalldots/toolkit"
import { GridPropTypes } from "utils/propTypes"

export default function Grid(props) {
  return (
    <div
      className={cn(
        props.inline ? "inline-grid" : "grid",
        props.flow === "col" && "grid-flow-col",
        props.flow === "row" && "grid-flow-row",
        props.cols && `grid-cols-${props.cols}`,
        props.gap && `gap-${props.gap}`
      )}
    >
      {props.children}
    </div>
  )
}

Grid.propTypes = GridPropTypes
