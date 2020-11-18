import React from "react"
import { PieChart, Pie, Cell, Legend } from "recharts"
import { BsPersonFill } from "react-icons/bs"

export const Chart = (props) => (
  <div className="align-middle w-1/4 text-center">
    <h1 className="relative top-48 -ml-2 w-24 transform -rotate-90">
      {props.title}
    </h1>
    <BsPersonFill
      size={40}
      color="gray"
      className="absolute left-36 top-44 place-self-center ml-3 mt-1"
    />
    <PieChart width={490} height={400} className="leading-10">
      <Legend
        height="50%"
        width="38%"
        layout="vertical"
        align="right"
        verticalAlign="middle"
        iconType="circle"
        iconSize={11}
      />

      <Pie
        data={props.data}
        cx="58%"
        cy="45%"
        innerRadius={80}
        outerRadius={100}
        dataKey={props.dataKey}
      >
        {props.data.map((_, index) => (
          <Cell
            key={`cell-${index}`}
            fill={props.COLORS[index % props.COLORS.length]}
          />
        ))}
      </Pie>
    </PieChart>
  </div>
)
