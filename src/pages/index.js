import Breadcrumb from "components/Breadcrumb"
import Breadcrumbs from "components/Breadcrumbs"
import React from "react"
import { BsArrowDown } from "react-icons/bs"
import Tag from "../components/Tag"
import Tags from "../components/Tags"

export default function Index() {
  return (
    <div>
      <Breadcrumbs>
        <Breadcrumb href="/requests">Requests</Breadcrumb>
        <Breadcrumb href="/threats">Threats</Breadcrumb>
        <Breadcrumb current>By user</Breadcrumb>
      </Breadcrumbs>
    </div>
  )
}
