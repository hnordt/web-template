import React from "react"
import { Chart } from "../components/Chart"

export const data = [
  {
    name: "Group A",
    value: 500,
  },
  {
    name: "Group B",
    value: 800,
  },
  {
    name: "Group C",
    value: 600,
  },
  {
    name: "Group D",
    value: 200,
  },
]
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function Index() {
  return (
    <main>
      <Chart data={data} dataKey="value" title="Top 5 users" COLORS={COLORS} />
    </main>
  )
}
