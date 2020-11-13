import React from "react"

export function NonIdealState(props) {
  return (
    <div className="text-center">
      <span className="inline-block align-middle h-screen" />
      <div
        className="inline-block sm:p-6 sm:max-w-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="flex items-center justify-center mx-auto w-12 h-12">
          {props.icon &&
            React.createElement(props.icon, {
              className: "w-12 h-12 text-gray-500",
            })}
        </div>
        <div className="mt-3 text-center sm:mt-5">
          <h3 className="text-gray-900 text-2xl leading-6" id="modal-headline">
            {props.title}
          </h3>
          <div className="mt-4">
            <p className="text-gray-500 text-base font-light leading-5">
              {props.description}
            </p>
          </div>
        </div>
        <div className="mt-4 sm:mt-5">
          <span className="flex">
            <button
              type="button"
              className="inline-flex justify-center mx-auto px-4 py-2 w-full text-white text-base font-medium leading-6 hover:bg-indigo-500 bg-indigo-600 border focus:border-indigo-700 border-transparent rounded-md focus:outline-none focus:shadow-outline-indigo shadow-sm transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            >
              {props.action}
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}
