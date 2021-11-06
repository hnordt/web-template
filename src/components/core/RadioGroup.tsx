import React from "react"
import { RadioGroup as BaseRadioGroup } from "@headlessui/react"
import cx from "classnames"

interface RadioGroupProps {
  id?: string
  label?: string
  options: Array<{
    label: string
    description?: string
    value: any
  }>
  value?: any
  required?: boolean
  disabled?: boolean
  onChange?: (option: any) => void
  onBlur?: (option: any) => void
}

// TODO: any
export default React.forwardRef<any, RadioGroupProps>(function RadioGroup(
  props,
  ref
) {
  // TODO: BaseRadioGroup doesn't support ref yet
  return (
    <BaseRadioGroup
      /*ref={ref}*/ value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    >
      {props.label && (
        <BaseRadioGroup.Label className="sr-only">
          {props.label}
        </BaseRadioGroup.Label>
      )}
      <div className="bg-white rounded-md -space-y-px">
        {props.options.map((option, optionIndex) => (
          <BaseRadioGroup.Option
            key={option.value}
            value={option.value}
            className={({ checked }) =>
              cx(
                optionIndex === 0 ? "rounded-tl-md rounded-tr-md" : "",
                optionIndex === props.options.length - 1
                  ? "rounded-bl-md rounded-br-md"
                  : "",
                checked ? "bg-blue-50 border-blue-200" : "border-gray-200",
                "relative flex p-4 border focus:outline-none cursor-pointer"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={cx(
                    checked
                      ? "bg-blue-600 border-transparent"
                      : "bg-white border-gray-300",
                    active ? "ring-2 ring-offset-2 ring-blue-500" : "",
                    "flex items-center justify-center mt-0.5 w-4 h-4 border rounded-full cursor-pointer"
                  )}
                  aria-hidden="true"
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                </span>
                <div className="flex flex-col ml-3">
                  <BaseRadioGroup.Label
                    as="span"
                    className={cx(
                      checked ? "text-blue-900" : "text-gray-900",
                      "block text-sm font-medium"
                    )}
                  >
                    {option.label}
                  </BaseRadioGroup.Label>
                  {option.description && (
                    <BaseRadioGroup.Description
                      as="span"
                      className={cx(
                        checked ? "text-blue-700" : "text-gray-500",
                        "block text-sm"
                      )}
                    >
                      {option.description}
                    </BaseRadioGroup.Description>
                  )}
                </div>
              </>
            )}
          </BaseRadioGroup.Option>
        ))}
      </div>
    </BaseRadioGroup>
  )
})
