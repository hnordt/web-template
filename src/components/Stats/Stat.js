import React from "react"

const Stat = (props) => (
  <div className="mb-8 pr-3 text-center grid border w-40 h-20 justify-items-end">
    <span variant="primary">{props.value}</span>
    <span>{props.label}</span>
  </div>
)

export default Stat
