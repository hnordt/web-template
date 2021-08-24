import React from "react"
import { UseQueryResult, UseInfiniteQueryResult } from "react-query"
import { XCircleIcon } from "@heroicons/react/solid"
import { GroupedVirtuoso } from "react-virtuoso"
import cn from "classnames"
import _ from "lodash/fp"
import Loader from "components/core/alpha/Loader"

export interface Column {
  variant?: "primary" | "secondary" | "tertiary"
  label: string
  accessor: string | ((item: unknown) => string | number | boolean)
  span: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  align?: "center" | "right"
  renderCell?: (value: unknown) => React.ReactNode
}

export interface TableProps {
  columns: Array<Column>
  data?: Array<unknown>
  query?: UseQueryResult
  infiniteQuery?: UseInfiniteQueryResult
  emptyState?: {
    icon?: React.FunctionComponent<{ className: string }> // TODO
    title?: string
    description: string
    action?: React.ReactNode
  }
  actions?: Array<{
    // TODO: icon is required if no label is passed, and label is required if
    // no icon is passed
    icon?: React.FunctionComponent<{ className: string }> // TODO
    label?: string
    hidden?: (item: unknown) => boolean
    onClick: (item: unknown) => void
  }>
  height: number
  onEndReached?: () => void
}

function getCellValue(column, item) {
  if (typeof column.accessor === "string") {
    return _.get(column.accessor, item)
  }

  return column.accessor(item)
}

function renderRow(
  columns: Array<Column>,
  item?: { index: number; data: null | unknown }
) {
  return (
    <div className="grid gap-6 grid-cols-12 items-center h-11">
      {columns.map((column, columnIndex) => (
        <div
          key={`${columnIndex}${column.label}`}
          className={cn(
            column.span === 1 && "col-span-1",
            column.span === 2 && "col-span-2",
            column.span === 3 && "col-span-3",
            column.span === 4 && "col-span-4",
            column.span === 5 && "col-span-5",
            column.span === 6 && "col-span-6",
            column.span === 7 && "col-span-7",
            column.span === 8 && "col-span-8",
            column.span === 9 && "col-span-9",
            column.span === 10 && "col-span-10",
            column.span === 11 && "col-span-11",
            column.span === 12 && "col-span-12",
            column.align === "center" && "text-center",
            column.align === "right" && "text-right"
          )}
        >
          {!item ? (
            <span className="text-gray-500 text-xs font-medium tracking-wider uppercase">
              {column.label}
            </span>
          ) : item.data === null ? (
            <div
              className={cn(
                "h-4 bg-gray-200 rounded animate-pulse",
                ["w-2/4", "w-1/4", "w-3/4"][`${item.index}`] ?? "wfull"
              )}
            />
          ) : (
            <span
              className={cn(
                "block text-sm truncate",
                {
                  primary: "font-medium",
                  tertiary: "text-gray-500",
                }[column.variant] ?? "text-gray-900"
              )}
            >
              {renderCell(column, item.data)}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

function renderCell(column, item) {
  const value = getCellValue(column, item)

  if (column.renderCell) {
    return column.renderCell(value)
  }

  return value
}

export default function Table(props: TableProps) {
  const query = props.query ?? props.infiniteQuery

  if (query.error) {
    return (
      <div
        className="p-4 bg-red-50"
        // TODO
        // style={{
        //   height: props.height,
        // }}
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="w-5 h-5 text-red-400" aria-hidden />
          </div>
          <div className="flex-1 ml-3 md:flex md:justify-between">
            <p className="text-red-700 text-sm">
              {query.error instanceof Error
                ? query.error.message
                : "Something went wrong"}
            </p>
            <p className="mt-3 text-sm md:ml-6 md:mt-0">
              <button
                className="hover:text-red-600 text-red-700 whitespace-nowrap font-medium"
                type="button"
                onClick={() => {
                  query.remove()
                  query.refetch({
                    cancelRefetch: true,
                  })
                }}
              >
                Try again
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  const data =
    query?.status === "loading" ? [null, null, null] : query?.data ?? props.data
  const itemCount = Array.isArray(data) ? data.length : 0

  if (!itemCount) {
    return (
      <div
        className="flex flex-col items-center justify-center"
        style={{
          height: props.height,
        }}
      >
        {props.emptyState?.icon &&
          React.createElement(props.emptyState.icon, {
            className: "mx-auto w-8 h-8 text-gray-400",
          })}
        {props.emptyState?.title && (
          <h3 className="mb-1 mt-2 text-gray-900 text-sm font-medium">
            {props.emptyState.title}
          </h3>
        )}
        <p className="text-gray-500 text-sm">
          {props.emptyState?.description ?? "No results found"}
        </p>
        {props.emptyState?.action && (
          <div className="mt-6">{props.emptyState.action}</div>
        )}
      </div>
    )
  }

  return (
    <GroupedVirtuoso
      groupCounts={[itemCount]}
      groupContent={() => (
        <div className="grid gap-6 grid-cols-12 items-center px-6 bg-gray-50 border-b border-gray-200">
          <div className={props.actions ? "col-span-11" : "col-span-12"}>
            {renderRow(props.columns)}
          </div>
          {props.actions && (
            <div>
              <span className="sr-only">Actions</span>
            </div>
          )}
        </div>
      )}
      itemContent={(index) => {
        // When data is loading item is null, so we need to ensure item exists
        // before applying relevant logic
        const item = data[index]
        return (
          <div
            className={cn(
              "grid gap-6 grid-cols-12 items-center px-6 border-b",
              index === itemCount - 1 ? "border-transparent" : "border-gray-200"
            )}
          >
            <div className={props.actions ? "col-span-11" : "col-span-12"}>
              {renderRow(props.columns, {
                index,
                data: item,
              })}
            </div>
            {props.actions && (
              <div className="flex items-center justify-end space-x-4">
                {props.actions
                  .filter((action) => item && !action.hidden?.(item))
                  .map((action, actionIndex) => (
                    <button
                      key={`${actionIndex}${action.label ?? action.icon?.name}`}
                      className="text-blue-600 hover:text-blue-900 focus-visible:underline"
                      type="button"
                      onClick={() => action.onClick(item)}
                    >
                      {action.icon ? (
                        React.createElement(action.icon, {
                          className: "w-5 h-5 text-gray-400",
                        })
                      ) : (
                        <span className="whitespace-nowrap text-sm font-medium">
                          {action.label}
                        </span>
                      )}
                    </button>
                  ))}
              </div>
            )}
          </div>
        )
      }}
      components={{
        EmptyPlaceholder: function EmptyPlaceholder() {
          return (
            <div className="border-t border-gray-200">
              {renderRow(props.columns, {
                index: 0,
                data: null,
              })}
            </div>
          )
        },
        Footer: function Footer() {
          return props.infiniteQuery?.isFetchingNextPage ? (
            <div className="flex items-center px-6 h-11 border-t border-gray-200">
              <Loader variant="dark" size="sm" />
            </div>
          ) : null
        },
      }}
      endReached={() => {
        if (
          props.infiniteQuery?.hasNextPage &&
          !props.infiniteQuery?.isFetchingNextPage
        ) {
          props.infiniteQuery.fetchNextPage()
        }
        props.onEndReached?.()
      }}
      style={{
        height: props.height,
      }}
    />
  )
}
