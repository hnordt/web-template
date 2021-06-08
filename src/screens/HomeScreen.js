import React from "react"
import {
  ChevronRightIcon,
  HomeIcon,
  SearchIcon,
  TrashIcon,
} from "@heroicons/react/solid"
import {
  PhoneIcon,
  DeviceMobileIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/outline"

import sites from "data/sites.json"
import controllers from "data/controllers.json"

const users = [
  {
    id: 1,
    name: "Leslie Abbott",
    email: "leslie@digichem.com",
    phone: "+61 (00) 0000 0000",
    role: "admin",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Hector Adams",
    email: "hector.adams@digichem.com",
    mobile: "+61 (00) 0000 0000",
    role: "admin",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "Blake Alexander",
    email: "b.alexander@digichem.com",
    role: "user",
    imageUrl:
      "https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
]

export default function HomeScreen() {
  return (
    <main className="min-h-screen bg-blue-gray-100">
      <header className="py-4 bg-blue-gray-800">
        <Container>
          <div className="flex items-center space-x-8">
            <img
              className="h-8"
              src="https://new-dev.digichemplus.com/logo.png"
              alt="Digichemplus"
            />
            <nav>
              <ol className="flex items-center text-gray-200 text-sm font-medium space-x-8">
                <li>Dashboard</li>
                <li>Sites</li>
                <li>Controllers</li>
                <li className="px-3 py-2 bg-gray-900 rounded-md">Users</li>
                <li>Reports</li>
              </ol>
            </nav>
          </div>
        </Container>
      </header>
      <Breadcrumbs
        pages={[
          {
            name: "Users",
            href: "#",
            current: false,
          },
          // {
          //   name: users[0].name,
          //   href: "#",
          //   current: true,
          // },
        ]}
      />
      <div className="py-10">
        <Container>
          <UsersScreen />
          {/* <UserScreen /> */}
        </Container>
      </div>
    </main>
  )
}

function UserScreen() {
  const user = users[0]

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-5">
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  className="w-16 h-16 rounded-full"
                  src={user.imageUrl}
                  alt=""
                />
                <span
                  className="absolute inset-0 rounded-full shadow-inner"
                  aria-hidden
                />
              </div>
            </div>
            <div>
              <h1 className="text-gray-900 text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-500 text-sm font-medium">{user.email}</p>
            </div>
          </div>
          <div className="justify-stretch flex flex-col-reverse mt-6 space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-x-reverse sm:space-y-0 md:flex-row md:mt-0 md:space-x-3">
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 text-gray-700 text-sm font-medium hover:bg-gray-50 bg-white border border-gray-300 rounded-md focus:outline-none shadow-sm focus:ring-blue-500 focus:ring-offset-gray-100 focus:ring-offset-2 focus:ring-2"
            >
              Edit
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 text-white text-sm font-medium bg-red-600 hover:bg-red-700 border border-transparent rounded-md focus:outline-none shadow-sm focus:ring-blue-500 focus:ring-offset-gray-100 focus:ring-offset-2 focus:ring-2"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2
            id="applicant-information-title"
            className="text-gray-900 text-lg font-medium leading-6"
          >
            General
          </h2>
          <p className="mt-1 max-w-2xl text-gray-500 text-sm">
            Personal details
          </p>
        </div>
        <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
          <dl className="grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-gray-500 text-sm font-medium">Phone</dt>
              <dd className="mt-1 text-gray-900 text-sm">{user.phone}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-gray-500 text-sm font-medium">Mobile</dt>
              <dd className="mt-1 text-gray-900 text-sm">
                {user.mobile ?? "-"}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-gray-500 text-sm font-medium">Role</dt>
              <dd className="mt-1 text-gray-900 text-sm">
                {user.role === "admin" ? (
                  <span className="inline-flex items-center px-3 py-0.5 text-green-800 text-sm font-medium bg-green-100 rounded-full">
                    Admin
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-0.5 text-gray-800 text-sm font-medium bg-gray-100 rounded-full">
                    User
                  </span>
                )}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-gray-500 text-sm font-medium">Last access</dt>
              <dd className="mt-1 text-gray-900 text-sm">3 days ago</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-gray-500 text-sm font-medium">About</dt>
              <dd className="mt-1 text-gray-900 text-sm">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-6 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2
            id="applicant-information-title"
            className="text-gray-900 text-lg font-medium leading-6"
          >
            Access control
          </h2>
          <p className="mt-1 max-w-2xl text-gray-500 text-sm">
            Control user access to sites and controllers
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="flex divide-x">
            <div className="flex-1">
              <SiteAccessControl />
            </div>
            <div className="flex-1">
              <ControllerAccessControl />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function SiteAccessControl() {
  return (
    <div>
      <div className="flex items-center justify-between px-6 py-2 text-gray-500 text-sm font-medium bg-gray-50 border-b">
        <span>Sites</span>
        <button className="p-0.5 text-green-100 bg-green-500 border border-green-500 rounded-full">
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
      {/* <div className="p-6 border-b">
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="search"
            name="search"
            id="search"
            className="block pl-10 w-full border-gray-300 focus:border-pink-500 rounded-md focus:ring-pink-500 sm:text-sm"
            placeholder="Search"
          />
        </div>
      </div> */}
      <div className="flow-root">
        <ul className="divide-gray-200 divide-y">
          {sites.results.map((site) => (
            <li key={site.handle} className="px-6 py-4">
              <div className="flex items-center space-x-4">
                {/* <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={person.imageUrl}
                    alt=""
                  />
                </div> */}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 text-sm font-medium truncate">
                    {site.site}
                  </p>
                  {site.address && (
                    <p className="text-gray-500 text-sm truncate">
                      {site.address.city}, {site.address?.state}
                    </p>
                  )}
                </div>
                <div>
                  <button className="p-1 text-gray-700 border border-gray-300 rounded-full">
                    <MinusIcon className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ControllerAccessControl() {
  return (
    <div>
      <div className="flex items-center justify-between px-6 py-2 text-gray-500 text-sm font-medium bg-gray-50 border-b">
        <span>Controllers</span>
        <button className="p-0.5 text-green-100 bg-green-500 border border-green-500 rounded-full">
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
      {/* <div className="p-6 border-b">
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="search"
            name="search"
            id="search"
            className="block pl-10 w-full border-gray-300 focus:border-pink-500 rounded-md focus:ring-pink-500 sm:text-sm"
            placeholder="Search"
          />
        </div>
      </div> */}
      <div className="flow-root">
        <ul className="border-b divide-gray-200 divide-y">
          {controllers.results.map((controller) => (
            <li key={controller.handle} className="px-6 py-4">
              <div className="flex items-center space-x-4">
                {/* <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={person.imageUrl}
                    alt=""
                  />
                </div> */}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 text-sm font-medium truncate">
                    {controller.site.site}
                  </p>
                  <p className="text-gray-500 text-sm truncate">
                    {controller.device?.name}
                  </p>
                </div>
                <div>
                  <button className="p-1 text-gray-700 border border-gray-300 rounded-full">
                    <MinusIcon className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function UsersScreen() {
  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 text-2xl font-bold">Users</h1>
            <p className="text-gray-500 text-sm">{users.length} users found</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-white text-sm font-medium bg-green-600 hover:bg-green-700 border border-transparent rounded-md focus:outline-none shadow-sm focus:ring-green-500 focus:ring-offset-2 focus:ring-2"
          >
            Invite User
          </button>
        </div>
      </div>
      <UsersWidget />
    </>
  )
}

function Breadcrumbs(props) {
  return (
    <nav
      className="flex bg-white border-b border-gray-200 shadow-sm"
      aria-label="Breadcrumbs"
    >
      <Container>
        <ol className="flex space-x-4">
          <li className="flex">
            <div className="flex items-center">
              <a className="text-gray-400 hover:text-gray-500" href="#home">
                <HomeIcon className="flex-shrink-0 w-5 h-5" aria-hidden />
                <span className="sr-only">Home</span>
              </a>
            </div>
          </li>
          {props.pages.map((page) => (
            <li key={page.name} className="flex">
              <div className="flex items-center">
                <svg
                  className="flex-shrink-0 w-6 h-full text-gray-200"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>
                <a
                  href={page.href}
                  className="ml-4 text-gray-500 hover:text-gray-700 text-sm font-medium"
                  aria-current={page.current ? "page" : undefined}
                >
                  {page.name}
                </a>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </nav>
  )
}

function Container(props) {
  return <div className="mx-auto w-full max-w-screen-xl">{props.children}</div>
}

function UsersWidget(props) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block align-middle py-2 min-w-full sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-gray-200 divide-y">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-gray-500 text-xs font-medium tracking-wider uppercase"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-gray-500 text-xs font-medium tracking-wider uppercase"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-gray-500 text-xs font-medium tracking-wider uppercase"
                  >
                    Mobile
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-gray-500 text-xs font-medium tracking-wider uppercase"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View details</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-gray-200 divide-y">
                {users.map((user) => (
                  <tr key={user.email}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-gray-900 text-sm font-medium">
                            {user.name}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-gray-500 text-sm">
                        {user.phone ? (
                          <>
                            <PhoneIcon
                              className="flex-shrink-0 mr-1.5 w-5 h-5 text-gray-400"
                              aria-hidden
                            />
                            <p>{user.phone}</p>
                          </>
                        ) : (
                          <>&ndash;</>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-gray-500 text-sm">
                        {user.mobile ? (
                          <>
                            <DeviceMobileIcon
                              className="flex-shrink-0 mr-1.5 w-5 h-5 text-gray-400"
                              aria-hidden
                            />
                            <p>{user.mobile}</p>
                          </>
                        ) : (
                          <>&ndash;</>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.role === "admin" ? (
                        <span className="inline-flex items-center px-3 py-0.5 text-green-800 text-sm font-medium bg-green-100 rounded-full">
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-0.5 text-gray-800 text-sm font-medium bg-gray-100 rounded-full">
                          User
                        </span>
                      )}
                    </td>
                    <td className="align-middle px-6 py-4">
                      <ChevronRightIcon
                        className="float-right w-5 h-5 text-gray-400"
                        aria-hidden
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
