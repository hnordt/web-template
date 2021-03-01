import React from "react"
import DateRangePicker from "components/alpha/DateRangePicker"

export default function Index() {
  const [value, setValue] = React.useState("-7d")

  return (
    <main className="flex items-start p-6 space-x-96">
      <DateRangePicker
        options={[
          {
            label: "Today",
            value: "today",
          },
          {
            label: "Yesterday",
            value: "yesterday",
          },
          {
            label: "Last 7 days",
            value: "-7d",
          },
          {
            label: "Last 30 days",
            value: "-30d",
          },
          {
            label: "Last 12 months",
            value: "-12M",
          },
        ]}
        value={value}
        onValueChange={setValue}
      />
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </main>
  )
}
