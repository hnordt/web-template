import React from "react"

export default function Radio(props) {
  return (
    <label className="block">
      <span className="flex items-center">
        <input
          className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
          type="radio"
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
