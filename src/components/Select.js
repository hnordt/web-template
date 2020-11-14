import React from "react"

export default function Select(props) {
  return (
    <label>
      <span className="text-gray-700">{props.label}</span>
      <select
        className="form-select block mt-1 w-full"
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
    </label>
  )
}
