import React from "react"
import { Controller, useForm } from "react-hook-form"
import axios from "axios"
import Select from "components/core/alpha/Select"

export default function HomeScreen() {
  const form = useForm({
    defaultValues: {
      users: [2, 6],
    },
  })

  return (
    <main className="p-6">
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <form
          onSubmit={form.handleSubmit((values) =>
            console.log({
              values,
            })
          )}
        >
          {/* <input {...form.register("users")} type="text" /> */}
          <Controller
            control={form.control}
            name="users"
            render={(props) => (
              <Select
                {...props.field}
                className="w-96"
                multiple
                loadOptions={(query) =>
                  axios
                    .get(
                      `https://jsonplaceholder.typicode.com/users${
                        query ? `?q=${query}` : ""
                      }`
                    )
                    .then((res) => res.data)
                }
                getOptionLabel={(user) => user.name}
                getOptionValue={(user) => user.id}
              />
            )}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  )
}
