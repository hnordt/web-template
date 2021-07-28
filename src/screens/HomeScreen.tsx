import React from "react"
// import Combobox from "components/core/alpha/Combobox"
import Select from "react-select"
import AsyncSelect from "react-select/async"
import axios from "axios"

export default function HomeScreen() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ]

  return (
    <main className="p-6">
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={(inputValue) =>
          axios
            .get(
              inputValue
                ? `https://jsonplaceholder.typicode.com/users?q=${inputValue}`
                : `https://jsonplaceholder.typicode.com/users`
            )
            .then((res) => res.data)
            .then((data) =>
              data.map((user) => ({
                label: user.name,
                value: user.id,
              }))
            )
        }
      />
    </main>
  )
}
