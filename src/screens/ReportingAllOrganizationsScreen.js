import React from "react"
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
import dayjs from "dayjs"
import useQuery from "hooks/useQuery"
import login from "services/login"
import authenticate from "services/authenticate"
import httpClient from "utils/httpClient"
import formatNumber from "utils/formatNumber"

function getMSPIdFromOrganization(organization) {
  return organization?.owned_msp_id ?? organization?.managed_by_msp_id ?? null
}

function Render(props) {
  return props.children()
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
    dayjs.utc().subtract(6, "month").startOf("day").toJSON(),
    dayjs.utc().endOf("day").toJSON(),
  ]

  const totalMSPStats = useQuery(
    ["totalMSPStats", mspId, timeframe],
    (_, mspId, timeframe) =>
      httpClient
        .get("/traffic_reports/total_organizations_stats", {
          params: {
            msp_id: mspId,
            from: timeframe[0],
            to: timeframe[1],
          },
        })
        .then((response) => response.data),
    {
      enabled: !!mspId && !!timeframe,
    }
  )

  const topOrganizationsByRequests = useQuery(
    ["topOrganizationsByRequests", mspId, timeframe],
    (_, mspId, timeframe) =>
      httpClient
        .get("/traffic_reports/top_organizations_requests", {
          params: {
            msp_id: mspId,
            from: timeframe[0],
            to: timeframe[1],
          },
        })
        .then((response) => response.data),
    {
      enabled: !!mspId && !!timeframe,
    }
  )

  const totalOrganizationsRequests = useQuery(
    ["totalOrganizationsRequests", mspId, timeframe],
    (_, mspId, timeframe) =>
      httpClient
        .get("/traffic_reports/total_organizations_requests", {
          params: {
            msp_id: mspId,
            from: timeframe[0],
            to: timeframe[1],
          },
        })
        .then((response) => response.data),
    {
      enabled: !!mspId && !!timeframe,
    }
  )

  const totalDeployments = useQuery(
    ["totalDeployments", mspId],
    (_, mspId) =>
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
    ["totalRoamingClients", mspId],
    (_, mspId) =>
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
              {formatNumber(totalMSPStats.data?.total_requests ?? 0, {
                notation: "compact",
              })}
            </dd>
          </div>
          <div className="flex flex-col-reverse items-end">
            <dt className="text-gray-400 text-xs">Allowed requests</dt>
            <dd className="text-blue-500 text-2xl font-semibold">
              {formatNumber(totalMSPStats.data?.allowed_requests ?? 0, {
                notation: "compact",
              })}
            </dd>
          </div>
          <div className="flex flex-col-reverse items-end">
            <dt className="text-gray-400 text-xs">Blocked requests</dt>
            <dd className="text-yellow-500 text-2xl font-semibold">
              {formatNumber(totalMSPStats.data?.blocked_requests ?? 0, {
                notation: "compact",
              })}
            </dd>
          </div>
          <div className="flex flex-col-reverse items-end">
            <dt className="text-gray-400 text-xs">Threats</dt>
            <dd className="text-red-500 text-2xl font-semibold">
              {formatNumber(totalMSPStats.data?.threat_requests ?? 0, {
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
          {topOrganizationsByRequests.data?.values.slice(0, 3).map((item) => (
            <Render key={item.organization_id}>
              {() => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const totalOrganizationStats = useQuery(
                  ["totalOrganizationStats", item.organization_id, timeframe],
                  (_, organizationId, timeframe) =>
                    httpClient
                      .get("/traffic_reports/total_organizations_stats", {
                        params: {
                          organization_id: organizationId,
                          from: timeframe[0],
                          to: timeframe[1],
                        },
                      })
                      .then((response) => response.data)
                )

                return (
                  <div className="flex-1 p-6 bg-white rounded-md shadow-sm">
                    <h3 className="mb-3 text-gray-700 text-sm">
                      {item.organization_name} (
                      {formatNumber(
                        (totalOrganizationStats.data?.total_requests ?? 0) /
                          (totalMSPStats.data?.total_requests ?? 0),
                        {
                          style: "percent",
                        }
                      )}
                      )
                    </h3>
                    <div className="flex space-x-6">
                      <div>
                        <h1 className="text-lg font-semibold">
                          {formatNumber(
                            totalOrganizationStats.data?.allowed_requests ?? 0,
                            {
                              notation: "compact",
                            }
                          )}
                        </h1>
                        <p className="text-blue-500 whitespace-nowrap text-xs font-semibold">
                          Allowed Requests
                        </p>
                      </div>
                      <div>
                        <h1 className="text-lg font-semibold">
                          {formatNumber(
                            totalOrganizationStats.data?.blocked_requests ?? 0,
                            {
                              notation: "compact",
                            }
                          )}
                        </h1>
                        <p className="text-yellow-500 whitespace-nowrap text-xs font-semibold">
                          Blocked Requests
                        </p>
                      </div>
                      <div>
                        <h1 className="text-lg font-semibold">
                          {formatNumber(
                            totalOrganizationStats.data?.threat_requests ?? 0,
                            {
                              notation: "compact",
                            }
                          )}
                        </h1>
                        <p className="text-red-500 whitespace-nowrap text-xs font-semibold">
                          Threats
                        </p>
                      </div>
                    </div>
                  </div>
                )
              }}
            </Render>
          ))}
        </div>
      </div>
    </div>
  )
}
