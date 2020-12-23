import React from "react"
import { ReactQueryDevtools } from "react-query/devtools"
import ReportingAllOrganizationsScreen from "screens/ReportingAllOrganizationsScreen"

export default function Reporting() {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    function handleMessage(e) {
      if (e.data.token) {
        localStorage.setItem("token", e.data.token)
        setReady(true)
      }
    }

    window.addEventListener("message", handleMessage, false)

    return () => window.removeEventListener("message", handleMessage, false)
  }, [])

  if (!ready) {
    return null
  }

  return (
    <>
      <ReportingAllOrganizationsScreen />
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </>
  )
}
