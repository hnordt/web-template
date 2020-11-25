import React from "react"

export default function NewReportLayout() {
  return (
    <div className="flex w-1/2 border rounded-xl shadow-xl">
      <div className="m-5 mt-6 w-20 h-20 bg-blue-100 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="32"
          viewBox="0 -1 23 24"
          width="32"
          className="mt-5 mx-auto text-blue-500 fill-current"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 2l-5.5 9h11z" />
          <circle cx="17.5" cy="17.5" r="4.5" />
          <path d="M3 13.5h8v8H3z" />
        </svg>
      </div>
      <div className="py-8">
        <span className="block mb-3 text-xl">Categories</span>
        <span className="px-6 py-0.5 text-gray-700 text-xl bg-gray-200 rounded-md">
          P2P & Illegal
        </span>
      </div>
    </div>
  )
}
