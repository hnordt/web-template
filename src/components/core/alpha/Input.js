import React from "react"
import PropTypes from "prop-types"
import { useId } from "@reach/auto-id"
import { ExclamationCircleIcon } from "@heroicons/react/solid"
import IMask from "imask"
import cn from "classnames"

// TODO: extract
export const DurationInput = React.forwardRef(function DurationInput(
  props,
  ref
) {
  return (
    <Input
      {...props}
      ref={ref}
      type="text"
      mask={{
        mask: "H{:}mm",
        blocks: {
          H: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 24,
            placeholderChar: "0",
          },
          mm: {
            mask: IMask.MaskedRange,
            from: 0,
            to: 59,
            placeholderChar: "0",
          },
        },
        overwrite: true,
        lazy: false,
      }}
      inputMode="numeric"
      onChange={() => {}} // avoids a warning
    />
  )
})

const Input = React.forwardRef(function Input(props, ref) {
  const {
    id: baseId,
    label,
    hint,
    leadingIcon,
    leadingAddon,
    trailingIcon,
    trailingAddon,
    inlineTrailingAddon,
    mask,
    value,
    info,
    error,
    size,
    onValueChange,
    ...rest
  } = props

  const id = useId(baseId)

  const inputRef = React.useRef(null)
  const imaskRef = React.useRef(null)

  const onValueChangeRef = React.useRef(onValueChange)
  React.useEffect(() => {
    onValueChangeRef.current = onValueChange
  })

  React.useLayoutEffect(() => {
    if (!mask) {
      return
    }

    imaskRef.current = IMask(inputRef.current, mask)

    const imask = imaskRef.current

    imask.on("accept", () => onValueChangeRef.current?.(imask.value))

    return () => imask.destroy()
  }, [mask])

  React.useLayoutEffect(() => {
    if (!imaskRef.current) {
      return
    }

    imaskRef.current.value = value ?? ""
    imaskRef.current.updateValue() // avoids a warning
  }, [value])

  return (
    <div>
      {label && (
        <div className="flex justify-between mb-1">
          <label
            className="block text-gray-700 text-sm font-medium truncate"
            htmlFor={id}
          >
            {label}
          </label>
          {hint && <span className="text-gray-500 text-sm">{hint}</span>}
        </div>
      )}
      <div className="relative flex rounded-md shadow-sm">
        {leadingIcon ? (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {React.createElement(leadingIcon, {
              "className": cn(
                "h-5 w-5",
                error ? "text-red-500" : "text-gray-400"
              ),
              "aria-hidden": true,
            })}
          </div>
        ) : (
          leadingAddon && (
            <span className="inline-flex items-center px-3 text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md sm:text-sm">
              {leadingAddon}
            </span>
          )
        )}
        <input
          {...rest}
          ref={(_ref) => {
            ref?.(_ref)
            inputRef.current = _ref
          }}
          className={cn(
            "block w-full sm:text-sm flex-1 min-w-0",
            !leadingAddon && !trailingAddon && "rounded-md",
            leadingIcon && "pl-10",
            leadingAddon && "rounded-r-md",
            (trailingIcon || error) && "pr-10",
            trailingAddon && "rounded-l-md",
            error
              ? "placeholder-red-300 text-red-900 border-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          )}
          id={id}
          value={value}
          aria-invalid={!!error}
        />
        {error ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ExclamationCircleIcon
              className="w-5 h-5 text-red-500"
              aria-hidden
            />
          </div>
        ) : trailingAddon ? (
          <span className="inline-flex items-center px-3 text-gray-500 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md sm:text-sm">
            {trailingAddon}
          </span>
        ) : (
          inlineTrailingAddon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 sm:text-sm">
                {inlineTrailingAddon}
              </span>
            </div>
          )
        )}
      </div>
      {(info || error) && (
        <p
          className={cn(
            "mt-1.5 text-sm truncate",
            error ? "text-red-600" : "text-gray-500"
          )}
        >
          {error ?? info}
        </p>
      )}
    </div>
  )
})

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  leadingIcon: PropTypes.elementType,
  leadingAddon: PropTypes.node,
  inlineLeadingAddon: PropTypes.node,
  trailingIcon: PropTypes.elementType,
  trailingAddon: PropTypes.node,
  inlineTrailingAddon: PropTypes.node,
  mask: PropTypes.any,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  size: PropTypes.oneOf(["md"]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
}

export default Input
