import React from "react"
import { SearchIcon } from "@heroicons/react/solid"
import toast from "react-hot-toast"
import Fuse from "fuse.js"
import cn from "classnames"

const integrations = {
  "Communication": [
    {
      logoUrl: "/integration-logos/Discord.png",
      name: "Discord",
    },
    {
      logoUrl: "/integration-logos/Gmail.png",
      name: "Gmail",
    },
    {
      logoUrl: "/integration-logos/PagerDuty.png",
      name: "PagerDuty",
    },
    {
      logoUrl: "/integration-logos/Slack.png",
      name: "Slack",
    },
  ],
  "Monitoring": [
    {
      logoUrl: "/integration-logos/Opsgenie.png",
      name: "Opsgenie",
    },
  ],
  "Sales & CRM": [
    {
      logoUrl: "/integration-logos/Automate.png",
      name: "Connectwise Manage",
    },
    {
      logoUrl: "/integration-logos/Pipedrive.png",
      name: "Pipedrive",
    },
    {
      logoUrl: "/integration-logos/Salesforce.png",
      name: "Salesforce",
    },
  ],
  "Support": [
    {
      logoUrl: "/integration-logos/Freshdesk.png",
      name: "Freshdesk",
    },
    {
      logoUrl: "/integration-logos/HelpScout.png",
      name: "Help Scout",
    },
    {
      logoUrl: "/integration-logos/Intercom.png",
      name: "Intercom",
    },
    {
      logoUrl: "/integration-logos/Zendesk.png",
      name: "Zendesk",
    },
  ],
}

export default function HomeScreen() {
  const [searchText, setSearchText] = React.useState("")
  const [activeGroups, setActiveGroups] = React.useState("all")

  const filteredGroups = Object.entries(integrations)
    .map(([name, integrations]) => ({
      name,
      integrations: searchText
        ? new Fuse(integrations, {
            keys: ["name"],
            threshold: 0.4,
          })
            .search(searchText)
            .map((v) => v.item)
        : integrations,
    }))
    .filter(
      (group) =>
        (activeGroups === "all" || activeGroups.includes(group.name)) &&
        group.integrations.length > 0
    )

  return (
    <main className="min-h-screen bg-gray-200">
      <div className="flex items-center justify-between px-8 h-20 bg-white shadow-md">
        <h1 className="text-gray-900 text-2xl font-bold">Integrations</h1>
        <div className="flex items-center space-x-4">
          <div className="space-x-2">
            <GroupButton
              active={activeGroups === "all"}
              onClick={() => setActiveGroups("all")}
            >
              All
            </GroupButton>
            {Object.keys(integrations).map((groupName) => (
              <GroupButton
                key={groupName}
                active={activeGroups.includes(groupName)}
                onClick={() =>
                  setActiveGroups(
                    activeGroups.includes(groupName)
                      ? activeGroups.filter(
                          (activeGroup) => activeGroup !== groupName
                        )
                      : [...activeGroups, groupName]
                  )
                }
              >
                {groupName}
              </GroupButton>
            ))}
          </div>
          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 w-5 h-5 text-gray-400 pointer-events-none transform -translate-y-1/2" />
            <input
              className="placeholder-gray-400 pl-8 w-80 h-8 text-gray-900 text-sm border-gray-400 rounded focus:outline-none focus:ring-blue-500"
              type="search"
              value={searchText}
              placeholder="Search for integrations"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="p-8">
        <div className="space-y-10">
          {filteredGroups.length === 0 ? (
            <p className="text-gray-600 text-base">No integrations found</p>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.name}>
                <h2 className="mb-6 pb-3 text-gray-700 text-base font-bold border-b border-gray-300">
                  {group.name}
                </h2>
                <div className="grid gap-6 grid-cols-4">
                  {group.integrations.map((integration) => (
                    <IntegrationCard
                      key={integration.name}
                      logoUrl={integration.logoUrl}
                      name={integration.name}
                      onClick={() =>
                        toast(
                          <span>
                            Not implemented yet{" "}
                            <span className="inline-block ml-1 text-base">
                              👻
                            </span>
                          </span>,
                          {
                            style: {
                              borderRadius: "10px",
                              background: "#333",
                              color: "#fff",
                            },
                          }
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  )
}

function GroupButton(props) {
  const { active, ...rest } = props

  return (
    <button
      {...rest}
      type="button"
      className={cn(
        "inline-block px-4 py-1.5 text-gray-600 text-sm bg-gray-200 rounded focus:outline-none focus-visible:ring-2",
        active
          ? "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-300"
          : "text-gray-600 bg-gray-200 hover:bg-gray-300 focus-visible:ring-blue-500"
      )}
    />
  )
}

function IntegrationCard(props) {
  return (
    <button
      className="relative p-4 text-left bg-white rounded-md focus:outline-none hover:shadow-lg shadow-md transform hover:scale-105 transition focus-visible:ring-blue-500 focus-visible:ring-2"
      type="button"
      onClick={props.onClick}
    >
      <ZapierIcon className="absolute right-4 top-4" />
      <div className="flex items-center justify-center h-24">
        <img className="object-contain" src={props.logoUrl} alt={props.name} />
      </div>
      <div className="my-4 h-px bg-gray-300" />
      <h3 className="text-gray-600 text-sm font-bold">{props.name}</h3>
    </button>
  )
}

function ZapierIcon(props) {
  return (
    <svg
      className={props.className}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="16" fill="#ffede6" />
      <path
        d="M18.4999 16.0044C18.5003 16.7255 18.3702 17.4408 18.1159 18.1156C17.4408 18.3698 16.7254 18.5001 16.0041 18.5002H15.9956C15.2528 18.4993 14.5411 18.3635 13.8844 18.1159C13.63 17.441 13.4998 16.7256 13.5 16.0044V15.9956C13.4997 15.2746 13.6296 14.5595 13.8836 13.8847C14.5586 13.63 15.2742 13.4997 15.9957 13.5H16.0041C16.7255 13.4997 17.4411 13.63 18.116 13.8846C18.3703 14.5593 18.5004 15.2745 18.5 15.9955V16.0043L18.4999 16.0044ZM25.8611 14.3334H20.0239L24.1512 10.2058C23.8272 9.75072 23.4659 9.32348 23.0709 8.92852V8.9282C22.6758 8.53366 22.2487 8.17263 21.7939 7.84883L17.6663 11.9764V6.13922C17.1174 6.04687 16.5617 6.0003 16.005 6L15.9947 6C15.4284 6.00031 14.8738 6.04844 14.3334 6.13922V11.9764L10.2058 7.84883C9.75089 8.17254 9.32395 8.53383 8.92945 8.92891L8.92727 8.93047C8.53293 9.32494 8.17208 9.75151 7.84844 10.2058L11.9763 14.3334H6.13922C6.13922 14.3334 6 15.4297 6 15.9966V16.0034C6 16.5703 6.04805 17.1259 6.13922 17.6666H11.9764L7.84852 21.7942C8.49786 22.7055 9.29453 23.5021 10.2058 24.1515L14.3334 20.0236V25.8611C14.8817 25.953 15.4367 25.9994 15.9927 26H16.0069C16.5629 25.9995 17.1179 25.953 17.6663 25.8611V20.0236L21.7942 24.1515C22.2489 23.8276 22.676 23.4664 23.0709 23.0718L23.0718 23.0709C23.4663 22.6759 23.8273 22.2489 24.1512 21.7942L20.0233 17.6666H25.8611C25.952 17.1268 25.9994 16.5729 26 16.0073V15.9927C25.9994 15.4271 25.952 14.8732 25.8611 14.3334V14.3334Z"
        fill="#ff4a00"
      />
    </svg>
  )
}
