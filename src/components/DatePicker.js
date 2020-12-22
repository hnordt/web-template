import React from "react"
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from "@reach/listbox"
import dayjs from "dayjs"
import DayPicker, { DateUtils } from "react-day-picker"
import "react-day-picker/lib/style.css"
import { MdArrowDropDown, MdToday } from "react-icons/md"

export default function DatePicker(props) {
  const shortcuts = [
    {
      id: "today",
      label: "Today",
      dateRange: [
        dayjs().startOf("day").toDate(),
        dayjs().endOf("day").toDate(),
      ],
    },
    {
      id: "yesterday",
      label: "Yesterday",
      dateRange: [
        dayjs().subtract(1, "day").startOf("day").toDate(),
        dayjs().subtract(1, "day").endOf("day").toDate(),
      ],
    },
    {
      id: "last7Days",
      label: "Last 7 days",
      dateRange: [
        dayjs().subtract(6, "day").startOf("day").toDate(),
        dayjs().endOf("day").toDate(),
      ],
    },
    {
      id: "last30Days",
      label: "Last 30 days",
      dateRange: [
        dayjs().subtract(29, "day").startOf("day").toDate(),
        dayjs().endOf("day").toDate(),
      ],
    },
    {
      id: "custom",
      label: "Custom",
    },
  ]

  const [shortcutId, setShortcutId] = React.useState(() =>
    props.defaultValue
      ? shortcuts.find(
          (shortcut) =>
            shortcut.dateRange &&
            dayjs(shortcut.dateRange[0]).toISOString() ===
              dayjs(props.defaultValue[0]).toISOString() &&
            dayjs(shortcut.dateRange[1]).toISOString() ===
              dayjs(props.defaultValue[1]).toISOString()
        )?.id ?? "custom"
      : "today"
  )
  const [customDateRange, setCustomDateRange] = React.useState(
    props.defaultValue ?? null
  )

  function getDateRange(shortcutId) {
    if (shortcutId === "custom") {
      return (
        customDateRange ??
        shortcuts.find((shortcut) => shortcut.id === "today").dateRange
      )
    }

    return shortcuts.find((shortcut) => shortcut.id === shortcutId).dateRange
  }

  function handleChange(shortcutId) {
    props.onChange?.(getDateRange(shortcutId))
  }

  const dateRange = getDateRange(shortcutId)

  return (
    <div>
      <ListboxInput value={shortcutId} onChange={setShortcutId}>
        {(listboxInput) => (
          <>
            <ListboxButton
              className="flex items-center pl-4 pr-3 py-1.5 text-gray-700 text-sm border border-gray-200 rounded-md space-x-2"
              arrow={<MdArrowDropDown className="w-6 h-6 text-gray-700" />}
            >
              <MdToday className="mr-1 w-5 h-5 text-gray-700" />
              <span>
                {shortcutId === "custom"
                  ? `${dayjs(dateRange[0]).format("ll")} - ${dayjs(
                      dateRange[1]
                    ).format("ll")}`
                  : shortcuts.find((shortcut) => shortcut.id === shortcutId)
                      .label}
              </span>
            </ListboxButton>
            <ListboxPopover className="mt-0.5 w-96 bg-white border border-gray-200 rounded-md">
              <ListboxList className="focus:outline-none">
                {shortcuts.map((shortcut) => (
                  <ListboxOption
                    key={shortcut.id}
                    className={`${
                      shortcut.id === shortcutId
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-50"
                    } px-4 py-2 border-b border-gray-200 cursor-pointer text-sm`}
                    value={shortcut.id}
                    onClick={() => handleChange(shortcut.id)}
                  >
                    {shortcut.label}
                  </ListboxOption>
                ))}
              </ListboxList>
              <div className="p-4">
                <DayPicker
                  key={listboxInput.isExpanded}
                  className="Selectable"
                  initialMonth={dateRange[0]}
                  selectedDays={[
                    dateRange[0],
                    {
                      from: dateRange[0],
                      to: dateRange[1],
                    },
                  ]}
                  modifiers={{
                    start: dateRange[0],
                    end: dateRange[1],
                  }}
                  onDayClick={(day) => {
                    setShortcutId("custom")

                    const { from, to } = DateUtils.addDayToRange(day, {
                      from: dateRange[0],
                      to: dateRange[1],
                    })

                    if (from) {
                      setCustomDateRange([from, to])
                    }

                    handleChange("custom")
                  }}
                />
              </div>
            </ListboxPopover>
          </>
        )}
      </ListboxInput>
    </div>
  )
}
