import React from "react"
import {
  UseQueryResult,
  UseInfiniteQueryResult,
  useQuery,
  useInfiniteQuery,
} from "react-query"
import { XCircleIcon } from "@heroicons/react/solid"
import { GroupedVirtuoso } from "react-virtuoso"
import _ from "lodash/fp"
import cn from "classnames"

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

function renderRow(columns: Array<Column>, item?: null | unknown) {
  return (
    <div className="grid gap-6 grid-cols-12 items-center h-11">
      {columns.map((column, index) => (
        <div
          key={`${index}${column.label}`}
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
          {item === undefined ? (
            <span className="text-gray-500 text-xs font-medium tracking-wider uppercase">
              {column.label}
            </span>
          ) : item === null ? (
            <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse" />
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
              {renderCell(column, item)}
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

// TODO: query + infiniteQuery
// - loading state
// - error state
function Table(props: TableProps) {
  const itemCount = Array.isArray(props.data) ? props.data.length : 0

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
        const item = props.data[index]
        return (
          <div
            className={cn(
              "grid gap-6 grid-cols-12 items-center px-6 border-b",
              index === itemCount - 1 ? "border-transparent" : "border-gray-200"
            )}
          >
            <div className={props.actions ? "col-span-11" : "col-span-12"}>
              {renderRow(props.columns, item)}
            </div>
            {props.actions && (
              <div className="flex items-center justify-end space-x-4">
                {props.actions
                  .filter((action) => !action.hidden?.(item))
                  .map((action, i) => (
                    <React.Fragment key={action.label ?? action.icon?.name}>
                      {/* {i > 0 && (
                        <span className="text-gray-300" aria-hidden>
                          |
                        </span>
                      )} */}
                      <button
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
                    </React.Fragment>
                  ))}
              </div>
            )}
          </div>
        )
      }}
      components={{
        EmptyPlaceholder: () => (
          <div className="border-t border-gray-200">
            {renderRow(props.columns, null)}
          </div>
        ),
        Footer: () => (
          <div className="flex items-center px-6 h-11 border-t border-gray-200">
            <span className="text-sm">Footer</span>
          </div>
        ),
      }}
      endReached={props.onEndReached}
      style={{
        height: props.height,
      }}
    />
  )
}

export default function HomeScreen() {
  const query = useQuery()

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table
          columns={[
            {
              label: "Name",
              accessor: "name",
              span: 2,
            },
            {
              label: "Username",
              accessor: "username",
              span: 2,
            },
            {
              label: "Email",
              accessor: "email",
              span: 3,
            },
            {
              label: "Location",
              accessor: "address.city",
              span: 2,
            },
            {
              label: "company",
              accessor: "company.name",
              span: 3,
            },
          ]}
          data={users}
          actions={[
            {
              icon: XCircleIcon,
              onClick: () => {},
            },
            {
              icon: XCircleIcon,
              onClick: () => {},
            },
          ]}
          height={404}
        />
      </div>
    </div>
  )
}

const users = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: {
        lat: "-43.9509",
        lng: "-34.4618",
      },
    },
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
    address: {
      street: "Douglas Extension",
      suite: "Suite 847",
      city: "McKenziehaven",
      zipcode: "59590-4157",
      geo: {
        lat: "-68.6102",
        lng: "-47.0653",
      },
    },
    phone: "1-463-123-4447",
    website: "ramiro.info",
    company: {
      name: "Romaguera-Jacobson",
      catchPhrase: "Face to face bifurcated interface",
      bs: "e-enable strategic applications",
    },
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
    address: {
      street: "Hoeger Mall",
      suite: "Apt. 692",
      city: "South Elvis",
      zipcode: "53919-4257",
      geo: {
        lat: "29.4572",
        lng: "-164.2990",
      },
    },
    phone: "493-170-9623 x156",
    website: "kale.biz",
    company: {
      name: "Robel-Corkery",
      catchPhrase: "Multi-tiered zero tolerance productivity",
      bs: "transition cutting-edge web services",
    },
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    address: {
      street: "Skiles Walks",
      suite: "Suite 351",
      city: "Roscoeview",
      zipcode: "33263",
      geo: {
        lat: "-31.8129",
        lng: "62.5342",
      },
    },
    phone: "(254)954-1289",
    website: "demarco.info",
    company: {
      name: "Keebler LLC",
      catchPhrase: "User-centric fault-tolerant solution",
      bs: "revolutionize end-to-end systems",
    },
  },
  {
    id: 6,
    name: "Mrs. Dennis Schulist",
    username: "Leopoldo_Corkery",
    email: "Karley_Dach@jasper.info",
    address: {
      street: "Norberto Crossing",
      suite: "Apt. 950",
      city: "South Christy",
      zipcode: "23505-1337",
      geo: {
        lat: "-71.4197",
        lng: "71.7478",
      },
    },
    phone: "1-477-935-8478 x6430",
    website: "ola.org",
    company: {
      name: "Considine-Lockman",
      catchPhrase: "Synchronised bottom-line interface",
      bs: "e-enable innovative applications",
    },
  },
  {
    id: 7,
    name: "Kurtis Weissnat",
    username: "Elwyn.Skiles",
    email: "Telly.Hoeger@billy.biz",
    address: {
      street: "Rex Trail",
      suite: "Suite 280",
      city: "Howemouth",
      zipcode: "58804-1099",
      geo: {
        lat: "24.8918",
        lng: "21.8984",
      },
    },
    phone: "210.067.6132",
    website: "elvis.io",
    company: {
      name: "Johns Group",
      catchPhrase: "Configurable multimedia task-force",
      bs: "generate enterprise e-tailers",
    },
  },
  {
    id: 8,
    name: "Nicholas Runolfsdottir V",
    username: "Maxime_Nienow",
    email: "Sherwood@rosamond.me",
    address: {
      street: "Ellsworth Summit",
      suite: "Suite 729",
      city: "Aliyaview",
      zipcode: "45169",
      geo: {
        lat: "-14.3990",
        lng: "-120.7677",
      },
    },
    phone: "586.493.6943 x140",
    website: "jacynthe.com",
    company: {
      name: "Abernathy Group",
      catchPhrase: "Implemented secondary concept",
      bs: "e-enable extensible e-tailers",
    },
  },
  {
    id: 9,
    name: "Glenna Reichert",
    username: "Delphine",
    email: "Chaim_McDermott@dana.io",
    address: {
      street: "Dayna Park",
      suite: "Suite 449",
      city: "Bartholomebury",
      zipcode: "76495-3109",
      geo: {
        lat: "24.6463",
        lng: "-168.8889",
      },
    },
    phone: "(775)976-6794 x41206",
    website: "conrad.com",
    company: {
      name: "Yost and Sons",
      catchPhrase: "Switchable contextually-based project",
      bs: "aggregate real-time technologies",
    },
  },
  {
    id: 10,
    name: "Clementina DuBuque",
    username: "Moriah.Stanton",
    email: "Rey.Padberg@karina.biz",
    address: {
      street: "Kattie Turnpike",
      suite: "Suite 198",
      city: "Lebsackbury",
      zipcode: "31428-2261",
      geo: {
        lat: "-38.2386",
        lng: "57.2232",
      },
    },
    phone: "024-648-3804",
    website: "ambrose.net",
    company: {
      name: "Hoeger LLC",
      catchPhrase: "Centralized empowering task-force",
      bs: "target end-to-end models",
    },
  },
]
