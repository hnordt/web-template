import React from "react"
import { PopoverDisclosure, Popover, usePopoverState } from "reakit"
import Calendar from "react-calendar"
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle"
import dayjs from "dayjs"
import cn from "classnames"

export default function Index() {
  // const [value, setValue] = React.useState(new Date())

  return (
    <main className="p-6">
      <DatePicker />
    </main>
  )
}

function getDateRangeFromValue(value) {
  if (Array.isArray(value)) {
    return value
  }

  const dateRange =
    value === "today"
      ? new Array(2).fill(dayjs())
      : value === "yesterday"
      ? new Array(2).fill(dayjs().subtract(1, "day"))
      : [dayjs().add(Number(value.slice(0, -1)), value.slice(-1)), dayjs()]

  return [
    dateRange[0].startOf("day").toDate(),
    dateRange[1].endOf("day").toDate(),
  ]
}

function DatePicker() {
  const [value, setValue] = React.useState("-7d")
  const [multipleDays, setMultipleDays] = React.useState(false)

  const options = [
    {
      label: "Today",
      value: "today",
    },
    {
      label: "Yesterday",
      value: "yesterday",
    },
    {
      label: "Last 7 days",
      value: "-7d",
    },
    {
      label: "Last 30 days",
      value: "-30d",
    },
    {
      label: "Last 12 months",
      value: "-12M",
    },
  ]

  const popover = usePopoverState({
    placement: "bottom-start",
    gutter: 4,
  })

  return (
    <>
      {/* <label
        for="location"
        className="block mb-1 text-gray-700 text-sm font-medium"
      >
        Location
      </label> */}
      <PopoverDisclosure
        {...popover}
        as="button"
        className="relative pl-3 pr-10 py-2 text-left bg-white border focus:border-blue-500 border-gray-300 rounded-md focus:outline-none shadow-sm cursor-default focus:ring-blue-500 focus:ring-1 sm:text-sm"
        id="location"
      >
        <span className="block truncate">
          {Array.isArray(value)
            ? dayjs(value[0]).isSame(value[1], "day")
              ? dayjs(value[0]).format("ll")
              : `${dayjs(value[0]).format("ll")} - ${dayjs(value[1]).format(
                  "ll"
                )}`
            : options.find((option) => option.value === value)?.label ??
              "Unknown"}
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
        {...popover}
        className="w-80 focus:outline-none"
        aria-label="Select date"
      >
        <ul className="bg-white rounded-md shadow-lg divide-y ring-black ring-opacity-10 ring-1">
          {options.map((option) => (
            <li key={option.value}>
              {/* On: "bg-blue-50 border-blue-200 z-10", Off: "border-gray-200" */}
              <label className="flex items-center p-4 text-sm cursor-pointer space-x-3">
                <input
                  type="radio"
                  className="w-4 h-4 text-blue-600 border-gray-300 cursor-pointer focus:ring-blue-500"
                  name="pricing_plan"
                  value={option.value}
                  checked={option.value === value}
                  onChange={(e) => setValue(e.target.value)}
                />
                {/* On: "text-blue-900", Off: "text-gray-900" */}
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
                checked={Array.isArray(value)}
                onChange={() => {
                  setValue(getDateRangeFromValue(value))

                  const [dateStart, dateEnd] = getDateRangeFromValue(value)
                  setMultipleDays(!dayjs(dateStart).isSame(dateEnd, "day"))
                }}
              />
              <span className="text-gray-900 font-medium">Custom</span>
            </label>
            {Array.isArray(value) && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <label className="flex items-center space-x-3">
                  <span className="text-gray-500 text-sm">Multiple days</span>
                  <button
                    type="button"
                    className={cn(
                      "relative inline-flex flex-shrink-0 w-11 h-6 border-2 border-transparent rounded-full focus:outline-none cursor-pointer transition-colors duration-200 ease-in-out focus:ring-blue-500 focus:ring-offset-2 focus:ring-2",
                      multipleDays ? "bg-blue-600" : "bg-gray-200"
                    )}
                    onClick={() => {
                      if (multipleDays) {
                        setValue([value[0], value[0]])
                      }

                      setMultipleDays(!multipleDays)
                    }}
                  >
                    <span
                      className={cn(
                        "inline-block w-5 h-5 bg-white rounded-full shadow pointer-events-none transform transition duration-200 ease-in-out ring-0",
                        multipleDays ? "translate-x-5" : "translate-x-0"
                      )}
                      aria-hidden
                    />
                  </button>
                </label>
              </div>
            )}
          </li>
          {Array.isArray(value) && (
            <li>
              {multipleDays && (
                <li className="relative pb-1 pt-4 px-4">
                  <DateRangePicker
                    calendarClassName="mt-1 ring-black ring-opacity-10 ring-1 rounded-md shadow-lg"
                    format="MMM d, y"
                    value={value}
                    clearIcon={null}
                    required
                    disableCalendar
                    onChange={setValue}
                  />
                </li>
              )}
              <Calendar
                className="rounded-b-md"
                tileClassName="focus:outline-none"
                value={
                  multipleDays
                    ? getDateRangeFromValue(value)
                    : getDateRangeFromValue(value)[0]
                }
                selectRange={multipleDays}
                onChange={(value) =>
                  setValue(multipleDays ? value : [value, value])
                }
              />
            </li>
          )}
        </ul>
      </Popover>

      <pre className="mt-6">
        {JSON.stringify(
          {
            value,
          },
          null,
          2
        )}
      </pre>
    </>
  )
}
