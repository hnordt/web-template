import React from "react"
import { RadioGroupContext } from "components/RadioGroup"

export default function Radio(props) {
  const radioGroupContext = React.useContext(RadioGroupContext)

  return (
    <label className="block">
      <span className="flex items-center">
        <input
          className="form-radio"
          type="radio"
          name={props.name ?? radioGroupContext.name}
          value={props.value}
          checked={props.checked ?? props.value === radioGroupContext.value}
          onChange={(e) =>
            (props.onChange ?? radioGroupContext.onChange)?.(
              e.target.value,
              e.target.checked
            )
          }
        />
        <span className="ml-2 text-gray-900 text-base">{props.label}</span>
      </span>
    </label>
  )
}
