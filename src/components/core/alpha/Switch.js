import { Switch as BaseSwitch } from "@headlessui/react"
import cn from "classnames"

export default function Switch(props) {
  return (
    <BaseSwitch.Group as="div" className="flex items-center">
      <BaseSwitch
        className={cn(
          "relative inline-flex flex-shrink-0 w-11 h-6 border-2 border-transparent rounded-full focus:outline-none cursor-pointer transition-colors duration-200 ease-in-out focus:ring-blue-500 focus:ring-offset-2 focus:ring-2",
          props.value ? "bg-blue-600" : "bg-gray-200"
        )}
        checked={props.value}
        onChange={props.onChange}
      >
        <spawn
          className={cn(
            "inline-block w-5 h-5 bg-white rounded-full shadow pointer-events-none transform transition duration-200 ease-in-out ring-0",
            props.value ? "translate-x-5" : "translate-x-0"
          )}
          aria-hidden
        />
      </BaseSwitch>
      <BaseSwitch.Label as="span" className="ml-3">
        <span className="text-gray-900 text-sm">{props.label}</span>
      </BaseSwitch.Label>
    </BaseSwitch.Group>
  )
}
