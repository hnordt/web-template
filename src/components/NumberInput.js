import React from "react"
import { RiAddLine, RiSubtractLine } from "react-icons/ri"
import cn from "classnames"

export default function NumberInput(props) {
  const stepUpButtonRef = React.useRef(null)
  const stepDownButtonRef = React.useRef(null)

  const min = props.min ?? 0
  const max = props.max ?? Infinity
  const step = props.step ?? 1
  const canStepUp = props.value + step <= max
  const canStepDown = props.value - step >= min

  function stepUp() {
    if (!canStepUp) {
      return
    }

    props.onChange?.(props.value + step)
  }

  function stepDown() {
    if (!canStepDown) {
      return
    }

    props.onChange?.(props.value - step)
  }

  return (
    <div
      tabIndex={-1}
      onFocus={(e) => {
        if (e.currentTarget === e.target) {
          stepDownButtonRef.current.focus()
        }
      }}
      onKeyDown={(e) => {
        switch (e.key) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9": {
            return props.onChange(Number(e.key))
          }

          case "ArrowUp": {
            return stepUp()
          }

          case "ArrowDown": {
            return stepDown()
          }

          case "ArrowLeft": {
            return stepDownButtonRef.current.focus()
          }

          case "ArrowRight": {
            return stepUpButtonRef.current.focus()
          }

          default:
            return
        }
      }}
    >
      {props.label && (
        <label className="block mb-1 text-gray-700 text-base">
          {props.label}
        </label>
      )}
      <div className="flex items-center">
        <button
          ref={stepDownButtonRef}
          className={cn(
            "inline-flex items-center justify-center rounded-full w-6 h-6 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out",
            canStepDown
              ? "text-white hover:bg-blue-500 bg-blue-600 active:bg-blue-700"
              : "text-gray-300 bg-gray-100 cursor-not-allowed"
          )}
          type="button"
          readOnly={!canStepDown}
          onClick={stepDown}
        >
          <RiSubtractLine className="w-5 h-5" />
        </button>
        <span className="inline-block w-10 text-center text-base">
          {props.value || 0}
        </span>
        <button
          ref={stepUpButtonRef}
          className={cn(
            "inline-flex items-center justify-center rounded-full w-6 h-6 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out",
            canStepUp
              ? "text-white hover:bg-blue-500 bg-blue-600 active:bg-blue-700"
              : "text-gray-300 bg-gray-100 cursor-not-allowed"
          )}
          type="button"
          readOnly={!canStepUp}
          onClick={stepUp}
        >
          <RiAddLine className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
