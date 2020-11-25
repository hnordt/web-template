import React from "react"

export default function Checkbox(props) {
  return (
    <label className="block">
      <span className="flex items-center">
        <input
          className="form-checkbox"
          type="checkbox"
          name={props.name}
          value={props.value}
          checked={props.checked}
          onChange={(e) => props.onChange?.(e.target.value, e.target.checked)}
        />
        <span className="ml-2 text-gray-900 text-base">{props.label}</span>
      </span>
    </label>
  )
}
