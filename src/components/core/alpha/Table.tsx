import React from "react"
import { UseQueryResult, UseInfiniteQueryResult } from "react-query"
import { PlusIcon, XCircleIcon } from "@heroicons/react/solid"
import { useTable, useBlockLayout } from "react-table"
import { Virtuoso } from "react-virtuoso"
import { useDeepCompareMemo } from "use-deep-compare"
import cn from "classnames"
import Loader from "components/core/alpha/Loader"

export interface TableProps {
  columns: Array<{
    variant?: "primary" | "secondary" | "tertiary"
    label: string
    accessor: string | ((row: any, rowIndex: number) => any)
    width?: number
    align?: "center" | "right"
    renderContent?: (props: { children: React.ReactNode }) => React.ReactNode
  }>
  data?: Array<any>
  query?: UseQueryResult
  infiniteQuery?: UseInfiniteQueryResult
  emptyState: {
    icon?: React.FunctionComponent<{ className: string }>
    title?: string
    description: string
    action?: {
      label: string
      onClick: () => void
    }
    padding?: boolean
  }
  actions?: Array<{
    icon?: React.FunctionComponent<{ className: string }>
    label?: string
    hidden?: (row) => boolean
    onClick: (row) => void
  }>
  height?: number
  onEndReached?: () => void
}

const VirtuosoList = React.forwardRef<any, any>((props, ref) => (
  <div {...props} ref={ref} className="divide-gray-200 divide-y" />
))

const VirtuosoEmptyPlaceholder = React.forwardRef<any, any>((props, ref) => (
  <div {...props} ref={ref} className="flex items-center justify-center h-full">
    <Loader variant="dark" size="sm" />
  </div>
))

const VirtuosoFooter = React.forwardRef<any, any>((props, ref) => (
  <div {...props} ref={ref} className="px-6 py-5 border-t border-gray-200">
    <Loader variant="dark" size="sm" />
  </div>
))

export default function Table(props: TableProps) {
  // TODO: this memoization will probably not work because
  // column.renderContent is a function
  const columns = useDeepCompareMemo(
    () =>
      props.columns.map((column) => ({
        Header: column.label,
        Cell: (_props) => (
          <div
            className={cn(
              "truncate",
              {
                primary: "font-medium",
                tertiary: "text-gray-500",
              }[column.variant]
            )}
          >
            {column.renderContent?.({
              children: _props.value,
            }) ?? (
              // Returning a React Fragment will avoid crashes when props.value
              // is null or undefined.
              // We don't want to cast it to string otherwise "undefined" or
              // "null" would be rendered.
              <>{_props.value}</>
            )}
          </div>
        ),
        accessor: column.accessor,
        width: column.width ?? 200,
      })),
    [props.columns, props.query?.status, props.infiniteQuery?.status]
  )

  const data = useDeepCompareMemo(() => props.data, [props.data])

  const table = useTable(
    {
      columns,
      data: props.query
        ? props.query.status === "loading"
          ? new Array(props.columns.length).fill({})
          : props.query.status === "error"
          ? []
          : props.query.data
        : props.infiniteQuery
        ? props.infiniteQuery.status === "loading"
          ? []
          : props.infiniteQuery.status === "error"
          ? []
          : props.infiniteQuery.data
        : data,
    },
    useBlockLayout
  )

  if (
    (props.query?.status === "success" && !(props.query?.data as []).length) ||
    (props.infiniteQuery?.status === "success" &&
      !(props.infiniteQuery?.data as []).length)
  ) {
    return (
      <div className={cn("text-center", props.emptyState.padding && "p-8")}>
        {props.emptyState.icon &&
          React.createElement(props.emptyState.icon, {
            className: "mx-auto w-8 h-8 text-gray-400",
          })}
        {props.emptyState.title && (
          <h3 className="mb-1 mt-2 text-gray-900 text-sm font-medium">
            {props.emptyState.title}
          </h3>
        )}
        <p className="text-gray-500 text-sm">{props.emptyState.description}</p>
        {props.emptyState.action && (
          <div className="mt-6">
            <button
              className="inline-flex items-center px-4 py-2 text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 border border-transparent rounded-md focus:outline-none shadow-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              type="button"
              onClick={props.emptyState.action.onClick}
            >
              <PlusIcon className="-ml-1 mr-2 w-5 h-5" aria-hidden="true" />
              {props.emptyState.action.label}
            </button>
          </div>
        )}
      </div>
    )
  }

  if (props.query?.status === "error") {
    return (
      <div className="p-4 bg-red-50 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="w-5 h-5 text-red-400" aria-hidden />
          </div>
          <div className="flex-1 ml-3 md:flex md:justify-between">
            <p className="text-red-700 text-sm">{props.query.error}</p>
            <p className="mt-3 text-sm md:ml-6 md:mt-0">
              <button
                className="hover:text-red-600 text-red-700 whitespace-nowrap font-medium"
                type="button"
                onClick={() => props.query.refetch()}
              >
                Try again
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-w-full divide-gray-200 divide-y"
      {...table.getTableProps()}
    >
      <div className="bg-gray-50">
        {table.headerGroups.map((headerGroup) => (
          <div {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <div
                className="px-6 py-3 text-left text-gray-500 text-xs font-medium tracking-wider uppercase"
                {...column.getHeaderProps()}
              >
                {column.render("Header")}
              </div>
            ))}
            {props.actions && props.query?.status !== "loading" && (
              <div className="px-6 py-3" />
            )}
          </div>
        ))}
      </div>
      <div className="bg-white" {...table.getTableBodyProps()}>
        <Virtuoso
          itemContent={(i) => {
            const row = table.rows[i]
            table.prepareRow(row)
            return (
              <div
                {...row.getRowProps({
                  style: {},
                })}
              >
                {row.cells.map((cell) => (
                  <div
                    className="px-6 py-4 text-gray-900 whitespace-nowrap text-sm overflow-hidden"
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </div>
                ))}
                {props.actions &&
                  props.actions &&
                  props.query?.status !== "loading" && (
                    <div className="px-6 py-4 text-right whitespace-nowrap text-sm font-medium">
                      <span className="flex flex-shrink-0 items-center justify-end space-x-4">
                        {props.actions
                          .filter((action) => !action.hidden?.(row.original))
                          .map((action, i) => (
                            <React.Fragment
                              key={action.label ?? action.icon?.name}
                            >
                              {i > 0 && (
                                <span className="text-gray-300" aria-hidden>
                                  |
                                </span>
                              )}
                              <button
                                className="text-blue-600 hover:text-blue-900 focus-visible:underline"
                                type="button"
                                onClick={() => action.onClick?.(row.original)}
                              >
                                {action.icon
                                  ? React.createElement(action.icon, {
                                      className: "w-5 h-5 text-gray-400",
                                    })
                                  : action.label}
                              </button>
                            </React.Fragment>
                          ))}
                      </span>
                    </div>
                  )}
              </div>
            )
          }}
          totalCount={table.rows.length}
          endReached={() => {
            if (
              props.infiniteQuery?.hasNextPage &&
              !props.infiniteQuery?.isFetchingNextPage
            ) {
              props.infiniteQuery.fetchNextPage()
            }
            props.onEndReached?.()
          }}
          components={{
            List: VirtuosoList,
            EmptyPlaceholder: VirtuosoEmptyPlaceholder,
            Footer: props.infiniteQuery?.isFetchingNextPage
              ? VirtuosoFooter
              : undefined,
          }}
          style={{
            height: props.height ?? 423 /* 423px = 8 items */,
          }}
        />
      </div>
    </div>
  )
}
