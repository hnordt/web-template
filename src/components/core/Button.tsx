import React from "react"
import cn from "classnames"
import Loader from "components/core/Loader"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "danger"
  icon?: React.FunctionComponent<{ className: string }>
  fill?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props,
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium border rounded-md focus:outline-none shadow-sm focus:ring-blue-500 focus:ring-offset-2 focus:ring-2 whitespace-nowrap",
        props.variant === "primary" && [
          "text-white bg-blue-600 border-transparent",
          !(props.loading || props.disabled) && "hover:bg-blue-700",
        ],
        props.variant === "secondary" && [
          "text-gray-700 bg-white border-gray-300",
          !(props.loading || props.disabled) && "hover:bg-gray-50",
        ],
        props.variant === "danger" && [
          "text-white bg-red-600 border-transparent",
          !(props.loading || props.disabled) && "hover:bg-red-700",
        ],
        props.fill && "w-full",
        (props.loading || props.disabled) && "cursor-auto",
        props.disabled && "opacity-75"
      )}
      type={props.type ?? "button"}
      disabled={props.loading || props.disabled}
      onClick={props.onClick}
    >
      {props.icon && (
        <props.icon
          className={cn(
            "w-5 h-5",
            props.loading && "invisible",
            props.children && "mr-2"
          )}
        />
      )}
      <span className={props.loading ? "invisible" : undefined}>
        {props.children}
      </span>
      {props.loading && (
        <span className="absolute inset-0 grid place-items-center">
          <Loader
            variant={props.variant === "secondary" ? "dark" : "light"}
            size="sm"
          />
        </span>
      )}
    </button>
  )
})

export default Button
