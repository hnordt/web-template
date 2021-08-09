import React, { Fragment } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { useQuery, useMutation } from "react-query"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import {
  PencilIcon,
  StatusOfflineIcon,
  TrashIcon,
} from "@heroicons/react/outline"
import cn from "classnames"
import Layout from "components/Layout"
import Card from "components/core/alpha/Card"
import Modal from "components/core/alpha/Modal"
import ModalForm from "components/core/alpha/ModalForm"
import httpClient from "utils/httpClient"
import Button from "components/core/alpha/Button"
import toast from "react-hot-toast"
import useHandleEvent from "hooks/useHandleEvent"

const GROUP = "westfield"

export default function UsersScreen() {
  const history = useHistory()
  const location = useLocation()
  const handleEvent = useHandleEvent()

  const [searchText, setSearchText] = React.useState("")
  const [selectedControllerIds, setSelectedControllerIds] = React.useState([])

  const sitesQuery = useQuery(
    ["sites", GROUP],
    () =>
      httpClient
        .get(`/group/${GROUP}/sites/`, {
          params: {
            page: 1,
            limit: 2000,
          },
        })
        .then((response) => response.data),
    {
      select: (data) => data.results,
    }
  )

  const controllersQuery = useQuery(
    ["controllers", GROUP],
    () =>
      httpClient
        .get(`/group/${GROUP}/devices/`, {
          params: {
            page: 1,
            limit: 2000,
          },
        })
        .then((response) => response.data),
    {
      select: (data) => data.results,
    }
  )

  const draftController = controllersQuery.data?.find(
    (controller) =>
      String(controller.id) === new URLSearchParams(location.search).get("edit")
  )

  const controllers = controllersQuery.data
    ?.filter(
      (controller) =>
        controller.device.name
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        controller.site?.site.toLowerCase().includes(searchText.toLowerCase())
    )
    .reduce(
      (acc, controller) => ({
        ...acc,
        [controller.site?.id ?? "unassigned"]: acc[
          controller.site?.id ?? "unassigned"
        ]
          ? [...acc[controller.site?.id ?? "unassigned"], controller]
          : [controller],
      }),
      {}
    )

  const updateControllerMutation = useMutation((controller: any) =>
    httpClient.patch(
      `/controller/${controller.headerId}:${controller.equipmentId}/profile/`,
      {
        header_id: controller.headerId,
        equipment_id: controller.equipmentId,
        name: controller.name,
        active: controller.status === "active",
      }
    )
  )

  const updateControllersSiteMutation = useMutation((controllerIds: any) =>
    Promise.resolve([])
  )

  if (!controllers) {
    return null
  }

  console.log(selectedControllerIds)

  return (
    <Layout title="Controllers">
      <Card>
        <div className="flex items-center justify-between p-6">
          <input
            type="search"
            className="block w-60 h-8 focus:border-blue-500 border-gray-300 rounded-full shadow-sm focus:ring-blue-500 sm:text-sm"
            value={searchText}
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="flex space-x-4">
            <button
              className={cn(
                "text-sm font-medium",
                selectedControllerIds.length ? "text-blue-600" : "text-gray-400"
              )}
              disabled={!selectedControllerIds.length}
              onClick={() =>
                history.push({
                  search: `?assign=site`,
                })
              }
            >
              Assign site
            </button>
            <span className="text-gray-300 font-extrabold" aria-hidden>
              &middot;
            </span>
            <button
              className={cn(
                "text-sm font-medium",
                selectedControllerIds.length ? "text-blue-600" : "text-gray-400"
              )}
              disabled={!selectedControllerIds.length}
              onClick={() =>
                history.push({
                  search: `?assign=users`,
                })
              }
            >
              Assign users
            </button>
          </div>
        </div>
        <div className="h-[624px] overflow-y-auto">
          {Object.keys(controllers).map((siteId) => (
            <div key={siteId} className="relative">
              <div className="sticky z-10 top-0 px-6 py-1 text-gray-500 text-sm font-medium bg-gray-50 border-b border-t border-gray-200">
                <h3>{controllers[siteId][0].site?.site ?? "No site"}</h3>
              </div>
              <ul className="divide-gray-200 divide-y">
                {controllers[siteId].map((controller) => (
                  <li key={controller.id} className="px-6 py-5 bg-white">
                    <div className="flex items-center justify-between space-x-6">
                      <div className="flex items-start space-x-6">
                        <div>
                          <p className="text-gray-900 text-sm font-medium">
                            {!controller.site || !controller.device.name ? (
                              <span className="inline-block mr-1.5 w-2.5 h-2.5 bg-gradient-to-b rounded-full from-gray-400 to-gray-500 ring ring-gray-100"></span>
                            ) : controller.device.active ? (
                              <span className="inline-block mr-1.5 w-2.5 h-2.5 bg-gradient-to-b rounded-full from-green-400 to-green-500 ring ring-green-100"></span>
                            ) : (
                              <span className="inline-block mr-1.5 w-2.5 h-2.5 bg-gradient-to-b rounded-full from-red-400 to-red-500 ring ring-red-100"></span>
                            )}{" "}
                            {controller.device.name}
                          </p>
                          <p className="ml-5 text-gray-500 text-sm truncate">
                            {controller.device.header_id}-
                            {controller.device.equipment_id}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <input
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          type="checkbox"
                          checked={selectedControllerIds.includes(
                            controller.id
                          )}
                          onChange={(e) =>
                            setSelectedControllerIds((selectedControllerIds) =>
                              e.target.checked &&
                              !selectedControllerIds.includes(controller.id)
                                ? [...selectedControllerIds, controller.id]
                                : selectedControllerIds.filter(
                                    (selectedControllerId) =>
                                      selectedControllerId !== controller.id
                                  )
                            )
                          }
                        />
                        <span className="text-gray-300" aria-hidden>
                          |
                        </span>
                        <button
                          className="text-blue-600 hover:text-blue-900 focus-visible:underline"
                          type="button"
                        >
                          <StatusOfflineIcon className="w-5 h-5 text-gray-400" />
                        </button>
                        <span className="text-gray-300" aria-hidden>
                          |
                        </span>
                        <button
                          className="text-blue-600 hover:text-blue-900 focus-visible:underline"
                          type="button"
                          onClick={() =>
                            history.push({
                              search: `?edit=${controller.id}`,
                            })
                          }
                        >
                          <PencilIcon className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
      <ModalForm
        title="Update controller"
        description="Fill in the information below to update the controller"
        fields={[
          {
            type: "text",
            name: "name",
            label: "Name",
            size: 8,
            required: true,
          },
          {
            type: "select",
            name: "status",
            label: "Status",
            options: [
              {
                label: "Unassigned",
                value: "unassigned",
                disabled: true,
              },
              {
                label: "Active",
                value: "active",
              },
              {
                label: "Inactive",
                value: "inactive",
              },
            ],
            size: 4,
            // TODO: getControllerStatus + row => boolean
            disabled:
              !draftController?.device.name || !draftController?.site?.id,
            required: true,
          },
        ]}
        defaultValues={
          draftController
            ? {
                headerId: draftController.device.header_id,
                equipmentId: draftController.device.equipment_id,
                name: draftController.device.name,
                // TODO: getControllerStatus
                status:
                  !draftController.device.name || !draftController.site?.id
                    ? "unassigned"
                    : draftController.device.active
                    ? "active"
                    : "inactive",
              }
            : undefined
        }
        submitLabel="Save"
        mutation={updateControllerMutation}
        open={!!draftController}
        onSuccess={handleEvent({
          toast: ["success", "Controller updated successfully!"],
          refetch: controllersQuery,
          push: {
            search: "",
          },
        })}
        onError={handleEvent((error) => ({
          toast: ["error", error.message],
        }))}
        onClose={handleEvent({
          push: {
            search: "",
          },
        })}
      />
      <ModalForm
        title="Assign site"
        description="Select the new site below to update the selected controllers"
        fields={[
          {
            type: "select",
            name: "newSiteId",
            // label: "New site",
            options: [
              {
                label: "-",
                value: "",
              },
              ...sitesQuery.data?.map((site) => ({
                label: site.site,
                value: site.id,
              })),
            ],
            size: 12,
            required: true,
          },
        ]}
        submitLabel="Save"
        mutation={updateControllersSiteMutation}
        open={
          location.search.includes("assign=site") &&
          selectedControllerIds.length > 0
        }
        onSuccess={handleEvent({
          toast: ["success", "Controllers updated successfully!"],
          refetch: controllersQuery,
          push: {
            search: "",
          },
        })}
        onError={handleEvent((error) => ({
          toast: ["error", error.message],
        }))}
        onClose={handleEvent({
          push: {
            search: "",
          },
        })}
      />
      <AssignUsersModal
        key={location.search.includes("assign=users")}
        controllersQuery={controllersQuery}
        controllers={controllers}
        selectedControllerIds={selectedControllerIds}
        open={
          location.search.includes("assign=users") &&
          selectedControllerIds.length > 0
        }
        onClose={handleEvent({
          push: {
            search: "",
          },
        })}
      />
    </Layout>
  )
}

function AssignUsersModal(props) {
  const history = useHistory()

  const [selectedUserIds, setSelectedUserIds] = React.useState([])
  const [acl, setAcl] = React.useState({})

  const options = [
    "sms/e-mail only",
    "view (excluding logs)",
    "view",
    "full (excluing contact list)",
    "full",
  ]

  const usersQuery = useQuery(
    ["members", GROUP],
    () =>
      httpClient
        .get(`/group/${GROUP}/members/`, {
          params: {
            page: 1,
            limit: 2000,
          },
        })
        .then((response) => response.data),
    {
      select: (data) =>
        data.results.filter((user) => user.access !== "administrator"),
    }
  )

  const selectedControllers = props.selectedControllerIds.map(
    (selectedControllerId) =>
      props.controllersQuery.data.find(
        (controller) => controller.id === selectedControllerId
      )?.device.name
  )

  const users = usersQuery.data
    ? usersQuery.data.filter(
        (user) => !selectedUserIds.includes(user.profile.id)
      )
    : []

  return (
    <Modal
      {...props}
      title="Assign users"
      description="Select the users below to assign them"
      size="lg"
      renderContent={(props) => props.children}
    >
      <div className="p-6">
        <span className="text-gray-900 text-sm font-medium">
          Selected controller{selectedControllers.length === 1 ? "" : "s"}
        </span>
        <span className="block text-gray-500 text-sm">
          {selectedControllers.join(", ")}
        </span>
      </div>
      {users.length > 0 && (
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex space-x-3">
            <select
              className="placeholder-gray-400 block pr-10 px-3 w-full h-9 border focus:border-blue-500 border-gray-300 rounded-md focus:outline-none shadow-sm focus:ring-blue-500 sm:text-sm"
              onChange={(e) =>
                setSelectedUserIds((selectedUsers) => [
                  ...selectedUsers,
                  e.target.value,
                ])
              }
            >
              <option value="">Add user...</option>
              {users.map((user) => (
                <option key={user.profile.id} value={user.profile.id}>
                  {user.profile.first_name || user.profile.last_name
                    ? [user.profile.first_name, user.profile.last_name]
                        .filter(Boolean)
                        .join(" ")
                    : user.profile.email}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {selectedUserIds.length > 0 && (
        <div className="border-t border-gray-200">
          <ul className="divide-gray-200 divide-y">
            {selectedUserIds.map((selectedUserId) => {
              const user = usersQuery.data.find(
                (user) => user.profile.id === selectedUserId
              )

              return (
                <li key={selectedUserId} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-900 text-sm font-medium">
                        {user.profile.first_name || user.profile.last_name
                          ? [user.profile.first_name, user.profile.last_name]
                              .filter(Boolean)
                              .join(" ")
                          : user.profile.email}
                      </span>
                      {(user.profile.first_name || user.profile.last_name) && (
                        <span className="block text-gray-500 text-sm">
                          {user.profile.email}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Listbox
                        value={acl[user.profile.id] ?? options[0]}
                        onChange={(value) =>
                          setAcl((acl) => ({
                            ...acl,
                            [user.profile.id]: value,
                          }))
                        }
                      >
                        {({ open }) => (
                          <div className="relative">
                            <Listbox.Button className="relative pl-3 pr-10 py-2 w-full text-left bg-white border focus-visible:border-blue-500 border-transparent rounded-md focus:outline-none cursor-default focus-visible:ring-1 focus-visible:ring-blue-500 sm:text-sm">
                              <span className="block">
                                {acl[user.profile.id] ?? options[0]}
                              </span>
                              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon
                                  className="w-5 h-5 text-gray-400"
                                  aria-hidden
                                />
                              </span>
                            </Listbox.Button>
                            <Transition
                              show={open}
                              as={React.Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options
                                className="absolute z-50 right-0 mt-1 py-1 w-60 max-h-60 text-base bg-white rounded-md focus:outline-none shadow-lg overflow-auto ring-1 ring-black ring-opacity-5 sm:text-sm"
                                static
                              >
                                {options.map((option) => (
                                  <Listbox.Option
                                    key={option}
                                    className={({ active }) =>
                                      cn(
                                        active
                                          ? "text-white bg-blue-600"
                                          : "text-gray-900",
                                        "cursor-default select-none relative py-2 pl-3 pr-9"
                                      )
                                    }
                                    value={option}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={cn(
                                            selected
                                              ? "font-semibold"
                                              : "font-normal",
                                            "block"
                                          )}
                                        >
                                          {option}
                                        </span>

                                        {selected ? (
                                          <span
                                            className={cn(
                                              active
                                                ? "text-white"
                                                : "text-blue-600",
                                              "absolute inset-y-0 right-0 flex items-center pr-4"
                                            )}
                                          >
                                            <CheckIcon
                                              className="w-5 h-5"
                                              aria-hidden
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        )}
                      </Listbox>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedUserIds((selectedUserIds) =>
                            selectedUserIds.filter(
                              (selectedUserId) =>
                                selectedUserId !== user.profile.id
                            )
                          )
                        }
                      >
                        <TrashIcon className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      <div className="p-6 border-t border-gray-200">
        <div className="flex justify-end space-x-3">
          <Button
            variant="secondary"
            // TODO
            onClick={() =>
              history.push({
                search: "",
              })
            }
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!selectedUserIds.length}
            onClick={() => {
              toast.success("Users assigned successfully!")
              history.push({
                search: "",
              })
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  )
}
