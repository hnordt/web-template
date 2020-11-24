import React from "react"
import { RiKnifeBloodFill } from "react-icons/ri"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const data = [
  {
    date: "SEP 10",
    name: "Page A",
    Requests: 4500,
    OtherThing: 3400,
    OneMoreThing: 2400,
  },
  {
    date: "SEP 11",
    name: "Page B",
    Requests: 3000,
    OtherThing: 1398,
    OneMoreThing: 3210,
  },
  {
    date: "SEP 12",
    name: "Page C",
    Requests: 2000,
    OtherThing: 9800,
    OneMoreThing: 7290,
  },
  {
    date: "SEP 13",
    name: "Page D",
    Requests: 2780,
    OtherThing: 3908,
    OneMoreThing: 3000,
  },
  {
    date: "SEP 14",
    name: "Page E",
    Requests: 1890,
    OtherThing: 4800,
    OneMoreThing: 2181,
  },
  {
    date: "SEP 15",
    name: "Page F",
    Requests: 6390,
    OtherThing: 4000,
    OneMoreThing: 2500,
  },
  {
    date: "SEP 16",
    name: "Page G",
    Requests: 3490,
    OtherThing: 4300,
    OneMoreThing: 2100,
    eixoY: [0, 10000],
  },
]

const toolTipStyle = {
  font: "bold",
}

function LineChartJS(props) {
  return (
    <div className="w-full max-w-md">
      <LineChart
        width={1500}
        height={500}
        data={props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={{
            stroke: "#D3D3D3",
            strokeWidth: 2,
          }}
          tickMargin={8}
        />
        <YAxis
          dataKey="eixoY"
          tickLine={{
            stroke: "black",
            strokeWidth: 1.5,
          }}
          axisLine={{
            stroke: "#D3D3D3",
            strokeWidth: 2,
          }}
          type="number"
          scale="linear"
          tickMargin={10}
        />
        <Tooltip itemStyle={toolTipStyle} />
        <Line
          type="monotone"
          dataKey="OtherThing"
          stroke="#18F"
          strokeWidth={2}
          activeDot={{
            r: 6,
          }}
        />
        <Line
          type="monotone"
          dataKey="Requests"
          stroke="orange"
          strokeWidth={2}
          activeDot={{
            r: 6,
          }}
        />
        <Line
          type="monotone"
          dataKey="OneMoreThing"
          stroke="red"
          strokeWidth={2}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </div>
  )
}

export default function Index() {
  return (
    <div>
      <LineChartJS data={data} />
    </div>
  )
}
