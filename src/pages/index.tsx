import React from "react"
import dayjs from "dayjs"
import Form, { FormField, FormActions, FormButton } from "components/core/Form"
import Input from "components/core/Input"
import RadioGroup from "components/core/RadioGroup"
import Select from "components/core/Select"
import Modal from "components/core/Modal"

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
      <Modal
        title="Create report"
        description="Fill in the information below to create an automated report"
        size="3xl"
        open
        onClose={() => {}}
      >
        <Form
          defaultValues={{
            name: "",
            startDate: dayjs().format("YYYY-MM-DD"),
            recipients: [],
            controllers: [],
            settings: "same",
            frequency: "daily",
            reports: [],
          }}
          watch={["controllers", "settings"]}
          onSubmit={(values) => console.log("handleSubmit", values)}
        >
          {({ values }) => (
            <>
              <FormField
                name="name"
                label="Report name"
                hint="Enter the report name for self reference"
                span={6}
                required
              >
                <Input type="text" />
              </FormField>
              <FormField
                name="startDate"
                label="Start date"
                hint="Date where the report will start sending"
                span={6}
                required
              >
                <Input type="date" />
              </FormField>
              <FormField
                name="recipients"
                label="Recipients"
                hint="The owner of this report will automatically receive it"
                span={12}
              >
                <Select
                  options={recipients.map((r) => ({
                    label: r.name,
                    value: r.id,
                  }))}
                  placeholder="All"
                  multiple
                  messages={{
                    noOptions: () => "No recipients found",
                  }}
                />
              </FormField>
              <FormField
                name="controllers"
                label="Controllers"
                hint="Select the controllers you wish to add to your report"
                span={12}
                required={
                  values.settings === "different"
                    ? "When enabling different settings per controller you should select at least one controller"
                    : false
                }
              >
                <Select
                  options={controllers.map((r) => ({
                    label: r.name,
                    value: r.id,
                  }))}
                  placeholder="All"
                  multiple
                  messages={{
                    noOptions: () => "No controllers found",
                  }}
                />
              </FormField>
              <FormField name="settings" label="Controller settings" span={12}>
                <RadioGroup
                  options={[
                    {
                      label: "Similar",
                      description:
                        "All controllers have the same delivery frequency and reports",
                      value: "same",
                    },
                    {
                      label: "Different",
                      description:
                        "Controllers have different delivery frequency and reports",
                      value: "different",
                    },
                  ]}
                />
              </FormField>
              {values.settings === "same" ? (
                <>
                  <FormField
                    name="frequency"
                    label="Frequency"
                    span={3}
                    required
                  >
                    <Select
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
                      searchable={false}
                      clearable={false}
                    />
                  </FormField>
                  <FormField name="reports" label="Reports" span={9}>
                    <Select
                      options={reports.map((report) => ({
                        label: report.name,
                        value: report.id,
                      }))}
                      placeholder="All"
                      multiple
                      searchable={false}
                    />
                  </FormField>
                </>
              ) : (
                values.controllers.length > 0 && (
                  <div className="col-span-12 mt-2">
                    <ul className="border rounded-md divide-y">
                      {values.controllers.map((controllerId) => {
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
                            <div className="flex p-4 bg-white space-x-4">
                              <FormField
                                className="w-36"
                                name={`frequenciesByController[${controller.id}]`}
                                defaultValue="daily"
                                required
                              >
                                <Select
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
                                  searchable={false}
                                  clearable={false}
                                />
                              </FormField>
                              <FormField
                                className="flex-1"
                                name={`reportsByController[${controller.id}]`}
                                defaultValue={[]}
                              >
                                <Select
                                  options={reports.map((report) => ({
                                    label: report.name,
                                    value: report.id,
                                  }))}
                                  placeholder="All reports"
                                  multiple
                                  searchable={false}
                                />
                              </FormField>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              )}
              <FormActions>
                <FormButton type="reset" variant="secondary">
                  Cancel
                </FormButton>
                <FormButton type="submit" variant="primary">
                  Submit
                </FormButton>
              </FormActions>
            </>
          )}
        </Form>
      </Modal>
    </div>
  )
}
