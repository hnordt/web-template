import React from "react"
import BaseSelect, { components } from "react-select"
import { useId } from "@reach/auto-id"
import Loader from "components/core/Loader"

// TODO
type SelectProps = any

function MenuList(props) {
  return (
    <components.MenuList {...props}>
      {props.children}
      {props.selectProps.fetchingNextPage && (
        <div className="px-3 py-4">
          <Loader variant="dark" size="sm" />
        </div>
      )}
      {props.selectProps.onLoadMoreClick && (
        <button
          className="px-3 py-2 w-full text-left text-blue-600 text-sm font-medium"
          type="button"
          onClick={() => props.selectProps.onLoadMoreClick()}
        >
          Load more...
        </button>
      )}
    </components.MenuList>
  )
}

// TODO: any
export default React.forwardRef<any, SelectProps>(function Select(props, ref) {
  const { label, help, ...rest } = props
  const id = useId(rest.id)

  const selectedOption = Array.isArray(rest.value)
    ? rest.options?.filter((option) =>
        rest.value.includes(getOptionValue(option))
      )
    : rest.options?.find((option) => getOptionValue(option) === rest.value) ??
      null

  const query = rest.query ?? rest.infiniteQuery
  const loading = query?.status === "loading" ?? false

  function getOptionValue(option) {
    return rest.getOptionValue?.(option) ?? option?.value ?? null
  }

  return (
    <div className={rest.className}>
      {label && (
        <label
          className="block mb-1 text-gray-700 text-sm font-medium"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <BaseSelect
        {...rest}
        ref={ref}
        className="text-sm"
        id={id}
        options={rest.options}
        value={rest.value !== undefined ? selectedOption : undefined}
        placeholder={rest.placeholder ?? ""}
        noOptionsMessage={rest.messages?.noOptions}
        isMulti={rest.multiple}
        isDisabled={rest.disabled}
        isClearable={rest.clearable !== undefined ? rest.clearable : true}
        isLoading={loading}
        fetchingNextPage={rest.infiniteQuery?.isFetchingNextPage ?? false}
        onChange={(option) =>
          rest.onChange?.(
            Array.isArray(option)
              ? option.map(getOptionValue)
              : getOptionValue(option)
          )
        }
        onLoadMoreClick={
          rest.infiniteQuery?.hasNextPage &&
          !rest.infiniteQuery?.isFetchingNextPage
            ? rest.infiniteQuery.fetchNextPage
            : undefined
        }
        components={{
          MenuList,
        }}
        styles={{
          valueContainer: (provided) => ({
            ...provided,
            minHeight: 32,
          }),
        }}
      />
      {help && <p className="mt-1.5 text-gray-500 text-sm">{help}</p>}
    </div>
  )
})
