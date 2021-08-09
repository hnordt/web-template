import React from "react"
import { Link as BaseLink } from "react-router-dom"

export default function Link(props) {
  const className = props.unstyled
    ? undefined
    : "hover:text-blue-500 text-blue-600 font-medium rounded-md focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-2"

  if (props.href) {
    return (
      <BaseLink className={className} to={props.href} onClick={props.onClick}>
        {props.children}
      </BaseLink>
    )
  }

  return (
    <button className={className} type="button" onClick={props.onClick}>
      {props.children}
    </button>
  )
}
