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
  MdDashboard,
  MdPerson,
  MdComputer,
  MdArrowDownward,
  MdLocationCity,
  MdDateRange,
} from "react-icons/md"
import { DiWindows, DiApple, DiAndroid, DiChrome } from "react-icons/di"
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  RadialBarChart,
  RadialBar,
  AreaChart,
  Area,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
} from "recharts"
import { IoIosPerson } from "react-icons/io"

const line = [
  {
    date: "SEP 10",
    name: "Page A",
    Requests: 4500,
    OtherThing: 3400,
    OneMoreThing: 2400,
  },
  {
    date: "SEP 11",
    name: "Page B",
    Requests: 3000,
    OtherThing: 1398,
    OneMoreThing: 3210,
  },
  {
    date: "SEP 12",
    name: "Page C",
    Requests: 2000,
    OtherThing: 9800,
    OneMoreThing: 7290,
  },
  {
    date: "SEP 13",
    name: "Page D",
    Requests: 2780,
    OtherThing: 3908,
    OneMoreThing: 3000,
  },
  {
    date: "SEP 14",
    name: "Page E",
    Requests: 1890,
    OtherThing: 4800,
    OneMoreThing: 2181,
  },
  {
    date: "SEP 15",
    name: "Page F",
    Requests: 6390,
    OtherThing: 4000,
    OneMoreThing: 2500,
  },
  {
    date: "SEP 16",
    name: "Page G",
    Requests: 3490,
    OtherThing: 4300,
    OneMoreThing: 2100,
    eixoY: [0, 10000],
  },
]

const data = [
  {
    uv: 60,
    pv: 5567,
    fill: "#13a1FF",
  },
  {
    uv: 100,
    fill: "#FFF",
  },
]

const areaChart = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

const top5Users = [
  {
    name: "Edward Collins",
    value: 400,
  },
  {
    name: "Elisha Huber",
    value: 300,
  },
  {
    name: "Hayden Wilkson",
    value: 300,
  },
  {
    name: "Eliza Kenedy",
    value: 200,
  },
]

const top5Categories = [
  {
    name: "P2P & Illegal",
    value: 400,
  },
  {
    name: "Malware",
    value: 200,
  },
  {
    name: "Pishing & Deception",
    value: 300,
  },
  {
    name: "Botnet",
    value: 200,
  },
  {
    name: "Adult Content",
    value: 200,
  },
]

const COLORS = ["#DB7093", "#555579", "#FF8C00", "#228B22"]
const COLORS_CAT = ["#FFA500", "#A022AD", "#1E90FF", "#87CEFA", "#483D8B"]

function Categories() {
  return (
    <div className="flex w-1/2 bg-white border rounded-md shadow-md">
      <div className="mx-5 my-4 w-14 h-14 bg-blue-50 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="mt-3.5 mx-auto w-6 h-6 text-blue-500 fill-current"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 2l-5.5 9h11z" />
          <circle cx="17.5" cy="17.5" r="4.5" />
          <path d="M3 13.5h8v8H3z" />
        </svg>
      </div>
      <div className="my-auto">
        <span className="block mb-1 text-xs">Categories</span>
        <span className="px-3 py-0.5 text-gray-700 text-xs bg-gray-200 rounded-md">
          P2P & Illegal
        </span>
      </div>
    </div>
  )
}

function SecurityThreats() {
  return (
    <div className="flex w-1/2 bg-white border rounded-md shadow-md">
      <div className="mx-5 my-4 w-14 h-14 bg-red-50 rounded-full">
        <svg
          viewBox="-0.5 -1.5 24 24"
          className="mt-3.5 mx-auto w-6 h-6 text-green-600 fill-current"
        >
          <path
            fill="red"
            d="M12,2A9,9 0 0,0 3,11C3,14.03 4.53,16.82 7,18.47V22H9V19H11V22H13V19H15V22H17V18.46C19.47,16.81 21,14 21,11A9,9 0 0,0 12,2M8,11A2,2 0 0,1 10,13A2,2 0 0,1 8,15A2,2 0 0,1 6,13A2,2 0 0,1 8,11M16,11A2,2 0 0,1 18,13A2,2 0 0,1 16,15A2,2 0 0,1 14,13A2,2 0 0,1 16,11M12,14L13.5,17H10.5L12,14Z"
          />
        </svg>
      </div>
      <div className="my-auto">
        <span className="block text-xs">Security Threats</span>
        <span className="text-gray-400 text-xs">
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
    <div className="grid grid-cols-4 py-3.5 text-xs bg-white border rounded-md shadow-md">
      {/* Last Active */}

      <div className="items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18"
          viewBox="0 0 24 24"
          width="18"
          className="absolute -mt-1 ml-12 p-1 text-green-500 bg-green-300 bg-opacity-30 rounded-full fill-current"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>

        <div className="flex items-center">
          <div className="ml-5 mr-2.5 w-12 h-12 bg-blue-50 rounded-full">
            <MdSync className="mt-3.5 mx-auto w-5 h-5 text-blue-600 fill-current" />
          </div>
          <div className="">
            <span className="block text-gray-500 font-normal">Last Sync</span>
            <span className="text-gray-900 font-bold">07/07/2020 8:51 EST</span>
            {/* I couldn't implement this, maybe a smaller font could solve it
            <span className="ml-2 px-3 py-1 text-xs text-green-500 font-bold bg-green-100 rounded-full">
              ACTIVE NOW
            </span>
            */}
          </div>
        </div>
      </div>

      {/* Operational System */}

      <div className="flex items-center">
        <div className="ml-5 mr-2.5 w-12 h-12 bg-gray-100 rounded-full">
          <svg
            viewBox="0 0 24 24"
            className="mx-auto my-3 w-6 h-6 text-gray-600 fill-current"
          >
            <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
          </svg>
        </div>
        <div className="">
          <span className="block text-gray-500 font-normal">
            Operational System
          </span>
          <span className="text-gray-900 font-bold">macOS</span>
        </div>
      </div>

      {/* Version */}

      <div className="flex items-center">
        <div className="ml-5 mr-2.5 w-12 h-12 bg-blue-50 rounded-full">
          <MdDesktopWindows className="mx-auto my-3.5 w-5 h-5 text-blue-500" />
        </div>
        <div className="">
          <span className="block text-gray-500 font-normal">Version</span>
          <span className="text-gray-900 font-bold">1.5.2.0</span>
        </div>
      </div>

      {/* Site */}

      <div className="flex items-center">
        <div className="ml-5 mr-2.5 w-12 h-12 bg-blue-50 rounded-full">
          <MdLanguage className="mx-auto my-3 w-6 h-6 text-blue-500" />
        </div>
        <div className="">
          <span className="block text-gray-500 font-normal">Site</span>
          <span className="text-gray-900 font-bold">Anaptyx Main Office</span>
        </div>
      </div>
    </div>
  )
}

function Requests() {
  return (
    <div className="grid grid-cols-2 w-screen bg-white shadow-md">
      <div className="flex">
        <div className="ml-5 mr-3 my-5 w-16 h-16 bg-gray-100 rounded-full">
          <MdLocationCity className="mt-3.5 mx-auto w-8 h-8 text-gray-600" />
        </div>
        <div className="flex items-center py-4">
          <span>
            <h3 className="mb-1 text-gray-500 text-lg font-bold">
              All Organizations
            </h3>
            <p className="text-gray-500 text-xs">
              Last acess 07/07/2020 08:51 EST
            </p>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 text-right">
        <div className="m-auto">
          <h1 className="text-gray-500 text-2xl font-bold">2M</h1>
          <p className="text-gray-400 text-xs">Total Request</p>
        </div>
        <div className="m-auto">
          <h1 className="text-blue-500 text-2xl font-bold">900K</h1>
          <p className="text-gray-400 text-xs">Allowed Request</p>
        </div>
        <div className="m-auto">
          <h1 className="text-yellow-500 text-2xl font-bold">75K</h1>
          <p className="text-gray-400 text-xs">Blocked Request</p>
        </div>
        <div className="m-auto">
          <h1 className="text-red-500 text-2xl font-bold">25K</h1>
          <p className="text-gray-400 text-xs">Threats Request</p>
        </div>
      </div>
    </div>
  )
}

function Requests2() {
  return (
    <div className="grid grid-cols-2 w-screen bg-white shadow-md">
      <div className="flex">
        <div className="ml-8 mr-3 my-5 w-16 h-16 bg-blue-50 rounded-full">
          <svg
            id="Capa_1"
            enable-background="new 0 0 512 512"
            height="512"
            viewBox="0 0 512 512"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-4 mx-auto p-1 w-8 h-8 text-blue-500 fill-current"
          >
            <g>
              <path d="m162.457 434.408c-23.427 23.444-61.433 23.444-84.861 0-23.075-23.059-23.443-60.249-1.088-83.757l126.465-126.465c-39.112-10.458-82.481-.832-113.748 28.904l-56.231 56.231c-44.711 47.015-43.975 121.395 2.176 167.514 46.855 46.887 122.867 46.887 169.722 0l51.846-51.846c31.425-31.404 41.785-75.905 31.086-115.947z" />
              <path d="m476.835 35.17c-46.119-46.151-120.499-46.887-167.514-2.176l-56.231 56.231c-29.735 31.268-39.361 74.637-28.904 113.748l126.465-126.465c23.508-22.355 60.697-21.987 83.757 1.088 23.444 23.428 23.443 61.433 0 84.861l-125.367 125.367c40.042 10.699 84.543.34 115.947-31.086l51.846-51.846c46.888-46.855 46.888-122.867.001-169.722z" />
              <path d="m164.774 347.228c11.714 11.722 30.717 11.722 42.43 0l140.023-140.023c11.722-11.714 11.722-30.717 0-42.43-11.53-11.538-30.125-11.722-41.878-.544l-141.12 141.12c-11.177 11.752-10.993 30.347.545 41.877z" />
            </g>
          </svg>
        </div>
        <div className="flex items-center py-4">
          <span>
            <p className="flex items-center justify-center pr-1 py-1 w-40 text-gray-500 text-xs bg-gray-100 rounded-full">
              <MdKeyboardArrowLeft className="mr-1 w-4 h-4" />
              ALL ORGANIZATIONS
            </p>
            <p className="text-blue-500 text-base font-bold">bittorrent.com</p>
            <p className="text-gray-500 text-xs">
              FQDN: tps10255.bittorrent.com
            </p>
          </span>
        </div>
      </div>

      <div className="flex justify-end mr-8 pb-7 text-right space-x-14">
        <div className="my-auto">
          <h1 className="text-gray-500 text-2xl font-bold">2M</h1>
          <p className="text-gray-400 text-xs">Total Request</p>
        </div>
        <div className="my-auto">
          <h1 className="text-blue-500 text-2xl font-bold">10.30%</h1>
          <p className="text-gray-400 text-xs">Allowed Request</p>
        </div>
        <p className="absolute mt-14 pt-3 text-gray-500 text-xs">
          Last access 07/07/2020 08:51 EST | Last scan 07/07/2020 08:51 EST
        </p>
      </div>
    </div>
  )
}

function Requests3() {
  return (
    <div className="grid grid-cols-2 w-screen bg-white shadow-md">
      <div className="flex">
        <div className="ml-8 mr-3 my-5 w-16 h-16 bg-blue-50 rounded-full">
          <svg
            id="Capa_1"
            enable-background="new 0 0 512 512"
            height="512"
            viewBox="0 0 512 512"
            width="512"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-4 mx-auto p-1 w-8 h-8 text-blue-500 fill-current"
          >
            <g>
              <path d="m162.457 434.408c-23.427 23.444-61.433 23.444-84.861 0-23.075-23.059-23.443-60.249-1.088-83.757l126.465-126.465c-39.112-10.458-82.481-.832-113.748 28.904l-56.231 56.231c-44.711 47.015-43.975 121.395 2.176 167.514 46.855 46.887 122.867 46.887 169.722 0l51.846-51.846c31.425-31.404 41.785-75.905 31.086-115.947z" />
              <path d="m476.835 35.17c-46.119-46.151-120.499-46.887-167.514-2.176l-56.231 56.231c-29.735 31.268-39.361 74.637-28.904 113.748l126.465-126.465c23.508-22.355 60.697-21.987 83.757 1.088 23.444 23.428 23.443 61.433 0 84.861l-125.367 125.367c40.042 10.699 84.543.34 115.947-31.086l51.846-51.846c46.888-46.855 46.888-122.867.001-169.722z" />
              <path d="m164.774 347.228c11.714 11.722 30.717 11.722 42.43 0l140.023-140.023c11.722-11.714 11.722-30.717 0-42.43-11.53-11.538-30.125-11.722-41.878-.544l-141.12 141.12c-11.177 11.752-10.993 30.347.545 41.877z" />
            </g>
          </svg>
        </div>
        <div className="flex items-center py-4">
          <span>
            <p className="flex items-center justify-center pr-1 py-1 w-40 text-gray-500 text-xs bg-gray-100 rounded-full">
              <MdKeyboardArrowLeft className="mr-1 w-4 h-4" />
              ALL ORGANIZATIONS
            </p>
            <p className="text-blue-500 text-lg font-bold">LAPTOP-03QHV0FL</p>
            <p className="text-gray-500 text-xs">
              Last acess 07/07/2020 08:51 EST
            </p>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 text-right">
        <div className="m-auto">
          <h1 className="text-gray-500 text-2xl font-bold">2M</h1>
          <p className="text-gray-400 text-xs">Total Request</p>
        </div>
        <div className="m-auto">
          <h1 className="text-blue-500 text-2xl font-bold">900K</h1>
          <p className="text-gray-400 text-xs">Allowed Request</p>
        </div>
        <div className="m-auto">
          <h1 className="text-yellow-500 text-2xl font-bold">75K</h1>
          <p className="text-gray-400 text-xs">Blocked Request</p>
        </div>
        <div className="m-auto">
          <h1 className="text-red-500 text-2xl font-bold">25K</h1>
          <p className="text-gray-400 text-xs">Threats Request</p>
        </div>
      </div>
    </div>
  )
}

function ActiveOrganizationsCard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-gray-700 text-base font-bold">
          Top 3 Active Organizations
        </h1>
        <button className="flex items-center pl-3 pr-5 py-1.5 text-gray-500 text-xs bg-white rounded-md shadow-sm">
          <MdSearch className="mr-5 w-5 h-5" />
          FIND ORGANIZATIONS
        </button>
      </div>
      <div className="flex justify-between space-x-4">
        <div className="px-4 py-5 bg-white border rounded-md shadow-sm">
          <div className="ml-2rounded-xl">
            <h3 className="mb-3 text-left text-sm">Wyndham Worldwide (10%)</h3>
            <div className="grid gap-6 grid-cols-3">
              <span className="">
                <h1 className="text-lg font-bold">190K</h1>
                <p className="text-blue-500 text-xs font-bold">
                  Allowed Requests
                </p>
              </span>
              <span className="">
                <h1 className="text-lg font-bold">50K</h1>
                <p className="text-yellow-500 text-xs font-bold">
                  Blocked Requests
                </p>
              </span>
              <span>
                <h1 className="text-lg font-bold">50K</h1>
                <p className="text-red-500 text-xs font-bold">
                  Threat Requests
                </p>
              </span>
            </div>
          </div>
        </div>

        <div className="px-3 py-5 bg-white border rounded-md shadow-sm">
          <div className="mb-4 ml-3 rounded-xl">
            <h3 className="mb-3 text-left text-sm">Wake County (5%) (10%)</h3>
            <div className="grid gap-6 grid-cols-3">
              <span>
                <h1 className="text-lg font-bold">190K</h1>
                <p className="text-blue-500 text-xs font-bold">
                  Allowed Requests
                </p>
              </span>
              <span>
                <h1 className="text-lg font-bold">50K</h1>
                <p className="text-yellow-500 text-xs font-bold">
                  Blocked Requests
                </p>
              </span>
              <span>
                <h1 className="text-lg font-bold">50K</h1>
                <p className="text-red-500 text-xs font-bold">
                  Threat Requests
                </p>
              </span>
            </div>
          </div>
        </div>

        <div className="px-3 py-5 bg-white border rounded-md shadow-sm">
          <div className="mb-4 ml-3 rounded-xl">
            <h3 className="mb-3 text-left text-sm">U.S Navy (10%)</h3>
            <div className="grid gap-6 grid-cols-3">
              <span>
                <h1 className="text-lg font-bold">190K</h1>
                <p className="text-blue-500 text-xs font-bold">
                  Allowed Requests
                </p>
              </span>
              <span>
                <h1 className="text-lg font-bold">50K</h1>
                <p className="text-yellow-500 text-xs font-bold">
                  Blocked Requests
                </p>
              </span>
              <span>
                <h1 className="text-lg font-bold">50K</h1>
                <p className="text-red-500 text-xs font-bold">
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
      <header className="flex justify-between px-5 py-3.5 rounded-t-md shadow-md">
        <div className="flex items-center text-gray-500 text-base">
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
        <div className="flex items-center p-5 space-x-4">
          <span className="flex items-center justify-center py-1 w-40 text-xs bg-gray-100 rounded-md space-x-3">
            <p className="text-gray-600">All Requests</p>
            <p className="px-2 py-1 text-gray-50 bg-blue-500 rounded-md">
              Threats
            </p>
          </span>
          <span className="flex items-center justify-between py-0.5 w-36 text-xs bg-gray-100 rounded-md">
            <svg
              viewBox="0 0 24 24"
              className="ml-auto py-1 w-7 h-7 text-gray-400 fill-current"
            >
              <path d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z" />
            </svg>
            <IoIosPerson className="m-auto py-1 w-7 h-7 text-gray-50 bg-blue-500" />
            <MdDesktopWindows className="m-auto py-1 w-7 h-7 text-gray-400 fill-current" />
            <MdDashboard className="m-auto py-1 w-7 h-7 text-gray-400 fill-current" />
          </span>
        </div>
        <div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <h1 className="-mx-3 text-base transform -rotate-90">
                Top 5 Users
              </h1>
              <IoIosPerson className="absolute left-44 ml-1.5 pl-3 w-16 h-16 text-gray-400" />
              <PieChart
                width={455}
                height={320}
                className="-ml-10 text-sm leading-10"
              >
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="circle"
                  iconSize={9}
                />

                <Pie
                  data={top5Users}
                  innerRadius={100}
                  outerRadius={120}
                  dataKey="value"
                >
                  {top5Users.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div className="flex items-center mr-16">
              <h1 className="-mx-5 transform -rotate-90">Top 5 Categories</h1>
              <svg
                viewBox="0 0 24 24"
                className="relative left-24 w-12 h-12 text-gray-400 fill-current"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2l-5.5 9h11z" />
                <circle cx="17.5" cy="17.5" r="4.5" />
                <path d="M3 13.5h8v8H3z" />
              </svg>
              <PieChart
                width={455}
                height={320}
                className="-ml-20 text-sm leading-10"
              >
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="circle"
                  iconSize={9}
                />

                <Pie
                  data={top5Categories}
                  innerRadius={100}
                  outerRadius={120}
                  dataKey="value"
                >
                  {top5Categories.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS_CAT[index % COLORS_CAT.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-1">
        <MdSearch className="relative left-9 top-1 w-6 h-6 text-gray-700" />
        <input
          type="search"
          className="realtive pl-10 w-1/3 h-8 text-sm rounded-full"
          placeholder="Filter"
        ></input>
      </div>
      <div className="text-xs">
        <div className="grid grid-cols-4 mb-3 mt-7 px-8 text-gray-400">
          <p className="col-span-2 ml-3">USER</p>
          <p># OF REQUESTS</p>
          <p>% OF REQUESTS</p>
        </div>
        <div className="mx-6 border rounded-t-md">
          <span className="grid grid-cols-4 items-center bg-blue-50 border-b">
            <p className="flex col-span-2 items-center pl-4 text-gray-800">
              <MdPerson className="mr-1 my-1.5 p-1.5 w-7 h-7 text-blue-500 bg-blue-100 rounded-full" />
              Edward Collins
            </p>
            <p className="text-gray-800">4,389</p>
            <p className="text-gray-800">26.96%</p>
          </span>
          <span className="grid grid-cols-4 items-center border-b">
            <p className="flex col-span-2 items-center pl-4 text-gray-800">
              <MdPerson className="mr-1 my-1.5 p-1.5 w-7 h-7 text-blue-500 bg-blue-100 rounded-full" />
              Hayden Wilkinson
            </p>
            <p className="text-gray-800">4,389</p>
            <p className="text-gray-800">25.38%</p>
          </span>
          <span className="grid grid-cols-4 items-center border-b">
            <p className="flex col-span-2 items-center pl-4 text-gray-800">
              <MdPerson className="mr-1 my-1.5 p-1.5 w-7 h-7 text-blue-500 bg-blue-100 rounded-full" />
              Hayden Wilkinson
            </p>
            <p className="text-gray-800">2,189</p>
            <p className="text-gray-800">13.39</p>
          </span>
          <span className="grid grid-cols-4 items-center border-b">
            <p className="flex col-span-2 items-center pl-4 text-gray-800">
              <MdPerson className="mr-1 my-1.5 p-1.5 w-7 h-7 text-blue-500 bg-blue-100 rounded-full" />
              Elisha Huber
            </p>
            <p className="text-gray-800">1,124</p>
            <p className="text-gray-800">6.87%</p>
          </span>
          <span className="grid grid-cols-4 items-center border-b">
            <p className="flex col-span-2 items-center pl-4 text-gray-800">
              <MdPerson className="mr-1 my-1.5 p-1.5 w-7 h-7 text-blue-500 bg-blue-100 rounded-full" />
              Edward Collins
            </p>
            <p className="text-gray-800">1,124</p>
            <p className="text-gray-800">6.87%</p>
          </span>
          <span className="grid grid-cols-4 items-center border-b">
            <p className="flex col-span-2 items-center pl-4 text-gray-800">
              <MdPerson className="mr-1 my-1.5 p-1.5 w-7 h-7 text-blue-500 bg-blue-100 rounded-full" />
              Edward Collins
            </p>
            <p className="text-gray-800">824</p>
            <p className="text-gray-800">4.06%</p>
          </span>
          <span className="grid grid-cols-4 items-center border-b">
            <p className="flex col-span-2 items-center pl-4 text-gray-800">
              <MdPerson className="mr-1 my-1.5 p-1.5 w-7 h-7 text-blue-500 bg-blue-100 rounded-full" />
              Edward Collins
            </p>
            <p className="text-gray-800">524</p>
            <p className="text-gray-800">3.82%</p>
          </span>
          <span className="grid grid-cols-4 items-center border-b">
            <p className="flex col-span-2 items-center pl-4 text-gray-800">
              <MdPerson className="mr-1 my-1.5 p-1.5 w-7 h-7 text-blue-500 bg-blue-100 rounded-full" />
              Edward Collins
            </p>
            <p className="text-gray-800">504</p>
            <p className="text-gray-800">3.34%</p>
          </span>
          <span className="grid grid-cols-4 items-center border-b">
            <p className="flex col-span-2 items-center pl-4 text-gray-800">
              <MdPerson className="mr-1 my-1.5 p-1.5 w-7 h-7 text-blue-500 bg-blue-100 rounded-full" />
              Edward Collins
            </p>
            <p className="text-gray-800">444</p>
            <p className="text-gray-800">2.98%</p>
          </span>
          <span className="grid grid-cols-4 items-center">
            <p className="flex col-span-2 items-center pl-4 text-gray-800">
              <MdPerson className="mr-1 my-1.5 p-1.5 w-7 h-7 text-blue-500 bg-blue-100 rounded-full" />
              Edward Collins
            </p>
            <p className="text-gray-800">424</p>
            <p className="text-gray-800">2.95%</p>
          </span>
        </div>
      </div>
      <footer className="flex items-center justify-end ml-9 mr-7 mt-8 pb-5 text-gray-400 text-xs">
        <p className="mr-2.5">1-10 of 400</p>
        <span className="space-x-2">
          <button>
            <MdKeyboardArrowLeft className="p-1 w-7 h-7 border border-gray-400 rounded-md" />
          </button>
          <button>
            <MdKeyboardArrowRight className="p-1 w-7 h-7 border border-gray-400 rounded-md" />
          </button>
        </span>
      </footer>
    </div>
  )
}

function PanelLayout3() {
  return (
    <div className="bg-white rounded-md shadow-md">
      <div>
        {/* first content */}
        <div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <h1 className="-mx-3 text-sm transform -rotate-90">
                Top 5 Users
              </h1>
              <svg
                viewBox="0 0 24 24"
                className="absolute left-44 ml-2.5 w-12 h-12 text-gray-400 fill-current"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2l-5.5 9h11z" />
                <circle cx="17.5" cy="17.5" r="4.5" />
                <path d="M3 13.5h8v8H3z" />
              </svg>{" "}
              <PieChart
                width={455}
                height={320}
                className="-ml-10 text-sm leading-10"
              >
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="circle"
                  iconSize={9}
                />

                <Pie
                  data={top5Users}
                  innerRadius={100}
                  outerRadius={120}
                  dataKey="value"
                >
                  {top5Users.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
            <div className="flex items-center mr-16">
              <svg
                id="Capa_1"
                enable-background="new 0 0 512 512"
                height="512"
                viewBox="0 0 512 512"
                width="512"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute ml-52 w-11 h-11 text-gray-400 fill-current"
              >
                <g>
                  <path d="m162.457 434.408c-23.427 23.444-61.433 23.444-84.861 0-23.075-23.059-23.443-60.249-1.088-83.757l126.465-126.465c-39.112-10.458-82.481-.832-113.748 28.904l-56.231 56.231c-44.711 47.015-43.975 121.395 2.176 167.514 46.855 46.887 122.867 46.887 169.722 0l51.846-51.846c31.425-31.404 41.785-75.905 31.086-115.947z" />
                  <path d="m476.835 35.17c-46.119-46.151-120.499-46.887-167.514-2.176l-56.231 56.231c-29.735 31.268-39.361 74.637-28.904 113.748l126.465-126.465c23.508-22.355 60.697-21.987 83.757 1.088 23.444 23.428 23.443 61.433 0 84.861l-125.367 125.367c40.042 10.699 84.543.34 115.947-31.086l51.846-51.846c46.888-46.855 46.888-122.867.001-169.722z" />
                  <path d="m164.774 347.228c11.714 11.722 30.717 11.722 42.43 0l140.023-140.023c11.722-11.714 11.722-30.717 0-42.43-11.53-11.538-30.125-11.722-41.878-.544l-141.12 141.12c-11.177 11.752-10.993 30.347.545 41.877z" />
                </g>
              </svg>
              <h1 className="mx-5 text-sm transform -rotate-90">
                Top 5 Categories
              </h1>
              <PieChart
                width={455}
                height={320}
                className="-ml-20 text-sm leading-10"
              >
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="circle"
                  iconSize={9}
                />

                <Pie
                  data={top5Categories}
                  innerRadius={100}
                  outerRadius={120}
                  dataKey="value"
                >
                  {top5Categories.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS_CAT[index % COLORS_CAT.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
        </div>
      </div>
      <div className="flex mt-1">
        <MdSearch className="relative left-9 top-1 w-6 h-6 text-gray-700" />
        <input
          type="search"
          className="realtive pl-10 w-1/3 h-8 text-sm rounded-full"
          placeholder="Search for Domain"
        ></input>
      </div>
      <div className="text-xs">
        <div className="grid grid-cols-4 mb-2.5 mt-7 px-8 text-gray-400">
          <p className="ml-3">FQDN</p>
          <p>CATEGORY</p>
          <p className="ml-20">RESULT</p>
          <p className="ml-12">TIME OF REQUEST</p>
        </div>

        <div className="mx-7 my-2">
          <span className="grid grid-cols-4 items-center py-2 border rounded-md">
            <p className="pl-4 text-gray-800">tps10255.doubleverify.com</p>
            <p className="py-1 w-24 text-center text-gray-600 text-xs bg-gray-100 rounded-md">
              P2P & Illegal
            </p>
            <p className="ml-20 py-1 w-28 text-center text-red-500 bg-red-50 rounded-md">
              Threats
            </p>
            <p className="flex justify-between ml-12 text-gray-800">
              2020-08-19 13:34:41.945617{" "}
              <MdKeyboardArrowRight className="mr-3 w-4 h-4 text-gray-500" />
            </p>
          </span>
        </div>

        <div className="mx-7 my-2">
          <span className="grid grid-cols-4 items-center py-2 border rounded-md">
            <p className="pl-4 text-gray-800">tps10255.doubleverify.com</p>
            <p className="py-1 w-24 text-center text-gray-600 text-xs bg-gray-100 rounded-md">
              P2P & Illegal
            </p>
            <p className="ml-20 py-1 w-28 text-center text-red-500 bg-red-50 rounded-md">
              Threats
            </p>
            <p className="flex justify-between ml-12 text-gray-800">
              2020-08-19 13:34:41.945617{" "}
              <MdKeyboardArrowRight className="mr-3 w-4 h-4 text-gray-500" />
            </p>
          </span>
        </div>

        <div className="mx-7 my-2">
          <span className="grid grid-cols-4 items-center py-2 border rounded-md">
            <p className="pl-4 text-gray-800">tps10255.doubleverify.com</p>
            <p className="py-1 w-24 text-center text-gray-600 text-xs bg-gray-100 rounded-md">
              P2P & Illegal
            </p>
            <p className="ml-20 py-1 w-28 text-center text-red-500 bg-red-50 rounded-md">
              Threats
            </p>
            <p className="flex justify-between ml-12 text-gray-800">
              2020-08-19 13:34:41.945617{" "}
              <MdKeyboardArrowRight className="mr-3 w-4 h-4 text-gray-500" />
            </p>
          </span>
        </div>

        <div className="mx-7 my-2">
          <span className="grid grid-cols-4 items-center py-2 border rounded-md">
            <p className="pl-4 text-gray-800">tps10255.doubleverify.com</p>
            <p className="py-1 w-24 text-center text-gray-600 text-xs bg-gray-100 rounded-md">
              P2P & Illegal
            </p>
            <p className="ml-20 py-1 w-28 text-center text-red-500 bg-red-50 rounded-md">
              Threats
            </p>
            <p className="flex justify-between ml-12 text-gray-800">
              2020-08-19 13:34:41.945617{" "}
              <MdKeyboardArrowRight className="mr-3 w-4 h-4 text-gray-500" />
            </p>
          </span>
        </div>

        <div className="mx-7 my-2">
          <span className="grid grid-cols-4 items-center py-2 border rounded-md">
            <p className="pl-4 text-gray-800">tps10255.doubleverify.com</p>
            <p className="py-1 w-24 text-center text-gray-600 text-xs bg-gray-100 rounded-md">
              P2P & Illegal
            </p>
            <p className="ml-20 py-1 w-28 text-center text-red-500 bg-red-50 rounded-md">
              Threats
            </p>
            <p className="flex justify-between ml-12 text-gray-800">
              2020-08-19 13:34:41.945617{" "}
              <MdKeyboardArrowRight className="mr-3 w-4 h-4 text-gray-500" />
            </p>
          </span>
        </div>

        <div className="mx-7 my-2">
          <span className="grid grid-cols-4 items-center py-2 border rounded-md">
            <p className="pl-4 text-gray-800">tps10255.doubleverify.com</p>
            <p className="py-1 w-24 text-center text-gray-600 text-xs bg-gray-100 rounded-md">
              P2P & Illegal
            </p>
            <p className="ml-20 py-1 w-28 text-center text-red-500 bg-red-50 rounded-md">
              Threats
            </p>
            <p className="flex justify-between ml-12 text-gray-800">
              2020-08-19 13:34:41.945617{" "}
              <MdKeyboardArrowRight className="mr-3 w-4 h-4 text-gray-500" />
            </p>
          </span>
        </div>

        <div className="mx-7 my-2">
          <span className="grid grid-cols-4 items-center py-2 border rounded-md">
            <p className="pl-4 text-gray-800">tps10255.doubleverify.com</p>
            <p className="py-1 w-24 text-center text-gray-600 text-xs bg-gray-100 rounded-md">
              P2P & Illegal
            </p>
            <p className="ml-20 py-1 w-28 text-center text-red-500 bg-red-50 rounded-md">
              Threats
            </p>
            <p className="flex justify-between ml-12 text-gray-800">
              2020-08-19 13:34:41.945617{" "}
              <MdKeyboardArrowRight className="mr-3 w-4 h-4 text-gray-500" />
            </p>
          </span>
        </div>

        <div className="mx-7 my-2">
          <span className="grid grid-cols-4 items-center py-2 border rounded-md">
            <p className="pl-4 text-gray-800">tps10255.doubleverify.com</p>
            <p className="py-1 w-24 text-center text-gray-600 text-xs bg-gray-100 rounded-md">
              P2P & Illegal
            </p>
            <p className="ml-20 py-1 w-28 text-center text-red-500 bg-red-50 rounded-md">
              Threats
            </p>
            <p className="flex justify-between ml-12 text-gray-800">
              2020-08-19 13:34:41.945617{" "}
              <MdKeyboardArrowRight className="mr-3 w-4 h-4 text-gray-500" />
            </p>
          </span>
        </div>

        <div className="mx-7 my-2">
          <span className="grid grid-cols-4 items-center py-2 border rounded-md">
            <p className="pl-4 text-gray-800">tps10255.doubleverify.com</p>
            <p className="py-1 w-24 text-center text-gray-600 text-xs bg-gray-100 rounded-md">
              P2P & Illegal
            </p>
            <p className="ml-20 py-1 w-28 text-center text-red-500 bg-red-50 rounded-md">
              Threats
            </p>
            <p className="flex justify-between ml-12 text-gray-800">
              2020-08-19 13:34:41.945617{" "}
              <MdKeyboardArrowRight className="mr-3 w-4 h-4 text-gray-500" />
            </p>
          </span>
        </div>

        <div className="mx-7 my-2">
          <span className="grid grid-cols-4 items-center py-2 border rounded-md">
            <p className="pl-4 text-gray-800">tps10255.doubleverify.com</p>
            <p className="py-1 w-24 text-center text-gray-600 text-xs bg-gray-100 rounded-md">
              P2P & Illegal
            </p>
            <p className="ml-20 py-1 w-28 text-center text-red-500 bg-red-50 rounded-md">
              Threats
            </p>
            <p className="flex justify-between ml-12 text-gray-800">
              2020-08-19 13:34:41.945617{" "}
              <MdKeyboardArrowRight className="mr-3 w-4 h-4 text-gray-500" />
            </p>
          </span>
        </div>
      </div>
      <footer className="flex items-center justify-end ml-9 mr-7 mt-8 pb-5 text-gray-400 text-xs">
        <p className="mr-2.5">1-10 of 400</p>
        <span className="space-x-2">
          <button>
            <MdKeyboardArrowLeft className="p-1 w-7 h-7 border border-gray-400 rounded-md" />
          </button>
          <button>
            <MdKeyboardArrowRight className="p-1 w-7 h-7 border border-gray-400 rounded-md" />
          </button>
        </span>
      </footer>
    </div>
  )
}

function InfoPanel() {
  return (
    <div>
      <div className="grid gap-4 grid-cols-3">
        <div className="flex items-center py-3 bg-white border rounded-md shadow-md">
          <div className="mx-3">
            <RadialBarChart
              width={135}
              height={135}
              innerRadius={60}
              outerRadius={77}
              data={data}
            >
              <RadialBar minAngle={15} background dataKey="uv" clockwise />
            </RadialBarChart>
          </div>
          <p className="absolute left-20 ml-1.5 text-2xl font-semibold">60%</p>
          <div>
            <p className="text-blue-500 text-sm">Sites</p>
            <p className="w-24 text-base font-bold">60 Active</p>
            <p className="text-gray-400 text-xs">40 Active</p>
          </div>
          <div className="bottom-0 self-end -ml-7 mb-1 pr-4 pr-4 w-full text-right text-blue-500 text-xs font-bold">
            VIEW SITES REPORT
          </div>
        </div>

        <div className="flex items-center py-3 bg-white border rounded-md shadow-md">
          <div className="mx-3">
            <RadialBarChart
              width={135}
              height={135}
              innerRadius={60}
              outerRadius={77}
              data={data}
            >
              <RadialBar minAngle={15} background dataKey="uv" clockwise />
            </RadialBarChart>
          </div>
          <p className="absolute ml-14 text-2xl font-semibold">60%</p>
          <div>
            <p className="text-blue-500 text-sm">Sites</p>
            <p className="w-24 text-base font-bold">60 Active</p>
            <p className="text-gray-400 text-xs">40 Active</p>
          </div>
          <div className="bottom-0 self-end -ml-7 mb-1 pr-4 w-full text-right text-blue-500 text-xs font-bold">
            VIEW SITES REPORT
          </div>
        </div>

        <div className="flex items-center py-3 bg-white border rounded-md shadow-md">
          <div className="mx-3">
            <RadialBarChart
              width={135}
              height={135}
              innerRadius={60}
              outerRadius={77}
              data={data}
            >
              <RadialBar minAngle={15} background dataKey="uv" clockwise />
            </RadialBarChart>
          </div>
          <p className="absolute ml-14 pl-0.5 text-2xl font-semibold">60%</p>
          <div>
            <p className="text-blue-500 text-sm">Sites</p>
            <p className="w-24 text-base font-bold">60 Active</p>
            <p className="text-gray-400 text-xs">40 Active</p>
          </div>
          <div className="bottom-0 self-end -ml-7 mb-1 pr-4 w-full text-right text-blue-500 text-xs font-bold">
            VIEW SITES REPORT
          </div>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-3 mt-5">
        <div className="p-5 py-3 bg-white border border-gray-100 rounded-md shadow-md">
          <h3 className="mt-2 text-base font-bold">Deployment</h3>
          <div className="grid gap-x-10 grid-cols-2 grid-rows-2">
            <span className="flex items-center mt-5">
              <MdGroupWork className="p-3 w-14 h-14 text-blue-500 bg-blue-100 rounded-full fill-current" />
              <span className="ml-2">
                <p className="text-gray-600 font-bold">10</p>
                <p className="text-xs">Collections</p>
              </span>
            </span>
            <span className="flex items-center mt-5">
              <span className="bg-blue-100 rounded-full">
                <MdComputer className="p-3.5 w-14 h-14 text-blue-500 fill-current" />
              </span>
              <span className="ml-2">
                <p className="text-gray-600 font-bold">10</p>
                <p className="text-xs">Users</p>
              </span>
            </span>
            <span className="flex items-center mt-5">
              <span className="bg-blue-100 rounded-full">
                <MdDevices className="p-3.5 w-14 h-14 text-blue-500 fill-current" />
              </span>
              <span className="ml-2">
                <p className="text-gray-600 font-bold">8</p>
                <p className="text-xs">Sync Tools</p>
              </span>
            </span>
            <span className="flex items-center mt-5">
              <MdGroupWork className="p-3 w-14 h-14 text-blue-500 bg-blue-100 rounded-full fill-current" />
              <span className="ml-2">
                <p className="text-gray-600 font-bold">8</p>
                <p className="text-xs">Relays</p>
              </span>
            </span>
          </div>

          <h3 className="mt-8 text-sm">Roaming Clients</h3>
          <div className="grid gap-x-10 grid-cols-2 grid-rows-2">
            <span className="flex items-center mt-5">
              <span className="bg-blue-50 rounded-full">
                <DiWindows className="p-3 w-14 h-14 text-blue-400 fill-current" />
              </span>
              <span className="ml-2">
                <p className="text-gray-600 font-bold">12</p>
                <p className="text-xs">Windows</p>
              </span>
            </span>
            <span className="flex items-center mt-5">
              <span className="bg-gray-100 rounded-full">
                <DiApple className="p-3.5 w-14 h-14 text-gray-600 fill-current" />
              </span>
              <span className="ml-2">
                <p className="text-gray-600 font-bold">25</p>
                <p className="text-xs">macOS</p>
              </span>
            </span>
            <span className="flex items-center mt-5">
              <span className="bg-gray-100 rounded-full">
                <DiApple className="p-3.5 w-14 h-14 text-gray-500 fill-current" />
              </span>
              <span className="ml-2">
                <p className="text-gray-600 font-bold">12</p>
                <p className="text-xs">iOS</p>
              </span>
            </span>
            <span className="flex items-center mt-5">
              <DiAndroid className="p-3 w-14 h-14 text-green-600 bg-green-50 rounded-full fill-current" />
              <span className="ml-2">
                <p className="text-gray-600 font-bold">12</p>
                <p className="text-xs">Android</p>
              </span>
            </span>
            <span className="flex items-center mt-5">
              <span className="bg-blue-50 rounded-full">
                <DiChrome className="p-3 w-14 h-14 text-blue-500 fill-current" />
              </span>
              <span className="ml-2">
                <p className="text-gray-600 font-bold">12</p>
                <p className="text-xs">Android</p>
              </span>
            </span>
          </div>
        </div>

        <div className="col-span-2 p-5 pt-6 bg-white border border-gray-100 rounded-md shadow-md">
          <h3 className="text-sm">Queries per Second</h3>

          <h1 className="mt-10 text-2xl font-bold">40.4K</h1>
          <span className="flex items-center justify-between mt-2 px-1.5 w-14 text-blue-500 font-bold bg-blue-50">
            <MdArrowDownward />
            4%
          </span>
          <div>
            <AreaChart width={720} height={325} data={areaChart}>
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="25%" stopColor="#82ca9d" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>

              <Tooltip />
              <Area
                dataKey="pv"
                stroke="#82ca9d"
                fillOpacity={10}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </div>
        </div>
      </div>
    </div>
  )
}

const toolTipStyle = {
  font: "bold",
}

const CustomizedAxisTick = () => {
  const { x, y, stroke, payload } = this.props

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  )
}

function LineChartJS() {
  return (
    <div className="bg-white rounded-b-md">
      <div className="ml-4 pb-4">
        <LineChart
          width={1100}
          height={330}
          data={line}
          margin={{
            top: 5,
            right: 20,
            left: 15,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={{
              stroke: "#D3D3D3",
              strokeWidth: 2,
            }}
            tickMargin={8}
            tick={{
              stroke: "black",
              fontSize: "12",
            }}
            strokeWidth={0.5}
          />
          <YAxis
            dataKey="eixoY"
            axisLine={{
              stroke: "#D3D3D3",
              strokeWidth: 2,
            }}
            type="number"
            scale="linear"
            tickMargin={10}
            tick={{
              stroke: "black",
              fontSize: "12",
            }}
            strokeWidth={0.5}
            width={70}
          />
          <Tooltip itemStyle={toolTipStyle} />
          <Line
            type="monotone"
            dataKey="OtherThing"
            stroke="#18F"
            strokeWidth={2}
            activeDot={{
              r: 6,
            }}
          />
          <Line
            type="monotone"
            dataKey="Requests"
            stroke="orange"
            strokeWidth={2}
            activeDot={{
              r: 6,
            }}
          />
          <Line
            type="monotone"
            dataKey="OneMoreThing"
            stroke="red"
            strokeWidth={2}
            activeDot={{
              r: 6,
            }}
          />
        </LineChart>
      </div>
    </div>
  )
}

export default function Index() {
  return (
    <div className="bg-gray-200">
      {/* <br />
      <br />
      <Infos /> */}
      Layout 01
      <Requests />
      <div className="p-7">
        <div>
          <ActiveOrganizationsCard />
        </div>
        <div className="mt-6 px-7 py-5 bg-white rounded-md shadow-md">
          <h3 className="mb-7 text-base font-bold">Time Series Request</h3>
          <LineChartJS />
        </div>
        <div className="mt-6 bg-white rounded-md shadow-md">
          <Panel />
        </div>

        <div className="mt-5">
          <InfoPanel />
        </div>
      </div>
      {/*
      <Requests2 />
      <div className="px-8 py-5">
        <div className="flex space-x-5">
          <Categories />
          <SecurityThreats />
        </div>
        <div className="flex justify-between mt-5 pl-6 pr-7 py-4 bg-white">
          <p className="font-bold">Time Series Request</p>
          <div>
            <div className="mb-2.5">
              <MdDateRange className="absolute ml-1 mt-0.5 p-1 w-7 h-7 text-gray-500 fill-current" />
              <select
                id="location"
                name="location"
                className="pl-9 pr-20 text-gray-500 text-xs border-gray-300 focus:border-indigo-500 rounded-md focus:outline-none focus:ring-indigo-500"
              >
                <option selected>Last 7 Days</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <LineChartJS />
          <div className="items-center mr-10 mt-6 pb-7 text-right space-x-5">
            <select
              id="location"
              name="location"
              className="w-52 text-gray-500 text-xs border-gray-300 focus:border-indigo-500 rounded-md focus:outline-none focus:ring-indigo-500"
            >
              <option selected>All Organizations</option>
            </select>
            <select
              id="location"
              name="location"
              className="w-52 text-gray-500 text-xs border-gray-300 focus:border-indigo-500 rounded-md focus:outline-none focus:ring-indigo-500"
            >
              <option selected>All Sites</option>
            </select>
            <select
              id="location"
              name="location"
              className="w-52 text-gray-500 text-xs border-gray-300 focus:border-indigo-500 rounded-md focus:outline-none focus:ring-indigo-500"
            >
              <option selected>All Deployments Types</option>
            </select>
            <select
              id="location"
              name="location"
              className="w-60 text-gray-500 text-gray-500 text-xs border-gray-300 focus:border-indigo-500 rounded-md focus:outline-none focus:ring-indigo-500"
            >
              <option selected>Select a Roaming Client or User</option>
            </select>
          </div>
          <div className="m-7 pb-7 text-xs">
            <div className="grid grid-cols-6 px-5 text-gray-400 text-xs">
              <p>ORGANIZATION</p>
              <p>DEPLOYMENT</p>
              <p>FQDN</p>
              <p>LOCAL ADDRESS</p>
              <p>TIME OF REQUESTS</p>
            </div>
            <div className="grid-row-10 grid">
              <div className="mb-1 mt-4 px-5 border rounded-md">
                <div className="grid grid-cols-6 py-3 border-b border-dashed border-gray-300">
                  <p>Anaptyx</p>
                  <p className="flex items-center">
                    <DiWindows className="mr-1 w-5 h-5 text-blue-500" />
                    LAPTOP-WIN-01
                  </p>
                  <p>tps10255.doubleverify.com</p>
                  <p>103.247.36.36</p>
                  <p>2020-08-19 13:34:41.945617</p>
                  <span className="place-self-end">
                    <MdKeyboardArrowRight className="w-4 h-4 text-gray-400" />
                  </span>
                </div>
                <div className="grid grid-cols-6 mt-3.5 text-gray-400">
                  <p>WAN IP</p>
                  <p>SERVER LOCATION</p>
                  <p>RESPONSE TIME</p>
                  <p>ANYCAST NETWORK</p>
                  <p>AGENT TYPE</p>
                </div>
                <div className="grid grid-cols-6 mb-3 mt-2">
                  <p>67.12.48.133</p>
                  <p>Dallas, TX, USA</p>
                  <p>0.11395 ms</p>
                  <p>DNS1</p>
                  <p className="text-gray-400">--</p>
                </div>
              </div>
              <div className="grid grid-cols-6 items-center my-1 px-5 py-3 border rounded-md">
                <p>Anaptyx</p>
                <p className="flex items-center">
                  <DiWindows className="mr-1 w-5 h-5 text-blue-500" />
                  LAPTOP-WIN-01
                </p>
                <p>tps10255.doubleverify.com</p>
                <p>103.247.36.36</p>
                <p>2020-08-19 13:34:41.945617</p>
                <span className="place-self-end">
                  <MdKeyboardArrowRight className="w-4 h-4 text-gray-400" />
                </span>
              </div>
              <div className="grid grid-cols-6 items-center my-1 px-5 py-3 border rounded-md">
                <p>Anaptyx</p>
                <p className="flex items-center">
                  <DiWindows className="mr-1 w-5 h-5 text-blue-500" />
                  LAPTOP-WIN-01
                </p>
                <p>tps10255.doubleverify.com</p>
                <p>103.247.36.36</p>
                <p>2020-08-19 13:34:41.945617</p>
                <span className="place-self-end">
                  <MdKeyboardArrowRight className="w-4 h-4 text-gray-400" />
                </span>
              </div>
              <div className="grid grid-cols-6 items-center my-1 px-5 py-3 border rounded-md">
                <p>Anaptyx</p>
                <p className="flex items-center">
                  <DiWindows className="mr-1 w-5 h-5 text-blue-500" />
                  LAPTOP-WIN-01
                </p>
                <p>tps10255.doubleverify.com</p>
                <p>103.247.36.36</p>
                <p>2020-08-19 13:34:41.945617</p>
                <span className="place-self-end">
                  <MdKeyboardArrowRight className="w-4 h-4 text-gray-400" />
                </span>
              </div>
              <div className="grid grid-cols-6 items-center my-1 px-5 py-3 border rounded-md">
                <p>Anaptyx</p>
                <p className="flex items-center">
                  <DiWindows className="mr-1 w-5 h-5 text-blue-500" />
                  LAPTOP-WIN-01
                </p>
                <p>tps10255.doubleverify.com</p>
                <p>103.247.36.36</p>
                <p>2020-08-19 13:34:41.945617</p>
                <span className="place-self-end">
                  <MdKeyboardArrowRight className="w-4 h-4 text-gray-400" />
                </span>
              </div>
              <div className="grid grid-cols-6 items-center my-1 px-5 py-3 border rounded-md">
                <p>Anaptyx</p>
                <p className="flex items-center">
                  <DiWindows className="mr-1 w-5 h-5 text-blue-500" />
                  LAPTOP-WIN-01
                </p>
                <p>tps10255.doubleverify.com</p>
                <p>103.247.36.36</p>
                <p>2020-08-19 13:34:41.945617</p>
                <span className="place-self-end">
                  <MdKeyboardArrowRight className="w-4 h-4 text-gray-400" />
                </span>
              </div>
              <div className="grid grid-cols-6 items-center my-1 px-5 py-3 border rounded-md">
                <p>Anaptyx</p>
                <p className="flex items-center">
                  <DiWindows className="mr-1 w-5 h-5 text-blue-500" />
                  LAPTOP-WIN-01
                </p>
                <p>tps10255.doubleverify.com</p>
                <p>103.247.36.36</p>
                <p>2020-08-19 13:34:41.945617</p>
                <span className="place-self-end">
                  <MdKeyboardArrowRight className="w-4 h-4 text-gray-400" />
                </span>
              </div>
              <div className="grid grid-cols-6 items-center my-1 px-5 py-3 border rounded-md">
                <p>Anaptyx</p>
                <p className="flex items-center">
                  <DiWindows className="mr-1 w-5 h-5 text-blue-500" />
                  LAPTOP-WIN-01
                </p>
                <p>tps10255.doubleverify.com</p>
                <p>103.247.36.36</p>
                <p>2020-08-19 13:34:41.945617</p>
                <span className="place-self-end">
                  <MdKeyboardArrowRight className="w-4 h-4 text-gray-400" />
                </span>
              </div>
              <div className="grid grid-cols-6 items-center my-1 px-5 py-3 border rounded-md">
                <p>Anaptyx</p>
                <p className="flex items-center">
                  <DiWindows className="mr-1 w-5 h-5 text-blue-500" />
                  LAPTOP-WIN-01
                </p>
                <p>tps10255.doubleverify.com</p>
                <p>103.247.36.36</p>
                <p>2020-08-19 13:34:41.945617</p>
                <span className="place-self-end">
                  <MdKeyboardArrowRight className="w-4 h-4 text-gray-400" />
                </span>
              </div>
              <div className="grid grid-cols-6 items-center my-1 px-5 py-3 border rounded-md">
                <p>Anaptyx</p>
                <p className="flex items-center">
                  <DiWindows className="mr-1 w-5 h-5 text-blue-500" />
                  LAPTOP-WIN-01
                </p>
                <p>tps10255.doubleverify.com</p>
                <p>103.247.36.36</p>
                <p>2020-08-19 13:34:41.945617</p>
                <span className="place-self-end">
                  <MdKeyboardArrowRight className="w-4 h-4 text-gray-400" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      */}
      {/* <Requests3 />
      <div className="px-7 py-5">
        <div>
          <DeviceInfos />
        </div>
        <div className="mt-7 bg-white rounded-md shadow-md">
          <h2 className="pl-6 py-6 font-bold">Time Series Request</h2>
          <LineChartJS />
        </div>
        <div className="mt-7">
          <PanelLayout3 />
        </div>
      </div> */}
    </div>
  )
}
