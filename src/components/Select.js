import React from "react"

export default function Select(props) {
  return (
    <label className="block">
      {props.label && (
        <span className="block mb-1 text-gray-700 text-base">
          {props.label}
        </span>
      )}
      <select
        className="form-select block w-full"
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
      >
        {props.children}
      </select>
    </label>
  )
}
