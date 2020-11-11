import React from "react"
import Breadcrumb from "../components/Breadcrumb"
import Breadcrumbs from "../components/Breadcrumbs"

export default function Index() {
  return (
    <Breadcrumbs>
      <Breadcrumb href="/requests">Requests</Breadcrumb>
      <Breadcrumb href="/threats">Threats</Breadcrumb>
      <Breadcrumb current>By user</Breadcrumb>
    </Breadcrumbs>
  )
}
