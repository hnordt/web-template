import React from "react"

export default function NonIdealState(props) {
  return (
    <div>
      <div>
        {props.icon && (
          <div className="flex items-center justify-center mb-3 mx-auto w-12 h-12 bg-green-100 rounded-full sm:mb-5">
            {React.createElement(props.icon, {
              className: "w-6 h-6 text-green-600",
            })}
          </div>
        )}
        <div className="text-center">
          <h3 className="text-gray-900 text-lg font-medium" id="modal-headline">
            {props.title}
          </h3>
          <div className="mt-2">
            <p className="text-gray-500 text-sm">{props.description}</p>
          </div>
        </div>
      </div>
      {props.action && (
        <div className="flex items-center justify-center mt-5 sm:mt-6">
          {props.action}
        </div>
      )}
    </div>
  )
}
