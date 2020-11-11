import React from "react"
import { BsArrowDown } from "react-icons/bs"
import Tag from "../components/Tag"
import Tags from "../components/Tags"

export default function Index() {
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
