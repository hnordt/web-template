import React from "react"
import Toolbar from "components/Toolbar"

export default function Card(props) {
  return (
    <div className="overflow-hidden border-b border-gray-200 rounded-lg shadow">
      {props.title && (
        <div className="px-6 py-5 bg-white border-b border-gray-200 h-20 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {props.title}
            </h3>
            {props.description && (
              <p className="mt-1 text-sm leading-5 text-gray-500">
                {props.description}
              </p>
            )}
          </div>
          {props.actions && <Toolbar>{props.actions}</Toolbar>}
        </div>
      )}
      {props.children}
    </div>
  )
}
