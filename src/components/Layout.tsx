import React from "react"

export default function Layout(props) {
  return (
    <main className="px-6 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900 text-2xl font-bold">
                {props.title}
              </h1>
              {props.description && (
                <p className="text-gray-500 text-sm">{props.description}</p>
              )}
            </div>
            {props.actions?.map((action) => (
              <button
                key={action.label}
                className="inline-flex items-center px-4 py-2 text-white text-sm font-medium bg-green-600 hover:bg-green-700 border border-transparent rounded-md focus:outline-none shadow-sm focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                type="button"
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block align-middle py-2 min-w-full sm:px-6 lg:px-8">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
