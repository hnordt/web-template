import React from "react"
import {
  BsExclamationTriangleFill,
  BsCheckCircle,
  BsInfoCircleFill,
  BsXCircleFill,
} from "react-icons/bs"
import cn from "classnames"

export default function Index() {
  function Alerts(props) {
    return <div>{props.children}</div>
  }

  function Alert(props) {
    return (
      <div
        className={cn("rounded-md p-4", {
          "bg-yellow-50": props.variant === "warning",
          "bg-green-50": props.variant === "success",
          "bg-gray-100": props.variant === "secondary",
          "bg-red-50": props.variant === "danger",
        })}
      >
        <div className="flex">
          <div
            className={cn("flex-shrink-0", {
              "text-green-600": props.variant === "success",
              "text-gray-500": props.variant === "secondary",
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
                "text-gray-800": props.variant === "secondary",
                "text-red-800": props.variant === "danger",
              })}
            >
              {props.children}
            </h3>
            <div
              className={cn("mt-2 text-sm leading-5", {
                "text-green-500": props.variant === "success",
                "text-yellow-500": props.variant === "warning",
                "text-gray-500": props.variant === "secondary",
                "text-red-500": props.variant === "danger",
              })}
            >
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                pariatur, ipsum similique veniam quo totam eius aperiam dolorum.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Alerts>
      <Alert variant="success" icon={BsCheckCircle}>
        Request completed
      </Alert>
      <br />
      <Alert variant="secondary" icon={BsInfoCircleFill}>
        Check your request
      </Alert>
      <br />
      <Alert variant="warning" icon={BsExclamationTriangleFill}>
        Some fattention
      </Alert>
      <br />
      <Alert variant="danger" icon={BsXCircleFill}>
        Your request failed
      </Alert>
    </Alerts>
  )
}
