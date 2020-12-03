import React from "react"

export default function Checkbox(props) {
  return (
    <label className="block">
      <span className="flex items-center">
        <input
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
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
