import React from "react"
import Stats from "components/Stats"
import Stat from "components/Stat"

export default function Index() {
  return (
    <main className="p-6">
      <Stats>
        <Stat variant="primary" label="Allowed requests" value="900K" />
        <Stat variant="secondary" label="Total requests" value="2M" />
        <Stat variant="warning" label="Blocked requests" value="75K" />
        <Stat variant="danger" label="Threats" value="25K" />
      </Stats>
    </main>
  )
}
