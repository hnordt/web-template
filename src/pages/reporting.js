import React from "react"
import { ReactQueryDevtools } from "react-query/devtools"
import ReportingAllOrganizationsScreen from "screens/ReportingAllOrganizationsScreen"

export default function Reporting() {
  return (
    <>
      <ReportingAllOrganizationsScreen />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}
