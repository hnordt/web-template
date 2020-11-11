import React from "react"
import { BsArrowDown } from "react-icons/bs"
import cNames from "classnames"
import { IconContext } from "react-icons"

export default function Index() {
  function Tags(props) {
    return <div className="flex space-x-6 p-2">{props.children}</div>
  }

  function Tag(props) {
    return (
      <span
        className={cNames("pl-5 pr-5 text-xl pt-1 pb-1", {
          "text-blue-500 bg-blue-100 rounded-sm": props.variant === "primary",
          "font-bold": props.number === true,
          "text-gray-700 bg-gray-200 rounded-md": props.variant === "secondary",
          "text-red-600 bg-red-100 rounded-md": props.variant === "danger",
        })}
      >
        {props.children}
      </span>
    )
  }

  return (
    <div>
      <Tags>
        <Tag variant="primary" number icon={BsArrowDown}>
          4%
        </Tag>
        <Tag variant="secondary">P2P & Illegal</Tag>
        <Tag variant="danger">Threat</Tag>
      </Tags>
    </div>
  )
}
