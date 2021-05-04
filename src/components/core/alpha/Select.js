import React from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import cn from "classnames"

const Select = React.forwardRef(function Select(props, ref) {
  const selectedOption = props.options.find(
    (option) => option.value === props.value
  )

  return (
    <Listbox value={props.value} onChange={props.onChange}>
      {({ open }) => (
        <div>
          <Listbox.Label className="block text-gray-700 text-sm font-medium truncate">
            {props.label}
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button
              ref={ref}
              className="relative pl-3 pr-10 py-2 w-full text-left bg-white border focus:border-blue-500 border-gray-300 rounded-md focus:outline-none shadow-sm cursor-default focus:ring-blue-500 focus:ring-1 sm:text-sm"
            >
              <span className="block truncate">
                {selectedOption?.label ?? "-"}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden />
              </span>
            </Listbox.Button>
            <Transition
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              show={open}
            >
              <Listbox.Options
                className="absolute z-10 mt-1 py-1 w-full max-h-60 text-base bg-white rounded-md focus:outline-none shadow-lg overflow-auto ring-black ring-opacity-5 ring-1 sm:text-sm"
                static
              >
                {props.options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      cn(
                        "relative pl-3 pr-9 py-2 cursor-default select-none",
                        active ? "text-white bg-blue-600" : "text-gray-900"
                      )
                    }
                    value={option.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={cn(
                            "block truncate",
                            selected ? "font-semibold" : "font-normal"
                          )}
                        >
                          {option.label}
                        </span>
                        {selected ? (
                          <span
                            className={cn(
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                              active ? "text-white" : "text-blue-600"
                            )}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
})

export default Select
