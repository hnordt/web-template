import React from "react"
import { cn } from "@hnordt/toolkit"

export default function CardContent(props) {
  return (
    <div className={cn("bg-white", props.padded !== false && "p-6")}>
      {props.children}
    </div>
  )
}
