import React from "react"
import { useQueries, useQuery } from "react-query"
import {
  MdFlag,
  MdDevices,
  MdGroupWork,
  MdDesktopWindows,
  MdSync,
  MdLanguage,
  MdKeyboardArrowLeft,
  MdSearch,
  MdKeyboardArrowRight,
  MdDashboard,
  MdPerson,
  MdComputer,
  MdArrowDownward,
  MdLocationCity,
  MdDateRange,
  MdSettingsEthernet,
} from "react-icons/md"
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
} from "recharts"
import _ from "lodash/fp"
import dayjs from "dayjs"
import login from "services/login"
import authenticate from "services/authenticate"
import httpClient from "utils/httpClient"
import formatNumber from "utils/formatNumber"

function getMSPIdFromOrganization(organization) {
  return organization?.owned_msp_id ?? organization?.managed_by_msp_id ?? null
}

export default function ReportingAllOrganizationsScreen() {
  const [organization, setOrganization] = React.useState(null)

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
            <h3 className="text-base font-semibold">Depoyments</h3>
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
            <h3 className="text-base font-semibold">Queries per second</h3>
            <div>
              <h1 className="mt-8 text-2xl font-bold">
                {formatNumber(
                  _.sumBy("qps", mspQPS.data) / mspQPS.data.length,
                  {
                    maximumFractionDigits: 1,
                  }
                )}
              </h1>
              <p className="text-gray-500 text-xs">average</p>
            </div>
            {/* <span className="flex items-center justify-between mt-2 px-1.5 w-14 text-blue-500 font-bold bg-blue-50">
              <MdArrowDownward />
              4%
            </span> */}
            <ResponsiveContainer width="100%" height={340}>
              <AreaChart data={mspQPS.data}>
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
