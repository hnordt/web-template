import React from "react"
import { PieChart, Pie, Cell, Legend } from "recharts"

const data = [
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

const Chart = (props) => (
  <div>
    <span>
      <h1>{props.title}</h1>
    </span>
    <PieChart width={500} height={400} className="leading-10">
      <Legend
        height="50%"
        width="45%"
        layout="vertical"
        align="right"
        verticalAlign="middle"
        iconType="circle"
        iconSize={11}
      />

      <Pie
        data={props.data}
        cx="50%"
        cy="45%"
        innerRadius={80}
        outerRadius={100}
        dataKey={props.dataKey}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  </div>
)

export default function Index() {
  return (
    <main>
      <Chart data={data} dataKey="value" title="Top 5 users" />
    </main>
  )
}
