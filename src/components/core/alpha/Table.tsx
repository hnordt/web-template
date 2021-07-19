import React from "react"
import { useTable } from "react-table"
import { useDeepCompareMemo } from "use-deep-compare"

interface TableProps {
  columns: Array<{
    label: string
    accessor: string
    renderContent?: (props: { children: React.ReactNode }) => React.ReactNode
  }>
  data: Array<any>
}

export default function Table(props: TableProps) {
  // TODO: this memoization will probably not work because
  // column.renderContent is a function
  const columns = useDeepCompareMemo(
    () =>
      props.columns.map((column) => ({
        Header: column.label,
        Cell: (props) =>
          column.renderContent?.({
            children: props.value,
          }) ?? props.value,
        accessor: column.accessor,
      })),
    [props.columns]
  )

  const data = useDeepCompareMemo(() => props.data, [props.data])

  const table = useTable({
    columns,
    data,
  })

  return (
    <div className="border-b border-gray-200 overflow-hidden sm:rounded-lg">
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
              <th className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
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
                <td className="px-6 py-4 text-right whitespace-nowrap text-sm font-medium">
                  <a
                    href="#edit"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
