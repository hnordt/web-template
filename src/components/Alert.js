import React from "react"
import { RiAlertLine } from "react-icons/ri"

export default function Alert(props) {
  return (
    <div className="p-4 bg-yellow-50 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <RiAlertLine className="w-5 h-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-yellow-800 text-sm font-medium">{props.title}</h3>
          <div className="mt-2 text-yellow-700 text-sm">
            <p>{props.description}</p>
          </div>
          {props.actions && (
            <div className="mt-4">
              <div className="flex -mx-2 -my-1.5 space-x-3">
                {props.actions.map((action) => (
                  <button
                    key={btoa(action.label)}
                    className="px-2 py-1.5 text-yellow-700 text-sm font-medium leading-5 hover:bg-yellow-100 focus:bg-yellow-100 rounded-md focus:outline-none transition duration-150 ease-in-out"
                    onClick={action.onClick}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
