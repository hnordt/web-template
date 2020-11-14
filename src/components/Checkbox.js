import React from "react"
import { CheckboxGroupContext } from "components/CheckboxGroup"

export default function Checkbox(props) {
  const checkboxGroupContext = React.useContext(CheckboxGroupContext)

  return (
    <label>
      <span className="flex items-center">
        <input
          className="form-checkbox"
          type="checkbox"
          name={props.name ?? checkboxGroupContext.name}
          value={props.value}
          checked={props.checked ?? props.value === checkboxGroupContext.value}
          onChange={(e) =>
            (props.onChange ?? checkboxGroupContext.onChange)?.(
              e.target.value,
              e.target.checked
            )
          }
        />
        <span className="ml-2 text-gray-900">{props.label}</span>
      </span>
    </label>
  )
}
