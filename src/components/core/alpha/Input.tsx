import React from "react"
import cn from "classnames"

// TODO
type InputProps = any

// TODO: any
export default React.forwardRef<any, InputProps>(function Input(props, ref) {
  const { leftIcon, ...rest } = props

  return (
    <div className="relative rounded-md shadow-sm">
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
      />
    </div>
  )
})
