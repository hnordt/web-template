import React from "react"
import Input from "components/core/alpha/Input"
import Checkbox from "components/core/alpha/Checkbox"
import Select from "components/core/alpha/Select"
import { TrashIcon } from "@heroicons/react/solid"
import cn from "classnames"

export default function BiocideTimer(props) {
  const componentName = props.component.component

  function renderField(label, exact = false) {
    let field = props.component.setting.find((field) =>
      exact
        ? field.label.toLowerCase() === label.toLowerCase()
        : field.label.toLowerCase().includes(label)
    )

    if (!field) {
      return null
    }

    // TODO: avoid mutation
    field = props.applyModifierToField(
      field,
      props.fields,
      props.modifiers,
      props.currentValues
    )

    return (
      <div
        className={cn(
          // field.span === 2 && "col-span-2",
          // field.span === 3 && "col-span-3",
          // field.span === 4 && "col-span-4",
          field.display === false && "hidden"
        )}
      >
        {props.renderField(
          field,
          props.form,
          props.defaultValues,
          props.modifiers,
          props.fields,
          props.currentValues
        )}
      </div>
    )
  }

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
          // onClick={props.onRemove}
          onClick={() => alert("Not implemented yet")}
        >
          <TrashIcon className="w-3 h-3 text-white transform -rotate-45" />
        </div>
        <div className="pb-5 pt-4 px-6 space-y-4">
          {renderField("output")}
          <div className="flex">
            <div className="grid gap-2 grid-rows-4">
              {renderField("wk1", true)}
              {renderField("wk2", true)}
              {renderField("wk3", true)}
              {renderField("wk4", true)}
            </div>
            <div className="mx-4 w-px border-l border-dashed border-gray-200" />
            <div>
              <div className="space-y-2">
                <div className="grid gap-2 grid-cols-2">
                  {renderField("su", true)}
                  {renderField("th", true)}
                  {renderField("m", true)}
                  {renderField("f", true)}
                </div>
                <div className="grid gap-2 grid-cols-2">
                  {renderField("tu", true)}
                  {renderField("sa", true)}
                  {renderField("w", true)}
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-2">
            {renderField("start")}
            {renderField("pre-bleed")}
            {renderField("lockout")}
            {renderField("dose")}
          </div>
        </div>
      </div>
    </>
  )
}
