import React from "react"
import { useHistory } from "react-router-dom"
import { useQueries, useQuery, useInfiniteQuery } from "react-query"
import { useVirtual } from "react-virtual"
import { useDebounce } from "@react-hook/debounce"
import {
  MdDevices,
  MdGroupWork,
  MdSearch,
  MdPerson,
  MdComputer,
  MdLocationCity,
  MdSettingsEthernet,
  MdWidgets,
  MdFolderOpen,
  MdPublic,
  MdLaptop,
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
import qs from "query-string"
import httpClient from "utils/httpClient"
import formatNumber from "utils/formatNumber"
import Select from "components/Select"
import SegmentedControl from "components/SegmentedControl"
import DatePicker from "components/DatePicker"
import Loader from "components/Loader"

const CHART_COLORS = [
  ["#db7093", "#555579", "#ff8c00", "#228b22"],
  ["#ffa500", "#a022ad", "#1e90ff", "#87cefa", "#483d8b"],
]

function ChartLoader(props) {
  if (props.minimal) {
    return (
      <div className="absolute z-10 inset-0 flex items-center justify-center">
        <Loader variant="dark" size="sm" />
      </div>
    )
  }

  return (
    <div className="absolute z-10 inset-0 flex items-center justify-center bg-gray-200 rounded-md animate-pulse" />
  )
}

function DataExplorer(props) {
  const ROW_HEIGHT = 44

  const [searchText, setSearchText] = useDebounce("", 1000)

  const query = useInfiniteQuery(
    [
      "ui:data-explorer",
      "msp",
      props.currentUserOrganizationIds,
      props.breakdown,
      props.reportType,
      props.timeframe,
      searchText,
      props.securityReport,
    ],
    (context) =>
      httpClient
        .get(
          `/traffic_reports/${
            {
              category: "top_categories",
              domain: "top_domains",
              user: "top_users",
              rc: "top_agents",
              collection: "top_collections",
            }[props.breakdown]
          }`,
          {
            params: {
              "organization_ids": props.currentUserOrganizationIds.join(","),
              "type": props.reportType,
              [props.breakdown === "domain" ? "domain" : "name"]: searchText,
              "from": props.timeframe[0],
              "to": props.timeframe[1],
              "security_report": props.securityReport,
              "page[number]": context.pageParam,
              "page[size]": 20,
            },
          }
        )
        .then((response) => response.data),
    {
      getNextPageParam: (lastPage) => lastPage.data.page.next ?? undefined,
      enabled: !!props.currentUserOrganizationIds,
    }
  )
  const flatData = query.data
    ? query.data.pages
        .map((page, pageIndex) =>
          page.data.values.map((value) => ({
            ...value,
            percentage:
              value.total / query.data.pages[pageIndex].meta.total_count,
          }))
        )
        .flat(1)
    : []

  const parentRef = React.useRef()
  const rowVirtualizer = useVirtual({
    parentRef,
    estimateSize: React.useCallback(() => ROW_HEIGHT, [ROW_HEIGHT]),
    size: query.isFetchingNextPage ? flatData.length + 1 : flatData.length,
  })

  React.useEffect(() => {
    const [lastItem] = [...rowVirtualizer.virtualItems].reverse()

    if (!lastItem) {
      return
    }

    if (
      lastItem.index === flatData.length - 1 &&
      query.hasNextPage &&
      !query.isFetchingNextPage
    ) {
      query.fetchNextPage()
    }
  }, [query, flatData.length, rowVirtualizer.virtualItems])

  return (
    <>
      {props.breakdown !== "category" && (
        <div className="relative mb-6">
          <input
            type="search"
            className="placeholder-gray-400 pl-10 pr-4 py-1.5 w-96 text-gray-900 text-sm border border-gray-300 rounded-full"
            placeholder="Filter"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <MdSearch className="absolute left-4 top-1/2 w-5 h-5 text-gray-600 transform -translate-y-1/2" />
        </div>
      )}
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
          {query.status.match(/idle|loading/) ? (
            <>
              <div className="absolute z-10 left-4 top-4 w-1/3 h-7 bg-gray-200 rounded animate-pulse" />
              <div className="absolute z-10 left-4 top-14 w-2/3 h-7 bg-gray-200 rounded animate-pulse" />
              <div className="absolute z-10 left-4 top-24 w-1/4 h-7 bg-gray-200 rounded animate-pulse" />
            </>
          ) : rowVirtualizer.virtualItems.length === 0 ? (
            <p className="p-4 text-gray-400 text-sm">No results found</p>
          ) : null}
          {rowVirtualizer.virtualItems.map((virtualRow) => {
            const item = flatData[virtualRow.index]

            return (
              <div
                key={virtualRow.index}
                className={`${
                  virtualRow.index % 2 ? "" : "bg-gray-50"
                } absolute left-0 top-0 w-full`}
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
                  {virtualRow.index > flatData.length - 1 ? (
                    <div className="col-span-4 px-4">
                      <Loader className="w-7" variant="dark" />
                    </div>
                  ) : (
                    <>
                      <span className="block col-span-2 px-4 text-gray-900 text-sm">
                        <span className="flex items-center">
                          <MdPerson className="mr-2 p-1.5 w-7 h-7 text-blue-500 bg-blue-100 rounded-full" />
                          <span>
                            {
                              item[
                                {
                                  category: "category_name",
                                  domain: "domain",
                                  user: "user_name",
                                  rc: "agent_name",
                                  collection: "collection_name",
                                }[props.breakdown]
                              ]
                            }
                          </span>
                        </span>
                      </span>
                      <span className="block px-4 text-gray-900 text-sm">
                        {formatNumber(item.total)}
                      </span>
                      <span className="block px-4 text-gray-900 text-sm">
                        {formatNumber(item.percentage, {
                          style: "percent",
                          maximumFractionDigits: 1,
                        })}
                      </span>
                    </>
                  )}
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
  const history = useHistory()
  const searchParams = qs.parse(history.location.search)

  const [reportType, setReportType] = React.useState(
    searchParams["report-type"] ?? "all"
  )
  const [breakdown, setBreakdown] = React.useState(
    searchParams.breakdown ?? "user"
  )
  const [timeframe, setTimeframe] = React.useState(() => [
    searchParams["date-start"]
      ? dayjs(searchParams["date-start"]).startOf("day").toDate()
      : dayjs().subtract(6, "day").startOf("day").toDate(),
    searchParams["date-end"]
      ? dayjs(searchParams["date-end"]).endOf("day").toDate()
      : dayjs().endOf("day").toDate(),
  ])
  const [securityReport, setSecurityReport] = React.useState(
    searchParams["security-report"] === "true" ? true : false
  )
  const [qpsOrganizationId, setQPSOrganizationId] = React.useState(null)

  const timeframeDiff = dayjs(timeframe[1]).diff(timeframe[0], "day")

  React.useEffect(() => {
    history.push(
      history.location.pathname +
        "?" +
        qs.stringify({
          "report-type": reportType,
          "breakdown": breakdown,
          "date-start": dayjs(timeframe[0]).toISOString(),
          "date-end": dayjs(timeframe[1]).toISOString(),
          "security-report": securityReport,
        })
    )
  }, [history, reportType, breakdown, timeframe, securityReport])

  const auth = useQuery(
    ["/authenticate"],
    () => httpClient.post("/authenticate").then((response) => response.data),
    {
      onSuccess: (data) => setQPSOrganizationId(data.organizations[0].id),
    }
  )
  const currentUserOrganizationIds = auth.data?.organizations.map(
    (organization) => organization.id
  )

  const mspStats = useQuery(
    [
      "/traffic_reports/total_organizations_stats",
      {
        currentUserOrganizationIds,
        timeframe,
      },
    ],
    () =>
      httpClient
        .get("/traffic_reports/total_organizations_stats", {
          params: {
            organization_ids: currentUserOrganizationIds.join(","),
            from: timeframe[0],
            to: timeframe[1],
          },
        })
        .then((response) => response.data.data),
    {
      enabled: !!currentUserOrganizationIds,
    }
  )

  const topOrganizations = useQuery(
    [
      "/traffic_reports/top_organizations_requests",
      {
        currentUserOrganizationIds,
        timeframe,
      },
    ],
    () =>
      httpClient
        .get("/traffic_reports/top_organizations_requests", {
          params: {
            organization_ids: currentUserOrganizationIds.join(","),
            from: timeframe[0],
            to: timeframe[1],
          },
        })
        .then((response) => response.data.data.values),
    {
      enabled: !!currentUserOrganizationIds,
    }
  )

  const topOrganizationsStats = useQueries(
    (topOrganizations.data ?? []).slice(0, 3).map((item) => ({
      queryKey: [
        "/traffic_reports/total_organizations_stats",
        {
          organizationId: item.organization_id,
          timeframe,
        },
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
    }))
  )

  const mspRequests = useQuery(
    [
      "/traffic_reports/total_organizations_requests",
      {
        currentUserOrganizationIds,
        timeframe,
      },
    ],
    () =>
      httpClient
        .get("/traffic_reports/total_organizations_requests", {
          params: {
            organization_ids: currentUserOrganizationIds.join(","),
            from: timeframe[0],
            to: timeframe[1],
          },
        })
        .then((response) => response.data.data.values),
    {
      refetchInterval: timeframeDiff > 1 ? undefined : 60_000,
      enabled: !!currentUserOrganizationIds,
    }
  )

  const mspClients = useQuery(
    [
      "/traffic_reports/total_client_stats",
      "msp",
      {
        currentUserOrganizationIds,
      },
    ],
    () =>
      httpClient
        .get("/traffic_reports/total_client_stats", {
          params: {
            organization_ids: currentUserOrganizationIds.join(","),
            from: dayjs().subtract(15, "minute").toISOString(),
            to: dayjs().toISOString(),
          },
        })
        .then((response) => response.data.data),
    {
      enabled: !!currentUserOrganizationIds,
    }
  )

  const mspDeployments = useQuery(
    [
      "/traffic_reports/total_deployments",
      {
        currentUserOrganizationIds,
      },
    ],
    () =>
      httpClient
        .get("/traffic_reports/total_deployments", {
          params: {
            organization_ids: currentUserOrganizationIds.join(","),
          },
        })
        .then((response) => response.data.data),
    {
      enabled: !!currentUserOrganizationIds,
    }
  )

  const mspRoamingClients = useQuery(
    [
      "/traffic_reports/total_roaming_clients",
      {
        currentUserOrganizationIds,
      },
    ],
    () =>
      httpClient
        .get("/traffic_reports/total_roaming_clients", {
          params: {
            organization_ids: currentUserOrganizationIds.join(","),
          },
        })
        .then((response) => response.data.data.values),
    {
      enabled: !!currentUserOrganizationIds,
    }
  )

  const mspQPS = useQuery(
    [
      "/traffic_reports/qps_active_organizations",
      {
        currentUserOrganizationIds,
      },
    ],
    () =>
      httpClient
        .get("/traffic_reports/qps_active_organizations", {
          params: {
            organization_ids: currentUserOrganizationIds.join(","),
            from: dayjs().subtract(15, "minute").toISOString(),
            to: dayjs().toISOString(),
          },
        })
        .then((response) => response.data.data.values),
    {
      refetchInterval: 60_000,
      enabled: !!currentUserOrganizationIds,
    }
  )

  const top5Users = useQuery(
    [
      "/traffic_reports/top_users?page[number]=1&page[size]=5",
      {
        currentUserOrganizationIds,
        reportType,
        timeframe,
        securityReport,
      },
    ],
    () =>
      httpClient
        .get("/traffic_reports/top_users", {
          params: {
            "organization_ids": currentUserOrganizationIds.join(","),
            "type": reportType,
            "from": timeframe[0],
            "to": timeframe[1],
            "security_report": securityReport,
            "page[number]": 1,
            "page[size]": 5,
          },
        })
        .then((response) => response.data.data.values),
    {
      enabled: !!currentUserOrganizationIds,
    }
  )

  const top5Categories = useQuery(
    [
      "/traffic_reports/top_categories?page[number]=1&page[size]=5",
      {
        currentUserOrganizationIds,
        reportType,
        timeframe,
        securityReport,
      },
    ],
    () =>
      httpClient
        .get("/traffic_reports/top_categories", {
          params: {
            "organization_ids": currentUserOrganizationIds.join(","),
            "type": reportType,
            "from": timeframe[0],
            "to": timeframe[1],
            "security_report": securityReport,
            "page[number]": 1,
            "page[size]": 5,
          },
        })
        .then((response) => response.data.data.values),
    {
      enabled: !!currentUserOrganizationIds,
    }
  )

  const mspQPSData =
    mspQPS.data?.filter(
      (item) => String(item.organization_id) === String(qpsOrganizationId)
    ) ?? []

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="flex items-center px-8 py-5 bg-white border-b border-gray-200">
        <DatePicker defaultValue={timeframe} onChange={setTimeframe} />
      </div>
      <div className="flex items-center justify-between px-8 py-5 bg-white shadow-md">
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
              {mspStats.status.match(/idle|loading/) ? (
                <span className="text-gray-200 bg-gray-200 rounded animate-pulse">
                  0...
                </span>
              ) : (
                formatNumber(mspStats.data?.total_requests, {
                  notation: "compact",
                })
              )}
            </dd>
          </div>
          <div className="flex flex-col-reverse items-end">
            <dt className="text-gray-400 text-xs">Allowed requests</dt>
            <dd className="text-blue-500 text-2xl font-semibold">
              {mspStats.status.match(/idle|loading/) ? (
                <span className="text-gray-200 bg-gray-200 rounded animate-pulse">
                  0...
                </span>
              ) : (
                formatNumber(mspStats.data?.allowed_requests, {
                  notation: "compact",
                })
              )}
            </dd>
          </div>
          <div className="flex flex-col-reverse items-end">
            <dt className="text-gray-400 text-xs">Blocked requests</dt>
            <dd className="text-yellow-500 text-2xl font-semibold">
              {mspStats.status.match(/idle|loading/) ? (
                <span className="text-gray-200 bg-gray-200 rounded animate-pulse">
                  0...
                </span>
              ) : (
                formatNumber(mspStats.data?.blocked_requests, {
                  notation: "compact",
                })
              )}
            </dd>
          </div>
          <div className="flex flex-col-reverse items-end">
            <dt className="text-gray-400 text-xs">Threats</dt>
            <dd className="text-red-500 text-2xl font-semibold">
              {mspStats.status.match(/idle|loading/) ? (
                <span className="text-gray-200 bg-gray-200 rounded animate-pulse">
                  0...
                </span>
              ) : (
                formatNumber(mspStats.data?.threat_requests, {
                  notation: "compact",
                })
              )}
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
          {(topOrganizations.status.match(/idle|loading/)
            ? [
                {
                  status: "loading",
                },
                {
                  status: "loading",
                },
                {
                  status: "loading",
                },
              ]
            : topOrganizationsStats
          ).map((stats, statsIndex) => (
            <div
              key={stats.data?.organization_ids[0] ?? statsIndex}
              className="p-6 bg-white rounded-md shadow-sm"
            >
              <h3 className="mb-3 text-gray-700 text-sm">
                {stats.status.match(/idle|loading/) ? (
                  <span
                    className={`${
                      statsIndex === 0
                        ? "w-1/3"
                        : statsIndex === 1
                        ? "w-1/4"
                        : "w-2/4"
                    } inline-block text-gray-200 bg-gray-200 rounded animate-pulse`}
                  >
                    ...
                  </span>
                ) : (
                  <>
                    {stats.data.organization_names[0]} (
                    {formatNumber(
                      stats.data.total_requests / mspStats.data?.total_requests,
                      {
                        style: "percent",
                        maximumFractionDigits: 1,
                      }
                    )}
                    )
                  </>
                )}
              </h3>
              <div className="flex space-x-6">
                <div>
                  <h1 className="text-lg font-semibold">
                    {stats.status.match(/idle|loading/) ? (
                      <span className="text-gray-200 bg-gray-200 rounded animate-pulse">
                        0...
                      </span>
                    ) : (
                      formatNumber(stats.data?.allowed_requests, {
                        notation: "compact",
                      })
                    )}
                  </h1>
                  <p className="text-blue-500 whitespace-nowrap text-xs font-semibold">
                    Allowed requests
                  </p>
                </div>
                <div>
                  <h1 className="text-lg font-semibold">
                    {stats.status.match(/idle|loading/) ? (
                      <span className="text-gray-200 bg-gray-200 rounded animate-pulse">
                        0...
                      </span>
                    ) : (
                      formatNumber(stats.data?.blocked_requests, {
                        notation: "compact",
                      })
                    )}
                  </h1>
                  <p className="text-yellow-500 whitespace-nowrap text-xs font-semibold">
                    Blocked requests
                  </p>
                </div>
                <div>
                  <h1 className="text-lg font-semibold">
                    {stats.status.match(/idle|loading/) ? (
                      <span className="text-gray-200 bg-gray-200 rounded animate-pulse">
                        0...
                      </span>
                    ) : (
                      formatNumber(stats.data?.threat_requests, {
                        notation: "compact",
                      })
                    )}
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
          <div className="relative">
            {mspRequests.status.match(/idle|loading/) && <ChartLoader />}
            <ResponsiveContainer width="100%" height={340}>
              <LineChart className="text-xs" data={mspRequests.data}>
                <CartesianGrid stroke="#e5e9ea" strokeDasharray="4 4" />
                <XAxis
                  dataKey="bucket"
                  axisLine={{
                    stroke: "#e5e9ea",
                    strokeWidth: 2,
                  }}
                  tickFormatter={(v) =>
                    dayjs(v).format(timeframeDiff > 1 ? "ll" : "lll")
                  }
                  tickMargin={8}
                  tickLine={false}
                />
                <YAxis
                  axisLine={{
                    stroke: "#e5e9ea",
                    strokeWidth: 2,
                  }}
                  tickFormatter={(v) =>
                    formatNumber(v, {
                      notation: "compact",
                    })
                  }
                  tickLine={false}
                />
                <Tooltip
                  labelFormatter={(label) =>
                    dayjs(label).format(timeframeDiff > 1 ? "ll" : "lll")
                  }
                  formatter={formatNumber}
                  separator=": "
                  labelStyle={{
                    fontWeight: 600,
                    marginBottom: 5,
                  }}
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
        </div>
        <div className="mt-6 bg-white rounded-md shadow-md">
          <div className="p-6 rounded-t-md shadow-md">
            <h3 className="text-gray-900 text-base font-semibold">
              {_.upperFirst(reportType)}{" "}
              {securityReport ? "threats" : "requests"} by{" "}
              {
                {
                  category: "category",
                  domain: "domain",
                  user: "user",
                  rc: "roaming client",
                  collection: "collection",
                }[breakdown]
              }
            </h3>
          </div>
          <div className="p-6">
            <div className="flex space-x-4">
              <SegmentedControl
                variant="primary"
                options={[
                  {
                    label: "Requests",
                    value: false,
                  },
                  {
                    label: "Threats",
                    value: true,
                  },
                ]}
                value={securityReport}
                onChange={setSecurityReport}
              />
              <SegmentedControl
                variant="primary"
                options={[
                  {
                    label: "All",
                    value: "all",
                  },
                  {
                    label: "Allowed",
                    value: "allowed",
                  },
                  {
                    label: "Blocked",
                    value: "blocked",
                  },
                ]}
                value={reportType}
                onChange={setReportType}
              />
              <SegmentedControl
                variant="primary"
                options={[
                  {
                    icon: MdPerson,
                    value: "user",
                    helpText: "Breakdown by user",
                  },
                  {
                    icon: MdPublic,
                    value: "domain",
                    helpText: "Breakdown by domain",
                  },
                  {
                    icon: MdLaptop,
                    value: "rc",
                    helpText: "Breakdown by romaing client",
                  },
                  {
                    icon: MdFolderOpen,
                    value: "collection",
                    helpText: "Breakdown by collection",
                  },
                  {
                    icon: MdWidgets,
                    value: "category",
                    helpText: "Breakdown by category",
                  },
                ]}
                value={breakdown}
                onChange={setBreakdown}
              />
            </div>
            <div className="flex justify-evenly my-6">
              <div className="flex items-center">
                <h3 className="text-gray-900 whitespace-nowrap text-base font-semibold transform -rotate-90">
                  Top 5 users
                </h3>
                <div className="relative">
                  {top5Users.status.match(/idle|loading/) && (
                    <ChartLoader minimal />
                  )}
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
                      data={top5Users.data}
                      nameKey="user_name"
                      dataKey="total"
                      startAngle={90}
                      endAngle={-270}
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
                      {top5Users.data?.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[0][index % CHART_COLORS[0].length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
              </div>
              <div className="flex items-center">
                <h3 className="text-gray-900 whitespace-nowrap text-base font-semibold transform -rotate-90">
                  Top 5 categories
                </h3>
                <div className="relative">
                  {top5Categories.status.match(/idle|loading/) && (
                    <ChartLoader minimal />
                  )}
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
                      data={top5Categories.data}
                      nameKey="category_name"
                      dataKey="total"
                      startAngle={90}
                      endAngle={-270}
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
                      {top5Categories.data?.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[1][index % CHART_COLORS[1].length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
              </div>
            </div>
            <DataExplorer
              currentUserOrganizationIds={currentUserOrganizationIds}
              reportType={reportType}
              breakdown={breakdown}
              timeframe={timeframe}
              securityReport={securityReport}
            />
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
            const total = mspClients.data?.[item.keys[0]]
            const active = mspClients.data?.[item.keys[1]]
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
                    {mspClients.status.match(/idle|loading/) ? (
                      <span className="text-gray-200 bg-gray-200 rounded animate-pulse">
                        0...
                      </span>
                    ) : (
                      formatNumber(active / total, {
                        style: "percent",
                        maximumFractionDigits: 1,
                      })
                    )}
                  </span>
                </div>
                <div>
                  <h3 className="text-blue-500 text-base font-semibold">
                    {mspClients.status.match(/idle|loading/) ? (
                      <span className="inline-block w-20 text-gray-200 bg-gray-200 rounded animate-pulse">
                        ...
                      </span>
                    ) : (
                      <>
                        {formatNumber(active)} {item.label.toLowerCase()}
                      </>
                    )}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {mspClients.status.match(/idle|loading/) ? (
                      <span className="inline-block mt-1 w-40 text-gray-200 bg-gray-200 rounded animate-pulse">
                        ...
                      </span>
                    ) : (
                      <>
                        Out of {formatNumber(total)} ({formatNumber(inactive)}{" "}
                        inactive)
                      </>
                    )}
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
                      {mspDeployments.status.match(/idle|loading/) ? (
                        <span className="text-gray-200 bg-gray-200 rounded animate-pulse">
                          0...
                        </span>
                      ) : (
                        formatNumber(mspDeployments.data.collections)
                      )}
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
                      {mspDeployments.status.match(/idle|loading/) ? (
                        <span className="text-gray-200 bg-gray-200 rounded animate-pulse">
                          0...
                        </span>
                      ) : (
                        formatNumber(mspDeployments.data.users)
                      )}
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
                      {mspDeployments.status.match(/idle|loading/) ? (
                        <span className="text-gray-200 bg-gray-200 rounded animate-pulse">
                          0...
                        </span>
                      ) : (
                        formatNumber(mspDeployments.data.sync_tools)
                      )}
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
                      {mspDeployments.status.match(/idle|loading/) ? (
                        <span className="text-gray-200 bg-gray-200 rounded animate-pulse">
                          0...
                        </span>
                      ) : (
                        formatNumber(mspDeployments.data.relays)
                      )}
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
                      {mspRoamingClients.status.match(/idle|loading/) ? (
                        <span className="text-gray-200 bg-gray-200 rounded animate-pulse">
                          0...
                        </span>
                      ) : (
                        formatNumber(
                          mspRoamingClients.data.find(
                            (item) => item.os === "windows"
                          )?.total ?? 0
                        )
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
                      {mspRoamingClients.status.match(/idle|loading/) ? (
                        <span className="text-gray-200 bg-gray-200 rounded animate-pulse">
                          0...
                        </span>
                      ) : (
                        formatNumber(
                          mspRoamingClients.data.find(
                            (item) => item.os === "macos"
                          )?.total ?? 0
                        )
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
                      {mspRoamingClients.status.match(/idle|loading/) ? (
                        <span className="text-gray-200 bg-gray-200 rounded animate-pulse">
                          0...
                        </span>
                      ) : (
                        formatNumber(
                          mspRoamingClients.data.find(
                            (item) => item.os === "ios"
                          )?.total ?? 0
                        )
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
                      {mspRoamingClients.status.match(/idle|loading/) ? (
                        <span className="text-gray-200 bg-gray-200 rounded animate-pulse">
                          0...
                        </span>
                      ) : (
                        formatNumber(
                          mspRoamingClients.data.find(
                            (item) => item.os === "android"
                          )?.total ?? 0
                        )
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
                      {mspRoamingClients.status.match(/idle|loading/) ? (
                        <span className="text-gray-200 bg-gray-200 rounded animate-pulse">
                          0...
                        </span>
                      ) : (
                        formatNumber(
                          mspRoamingClients.data.find(
                            (item) => item.os === "chrome"
                          )?.total ?? 0
                        )
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <div className="flex flex-col col-span-2 p-6 bg-white rounded-md shadow-md">
            <div className="relative">
              <h3 className="text-base font-semibold">Queries per second</h3>
              {auth.data && qpsOrganizationId !== null && (
                <div className="absolute right-0 top-0">
                  <Select
                    options={auth.data.organizations.map((organization) => ({
                      label: organization.name,
                      value: organization.id,
                    }))}
                    value={qpsOrganizationId}
                    onChange={setQPSOrganizationId}
                  />
                </div>
              )}
            </div>
            <h1 className="mt-6 text-2xl font-bold">
              {mspRoamingClients.status.match(/idle|loading/) ? (
                <span className="text-gray-200 bg-gray-200 rounded animate-pulse">
                  0...
                </span>
              ) : (
                formatNumber(_.sumBy("qps", mspQPSData) / mspQPSData.length, {
                  maximumFractionDigits: 1,
                })
              )}{" "}
              <span className="text-gray-500 text-sm font-normal">average</span>
            </h1>
            <div className="relative flex-1 mt-6">
              {mspQPS.status.match(/idle|loading/) && <ChartLoader />}
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart className="text-sm" data={mspQPSData}>
                  <XAxis dataKey="bucket" hide />
                  <Tooltip
                    labelFormatter={(label) => dayjs(label).format("lll")}
                    separator=": "
                    labelStyle={{
                      fontWeight: 600,
                    }}
                  />
                  <Area
                    name="QPS"
                    dataKey="qps"
                    stroke="#c4c4c4"
                    strokeWidth={2}
                    fill="url(#gradient)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="25%"
                        stopColor="#03D1F4"
                        stopOpacity={0.4}
                      />
                      <stop offset="100%" stopColor="#03D1F4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
