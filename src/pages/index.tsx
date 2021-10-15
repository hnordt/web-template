import React from "react"
import Form, { FormInput } from "components/core/Form"
import ModalForm from "components/core/ModalForm"

const reports = [
  {
    id: "settings",
    name: "Settings",
  },
  {
    id: "data-logs",
    name: "Data Logs",
  },
  {
    id: "water-consumption",
    name: "Water Consumption",
  },
  {
    id: "events",
    name: "Events (Alarms, Settings Change, Calibrations)",
  },
  {
    id: "alarm-recipients",
    name: "Alarm Recipients",
  },
  {
    id: "graph-overlay",
    name: "Graph Overlay",
  },
]

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

export default function HomeScreen() {
  return (
    <div className="p-6">
      <ModalForm
        title="Create report"
        description="Fill in the information below to create an automated report"
        fields={[
          {
            type: "text",
            label: "Report name",
            name: "name",
            help: "Enter the report name for self reference",
            size: 6,
            required: "Required",
          },
          {
            type: "date",
            label: "Start date",
            name: "startDate",
            help: "Date where the report will start sending",
            size: 6,
            required: "Required",
          },
          {
            type: "select",
            label: "Recipients",
            name: "recipients",
            options: recipients.map((r) => ({
              label: r.name,
              value: r.id,
            })),
            placeholder: "All",
            help: "The owner of this report will automatically receive it",
            size: 12,
            multiple: true,
            messages: {
              noOptions: () => "No recipients found",
            },
          },
          {
            type: "select",
            label: "Controllers",
            name: "controllers",
            options: controllers.map((c) => ({
              label: c.name,
              value: c.id,
            })),
            placeholder: "All",
            help: "Select the controllers you wish to add to your report",
            size: 12,
            required: "Required",
            multiple: true,
            messages: {
              noOptions: () => "No controllers found",
            },
          },
          {
            type: "radio",
            label: "Settings",
            name: "settings",
            options: [
              {
                label: "Same settings",
                description:
                  "All controllers have the same delivery frequency and reports",
                value: "same",
              },
              {
                label: "Different settings",
                description:
                  "Controllers have different delivery frequency and reports",
                value: "different",
              },
            ],
            size: 12,
          },
          {
            type: "select",
            label: "Frequency",
            name: "frequency",
            options: [
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
            ],
            size: 3,
            required: "Required",
            hidden: (values) => values.settings === "different",
          },
          {
            type: "select",
            label: "Reports",
            name: "reports",
            options: reports.map((report) => ({
              label: report.name,
              value: report.id,
            })),
            placeholder: "All",
            size: 9,
            hidden: (values) => values.settings === "different",
            multiple: true,
          },
        ]}
        defaultValues={{
          name: "",
          startDate: "",
          recipients: [],
          controllers: controllers.map((controller) => controller.id),
          settings: "different",
          frequency: "daily",
          reports: [],
        }}
        renderContent={(props) => (
          <>
            {props.children}
            {props.values.settings === "different" &&
              props.values.controllers.length > 0 && (
                <ul className="mt-6 border rounded-md divide-y">
                  {props.values.controllers.map((controllerId) => {
                    const controller = controllers.find(
                      (controller) => controller.id === controllerId
                    )
                    return (
                      <li key={controller.id}>
                        <div className="flex items-baseline justify-between px-4 py-1 bg-gray-100 border-b space-x-4">
                          <div className="flex items-baseline space-x-2">
                            <h1 className="text-sm font-medium">
                              {controller.site} - {controller.name} -{" "}
                              <span className="font-normal">
                                {controller.id}
                              </span>
                            </h1>
                          </div>
                          <p className="text-gray-500 text-xs">
                            {controller.version}
                          </p>
                        </div>
                        <div className="flex p-4 space-x-4">
                          {props.registerField(
                            <FormInput
                              className="w-36"
                              type="select"
                              name={`frequenciesByController[${controller.id}]`}
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
                              defaultValue="daily"
                            />
                          )}
                          {props.registerField(
                            <FormInput
                              className="flex-1"
                              type="select"
                              name={`reportsByController[${controller.id}]`}
                              options={reports.map((report) => ({
                                label: report.name,
                                value: report.id,
                              }))}
                              placeholder="All reports"
                              defaultValue={[]}
                              multiple
                            />
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
          </>
        )}
        size="3xl"
        open
        onSubmit={(values) => console.info(values)}
        onClose={() => {}}
      />
    </div>
  )
}
