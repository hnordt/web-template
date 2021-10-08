import React from "react"
import BaseSelect, { components } from "react-select"
import cn from "classnames"
import Loader from "components/core/alpha/Loader"

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
          className="px-3 py-2 w-full text-left text-blue-600 text-base font-medium"
          type="button"
          onClick={() => props.selectProps.onLoadMoreClick()}
        >
          Load more
        </button>
      )}
    </components.MenuList>
  )
}

// TODO: any
export default React.forwardRef<any, SelectProps>(function Select(props, ref) {
  const selectedOption = Array.isArray(props.value)
    ? props.options?.filter((option) =>
        props.value.includes(getOptionValue(option))
      )
    : props.options?.find((option) => getOptionValue(option) === props.value) ??
      null

  const query = props.query ?? props.infiniteQuery
  const loading = query?.status === "loading" ?? false

  function getOptionValue(option) {
    return props.getOptionValue?.(option) ?? option?.value ?? null
  }

  return (
    <BaseSelect
      {...props}
      ref={ref}
      className={cn("text-sm", props.className)}
      options={props.options}
      value={props.value !== undefined ? selectedOption : undefined}
      placeholder={props.placeholder ?? ""}
      noOptionsMessage={props.messages?.noOptions}
      isMulti={props.multiple}
      isClearable
      isLoading={loading}
      fetchingNextPage={props.infiniteQuery?.isFetchingNextPage ?? false}
      onChange={(option) =>
        props.onChange?.(
          Array.isArray(option)
            ? option.map(getOptionValue)
            : getOptionValue(option)
        )
      }
      onLoadMoreClick={
        props.infiniteQuery?.hasNextPage &&
        !props.infiniteQuery?.isFetchingNextPage
          ? props.infiniteQuery.fetchNextPage
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
  )
})
