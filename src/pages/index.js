import React from "react"
import { MdFlag, MdDevices, MdGroupWork } from "react-icons/md"

function Categories() {
  return (
    <div className="flex w-1/2 border rounded-xl shadow-xl">
      <div className="m-5 mt-6 w-20 h-20 bg-blue-100 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="mt-6 mx-auto w-7 h-7 text-blue-500 fill-current"
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
          viewBox="-0.5 -1.5 24 24"
          className="mt-6 mx-auto w-7 h-7 text-green-600 fill-current"
        >
          <path
            fill="red"
            d="M12,2A9,9 0 0,0 3,11C3,14.03 4.53,16.82 7,18.47V22H9V19H11V22H13V19H15V22H17V18.46C19.47,16.81 21,14 21,11A9,9 0 0,0 12,2M8,11A2,2 0 0,1 10,13A2,2 0 0,1 8,15A2,2 0 0,1 6,13A2,2 0 0,1 8,11M16,11A2,2 0 0,1 18,13A2,2 0 0,1 16,15A2,2 0 0,1 14,13A2,2 0 0,1 16,11M12,14L13.5,17H10.5L12,14Z"
          />
        </svg>
      </div>
      <div className="py-8">
        <span className="block text-xl">Security Threats</span>
        <span className="text-gray-400 text-lg">
          No security threats found for bittorrent.com
        </span>
      </div>
    </div>
  )
}

function Infos() {
  return (
    <div className="grid grid-cols-4">
      {/* Created Date */}

      <div className="flex w-screen border-t rounded-xl">
        <div className="ml-5 mr-2.5 mt-5 w-16 h-16 bg-blue-100 rounded-full">
          {/* ÍCONE */}
        </div>
        <div className="py-8">
          <span className="block text-gray-500 text-sm font-normal">
            Created Date
          </span>
          <span className="text-gray-900 text-sm font-bold">Set 10, 2019</span>
        </div>
      </div>

      {/* Last Active */}

      <div className="relative flex w-screen border-t rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="21"
          viewBox="0 0 24 24"
          width="21"
          className="absolute left-16 top-5 p-1 text-green-500 bg-green-300 bg-opacity-30 rounded-full fill-current"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
        <div className="ml-5 mr-2.5 mt-5 p-0.5 w-16 h-16 bg-blue-100 rounded-full">
          <MdFlag className="mx-auto my-4 w-7 h-7 text-blue-500" />
        </div>
        <div className="py-8">
          <span className="block text-gray-500 text-sm font-normal">
            Last Active
          </span>
          <div>
            <span className="text-gray-900 text-sm font-bold">
              Aug 11, 2020
            </span>
            <span className="ml-2 px-3 py-1 text-green-500 text-xs font-bold bg-green-100 rounded-xl">
              ACTIVE NOW
            </span>
          </div>
        </div>
      </div>

      {/* Roaming Client */}

      <div className="flex w-screen border-t rounded-xl">
        <div className="ml-5 mr-2.5 mt-5 w-16 h-16 bg-blue-100 rounded-full">
          <MdDevices className="mx-auto my-4 w-7 h-7 text-blue-500" />
        </div>
        <div className="py-8">
          <span className="block text-gray-500 text-sm font-normal">
            Created Date
          </span>
          <span className="text-gray-900 text-sm font-bold">LAPTOP-0001</span>
        </div>
      </div>

      {/* Collection */}

      <div className="flex w-screen border-t rounded-xl">
        <div className="ml-5 mr-2.5 mt-5 w-16 h-16 bg-blue-100 rounded-full">
          <MdGroupWork className="mx-auto my-3 w-10 h-10 text-blue-500" />
        </div>
        <div className="py-8">
          <span className="block text-gray-500 text-sm font-normal">
            Collection
          </span>
          <span className="text-gray-900 text-sm font-bold">Marketing</span>
        </div>
      </div>
    </div>
  )
}

export default function Index() {
  return (
    <>
      <Categories />
      <SecurityThreats />
      <Infos />
    </>
  )
}
