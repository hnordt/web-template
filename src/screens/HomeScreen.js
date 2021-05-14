import React from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CheckCircleIcon, SearchIcon, XIcon } from "@heroicons/react/solid"
import Fuse from "fuse.js"
import cn from "classnames"
import integrations from "data/integrations.json"

export default function HomeScreen() {
  const [activeGroups, setActiveGroups] = React.useState("all")
  const [searchText, setSearchText] = React.useState("")
  const [integration, setIntegration] = React.useState(null)

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
    <>
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
                autoFocus
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
                          setIntegration({
                            ...integration,
                            groupName: group.name,
                          })
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
      <SlideOver open={!!integration} onClose={() => setIntegration(null)}>
        {integration && (
          <>
            <div className="px-8 py-5 border-b border-gray-200">
              <span className="text-gray-500 text-xs tracking-wide">
                {integration?.groupName}
              </span>
              <h1 className="text-gray-900 text-xl font-bold">
                {integration?.name}
              </h1>
            </div>
            <div className="p-8">
              <div className="flex items-center space-x-5">
                <img
                  className="h-5"
                  src={integration?.logoUrl}
                  alt={integration?.name}
                />
                <span className="text-gray-900 text-2xl" aria-hidden>
                  +
                </span>
                <img
                  className="h-7"
                  src="/integration-logos/zapier.png"
                  alt="Zapier"
                />
              </div>
              <h2 className="mb-5 mt-8 text-gray-900 text-lg font-bold">
                About integration
              </h2>
              <dl className="flex space-x-8">
                <div>
                  <dt className="text-gray-500 text-xs tracking-wide">Code</dt>
                  <dd className="text-gray-900 text-sm font-bold">
                    Not required
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500 text-xs tracking-wide">
                    Website
                  </dt>
                  <dd>
                    <a
                      className="text-blue-500 hover:underline text-sm font-bold"
                      href={integration?.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit
                    </a>
                  </dd>
                </div>
              </dl>
              <p className="mt-5 text-gray-900 text-sm">
                {integration?.description}
              </p>
              <h2 className="text-md mb-5 mt-8 text-gray-900 font-bold">
                Best used for
              </h2>
              <ul className="space-y-4">
                {integration?.uses.map((use, useIndex) => (
                  <li
                    key={useIndex}
                    className="flex items-center text-gray-900 text-sm space-x-2"
                  >
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                      <CheckCircleIcon
                        className="w-5 h-5 text-blue-500"
                        aria-hidden
                      />
                    </span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </SlideOver>
    </>
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
        <img
          className="max-w-[140px] max-h-16"
          src={props.logoUrl}
          alt={props.name}
        />
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

function SlideOver(props) {
  return (
    <Transition.Root show={props.open} as={React.Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 overflow-hidden"
        open={props.open}
        onClose={props.onClose}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={React.Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 flex pl-10 max-w-full">
            <Transition.Child
              as={React.Fragment}
              enter="transform transition ease-in-out duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-0 top-0 flex -ml-10 pr-4 pt-4">
                    <button
                      className="text-gray-300 hover:text-white rounded-md focus:outline-none focus:ring-white focus:ring-2"
                      type="button"
                      onClick={props.onClose}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="w-6 h-6" aria-hidden />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-full bg-white shadow-xl overflow-y-scroll">
                  {props.children}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
