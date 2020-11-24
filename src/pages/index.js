import React, { PureComponent } from "react"
import { RadialBarChart, RadialBar, Legend } from "recharts"

const data = [
  {
    uv: 60,
    fill: "#8884d8",
  },
]

export default class Example extends PureComponent {
  render() {
    return (
      <div className="w-full max-w-md">
        <RadialBarChart
          width={500}
          height={300}
          cx={150}
          cy={150}
          innerRadius="80%"
          barSize={13}
          data={data}
        >
          <RadialBar minAngle={20} clockWise dataKey="uv" background={100} />
        </RadialBarChart>
      </div>
    )
  }
}
