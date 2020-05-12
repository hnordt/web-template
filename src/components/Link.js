import React from "react"
import BaseLink from "next/link"

export default function Link(props) {
  if (props.href) {
    return (
      <BaseLink href={props.href} as={props.as ?? props.href}>
        {/* eslint-disable-next-line */}
        <a className="text-indigo-600 hover:text-indigo-900">
          {props.children}
        </a>
      </BaseLink>
    )
  }

  return (
    <button
      className="text-indigo-600 hover:text-indigo-900"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}
