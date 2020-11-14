import React from "react"

export default function TextArea(props) {
  return (
    <label>
      {props.label && (
        <span className="text-gray-700 text-base">{props.label}</span>
      )}
      <textarea
        className="form-textarea block mt-1 w-full"
        name={props.name}
        rows={props.rows ?? 3}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
    </label>
  )
}
