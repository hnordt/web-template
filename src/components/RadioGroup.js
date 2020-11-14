import React from "react"

export const RadioGroupContext = React.createContext()

export default function RadioGroup(props) {
  return (
    <div>
      {props.label && (
        <span className="inline-block mb-2 text-gray-700">{props.label}</span>
      )}
      <div className={props.inline ? "space-x-6" : "flex flex-col"}>
        <RadioGroupContext.Provider
          value={{
            name: props.name,
            value: props.value,
            onChange: props.onChange,
          }}
        >
          {props.children}
        </RadioGroupContext.Provider>
      </div>
    </div>
  )
}
