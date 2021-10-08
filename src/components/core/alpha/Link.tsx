import React from "react"
import BaseLink from "next/link"

export default function Link(props) {
  const className = props.unstyled
    ? undefined
    : "hover:text-blue-500 text-blue-600 font-medium rounded-md focus:outline-none focus:ring-blue-500 focus:ring-offset-2 focus:ring-2"

  if (props.href) {
    return (
      <BaseLink href={props.href} replace={props.replace}>
        <a className={className} onClick={props.onClick}>
          {props.children}
        </a>
      </BaseLink>
    )
  }

  return (
    <button className={className} type="button" onClick={props.onClick}>
      {props.children}
    </button>
  )
}
