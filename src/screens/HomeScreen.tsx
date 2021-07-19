import React from "react"
import { useMutation } from "react-query"
import Table from "components/core/alpha/Table"
import ModalForm from "components/core/alpha/ModalForm"

function DataTableSample() {
  const data = JSON.parse(
    `[{"firstName":"Foo","lastName":"Bar","age":10,"visits":85,"progress":66,"status":"relationship"},{"firstName":"Foo","lastName":"Bar","age":3,"visits":85,"progress":35,"status":"complicated"},{"firstName":"Foo","lastName":"Bar","age":18,"visits":20,"progress":60,"status":"relationship"},{"firstName":"Foo","lastName":"Bar","age":25,"visits":83,"progress":84,"status":"relationship"},{"firstName":"Foo","lastName":"Bar","age":25,"visits":9,"progress":87,"status":"single"},{"firstName":"Foo","lastName":"Bar","age":25,"visits":98,"progress":74,"status":"relationship"},{"firstName":"Foo","lastName":"Bar","age":28,"visits":21,"progress":38,"status":"complicated"},{"firstName":"Foo","lastName":"Bar","age":11,"visits":55,"progress":56,"status":"complicated"},{"firstName":"Foo","lastName":"Bar","age":26,"visits":64,"progress":56,"status":"complicated"},{"firstName":"Foo","lastName":"Bar","age":11,"visits":70,"progress":5,"status":"complicated"},{"firstName":"Foo","lastName":"Bar","age":11,"visits":9,"progress":64,"status":"complicated"},{"firstName":"Foo","lastName":"Bar","age":0,"visits":87,"progress":85,"status":"single"},{"firstName":"Foo","lastName":"Bar","age":10,"visits":85,"progress":37,"status":"complicated"},{"firstName":"Foo","lastName":"Bar","age":22,"visits":40,"progress":34,"status":"complicated"},{"firstName":"Foo","lastName":"Bar","age":22,"visits":82,"progress":40,"status":"complicated"},{"firstName":"Foo","lastName":"Bar","age":20,"visits":86,"progress":75,"status":"complicated"},{"firstName":"Foo","lastName":"Bar","age":12,"visits":7,"progress":14,"status":"relationship"},{"firstName":"Foo","lastName":"Bar","age":29,"visits":98,"progress":1,"status":"complicated"},{"firstName":"Foo","lastName":"Bar","age":18,"visits":16,"progress":26,"status":"relationship"},{"firstName":"Foo","lastName":"Bar","age":14,"visits":72,"progress":70,"status":"single"}]`
  )

  return (
    <Table
      columns={[
        {
          label: "First Name",
          accessor: "firstName",
          renderContent: (props) => (
            <span className="text-red-500">{props.children}</span>
          ),
        },
        {
          label: "Last Name",
          accessor: "lastName",
        },
        {
          label: "Age",
          accessor: "age",
        },
        {
          label: "Visits",
          accessor: "visits",
        },
        {
          label: "Status",
          accessor: "status",
        },
        {
          label: "Profile Progress",
          accessor: "progress",
        },
      ]}
      data={data}
      onEditClick={console.log}
    />
  )
}

export default function HomeScreen() {
  const [open, setOpen] = React.useState(false)

  const updateSettingsMutation = useMutation(
    (variables) => new Promise((r) => setTimeout(() => r(variables), 5000))
  )

  console.table({
    status: updateSettingsMutation.status,
    data: JSON.stringify(updateSettingsMutation.data),
  })

  return (
    <main className="p-6">
      <div className="mx-auto w-full max-w-5xl">
        <DataTableSample />
        <div className="mt-8">
          <button type="button" onClick={() => setOpen(true)}>
            Open
          </button>
        </div>
        <ModalForm
          title="Update settings"
          description="Fill in the fields below to update settings"
          fields={[
            {
              type: "text",
              name: "name",
              label: "Name",
              size: 8,
              required: true,
            },
            {
              type: "number",
              name: "age",
              label: "Age",
              size: 4,
            },
            {
              type: "text",
              name: "location",
              label: "Location",
              size: 12,
            },
          ]}
          defaultValues={{
            name: "",
            age: "",
            location: "",
          }}
          mutation={updateSettingsMutation}
          open={open}
          onClose={() => setOpen(false)}
          onSuccess="Success!"
        />
      </div>
    </main>
  )
}
