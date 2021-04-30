import React from "react"

function Checkbox(props, ref) {
  const { label, ...rest } = props

  return (
    <label className="block">
      <span className="flex items-center">
        <input
          {...rest}
          ref={ref}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          type="checkbox"
        />
        <span className="ml-2 text-gray-900 text-base">{label}</span>
      </span>
    </label>
  )
}

export default React.forwardRef(Checkbox)
