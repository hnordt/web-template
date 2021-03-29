import React from "react"

function Select(props, ref) {
  const { label, options, ...rest } = props

  return (
    <label className="block">
      {label && (
        <span className="block mb-1 text-gray-700 text-base">{label}</span>
      )}
      <select
        {...rest}
        ref={ref}
        className="block px-3 py-2 w-full bg-white border focus:border-blue-500 border-gray-300 rounded-md focus:outline-none shadow-sm focus:ring-blue-500 sm:text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default React.forwardRef(Select)
