import React from "react"

export default function Input(props) {
  return (
    <label>
      {props.label && (
        <span className="text-gray-700 text-base">{props.label}</span>
      )}
      <input
        className="form-input block mt-1 w-full"
        type={props.type}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
    </label>
  )
}
