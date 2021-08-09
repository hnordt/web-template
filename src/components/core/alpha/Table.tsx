import React from "react"
import { UseQueryResult } from "react-query"
import { PlusIcon, XCircleIcon } from "@heroicons/react/solid"
import { useTable } from "react-table"
import { useDeepCompareMemo } from "use-deep-compare"
import cn from "classnames"

interface TableProps {
  columns: Array<{
    variant?: "primary" | "secondary" | "tertiary"
    label: string
    accessor: string | ((row: any, rowIndex: number) => any)
    align?: "center" | "right"
    renderContent?: (props: { children: React.ReactNode }) => React.ReactNode
  }>
  data?: Array<any>
  query?: UseQueryResult
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
}

export default function Table(props: TableProps) {
  // TODO: this memoization will probably not work because
  // column.renderContent is a function
  const columns = useDeepCompareMemo(
    () =>
      props.columns.map((column) => ({
        Header: column.label,
        Cell: (_props) => {
          if (props.query?.status === "loading") {
            return (
              <span
                className={cn(
                  "block h-4 bg-gray-200 rounded animate-pulse",
                  ["w-10/12", "w-5/12", "w-9/12"][_props.row.index]
                )}
              />
            )
          }

          return (
            <span
              className={
                {
                  primary: "font-medium",
                  tertiary: "text-gray-500",
                }[column.variant] ?? ""
              }
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
            </span>
          )
        },
        accessor: column.accessor,
      })),
    [props.columns, props.query?.status]
  )

  const data = useDeepCompareMemo(() => props.data, [props.data])

  const table = useTable({
    columns,
    data: props.query
      ? props.query.status === "loading"
        ? new Array(3).fill({})
        : props.query.status === "error"
        ? []
        : props.query.data
      : data,
  })

  if (props.query?.status === "success" && !(props.query?.data as []).length) {
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
    <table
      className="min-w-full divide-gray-200 divide-y"
      {...table.getTableProps()}
    >
      <thead className="bg-gray-50">
        {table.headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                className="px-6 py-3 text-left text-gray-500 text-xs font-medium tracking-wider uppercase"
                {...column.getHeaderProps()}
              >
                {column.render("Header")}
              </th>
            ))}
            {props.actions && props.query?.status !== "loading" && (
              <th className="px-6 py-3" />
            )}
          </tr>
        ))}
      </thead>
      <tbody
        className="bg-white divide-gray-200 divide-y"
        {...table.getTableBodyProps()}
      >
        {table.rows.map((row) => {
          table.prepareRow(row)

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  className="px-6 py-4 text-gray-900 whitespace-nowrap text-sm"
                  {...cell.getCellProps()}
                >
                  {cell.render("Cell")}
                </td>
              ))}
              {props.actions &&
                props.actions &&
                props.query?.status !== "loading" && (
                  <td className="px-6 py-4 text-right whitespace-nowrap text-sm font-medium">
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
                  </td>
                )}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
