import React from "react"
import { ReactQueryDevtools } from "react-query/devtools"
import ReportingAllOrganizationsScreen from "screens/ReportingAllOrganizationsScreen"

export default function Reporting() {
  return (
    <>
      <ReportingAllOrganizationsScreen />
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  )
}
