import React from "react"
import { cn } from "@smalldots/toolkit"
import Icon from "components/Icon"
import Spinner from "components/Spinner"

let Button = React.forwardRef(function Button(props, ref) {
  return (
    <button
      ref={ref}
      type={props.type ?? "button"}
      className={cn(
        "flex inline-flex justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out border rounded-md shadow-sm focus:outline-none",
        props.variant === "secondary" &&
          "text-gray-700 bg-white border-gray-300 hover:text-gray-500 focus:border-blue-300 focus:shadow-outline",
        props.variant === "danger" &&
          "bg-red-600 border-transparent hover:bg-red-500 focus:border-red-700 focus:shadow-outline-red",
        props.loading && "cursor-auto"
      )}
      disabled={props.loading}
      onClick={props.onClick}
    >
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          {props.icon && <Icon name={props.icon} />}
          {props.children}
        </>
      )}
    </button>
  )
})

export default Button
