import React from "react"

export const CheckboxGroupContext = React.createContext()

export default function CheckboxGroup(props) {
  return (
    <div>
      {props.label && (
        <span className="inline-block mb-2 text-gray-700">{props.label}</span>
      )}
      <div className={props.inline ? "space-x-6" : "flex flex-col"}>
        <CheckboxGroupContext.Provider
          value={{
            name: props.name,
            value: props.value,
            onChange: props.onChange,
          }}
        >
          {props.children}
        </CheckboxGroupContext.Provider>
      </div>
    </div>
  )
}
