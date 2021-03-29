import React from "react"
import cn from "classnames"

export default function Card(props) {
  return <div className="bg-white rounded-lg shadow">{props.children}</div>
}

export function CardHeader(props) {
  return (
    <div className="px-6 py-5 border-b">
      <div className="flex items-center justify-between">{props.children}</div>
    </div>
  )
}

export function CardColumns(props) {
  return <div className="flex divide-x">{props.children}</div>
}

export function CardColumn(props) {
  return (
    <div
      className={cn(
        // "p-6",
        !props.basis && "flex-1",
        props.basis === "sm" && "w-64",
        props.basis === "md" && "w-80",
        props.basis === "lg" && "w-96"
      )}
    >
      {props.children}
    </div>
  )
}

export function CardFooter(props) {
  return (
    <div className="px-6 py-5 border-t">
      <div className="flex items-center justify-between">{props.children}</div>
    </div>
  )
}
