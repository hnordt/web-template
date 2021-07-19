import React from "react"
import { useMutation } from "react-query"
import Modal from "components/core/alpha/Modal"
import Form from "components/core/alpha/Form"

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
      <div className="mx-auto w-full max-w-sm">
        <button type="button" onClick={() => setOpen(true)}>
          Open
        </button>
        <Modal
          title="Update settings"
          description="Fill in the fields below to update settings"
          open={open}
          renderContent={(props) => props.children}
          onClose={() => setOpen(false)}
        >
          <Form
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
            renderContent={(props) => (
              <div className="p-6">{props.children}</div>
            )}
            renderFooter={(props) => (
              <div className="p-6 border-t border-gray-200">
                {props.children}
              </div>
            )}
            onCancel={() => setOpen(false)}
          />
        </Modal>
      </div>
    </main>
  )
}
