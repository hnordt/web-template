import React from "react"

function Categories() {
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

function SecurityThreats() {
  return (
    <div className="flex w-1/2 border rounded-xl shadow-xl">
      <div className="m-5 mt-5 w-20 h-20 bg-red-100 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          width="30"
          height="30"
          viewBox="-0.5 -0.5 24 24"
          className="mt-6 mx-auto text-green-600 fill-current"
        >
          <path
            fill="red"
            d="M12,2A9,9 0 0,0 3,11C3,14.03 4.53,16.82 7,18.47V22H9V19H11V22H13V19H15V22H17V18.46C19.47,16.81 21,14 21,11A9,9 0 0,0 12,2M8,11A2,2 0 0,1 10,13A2,2 0 0,1 8,15A2,2 0 0,1 6,13A2,2 0 0,1 8,11M16,11A2,2 0 0,1 18,13A2,2 0 0,1 16,15A2,2 0 0,1 14,13A2,2 0 0,1 16,11M12,14L13.5,17H10.5L12,14Z"
          />
        </svg>
      </div>
      <div className="py-8">
        <span className="block mb-1 text-xl">Security Threats</span>
        <span className="text-gray-400 text-lg">
          No security threats found for bittorrent.com
        </span>
      </div>
    </div>
  )
}

export default function Index() {
  return (
    <>
      <Categories />
      <SecurityThreats />
    </>
  )
}
