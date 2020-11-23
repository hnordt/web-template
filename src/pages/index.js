import React, { PureComponent } from "react"
import { RadialBarChart, RadialBar, Legend } from "recharts"

const data = [
  {
    uv: 60,
    fill: "#8884d8",
  },
  {
    uv: 20,
    fill: "#bbb",
  },
]

const style = {
  lineHeight: "35px",
}

export default class Example extends PureComponent {
  render() {
    return (
      <div className="border">
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
