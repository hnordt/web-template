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
  MdLink,
  MdDashboard,
  MdPerson,
  MdComputer,
  MdArrowDownward,
  MdLocationCity,
  MdDateRange,
} from "react-icons/md"
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

  const totalDeployments = useQuery(
    ["totalDeployments", "msp", mspId],
    () =>
      httpClient
        .get("/traffic_reports/total_deployments", {
          params: {
            msp_id: mspId,
          },
        })
        .then((response) => response.data),
    {
      enabled: !!mspId,
    }
  )

  const totalRoamingClients = useQuery(
    ["totalRoamingClients", "msp", mspId],
    () =>
      httpClient
        .get("/traffic_reports/total_roaming_clients", {
          params: {
            msp_id: mspId,
          },
        })
        .then((response) => response.data),
    {
      enabled: !!mspId,
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
        <div className="flex space-x-4">
          {topOrganizationsStats
            .filter((stats) => !!stats.data)
            .map((stats) => (
              <div
                key={stats.data.organization_ids[0]}
                className="flex-1 p-6 bg-white rounded-md shadow-sm"
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
          <h3 className="mb-6 text-base font-semibold">Time Series Request</h3>
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
      </div>
    </div>
  )
}
