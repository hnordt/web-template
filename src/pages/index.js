import React from "react"
import {
  MdFlag,
  MdDevices,
  MdGroupWork,
  MdDesktopWindows,
  MdSync,
  MdLanguage,
  MdKeyboardArrowLeft,
  MdSearch,
  MdKeyboardArrowRight,
  MdLink,
} from "react-icons/md"
import { PieChart, Pie, Cell, Legend } from "recharts"

import { IoIosPerson } from "react-icons/io"

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
    <div className="grid grid-cols-4 border rounded-xl shadow-xl">
      {/* Created Date */}

      <div className="flex">
        <div className="ml-5 mr-2.5 mt-5 w-16 h-16 bg-blue-100 rounded-full">
          <IoIosPerson className="mx-auto my-4 w-7 h-7 text-blue-500" />
        </div>
        <div className="py-8">
          <span className="block text-gray-500 text-sm font-normal">
            Created Date
          </span>
          <span className="text-gray-900 text-sm font-bold">Set 10, 2019</span>
        </div>
      </div>

      {/* Last Active */}

      <div className="relative flex">
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

      <div className="flex">
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

      <div className="flex">
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

function DeviceInfos() {
  return (
    <div className="grid grid-cols-4 border rounded-xl shadow-xl">
      {/* Last Active */}

      <div className="relative flex">
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
          <MdSync className="mx-auto my-4 w-7 h-7 text-blue-500" />
        </div>
        <div className="py-8">
          <span className="block text-gray-500 text-sm font-normal">
            Last Sync
          </span>
          <div>
            <span className="text-gray-900 text-sm font-bold">
              07/07/2020 08:51 EST
            </span>
            <span className="ml-2 px-3 py-1 text-green-500 text-xs font-bold bg-green-100 rounded-xl">
              ACTIVE NOW
            </span>
          </div>
        </div>
      </div>

      {/* Operational System */}

      <div className="flex">
        <div className="ml-5 mr-2.5 mt-5 w-16 h-16 bg-gray-100 rounded-full">
          <svg
            viewBox="0 0 24 24"
            className="mx-auto my-4 w-8 h-8 text-gray-600 fill-current"
          >
            <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
          </svg>
        </div>
        <div className="py-8">
          <span className="block text-gray-500 text-sm font-normal">
            Operational System
          </span>
          <span className="text-gray-900 text-sm font-bold">macOS</span>
        </div>
      </div>

      {/* Version */}

      <div className="flex">
        <div className="ml-5 mr-2.5 mt-5 w-16 h-16 bg-blue-100 rounded-full">
          <MdDesktopWindows className="mx-auto my-5 w-6 h-6 text-blue-500" />
        </div>
        <div className="py-8">
          <span className="block text-gray-500 text-sm font-normal">
            Version
          </span>
          <span className="text-gray-900 text-sm font-bold">1.5.2.0</span>
        </div>
      </div>

      {/* Site */}

      <div className="flex">
        <div className="ml-5 mr-2.5 mt-5 w-16 h-16 bg-blue-100 rounded-full">
          <MdLanguage className="mx-auto my-3.5 w-9 h-9 text-blue-500" />
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

function Requests() {
  return (
    <div className="grid grid-cols-2 w-screen shadow-xl">
      <div className="flex">
        <div className="m-6 mt-6 w-16 h-16 bg-blue-100 rounded-full">
          <IoIosPerson className="mt-4 mx-auto w-7 h-7 text-blue-500" />
        </div>
        <div className="py-4">
          <span className="flex items-center justify-center pr-2 py-1 w-40 text-gray-600 text-xs bg-gray-200 rounded-full">
            <MdKeyboardArrowLeft className="mr-0.5 w-4 h-4" />
            ALL ORGANIZATIONS
          </span>
          <span className="block mt-1 text-blue-500 text-lg font-semibold">
            LAPTOP-03QHV0FL
          </span>
          <span className="text-gray-500 text-sm">
            Last acess 07/07/2020 08:51 EST
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 text-right">
        <div className="m-auto">
          <h1 className="text-gray-700 text-2xl font-bold">2M</h1>
          <p className="text-sm">Total Request</p>
        </div>
        <div className="m-auto">
          <h1 className="text-blue-500 text-2xl font-bold">900K</h1>
          <p className="text-sm">Allowed Request</p>
        </div>
        <div className="m-auto">
          <h1 className="text-yellow-500 text-2xl font-bold">75K</h1>
          <p className="text-sm">Blocked Request</p>
        </div>
        <div className="m-auto">
          <h1 className="text-red-500 text-2xl font-bold">25K</h1>
          <p className="text-sm">Threats Request</p>
        </div>
      </div>
    </div>
  )
}

function ActiveOrganizationsCard() {
  return (
    <div className="p-1">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold">Top 3 Active Organizations</h1>
        <button className="flex items-center px-3 py-2.5 text-gray-600 text-sm bg-white rounded-lg shadow-lg">
          <MdSearch className="mr-3 w-5 h-5" />
          FIND ORGANIZATIONS
        </button>
      </div>
      <div className="grid gap-8 grid-cols-3">
        <div className="p-4 border rounded-lg shadow-lg">
          <div className="mb-5 ml-3 rounded-xl">
            <h3 className="mb-3 text-left">Wyndham Worldwide (10%)</h3>
            <div className="grid grid-cols-3">
              <span>
                <h1 className="text-xl font-bold">190K</h1>
                <p className="text-blue-500 text-sm font-bold">
                  Allowed Requests
                </p>
              </span>
              <span>
                <h1 className="text-xl font-bold">50K</h1>
                <p className="text-yellow-500 text-sm font-bold">
                  Blocked Requests
                </p>
              </span>
              <span>
                <h1 className="text-xl font-bold">50K</h1>
                <p className="text-red-500 text-sm font-bold">
                  Threat Requests
                </p>
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg shadow-lg">
          <div className="mb-4 ml-3 rounded-xl">
            <h3 className="mb-3 text-left">Wake County (5%) (10%)</h3>
            <div className="grid grid-cols-3">
              <span>
                <h1 className="text-xl font-bold">190K</h1>
                <p className="text-blue-500 text-sm font-bold">
                  Allowed Requests
                </p>
              </span>
              <span>
                <h1 className="text-xl font-bold">50K</h1>
                <p className="text-yellow-500 text-sm font-bold">
                  Blocked Requests
                </p>
              </span>
              <span>
                <h1 className="text-xl font-bold">50K</h1>
                <p className="text-red-500 text-sm font-bold">
                  Threat Requests
                </p>
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 border rounded-lg shadow-lg">
          <div className="mb-4 ml-3 rounded-xl">
            <h3 className="mb-3 text-left">U.S Navy (10%)</h3>
            <div className="grid grid-cols-3">
              <span>
                <h1 className="text-xl font-bold">190K</h1>
                <p className="text-blue-500 text-sm font-bold">
                  Allowed Requests
                </p>
              </span>
              <span>
                <h1 className="text-xl font-bold">50K</h1>
                <p className="text-yellow-500 text-sm font-bold">
                  Blocked Requests
                </p>
              </span>
              <span>
                <h1 className="text-xl font-bold">50K</h1>
                <p className="text-red-500 text-sm font-bold">
                  Threat Requests
                </p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Panel() {
  return (
    <div>
      <header className="flex justify-between p-3.5 border rounded-md shadow-lg">
        <div className="flex items-center text-gray-500 text-sm">
          Requests <MdKeyboardArrowRight className="mx-1 w-5 h-5" /> Threats
          <MdKeyboardArrowRight className="mx-1 w-5 h-5" />
          <p className="text-gray-900 font-semibold">By User</p>
        </div>
        <div className="flex items-center">
          <p className="-mx-2 text-gray-500 text-xs font-semibold">EXPORT TO</p>
          <div className="text-sm space-x-5">
            <span className="p-1 px-4 border-r">
              <button className="items-center px-3 py-1.5 border border-gray-400 rounded-md">
                <svg
                  viewBox="0 0 24 24"
                  className="float-left mr-3 w-5 h-5 text-gray-600 fill-current"
                >
                  <path d="M20,2H4C2.9,2,2,2.9,2,4v16c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M20,10H10v10H8V10H4V8h4V4h2v4h10V10 z" />
                </svg>
                CSV
              </button>
            </span>
            <button className="px-3 py-1.5 border border-gray-400 rounded-md">
              <MdLink className="float-left mr-2 w-5 h-5" />
              Copy
            </button>
          </div>
        </div>
      </header>

      <div>
        {/* first content */}
        <div className="items-center p-5">
          <span className="flex items-center justify-center py-1 w-40 text-xs bg-gray-200 rounded-md space-x-3">
            <p className="text-gray-700">All Requests</p>
            <p className="px-2 py-1 text-gray-50 bg-blue-500 rounded-md">
              Threats
            </p>
          </span>
          <span>{/* ICONS */}</span>
        </div>

        <div>
          {/* Charts */}
          <h1></h1>
          <span></span>
        </div>
        <div>
          {/* Charts */}
          <h1></h1>
          <span></span>
        </div>
      </div>
      <input type="search">{/* Filter */}</input>
      <div>
        <div>
          <p></p>
          <p></p>
          <p></p>
        </div>
        <div>{/* USERS INFO */}</div>
      </div>
      <footer>{/* Arrows and page */}</footer>
    </div>
  )
}

export default function Index() {
  return (
    <>
      <Categories />
      <br />
      <SecurityThreats />
      <br />
      <Infos />
      <br />
      <DeviceInfos />
      <br />
      <Requests />
      <br />
      <ActiveOrganizationsCard />
      <br />
      <Panel />
    </>
  )
}
