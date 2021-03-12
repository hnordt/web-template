import React from "react"
import PropTypes from "prop-types"
import { PopoverDisclosure, Popover, usePopoverState } from "reakit"
import Calendar from "react-calendar"
import dayjs from "dayjs"
import cn from "classnames"

export function formatDateRangePickerValue(value, options = []) {
  if (Array.isArray(value)) {
    return value.map((date) => dayjs(date).format("ll")).join(" - ")
  }

  if (dayjs(value).isValid()) {
    return dayjs(value).format("ll")
  }

  return options.find((option) => option.value === value)?.label ?? "Unknown"
}

export function parseDateRangePickerValue(value) {
  if (Array.isArray(value)) {
    return value
  }

  if (dayjs(value).isValid()) {
    return value
  }

  if (value === "today") {
    return dayjs().format("YYYY-MM-DD")
  }

  if (value === "yesterday") {
    return dayjs().subtract(1, "day").format("YYYY-MM-DD")
  }

  return [
    dayjs().add(Number(value.slice(0, -1)), value.slice(-1)),
    dayjs(),
  ].map((date) => date.format("YYYY-MM-DD"))
}

// TODO: the real name is supposed to be something like DateOrDateRangePicker
export default function DateRangePicker(props) {
  const custom = Array.isArray(props.value) || dayjs(props.value).isValid()

  const popoverState = usePopoverState({
    placement: "bottom-start",
    gutter: 4,
  })

  return (
    <div>
      <PopoverDisclosure
        {...popoverState}
        as="button"
        className="relative pl-3 pr-10 py-2 text-left bg-white border focus:border-blue-500 border-gray-300 rounded-md focus:outline-none shadow-sm cursor-default focus:ring-blue-500 focus:ring-1 sm:text-sm"
        id="location"
      >
        <span className="block truncate">
          {formatDateRangePickerValue(props.value, props.options)}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </PopoverDisclosure>
      <Popover
        {...popoverState}
        className="w-80 focus:outline-none"
        aria-label="Select date"
      >
        <ul className="bg-white rounded-md shadow-lg divide-y ring-black ring-opacity-10 ring-1">
          {props.options.map((option) => (
            <li key={option.value}>
              <label className="flex items-center p-4 text-sm cursor-pointer space-x-3">
                <input
                  type="radio"
                  className="w-4 h-4 text-blue-600 border-gray-300 cursor-pointer focus:ring-blue-500"
                  name="pricing_plan"
                  value={option.value}
                  checked={option.value === props.value}
                  onChange={(e) => props.onValueChange?.(e.target.value)}
                />

                <span className="text-gray-900 font-medium">
                  {option.label}
                </span>
              </label>
            </li>
          ))}
          <li className="relative">
            <label className="flex items-center p-4 text-sm cursor-pointer space-x-3">
              <input
                type="radio"
                className="w-4 h-4 text-blue-600 border-gray-300 cursor-pointer focus:ring-blue-500"
                name="pricing_plan"
                value="custom"
                checked={custom}
                onChange={() =>
                  props.onValueChange?.(parseDateRangePickerValue(props.value))
                }
              />
              <span className="text-gray-900 font-medium">Custom</span>
            </label>
            {custom && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <label className="flex items-center space-x-3">
                  <span className="text-gray-500 text-sm">Multiple days</span>
                  <button
                    type="button"
                    className={cn(
                      "relative inline-flex flex-shrink-0 w-11 h-6 border-2 border-transparent rounded-full focus:outline-none cursor-pointer transition-colors duration-200 ease-in-out focus:ring-blue-500 focus:ring-offset-2 focus:ring-2",
                      Array.isArray(props.value) ? "bg-blue-600" : "bg-gray-200"
                    )}
                    onClick={() =>
                      props.onValueChange?.(
                        Array.isArray(props.value)
                          ? props.value[0]
                          : [
                              props.value,
                              dayjs(props.value)
                                .add(1, "day")
                                .format("YYYY-MM-DD"),
                            ]
                      )
                    }
                  >
                    <span
                      className={cn(
                        "inline-block w-5 h-5 bg-white rounded-full shadow pointer-events-none transform transition duration-200 ease-in-out ring-0",
                        Array.isArray(props.value)
                          ? "translate-x-5"
                          : "translate-x-0"
                      )}
                      aria-hidden
                    />
                  </button>
                </label>
              </div>
            )}
          </li>
          {custom && (
            <li>
              {Array.isArray(props.value) ? (
                <Calendar
                  className="rounded-b-md"
                  tileClassName="focus:outline-none"
                  value={props.value.map((date) => dayjs(date).toDate())}
                  selectRange
                  onChange={(value) =>
                    props.onValueChange?.(
                      value.map((date) => dayjs(date).format("YYYY-MM-DD"))
                    )
                  }
                />
              ) : (
                <Calendar
                  className="rounded-b-md"
                  tileClassName="focus:outline-none"
                  value={dayjs(props.value).toDate()}
                  onChange={(value) =>
                    props.onValueChange?.(dayjs(value).format("YYYY-MM-DD"))
                  }
                />
              )}
            </li>
          )}
        </ul>
      </Popover>
    </div>
  )
}

DateRangePicker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  onValueChange: PropTypes.func,
}
