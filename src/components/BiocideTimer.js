import React from "react"
import Input from "components/core/alpha/Input"
import Checkbox from "components/core/alpha/Checkbox"
import Select from "components/core/alpha/Select"
import { TrashIcon } from "@heroicons/react/solid"

export default function BiocideTimer(props) {
  const componentName = props.component.component
  const fields = props.component.setting

  const pumpOutputField = fields.find((field) =>
    field.label.toLowerCase().includes("output")
  )
  // TODO: other fields

  // TODO: renderField()

  return (
    <>
      {/* <pre>{JSON.stringify({ componentName, pumpOutputField }, null, 2)}</pre> */}
      <div className="group relative bg-white rounded-md shadow overflow-hidden">
        <div className="absolute -right-6 -top-6 flex group-hover:hidden items-end justify-center pb-px w-12 h-12 bg-gradient-to-bl from-blue-500 to-blue-700 transform rotate-45">
          <span className="block text-white text-xs font-semibold transform -rotate-45">
            {props.number}
          </span>
        </div>
        <div
          className="pb-[3.5px] absolute -right-6 -top-6 group-hover:flex hidden items-end justify-center w-12 h-12 bg-gradient-to-bl from-red-500 to-red-700 cursor-pointer transform rotate-45"
          onClick={props.onRemove}
        >
          <TrashIcon className="w-3 h-3 text-white transform -rotate-45" />
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
                  {["SU", "TH", "MO", "FR"].map((weekDay) => (
                    <Checkbox key={weekDay} label={weekDay} />
                  ))}
                </div>
                <div className="grid gap-2 grid-cols-2">
                  {["TU", "SA", "WE", "All"].map((weekDay) => (
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
    </>
  )
}
