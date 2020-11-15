import React from "react"

export default function TextArea(props) {
  return (
    <label className="block">
      {props.label && (
        <span className="block mb-1 text-gray-700 text-base">
          {props.label}
        </span>
      )}
      <textarea
        className="form-textarea block w-full"
        name={props.name}
        rows={props.rows ?? 3}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
    </label>
  )
}
