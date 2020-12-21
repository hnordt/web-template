import React from "react"
import { useQueries, useQuery, useInfiniteQuery } from "react-query"
import { useVirtual } from "react-virtual"
import {
  MdDevices,
  MdGroupWork,
  MdSearch,
  MdPerson,
  MdComputer,
  MdLocationCity,
  MdSettingsEthernet,
  MdWidgets,
} from "react-icons/md"
import { IoIosPerson } from "react-icons/io"
import { DiWindows, DiApple, DiAndroid, DiChrome } from "react-icons/di"
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadialBarChart,
  RadialBar,
  AreaChart,
  Area,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Label,
} from "recharts"
import _ from "lodash/fp"
import dayjs from "dayjs"
import login from "services/login"
import authenticate from "services/authenticate"
import httpClient from "utils/httpClient"
import formatNumber from "utils/formatNumber"
import Select from "components/Select"

const CHART_COLORS = [
  ["#db7093", "#555579", "#ff8c00", "#228b22"],
  ["#ffa500", "#a022ad", "#1e90ff", "#87cefa", "#483d8b"],
]

function getMSPIdFromOrganization(organization) {
  return organization?.owned_msp_id ?? organization?.managed_by_msp_id ?? null
}

function DataExplorer(props) {
  const ROW_HEIGHT = 44

  const requestsByUser = useInfiniteQuery(
    [
      "/traffic_reports/total_requests_users",
      "msp",
      props.mspId,
      props.timeframe,
    ],
    () =>
      httpClient
        .get("/traffic_reports/total_requests_users", {
          params: {
            organization_ids: props.mspStats.data.organization_ids.join(","),
            from: props.timeframe[0],
            to: props.timeframe[1],
            show_individual_users: true,
          },
        })
        .then((response) => {
          const total = _.sumBy("total", response.data.data.values)

          return Object.values(
            response.data.data.values.reduce((acc, item) => {
              const _total = (acc[item.user_name]?.total ?? 0) + item.total

              return {
                ...acc,
                [item.user_name]: {
                  user_name: item.user_name,
                  total: _total,
                  percentage: _total / total,
                },
              }
            }, {})
          )
        }),
    {
      getNextPageParam: () => undefined,
      enabled: Array.isArray(props.mspStats.data.organization_ids),
    }
  )
  const flatRequestsByUser = requestsByUser.data
    ? requestsByUser.data.pages.flat(1)
    : []

  const parentRef = React.useRef()
  const rowVirtualizer = useVirtual({
    parentRef,
    estimateSize: React.useCallback(() => ROW_HEIGHT, [ROW_HEIGHT]),
    size: requestsByUser.isFetchingNextPage
      ? flatRequestsByUser.length + 1
      : flatRequestsByUser.length,
  })

  React.useEffect(() => {
    const [lastItem] = [...rowVirtualizer.virtualItems].reverse()

    if (!lastItem) {
      return
    }

    if (
      lastItem.index === flatRequestsByUser.length - 1 &&
      requestsByUser.hasNextPage &&
      !requestsByUser.isFetchingNextPage
    ) {
      requestsByUser.fetchNextPage()
    }
  }, [requestsByUser, flatRequestsByUser.length, rowVirtualizer.virtualItems])

  if (requestsByUser.status === "loading") {
    return <p>Loading...</p>
  }

  if (requestsByUser.status === "error") {
    return <p>Error: {requestsByUser.error.message}</p>
  }

  return (
    <>
      <div
        ref={parentRef}
        className="relative border border-gray-200 rounded-md overflow-y-auto"
        style={{
          height: ROW_HEIGHT * 11,
        }}
      >
        <div
          className="sticky z-10 left-0 right-0 top-0 grid grid-cols-4 items-center bg-white border-b border-gray-200"
          style={{
            height: ROW_HEIGHT,
          }}
        >
          <span className="block col-span-2 px-4 text-gray-400 text-xs uppercase">
            User
          </span>
          <span className="block px-4 text-gray-400 text-xs uppercase">
            # of requests
          </span>
          <span className="block px-4 text-gray-400 text-xs uppercase">
            % of requests
          </span>
        </div>
        <div
          className="relative"
          style={{
            height: rowVirtualizer.totalSize,
          }}
        >
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const item = flatRequestsByUser[virtualRow.index]

            return (
              <div
                key={virtualRow.index}
                // className={
                //   virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"
                // }
                className="absolute left-0 top-0 w-full"
                style={{
                  height: virtualRow.size,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div
                  className={`${
                    virtualRow.index === 0 ? "" : "border-t"
                  } grid grid-cols-4 items-center h-full border-gray-200`}
                >
                  <span className="block col-span-2 px-4 text-gray-900 text-sm">
                    {virtualRow.index > flatRequestsByUser.length - 1 ? (
                      "Loading more..."
                    ) : (
                      <span className="flex items-center">
                        <MdPerson className="mr-2 p-1.5 w-7 h-7 text-blue-500 bg-blue-100 rounded-full" />
                        <span>{item.user_name}</span>
                      </span>
                    )}
                  </span>
                  <span className="block px-4 text-gray-900 text-sm">
                    {formatNumber(item.total)}
                  </span>
                  <span className="block px-4 text-gray-900 text-sm">
                    {formatNumber(item.percentage, {
                      style: "percent",
                    })}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default function ReportingAllOrganizationsScreen() {
  const [organization, setOrganization] = React.useState(null)
  const [qpsOrganizationId, setQPSOrganizationId] = React.useState(null)

  React.useEffect(() => {
    async function init() {
      await login()
      setOrganization((await authenticate()).organizations[0])
    }

    init()
  }, [])

  const mspId = getMSPIdFromOrganization(organization)
  const timeframe = [
    dayjs.utc().startOf("month").toISOString(),
    dayjs.utc().endOf("day").toISOString(),
  ]

  const mspStats = useQuery(
    ["/traffic_reports/total_organizations_stats", "msp", mspId, timeframe],
    () =>
      httpClient
        .get("/traffic_reports/total_organizations_stats", {
          params: {
            msp_id: mspId,
            from: timeframe[0],
            to: timeframe[1],
          },
        })
        .then((response) => response.data.data),
    {
      initialData: {
        organization_ids: null,
        total_requests: 0,
        allowed_requests: 0,
        blocked_requests: 0,
        threat_requests: 0,
      },
      enabled: !!mspId && !!timeframe,
    }
  )

  const topOrganizations = useQuery(
    ["/traffic_reports/top_organizations_requests", "msp", mspId, timeframe],
    () =>
      httpClient
        .get("/traffic_reports/top_organizations_requests", {
          params: {
            msp_id: mspId,
            from: timeframe[0],
            to: timeframe[1],
          },
        })
        .then((response) => response.data.data.values),
    {
      initialData: [],
      enabled: !!mspId && !!timeframe,
    }
  )

  const topOrganizationsStats = useQueries(
    topOrganizations.data.slice(0, 3).map((item) => ({
      queryKey: [
        "/traffic_reports/total_organizations_stats",
        "org",
        item.organization_id,
        timeframe,
      ],
      queryFn: () =>
        httpClient
          .get("/traffic_reports/total_organizations_stats", {
            params: {
              organization_id: item.organization_id,
              from: timeframe[0],
              to: timeframe[1],
            },
          })
          .then((response) => response.data.data),
      // TODO: initialData
    }))
  )

  const mspRequests = useQuery(
    ["/traffic_reports/total_organizations_requests", "msp", mspId, timeframe],
    () =>
      httpClient
        .get("/traffic_reports/total_organizations_requests", {
          params: {
            msp_id: mspId,
            from: timeframe[0],
            to: timeframe[1],
          },
        })
        .then((response) => response.data.data.values),
    {
      initialData: [],
      enabled: !!mspId && !!timeframe,
    }
  )

  const mspClients = useQuery(
    ["/traffic_reports/total_client_stats", "msp", mspId, timeframe],
    () =>
      httpClient
        .get("/traffic_reports/total_client_stats", {
          params: {
            msp_id: mspId,
            from: dayjs.utc().subtract(15, "minute").toISOString(),
            to: dayjs.utc().toISOString(),
          },
        })
        .then((response) => response.data.data),
    {
      initialData: {
        total_sites: 0,
        active_sites: 0,
        total_roaming_clients: 0,
        active_roaming_clients: 0,
        total_relays: 0,
        active_relays: 0,
        total_users: 0,
        active_users: 0,
      },
      enabled: !!mspId && !!timeframe,
    }
  )

  const mspDeployments = useQuery(
    ["/traffic_reports/total_deployments", "msp", mspId],
    () =>
      httpClient
        .get("/traffic_reports/total_deployments", {
          params: {
            msp_id: mspId,
          },
        })
        .then((response) => response.data.data),
    {
      initialData: {
        collections: 0,
        user_agents: 0,
        users: 0,
        sync_tools: 0,
        relays: 0,
      },
      enabled: !!mspId,
    }
  )

  const mspRoamingClients = useQuery(
    ["/traffic_reports/total_roaming_clients", "msp", mspId],
    () =>
      httpClient
        .get("/traffic_reports/total_roaming_clients", {
          params: {
            msp_id: mspId,
          },
        })
        .then((response) => response.data.data.values),
    {
      initialData: [
        {
          os: "windows",
          total: 0,
        },
        {
          os: "macos",
          total: 0,
        },
        {
          os: "android",
          total: 0,
        },
        {
          os: "ios",
          total: 0,
        },
        {
          os: "chrome",
          total: 0,
        },
      ],
      enabled: !!mspId,
    }
  )

  const mspQPS = useQuery(
    ["/traffic_reports/qps_active_organizations", "msp", mspId],
    () =>
      httpClient
        .get("/traffic_reports/qps_active_organizations", {
          params: {
            organization_ids: mspStats.data.organization_ids.join(","),
            from: dayjs.utc().subtract(15, "minute").toISOString(),
            to: dayjs.utc().toISOString(),
          },
        })
        .then((response) => response.data.data.values),
    {
      initialData: [],
      enabled: Array.isArray(mspStats.data.organization_ids),
    }
  )

  React.useEffect(() => {
    if (
      qpsOrganizationId === null &&
      Array.isArray(mspStats.data.organization_ids) &&
      !!mspStats.data.organization_ids[0]
    ) {
      setQPSOrganizationId(mspStats.data.organization_ids[0])
    }
  }, [qpsOrganizationId, mspStats.data.organization_ids])

  const mspQPSData = mspQPS.data.filter(
    (item) => String(item.organization_id) === String(qpsOrganizationId)
  )

  // TODO: remove
  const top5Users = [
    {
      name: "Edward Collins",
      value: 400,
    },
    {
      name: "Elisha Huber",
      value: 300,
    },
    {
      name: "Hayden Wilkson",
      value: 300,
    },
    {
      name: "Eliza Kenedy",
      value: 200,
    },
  ]
  const top5Categories = [
    {
      name: "P2P & Illegal",
      value: 400,
    },
    {
      name: "Malware",
      value: 200,
    },
    {
      name: "Pishing & Deception",
      value: 300,
    },
    {
      name: "Botnet",
      value: 200,
    },
    {
      name: "Adult Content",
      value: 200,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
            <MdLocationCity className="w-8 h-8 text-gray-600" />
          </div>
          <div>
            <h3 className="text-gray-600 text-lg font-semibold">
              All organizations
            </h3>
            {/* <p className="text-gray-500 text-xs">
              Last acess 07/07/2020 08:51 EST
            </p> */}
          </div>
        </div>
        <dl className="flex space-x-12">
          <div className="flex flex-col-reverse items-end">
            <dt className="text-gray-400 text-xs">Total requests</dt>
            <dd className="text-gray-500 text-2xl font-semibold">
              {formatNumber(mspStats.data.total_requests, {
                notation: "compact",
              })}
            </dd>
          </div>
          <div className="flex flex-col-reverse items-end">
            <dt className="text-gray-400 text-xs">Allowed requests</dt>
            <dd className="text-blue-500 text-2xl font-semibold">
              {formatNumber(mspStats.data.allowed_requests, {
                notation: "compact",
              })}
            </dd>
          </div>
          <div className="flex flex-col-reverse items-end">
            <dt className="text-gray-400 text-xs">Blocked requests</dt>
            <dd className="text-yellow-500 text-2xl font-semibold">
              {formatNumber(mspStats.data.blocked_requests, {
                notation: "compact",
              })}
            </dd>
          </div>
          <div className="flex flex-col-reverse items-end">
            <dt className="text-gray-400 text-xs">Threats</dt>
            <dd className="text-red-500 text-2xl font-semibold">
              {formatNumber(mspStats.data.threat_requests, {
                notation: "compact",
              })}
            </dd>
          </div>
        </dl>
      </div>
      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-gray-700 text-base font-semibold">
            Top 3 active organizations
          </h1>
          <button className="flex items-center px-6 py-1.5 text-gray-500 text-xs bg-white rounded-md shadow-sm uppercase">
            <MdSearch className="mr-2 w-5 h-5" />
            Find organizations
          </button>
        </div>
        <div className="grid gap-4 grid-cols-3">
          {topOrganizationsStats
            .filter((stats) => !!stats.data)
            .map((stats) => (
              <div
                key={stats.data.organization_ids[0]}
                className="p-6 bg-white rounded-md shadow-sm"
              >
                <h3 className="mb-3 text-gray-700 text-sm">
                  {stats.data.organization_names[0]} (
                  {formatNumber(
                    stats.data.total_requests / mspStats.data.total_requests,
                    {
                      style: "percent",
                    }
                  )}
                  )
                </h3>
                <div className="flex space-x-6">
                  <div>
                    <h1 className="text-lg font-semibold">
                      {formatNumber(stats.data.allowed_requests, {
                        notation: "compact",
                      })}
                    </h1>
                    <p className="text-blue-500 whitespace-nowrap text-xs font-semibold">
                      Allowed Requests
                    </p>
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold">
                      {formatNumber(stats.data.blocked_requests, {
                        notation: "compact",
                      })}
                    </h1>
                    <p className="text-yellow-500 whitespace-nowrap text-xs font-semibold">
                      Blocked Requests
                    </p>
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold">
                      {formatNumber(stats.data.threat_requests, {
                        notation: "compact",
                      })}
                    </h1>
                    <p className="text-red-500 whitespace-nowrap text-xs font-semibold">
                      Threats
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="mt-6 p-6 bg-white rounded-md shadow-md">
          <h3 className="mb-6 text-base font-semibold">Requests over time</h3>
          <ResponsiveContainer width="100%" height={340}>
            <LineChart className="text-xs" data={mspRequests.data}>
              <CartesianGrid stroke="#e5e9ea" strokeDasharray="4 4" />
              <XAxis
                dataKey="bucket"
                axisLine={{
                  stroke: "#e5e9ea",
                  strokeWidth: 2,
                }}
                tickMargin={8}
                tickLine={false}
              />
              <YAxis
                axisLine={{
                  stroke: "#e5e9ea",
                  strokeWidth: 2,
                }}
                tickLine={false}
              />
              <Tooltip
                separator=": "
                cursor={{
                  stroke: "#e5e9ea",
                  strokeWidth: 2,
                }}
              />
              <Line
                type="monotone"
                name="Allowed requests"
                dataKey="allowed_requests"
                stroke="#2b98f0"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                }}
              />
              <Line
                type="monotone"
                name="Blocked requests"
                dataKey="blocked_requests"
                stroke="#ef5350"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                }}
              />
              <Line
                type="monotone"
                name="Threats"
                dataKey="threat_requests"
                stroke="#ffb300"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 bg-white rounded-md shadow-md">
          <div className="p-6 rounded-t-md shadow-md">
            <h3 className="text-gray-900 text-base font-semibold">
              Requests by user
            </h3>
          </div>
          <div className="p-6">
            {/* <div className="flex items-center p-5 space-x-4">
              <span className="flex items-center justify-center py-1 w-40 text-xs bg-gray-100 rounded-md space-x-3">
                <p className="text-gray-600">All Requests</p>
                <p className="px-2 py-1 text-gray-50 bg-blue-500 rounded-md">
                  Threats
                </p>
              </span>
              <span className="flex items-center justify-between py-0.5 w-36 text-xs bg-gray-100 rounded-md">
                <svg
                  viewBox="0 0 24 24"
                  className="ml-auto py-1 w-7 h-7 text-gray-400 fill-current"
                >
                  <path d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z" />
                </svg>
                <IoIosPerson className="m-auto py-1 w-7 h-7 text-gray-50 bg-blue-500" />
                <MdDesktopWindows className="m-auto py-1 w-7 h-7 text-gray-400 fill-current" />
                <MdDashboard className="m-auto py-1 w-7 h-7 text-gray-400 fill-current" />
              </span>
            </div> */}
            <div className="flex justify-evenly">
              <div className="flex items-center">
                <h3 className="text-gray-900 whitespace-nowrap text-base font-semibold transform -rotate-90">
                  Top 5 users
                </h3>
                <PieChart
                  className="-ml-14 text-sm leading-10"
                  width={500}
                  height={340}
                  margin={{
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconType="circle"
                    iconSize={12}
                  />
                  <Pie
                    data={top5Users}
                    dataKey="value"
                    innerRadius={100}
                    outerRadius={120}
                  >
                    <Label
                      content={(props) => (
                        <IoIosPerson
                          className="text-gray-400"
                          size="4em"
                          x={`calc(${props.viewBox.cx}px - 2em)`}
                          y={`calc(${props.viewBox.cy}px - 2em)`}
                        />
                      )}
                      position="center"
                    />
                    {top5Users.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CHART_COLORS[0][index % CHART_COLORS[0].length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <div className="flex items-center">
                <h3 className="text-gray-900 whitespace-nowrap text-base font-semibold transform -rotate-90">
                  Top 5 categories
                </h3>
                <PieChart
                  className="-ml-14 text-sm leading-10"
                  width={500}
                  height={340}
                  margin={{
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    iconType="circle"
                    iconSize={12}
                  />
                  <Pie
                    data={top5Categories}
                    dataKey="value"
                    innerRadius={100}
                    outerRadius={120}
                  >
                    <Label
                      content={(props) => (
                        <MdWidgets
                          className="text-gray-400"
                          size="4em"
                          x={`calc(${props.viewBox.cx}px - 2em)`}
                          y={`calc(${props.viewBox.cy}px - 2em)`}
                        />
                      )}
                      position="center"
                    />
                    {top5Categories.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CHART_COLORS[1][index % CHART_COLORS[1].length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
            {/* <div className="flex mt-1">
            <MdSearch className="relative left-9 top-1 w-6 h-6 text-gray-700" />
            <input
              type="search"
              className="realtive pl-10 w-1/3 h-8 text-sm rounded-full"
              placeholder="Filter"
            ></input>
          </div> */}
            <div className="mt-6">
              <DataExplorer
                mspId={mspId}
                timeframe={timeframe}
                mspStats={mspStats}
              />
            </div>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-3 mt-6">
          {[
            {
              label: "Active sites",
              keys: ["total_sites", "active_sites"],
            },
            {
              label: "Active roaming clients",
              keys: ["total_roaming_clients", "active_roaming_clients"],
            },
            {
              label: "Active relays",
              keys: ["total_relays", "active_relays"],
            },
          ].map((item) => {
            const total = mspClients.data[item.keys[0]]
            const active = mspClients.data[item.keys[1]]
            const inactive = total - active

            return (
              <div
                key={item.label}
                className="flex items-center p-3 bg-white rounded-md shadow-md space-x-4"
              >
                <div className="relative">
                  <RadialBarChart
                    style={{
                      transform: "scaleY(-1) rotate(-270deg)",
                    }}
                    data={[
                      {
                        uv: (active / total) * 100,
                        fill: "#03a9f4",
                      },
                      {
                        uv: 100,
                        fill: "white",
                      },
                    ]}
                    width={140}
                    height={140}
                    innerRadius={64}
                    outerRadius={80}
                  >
                    <RadialBar dataKey="uv" background />
                  </RadialBarChart>
                  <span className="absolute left-1/2 top-1/2 text-xl font-semibold transform -translate-x-1/2 -translate-y-1/2">
                    {formatNumber(active / total, {
                      style: "percent",
                    })}
                  </span>
                </div>
                <div>
                  <h3 className="text-blue-500 text-base font-semibold">
                    {formatNumber(active)} {item.label.toLowerCase()}
                  </h3>
                  <p>
                    <span className="text-gray-500 text-sm">
                      Out of {formatNumber(total)} ({formatNumber(inactive)}{" "}
                      inactive)
                    </span>
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="grid gap-4 grid-cols-3 mt-6">
          <div className="p-6 bg-white rounded-md shadow-md">
            <h3 className="text-base font-semibold">Deployments</h3>
            <div className="grid gap-6 grid-cols-2 mt-6">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full">
                  <MdGroupWork className="w-6 h-6 text-blue-500" />
                </div>
                <dl>
                  <div className="flex flex-col-reverse">
                    <dt className="text-gray-900 text-xs">Collections</dt>
                    <dd className="text-gray-600 text-base font-bold">
                      {formatNumber(mspDeployments.data.collections)}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full">
                  <MdComputer className="w-6 h-6 text-blue-500" />
                </div>
                <dl>
                  <div className="flex flex-col-reverse">
                    <dt className="text-gray-900 text-xs">Users</dt>
                    <dd className="text-gray-600 text-base font-bold">
                      {formatNumber(mspDeployments.data.users)}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full">
                  <MdDevices className="w-6 h-6 text-blue-500" />
                </div>
                <dl>
                  <div className="flex flex-col-reverse">
                    <dt className="text-gray-900 text-xs">Sync tools</dt>
                    <dd className="text-gray-600 text-base font-bold">
                      {formatNumber(mspDeployments.data.sync_tools)}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full">
                  <MdSettingsEthernet className="w-6 h-6 text-blue-500" />
                </div>
                <dl>
                  <div className="flex flex-col-reverse">
                    <dt className="text-gray-900 text-xs">Relays</dt>
                    <dd className="text-gray-600 text-base font-bold">
                      {formatNumber(mspDeployments.data.relays)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <h4 className="mt-8 text-gray-900 text-sm font-semibold">
              Roaming clients
            </h4>
            <div className="grid gap-6 grid-cols-2 mt-6">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-14 h-14 bg-blue-50 rounded-full">
                  <DiWindows className="w-8 h-8 text-blue-500" />
                </div>
                <dl>
                  <div className="flex flex-col-reverse">
                    <dt className="text-gray-900 text-xs">Windows</dt>
                    <dd className="text-gray-600 text-base font-bold">
                      {formatNumber(
                        mspRoamingClients.data.find(
                          (item) => item.os === "windows"
                        )?.total ?? 0
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full">
                  <DiApple className="w-8 h-8 text-gray-500" />
                </div>
                <dl>
                  <div className="flex flex-col-reverse">
                    <dt className="text-gray-900 text-xs">macOS</dt>
                    <dd className="text-gray-600 text-base font-bold">
                      {formatNumber(
                        mspRoamingClients.data.find(
                          (item) => item.os === "macos"
                        )?.total ?? 0
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full">
                  <DiApple className="w-8 h-8 text-gray-500" />
                </div>
                <dl>
                  <div className="flex flex-col-reverse">
                    <dt className="text-gray-900 text-xs">iOS</dt>
                    <dd className="text-gray-600 text-base font-bold">
                      {formatNumber(
                        mspRoamingClients.data.find((item) => item.os === "ios")
                          ?.total ?? 0
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-full">
                  <DiAndroid className="w-8 h-8 text-green-500" />
                </div>
                <dl>
                  <div className="flex flex-col-reverse">
                    <dt className="text-gray-900 text-xs">Android</dt>
                    <dd className="text-gray-600 text-base font-bold">
                      {formatNumber(
                        mspRoamingClients.data.find(
                          (item) => item.os === "android"
                        )?.total ?? 0
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-14 h-14 bg-red-100 rounded-full">
                  <DiChrome className="w-8 h-8 text-red-500" />
                </div>
                <dl>
                  <div className="flex flex-col-reverse">
                    <dt className="text-gray-900 text-xs">Chrome</dt>
                    <dd className="text-gray-600 text-base font-bold">
                      {formatNumber(
                        mspRoamingClients.data.find(
                          (item) => item.os === "chrome"
                        )?.total ?? 0
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <div className="col-span-2 p-6 bg-white rounded-md shadow-md">
            <div className="relative">
              <h3 className="text-base font-semibold">Queries per second</h3>
              {qpsOrganizationId !== null && (
                <div className="absolute right-0 top-0">
                  <Select
                    options={mspStats.data.organization_ids.map(
                      (id, index) => ({
                        label: mspStats.data.organization_names[index],
                        value: id,
                      })
                    )}
                    value={qpsOrganizationId}
                    onChange={setQPSOrganizationId}
                  />
                </div>
              )}
            </div>
            <h1 className="mt-6 text-2xl font-bold">
              {formatNumber(_.sumBy("qps", mspQPSData) / mspQPSData.length, {
                maximumFractionDigits: 1,
              })}{" "}
              <span className="text-gray-500 text-sm font-normal">average</span>
            </h1>
            {/* <span className="flex items-center justify-between mt-2 px-1.5 w-14 text-blue-500 font-bold bg-blue-50">
              <MdArrowDownward />
              4%
            </span> */}
            <ResponsiveContainer width="100%" height={340}>
              <AreaChart data={mspQPSData}>
                <XAxis dataKey="bucket" hide />
                <Tooltip separator=": " />
                <Area
                  name="QPS"
                  dataKey="qps"
                  stroke="#c4c4c4"
                  strokeWidth={2}
                  fill="url(#gradient)"
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="25%" stopColor="#03D1F4" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#03D1F4" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}