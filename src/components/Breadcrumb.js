import React from "react"
import classNames from "classnames"

export default function Breadcrumb(props) {
  return (
    <ol className="flex inline items-center space-x-2 ml-2">
      <li>
        <div>
          <a
            href="#"
            className="text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
          >
            <span
              className={classNames("", {
                "font-bold": props.current === true,
                "text-black": props.current === true,
              })}
            >
              {props.children}
            </span>
          </a>
        </div>
      </li>
      <li>
        <div id="arrow" className="flex items-center space-x-4">
          <svg
            className="flex-shrink-0 h-5 w-5 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </li>
    </ol>
  )
}
