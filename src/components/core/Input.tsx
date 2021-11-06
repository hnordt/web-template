import React from "react"
import { ExclamationCircleIcon } from "@heroicons/react/solid"
import cx from "classnames"
import omit from "lodash/fp/omit"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref
) {
  return (
    <div className="relative rounded-md shadow-sm">
      <input
        {...omit("error", props)}
        ref={ref}
        className={cx(
          "block w-full rounded-md sm:text-sm",
          props.error
            ? "placeholder-red-300 pr-10 text-red-900 border-red-300 focus:border-red-500 focus:ring-red-500"
            : "focus:ring-blue-500 focus:border-blue-500 border-gray-300",
          props.className
        )}
      />
      {props.error && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ExclamationCircleIcon className="w-5 h-5 text-red-500" aria-hidden />
        </div>
      )}
    </div>
  )
})

export default Input
