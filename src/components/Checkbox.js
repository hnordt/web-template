import React from "react"
import { CheckboxGroupContext } from "components/CheckboxGroup"

export default function Checkbox(props) {
  const checkboxGroupContext = React.useContext(CheckboxGroupContext)

  return (
    <label className="block">
      <span className="flex items-center">
        <input
          className="form-checkbox"
          type="checkbox"
          name={props.name ?? checkboxGroupContext.name}
          value={props.value}
          checked={
            props.checked ?? checkboxGroupContext.value.includes(props.value)
          }
          onChange={(e) => {
            if (props.onChange) {
              return props.onChange(e.target.value, e.target.checked)
            }

            checkboxGroupContext.onChange?.(
              checkboxGroupContext.value.includes(props.value)
                ? checkboxGroupContext.value.filter(
                    (value) => value !== props.value
                  )
                : [...checkboxGroupContext.value, e.target.value]
            )
          }}
        />
        <span className="ml-2 text-gray-900 text-base">{props.label}</span>
      </span>
    </label>
  )
}
