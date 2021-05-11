import React from "react"
import Input from "components/core/alpha/Input"
import Checkbox from "components/core/alpha/Checkbox"
import Select from "components/core/alpha/Select"

export default function BiocideTimer(props) {
  return (
    <div className="relative bg-white rounded-md shadow overflow-hidden">
      <div className="absolute -right-4 -top-0.5 pt-1 w-12 text-center bg-gradient-to-bl from-blue-500 to-blue-700 transform rotate-45">
        <span className="block text-white text-xs font-semibold transform -rotate-45">
          {props.number}
        </span>
      </div>
      <div className="pb-5 pt-4 px-6 space-y-4">
        <Select
          label="PUMP / CONTROL OUTPUT"
          options={[
            {
              label: "Bio A",
              value: 1,
            },
          ]}
        />
        <div className="flex">
          <div className="grid gap-2 grid-rows-4">
            {["W1", "W2", "W3", "W4"].map((week) => (
              <Checkbox key={week} label={week} />
            ))}
          </div>
          <div className="mx-4 w-px border-l border-dashed border-gray-200" />
          <div>
            <div className="space-y-2">
              <div className="grid gap-2 grid-cols-2">
                {["SU", "MO", "TU", "WE"].map((weekDay) => (
                  <Checkbox key={weekDay} label={weekDay} />
                ))}
              </div>
              <div className="grid gap-2 grid-cols-2">
                {["TH", "FR", "SA", "All"].map((weekDay) => (
                  <Checkbox key={weekDay} label={weekDay} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-2">
          <Input type="time" label="Start time" />
          <Input type="time" label="Pre-bleed" />
          <Input type="time" label="Bleed lockout" />
          <Input type="time" label="Dose/active" />
        </div>
      </div>
    </div>
  )
}
