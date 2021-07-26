import React from "react"
import useHandleEvent from "hooks/useHandleEvent"
import { useMutation } from "react-query"
import axios from "axios"
import { TrashIcon } from "@heroicons/react/outline"

function Button(props) {
  const { loading, ...rest } = props

  return (
    <button type="button" {...rest} disabled={loading || rest.disabled}>
      {loading ? "..." : rest.children}
    </button>
  )
}

export default function HomeScreen() {
  const handleEvent = useHandleEvent()

  const deleteUserMutation = useMutation(
    "users",
    (userId) =>
      new Promise(
        (
          resolve,
          reject //reject(new Error("test"))
        ) =>
          setTimeout(
            () =>
              axios
                .put(`https://jsonplaceholder.typicode.com/users/${userId}`, {
                  id: userId,
                })
                .then((res) => res.data)
                .then(resolve),
            500
          )
      ),
    {
      onError: () => {},
    }
  )

  return (
    <main className="p-6">
      <Button
        loading={deleteUserMutation.isLoading}
        onClick={handleEvent((e) => ({
          mutateAsync: [
            deleteUserMutation,
            2,
            undefined,
            {
              then: (data) => ({
                toast: ["success", "Foo"],
                push: {
                  search: `?n=${data.id}`,
                },
              }),
              catch: (e) => ({
                toast: ["error", e.message],
              }),
            },
          ],
        }))}
      >
        <TrashIcon className="w-5 h-5 text-gray-400" />
      </Button>
    </main>
  )
}
