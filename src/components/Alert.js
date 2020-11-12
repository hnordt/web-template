import React from "react"
import cn from "classnames"
import { BsX } from "react-icons/bs"

export default function Alert(props) {
  return (
    <div
      className={cn("rounded-md p-4", {
        "bg-yellow-50 border-l-4 border-yellow-400 p-4":
          props.variant === "warning",
        "bg-green-50": props.variant === "success",
        "bg-blue-100": props.variant === "secondary",
        "bg-red-50": props.variant === "danger",
      })}
    >
      <div className="flex">
        <div
          className={cn("flex-shrink-0", {
            "text-green-600": props.variant === "success",
            "text-blue-500": props.variant === "secondary",
            "text-yellow-400": props.variant === "warning",
            "text-red-600": props.variant === "danger",
          })}
        >
          {props.icon &&
            React.createElement(props.icon, {
              className: "w-4 h-4",
            })}
        </div>
        <div className="ml-3">
          <h3
            className={cn("text-sm leading-5 font-medium", {
              "text-green-800": props.variant === "success",
              "text-yellow-800": props.variant === "warning",
              "text-blue-800": props.variant === "secondary",
              "text-red-800": props.variant === "danger",
            })}
          >
            {props.title}
          </h3>
          <div
            className={cn("mt-2 text-sm leading-5", {
              "text-green-500": props.variant === "success",
              "text-yellow-500": props.variant === "warning",
              "text-blue-500": props.variant === "secondary",
              "text-red-500": props.variant === "danger",
            })}
          >
            <p>{props.description}</p>
          </div>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 my-1.5">
            <button
              className={cn(
                "inline-flex rounded-md p-2 transition ease-in-out duration-150 ml-auto",
                {
                  "text-green-500 hover:bg-green-100 focus:outline-none focus:bg-green-100":
                    props.variant === "success",
                  "text-blue-500 hover:bg-blue-200 focus:outline-none focus:bg-blue-100":
                    props.variant === "secondary",
                  "text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:bg-yellow-100":
                    props.variant === "warning",
                  "text-red-500 hover:bg-red-100 focus:outline-none focus:bg-red-100":
                    props.variant === "danger",
                }
              )}
            >
              <BsX />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
