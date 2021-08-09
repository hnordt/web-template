import React from "react"
import { useQuery } from "react-query"
import BaseSelect from "react-select"
import { useId } from "@reach/auto-id"

// TODO
type SelectProps = any

export default React.forwardRef<any, SelectProps>(function Select(props, ref) {
  const id = useId()

  const [keywords, setKeywords] = React.useState("")

  const query = useQuery(
    ["Select", id, keywords],
    props.loadOptions
      ? () => props.loadOptions(keywords)
      : () => Promise.resolve(),
    {
      staleTime: 30000,
      enabled: !!props.loadOptions,
    }
  )

  const options = props.options ?? query.data
  const selectedOption = Array.isArray(props.value)
    ? options?.filter((option) =>
        props.value.includes(
          props.getOptionValue ? props.getOptionValue(option) : option.value
        )
      )
    : options?.find((option) => {
        if (props.getOptionValue) {
          return props.getOptionValue(option) === props.value
        }

        return option.value === props.value
      })

  function getOptionValue(option) {
    if (props.getOptionValue) {
      return props.getOptionValue(option) ?? null
    }

    return option?.value ?? null
  }

  return (
    <BaseSelect
      {...props}
      ref={ref}
      options={options}
      value={props.value ? selectedOption : undefined}
      placeholder={props.placeholder ?? ""}
      isMulti={props.multiple}
      isClearable={!props.multiple}
      isLoading={query.status === "loading"}
      onInputChange={setKeywords}
      onChange={(option) => {
        if (Array.isArray(option)) {
          props.onChange?.(option.map(getOptionValue))
          return
        }

        props.onChange?.(getOptionValue(option))
      }}
    />
  )
})
