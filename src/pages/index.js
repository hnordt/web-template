import React from "react"
import { BsSearch } from "react-icons/bs"

export default function Index() {
  function NonIdealState(props) {
    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center pb-20 pt-4 px-4 min-h-screen text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75" />
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
          ​
          <div
            className="inline-block align-bottom pb-4 pt-5 px-4 text-left bg-white rounded-lg shadow-xl overflow-hidden transform transition-all sm:align-middle sm:my-8 sm:p-6 sm:w-full sm:max-w-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div>
              <div className="flex items-center justify-center mx-auto w-12 h-12">
                {props.icon &&
                  React.createElement(props.icon, {
                    className: "w-10 h-10 text-gray-500",
                  })}
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3
                  className="text-gray-900 text-lg font-medium leading-6"
                  id="modal-headline"
                >
                  {props.title}
                </h3>
                <div className="mt-2">
                  <p className="text-gray-500 text-sm leading-5">
                    {props.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <span className="flex w-full rounded-md shadow-sm">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 w-full text-white text-base font-medium leading-6 hover:bg-indigo-500 bg-indigo-600 border focus:border-indigo-700 border-transparent rounded-md focus:outline-none focus:shadow-outline-indigo shadow-sm transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                >
                  {props.action}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <NonIdealState
      icon={BsSearch}
      title="No search results"
      description="..."
      action="Botao"
    />
  )
}
