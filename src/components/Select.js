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
        className="block px-3 py-2 w-full bg-white border border-gray-300 focus:border-indigo-500 rounded-md focus:outline-none shadow-sm focus:ring-indigo-500 sm:text-sm"
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
