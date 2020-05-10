import React from "react"
import { FiChevronLeft, FiEdit2, FiTrash } from "react-icons/fi"

export default function Icon(props) {
  let commonProps = {
    className: "stroke-current",
    style: props.style,
  }

  if (props.name === "chevron-left") {
    return <FiChevronLeft {...commonProps} />
  }

  if (props.name === "pencil") {
    return <FiEdit2 {...commonProps} />
  }

  if (props.name === "trash") {
    return <FiTrash {...commonProps} />
  }

  return null
}
