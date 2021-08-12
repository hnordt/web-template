import React, { Fragment } from "react"
import { useLocation } from "react-router-dom"
import { useQuery, useMutation } from "react-query"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import { PencilIcon, TrashIcon, KeyIcon } from "@heroicons/react/outline"
import cn from "classnames"
import Layout from "components/Layout"
import Card from "components/core/alpha/Card"
import Table from "components/core/alpha/Table"
import Modal from "components/core/alpha/Modal"
import ModalForm from "components/core/alpha/ModalForm"
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
      select: (data) => data.results,
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
              accessor: (user) =>
                [user.profile?.first_name, user.profile?.last_name]
                  .filter(Boolean)
                  .join(" "),
            },
            {
              variant: "tertiary",
              label: "Email",
              accessor: "profile.email",
            },
            {
              variant: "tertiary",
              label: "Phone",
              accessor: "profile.phone_number",
            },
            {
              variant: "tertiary",
              label: "Mobile",
              accessor: "profile.mobile_number",
            },
            {
              variant: "tertiary",
              label: "Role",
              accessor: "access",
              renderContent: (props) =>
                props.children === "administrator" ? (
                  <Badge variant="success">Administrator</Badge>
                ) : (
                  <Badge variant="secondary">User</Badge>
                ),
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
              hidden: (user) => user.access === "administrator",
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
      {/* If there is no controllers the modal will crash because we need
      something to focus */}
      {/* We can remove that check after we add the close button to Modal */}
      {controllers && (
        <AccessControlModal
          key={aclUser?.profile.id}
          user={aclUser}
          controllers={controllers}
          open={!!aclUser}
          onClose={handleEvent({
            push: {
              search: "",
            },
          })}
        />
      )}
    </Layout>
  )
}

function AccessControlModal(props) {
  console.log({
    controllers: props.controllers,
    props,
  })

  const userId = props.user?.profile.id

  const controllerAccessQuery = useQuery(
    ["controllerAccess", userId],
    () =>
      httpClient
        .get(`/personal/${userId}/controllers/`, {
          params: {
            controller_id: "0830:04838",
            // page: 1,
            // limit: 2000,
          },
        })
        .then((response) => response.data),
    {
      // select: (data) => data.results,
      enabled: !!userId,
    }
  )

  console.log({
    controllerAccessQuery,
  })

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
        <input />
      </div>
      <div className="h-[605px] overflow-y-auto">
        {Object.keys(props.controllers).map((siteId) => (
          <div key={siteId} className="relative">
            <div className="sticky z-10 top-0 px-6 py-1.5 text-gray-500 text-sm font-medium bg-gray-50 border-b border-t border-gray-200">
              <h3>
                {siteId === "unassigned"
                  ? "Unassigned"
                  : props.controllers[siteId][0].site}
              </h3>
            </div>
            <ul className="divide-gray-200 divide-y">
              {props.controllers[siteId].map((controller) => (
                <li
                  key={controller.device.equipment_id}
                  className="px-6 py-2 bg-white"
                >
                  <div className="flex items-center justify-between overflow-hidden space-x-6">
                    <p className="text-gray-900 text-sm font-medium truncate">
                      {controller.device.name}
                      <span className="text-gray-500 text-xs">
                        &nbsp;&mdash; {controller.device.header_id}-
                        {controller.device.equipment_id}
                      </span>
                    </p>
                    <AccessLevelSelect
                      user={props.user}
                      controller={controller}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Modal>
  )
}

interface AccessLevelSelectProps {
  controller: any
  user: any
  value?: string
  onChange?: (value: string) => void
}

function AccessLevelSelect(props: AccessLevelSelectProps) {
  const options = [
    "sms/e-mail only",
    "view (excluding logs)",
    "view",
    "full (excluing contact list)",
    "full",
  ]

  const value = props.value ?? options[0]

  return (
    <Listbox value={value} onChange={props.onChange}>
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
