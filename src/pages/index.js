import React from "react"
import { Transition } from "@headlessui/react"

export default function Drawer(props) {
  const [isClosed, setClosed] = React.useState(false)

  return (
    <div className="flex bg-gray-100">
      <Transition
        show={!isClosed}
        enter="transition-all duration-500"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition-all duration-500"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <section
              className="absolute inset-y-0 right-0 flex pl-10 max-w-full"
              aria-labelledby="slide-over-heading"
            >
              <div className="w-screen max-w-md">
                <div className="flex flex-col py-6 h-full bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2
                        id="slide-over-heading"
                        className="text-gray-900 text-lg font-medium"
                      >
                        {props.title}
                      </h2>
                      <div className="flex items-center ml-3 h-7">
                        <button
                          onClick={() => setClosed(true)}
                          title="Close"
                          className="text-gray-400 hover:text-gray-500 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2"
                        >
                          <span className="sr-only">Close panel</span>
                          {/* Heroicon name: x */}
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex-1 mt-6 px-4 sm:px-6">
                    {/* Replace with your content */}
                    <div className="absolute inset-0 px-4 sm:px-6">
                      <div
                        className="h-full border-2 border-dashed border-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                    {/* /End replace */}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Transition>
      {isClosed ? (
        <button
          className="p-2"
          title="Open Menu"
          onClick={() => setClosed(false)}
        >
          Open
        </button>
      ) : (
        <button
          className="p-2"
          title="Close Menu"
          onClick={() => setClosed(true)}
        >
          Closed
        </button>
      )}
    </div>
  )
}
