import React from "react"
import { useQuery, useMutation } from "react-query"
import { RadioGroup } from "@headlessui/react"
import { PencilIcon, TrashIcon } from "@heroicons/react/outline"
import cn from "classnames"
import Layout from "components/Layout"
import Card from "components/core/Card"
import Table from "components/core/Table"
import Modal from "components/core/Modal"
import useHandleEvent from "hooks/useHandleEvent"
import httpClient from "utils/httpClient"
import { useRouter } from "next/router"
import Input from "components/core/Input"
import Select from "components/core/Select"
import Link from "components/core/Link"
import Button from "components/core/Button"

const settings = [
  {
    name: "Same settings",
    description:
      "All controllers will have the same delivery frequency and reports",
  },
  {
    name: "Different settings",
    description:
      "Controllers will have different delivery frequency and reports",
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const controllers = [
  {
    id: "0830-06492",
    name: "Inhams MtAlford",
    site: "Cooling Tower",
    version: "SW S0200 Ver 1.15/6200 ver 1.3",
  },
  {
    id: "0830-05085",
    name: "Richmond Dairies",
    site: "Refrigeration",
    version: "SW S0200 Ver 1.20/6200 ver 1.3",
  },
]

const recipients = [
  {
    id: 1,
    name: "Shaun Parsons",
  },
  {
    id: 2,
    name: "NCMC CASINO",
  },
]

const reports = [
  {
    id: 1,
    name: "Inghams Mt Alford",
    controllers,
    recipients,
  },
  {
    id: 2,
    name: "Weekly Digichem Report",
    controllers: controllers.slice(0, 1),
    recipients: recipients.slice(0, 1),
  },
]

export default function SitesScreen() {
  const router = useRouter()
  const handleEvent = useHandleEvent()

  const [selectedRecipients, setSelectedRecipients] = React.useState(null)
  const [selectedControllers, setSelectedControllers] = React.useState(null)

  // const createReportMutation = useMutation((report) => Promise.resolve(report))

  const controllersToShow = !selectedControllers
    ? controllers
    : controllers.filter((c) => selectedControllers.includes(c.id))

  const [selected, setSelected] = React.useState(settings[0])

  return (
    <Layout
      title="Automated reports"
      actions={[
        {
          label: "Create report",
          onClick: handleEvent({
            push: `?new`,
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
              accessor: "name",
              span: 3,
            },
            {
              label: "Controllers",
              accessor: "controllers",
              span: 4,
              renderCell: (controllers: Array<any>) =>
                controllers.map((c) => `${c.name} (${c.site})`).join(", "),
            },
            {
              label: "Recipients",
              accessor: "recipients",
              span: 5,
              renderCell: (recipients: Array<any>) =>
                recipients.map((r) => r.name).join(", "),
            },
          ]}
          data={reports}
          emptyState={{
            title: "No reports",
            description: "Get started by creating a new report",
          }}
          actions={[
            {
              icon: PencilIcon,
              onClick: handleEvent((report) => ({
                push: `?edit=${report.id}`,
              })),
            },
          ]}
          height={500}
        />
      </Card>
      <Modal
        title="Create report"
        description="Fill in the information below to create an automated report"
        size="3xl"
        open={router.query.new !== undefined}
        onClose={handleEvent({
          push: "/",
        })}
        renderContent={(props) => props.children}
      >
        <div className="p-6">
          <div className="grid gap-6 grid-cols-12">
            <div className="col-span-6">
              <Input
                type="text"
                label="Report name"
                help="Enter the report name just for self reference"
              />
            </div>
            <div className="col-span-6">
              <Input
                type="date"
                label="Start date"
                help="Date where the report will start sending"
              />
            </div>
          </div>
        </div>
        <div className="p-6 border-t">
          <Select
            label="Recipients"
            options={recipients.map((r) => ({
              label: r.name,
              value: r.id,
            }))}
            value={selectedRecipients}
            help="The owner of this report will automatically receive it"
            placeholder="All"
            multiple
            onChange={setSelectedRecipients}
            messages={{
              noOptions: () => "No recipients found",
            }}
          />
        </div>
        <div className="p-6 border-t">
          <Select
            label="Controllers"
            options={controllers.map((r) => ({
              label: r.name,
              value: r.id,
            }))}
            value={selectedControllers}
            placeholder="All"
            help="Select the controllers you wish to add to your report"
            multiple
            onChange={setSelectedControllers}
            messages={{
              noOptions: () => "No controllers found",
            }}
          />
          <RadioGroup className="mt-5" value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">
              Privacy setting
            </RadioGroup.Label>
            <div className="bg-white rounded-md -space-y-px">
              {settings.map((setting, settingIdx) => (
                <RadioGroup.Option
                  key={setting.name}
                  value={setting}
                  className={({ checked }) =>
                    classNames(
                      settingIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                      settingIdx === settings.length - 1
                        ? "rounded-bl-md rounded-br-md"
                        : "",
                      checked
                        ? "bg-blue-50 border-blue-200"
                        : "border-gray-200",
                      "relative flex p-4 border focus:outline-none cursor-pointer"
                    )
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <span
                        className={classNames(
                          checked
                            ? "bg-blue-600 border-transparent"
                            : "bg-white border-gray-300",
                          active ? "ring-2 ring-offset-2 ring-blue-500" : "",
                          "flex items-center justify-center mt-0.5 w-4 h-4 border rounded-full cursor-pointer"
                        )}
                        aria-hidden="true"
                      >
                        <span className="w-1.5 h-1.5 bg-white rounded-full" />
                      </span>
                      <div className="flex flex-col ml-3">
                        <RadioGroup.Label
                          as="span"
                          className={classNames(
                            checked ? "text-blue-900" : "text-gray-900",
                            "block text-sm font-medium"
                          )}
                        >
                          {setting.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={classNames(
                            checked ? "text-blue-700" : "text-gray-500",
                            "block text-sm"
                          )}
                        >
                          {setting.description}
                        </RadioGroup.Description>
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          {selected === settings[0] ? (
            <ul className="mt-6">
              <li>
                {/* <div className="flex items-baseline justify-between px-4 py-1 bg-gray-100 border-b space-x-4">
                  <div className="flex items-baseline space-x-2">
                    <h1 className="text-sm font-medium">All controllers</h1>
                  </div>
                </div> */}
                <div className="flex space-x-4">
                  <Select
                    label="Frequency"
                    className="w-28"
                    options={[
                      {
                        label: "Daily",
                        value: "daily",
                      },
                      {
                        label: "Weekly",
                        value: "weekly",
                      },
                      {
                        label: "Monthly",
                        value: "monthly",
                      },
                    ]}
                    value="daily"
                    clearable={false}
                  />
                  <Select
                    label="Reports"
                    className="flex-1"
                    options={[
                      {
                        label: "Settings",
                        value: "settings",
                      },
                      {
                        label: "Data Logs",
                        value: "datalogs",
                      },
                      {
                        label: "Water Consumption",
                        value: "waterconsumption",
                      },
                    ]}
                    placeholder="All"
                    multiple
                  />
                </div>
              </li>
            </ul>
          ) : (
            <ul className="mt-6 border rounded-md divide-y">
              {controllersToShow.map((c) => (
                <li key={c.id} className="">
                  <div className="flex items-baseline justify-between px-4 py-1 bg-gray-100 border-b space-x-4">
                    <div className="flex items-baseline space-x-2">
                      <h1 className="text-sm font-medium">
                        {c.site} - {c.name} -{" "}
                        <span className="font-normal">{c.id}</span>
                      </h1>
                    </div>
                    <p className="text-gray-500 text-xs">{c.version}</p>
                  </div>
                  <div className="flex p-4 space-x-4">
                    <Select
                      className="w-24"
                      options={[
                        {
                          label: "Daily",
                          value: "daily",
                        },
                        {
                          label: "Weekly",
                          value: "weekly",
                        },
                        {
                          label: "Monthly",
                          value: "monthly",
                        },
                      ]}
                      value="daily"
                      clearable={false}
                    />
                    <Select
                      className="flex-1"
                      options={[
                        {
                          label: "Settings",
                          value: "settings",
                        },
                        {
                          label: "Data Logs",
                          value: "datalogs",
                        },
                        {
                          label: "Water Consumption",
                          value: "waterconsumption",
                        },
                      ]}
                      placeholder="All reports"
                      multiple
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-end p-6 border-t">
          <div className="flex space-x-3">
            <Button variant="secondary">Cancel</Button>
            <Button>Save</Button>
          </div>
        </div>
      </Modal>
      {/* <ModalForm
        title="Update site"
        description="Fill in the information below to update the site"
        fields={[
          {
            type: "text",
            name: "name",
            label: "Name",
            autoComplete: "name",
            size: 12,
            required: true,
          },
          {
            type: "text",
            name: "streetAddress1",
            label: "Street address 1",
            autoComplete: "address-line1",
            size: 12,
            required: true,
          },
          {
            type: "text",
            name: "streetAddress2",
            label: "Street address 2",
            autoComplete: "address-line2",
            size: 12,
          },
          {
            type: "text",
            name: "area",
            label: "Area",
            autoComplete: "address-level3",
            size: 6,
          },
          {
            type: "text",
            name: "city",
            label: "City",
            autoComplete: "address-level2",
            size: 6,
            required: true,
          },
          {
            type: "text",
            name: "state",
            label: "State",
            autoComplete: "address-level1",
            size: 6,
            required: true,
          },
          {
            type: "text",
            name: "postalCode",
            label: "Postal code",
            autoComplete: "postal-code",
            size: 6,
            required: true,
          },
          {
            type: "text",
            name: "country",
            label: "Country",
            autoComplete: "country-name",
            size: 12,
            required: true,
          },
        ]}
        defaultValues={
          draftSite
            ? {
                id: draftSite.id,
                name: draftSite.site,
                streetAddress1: draftSite.address?.street_1 ?? "",
                streetAddress2: draftSite.address?.street_2 ?? "",
                area: draftSite.address?.area ?? "",
                city: draftSite.address?.city ?? "",
                state: draftSite.address?.state ?? "",
                postalCode: draftSite.address?.zipcode ?? "",
                country: draftSite.address?.country ?? "",
              }
            : undefined
        }
        submitLabel="Save"
        mutation={updateSiteMutation}
        actions={[
          {
            variant: "secondary",
            icon: TrashIcon,
            onClick: handleEvent({
              confirm: "Are you sure you want to delete this site?",
              mutateAsync: [
                deleteSiteMutation,
                draftSite,
                {
                  then: {
                    toast: ["success", "Site deleted successfully!"],
                    refetch: sitesQuery,
                    push: {
                      search: "",
                    },
                  },
                  catch: (error: Error) => ({
                    toast: ["error", error.message],
                  }),
                },
              ],
            }),
          },
        ]}
        open={!!draftSite}
        onSuccess={handleEvent({
          toast: ["success", "Site updated successfully!"],
          refetch: sitesQuery,
          push: {
            search: "",
          },
        })}
        onError={handleEvent((error: Error) => ({
          toast: ["error", error.message],
        }))}
        onClose={handleEvent({
          push: {
            search: "",
          },
        })}
      /> */}
    </Layout>
  )
}
