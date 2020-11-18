import React from "react"
import { Menu, Transition } from "@headlessui/react"

export default function MenuButton(props) {
  return (
    <div className="relative inline-block text-left">
      <Menu>
        {(menu) => (
          <>
            <span className="rounded-md shadow-sm">
              <Menu.Button className="inline-flex justify-center px-4 py-2 w-full hover:text-gray-500 text-gray-700 active:text-gray-800 text-sm font-medium active:bg-gray-50 bg-white border focus:border-blue-300 border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out">
                <span>{props.label}</span>
                <svg
                  className="-mr-1 ml-2 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </Menu.Button>
            </span>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              show={menu.open}
            >
              <Menu.Items
                className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md outline-none shadow-lg divide-gray-100 divide-y origin-top-right"
                static
              >
                {props.items.map((itemGroup, itemGroupIndex) => (
                  <div key={itemGroupIndex} className="py-1">
                    {itemGroup.map((item) =>
                      item.divider ? null : item.disabled ? (
                        <Menu.Item
                          key={btoa(item.label)}
                          as="span"
                          className="flex justify-between px-4 py-2 w-full text-left text-gray-700 text-sm opacity-50 cursor-not-allowed"
                          disabled
                        >
                          {item.label}
                        </Menu.Item>
                      ) : (
                        <Menu.Item key={btoa(item.label)}>
                          {(menuItem) => (
                            <a
                              className={`${
                                menuItem.active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700"
                              } flex justify-between w-full px-4 py-2 text-sm text-left`}
                              href={item.href ?? "#"}
                              onClick={(e) => {
                                e.preventDefault()
                                item.onClick?.()
                              }}
                            >
                              {item.label}
                            </a>
                          )}
                        </Menu.Item>
                      )
                    )}
                  </div>
                ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}
