import React from "react"

function Input(props, ref) {
  const { label, rightAddon, ...rest } = props

  return (
    <>
      <label className="block">
        {label && (
          <span className="block mb-1 text-gray-700 text-base">{label}</span>
        )}
        <div className="flex border focus-within:border-blue-500 border-gray-300 rounded-md shadow-sm overflow-hidden focus-within:ring-blue-500 focus-within:ring-1">
          <div className="flex flex-grow">
            <input
              {...rest}
              ref={ref}
              className="block w-full border-none focus:ring-0 sm:text-sm"
            />
          </div>
          {rightAddon && (
            <span className="pr-4 py-2 text-gray-500 sm:text-sm">
              {rightAddon}
            </span>
          )}
        </div>
      </label>
    </>
  )
}

export default React.forwardRef(Input)
