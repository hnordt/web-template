import React from "react"

export default function CheckboxGroup(props) {
  return (
    <div>
      {props.label && (
        <span className="inline-block mb-2 text-gray-700">{props.label}</span>
      )}
      <div className={props.inline ? "space-x-6" : "flex flex-col"}>
        {props.children}
      </div>
    </div>
  )
}
