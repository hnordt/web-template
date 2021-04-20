import React, { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import {
  ChevronDownIcon,
  CogIcon,
  DotsVerticalIcon,
  DownloadIcon,
  HomeIcon,
  PaperClipIcon,
  PencilAltIcon,
  PencilIcon,
  UploadIcon,
} from "@heroicons/react/solid"
import cn from "classnames"
import settings from "data/settings.json"
import theme from "utils/theme"
import { Disclosure } from "@headlessui/react"
import { ChevronUpIcon } from "@heroicons/react/solid"

console.log({
  settings,
})

const solutions = settings.results.map((result) => ({
  name: result.category,
  description: result.description,
  href: "#",
  icon: IconOne,
}))

// const solutions = [
//   {
//     name: "Insights",
//     description: "Measure actions your users take",
//     href: "##",
//     icon: IconOne,
//   },
//   {
//     name: "Automations",
//     description: "Create your own targeted content",
//     href: "##",
//     icon: IconTwo,
//   },
//   {
//     name: "Reports",
//     description: "Keep track of your growth",
//     href: "##",
//     icon: IconThree,
//   },
// ]

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill={theme.colors.blue["100"]} />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke={theme.colors.blue["500"]}
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke={theme.colors.blue["400"]}
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke={theme.colors.blue["400"]}
        strokeWidth="2"
      />
    </svg>
  )
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  )
}

const pages = [
  {
    name: "Settings",
    href: "#",
    current: false,
  },
  {
    name: "Conductivity",
    href: "#",
    current: true,
  },
]

const blocks = [
  {
    name: "Bleed Setpoint",
    value: "1200 ppm TDS",
    change: "1100 ppm TDS",
  },
  {
    name: "Conductivity Units",
    value: "ppm TDS",
  },
  {
    name: "Hysteresis",
    value: "3%",
  },
  {
    name: "Bleed Cycle On Time",
    value: "0 secs",
  },
  {
    name: "Bleed Cycle Pause Time",
    value: "0 secs",
  },
]

const tabs = [
  {
    name: "My Account",
    href: "#",
    current: false,
  },
  {
    name: "Company",
    href: "#",
    current: false,
  },
  {
    name: "Team Members",
    href: "#",
    current: true,
  },
  {
    name: "Billing",
    href: "#",
    current: false,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Index() {
  const [global, setGlobal] = React.useState(true)
  const [readOnly, setReadOnly] = React.useState(true)
  const [edited, setEdited] = React.useState(false)

  return (
    <main className="p-6 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white overflow-hidden sm:rounded-lg sm:shadow">
        <div
          className={
            global ? "border-b border-gray-800" : "border-b border-gray-200"
          }
        >
          <div className="flex flex-wrap justify-between bg-gray-800 sm:flex-nowrap">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex px-6 space-x-4">
                <li className="flex">
                  <div className="flex items-center">
                    <a href="#" className="hover:text-gray-500 text-white">
                      <CogIcon
                        className="flex-shrink-0 w-5 h-5"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Settings</span>
                    </a>
                  </div>
                </li>
                {global ? (
                  <li className="flex">
                    <div className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-6 h-full text-gray-600"
                        viewBox="0 0 24 44"
                        preserveAspectRatio="none"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                      </svg>
                      <a
                        href="#"
                        className="ml-4 hover:text-gray-700 text-white text-sm font-medium"
                        aria-current={false ? "page" : undefined}
                      >
                        Overview
                      </a>
                    </div>
                  </li>
                ) : (
                  pages.map((page) => (
                    <li key={page.name} className="flex">
                      <div className="flex items-center">
                        <svg
                          className="flex-shrink-0 w-6 h-full text-gray-200"
                          viewBox="0 0 24 44"
                          preserveAspectRatio="none"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                        </svg>
                        <Popover className="relative">
                          {({ open }) => (
                            <>
                              <Popover.Button
                                //               className={`
                                // ${open ? "" : "text-opacity-90"}
                                // text-white group bg-blue-700 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                                className={`ml-4 text-gray-500 hover:text-gray-700 text-sm font-medium`}
                                aria-current={page.current ? "page" : undefined}
                              >
                                {page.name}
                                {/* <span>Menu</span>
                              <ChevronDownIcon
                                className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-blue-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                                aria-hidden="true"
                              /> */}
                              </Popover.Button>
                              <Transition
                                show={open}
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                              >
                                <Popover.Panel
                                  static
                                  className={`-ml-px absolute z-10 -left-6 mt-3 px-4 w-screen max-w-sm transform sm:px-0 lg:max-w-2xl`}
                                >
                                  <div className="-mt-px border border-t-0 border-gray-200 rounded-b-lg shadow-lg overflow-hidden">
                                    <div className="relative grid gap-8 p-7 bg-white lg:grid-cols-2">
                                      {solutions.map((item) => (
                                        <a
                                          key={item.name}
                                          href={item.href}
                                          className={
                                            item.name === "Settings"
                                              ? "ring-2 ring-blue-500 bg-gray-50 flex items-center -m-3 p-2 hover:bg-gray-50 rounded-lg focus:outline-none transition duration-150 ease-in-out focus-visible:ring-blue-500 focus-visible:ring-opacity-50 focus-visible:ring"
                                              : "flex items-center -m-3 p-2 hover:bg-gray-50 rounded-lg focus:outline-none transition duration-150 ease-in-out focus-visible:ring-blue-500 focus-visible:ring-opacity-50 focus-visible:ring"
                                          }
                                        >
                                          <div className="flex flex-shrink-0 items-center justify-center w-10 h-10 text-white sm:w-12 sm:h-12">
                                            <item.icon aria-hidden="true" />
                                          </div>
                                          <div className="ml-4">
                                            <p className="text-gray-900 text-sm font-medium">
                                              {item.name}
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                              {item.description}
                                            </p>
                                          </div>
                                        </a>
                                      ))}
                                    </div>
                                    {/* <div className="p-4 bg-gray-50">
                                    <a
                                      href="##"
                                      className="flow-root px-2 py-2 hover:bg-gray-100 rounded-md focus:outline-none transition duration-150 ease-in-out focus-visible:ring-blue-500 focus-visible:ring-opacity-50 focus-visible:ring"
                                    >
                                      <span className="flex items-center">
                                        <span className="text-gray-900 text-sm font-medium">
                                          Last change
                                        </span>
                                      </span>
                                      <span className="block text-gray-500 text-sm">
                                        Low alarm changed from 0 to 0.0 by Local
                                        User
                                      </span>
                                    </a>
                                  </div> */}
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          )}
                        </Popover>
                      </div>
                    </li>
                  ))
                )}
              </ol>
            </nav>
            {/* <div className="flex-shrink-0 ml-4">
              {readOnly && (
                <>
                  <button
                    className="px-6 h-full text-gray-400 hover:text-gray-500 text-sm font-medium border-l"
                    type="button"
                    onClick={() => setReadOnly(!readOnly)}
                  >
                    <DotsVerticalIcon
                      className="flex-shrink-0 w-5 h-5"
                      aria-hidden="true"
                    />
                  </button>
                </>
              )}
            </div> */}
          </div>
        </div>
        <div>
          {global && (
            <>
              <div className="flex flex-col">
                {settings.results.map((result) => (
                  <>
                    <Disclosure>
                      {({ open }) => (
                        <div className={open ? "" : "border-t border-gray-900"}>
                          <Disclosure.Button
                            as={open ? "button" : "div"}
                            className={
                              open
                                ? "w-full text-left focus:outline-none"
                                : "grid grid-cols-4 px-6 items-center cursor-pointer bg-gray-800"
                            }
                          >
                            {open ? (
                              <div className="relative pb-6 pt-6 px-6 border-t-2 border-blue-500 overflow-hidden">
                                <div className="absolute -right-12 -top-3 flex items-end justify-center pb-1 w-28 h-9 bg-gradient-to-tr rounded-full from-blue-500 to-purple-600 transform rotate-45">
                                  <CogIcon
                                    className="flex-shrink-0 w-4 h-4 text-white"
                                    aria-hidden="true"
                                  />
                                </div>
                                <h3 className="text-gray-900 text-lg font-medium leading-6">
                                  {result.category}
                                </h3>
                                <p className="mt-1 max-w-2xl text-gray-500 text-sm">
                                  {result.description}
                                </p>
                              </div>
                            ) : (
                              <>
                                <div className="py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 w-10 h-10">
                                      <div className="inline-flex items-center justify-center w-10 h-10 text-white bg-gradient-to-tl rounded-full from-purple-600 to-blue-600">
                                        <CogIcon
                                          className="w-6 h-6"
                                          aria-hidden="true"
                                        />
                                      </div>
                                    </div>
                                    <div className="ml-3">
                                      <div className="text-white text-sm font-medium">
                                        {result.category}
                                      </div>
                                      <div className="text-gray-400 text-sm">
                                        {result.description}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-span-2 pl-24 py-4 whitespace-nowrap">
                                  <div className="text-gray-400 text-sm truncate">
                                    {result.child
                                      .map((child) => child.category)
                                      .join(", ")}
                                  </div>
                                </div>
                                <div className="flex justify-end py-4 whitespace-nowrap text-sm font-medium">
                                  {/* <a
                                        href="#"
                                        className="text-blue-600 hover:text-blue-900"
                                      >
                                        Edit
                                      </a> */}
                                  <ChevronDownIcon
                                    className={`${open ? "" : "text-opacity-70"}
                  h-5 w-5 text-gray-400 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                                    aria-hidden="true"
                                  />
                                </div>
                              </>
                              // <div className="px-6 py-4 border-t overflow-hidden">
                              //   <div className="flex items-center justify-between">
                              //     <div>
                              //       <h3 className="text-gray-900 text-lg font-medium leading-6">
                              //         {result.category}
                              //       </h3>
                              //       <p className="mt-1 max-w-2xl text-gray-500 text-sm">
                              //         {result.description}
                              //       </p>
                              //     </div>
                              //     <ChevronUpIcon
                              //       className={`${
                              //         open
                              //           ? "transform rotate-180"
                              //           : ""
                              //       } w-5 h-5 text-gray-500`}
                              //     />
                              //   </div>
                              // </div>
                            )}
                          </Disclosure.Button>
                          <Disclosure.Panel>
                            <div className="pb-6 px-6">
                              <div className="-mt-4 space-y-8">
                                {/* <nav className="flex space-x-4" aria-label="Tabs">
                                {result.child.map((child, childIndex) => (
                                  <a
                                    key={child.id}
                                    href="#todo"
                                    className={classNames(
                                      childIndex === 0
                                        ? "bg-blue-100 text-blue-700"
                                        : "text-gray-500 hover:text-gray-700",
                                      "px-3 py-2 text-sm font-medium rounded-md"
                                    )}
                                    aria-current={
                                      childIndex === 0 ? "page" : undefined
                                    }
                                  >
                                    {child.category}
                                  </a>
                                ))}
                              </nav> */}
                                <div className="-mx-6 px-6 border-b border-gray-200">
                                  <nav
                                    className="flex -mb-px space-x-8"
                                    aria-label="Tabs"
                                  >
                                    {result.child.map((child, childIndex) => (
                                      <a
                                        key={child.catgory}
                                        href={child.href}
                                        className={classNames(
                                          childIndex === 0
                                            ? "border-blue-500 text-blue-600"
                                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                          "group inline-flex items-center py-4 text-sm font-medium border-b-2"
                                        )}
                                        aria-current={
                                          childIndex === 0 ? "page" : undefined
                                        }
                                      >
                                        {/* <tab.icon
                                        className={classNames(
                                          tab.current
                                            ? "text-blue-500"
                                            : "text-gray-400 group-hover:text-gray-500",
                                          "-ml-0.5 mr-2 w-5 h-5"
                                        )}
                                        aria-hidden="true"
                                      /> */}
                                        <span>{child.category}</span>
                                      </a>
                                    ))}
                                  </nav>
                                </div>
                                <div className="float-right opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    className="text-blue-500 hover:text-blue-600"
                                    type="button"
                                    onClick={() => setReadOnly(!readOnly)}
                                  >
                                    <PencilIcon
                                      className="flex-shrink-0 w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                                <dl className="grid gap-x-8 gap-y-8 grid-cols-1 sm:grid-cols-3">
                                  {result.child[0].setting.map((setting) => (
                                    <div
                                      key={setting.id}
                                      className="sm:col-span-1"
                                    >
                                      <dt className="text-gray-900 text-sm font-medium">
                                        {setting.label}
                                      </dt>
                                      <dd className="mt-1 text-gray-900 text-sm">
                                        {String(setting.value.value) || "N/D"}
                                      </dd>
                                    </div>
                                  ))}
                                </dl>
                                {/* {result.child.map((child) => (
                                <Disclosure className="group">
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button
                                        key={child.id}
                                        className="flex justify-between px-4 py-2 w-full text-left text-blue-900 text-sm font-medium bg-blue-100 hover:bg-blue-200 rounded-lg focus:outline-none focus-visible:ring-blue-500 focus-visible:ring-opacity-75 focus-visible:ring"
                                      >
                                        <span>{child.category}</span>
                                        <ChevronUpIcon
                                          className={`${
                                            open ? "transform rotate-180" : ""
                                          } w-5 h-5 text-blue-500`}
                                        />
                                      </Disclosure.Button>
                                      <Disclosure.Panel className="group pb-2 pt-4 px-4 text-gray-500 text-sm">
                                        <div className="float-right opacity-0 group-hover:opacity-100 transition-opacity">
                                          <button
                                            className="text-blue-500 hover:text-blue-600"
                                            type="button"
                                            onClick={() =>
                                              setReadOnly(!readOnly)
                                            }
                                          >
                                            <PencilIcon
                                              className="flex-shrink-0 w-5 h-5"
                                              aria-hidden="true"
                                            />
                                          </button>
                                        </div>
                                        <dl className="grid gap-x-8 gap-y-8 grid-cols-1 sm:grid-cols-3">
                                          {child.setting.map((setting) => (
                                            <div
                                              key={setting.id}
                                              className="sm:col-span-1"
                                            >
                                              <dt className="text-gray-500 text-sm font-medium">
                                                {setting.label}
                                              </dt>
                                              <dd className="mt-1 text-gray-900 text-sm">
                                                {String(setting.value.value) ||
                                                  "N/D"}
                                              </dd>
                                            </div>
                                          ))}
                                        </dl>
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              ))} */}
                              </div>
                            </div>
                          </Disclosure.Panel>
                        </div>
                      )}
                    </Disclosure>
                  </>
                ))}
              </div>
            </>
          )}
          {!global && (
            <dl className="grid gap-x-8 gap-y-8 grid-cols-1 sm:grid-cols-3">
              {readOnly
                ? blocks.map((block) => (
                    <div key={block.name} className="sm:col-span-1">
                      <dt className="text-gray-500 text-sm font-medium">
                        {block.name}
                      </dt>
                      <dd className="mt-1 text-gray-900 text-sm">
                        {block.value}
                      </dd>
                    </div>
                  ))
                : blocks.map((block, blockIndex) => (
                    <div key={block.name} className="sm:col-span-1">
                      <dt className="text-gray-500 text-sm font-medium">
                        <span className="flex justify-between">
                          <span>{block.name}</span>
                          {edited && block.change && (
                            <button
                              className="text-red-800 line-through text-sm font-medium"
                              type="button"
                              onClick={() => setEdited(false)}
                            >
                              {block.value}
                            </button>
                          )}
                        </span>
                      </dt>
                      <dd className="mt-1 text-gray-900 text-sm">
                        <div className="flex border focus-within:border-blue-500 border-gray-300 rounded-md shadow-sm overflow-hidden focus-within:ring-blue-500 focus-within:ring-1">
                          <input
                            className="block w-full border-none focus:ring-0 sm:text-sm"
                            type="text"
                            value={
                              edited && block.change
                                ? "1100 ppm TDS"
                                : block.value
                            }
                            onChange={() => setEdited(true)}
                          />
                        </div>
                      </dd>
                    </div>
                  ))}
            </dl>
          )}
        </div>
        {!readOnly && (
          <div className="px-6 py-5 border-t">
            <div className="space-x-3">
              <Button type="submit" variant="primary">
                Save changes
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setReadOnly(true)
                  setEdited(false)
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

function Button(props) {
  return (
    <button
      className={cn(
        "inline-flex items-center px-4 py-2 text-sm font-medium border rounded-md focus:outline-none shadow-sm focus:ring-blue-500 focus:ring-offset-2 focus:ring-2",
        props.variant === "primary" &&
          `text-white bg-blue-600 ${
            props.loading || props.disabled ? "" : "hover:bg-blue-700"
          } border-transparent`,
        props.variant === "secondary" &&
          `text-gray-700 ${
            props.loading || props.disabled ? "" : "hover:bg-gray-50"
          } bg-white border-gray-300`,
        props.loading
          ? "cursor-auto"
          : props.disabled && "opacity-60 cursor-auto"
      )}
      type={props.type ?? "button"}
      disabled={props.loading || props.disabled}
      onClick={props.onClick}
    >
      {props.loading ? (
        <img
          className="w-7 h-auto"
          src="data:image/svg+xml,%3Csvg width='120' height='30' xmlns='http://www.w3.org/2000/svg' fill='%23fff'%3E%3Ccircle cx='15' cy='15' r='15'%3E%3Canimate attributeName='r' from='15' to='15' begin='0s' dur='0.8s' values='15;9;15' calcMode='linear' repeatCount='indefinite'/%3E%3Canimate attributeName='fill-opacity' from='1' to='1' begin='0s' dur='0.8s' values='1;.5;1' calcMode='linear' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='60' cy='15' r='9' fill-opacity='.3'%3E%3Canimate attributeName='r' from='9' to='9' begin='0s' dur='0.8s' values='9;15;9' calcMode='linear' repeatCount='indefinite'/%3E%3Canimate attributeName='fill-opacity' from='.5' to='.5' begin='0s' dur='0.8s' values='.5;1;.5' calcMode='linear' repeatCount='indefinite'/%3E%3C/circle%3E%3Ccircle cx='105' cy='15' r='15'%3E%3Canimate attributeName='r' from='15' to='15' begin='0s' dur='0.8s' values='15;9;15' calcMode='linear' repeatCount='indefinite'/%3E%3Canimate attributeName='fill-opacity' from='1' to='1' begin='0s' dur='0.8s' values='1;.5;1' calcMode='linear' repeatCount='indefinite'/%3E%3C/circle%3E%3C/svg%3E"
          alt="Loading..."
        />
      ) : (
        props.children
      )}
    </button>
  )
}
