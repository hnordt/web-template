import React from "react"
import IMask from "imask"
import Input from "components/core/_alpha/Input"

function DurationInput(props, ref) {
  const {
    value,
    onChange, // onChange is ignored in favor of onValueChange
    onValueChange,
    ...rest
  } = props

  const imaskRef = React.useRef(null)
  const inputRef = React.useRef(null)

  const onValueChangeRef = React.useRef(onValueChange)
  React.useEffect(() => {
    onValueChangeRef.current = onValueChange
  })

  React.useLayoutEffect(() => {
    imaskRef.current = IMask(inputRef.current, {
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
    })

    const imask = imaskRef.current

    imask.on("accept", () => onValueChangeRef.current?.(imask.value))

    return () => imask.destroy()
  }, [])

  React.useLayoutEffect(() => {
    imaskRef.current.value = value
    imaskRef.current.updateValue() // Avoids a warning
  }, [value])

  return (
    <Input
      {...rest}
      ref={(_ref) => {
        ref(_ref)
        inputRef.current = _ref
      }}
      type="text"
      inputMode="numeric"
    />
  )
}

export default React.forwardRef(DurationInput)
