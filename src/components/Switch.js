import React from "react"

export default function Switch(props) {
  return (
    <div>
      <span
        className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline"
        onClick={() => props.onChange?.(!props.on)}
        role="checkbox"
        tabIndex={0}
        aria-checked="false"
      >
        <span
          aria-hidden="true"
          className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"
        />
      </span>
    </div>
  )
}
