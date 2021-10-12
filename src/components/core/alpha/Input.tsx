import React from "react"
import { useId } from "@reach/auto-id"
import cn from "classnames"

// TODO
type InputProps = any

// TODO: any
export default React.forwardRef<any, InputProps>(function Input(props, ref) {
  const { label, leftIcon, help, ...rest } = props
  const id = useId(rest.id)

  return (
    <div>
      {label && (
        <label
          className="block mb-1 text-gray-700 text-sm font-medium"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className={cn("relative rounded-md shadow-sm", props.className)}>
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {React.createElement(leftIcon, {
              "className": "w-5 h-5 text-gray-400",
              "aria-hidden": true,
            })}
          </div>
        )}
        <input
          {...rest}
          ref={ref}
          className={cn(
            "block w-full focus:border-blue-500 border-gray-300 rounded-md focus:ring-blue-500 sm:text-sm",
            leftIcon && "pl-10"
          )}
          id={id}
        />
      </div>
      {help && <p className="mt-1.5 text-gray-500 text-sm">{help}</p>}
    </div>
  )
})
