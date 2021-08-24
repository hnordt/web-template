import React from "react"
import { useLocation } from "react-router-dom"
import { useQuery, useMutation } from "react-query"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { PencilIcon, TrashIcon, KeyIcon } from "@heroicons/react/outline"
import { GroupedVirtuoso } from "react-virtuoso"
import cn from "classnames"
import _ from "lodash/fp"
import { GroupMember, MemberAccess } from "types"
import Layout from "components/Layout"
import Card from "components/core/alpha/Card"
import Table from "components/core/alpha/Table"
import Modal from "components/core/alpha/Modal"
import ModalForm from "components/core/alpha/ModalForm"
import Loader from "components/core/alpha/Loader"
import httpClient from "utils/httpClient"
import Badge from "components/core/alpha/Badge"
import useHandleEvent from "hooks/useHandleEvent"

const GROUP = "core-water"

export default function UsersScreen() {
  const location = useLocation()
  const handleEvent = useHandleEvent()

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
      select: (data) => data.results as GroupMember[],
    }
  )

  const draftUser = usersQuery.data?.find(
    (user) =>
      user.profile.id === new URLSearchParams(location.search).get("edit")
  )

  const aclUser = usersQuery.data?.find(
    (user) =>
      user.profile.id ===
      new URLSearchParams(location.search).get("access-control")
  )

  const controllersQuery = useQuery(
    ["controllers", GROUP],
    () =>
      httpClient
        .get(`/group/${GROUP}/map/`, {
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

  const controllers =
    controllersQuery.data?.reduce((acc, controller) => {
      const siteId = controller.site_id ?? "unassigned"
      return {
        ...acc,
        [siteId]: acc[siteId] ? [...acc[siteId], controller] : [controller],
      }
    }, {}) ?? {}

  const createUserMutation = useMutation((user: any) =>
    httpClient.post(`/group/${GROUP}/invite/`, {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      access: user.role,
    })
  )

  const updateUserMutation = useMutation((user: any) =>
    httpClient.patch(`/group/${GROUP}/members/`, {
      profile: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      phone_number: user.phone,
      mobile_number: user.mobile,
      access: user.role,
    })
  )

  const deleteUserMutation = useMutation((user: any) =>
    httpClient.delete(`/group/${GROUP}/members/`, {
      data: {
        profile: {
          id: user.profile.id,
        },
      },
    })
  )

  return (
    <Layout
      title="Users"
      actions={[
        {
          label: "Invite user",
          onClick: handleEvent({
            push: {
              search: `?new`,
            },
          }),
        },
      ]}
    >
      <Card>
        <Table
          columns={[
            {
              variant: "primary",
              label: "Name",
              accessor: (user: GroupMember) =>
                [user.profile.first_name, user.profile.last_name]
                  .filter(Boolean)
                  .join(" "),
              span: 3,
            },
            {
              variant: "tertiary",
              label: "Email",
              accessor: "profile.email",
              span: 3,
            },
            {
              variant: "tertiary",
              label: "Phone",
              accessor: "profile.phone_number",
              span: 2,
            },
            {
              variant: "tertiary",
              label: "Mobile",
              accessor: "profile.mobile_number",
              span: 2,
            },
            {
              variant: "tertiary",
              label: "Role",
              accessor: "access",
              renderCell: (value: MemberAccess) =>
                value === "administrator" ? (
                  <Badge variant="success">Admin</Badge>
                ) : (
                  <Badge variant="secondary">User</Badge>
                ),
              span: 2,
            },
          ]}
          query={usersQuery}
          emptyState={{
            title: "No users",
            description: "Get started by creating a new user",
          }}
          actions={[
            {
              icon: KeyIcon,
              hidden: (user: GroupMember) => user.access === "administrator",
              onClick: handleEvent((user) => ({
                push: {
                  search: `?access-control=${user.profile.id}`,
                },
              })),
            },
            {
              icon: PencilIcon,
              onClick: handleEvent((user) => ({
                push: {
                  search: `?edit=${user.profile.id}`,
                },
              })),
            },
          ]}
          height={500}
        />
      </Card>
      <ModalForm
        title="Invite user"
        description="Fill in the information below to invite an user"
        fields={[
          {
            type: "text",
            name: "firstName",
            label: "First name",
            autoComplete: "given-name",
            size: 6,
            required: true,
          },
          {
            type: "text",
            name: "lastName",
            label: "Last name",
            autoComplete: "familys-name",
            size: 6,
            required: true,
          },
          {
            type: "email",
            name: "email",
            label: "Email",
            autoComplete: "email",
            size: 12,
            required: true,
          },
          // {
          //   type: "tel",
          //   name: "phone",
          //   label: "Phone",
          //   autoComplete: "tel",
          //   size: 6,
          // },
          // {
          //   type: "tel",
          //   name: "mobile",
          //   label: "Mobile",
          //   autoComplete: "tel",
          //   size: 6,
          // },
          {
            type: "select",
            name: "role",
            label: "Role",
            options: [
              {
                label: "Administrator",
                value: "administrator",
              },
              {
                label: "User",
                value: "employee",
              },
            ],
            size: 12,
            required: true,
          },
        ]}
        defaultValues={{
          role: "employee",
        }}
        submitLabel="Save"
        mutation={createUserMutation}
        open={location.search.includes("new")}
        onSuccess={handleEvent({
          toast: ["success", "User created successfully!"],
          refetch: usersQuery,
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
        title="Update user"
        // description="Fill in the information below to update the user"
        fields={[
          // {
          //   type: "text",
          //   name: "firstName",
          //   label: "First name",
          //   autoComplete: "given-name",
          //   size: 6,
          //   required: true,
          // },
          // {
          //   type: "text",
          //   name: "lastName",
          //   label: "Last name",
          //   autoComplete: "familys-name",
          //   size: 6,
          //   required: true,
          // },
          // {
          //   type: "email",
          //   name: "email",
          //   label: "Email",
          //   autoComplete: "email",
          //   size: 12,
          //   disabled: true,
          // },
          // {
          //   type: "tel",
          //   name: "phone",
          //   label: "Phone",
          //   autoComplete: "tel",
          //   size: 6,
          // },
          // {
          //   type: "tel",
          //   name: "mobile",
          //   label: "Mobile",
          //   autoComplete: "tel",
          //   size: 6,
          // },
          {
            type: "select",
            name: "role",
            label: "Role",
            options: [
              {
                label: "Administrator",
                value: "administrator",
              },
              {
                label: "User",
                value: "employee",
              },
            ],
            size: 12,
            required: true,
          },
        ]}
        defaultValues={
          draftUser
            ? {
                id: draftUser.profile.id,
                firstName: draftUser.profile.first_name,
                lastName: draftUser.profile.last_name,
                email: draftUser.profile.email,
                phone: draftUser.profile.phone_number,
                mobile: draftUser.profile.mobile_number,
                role: draftUser.access,
              }
            : undefined
        }
        submitLabel="Save"
        mutation={updateUserMutation}
        actions={[
          {
            variant: "secondary",
            icon: TrashIcon,
            onClick: handleEvent({
              confirm: "Are you sure you want to delete this user?",
              mutateAsync: [
                deleteUserMutation,
                draftUser,
                {
                  then: {
                    toast: ["success", "User deleted successfully!"],
                    refetch: usersQuery,
                    push: {
                      search: "",
                    },
                  },
                  catch: (error) => ({
                    toast: ["error", error.message],
                  }),
                },
              ],
            }),
          },
        ]}
        open={!!draftUser}
        onSuccess={handleEvent({
          toast: ["success", "User updated successfully!"],
          refetch: usersQuery,
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
      <AccessControlModal
        // key={aclUser?.profile.id}
        user={aclUser}
        controllers={controllers}
        open={!!aclUser}
        onClose={handleEvent({
          push: {
            search: "",
          },
        })}
      />
    </Layout>
  )
}

function AccessControlModal(props) {
  const [searchText, setSearchText] = React.useState("")

  const groupControllersMapQuery = useQuery(
    ["groupControllersMap", GROUP],
    () =>
      httpClient
        .get(`/group/${GROUP}/map/`, {
          params: {
            // site: "miller",
            // equipment_id: "086",
            // controller: "tenant",
            // site_null: true, // returns only controllers with no site
            // alarm: params.filterBy === "in-alarm",
            // favourite: params.filterBy === "favourites",
            order: "site", // site, name or equipment_id
            page: 1,
            limit: 2000,
          },
        })
        .then((response) => response.data)
  )

  const controllers = React.useMemo(
    () =>
      groupControllersMapQuery.data
        ? _.orderBy(
            ["site", "device.name"],
            ["asc", "asc"],
            groupControllersMapQuery.data.results.filter((result) => {
              if (!searchText) {
                return true
              }

              if (
                result.device.equipment_id
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              ) {
                return true
              }

              if (
                result.site.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return true
              }

              if (
                result.device.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              ) {
                return true
              }

              return false
            })
          )
        : [],
    [groupControllersMapQuery.data, searchText]
  )
  const controllersBySite = controllers.reduce(
    (acc, controller) => ({
      ...acc,
      [controller.site_id]: [...(acc[controller.site_id] ?? []), controller],
    }),
    {}
  )
  const sites = _.orderBy(
    "name",
    "asc",
    Object.keys(controllersBySite).map((siteId) => ({
      id: siteId,
      name: controllersBySite[siteId][0].site,
    }))
  )

  const groupCounts = React.useMemo(
    () => sites.map((site) => controllersBySite[site.id].length),
    [sites, controllersBySite]
  )

  return (
    <Modal
      {...props}
      title="Access control"
      description={`Manage user access to controllers`}
      size="3xl"
      renderContent={(props) => props.children}
    >
      <div className="p-6">
        <span className="text-gray-900 text-sm font-medium">
          {props.user?.profile.first_name} {props.user?.profile.last_name}
        </span>
        <span className="block text-gray-500 text-sm">
          {props.user?.profile.email}
        </span>
      </div>
      <div className="p-6 border-t border-gray-200">
        <input
          className="placeholder-gray-400 block px-3 w-full h-9 border focus:border-blue-500 border-gray-300 rounded-md focus:outline-none shadow-sm focus:ring-blue-500 sm:text-sm"
          placeholder="Search controllers"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="h-[500px]">
        {controllers.length > 0 ? (
          <GroupedVirtuoso
            groupCounts={groupCounts}
            groupContent={(index) => (
              <div className="px-6 py-1.5 bg-gray-50 border-b border-t border-gray-200">
                <h3 className="text-gray-500 text-sm font-medium">
                  {sites[index].name}
                </h3>
              </div>
            )}
            itemContent={(index) => {
              const controller = controllers[index]

              return (
                <div className="-mb-px px-6 py-2 border-b border-gray-200">
                  <div className="flex items-center justify-between h-10 space-x-6">
                    <p className="truncate">
                      <span className="text-gray-900 text-sm font-medium">
                        {controller.device.name}
                      </span>
                      <span className="text-gray-500 text-xs">
                        &nbsp;&mdash;&nbsp;{controller.device.header_id}-
                        {controller.device.equipment_id}
                      </span>
                    </p>
                    <AccessLevelSelect
                      user={props.user}
                      controller={controller}
                    />
                  </div>
                </div>
              )
            }}
          />
        ) : (
          <div className="flex items-center justify-center p-6 h-full border-t border-gray-200">
            <p className="text-gray-500 text-sm">No results found</p>
          </div>
        )}
      </div>
    </Modal>
  )
}

interface AccessLevelSelectProps {
  controller: any
  user: any
}

function AccessLevelSelect(props: AccessLevelSelectProps) {
  const handleEvent = useHandleEvent()

  const userId = props.user?.profile.id
  const controllerId = `${props.controller.device.header_id}:${props.controller.device.equipment_id}`

  const controllerAccessQuery = useQuery(
    ["controllerAccess", userId, controllerId],
    () =>
      httpClient
        .get(`/personal/${userId}/controllers/`, {
          params: {
            controller_id: controllerId,
            page: 1,
            limit: 1,
          },
        })
        .then((response) => response.data),
    {
      staleTime: 60_000,
      enabled: !!userId,
    }
  )

  const controllerAccessMutation = useMutation((value) =>
    httpClient[
      // Profile exists? Then patch, otherwise post
      controllerAccessQuery.data?.results.length > 0 ? "patch" : "post"
    ](`/controller/${controllerId}/members/`, {
      profile: userId,
      access: value,
    })
  )

  if (
    controllerAccessQuery.status === "loading" ||
    controllerAccessMutation.status === "loading"
  ) {
    return <Loader variant="dark" size="sm" />
  }

  const options = [
    "sms/e-mail only",
    "view (excluding logs)",
    "view",
    "full (excluding contact list)",
    "full",
  ]
  const value =
    controllerAccessQuery.data?.results[0]?.access ?? "sms/e-mail only"

  return (
    <Listbox
      value={value}
      onChange={handleEvent((value) => ({
        mutateAsync: [
          controllerAccessMutation,
          value,
          {
            then: {
              refetch: controllerAccessQuery,
            },
            catch: (error) => ({
              toast: ["error", error.message],
            }),
          },
        ],
      }))}
    >
      {({ open }) => (
        <div className="relative">
          <Listbox.Button className="relative pl-3 pr-10 py-2 w-full text-left bg-white border focus-visible:border-blue-500 border-transparent rounded-md focus:outline-none cursor-default focus-visible:ring-1 focus-visible:ring-blue-500 sm:text-sm">
            <span className="block">{value}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden />
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
              static
              className="absolute z-20 right-0 mt-1 py-1 w-60 max-h-60 text-base bg-white rounded-md focus:outline-none shadow-lg overflow-auto ring-1 ring-black ring-opacity-5 sm:text-sm"
            >
              {options.map((option) => (
                <Listbox.Option
                  key={option}
                  className={({ active }) =>
                    cn(
                      active ? "text-white bg-blue-600" : "text-gray-900",
                      "cursor-default select-none relative py-2 pl-3 pr-9"
                    )
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={cn(
                          selected ? "font-semibold" : "font-normal",
                          "block"
                        )}
                      >
                        {option}
                      </span>

                      {selected ? (
                        <span
                          className={cn(
                            active ? "text-white" : "text-blue-600",
                            "absolute inset-y-0 right-0 flex items-center pr-4"
                          )}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden />
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
  )
}
