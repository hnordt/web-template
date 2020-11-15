import React from "react"

export default function Input(props) {
  return (
    <label className="block">
      {props.label && (
        <span className="block mb-1 text-gray-700 text-base">
          {props.label}
        </span>
      )}
      <input
        className="form-input block w-full"
        type={props.type}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
    </label>
  )
}
