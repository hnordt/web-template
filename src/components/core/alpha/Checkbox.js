import React from "react"
import { useId } from "@reach/auto-id"

const Checkbox = React.forwardRef(function Checkbox(props, ref) {
  const id = useId(props.id)

  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          checked={props.value}
          onChange={props.onChange}
        />
      </div>
      <div className="ml-3 text-sm">
        <label className="text-gray-700 font-medium" htmlFor={id}>
          {props.label}
        </label>
        {props.hint && <p className="text-gray-500">{props.hint}</p>}
      </div>
    </div>
  )
})

export default Checkbox
